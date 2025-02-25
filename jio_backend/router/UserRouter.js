import express from "express";

const UserRouter = express.Router();

import {getCurrentUser, addToWishlist}  from "../controller/UserController.js";
import {protectRouteMiddleWare} from "../controller/AuthController.js";

/***********ROUTES*****************/
/*********USERS*************/

UserRouter.use(protectRouteMiddleWare);
UserRouter.get("/",getCurrentUser);
UserRouter.post("/wishlist",addToWishlist);
UserRouter.get("/",getCurrentUser);
UserRouter.post("/wishlist",addToWishlist);

export default UserRouter;



