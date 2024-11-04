import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/auth/signup', {
        username,
        password,
      });

      if (response.data.success) {
        // Automatically log in the user or redirect to login page
        navigate('/login');
      }
    } catch (error) {
      console.error('Signup failed', error);
      setError(error.response?.data?.message || 'Signup failed. Please try again.');
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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