import { useNavigate } from "react-router-dom";

const CourseCard = ({ course, actionLabel, onAction, disabled }) => {
  const navigate = useNavigate();

  return (
   
    <div
  className="
    bg-white rounded-xl
    shadow-sm
    hover:shadow-2xl
    hover:-translate-y-1
    transition-all duration-300
  "
>

    <div className="bg-white rounded-2xl 
                border border-gray-100
                shadow-sm hover:shadow-xl
                transition-all duration-300
                hover:-translate-y-1
                flex flex-col overflow-hidden"
                onClick={() => navigate(`/student/course/${course.id}`)}>
      
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
            onClick={(e) => {
              e.stopPropagation();
              onAction?.();
            }}
            disabled={disabled}
            className={`w-full mt-auto text-sm py-2 rounded-lg transition
              ${
                disabled
                  ? "bg-green-500 text-white cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
          >
            {actionLabel}
        </button>

      </div>
    </div>
    </div>
    
  );
};

export default CourseCard;
