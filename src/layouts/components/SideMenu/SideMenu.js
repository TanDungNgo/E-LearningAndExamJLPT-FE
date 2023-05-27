import classNames from "classnames/bind";
import styles from "./SideMenu.module.scss";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { faCheckCircle, faFolderClosed, faPenToSquare, faPlusSquare, faUser } from "@fortawesome/free-regular-svg-icons";
import routes from "~/configs/routes";
const cx = classNames.bind(styles);

function SideMenu() {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(["/profileUser"]);
  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKey(pathName);
  }, [location.pathname]);
  const navigate = useNavigate();
  return (
    <div className={cx("card")}>
      <Menu
        className={cx("card__menu")}
        mode="inline"
        onClick={(item) => {
          navigate(item.key);
        }}
        selectedKeys={selectedKey}
        items={[
          {
            label: "Public Profile",
            icon: <FontAwesomeIcon icon={faUser} />,
            key: `${routes.publicProfile}`,
          },
          {
            label: "Change Password",
            icon: <SettingOutlined />,
            key: `${routes.changePassword}`,
          },
          {
            label: "Create Course",
            icon: <FontAwesomeIcon icon={faPlusSquare} />,
            key: `${routes.createCourse}`,
          },
          {
            label: "Create Lesson",
            icon: <FontAwesomeIcon icon={faAdd} />,
            key: `${routes.createLesson}`,
          },
          {
            label: "Courses Created",
            icon: <FontAwesomeIcon icon={faFolderClosed} />,
            key: `${routes.courseCreated}`,
          },
          {
            label: "Completed Courses",
            icon: <FontAwesomeIcon icon={faCheckCircle} />,
            key: `${routes.completedCourse}`,
          },
          {
            label: "Update Course",
            icon: <FontAwesomeIcon icon={faPenToSquare} />,
            key: `${routes.updateCourse}`,
          },
        ]}
      ></Menu>
    </div>
  );
}

export default SideMenu;
