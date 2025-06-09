import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/user/register", {
        firstName,
        lastName,
        phone,
        email,
        password,
      })
      .then((response) => {
        toast.success("Registration successful");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Registration failed");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-4xl">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-pink-500">cook</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Your name *</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="First name"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">&nbsp;</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Last name"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="abc@gmail.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Phone number *</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="011 2222 333"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Password *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="******"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Confirm Password *</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-3 py-2 border ${
                confirmPassword && confirmPassword !== password
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400`}
              placeholder="******"
              required
            />
            {confirmPassword && confirmPassword !== password && (
              <p className="text-sm text-red-500 mt-1">The password does not match</p>
            )}
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition duration-200"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </div>
        </form>

        {/* Bottom link */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
