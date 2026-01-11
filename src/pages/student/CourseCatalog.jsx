import AITutor from "../../components/ai/AITutor";
import BackToHome from "../../components/common/BackToHome";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import { useEffect,useState } from "react";
import { useEnrollment } from "../../context/EnrollmentContext";
import {getAllCourses} from "../../api/student.api";
import CourseCard from "./CourseCard";
import { enrollInCourse } from "../../api/student.api";

const CourseCatalog = () => {
  const [courses,setCourses]=useState([]);
  const [loading,setLoading]=useState(true);
  
  const handleEnroll = async (courseId) => {
    try {
      await enrollInCourse(courseId);
      alert("Enrolled successfully");
    } catch (err) {
      alert("Already enrolled or error");
    }
  };

  useEffect(()=>{
    const fetchCourses = async()=>{
      try {
        const data=await getAllCourses();
        setCourses(data)
      } catch (error) {
        console.error("Failed to fetch courses",error);
      }
      finally{
        setLoading(false);
      }
    };
    fetchCourses();
  },[])

  const {enrollCourse,isEnrolled}=useEnrollment();

  return (
    <section className="space-y-4 pt-16">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-10 px-6 rounded-xl mb-8">
  <h1 className="text-3xl font-bold">
    Continue your learning journey 
  </h1>
  <p className="opacity-90 mt-2">
    Pick up where you left off or explore something new.
  </p>
</div>
    <div className="min-h-screen bg-gray-50 ">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Browse Courses
        </h1>

        {loading && (
            <p className="text-gray-500">Loading courses...</p>
          )}

      {!loading &&(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map(course => (
            <CourseCard
            key={course._id}
              course={{
                id: course._id,            // 🔑 normalize here
                title: course.title,
                description: course.description,
                thumbnail: course.thumbnail,
                duration: course.duration,
                rating: course.rating,
                learners: course.learners,
                lessons: course.lessons
              }}
              actionLabel={isEnrolled(course._id) ? "Enrolled" : "Enroll"}
              disabled={isEnrolled(course._id)}
              onAction={() => handleEnroll(course._id)}
            />


          ))}
        </div>

                )}
      </div>
    </div>
    <BackToHome/>
    <AITutor/>
    <Footer/>
    </section>
  );
};

export default CourseCatalog;

