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
    if (
      localStorage.getItem(this.props.reflectEpisode._id.concat(".reflect"))
    ) {
      const stateObj = JSON.parse(
        localStorage.getItem(this.props.reflectEpisode._id.concat(".reflect"))
      );
      console.log(
        "=======REFLECT EPISODE ID=========",
        this.props.reflectEpisode._id
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
      };
    }
  }

  appendTogether = () => {
    let tempList = []
    for (var i = 0; i < this.state.friendPins.length; i++){
      let tempString = ""
      tempString = tempString.concat(this.state.friendPins[i].text.toLowerCase()) + " "
      tempString = tempString.concat(this.state.friendPins[i].user.username.toLowerCase()) + " "
      tempString = tempString.concat(this.state.friendPins[i].note.toLowerCase()) + " "
      tempList.push(tempString)
    }

    for (var j = 0; j < this.state.reflectPins.length; j++) {
      let tempString = ""
      tempString = tempString.concat(this.state.reflectPins[j].text.toLowerCase()) + " "
      tempString = tempString.concat(this.props.user.username.toLowerCase()) + " "
      tempString = tempString.concat(this.state.reflectPins[j].note.toLowerCase()) + " "
      tempList.push(tempString)
    }
    console.log(tempList)
    this.setState({ searchList: tempList })
  }

  handleSeeFriends = () => {
    this.setState({ seeFriends: !this.state.seeFriends });
  };
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

  handleSearch = () => {
    // if query matches pin.text, pin.user, or pin, or pin.note then add pins to renderedPins state 
    // TO DO: think of pin.time, date of creation search functionality implementation
  }

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

  handleSeekTo = (time) => {
    console.log("gonan seek to", time);
    this.player.seekTo(time);
    this.setState({
      played: (time / this.props.reflectEpisode.duration) * 0.999999,
    });
    // this.setState({played:time})
  };

  handleFriendPin = () => {
    const url = "http://localhost:5000/pins/friendPin";
    fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        friends: this.props.user.friends,
        episode: this.props.reflectEpisode._id,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("hi");
        this.setState({
          friendPins: json.message
        }, () => {
          this.appendTogether()
        })
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
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

  filterFunction = (userInput) => {
    let filteredNames = this.state.searchList.map((x)=>{ 
        return x.includes(userInput)
    })
    console.log("FILTERED NAMES====", filteredNames)
    // setState to include pins that match that array 
    if (this.state.seeFriends) {
      // if seeFriends is toggled, only 

    } else {

    }
  }

  ref = (player) => {
    this.player = player;
  };

  componentDidMount = (e) => {
    // add the user id to the end of the request url
    this.handleFriendPin();
  };

  componentWillUnmount = (e) => {
    let currState = this.state;
    currState.reflectPins = JSON.stringify(currState.reflectPins);
    localStorage.setItem(
      this.props.reflectEpisode._id.concat(".reflect"),
      JSON.stringify(currState)
    );
  };

  componentWillUnmount = (e) => {
    this.updateStorage();
  };

  render() {
    console.log("=======REFLECT EPISODE ID=========", this.state.friendPins);
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
            imgURL={this.props.imgURL}
          />

          <Col className="reflection-column">
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
              <SearchPage 
                filterFunction={this.filterFunction}
                friendPins={this.state.friendPins}
                reflectPins={this.state.reflectPins}
                 />
              <button onClick={this.handleSeeFriends}>{this.state.seeFriends ? "no Friends" : "Friends"}</button>

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
              {/*here, we can potentially have this.state if we're coming from discussion, and this.props if coming from home */}
              <Col>
                {
                  this.state.seeFriends ?
                  this.state.reflectPins.map((pin, i) => {
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
                        user={this.props.user}
                        favorited={pin.favorited}
                        handleSeekTo={this.handleSeekTo}
                        handlePause={this.handlePause}
                        handlePlay={this.handlePlay}
                      />
                    </div>
                  );
                }) :
                  this.state.friendPins.map((pin, i) => {
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
                        user={pin.user}
                        favorited={pin.favorited}
                        handleSeekTo={this.handleSeekTo}
                        handlePause={this.handlePause}
                        handlePlay={this.handlePlay}
                      />
                    </div>
                  );
                }) }
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Pinpage;
