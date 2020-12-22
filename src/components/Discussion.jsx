import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import '../assets/css/App.css';
import Navibar from './Navbar.jsx'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import TextField from '@material-ui/core/TextField'
import PinIcon from './PinIcon'
import Button from 'react-bootstrap/Button';
import Pin from './Pin'
import Logo from './Logo'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PinButton from "./PinButton"
import Comments from "./Comments"
import AddComment from "./AddComment"
import CCC from './CCC'
import Sidebar from "./Sidebar"

import HighlightMenu from "./HighlightMenu"
import { SelectableGroup, createSelectable } from 'react-selectable'

import ReactCursorPosition from "react-cursor-position";
import {animateScroll} from 'react-scroll'

const SelectableComponent = createSelectable(CCC);


class Discussion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioStamp: 0,
      audioTranscript: "",
      pins: [],
      accordion_title: "Supreme Court",
      accordion_body: "",
      pinOrder: 0,
      mainComp: 0,
      isInit: 0,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      cc_comps: [{id: 0, timestamp: 0.0, text: "suck on these titties, suck on these titties", height: 0, y:0},
      {id: 1, timestamp: 2.0, text: "suck on these fat boobs, suck on these fat boobs, suck on these fat boobs", height: 0, y: 0},
      {id: 2, timestamp: 4.0, text: "suck on these big butt, suck on these fat butt, suck on these fat butt", height: 0, y: 0},
      {id: 3, timestamp: 6.0, text: "suck on these titties, suck on these titties", height: 0, y:0},
      {id: 4, timestamp: 8.0, text: "suck on these fat boobs, suck on these fat boobs, suck on these fat boobs", height: 0, y: 0},
      {id: 5, timestamp: 10.0, text: "suck on these big butt, suck on these fat butt, suck on these fat butt", height: 0, y: 0},
      {id: 6, timestamp: 12.0, text: "suck on these titties, suck on these titties", height: 0, y:0},
      {id: 7, timestamp: 14.0, text: "suck on these fat boobs, suck on these fat boobs, suck on these fat boobs", height: 0, y: 0},
      {id: 8, timestamp: 16.0, text: "suck on these big butt, suck on these fat butt, suck on these fat butt", height: 0, y: 0} ],
      cc_load: false,
      currPos: 0,
      selectedElements: [], 
      showComponent: false,
      cursorPos: null,
    };

  }


  

  // handlePin = (pin) => {
  //   this.setState({
  //     pinTime: pin,
  //   })
  // }

  // makePin = (pinTime) => {
  //   console.log("======MAKING PinTime========")
  //   console.log("=======Pinorder=====", this.state.pinOrder)
  //   var timestamp = this.state.pinTime;
  //   console.log("timestamp", timestamp)
  //   var pinId = Math.random() * 10000
  //   var newPin = {
  //     pinId: pinId,
  //     timeStamp: this.state.pinOrder == 0 ? "0:16" : "0:28",
  //     pinSecs: this.state.pinOrder == 0 ? 28 : 40,
  //     title: "The Daily: An Unfinished Election",
  //     tags: ["Joe Biden", "Donald Trump"],
  //     accordion_title: this.state.pinOrder == 0 ? "Supreme Court" : "Joe Biden",
  //     accordion_body: this.state.pinOrder == 0 ? `The Supreme Court of the United States (SCOTUS) is the highest court in the federal judiciary of the United States of America. It has ultimate (and largely discretionary) appellate jurisdiction over all federal and state court cases that involve a point of federal law, and original jurisdiction over a narrow range of cases, specifically "all Cases affecting Ambassadors, other public Ministers and Consuls, and those in which a State shall be Party".[2] The Court holds the power of judicial review, the ability to invalidate a statute for violating a provision of the Constitution.` :
  //     "Joseph Robinette Biden Jr.; born November 20, 1942) is an American politician and the president-elect of the United States. Having defeated incumbent Donald Trump in the 2020 United States presidential election, he will be inaugurated as the 46th president on January 20, 2021. A member of the Democratic Party, Biden served as the 47th vice president from 2009 to 2017 and a United States senator for Delaware from 1973 to 2009",
  //     accordion_img: this.state.pinOrder == 0 ? "/Supreme_court.svg.png" : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Joe_Biden_official_portrait_2013.jpg/220px-Joe_Biden_official_portrait_2013.jpg"
  //   }

  //   this.state.pins.push(newPin)

  //   this.setState({
  //     pinOrder: 1,
  //   })

  // }

  handleSelection = (text) => {
    this.setState({
      selectedElements: text,
    });
  };

  clearSelections = () => {
    this.setState({
      selectedElements: []
    })
  }

  handleHighlight = () => {
    this.setState({
      showComponent: true
    })
  }

  handleResize = (e) => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  };

  handleScroll = (e) => {
    if (this.state.mainComp >= this.state.cc_comps.length - 1) {
      console.log("END OF TRANCRIPT===")
      this.setState({
        mainComp: this.state.mainComp
      })
    } else {
      // check audio timestamp against the interval of podcasts
      // if audiostamp >= cc_comp timestamp i+1
      if (this.props.pinTime >= this.state.cc_comps[this.state.mainComp + 1]['timestamp']) {
        console.log("SHIFTINGG===")
        // shift the heights
        this.shiftHeights()
        // reset the mainComp
        this.setState({
          mainComp: this.state.mainComp + 1
        })
      }
      // reposition the mainComp cc_component to the middle


      // change height for other comps accordingly
    }
  }

  

  shiftHeights = (e) => {
    console.log("END OF WOS===")
    // iterate through all cc_comps
    let shiftHeight = this.state.cc_comps[this.state.mainComp]['height'] / 2 + this.state.cc_comps[this.state.mainComp + 1]['height'] / 2 //height that everything needs to be shifted height
    animateScroll.scrollTo(this.state.currPos + shiftHeight, {containerId: "midcol"});
    this.setState({currPos: this.state.currPos + shiftHeight})
  }

  initHeightPos = (e) => {
      for (var i=0; i<this.state.cc_comps.length; i++) {
        var str = "caption".concat(String(i))
        console.log("=======str========", str)
        console.log(this.refs[str])
        let { clientHeight, clientWidth } = this.refs[str]
        // === feed client height into the cc_comps objects
        this.state.cc_comps[i]['height'] = clientHeight

        if (i == 0){
          this.state.cc_comps[i]['y'] = this.state.windowHeight / 2
          console.log("======Y POS=======", this.state.cc_comps[i]['y']);
        } else {
          this.state.cc_comps[i]['y'] = this.state.cc_comps[i-1]['y'] + this.state.cc_comps[i-1]['height']
          console.log("======Y POS=======", this.state.cc_comps[i]['y']);
        }
      }
      this.setState({cc_load: true})

  }

  componentDidMount = (e) => {
    this.initHeightPos()
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

  componentDidUpdate = (e) => {
    if (this.state.mainComp < this.state.cc_comps.length - 1) {
      this.handleScroll()
    }
  }

  componentWillUnmount = (e) => {
    window.addEventListener("resize", this.handleResize);
  }


  render() {
    console.log("========SELECTED=======", this.state.selectedElements)
    const pinArr = this.state.pins.map((pin, i) => (
      <div style={{opacity: pin.pinSecs - this.props.pinTime}} key={pin.pinId}>
      <Pin title={pin.title} timestamp={pin.timeStamp} tags={pin.tags} accordion_title={pin.accordion_title} accordion_body={pin.accordion_body} accordion_img={pin.accordion_img}/>
      </div>
    ));

    return (
      <Container fluid className="discussion_background main-back">
        <Row>

          <Sidebar handlePin={this.props.handlePin}></Sidebar>


          
          <Col id = "midcol" className="middle" xs={4} style={{display: "flex", flexDirection: "column"}}>
          <SelectableGroup className= "selectGroup" onNonItemClick = {this.clearSelections} onSelection={this.handleSelection} onEndSelection= {this.handleHighlight}>
          <ReactCursorPosition>
            {this.state.cc_comps.map((comp, i) => {
            let selected = this.state.selectedElements.indexOf(i) > -1;
            return (
                <div className ={this.state.mainComp === i? "cctext-highlighted" : "cctext"} style={{position: 'absolute', top: comp['y']}} ref={"caption".concat(String(comp.id))} key={comp.id}>
                  <SelectableComponent key={i} selected={selected} selectableKey={comp.id} ccText={comp.text}  /> 
                </div>
            );
            })}

            {this.state.showComponent ?
              <HighlightMenu style = {{height: "100%", width: "100%"}}/> : null
            }
            </ReactCursorPosition>
            </SelectableGroup>
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
