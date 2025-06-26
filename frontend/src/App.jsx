import React, { useState, useEffect, useCallback } from 'react';
import FeedbackList from './components/FeedbackList';
import RatingFilter from './components/RatingFilter';
import FeedbackForm from './components/FeedbackForm';
import './index.css';

function App() {
  const [feedback, setFeedback] = useState([]);
  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFeedback = useCallback(async () => {
    setLoading(true);
    const url = rating ? `/feedback?rating=${rating}` : '/feedback';

    try {
      const res = await fetch(url);
      const data = await res.json();
      setFeedback(data);
      setError(null);
    } catch (err) {
      setError('Error fetching feedback');
    } finally {
      setLoading(false);
    }
  }, [rating]);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  return (
    <div>
      <h1>Feedback Dashboard</h1>
      <RatingFilter rating={rating} setRating={setRating} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {/* FeedbackList now assumes data is already trimmed in parent or by backend */}
      <FeedbackList feedback={feedback} />
      {/* Refresh list immediately after successful submission */}
      <FeedbackForm onFeedbackSubmit={fetchFeedback} />
    </div>
  );
}

export default App;
