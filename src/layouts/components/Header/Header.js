import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Button from "~/components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import routes from "~/configs/routes";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import AuthService from "~/services/authService";
import { useSelector } from "react-redux";
import AvatarWithDropdown from "~/components/AvatarWithDropdown/AvatarWithDropdown";
import { Alert, Badge, Drawer, Dropdown, List, Menu, Tooltip } from "antd";
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
  const [comments, setComments] = useState(["New Course", "New Article"]);
  const [commentsOpen, setCommentsOpen] = useState(false);
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
    logout();
    setCurrentUser(null);
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
      <Link to={routes.home}>
        <div className={cx("logo")}>
          <img width="80" src="/images/Logo1.png" />
        </div>
      </Link>
      <div className={cx("links")}>{renderMenu()}</div>
      <div className={cx("actions")}>
        {currentUser ? (
          <>
            <Badge count={comments.length}>
              <Tooltip placement="bottom" title={"Notification"}>
                <button
                  className={cx("action__btn")}
                  onClick={() => {
                    setCommentsOpen(true);
                  }}
                >
                  <FontAwesomeIcon icon={faBell} className={cx("icon")} />
                </button>
              </Tooltip>
            </Badge>
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
              return (
                <List.Item>
                  <Alert
                    style={{ width: "100%" }}
                    message={item}
                    type="info"
                    closable
                  />
                </List.Item>
              );
            }}
          ></List>
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
