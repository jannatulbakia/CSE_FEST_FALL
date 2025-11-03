import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <RouterProvider router={router}/>
      <ToastContainer/>
    </>
  )
}

export default App
