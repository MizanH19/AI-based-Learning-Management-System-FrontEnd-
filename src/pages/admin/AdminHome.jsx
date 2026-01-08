import React from 'react'
import Navbar from '../../components/common/Navbar'
import Footer from "../../components/common/Footer";

function AdminHome() {
  return (
     
    <div className='min-h-screen bg-gray-50'>
     <Navbar/>
     <div className='max-w-6xl mx-auto px-6 py-10'>
          <h1 className='text-2xl font semibold text-gray-800 mb-2'>
               Admin Dashboard</h1>

          <p className='text-gray-500 mb-8'>
               Manage users, courses, analytics, and AI settings</p>

          <div className='grid grid-cols-3 gap-6'>
               <div className='bg-white p-5 rounded-lg border'>
                    <p className='text-sm text-gray-500'>Total Users</p>
                    <p className='text-2xl font-semibold mt-2'>—</p>
               </div>
          
               <div className="bg-white p-5 rounded-lg border">
               <p className="text-sm text-gray-500">Courses</p>
               <p className="text-2xl font-semibold mt-2">—</p>
               </div>

               <div className="bg-white p-5 rounded-lg border">
               <p className="text-sm text-gray-500">AI Usage</p>
               <p className="text-2xl font-semibold mt-2">—</p>
               </div>
          </div>
     </div>
      <Footer/>
    </div>
  )
}

export default AdminHome
