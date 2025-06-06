/* eslint-disable no-unused-vars */
"use client";

import React, { createContext, useContext, useState } from "react";

import { app } from "@services/app.service";

export type Session = any

type AuthContextType = {
  session: Session | undefined;
  setSession: (user: Session | undefined) => void;
  logout: () => void;
};

type AuthProviderType = {
  children: React.ReactNode;
  initialSession: Session | undefined;
};

export const AuthContext = createContext<AuthContextType>({
  session: undefined,
  setSession: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children, initialSession }: AuthProviderType) => {
  const [session, setSession] = useState<Session | undefined>(initialSession);

  const logout = async () => {
    if (!session) return;

    await app({ url: "/app/auth/logout" });

    window.location.reload();
  };

  return <AuthContext.Provider value={{ session, setSession, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
