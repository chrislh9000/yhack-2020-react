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
      <div>
        <Container className="mb-1 ml-4">
          <Row>
            <Link to="/">
              <p className="sidebar-title">Home</p>
            </Link>
          </Row>
          <Row>
            <p className="sidebar-title">Search</p>
          </Row>
          <Row>
            <Link to="/about">
              <p className="sidebar-title">Pins</p>
            </Link>
          </Row>
          <Row>
            <Link to="/register">
            <p className="sidebar-title">Profile</p>
            </Link>
          </Row>
          <Row>
            <p className="sidebar-title">Saved Podcasts</p>
          </Row>
          <Row>
            <p className="sidebar-title">Followed</p>
          </Row>
          <Row>
            <p className="sidebar-title">Discovered</p>
          </Row>
          <Row>
            <p className="sidebar-title">New Releases</p>
          </Row>
        </Container>
      </div>
    );
  }
}

export default SidebarLinks;
