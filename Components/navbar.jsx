import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <div className="text-pink-500 text-xl font-bold">coek</div>
      <div className="flex gap-6 items-center">
        <Link to="/home" className="font-medium">HOME</Link>
        <Link to="/favorites" className="font-medium">FAVOURITE</Link>
        <button onClick={handleLogout} className="text-gray-500" title="Logout">
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
