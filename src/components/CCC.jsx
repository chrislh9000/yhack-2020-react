import React from "react";
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import { Link } from 'react-router-dom'
import "../assets/css/App.css";
import ReactPlayer from "react-player";
import podcast from "../assets/podcasts/election_audio.mp3";
import IconButton from "@material-ui/core/Button";

// import ccPlay from "../assets/images/ccPlay.png"

class CCC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
  }
  toggleHoverEnter = () => {
    this.setState({ hover: true });
    this.renderButton();
  };

  toggleHoverLeave = () => {
    this.setState({ hover: false });
    this.renderButton();
  };

  handlePlay = () => {
    console.log("handleing button click", this.props.ccID);

    this.props.handleMainComp(this.props.ccID);
    this.props.seekToTime(this.props.time);
  };

  renderButton = () => {
    if (this.state.hover) {
      return <IconButton onClick={this.handlePlay}>
        <img style={{
          height: 18,
          width: 18,
        }} src="/ccPlay.png" /></IconButton>;
    } else {
      return <div></div>;
    }
  };

  render() {
    return (//className={this.props.selected ? "testSelect" : ""}
      <Row >
        <Col sm={11}
          onMouseEnter={this.toggleHoverEnter}
          onMouseLeave={this.toggleHoverLeave}
        >
          {this.props.ccText}
        </Col>
        <Col sm={1} 
          onMouseEnter={this.toggleHoverEnter} 
          onMouseLeave={this.toggleHoverLeave}
        >
          {this.renderButton()}
        </Col>
      </Row>
    );
  }
}

export default CCC;
