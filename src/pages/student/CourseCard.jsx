import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
   
    <div className="bg-white rounded-2xl 
                border border-gray-100
                shadow-sm hover:shadow-xl
                transition-all duration-300
                hover:-translate-y-1
                flex flex-col overflow-hidden">
      
      {/* COURSE IMAGE */}
      <div className="relative">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-44 object-cover"
      />
     </div>
      {/* COURSE INFO */}
      <div className="p-4 flex flex-col flex-1 space-y-2">
        <h3 className="font-semibold text-base leading-snug line-clamp-2">
          {course.title}
        </h3>

        <p className="text-xs text-gray-500 space-y-3">
          Duration: {course.duration}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>⭐ {course.rating}</span>
          <span>{course.learners}+ learners</span>
        </div>

        <button
          onClick={() => navigate(`/student/course/${course.id}`)}
          className="w-full mt-auto bg-indigo-600 text-white text-sm py-2 rounded-lg
                   hover:bg-indigo-700 transition"
        >
          View Course
        </button>
      </div>
    </div>
    
  );
};

export default CourseCard;
