import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import { createCourse, getAdminCourses } from "../../api/admin.api";
import { useNavigate } from "react-router-dom";
const AdminCourses = () => {
  /* -------------------------------
     STATE
  -------------------------------- */
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* -------------------------------
     LOAD COURSES (ON PAGE LOAD)
  -------------------------------- */

  const navigate=useNavigate();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getAdminCourses();
        setCourses(data);
      } catch (err) {
        setError("Failed to load courses");
      }
    };

    loadCourses();
  }, []);

  /* -------------------------------
     CREATE COURSE
  -------------------------------- */
  const handleAddCourse = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !description) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await createCourse({
        title,
        description
      });

      // Reload course list after creation
      const updatedCourses = await getAdminCourses();
      setCourses(updatedCourses);

      // Reset form
      setTitle("");
      setDescription("");
    } catch (err) {
      setError("Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">
            Manage Courses
          </h1>

          {/* <button
            onClick={() => navigate("/admin/lessons")}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            + Add Lesson
          </button> */}

        </div>

        {/* -------------------------------
            ADD COURSE FORM
        -------------------------------- */}
        <div className="bg-white p-6 border rounded mb-10">
          <h2 className="text-lg font-semibold mb-4">
            Add New Course
          </h2>

          {error && (
            <p className="text-red-500 text-sm mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleAddCourse} className="space-y-4">
            <input
              type="text"
              placeholder="Course title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded w-full"
            />

            <textarea
              placeholder="Course description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded w-full"
            />

            <button
              disabled={loading}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              {loading ? "Creating..." : "Create Course"}
            </button>
          </form>
        </div>

        {/* -------------------------------
            COURSE LIST TABLE
        -------------------------------- */}
        <div className="bg-white border rounded">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Description</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>



            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center p-6 text-gray-500"
                  >
                    No courses created yet.
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr key={course._id} className="border-b">
                    <td className="p-3">{course.title}</td>
                    <td className="p-3">{course.description}</td>
                    <td className="p-3">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                        Published
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() =>
                          navigate(`/admin/lessons?courseId=${course._id}`)
                        }
                        className="text-indigo-600 text-sm font-medium hover:underline"
                      >
                        Add Lesson
                      </button>
                    </td>
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

export default AdminCourses;
