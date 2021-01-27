import React from "react";
import "../assets/css/App.css";
import { Link } from "react-router-dom";
import "../assets/css/App.css";
import Button from "react-bootstrap/Button";
import IconButton from "@material-ui/core/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";

class NonExtendedPin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <Row style={{ width: "100%", marginLeft: "0px", height: "100%" }}>
          <Col style={{ width: "80%", marginLeft: "0px" }}>
            {this.props.text}
          </Col>
        </Row>
        <Row>
          <div
            className="mb-5"
            style={{
              background: "white"
            }}
          >
            Note: {this.props.note}
          </div>
        </Row>
        <Row>By: {this.props.username}</Row>
        <Row>
          <Dropdown style={{ padding: "10px" }}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Share
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {this.props.user.friends ? (
                this.props.friends.map((user, i) => (
                  <Dropdown.Item
                    onClick={this.props.sharePin(user._id, this.props.pin._id)}
                  >
                    {" "}
                    {user.username}{" "}
                  </Dropdown.Item>
                ))
              ) : (
                <Dropdown.Item> No Friends </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Row>
      </Container>
    );
  }
}

export default NonExtendedPin;
