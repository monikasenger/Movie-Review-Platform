import Movie from "../models/Movie.js";
import Review from "../models/Review.js";

// GET /api/movies
export const getMovies = async (req, res) => {
  try {
    const { genre, year, rating, page = 1, limit = 10 } = req.query;

    let filter = {};
    if (genre) filter.genre = genre;
    if (year) filter.releaseYear = Number(year);

    const movies = await Movie.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/movies/:id
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const reviews = await Review.find({ movieId: req.params.id }).populate("userId", "username");
    res.json({ movie, reviews });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET /api/movies/:id/reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.id }).populate("userId", "username");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/movies/:id/reviews
export const addReview = async (req, res) => {
  try {
    const { rating, reviewText } = req.body;
    const movieId = req.params.id;

    const alreadyReviewed = await Review.findOne({ userId: req.user._id, movieId });
    if (alreadyReviewed)
      return res.status(400).json({ message: "You already reviewed this movie" });

    const review = new Review({
      userId: req.user._id,
      movieId,
      rating,
      reviewText
    });

    await review.save();

    // Update average rating of the movie
    const reviews = await Review.find({ movieId });
    const avgRating =
      reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;

    await Movie.findByIdAndUpdate(movieId, { averageRating: avgRating.toFixed(1) });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
