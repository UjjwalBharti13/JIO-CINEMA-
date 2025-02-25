import {tmdbApi, TMDB_ENDPOINT} from "../services/tmdb.js";
 
const getNowPlaying  = async(req,res)=> {
      
    try{
         const data = await tmdbApi.get(TMDB_ENDPOINT.fetchNowPlaying); 
            
             res.status(200).json({
                 status : "success",
                 data : data.data,
             })
    }   catch(err){
           res.status(500).json({
                message: err.message,
                status : "failed",
           });
    }
};

const getTrending = async(req,res)=>{
       try{
           const data = await tmdbApi.get(TMDB_ENDPOINT.fetchTrending);
             
              res.status(200).json({
                  status : "success",
                  data : data.data,
              });

       } catch(err){
           res.status(500).jsopn({
              message:err.message,
              status : "failed",
           });
       }
};

const getTopRated = async(req,res)=>{
      
    try{
         const data = await tmdbApi.get(TMDB_ENDPOINT.fetchTopRated);
           
             res.status(200).json({
                 status: "success",
                 data : data.data,

             });

    }   catch(err){
            res.status(500).json({
                  message: err.message,
                  status : "failed",
            });
    }
};

const getUpcoming = async(req,res) => {
       try{
           const data = await tmdbApi.get(TMDB_ENDPOINT.fetchUpcoming);
              
              res.status(200).json({
                    status : "success",
                    data : data.data,
              });

       } catch(err){
             res.status(500).json({
                    message : err.message,
                    status : "failed",
             });
       }
};

export  {
    getNowPlaying,
    getTrending,
    getTopRated,
    getUpcoming,
};


