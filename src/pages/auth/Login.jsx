import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // ----------------------------
  // State
  // ----------------------------
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ----------------------------
  // Handle Login
  // ----------------------------
  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    // Dummy auth (backend later)
    const userData = {
      name: role === "admin" ? "Admin" : "Student",
      role: role,
      email: email
    };

    login(userData);

    // Redirect based on role
    navigate(role === "admin" ? "/admin" : "/student");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow">

        {/* TITLE */}
        <h1 className="text-2xl font-semibold text-center mb-2">
          Welcome back
        </h1>
        <p className={`${role==='admin'?"hidden":"text-sm text-gray-500 text-center mb-6"}`}>
          Login to continue learning
        </p>

        {/* ROLE SELECTOR */}
        <div className="flex mb-6 border rounded overflow-hidden">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`flex-1 py-2 text-sm ${
              role === "student"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            Student
          </button>

          <button
            type="button"
            onClick={() => setRole("admin")}
            className={`flex-1 py-2 text-sm ${
              role === "admin"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            Admin
          </button>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <p className="text-red-500 text-sm mb-4">
            {error}
          </p>
        )}

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded mt-2"
          >
            Login as {role}
          </button>
        </form>

        {/* REGISTER LINK */}
        <p className={`${role==='admin'?"hidden":"text-sm text-center text-gray-500 mt-6"}`}>
          New here?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
