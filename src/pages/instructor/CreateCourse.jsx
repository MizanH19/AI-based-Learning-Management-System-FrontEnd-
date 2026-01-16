import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/common/Navbar';

const CreateCourse = () => {
     const navigate= useNavigate();
     const [title,setTitle]=useState("");
     const [description,setDescription]=useState("")
     const [loading,setLoading]=useState(false);

     const handleCreate=async(e)=>{
          e.preventDefault();
          
          if (!title.trim()||!description.trim()) {
               alert("Please fill all fields")
               return;
          }

          try {
               setLoading(true)

               //*Backend will come here later
               console.log("Course Created:",{title,description});

               //*simulate delay
               setTimeout(()=>{
                    alert("Course created successfully!!");
                    navigate("/instructor/courses")
               },800);
          } catch (error) {
               alert("Failed to create course")
          }
          finally{
               setLoading(false)
          }
     };
  return (
    <div className='min-h-screen bg-gray-50 pt-16'>
     <Navbar/>

     {/* //*Hero */}
     <div className='mx-6 mt-6 rounded-2xl
     bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 
     text-white p-10 shadow-2xl'>
          <h1 className='text-4xl font-extrabold'>
               Create a New Course
          </h1>

          <p className='opacity-90 mt-2 max-w-xl'>
               Build structured learning with videos, PDFs, Quizzes and AI support
          </p>
     </div>

     {/* //*Form */}
     <div className='max-w-3xl mx-auto px-6 py-12'>
          <form onSubmit={handleCreate}
          className='bg-white rounded-2xl border
          p-8 space-y-6 shadow-sm'>
               <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                         Course Title
                    </label>
                    <input type="text" placeholder='e.g. Full Stack Web Development' 
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                    className='w-full border rounded-lg px-4 py-3 focus:ring-2
                    focus:ring-indigo-500 focus:outline-none' />
               </div>

               {/* //*Description */}
               <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                         Course Description
                    </label>
                    <textarea 
                    placeholder='What will students learn from this course?'
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    rows={4}
                    className='w-full border rounded-lg px-4 py-3
                    focus:ring-2 focus:ring-indigo-500 focus:outline-none'/>
               </div>

               {/* //*Info Box */}

               <div className='bg-indigo-50 border border-indigo-200 p-4
               rounded-lg text-sm text-indigo-700'>
                    📌 After creating a course, you can add:
                    <ul className='list-disc ml-5 mt-2'>
                         <li>Video Lessons</li>
                         <li>PDF resources</li>
                         <li>AI-generated quizzes</li>
                    </ul>
               </div>

               {/* //*Actions */}
               <div className='flex gap-4'>
                    <button
                    type="submit"
                    disabled={loading}
                    className="bg-indigo-600 text-white
                    px-6 py-3 rounded-lg font-medium
                    hover:bg-indigo-700 transition
                    active:scale-95 disabled:opacity-60"
                    >
                    {loading ? "Creating..." : "Create Course"}
                    </button>

                    <button
                    type="button"
                    onClick={() => navigate("/instructor/courses")}
                    className="border border-gray-300
                    px-6 py-3 rounded-lg text-gray-600
                    hover:bg-gray-100 transition"
                    >
                    Cancel
                    </button>
               </div>
          </form>
     </div>
    </div>
  )
}

export default CreateCourse
