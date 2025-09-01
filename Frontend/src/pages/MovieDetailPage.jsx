import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovies } from "../context/MovieContext";
import { useUser } from "../context/UserContext";
import ReviewForm from "../components/ReviewForm";
import { toast } from "react-toastify";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { fetchMovieById } = useMovies();
  const { token, addToWatchlist } = useUser();
  const [movieData, setMovieData] = useState(null);
  const [visibleReviews, setVisibleReviews] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMovie = async () => {
      const data = await fetchMovieById(id);
      setMovieData(data);
    };
    loadMovie();
  }, [id]);

  if (!movieData)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  const reviews = movieData.reviews || [];

  const handleLoadMore = () => {
    setVisibleReviews((prev) => prev + 10);
  };

  const handleWatchlist = async () => {
    if (!token) {
      toast.warning("Please login first ");
      return;
    }
    await addToWatchlist(movieData.movie._id);
    toast.success("Added to watchlist ");
  };

  const renderStars = (rating) =>
    "⭐".repeat(rating) + "☆".repeat(5 - rating);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium mb-4"
      >
        ← Back
      </button>

      {/* Movie Info */}
      <div className="flex flex-col md:flex-row gap-6 bg-white shadow-lg rounded-2xl p-6 transition hover:scale-[1.01]">
        <img
          src={movieData.movie.posterUrl}
          alt={movieData.movie.title}
          className="w-full md:w-64 h-96 object-cover rounded-xl shadow-md"
        />
        <div className="flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {movieData.movie.title}
            </h1>
            <p className="text-gray-700">{movieData.movie.synopsis}</p>
            <p className="text-sm text-gray-500">
              <strong>Genre:</strong> {movieData.movie.genre.join(", ")} <br />
              <strong>Director:</strong> {movieData.movie.director} <br />
              <strong>Cast:</strong> {movieData.movie.cast.join(", ")} <br />
              <strong>Release Year:</strong> {movieData.movie.releaseYear}
            </p>
          </div>
          <div className="mt-4 md:mt-6">
            <button
              onClick={handleWatchlist}
              className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition"
            >
              Add to Watchlist
            </button>
          </div>
        </div>
      </div>

      {/* Review Form */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Write a Review</h2>
        <ReviewForm movieId={id} />
      </div>

      {/* Reviews Section */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4">Reviews ({reviews.length})</h2>

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {reviews.slice(0, visibleReviews).map((r) => (
              <div
                key={r._id}
                className="border-b py-3 last:border-b-0 flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div>
                  <p className="font-medium text-gray-800">{r.userId.username}</p>
                  <p className="text-gray-700">{r.reviewText}</p>
                </div>
                <div className="text-yellow-500 font-bold mt-2 md:mt-0">
                  {renderStars(r.rating)}
                </div>
              </div>
            ))}
          </div>
        )}

        {visibleReviews < reviews.length && (
          <div className="text-center mt-4">
            <button
              onClick={handleLoadMore}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
            >
              Load More Reviews
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetailPage;
