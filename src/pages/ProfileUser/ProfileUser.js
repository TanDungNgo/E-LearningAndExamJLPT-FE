import classNames from "classnames/bind";
import styles from "./ProfileUser.module.scss";
import React, { useState } from "react";
import { ConfigProvider, Layout, Menu } from "antd";
import SideMenu from "./components/SideMenu/SideMenu";
import { Content } from "antd/es/layout/layout";
import Footer from "~/layouts/components/Footer/Footer";
import Header from "~/layouts/components/Header/Header";
const cx = classNames.bind(styles);

function ProfileUser({ children }) {
  return (
    <div>
      <Header />
      <div className={cx("profile-user__body")}>
        <div className={cx("content__left")}>
          <SideMenu />
        </div>
        <div className={cx("content__right")}>
          {children}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default ProfileUser