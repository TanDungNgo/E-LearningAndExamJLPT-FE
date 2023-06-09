import classNames from "classnames/bind";
import styles from "./ProfileUser.module.scss";
import React, { useEffect, useState } from "react";
import { ConfigProvider, Layout, Menu } from "antd";
import SideMenu from "./components/SideMenu/SideMenu";
import { Content } from "antd/es/layout/layout";
import Footer from "~/layouts/components/Footer/Footer";
import Header from "~/layouts/components/Header/Header";
import AuthService from "~/services/authService";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles);

function ProfileUser({ children }) {
  const { getCurrentUser } = AuthService();
  const user = useSelector((state) => state.auth.login.currentUser);
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    } else {
      getCurrentUser().then((res) => {
        setCurrentUser(res);
      });
    }
  }, []);
  console.log("[User] ", currentUser);
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("profile-user__body")}>
        <div className={cx("content__left")}>
          <SideMenu user={currentUser} />
        </div>
        <div className={cx("content__right")}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default ProfileUser;
