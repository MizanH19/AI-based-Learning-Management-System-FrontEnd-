// src/routes/RoleProtectedRoute.jsx

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { auth } = useContext(AuthContext);

  /**
   * auth shape:
   * null
   * OR
   * {
   *   token: string,
   *   role: "admin" | "student"
   * }
   */

  // 1️⃣ Not logged in or token missing
  if (!auth || !auth.token) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ Logged in but role not allowed
  if (!allowedRoles.includes(auth.role)) {
    // Redirect to correct dashboard instead of login
    if (auth.role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    if (auth.role === "student") {
      return <Navigate to="/student" replace />;
    }

    // Fallback safety
    return <Navigate to="/login" replace />;
  }

  // 3️⃣ Authorized
  return children;
};

export default RoleProtectedRoute;
