import React from 'react';
import { useLocation } from 'react-router-dom';

const DisplayResults = () => {
  const { state } = useLocation();
//   const { city, startDate, endDate, budget } = state;

  // Normally, you would fetch the results from an API here based on these params
  return (
    <div>
      <h2>Travel Results for {state.city}</h2>
    {
        state.results.map(item => {
            return (
                <>
                    <p>From {item.startDate} to {item.endDate}</p>
                    <p class="has-text-info">Budget: {item.budget}</p>
                </>
            )
        })
    }

      {/* Render search results */}
    </div>
  );
};

export default DisplayResults;


