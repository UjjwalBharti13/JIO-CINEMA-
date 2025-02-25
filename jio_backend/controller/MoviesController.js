import { tmdbApi, TMDB_ENDPOINT } from "../services/tmdb.js";


const getTmdbMovies = async (req, res) => {
     try {
         const data = await tmdbApi.get(TMDB_ENDPOINT.fetchPopularMovies); // Use the correct TMDB endpoint
 
         res.status(200).json({
             status: "success",
             data: data.data,
         });
     } catch (err) {
         res.status(500).json({
             message: err.message,
             status: "failed",
         });
     }
 };
 

const getActionMovies = async (req, res) => {
      try{
           const data = await tmdbApi.get(TMDB_ENDPOINT.fetchActionMovies);

           res.status(200).json({
               status : "success",
               data : data.data,
           });
      } catch(err){
         res.status(500).json({
              message : err.message,
              status : "failed",
         })
      }
};

const getComedyMovies = async (req, res) => {
       try{
           const data = await tmdbApi.get(TMDB_ENDPOINT.fetchComedyMovies);
                
               res.status(200).json({
                    status: "success",
                     data : data.data,
               });
       }
           catch(err){
              res.status(500).json({
                   message : err.message,
                   status : "failed",
              });
           }
};

const getHorrorMovies = async (req, res) => {
     try{
           const data = await tmdbApi.get(TMDB_ENDPOINT.fetchHorrorMovies);

                res.status(200).jsom({
                      status: "success",
                      data : data.data,
                });
     }   catch(err){
            res.status(500).json({
                  message : err.message,
                   data : data.data,
            });
     }
};

const getRomanceMovies = async (req, res) => {
    try{
         const data  = await tmdbApi.get(TMDB_ENDPOINT.fetchRomanceMovies);
           
              res.status(200).json({
                status : "success",
                data : data.data, 
              })
    } catch(err){
            res.status(500).json({
                 message : err.message,
                 status : "failed",
            });
    }
};

const getAnimeMovies = async (req, res) => {
       try{
         const data =  await tmdbApi.get(TMDB_ENDPOINT.fetchAnimeMovies);
             
          res.status(200).json({
               status : "success",
               data : data.data,
          });
       }
       catch(err){
             res.status(500).json({
                message : err.message,
                status : "failed",  

             });
       }
};

const getMoviesDetails = async (req, res) => {
     try{
           const {id} = req.query;

           if(!id) throw new Error("Movie id is required");
           const details = await tmdbApi.get(TMDB_ENDPOINT.fetchMovieDetails(id));

              
           res.status(200).json({
             status : "success",
             data : details.data,
           });
     }  catch(err){
         res.status(500).json({
              message : err.message,
              status : "failed",
         });
     }
};

export {
    getActionMovies,
    getComedyMovies,
    getHorrorMovies,
    getRomanceMovies,
    getAnimeMovies,
    getMoviesDetails,
    getTmdbMovies,
};



