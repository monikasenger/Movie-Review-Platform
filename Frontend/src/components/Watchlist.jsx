import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const { fetchWatchlist, removeFromWatchlist } = useUser();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const loadWatchlist = async () => {
      const data = await fetchWatchlist();
      setWatchlist(data);
    };
    loadWatchlist();
  }, []);

  const handleRemove = async (movieId) => {
    await removeFromWatchlist(movieId);
    setWatchlist(watchlist.filter((item) => item.movieId._id !== movieId));
  };

  if (!watchlist.length)
    return (
      <p className="text-gray-500 mt-8 text-center text-lg">
        Your watchlist is empty 🎬
      </p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {watchlist.map((item) => (
        <div
          key={item._id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col sm:flex-row items-center sm:items-start p-4 transition transform hover:scale-105 hover:shadow-2xl"
        >
          <img
            src={item.movieId.posterUrl}
            alt={item.movieId.title}
            className="w-32 h-48 object-cover rounded-lg mb-3 sm:mb-0 sm:mr-4 flex-shrink-0"
          />
          <div className="flex-1 w-full flex flex-col justify-between">
            <Link
              to={`/movies/${item.movieId._id}`}
              className="font-semibold text-lg text-blue-600 hover:text-blue-700 transition mb-2"
            >
              {item.movieId.title}
            </Link>
            <p className="text-gray-500 text-sm mb-2 sm:mb-4">
              {item.movieId.genre?.join(", ")}
            </p>
            <button
              onClick={() => handleRemove(item.movieId._id)}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition w-full sm:w-auto"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Watchlist;
