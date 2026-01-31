export const addToCart = (movie, user) => {
  if (!user) return null; // return null if no user

  const movieKey = `movie_${user.email}`;
  const movies = JSON.parse(localStorage.getItem(movieKey)) || [];

  const movieExists = movies.find(item => item.id === movie.id);

  let updatedMovie;
  if(movieExists){
    updatedMovie = movies.map(item =>
      item.id === movie.id ? {...item, quantity: item.quantity + 1} : item
    );
  } else {
    updatedMovie = [...movies, {...movie, quantity: 1}];
  }

  localStorage.setItem(movieKey, JSON.stringify(updatedMovie));
  return `${movie.title} added to cart!`; // just return message
};
