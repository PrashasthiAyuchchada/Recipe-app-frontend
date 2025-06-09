import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/user/login", {
        email,
        password,
      })
      .then((response) => {
        toast.success("Login successful");
        localStorage.setItem("token", response.data.token);

        const user = response.data.user;

        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Login failed");
        setLoading(false);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-pink-500">cook</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="john@gmail.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition duration-200"
          >
            {loading ? "Loading..." : "SIGN IN"}
          </button>
        </form>

        {/* Error Message - handled by toast */}

        {/* Bottom link */}
        <p className="mt-4 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link to="/register" className="text-pink-500 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
