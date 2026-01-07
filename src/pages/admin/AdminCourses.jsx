import { useState } from "react";
import Navbar from "../../components/common/Navbar";

const AdminCourses = () => {

  /* -------------------------------
     STATE: List of courses
     (Mock for now, later from backend)
  -------------------------------- */
  const [courses, setCourses] = useState([]);

  /* -------------------------------
     STATE: Form inputs
  -------------------------------- */
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [video, setVideo] = useState(null);

  /* -------------------------------
     HANDLE ADD COURSE
  -------------------------------- */
  const handleAddCourse = (e) => {
    e.preventDefault();

    // Basic validation
    if (!video) {
      alert("Please upload a course video");
      return;
    }

    // New course object (matches backend model idea)
    const newCourse = {
      id: Date.now().toString(),
      title: title,
      duration: duration,
      videoName: video.name,
      status: "Draft"
    };

    // Update course list
    setCourses([...courses, newCourse]);

    // Reset form
    setTitle("");
    setDuration("");
    setVideo(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar (admin version auto-shown) */}
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Page Heading */}
        <h1 className="text-2xl font-semibold mb-6">
          Manage Courses
        </h1>

        {/* -------------------------------
            ADD COURSE FORM
        -------------------------------- */}
        <div className="bg-white p-6 border rounded mb-10">
          <h2 className="text-lg font-semibold mb-4">
            Add New Course
          </h2>

          <form
            onSubmit={handleAddCourse}
            className="grid grid-cols-2 gap-4"
          >
            {/* COURSE TITLE */}
            <input
              type="text"
              placeholder="Course Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded col-span-2"
              required
            />

            {/* COURSE DURATION */}
            <input
              type="number"
              min={1}
              placeholder="Duration (e.g. 6 weeks)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="border p-2 rounded col-span-2"
              required
            />

            {/* COURSE VIDEO */}
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              className="border p-2 rounded col-span-2"
              required
            />

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded col-span-2"
            >
              Add Course
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
                <th className="text-left p-3">Duration</th>
                <th className="text-left p-3">Video</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center p-6 text-gray-500"
                  >
                    No courses created yet.
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr key={course.id} className="border-b">
                    <td className="p-3">{course.title}</td>
                    <td className="p-3">{course.duration}</td>
                    <td className="p-3 text-gray-500">
                      {course.videoName}
                    </td>
                    <td className="p-3">
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                        {course.status}
                      </span>
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
