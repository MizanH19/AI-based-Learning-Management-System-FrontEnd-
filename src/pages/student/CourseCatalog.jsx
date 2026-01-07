import Navbar from "../../components/common/Navbar";

const CourseCatalog = () => {
  // TEMP mock (will come from backend)
  const course = {
    title: "React for Beginners",
    progress: 45,
    lessons: [
      { id: 1, title: "Introduction", completed: true },
      { id: 2, title: "JSX Basics", completed: true },
      { id: 3, title: "State & Props", completed: false }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold mb-4">{course.title}</h1>

        {/* Progress */}
        <div className="mb-6">
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-indigo-600 rounded"
              style={{ width: `${course.progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {course.progress}% complete
          </p>
        </div>

        {/* Lessons */}
        <div className="bg-white border rounded">
          {course.lessons.map(lesson => (
            <div
              key={lesson.id}
              className="p-4 border-b flex justify-between items-center"
            >
              <span>{lesson.title}</span>
              <span className="text-sm text-gray-500">
                {lesson.completed ? "Completed" : "Pending"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCatalog;
