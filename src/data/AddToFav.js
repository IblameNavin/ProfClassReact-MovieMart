export const addToFav = (movie, user) => {
  if (!user) return null; 

  const movieKey = `movie_${user.email}`;
  const movies = JSON.parse(localStorage.getItem(movieKey)) || [];

  const movieExists = movies.find(item => item.id === movie.id);

  let updatedMovies;
  if (!movieExists) {
    updatedMovies = [...movies, movie]; 
    localStorage.setItem(movieKey, JSON.stringify(updatedMovies));
    return `${movie.title} added to favorites!`;
  }

  return null; 
};
