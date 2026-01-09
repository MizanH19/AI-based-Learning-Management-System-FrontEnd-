import { useNavigate, useLocation } from "react-router-dom";

const BackToHome = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/student") return null;

  return (
    <button
      onClick={() => navigate("/student")}
      className="
        fixed bottom-6 left-6 z-50
        bg-indigo-600 text-white
        px-5 py-3 rounded-full
        shadow-lg
        hover:bg-indigo-700
        transition-all
      "
    >
      Back To Home
    </button>
  );
};

export default BackToHome;
