import React from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({user, children, loading}) => {
    if(loading) return <div>loading...</div>
 if(!user){
    return <Navigate to = "/login" replace/>
 }
 else{
    return children
 }
}
