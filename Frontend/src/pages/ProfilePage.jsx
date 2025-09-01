import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import uploadIcon from "../assets/upload_icon.png"; 
import Watchlist from "../components/Watchlist";

const ProfilePage = () => {
  const { fetchProfile, updateProfile } = useUser();
  const [userData, setUserData] = useState({ username: "", email: "", profilePicture: null });
  const [image, setImage] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchProfile();
      setUserData({
        username: data.username,
        email: data.email,
        profilePicture: data.profilePicture
      });
    };
    loadProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ username: userData.username, profilePicture: image });
      toast.success("Profile updated successfully ");
      setIsEdit(false);

      if (image) setUserData({ ...userData, profilePicture: URL.createObjectURL(image) });
      setImage(null);
    } catch (error) {
      toast.error("Failed to update profile ");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium mb-4"
      >
        ← Back
      </button>

      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Profile</h1>
        <button
          onClick={() => setIsEdit(!isEdit)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full md:w-auto"
        >
          {isEdit ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-6 space-y-6">
        {/* Profile Image */}
        <div className="flex justify-center">
          {isEdit ? (
            <label htmlFor="image" className="cursor-pointer relative">
              <img
                className="w-36 h-36 rounded-full object-cover border-2 border-gray-300 opacity-80 hover:opacity-100 transition"
                src={image ? URL.createObjectURL(image) : userData.profilePicture}
                alt="Profile"
              />
              {!image && (
                <img
                  className="w-10 absolute bottom-2 right-2"
                  src={uploadIcon}
                  alt="Upload"
                />
              )}
              <input
                type="file"
                id="image"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          ) : (
            <img
              src={userData.profilePicture}
              alt="Profile"
              className="w-32 h-32 md:w-36 md:h-36 rounded-full border-4 border-blue-500 object-cover"
            />
          )}
        </div>

        {/* Username */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Username</label>
          {isEdit ? (
            <input
              type="text"
              value={userData.username}
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
              className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          ) : (
            <p className="p-2 border rounded-md bg-gray-100">{userData.username}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <p className="p-2 border rounded-md bg-gray-100">{userData.email}</p>
        </div>

        {/* Save Button */}
        {isEdit && (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Save Changes
          </button>
        )}
      </form>

      {/* Watchlist Section */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">My Watchlist</h2>
        <Watchlist />
      </div>
    </div>
  );
};

export default ProfilePage;
