import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token"); // Retrieve token from local storage

  return user && token ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoute;
