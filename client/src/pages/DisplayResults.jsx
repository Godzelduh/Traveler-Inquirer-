import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bulma/css/bulma.css';

const DisplayResults = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [flightResults, setFlightResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlightResults = async () => {
      try {
        // Fetch flight results
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

        // Save search results to user's account
        if (data.initialOffers) {
          const tripData = {
            searchParams: {
              ...state,
              flightOfferId: data.initialOffers[0]?.id // Save first flight offer ID
            },
            flightOffer: data.initialOffers[0] // Save first flight offer as default
          };
          
          const saveResponse = await fetch('/api/trips', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('id_token')}`
            },
            body: JSON.stringify(tripData)
          });

          if (!saveResponse.ok) {
            console.error('Failed to save trip to account');
          }
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (state) {
      fetchFlightResults();
    } else {
      navigate('/search'); // Redirect if no search parameters
    }
  }, [state, navigate]);

  const handleSaveTrip = async (flight) => {
    try {
      const tripData = {
        searchParams: {
          ...state,
          flightOfferId: flight.id
        },
        flightOffer: flight
      };
      
      await fetch('/api/trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('id_token')}`
        },
        body: JSON.stringify(tripData)
      });

      // Show success message or notification
    } catch (err) {
      setError('Failed to save flight. Please try again.');
    }
  };

  return (
    <div className="container my-6">
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
                  <button 
                    className="button is-primary mt-4"
                    onClick={() => handleSaveTrip(flight)}
                  >
                    Save This Flight
                  </button>
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