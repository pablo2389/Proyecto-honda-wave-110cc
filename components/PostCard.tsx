// components/PowerChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PowerChart: React.FC = () => {
  const data = {
    labels: ['Honda Wave', 'Competidor A', 'Competidor B'],
    datasets: [
      {
        label: 'Velocidad Inicial (km/h)',
        data: [100, 110, 105], // Velocidades de ejemplo
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Velocidad Final (km/h)',
        data: [150, 160, 155], // Velocidades de ejemplo
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Durabilidad (km)',
        data: [50000, 60000, 55000], // Durabilidad de ejemplo
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PowerChart;
