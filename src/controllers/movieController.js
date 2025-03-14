// Controller for managing movie CRUD operations using Mongoose.

import Movie from "../models/movieModel.js";// Import the Mongoose model for movie documents.

// GET /Get all movies
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error });
  }
};

// GET /Get movie by ID
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie", error });
  }
};

// POST /Add a new movie
export const addMovie = async (req, res) => {
  try {
    const { title, rating } = req.body;
    if (!title || rating === undefined) {
      return res.status(400).json({ message: "Title and rating are required" });
    }
    const newMovie = await Movie.create({ title, rating });
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ message: "Error adding movie", error });
  }
};

// PUT /Update movie by ID
export const updateMovie = async (req, res) => {
  try {
    const { title, rating } = req.body;
    const updatedData = {};
    if (title !== undefined) updatedData.title = title;
    if (rating !== undefined) updatedData.rating = rating;
    
    const movie = await Movie.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error updating movie", error });
  }
};

// DELETE /Delete movie by ID
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json({ message: "Movie deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting movie", error });
  }
};