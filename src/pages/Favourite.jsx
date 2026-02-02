import React, { useContext, useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { toast } from 'react-toastify';
import MovieContext from '../context/MovieContext';
import { useNavigate } from 'react-router-dom';
import { getUserFavorites, removeFromFavorites } from '../utils/favorites';

export const Favourite = ({ user }) => {
  
 const navigate = useNavigate()
  const { movieItems, setMovieItems, IMAGE_BASE_URL } = useContext(MovieContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!user?.uid) {
        setMovieItems([]);
        setLoading(false);
        return;
      }
      
      try {
        const favorites = await getUserFavorites(user.uid);
        setMovieItems(favorites);
      } catch (e) {
        setMovieItems([]);
        console.error('Error loading favorites:', e);
      } finally {
        setLoading(false);
      }
    };
    
    loadFavorites();
  }, [user, setMovieItems]);

  const handleRemove = async (id) => {
    if (!user?.uid) return;
    
    try {
      const success = await removeFromFavorites(id, user.uid);
      if (success) {
        const updatedMovie = movieItems.filter(item => item?.id !== id);
        setMovieItems(updatedMovie);
        toast.success('Item removed from favourites', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('Failed to remove item');
      }
    } catch (error) {
      toast.error('Error removing item');
      console.error('Error removing favorite:', error);
    }
  };

 

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading favorites...</div>
      </div>
    );
  }

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {movieItems.length === 0 ? (
        <div className="col-span-full text-center py-20">
          <p className="text-xl text-gray-500">Your favourites list is empty.</p>
          <Button onClick={() => navigate("/movies")} className="mt-4">
            Browse Movies
          </Button>
        </div>
      ) : (
        movieItems.map((item) => (
          <div
            // eslint-disable-next-line react-hooks/purity
            key={item?.id || Math.random()}
            className="flex flex-col border rounded p-4 w-full shadow-sm"
          >
           
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
