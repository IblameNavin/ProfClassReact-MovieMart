import {useState} from 'react'
import { Button } from '../components/Button'
import { useNavigate } from 'react-router-dom';

const SignUp = ({setUser}) => {
   const navigate = useNavigate()
    const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e)=>{
    e.preventDefault()
    
    const users = JSON.parse(localStorage.getItem("users")) || []
  const userExists = users.some((e)=>
  e.email === email
  )

  if(userExists){
    return alert("User already exists")
  }

  const newUser = {name, email, password}
  const updatedUser = [...users, newUser]
  localStorage.setItem("users",JSON.stringify(updatedUser))
  localStorage.setItem("currentUser",JSON.stringify(newUser))
  setUser(newUser)
  navigate("/movies")

}

  return (
    <div className='flex flex-col max-w-112.5 m-auto mt-20 gap-5 '>
      <h1 className='text-3xl text-blue-600 font-bold'>SignUp</h1>
      <form className='flex flex-col gap-10' onSubmit={handleSubmit}>
        <div className='relative'>
          <label htmlFor="name" className='absolute -mt-3 ml-3 bg-white z-10'>Name: </label>
        <input type="text" placeholder='Enter your name' className='border p-3 rounded relative z-0 w-full' value={name} onChange={(e)=>setName(e.target.value)} />
        </div>

       <div className='relative'>
         <label htmlFor="email" className='absolute -mt-3 ml-3 bg-white z-10'>Email: </label>
        <input type="email" placeholder='Enter your email' className='border p-3 rounded relative z-0 w-full'  value={email} onChange={(e)=>setEmail(e.target.value)}/>
       </div>

       <div className='relative'>
         <label htmlFor="password" className='absolute -mt-3 ml-3 bg-white z-10'>Password: </label>
        <input type="password" placeholder='Enter your password' className='border p-3 rounded relative z-0 w-full' value={password} onChange={(e)=>setPassword(e.target.value)}/>
       </div>
       
      <div>
      <Button type="submit" >Submit</Button>
      </div>
      </form>

    </div>
  )
}

export default SignUp
