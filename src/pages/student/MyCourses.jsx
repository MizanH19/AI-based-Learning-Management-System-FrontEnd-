import Navbar from "../../components/common/Navbar";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const navigate = useNavigate();

  // TEMP mock (later from GET /enrollments/my + progress)
  const enrolledCourses = [
    {
      id: "101",
      title: "React for Beginners",
      progress: 45
    },
    {
      id: "102",
      title: "JavaScript Fundamentals",
      progress: 80
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          My Courses
        </h1>

        {enrolledCourses.length === 0 ? (
          <p className="text-gray-500">
            You are not enrolled in any courses yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourses.map(course => (
              <div
                key={course.id}
                className="bg-white border rounded-lg p-5"
              >
                <h2 className="text-lg font-semibold mb-2">
                  {course.title}
                </h2>

                {/* Progress Bar */}
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
                  onClick={() =>
                    navigate(`/student/lesson/${course.id}`)
                  }
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
  );
};

export default MyCourses;
