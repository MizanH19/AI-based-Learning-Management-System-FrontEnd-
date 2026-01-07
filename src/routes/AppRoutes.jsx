import React from 'react'
import { createBrowserRouter,BrowserRouter as Router,Navigate, Routes, Route,RouterProvider } from "react-router-dom";
import Login from '../pages/auth/Login';
import StudentHome from '../pages/student/StudentHome';
import RoleProtectedRoute from './RoleProtectedRoute';
import AdminHome from '../pages/admin/AdminHome';
import Notfound from '../pages/Notfound';
import CourseCatalog from "../pages/student/CourseCatalog";



const router=createBrowserRouter(
     [
          {
               path:'/',
               element:<Navigate to="Login"/>
          },
          {
               path:'/login',
               element:<Login/>
          },
          {
               path:'/student',
               element:(
                    <RoleProtectedRoute allowedRoles={['student']}>
                         <StudentHome/>
                    </RoleProtectedRoute>)
          },
          {
               path:'/admin',
               element:(
                    <RoleProtectedRoute allowedRoles={['admin']}>
                         <AdminHome/>
                    </RoleProtectedRoute>
               )
          },
          {
               path:"*",
               element:<Notfound/>
          },
          {
               path: "/student/courses",
               element: (
               <RoleProtectedRoute allowedRoles={["student"]}>
                    <CourseCatalog />
               </RoleProtectedRoute>
               )
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
