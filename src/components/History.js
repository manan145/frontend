import React from 'react';

function History({ history }) {
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>History</h2>
      {history.length > 0 ? (
        <ul>
          {history.map((item) => (
            <li key={item.id} className="history-item">
              <p>{item.text}</p>
              <div className="meta">
                <span>{item.timestamp}</span>
                <span>{item.sentiment} ({(item.confidence * 100).toFixed(2)}%)</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No analyses found.</p>
      )}
    </div>
  );
}

export default History;
