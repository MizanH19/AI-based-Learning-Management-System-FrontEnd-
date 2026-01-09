import AITutor from "../../components/ai/AITutor";
import BackToHome from "../../components/common/BackToHome";
import Footer from "../../components/common/Footer";
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

        <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map(course => (
            <div
              key={course.id}
              className="bg-white h-60 border rounded-lg p-5 relative"
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
                className="bg-indigo-600 text-white px-4 py-2 rounded text-sm absolute bottom-4 "
              >
                Enroll
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    <BackToHome/>
    <AITutor/>
    <Footer/>
    </section>
  );
};

export default CourseCatalog;

