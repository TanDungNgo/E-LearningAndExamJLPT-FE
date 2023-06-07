import { Badge, Breadcrumb, ConfigProvider, Drawer, List, Space } from "antd";
import SideMenu from "./components/SideMenu/SideMenu";
import classNames from "classnames/bind";
import styles from "./Admin.module.scss";
import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Row, Col, Layout, theme } from "antd";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import config from "~/configs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Footer from "~/layouts/components/Footer/Footer";
import AvatarWithDropdown from "~/components/AvatarWithDropdown/AvatarWithDropdown";
import AuthService from "~/services/authService";
import { useSelector } from "react-redux";
import routes from "~/configs/routes";
const cx = classNames.bind(styles);
const { Header, Sider, Content } = Layout;

function Admin({ children }) {
  const [comments, setComments] = useState(["Hello"]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { getCurrentUser, logout } = AuthService();
  const user = useSelector((state) => state.auth.login.currentUser);
  const [currentUser, setCurrentUser] = useState();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const breadcrumbItems = pathSnippets.map((snippet, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    const isLast = index === pathSnippets.length - 1;
    return (
      <Breadcrumb.Item key={url}>
        {isLast ? (
          <span>{snippet.toUpperCase()}</span>
        ) : (
          <Link to={url}>{snippet.toUpperCase()}</Link>
        )}
      </Breadcrumb.Item>
    );
  });
  const handleLogout = () => {
    logout();
  };
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCurrentUser = async () => {
      let currentUser = null;
      if (user) {
        currentUser = user;
      } else {
        currentUser = await getCurrentUser();
      }
      setCurrentUser(currentUser);
      // if (currentUser) {
      //   const hasAdminRole = currentUser.roles.some(
      //     (role) => role.name === "ADMIN"
      //   );
      //   console.log("hasAdminRole", hasAdminRole);
      //   if (!hasAdminRole) {
      //     navigate(routes.home);
      //   }
      // }
    };
    fetchCurrentUser();
  }, []);
  return (
    <Layout>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className={cx("admin__logo")}>
            <Link to={config.routes.home}>
              <img
                className={cx("admin__logo-image")}
                src="/images/logo2.png"
                alt="logo"
              />
            </Link>
          </div>
          <SideMenu />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Row>
              <Col md={18} className={cx("admin__header-left")}>
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: cx("trigger"),
                    onClick: () => setCollapsed(!collapsed),
                  }
                )}
                <Breadcrumb style={{ margin: "0 20px" }}>
                  {breadcrumbItems}
                </Breadcrumb>
              </Col>
              <Col md={6} className={cx("admin__header-right")}>
                <Space style={{ display: "flex" }}>
                  <Badge dot>
                    <FontAwesomeIcon
                      className={cx("admin__icon")}
                      icon={faEnvelope}
                    />
                  </Badge>
                  <Badge count={comments.length}>
                    <FontAwesomeIcon
                      className={cx("admin__icon")}
                      icon={faBell}
                      onClick={() => {
                        setCommentsOpen(true);
                      }}
                    />
                  </Badge>
                  <Space
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 10px",
                      marginTop: "-10px",
                    }}
                  >
                    <Badge>
                      <AvatarWithDropdown
                        user={currentUser}
                        logout={handleLogout}
                      />
                    </Badge>
                  </Space>
                </Space>
                <Drawer
                  title="Notifications"
                  open={commentsOpen}
                  onClose={() => {
                    setCommentsOpen(false);
                  }}
                  maskClosable
                >
                  <List
                    dataSource={comments}
                    renderItem={(item) => {
                      return <List.Item>{item.body}</List.Item>;
                    }}
                  ></List>
                </Drawer>
              </Col>
            </Row>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
      <div style={{ marginTop: "65px" }}>
        <Footer />
      </div>
    </Layout>
  );
}

export default Admin;
