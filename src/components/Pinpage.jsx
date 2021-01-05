import React from "react";
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import "../assets/css/App.css";
import Navibar from "./Navbar.jsx";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Sidebar from "./Sidebar";
import SearchPage from "./SearchPage";
import PinCard from "./PinCard";
import AudioBar from "./AudioBar";

class Pinpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currPins: [
        {
          text: '"...From the New York Times, I\'m Michael Borrow..."',
          time: 68,
          note: "OMG its sleepy joe",
        },
        {
          text: '"...I\'m here to tell you tonight..."',
          time: 68,
          note: "OMG its sleepy joe",
        },
        {
          text: "\"...From the New York Times, I'm Michael Borrow",
          time: 68,
          note: "OMG its sleepy joe",
        },
        {
          text: "\"...From the New York Times, I'm Michael Borrow",
          time: 68,
          note: "OMG its sleepy joe",
        },
        {
          text: "\"...From the New York Times, I'm Michael Borrow",
          time: 68,
          note: "OMG its sleepy joe",
        },
      ],
      audioSame: this.props.currPlay === this.props.reflectPlay,
    };
  }
  handleEdit = () => {
    const url = "http://localhost:5000/pins/editPin";
    fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startTime: 1,
        endTime: 5,
        newCcId: 1,
        text: "oh elo",
        ccId: 5,
        episode: "PlanetMoney0",
        id: "5fdaf4e7616a7e5445f0ba59",
      }),
    })
      .then((json) => {
        console.log("hi");
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
  render() {
    //pre-rendering code
    return (
      <Container fluid className="discussion_background main-back">
        <Row>
          <Sidebar
            handlePlayorpause={this.props.handlePlayorpause}
            fastRewind={this.props.fastRewind}
            fastForward={this.props.fastForward}
            seekToTime={this.props.seekToTime}
            handlePin={this.props.handlePin}
            pinTime={this.props.pinTime}
            playpause={this.props.playpause}
            user={this.props.user}
          />

          <Col>
            <Row>
              <SearchPage />
            </Row>
            <Row>
              <AudioBar
                pinTime={this.props.pinTime}
                audioDuration={this.props.audioDuration}
                handlePlayorpause={this.props.handlePlayorpause}
                fastRewind={this.props.fastRewind}
                fastForward={this.props.fastForward}
                seekToTime={this.props.seekToTime}
                handlePin={this.props.handlePin}
                playpause={this.props.playpause}
                user={this.props.user}
                audioSame={this.state.audioSame}
              />
            </Row>
            <Row>
              <Col>
                {this.state.currPins.map((pin, i) => {
                  return (
                    <div
                      className="mb-5"
                      style={{
                        // display: "flex",
                        // flexDirection: "row",
                        background: "grey",
                        borderRadius: "25px",
                      }}
                    >
                      <PinCard
                        text={pin.text}
                        key={i}
                        time={pin.time}
                        note={pin.note}
                        handleEdit={this.handleEdit}
                      />
                    </div>
                  );
                })}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Pinpage;
