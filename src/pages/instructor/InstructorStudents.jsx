import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar";

import {
  getCourseStudents,
  restrictStudent,
  UnrestrictStudent,
} from "../../api/instructor.api";

const InstructorStudents = () => {
  const navigate = useNavigate();
  const { courseId } = useParams(); // ✅ course context from route

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch enrolled students
  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await getCourseStudents(courseId);
        setStudents(data);
      } catch (err) {
        console.error("Failed to load students", err);
        alert("Failed to load students");
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, [courseId]);

  // 🔹 Restrict / Unrestrict handler
  const toggleRestriction = async (student) => {
    try {
      if (student.isRestricted) {
        await UnrestrictStudent(courseId, student.studentId);
      } else {
        await restrictStudent(courseId, student.studentId);
      }

      // ✅ Update UI instantly
      setStudents((prev) =>
        prev.map((s) =>
          s.studentId === student.studentId
            ? { ...s, isRestricted: !s.isRestricted }
            : s
        )
      );
    } catch (err) {
      alert("Failed to update student access");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Navbar />

      {/* HEADER */}
      <div className="mx-6 mt-6 rounded-2xl
        bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500
        text-white p-8 shadow-xl">
        <h1 className="text-3xl font-extrabold">Enrolled Students</h1>
        <p className="opacity-90 mt-2">Track progress & manage access</p>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading students...</p>
        ) : students.length === 0 ? (
          <p className="text-center text-gray-500">No students enrolled yet</p>
        ) : (
          students.map((student) => (
            <div
              key={student.studentId}
              className="bg-white rounded-2xl p-6 border
              shadow-sm hover:shadow-xl transition-all"
            >
              {/* TOP */}
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {student.name}
                  </h3>
                  <p className="text-sm text-gray-500">{student.email}</p>
                </div>

                <span
                  className={`px-4 py-1 rounded-full text-xs font-medium
                    ${
                      student.isRestricted
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                >
                  {student.isRestricted ? "RESTRICTED" : "ACTIVE"}
                </span>
              </div>

              {/* PROGRESS */}
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{student.progressPercentage}%</span>
                </div>

                <div className="h-2 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-indigo-600 rounded"
                    style={{ width: `${student.progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  onClick={() =>
                    navigate(
                      `/instructor/course/${courseId}/progress`
                    )
                  }
                  className="bg-indigo-600 text-white
                  px-4 py-2 rounded text-sm hover:bg-indigo-700 transition"
                >
                  View Progress
                </button>

                <button
                  onClick={() => toggleRestriction(student)}
                  className={`border px-4 py-2 rounded text-sm transition
                    ${
                      student.isRestricted
                        ? "border-green-500 text-green-600 hover:bg-green-50"
                        : "border-red-500 text-red-600 hover:bg-red-50"
                    }`}
                >
                  {student.isRestricted ? "Allow Access" : "Restrict Access"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InstructorStudents;
