import React from "react";
import { Navigate } from "react-router-dom";

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Check if user is logged in

  return isAuthenticated ? children : <Navigate to="/signup" />;
};

export default ProtectedRoute;
