// AdminContext.js
import { createContext, useState, useContext } from "react";
import axios from "axios";

const AdminContext = createContext();
export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem("aToken") || null);
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  //  Admin login
  const loginAdmin = async (email, password) => {
    const { data } = await axios.post(`${backendurl}/api/admin/login`, { email, password });
    if (data.success) {
      setAToken(data.aToken);
      localStorage.setItem("aToken", data.aToken);
    }
    return data;
  };

  //  Add movie
  const addMovie = async (movieData) => {
    const { data } = await axios.post(
      `${backendurl}/api/admin/movies`,
      movieData,
      { headers: { Authorization: `Bearer ${aToken}` } }
    );
    return data;
  };

  //  Update movie
  const updateMovie = async (id, movieData) => {
    const { data } = await axios.put(
      `${backendurl}/api/admin/movies/${id}`,
      movieData,
      { headers: { Authorization: `Bearer ${aToken}` } }
    );
    return data;
  };

  //  Delete movie
  const deleteMovie = async (id) => {
    const { data } = await axios.delete(
      `${backendurl}/api/admin/movies/${id}`,
      { headers: { Authorization: `Bearer ${aToken}` } }
    );
    return data;
  };

  //  Logout
  const logoutAdmin = () => {
    setAToken(null);
    localStorage.removeItem("aToken");
  };

  return (
    <AdminContext.Provider
      value={{
        aToken,
        loginAdmin,
        addMovie,
        updateMovie,
        deleteMovie,
        logoutAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
