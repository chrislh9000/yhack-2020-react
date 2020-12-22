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




import {animateScroll} from 'react-scroll'


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
      cc_comps: [],
      cc_load: false,
      currPos: 0,
      ccTime: [0, 2.0, 4.0, 6.0, 8.0, 10.0, 12.0, 14.0]
    };
  }

  handleResize = (e) => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  };

  handleMainComp = (comp_id) => {
    let timeStamp =  this.state.cc_comps[comp_id]['timestamp']
    this.props.handlePin(timeStamp)
    this.adjustScroll(comp_id)
    this.setState({
      mainComp: comp_id
    })
  }

  handleWind = (timestamp) => {
    let cc_id = 0;
    // fast forwarding
    if (this.state.cc_comps[this.state.mainComp]['timestamp'] <= timestamp) {
      let cc_id = this.state.cc_comps.length - 1
      for (let i = this.state.mainComp; i < this.state.mainComp.length; i++) {
        if (timestamp <= this.state.cc_comps[i]['timestamp']) {
          cc_id = i-1
        }
      }
    } else if (this.state.cc_comps[this.state.mainComp]['timestamp'] >= timestamp) {
      let cc_id = 0
      for (let i = this.state.mainComp; i >= 0; i--) {
        if (timestamp >= this.state.cc_comps[i]['timestamp']) {
          cc_id = i
        }
      }
    }
    return cc_id
  }

  adjustScroll = (comp_id) => {
    let shiftHeight = this.state.cc_comps[comp_id]['y'] - this.state.windowHeight / 2
    for (let i = 0; i < this.state.cc_comps.length; i++) {
      this.state.cc_comps[i]['y'] -= shiftHeight
    }
  }

  handleScroll = (e) => {
    console.log("==MAIN COMP ====", this.state.mainComp)
    console.log("==COMP LENGTH ====", this.state.cc_comps.length - 1)
    if (this.state.mainComp >= this.state.cc_comps.length - 1) {
      console.log("==NIG DIGCKS====")
      if (this.props.pinTime < this.state.cc_comps[this.state.mainComp]['timestamp'] &&
      this.props.pinTime >= this.state.cc_comps[0]['timestamp']) {
        console.log("DICKS IN MY ASS===")
        // shift the heights
        let shiftHeight = this.state.cc_comps[this.state.mainComp]['height'] / 2 + this.state.cc_comps[this.state.mainComp + 1]['height'] / 2 //height that everything needs to be shifted height
        animateScroll.scrollTo(this.state.currPos - shiftHeight, {containerId: "midcol"});
        this.setState({currPos: this.state.currPos - shiftHeight})
        // reset the mainComp
        this.setState({
          mainComp: this.state.mainComp - 1
        })
      }
        else {
          this.setState({
            mainComp: this.state.mainComp
          })
        }
    } else {
      if (this.props.pinTime >= this.state.cc_comps[this.state.mainComp + 1]['timestamp']) {
        console.log("SHIFTINGG===")
        // shift the heights
        let shiftHeight = this.state.cc_comps[this.state.mainComp]['height'] / 2 + this.state.cc_comps[this.state.mainComp + 1]['height'] / 2 //height that everything needs to be shifted height
        animateScroll.scrollTo(this.state.currPos + shiftHeight, {containerId: "midcol"});
        this.setState({currPos: this.state.currPos + shiftHeight})
        // reset the mainComp
        this.setState({
          mainComp: this.state.mainComp + 1
        })
      } else if (this.props.pinTime < this.state.cc_comps[this.state.mainComp]['timestamp'] &&
      this.props.pinTime >= this.state.cc_comps[0]['timestamp']) {
        console.log("DICKS IN MY ASS===")
        // shift the heights
        let shiftHeight = this.state.cc_comps[this.state.mainComp]['height'] / 2 + this.state.cc_comps[this.state.mainComp + 1]['height'] / 2 //height that everything needs to be shifted height
        animateScroll.scrollTo(this.state.currPos - shiftHeight, {containerId: "midcol"});
        this.setState({currPos: this.state.currPos - shiftHeight})
        // reset the mainComp
        this.setState({
          mainComp: this.state.mainComp - 1
        })
        // reposition the mainComp cc_component to the middle
      }
      // change height for other comps accordingly
    }
  }

  shiftHeights = (shiftHeight) => {
    animateScroll.scrollTo(this.state.currPos + shiftHeight, {containerId: "midcol"});
    this.setState({currPos: this.state.currPos + shiftHeight})
  }

  initHeightPos = (e) => {
    for (var i=0; i<this.state.cc_comps.length; i++) {
      var str = "caption".concat(String(i))
      let { clientHeight, clientWidth } = this.refs[str]
      // === feed client height into the cc_comps objects
      this.state.cc_comps[i]['height'] = clientHeight

      if (i == 0){
        this.state.cc_comps[i]['y'] = this.state.windowHeight / 2
        // console.log("======Y POS=======", this.state.cc_comps[i]['y']);
      } else {
        this.state.cc_comps[i]['y'] = this.state.cc_comps[i-1]['y'] + this.state.cc_comps[i-1]['height']
        // console.log("======Y POS=======", this.state.cc_comps[i]['y']);
      }
    }
    this.setState({cc_load: true})

  }

  componentDidMount = (e) => {
    this.initHeightPos()
    window.addEventListener("resize", this.handleResize);
    const url = 'http://localhost:5000/transcript/loadTranscript/daily_nytimes_election'
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
        cc_comps : json.message
      })
      this.initHeightPos()
    })
    .catch((err)=> {
      console.log('Error: ', err);
    });
  }

  componentDidUpdate = (e) => {
    if (this.state.cc_comps){
      if (this.state.mainComp < this.state.cc_comps.length - 1) {
        this.handleScroll()
      }
    }
  }

  componentWillUnmount = (e) => {
    window.addEventListener("resize", this.handleResize);
  }

  renderTranscript = () => {
    if (this.state.cc_comps) {
      const ccArr = this.state.cc_comps.map((comp, i) => (
        <div className ={this.state.mainComp === i? "cctext-highlighted" : "cctext"} style={{position: 'absolute', top: this.state.cc_comps[i]['y']}} ref={"caption".concat(String(comp.id))} key={comp.id}>
        <CCC ccText={comp.text} ccID={comp.id} handlePin={this.props.handlePin} handleMainComp={this.handleMainComp}/>
        </div>
      ));
      return ccArr
    } else {
      return <div></div>
    }
  }


  render() {
    // console.log("AUDIOSTAMP=====", this.props.pinTime)
    // console.log(this.state.innerWidth)
    const pinArr = this.state.pins.map((pin, i) => (
      <div style={{opacity: pin.pinSecs - this.props.pinTime}} key={pin.pinId}>
      <Pin title={pin.title} timestamp={pin.timeStamp} tags={pin.tags} accordion_title={pin.accordion_title} accordion_body={pin.accordion_body} accordion_img={pin.accordion_img}/>
      </div>
    ));

    // const ccArr = this.state.cc_comps.map((comp, i) => (
    //   <div className ={this.state.mainComp === i? "cctext-highlighted" : "cctext"} style={{position: 'absolute', top: this.state.cc_comps[i]['y']}} ref={"caption".concat(String(comp.id))} key={comp.id}>
    //   <CCC ccText={comp.text} ccID={comp.id} handlePin={this.props.handlePin} ccTime={this.state.ccTime}/>
    //   </div>
    // ));
    // console.log("====CC_comps", this.state.cc_comps)

    return (
      <Container fluid className="discussion_background main-back">
      <Row>

      <Sidebar handlePin={this.props.handlePin} pinTime={this.props.pinTime} handleWind={this.handleWind}></Sidebar>

      {/* <Col className="pl-0 pr-0 far-left" xs={2}>
      <Col className="pl-0 far-left-top" >
      <LogoHome/>
      <Row style = {{paddingLeft: "1.5rem"}}>
      <Search/>
      <UserView className = "ml-4" style = {{alignSelf: "left"}}/>

      <SidebarLinks/>
      </Row>
      </Col>
      <PlayBox handlePin={this.handlePin} />
      </Col> */}



      <Col id = "midcol" className="middle" xs={4} style={{display: "flex", flexDirection: "column"}}>
      {this.renderTranscript()}
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
