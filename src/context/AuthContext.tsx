import React, { createContext, useContext, useState } from "react";

import { login } from "@/services/api/authApi";
import { LoginType, UserType } from "@/lib/types";

type AuthContextType = {
  user: UserType | null;
  handleLogin: ({ username, password }: LoginType) => Promise<void>;
  handleLogout: () => void;
};

type AuthContextProviderType = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  const [user, setUser] = useState<UserType | null>(() => {
    const userProfile = localStorage.getItem("user");
    if (userProfile) {
      return JSON.parse(userProfile);
    }
    return null;
  });

  const handleLogin = async ({ username, password }: LoginType) => {
    const response = await login({ username, password });

    if (response !== undefined) {
      localStorage.setItem("user", JSON.stringify(response));
      setUser(response);
      return;
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
