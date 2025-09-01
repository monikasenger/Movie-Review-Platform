import { useMovies } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";

const HomePage = () => {
  const { movies } = useMovies();

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            🎬 Trending Movies
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Explore the latest and most popular movies
          </p>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
