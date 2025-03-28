import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function SentimentChart({ history }) {
  // Count sentiments from history data
  const sentimentCounts = history.reduce((acc, item) => {
    acc[item.sentiment] = (acc[item.sentiment] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(sentimentCounts),
    datasets: [
      {
        label: 'Count of Sentiments',
        data: Object.values(sentimentCounts),
        backgroundColor: ['#fda085', '#f6d365', '#a1c4fd'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    //   title: { display: true, text: 'Sentiment Distribution' },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}

export default SentimentChart;
