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
import transitions from "@material-ui/core/styles/transitions";
const ipcRenderer = window.require("electron").ipcRenderer;

const SelectableComponent = createSelectable(CCC);

class Discussion extends React.Component {
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
    };

    ipcRenderer.on("pinFromWindow", (event, arg) => {
      console.log("recieved");
      this.makePin();
    });
  }

  renderPin = (start_time, end_time, selectedComps, text, date, note) => {
    var newPin = {
      startComp: selectedComps[0],
      startTime: start_time,
      endTime: end_time,
      text: text,
      date: date,
      note: note,
    };
    this.setState({ pin: this.state.pins.push(newPin) });
    let newmap = this.state.highlighted;
    console.log(newmap);
    console.log(typeof newmap);
    newmap.set(this.state.selectedElements[0], this.state.selectedElements);
    this.setState({
      highlighted: newmap,
    });
  };

  makeHighlight = () => {
    const selements = this.state.selectedElements;
    if (!this.state.highlighted.has(selements[0])) {
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

      this.renderPin(startTime, endTime, selements, text, new Date());
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
          id: this.props.user._id,
          ccId: selements,
          episode: this.props.episode._id,
        }),
      })
        .then((json) => {
          console.log("hi");
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    } else {
      console.log("you've already pinned this!");
    }
    this.disableSelection();
  };

  editPin = (note) => {
    let key = this.state.pins.length - 1;
    this.setState((prevState) => ({
      pins: prevState.pins.map((el, i) =>
        i === key ? { ...el, note: note } : el
      ),
    }));
  };

  isHighlighted = (i) => {
    for (let [key, value] of this.state.highlighted) {
      if (value.indexOf(i) > -1) {
        return true;
      }
    }
    return false;
  };

  handleDelete = (pin_id) => {
    const url = "http://localhost:5000/pins/deletePin";
    const pincc = this.state.highlighted.get(pin_id);
    console.log("piniddddddddd----------", pin_id);
    fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.props.user._id,
        ccId: pincc,
        episode: this.props.episode._id,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("hi", json);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });

    var index = -1;
    var array = [...this.state.pins]; // make a separate copy of the array
    for (var i = 0; i < this.state.pins.length; i++) {
      if (this.state.pins[i]["startComp"] === pin_id) {
        // console.log(i)
        index = i;
        break;
      }
    }

    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ pins: array });
    }
    let newhighlight = this.state.highlighted;
    newhighlight.delete(pin_id);
    this.setState({
      highlighted: newhighlight,
    });
  };

  handleSelection = (text) => {
    this.setState({
      selectedElements: text,
    });
  };

  makePin = () => {
    if (!this.state.highlighted.has(this.state.mainComp)) {
      this.setState({ selectedElements: [this.state.mainComp] }, () => {
        this.makeHighlight();
      });
    }
  };

  saveSelection = () => {
    this.setState({
      showComponent: true,
    });
  };

  disableSelection = () => {
    this.setState({
      showComponent: false,
      selectedElements: [],
    });
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
    } else if (
      this.state.cc_comps[this.state.mainComp]["height"] &&
      this.state.cc_comps[this.state.mainComp + 1]["height"]
    ) {
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
      } else {
        this.state.cc_comps[i]["y"] =
          this.state.cc_comps[i - 1]["y"] +
          this.state.cc_comps[i - 1]["height"];
      }
    }
    this.setState({ cc_load: true });
  };

  componentDidMount = (e) => {
    if (localStorage.getItem(this.props.episode._id.concat(".listen"))) {
      window.addEventListener("resize", this.handleResize);

      const stateObj = JSON.parse(
        localStorage.getItem(this.props.episode._id.concat(".listen"))
      );
      const high = JSON.parse(stateObj.highlighted);
      const hset = new Map(high);

      this.setState({
        pins: JSON.parse(stateObj.pins),
        mainComp: JSON.parse(stateObj.mainComp),
        windowWidth: JSON.parse(stateObj.windowWidth),
        windowHeight: JSON.parse(stateObj.windowHeight),
        cc_comps: JSON.parse(stateObj.cc_comps),
        cc_load: JSON.parse(stateObj.cc_load),
        currPos: JSON.parse(stateObj.currPos),
        selectedElements: JSON.parse(stateObj.selectedElements),
        showComponent: JSON.parse(stateObj.showComponent),
        cursorPos: JSON.parse(stateObj.cursorPos),
        currTime: JSON.parse(stateObj.currTime),
        highlighted: hset,
      });
    } else {
      window.addEventListener("resize", this.handleResize);
      // fetch podcast transcript
      const url = "http://localhost:5000/transcript/loadTranscript/".concat(
        this.props.episode.transcript
      );
      fetch(url, {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          console.log("=======GOT TRANSCRIPT JSON=======", json.message);
          this.setState({
            cc_comps: json.message,
          });
          this.initHeightPos();
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
      // fetch previous pins
      fetch("http://localhost:5000/pins/renderPins", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: this.props.user._id,
          episode: this.props.episode._id,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log("YOOOOOOOOOOOOOOO", json.id);
          //set highlights
          let highlightedPins = new Map();
          console.log("=======GOT JSON=======", json.message);
          for (let i = 0; i < json.message.length; i++) {
            // load the cc_id and set this.state.highlighted
            highlightedPins.set(
              json.message[i]["ccId"][0],
              json.message[i]["ccId"]
            );
            this.renderPin(
              json.message[i]["startTime"]["$numberDecimal"],
              json.message[i]["endTime"]["$numberDecimal"],
              json.message[i]["ccId"],
              json.message[i]["text"],
              json.message[i]["pinDate"],
              json.message[i]["note"]
            );
          }
          console.log("=====HUH===== LOOP");
          // highlight components
          this.setState({
            highlighted: highlightedPins,
          });
          console.log(
            "=======HIGHLIGHTS AFTER LOAD=======",
            this.state.highlighted
          );
          console.log("=======PINS AFTER LOAD=======", this.state.pins);
        })
        .catch((err) => {
          console.log("Error: ", err);
        });

      // ipcRenderer.on("pinFromWindow", (event, arg) => {
      //   console.log("recieved")
      //   this.makePin();
      // });
    }
    this.interval = setInterval(() => this.props.setCurrTime(), 1000);
  };

  componentDidUpdate = (e) => {
    if (this.state.cc_comps) {
      if (this.state.mainComp < this.state.cc_comps.length - 1) {
        this.handleScroll();
      }
    }
  };

  componentWillUnmount = (e) => {
    window.addEventListener("resize", this.handleResize);
    clearInterval(this.interval);

    if (this.state.cc_comps.length > 0) {
      let currState = this.state;

      currState.pins = JSON.stringify(currState.pins);
      currState.cc_comps = JSON.stringify(currState.cc_comps);
      currState.selectedElements = JSON.stringify([]);
      currState.highlighted = JSON.stringify(
        Array.from(currState.highlighted.entries())
      );

      localStorage.setItem(
        this.props.episode._id.concat(".listen"),
        JSON.stringify(currState)
      );
    }
    ipcRenderer.removeAllListeners(["pinFromWindow"]);
  };

  render() {
    // console.log("=====EPISODE===== BEING SET", this.props.episode)
    // console.log("=====USER===== BEING SET", this.props.user)
    return (
      <Container fluid className="discussion_background listening-back">
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
                    let pinned = this.state.highlighted.has(i);
                    let highlighted = this.isHighlighted(i);
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
                          handleDelete={this.handleDelete}
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
            className="farRight"
            style={{
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#5C719B",
            }}
          >
            <Comments
              user={this.props.user}
              episode={this.props.episode}
              editPin={this.editPin}
              pins={this.state.pins}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Discussion;
