import React from 'react';

function FeedbackList({ feedback }) {
  // Check if there is no feedback to display
  if (!feedback.length) return <p>No feedback found.</p>;

  // Sort by most recent timestamp and slice the top 5
  const recentFeedback = [...feedback]
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5);

  return (
    <ul>
      {/* Display only the 5 most recent feedback entries */}
      {recentFeedback.map((f, i) => (
        <li key={f.id || i}>
          <strong>{f.message || 'No message provided'}</strong> — {f.rating || 'No rating'} star{f.rating > 1 ? 's' : ''}
        </li>
      ))}
    </ul>
  );
}

export default FeedbackList;
