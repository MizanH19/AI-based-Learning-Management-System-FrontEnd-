import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";

const InstructorAddLesson = () => {
  const { courseId } = useParams(); // course context
  const navigate = useNavigate();

  // lesson form state
  const [type, setType] = useState("video");
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState(1);
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔹 Mock submit
    console.log({
      courseId,
      type,
      title,
      order,
      file,
    });

    alert("Lesson created (mock)");
//     navigate(-1); // go back to manage page
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* HEADER */}
        <div
          className="rounded-2xl p-8 text-white shadow-xl
          bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500"
        >
          <h1 className="text-3xl font-extrabold">
            Add New Lesson
          </h1>
          <p className="opacity-90 mt-2">
            Create videos, PDFs, or quizzes for your course
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 shadow space-y-6"
        >
          {/* LESSON TYPE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lesson Type
            </label>
            <div className="flex gap-4">
              {["video", "pdf", "quiz"].map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium
                    transition
                    ${
                      type === t
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lesson Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter lesson title"
              required
              className="w-full border rounded-lg px-4 py-2 focus:ring-2
              focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* ORDER */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lesson Order
            </label>
            <input
              type="number"
              min="1"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-32 border rounded-lg px-3 py-2"
            />
          </div>

          {/* CONDITIONAL CONTENT */}
          {type !== "quiz" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload {type === "video" ? "Video" : "PDF"}
              </label>

              <input
                type="file"
                accept={type === "video" ? "video/*" : "application/pdf"}
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full border rounded-lg p-2"
              />
            </div>
          ) : (
            <div
              className="border rounded-xl p-6 bg-purple-50
              flex items-center justify-between"
            >
              <div>
                <h3 className="font-semibold text-purple-800">
                  AI Generated Quiz
                </h3>
                <p className="text-sm text-purple-600 mt-1">
                  Quiz will be generated once and saved as a lesson
                </p>
              </div>

              <button
                type="button"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg
                hover:bg-purple-700 transition"
              >
                Generate Quiz (Mock)
              </button>
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg
              hover:bg-indigo-700 transition"
            >
              Create Lesson
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="border px-6 py-2 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstructorAddLesson;
