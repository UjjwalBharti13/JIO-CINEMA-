import express from "express";
import dotenv from "dotenv";
import cors  from "cors";
import cookieParser  from "cookie-parser";
import helmet  from "helmet";



// including env variables

dotenv.config();

//const {PORT, DB_PASSWORD, DB_USER} = process.env;


const PORT = process.env.PORT || 5000; // ✅ Use default if undefined


/************************connection to our DB************************************ */

import connectWithDB from "./utility/connectWithDB.js";
connectWithDB();  // ✅ Call the function to connect with MongoDB



// with this your creating simple app -> api

const app = express();

// user crud

import UserRouter from "./router/UserRouter.js";


// auth
import AuthRouter from "./router/AuthRouter.js";

// movies
import MoviesRouter from "./router/MoviesRouter.js";

// home page 
import DiscoverRouter from "./router/DiscoverRouter.js";

// tv shows
import TvShowsRouter from "./router/TvRouter.js";

// video -> video streaming ke liye
import StreamRouter from "./router/StreamRouter.js";

//payment 
import PaymentRouter from "./router/PaymentRouter.js";


const corsConfig = {
      origin : true,
      credentials : true,
};


// this is allowing all the requests

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// app.use(mongoSanitize());


app.get("/", (req, res) => {
      res.send("✅ API is working!");
  });


app.use("/api/user",UserRouter);
app.use("/api/auth", AuthRouter);
console.log("✅ Movies Router Loaded!");

app.use("/api/movies",MoviesRouter);
app.use("/api/tv",TvShowsRouter);
app.use("/api/discover",DiscoverRouter);
app.use("/api/video", StreamRouter);
app.use("/api/payment", PaymentRouter);


/*********************HANDLER FUNCTION******************************* */

// 404 router not found 

app.use(function cb(req, res ) {
      // response

      res.status(404).json({
          status: "failure",
          message : " route not found",
      });
});

// server -> run on  a port

app.listen(PORT, '0.0.0.0', (err) => {
      if (err) {
          console.error('❌ Server failed to start:', err);
      } else {
          console.log(`✅ Server is running on port ${PORT}`);
      }
  });
  
/*******
 *  Ath code level -> prevent Repetitom -> Factory(controllers)
 * At file level -> Structure to segrate the code -> MVC
 * 
 * 
 */




