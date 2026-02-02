import React from 'react'
import { Navigate } from 'react-router-dom'
import { isTokenValid } from '../utils/token'

export const ProtectedRoute = ({user, children, loading}) => {
    if(loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      )
    }
    
    // Check both user state and token validity
    if(!user || !isTokenValid()){
      return <Navigate to = "/login" replace/>
    }
    
    return children
}
