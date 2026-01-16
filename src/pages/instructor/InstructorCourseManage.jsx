import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../components/common/Navbar";

const InstructorCourseManage = () => {
  const { courseId } = useParams();

  // 🔹 Mock course info
  const course = {
    title: "Full Stack Web Development",
    description: "Learn MERN stack from scratch",
  };

  // 🔹 Mock lessons
  const [lessons, setLessons] = useState([
    {
      id: "l1",
      title: "Introduction",
      type: "video",
      order: 1,
    },
    {
      id: "l2",
      title: "HTML Basics",
      type: "pdf",
      order: 2,
    },
    {
      id: "l3",
      title: "Quiz 1",
      type: "quiz",
      order: 3,
    },
  ]);

  const handleDeleteLesson = (lessonId) => {
    if (!window.confirm("Delete this lesson?")) return;

    setLessons((prev) =>
      prev.filter((lesson) => lesson.id !== lessonId)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* COURSE HEADER */}
        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">
            {course.title}
          </h1>
          <p className="text-gray-500 mt-2">
            {course.description}
          </p>
        </div>

        {/* ADD LESSON ACTIONS */}
        <div className="flex flex-wrap gap-4">
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg
            hover:bg-indigo-700 transition">
            + Add Video
          </button>

          <button className="bg-purple-600 text-white px-5 py-2 rounded-lg
            hover:bg-purple-700 transition">
            + Add PDF
          </button>

          <button className="bg-pink-600 text-white px-5 py-2 rounded-lg
            hover:bg-pink-700 transition">
            + Add Quiz
          </button>
        </div>

        {/* LESSON LIST */}
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white border rounded-xl p-5
              flex items-center justify-between
              hover:shadow transition"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {lesson.order}. {lesson.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Type: {lesson.type.toUpperCase()}
                </p>
              </div>

              <button
                onClick={() => handleDeleteLesson(lesson.id)}
                className="text-red-500 text-sm hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorCourseManage;
