// Main Express application configuration.
import express from "express";
import cors from 'cors'; //Enable Cross origin Resource sharing
import morgan from "morgan"; // Middleware for logging HTTP requests.
import movieRouter from "./routes/moviesRoutes.js";


const app =express();

//Middleware to process JSON requests
app.use(express.json());
  
// Enable CORS to allow cross-origin requests
app.use(cors())

//HTTP request logging
app.use(morgan("dev")); 

//Routes for movies
app.use("/movies", movieRouter);

export default app;