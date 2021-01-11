import React from "react";
import "../assets/css/App.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/Button";

class PlayBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "", imgURL: this.props.imgURL };

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
            {this.props.playpause ? "NOW PLAYING" : "PAUSED"}
          </div>
          <img
            style={{
              height: 140,
              width: 140,
              borderRadius: 10,
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
            src={this.state.imgURL}
          />

          <Row
            className="mt-2"
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "140px",
            }}
          >
            <IconButton
              onClick={() => this.props.fastRewind()}
              disableTouchRipple={true}
              style={{
                minWidth: "0px",
                outline: "none",
                backgroundColor: "transparent",
              }}
              className="pl-0"
            >
              <img
                style={{
                  height: 18,
                  width: 18,
                }}
                src="/back.png"
              />
            </IconButton>

            <IconButton
              onClick={() => this.props.handlePlayorpause()}
              disableTouchRipple={true}
              style={{ outline: "none", backgroundColor: "transparent" }}
              className="pr-0 pl-0 mt-2"
            >
              <img
                style={{
                  height: 32,
                  width: 32,
                  opacity: 1,
                }}
                src={this.props.playpause ? "/pause.png" : "/play.png"}
              />
            </IconButton>

            <IconButton
              onClick={() => this.props.fastForward()}
              style={{
                minWidth: "0px",
                outline: "none",
                backgroundColor: "transparent",
              }}
              disableTouchRipple={true}
              className="pr-0"
            >
              <img
                style={{
                  height: 18,
                  width: 18,
                }}
                src="/next.png"
              />
            </IconButton>
          </Row>
        </Col>
      </Container>
    );
  }
}

export default PlayBox;
