import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    role: "",
    password: ""
  });

  const [error, setError] = useState("");

  // Use correct env variable
  const API = import.meta.env.VITE_AUTH_URL;

  const handleSignup = async () => {
    try {
      const payload = {
        username: form.username,
        email: form.email,
        phone: form.phone,
        role: form.role.toUpperCase(), // API expects ROLE in caps
        password: form.password,
      };

      await axios.post(`${API}/api/auth/register`, payload);
      navigate("/");
    } catch (e) {
      setError(e.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">
        <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-3 py-2 rounded mb-3 text-sm">
            {error}
          </div>
        )}

        {/* NAME */}
        <input
          type="text"
          placeholder="Usernamee"
          className="w-full mb-3 p-3 border rounded"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-3 border rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* PHONE */}
        <input
          type="tel"
          placeholder="Phone No"
          className="w-full mb-3 p-3 border rounded"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        {/* ROLE */}
        <select
          className="w-full mb-3 p-3 border rounded"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-3 border rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
        >
          Sign Up
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
