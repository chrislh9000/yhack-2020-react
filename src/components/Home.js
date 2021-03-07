import "../assets/css/App.css";

import React from "react";
import Sidebar from "./Sidebar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PropTypes from "prop-types";
import Selection from "react-ds";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import FilterBar from "./FilterBar";
import Button from "react-bootstrap/Button";
import { Link, NavLink } from "react-router-dom";
import { SlideDown } from "react-slidedown";
import IconButton from "@material-ui/core/Button";

import Truncate from "react-truncate";
import PlayBar from "./PlayBar";
import Listening from "./Listening";
import SearchPage from "./SearchPage";
import UserView from "./UserView";
import { LinkContainer } from "react-router-bootstrap";

export default class Example extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      episodes: [],
      podcasts: [],
      progresses: [],
      pins: [],
      searchList: [],
      shouldRenderEpisodes: [],
      shouldRenderPodcasts: []
    };
  }

  addPin = (pin) => {
    let newpins = this.state.pins;
    newpins.push({ message: pin });
    this.setState({
      pins: newpins,
    });
  };

  // ###################################################################################################
  // Start of Searching helpers
  // ###################################################################################################

  appendTogether = () => {
    console.log(this.state.episodes)
    let tempList = [];

    for (var i = 0; i < this.state.episodes.length; i++) {
      let tempString = "";
      tempString =
        tempString.concat(this.state.episodes[i].title.toLowerCase()) + " ";
      tempString =
        tempString.concat(this.state.podcasts[i].title.toLowerCase()) + " ";
      tempString =
        tempString.concat(this.state.podcasts[i].author.toLowerCase()) + " ";
      tempList.push(tempString);
    }
    console.log(tempList);
    this.setState({ searchList: tempList });
  };

  filterFunction = userInput => {
    let filteredNames = this.state.searchList.map(x => {
      return x.includes(userInput);
    });
    console.log(this.state.searchList);
    let tempList = [];
    let tempPod = [];

    for (var i = 0; i < filteredNames.length; i++) {
      if (filteredNames[i]) {
        tempList.push(this.state.episodes[i]);
        tempPod.push(this.state.podcasts[i]);
      }
    }

    this.setState({
      shouldRenderEpisodes: tempList,
      shouldRenderPodcasts: tempPod
    });
  };

  initializeShouldRenderPins = () => {
    this.setState({
      shouldRenderEpisodes: this.state.episodes,
      shouldRenderPodcasts: this.state.podcasts
    });
  };
  // ###################################################################################################
  // End of Searching helpers
  // ###################################################################################################

  componentDidMount = e => {
    // add the user id to the end of the request url

    if (localStorage.getItem("home")) {
      const stateObj = JSON.parse(localStorage.getItem("home"));
      this.setState({
        episodes: JSON.parse(stateObj.episodes),
        podcasts: JSON.parse(stateObj.podcasts),
        progresses: JSON.parse(stateObj.progresses),
        pins: JSON.parse(stateObj.pins),
        searchList: JSON.parse(stateObj.searchList),
        shouldRenderEpisodes: JSON.parse(stateObj.shouldRenderEpisodes),
        shouldRenderPodcasts: JSON.parse(stateObj.shouldRenderPodcasts)
      });
    } else {
      const url = "http://localhost:5000/podcasts/loadUserEpisodes/".concat(
        this.props.user._id
      );
      const url2 = "http://localhost:5000/pins/renderPins";

      fetch(url, {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(res => res.json())
        .then(json => {
          // console.log(json.episodes);
          // console.log(json.podcasts);
          if (json.episodes) {
            this.setState(
              {
                episodes: json.episodes,
                podcasts: json.podcasts,
                progresses: json.progresses
              },
              () => {
                this.appendTogether();
                this.initializeShouldRenderPins();
              }
            );
          }
          let promises = [];
          for (let i = 0; i < json.episodes.length; i++) {
            // console.log(this.props.user._id);
            // console.log(json.episodes[i]._id);
            promises.push(
              fetch(url2, {
                method: "POST",
                credentials: "same-origin",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  user_id: this.props.user._id, // userId
                  episode: json.episodes[i]._id,
                }),
              })
            );
          }
          // console.log(promises);
          Promise.all(promises).then(values => {
            let pinsarray = [];
            for (let i = 0; i < json.episodes.length; i++) {
              pinsarray.push(values[i].json());
            }
            Promise.all(pinsarray).then(pinobjects => {
              // console.log("============pinobjects========", pinobjects);
              this.setState({
                pins: pinobjects,
              });
            });
          });
        })
        .catch((err) => {
          console.log("Error: ", err);
        });
    }
    this.interval = setInterval(() => this.props.setCurrTime(), 1000);
  };

  componentDidUpdate = e => {
    // console.log(this.props.episodeIndex);
    // console.log(this.state.pins);
    // console.log("=======proggresses========", this.state.progresses);
  };

  componentWillUnmount = (e) => {
    if (this.state.episodes.length > 0) {
      let currState = this.state;
      currState.episodes = JSON.stringify(currState.episodes);
      currState.podcasts = JSON.stringify(currState.podcasts);
      currState.progresses = JSON.stringify(currState.progresses);
      currState.pins = JSON.stringify(currState.pins);
      currState.searchList = JSON.stringify(currState.searchList);
      currState.shouldRenderEpisodes = JSON.stringify(currState.shouldRenderEpisodes);
      currState.shouldRenderPodcasts = JSON.stringify(currState.shouldRenderPodcasts);
      localStorage.setItem("home", JSON.stringify(currState));
    }
  };

  render() {
    return (
      <Container fluid className="discussion_background pl-0 pr-0">
        <Row style={{ height: "92vh" }}>
          <Col xs={2} style={{ padding: "0px", height: "100%" }}>
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
            <Row
              style={{
                height: "18%",
                display: "flex",
              }}
              className="mt-2"
            >
              <Col>
                <Row
                  style={{ marginLeft: "3%", marginTop: "2%", height: "30%" }}
                >
                  <div style={{ width: "90%" }}>
                    {/* <input
                      type="text"
                      className="input"
                      onChange={this.handleChange}
                      placeholder="Search..."
                    /> */}
                    <SearchPage filterFunction={this.filterFunction} />
                  </div>
                </Row>
                <Row
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "3%",
                    marginTop: "1%",
                    height: "70%",
                  }}
                >
                  <p1
                    style={{
                      color: "#173B5C",
                      fontSize: "24px",
                      paddingTop: "4%",
                      fontFamily: "Avenir Medium",
                    }}
                  >
                    DOWNLOADED EPISODES
                  </p1>
                </Row>
              </Col>
              <Col style={{ marginRight: "10%" }}>
                <UserView
                  logout={this.props.logout}
                  user={{ username: this.props.user.username, color: "blue" }}
                  color="blue"
                />
              </Col>
            </Row>
            <div
              style={{
                flexDirection: "column",
                paddingLeft: "1%",
                marginRight: "10%",
                height: "70vh",
                overflow: "hidden scroll"
              }}
            >
              {this.state.episodes.length > 0 && this.state.pins.length > 1
                ? this.state.shouldRenderEpisodes.map((item, id) => (
                    <div style={{ display: "flex" }} className="mt-3 mb-2">
                      <Col style={{ width: "30%" }} className="imageContainer">
                        <img
                          alt="play"
                          className="ml-3 mt-3 mb-3 podcast_thumbnail"
                          style={{
                            height: 100,
                            width: 100,
                            borderRadius: 5,
                            boxShadow:
                              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                          }}
                          src={this.state.shouldRenderPodcasts[id].imageUrl}
                        />
                        <IconButton
                          className="pl-0 play_overlay"
                          style={{
                            // minWidth: "0px",
                            outline: "none",
                            backgroundColor: "transparent",
                          }}
                          onClick={() => {
                            this.props.updateDiscussionEpisode(
                              item,
                              this.state.pins[id].message,
                              this.state.shouldRenderPodcasts[id]
                            );
                            this.props.updateIndex(id);

                            this.props.episodeIndex == id
                              ? this.props.handlePlayorpause()
                              : this.props.playEpisode();
                          }}
                        >
                          <img
                            className="play_overlay"
                            src={
                              this.props.playpause &&
                              this.props.episodeIndex == id
                                ? "./pauseCircle.png"
                                : "./playCircle.png"
                            }
                            width="50"
                            height="50"
                            alt=""
                          />
                        </IconButton>
                      </Col>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginTop: "1.8%",
                          marginRight: "8%",
                          width: "65%",
                        }}
                      >
                        <Link
                          to={"./Reflect"}
                          style={{
                            fontSize: "13px",
                            color: "#173B5C",
                            fontFamily: "Avenir Heavy",
                          }}
                          onClick={() => {
                            this.props.updateReflectionEpisode(
                              item,

                              // TODO ADD PINS
                              this.state.pins[id].message,
                              this.state.shouldRenderPodcasts[id]
                            );
                            this.props.updateIndex(id);
                            this.props.updateProgress(
                              this.state.progresses[id]
                            );
                          }}
                        >
                          {item.title}
                        </Link>
                        <div
                          style={{
                            fontSize: "9px",
                            fontFamily: "Avenir Medium",
                            color: "grey",
                            marginLeft: "0.1%",
                            paddingBottom: "0.3%",
                          }}
                        >
                          <div style={{ display: "inline", marginRight: "2%" }}>
                            {this.state.shouldRenderPodcasts[id].title}
                          </div>
                          {String(item.date).substring(0, 10)}
                        </div>
                        <div
                          style={{
                            maxHeight: "55px",
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "12px",
                              color: "#848484",
                              fontFamily: "Avenir Medium",
                            }}
                          >
                            {item.summary}
                          </div>
                        </div>
                      </div>
                      <Dropdown
                        style={{
                          display: "inline",
                          height: "20%",
                          marginRight: "4%",
                          marginTop: "1.5%",
                          outline: "none",
                          boxShadow: "none",
                        }}
                      >
                        <Dropdown.Toggle
                          style={{
                            backgroundColor: "white",
                            borderColor: "white",
                          }}
                          id="dropdown-basic"
                        >
                          <img
                            style={{
                              height: "15px",
                              width: "15px",
                            }}
                            src="/threeDotCircle.png"
                          />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <LinkContainer to="./listening">
                            <Dropdown.Item
                              onClick={() => {
                                this.props.updateDiscussionEpisode(
                                  item,
                                  this.state.pins[id].message,
                                  this.state.shouldRenderPodcasts[id]
                                );
                                this.props.updateIndex(id);
                              }}
                            >
                              Listen
                            </Dropdown.Item>
                          </LinkContainer>
                          <LinkContainer to="./reflect">
                            <Dropdown.Item
                              onClick={() => {
                                this.props.updateReflectionEpisode(
                                  item,
                                  this.state.pins[id].message,
                                  this.state.shouldRenderPodcasts[id]
                                );
                                this.props.updateIndex(id);
                                this.props.updateProgress(
                                  this.state.progresses[id]
                                );
                              }}
                            >
                              Reflect
                            </Dropdown.Item>
                          </LinkContainer>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  ))
                : "Loading..."}
            </div>
          </Col>
        </Row>
        <PlayBar
          handlePlayorpause={this.props.handlePlayorpause}
          fastRewind={this.props.fastRewind}
          fastForward={this.props.fastForward}
          seekToTime={this.props.seekToTime}
          handlePin={this.props.handlePin}
          pinTime={this.props.pinTime}
          playpause={this.props.playpause}
          user={this.props.user}
          imgURL={this.props.imgURL}
          played={this.props.played}
          playing={this.props.playing}
          controls={this.props.controls}
          light={this.props.light}
          volume={this.props.volume}
          muted={this.props.muted}
          loaded={this.props.loaded}
          duration={this.props.duration}
          playbackRate={this.props.playbackRate}
          loop={this.props.loop}
          handlePlayPause={this.props.handlePlayPause}
          handleVolumeChange={this.props.handleVolumeChange}
          handlePlay={this.props.handlePlay}
          handlePause={this.props.handlePause}
          handleDuration={this.props.handleDuration}
          handleSeekTo={this.props.handleSeekTo}
          handleSeekChange={this.props.handleSeekChange}
          handleSeekMouseDown={this.props.handleSeekMouseDown}
          handleSeekMouseUp={this.props.handleSeekMouseUp}
          episode={this.props.episode}
          podcast={this.props.podcast}
          // testend
        ></PlayBar>
      </Container>
    );
  }
}

Example.propTypes = {
  style: PropTypes.object,
};
