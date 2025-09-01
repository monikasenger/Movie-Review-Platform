import { useState, useEffect } from "react";
import { useAdmin } from "../context/AdminContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AddMovieForm = ({ editingMovie, onClose }) => {
  const { addMovie, updateMovie } = useAdmin();
  const [form, setForm] = useState({
    title: "",
    genre: "",
    releaseYear: "",
    director: "",
    cast: "",
    synopsis: "",
    posterUrl: "",
  });

  // Prefill form if editing
  useEffect(() => {
    if (editingMovie) {
      setForm({
        ...editingMovie,
        genre: editingMovie.genre.join(", "),
        cast: editingMovie.cast.join(", "),
      });
    }
  }, [editingMovie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMovie) {
        await updateMovie(editingMovie._id, {
          ...form,
          genre: form.genre.split(",").map((g) => g.trim()),
          cast: form.cast.split(",").map((c) => c.trim()),
        });
        toast.success("Movie updated successfully ");
      } else {
        await addMovie({
          ...form,
          genre: form.genre.split(",").map((g) => g.trim()),
          cast: form.cast.split(",").map((c) => c.trim()),
        });
        toast.success("Movie added successfully ");
      }
      setForm({
        title: "",
        genre: "",
        releaseYear: "",
        director: "",
        cast: "",
        synopsis: "",
        posterUrl: "",
      });
      onClose();
    } catch (error) {
      toast.error("Operation failed ");
    }
  };

  const getPosterUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `${backendUrl}${url}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-3xl p-8 md:p-12 space-y-8 transition-all"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
        {editingMovie ? "✏️ Edit Movie" : "🎬 Add New Movie"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter movie title"
            className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-400 outline-none shadow-sm hover:shadow-md transition"
          />
        </div>

        {/* Genre */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Genre (comma separated)</label>
          <input
            type="text"
            name="genre"
            value={form.genre}
            onChange={handleChange}
            placeholder="Action, Comedy, Drama"
            className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-400 outline-none shadow-sm hover:shadow-md transition"
          />
        </div>

        {/* Release Year */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Release Year</label>
          <input
            type="number"
            name="releaseYear"
            value={form.releaseYear}
            onChange={handleChange}
            placeholder="2025"
            className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-400 outline-none shadow-sm hover:shadow-md transition"
          />
        </div>

        {/* Director */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Director</label>
          <input
            type="text"
            name="director"
            value={form.director}
            onChange={handleChange}
            placeholder="Director Name"
            className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-400 outline-none shadow-sm hover:shadow-md transition"
          />
        </div>

        {/* Cast */}
        <div className="md:col-span-2 flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Cast (comma separated)</label>
          <input
            type="text"
            name="cast"
            value={form.cast}
            onChange={handleChange}
            placeholder="Actor1, Actor2, Actor3"
            className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-400 outline-none shadow-sm hover:shadow-md transition"
          />
        </div>

        {/* Synopsis */}
        <div className="md:col-span-2 flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Synopsis</label>
          <textarea
            name="synopsis"
            value={form.synopsis}
            onChange={handleChange}
            rows="5"
            placeholder="Brief description of the movie"
            className="border border-gray-300 p-3 w-full rounded-xl focus:ring-2 focus:ring-blue-400 outline-none shadow-sm hover:shadow-md transition resize-none"
          />
        </div>

        {/* Poster URL */}
        <div className="md:col-span-2 flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Poster URL (full URL or /posters/image-name)
          </label>
          <input
            type="text"
            name="posterUrl"
            value={form.posterUrl}
            onChange={handleChange}
            placeholder="Enter poster URL..."
            className={`border p-3 rounded-xl focus:ring-2 outline-none transition shadow-sm hover:shadow-md ${
              form.posterUrl ? "border-blue-500 ring-blue-200" : "border-gray-300 focus:ring-blue-400"
            }`}
          />

          {form.posterUrl.trim() && (
            <div className="mt-4 flex flex-col items-center">
              <p className="text-sm text-gray-500 mb-2">Poster Preview:</p>
              <img
                src={getPosterUrl(form.posterUrl)}
                alt="Poster Preview"
                className="w-48 h-64 object-cover rounded-lg border shadow-sm transition transform hover:scale-105"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          )}
        </div>
      </div>

   < div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-2xl font-semibold text-lg hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all"
        >
          {editingMovie ? "✅ Update Movie" : "➕ Add Movie"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-4 rounded-2xl font-semibold text-lg transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddMovieForm;