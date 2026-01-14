import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { getAllUsers, getAdminCourses } from "../../api/admin.api";

function AdminHome() {
  const [userCount, setUserCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-16">
        <Navbar />

        <div className="max-w-6xl mx-auto px-6 py-10">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Admin Dashboard
          </h1>

          <p className="text-gray-500 mb-8">
            Manage users, courses, analytics, and AI settings
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* USERS */}
            <div className="bg-white p-5 rounded-lg border">
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-semibold mt-2">
                {loading ? "—" : userCount}
              </p>
            </div>

            {/* COURSES */}
            <div className="bg-white p-5 rounded-lg border">
              <p className="text-sm text-gray-500">Courses</p>
              <p className="text-2xl font-semibold mt-2">
                {loading ? "—" : courseCount}
              </p>
            </div>

            {/* AI USAGE (PLACEHOLDER) */}
            <div className="bg-white p-5 rounded-lg border">
              <p className="text-sm text-gray-500">AI Usage</p>
              <p className="text-2xl font-semibold mt-2">0</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AdminHome;
