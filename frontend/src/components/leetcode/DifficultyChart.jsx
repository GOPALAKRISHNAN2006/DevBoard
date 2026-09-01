import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DifficultyChart = ({ solved = {} }) => {
  const { easy = 0, medium = 0, hard = 0 } = solved;

  const chartData = {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        data: [easy, medium, hard],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
        hoverBackgroundColor: ['#059669', '#d97706', '#dc2626'],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          font: { family: 'Inter', size: 12 },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw} solved`,
        },
      },
    },
    cutout: '70%',
  };

  return (
    <div className="card shadow-sm border-0 bg-white h-100 p-4">
      <h3 className="h6 fw-bold text-dark text-uppercase mb-3">Difficulty Distribution</h3>
      <div style={{ height: '220px', position: 'relative' }}>
        <Doughnut data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default DifficultyChart;
