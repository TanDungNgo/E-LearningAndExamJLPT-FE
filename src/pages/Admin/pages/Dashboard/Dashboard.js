import {
  faUser,
  faGraduationCap,
  faUserPlus,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Space } from "antd";
import DashboardChart from "../../components/DashboardChart/DashboardChart";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import NoticeCalendar from "../../components/NoticeCalendar/NoticeCalendar";
import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";
const cx = classNames.bind(styles);
function Dashboard() {
  return (
    <Space size={20} direction="horizontal">
      <Space direction="vertical" style={{width:"600px"}}>
        <Space direction="horizontal">
          <DashboardCard
            icon={
              <FontAwesomeIcon
                icon={faUser}
                style={{
                  color: "#1890ff",
                  backgroundColor: "#e6f7ff",
                  borderRadius: 20,
                  fontSize: 20,
                  padding: 10,
                }}
              />
            }
            title="Total Users"
            value={100}
          ></DashboardCard>
          <DashboardCard
            icon={
              <FontAwesomeIcon
                icon={faUserPlus}
                style={{
                  color: "#ffc107",
                  backgroundColor: "#fffee6",
                  borderRadius: 20,
                  fontSize: 20,
                  padding: 10,
                }}
              />
            }
            title="New Students"
            value={50}
          ></DashboardCard>
          <DashboardCard
            icon={
              <FontAwesomeIcon
                icon={faGraduationCap}
                style={{
                  color: "#18ff37",
                  backgroundColor: "e6ffe8",
                  borderRadius: 20,
                  fontSize: 20,
                  padding: 10,
                }}
              />
            }
            title="Total Courses"
            value={50}
          ></DashboardCard>
          <DashboardCard
            icon={
              <FontAwesomeIcon
                icon={faVideo}
                style={{
                  color: "#dc3545",
                  backgroundColor: "#ffe6e6",
                  borderRadius: 20,
                  fontSize: 20,
                  padding: 10,
                }}
              />
            }
            title="Total Lesons"
            value={200}
          ></DashboardCard>
        </Space>
        <DashboardChart />
      </Space>
      <Space>
        <NoticeCalendar />
      </Space>
    </Space>
  );
}

export default Dashboard;
