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
  const items = [
    {
      label: "Public Profile",
      icon: <FontAwesomeIcon icon={faUser} />,
      key: "/profileUser",
    },
    {
      label: "Change Password",
      icon: <SettingOutlined />,
      key: "/profileUser/changePassword",
    }
  ];
  if (props?.user?.roles.some((role) => role.name === "TEACHER")) {
    items.splice(2, 0, 
      {
        label: "My Course",
        icon: <FontAwesomeIcon icon={faFolderClosed} />,
        key: "/profileUser/courseCreated",
      },
      {
      label: "Create Course",
      icon: <FontAwesomeIcon icon={faPlusSquare} />,
      key: "/profileUser/createCourse",
      },
      {
        label: "Update Course",
        icon: <FontAwesomeIcon icon={faPenToSquare} />,
        key: "/profileUser/updateCourse/:idCourse",
      },
      // {
      //   label: "Create Lesson",
      //   icon: <FontAwesomeIcon icon={faAdd} />,
      //   key: "/profileUser/createLesson",
      // },
    );
  }
  else if (
    props?.user?.roles.some((role) => role.name === "STUDENT")) {
    items.splice(2, 0, {
      label: "Completed Courses",
      icon: <FontAwesomeIcon icon={faCheckCircle} />,
      key: "/profileUser/completedCourse",
    },
    {
      label: "Exam History",
      icon: <FontAwesomeIcon icon={faClock} />,
      key: "/profileUser/examHistoryFolder",
    });
  }

  return (
    <div className={cx("card")}>
      <Menu
        className={cx("card__menu")}
        mode="inline"
        onClick={(item) => {navigate(item.key)}}
        selectedKeys={selectedKey}
        items={items}
      ></Menu>
    </div>
  );
}

export default SideMenu;
