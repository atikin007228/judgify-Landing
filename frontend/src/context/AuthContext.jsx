<<<<<<< HEAD
import React, { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(undefined);
const STORAGE_KEY = "judgify_auth_user";

function readStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error("Failed to read auth user from storage", error);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser());

  const login = (userData) => {
    const nextUser = {
      ...userData,
      isRegistered: true,
    };

    setUser(nextUser);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    } catch (error) {
      console.error("Failed to persist auth user", error);
    }
=======
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
  };

  const logout = () => {
    setUser(null);
<<<<<<< HEAD

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear auth user", error);
    }
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: Boolean(user?.isRegistered),
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={value}>
=======
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
>>>>>>> db14104b82b30310a55463a76157b71bf978c90e
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}