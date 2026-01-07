import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ allowedRoles, children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role;

  if (!userRole) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.includes(userRole)) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
