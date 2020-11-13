import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import '../assets/css/App.css';
import Navibar from './Navbar.jsx'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Search from './SearchPage'
import PlayBox from './SearchBar'
import TextField from '@material-ui/core/TextField'
import PinIcon from './PinIcon'
import Button from 'react-bootstrap/Button';

class Discussion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioStamp: 0,
      audioTranscript: "",
      pins: [],
      pinTime: 0,
    };

  }

  handlePin = (pin) => {
    this.setState({
      pinTime: pin,
    })
  }

  makePin = (pinTime) => {
    console.log("======MAKING PinTime========")
    //get timestamp from audio
    var timestamp = this.state.pinTime;
    console.log("timestamp", timestamp)
    //create pins object
    var pinId = Math.random() * 10000
    var newPin = {
      pinId: pinId,
      timeStamp: timestamp,
      title: "The Daily: An Unfinished Election",
      tags: ["Joe Biden", "Donald Trump"]
    }

    this.state.pins.push(newPin)

    //send request to backend, update database with pin
  }

  componentDidMount = (e) => {
    const url = 'http://localhost:3000/db/getTranscript'
    fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res)=> res.json())
    .then((json) => {
      this.setState({
        audioTranscript: json
      })
    })
    .catch((err)=> {
      console.log('Error: ', err);
    });
  }
  render() {
    // const audioTranscript = this.state.audioTrascript.map((transcript, i) => (
    //   <div key="text">
    //     <p> {this.state.audioTrascript} </p>
    //   </div>
    // ))
    //pre-rendering code
    const pinArr = this.state.pins.map((pin, i) => (
      <div key={pin.pinId}>
      <p> PinArr </p>
      </div>
    ));

    return (
      <Container fluid className="discussion_background" style={{ backgroundColor: "#353B74" }}>
      <Row>
      <Col className="pl-0 pr-0" id="far_left" xs={2} style={{ display: "flex", alignItems: "center", flexDirection: "column", backgroundColor: "#5C719B" }}>
      <Row>
      <p style={{ color: "white", fontSize: "30px" }}>PINCAST</p>
      </Row>
      <Row>
      <Search />
      </Row>
      <Container style={{ padding: "10px" }}>
      <Row className="ml-4">
      <p style={{ color: "white", fontSize: "16px" }}>Home</p>
      </Row>
      <Row className="ml-4">
      <p style={{ color: "white", fontSize: "16px" }}>Search</p>
      </Row>
      <Row className="ml-4">
      <p style={{ color: "white", fontSize: "16px" }}>Pins</p>
      </Row>
      <Row className="ml-4">
      <p style={{ color: "white", fontSize: "16px" }}>Profile</p>
      </Row>
      <Row className="ml-4">
      <p style={{ color: "white", fontSize: "16px" }}>Saved Podcastss</p>
      </Row>
      <Row className="ml-4">
      <p style={{ color: "white", fontSize: "16px" }}>Followed</p>
      </Row>
      <Row className="ml-4">
      <p style={{ color: "white", fontSize: "16px" }}>Discovered</p>
      </Row>
      <Row className="ml-4">
      <p style={{ color: "white", fontSize: "16px" }}>New Releases</p>
      </Row>
      <Row>
      <PlayBox handlePin={this.handlePin} />
      </Row>
      </Container>

      </Col>
      <Col id="middle" xs={3} style={{
        display: "flex", borderRadius: "30px 0px 0px 30px", backgroundColor: "#4F57AA", boxShadow: "12px 0 15px -4px rgba(0,0,0,0.5), -12px 0 8px -4px rgba(0,0,0,0.5)"
      }}>
      <div style={{ }
    } >
    <p style={{ height: "55.5%", color: "white", fontSize: "20px", padding: "30px", paddingRight: "130px", overFlow: "scroll" }}>
    {this.state.audioTranscript}
    </p>
    <div class="hl" style = {{alignSelf: "center"}}></div>
    </div>
    </Col>
    <Col xs={4} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center"}}>
    <Button onClick={(e) => this.makePin(e)} className = "butt" style = {{backgroundColor: "#2C3263", borderColor: "#2C3263"}}>
    <img style = {{width: 60, height: 60, paddingTop: 10}} src="/whitepin.png" />
    <p style={{
      color: 'white',
      fontSize: 13,}}>
      PIN IT
      </p>
      </Button>
      <div style = {{alignSelf: "flex-start"}}class="arrow-right"></div>
      <div></div>
      {pinArr}
      </Col>
      <Col id="far_right" xs={3} style={{ justifyContent: "space-between", display: 'flex', flexDirection: 'column', backgroundColor: "#5C719B" }}>
      <Row>
      <div id="comment" className="mt-4 ml-5 mr-4">
      <p className="mb-1" style={{ color: "white", fontSize: "11px" }}>
      David_Wang 2h
      </p>
      <p style={{ color: "white", fontSize: "12px" }}>Also: Justin reviews the outlook for convertibles and discusses how investors can consider taking advantage of the asset...</p>
      <p style={{ color: "white", fontSize: "9px", textAlign: "right" }}>Reply</p>
      <Row display="flex" className="ml-1">
      <div class="vl"></div>
      <Col>
      <div id="replies">
      <p className="mb-1" style={{ color: "white", fontSize: "9px" }}>
      David_Wang 2h
      </p>
      <p style={{ color: "white", fontSize: "12px" }}>Also: Justin reviews the outlook for convertibles and discusses how investors can consider taking advantage of the asset...</p>
      <p style={{ color: "white", fontSize: "9px", textAlign: "right" }}>Reply</p>
      </div>

      <div id="replies">
      <p className="mb-1" style={{ color: "white", fontSize: "9px" }}>
      David_Wang 2h
      </p>
      <p style={{ color: "white", fontSize: "12px" }}>Also: Justin reviews the outlook for convertibles and discusses how investors can consider taking advantage of the asset...</p>
      <p style={{ color: "white", fontSize: "9px", textAlign: "right" }}>Reply</p>
      </div>


      </Col>
      </Row>
      </div>
      <div id="comment" className="mt-4 ml-5 mr-4">
      <p className="mb-1" style={{ color: "white", fontSize: "9px" }}>
      David_Wang 2h
      </p>
      <p style={{ color: "white", fontSize: "12px" }}>Also: Justin reviews the outlook for convertibles and discusses how investors can consider taking advantage of the asset...</p>
      <p style={{ color: "white", fontSize: "9px", textAlign: "right" }}>Reply</p>
      <Row display="flex" className="ml-1">
      <div class="vl2"></div>
      <Col>
      <div id="replies">
      <p className="mb-1" style={{ color: "white", fontSize: "9px" }}>
      David_Wang 2h
      </p>
      <p style={{ color: "white", fontSize: "12px" }}>Also: Justin reviews the outlook for convertibles and discusses how investors can consider taking advantage of the asset...</p>
      <p style={{ color: "white", fontSize: "9px", textAlign: "right" }}>Reply</p>
      </div>


      </Col>
      </Row>
      </div>
      </Row>
      <Row>
      <Container style={{ borderRadius: "30px 30px 0px 0px", height: "180px", backgroundColor: "#7597B0", display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: "center", boxShadow: "0px -4px 3px rgba(50, 50, 50, 0.35)" }}>
      <TextField
      id="first-name"
      label="Add Comment"
      margin="normal"
      />
      </Container>
      </Row>
      </Col>
      </Row>
      </Container >



    );
  };
};

export default Discussion
