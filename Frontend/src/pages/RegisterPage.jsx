import { useState } from "react";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const { registerUser } = useUser();
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      toast.success("Registration successful ");
      setForm({ username: "", email: "", password: "" });
    } catch (error) {
      toast.error("Registration failed ");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-md space-y-6"
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center">Create Account</h1>

        {Object.keys(form).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="text-gray-700 font-medium capitalize mb-1">{key}</label>
            <input
              type={key === "password" ? "password" : "text"}
              placeholder={`Enter ${key}`}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-green-400 outline-none transition duration-200 hover:border-green-400"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
        >
          Register
        </button>

        <p className="text-center text-gray-500 text-sm">
          Already have an account?   <Link to="/login" className="text-blue-500 hover:underline">
    Login
  </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
