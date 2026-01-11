import AITutor from "../../components/ai/AITutor";
import BackToHome from "../../components/common/BackToHome";
import Navbar from "../../components/common/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useEnrollment } from "../../context/EnrollmentContext";
import {mockCourses} from '../../data/mockCourses';
import { getMyCourses } from "../../api/student.api";
import { getProgress } from "../../api/progress.api";

const MyCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // TEMP mock (later from GET /enrollments/my + progress)
  // const enrolledCourses = [
  //   {
  //     id: "101",
  //     title: "React for Beginners",
  //     progress: 45
  //   },
  //   {
  //     id: "102",
  //     title: "JavaScript Fundamentals",
  //     progress: 80
  //   }
  // ];


  // const {enrolledCourses} = useEnrollment();
  // const myCourses =mockCourses.filter(course=> 
  //   enrolledCourses.includes(course.id)
  // )
//   console.log("Enrolled IDs:", enrolledCourses);
// console.log("Mock IDs:", mockCourses.map(c => c.id));

    useEffect(() => {
            const loadMyCoursesWithProgress = async () => {
              try {
                const data = await getMyCourses();

                const coursesWithProgress = await Promise.all(
                  data.map(async (course) => {
                    const progress = await getProgress(course._id);
                    return {
                      ...course,
                      progress: progress.progressPercentage
                    };
                  })
                );

                setCourses(coursesWithProgress);
              } catch (err) {
                setError("Failed to load your courses");
                console.error(err);
              } finally {
                setLoading(false);
              }
            };

            loadMyCoursesWithProgress();
          }, []);


          const resumeCourse = async (courseId) => {
          try {
            const course = await getCourseDetails(courseId);
            const progress = await getProgress(courseId);

            const completed = progress.completedLessons || [];

            const nextLesson = course.lessons.find(
              (lesson) => !completed.includes(lesson._id)
            );

            if (nextLesson) {
              navigate(
                `/student/course/${courseId}/lesson/${nextLesson._id}`
              );
            } else {
              // all lessons completed → go to course page
              navigate(`/student/course/${courseId}`);
            }
          } catch (err) {
            console.error("Resume failed", err);
          }
        };




  return (
    <section className="space-y-4 pt-16 " >
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-10 px-6 rounded-xl mb-8">
  <h1 className="text-3xl font-bold">
    Continue your learning journey 
  </h1>
  <p className="opacity-90 mt-2">
    Pick up where you left off or explore something new.
  </p>
</div>
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          My Courses
        </h1>

        {loading && (
              <p className="text-gray-500">Loading courses...</p>
            )}

            {!loading && courses.length === 0 && (
              <p className="text-gray-500">
                You are not enrolled in any courses yet.
              </p>
            )}

            {!loading && courses.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map(course => (
                  <div
                    key={course._id}
                    className="bg-white border rounded-lg p-5"
                  >
                    <h2 className="text-lg font-semibold mb-1">
                      {course.title}
                    </h2>

                    <p className="text-sm text-gray-600 mb-3">
                      {course.description}
                    </p>

  {/* PROGRESS BAR */}
      <div className="mb-3">
        <div className="h-2 bg-gray-200 rounded">
          <div
            className="h-2 bg-indigo-600 rounded"
            style={{ width: `${course.progress || 0}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {course.progress || 0}% completed
        </p>
      </div>

      <button
        onClick={() => resumeCourse(course._id)}
        className="bg-indigo-600 text-white px-4 py-2 rounded text-sm"
      >
        Continue Learning
      </button>
    </div>

                ))}
              </div>
            )}

      </div>
    </div>
    <BackToHome/>
    <AITutor/>
   </section>
  );
};

export default MyCourses;
