import { Button } from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { addToFav } from "../data/AddToFav";
import { toast } from "react-toastify";
import { useContext } from "react";
import MovieContext from "../context/MovieContext";



const MovieCard = ({ movie, showBtns = true, isDescrip = false, user, showBack = false }) => {

  const { IMAGE_BASE_URL } = useContext(MovieContext)

  const navigate = useNavigate()

  if (!movie) return null; 

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please login to add favorites");
      return;
    }

    try {
      const message = await addToFav(movie, user);
      if (message) {
        toast.success(message);
      } else {
        toast.info("Movie already in favorites!");
      }
    } catch (error) {
      toast.error("Failed to add to favorites");
      console.error("Error adding to favorites:", error);
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
        {showBack && 
        <Button variant='primary' className = "my-4" onClick={()=>navigate("/movies")} >Back</Button>
        }
      </div>
    </div>
  );
};

export default MovieCard;
