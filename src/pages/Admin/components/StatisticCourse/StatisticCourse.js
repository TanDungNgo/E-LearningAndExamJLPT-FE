import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card } from 'antd';
import StatisticService from '~/services/statisticService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'SYSTEM COURSE',
    },
  },
};

export function StatisticCourse() {
  const { getCoursesByLevel } = StatisticService();
  const [coursesByLevelStatistic, setCoursesByLevelStatistic] = useState({});
  const labels = ['N5', 'N4', 'N3', 'N2', 'N1'];


  useEffect(() => {
    const getCourseStatistic = async () => {
      const res = await getCoursesByLevel();
      console.log(res);
      setCoursesByLevelStatistic(res);
      const sortedKeys = Object.keys(res).sort((a, b) => a.slice(1) - b.slice(1)).reverse();
      const newArray = sortedKeys.map(key => res[key]);
      console.log(newArray);
      setCoursesByLevelStatistic(newArray);
    };
    getCourseStatistic();
  }, [])

  const data = {
    labels,
    datasets: [
      {
        label: 'Courses',
        data: coursesByLevelStatistic,

        backgroundColor: 'rgba(255, 159, 64, 0.5)',
      },
    ],
  };
  return (
    <Card style={{ height: "fit-content", width: "45vw", marginRight: "100px" }}>
      <div>
        <Bar options={options} data={data} />
      </div>
    </Card>
  );
}