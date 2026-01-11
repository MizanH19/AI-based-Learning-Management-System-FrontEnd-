import Navbar from "../../components/common/Navbar";
import BackToHome from "../../components/common/BackToHome";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourseDetails } from "../../api/student.api";
import { completeLesson } from "../../api/progress.api";

const LessonPlayer = () => {
  const { courseId, lessonId } = useParams();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const course = await getCourseDetails(courseId);

        const foundLesson = course.lessons.find(
          (l) => l._id === lessonId
        );

        if (!foundLesson) {
          setError("Lesson not found");
        } else {
          setLesson(foundLesson);
        }
      } catch {
        setError("Failed to load lesson");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [courseId, lessonId]);

  if (loading) return <div className="p-10">Loading lesson...</div>;
  if (error) return <div className="p-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* TITLE */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {lesson.title}
          </h1>
        </div>

        {/* VIDEO */}
        {lesson.type === "video" && (
          <div className="bg-black rounded overflow-hidden">
            <video controls className="w-full h-[420px]">
              <source
                src={lesson.contentUrl}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {/* ACTIONS (HOOK READY) */}
        <div className="flex gap-4">
          <button
            onClick={() =>
              completeLesson(courseId, lessonId)
            }
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Mark as Complete
          </button>

          <button className="border px-4 py-2 rounded">
            Ask AI
          </button>
        </div>

      </div>

      <BackToHome />
    </div>
  );
};

export default LessonPlayer;
