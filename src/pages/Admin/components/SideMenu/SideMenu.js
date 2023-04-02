import {
  faGraduationCap,
  faGripHorizontal,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "antd";
import classNames from "classnames/bind";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SideMenu.module.scss";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);

function SideMenu() {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(["/admin"]);
  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKey(pathName);
  }, [location.pathname]);
  const navigate = useNavigate();
  return (
    <div className={cx("SideMenu")}>
      <Menu
      className={cx("Menu")}
      mode="vertical"
        onClick={(item) => {
          navigate(item.key);
        }}
        selectedKeys={selectedKey}
        items={[
          {
            label: "Dashboard",
            icon: <FontAwesomeIcon icon={faGripHorizontal} />,
            key: "/admin",
        
          },
          {
            label: "Users",
            icon: <FontAwesomeIcon icon={faUser} />,
            key: "/admin/user",
          },
          {
            label: "Courses",
            icon: <FontAwesomeIcon icon={faGraduationCap} />,
            key: "/admin/course",
          },
        ]}
      ></Menu>
    </div>
  );
}

export default SideMenu;
