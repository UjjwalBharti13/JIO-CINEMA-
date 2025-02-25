/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "image.tmdb.org",
          pathname: "/t/p/**", // Ensures all images are accessible
        },
        {
          protocol: "http",
          hostname: "localhost",
        },
        {
          protocol: "https",
          hostname: "jio_backend.onrender.com",
        },
      ],
    },
  };
  
  export default nextConfig;
  