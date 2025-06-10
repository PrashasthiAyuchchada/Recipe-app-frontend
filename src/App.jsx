// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from '../Auth Pages/login';
import Register from '../Auth Pages/register';
import Home from '../Main Pages/home';
import Dashboard from '../Main Pages/dashBoard';
import Favorites from '../Main Pages/favourite';
import Navbar from '../Components/navbar';

const App = () => {
  const isAuthenticated = false; // Replace with real auth check

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/favorites" element={isAuthenticated ? <Favorites /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
