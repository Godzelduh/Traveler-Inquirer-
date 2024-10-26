import React from 'react';
import { useLocation } from 'react-router-dom';

const DisplayResults = () => {
  const { state } = useLocation();

  const {
    cityOrigin,
    cityDestination,
    noAdults,
    startDate,
    endDate,
    budget
  } = state || {};

  // Return empty component if state is undefined
  if (!state) {
    return <p>No data available for results.</p>;
  }
  // Normally, you would fetch the results from an API here based on these params
  return (
    <div>
      <h2>Travel Results for {cityDestination}</h2>
      <h2>Travelling from {cityOrigin}</h2>
      <h2>Number of Adults: {noAdults}</h2>
      
      <p>From {startDate} to {endDate}</p>
      <p>Budget: {budget}</p>
      <div className="media-content">
        <p className="title is-4">John Smith</p>
        <p className="subtitle is-6">@johnsmith</p>
      </div>
      <div className="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
        iaculis mauris. <a>@bulmaio</a>. <a href="#">#css</a>
        <a href="#">#responsive</a>
        <br />
        <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
      </div>
    </div>
  );
};

export default DisplayResults;


