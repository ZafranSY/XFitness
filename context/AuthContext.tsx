
import React, { createContext, useContext, useState } from "react";

type User = object | null;

interface AuthContextData {
  user: User;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setAuth] = useState<User>(null);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => setAuth({ name: "User" }),
        signOut: () => setAuth(null),
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
