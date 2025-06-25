import React, { useState, useEffect } from 'react';
import FeedbackList from './components/FeedbackList';
import RatingFilter from './components/RatingFilter';
import FeedbackForm from './components/FeedbackForm';
import './index.css';

function App() {
  const [feedback, setFeedback] = useState([]);
  const [rating, setRating] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
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
    };

    fetchFeedback();
  }, [rating]);

  return (
    <div>
      <h1>Feedback Dashboard</h1>
      <RatingFilter rating={rating} setRating={setRating} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <FeedbackList feedback={feedback} />
      <FeedbackForm onFeedbackSubmit={() => setRating(r => r)} />
    </div>
  );
}

export default App;