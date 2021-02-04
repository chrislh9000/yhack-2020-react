import React from "react";
import "../assets/css/App.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/Button";
import AudioBar from "./AudioBar";
import { useHistory, Link, withRouter } from "react-router-dom";
import history from "./history";


class PlayBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgURL: this.props.imgURL,
      // played: 0,
      // playing: false,
      // controls: false,
      // light: false,
      // volume: 0.8,
      // muted: false,
      // loaded: 0,
      // duration: 0,
      // playbackRate: 1.0,
      // loop: false,
      reflectPins: this.props.reflectPins,
      friendPins: [],
      seeFriends: false,
      shouldRenderPins: [],
      searchList: [],
    };
  }

  // handleSeekMouseDown = (e) => {
  //   this.setState({ seeking: true });
  //   // e.stopPropagation();
  // };

  // handleSeekChange = (e) => {
  //   this.setState({ played: parseFloat(e.target.value) });
  //   // e.stopPropagation();
  // };

  // handleSeekMouseUp = (e) => {
  //   this.setState({ seeking: false });
  //   // e.stopPropagation();
  //   // this.player.seekTo(parseFloat(e.target.value));
  // };

  slideUp = () => {
    // history.push("/");
    // alert("hi");
  };

  duraTime = () => {
    let secs = Math.floor(this.props.episode.duration)
    let mins = Math.floor(secs / 60)
    secs = secs % 60
    let str = (mins.toString().concat(":")).concat(secs.toString())
    console.log("helo",str)
    return str
  }
  currTime = () => {
    
    let secs = Math.floor(this.props.episode.duration * this.props.played)
    let mins = (Math.floor(secs / 60)).toString().padStart(2,"0")
    secs = (secs % 60).toString().padStart(2,"0")
    let str = (mins.concat(":")).concat(secs)
    return str
  }

  render() {
    console.log(this.duraTime())
    return (
      <Container
        onClick={this.slideUp}
        className="mr-0 ml-0"
        fluid
        style={{
          backgroundColor: "#EBEBEB",
          height: "8vh",
          borderTop: "0.25px solid #717171",
        }}
      >
        <div
          className="pt-2 pb-2"
          style={{
            marginLeft: "16.67%",
            marginRight: "16.67%",
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Row
            className="playbar-episode mr-3"
            style={{ alignItems: "center" }}
          >
            <img
              style={{
                height: 40,
                width: 40,
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
                style={{ fontFamily: "Avenir Book", fontSize: "10px" }}
                className="mb-0"
              >
                The Investor's Podcast
              </p>
              <p
                style={{ fontFamily: "Avenir Heavy", fontSize: "13px" }}
                className="mb-0"
              >
                Millennial Investing
              </p>
            </div>
          </Row>
          <Row className="playbar-buttons ml-3 mr-3">
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
                  height: 15,
                  width: 11,
                }}
                src="/back.png"
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
                  height: 15,
                  width: 13,
                  opacity: 1,
                }}
                src={this.props.playpause ? "/pause.png" : "/play.png"}
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
                  height: 15,
                  width: 11,
                }}
                src="/next.png"
              />
            </IconButton>
          </Row>
          <Row
            className="playbar-audio ml-3 mr-3"
            style={{ width: "45%", alignItems: "center" }}
          >
            <p
              className="mb-0"
              style={{
                fontFamily: "Avenir Book",
                fontSize: "14px",
                color: "#173B5C",
              }}
            >
              {this.currTime()}
            </p>
            <input
              class="slider ml-3 mr-3"
              type="range"
              min={0}
              max={0.999999}
              step="any"
              // value={this.state.played}
              // onMouseDown={this.handleSeekMouseDown}
              // onChange={this.handleSeekChange}
              // onMouseUp={this.handleSeekMouseUp}
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
                color: "#173B5C",
              }}
            >
              {this.duraTime()}
            </p>
          </Row>
          <Row>
            <Link to="/listening">
              <IconButton
                //   onClick={() => this.props.fastForward()}
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
                    height: 30,
                    width: 30,
                  }}
                  src="/LOGO.png"
                />
              </IconButton>
            </Link>
          </Row>
        </div>
      </Container>
    );
  }
}

export default PlayBar;
