import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="h-[70px] w-full flex justify-center items-center bg-gray-100 shadow">
      <div className="w-[500px] h-full flex items-center justify-evenly text-pink-400 text-xl">
        <Link to="/home">Home</Link>
        <Link to="/favourite">Favourite</Link>
      </div>
    </header>
  );
}
