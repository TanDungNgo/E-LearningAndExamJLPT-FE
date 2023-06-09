import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Card } from 'antd';
import StatisticService from '~/services/statisticService';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatisticUser() {
  const { getAccountByRole } = StatisticService();
  const [userByRole, setUserByRole] = useState({});

  useEffect(() => {
    const getUserByRole = async () => {
      const res = await getAccountByRole();
      // console.log(res);
      setUserByRole(res);
    };

    getUserByRole();
  }, []);

  const teacherCount = userByRole.teacher || 0;
  const studentCount = userByRole.student || 0;

  const data = {
    labels: ['Teacher', 'Student'],
    datasets: [
      {
        label: '#Total number',
        data: [teacherCount, studentCount],
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 99, 132, 0.5)',
        ],
      },
    ],
  };

  return (
    <div style={{ marginRight: '80px' }}>
      <div
        style={{
          color: 'rgba(103, 103, 103)',
          fontSize: '16px',
          fontWeight: '600',
          marginBottom: '10px',
        }}
      >
        Users Account
      </div>
      <div style={{ width: '20vw' }}>
        <Pie data={data} />
      </div>
    </div>
  );
}
