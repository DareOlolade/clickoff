// context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isGuest, setIsGuest] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsGuest(false);
    }
    
    setLoading(false);
  }, []);

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    setIsGuest(false);
    localStorage.setItem("token", userToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsGuest(true);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const playAsGuest = () => {
    setIsGuest(true);
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    isGuest,
    loading,
    login,
    logout,
    playAsGuest,
    isAuthenticated: !isGuest && !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};