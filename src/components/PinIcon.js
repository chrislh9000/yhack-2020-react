import React from 'react';
import '../assets/css/App.css';
import { Link } from 'react-router-dom';
import '../assets/css/App.css';
import Button from 'react-bootstrap/Button';

function PinIcon() {
  return(
    // <div className= "ic"
    //   style={{
    //     alignItems: 'center',
    //   }}
    // >
      <a href = "https://google.com">
      <Button className = "butt" style = {{backgroundColor: "#2C3263", borderColor: "#2C3263"}}>
          <img style = {{width: 60, height: 60, paddingTop: 10}} src="/whitepin.png" />
        <p style={{
          color: 'white', 
          fontSize: 13,}}> 
            PIN IT 
        </p>
      </Button>
      </a>
    // </div>
  );
}

export default PinIcon;
