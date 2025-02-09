import React from 'react';
import image from '../../images/image.png'; // Importing the image correctly
import './Home.css'; // Assuming you have a CSS file for styling

function Home() {
  return (
    <div className="home">
      <div className="left">
        <h1>Welcome to the Portfolio Displayer</h1>
        <p>We are here to cater you the best services possible in the world</p>
      </div>
      <div className="right">
        <img src={image} alt="Portfolio Display" />
      </div>
    </div>
  );
}

export default Home;
