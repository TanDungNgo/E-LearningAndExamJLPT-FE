import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Card } from 'antd';
import StatisticService from '~/services/statisticService';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatisticRating() {
  const { getTopTeacher } = StatisticService();
  const [topTeacher, setTopTeacher] = useState([]);

  useEffect(() => {
    const getTopTeachers = async () => {
      const res = await getTopTeacher();
      console.log(res);
      setTopTeacher(res.map(item => item.courseCount));
    };
    getTopTeachers();
  }, []);

  const data = {
    labels: ['Khanh Phuong', 'Huyen Trang', 'Van Dat', 'Phuong Thao'],
    datasets: [
      {
        label: '#Total courses',
        data: topTeacher,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
      },
    ],
  };

  return (
    <div style={{ height: 'fit-content', width: '23vw' }}>
      <div
        style={{
          color: 'rgba(103, 103, 103)',
          fontSize: '16px',
          fontWeight: '600',
          marginBottom: '10px',
          margin: '10px'
        }}
      >
        Top teachers with many courses
      </div>
      <Doughnut data={data} />
    </div>
  );
}
