import { useContext, useState } from "react"; // 🔹 CHANGE (added useState)
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [openProfile, setOpenProfile] = useState(false);

  const isActive = (path) =>
    location.pathname.startsWith(path)
      ? "text-indigo-600 font-semibold"
      : "hover:text-black";

  const handleSearch = (e) => {
    e.preventDefault();
    // UI-only for now
    console.log("Search:", searchQuery);
  };

  return (
    <nav className="bg-white border-b px-6 py-3 flex items-center justify-between relative z-50">
      
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

          {/* SEARCH */}
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1 border w-85 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </form>

          {/* LINKS */}
          <span
            className={`cursor-pointer ${isActive("/student/my-courses")}`}
            onClick={() => navigate("/student/my-courses")}
          >
            My Courses
          </span>

          <span
            className={`cursor-pointer ${isActive("/student/courses")}`}
            onClick={() => navigate("/student/courses")}
          >
            Browse
          </span>

          {/* FAVORITES */}
          <span
            className="cursor-pointer hover:text-red-500"
            title="Favourites"
            onClick={() => navigate("/student/favourites")}
          >
            ❤️
          </span>

          {/* PROFILE DROPDOWN */}
          <div className="relative">
            <div
              onClick={() => setOpenProfile(!openProfile)}
              className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center cursor-pointer font-medium"
            >
              {auth?.name?.charAt(0)?.toUpperCase() || "S"}
            </div>

            {openProfile && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
                <div
                  onClick={() => {
                    navigate("/student/profile");
                    setOpenProfile(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  My Profile
                </div>

                <div
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ADMIN NAVBAR (UNCHANGED) */}
      {auth?.role === "admin" && (
        <div className="flex items-center gap-6 text-sm text-gray-700">
          <span
            className={`cursor-pointer ${isActive("/admin")}`}
            onClick={() => navigate("/admin")}
          >
            Dashboard
          </span>

          <span
            className={`cursor-pointer ${isActive("/admin/courses")}`}
            onClick={() => navigate("/admin/courses")}
          >
            Courses
          </span>

          <span
            className={`cursor-pointer ${isActive("/admin/users")}`}
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
