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
import { Link, useLocation } from "react-router-dom";
import config from "~/configs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Footer from "~/layouts/components/Footer/Footer";
import AvatarWithDropdown from "~/components/AvatarWithDropdown/AvatarWithDropdown";
import {
  faCircleQuestion,
  faGear,
  faListCheck,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Menu from "~/components/Popper/Menu/Menu";
const cx = classNames.bind(styles);
const { Header, Sider, Content } = Layout;

const userMenu = [
  {
    icon: <FontAwesomeIcon icon={faUser} />,
    title: "View profile",
    to: "/@trang",
  },
  {
    icon: <FontAwesomeIcon icon={faGear} />,
    title: "Settings",
    to: "/settings",
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: "Feedback and help",
    to: "/feedback",
  },
  {
    icon: <FontAwesomeIcon icon={faListCheck} />,
    title: "System Management",
    to: "/admin/user",
  },
  {
    icon: <FontAwesomeIcon icon={faSignOut} />,
    title: "Log out",
    to: "/logout",
    separate: true,
  },
];
function Admin({ children }) {
  const [comments, setComments] = useState(["Hello"]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
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
  return (
    <Layout>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className={cx("admin__logo")}>
            <Link to={config.routes.admin}>
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
                  {/* <Breadcrumb.Item>
                    <Link to="/">Home</Link>
                  </Breadcrumb.Item> */}
                  {breadcrumbItems}
                </Breadcrumb>
              </Col>
              <Col md={6} className={cx("admin__header-right")}>
                <Space>
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
                  <Badge>
                    <Menu items={userMenu}>
                      {/* <FontAwesomeIcon icon={faUser} /> */}
                      <img
                        src="https://i.pinimg.com/originals/51/90/10/519010d9ee8167bfe445e616f260f758.png"
                        className={cx("user-avt")}
                        alt="admin"
                      />
                    </Menu>
                  </Badge>
                </Space>
                <Drawer
                  title="Comments"
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
