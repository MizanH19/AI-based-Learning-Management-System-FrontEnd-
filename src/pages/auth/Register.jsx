import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // ----------------------------
  // State
  // ----------------------------
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // ----------------------------
  // Handle Register
  // ----------------------------
  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Dummy backend response
    const userData = {
      name: name,
      email: email,
      role: "student"
    };

    // Auto login after register
    login(userData);
    navigate("/student");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow">

        {/* TITLE */}
        <h1 className="text-2xl font-semibold text-center mb-2">
          Create your account
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Start learning with CoreLearn
        </p>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm mb-4">
            {error}
          </p>
        )}

        {/* REGISTER FORM */}
        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />

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

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded mt-2"
          >
            Create account
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
