import React from 'react'
import { createBrowserRouter,BrowserRouter as Router, Routes, Route,RouterProvider } from "react-router-dom";
import Login from '../pages/auth/Login';
import StudentHome from '../pages/student/StudentHome';

const router=createBrowserRouter(
     [
          {
               path:'/login',
               element:<Login/>
          },
          {
               path:'/student',
               element:<StudentHome></StudentHome>
          }
     ]
)

function AppRoutes() {
  return (
//     <Router>
//      <Routes>
//           <Route path='/login' element={<Login></Login>} />
//           <Route path='/student' element={<StudentHome/>} />
//      </Routes>
//     </Router>
          
            <RouterProvider router={router}></RouterProvider>
        
  )
}

export default AppRoutes
