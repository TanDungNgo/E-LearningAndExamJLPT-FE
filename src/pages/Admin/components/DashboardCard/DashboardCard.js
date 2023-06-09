import { Card, Space, Statistic } from "antd";
import React from "react";

function DashboardCard({ title, value, icon }) {
  return (
    
    <Card style={{height:"fit-content"}}>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
        
      </Space>
    </Card>
  );
}

export default DashboardCard;
