import React from 'react';
import './landing.css';


const Landing = () => (
    <section className="landing">
      <div className="hero-content">
      <h1 className="hero-title">TURN THE MUSIC UP!</h1>
      </div>
      <section className="selling-points">
      <div className="container">
      <div className="row">
      <div className="point col-4">
        <img src="./assets/images/icons/quaver-outline (1).png" alt="music icon" />
        <h2 className="point-title">Choose your music</h2>
        <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
      </div>
      <div className="point col-4">
        <img src="./assets/images/icons/signal-reception-button.png" alt="streaming icon" />
        <h2 className="point-title">Unlimited, streaming, ad-free</h2>
        <p className="point-description">No arbitrary limits. No distractions.</p>
      </div>
      <div className="point col-4">
        <img src="./assets/images/icons/smartphone-call.png" alt="mobile phone icon" />
        <h2 className="point-title">Mobile enabled</h2>
        <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
      </div>
      </div>
      </div>
    </section>
    </section>
);

export default Landing;
