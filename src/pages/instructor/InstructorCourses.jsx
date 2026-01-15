import { useNavigate } from "react-router-dom"
import Navbar from "../../components/common/Navbar";

const InstructorCourses=()=>{
     const navigate = useNavigate();

     //? Mock Data
       const courses = [
    {
      id: "1",
      title: "Full Stack Web Development",
      description: "Learn MERN stack from scratch",
      lessonsCount: 12,
      studentsCount: 58,
    },
    {
      id: "2",
      title: "JavaScript Mastery",
      description: "Deep dive into modern JavaScript",
      lessonsCount: 8,
      studentsCount: 34,
    },
  ];

  return(
     <div className="min-h-screen bg-gray-50 pt-16">
          <Navbar/>

          {/* //*Header */}
          <div className="mx-6 mt-6 rounded-2xl 
          bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500
          text-white p-8 shadow-xl">
               <h1 className="text-3xl font-extrabold">
                    Your Courses
               </h1>

               <p className="opacity-90 mt-2">
                    Manage lessons, students, and progress
               </p>
          </div>

          {/* //*Courses */}
          <div className="max-w-7xl mx-auto px-6 py-12">
               {courses.length===0?(
                    <div className="bg-white p-10 rounded-2xl text-center border">
                         <h2 className="text-xl font-semibold text-gray-800">
                              No courses created yet
                         </h2>
                         <p className="text-gray-500 mt-2">
                              Start by creating your first course
                         </p>
                         <button className="mt-6 bg-indigo-600 text-white
                         px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
                              Create Course
                         </button>
                    </div>
               ):(
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {courses.map((course)=>(
                              <div
                              key={course.id} 
                              className="group bg-white rounded-2xl border
                              p-6 shadow-sm hover:shadow-2xl
                              hover:-translate-y-1 transition-all duration-300">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                   {course.title}
                                   </h3>

                                   <p className="text-sm text-gray-500 mt-1">
                                   {course.description}
                                   </p>

                                   {/* STATS */}
                                   <div className="flex gap-6 mt-4 text-sm text-gray-600">
                                   <span>📘 {course.lessonsCount} Lessons</span>
                                   <span>👥 {course.studentsCount} Students</span>
                                   </div>

                                   {/* ACTIONS */}
                                   <div className="flex flex-wrap gap-3 mt-6">
                                   <button
                                        onClick={() =>
                                        navigate(`/instructor/course/${course.id}`)
                                        }
                                        className="bg-indigo-600 text-white
                                        px-4 py-2 rounded text-sm
                                        hover:bg-indigo-700 transition"
                                   >
                                        Manage Course
                                   </button>

                                   <button
                                        className="border border-indigo-600 text-indigo-600
                                        px-4 py-2 rounded text-sm
                                        hover:bg-indigo-50 transition"
                                   >
                                        Add Lesson
                                   </button>

                                   <button
                                        className="border text-gray-600
                                        px-4 py-2 rounded text-sm
                                        hover:bg-gray-100 transition"
                                   >
                                        View Students
                                   </button>
                                   </div>
                              </div>
                         ))}
                    </div>
               )}
          </div>
     </div>
  )
}