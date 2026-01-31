import { Button } from "./Button";
import { Link } from "react-router-dom";
import { addToCart } from "../data/AddCart";
import { toast } from "react-toastify";
import { useContext } from "react";
import MovieContext from "../context/MovieContext";



const MovieCard = ({ movie, showBtns = true, isDescrip = false, user }) => {

  const { IMAGE_BASE_URL } = useContext(MovieContext)

  if (!movie) return null; // stop pretending this never happens

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const message = addToCart(movie, user);
      if (message) toast.success(message);
      else if (user) toast.success("Added to cart!");
    } catch {
      toast.success("Added to cart!");
    }
  };

  return (
    <div className="border p-4 rounded">
      <img
        src={
          movie.poster_path
            ? `${IMAGE_BASE_URL}${movie.poster_path}`
            : "/placeholder.png"
        }
        alt={movie.original_title || "Movie poster"}
        className="h-60 w-full object-cover"
      />

      <div className="flex justify-between mt-3 text-sm">
        <p className="font-md text-[17px]">
          {movie.original_title
            ? movie.original_title.slice(0, 20)
            : "Untitled"}
          {movie.original_title?.length > 20 && "..."}
        </p>
      </div>

      {isDescrip && <p>Description: {movie.overview || "No description."}</p>}

      <p className="text-sm text-gray-600 mt-2">
        ⭐ {movie.vote_average ?? "N/A"}
      </p>

      <div className="mt-4 flex justify-between">
        {showBtns && (
          <>
            <Link to={`/movies/${movie.id}`}>
              <Button variant="outline">View Details</Button>
            </Link>
            <Button type="button" onClick={handleAddToCart}>
              Add to cart
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
