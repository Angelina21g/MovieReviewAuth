// Import the Review model so we can interact with the review collection in MongoDB
import Review from "../models/reviewModel.js";



// ADD a New Review for a Specific Movie

export const addReview = async (req, res) => {
  try {
    // Get the rating and comment from the request body
    const { rating, comment } = req.body;

    // Get the movie_id from the URL (req.params)
    const { movie_id } = req.params;

    // Create a new review and attach the logged-in user's ID from the token
    const newReview = new Review({
      rating,
      comment,
      movie_id,
      user_id: req.user.user_id, // This comes from the AuthGuard middleware
    });

    // Save the review to the database
    const savedReview = await newReview.save();

    // Send back the new review in the response
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: "Could not add review", error: error.message });
  }
};



// GET All Reviews for a Specific Movie

export const getReviewsByMovie = async (req, res) => {
  try {
    // Get the movie_id from the URL
    const { movie_id } = req.params;

    // Find all reviews in the database that belong to this movie
    const reviews = await Review.find({ movie_id });

    // Send the list of reviews back in the response
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch reviews", error: error.message });
  }
};



// UPDATE a Review (Only if You Own It)

export const updateReview = async (req, res) => {
  try {
    // Get the review ID from the URL
    const { review_id } = req.params;

    // Try to find and update the review that matches both the ID and the logged-in user's ID
    const review = await Review.findOneAndUpdate(
      { review_id, user_id: req.user.user_id }, // Must match both!
      req.body, // Update with what's in the body
      { new: true } // Return the updated review
    );

    // If no review was found or user doesn't own it
    if (!review) {
      return res.status(404).json({ message: "Review not found or unauthorized" });
    }

    // Return the updated review
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Could not update review", error: error.message });
  }
};



// DELETE a Review (Only if You Own It)

export const deleteReview = async (req, res) => {
  try {
    // Get the review ID from the URL
    const { review_id } = req.params;

    // Try to delete the review that matches both the ID and the user's ID
    const deleted = await Review.findOneAndDelete({
      review_id,
      user_id: req.user.user_id,
    });

    // If no matching review was found or the user doesn't own it
    if (!deleted) {
      return res.status(404).json({ message: "Review not found or unauthorized" });
    }

    // Confirm successful deletion
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Could not delete review", error: error.message });
  }
};
