import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const MovieContext = createContext();
export const useMovies = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
const backendurl=import.meta.env.VITE_BACKEND_URL;

  const fetchMovies = async () => {
    const { data } = await axios.get(`${backendurl}/api/movies`);
    setMovies(data);
  };

  const fetchMovieById = async (id) => {
    const { data } = await axios.get(`${backendurl}/api/movies/${id}`);
    return data;
  };

  const addReview = async (movieId, review, token) => {
    const { data } = await axios.post(
      `${backendurl}/api/movies/${movieId}/reviews`,
      review,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  };

  useEffect(() => { fetchMovies(); }, []);

  return (
    <MovieContext.Provider value={{ movies, fetchMovies, fetchMovieById, addReview }}>
      {children}
    </MovieContext.Provider>
  );
};
