import classNames from "classnames/bind";
import styles from "./SideMenu.module.scss";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { faBookmark, faUser } from "@fortawesome/free-regular-svg-icons";
const cx = classNames.bind(styles);

function SideMenu(){
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
                key: "/profileUser/PublicProfile",
                },
                {
                label: "Change Password",
                icon: <SettingOutlined />,
                key: "/profileUser/",
                },
                {
                label: "My Courses",
                icon: <FontAwesomeIcon icon={faListUl} />,
                key: "/profileUser/"
                },
                {
                label: "Bookmarks",
                icon: <FontAwesomeIcon icon={faBookmark} />,
                key: "/profileUser/",
                },
            ]}
        ></Menu>
        
    </div>
  );
}

export default SideMenu