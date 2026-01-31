import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({user, setUser}) => {
  const navigate = useNavigate()
  const handleLogout = ()=>{
      localStorage.removeItem("currentUser")
      setUser(null)
      navigate("/login")
  }
  return (
    <div className='flex justify-around items-center border p-5'>
        <div>
            <h1 className='text-2xl'>Games Mart</h1>
        </div>
            <ul className='flex gap-5 '>
                <li><Link to = "/" > Home </Link></li>
                <li><Link to = "/movies" > Movies </Link></li>
                <li><Link to = "/favourite" > Favourites </Link></li>
                {user ? (
                  <li><button onClick={handleLogout} className='cursor-pointer'>Logout</button></li>
                ) : (
                  <>
                    <li><Link to = "/login" > Login </Link></li>
                    <li><Link to = "/signup" > SignUp </Link></li>
                  </>
                )}
            </ul>
    </div>
  )
}

export default Navbar



