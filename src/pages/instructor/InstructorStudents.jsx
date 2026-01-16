import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/common/Navbar';

const InstructorStudents = () => {
         const navigate=useNavigate();

     const students = [
     {
          id: "s1",
          name: "Rahul Sharma",
          email: "rahul@gmail.com",
          progress: 65,
          status: "active",
     },
     {
          id: "s2",
          name: "Anjali Verma",
          email: "anjali@gmail.com",
          progress: 30,
          status: "restricted",
     },
     ];
  return (
     <div className='min-h-screen bg-gray-50 pt-16'>
          {/* <Navbar/> */}

          {/* //*Header */}

          <div className='mx-6 mt-6 rounded-2xl
          bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500
          text-white p-8 shadow-xl'>
               <h1 className='text-3xl font-extrabold'>
                    Enrolled Students
               </h1>
               <p className='opacity-90 mt-2'>
                    Track progress & manage access
               </p>
          </div>

          {/* //*Students List  */}

          <div className='max-w-6xl mx-auto px-6 py-12 grid gap-6'>
               {students.map((student)=>(
                    <div 
                    key={student.id}
                    className='bg-white rounded-2xl p-6 border
                    shadow-sm hover:shadow-xl transition-all'
                    >
                         {/* //*Top  */}
                         <div className='flex justify-between items-center'>
                              <div>
                                   <h3 className='text-lg font-semibold text-gray-800'>
                                        {student.name}
                                   </h3>
                                   <p className='text-sm text-gray-500'>
                                        {student.email}
                                   </p>
                              </div>

                              <span
                              className={`px-4 py-1 rounded-full text-xs font-medium
                              ${student.status==='active'
                                   ?'bg-green-100 text-green-700'
                                   :'bg-red-100 text-red-700'
                              }`}>
                                   {student.status.toUpperCase()}
                              </span>
                         </div>

                         {/* //*Progress  */}
                         <div className='mt-4'>
                              <div className='flex-justify-between text-sm text-gray-600 mb-1'>
                                   <span>Progress</span>
                                   <span>{student.progress}%</span>
                              </div>

                              <div className='h-2 bg-gray-200 rounded'>
                                   <div className='h-2 bg-indigo-600 rounded'
                                   style={{width:`${student.progress}%`}} />
                              </div>
                         </div>

                         {/* //*Actions  */}

                         <div className='flex flex-wrap gap-3 mt-6'>
                              <button onClick={()=>navigate(`/instructor/student/${student.id}`)}
                                   className='bg-indigo-600 text-white
                                   px-4 py-2 rounded text-sm hover:bg-indigo-700 transition'>
                                        View Progress
                                   </button>
                                   <button
                                   className='border border-red-500 text-red-600
                                   px-4 py-2 rounded text-sm hover:bg-red-50 transition'>
                                        {student.status==="active"
                                        ? "Restrict Access"
                                        : "Allow Access"}
                                   </button>
                         </div>
                    </div>
               ))}
          </div>
     </div>
  )
}

export default InstructorStudents
