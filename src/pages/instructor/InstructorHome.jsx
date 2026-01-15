// import Navbar from "../../components/common/Navbar";


const InstructorHome=()=>{
     return(
          <div className="min-h-screen bg-gray-50 pt-16">
               {/* <Navbar/> */}

               {/* //*Header */}

               <div className="mx-6 mt-6 rounded-2xl 
               bg-gradient-to-r from-indigo-600 via-purple-600 to pink-500
               text-white p-8 shadow-2xl">
                    <h1 className="text-3xl font-extrabold">
                         Instructor Dashboard
                    </h1>

                    <p className="opacity-90 mt-2">
                         Create courses • Manage students • Track progress
                    </p>
               </div>

               {/* //*Content */ }
               
               <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">

                    {/* //*Stats */}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                         {/* //*courses */}

                         <div className="group bg-white rounded-2xl border p-6
                         hover:-translate-y-1 hover:shadow-2xl
                         transition-all duration-300">
                              <p className="text-sm text-gray-500">Your Courses</p>
                              <p className="text-3xl font-bold mt-2">—</p>
                              <p className="text-xs text-gray-400 mt-1">
                                   Courses you created
                              </p>
                         </div>

                         {/* //*Students */}

                         <div className="group bg-white rounded-2xl border p-6
                         hover:-translate-y-1 hover:shadow-2xl
                         transition-all duration-300">
                              <p className="text-sm text-gray-500">Enrolled Students</p>
                              <p className="text-3xl font-bold mt-2">—</p>
                              <p className="text-xs text-gray-400 mt-1">
                                   Across all courses
                              </p>
                         </div>

                         {/* //*Progress */}

                         <div className="group bg-white rounded-2xl border p-6
                         hover:-translate-y-1 hover:shadow-2xl
                         transition-all duration-300">
                              <p className="text-sm text-gray-500">Avg Completion</p>
                              <p className="text-3xl font-bold mt-2">—%</p>
                              <p className="text-xs text-gray-400 mt-1">
                                   Student progress
                              </p>
                         </div>

                         {/* //*Empty State */}

                         <div className="bg-white border rounded-2xl p-10 text-center
                         shadow-sm">
                              <h2 className="text-xl font-semibold text-gray-800">
                                   You haven't created any courses yet
                              </h2>
                              <p className="text-gray-500 mt-2">
                                   Start by creating your first course and adding lessons.
                              </p>

                              <button className="mt-6 px-6 py-3 rounded-lg
                              bg-indigo-600 text-white font-medium
                              hover:bg-indigo-700 transition">
                                   Create Course
                              </button>
                         </div>
                    </div>
               </div>

          </div>
     )
}

export default InstructorHome;