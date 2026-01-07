// src/Components/ProtectedRoute.jsx

import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../utils/auth";

const ProtectedRoute = ({ children, allowedRole }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/unauthorized" replace />;
  }

  const userRole = getUserRole();

  if (userRole !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
