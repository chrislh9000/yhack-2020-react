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

import HighlightMenu from "./HighlightMenu";
import { SelectableGroup, createSelectable } from "react-selectable";

import ReactCursorPosition from "react-cursor-position";
import { animateScroll } from "react-scroll";

const SelectableComponent = createSelectable(CCC);

class Discussion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pins: [],
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
      pinned: [],
      highlighted: new Set(),
    };
  }

  renderPin = (start_time, end_time, selectedComps, text) => {
    console.log("==========making a goddamn pin mother fuckers=========");
    var newPin = {
      startComp: selectedComps[0],
      startTime: start_time,
      endTime: end_time,
      text: text,
    };
    console.log("a fooooking pin mate", newPin);
    this.setState({ pin: this.state.pins.push(newPin) });
    console.log("pin list mate", this.state.pins);
    this.setState({ pinned: this.state.pinned.concat(selectedComps[0]) });
  };

  makeHighlight = () => {
    const selements = this.state.selectedElements;
    var text = "";
    for (var i = 0; i < selements.length; i++) {
      text = text.concat(this.state.cc_comps[selements[i]]["text"]);
    }
    if (this.state.cc_comps.length > 0 && selements.length > 0) {
      var startTime = this.state.cc_comps[selements[0]]["startTime"];
      var endTime = this.state.cc_comps[selements[selements.length - 1]][
        "endTime"
      ];
    }

    this.renderPin(startTime, endTime, selements, text);
    const url = "http://localhost:5000/pins/createPin";
    fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text,
        startTime: startTime,
        endTime: endTime,
        id: "5fdaf4e7616a7e5445f0ba59",
      }),
    })
      .then((json) => {
        console.log("hi");
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
    this.markPins();
    this.disableSelection();
  };

  markPins = () => {
    this.setState(({ highlighted }) => ({
      highlighted: new Set([...highlighted, ...this.state.selectedElements]),
    }));
  };

  handleSelection = (text) => {
    this.setState({
      selectedElements: text,
    });
  };

  makePin = () => {
    this.setState({ selectedElements: [this.state.mainComp] }, () => {
      this.makeHighlight();
    });
  };

  clearSelections = () => {
    this.setState({
      selectedElements: [],
    });
  };

  saveSelection = () => {
    this.setState({
      showComponent: true,
    });
  };

  disableSelection = () => {
    this.setState({
      showComponent: false,
    });
    this.clearSelections();
  };

  handleResize = (e) => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  };

  handleMainComp = (comp_id) => {
    let timeStamp = this.state.cc_comps[comp_id]["startTime"];
    this.props.handlePin(timeStamp);
    this.setState({
      currTime: this.state.cc_comps[comp_id]["startTime"],
    });
    // this.setState({
    //   mainComp: comp_id
    // })
    // this.handleScroll()
  };

  handleScroll = (e) => {
    if (this.state.mainComp >= this.state.cc_comps.length - 1) {
      if (
        this.props.pinTime <
          this.state.cc_comps[this.state.mainComp]["startTime"] &&
        this.props.pinTime >= this.state.cc_comps[0]["startTime"]
      ) {
        // shift the heights
        let shiftHeight =
          this.state.cc_comps[this.state.mainComp]["height"] / 2 +
          this.state.cc_comps[this.state.mainComp + 1]["height"] / 2; //height that everything needs to be shifted height
        animateScroll.scrollTo(this.state.currPos - shiftHeight, {
          containerId: "midcol",
        });
        this.setState({ currPos: this.state.currPos - shiftHeight });
        // reset the mainComp
        this.setState({
          mainComp: this.state.mainComp - 1,
        });
      } else {
        this.setState({
          mainComp: this.state.mainComp,
        });
      }
    } else {
      // check audio startTime against the interval of podcasts
      // if audiostamp >= cc_comp startTime i+1

      if (
        this.props.pinTime >=
        this.state.cc_comps[this.state.mainComp + 1]["startTime"]
      ) {
        // shift the heights
        let shiftHeight =
          this.state.cc_comps[this.state.mainComp]["height"] / 2 +
          this.state.cc_comps[this.state.mainComp + 1]["height"] / 2; //height that everything needs to be shifted height
        animateScroll.scrollTo(this.state.currPos + shiftHeight, {
          containerId: "midcol",
        });
        this.setState({ currPos: this.state.currPos + shiftHeight });
        // reset the mainComp
        this.setState({
          mainComp: this.state.mainComp + 1,
        });
      } else if (
        this.props.pinTime <
          this.state.cc_comps[this.state.mainComp]["startTime"] &&
        this.props.pinTime >= this.state.cc_comps[0]["startTime"]
      ) {
        // shift the heights
        let shiftHeight =
          this.state.cc_comps[this.state.mainComp]["height"] / 2 +
          this.state.cc_comps[this.state.mainComp + 1]["height"] / 2; //height that everything needs to be shifted height
        animateScroll.scrollTo(this.state.currPos - shiftHeight, {
          containerId: "midcol",
        });
        this.setState({ currPos: this.state.currPos - shiftHeight });
        // reset the mainComp
        this.setState({
          mainComp: this.state.mainComp - 1,
        });
        // reposition the mainComp cc_component to the middle
      }
      // change height for other comps accordingly
    }
  };

  initHeightPos = (e) => {
    for (var i = 0; i < this.state.cc_comps.length; i++) {
      var str = "caption".concat(String(i));
      let { clientHeight, clientWidth } = this.refs[str];
      // === feed client height into the cc_comps objects
      this.state.cc_comps[i]["height"] = clientHeight;

      if (i === 0) {
        this.state.cc_comps[i]["y"] = this.state.windowHeight / 2;
        // console.log("======Y POS=======", this.state.cc_comps[i]['y']);
      } else {
        this.state.cc_comps[i]["y"] =
          this.state.cc_comps[i - 1]["y"] +
          this.state.cc_comps[i - 1]["height"];
        // console.log("======Y POS=======", this.state.cc_comps[i]['y']);
      }
    }
    this.setState({ cc_load: true });
  };

  componentDidMount = (e) => {
    this.initHeightPos();
    window.addEventListener("resize", this.handleResize);
    const url =
      "http://localhost:5000/transcript/loadTranscript/planet_money_01";
    fetch(url, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          cc_comps: json.message,
        });
        this.initHeightPos();
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
    this.interval = setInterval(() => this.props.setCurrTime(), 500);
  };

  componentDidUpdate = (e) => {
    console.log("=========pins==========", this.state.highlighted);
    if (this.state.cc_comps) {
      if (this.state.mainComp < this.state.cc_comps.length - 1) {
        this.handleScroll();
      }
    }
  };

  componentWillUnmount = (e) => {
    window.addEventListener("resize", this.handleResize);
    clearInterval(this.interval);
  };

  render() {
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
          <Col xs={7} className="pr-0 pl-0">
            <ReactCursorPosition
              style={{ display: "flex", flexDirection: "row" }}
            >
              <Col
                id="midcol"
                className="middle pr-1 pl-2"
                xs={7}
                style={{ display: "flex", flexDirection: "column" }}
              >
                {/* <Col> */}
                <SelectableGroup
                  className="selectGroup"
                  onSelection={this.handleSelection}
                  onEndSelection={this.saveSelection}
                >
                  {this.state.cc_comps.map((comp, i) => {
                    let selected = this.state.selectedElements.indexOf(i) > -1;
                    let pinned = this.state.pinned.indexOf(i) > -1;
                    let highlighted = this.state.highlighted.has(i);
                    return (
                      <div
                        className={
                          this.state.mainComp === i
                            ? "cctext-highlighted"
                            : "cctext"
                        }
                        style={{
                          width: "100%",
                          position: "absolute",
                          top: comp["y"],
                        }}
                        ref={"caption".concat(String(comp.id))}
                        key={comp.id}
                      >
                        <SelectableComponent
                          handleMainComp={this.handleMainComp}
                          ccID={comp.id}
                          key={i}
                          selected={selected}
                          selectableKey={comp.id}
                          ccText={comp.text}
                          seekToTime={this.props.seekToTime}
                          time={comp.startTime}
                          pins={pinned}
                          highlighted={highlighted}
                        />
                      </div>
                    );
                  })}
                </SelectableGroup>
                {/* </Col> */}
              </Col>

              <Col
                xs={5}
                style={{
                  paddingLeft: "0px",
                  paddingRight: "0px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Container
                  style={{ display: "flex", flexDirection: "column" }}
                ></Container>
                <PinButton makePin={this.makePin} />
              </Col>
              {this.state.showComponent ? (
                <HighlightMenu
                  makeHighlight={this.makeHighlight}
                  disableHighlight={this.disableSelection}
                  style={{ height: "100%", width: "100%" }}
                />
              ) : null}
            </ReactCursorPosition>
          </Col>

          <Col
            id="far_right"
            xs={3}
            style={{
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#5C719B",
            }}
          >
            <Comments />
            <AddComment />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Discussion;
