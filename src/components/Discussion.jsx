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

import Scroll from "react-scroll"
// var Link = Scroll.Link;
// import DirectLink from Scroll.DirectLink;
var Element = Scroll.Element;
// import Events from Scroll.Events;
// import scroll from Scroll.animateScroll;
// import scrollSpy from Scroll.scrollSpy;



class Discussion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioStamp: 0,
      audioTrascript: "",
    };
    
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
      console.log("SUCCESS!!!");
      console.log(json);
      this.setState({
        audioTrascript: json
      })
      console.log("audioStamp", this.state.audioTranscript)
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
      {/* <Row>
      
      </Row> */}
      </Container>
      <PlayBox />

      </Col>
      <Col id="middle" xs={3} style={{
       height: "30", minHeight: "50%", overflow: "scroll",display: "flex", borderRadius: "30px 0px 0px 30px", backgroundColor: "#4F57AA", boxShadow: "12px 0 15px -4px rgba(0,0,0,0.5), -12px 0 8px -4px rgba(0,0,0,0.5)",
       }}>
      <div style={{ display: "flex", flexDirection: "column", overflow: "scroll"}
    } >
      <Link
          activeClass="active"
          to="firstInsideContainer"
          spy={true}
          smooth={true}
          duration={250}
          containerId="containerElement"
          style={{ display: "inline-block", margin: "20px" }}
        >
          Go to first element inside container
        </Link>
        <Element
            name="firstInsideContainer"
            style={{
              height: "48%", color: "white", fontSize: "20px", padding: "30px", overFlow: "scroll" 
            }}
          >
            I'm here to tell you tonight. We believe we're on track to win this
            election. From The New York Times. I'm Michael borrow. This is a
            daily today. So we'll be going to the US Supreme Court. We want all
            voting to start. It ain't over till every vote is counted. Every
            ballot is counted Joe Biden is calling for patients and President
            Trump is threatening legal action as millions of votes are still
            uncounted. We don't want them to find any ballots at Four o'clock in
            the morning and add them to the list. Okay. It's going to take time
            to count the votes. We're going to win, Pennsylvania. Alex burns on
            where the election stands and the remaining paths to Victory. We
            were getting ready to win this election.

            I'm here to tell you tonight. We believe we're on track to win this
            election. From The New York Times. I'm Michael borrow. This is a
            daily today. So we'll be going to the US Supreme Court. We want all
            voting to start. It ain't over till every vote is counted. Every
            ballot is counted Joe Biden is calling for patients and President
            Trump is threatening legal action as millions of votes are still
            uncounted. We don't want them to find any ballots at Four o'clock in
            the morning and add them to the list. Okay. It's going to take time
            to count the votes. We're going to win, Pennsylvania. Alex burns on
            where the election stands and the remaining paths to Victory. We
            were getting ready to win this election.
          </Element>
    {/* <p style={{ height: "48%", color: "white", fontSize: "20px", padding: "30px", overFlow: "scroll" }}> 
    
    Hello dog my name is ... David Wang  Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
    Hello dog my name isid Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang


    </p> */}

    
    </div>
    <div class="hl" style = {{position: 'absolute', alignSelf: "center"}}></div>
    
    </Col>
    <Col xs={4} style={{ paddingRight: "0px", paddingLeft: "2px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
      
      <div style = {{}}class="arrow-right"></div>
      <PinIcon/>
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
