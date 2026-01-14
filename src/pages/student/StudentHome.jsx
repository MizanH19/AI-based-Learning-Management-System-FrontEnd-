import React, { useContext,useEffect,useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import AITutor from "../../components/ai/AITutor";
import { mockCourses } from "../../data/mockCourses";
import CourseCard from "./CourseCard";
import Footer from "../../components/common/Footer";
import api from "../../services/api";

function StudentHome() {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = React.useState(0);
  const location = useLocation();
  const [courses,setCourses]=useState([])
  const [error,setError]=useState("")

  useEffect(()=>{
    const fetchCourses=async () => {
      try {
        const res=await api.get("/student/courses")
        setCourses(res.data.data)
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setError("Failed to load courses");
      }
    }
    fetchCourses()
  })

  useEffect(() => {
  if (location.state?.scrollTo) {
    const section = document.getElementById(location.state.scrollTo);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
}, [location]);



  const nextSlide = () => {
    setActiveSlide((prev) =>
    prev === heroSlides.length - 1 ? 0 : prev + 1
  );
};

  const prevSlide = () => {
    setActiveSlide((prev) =>
    prev === 0 ? heroSlides.length - 1 : prev - 1
  );
};



const heroSlides = mockCourses.filter(course => course.isFeatured);
useEffect(() => {
  const interval = setInterval(() => {
    setActiveSlide((prev) =>
      prev === heroSlides.length - 1 ? 0 : prev + 1
    );
  }, 2800); // 4 seconds

  return () => clearInterval(interval);
}, [heroSlides.length]);

const thumbnail=["https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg",
    'https://cdn.pixabay.com/photo/2023/10/10/05/52/website-8305451_1280.jpg',
    'https://cdn.pixabay.com/photo/2023/06/17/13/37/computer-8070002_960_720.jpg',
    'https://cdn.pixabay.com/photo/2018/02/16/10/23/web-3157323_1280.jpg',
    'https://images.pexels.com/photos/12899188/pexels-photo-12899188.jpeg',
    'https://images.pexels.com/photos/270488/pexels-photo-270488.jpeg'
  ]





  const currentlyWatching = [
    {
      id: "101",
      title: "React for Beginners",
      progress: 45
    },
    {
      id: "102",
      title: "JavaScript Fundamentals",
      progress: 70
    }
  ];

  const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

  return (

    <div className="min-h-screen pt-16 bg-gray-50 animate-fadeIn" style={{ background: "var(--bg)", color: "var(--text)" }}>

      <Navbar />
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-10 px-6 rounded-xl mb-8">
  <h1 className="text-3xl font-bold">
    Continue your learning journey 
  </h1>
  <p className="opacity-90 mt-2">
    Pick up where you left off or explore something new.
  </p>
</div>


      < div className="max-w-7xl mx-auto px-4 md:px-6 py-10 space-y-16">

      <div className="relative overflow-hidden rounded-2xl 
                bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500
                shadow-2xl  animate-slideDown">
        <div className="absolute inset-0 bg-black/10"></div>

        <div
          className={`flex transition-transform duration-500`}
          style={{
            transform: `translateX(-${activeSlide * 100}%)`
          }}
        >
          {heroSlides.map((course) => (
            <div
              key={course.id}
              className="min-w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white"
            >
              <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-10 gap-6">

   
                <div className="max-w-xl">
                  <p className="text-lg font-semibold mb-2 opacity-90">
                    {getGreeting()}
                    {auth?.name ? `, ${auth.name}` : "Student"} 
                  </p>

                  <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
                    {course.title}
                  </h1>

                  <p className="text-lg md:text-xl text-white/90 mb-8 animate-pulse hover:animate-none">

                    {course.level} • {course.duration}
                  </p>

                  <button
                    onClick={() => navigate("/student/courses")}
                    className="inline-flex items-center gap-2 
                                bg-white text-gray-900 
                                px-8 py-4 rounded-full 
                                font-semibold text-sm
                                shadow-lg hover:shadow-xl
                                hover:-translate-y-0.5
                                transition"
                  >
                    {"Explore Course →"}
                  </button>
                </div>

                <div className="w-full md:w-1/3">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="rounded-lg object-cover w-full h-56 shadow-lg"
                  />
                </div>

              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="hidden md:flex items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full w-10 h-10 shadow"
        >
          ‹
        </button>

        <button
          onClick={nextSlide}
          className="hidden md:flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full w-10 h-10 shadow"
        >
          ›
        </button>



        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-2 w-2 rounded-full ${
                index === activeSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>


        <div>
          <h2 className="text-2xl font-semibold mb-3">
            Continue Learning
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentlyWatching.map((course) => (
              <div
                key={course.id}
                className="bg-white p-5 rounded border"
              >
                <h3 className="font-semibold mb-2">
                  {course.title}
                </h3>

                <div className="h-2 bg-gray-200 rounded mb-2">
                  <div
                    className="h-2 bg-indigo-600 rounded"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                <p className="text-sm text-gray-500 mb-4">
                  {course.progress}% completed
                </p>

                <button
                    onClick={()=>{navigate(`/student/course/c1/lesson/l3`)}}
                  
                  className="text-indigo-600 text-sm font-medium"
                >
                  Resume →
                </button>
              </div>
            ))}
          </div>
        </div>


{/* WHAT TO LEARN NEXT */}
      
       <div className="space-y-24">

        {/* ===============================
            WHAT TO LEARN NEXT
        =============================== */}
        <section
          id="learn-next"
          className="bg-indigo-50 rounded-2xl px-6 py-10 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              What to learn next
            </h2>
            <span className="text-sm text-indigo-600 cursor-pointer hover:underline">
              View all
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {courses.slice(0, 4).map((course,index) => (
              <CourseCard key={course.id} course={{
                    id: course._id,
                    title: course.title,
                    description: course.description,
                    thumbnail: thumbnail[index%thumbnail.length],
                  }} />
            ))}
          </div>
        </section>

        {/* ===============================
            TRENDING COURSES
        =============================== */}
        <section
          id="trending"
          className="bg-rose-50 rounded-2xl px-6 py-10 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              Trending Courses
            </h2>
            <span className="text-sm text-indigo-600 cursor-pointer hover:underline">
              View all
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
              courses.slice(0, 3).map((course,index) => (
                <CourseCard key={course.id} course={{
                    id: course._id,
                    title: course.title,
                    description: course.description,
                    thumbnail: thumbnail[index%thumbnail.length],
                  }} />
              ))}
          </div>
        </section>

        {/* ===============================
            NEW RELEASES
        =============================== */}
        <section
          id="new-releases"
          className="bg-emerald-50 rounded-2xl px-6 py-10 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              New Releases
            </h2>
            <span className="text-sm text-indigo-600 cursor-pointer hover:underline">
              View all
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {courses
              .map((course,index) => (
                <CourseCard key={course.id} course={{
                    id: course._id,
                    title: course.title,
                    description: course.description,
                    thumbnail: thumbnail[index%thumbnail.length],
                  }} />
              ))}
          </div>
        </section>

        {/* ===============================
            TOP PICKS
        =============================== */}
        <section
          id="top-picks"
          className="bg-amber-50 rounded-2xl px-6 py-10 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              Our Top Picks
            </h2>
            <span className="text-sm text-indigo-600 cursor-pointer hover:underline">
              View all
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {courses

              .slice(0, 6).map((course,index) => (
               <CourseCard key={course.id} course={{
                    id: course._id,
                    title: course.title,
                    description: course.description,
                    thumbnail: thumbnail[index%thumbnail.length],
                  }} />
              ))}
          </div>
        </section>

      </div>



      </div>

      {/* AI Tutor Floating Component */}
      <AITutor />
      <Footer/>
    </div>

  );
}

export default StudentHome;
