import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("authToken") || null);
  const [userId, setUserId] = useState(() => localStorage.getItem("userId") || null);
  const [userRole, setUserRole] = useState(() => localStorage.getItem("role") || null);

  const isAuthenticated = !!token;
  const isAdmin = userRole === "ADMIN";

  const login = useCallback((jwt, id, role) => {
    localStorage.setItem("authToken", jwt);
    localStorage.setItem("userId", String(id));
    localStorage.setItem("role", role);
    setToken(jwt);
    setUserId(String(id));
    setUserRole(role);
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    setToken(null);
    setUserId(null);
    setUserRole(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, userId, userRole, isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
