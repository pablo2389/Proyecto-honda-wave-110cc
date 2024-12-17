import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartTooltip, Legend as RechartLegend, ResponsiveContainer } from 'recharts';

// Registra las dependencias necesarias de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Datos para el gráfico de líneas (react-chartjs-2)
const lineData = {
  labels: ['Honda Wave', 'Competidor A', 'Competidor B'],  // Etiquetas para el gráfico
  datasets: [
    {
      label: 'Velocidad',
      data: [120, 110, 105],  // Datos para las velocidades
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    },
    {
      label: 'Durabilidad',
      data: [80, 75, 70],  // Datos para la durabilidad
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
    },
  ],
};

const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,  // 'top' se define como un valor literal
    },
    title: {
      display: true,
      text: 'Comparación de Motocicletas',
    },
  },
};

// Datos para el gráfico de barras (recharts)
const barData = [
  { name: 'Honda Wave', power: 9, torque: 8, weight: 100 },
  { name: 'Competidor A', power: 8, torque: 7, weight: 105 },
  { name: 'Competidor B', power: 7, torque: 6, weight: 110 },
];

const PowerChart: React.FC = () => {
  return (
    <div>
      <h2>Comparativa de Motocicletas 110cc</h2>

      {/* Gráfico de líneas (react-chartjs-2) */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Comparación de Velocidad y Durabilidad</h3>
        <Line data={lineData} options={lineOptions} />
      </div>

      {/* Gráfico de barras (recharts) */}
      <div>
        <h3>Comparación de Potencia, Torque y Peso</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <RechartTooltip />
            <RechartLegend />
            <Bar dataKey="power" fill="#8884d8" />
            <Bar dataKey="torque" fill="#82ca9d" />
            <Bar dataKey="weight" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PowerChart;
