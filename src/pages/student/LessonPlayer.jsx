import Navbar from "../../components/common/Navbar";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { mockCourses } from "../../data/mockCourses";
import BackToHome from "../../components/common/BackToHome";

const LessonPlayer = () => {
  const { courseId, lessonId } = useParams();

  // 1️⃣ Find course
  const course = mockCourses.find(c => c.id === courseId);

  // 2️⃣ Find lesson inside course
  const lesson = course?.lessons.find(l => l.id === lessonId);

  const [completed, setCompleted] = useState(false);
  const [showAI, setShowAI] = useState(false);

  // 3️⃣ Safety check
  if (!course || !lesson) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="p-6 text-center text-gray-500">
          Lesson not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        {/* Lesson title */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {lesson.title}
          </h1>
          <p className="text-gray-500">
            {lesson.description}
          </p>
        </div>

        {/* 🎥 REAL VIDEO PLAYER */}
        <div className="bg-black rounded overflow-hidden">
          <video controls className="w-full h-[420px]">
            <source src={lesson.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCompleted(true)}
            className={`px-4 py-2 rounded text-sm ${
              completed
                ? "bg-green-600 text-white"
                : "bg-indigo-600 text-white"
            }`}
          >
            {completed ? "Completed" : "Mark as Complete"}
          </button>

          <button
            onClick={() => setShowAI(!showAI)}
            className="px-4 py-2 rounded text-sm border"
          >
            Ask AI
          </button>
        </div>

        {/* AI Tutor mock */}
        {showAI && (
          <div className="bg-white border rounded p-4">
            <p className="text-sm font-medium mb-1">AI Tutor</p>
            <p className="text-sm text-gray-600">
              I can explain this lesson again or help you understand concepts.
            </p>
          </div>
        )}

      </div>
      <BackToHome/>
    </div>
  );
};

export default LessonPlayer;
