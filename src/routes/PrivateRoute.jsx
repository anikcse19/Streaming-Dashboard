/* eslint-disable react/prop-types */
// src/routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ children }) => {
  const token = Cookies.get("stream-token");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoute;
