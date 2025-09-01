import jwt from "jsonwebtoken";
import Movie from "../models/Movie.js";

// Admin login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { email, role: "admin" },
        process.env.JWT_SECRET_ADMIN,
        { expiresIn: "1d" }
      );

      return res.json({ success: true, aToken: token });
    } else {
      return res.status(401).json({ success: false, message: "Invalid admin credentials" });
    }
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Add movie
export const addMovie = async (req, res) => {
  try {
    const { title, genre, releaseYear, director, cast, synopsis, posterUrl } = req.body;

    if (!title || !genre || !releaseYear || !director || !cast || !synopsis || !posterUrl) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newMovie = new Movie({
      title, genre, releaseYear, director, cast, synopsis, posterUrl
    });

    await newMovie.save();

    return res.status(201).json({ success: true, message: "Movie added successfully", movie: newMovie });
  } catch (err) {
    console.error("Add movie error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update movie
export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params; // movie ID
    const updateData = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedMovie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }

    return res.json({ success: true, message: "Movie updated successfully", movie: updatedMovie });
  } catch (err) {
    console.error("Update movie error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete movie
export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params; // movie ID

    const deletedMovie = await Movie.findByIdAndDelete(id);

    if (!deletedMovie) {
      return res.status(404).json({ success: false, message: "Movie not found" });
    }

    return res.json({ success: true, message: "Movie deleted successfully" });
  } catch (err) {
    console.error("Delete movie error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
