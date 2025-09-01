import { createContext, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [watchlist, setWatchlist] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ---------------- LOGIN USER ----------------
  const loginUser = async (email, password) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/users/login`, { email, password });
      setToken(data.token);
      setUserId(data.userId);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      toast.success("Login successful ");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed ❌");
      throw error;
    }
  };

  // ---------------- REGISTER USER ----------------
  const registerUser = async (userData) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/users/signup`, userData);
      toast.success("Registration successful ");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed ❌");
      throw error;
    }
  };

  // ---------------- FETCH PROFILE ----------------
  const fetchProfile = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error) {
      toast.error("Failed to fetch profile ");
      throw error;
    }
  };

  // ---------------- UPDATE PROFILE ----------------
  const updateProfile = async (profileData) => {
    try {
      const formData = new FormData();
      for (const key in profileData) {
        formData.append(key, profileData[key]);
      }

      const { data } = await axios.put(`${backendUrl}/api/users/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Profile updated successfully ");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile ❌");
      throw error;
    }
  };

  // ---------------- LOGOUT ----------------
  const logoutUser = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    toast.success("Logged out successfully ");
  };

  // ---------------- WATCHLIST ----------------
  const fetchWatchlist = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/users/${userId}/watchlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWatchlist(data);
      return data;
    } catch (error) {
      toast.error("Failed to fetch watchlist ");
      throw error;
    }
  };

  const addToWatchlist = async (movieId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/users/${userId}/watchlist`,
        { movieId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWatchlist((prev) => [...prev, data]);
      toast.success("Added to watchlist ");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add to watchlist ❌");
      throw error;
    }
  };

  const removeFromWatchlist = async (movieId) => {
    try {
      await axios.delete(`${backendUrl}/api/users/${userId}/watchlist/${movieId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWatchlist((prev) => prev.filter((item) => item.movieId._id !== movieId));
      toast.success("Removed from watchlist");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove from watchlist ❌");
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        token,
        userId,
        watchlist,
        loginUser,
        registerUser,
        fetchProfile,
        updateProfile,
        logoutUser,
        fetchWatchlist,
        addToWatchlist,
        removeFromWatchlist,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
