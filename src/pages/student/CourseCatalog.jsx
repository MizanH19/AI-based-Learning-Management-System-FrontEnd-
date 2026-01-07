import Navbar from "../../components/common/Navbar";

const CourseCatalog = () => {
  // TEMP mock (later from GET /courses)
  const courses = [
    {
      id: "201",
      title: "Node.js Backend Development",
      description: "Learn backend APIs with Node.js and Express",
      duration: "8 weeks"
    },
    {
      id: "202",
      title: "Database Design Basics",
      description: "Understand relational & NoSQL databases",
      duration: "4 weeks"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Browse Courses
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map(course => (
            <div
              key={course.id}
              className="bg-white border rounded-lg p-5"
            >
              <h2 className="text-lg font-semibold mb-2">
                {course.title}
              </h2>

              <p className="text-sm text-gray-600 mb-3">
                {course.description}
              </p>

              <p className="text-sm text-gray-500 mb-4">
                Duration: {course.duration}
              </p>

              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded text-sm"
              >
                Enroll
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseCatalog;

