"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import type { User } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const userData = getCookie("user-data");
      const authToken = getCookie("auth-token");

      if (userData && typeof userData === "string") {
        setUser(JSON.parse(userData));
      }

      if (authToken && typeof authToken === "string") {
        setToken(authToken);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
