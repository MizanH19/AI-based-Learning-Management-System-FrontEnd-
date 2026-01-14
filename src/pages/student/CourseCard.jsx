import { useNavigate } from "react-router-dom";

const CourseCard = ({ course, actionLabel, onAction, disabled }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/student/course/${course.id}`)}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden
      border border-gray-100 h-3xl shadow-sm
      hover:shadow-2xl hover:-translate-y-1
      transition-all duration-300 cursor-pointer hover:scale-[1.02]
hover:shadow-2xl
transition-all duration-300
"
    >
      {/* IMAGE */}
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="h-44 w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 
        group-hover:opacity-100 transition" />

        <span className="absolute top-3 left-3 bg-indigo-600 text-white 
        text-xs px-3 py-1 rounded-full shadow">
          New
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col h-full">
        <h3 className="font-semibold text-gray-900 text-base leading-snug line-clamp-2">
          {course.title}
        </h3>

        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
          <span>⭐ 4.8</span>
          <span>12k learners</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAction?.();
            navigate(`/student/course/${course.id}`)
          }}
          disabled={disabled}
          className={`mt-auto w-full py-2 rounded-lg text-sm font-medium
            transition active:scale-95 transition-transform 
            ${
              disabled
                ? "bg-green-600 text-white"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
