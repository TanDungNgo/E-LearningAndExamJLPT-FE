import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Button from "~/components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import routes from "~/configs/routes";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import AuthService from "~/services/authService";
import { useSelector } from "react-redux";
import AvatarWithDropdown from "~/components/AvatarWithDropdown/AvatarWithDropdown";
import { Dropdown, Menu } from "antd";
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
    to: routes.articlesFolder,
  },
  {
    title: "Podcast",
    to: routes.podcast,
  },
];

const Header = () => {
  const navigate = useNavigate();
  const { getCurrentUser, logout } = AuthService();
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
  const handleMenuClick = (e) => {
    const key = e.key;
    switch (key) {
      case "home":
        navigate(routes.home);
        break;
      case "course":
        navigate(routes.allCourse);
        break;
      case "grammar":
        navigate(routes.grammarsFolder);
        break;
      case "vocabulary":
        navigate(routes.vocabularyFolder);
        break;
      case "exam":
        navigate(routes.examFolder);
        break;
      case "article":
        navigate(routes.articlesFolder);
        break;
      case "podcast":
        navigate(routes.podcast);
        break;
      default:
        break;
    }
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
  const items = [
    {
      label: <div style={{ width: "200px" }}>Home</div>,
      key: "home",
    },
    {
      label: "Course",
      key: "course",
    },
    {
      label: "Grammar",
      key: "grammar",
    },
    {
      label: "Vocabulary",
      key: "vocabulary",
    },
    {
      label: "Exam",
      key: "exam",
    },
    {
      label: "Article",
      key: "article",
    },
    {
      label: "Podcast",
      key: "podcast",
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

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
            <AvatarWithDropdown user={currentUser} logout={handleLogout} />
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
        <Dropdown menu={menuProps} placement="bottomRight">
          <div className={cx("toggle-btn")}>
            <FontAwesomeIcon icon={faBars} />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
