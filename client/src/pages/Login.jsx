import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });
      if (response.data) {
        // After successful login, redirect to the results page or user profile
        navigate('/users');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (

<div className="container">
  <section className="section">
    <div className="container">
      <h2 className="title is-2 has-text-success">Login</h2>
      <form className="box has-background-primary-light" onSubmit={handleLogin}>
        <div className="column is-one-third">

          <label className="label">Username:</label>
          <div className="control">
            <input
              className="input"
              type="text has-text-black"
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
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required

            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-primary" type="submit">Login</button>
          </div>
        </div>
      </form>
      <aside>
      <img src='./backpack-traveler.png' alt="Backpack-Traveler" />
      </aside>
    </div>
  </section>
</div>
  );
};

export default Login;
