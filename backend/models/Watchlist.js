import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true },
  dateAdded: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Watchlist", watchlistSchema);
