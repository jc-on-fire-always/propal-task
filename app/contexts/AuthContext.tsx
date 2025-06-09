"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  username: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    username: string,
    email: string,
    password: string,
    phone?: string
  ) => Promise<boolean>;
  logout: () => void;
  updateProfile: (email: string, password?: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("propal_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signup = async (
    username: string,
    email: string,
    password: string,
    phone?: string
  ): Promise<boolean> => {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, phone }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Failed to create account");
        return false;
      }

      toast.success("Account created successfully!");
      return true;
    } catch (error) {
      toast.error("Failed to create account");
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Invalid email or password");
        return false;
      }

      setUser(data.user);
      localStorage.setItem("propal_user", JSON.stringify(data.user));
      toast.success("Logged in successfully!");
      return true;
    } catch (error) {
      toast.error("Failed to login");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("propal_user");
    toast.success("Logged out successfully!");
  };

  const updateProfile = async (
    email: string,
    password?: string
  ): Promise<boolean> => {
    try {
      if (!user) return false;

      const res = await fetch("/api/update-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Failed to update profile");
        return false;
      }

      setUser(data.user);
      localStorage.setItem("propal_user", JSON.stringify(data.user));
      toast.success("Profile updated successfully!");
      return true;
    } catch (error) {
      toast.error("Failed to update profile");
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, updateProfile }}
    >
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
