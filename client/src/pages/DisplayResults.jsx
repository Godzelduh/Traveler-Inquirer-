import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'bulma/css/bulma.css';

const DisplayResults = () => {
  const { state } = useLocation();
  const searchResults = state?.searchResults?.prices || [];
  const searchParams = state?.searchParams || {};
  const [savedFlights, setSavedFlights] = useState([]);

  useEffect(() => {
    fetchSavedFlights();
  }, []);

  const fetchSavedFlights = async () => {
    try {
      const response = await fetch('/api/saved-flights', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setSavedFlights(data.data);
      }
    } catch (error) {
      console.error('Error fetching saved flights:', error);
    }
  };

  const handleSaveFlight = async (flightOffer) => {
    try {
      const response = await fetch('/api/saved-flights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          searchParams,
          flightOffer
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setSavedFlights([...savedFlights, data.data]);
      }
    } catch (error) {
      console.error('Error saving flight:', error);
    }
  };

  const handleDeleteSavedFlight = async (flightId) => {
    try {
      const response = await fetch(`/api/saved-flights/${flightId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setSavedFlights(savedFlights.filter(flight => flight._id !== flightId));
      }
    } catch (error) {
      console.error('Error deleting saved flight:', error);
    }
  };

  const isFlightSaved = (offerId) => {
    return savedFlights.some(saved => saved.flightOffer.id === offerId);
  };

  return (
    <div className="container">
    {/* Banner */}
    <section className="hero is-primary is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            Flight Results
          </h1>
        </div>
      </div>
    </section>

    {/* Search Criteria Summary */}
    <div className="box mt-5">
      <div className="columns is-multiline">
        <div className="column is-one-quarter">
          <p className="has-text-grey">From</p>
          <p className="has-text-weight-semibold">{searchParams.from}</p>
        </div>
        <div className="column is-one-quarter">
          <p className="has-text-grey">To</p>
          <p className="has-text-weight-semibold">{searchParams.to}</p>
        </div>
        <div className="column is-one-quarter">
          <p className="has-text-grey">Date</p>
          <p className="has-text-weight-semibold">{searchParams.departureDate}</p>
        </div>
        <div className="column is-one-quarter">
          <p className="has-text-grey">Passengers</p>
          <p className="has-text-weight-semibold">{searchParams.adults} Adults</p>
        </div>
      </div>
    </div>

    {/* Results List */}
    <div className="mt-5">
      {searchResults.length > 0 ? (
        searchResults.map((offer) => (
          <div key={offer.id} className="box">
            <div className="columns">
              <div className="column">
                <h4 className="title is-4">Flight {offer.id}</h4>
                {offer.itineraries.map((itinerary, idx) => (
                  <div key={idx} className="mt-2">
                    <p className="has-text-grey">
                      Duration: {itinerary.duration}
                    </p>
                    {itinerary.segments.map((segment, segIdx) => (
                      <div key={segIdx} className="ml-4 mt-1">
                        <p>
                          {segment.departure.iataCode} → {segment.arrival.iataCode}
                        </p>
                        <p className="has-text-grey">
                          {segment.carrierCode} {segment.number}
                        </p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="column is-narrow has-text-right">
                <p className="title is-5">
                  {offer.price.total} {offer.price.currency}
                </p>
                {isFlightSaved(offer.id) ? (
                  <button 
                    className="button is-danger mt-2"
                    onClick={() => handleDeleteSavedFlight(offer._id)}
                  >
                    Remove
                  </button>
                ) : (
                  <button 
                    className="button is-primary mt-2"
                    onClick={() => handleSaveFlight(offer)}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="notification is-warning">
          <h2 className="title is-4">No Results Found</h2>
          <p>Please try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  </div>
);
};

export default DisplayResults;