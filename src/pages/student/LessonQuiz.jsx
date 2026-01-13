import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import BackToHome from "../../components/common/BackToHome";
import { generateQuiz,submitQuiz } from "../../api/quiz.api";
import { completeLesson } from "../../api/progress.api";

const LessonQuiz = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  // quiz state
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (result?.passed) {
      const timer = setTimeout(() => {
        navigate(`/student/course/${courseId}`);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [result, courseId, navigate]);


  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await generateQuiz(lessonId);

        setQuestions(data.quiz.questions);
        setAnswers(
          new Array(data.quiz.questions.length).fill(null)
        );
      } catch (err) {
        setError("Failed to generate quiz");
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [lessonId]);


  const handleSelect = (qIndex, optionIndex) => {
    const updated = [...answers];
    updated[qIndex] = optionIndex;
    setAnswers(updated);
  };

  const handleSubmit = async () => {
    if (answers.includes(null)) {
      setError("Please answer all questions");
      return;
    }

    try {
      const res = await submitQuiz({
        courseId,
        lessonId,
        answers
      });


      setResult(res);

      if (res.passed) {
        await completeLesson(courseId, lessonId);
      }
    } catch {
      setError("Failed to submit quiz");
    }
  };

  if (loading) {
    return <div className="p-10">Loading quiz...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        <h1 className="text-2xl font-semibold">Lesson Quiz</h1>

        {/* RESULT */}
        {result && (
          <div className="bg-white p-6 rounded shadow space-y-2">
            <p className="text-lg font-medium">
              Score: {result.score}%
            </p>
            <p>
              {result.passed ? "✅ Passed" : "❌ Failed"}
            </p>

            <button
              onClick={() =>
                navigate(`/student/course/${courseId}`)
              }
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Back to Course
            </button>
          </div>
        )}

        {/* QUESTIONS */}
        {!result &&
          questions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="bg-white p-5 rounded shadow space-y-3"
            >
              <p className="font-medium">
                {qIndex + 1}. {q.question}
              </p>

              {q.options.map((opt, oIndex) => (
                <label
                  key={oIndex}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`q-${qIndex}`}
                    checked={answers[qIndex] === oIndex}
                    onChange={() =>
                      handleSelect(qIndex, oIndex)
                    }
                  />
                  {opt}
                </label>
              ))}
            </div>
          ))}

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {/* SUBMIT */}
        {!result && (
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Submit Quiz
          </button>
        )}
      </div>

      <BackToHome />
    </div>
  );
};

export default LessonQuiz;
