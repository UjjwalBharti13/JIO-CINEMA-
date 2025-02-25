import express from "express";

const VideoRouter = express.Router();
import getVideoStream  from "../controller/StreamController.js";

/*********************ROUTES*********************************** */

VideoRouter.get("/",getVideoStream);
export default VideoRouter;




