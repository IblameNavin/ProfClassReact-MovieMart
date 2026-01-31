import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import MovieContext from '../context/MovieContext'

const MovieDetails = ({ user }) => {
  const { movie, setMovie } = useContext(MovieContext)
   const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true)
        setMovie(null)

        const res = await axios(
          `https://api.themoviedb.org/3/movie/${id}?api_key=80d491707d8cf7b38aa19c7ccab0952f`
        )

        setMovie(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [id, setLoading, setMovie])

  if (loading || !movie) {
    return <div>loading...</div>
  }

  return (
    <div className="p-4 rounded max-w-md w-full">
      <MovieCard
        movie={movie}
        showBtns={false}
        isDescrip={true}
        user={user}
      />
    </div>
  )
}

export default MovieDetails
