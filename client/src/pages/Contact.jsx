import React from 'react';
import 'bulma/css/bulma.css';

const Contact = () => {

  return (
     <div className="has-background-info" style={{ minHeight: '100vh' }}>
      <section className="section no-padding">
        <figure className="image is-fullwidth">
          <img src='./Gyeongsangnam.jpg' alt="Gyeongsangnam" />
        </figure>
      </section>
      <nav className="navbar pt-3">
        <div className="navbar-brand">
          <h1 className="title is-3 has-text-centered" style={{ marginRight: 'auto', marginLeft: '850px' }}>Contact Information</h1>
        </div>
      </nav>
      <section className="section">
        <div className="container">
          <div className="content">
            <p className="has-text-white is-size-5">
              Branden Camilio - <a href="https://github.com/CamBC-Lab">https://github.com/CamBC-Lab</a>
              <br />
              Patrick Bowman - <a href="https://github.com/Godzelduh">https://github.com/Godzelduh</a>
              <br />
              Matthew Mendez - <a href="https://github.com/Plutarch1971">https://github.com/Plutarch1971</a>
              <br />
              Kimani Chambliss - <a href="https://github.com/ManiChams">https://github.com/ManiChams</a>
            </p>
          </div>
        </div>
      </section>
     </div>
  );
};

export default Contact;