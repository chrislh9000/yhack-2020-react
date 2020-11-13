import React from 'react';
import '../assets/css/App.css';
import { Link } from 'react-router-dom';
import '../assets/css/App.css';
import Button from 'react-bootstrap/Button';

class PinIcon extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  postPin = (e) => {
    //get timestamp from audio

    //update state in discussion

    //send request to backend, update database with pin
  }

  render () {
    return (
      <Button onClick={(e) => this.postPin(e)} className = "butt" style = {{backgroundColor: "#2C3263", borderColor: "#2C3263"}}>
      <img style = {{width: 60, height: 60, paddingTop: 10}} src="/whitepin.png" />
      <p style={{
        color: 'white',
        fontSize: 13,}}>
        PIN IT
        </p>
        </Button>
      )
    }      // </div>
  }

  export default PinIcon;
