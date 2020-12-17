import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../assets/css/App.css";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    //pre-rendering code

    return (
      <div>
        <Container className="mb-1 ml-4">
          <Row>
            <p className="sidebar-title">Home</p>
          </Row>
          <Row>
            <p className="sidebar-title">Search</p>
          </Row>
          <Row>
            <p className="sidebar-title">Pins</p>
          </Row>
          <Row>
            <p className="sidebar-title">Profile</p>
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

export default Sidebar;
