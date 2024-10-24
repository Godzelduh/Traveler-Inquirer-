import React from 'react';
import { useLocation } from 'react-router-dom';

const DisplayResults = () => {
  const { state } = useLocation();
  const { city, startDate, endDate, budget } = state;

  // Normally, you would fetch the results from an API here based on these params
  return (
    <div>
      <h2>Travel Results for {city}</h2>
      <p>From {startDate} to {endDate}</p>
      <p>Budget: {budget}</p>
      {/* Render search results */}
    </div>
  );
};

export default DisplayResults;


