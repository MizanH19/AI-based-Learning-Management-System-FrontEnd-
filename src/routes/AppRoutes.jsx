import React from 'react'
import { createBrowserRouter,BrowserRouter as Router,Navigate, Routes, Route,RouterProvider } from "react-router-dom";
import Login from '../pages/auth/Login';
import StudentHome from '../pages/student/StudentHome';
import RoleProtectedRoute from './RoleProtectedRoute';
import AdminHome from '../pages/admin/AdminHome';
import Notfound from '../pages/Notfound';
import CourseCatalog from "../pages/student/CourseCatalog";
import MyCourses from '../pages/student/MyCourses';
import LessonPlayer from "../pages/student/LessonPlayer";
import AdminCourses from "../pages/admin/AdminCourses";
import AdminUsers from '../pages/admin/AdminUsers';
import Register from "../pages/auth/Register";
import CourseDetails from '../pages/student/CourseDetails';

const router=createBrowserRouter(
     [
          {
               path: "/register",
               element: <Register />
          },
          {
               path: '/',
               element: <Login />
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
               path: "/student/courses",
               element: (
               <RoleProtectedRoute allowedRoles={["student"]}>
                    <CourseCatalog />
               </RoleProtectedRoute>
               )
          },
          {
               path: "/student/my-courses",
               element: (
               <RoleProtectedRoute allowedRoles={["student"]}>
                    <MyCourses />
               </RoleProtectedRoute>
               )
          },
          // {
          //      path: "/student/lesson/:id",
          //      element: (
          //      <RoleProtectedRoute allowedRoles={["student"]}>
          //           <LessonPlayer />
          //      </RoleProtectedRoute>
          //      )
          // },
          {
               path: "/admin/courses",
               element: (
               <RoleProtectedRoute allowedRoles={["admin"]}>
                    <AdminCourses />
               </RoleProtectedRoute>
               )
          },
          {
               path:"/admin/users",
               element:(
                    <RoleProtectedRoute allowedRoles={['admin']}>
                         <AdminUsers />
                    </RoleProtectedRoute>
               )
          },
          {
               path:"/student/course/:id",
               element:(
                    <RoleProtectedRoute allowedRoles={["student"]}>
                         <CourseDetails/>
                    </RoleProtectedRoute>
               )
          },
          {
               path: "/student/course/:courseId/lesson/:lessonId",
               element: (
               <RoleProtectedRoute allowedRoles={["student"]}>
                    <LessonPlayer />
               </RoleProtectedRoute>
               )
               },
          {
               path:"*",
               element:<Notfound/>
          },
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
