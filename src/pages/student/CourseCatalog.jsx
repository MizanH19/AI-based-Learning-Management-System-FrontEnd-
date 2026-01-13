import { useEffect, useState } from "react";
import api from "../../services/api";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import BackToHome from "../../components/common/BackToHome";
import AITutor from "../../components/ai/AITutor";

import CourseCard from "./CourseCard";

const CourseCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrollingId, setEnrollingId] = useState(null);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get("/student/courses");
        setCourses(res.data.data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const loadMyEnrollments = async () => {
      try {
        const res = await api.get("/student/my-courses");
        const ids = res.data.data.map((c) => c._id);
        setEnrolledCourseIds(ids);
      } catch (err) {
        console.error("Failed to load enrolled courses");
      }
    };

    loadMyEnrollments();
  }, []);


  const handleEnroll = async (courseId) => {
    try {
      setEnrollingId(courseId);
      await api.post("/student/enroll", { courseId });
      setEnrolledCourseIds((prev) => [...prev, courseId]);

    } catch (err) {
      if (err.response && err.response.status === 409) {
        // Expected case: already enrolled
        // alert("You are already enrolled in this course");
      } else {
        console.error("Enroll error:", err);
        // alert("Enrollment failed. Please try again.");
      }
    } finally {
      setEnrollingId(null);
    }
  };

  const thumbnail=["https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_1280.jpg",
    'https://cdn.pixabay.com/photo/2023/10/10/05/52/website-8305451_1280.jpg',
    'https://cdn.pixabay.com/photo/2023/06/17/13/37/computer-8070002_960_720.jpg',
    'https://cdn.pixabay.com/photo/2018/02/16/10/23/web-3157323_1280.jpg'
  ]

  return (
    <section className="space-y-4 pt-16">
      <Navbar />

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-10 px-6 rounded-xl mb-8">
        <h1 className="text-3xl font-bold">Continue your learning journey</h1>
        <p className="opacity-90 mt-2">
          Pick up where you left off or explore something new.
        </p>
      </div>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Browse Courses
          </h1>

          {loading && <p className="text-gray-500">Loading courses...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {courses.map((course,index) => (
                <CourseCard
                  key={course._id}
                  course={{
                    id: course._id,
                    title: course.title,
                    description: course.description,
                    thumbnail: thumbnail[index%thumbnail.length],
                  }}
                  actionLabel={
                                enrolledCourseIds.includes(course._id)
                                  ? "Enrolled"
                                  : enrollingId === course._id
                                  ? "Enrolling..."
                                  : "Enroll"
                              }
                              disabled={
                                enrollingId === course._id ||
                                enrolledCourseIds.includes(course._id)
                              }

                  onAction={() => handleEnroll(course._id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <BackToHome />
      <AITutor />
      <Footer />
    </section>
  );
};

export default CourseCatalog;
