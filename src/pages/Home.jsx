import React from "react";
import { Link } from "react-router-dom";
import { Button } from '../components/Button';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8 text-center">
      <h1 className="text-5xl font-bold mb-4">Welcome to Movies Mart </h1>
      <p className="text-gray-700 text-lg mb-6">
        Your one-stop destination to explore and enjoy movies.
      </p>
      <div className="flex gap-4">
        <Link
          to="/movies"
        >
          <Button varaint = "primary" >Browse Movies</Button>
        </Link>
        <Link
          to="/favourite"
        >
          <Button variant = "outline">Show Favourites</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
