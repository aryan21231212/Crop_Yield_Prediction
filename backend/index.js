import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import predictRoutes from "./routes/disease.js";
import scheduleRoutes from "./routes/scheduler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/predict", predictRoutes);
app.use("/api/schedule", scheduleRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Hello World from Agri Platform Backend");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("DB connection error:", err.message));

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
