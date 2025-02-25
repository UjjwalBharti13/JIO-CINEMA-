import express from "express";

import { signupController, loginController, forgetPasswordController, resetPasswordController, logoutController} from  "../controller/AuthController.js";

const AuthRouter = express.Router();

AuthRouter.post("/signup", signupController);
AuthRouter.post("/login",loginController);
AuthRouter.post("/forgetpassword", forgetPasswordController);
AuthRouter.post("/resetPassword",resetPasswordController);
AuthRouter.post("/logout",logoutController);

export default AuthRouter;


