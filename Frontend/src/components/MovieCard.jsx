import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { FaPlus } from "react-icons/fa";

const MovieCard = ({ movie }) => {
  const { token, addToWatchlist } = useUser();

  const handleAddWatchlist = async () => {
    if (!token) {
      alert("Please login first to add to watchlist!");
      return;
    }
    await addToWatchlist(movie._id);
  };

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl hover:scale-105 transition-transform duration-300 relative flex flex-col">
      <div className="relative">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-64 sm:h-72 md:h-80 object-cover"
        />
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">{movie.title}</h2>
          <p className="text-gray-500 text-sm sm:text-base mt-1">{movie.genre.join(", ")}</p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <Link
            to={`/movies/${movie._id}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
          >
            View Details
          </Link>

          <button
            onClick={handleAddWatchlist}
            className="flex items-center gap-1 bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 text-sm sm:text-base transition"
          >
            <FaPlus className="w-3 h-3 sm:w-4 sm:h-4" />
            Watchlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
