import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../context/AdminContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const { loginAdmin } = useAdmin();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.warning("Please fill in all fields ");
      return;
    }
    try {
      setLoading(true);
      await loginAdmin(form.email, form.password);
      toast.success("Admin logged in successfully ");
      navigate("/admin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-purple-400 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          🔑 Admin Login
        </h2>

        <input
          type="email"
          placeholder="Admin Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {loading ? "Logging in..." : "Login as Admin"}
        </button>

        <p className="text-center text-gray-500 text-sm mt-2">
          Only authorized admins can access this panel.
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
