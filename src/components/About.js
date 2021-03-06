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
import { Link } from "react-router-dom";
import { SlideDown } from "react-slidedown";

import Truncate from "react-truncate";
import PlayBar from "./PlayBar";
import Listening from "./Listening";

export default class Example extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      episodes: [],
      podcasts: [],
      progresses: [],
      pins: [],
    };
  }

  addPin = (pin) => {
    let newpins = this.state.pins;
    newpins.push({ message: pin });
    this.setState({
      pins: newpins,
    });
  };

  componentDidMount = (e) => {
    // add the user id to the end of the request url

    if (localStorage.getItem("home")) {
      const stateObj = JSON.parse(localStorage.getItem("home"));
      this.setState({
        episodes: JSON.parse(stateObj.episodes),
        podcasts: JSON.parse(stateObj.podcasts),
        progresses: JSON.parse(stateObj.progresses),
        pins: JSON.parse(stateObj.pins),
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
        .then((res) => res.json())
        .then((json) => {
          console.log(json.episodes);
          console.log(json.podcasts);
          if (json.episodes) {
            this.setState({
              episodes: json.episodes,
              podcasts: json.podcasts,
              progresses: json.progresses,
            });
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
          Promise.all(promises).then((values) => {
            let pinsarray = [];
            for (let i = 0; i < json.episodes.length; i++) {
              pinsarray.push(values[i].json());
            }
            Promise.all(pinsarray).then((pinobjects) => {
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

  componentDidUpdate = (e) => {
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
      localStorage.setItem("home", JSON.stringify(currState));
    }
  };

  render() {

    return (
      <div className="page">
        <Container fluid className="discussion_background home-back pl-0 pr-0">
          <Row style={{ height: "92vh" }}>
            <Sidebar
              style={{ flex: "1" }}
              handlePlayorpause={this.props.handlePlayorpause}
              fastRewind={this.props.fastRewind}
              fastForward={this.props.fastForward}
              seekToTime={this.props.seekToTime}
              handlePin={this.props.handlePin}
              pinTime={this.props.pinTime}
              playpause={this.props.playpause}
              user={this.props.user}
              imgURL="whitepin.png"
            />

            <Col
              className="pr-0 pl-0 mt-5 ml-5 mr-5 home-column"
              style={{ flex: "6" }}
            >
              <FilterBar />
              {this.state.episodes.length > 0 && this.state.pins.length > 1
                ? this.state.episodes.map((item, id) => (
                    <div
                      className="mb-5"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        background: "white",
                      }}
                    >
                      <img
                        className="ml-3 mt-3 mb-3"
                        style={{
                          height: 180,
                          width: 180,
                          borderRadius: 10,
                          boxShadow:
                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        }}
                        src={this.state.podcasts[id].imageUrl}
                      />
                      <div
                        className="pl-3 mt-3"
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <div
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            color: "gray",
                          }}
                        >
                          {item.date}
                        </div>
                        <div style={{ fontSize: "22px", fontWeight: "bold" }}>
                          {item.title}
                        </div>
                        <Truncate lines={3} className="pb-4 episode-summary">
                          {item.summary}
                        </Truncate>
                        <div
                          className="hl pb-4"
                          style={{ alignSelf: "right" }}
                          ref="bar"
                        >
                          <div
                            style={{
                              left: String(
                                (this.state.progresses[id] / item.duration) *
                                  500
                              ).concat("px"),
                            }}
                            className="bubble"
                          />
                          {/* <div className="pinbar"></div> */}
                          {this.state.pins[id].message.map((pin, id) => (
                            <div
                              style={{
                                left: String(
                                  (pin.startTime.$numberDecimal /
                                    item.duration) *
                                    500
                                ).concat("px"),
                              }}
                              className="pinbar"
                            ></div>
                          ))}
                        </div>
                      </div>
                      <Col
                        xs={3}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-evenly",
                        }}
                      >
                        {/* <Link to="/users"> */}
                        <Button
                          onClick={() => {
                            this.props.updateDiscussionEpisode(
                              item,
                              this.state.pins[id].message,
                              this.state.podcasts[id]
                            );
                            this.props.updateIndex(id);
                          }}
                          style={{ width: "100%", height: "60px" }}
                        >
                          Listen
                        </Button>
                        {/* </Link> */}
                        <Link to="/reflect">
                          <Button
                            onClick={() => {
                              this.props.updateReflectionEpisode(
                                item,
                                this.state.pins[id].message,
                                this.state.podcasts[id]
                              );
                              this.props.updateIndex(id);
                              this.props.updateProgress(this.state.progresses[id])
                            }}
                            style={{ width: "100%", height: "60px" }}
                          >
                            Reflect
                          </Button>
                        </Link>
                      </Col>
                    </div>
                  ))
                : "Loading..."}
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
            imgURL="whitepin.png"
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
            // testend
          ></PlayBar>
        </Container>
      </div>
    );
  }
}

Example.propTypes = {
  style: PropTypes.object,
};
