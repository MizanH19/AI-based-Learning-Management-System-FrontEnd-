import { useContext, useState,useEffect } from "react"; // 🔹 CHANGE (added useState)
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

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
  const scrollToSection = (id) => {
  if (location.pathname === "/student") {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } else {
    navigate("/student", { replace: false, state: { scrollTo: id } });
  }
};
useEffect(() => {
  if (location.state && location.state.scrollTo) {
    const el = document.getElementById(location.state.scrollTo);
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState({}, document.title);
      });
    }
  }
}, [location.state]);


const [showNavbar, setShowNavbar] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setShowNavbar(false); // scrolling down
    } else {
      setShowNavbar(true); // scrolling up
    }
    setLastScrollY(window.scrollY);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [lastScrollY]);




  return (
    <>
    <nav className={`bg-white h- border-b px-10 py-6 flex items-center justify-between fixed top-0 left-0 w-full z-50
    bg-white border-b
    transition-transform duration-300
    ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}>
      
      {/* LOGO */}
      <div
        className="text-3xl font-semibold tracking-tight cursor-pointer"
        onClick={() =>
          navigate(auth?.role === "admin" ? "/admin" : "/student")
        }
      >
        Core<span className="text-indigo-600">Learn</span>
      </div>

      {/* STUDENT NAVBAR */}
      {auth?.role === "student" && (
        
        <div className="flex items-center gap-6 text-sm text-gray-700">
          {/* HAMBURGER (MOBILE) */}
<button
  className="md:hidden text-2xl"
  onClick={() => setMenuOpen(!menuOpen)}
>
  ☰
</button>
          {/* SEARCH */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="
                  pl-9 pr-3 py-2
                  rounded-full
                  border border-gray-300
                  text-sm
                  focus:outline-none focus:ring-2 focus:ring-indigo-500
                  transition-all

                  w-50        /* default */
                  md:w-72     /* tablet */
                  lg:w-120     /* desktop */
                  mx-2
                "
              />

              {/* SEARCH ICON */}
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                🔍
              </span>
            </div>
          </form>
          {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center text-base font-semibold  text-gray-700 gap-5 lg:gap-7 xl:gap-10">
  {/* your existing navbar items here */}


          <span
              className="cursor-pointer hover:text-indigo-600"
              onClick={() =>
                document.getElementById("learn-next")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              What's next
            </span>
          <span
              className="cursor-pointer hover:text-indigo-600"
              onClick={() =>
                document.getElementById("trending")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Trending
            </span>

            <span
              className="cursor-pointer hover:text-indigo-600"
              onClick={() =>
                document.getElementById("new-releases")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              New
            </span>

            <span
              className="cursor-pointer hover:text-indigo-600"
              onClick={() =>
                document.getElementById("top-picks")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Top Picks
            </span>


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


          {/* PROFILE DROPDOWN */}
          <div className="relative">
            <div
              onClick={() => setOpenProfile(!openProfile)}
              className="w-10 h-10 rounded-full bg-indigo-600 text-white flex text-xl items-center justify-center cursor-pointer font-medium"
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

    {menuOpen && auth?.role === "student" && (
  <div className="md:hidden bg-white border-b px-6 py-4 space-y-4 text-sm transition-all my-3">

    
    <span
      className="block cursor-pointer mt-2"
      onClick={() => {
        scrollToSection("learn-next");
        setMenuOpen(false);
      }}
    >
      Learn Next
    </span>

    <span
      className="block cursor-pointer"
      onClick={() => {
        scrollToSection("trending");
        setMenuOpen(false);
      }}
    >
      Trending
    </span>

    <span
      className="block cursor-pointer"
      onClick={() => {
        scrollToSection("new-releases");
        setMenuOpen(false);
      }}
    >
      New Releases
    </span>

    <span
      className="block cursor-pointer"
      onClick={() => {
        scrollToSection("top-picks");
        setMenuOpen(false);
      }}
    >
      Top Picks
    </span>

    <span
      className="block cursor-pointer"
      onClick={() => {
        navigate("/student/my-courses");
        setMenuOpen(false);
      }}
    >
      My Courses
    </span>

    <span
      className="block text-red-500 cursor-pointer"
      onClick={() => {
        logout();
        navigate("/login");
      }}
    >
      Logout
    </span>
  </div>
)}
</>
  );
};

export default Navbar;
