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
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import routes from "~/configs/routes";
import Menu from "~/components/Popper/Menu/Menu";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import AuthService from "~/services/authService";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles);
const MENU_ITEMS = [
  {
    title: "Home",
    to: routes.home,
  },
  {
    title: "Course",
    to: routes.allCourse,
  },
  {
    title: "Grammar",
    to: routes.grammarsFolder,
  },
  {
    title: "Vocabulary",
    to: routes.vocabularyFolder,
  },
  {
    title: "Exam",
    to: routes.examFolder,
  },
  {
    title: "Article",
    to: routes.publicProfile,
  },
  {
    title: "Postcast",
    to: "/postcast", 
  },
];
const Header = () => {
  const { getCurrentUser, logout } = AuthService();
  // const currentUser = useSelector((state) => state.auth.login.currentUser);
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    getCurrentUser().then((res) => {
      setCurrentUser(res);
    });
  }, []);
  console.log("[User] ", currentUser);
  const dropdown = () => {
    const dropDownMenu = document.getElementsByClassName(cx("dropdown-menu"));
    dropDownMenu[0].classList.toggle(cx("open"));
  };
  const handleLogout = () => {
    window.location.reload();
    logout();
  };
  const renderMenu = () => {
    return MENU_ITEMS.map((item, index) => {
      return (
        <NavLink
          key={index}
          className={(nav) => cx("header__link-item", { active: nav.isActive })}
          to={item.to}
        >
          {item.title}
        </NavLink>
      );
    });
  };

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: "View profile",
      to: routes.publicProfile,
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
      separate: true,
      onClick: handleLogout,
    },
  ];

  return (
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
            <Button
              outline
              className={cx("action__btn-register")}
              to={routes.signup}
            >
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
              src={currentUser.avatar}
              className={cx("user-avt")}
              alt={currentUser.username}
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
  );
};

export default Header;
