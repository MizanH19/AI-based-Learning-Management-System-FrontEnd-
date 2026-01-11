import { useParams, useNavigate } from "react-router-dom";
// import { mockCourses } from "../../data/mockCourses";
import Navbar from "../../components/common/Navbar";
import BackToHome from "../../components/common/BackToHome";
import {getCourseDetails} from '../../api/student.api'
import { useEffect,useState } from "react";
import {useEnrollment} from '../../context/EnrollmentContext';

function CourseDetails() {
  const { id } = useParams();
//   const course = mockCourses.find(c => c.id === id);
     const [course, setCourse]=useState(null);
     const [loading,setLoading]=useState(true);
     const [error,setError] = useState("")
     const {enrollCourse , isEnrolled} = useEnrollment()


  const navigate = useNavigate();


  useEffect(()=>{
     const fetchCourse = async ()=>{
          try {
               const data = await getCourseDetails(id)
               setCourse(data);
          } catch (error) {
               setError("Course not found")
          }
          finally{
               setLoading(false)
          }
     };
     fetchCourse();
  },[id])

  if(loading){
     return <div className="p-10">Loading course...</div>
  }

  if(error){
     return <div className="p-10">{error}</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">
        
        {/* COURSE HEADER */}
        <div className="bg-white rounded-xl p-6 shadow mb-8">
          <h1 className="text-3xl font-semibold mb-2">
            {course.title}
          </h1>
          <p className="text-gray-600 mb-4">
            {course.description}
          </p>
          {!isEnrolled(course._id) ? (
          <button
            onClick={() => {enrollCourse(course._id)
              console.log("Enrolling course with id:", course._id);
            }
            }
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          >
            Enroll
          </button>
        ) : (
          <button
            onClick={() =>
              navigate(
                `/student/course/${course._id}/lesson/${course.lessons[0]._id}`
              )
            }
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Start Learning
          </button>
        )}

        </div>

        {/* LESSON LIST */}
        <div className="bg-white rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">
            Course Content
          </h2>

          <div className="space-y-3">
            {course.lessons.map((lesson, index) => (
              <div
                key={lesson._id}
                className="flex items-center justify-between border p-4 rounded hover:bg-gray-100"
                onClick={()=>{navigate(`/student/course/${course._id}/lesson/${lesson._id}`)}}
              >
                <div>
                  <p className="font-medium">
                    {index + 1}. {lesson.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {lesson.duration}
                  </p>
                </div>

                <span className="text-sm text-indigo-600">
                  {lesson.type.toUpperCase()}
                </span>
                <span className="text-sm text-indigo-600">
                  ▶
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
      <BackToHome/>
    </div>
  );
}

export default CourseDetails;
