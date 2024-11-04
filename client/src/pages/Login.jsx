import React, { useState } from 'react';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authAPI';
import { UserLogin } from '../interfaces/userLogin';

const Login = () => {
  const [loginData, setLoginData] = useState<UserLogin>({ 
    username: '', 
    password: '',
  });
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(loginData) 
      Auth.login(response.data.token);
      if (response.data) {
        // After successful login, redirect to the results page or user profile
        navigate('/users');
      }
      } catch (error) {
        console.error('Login failed', error);
      }
      {      
    

   
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    navigate('/signup');
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
                      value={loginData.username}
                      onChange={handleChange}
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
                      value={loginData.password}
                      onChange={handleChange}
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
                <section className="section">
                  <div className="container">
                    <div className="columns">
                      <div className="column">
                        <figure className="image is-4by5">
                          <img src="./backpack-traveller.png" alt="Backpack Traveler"></img>
                        </figure>
                      </div>
                      <div className="column">
                        <figure className="image is-4by5">
                          <img src="first-class-flight.webp" alt="First Class Sign"></img>
                        </figure>
                      </div>
                    </div>
                  </div>
                </section>
              </aside>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
}

export default Login;
