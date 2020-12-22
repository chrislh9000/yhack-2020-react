import React from "react";
import "../assets/css/App.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "@material-ui/core/Button";
import Audioplayer from "./Audioplayer";

class PlayBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
  }

  changeMessage = (msg) => {
    this.setState({ message: msg });
  };

  render() {
    return (
      <Container
        className="mt-2"
        fluid
        style={{
          backgroundColor: "#7597B0",
        }}
      >
        <Col
          className="mt-3"
          style={{
            flexDirection: "column",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            classname="text-white"
            style={{
              fontFamily: "Arial",
              color: "white",
              fontWeight: "600",
              fontSize: 14,
              marginBottom: "0.3rem",
            }}
          >
            {this.state.message}
          </div>
          <img
            style={{
              height: 140,
              width: 140,
              borderRadius: 10,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
            src="/TheDaily.png"
          />
          <Audioplayer
            message={this.changeMessage}
            handlePin={this.props.handlePin}
            pinTime={this.props.pinTime}
            handleWind={this.props.handleWind}
          />
        </Col>
      </Container>
    );
  }
}

export default PlayBox;
