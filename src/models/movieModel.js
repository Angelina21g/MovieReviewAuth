// Mongoose model for movies: defines the schema and creates the Movie model.

import mongoose from "mongoose";


//Define a schema for movie documents with a title and rating.
const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    rating: { type: Number, required: true }
}, { timestamps: true }); //The 'timestamps' option automatically adds createdAt and updatedAt fields.

// Create the Movie model using the movieSchema.
const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
