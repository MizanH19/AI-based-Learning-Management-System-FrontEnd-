import React from "react";
import { useNavigate } from "react-router-dom";

function Notfound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-semibold text-gray-800 mb-2">
        Page not found
      </h1>

      <p className="text-gray-500 mb-6">
        The page you are looking for does not exist
      </p>

      <button
        onClick={() => navigate("/login", { replace: true })}
        className="text-indigo-600 hover:underline"
      >
        Go back to Login
      </button>
    </div>
  );
}

export default Notfound;
