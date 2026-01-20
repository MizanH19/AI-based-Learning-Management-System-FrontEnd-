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
import LessonQuiz from '../pages/student/LessonQuiz'
import AdminLessons from '../pages/admin/AdminLessons';
import InstructorHome from '../pages/instructor/InstructorHome';
import InstructorCourses from '../pages/instructor/InstructorCourses';
import CreateCourse from '../pages/instructor/CreateCourse';
import InstructorCourseManage from '../pages/instructor/InstructorCourseManage';
import InstructorAddLesson from '../pages/instructor/InstructorAddLesson';
import InstructorStudents from '../pages/instructor/InstructorStudents';
import InstructorProgressDashboard from '../pages/instructor/InstructorProgressDashboard';
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
          {
               path: "/admin/lessons",
               element: (
               <RoleProtectedRoute allowedRoles={["admin"]}>
                    <AdminLessons />
               </RoleProtectedRoute>
               )
          },
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
               path: "/student/course/:courseId",
               element: (
               <RoleProtectedRoute allowedRoles={["student"]}>
                    <CourseDetails />
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
               path: "/student/course/:courseId/lesson/:lessonId",
               element: (
               <RoleProtectedRoute allowedRoles={["student"]}>
                    <LessonPlayer />
               </RoleProtectedRoute>
               )
               },
               {
                    path:"/student/course/:courseId/lesson/:lessonId/quiz",
                    element:(
                         <RoleProtectedRoute allowedRoles={['student']}>
                              <LessonQuiz/>
                         </RoleProtectedRoute>
                    )
               },
               {
                    path:'/instructor',
                    element:(
                         <RoleProtectedRoute allowedRoles={['instructor']}>
                              <InstructorHome/>
                         </RoleProtectedRoute>
                    )
               },

               {
                    path:'/instructor/courses',
                    element:(
                         <RoleProtectedRoute allowedRoles={['instructor']}> 
                              <InstructorCourses/>
                         </RoleProtectedRoute>
                    )
               },
               {
                    path:'/instructor/courses/create',
                    element:(
                         <RoleProtectedRoute allowedRoles={['instructor']}>
                              <CreateCourse/>
                         </RoleProtectedRoute>
                    )
               },
               {
                    path:'/instructor/course/:courseId',
                    element:(
                         <RoleProtectedRoute allowedRoles={['instructor']}>
                              <InstructorCourseManage/>
                         </RoleProtectedRoute>
                    )
               },
               {
                    path:'/instructor/course/:courseId/lesson',
                    element:(
                         <RoleProtectedRoute allowedRoles={['instructor']}>
                              <InstructorAddLesson/>
                         </RoleProtectedRoute>
                    )
               },
               {
                    path:'/instructor/course/:courseId/students',
                    element:(
                         <RoleProtectedRoute allowedRoles={['instructor']}>
                              <InstructorStudents/>
                         </RoleProtectedRoute>
                    )
               },
               {
                    path:'/instructor/course/:courseId/progress',
                    element:(
                         <RoleProtectedRoute allowedRoles={['instructor']}>
                              <InstructorProgressDashboard/>
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
