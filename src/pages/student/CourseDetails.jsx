import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

import Navbar from "../../components/common/Navbar";
import BackToHome from "../../components/common/BackToHome";

function CourseDetails() {

  const { courseId } = useParams();
  const navigate = useNavigate();
  console.log(courseId);
  
  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        console.log(courseId);
        
        const res = await api.get(`/student/courses/${courseId}`);
        setCourse(res.data.data);
        console.log(res.data.data);
        
        setIsEnrolled(res.data.data.isEnrolled);
      } catch (err) {
        console.error(err);
        setError("Course not found");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

//   useEffect(() => {
//   console.log("COURSE ID FROM URL:", courseId);

//   const fetchCourse = async () => {
//     try {
//       const res = await api.get(`/student/courses/${courseId}`);
//       setCourse(res.data.data);
//       setIsEnrolled(res.data.data.isEnrolled);
//     } catch (err) {
//       console.error("Course fetch failed:", err.response?.status, err.response?.data);
//       setError("Course not found");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchCourse();
// }, [courseId]);


  if (loading) return <div className="p-10">Loading course...</div>;
  if (error) return <div className="p-10">{error}</div>;

  const handleEnroll = async () => {
    try {
      await api.post("/student/enroll", { courseId });
      setIsEnrolled(true);
    } catch (err) {
      if (err.response?.status === 409) {
        setIsEnrolled(true);
      } else {
        alert("Enrollment failed");
      }
    }
  };

  const startLearning = () => {
    if (!course.lessons || course.lessons.length === 0) {
      alert("No lessons available");
      return;
    }
    navigate(
      `/student/course/${course._id}/lesson/${course.lessons[0]._id}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-20">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* HEADER */}
        <div className="bg-white rounded-xl p-6 shadow mb-8">
          <h1 className="text-3xl font-semibold mb-2">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>

          {!isEnrolled ? (
            <button
              onClick={handleEnroll}
              className="bg-indigo-600 text-white px-6 py-2 rounded"
            >
              Enroll
            </button>
          ) : (
            <button
              onClick={startLearning}
              className="bg-green-600 text-white px-6 py-2 rounded"
            >
              Start Learning
            </button>
          )}
        </div>

        {/* LESSONS */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Course Content</h2>

          <div className="space-y-3">
            {course.lessons.map((lesson, index) => (
              <div
                key={lesson._id}
                className="flex justify-between border p-4 rounded cursor-pointer"
                onClick={() =>
                  isEnrolled
                    ? navigate(
                        `/student/course/${course._id}/lesson/${lesson._id}`
                      )
                    : alert("Please enroll first")
                }
              >
                <p className="font-medium">
                  {index + 1}. {lesson.title}
                </p>
                <span>{isEnrolled ? "▶" : "🔒"}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BackToHome />
    </div>
  );
}

export default CourseDetails;
