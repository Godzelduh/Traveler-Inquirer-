import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bulma/css/bulma.css';

const Account = () => {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Helper function to handle API requests with authentication
  const authenticatedFetch = async (url, options = {}) => {
    const token = localStorage.getItem('amadeusToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401 || response.status === 403) {
      // Token expired or invalid
      localStorage.removeItem('amadeusToken');
      navigate('/login');
      throw new Error('Authentication expired. Please login again.');
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.error || 'An error occurred');
    }

    return data;
  };

  useEffect(() => {
    const fetchUserAndTrips = async () => {
      try {
        // Get user data from token or storage
        const userId = localStorage.getItem('userId');
        if (!userId) {
          navigate('/login');
          return;
        }

        // Fetch user data
        const userData = await authenticatedFetch(`/api/users/${userId}`);
        setUser(userData);

        // Fetch trips
        const tripsData = await authenticatedFetch('/api/trips');
        setTrips(tripsData.data);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        if (err.message.includes('authentication')) {
          navigate('/login');
        }
      }
    };

    fetchUserAndTrips();
  }, [navigate]);

  const handleTripDelete = async (tripId) => {
    try {
      await authenticatedFetch(`/api/trips/${tripId}`, {
        method: 'DELETE'
      });
      
      setTrips(trips.filter(trip => trip.id !== tripId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePriceRefresh = async (tripId) => {
    try {
      const response = await authenticatedFetch(`/api/trips/${tripId}/refresh-price`, {
        method: 'POST'
      });
      
      setTrips(trips.map(trip => 
        trip.id === tripId ? response.data : trip
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return (
    <div className="container">
      <p className="notification is-info">Loading...</p>
    </div>
  );

  if (error) return (
    <div className="container">
      <div className="notification is-danger">
        <button className="delete" onClick={() => setError(null)}></button>
        {error}
      </div>
    </div>
  );

  return (
    <div className="container my-6">
      <header className="mb-6">
        <h1 className="title is-2">{user?.username}'s Flight History</h1>
        <p className="subtitle is-5">Your saved flight searches and bookings</p>
      </header>

      {trips.length === 0 ? (
        <div className="notification is-info">
          No flight searches found. Try searching for flights to see them here!
        </div>
      ) : (
        <div className="columns is-multiline">
          {trips.map((trip) => (
            <div className="column is-full mb-4" key={trip.id}>
              <div className="card">
                <header className="card-header">
                  <p className="card-header-title">
                    {trip.searchParams.fromLocation} → {trip.searchParams.toLocation}
                  </p>
                  <button 
                    className="card-header-icon" 
                    aria-label="refresh"
                    onClick={() => handlePriceRefresh(trip.id)}
                  >
                    <span className="icon">
                      <i className="fas fa-sync-alt"></i>
                    </span>
                  </button>
                </header>
                <div className="card-content">
                  <div className="content">
                    <div className="columns">
                      <div className="column">
                        <p><strong>Departure:</strong> {new Date(trip.searchParams.departureDate).toLocaleDateString()}</p>
                        <p><strong>Return:</strong> {new Date(trip.searchParams.returnDate).toLocaleDateString()}</p>
                        <p><strong>Travel Class:</strong> {trip.searchParams.travelClass}</p>
                        <p><strong>Passengers:</strong> {trip.searchParams.adults} adults</p>
                      </div>
                      <div className="column">
                        <p><strong>Saved:</strong> {new Date(trip.savedAt).toLocaleDateString()}</p>
                        <p><strong>Flight ID:</strong> {trip.searchParams.flightOfferId}</p>
                        {trip.searchParams.maxPrice && (
                          <p><strong>Max Price:</strong> ${trip.searchParams.maxPrice}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <footer className="card-footer">
                  <button 
                    className="card-footer-item button is-danger is-light"
                    onClick={() => handleTripDelete(trip.id)}
                  >
                    Delete Search
                  </button>
                </footer>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Account;