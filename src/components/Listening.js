import React from "react";
import "../assets/css/App.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/Button";
import AudioBar from "./AudioBar";
import { Link } from "react-router-dom";
import About from "./About";

import "../assets/css/App.css";
import PinButton from "./PinButton";
import Comments from "./Comments";
import AddComment from "./AddComment";
import CCC from "./CCC";

import HighlightMenu from "./HighlightMenu";
import { SelectableGroup, createSelectable } from "react-selectable";
import ReactCursorPosition from "react-cursor-position";
import { animateScroll } from "react-scroll";
import transitions from "@material-ui/core/styles/transitions";
import PlayBar from "./PlayBar";

const ipcRenderer = window.require("electron").ipcRenderer;

const SelectableComponent = createSelectable(CCC);

class Listening extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgURL: this.props.imgURL,
      played: 0,
      playing: false,
      controls: false,
      light: false,
      volume: 0.8,
      muted: false,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      loop: false,
      // reflectPins: this.props.reflectPins,
      // friendPins: [],
      // seeFriends: false,
      // shouldRenderPins: [],
      // searchList: [],

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
      console.log("reciev");
      this.makePin();
      event.sender.send("tester", "hi");
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
    let newmap = this.state.highlighted;
    newmap.set(this.state.selectedElements[0], this.state.selectedElements);
    this.setState({
      highlighted: newmap,
      pin: this.state.pins.unshift(newPin),
    });
  };

  addPinLocalStorage = (pin) => {
    const currHome = JSON.parse(localStorage.getItem("home"));
    let homePins = JSON.parse(currHome.pins);
    homePins[this.props.episodeIndex].message.push(pin);
    currHome.pins = JSON.stringify(homePins);
    localStorage.setItem("home", JSON.stringify(currHome));

    const currReflect = JSON.parse(
      localStorage.getItem(this.props.episode._id.concat(".reflect"))
    );

    if (currReflect) {
      let reflectPins = JSON.parse(currReflect.reflectPins);
      reflectPins.push(pin);
      currReflect.reflectPins = JSON.stringify(reflectPins);
      localStorage.setItem(
        this.props.episode._id.concat(".reflect"),
        JSON.stringify(currReflect)
      );
    }
  };

  deletePinLocalStorage = (pin) => {
    const currHome = JSON.parse(localStorage.getItem("home"));
    let homePins = JSON.parse(currHome.pins);
    let episodePins = homePins[this.props.episodeIndex].message;
    for (let i = 0; i < episodePins.length; i++) {
      if (episodePins[i]._id === pin._id) {
        episodePins.splice(i, 1);
      }
    }
    homePins[this.props.episodeIndex].message = episodePins;
    currHome.pins = JSON.stringify(homePins);
    localStorage.setItem("home", JSON.stringify(currHome));

    const currReflect = JSON.parse(
      localStorage.getItem(this.props.episode._id.concat(".reflect"))
    );

    if (currReflect) {
      let reflectPins = JSON.parse(currReflect.reflectPins);
      for (let i = 0; i < reflectPins.length; i++) {
        if (reflectPins[i]._id === pin._id) {
          reflectPins.splice(i, 1);
        }
      }
      currReflect.reflectPins = JSON.stringify(reflectPins);
      localStorage.setItem(
        this.props.episode._id.concat(".reflect"),
        JSON.stringify(currReflect)
      );
    }
  };

  addNoteLocalStorage = (note, index) => {
    const currHome = JSON.parse(localStorage.getItem("home"));
    let homePins = JSON.parse(currHome.pins);
    homePins[this.props.episodeIndex].message[index].note = note;
    currHome.pins = JSON.stringify(homePins);
    localStorage.setItem("home", JSON.stringify(currHome));

    const currReflect = JSON.parse(
      localStorage.getItem(this.props.episode._id.concat(".reflect"))
    );

    if (currReflect) {
      let reflectPins = JSON.parse(currReflect.reflectPins);
      reflectPins[index].note = note;
      currReflect.reflectPins = JSON.stringify(reflectPins);
      localStorage.setItem(
        this.props.episode._id.concat(".reflect"),
        JSON.stringify(currReflect)
      );
    }
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
        .then((res) => res.json())
        .then((json) => {
          console.log("hi");
          this.addPinLocalStorage(json.message);
          console.log("this is the loaded new pin", json.message);
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    } else {
      console.log("you've already pinned this!");
    }
    this.disableSelection();
  };

  /*
  editPin handles frontend note changes that the user makes.
  Note (string) := the note that the user wants to add
  Index (int) := the index of the note
  */

  editPin = (note, index) => {
    this.addNoteLocalStorage(note, index);
    this.setState((prevState) => ({
      pins: prevState.pins.map((el, i) =>
        i === index ? { ...el, note: note } : el
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
        this.deletePinLocalStorage(json.message);
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
    // console.log("makepin called")
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
    if (
      this.state.cc_comps[this.state.mainComp]["height"] &&
      this.state.cc_comps[this.state.mainComp + 1]["height"]
    ) {
      let curr = this.state.mainComp;
      let shiftHeight = 0;
      let flag = 0;

      let time1 = Date.now();
      while (
        this.state.cc_comps[curr + 1]["height"] &&
        this.props.pinTime + 0.00000001 >=
          this.state.cc_comps[curr + 1]["startTime"]
      ) {
        console.log("Main Comp", this.state.mainComp);
        console.log("curr", curr);
        console.log("total cc comps", this.state.cc_comps.length);
        console.log(
          "curr+1 start time",
          this.state.cc_comps[curr + 1]["startTime"]
        );
        console.log("pinTime", this.props.pinTime);

        flag = 1;
        shiftHeight +=
          this.state.cc_comps[curr]["height"] / 2 +
          this.state.cc_comps[curr + 1]["height"] / 2;
        curr += 1;
      }

      while (
        this.state.cc_comps[curr + 1]["height"] &&
        this.props.pinTime < this.state.cc_comps[curr]["startTime"] &&
        this.props.pinTime >= this.state.cc_comps[0]["startTime"]
      ) {
        flag = 1;
        shiftHeight -=
          this.state.cc_comps[curr]["height"] / 2 +
          this.state.cc_comps[curr + 1]["height"] / 2;
        curr -= 1;
      }

      let time2 = Date.now();

      if (flag) {
        console.log("hello animate scroll");
        animateScroll.scrollTo(this.state.currPos + shiftHeight, {
          containerId: "caption-col",
        });
        this.setState({ currPos: this.state.currPos + shiftHeight });
        // reset the mainComp
        this.setState({
          mainComp: curr,
        });
      }
      let time3 = Date.now();
    }
  };

  initHeightPos = (e) => {
    for (var i = 0; i < this.state.cc_comps.length; i++) {
      var str = "caption".concat(String(i));
      let { clientHeight, clientWidth } = this.refs[str];
      // === feed client height into the cc_comps objects
      this.state.cc_comps[i]["height"] = clientHeight;

      if (i === 0) {
        this.state.cc_comps[i]["y"] = 500 / 2;
      } else {
        this.state.cc_comps[i]["y"] =
          this.state.cc_comps[i - 1]["y"] +
          this.state.cc_comps[i - 1]["height"];
      }
    }
    this.setState({ cc_load: true });
  };

  updateStorage = (e) => {
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
  };

  componentDidMount = (e) => {
    ipcRenderer.on("pinFromWindow", (event, arg) => {
      console.log("reciev");
      this.makePin();
      // event.sender.send('tester', "hi")
      ipcRenderer.send("timeReply", [this.props.pinTime]);
    });
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
      console.log("wassuh bit");
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
      console.log("THISHOIFWOFIJWOFIEJ", this.props.user._id);

      let highlightedPins = new Map();

      for (let i = 0; i < this.props.discussPins.length; i++) {
        highlightedPins.set(
          this.props.discussPins[i]["ccId"][0],
          this.props.discussPins[i]["ccId"]
        );
        this.renderPin(
          this.props.discussPins[i]["startTime"]["$numberDecimal"],
          this.props.discussPins[i]["endTime"]["$numberDecimal"],
          this.props.discussPins[i]["ccId"],
          this.props.discussPins[i]["text"],
          this.props.discussPins[i]["pinDate"],
          this.props.discussPins[i]["note"]
        );
        this.setState({
          highlighted: highlightedPins,
        });
      }
    }
    this.interval = setInterval(() => this.props.setCurrTime(), 1000);
  };

  componentDidUpdate = (e) => {
    if (this.state.cc_comps) {
      if (this.state.mainComp < this.state.cc_comps.length - 1) {
        this.handleScroll();
        console.log(this.state.cc_comps[this.state.mainComp]["startTime"]);
      }
    }
    console.log(this.state.cc_load);
  };

  componentWillUnmount = (e) => {
    window.addEventListener("resize", this.handleResize);
    clearInterval(this.interval);
    this.updateStorage();
  };

  handleSeekMouseDown = (e) => {
    this.setState({ seeking: true });
  };

  handleSeekChange = (e) => {
    this.setState({ played: parseFloat(e.target.value) });
  };

  handleSeekMouseUp = (e) => {
    this.setState({ seeking: false });
    // this.player.seekTo(parseFloat(e.target.value));
  };


  // ########################################################################################################
  // playtime strs funcs
  // ########################################################################################################

  duraTime = () => {
    let secs = Math.floor(this.props.episode.duration);
    let mins = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    secs = secs % 60;
    let str = mins.toString().concat(":").concat(secs.toString());

    if (mins == "NaN") {
      str = "00:00";
    }
    return str;
  };

  currTime = () => {
    let secs = Math.floor(this.props.episode.duration * this.props.played);
    let mins = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    secs = (secs % 60).toString().padStart(2, "0");
    let str = mins.concat(":").concat(secs);
    if (mins == "NaN") {
      // console.log(" we in here baby");
      str = "00:00";
    }
    // console.log("yoooooooooooooooo", mins);
    return str;
  };


  // ########################################################################################################
  // playtime strs end
  // ########################################################################################################

  render() {
    console.log("rendered");
    return (
      <div className="page">
        <Container
          className="mr-0 ml-0 listening-main"
          fluid
          style={{
            height: "100vh",
            width: "100%",
          }}
        >
          <div
            class="listening-middle"
            style={{
              marginLeft: "10%",
              // marginRight: "14.286%",
              height: "100%",
            }}
          >
            <Row style={{}}>
              <Link to="/">
                <IconButton
                  //   onClick={() => this.props.handleSlide()}
                  style={{
                    outline: "none",
                    backgroundColor: "transparent",
                  }}
                  disableTouchRipple={true}
                  className="pr-0 mt-4"
                >
                  <img
                    style={{
                      height: 30,
                      width: 30,
                    }}
                    src="/downarrow-white.png"
                  />
                </IconButton>
              </Link>
            </Row>
            <div
              className="pt-2 pb-2 mt-3"
              style={{
                marginLeft: "5%",
                marginRight: "16.67%",
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
              }}
            >
              <img
                style={{
                  height: 65,
                  width: 65,
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
                src={this.state.imgURL}
              />
              <div
                className="playbar-text ml-3"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <p
                  style={{
                    fontFamily: "Avenir Light",
                    fontSize: "14px",
                    color: "white",
                  }}
                  className="mb-0"
                >
                  Millennial Investing
                </p>
                <p
                  style={{
                    fontFamily: "Avenir Heavy",
                    fontSize: "20px",
                    color: "white",
                  }}
                  className="mb-0"
                >
                  Episode 3: Why Millennial’s Should Invest Today
                </p>
              </div>
            </div>

            <Row style={{ width: "100%" }}>
              <Col
                style={{
                  flex: "1.3",
                  marginTop: "50px",
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: "70vh",
                }}
              >
                {/* <p
                  style={{
                    fontFamily: "Avenir Light",
                    fontSize: "18px",
                    color: "#FFFFFF",
                    marginLeft: "7%",
                  }}
                  className="mb-1"
                >
                  The Investor's Podcast
                </p>
                <p
                  style={{
                    fontFamily: "Avenir Heavy",
                    fontSize: "24px",
                    color: "white",
                    marginLeft: "7%",
                  }}
                >
                  Millenial Investing
                </p> */}

                <div
                  id="caption-col"
                  className="listening-captions"
                  style={{ height: "100%" }}
                >
                  <ReactCursorPosition
                    style={{ display: "flex", flexDirection: "row" }}
                  >
                    <SelectableGroup
                      className="selectGroup"
                      onSelection={this.handleSelection}
                      onEndSelection={this.makeHighlight}
                    >
                      {this.state.cc_comps.map((comp, i) => {
                        let selected =
                          this.state.selectedElements.indexOf(i) > -1;
                        let pinned = this.state.highlighted.has(i);
                        let highlighted = this.isHighlighted(i);
                        return (
                          <div
                            className={
                              this.state.mainComp === i
                                ? "cctext-mainComp"
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

                    {/* {this.state.showComponent ? (
                      <HighlightMenu
                        currPos={this.state.currPos}
                        makeHighlight={this.makeHighlight}
                        disableHighlight={this.disableSelection}
                        style={{ height: "20px", width: "30px" }}
                      />
                    ) : null} */}
                  </ReactCursorPosition>
                </div>
              </Col>
              <Col
                className="pl-0 pr-0"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: "0.3",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p>yo</p>
              </Col>
              <div
                style={{
                  flex: "1",
                  marginRight: "10%",
                  flexDirection: "column",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    height: "240px",
                  }}
                >
                  <Comments
                    user={this.props.user}
                    episode={this.props.episode}
                    editPin={this.editPin}
                    pins={this.state.pins}
                    handleDelete={this.handleDelete}
                  />
                </div>

                <Row
                  className="ml-3 mr-3"
                  style={{
                    alignSelf: "center",
                    marginTop: "140px",
                    width: "45%",
                    justifyContent: "space-between",
                  }}
                >
                  <IconButton
                    onClick={(event) => this.props.fastRewind(event)}
                    disableTouchRipple={true}
                    style={{
                      minWidth: "0px",
                      outline: "none",
                      backgroundColor: "transparent",
                    }}
                    className="pl-0"
                  >
                    <img
                      style={{
                        height: 50,
                        width: 27,
                      }}
                      src="/back-lightgray.png"
                    />
                  </IconButton>
                  <IconButton
                    onClick={(event) => this.props.handlePlayorpause(event)}
                    disableTouchRipple={true}
                    style={{
                      outline: "none",
                      backgroundColor: "transparent",
                      minWidth: "35px",
                    }}
                    className="pr-0 pl-0"
                  >
                    <img
                      style={{
                        height: 50,
                        width: 38,
                        opacity: 1,
                      }}
                      src={
                        this.props.playpause
                          ? "/pause-lightgray.png"
                          : "/play-lightgray.png"
                      }
                    />
                  </IconButton>
                  <IconButton
                    onClick={(event) => this.props.fastForward(event)}
                    style={{
                      minWidth: "0px",
                      outline: "none",
                      backgroundColor: "transparent",
                    }}
                    disableTouchRipple={true}
                    className="pr-0"
                  >
                    <img
                      style={{
                        height: 50,
                        width: 27,
                      }}
                      src="/next-lightgray.png"
                    />
                  </IconButton>
                </Row>
                <Row
                  className="playbar-audio ml-3 mr-3"
                  style={{
                    width: "100%",
                    alignItems: "center",
                    marginTop: "10%",
                  }}
                >
                  <p
                    className="mb-0"
                    style={{
                      fontFamily: "Avenir Book",
                      fontSize: "14px",
                      color: "#D8DEE3",
                    }}
                  >
                    {this.currTime()}
                  </p>
                  <input
                    class="slider-listening ml-3 mr-3"
                    type="range"
                    min={0}
                    max={0.999999}
                    step="any"
                    value={this.props.played}
                    onMouseDown={this.props.handleSeekMouseDown}
                    onChange={this.props.handleSeekChange}
                    onMouseUp={this.props.handleSeekMouseUp}
                  />
                  <p
                    className="mb-0"
                    style={{
                      fontFamily: "Avenir Book",
                      fontSize: "14px",
                      color: "#D8DEE3",
                    }}
                  >
                    {this.duraTime()}
                  </p>
                </Row>
              </div>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

export default Listening;
