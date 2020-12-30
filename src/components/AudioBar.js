import React from "react";
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../assets/css/App.css";
import ReactPlayer from "react-player";
import IconButton from "@material-ui/core/Button";


class PinCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extended: false,
      favoriteButton: false,
      playpause: false
    };
  }


  render() {
    return (
      <div>{this.props.pinTime}
      <hr 
        style={{
          color: "red",
          backgroundColor: "red",
          width: (window.innerWidth / 2) * (this.props.pinTime / this.props.audioDuration), // figure out width
          height: 5,
          position:"relative"
        }} 
      />
      </div>
      
    );
  }
}

export default PinCard;

