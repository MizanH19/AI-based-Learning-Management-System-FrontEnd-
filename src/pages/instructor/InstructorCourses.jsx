import { useNavigate } from "react-router-dom"
import Navbar from "../../components/common/Navbar";
import { useEffect, useState } from "react";
import { getInstructorCourses } from "../../api/instructor.api";


const InstructorCourses=()=>{
     const navigate = useNavigate();
     const [courses,setCourses]=useState([])
     const [loading,setLoading]=useState(true);
//      //? Mock Data
//        const courses = [
//     {
//       id: "1",
//       title: "Full Stack Web Development",
//       description: "Learn MERN stack from scratch",
//       lessonsCount: 12,
//       studentsCount: 58,
//     },
//     {
//       id: "2",
//       title: "JavaScript Mastery",
//       description: "Deep dive into modern JavaScript",
//       lessonsCount: 8,
//       studentsCount: 34,
//     },
//   ];


     useEffect(()=>{
          const loadCourses=async()=>{
               try{
                    const data =await getInstructorCourses();
                    console.log(data);
                    setCourses(data)
                    console.log(courses);
                    console.log(courses.length);
                    
                    
                    // setCourses(data);
               }catch(err){
                    console.error("Failed to load instructor courses",err);
               }finally{
                    setLoading(false);
               }
          }

          loadCourses();
     },[]);

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
               {loading?(<p className="text-center text-gray-500"> Loading courses...</p>
               ):
        
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
                                        navigate(`/instructor/course/${course._id}/progress`)
                                        }
                                        className="bg-indigo-600 text-white
                                        px-4 py-2 rounded text-sm
                                        hover:bg-indigo-700 transition"
                                   >
                                        View Progress
                                   </button>

                                   <button
                                        className="border border-indigo-600 text-indigo-600
                                        px-4 py-2 rounded text-sm
                                        hover:bg-indigo-50 transition"
                                        onClick={() =>
                                             navigate(`/instructor/course/${course._id}/lesson`)
                                        }
                                   >
                                        Add Lesson
                                   </button>

                                   <button
                                        className="border text-gray-600
                                        px-4 py-2 rounded text-sm
                                        hover:bg-gray-100 transition"
                                        onClick={() =>
                                           navigate(`/instructor/course/${course._id}/students`)
                                        }
                                   >
                                        View Students
                                   </button>
                                   </div>
                              </div>
                         ))}
                    </div>
               }
          </div>
     </div>
  )

}

  export default InstructorCourses;