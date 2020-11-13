import React from 'react';
import '../assets/css/App.css';
import { Link } from 'react-router-dom';
import '../assets/css/App.css';
import Button from 'react-bootstrap/Button';

function PinIcon() {
  return(
    // <div 
    //   style={{
    //     height: "10"
    //   }}
    // >
      <a href = "https://google.com">
      <Button className = "butt" style = {{ borderRadius: "30px 0px 0px 30px", backgroundColor: "black", borderColor: "black"}}>
          <img style = {{width: 60, height: 70, paddingTop: 10}} src="/whitepin.png" />
        <p className = "mt-1" style={{
          color: 'white', 
          fontSize: 13,}}> 
            PIN IT 
        </p>
      </Button>
      </a>
    //  </div>
  );
}

export default PinIcon;
