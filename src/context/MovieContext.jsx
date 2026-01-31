import React, { createContext, useState } from "react";

const MovieContext = createContext();

export const MovieContextProvider = ({ children }) => {
  const [movieItems, setMovieItems] = useState([]);
  const [movie, setMovie] = useState(null)
   
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null)
    
    const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
    

  return (
    <MovieContext.Provider value={{ movieItems, setMovieItems, movie, setMovie, data, setData, user, setUser, IMAGE_BASE_URL }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContext;
