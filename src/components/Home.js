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
import SearchPage from "./SearchPage";
import UserView from "./UserView";

export default class Example extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      episodes: [],
      podcasts: [],
      progresses: [],
      pins: []
    };
  }

  addPin = pin => {
    let newpins = this.state.pins;
    newpins.push({ message: pin });
    this.setState({
      pins: newpins
    });
  };

  componentDidMount = e => {
    // add the user id to the end of the request url

    if (localStorage.getItem("home")) {
      const stateObj = JSON.parse(localStorage.getItem("home"));
      this.setState({
        episodes: JSON.parse(stateObj.episodes),
        podcasts: JSON.parse(stateObj.podcasts),
        progresses: JSON.parse(stateObj.progresses),
        pins: JSON.parse(stateObj.pins)
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
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(json => {
          console.log(json.episodes);
          console.log(json.podcasts);
          if (json.episodes) {
            this.setState({
              episodes: json.episodes,
              podcasts: json.podcasts,
              progresses: json.progresses
            });
          }
          let promises = [];
          for (let i = 0; i < json.episodes.length; i++) {
            console.log(this.props.user._id);
            console.log(json.episodes[i]._id);
            promises.push(
              fetch(url2, {
                method: "POST",
                credentials: "same-origin",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  user_id: this.props.user._id, // userId
                  episode: json.episodes[i]._id
                })
              })
            );
          }
          console.log(promises);
          Promise.all(promises).then(values => {
            let pinsarray = [];
            for (let i = 0; i < json.episodes.length; i++) {
              pinsarray.push(values[i].json());
            }
            Promise.all(pinsarray).then(pinobjects => {
              console.log("============pinobjects========", pinobjects);
              this.setState({
                pins: pinobjects
              });
            });
          });
        })
        .catch(err => {
          console.log("Error: ", err);
        });
    }
    this.interval = setInterval(() => this.props.setCurrTime(), 1000);
  };

  componentDidUpdate = e => {
    console.log(this.props.episodeIndex);
    // console.log(this.state.pins);
    // console.log("=======proggresses========", this.state.progresses);
  };

  componentWillUnmount = e => {
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
            <Row
              style={{
                height: "40%",
                display: "flex"
              }}
              className="reflect-top"
            >
              <Col>
                <Row
                  style={{ marginLeft: "3%", marginTop: "2%", height: "30%" }}
                >
                  <div style={{ width: "90%" }}>
                    <input
                      type="text"
                      className="input"
                      onChange={this.handleChange}
                      placeholder="Search..."
                    />
                  </div>
                </Row>
                <Row
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "3%",
                    marginTop: "1%",
                    height: "70%"
                  }}
                >
                  <p1
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      fontSize: "25px"
                    }}
                  >
                    PINCAST WEEKLY
                  </p1>
                  <p1 style={{ color: "white" }}>Pincast. Just for you.</p1>
                </Row>
              </Col>
              <Col>
                <UserView user={{ username: "chemm" }} />
              </Col>
            </Row>
            <Row>
              {this.state.episodes.length > 0 && this.state.pins.length > 1
                ? this.state.episodes.map((item, id) => (
                    <div
                      className="mb-5"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        background: "white"
                      }}
                    >
                      <img
                        className="ml-3 mt-3 mb-3"
                        style={{
                          height: 180,
                          width: 180,
                          borderRadius: 10,
                          boxShadow:
                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                        }}
                        src={this.state.podcasts[id].imageUrl}
                      />

                    </div>
                  ))
                : "Loading..."}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

Example.propTypes = {
  style: PropTypes.object
};
