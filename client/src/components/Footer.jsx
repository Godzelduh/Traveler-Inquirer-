import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer has-background-info py-2">
      <div className="content has-text-centered has-text-dark is-size-7">
        <p>
          &copy; 2024 Traveler Inquirer. All rights reserved. <Link to="/contact" className="has-text-light">Contact</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;