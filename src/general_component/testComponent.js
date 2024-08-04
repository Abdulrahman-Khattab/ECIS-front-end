// src/ChartComponent.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const Test = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sold items ',
        data: [65, 59, 80, 81, 56],
        backgroundColor: [
          'rgba(75,192,192,1)',
          'rgba(255,99,132,1)',
          'rgba(255,206,86,1)',
          'rgba(54,162,235,1)',
          'rgba(153,102,255,1)',
        ],
        borderColor: [
          'rgba(75,192,192,1)',
          'rgba(255,99,132,1)',
          'rgba(255,206,86,1)',
          'rgba(54,162,235,1)',
          'rgba(153,102,255,1)',
        ],
        borderWidth: 1,
        hoverBackgroundColor: [
          'rgba(75,192,192,0.4)',
          'rgba(255,99,132,0.4)',
          'rgba(255,206,86,0.4)',
          'rgba(54,162,235,0.4)',
          'rgba(153,102,255,0.4)',
        ],
        hoverBorderColor: [
          'rgba(75,192,192,1)',
          'rgba(255,99,132,1)',
          'rgba(255,206,86,1)',
          'rgba(54,162,235,1)',
          'rgba(153,102,255,1)',
        ],
      },
    ],
  };

  const options = {
    scales: {
      x: [
        {
          type: 'category',
          position: 'bottom',
        },
      ],
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default Test;
