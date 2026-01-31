import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="flex justify-around items-center border p-5 bg-white shadow-sm">
      <div>
        <h1 className="text-2xl font-bold">Movies Mart</h1>
      </div>
      <ul className="flex gap-5">
        <li>
          <Link
            to="/"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/movies"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Movies
          </Link>
        </li>
        <li>
          <Link
            to="/favourite"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Favourites
          </Link>
        </li>
        {user ? (
          <li>
            <button
              onClick={handleLogout}
              className="cursor-pointer px-3 py-1 rounded hover:bg-red-200 transition-colors duration-200"
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="hover:text-blue-400 transition-colors duration-200"
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
