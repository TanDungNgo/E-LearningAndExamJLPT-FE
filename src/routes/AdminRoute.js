import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import routes from "~/configs/routes";
import AuthService from "~/services/authService";
function AdminRoute() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const token = JSON.parse(localStorage.getItem("token"));
  if (token !== null) {
    return <Outlet />;
  }
  notification.error({
    message: "Unauthorized",
    description: "You are not authorized to access this page!",
  });
  return <Navigate to={routes.signin} />;
}

export default AdminRoute;
