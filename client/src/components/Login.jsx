
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
      const response = await axios.post('http://localhost:3001/auth/login', {
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

  const handleSignupClick = (e) => {
    e.preventDefault(); // Prevent form submission
    navigate('/signup'); // Navigate to signup page
  };

  return (
    <>
      <div className="has-background-primary-light">
        <div className="container">
          <section className="section has-background-primary">
            <div className="container has-background-primary">
              <h2 className="title is-2 has-text-light has-text-centered">Login</h2>
              <form className="box has-background-primary-light" onSubmit={handleLogin}>
                <div className="column is-one-third">
                  <label className="label">Username:</label>
                  <div className="control">
                    <input
                      className="input is-rounded is-primary"
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
                      className="input is-rounded is-primary"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="field is-grouped is-grouped-mobile is-grouped-tablet">
                  <div className="control">
                    <button className="button is-primary" type="submit">Login</button>
                  </div>
                  <div className="control">
                    <button 
                      className="button is-primary" 
                      onClick={handleSignupClick}
                      type="button" // Change to type="button" to prevent form submission
                    >
                      Not a member? Sign up!
                    </button>
                  </div>
                </div>
              </form>
              <aside>
                {/* Rest of your aside content remains the same */}
              </aside>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Login;
// const handleLogin = async (credentials) => {
//     try {
//       const response = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(credentials)
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         localStorage.setItem('amadeusToken', data.token);
//         localStorage.setItem('userId', data.userId);
//         navigate('/account');
//       }
//     } catch (error) {
//       // Handle error
//     }
//   };