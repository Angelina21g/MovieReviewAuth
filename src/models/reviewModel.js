// Import necessary modules
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Define the structure of a review in the database
const reviewSchema = new mongoose.Schema(
  {
    // Unique ID for each review (not the default Mongo ID)
    review_id: {
      type: String,
      default: uuidv4,
      unique: true,
    },

    // Rating from 1 to 5 stars
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    // Optional comment for the review
    comment: {
      type: String,
    },

    // The movie this review is for (we store the movie_id)
    movie_id: {
      type: String,
      required: true,
    },

    // The user who wrote the review (we store their user_id)
    user_id: {
      type: String,
      required: true,
    },
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,

    // Customize the JSON response when sending data back to the client
    toJSON: {
      transform: function (doc, ret) {
        // Remove internal Mongo fields
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// Create the Review model based on the schema
const Review = mongoose.model("Review", reviewSchema);

// Export the model so it can be used elsewhere in the project
export default Review;
