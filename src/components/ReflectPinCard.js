import React from "react";
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../assets/css/App.css";
import ReactPlayer from "react-player";
import IconButton from "@material-ui/core/Button";
import NonExtendedPin from "./NonExtendedPin";
import ExtendedPin from "./ExtendedPin";
import Dropdown from "react-bootstrap/Dropdown";

class ReflectPinCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container
        style={{
          // display: "flex",
          // flexDirection: "row",
          background: "#E7E7E7",
          borderRadius: "10px",
          marginTop: "10px"
        }}
      >
        <Row style={{ width: "100%" }}>
          <Col xs={11} style={{ padding: "1%" }}>
            <p1>@</p1><p1>d.wang98</p1>
          </Col>
          <Col xs={1}>
            <IconButton>
              <img
                style={{
                  height: 20,
                  width: 20
                }}
                src="/threeDotCircle.png"
              />
            </IconButton>
          </Col>
        </Row>

        <Row style={{ padding: "2%" }}>
          <p1>This is the note and there are lots of words</p1>
        </Row>
        <Row style={{ paddingLeft: "5%" }}>
          <p1>Comment here and also the replies</p1>
        </Row>
      </Container>
    );
  }
}

export default ReflectPinCard;
