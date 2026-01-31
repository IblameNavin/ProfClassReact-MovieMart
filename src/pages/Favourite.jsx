import React, { useContext, useEffect } from 'react';
import { Button } from '../components/Button';
import { toast } from 'react-toastify';
import MovieContext from '../context/MovieContext';
import { useNavigate } from 'react-router-dom';

export const Favourite = ({ user }) => {
  
 const navigate = useNavigate()
  const { movieItems, setMovieItems, IMAGE_BASE_URL } = useContext(MovieContext);

  useEffect(() => {
    if (!user?.email) return;
    const movieKey = `movie_${user.email}`; // must match addToCart
    try {
      const movies = JSON.parse(localStorage.getItem(movieKey)) || [];
      setMovieItems(movies);
    } catch (e) {
      setMovieItems([]);
      console.log(e);
    }
  }, [user, setMovieItems]);

  const updateMovie = (updatedMovie, message) => {
    setMovieItems(updatedMovie);
    localStorage.setItem(`movie_${user.email}`, JSON.stringify(updatedMovie)); // fixed
    toast.success(message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleRemove = (id) => {
    const updatedMovie = movieItems.filter(item => item?.id !== id);
    updateMovie(updatedMovie, 'Item removed from favourites');
  };

 

  return (
    <div className="p-10 grid grid-cols-4 gap-4">
      {movieItems.length === 0 ? (
        <p className="col-span-4 text-center">Your favourites list is empty.</p>
      ) : (
        movieItems.map((item) => (
          <div
            // eslint-disable-next-line react-hooks/purity
            key={item?.id || Math.random()}
            className="flex flex-col border rounded p-4 w-full shadow-sm"
          >
            {/* Image placeholder */}
            <div className="h-60 w-full bg-gray-200 mb-3 flex items-center justify-center">
              {item?.poster_path ? (
                 <img
        src={
          item.poster_path
            ? `${IMAGE_BASE_URL}${item.poster_path}`
            : "/placeholder.png"
        }
        alt={item.original_title || "Movie poster"}
        className="h-60 w-full object-cover"
      />
              ) : (
                <span>No Image</span>
              )}
            </div>

            <div className="flex justify-between items-center mb-2">
              <p className="font-medium text-lg">
                {(item?.original_title || item?.title || "Unknown").slice(0, 20)}...
              </p>
            </div>
            <p className="text-gray-800 font-semibold mb-3">
              Vote Average: {item?.vote_average ?? 'N/A'}
            </p>

            <div className="flex justify-around gap-4">
              <Button varint = "outline" onClick={()=>navigate("/movies")}>Back</Button>
              <Button variant="danger" onClick={() => handleRemove(item?.id)}>Remove</Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
