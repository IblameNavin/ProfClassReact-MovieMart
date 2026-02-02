import { addToFavorites } from '../utils/favorites';

export const addToFav = async (movie, user) => {
  if (!user || !user.uid) return null; 

  const result = await addToFavorites(movie, user.uid);
  return result;
};
