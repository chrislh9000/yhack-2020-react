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
import PinCard from "./PinCard";
import Form from "react-bootstrap/Form";
import HighlightMenu from "./HighlightMenu";
import { SelectableGroup, createSelectable } from "react-selectable";
import ReflectPinCard from "./ReflectPinCard";
import ReactCursorPosition from "react-cursor-position";
import { animateScroll } from "react-scroll";
import transitions from "@material-ui/core/styles/transitions";
import { IconButton } from "@material-ui/core";
import UserView from "./UserView";
import Dropdown from "react-bootstrap/Dropdown";

class Reflect extends React.Component {
  constructor(props) {
    super(props);
    if (
      localStorage.getItem(this.props.reflectEpisode._id.concat(".reflect"))
    ) {
      const stateObj = JSON.parse(
        localStorage.getItem(this.props.reflectEpisode._id.concat(".reflect"))
      );

      this.state = {
        played: JSON.parse(stateObj.played),
        playing: JSON.parse(stateObj.playing),
        controls: JSON.parse(stateObj.controls),
        light: JSON.parse(stateObj.light),
        volume: JSON.parse(stateObj.volume),
        muted: JSON.parse(stateObj.muted),
        loaded: JSON.parse(stateObj.loaded),
        duration: JSON.parse(stateObj.duration),
        playbackRate: JSON.parse(stateObj.playbackRate),
        loop: JSON.parse(stateObj.loop),
        reflectPins: JSON.parse(stateObj.reflectPins),
        friendPins: [],
        shouldRenderPins: [],
        searchList: [],
        seeFriends: false,
        friends: []
      };
    } else {
      this.state = {
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
        reflectPins: this.props.reflectPins,
        friendPins: [],
        seeFriends: false,
        shouldRenderPins: [],
        searchList: [],
        friends: []
      };
    }
  }
  appendTogether = () => {
    let tempList = [];
    for (var i = 0; i < this.state.friendPins.length; i++) {
      let tempString = "";
      tempString =
        tempString.concat(this.state.friendPins[i].text.toLowerCase()) + " ";
      tempString =
        tempString.concat(
          this.state.friendPins[i].user.username.toLowerCase()
        ) + " ";
      tempString =
        tempString.concat(this.state.friendPins[i].note.toLowerCase()) + " ";
      tempList.push(tempString);
    }

    for (var j = 0; j < this.state.reflectPins.length; j++) {
      let tempString = "";
      tempString =
        tempString.concat(this.state.reflectPins[j].text.toLowerCase()) + " ";
      tempString =
        tempString.concat(this.props.user.username.toLowerCase()) + " ";
      tempString =
        tempString.concat(this.state.reflectPins[j].note.toLowerCase()) + " ";
      tempList.push(tempString);
    }
    this.setState({ searchList: tempList });
  };

  handleSeeFriends = () => {
    if (this.state.seeFriends) {
      this.setState({
        seeFriends: !this.state.seeFriends,
        shouldRenderPins: this.state.reflectPins
      });
    } else {
      this.setState({
        seeFriends: !this.state.seeFriends,
        shouldRenderPins: this.state.friendPins
      });
    }
  };

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing });
  };

  handleVolumeChange = e => {
    this.setState({ volume: parseFloat(e.target.value) });
  };

  handlePlay = () => {
    console.log("onPlay");
    this.setState({ playing: true });
  };

  handlePause = () => {
    console.log("onPause");
    this.setState({ playing: false });
  };

  handleSearch = () => {
    // if query matches pin.text, pin.user, or pin, or pin.note then add pins to renderedPins state
    // TO DO: think of pin.time, date of creation search functionality implementation
  };

  handleSeekMouseDown = e => {
    this.setState({ seeking: true });
  };

  handleSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) });
  };

  handleSeekMouseUp = e => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  };

  handleDuration = duration => {
    console.log("onDuration", duration);
    this.setState({ duration });
  };

  handleSeekTo = time => {
    console.log("gonan seek to", time);
    this.player.seekTo(time);
    this.setState({
      played: (time / this.props.reflectEpisode.duration) * 0.999999
    });
    // this.setState({played:time})
  };

  handleFriendPin = () => {
    const url = "http://localhost:5000/pins/friendPin";
    fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        friends: this.props.user.friends,
        episode: this.props.reflectEpisode._id
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log("hi");
        this.setState(
          {
            friendPins: json.message
          },
          () => {
            this.appendTogether();
            this.initializeShouldRenderPins();
          }
        );
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  };

  handleEdit = () => {
    const url = "http://localhost:5000/pins/editPin";
    fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        startTime: 1,
        endTime: 5,
        newCcId: 1,
        text: "oh elo",
        ccId: 5,
        episode: "PlanetMoney0",
        id: "5fdaf4e7616a7e5445f0ba59"
      })
    })
      .then(json => {
        console.log("hi");
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  };

  filterFunction = userInput => {
    let filteredNames = this.state.searchList.map(x => {
      return x.includes(userInput);
    });

    let tempList = [];

    let flen = this.state.friendPins.length;
    let len = this.state.reflectPins.length;

    // setState to include pins that match that array
    if (this.state.seeFriends) {
      // if seeFriends is toggled, only
      for (var i = 0; i < flen; i++) {
        if (filteredNames[i]) {
          tempList.push(this.state.friendPins[i]);
        }
      }
    } else {
      // for when youre looking at your own list
      for (var i = flen; i < filteredNames.length; i++) {
        if (filteredNames[i]) {
          tempList.push(this.state.reflectPins[i - flen]);
        }
      }
    }
    this.setState({ shouldRenderPins: tempList });
  };

  ref = player => {
    this.player = player;
  };

  initializeShouldRenderPins = () => {
    if (this.state.seeFriends) {
      this.setState({ shouldRenderPins: this.state.friendPins });
    } else {
      this.setState({ shouldRenderPins: this.state.reflectPins });
    }
  };

  componentDidMount = e => {
    // add the user id to the end of the request url
    this.handleFriendPin();
    const url = "http://localhost:5000/social/users/getFriends";
    fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: this.props.user._id
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log("======JSON FRIENDS=======", json.message.friends);
        this.setState({
          friends: json.message.friends
        });
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  };

  componentWillUnmount = e => {
    let currState = this.state;
    currState.reflectPins = JSON.stringify(currState.reflectPins);
    localStorage.setItem(
      this.props.reflectEpisode._id.concat(".reflect"),
      JSON.stringify(currState)
    );
  };

  // componentWillUnmount = (e) => {
  //   this.updateStorage();
  // };

  render() {
    console.log("SHOULD RENDER PINS=====", this.state.reflectPins)
    // console.log("Progress=====", this.props.progress);
    // console.log("Episode duration=====", this.props.reflectEpisode.duration);
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
                    alignItems: "center",
                    paddingTop: "15%"
                  }}
                >
                  <Col xs={3} style={{ marginLeft: "0%" }}>
                    <IconButton
                      onClick={() => {
                        this.setState({ playing: !this.state.playing });
                      }}
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
                      {this.state.playing ? (
                        <img
                          style={{
                            paddingLeft: "7.5%",
                            paddingTop: "3%",
                            height: 28,
                            width: 28,
                            marginRight: "8%"
                          }}
                          src="BluePause.png"
                        />
                      ) : (
                        <img
                          style={{
                            paddingLeft: "7.5%",
                            paddingTop: "3%",
                            height: 28,
                            width: 28
                          }}
                          src="BluePlay.png"
                        />
                      )}
                    </IconButton>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      paddingLeft: "2%"
                    }}
                    xs={9}
                  >
                    <Row>
                      <p1 style={{ textAlign: "center", color: "white" }}>
                        {this.props.podcast.title}
                      </p1>
                    </Row>
                    <Row>
                      <p1
                        style={{
                          textAlign: "right",
                          color: "white",
                          fontSize: "20px",
                          fontWeight: "bold"
                        }}
                      >
                        {this.props.reflectEpisode.title}
                      </p1>
                    </Row>
                  </Col>
                </Row>
                <Row
                  style={{
                    height: "25%",
                    marginLeft: "5%",
                    marginTop: "3%"
                  }}
                >
                  <p style={{ color: "white", marginRight: "5%" }}>15:35</p>
                  <div
                    className="hl_reflect pb-4"
                    style={{ alignSelf: "right" }}
                    ref="bar"
                  >
                    <div
                      style={{
                        left: String(
                          (this.props.progress /
                            this.props.reflectEpisode.duration) *
                            100
                        ).concat("%")
                      }}
                      className="bubble_reflect"
                    />
                    {/* <div className="pinbar"></div> */}
                    {this.state.reflectPins.map((pin, id) => (
                      <div
                        style={{
                          left: String(
                            (pin.startTime.$numberDecimal / this.props.reflectEpisode.duration) * 100
                          ).concat("%")
                        }}
                        className="pincircle"
                      ></div>
                    ))}
                  </div>
                  <p style={{ color: "white", marginLeft: "5%" }}>20:35</p>
                </Row>
              </Col>

              {/* picture and user col */}
              <Col style={{ display: "flex", flexDirection: "column" }}>
                <Row
                  style={{ paddingTop: "10px", flexDirection: "row-reverse", height: "25%"}}
                >
                  <UserView
                    className="ml-4"
                    style={{ alignSelf: "right" }}
                    user={{ username: this.props.user.username }}
                  />
                </Row>
                <Row style={{ flexDirection: "row-reverse"}}>
                  <img
                    className="ml-3 mt-3 mb-3"
                    style={{
                      height: 180,
                      width: 180,
                      borderRadius: 10,
                      boxShadow:
                        "0 4px 8pdx 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                    }}
                    src={this.props.podcast.imageUrl}
                  />
                </Row>
              </Col>
            </Row>

            {/* Bottom Row of Entire page */}
            <Row
              style={{
                display: "flex",
                flexDirection: "column",
                height: "60vh"
              }}
            >
              {/* Title Row */}
              <Row
                style={{
                  height: "10%",
                  width: "100%",
                  display: "flex",
                  marginBottom: "2%"
                }}
              >
                {/* Pins Title */}
                <Col
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                  xs={8}
                >
                  <h1
                    style={{
                      fontSize: "30px",
                      paddingLeft: "10%",
                      color: "#173B5C"
                    }}
                  >
                    Pins
                  </h1>
                </Col>
                {/* Filter Bar */}
                <Col xs={4} style={{ paddingTop: "1%" }}>
                  <Row>Filter by:</Row>
                  <Row>
                    <Form>
                      <Form.Group controlId="formBasicCheckbox">
                        <Form.Check inline type="checkbox" label="Me" checked />
                        <Form.Check
                          onChange={() => {
                            this.handleSeeFriends();
                          }}
                          inline
                          type="checkbox"
                          label="Friends"
                        />
                        <Form.Check inline type="checkbox" label="World" />
                      </Form.Group>
                    </Form>
                  </Row>
                </Col>
              </Row>

              {/* Pins Row */}
              <Row
                style={{
                  overflowX: "hidden",
                  overflowY: "scroll",
                  height: "75%",
                  width: "100%"
                }}
              >
                <Col style={{ marginLeft: "3%" }}>
                  {/* {this.state.shouldRenderPins.map((pin, i) => {
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
                        friends={[
                          "5fdaf4e7616a7e5445f0ba59",
                          "5fdaf4e7616a7e5445f0ba59"
                        ]}
                        // sharePin={this.props.sharePin}
                        // pin={pin}
                      />
                    );
                  })} */}
                  {this.state.seeFriends
                    ? this.state.shouldRenderPins.map((pin, i) => {
                        return (
                          <div
                            className="mb-5"
                            style={{
                              background: "grey",
                              borderRadius: "25px"
                            }}
                          >
                            <ReflectPinCard
                              ccId={pin.ccId}
                              text={pin.text}
                              key={i}
                              time={pin.startTime.$numberDecimal}
                              note={pin.note}
                              handleEdit={this.handleEdit}
                              episode={pin.episode}
                              user={pin.user}
                              favorited={pin.favorited}
                              handleSeekTo={this.handleSeekTo}
                              handlePause={this.handlePause}
                              handlePlay={this.handlePlay}
                              friends={this.state.friends}
                              sharePin={this.props.sharePin}
                              pin={pin}
                            />
                          </div>
                        );
                      })
                    : this.state.shouldRenderPins.map((pin, i) => {
                        return (
                          <div
                            className="mb-5"
                            style={{
                              background: "grey",
                              borderRadius: "25px"
                            }}
                          >
                            <ReflectPinCard
                              ccId={pin.ccId}
                              text={pin.text}
                              key={i}
                              time={pin.startTime.$numberDecimal}
                              note={pin.note}
                              handleEdit={this.handleEdit}
                              episode={pin.episode}
                              user={this.props.user}
                              favorited={pin.favorited}
                              handleSeekTo={this.handleSeekTo}
                              handlePause={this.handlePause}
                              handlePlay={this.handlePlay}
                              friends={this.state.friends}
                              sharePin={this.props.sharePin}
                              pin={pin}
                            />
                          </div>
                        );
                      })}
                </Col>
              </Row>
            </Row>
          </Col>
          <Col xs={1}>
            <Row style={{ height: "40%" }} className="reflect-top"></Row>
            <Row style={{ height: "60%" }}></Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Reflect;
