import { useEffect, useState } from 'react'

import Login from './pages/auth/Login';
import StudentHome from './pages/student/StudentHome';
import AuthTester from './components/common/AuthTester'
import AppRoutes from './routes/AppRoutes'
// import { testApi } from './api/auth.api';

function App() {
  // const [count, setCount] = useState(0)
  // useEffect(()=>{
  //   testApi();
  // },[])

  return (
    <>

        <AppRoutes/>


        
    </>
  )
}

export default App
