// Controller for managing movie CRUD operations using Mongoose

// Import the Movie model so we can interact with the movies collection in MongoDB
import Movie from "../models/movieModel.js";


// GET all movies for the logged-in user
// GET /movies
export const getMovies = async (req, res) => {
  try {
    // Fetch only the movies created by the logged-in user
    const movies = await Movie.find({ user_id: req.user.user_id });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error });
  }
};


// GET a single movie by its MongoDB _id
// GET /movies/:id
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    // If no movie found, return 404
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie", error });
  }
};


// ADD a new movie
// POST /movies
export const addMovie = async (req, res) => {
  try {
    const { title, rating } = req.body;

    // Basic validation to ensure required fields are provided
    if (!title || rating === undefined) {
      return res.status(400).json({ message: "Title and rating are required" });
    }

    // Create the movie and attach the logged-in user's ID
    const newMovie = await Movie.create({
      title,
      rating,
      user_id: req.user.user_id, // This ensures user ownership
    });

    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ message: "Error adding movie", error });
  }
};


// UPDATE a movie by its ID
// PUT /movies/:id
export const updateMovie = async (req, res) => {
  try {
    const { title, rating } = req.body;
    const updatedData = {};

    // Only include fields that were provided
    if (title !== undefined) updatedData.title = title;
    if (rating !== undefined) updatedData.rating = rating;

    // Find the movie by ID and update it
    const movie = await Movie.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.user_id }, // Make sure user owns it
      updatedData,
      { new: true } // Return updated version
    );

    if (!movie) {
      return res.status(404).json({ message: "Movie not found or unauthorized" });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: "Error updating movie", error });
  }
};


// DELETE a movie by its ID
// DELETE /movies/:id
export const deleteMovie = async (req, res) => {
  try {
    // Find and delete the movie only if the user owns it
    const movie = await Movie.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.user_id,
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found or unauthorized" });
    }

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting movie", error });
  }
};
