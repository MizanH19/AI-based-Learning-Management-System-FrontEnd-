import { useState } from 'react'

import Login from './pages/auth/Login';
import StudentHome from './pages/student/StudentHome';
import AuthTester from './components/common/AuthTester'
import AppRoutes from './routes/AppRoutes'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>

        <AppRoutes/>


        
    </>
  )
}

export default App
