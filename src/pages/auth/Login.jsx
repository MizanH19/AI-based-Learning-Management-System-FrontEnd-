import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { login as loginApi } from "../../api/auth.api";

const Login = () => {
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  // const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }
    try {
      const res = await loginApi({email, password})
      authLogin(res)
      navigate(res.role === "admin" ? "/admin" : "/student");
    } catch (error) {
      setError("Invalid credentials")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">

      <div className="w-full max-w-md backdrop-blur-xl bg-white/90 
        p-8 rounded-2xl shadow-2xl">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-1">
          Welcome Back 👋
        </h1>

        <p className="text-sm text-gray-500 text-center mb-6">
          Login to continue your learning journey
        </p>


        {/* ROLE SELECTOR */}
        {/* <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
          {["student", "admin"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`flex-1 py-2 rounded-md text-sm font-medium transition-all
                ${
                  res.role === r
                    ? "bg-indigo-600 text-white shadow"
                    : "text-gray-600 hover:bg-white"
                }`}
            >
              {r === "student" ? "Student 🎓" : "Admin 🛠️"}
            </button>
          ))}
        </div> */}

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">
            {error}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 
              text-white py-3 rounded-lg font-semibold 
              hover:opacity-90 transition-all shadow-lg"
          >
            Login 
          </button>
        </form>

        {/* REGISTER */}
        <p className="text-sm text-center text-gray-600 mt-6">
          New here?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
