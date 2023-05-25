import React from "react";
import { Avatar, Menu, Dropdown, message, Button, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faGear,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import routes from "~/configs/routes";
import { useNavigate } from "react-router-dom";

const AvatarWithDropdown = (props) => {
  const navigate = useNavigate();
  const handleMenuClick = (e) => {
    console.log("Clicked menu item:", e);
    const key = e.key;
    switch (key) {
      case "viewProfile":
        navigate(routes.publicProfile);
        break;
      case "settings":
        navigate("/settings");
        break;
      case "feedback":
        navigate("/feedback");
        break;
      case "logout":
        props.logout();
        break;
      default:
        break;
    }
  };
  const items = [
    {
      label: "View profile",
      key: "viewProfile",
      icon: <FontAwesomeIcon icon={faUser} />,
    },
    {
      label: "Settings",
      key: "settings",
      icon: <FontAwesomeIcon icon={faGear} />,
    },
    {
      label: "Feedback and help",
      key: "feedback",
      icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    },
    {
      label: "Logout",
      key: "logout",
      icon: <FontAwesomeIcon icon={faSignOut} />,
      danger: true,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <Dropdown menu={menuProps}>
      <Avatar
        size={40}
        src={props?.user?.avatar}
        alt={props?.user?.firstName}
        style={{ cursor: "pointer" }}
      />
    </Dropdown>
  );
};

export default AvatarWithDropdown;
