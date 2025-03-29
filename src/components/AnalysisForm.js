import React, { useState } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

function AnalysisForm({ refreshHistory }) {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API_URL}/analyze`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(response.data);
      setText('');
      refreshHistory();
    } catch (err) {
      console.error("Analysis error:", err);
    }
  };

  return (
    <div className="analysis-form">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your text for sentiment analysis..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          rows="4"
        />
        <button type="submit">Analyze</button>
      </form>
      {result && (
        <div className="result-card">
          <h3>Result:</h3>
          <p><strong>Sentiment:</strong> {result.sentiment}</p>
          <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}

export default AnalysisForm;
