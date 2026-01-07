import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';

function AuthTester() {
     const {auth, login, logout}=useContext(AuthContext);
  return (
          <div className='bg-white p-6 rounded shadow w-96'>
               <h2 className='"text-lg font-bold mb-4"'>Auth Context test</h2>
               {auth?(
                  <>
                    <p className='mb-3 text-black'>
                         Logged in as: <b>{auth.role}</b>
                    </p>
                    <button onClick={logout} className='bg-red-500 text-white px-4 py-2 rounded'>Logout</button>
                  </>  
               ):(
                    <button
                         onClick={() =>
                         login({ role: "student", token: "dummy_token" })
                         }
                         className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                         Login as Student
                    </button>
                 )}
          </div>
  
  )
}

export default AuthTester
