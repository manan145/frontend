import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function SentimentTrendChart({ history }) {
  // Group analyses by date (for example, extract "YYYY-MM-DD" from the timestamp)
  const groupedData = {};

  history.forEach(record => {
    // Extract the date part from the timestamp
    const date = record.timestamp.split(' ')[0];
    if (!groupedData[date]) {
      groupedData[date] = { POSITIVE: 0, NEGATIVE: 0, NEUTRAL: 0 };
    }
    // Increment the count for the sentiment category
    groupedData[date][record.sentiment] += 1;
  });

  // Sort the dates (labels) in chronological order
  const labels = Object.keys(groupedData).sort();

  // Prepare datasets for each sentiment
  const positiveData = labels.map(date => groupedData[date].POSITIVE);
  const negativeData = labels.map(date => groupedData[date].NEGATIVE);
  const neutralData = labels.map(date => groupedData[date].NEUTRAL);

  const data = {
    labels,
    datasets: [
      {
        label: 'Positive',
        data: positiveData,
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.1)',
        fill: false,
      },
      {
        label: 'Negative',
        data: negativeData,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        fill: false,
      },
      {
        label: 'Neutral',
        data: neutralData,
        borderColor: 'gray',
        backgroundColor: 'rgba(128, 128, 128, 0.1)',
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    //   title: {
    //     display: true,
    //     text: 'Sentiment Trends Over Time',
    //   },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}

export default SentimentTrendChart;
