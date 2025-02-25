import bcrypt from "bcrypt";
import UserModel  from "../model/UserModel";

 import "./connectWithDB";

 async function UpdateModelUtil(model){
       
       const allTheElements = await model.find();
         console.log(allTheElements)

         for(let i=0; i< allTheElements.length;i++){
              let entity = allTheElements[i];

              entity.password = await bcrypt.hash(entity.password,10);

               delete entity.confirmPassword;
               await entity.save();
         }
 }


 UpdateModelUtil(UserModel).then(()=>{
       console.log("Task is done")
 }).catch(console.log)


