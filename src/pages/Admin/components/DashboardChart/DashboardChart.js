import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import StatisticService from '~/services/statisticService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);



function DashboardChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Number of students enrolled in the course by month",
      },
    },
  };
  
  const { getMothlyCount } = StatisticService();
  const [monthlyCount, setMonthlyCount] = useState({});
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    const getMonthlyCountStatistic = async () => {
      const res = await getMothlyCount();
      setMonthlyCount(res);
    };
    getMonthlyCountStatistic();
  }, []);

  const transformData = () => {
    const transformedData = labels.map((label) => {
      const value = monthlyCount[`${new Date().getFullYear()}-${labels.indexOf(label) + 1}`] || 0;
      return value;
    });
    return transformedData;
  };
  
  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Dataset 2",
        data: transformData(),
        borderColor: "#b79032",
        backgroundColor: "#f7f5e9",
      },
    ],
  };
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
  }

export default DashboardChart;
