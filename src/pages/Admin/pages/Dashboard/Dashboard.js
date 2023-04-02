import {
  faUser,
  faGraduationCap,
  faUserPlus,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Space, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../API";
import DashboardChart from "../../components/DashboardChart/DashboardChart";
import DashboardCard from "../../components/DashboardCard/DashboardCard";

function Dashboard() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getAllUsers().then((res) => {
      setDataSource(res.users.splice(0, 20));
      setLoading(false);
    });
  }, []);
  return (
    <Space size={20} direction="vertical">
      <Space direction="horizontal" style={{ gap: "30px" }}>
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
      <Space direction="horizontal">
        <Space direction="vertical">
        </Space>
        <DashboardChart />
      </Space>
    </Space>
  );
}

export default Dashboard;
