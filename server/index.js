import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import portfolioRoutes from "./routes/portfolio.js";

dotenv.config(); 

const app = express();

app.use(express.json());
app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

app.use("/auth", authRoutes);
app.use("/portfolio", portfolioRoutes);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, async () => {
//   await connectDB();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
