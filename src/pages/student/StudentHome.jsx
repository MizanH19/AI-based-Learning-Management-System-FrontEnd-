import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/common/Navbar';
import AITutor from "../../components/ai/AITutor";

function StudentHome() {
  let {auth,logout}=useContext(AuthContext)
  // let navigate = useNavigate();

  // const handleLogout=()=>{
  //   logout();
  //   navigate("/login")
  // }
  return (
     <div className="min-h-screen  bg-gray-100">
      
      <Navbar/>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Welcome, {auth?.role}
          </h1>

          
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa, porro iusto explicabo aliquid alias quibusdam facere asperiores blanditiis qui earum accusamus nam corrupti aliquam exercitationem fuga excepturi atque iure. Nemo!</p>
          <p>Courses, progress, AI chat will appear here.</p>
        </div>
      </div>
      <AITutor />

    </div>
  )
}

export default StudentHome
