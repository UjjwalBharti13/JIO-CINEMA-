/** all the required imports are in the same file ***/

import UserModel from "../model/UserModel.js"; // Add .js at the end for ES modules
import jwt from "jsonwebtoken";
import { promisify } from "util"; // Use ES module import
import otpGenerator from "../utility/generateOtp.js"; // Add .js at the end
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const promisifiedJWTSign = promisify(jwt.sign);
const promisifiedJWTVerify = promisify(jwt.verify);

const { JWT_SECRET } = process.env;


// never - > sync is your server

   import fs  from 'fs';
  // import path  from 'path';
   import bcrypt  from 'bcrypt';
   import sendEmailHelper  from "../utility/dynamicMailSender.js";
      import { userInfo }  from "os";


      import path from "path";
      import { fileURLToPath } from "url";
      
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      
      const pathToOtpHTML = path.join(__dirname, "../", "utility", "otp.html");
      
   const HtmlTemplateString = fs.readFileSync(pathToOtpHTML, "utf-8");

   const signupController = async function (req, res) {
       
        try{
              
             // add it to the db
               const userObject = req.body;
               // data-> req.body

               let newUser = await UserModel.create(userObject);
                 // send a response

                 res.status(201).json({
                     message: "User Created successfully",
                     data: newUser,
                     status: "success"
                 });

         } catch(err){
             console.log(err);
             res.status(500).json({
                 message: err.message,
                 status: "failure"
             });
         }

   }

   const loginController = async function(req,res){
         try{
              /**
               * 1. enable login - > tell the client that user is logged in
               *     
               *  a. email and password
               * 
               */
                 
              let {email,password} = req.body;
                 
              let user = await UserModel.findOne({ email });
                
              if(user){
                   console.log(password,user.password);
                   let areEqual = await bcrypt.compare(password,user.password);
                      console.log("res",areEqual)

                      if(areEqual){
                             // user is authenticated
                             /**
                              *    2. Sending the token -> peopel remenber them
                              * 
                              * 
                              */
                              // patload : id of that user

                              let token = await promisifiedJWTSign({id:user["_id"]},JWT_SECRET);
                              console.log("sending token",token);

                              res.status(200).json({
                                   
                                   status: "success",
                                        message:{
                                              name : user.name,
                                              email : user.email,
                                        }
                              })


                      }else{
                             res.status(404).json({
                                   status : "failed",
                                   message: "email or password is incorrect"
                             }) 

                      }
              }
                      else{
                             req.status(404).json({
                                   status: "failed",
                                   message: "user npt found with creds"
                             })
                      }



            }    catch(err){
                    console.error(err);
                    res.status(500).json({
                          status : "failure",
                          message : err.message
                    })  
               }
   }

   const forgetPasswordController = async function(req,res){
          
          try{
                 // -> send his email

                 let {email} = req.body;
                   // check for the email -> exist or not

                   let user = await UserModel.findOne({email:email})

                   if(user){
                        // exists -> 
                           const otp = otpGenerator();
                              
                             // 1.send the Email -> token

                             await sendEmailHelper(otp, HtmlTemplateString,user.name, user.email)

                             // 2. save that token in DB
                              
                             await UserModel.findOneAndUpdate(
                                  {email:email},
                                      {
                                           $set:{
                                                token : otp,
                                                otpExpiry: Date.now() + 10*60*1000,
                                           },
                                      },
                   
                                      {new:true}
                   
                                    );

                                     res.status(200).json({
                                          message : "user updated",
                                          status : "seccuess",
                                          otp : otp,
                                          userId : user.id
                                     })
                                    }
                                    else{
                                          // if not -> return -> no user found
                                            
                                          res.status(404).json({
                                                 status : "failure",
                                                 message : "no user with this email if found"
                                          })
                                    }

                    
          }    catch(err){
                res.status(500).json({
                      message : err.message,
                      status : "failure"
                })
          }

   }

   const resetPasswordController = async function(req,res){
       
             // -> otp
             // newPassword and newConfirmPassword
             // -> params -> id

             try{
                 const {email, password , consfirmPassword, otp} = req.body;
                    
                   /***
                    *      1. Search user using id
                    *      
                    * 
                    *        a. not found -> invalid otp or session
                    *         b. it's found 
                    *             
                    *                     -> get the token is  matching&&check it's expiry>currentTime    
                    *                        -> if yes -> update the password   
                    * 
                    * 
                    * * */
                     
                   const user = await UserModel.findOne({ email });
                     if(user){
                           if(otp && user.token==otp){
                                 
                             let currentTime = Date.now();
                              if(currentTime<user.otpExpiry){
                                   user.confirmPassword = consfirmPassword;
                                     user.password = password;
                                      
                                       delete user.token;
                                       delete user.otpExpiry;
                                       await user.save();
                                          res.status(200).json({
                                             "status": "success",
                                             message:"your password has been updated"
                                          })
                              }
                                
                           }else{
                                 res.status(404).json({
                                      status : "failure",
                                      message : "invalid otp"
                                 })
                           }

                     }
                          else{
                                res.status(404).json({
                                      status : "failure",
                                      message : "no user found with this email"
                                })
                          }
             }
                catch(err){
                      res.status(500).json({
                           status : "failure",
                           message : err.message
                      })
                }
   }
       
      /*************      MiddleWare     ******************/

      const protectRouteMiddleWare = async function(req,res,next){ 
            
            try{
                 let jwttoken = req.cookies.JWT;

                  if(!jwttoken)
                           throw new Error("UnAuthorized User");
                     
                              let decryptedToken = await promisifiedJWTVerify(jwttoken,JWT_SECRET);
                                console.log(decryptedToken);

                                 if(decryptedToken){
                                     let userId = decryptedToken.id;
                                       // adding the userid to the req oblect 

                                       req.userId = userId;
                                         console.log("authenticating the user");
                                           next();

                                 }
                                     

                  }  
                  catch(err){
                        res.status(401).json({
                             status : "failure",
                             message : err.message
                        })
                  }
                         
            }
       
        const isAdminMiddleWare = async function(req,res,next){
              // has to check wheather the role of user is admin or not

              try{
                      let id = req.userId;
                      let user = await UserModel.findById(id);
                        if(user.role=="admin"){

                            console.log("Authorized User");
                              next();
                        }else{
                             console.log("returning 401");
                               res.status(401).json({
                                  status : "failure",
                                  "mesage" : "UnAuthorized User"
                               })
                        }
              }   catch(err){
                    res.status(500).json({
                         mesage : err.message,
                         status : "failure"
                    })
              }
        }

        const isAuthorizedMiddleWare = async function(allowedRoles){
              
             return async function(req,res,next){
                  
                try{
                      let id = req.userId;
                      let user = await UserModel.findById(id);
                      let isAuthorized = allowedRoles.includes(user.role);
                       
                      if(isAuthorized){
                           console.log("Authorized User");
                           next();
                      }else{
                         console.log("returning 401");
                           res.status(401).json({
                              status : "failure",
                              "mesage" : "UnAuthorized User"
                           })
                      }
                }
                   catch(err){
                         res.status(500).json({
                              message:error.message,
                              status : "failure",
                              "mesage" : "UnAuthorized User"
                         })
                   }

             

                }

        }

        const logoutController = function(req,res){
               res.cookie("JWT","",{expires: new Date(0), httpOnly: true, path: "/" });

                  res.status(200).json({
                      status : "success",
                      message : "Logged out successfully"
                  })
        }

        export {
            signupController,
            loginController,
            forgetPasswordController,
            resetPasswordController,
            protectRouteMiddleWare,
            isAdminMiddleWare,
            isAuthorizedMiddleWare,
            logoutController
          };
          

