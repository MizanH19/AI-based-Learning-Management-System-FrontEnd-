import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {AuthProvider} from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { EnrollmentProvider } from './context/EnrollmentContext.jsx'
import CreateCourse from './pages/instructor/CreateCourse.jsx'
import InstructorCourseManage from './pages/instructor/InstructorCourseManage.jsx'
import InstructorStudents from './pages/instructor/InstructorStudents.jsx'
import InstructorAddLesson from './pages/instructor/InstructorAddLesson.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <AuthProvider>
      <EnrollmentProvider>
        <App />
      </EnrollmentProvider>
    </AuthProvider>
    // <CreateCourse/>
    // <InstructorCourseManage/>
    // <InstructorStudents/>
    // <InstructorAddLesson/>
  // {/* </StrictMode>, */}
)
