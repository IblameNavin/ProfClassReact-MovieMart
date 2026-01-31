import React, { useContext, useEffect, useState} from "react";
import MovieCard from "../components/MovieCard";
import SkeletonGrid from "../components/SkeletonGrid";
import axios from "axios";
import MovieContext from "../context/MovieContext";

const Movies = ({ user }) => {
 
  const { data, setData} = useContext(MovieContext)
   const [loading, setLoading] = useState(true)
   

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios("https://api.themoviedb.org/3/discover/movie?api_key=80d491707d8cf7b38aa19c7ccab0952f");
        setData(res.data.results);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <SkeletonGrid />;

  return (
    <div className="p-8 grid grid-cols-4 gap-10">
      {data.map((movie) => (
        <MovieCard key={movie.id} movie={movie} user={user} />
      ))}
    </div>
  );
};

export default Movies;
