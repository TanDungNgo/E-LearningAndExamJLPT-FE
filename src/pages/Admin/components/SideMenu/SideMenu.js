import {
  faBook,
  faFont,
  faGraduationCap,
  faGripHorizontal,
  faLineChart,
  faNewspaper,
  faPenSquare,
  faPenToSquare,
  faUser,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, notification } from "antd";
import classNames from "classnames/bind";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SideMenu.module.scss";
import { useEffect, useState } from "react";
import MenuItem from "antd/es/menu/MenuItem";
import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons";
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
    <Menu
      className={cx("side-menu")}
      mode="inline"
      onClick={(item) => {
        if (item.key === "/admin/settings") {
          notification.info({
            message: "Coming soon",
            description: "This feature is coming soon",
          });
          return;
        }
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
          label: "Content",
          icon: <AppstoreOutlined />,
          children: [
            {
              label: "Courses",
              icon: <FontAwesomeIcon icon={faGraduationCap} />,
              key: "/admin/course",
            },
            {
              label: "Lessons",
              icon: <FontAwesomeIcon icon={faVideo} />,
              key: "/admin/lesson",
            },
            {
              label: "Articles",
              icon: <FontAwesomeIcon icon={faNewspaper} />,
              key: "/admin/articles",
            },
            {
              label: "Grammar",
              icon: <FontAwesomeIcon icon={faBook} />,
              key: "/admin/grammar",
            },
            {
              label: "Vocabulary",
              icon: <FontAwesomeIcon icon={faFont} />,
              key: "/admin/vocabularyFolder",
            },
            {
              label: "Exam",
              icon: <FontAwesomeIcon icon={faPenToSquare} />,
              key: "/admin/exam",
            },
          ],
        },
        {
          label: "Statistics",
          icon: <FontAwesomeIcon icon={faLineChart} />,
          key: "/admin/statistics",
        },
        {
          label: "Settings",
          icon: <SettingOutlined />,
          key: "/admin/settings",
        },
      ]}
    ></Menu>
  );
}

export default SideMenu;
