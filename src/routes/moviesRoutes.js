import express from "express"; 
import {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController.js";
import { AuthGuard } from "../middleware/authMiddleware.js"; 

const router = express.Router();

// GET / - Get all movies (only user's own movies)
router.get("/", AuthGuard, getMovies);

// GET /:id - Get one movie (optional: you can protect this too)
router.get("/:id", AuthGuard, getMovieById);

// POST / - Add a new movie
router.post("/", AuthGuard, addMovie);

// PUT /:id - Update a movie
router.put("/:id", AuthGuard, updateMovie);

// DELETE /:id - Delete a movie
router.delete("/:id", AuthGuard, deleteMovie);

export default router;
