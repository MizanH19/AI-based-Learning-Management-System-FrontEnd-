// src/pages/student/MyCourses.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import Navbar from "../../components/common/Navbar";
import BackToHome from "../../components/common/BackToHome";
import AITutor from "../../components/ai/AITutor";

const MyCourses = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMyCourses = async () => {
      try {
 
        const res = await api.get("/student/my-courses");
        console.log(res.data.data);
        
        /**
         * Expected backend shape:
         * [
         *   {
         *     _id: enrollmentId,
         *     courseId: {
         *       _id,
         *       title,
         *       description
         *     }
         *   }
         * ]
         */
        const enrollments = res.data.data;

        // 2️⃣ Fetch progress for each course
        const coursesWithProgress = await Promise.all(
          enrollments.map(async (enrollment) => {
            const course = enrollment;
            console.log(course.progressPercentage);
            
            try {
              const progressRes = await api.get(`/progress/${course.id}`);

              return {
                ...course,
                progressPercentage: progressRes.data.progressPercentage || 0,
              };
            } catch {
              return {
                ...course,
                progressPercentage: 0,
              };
            }
          })
        );

        setCourses(coursesWithProgress);
      } catch (err) {
        console.error("Failed to load my courses:", err);
        setError("Failed to load your courses");
      } finally {
        setLoading(false);
      }
    };

    loadMyCourses();
  }, []);

  return (
    <section className="space-y-4 pt-16">
      <Navbar />

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-10 px-6 rounded-xl mb-8">
        <h1 className="text-3xl font-bold">Continue your learning journey</h1>
        <p className="opacity-90 mt-2">Pick up where you left off.</p>
      </div>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            My Courses
          </h1>

          {loading && <p className="text-gray-500">Loading courses...</p>}

          {error && <p className="text-red-500">{error}</p>}

          {!loading && !error && courses.length === 0 && (
            <p className="text-gray-500">
              You are not enrolled in any courses yet.
            </p>
          )}

          {!loading && !error && courses.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div
                  key={course.courseId}
                  className="bg-white border rounded-lg p-5"
                >
                  <h2 className="text-lg font-semibold mb-1">{course.title}</h2>

                  <p className="text-sm text-gray-600 mb-3">
                    {course.description}
                  </p>

                  {/* Progress bar */}
                  <div className="mb-3">
                    <div className="h-2 bg-gray-200 rounded">
                      <div
                        className="h-2 bg-indigo-600 rounded"
                        style={{ width: `${course.progressPercentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {course.progressPercentage}% completed
                    </p>
                  </div>
                  {/* {console.log(course)} */}

                  <button
                  
                    onClick={() => navigate(`/student/course/${course.courseId}`)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded text-sm"
                  >
                    {course.progressPercentage === 100
                      ? "Completed"
                      : "Continue Learning"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <BackToHome />
      <AITutor />
    </section>
  );
};

export default MyCourses;
