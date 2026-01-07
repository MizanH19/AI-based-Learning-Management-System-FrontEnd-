import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b px-6 py-3 flex items-center justify-between">
      
      {/* LOGO */}
      <div
        className="text-xl font-semibold tracking-tight cursor-pointer"
        onClick={() =>
          navigate(auth?.role === "admin" ? "/admin" : "/student")
        }
      >
        Core<span className="text-indigo-600">Learn</span>
      </div>

      {/* STUDENT NAVBAR */}
      {auth?.role === "student" && (
        <div className="flex items-center gap-6 text-sm text-gray-700">
          
          <span
            className="cursor-pointer hover:text-black"
            onClick={() => navigate("/student/my-courses")}
          >
            My Courses
          </span>

          <span
            className="cursor-pointer hover:text-black"
            onClick={() => navigate("/student/courses")}
          >
            Browse
          </span>

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

      {/* ADMIN NAVBAR */}
      {/* ADMIN NAVBAR */}
      {auth?.role === "admin" && (
        <div className="flex items-center gap-6 text-sm text-gray-700">
          
          <span
            className="cursor-pointer hover:text-black"
            onClick={() => navigate("/admin")}
          >
            Dashboard
          </span>

          <span
            className="cursor-pointer hover:text-black"
            onClick={() => navigate("/admin/courses")}
          >
            Courses
          </span>

          <span
            className="cursor-pointer hover:text-black"
            onClick={() => navigate("/admin/users")}
          >
            Users
          </span>

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
