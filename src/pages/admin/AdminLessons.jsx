import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { addLesson } from "../../api/admin.api";
import api from "../../api/axios";

const AdminLessons = () => {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [searchParams]=useSearchParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("video");
  const [order, setOrder] = useState(1);
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const courseIdFromUrl=searchParams.get('courseId')
  const [courseTitle,setCourseTitle]=useState("")
  // Load courses for dropdown
  useEffect(() => {
    const loadCourse = async () => {
      try {
        const res = await api.get("/admin/courses"); // existing backend route
        const courses = res.data.data;

        const course = courses.find(
          (c) => c._id === courseIdFromUrl
        );

        if (!course) {
          alert("Course not found");
          return;
        }

        setCourseId(course._id);
        setCourseTitle(course.title);
        } catch (err) {
        console.error("Failed to load course", err);
      }
    };

    loadCourse();
  }, [courseIdFromUrl]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !courseId) {
      alert("Course and file required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("order", order);
    formData.append("courseId", courseId);
    formData.append("file", file);

    try {
      setLoading(true);
      await addLesson(formData);
      alert("Lesson added successfully");

      // reset
      setTitle("");
      setDescription("");
      setFile(null);
      setOrder(1);
    } catch (err) {
      alert("Failed to add lesson");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold mb-6">
          Add Lesson
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded border space-y-4"
        >
   
          {/* Course (Auto-filled) */}
          <input
            type="text"
            value={courseTitle}
            disabled
            className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
          />

          <input type="hidden" value={courseId} />


          {/* Title */}
          <input
            type="text"
            placeholder="Lesson title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
            required
          />

          {/* Description */}
          <textarea
            placeholder="Lesson description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full"
          />

          {/* Type */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="video">Video</option>
            <option value="pdf">PDF</option>
          </select>

          {/* Order */}
          <input
            type="number"
            min="1"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="border p-2 rounded w-full"
          />

          {/* File */}
          <input
            type="file"
            placeholder="Choose File"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded w-full"
            required
          />

          <button
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Uploading..." : "Add Lesson"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLessons;
