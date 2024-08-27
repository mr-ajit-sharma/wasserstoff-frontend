import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement 
);

const ChartComponent = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.Year),
    datasets: [
      {
        label: 'Intensity',
        data: data.map(d => d.Intensity),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false
      }
    ],
  };

  return (
    <div className="charts">
      <h2>Line Chart of Intensity</h2>
      <Line data={chartData} />

      <h2>Bar Chart of Intensity</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default ChartComponent;
