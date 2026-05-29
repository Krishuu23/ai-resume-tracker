console.log("INDEX RUNNING"); 
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/routes/resumeRoutes.js";
import mongoose from "mongoose";
import authroutes from "./src/routes/authRoutes.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);
app.use("/api/auth", authroutes);

app.get("/", (req, res) => {
  res.send("AI Resume Tracker Backend Running 🚀");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log("MONGODB CONNECTED"))
  .catch((err)=> console.error("MONGODB CONNECTION ERROR:", err))
