import React from 'react';

function FeedbackList({ feedback }) {
  // Check if there is no feedback to display
  if (!feedback.length) return <p>No feedback found.</p>;

  return (
    <ul>
      {/* Iterate over the feedback array and render each feedback item */}
      {feedback.map((f, i) => (
        <li key={f.id || i}>
          {/* Display the feedback message and rating */}
          <strong>{f.message || 'No message provided'}</strong> — {f.rating || 'No rating'} star{f.rating > 1 ? 's' : ''}
        </li>
      ))}
    </ul>
  );
}

export default FeedbackList;