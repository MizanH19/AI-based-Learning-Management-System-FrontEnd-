import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ----------------------------
  // Load auth from localStorage
  // ----------------------------
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : null;
  });

  // ----------------------------
  // Persist auth changes
  // ----------------------------
  useEffect(() => {
    if (auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  // ----------------------------
  // Mock login
  // ----------------------------
  const login = (userData) => {
    setAuth(userData);
  };

  // ----------------------------
  // Logout
  // ----------------------------
  const logout = () => {
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
