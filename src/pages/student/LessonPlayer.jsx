import Navbar from "../../components/common/Navbar";
import BackToHome from "../../components/common/BackToHome";
import { useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourseDetails } from "../../api/student.api";
import { completeLesson, getProgress } from "../../api/progress.api";
import {askAI} from '../../api/ai.api'

const LessonPlayer = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [progress,setProgress]=useState(0)

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

  useEffect(()=>{
    
        const loadProgress = async () => {
        const data = await getProgress(courseId);
        setProgress(data);
        console.log(data);
        
    
  }
  loadProgress()
},[courseId])

const isCompleted = progress?.completedLessons?.includes(lessonId);


  const handleMarkComplete = async () => {
  try {
    await completeLesson(courseId, lessonId);
    alert("Lesson marked as complete ✅");


  } catch (err) {
    if (err.response?.status === 400) {
      alert(err.response.data.message); 
      // "Complete previous lessons first"
    } else {
      alert("Failed to mark lesson complete");
    }
  }
};


  const handleAskAI = async () => {
    if (!question.trim()) return;

    try {
      setAiLoading(true);
      const res = await askAI({
        courseId,
        lessonId,
        question
      });
      setAnswer(res.answer);
      console.log(res.answer);
      
    } catch {
      alert("AI failed to respond");
    } finally {
      setAiLoading(false);
    }
  };


  if (loading) return <div className="p-10">Loading lesson...</div>;
  if (error) return <div className="p-10">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
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
        <div className="bg-white border rounded p-4 space-y-3">
          <textarea
            placeholder="Ask AI about this lesson..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <button
            onClick={handleAskAI}
            disabled={aiLoading}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            {aiLoading ? "Thinking..." : "Ask AI"}
          </button>

          {answer && (
            <div className="bg-gray-50 p-3 rounded text-sm">
              {answer}
            </div>
          )}
        </div>


        {/* ACTIONS (HOOK READY) */}
        <div className="flex gap-4">
          <button
            onClick={handleMarkComplete}
            className="bg-green-600 text-white px-4 py-2 rounded
        {}"
          >
            {isCompleted?"Completed":"Mark as Complete"}
          </button>

          <button
            onClick={() =>
              navigate(
                `/student/course/${courseId}/lesson/${lessonId}/quiz`
              )
            }
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Take Quiz
          </button>
        </div>


      </div>

      <BackToHome />
    </div>
  );
};

export default LessonPlayer;
