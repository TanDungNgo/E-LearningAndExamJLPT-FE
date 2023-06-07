import React from 'react';
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

const labels = ['N5', 'N4', 'N3', 'N2', 'N1'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.floor(Math.random() * 200)),
      backgroundColor: 'rgba(255, 159, 64, 0.5)',
    },
  ],
};

export function StatisticCourse() {
  return (
    <Card style={{height:"fit-content", width:"45vw", marginRight: "100px"}}>
        <div>
            <Bar options={options} data={data} />
        </div>
    </Card>
  );
}