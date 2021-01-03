import "../assets/css/App.css";

import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Navbar from "./Navbar";
import Pinpage from "./Pinpage";
import Discussion from "./Discussion";
import Pin from "./Pin";
import Sidebar from "./Sidebar";
import About from "./About";
import Register from "./Register";
import Login from "./Login";
import ReactPlayer from "react-player";
import podcast from "../assets/podcasts/planet_money.mp3";
import fs from "fs";
const ipcRenderer = window.require("electron").ipcRenderer;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinTime: 0,
      playpause: false,
      loggedIn: false,
      user: { username: " " },
      url: podcast,
      episode: {_id: '5ff051084158640e1d924e76', transcript: '5fe345e13ed52c79138e951d'}
    };
  }

  setPodcast = (newURL) => {
    this.setState({ url: newURL });
  };

  handlePlayorpause = () => {
    this.setState({ playpause: !this.state.playpause });
    // this.state.playpause
    //   ? this.props.message("PAUSED")
    //   : this.props.message("NOW PLAYING");
  };

  login = (id) => {
    this.setState({ loggedIn: true, user: id }, () => {
      console.log(this.state.user);
    });
  };

  logout = () => {
    this.setState({
      loggedIn: false, user: { username: " " }}, () => {
        console.log("====LOGGED OUT=====")
      })
  }

  setCurrTime = () => {
    var pin = this.player.getCurrentTime();
    this.handlePin(pin);
  };

  componentDidMount = (e) => {
    ipcRenderer.send('loadCookies', "HEY")
    ipcRenderer.on('userData', (event, arg) => {
      if(arg && arg.length != 0) {
        // check login stuff
        let userData = JSON.parse(arg[0].value)
        console.log("========== user_data ==========", userData)
        this.setState({
          loggedIn: true,
          user: userData
        })
      }
    })
    // this.interval = setInterval(
    //   () => this.props.handlePin(this.player.getCurrentTime()),
    //   1000
    // );
    // console.log("componentDidmount", this.props.pinTime);
    this.setCurrTime();
  };

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  fastRewind = () => {
    // this.player.seekTo(parseFloat(this.player.getCurrentTime() - 10))
    var time = this.player.getCurrentTime();
    if (time < 10) {
      time = 1;
    } else {
      time -= 10;
    }
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
    if (this.state.pinTime > 0) {
      this.player.seekTo(time);
    }
  };

  componentDidUpdate(prevProps) {
    // console.log("componentdidupdate       ==========", this.props.pinTime);
    // this.interval = setInterval(
    //   () => this.handlePin(this.player.getCurrentTime()),
    //   1000
    // );
    // this.handlePin(this.player.getCurrentTime())
  }

  ref = (player) => {
    this.player = player;
  };

  handlePin = (pin) => {
    this.setState({
      pinTime: pin,
    });
    // console.log("we in apps.js", this.state.pinTime)
  };

/*
Update Episode is passed into the About component. When you click listen for a specific episode,
it updates episode-specific state elements passed into the discussion component
*/

  updateDiscussionEpisode = (episode) => {
    // needs episode name and then the "fake id" (i think its denoted podcast)
    console.log("====YO DIS GETS CALLED BRO")
    this.setState({
      episode: episode
    })
  }

  render() {
    return (
      <Router>
        <div>
          <ReactPlayer
            ref={this.ref}
            url={podcast}
            width="400px"
            height="0px"
            playing={this.state.playpause}
            controls={false}
          />
          {/* A <Switch> looks through its children <Route>s and
        renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/pinning">
              <Pin />
            </Route>

            <Route path="/podcast">
              <Podcast />
            </Route>

            <Route path="/pins_page">
              <Pinpage
                pinTime={this.state.pinTime}
                handlePin={this.handlePin}
                handlePlayorpause={this.handlePlayorpause}
                fastRewind={this.fastRewind}
                fastForward={this.fastForward}
                seekToTime={this.seekToTime}
                playpause={this.state.playpause}
                setCurrTime={this.setCurrTime}
                user={this.state.user}
                audioDuration={100}
                pinTime={this.state.pinTime}
              />
            </Route>

            {/* <Route path="/discussion">
        <Discussion />
        </Route> */}

            <Route path="/navbar">
              <Navbar />
            </Route>

            <Route path="/about">
              <About
                pinTime={this.state.pinTime}
                handlePin={this.handlePin}
                user={this.state.user}
                updateDiscussionEpisode = {this.updateDiscussionEpisode}
              />
            </Route>

            <Route path="/users">
              <Discussion
                pinTime={this.state.pinTime}
                handlePin={this.handlePin}
                handlePlayorpause={this.handlePlayorpause}
                fastRewind={this.fastRewind}
                fastForward={this.fastForward}
                seekToTime={this.seekToTime}
                playpause={this.state.playpause}
                setCurrTime={this.setCurrTime}
                user={this.state.user}
                episode={this.state.episode}
              />
            </Route>

            <Route path="/register">
              <Register user={this.state.user} logout={this.logout} />
            </Route>

            <Route path="/login">
              {this.state.loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Login user={this.props.user} login={this.login} />
              )}
            </Route>

            <Route path="/">
              {/* <ReactPlayer
          ref={this.ref}
          url={podcast}
          width="400px"
          height="0px"
          playing={this.state.playpause}
          controls={false}
          /> */}
              <Discussion
                pinTime={this.state.pinTime}
                handlePin={this.handlePin}
                handlePlayorpause={this.handlePlayorpause}
                fastRewind={this.fastRewind}
                fastForward={this.fastForward}
                seekToTime={this.seekToTime}
                playpause={this.state.playpause}
                setCurrTime={this.setCurrTime}
                user={this.state.user}
                episode={this.state.episode}
              />
              {/* <About
            pinTime={this.state.pinTime}
            handlePin={this.handlePin}
            handlePlayorpause={this.handlePlayorpause}
            fastRewind={this.fastRewind}
            fastForward={this.fastForward}
            seekToTime={this.seekToTime}
            playpause={this.state.playpause}
            setCurrTime={this.setCurrTime}
            user={this.state.user}
            /> */}
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

function Home() {
  return <h2>Wut</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function Podcast() {
  return <h1>ello</h1>;
}
