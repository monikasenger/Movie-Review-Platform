import User from "../models/User.js";
import Watchlist from "../models/Watchlist.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";

// ---------------------------
// REGISTER USER
// ---------------------------
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    if (!validator.isEmail(email))
      return res.status(400).json({ message: "Enter a valid email" });

    if (password.length < 8)
      return res.status(400).json({ message: "Password must be at least 8 characters" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ username, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------------
// LOGIN USER
// ---------------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------------
// GET USER PROFILE
// ---------------------------
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------------
// UPDATE USER PROFILE
// ---------------------------
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Text fields
    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    // File (profile picture)
    if (req.file) {
      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      user.profilePicture = uploaded.secure_url;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ---------------------------
// GET USER WATCHLIST
// ---------------------------
export const getWatchlist = async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ userId: req.params.id }).populate("movieId");
    res.json(watchlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------------
// ADD TO WATCHLIST
// ---------------------------
export const addToWatchlist = async (req, res) => {
  try {
    const { movieId } = req.body;
    const exists = await Watchlist.findOne({ userId: req.params.id, movieId });
    if (exists) return res.status(400).json({ message: "Movie already in watchlist" });

    const item = await Watchlist.create({ userId: req.params.id, movieId });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------------------
// REMOVE FROM WATCHLIST
// ---------------------------
export const removeFromWatchlist = async (req, res) => {
  try {
    const item = await Watchlist.findOneAndDelete({
      userId: req.params.id,
      movieId: req.params.movieId
    });

    if (!item) return res.status(404).json({ message: "Item not found in watchlist" });
    res.json({ message: "Removed from watchlist" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
