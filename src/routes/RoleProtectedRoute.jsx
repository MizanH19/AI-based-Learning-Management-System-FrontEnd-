import React, { Children, useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'

const RoleProtectedRoute=({children, allowedRoles})=>{
     const {auth} =useContext(AuthContext);

     if(!auth){
          return <Navigate to='/login' replace />
     }

     if(!allowedRoles.includes(auth.role)){
          return <Navigate to="/login" replace state={{ reason: "unauthorized" }} />;

     }

     return children;
}

export default RoleProtectedRoute
