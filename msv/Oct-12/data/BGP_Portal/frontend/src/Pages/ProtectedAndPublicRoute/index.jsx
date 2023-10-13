import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const token = localStorage.getItem("bgp_token");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export const PublicRoute = () => {
  const token = localStorage.getItem("bgp_token");

  return !token ? <Outlet /> : <Navigate to="/" replace />;
};
