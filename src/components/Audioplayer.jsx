import React from "react";
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import { Link } from 'react-router-dom'
import "../assets/css/App.css";
import ReactPlayer from "react-player";
import IconButton from "@material-ui/core/Button";
import Button from "@material-ui/core/Button";
import { number } from "prop-types";
import podcast from "../assets/podcasts/planet_money.mp3";
// import Scroll from "react-scroll"
// var Link = Scroll.Link;
// import DeleteIcon from '@material-ui/icons';

class Audioplayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playpause: false,
    };
  }

  handlePlayorpause = () => {
    this.setState({ playpause: !this.state.playpause });
    this.state.playpause
      ? this.props.message("PAUSED")
      : this.props.message("NOW PLAYING");
  };

  handlePin = () => {
    var pin = this.player.getCurrentTime();
    console.log(this.player.getCurrentTime());
    this.props.handlePin(pin);
  };

  componentDidMount = (e) => {
    this.interval = setInterval(
      () => this.props.handlePin(this.player.getCurrentTime()),
      1000
    );
    console.log("componentDidmount", this.props.pinTime);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fastRewind = () => {
    // this.player.seekTo(parseFloat(this.player.getCurrentTime() - 10))
    var time = this.player.getCurrentTime();
    if (time < 10) {
      time = 0;
    } else {
      time -= 10;
    }
    this.props.handleWind(time);
    this.seekToTime(time);
  };

  fastForward = () => {
    // this.player.seekTo(parseFloat(this.player.getCurrentTime() + 10))
    var time = this.player.getCurrentTime() + 10;
    var duration = this.player.getDuration();
    if (time > duration) {
      time = duration;
    }
    // this.props.handleWind(time)
    this.seekToTime(time);
  };

  seekToTime = (time) => {
    if (this.props.pinTime > 0) {
      this.player.seekTo(time);
    }
  };

  componentDidUpdate(prevProps) {
    console.log("componentdidupdate       ==========", this.props.pinTime);
    if (this.props.pinTime !== this.player.getCurrentTime()) {
      console.log("+++++++++++++");
      this.seekToTime(this.props.pinTime);
    }
  }

  ref = (player) => {
    this.player = player;
  };

  render() {
    return (
      <Row
        className="mt-2 mb-4"
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "140px",
        }}
      >
        <IconButton
          onClick={() => this.fastRewind()}
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
              height: 18,
              width: 18,
            }}
            src="/back.png"
          />
        </IconButton>

        <IconButton
          onClick={() => this.handlePlayorpause()}
          disableTouchRipple={true}
          style={{ outline: "none", backgroundColor: "transparent" }}
          className="pr-0 pl-0 mt-2 mb-2"
        >
          <img
            style={{
              height: 32,
              width: 32,
              opacity: 1,
            }}
            src={this.state.playpause ? "/pause.png" : "/play.png"}
          />
        </IconButton>

        <IconButton
          onClick={() => this.fastForward()}
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
              height: 18,
              width: 18,
            }}
            src="/next.png"
          />
        </IconButton>

        <ReactPlayer
          ref={this.ref}
          url={podcast}
          width="400px"
          height="0px"
          playing={this.state.playpause}
          controls={false}
        />
      </Row>
    );
  }
}

export default Audioplayer;
