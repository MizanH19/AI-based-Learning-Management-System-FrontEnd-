import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // TEMP: enrolled courses (will come from GET /enrollments/my)
  const enrolledCourses = [
    { id: "2", title: "React for Beginners" },
    { id: "1", title: "JavaScript Fundamentals" }
  ];

  return (
    <nav className="bg-white border-b px-6 py-3 flex items-center justify-between">
      
      {/* Logo */}
      <div
        className="text-xl font-semibold tracking-tight cursor-pointer"
        onClick={() => navigate(auth?.role === "student" ? "/student" : "/admin")}
      >
        Core<span className="text-indigo-600">Learn</span>
      </div>

      {/* STUDENT NAVBAR */}
      {auth?.role === "student" && (
        <div className="flex items-center gap-6 text-sm text-gray-700 relative">
          
          {/* My Courses Dropdown */}
          <span
            className="cursor-pointer hover:text-black"
            onClick={() => navigate("/student/courses")}
          >
            My Courses
          </span>
          <div className="relative">
            <span
              className="cursor-pointer hover:text-black"
              onClick={() => setOpen(!open)}
            >
              Browse
            </span>

            {open && (
              <div className="absolute top-8 left-0 bg-white border rounded shadow w-56 z-50">
                {enrolledCourses.length === 0 ? (
                  <p className="p-3 text-gray-500 text-sm">
                    No enrolled courses
                  </p>
                ) : (
                  enrolledCourses.map(course => (
                    <div
                      key={course.id}
                      className="p-3 hover:bg-gray-100 cursor-pointer"
                      onClick={() =>
                        navigate(`/student/course/${course.id}`)
                      }
                    >
                      {course.title}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Browse */}
          

          {/* Logout */}
          <span
            className="cursor-pointer text-red-500"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </span>
        </div>
      )}

      {/* ADMIN NAVBAR (kept simple) */}
      {auth?.role === "admin" && (
        <div className="flex gap-6 text-sm">
          <span onClick={() => navigate("/admin")} className="cursor-pointer">
            Dashboard
          </span>
          <span className="cursor-pointer">Courses</span>
          <span className="cursor-pointer">Users</span>
          <span
            className="cursor-pointer text-red-500"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            Logout
          </span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
