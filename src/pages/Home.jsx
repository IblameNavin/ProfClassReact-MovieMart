import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 text-center">
      <h1 className="text-5xl font-bold mb-4">Welcome to MovieHub </h1>
      <p className="text-gray-700 text-lg mb-6">
        Your one-stop destination to explore and enjoy movies.
      </p>
      <div className="flex gap-4">
        <Link
          to="/movies"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Browse Movies
        </Link>
        <Link
          to="/favourite"
          className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
        >
          Your Favourites
        </Link>
      </div>
    </div>
  );
};

export default Home;
