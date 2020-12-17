import React from 'react';
import '../assets/css/App.css';
import { Link } from 'react-router-dom';
import '../assets/css/App.css';

function Logo() {
  return(
    <div className= "icon"
      style={{
        backgroundColor: "dodgerBlue",
      }}
    >
    <img style = {{width: 30, height: 30, paddingRight: 3, paddingBottom: 13}} src="/LOGO.png" />
    <p style={{
      color: 'white', 
      fontSize: 19,
      fontWeight: "bold",}}> 
        PINCAST
    </p>
    </div>
  );
}

export default Logo;
