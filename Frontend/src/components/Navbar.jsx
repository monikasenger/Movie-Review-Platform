import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useAdmin } from "../context/AdminContext";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png"; 

const Navbar = () => {
  const { token, logoutUser } = useUser();
  const { aToken, logoutAdmin } = useAdmin();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleUserLogout = () => {
    logoutUser();
    toast.success("User logged out successfully ");
    navigate("/");
  };

  const handleAdminLogout = () => {
    logoutAdmin();
    toast.success("Admin logged out successfully ");
    navigate("/");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
         <Link
        to="/"
        className="flex items-center font-bold text-xl sm:text-2xl hover:text-yellow-300 transition"
      >
        <img src={logo} alt="CineScope Logo" className="w-8 h-8 mr-2" />
        CineScope
      </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {aToken ? (
              <>
                <Link to="/admin-dashboard" className="hover:text-yellow-300 transition">Admin Dashboard</Link>
                <button onClick={handleAdminLogout} className="hover:text-yellow-300 transition">Logout</button>
              </>
            ) : token ? (
              <>
                <Link to="/profile" className="hover:text-yellow-300 transition">Profile</Link>
                <button onClick={handleUserLogout} className="hover:text-yellow-300 transition">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-yellow-300 transition">Login</Link>
                <Link to="/register" className="hover:text-yellow-300 transition">Signup</Link>
                <Link to="/admin-login" className="hover:text-yellow-300 transition">Admin</Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="focus:outline-none">
              {menuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 px-4 pt-2 pb-4 space-y-2 transition">
          {aToken ? (
            <>
              <Link to="/admin" className="block hover:text-yellow-300 transition">Admin Dashboard</Link>
              <button onClick={handleAdminLogout} className="w-full text-left hover:text-yellow-300 transition">Logout</button>
            </>
          ) : token ? (
            <>
              <Link to="/profile" className="block hover:text-yellow-300 transition">Profile</Link>
              <button onClick={handleUserLogout} className="w-full text-left hover:text-yellow-300 transition">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block hover:text-yellow-300 transition">Login</Link>
              <Link to="/register" className="block hover:text-yellow-300 transition">Signup</Link>
              <Link to="/admin-login" className="block hover:text-yellow-300 transition">Admin</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
