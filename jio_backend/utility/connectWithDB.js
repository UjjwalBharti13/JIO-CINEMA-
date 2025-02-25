import mongoose from "mongoose";
import dotenv from "dotenv";  // Use import instead of require

dotenv.config();  // Load environment variables

const connectWithDB = () => {
 
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));
};

export default connectWithDB;  // ✅ Ensure default export



