import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ authenticate, children }) => {
  return authenticate ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
