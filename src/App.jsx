import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Login from '../Auth Pages/login';
import Register from '../Auth Pages/register';
import Home from '../Main Pages/home';
import Favorites from '../Main Pages/favourite';
import Navbar from '../Components/navbar';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  // Listen to storage change (optional for multi-tab support)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/favorites" element={isAuthenticated ? <Favorites /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
