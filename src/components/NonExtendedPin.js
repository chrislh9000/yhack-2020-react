import React from "react";
import "../assets/css/App.css";
import { Link } from "react-router-dom";
import "../assets/css/App.css";
import Button from "react-bootstrap/Button";
import IconButton from "@material-ui/core/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class NonExtendedPin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Row>
        <Col xs={6} style={{ display: "absolute", flexDirection: "column", width: "50%"}}>
          {this.props.text}
        </Col>
        <Col xs={6} style={{ display: "absolute", flexDirection: "column", width: "50%"}}>
          {this.props.note}
        </Col>
      </Row>
    );
  }
}

export default NonExtendedPin;