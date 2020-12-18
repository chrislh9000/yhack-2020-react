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
import PlayBox from './PlayBox'
import TextField from '@material-ui/core/TextField'
import PinIcon from './PinIcon'
import Button from 'react-bootstrap/Button';
import Pin from './Pin'
import Logo from './Logo'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import UserView from "./UserView"
import Sidebar from "./Sidebar"
import LogoHome from "./LogoHome"
import PinButton from "./PinButton"
import Comments from "./Comments"
import AddComment from "./AddComment"
import CCC from './CCC'

// import Scroll from "react-scroll"


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
      windowWidth: window.innerWidth,
      cc_comps: [{id: 1, timestamp: 0.0, text: "suck on these titties, suck on these titties"},
      {id: 2, timestamp: 5.0, text: "suck on these fat boobs, suck on these fat boobs, suck on these fat boobs"},
      {id: 3, timestamp: 10.0, text: "suck on these big butt, suck on these fat butt, suck on these fat butt"}]
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
      pinSecs: this.state.pinOrder == 0 ? 28 : 40,
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

  handleResize = (e) => {
    this.setState({ windowWidth: window.innerWidth });
  };

  componentDidMount = (e) => {

    let { clientHeight, clientWidth } = this.refs.caption1
    console.log(clientWidth, clientHeight)

    console.log("WINDOW SIZE=====", this.state.windowWidth)
    window.addEventListener("resize", this.handleResize);
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

  componentWillUnmount = (e) => {
    window.addEventListener("resize", this.handleResize);
  }


  render() {
    const pinArr = this.state.pins.map((pin, i) => (
      <div style={{opacity: pin.pinSecs - this.state.pinTime}} key={pin.pinId}>
      <Pin title={pin.title} timestamp={pin.timeStamp} tags={pin.tags} accordion_title={pin.accordion_title} accordion_body={pin.accordion_body} accordion_img={pin.accordion_img}/>
      </div>
    ));

    const ccArr = this.state.cc_comps.map((comp, i) => (
      <div ref={"caption".concat(String(comp.id))} key={comp.id}>
      <CCC ccText={comp.text} />
      </div>
    ));

    return (
      <Container fluid className="discussion_background main-back">
      <Row>
      <Col className="pl-0 pr-0 far-left" xs={2}>
      <Col className="pl-0 far-left-top" >
      <LogoHome/>
      <Row style = {{paddingLeft: "1.5rem"}}>
      <Search/>
      <UserView className = "ml-4" style = {{alignSelf: "left"}}></UserView>

      <Sidebar></Sidebar>
      </Row>
      </Col>
      <PlayBox handlePin={this.handlePin} />

      </Col>


      <Col className="middle" xs={4} style={{display: "flex", flexDirection: "column"}}>
      {ccArr}
      </Col>
      <Col xs={3} style={{ paddingLeft: "0px", paddingRight: "0px", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
      <Container style={{ display: "flex", flexDirection: "column"}}>
      {pinArr}

      </Container>

      <PinButton makePin = {this.makePin}/>
      </Col>


      <Col id="far_right" xs={3} style={{ justifyContent: "space-between", display: 'flex', flexDirection: 'column', backgroundColor: "#5C719B" }}>
      <Comments/>
      <AddComment/>
      </Col>
      </Row>
      </Container >



    );
  };
};

export default Discussion
