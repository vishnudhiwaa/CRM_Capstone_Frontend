
import React from 'react'
import { useLocation, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RoutePermission = ({ allowedRoles }) => {
    
    const user = useSelector(state => state.userInfo.user_data)
    // const role = localStorage.getItem('role')
    // const email = localStorage.getItem('email')
    const location = useLocation();
    const navigate = useNavigate()

  return (
     allowedRoles.includes(user.role)
     ? <Outlet />
     : user.email
        ?  navigate('/unauthorized') 
        : <Navigate to="/" state={{from: location}} replace />
  )
}

export default RoutePermission 
