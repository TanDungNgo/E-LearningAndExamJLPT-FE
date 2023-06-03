import React from "react";
import { Pie } from "react-chartjs-2";
import { CategoryScale, Chart as ChartJS, Filler, Legend, LineElement, LinearScale, PointElement, Title } from "chart.js";
import { Tooltip } from "antd";

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

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
};
  
const labels = ["January", "February", "March", "April", "May", "June", "July"];
  
export const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Dataset 2",
        data: labels.map(() => Math.floor(Math.random() * 1000)),
        borderColor: "#b79032",
        backgroundColor: "#f7f5e9",
      },
    ],
};

function StatisticCard() {
    return (
        <div>
            <Pie options={options} data={data} />
        </div>
    );
}

export default StatisticCard;