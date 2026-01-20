import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { getAllUsers, getAdminCourses,getAdminOverviewAnalytics,getInstructorAnalytics  } from "../../api/admin.api";

function AdminHome() {
  const [userCount, setUserCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [overview,setOverview] = useState([]);
  const [instructors,setInstructors]=useState([])

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [users, courses] = await Promise.all([
          getAllUsers(),
          getAdminCourses(),
        ]);

        setUserCount(users.length);
        setCourseCount(courses.length);
      } catch (err) {
        console.error("Failed to load admin dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const overviewData = await getAdminOverviewAnalytics();
        const instructorData = await getInstructorAnalytics();
        console.log(overview);
        console.log(instructorData);
        
        
        setOverview(overviewData);
        setInstructors(instructorData);
      } catch (err) {
        console.error("Failed to load analytics", err);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);


   return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Platform analytics & instructor performance
          </p>
        </div>

        {/* PLATFORM OVERVIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  <StatCard label="Total Users" value={overview?.users?.total || 0} />
  <StatCard label="Students" value={overview?.users?.students || 0} />
  <StatCard label="Instructors" value={overview?.users?.instructors || 0} />
  <StatCard label="Courses" value={overview?.courses?.total || 0} />
</div>


        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
  <StatCard
    label="Enrollments"
    value={overview?.enrollments?.total || 0}
  />
  <StatCard
    label="Completed"
    value={overview?.enrollments?.completed || 0}
  />
  <StatCard
    label="Completion Rate"
    value={`${overview?.enrollments?.completionRate || 0}%`}
  />
</div>


        {/* INSTRUCTOR ANALYTICS */}
        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Instructor Performance
            </h2>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4">Instructor</th>
                <th className="text-left p-4">Courses</th>
                <th className="text-left p-4">Enrollments</th>
                <th className="text-left p-4">Completed</th>
              </tr>
            </thead>

            <tbody>
              {instructors.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-6 text-gray-500"
                  >
                    No instructor data available
                  </td>
                </tr>
              ) : (
                instructors.map((inst) => (
                  <tr
                    key={inst.instructorId}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4">
                      <p className="font-medium">{inst.name}</p>
                      <p className="text-xs text-gray-500">
                        {inst.email}
                      </p>
                    </td>
                    <td className="p-4">{inst.totalCourses}</td>
                    <td className="p-4">{inst.totalEnrollments}</td>
                    <td className="p-4">{inst.completedEnrollments}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* 🔹 Small reusable stat card */
const StatCard = ({ label, value }) => (
  <div className="bg-white rounded-xl border p-6 shadow-sm">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

export default AdminHome;
