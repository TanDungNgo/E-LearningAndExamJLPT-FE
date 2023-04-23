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
import { Link } from "react-router-dom";
import config from "~/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Footer from "~/layouts/components/Footer/Footer";
import {
  faCircleQuestion,
  faGear,
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
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#b79032",
        },
      }}
    >
      <Layout>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className={cx("admin__logo")}>
              <Link to={config.routes.admin}>
                <img
                  className={cx("admin__logo-image")}
                  src="/image/logo2.png"
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
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Courses</Breadcrumb.Item>
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
                          src="https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-1/335410932_769054791517289_1572875847638970262_n.jpg?stp=dst-jpg_p100x100&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_ohc=67gRauZQTLsAX-YxUqV&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fdad3-6.fna&oh=00_AfAFfL3zUnI8LAaE86iIqIH-X4tEKj5n0RZoscl78Tu_Ow&oe=644712FA"
                          className={cx("user-avt")}
                          alt="Trang Le"
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
    </ConfigProvider>
  );
}

export default Admin;
