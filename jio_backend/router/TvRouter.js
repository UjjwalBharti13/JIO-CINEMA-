import express from "express";


import {
    getActionTvShows,
    getComedyTvShows,
    getCrimeTvShows,
    getDramaTvShows,
    getMysteryTvShows,
    getTvShowDetails,
}  from "../controller/TvController.js";
import { getMoviesDetails }  from "../controller/MoviesController.js";


const TvShowsRouter = express.Router();

TvShowsRouter.get("/action", getActionTvShows);
TvShowsRouter.get("/comedy", getComedyTvShows);
TvShowsRouter.get("/crime", getCrimeTvShows);
TvShowsRouter.get("/drama", getDramaTvShows);
TvShowsRouter.get("/mystery", getMysteryTvShows);
TvShowsRouter.get("/details",getTvShowDetails);

export default TvShowsRouter;


