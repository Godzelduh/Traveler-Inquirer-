import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bulma/css/bulma.css';

const DisplayResults = () => {
  const { state } = useLocation();
  const [flightResults, setFlightResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlightResults = async () => {
      try {
        const response = await fetch('/api/flights/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(state)
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch flight results');
        }
        
        const data = await response.json();
        setFlightResults(data.initialOffers);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }

      if (data.initialOffers) {
        const tripData = {
          searchParams: state,
          results: {
            initialOffers: data.initialOffers,
            confirmedPrices: data.confirmedPrices
          }
        };
        
        // Save to backend
        await fetch('/api/trips', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tripData)
        });
      }


    };

    fetchFlightResults();
  }, [state]); 


  

  return (
    <div className="container">
      {loading && <p className="notification is-info">Loading...</p>}
      {error && <p className="notification is-danger">{error}</p>}
      {flightResults && (
        <div className="columns is-multiline">
          {flightResults.map((flight, index) => (
            <div className="column is-one-third" key={index}>
              <div className="card">
                <div className="card-content">
                  <p className="title">{flight.airline}</p>
                  <p className="subtitle">{flight.price} {flight.currency}</p>
                  <p>Departure: {flight.departure}</p>
                  <p>Arrival: {flight.arrival}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayResults;