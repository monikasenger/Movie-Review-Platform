import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: [String], required: true },
  releaseYear: { type: Number, required: true },
  director: { type: String, required: true },
  cast: { type: [String], required: true },
  synopsis: { type: String },
  posterUrl: { type: String },
  averageRating: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Movie", movieSchema);
