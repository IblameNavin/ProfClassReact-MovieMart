export const addToCart = (movie, user) => {
  if (!user) return null; // return null if no user

  const movieKey = `movie_${user.email}`;
  const movies = JSON.parse(localStorage.getItem(movieKey)) || [];

  // Check if movie already exists
  const movieExists = movies.find(item => item.id === movie.id);

  let updatedMovies;
  if (!movieExists) {
    updatedMovies = [...movies, movie]; // just add the movie
    localStorage.setItem(movieKey, JSON.stringify(updatedMovies));
    return `${movie.title} added to favorites!`;
  }

  return null; // movie already exists, do nothing
};
