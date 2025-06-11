import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 

const handleSubmit = async (e) => {
  e.preventDefault();
  if (formData.password !== formData.confirmPassword) {
    setError('The password does not match');
    return;
  }

  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });

    if (response.status === 201) {
      navigate('/login');
    }
  } catch (err) {
    const message = err.response?.data?.message || 'Registration failed';
    setError(message);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full h-[500px] max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-4 text-pink-500">cook</h1>
        <h2 className="text-2xl font-bold text-left mb-4">Register</h2>
        <div className="grid grid-cols-2 gap-4">
          <input name="firstName" placeholder="First name" onChange={handleChange} className="border p-2 rounded" />
          <input name="lastName" placeholder="Last name" onChange={handleChange} className="border p-2 rounded" />
          <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 rounded" />
          <input name="phone" placeholder="Phone number" onChange={handleChange} className="border p-2 rounded" />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 rounded" />
          <div>
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>
        <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded w-[200px] mt-4 ">
          Create Account
        </button>
        <p className="text-sm text-center mt-4">
          Already have an account? <a href="/login" className="text-pink-500">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;