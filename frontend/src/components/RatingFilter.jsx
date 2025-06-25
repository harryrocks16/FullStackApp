import React from 'react';

function RatingFilter({ rating, setRating }) {
  // Render a dropdown to filter feedback by rating
  return (
    <select value={rating} onChange={(e) => setRating(e.target.value)}>
      {/* Option to show all ratings */}
      <option value="">All Ratings</option>
      {/* Options for specific ratings from 5 to 1 */}
      <option value="5">5 Stars</option>
      <option value="4">4 Stars</option>
      <option value="3">3 Stars</option>
      <option value="2">2 Stars</option>
      <option value="1">1 Star</option>
    </select>
  );
}

export default RatingFilter;