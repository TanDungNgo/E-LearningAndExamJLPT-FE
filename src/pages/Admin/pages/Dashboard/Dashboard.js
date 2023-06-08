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
import StatisticService from "~/services/statisticService";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);
function Dashboard() {
  const {getStatistics} = StatisticService();
  const [statistic, setStatistic] = useState({});

  useEffect(() =>{
    const getStatistic = async () => {
      const res = await getStatistics();
      console.log(res);
      setStatistic(res);
    };
    getStatistic();
  }, [])
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
            value={statistic.totalUsers}
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
            title="Total Students"
            value={statistic.totalStudents}
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
            value={statistic.totalCourses}
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
            value={statistic.totalLessons}
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
