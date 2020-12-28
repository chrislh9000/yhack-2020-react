import React from "react";
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../assets/css/App.css";
import ReactPlayer from "react-player";
import podcast from "../assets/podcasts/planet_money.mp3";
import IconButton from "@material-ui/core/Button";
import PinIcon from "./PinIcon";
import TextPlayButton from "./TextPlayButton";

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
      return <TextPlayButton handlePlay={this.handlePlay} />;
    } else {
      return <div></div>;
    }
  };

  render() {
    return (
      <Row
        style={{ width: "100%", marginLeft: "0px", height: "100%" }}
        className={
          (this.props.selected ? "select" : "") +
          (this.props.highlighted ? "highlighted-pin" : "")
        }
      >
        <div
          style={{ width: "7%" }}
          onMouseEnter={this.toggleHoverEnter}
          onMouseLeave={this.toggleHoverLeave}
          className="pr-4"
        >
          {this.renderButton()}
        </div>
        <div
          style={{ width: "80%" }}
          onMouseEnter={this.toggleHoverEnter}
          onMouseLeave={this.toggleHoverLeave}
        >
          {this.props.ccText}
        </div>
        <div className="pl-4">{this.props.pins ? <PinIcon /> : <div />}</div>
      </Row>
    );
  }
}

export default CCC;
