import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="flex justify-around items-center border-b p-5 bg-white shadow-sm">
      <div>
        <Link to="/">
          <h1 className="text-2xl font-bold text-blue-600">Movies Mart</h1>
        </Link>
      </div>
      <ul className="flex gap-5 items-center">
        <li>
          <Link
            to="/"
            className="hover:text-blue-400 transition-colors duration-200 font-medium"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/movies"
            className="hover:text-blue-400 transition-colors duration-200 font-medium"
          >
            Movies
          </Link>
        </li>
        <li>
          <Link
            to="/favourite"
            className="hover:text-blue-400 transition-colors duration-200 font-medium"
          >
            Favourites
          </Link>
        </li>
        {user ? (
          <>
            <li className="flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-lg">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName} 
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                  {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-sm font-medium text-gray-700">
                {user.displayName || user.email}
              </span>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="cursor-pointer px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 font-medium"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="hover:text-blue-400 transition-colors duration-200 font-medium"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                SignUp
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
