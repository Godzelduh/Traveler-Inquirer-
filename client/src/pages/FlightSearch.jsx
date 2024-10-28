import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bulma/css/bulma.css';

const FlightSearch = () => {
  const [searchParams, setSearchParams] = useState({
    originLocationCode: '',
    destinationLocationCode: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
    travelClass: 'ECONOMY',
    currency: 'USD'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Add your submit logic here
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Origin Location Code</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="originLocationCode"
              value={searchParams.originLocationCode}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Destination Location Code</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="destinationLocationCode"
              value={searchParams.destinationLocationCode}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Departure Date</label>
          <div className="control">
            <input
              className="input"
              type="date"
              name="departureDate"
              value={searchParams.departureDate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Return Date</label>
          <div className="control">
            <input
              className="input"
              type="date"
              name="returnDate"
              value={searchParams.returnDate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Adults</label>
          <div className="control">
            <input
              className="input"
              type="number"
              name="adults"
              value={searchParams.adults}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Travel Class</label>
          <div className="control">
            <div className="select">
              <select
                name="travelClass"
                value={searchParams.travelClass}
                onChange={handleInputChange}
              >
                <option value="ECONOMY">Economy</option>
                <option value="BUSINESS">Business</option>
                <option value="FIRST">First</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Currency</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="currency"
              value={searchParams.currency}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="field">
          <div className="control">
            <button className="button is-primary" type="submit" disabled={loading}>
              {loading ? 'Searching...' : 'Search Flights'}
            </button>
          </div>
        </div>

        {error && <p className="help is-danger">{error}</p>}
      </form>
    </div>
  );
};

export default FlightSearch;