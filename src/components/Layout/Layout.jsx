import React from 'react'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import  { Toaster } from 'react-hot-toast';

export default function Layout() {
  return (

    <>

      <NavBar />
      <Outlet />
      <Toaster />
      
    </>
  )
}
