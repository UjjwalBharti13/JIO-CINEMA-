import express from "express";


import {
    getActionMovies,
    getComedyMovies,
    getHorrorMovies,
    getMoviesDetails,
    getRomanceMovies,
    getAnimeMovies,
    getTmdbMovies,
}  from  "../controller/MoviesController.js";

const MoviesRouter = express.Router();


MoviesRouter.get("/test", (req, res) => {
    res.json({ message: "Movies router is working!" });
});



MoviesRouter.get("/action", getActionMovies);
MoviesRouter.get("/comedy",getComedyMovies);
MoviesRouter.get("/horror",getHorrorMovies);
MoviesRouter.get("/romance",getRomanceMovies);
MoviesRouter.get("/anime",getAnimeMovies);
MoviesRouter.get("/details",getMoviesDetails);
MoviesRouter.get("/tmdb", getTmdbMovies);

export default MoviesRouter;

 
