import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';


function Login() {
  const {auth,login}=useContext(AuthContext);
    const navigate=useNavigate();
  useEffect(() => {
    if (auth?.role === "student") navigate("/student");
    if (auth?.role === "admin") navigate("/admin");
  }, [auth, navigate]);
  const handleLoginStudent=()=>{
    login({
      role: "student",
      token: "dummy_token_123"
    });
    navigate("/student")
  }
  const handleLoginAdmin=()=>{
    login({
      role: "admin",
      token: "dummy_token_123"
    });
    navigate("/admin")
  }
  
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center text-black">Login</h2>

        <button
          onClick={handleLoginStudent}
          className="bg-indigo-600 text-white w-full py-2 rounded my-5"
        >
          Login as Student
        </button>
        <button
          onClick={handleLoginAdmin}
          className="bg-yellow-600 text-white w-full py-2 rounded my-5"
        >
          Login as Admin
        </button>
        
      </div>
    </div>
  )
}

export default Login
