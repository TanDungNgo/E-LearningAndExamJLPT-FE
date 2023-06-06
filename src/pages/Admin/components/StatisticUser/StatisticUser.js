import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Card } from 'antd';
ChartJS.register(ArcElement, Tooltip, Legend);
export const data = {
  labels: ['Active', 'Inactive'],
  datasets: [
    {
      label: '# of Votes',
      data: [431, 51],
      backgroundColor: [
        'rgba(54, 162, 235, 0.5)',
        'rgba(255, 99, 132, 0.5)',
      ],
    },
  ],
};

export default function StatisticUser() {
  return(
    <div style={{marginRight: "80px"}}>
        <div style={{color: "rgba(103, 103, 103)", fontSize: "16px", fontWeight: "600", marginBottom: "10px"}}>
            Users Account
        </div>
        <Pie data={data}/>
    </div>
    
    );
}
