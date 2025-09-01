import { useState } from "react";
import { useMovies } from "../../context/MovieContext";
import { useAdmin } from "../../context/AdminContext";
import AddMovieForm from "../../components/AddMovieForm";

const AdminPage = () => {
  const { movies, fetchMovies } = useMovies();
  const { deleteMovie } = useAdmin();
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      await deleteMovie(id);
      fetchMovies(); // refresh after delete
    }
  };

  const handleEdit = (movie) => {
    setEditingMovie(movie); // set current movie data
    setShowForm(true); // open form
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingMovie(null); // reset edit state
    fetchMovies(); // refresh after update/add
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            🎬 Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Manage movies: add, update, or delete content
          </p>
        </div>

        {/* Stats Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-700">Total Movies</h2>
            <p className="text-3xl font-bold text-blue-600">{movies.length}</p>
          </div>
        </div>

        {/* Add Movie Toggle */}
        <div className="flex justify-end">
          {!editingMovie && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition"
            >
              {showForm ? "Close Form" : "➕ Add Movie"}
            </button>
          )}
        </div>

        {/* Add / Edit Movie Form */}
        {showForm && (
          <div className="bg-white shadow-2xl rounded-3xl p-6 sm:p-8 md:p-10">
            <AddMovieForm
              editingMovie={editingMovie}
              onClose={handleFormClose}
            />
          </div>
        )}

        {/* Movies List */}
        <div className="bg-white shadow-lg rounded-2xl p-6 overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-4">All Movies</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3">Poster</th>
                <th className="p-3">Title</th>
                <th className="p-3">Year</th>
                <th className="p-3">Genre</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-6">
                    No movies found
                  </td>
                </tr>
              ) : (
                movies.map((movie) => (
                  <tr
                    key={movie._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-16 h-20 object-cover rounded-lg shadow"
                      />
                    </td>
                    <td className="p-3 font-semibold text-gray-800">
                      {movie.title}
                    </td>
                    <td className="p-3">{movie.releaseYear}</td>
                    <td className="p-3">{movie.genre.join(", ")}</td>
                    <td className="p-3 flex gap-3 justify-center">
                      <button
                        onClick={() => handleEdit(movie)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(movie._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
