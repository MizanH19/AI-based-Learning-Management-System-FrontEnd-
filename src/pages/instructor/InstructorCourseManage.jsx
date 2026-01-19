import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import { getCourseDetails } from "../../api/student.api";
import { deleteLesson, getCourseProgress, getCourseStudents } from "../../api/instructor.api";

const InstructorCourseManage = () => {
  const { courseId } = useParams();

  const [course,setCourse]=useState(null);
  const [lessons,setLessons]=useState([])
  const [students,setStudents]=useState([])
  const [summary,setSummary]=useState(null)
  const [loading,setLoading]=useState(true)


  useEffect(()=>{
    const loadData= async()=>{
      try {
      const courseRes=await getCourseDetails(courseId);
      const studentRes = await getCourseStudents(courseId);
      const progressRes =await getCourseProgress(courseId);

      setCourse(courseRes)
      setStudents(studentRes);
      setLessons(courseRes.lessons||[])
      setSummary(progressRes.summary);
    } catch (err){
      console.error(err);
    }finally{
      setLoading(false)
    }
  }

    loadData();
  },[courseId]);
  // // 🔹 Mock course info
  // const course = {
  //   title: "Full Stack Web Development",
  //   description: "Learn MERN stack from scratch",
  // };

  // // 🔹 Mock lessons
  // const [lessons, setLessons] = useState([
  //   {
  //     id: "l1",
  //     title: "Introduction",
  //     type: "video",
  //     order: 1,
  //   },
  //   {
  //     id: "l2",
  //     title: "HTML Basics",
  //     type: "pdf",
  //     order: 2,
  //   },
  //   {
  //     id: "l3",
  //     title: "Quiz 1",
  //     type: "quiz",
  //     order: 3,
  //   },
  // ]);

  const handleDeleteLesson = async (lessonId) => {
    if (!window.confirm("Delete this lesson?")) return;
    await deleteLesson(lessonId);
    setLessons((prev) =>
      prev.filter((lesson) => lesson.id !== lessonId)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* COURSE HEADER */}
        <div className="bg-white rounded-2xl p-6 border shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">
            {course.title}
          </h1>
          <p className="text-gray-500 mt-2">
            {course.description}
          </p>
        </div>

         {/* SUMMARY */}
        {summary && (
          <div className="grid grid-cols-4 gap-4">
            <Stat label="Students" value={summary.totalStudents} />
            <Stat label="Completed" value={summary.completed} />
            <Stat label="In Progress" value={summary.inProgress} />
            <Stat label="Restricted" value={summary.restricted} />
          </div>
        )}

        {/* ADD LESSON ACTIONS */}
        <div className="flex flex-wrap gap-4">
          <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg
            hover:bg-indigo-700 transition">
            + Add Video
          </button>

          <button className="bg-purple-600 text-white px-5 py-2 rounded-lg
            hover:bg-purple-700 transition">
            + Add PDF
          </button>

          <button className="bg-pink-600 text-white px-5 py-2 rounded-lg
            hover:bg-pink-700 transition">
            + Add Quiz
          </button>
        </div>

        {/* LESSON LIST */}
        <div className="space-y-4">
          {lessons.map((lesson,i) => (
            <div
              key={lesson._id}
              className="bg-white border rounded-xl p-5
              flex items-center justify-between
              hover:shadow transition"
            >
              <div>
                <p className="font-semibold text-gray-800">
                  {i+1}. {lesson.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Type: {lesson.type.toUpperCase()}
                </p>
              </div>

              <button
                onClick={() => handleDeleteLesson(lesson._id)}
                className="text-red-500 text-sm hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

         {/* STUDENTS */}
        <div className="bg-white p-6 rounded-xl border">
          <h2 className="text-xl font-semibold mb-4">
            Enrolled Students
          </h2>

          {students.map((s) => (
            <div
              key={s.studentId}
              className="flex justify-between border-b py-3"
            >
              <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-xs text-gray-500">{s.email}</p>
              </div>

              <div className="text-sm">
                {s.progressPercentage}%{" "}
                {s.isRestricted && "🚫"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="bg-white p-4 rounded-xl border text-center">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default InstructorCourseManage;
