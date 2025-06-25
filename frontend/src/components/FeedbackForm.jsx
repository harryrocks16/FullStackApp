import React, { useState } from 'react';

function FeedbackForm({ onFeedbackSubmit }) {
  // State to manage the feedback message
  const [message, setMessage] = useState('');
  // State to manage the feedback rating
  const [rating, setRating] = useState('5');
  // State to manage the submission status (success or error)
  const [status, setStatus] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Send feedback data to the backend
      const res = await fetch('/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, rating }),
      });

      const data = await res.json();

      if (res.ok) {
        // If submission is successful, update the status and reset the form
        setStatus('Feedback submitted!');
        setMessage('');
        setRating('5');
        onFeedbackSubmit(); // Trigger a refresh in the parent component
      } else {
        // If submission fails, display the error message
        setStatus(data.error || 'Submission failed');
      }
    } catch (error) {
      // Handle network or other unexpected errors
      setStatus('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Leave Feedback</h2>
      {/* Input field for the feedback message */}
      <input
        type="text"
        placeholder="Your message"
        value={message}
        required
        onChange={(e) => setMessage(e.target.value)}
      />
      {/* Dropdown to select the feedback rating */}
      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} Star{r > 1 ? 's' : ''}
          </option>
        ))}
      </select>
      {/* Submit button */}
      <button type="submit">Submit</button>
      {/* Display the submission status */}
      {status && <p>{status}</p>}
    </form>
  );
}

export default FeedbackForm;