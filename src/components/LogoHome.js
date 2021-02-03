import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import "../assets/css/App.css";

class LogoHome extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    //pre-rendering code

    return (
      <Row className="mt-4" style={{ alignSelf: "center" }}>
        <img
          className="mr-1 mb-5"
          style={{
            width: 30,
            height: 30,
            paddingRight: 3,
            paddingBottom: 2,
            paddingTop: 3,
          }}
          src="/LOGO.png"
        />
        <p
          style={{
            fontFfamily: "Avenir Heavy",
            color: "#173B5C",
            fontSize: 24,
            fontWeight: "bold",
            paddingTop: 5,
          }}
        >
          PINCAST
        </p>
      </Row>
    );
  }
}

export default LogoHome;
