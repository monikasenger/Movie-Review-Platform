import { useState } from "react";
import { useMovies } from "../context/MovieContext";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReviewForm = ({ movieId }) => {
  const { addReview } = useMovies();
  const { token } = useUser();
  const [review, setReview] = useState({ rating: "", reviewText: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.warning("You need to login first to submit a review ");
      return;
    }

    if (!review.rating || !review.reviewText) {
      toast.warning("Please provide both rating and review text ");
      return;
    }

    try {
      await addReview(
        movieId,
        { rating: Number(review.rating), reviewText: review.reviewText },
        token
      );
      setReview({ rating: "", reviewText: "" });
      toast.success("Review submitted successfully ");
    } catch (error) {
      if (error.response && error.response.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to submit review ");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg max-w-xl mx-auto space-y-5 transition-all duration-300 hover:shadow-xl"
    >
      {!token && (
        <p className="text-red-500 text-sm text-center">
          Please login to submit a review 🔒
        </p>
      )}

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Rating (1-5)</label>
        <input
          type="number"
          min="1"
          max="5"
          placeholder="Enter rating"
          value={review.rating}
          onChange={(e) => setReview({ ...review, rating: e.target.value })}
          className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition ${
            !token ? "bg-gray-100 cursor-not-allowed" : "bg-white"
          }`}
          disabled={!token}
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Review</label>
        <textarea
          placeholder="Write your review here..."
          value={review.reviewText}
          onChange={(e) => setReview({ ...review, reviewText: e.target.value })}
          className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition resize-none ${
            !token ? "bg-gray-100 cursor-not-allowed" : "bg-white"
          }`}
          rows={4}
          disabled={!token}
        />
      </div>

      <button
        type="submit"
        className={`w-full py-3 rounded-xl font-medium text-white text-lg transition-colors duration-300 ${
          token
            ? "bg-green-500 hover:bg-green-600 shadow-md hover:shadow-lg"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!token}
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
