import React, { useState } from 'react';

function FeedbackForm({ onFeedbackSubmit }) {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState('5');
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch('/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, rating }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('');
        setRating('5');
        setStatus('✅ Feedback submitted!');
        onFeedbackSubmit();
      } else {
        setStatus(data.error || '❌ Submission failed');
      }
    } catch (error) {
      setStatus('⚠️ An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
      // Auto-clear status after 5 seconds
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Leave Feedback</h2>
      <input
        type="text"
        placeholder="Your message"
        value={message}
        required
        onChange={(e) => setMessage(e.target.value)}
        disabled={submitting}
      />
      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        disabled={submitting}
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} Star{r > 1 ? 's' : ''}
          </option>
        ))}
      </select>
      <button type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
      {status && <p>{status}</p>}
    </form>
  );
}

export default FeedbackForm;
