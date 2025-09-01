import express from "express";
import { registerUser, loginUser, getUserProfile,updateUserProfile, getWatchlist, addToWatchlist, removeFromWatchlist } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multer.js";


const userRoutes = express.Router();

userRoutes.post("/signup", registerUser);
userRoutes.post("/login", loginUser);
userRoutes.get("/:id", protect, getUserProfile);
userRoutes.put("/:id", protect,upload.single("profilePicture"), updateUserProfile);
userRoutes.get("/:id/watchlist", protect, getWatchlist);
userRoutes.post("/:id/watchlist", protect, addToWatchlist);
userRoutes.delete("/:id/watchlist/:movieId", protect, removeFromWatchlist);

export default userRoutes;
