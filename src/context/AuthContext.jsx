import React, { createContext, useState,useEffect } from 'react'
export const AuthContext = createContext(null);
export const AuthProvider =({children})=>{
     const [auth,setAuth]=useState(null);

     const login=(data)=>{
          setAuth(data);
          
          
     }
       useEffect(() => {
    console.log("Auth updated:", auth);
  }, [auth]);
     const logout=()=>{
          setAuth(null);
     }

     return(
          <AuthContext.Provider value={{auth,login,logout}}>
               {children}
          </AuthContext.Provider>
     )
     
}


