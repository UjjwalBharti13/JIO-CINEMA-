import UserModel from "../model/UserModel.js";
import {tmdbApi, TMDB_ENDPOINT} from "../services/tmdb.js";

/***************USERS************** */

const getCurrentUser = async (req, res) => {
   try{
        const userId = req.userId;
        const { _id, name, email, createdAt, wishlist, isPremium}=
            await UserModel.findById(userId);

             res.status(200).json({
                  user : {
                    _id : _id,
                    name : name,
                    email : email,
                    createdAt : createdAt,
                    wishlist : wishlist,
                    isPremium : isPremium,
                  },
                  status : "success", 
             });
   }
      catch(err){
         res.status(500).json({
            message : err.message,
            status : "failure",
         });
      }
};

const addToWishlist = async(req,res)=> {
     try{
         const userId = req.userId;
         const { id,medis_type} = req.body;
         const uset = await UserModel.findById(userId);

         if(!user){
            return res.status(404).send("User not found");
         }
         let postItem;

         if(medis_type=="tv"){
            postItem = (await tmdbApi.get(TMDB_ENDPOINT.fetchTvShowDetails(id))).data;

         }else{
            postItem = (await tmdbApi.get(TMDB_ENDPOINT.fetchMovieDetails(id))).data;
         }
         console.log("pos",postItem);

         const wishlistItem = { 
             poster_path : postItem.poster_path,
             name : postItem.title,
             id : postItem.id,
             medis_type : medis_type,
         };

         user.wishlist.push(wishlistItem);

         await UserModel.findOneAndUpdate(
            { _id : userId},
            { $push : {wishlist : wishlistItem}},
            {new : true , upsert : true} // option to return the updated document and creat
         );
          
          res.status(200).json({
            status : "success",
          });
          

     } catch(error){
        console.log("error : ", error);
        res.status(500).json({
            message : error.message,
            status : "failure",
        });
     }
};

export { 
    getCurrentUser,
    addToWishlist,
}



