import { Badge, Drawer, List, Space } from "antd";
import SideMenu from "./components/SideMenu/SideMenu";
import classNames from "classnames/bind";
import styles from "./Admin.module.scss";
import "./AntDesign.css";
import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Avatar, Row, Col, Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
import config from "~/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope } from "@fortawesome/free-regular-svg-icons";
const cx = classNames.bind(styles);
const { Header, Sider, Content } = Layout;

function Admin({ children }) {
  const [comments, setComments] = useState(["Hello"]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
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
        <SideMenu></SideMenu>
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
                  className: "trigger",
                  onClick: () => setCollapsed(!collapsed),
                }
              )}
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
              </Space>
              {/* <Avatar size="default" icon={<UserOutlined />}></Avatar> */}
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
            padding: 20,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default Admin;
