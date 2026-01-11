import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import BackToHome from "../../components/common/BackToHome";
import { submitQuiz } from "../../api/quiz.api";

const LessonQuiz = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  // quiz state
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // MOCK quiz for now (until AI generate is wired)
  useEffect(() => {
    const mockQuiz = {
      questions: [
        {
          question: "What is React?",
          options: [
            "A backend framework",
            "A JavaScript library for UI",
            "A database",
            "A CSS framework"
          ]
        },
        {
          question: "What hook is used for state?",
          options: ["useFetch", "useState", "useData", "useRef"]
        }
      ]
    };

    setQuestions(mockQuiz.questions);
    setAnswers(new Array(mockQuiz.questions.length).fill(null));
    setLoading(false);
  }, []);

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
