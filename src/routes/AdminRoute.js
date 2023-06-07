import { Space, Spin, notification } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import routes from "~/configs/routes";
import AuthService from "~/services/authService";

function AdminRoute() {
  const { getCurrentUser } = AuthService();
  const user = useSelector((state) => state.auth.login.currentUser);
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        const hasAdminRole = user.roles.some((role) => role.name === "ADMIN");
        if (!hasAdminRole) {
          notification.error({
            message: "Unauthorized",
            description: "You are not authorized to access this page!",
          });
        } else {
          setIsAdmin(true);
        }
      }
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Space style={{ marginTop: "100px" }}>
          <Spin tip="Loading" size="large" style={{ fontSize: "30px" }}></Spin>
        </Space>
      </div>
    );
  }
  return isAdmin ? <Outlet /> : <Navigate to={routes.home} />;
}

export default AdminRoute;
