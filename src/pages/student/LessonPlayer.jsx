import Navbar from "../../components/common/Navbar";
import { useParams } from "react-router-dom";
import { useState } from "react";

const LessonPlayer = () => {
  const { id } = useParams(); // lesson id from URL

  // TEMP mock lesson (later from GET /lesson/:id)
  const lesson = {
    title: "Introduction to React",
    description: "Understand what React is and why it is used.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
  };

  const [completed, setCompleted] = useState(false);
  const [showAI, setShowAI] = useState(false);

  return (
    <section className="space-y-4">
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-8">
        
        {/* Lesson Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          {lesson.title}
        </h1>

        <p className="text-gray-500 mb-6">
          {lesson.description}
        </p>

        {/* Video Player */}
        <div className="bg-black rounded mb-6 overflow-hidden">
          <video
            controls
            className="w-full h-[420px]"
          >
            <source src={lesson.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 mb-6">
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

        {/* AI Tutor */}
        {showAI && (
          <div className="bg-white border rounded p-4">
            <p className="text-sm text-gray-600 mb-2">
              AI Tutor
            </p>
            <p className="text-sm">
              I can explain this lesson again or help you understand concepts.
            </p>
          </div>
        )}
      </div>
    </div>
    </section>
  );
};

export default LessonPlayer;
