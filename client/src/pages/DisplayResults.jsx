import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/style.css';

const DisplayResults = () => {
  const { state } = useLocation();

  return (
    <div>
      <section className="no-padding">
        <img src='./Beaches.jpg' alt="Full-width image" className="image is-fullwidth" />
      </section>
      <div className='navbar is-primary pt-3'>
        <div className="navbar-brand">
          <h1 className="title is-4 has-text-centered" style={{ marginLeft: '650px' }}>Search Results</h1>
        </div>
      </div>
      </div>
  );
};
export default DisplayResults;


