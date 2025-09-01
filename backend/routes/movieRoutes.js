import express from "express";
import { getMovies, getMovieById, getReviews, addReview } from "../controllers/movieController.js";
import { protect } from "../middleware/authMiddleware.js";
import authAdmin from "../middleware/adminMiddleware.js";

const movieRoutes = express.Router();

movieRoutes.get("/", getMovies);
movieRoutes.get("/:id", getMovieById);

movieRoutes.get("/:id/reviews", getReviews);
movieRoutes.post("/:id/reviews", protect, addReview);

export default movieRoutes;
