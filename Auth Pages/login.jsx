import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setIsAuthenticated }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Save token and navigate to dashboard
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      navigate('/home');
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4 text-pink-500">Login</h2>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded p-2 mb-2"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded w-full">
          SIGN IN
        </button>
        <p className="text-sm text-center mt-4">
          Don't have an account? <a href="/register" className="text-pink-500">Create an account</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
