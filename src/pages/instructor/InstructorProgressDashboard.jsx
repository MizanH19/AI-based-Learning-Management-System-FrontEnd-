import Navbar from "../../components/common/Navbar";
import { useParams } from "react-router-dom";

const InstructorProgressDashboard = () => {
  const { courseId } = useParams(); // future API use

  // 🔹 MOCK DATA (aligned with API contract)
  const data = {
    summary: {
      totalStudents: 12,
      completed: 5,
      inProgress: 6,
      restricted: 1,
    },
    students: [
      {
        name: "Rahul Sharma",
        progressPercentage: 100,
        quizScores: [80, 90],
        isCompleted: true,
      },
      {
        name: "Ananya Singh",
        progressPercentage: 65,
        quizScores: [70],
        isCompleted: false,
      },
      {
        name: "Amit Verma",
        progressPercentage: 30,
        quizScores: [],
        isCompleted: false,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">
            Course Progress Dashboard
          </h1>
          <p className="text-gray-500 mt-2">
            Track student performance and course completion
          </p>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard
            label="Total Students"
            value={data.summary.totalStudents}
            color="indigo"
          />
          <SummaryCard
            label="Completed"
            value={data.summary.completed}
            color="green"
          />
          <SummaryCard
            label="In Progress"
            value={data.summary.inProgress}
            color="yellow"
          />
          <SummaryCard
            label="Restricted"
            value={data.summary.restricted}
            color="red"
          />
        </div>

        {/* STUDENT TABLE */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Enrolled Students
            </h2>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4">Student</th>
                <th className="text-left p-4">Progress</th>
                <th className="text-left p-4">Quiz Scores</th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {data.students.map((student, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">
                    {student.name}
                  </td>

                  <td className="p-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{
                          width: `${student.progressPercentage}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs mt-1 text-gray-500">
                      {student.progressPercentage}%
                    </p>
                  </td>

                  <td className="p-4">
                    {student.quizScores.length > 0
                      ? student.quizScores.join(", ") + "%"
                      : "—"}
                  </td>

                  <td className="p-4">
                    {student.isCompleted ? (
                      <span className="text-green-600 font-medium">
                        Completed
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-medium">
                        In Progress
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* 🔹 Small reusable card */
const SummaryCard = ({ label, value, color }) => {
  const colors = {
    indigo: "text-indigo-600 bg-indigo-50",
    green: "text-green-600 bg-green-50",
    yellow: "text-yellow-600 bg-yellow-50",
    red: "text-red-600 bg-red-50",
  };

  return (
    <div
      className={`rounded-2xl p-6 border shadow-sm ${colors[color]}`}
    >
      <p className="text-sm opacity-80">{label}</p>
      <p className="text-3xl font-extrabold mt-2">{value}</p>
    </div>
  );
};

export default InstructorProgressDashboard;
