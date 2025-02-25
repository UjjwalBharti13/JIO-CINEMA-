import nodemailer from "nodemailer";
import dotenv from "dotenv";  // Use import instead of require

dotenv.config();  // Load environment variables

/*****************setup*********************/


//entering the details about out smtp server anf client -> Creating transporter

const techDetails = { 
      host : 'smtp.gmail.com',
      port: 465,

      // identify our application -> sender

      secure : true,
        auth : { 
            user : process.env.APP_EMAIL,
            pass : process.env.APP_PASSWORD
        }
}

const transporter = nodemailer.createTransport(techDetails);
import fs from "fs";


/************************************************/


async function  emailSender(to, subject, html, text){
       try{
            // entering details required to send your email

            console.log(process.env.APP_EMAIL, "subject", subject,"text",text);

                let emailObject = { 
                    to : to, // change to your recipient 
                    from : process.env.APP_EMAIL, // change to your verified sender
                    subject : subject,
                    text : text, // it is shown to end client when
                    // SMPT server is not able to parser HTML

                    html : html,
                }
                await transporter.sendMail(emailObject);

       }catch(err){
           console.log(err);
             throw new Error(err.message)
       }
}

async function sendEmailHelper(otp, htmlTemplate, userName, to){
        // write the template
        // template -> final -> replace placeholder with actal data

        const nameUpdatedHtml = htmlTemplate.replace("#{USER_NAME}",userName);
        const finalHTMLCode = nameUpdatedHtml.replace("#{OTP}",otp);

        const text = `
          HI ${userName}
            Your otp to reset your password is ${otp};`
            
          const subject = "RESET PASSWORD Verifivation OTP";
          
          await emailSender(to, subject, finalHTMLCode, text);
} 

export default sendEmailHelper;





