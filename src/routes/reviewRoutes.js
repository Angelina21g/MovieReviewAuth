import express from "express";
import {
  addReview,
  getReviewsByMovie,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { AuthGuard } from "../middleware/authMiddleware.js"; // 🔐 Protect routes

const router = express.Router();


// Add a Review to a Movie
// POST /reviews/:movie_id

router.post("/:movie_id", AuthGuard, addReview);


// Get All Reviews for a Movie
// GET /reviews/movie/:movie_id

router.get("/movie/:movie_id", AuthGuard, getReviewsByMovie);


// Update a Review by ID (only yours)
// PUT /reviews/:review_id

router.put("/:review_id", AuthGuard, updateReview);


// Delete a Review by ID (only yours)
// DELETE /reviews/:review_id

router.delete("/:review_id", AuthGuard, deleteReview);

export default router;
