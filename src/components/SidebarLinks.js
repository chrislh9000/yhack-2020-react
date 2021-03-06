import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../assets/css/App.css";
import { Link } from "react-router-dom";

class SidebarLinks extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    //pre-rendering code

    return (
      <Container className="mb-1 ml-3">
        <Row>
          <img
            className="mr-3"
            style={{
              height: 15,
              width: 15,
            }}
            src="/home-blue.png"
          />
          <Link to="/">
            <p
              style={{
                fontFamily: "Avenir Heavy",
                fontSize: "14px",
                color: "#173B5C",
              }}
              className="sidebar-title"
            >
              HOME
            </p>
          </Link>
        </Row>
        <Row>
          <div className="sidebar-hl" />
        </Row>
        {/* <Row>
          <Link to="/">
            <p className="sidebar-title">Discussion</p>
          </Link>
        </Row>
        <Row>
          <Link to="/about">
            <p className="sidebar-title">Pins</p>
          </Link>
        </Row>
        <Row>
          <Link to="/pins_page">
            <p className="sidebar-title">Reflection</p>
          </Link>
        </Row>
        <Row>
          <Link to="/register">
            <p className="sidebar-title">Profile</p>
          </Link>
        </Row>
        <Row>
          <Link to="/reflect">
            <p className="sidebar-title">Reflect</p>
          </Link>
        </Row>
        <Row>
          <Link to="/social">
            <p className="sidebar-title">Following</p>
          </Link>
        </Row>
        <Row>
          <p className="sidebar-title">Discovered</p>
        </Row>
        <Row>
          <Link to="/home_page">
            <p className="sidebar-title">New Releases</p>
          </Link>
        </Row> */}
      </Container>
    );
  }
}

export default SidebarLinks;
