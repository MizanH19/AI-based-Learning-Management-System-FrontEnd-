import React from 'react'
import { Link } from 'react-router-dom'

function Notfound() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-50'>
          <h1 className='text-3xl font-semibold text-gray-800 mb-2'>Page not found</h1>
          <p className='text-gray-500 mb-6'>
               The page you are looking for does not exist
          </p>
          <Link to='/login' 
          className='text-indigo-600 hover:underline'>
               Go back to Login
          </Link>
    </div>
  )
}

export default Notfound
