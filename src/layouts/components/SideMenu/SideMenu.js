import classNames from "classnames/bind";
import styles from "./SideMenu.module.scss";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { faCheckCircle, faClock, faFolderClosed, faPenToSquare, faPlusSquare, faUser } from "@fortawesome/free-regular-svg-icons";
import routes from "~/configs/routes";
import AuthService from "~/services/authService";
import { useSelector } from "react-redux";
const cx = classNames.bind(styles);

const SideMenu = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(["/profileUser"]);
  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKey(pathName);
  }, [location.pathname]);
  const handleMenuClick = (e) => {
    console.log("Clicked menu item:", e);
    const key = e.key;
    switch (key) {
      case "publicProfile":
        navigate(routes.publicProfile);
        break;
      case "changePassword":
        navigate(routes.changePassword);
        break;
      case "createCourse":
        navigate(routes.createCourse);
        break;
      case "createLesson":
        navigate(routes.createLesson);
        break;
      case "courseCreated":
        navigate(routes.courseCreated);
        break;
      case "completedCourse":
        navigate(routes.completedCourse);
        break;
      case "updateCourse":
        navigate(routes.updateCourseFolder);
        break;
      case "examHistory":
        navigate(routes.examHistoryFolder);
        break;
      default:
        break;
    }
  };
  const items = [
    {
      label: "Public Profile",
      icon: <FontAwesomeIcon icon={faUser} />,
      key: "publicProfile",
    },
    {
      label: "Change Password",
      icon: <SettingOutlined />,
      key: "changePassword",
    }
  ];
  if (props?.user?.roles.some((role) => role.name === "TEACHER")) {
    items.splice(2, 0, {
      label: "Create Course",
      icon: <FontAwesomeIcon icon={faPlusSquare} />,
      key: "createCourse",
    },
    {
      label: "Create Lesson",
      icon: <FontAwesomeIcon icon={faAdd} />,
      key: "createLesson",
    },
    {
      label: "Courses Created",
      icon: <FontAwesomeIcon icon={faFolderClosed} />,
      key: "courseCreated",
    },
    {
      label: "Update Course",
      icon: <FontAwesomeIcon icon={faPenToSquare} />,
      key: "updateCourse",
    });
  }
  else if (
    props?.user?.roles.some((role) => role.name === "STUDENT")) {
    items.splice(2, 0, {
      label: "Completed Courses",
      icon: <FontAwesomeIcon icon={faCheckCircle} />,
      key: "completedCourse",
    },
    {
      label: "Exam History",
      icon: <FontAwesomeIcon icon={faClock} />,
      key: "examHistory",
    });
  }

  return (
    <div className={cx("card")}>
      <Menu
        className={cx("card__menu")}
        mode="inline"
        onClick={handleMenuClick}
        selectedKeys={selectedKey}
        items={items}
      ></Menu>
    </div>
  );
}

export default SideMenu;
