import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
// import { Link } from 'react-router-dom'
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
import Pin from './Pin'

import Scroll from "react-scroll"
var Link = Scroll.Link;
var DirectLink = Scroll.DirectLink;
var Element = Scroll.Element;
var Events = Scroll.Events;
var scroll = Scroll.animateScroll;
var scrollSpy = Scroll.scrollSpy;


class Discussion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioStamp: 0,
      audioTranscript: "",
      pins: [],
      pinTime: 0,
      accordion_title: "Supreme Court",
      accordion_body: "",
      pinOrder: 0,
    };

  }

  handlePin = (pin) => {
    this.setState({
      pinTime: pin,
    })
  }

  makePin = (pinTime) => {
    console.log("======MAKING PinTime========")
    console.log("=======Pinorder=====", this.state.pinOrder)
    //get timestamp from audio
    var timestamp = this.state.pinTime;
    console.log("timestamp", timestamp)
    //create pins object
    var pinId = Math.random() * 10000
    var newPin = {
      pinId: pinId,
      timeStamp: this.state.pinOrder == 0 ? "0:16" : "0:28",
      title: "The Daily: An Unfinished Election",
      tags: ["Joe Biden", "Donald Trump"],
      accordion_title: this.state.pinOrder == 0 ? "Supreme Court" : "Joe Biden",
      accordion_body: this.state.pinOrder == 0 ? `The Supreme Court of the United States (SCOTUS) is the highest court in the federal judiciary of the United States of America. It has ultimate (and largely discretionary) appellate jurisdiction over all federal and state court cases that involve a point of federal law, and original jurisdiction over a narrow range of cases, specifically "all Cases affecting Ambassadors, other public Ministers and Consuls, and those in which a State shall be Party".[2] The Court holds the power of judicial review, the ability to invalidate a statute for violating a provision of the Constitution.` :
      "Joseph Robinette Biden Jr.; born November 20, 1942) is an American politician and the president-elect of the United States. Having defeated incumbent Donald Trump in the 2020 United States presidential election, he will be inaugurated as the 46th president on January 20, 2021. A member of the Democratic Party, Biden served as the 47th vice president from 2009 to 2017 and a United States senator for Delaware from 1973 to 2009",
      accordion_img: this.state.pinOrder == 0 ? "/Supreme_court.svg.png" : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Joe_Biden_official_portrait_2013.jpg/220px-Joe_Biden_official_portrait_2013.jpg"
    }

    this.state.pins.push(newPin)

    this.setState({
      pinOrder: 1,
    })

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
      <Pin title={pin.title} timestamp={pin.timeStamp} tags={pin.tags} accordion_title={pin.accordion_title} accordion_body={pin.accordion_body} accordion_img={pin.accordion_img}/>
      </div>
    ));

    return (
      <Container fluid className="discussion_background main-back" style={{ height: "100%" /*backgroundColor: "#353B74"*/}}>
      <Row>
      <Col className="pl-0 pr-0" id="far_left" xs={2} style={{ justifyContent: "flex-start", display: "flex", alignItems: "center", flexDirection: "column", backgroundColor: "#5C719B" }}>
      <Row>
      <p style={{ color: "white", fontSize: "30px" }}>PINCAST</p>
      </Row>
      <Row>
      <Search />
      </Row>
      <Container className = "mb-1" style={{}}>
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
      <p style={{ color: "white", fontSize: "16px" }}>Saved Podcasts</p>
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
      </Container>
      <PlayBox handlePin={this.handlePin} />

      </Col>
      <Col id="middle" xs={3} style={{
           height: "30", minHeight: "50%", height: "850px", overflow: "scroll",display: "flex", borderRadius: "30px 0px 0px 30px", backgroundColor: "#4F57AA", boxShadow: "12px 0 15px -4px rgba(0,0,0,0.5), -12px 0 8px -4px rgba(0,0,0,0.5)",
       }}>
      {/* <div style={{ display: "flex", flexDirection: "column", overflow: "scroll"}} > */}
       <div class="hl" style = {{alignSelf: "center", position: "absolute"}}></div>
        <Element
          name="test7"
          className="element"
          id="containerElement"
          style={{
            position: "relative",
            height: "800px",
            overflow: "scroll",
            marginTop: "20px"
          }}
        >
          <Element
            name="firstInsideContainer"
            style={{
            }}
          >
            {this.state.audioTranscript}
          </Element>

          <Element
            name="secondInsideContainer"
            style={{
            }}
          >
          </Element>
        </Element>
    {/* // <p style={{color: "white", fontSize: "20px", padding: "30px", paddingRight: "130px", overflow: "scroll" }}>
    //
    // </p> */}






    {/* </div> */}
    </Col>
    <Col xs={4} style={{ paddingLeft: "0px", paddingRight: "0px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
    <Container style={{ display: "flex", flexDirection: "column"}}>
    {pinArr}
    </Container>
    <div style = {{}}class="arrow-right"></div>
    <Button onClick={(e) => this.makePin(e)} className = "butt" style = {{borderRadius: "30px 0px 0px 30px", backgroundColor: "#2C3263", borderColor: "#2C3263"}}>
    <img style = {{width: 60, height: 60, paddingTop: 10}} src="/whitepin.png" />
    <p style={{
      color: 'white',
      fontSize: 13,}}>
      PIN IT
      </p>
      </Button>
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
