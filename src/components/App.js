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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinTime: 0,
      playpause: false,
      loggedIn: false,
      user: { username: " " },
    };
  }

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

  setCurrTime = () => {
    var pin = this.player.getCurrentTime();
    this.handlePin(pin);
  };

  componentDidMount = (e) => {
    // this.interval = setInterval(
    //   () => this.props.handlePin(this.player.getCurrentTime()),
    //   1000
    // );
    // console.log("componentDidmount", this.props.pinTime);
    // this.setCurrTime();
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
    // if (this.props.pinTime !== this.player.getCurrentTime()) {
    //   console.log("+++++++++++++");
    //   this.seekToTime(this.props.pinTime);
    // }
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

  render() {
    return (
      <Router>
        <div>
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
              <Pinpage />
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
              />
            </Route>

            <Route path="/users">
              <Users />
            </Route>

            <Route path="/register">
              <Register />
            </Route>

            <Route path="/login">
              {this.state.loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Login login={this.login} />
              )}
            </Route>

            <Route path="/">
              <ReactPlayer
                ref={this.ref}
                url={podcast}
                width="400px"
                height="0px"
                playing={this.state.playpause}
                controls={false}
              />
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
              />
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
