import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthService from "~/services/authService";
function UserRoute() {
  const [currentUser, setCurrentUser] = useState(null);
  const { getCurrentUser } = AuthService();
  const token = JSON.parse(localStorage.getItem("token"));

  if (token !== null) {
    return <Outlet />;
  }
  notification.error({
    message: "Unauthorized",
    description: "You are not authorized to access this page!",
  });
  return <Navigate to={"/login"} />;
}

export default UserRoute;
