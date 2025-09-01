import express from "express";
import { adminLogin, addMovie,  deleteMovie, updateMovie } from "../controllers/adminController.js";
import authAdmin from "../middleware/adminMiddleware.js";

const adminRoutes = express.Router();

// Admin login
adminRoutes.post("/login", adminLogin);

// Add movie (protected route)
adminRoutes.post("/movies", authAdmin, addMovie);

// Update movie (protected route)
adminRoutes.put("/movies/:id", authAdmin, updateMovie);

// Delete movie (protected route)
adminRoutes.delete("/movies/:id", authAdmin, deleteMovie);

export default adminRoutes;
