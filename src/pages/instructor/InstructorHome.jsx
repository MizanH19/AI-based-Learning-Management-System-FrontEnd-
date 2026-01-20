import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { useEffect, useState } from "react";
import { getInstructorCourses } from "../../api/instructor.api";

const InstructorHome = () => {
  const navigate = useNavigate();

  const [coursesCount, setCoursesCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const courses = await getInstructorCourses();

        setCoursesCount(courses.length);

        // sum students from each course
        const total = courses.reduce(
          (sum, c) => sum + (c.totalStudents || 0),
          0
        );

        setStudentsCount(total);
      } catch (err) {
        console.error("Instructor dashboard load failed", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Navbar />

      {/* HEADER */}
      <div className="mx-6 mt-6 rounded-2xl 
        bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500
        text-white p-8 shadow-2xl">
        <h1 className="text-3xl font-extrabold">
          Instructor Dashboard
        </h1>
        <p className="opacity-90 mt-2">
          Create courses • Manage students • Track progress
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* COURSES */}
          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <p className="text-sm text-gray-500">Your Courses</p>
            <p className="text-3xl font-bold mt-2">
              {loading ? "—" : coursesCount}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Courses you created
            </p>
          </div>

          {/* STUDENTS */}
          <div className="bg-white rounded-2xl border p-6 shadow-sm">
            <p className="text-sm text-gray-500">Enrolled Students</p>
            <p className="text-3xl font-bold mt-2">
              {loading ? "—" : studentsCount}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Across all courses
            </p>
          </div>

          {/* PROGRESS (future-ready) */}
          {/* <div className="bg-white rounded-2xl border p-6 shadow-sm"> */}
            {/* <p className="text-sm text-gray-500">Avg Completion</p>
            <p className="text-3xl font-bold mt-2">—%</p>
            <p className="text-xs text-gray-400 mt-1">
              Student progress
            </p> */}
            
          {/* </div> */}

          {/* EMPTY STATE */}
          {!loading && coursesCount === 0 && (
            <div className="bg-white border rounded-2xl p-10 text-center shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800">
                You haven't created any courses yet
              </h2>
              <p className="text-gray-500 mt-2">
                Start by creating your first course
              </p>

              <button
                className="mt-6 px-6 py-3 rounded-lg
                bg-indigo-600 text-white font-medium
                hover:bg-indigo-700 transition"
                onClick={() => navigate("/instructor/courses/create")}
              >
                Create Course
              </button>
            </div>
          )}

        </div>
      </div>
      <div className="flex justify-center ">
          <button
                className="mt-6 px-12 py-6 rounded-lg
                bg-indigo-600 text-white font-medium
                hover:bg-indigo-700 transition "
                onClick={() => navigate("/instructor/courses/create")}
              >
                Create Course
              </button>
     </div>
      
    </div>
  );
};

export default InstructorHome;
