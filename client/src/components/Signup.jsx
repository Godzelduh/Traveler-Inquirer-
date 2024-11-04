import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from './auth';
import UserAuth from '../interfaces/userSignup';

const Signup = () => {
  const [userAuth, setUserAuth] = useState(new UserAuth('', ''));
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (userAuth.getPassword() !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userAuth.getUsername(),
          password: userAuth.getPassword(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      if (data.token) {
        Auth.login(data.token);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      setError(error.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="has-background-primary-light">
      <div className="container">
        <section className="section has-background-primary">
          <div className="container has-background-primary">
            <h2 className="title is-2 has-text-light has-text-centered">Sign Up</h2>
            <form className="box has-background-primary-light" onSubmit={handleSignup}>
              {error && (
                <div className="notification is-danger">
                  {error}
                </div>
              )}
              <div className="column is-one-third">
                <label className="label">Username:</label>
                <div className="control">
                  <input
                    className="input is-rounded is-primary"
                    type="text"
                    value={userAuth.getUsername()}
                    onChange={(e) => {
                      const newUserAuth = new UserAuth(e.target.value, userAuth.getPassword());
                      setUserAuth(newUserAuth);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="column is-one-third">
                <label className="label">Password:</label>
                <div className="control">
                  <input
                    className="input is-rounded is-primary"
                    type="password"
                    value={userAuth.getPassword()}
                    onChange={(e) => {
                      const newUserAuth = new UserAuth(userAuth.getUsername(), e.target.value);
                      setUserAuth(newUserAuth);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="column is-one-third">
                <label className="label">Confirm Password:</label>
                <div className="control">
                  <input
                    className="input is-rounded is-primary"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-primary" type="submit">
                    Sign Up
                  </button>
                </div>
                <div className="control">
                  <button
                    className="button is-primary"
                    type="button"
                    onClick={() => navigate('/login')}
                  >
                    Already have an account? Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Signup;