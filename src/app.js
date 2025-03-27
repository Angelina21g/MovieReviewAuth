// Main Express application configuration.
import express from "express";
import cors from "cors"; // Enable Cross-Origin Resource Sharing
import morgan from "morgan"; // Middleware for logging HTTP requests
import dotenv from "dotenv"; // To load environment variables
import connectDB from "./config/db.js"; // DB connection

// Import routes
import movieRouter from "./routes/moviesRoutes.js";
import authRouter from "./routes/authRoutes.js"; 

// Initialize Express app
const app = express();

// Load .env variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // To parse incoming JSON
app.use(cors());         // To allow cross-origin requests
app.use(morgan("dev"));  // HTTP request logger

// Routes
app.use("/movies", movieRouter);
app.use("/api/auth", authRouter); 

export default app;
