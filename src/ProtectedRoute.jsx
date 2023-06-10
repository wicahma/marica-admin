import React from "react";
import { useAuth } from "./Auth";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const auth = useAuth();

  if (Object.keys(auth.user).length === 0) {
    return <Navigate to="/auth/sign-in" />;
  }
  return children;
};
