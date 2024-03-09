import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const { token } = useSelector(state => state.auth);

  return (
    token ? <Outlet/> : <Navigate to='/signup'/>
  )
}

export default PrivateRoute
