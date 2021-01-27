import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../assets/css/App.css";
import PinButton from "./PinButton";
import Comments from "./Comments";
import AddComment from "./AddComment";
import CCC from "./CCC";
import Sidebar from "./Sidebar";
import Form from "react-bootstrap/Form";
import HighlightMenu from "./HighlightMenu";
import { SelectableGroup, createSelectable } from "react-selectable";
import ReflectPinCard from "./ReflectPinCard"
import ReactCursorPosition from "react-cursor-position";
import { animateScroll } from "react-scroll";
import transitions from "@material-ui/core/styles/transitions";
import { IconButton } from "@material-ui/core";
import UserView from "./UserView";

class Reflect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: [], // pinned objects
      mainComp: 0,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      cc_comps: [],
      cc_load: false,
      currPos: 0,
      selectedElements: [],
      showComponent: false,
      cursorPos: null,
      currTime: 0,
      highlighted: new Map(),
      shouldRenderPins: ["1", "2"]
    };
  }

  componentDidMount = e => {};

  componentDidUpdate = e => {};

  componentWillUnmount = e => {};

  render() {
    return (
      <Container fluid className="discussion_background">
        <Row style={{ height: "100%" }}>
          <Col xs={2} style={{ padding: "0px" }}>
            <Sidebar
              handlePlayorpause={this.props.handlePlayorpause}
              fastRewind={this.props.fastRewind}
              fastForward={this.props.fastForward}
              seekToTime={this.props.seekToTime}
              handlePin={this.props.handlePin}
              pinTime={this.props.pinTime}
              playpause={this.props.playpause}
              user={this.props.user}
              imgURL={this.props.imgURL}
            />
          </Col>

          <Col>
            <Row style={{ height: "40%" }} className="reflect-top">
              {/* play col */}
              <Col xs={8} style={{ width: "80%" }}>
                <Row
                  style={{
                    height: "75%",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <Col xs={3} style={{ marginLeft: "0%" }}>
                    <IconButton
                      style={{
                        backgroundColor: "white",
                        borderRadius: "50%",
                        width: "100px",
                        height: "100px",
                        marginLeft: "25%",
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                      }}
                    >
                      <img
                        style={{
                          paddingLeft: "7.5%",
                          paddingTop: "3%",
                          height: 28,
                          width: 28
                        }}
                        src="BluePlay.png"
                      />
                    </IconButton>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center"
                    }}
                    xs={9}
                  >
                    <Row>
                      <p1 style={{ textAlign: "center", color: "white" }}>
                        The Investors Podcast
                      </p1>
                    </Row>
                    <Row>
                      <p1 style={{ textAlign: "right", color: "white" }}>
                        Millenial Investing
                      </p1>
                    </Row>
                  </Col>
                </Row>
                <Row
                  style={{
                    height: "25%"
                  }}
                >
                  Play here
                </Row>
              </Col>
              {/* picture and user col */}
              <Col style={{ display: "flex", flexDirection: "column" }}>
                <Row style={{ flexDirection: "row-reverse" }}>
                  <UserView
                    className="ml-4"
                    style={{ alignSelf: "right" }}
                    user={{ username: "Kalistafa" }}
                  />
                </Row>
                <Row style={{ flexDirection: "row-reverse" }}>
                  <img
                    className="ml-3 mt-3 mb-3"
                    style={{
                      height: 180,
                      width: 180,
                      borderRadius: 10,
                      boxShadow:
                        "0 4px 8pdx 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                    }}
                    src={"npr_planetmoney.jpg"}
                  />
                </Row>
              </Col>
            </Row>








            {/* Bottom Row of Entire page */}
            <Row style={{ height: "65%" }}>
              {/* Title Row */}
              <Row style={{ width: "100%", display: "flex" }}>
                {/* Pins Title */}
                <Col xs={8}>
                  <h1>Pins</h1>
                </Col>
                {/* Filter Bar */}
                <Col xs={4} style={{}}>
                  <Row>Filter by:</Row>
                  <Row>
                    <Form>
                      <Form.Group controlId="formBasicCheckbox">
                        <Form.Check inline type="checkbox" label="Me" />
                        <Form.Check inline type="checkbox" label="Friends" />
                        <Form.Check inline type="checkbox" label="World" />
                      </Form.Group>
                    </Form>
                  </Row>
                </Col>
              </Row>



              {/* Pins Row */}
              <Row style={{width:"100%"}}>
                <Col style={{marginLeft:"3%"}}>
                {this.state.shouldRenderPins.map((pin, i) => {
                  return (
                      <ReflectPinCard
                        ccId={pin}
                        text={pin}
                        key={i}
                        time={1}
                        note={"ello"}
                        // handleEdit={this.handleEdit}
                        episode={"5ff051084158640e1d924e76"}
                        user={"5fdaf4e7616a7e5445f0ba59"}
                        favorited={true}
                        // handleSeekTo={this.handleSeekTo}
                        // handlePause={this.handlePause}
                        // handlePlay={this.handlePlay}
                        friends={["5fdaf4e7616a7e5445f0ba59","5fdaf4e7616a7e5445f0ba59"]}
                        // sharePin={this.props.sharePin}
                        // pin={pin}
                      />
                  );
                })}
                </Col>
              </Row>
            </Row>
          </Col>
          <Col xs={1} >
            <Row style={{height:"40%"}} className="reflect-top">

            </Row>
            <Row style={{height:"60%"}}>

            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Reflect;
