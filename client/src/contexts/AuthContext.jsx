import React, { createContext, useState, useEffect } from "react";
import api from "../configs/api";
import { toast } from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    verifyUser();
  }, []);

  const verifyUser = async () => {
    try {
      const response = await api.get("/api/auth/verify");
      if (response.data.user) {
        setUser(response.data.user);
        setIsLoggedIn(true);
      }
    } catch (error) {
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const response = await api.post("/api/auth/register", {
        name,
        email,
        password,
      });
      if (response.data.user) {
        setUser(response.data.user);
        setIsLoggedIn(true);
        toast.success(response.data.message);
        return { success: true, user: response.data.user };
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      return { success: false, error: error.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await api.post("/api/auth/login", { email, password });
      if (response.data.user) {
        setUser(response.data.user);
        setIsLoggedIn(true);
        toast.success(response.data.message);
        return { success: true, user: response.data.user };
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return { success: false, error: error.response?.data?.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const response = await api.post("/api/auth/logout");
      setUser(null);
      setIsLoggedIn(false);
      toast.success(response.data.message);
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    isLoggedIn,
    register,
    login,
    logout,
    verifyUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
