import React, { useContext, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import Games from './pages/Movies'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Navbar from './components/Navbar'
import { ProtectedRoute } from './auth/ProtectedRoute'
import { Favourite } from './pages/Favourite'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MovieDetails from './pages/MovieDetails'
import MovieContext from './context/MovieContext'

const App = () => {
  

  const { user, setUser } = useContext(MovieContext)
   const [loading, setLoading] = useState(true)

  useEffect(() => {
   const storedUser = (localStorage.getItem("currentUser"))
  if(storedUser) {
   
    setUser(JSON.parse(storedUser))
  }
  setLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

    
  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <ToastContainer position="top-right" autoClose={2000} style={{ zIndex: 9999 }} />
    <Routes>
     <Route path = "/" element = {<Home/>} />
     <Route path = "/movies" element ={<ProtectedRoute user = {user} loading = {loading}  ><Games user={user} /></ProtectedRoute>}/>
     
     <Route path = "/movies/:id" element = {<MovieDetails user = {user} />} />
     <Route path = "/favourite" element = {<ProtectedRoute user = {user} loading = {loading}><Favourite user={user} /></ProtectedRoute>} />
     <Route path = "/login" element = {<Login setUser = {setUser} />} />
     <Route path = "/signup" element = {<SignUp setUser = {setUser}/>} />
    </Routes>
    </>
  )
}

export default App
