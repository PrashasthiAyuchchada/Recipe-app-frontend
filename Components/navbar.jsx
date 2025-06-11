import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center px-6 h-20 bg-white shadow-md relative">
      {/* Left - Logo */}
      <div className="text-pink-500 text-2xl font-bold">coek</div>

      {/* Center - Navigation Links */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-10 items-center">
        <Link to="/home" className="font-medium hover:text-pink-500 transition">HOME</Link>
        <Link to="/favorites" className="font-medium hover:text-pink-500 transition">FAVOURITE</Link>
      </div>

      {/* Right - Logout */}
      <div>
        <button onClick={handleLogout} className="text-gray-500" title="Logout">
          <LogOut size={22} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
