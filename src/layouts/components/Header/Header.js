import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Button from "~/components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faCircleQuestion,
  faGear,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import routes from "~/config/routes";
import Menu from "~/components/Popper/Menu/Menu";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { current } from "@reduxjs/toolkit";
const cx = classNames.bind(styles);
const currentUser = false;
const MENU_ITEMS = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "Course",
    to: "/course",
  },
  {
    title: "Grammar",
    to: "/grammar",
  },
  {
    title: "Vocabulary",
    to: "/vocabulary",
  },
  {
    title: "Article",
    to: "/article",
  },
  {
    title: "Postcast",
    to: "/postcast",
  },
];
const Header = () => {
  const dropdown = () => {
    const toggleBtn = document.getElementsByClassName(cx("toggle-btn"));
    const dropDownMenu = document.getElementsByClassName(cx("dropdown-menu"));
    dropDownMenu[0].classList.toggle(cx("open"));
    const isOpen = dropDownMenu[0].classList.contains(cx("open"));
  };
  const renderMenu = () => {
    return MENU_ITEMS.map((item, index) => {
      return (
        <Link key={index} className={cx("header__link-item")} to={item.to}>
          {item.title}
        </Link>
      );
    });
  };

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
  return (
    <header>
      <div className={cx("navbar")}>
        <div className={cx("logo")}>
          <img width="80" src="/images/Logo1.png" />
        </div>
        <div className={cx("links")}>{renderMenu()}</div>
        <div className={cx("actions")}>
          {currentUser ? (
            <>
              <Tippy content="Notification" placement="bottom">
                <button className={cx("action__btn")}>
                  <FontAwesomeIcon icon={faBell} className={cx("icon")} />
                </button>
              </Tippy>
            </>
          ) : (
            <>
              <Button outline className={cx("action__btn-register")}
              to={routes.signup}>
                Register
              </Button>
              <Button
                primary
                className={cx("action__btn-login")}
                to={routes.signin}
              >
                Login
              </Button>
            </>
          )}
          <Menu items={userMenu}>
            {currentUser ? (
              <img
                src="https://scontent.fdad3-6.fna.fbcdn.net/v/t39.30808-1/335410932_769054791517289_1572875847638970262_n.jpg?stp=dst-jpg_p100x100&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_ohc=67gRauZQTLsAX-YxUqV&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fdad3-6.fna&oh=00_AfAFfL3zUnI8LAaE86iIqIH-X4tEKj5n0RZoscl78Tu_Ow&oe=644712FA"
                className={cx("user-avt")}
                alt="Trang Le"
              />
            ) : (
              <></>
            )}
          </Menu>
          <Menu items={MENU_ITEMS}>
            <div className={cx("toggle-btn")} onClick={dropdown}>
              <FontAwesomeIcon icon={faBars} />
            </div>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
