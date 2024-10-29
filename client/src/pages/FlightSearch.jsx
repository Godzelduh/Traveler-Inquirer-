import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bulma/css/bulma.css';
import '../styles/style.css';

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
    <div>
      <img src="/liberty-statue.png" alt="Liberty Statue" style={{ width: '1600px', height:'400px'}}/>
      <form onSubmit={handleSubmit} className="box is-rounded has-background-info">
  <p className="title ml-5">Choose Your Destination</p>
  <div className="columns is-multiline is-centered">
    <div className="column is-half">
      <div className="field">
        <label className="label">Origin Location Code</label>
        <div className="control">
          <span className="input is-rounded" style={{ width: '100%' }}>
            {searchParams.originLocationCode}
          </span>
        </div>
      </div>
    </div>
    <div className="column is-half">
      <div className="field">
        <label className="label">Destination Location Code</label>
        <div className="control">
          <span className="input is-rounded" style={{ width: '100%' }}>
            {searchParams.destinationLocationCode}
          </span>
        </div>
      </div>
    </div>
    <div className="column is-half">
      <div className="field">
        <label className="label">Departure Date</label>
        <div className="control">
          <span className="input is-rounded" style={{ width: '100%' }}>
            {searchParams.departureDate}
          </span>
        </div>
      </div>
    </div>
    <div className="column is-half">
      <div className="field">
        <label className="label">Return Date</label>
        <div className="control">
          <span className="input is-rounded" style={{ width: '100%' }}>
            {searchParams.returnDate}
          </span>
        </div>
      </div>
    </div>
    <div className="column is-half">
      <div className="field">
        <label className="label">Adults</label>
        <div className="control">
          <span className="input is-rounded" style={{ width: '100%' }}>
            {searchParams.adults}
          </span>
        </div>
      </div>
    </div>
    <div className="column is-half">
            <div className="field">
              <label className="label">Travel Class</label>
              <div className="control">
                <div className="select is-rounded" style={{ width: '100%' }}>
                  <select
                    name="travelClass"
                    value={searchParams.travelClass}
                    onChange={handleInputChange}
                  >
                    <option value="ECONOMY">ECONOMY</option>
                    <option value="BUSINESS">BUSINESS</option>
                    <option value="PREMIUM ECONOMY">PREMIUM ECONOMY</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
    {/* <div className="column is-half">
      <div className="field">
        <label className="label">Travel Class</label>
        <div className="control">
          <span className="input is-rounded" style={{ width: '100%' }}>
            {searchParams.travelClass}
          </span>
        </div>
      </div>
    </div> */}
    
    
    <div className="column is-half">
      <div className="field">
        <label className="label">Currency:</label>
        <div className="control">
        <span className="input is-rounded" style={{ width: '10%' }}>
        {searchParams.currency}
      </span>
        </div>
      </div>
    </div>
    <div className="column is-half">
      <div className="field">
        <div className="control">
          <button className="button is-primary" type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search Flights'}
          </button>
        </div>
      </div>
    </div>
  </div>
  {error && <p className="help is-danger">{error}</p>}
</form>
</div>
  );
};

export default FlightSearch;