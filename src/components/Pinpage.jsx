import React from "react";
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import "../assets/css/App.css";
import Navibar from "./Navbar.jsx";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Sidebar from "./Sidebar";
import SearchPage from "./SearchPage";
import PinCard from "./PinCard";
import AudioBar from "./AudioBar";
import ReactPlayer from "react-player";

class Pinpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      played: 0,
      url: null,
      playing: true,
      controls: false,
      light: false,
      volume: 0.8,
      muted: false,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      loop: false,
    };
  }
  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing });
  };

  handleVolumeChange = (e) => {
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

  handleSeekMouseDown = (e) => {
    this.setState({ seeking: true });
  };

  handleSeekChange = (e) => {
    this.setState({ played: parseFloat(e.target.value) });
  };

  handleSeekMouseUp = (e) => {
    this.setState({ seeking: false });
    this.player.seekTo(parseFloat(e.target.value));
  };

  handleDuration = (duration) => {
    console.log("onDuration", duration);
    this.setState({ duration });
  };
  handleEdit = () => {
    const url = "http://localhost:5000/pins/editPin";
    fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startTime: 1,
        endTime: 5,
        newCcId: 1,
        text: "oh elo",
        ccId: 5,
        episode: "PlanetMoney0",
        id: "5fdaf4e7616a7e5445f0ba59",
      }),
    })
      .then((json) => {
        console.log("hi");
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  ref = (player) => {
    this.player = player;
  };

  render() {
    //pre-rendering code
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

          <Col>
            <Row>
              <ReactPlayer
                ref={this.ref}
                url={this.props.reflectEpisode.audioUrl} // TO DO: change this based on selected episode
                width="100px"
                height="0px"
                playing={this.state.playing}
                controls={false}
              />
            </Row>
            <Row>
              <button onClick={this.handlePlayPause}>
                {this.state.playing ? "Pause" : "Play"}
              </button>
              <input
                class="slider"
                type="range"
                min={0}
                max={0.999999}
                step="any"
                value={this.state.played}
                onMouseDown={this.handleSeekMouseDown}
                onChange={this.handleSeekChange}
                onMouseUp={this.handleSeekMouseUp}
              />
            </Row>
            <Row>
              <SearchPage />
            </Row>
            <Row>
              <AudioBar
                pinTime={this.props.pinTime}
                audioDuration={this.props.audioDuration}
                handlePlayorpause={this.props.handlePlayorpause}
                fastRewind={this.props.fastRewind}
                fastForward={this.props.fastForward}
                seekToTime={this.props.seekToTime}
                handlePin={this.props.handlePin}
                playpause={this.props.playpause}
                user={this.props.user}
                audioSame={this.state.audioSame}
              />
            </Row>
            <Row>
              <Col>
                {this.props.reflectPins.map((pin, i) => {
                  return (
                    <div
                      className="mb-5"
                      style={{
                        background: "grey",
                        borderRadius: "25px",
                      }}
                    >
                      <PinCard
                        ccId={pin.ccId}
                        text={pin.text}
                        key={i}
                        time={pin.startTime.$numberDecimal}
                        note={pin.note}
                        handleEdit={this.handleEdit}
                        episode={pin.episode}
                        user_id={pin.user}
                        favorited={pin.favorited}
                      />
                    </div>
                  );
                })}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Pinpage;
