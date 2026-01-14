import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // 1️⃣ Load auth from localStorage on first render
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : null;
  });

  // 2️⃣ Login → save to state + localStorage
  const login = ({ token, role ,name }) => {
  const authData = { token, role,name };
  setAuth(authData);
  localStorage.setItem("auth", JSON.stringify(authData));
};


  // 3️⃣ Logout → clear everything
  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
