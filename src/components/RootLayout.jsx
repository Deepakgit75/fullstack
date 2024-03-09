import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Navbar'

const RootLayout = () => {
  return (
    <div>
        <Navbar/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default RootLayout
