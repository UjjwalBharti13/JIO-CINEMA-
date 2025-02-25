import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN; 
const BASE_URL = "https://api.themoviedb.org/3/";

export const TMDB_ENDPOINT = {
  fetchNowPlaying: "/movie/now_playing",
  fetchTrending: "/trending/all/week",
  fetchPopular: "/movie/popular",
  fetchUpcoming: "/movie/upcoming?include_video=true",
  fetchTopRated: "/movie/top_rated?include_video=true",

  fetchActionMovies: "/discover/movie?language=en-US&with_genres=28",
  fetchComedyMovies: "/discover/movie?language=en-US&with_genres=35",
  fetchHorrorMovies: "/discover/movie?language=en-US&with_genres=27",
  fetchRomanceMovies: "/discover/movie?language=en-US&with_genres=10749",
  fetchAnimeMovies: "/discover/movie?language=en-US&with_genres=16",
  fetchMovieVideos: (id) => `/movie/${id}/videos`,
  fetchMovieDetails: (id) => `/movie/${id}`,

  fetchActionTvShows: "/discover/tv?language=en-US&with_genres=10759",
  fetchComedyTvShows: "/discover/tv?language=en-US&with_genres=35",
  fetchMysteryTvShows: "/discover/tv?language=en-US&with_genres=9648",
  fetchDramaTvShows: "/discover/tv?language=en-US&with_genres=18",
  fetchCrimeTvShows: "/discover/tv?language=en-US&with_genres=80",

  fetchTvShowVideo: (id) => `/tv/${id}/videos`,
  fetchTvShowDetails: (id) => `/tv/${id}`,
};

// export const tmdbApi = axios.create({
//   baseURL: BASE_URL,
// });

// tmdbApi.interceptors.request.use((config) => {
//   config.params = config.params || {};
//   config.params["api_key"] = API_KEY;
//   return config;
// });

export const tmdbApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`, // ✅ Correct way to authenticate
    "Content-Type": "application/json",
  },
});



