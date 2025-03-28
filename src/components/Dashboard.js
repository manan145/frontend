import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AnalysisForm from './AnalysisForm';
import History from './History';
import SentimentChart from './SentimentChart';
import SentimentTrendChart from './SentimentTrendChart';

function Dashboard() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:5000/history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(response.data);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Inline style objects
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    borderRadius: '12px',
    backgroundColor: '#fff',
    margin: '20px',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const contentStyle = {
    display: 'flex',
    gap: '20px',
  };

  const leftSectionStyle = {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  };

  const rightSectionStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const chartContainerStyle = {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const buttonStyle = {
    padding: '10px 15px',
    background: '#fda085',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1>Sentiment Analysis Dashboard</h1>
        <button style={buttonStyle} onClick={handleLogout}>
          Logout
        </button>
      </header>

      <AnalysisForm refreshHistory={fetchHistory} />

      <div style={contentStyle}>
        {/* Left column: History */}
        <div style={leftSectionStyle}>
          <History history={history} />
        </div>

        {/* Right column: two stacked charts */}
        <div style={rightSectionStyle}>
          <div style={chartContainerStyle}>
            <h2 style={{ textAlign: 'center' }}>Sentiment Distribution</h2>
            <SentimentChart history={history} />
          </div>
          <div style={chartContainerStyle}>
            <h2 style={{ textAlign: 'center' }}>Sentiment Trends Over Time</h2>
            <SentimentTrendChart history={history} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
