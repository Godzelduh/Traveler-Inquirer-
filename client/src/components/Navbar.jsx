import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import auth from '../utlis/auth';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
        <img src="TravelLogo.jpg" alt="Logo"/>
        </a>

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Home
          </Link>

          {location.pathname !== '/contact' && (
            <Link to="/contact" className="navbar-item">
              Contact
            </Link>
          )}

           {(location.pathname !== '/flights' && auth.loggedIn()) && (
            <Link to="/flights" className="navbar-item">
            Flight Search
            </Link>
          )} 

          {location.pathname !== '/account' && auth.loggedIn() && (
            <Link to="/account" className="navbar-item">
              Account
            </Link>
          )}
                   
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {location.pathname === '/Login' && (
                <>
                  {/* <a className="button is-primary">
                    <strong>Sign up</strong>
                  </a> */}
                  <a href="/login" className="button is-light">
                    Log in
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;