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
import Userlist from "./Userlist";
import Login from "./Login";
import ReactPlayer from "react-player";
import podcast from "../assets/podcasts/planet_money.mp3";
import Reflect from "./Reflect";
import fs from "fs";
const ipcRenderer = window.require("electron").ipcRenderer;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinTime: 0,
      playpause: false,
      loggedIn: false,
      episodeIndex: 0,
      user: { username: " " },
      url: podcast,
      episode: {
        _id: "5ff051084158640e1d924e76",
        transcript: "5fe345e13ed52c79138e951d",
        audioUrl:
          "https://res.cloudinary.com/pincast/video/upload/v1609758345/planet_money_wsjh0m.mp3",
      },
      reflectEpisode: {
        _id: "5ff41fd399ce35f94887faf1",
        transcript: "5ff09c0f1c12e41a6d708a99",
        audioUrl:
          "https://res.cloudinary.com/pincast/video/upload/v1609759707/How_I_built_this_Riot_Games_vxfj3d.mp3",
      },
      reflectPins: [],
      discussPins: [],
      episodeIndex: 0,
      podcast: {},

    };
  }

  updateEpisodeIndex = (index) => {
    this.setState({
      episodeIndex: index,
    });
  };

  updateReflectionEpisode = (episode, pins, podcast, friendPin) => {
    console.log("reflectionnn", episode, pins);
    this.setState({
      reflectEpisode: episode,
      reflectPins: pins,
      podcast: podcast,
    });
    // update local storage
    localStorage.setItem("lastPlayedEpisode", JSON.stringify(episode));
  };

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
    localStorage.setItem("user", JSON.stringify(id));
  };

  logout = () => {
    this.setState(
      {
        loggedIn: false,
        user: { username: " " },
      },
      () => {
        console.log("====LOGGED OUT=====");
      }
    );
  };

  setCurrTime = () => {
    if (this.player) {
      var pin = this.player.getCurrentTime();
      this.handlePin(pin);
      return pin;
    }
  };

  /*
  friendUser takes in a user_id (string) and adds the user to the friends field of the user object in the database
  */

  friendUser = (friend_id) => {
    // update the database to add the friend to the database
    fetch("http://localhost:5000/social/follow", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: this.state.user._id,
        friend_id: friend_id
      })
    })
    .then(res => res.json())
    .then((json) => {
      // update the user object in state here
      console.log("SUCCESS",json)
      this.setState({
        user: json.message
      }, () => {
        console.log("NEW USER WITH FRIEND CHANGE", this.state.user)
      })
      // update local storage
    })
    .catch((err) => {
      console.log("ERROR",err)
    })
  }

  /*
  unfriendUser takes in a user_id (string) and removes the user to the friends field of the user object in the database
  */

  unfriendUser = (friend_id) => {
    // update the database to add the friend to the database
    fetch("http://localhost:5000/social/unfollow", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: this.state.user._id,
        friend_id: friend_id
      })
    })
    .then(res => res.json())
    .then((json) => {
      // update the user object in state here
      console.log("SUCCESSfully unfollowed friend",json)
      this.setState({
        user: json.message
      }, () => {
        console.log("NEW USER WITH FRIEND CHANGE", this.state.user)
      })
      // update local storage
    })
    .catch((err) => {
      console.log("ERROR",err)
    })
  }

  /*
  sharePin takes in a user_id (string) and adds the user to the friends field of the user object in the database
  */

  sharePin = (friend_id, pin_id) => {
    // update the database to add the friend to the database
    fetch("http://localhost:5000/social/share", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: friend_id,
        pin: pin_id
      })
    })
    .then(res => res.json())
    .then((json) => {
      // update the user object in state here
      console.log("shared pin with user!! SUCCESFULLY")
      // update local storage
    })
    .catch((err) => {
      console.log("ERROR",err)
    })
  }

  componentDidMount = (e) => {
    this.setCurrTime();
    const newuser = JSON.parse(localStorage.getItem("user"));
    if (newuser) {
      this.setState({
        user: newuser,
      });
    }
    // load last played episode into state from local storage
    if (localStorage.getItem("lastPlayedEpisode")) {
      let lastPlayedEpisode = JSON.parse(
        localStorage.getItem("lastPlayedEpisode")
      );
      this.setState(
        {
          reflectEpisode: lastPlayedEpisode,
          episode: lastPlayedEpisode,
        },
        () => {
          console.log(
            "EPISODES FROM LAST SESSION ADDED=========",
            lastPlayedEpisode
          );
        }
      );
    }
  };

  componentWillUnmount() {
    localStorage.clear();
  }

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
    // console.log(this.state.episodeIndex);
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

  updateDiscussionEpisode = (episode, pins, podcast) => {
    // needs episode name and then the "fake id" (i think its denoted podcast)
    console.log("====YO DIS GETS CALLED BRO");
    this.setState({
      episode: episode,
      discussPins: pins,
      podcast: podcast,
    });
  };

  render() {
    return (
      <Router>
        <div>
          <ReactPlayer
            ref={this.ref}
            url={this.state.episode.audioUrl} // TO DO: change this based on selected episode
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

            <Route path="/reflect">
              <Reflect 
                 handlePin={this.handlePin}
                 handlePlayorpause={this.handlePlayorpause}
                 fastRewind={this.fastRewind}
                 fastForward={this.fastForward}
                 seekToTime={this.seekToTime}
                 playpause={this.state.playpause}
                 setCurrTime={this.setCurrTime}
                 user={this.state.user}
                 episode={this.state.episode}
                 audioDuration={100}
                 pinTime={this.state.pinTime}
                 reflectEpisode={this.state.reflectEpisode}
                 reflectPins={this.state.reflectPins}
                 episodeIndex={this.state.episodeIndex}
                 imgURL={this.state.podcast.imageUrl}
                 sharePin = {this.sharePin}
                 podcast = {this.state.podcast}
              />
            </Route>

            <Route path="/reflect">
              <Pinpage
                handlePin={this.handlePin}
                handlePlayorpause={this.handlePlayorpause}
                fastRewind={this.fastRewind}
                fastForward={this.fastForward}
                seekToTime={this.seekToTime}
                playpause={this.state.playpause}
                setCurrTime={this.setCurrTime}
                user={this.state.user}
                episode={this.state.episode}
                audioDuration={100}
                pinTime={this.state.pinTime}
                reflectEpisode={this.state.reflectEpisode}
                reflectPins={this.state.reflectPins}
                episodeIndex={this.state.episodeIndex}
                imgURL={this.state.podcast.imageUrl}
                sharePin = {this.sharePin}
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
                handlePlayorpause={this.handlePlayorpause}
                fastRewind={this.fastRewind}
                fastForward={this.fastForward}
                seekToTime={this.seekToTime}
                playpause={this.state.playpause}
                setCurrTime={this.setCurrTime}
                user={this.state.user}
                episode={this.state.episode}
                login={this.login}
                updateDiscussionEpisode={this.updateDiscussionEpisode}
                updateReflectionEpisode={this.updateReflectionEpisode}
                updateIndex={this.updateEpisodeIndex}
                episodeIndex={this.state.episodeIndex}
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
                login={this.login}
                discussPins={this.state.discussPins}
                getUserFromStorage={this.getUserFromStorage}
                episodeIndex={this.state.episodeIndex}
                imgURL={this.state.podcast.imageUrl}
              />
            </Route>

            <Route path="/register">
              <Register
                user={this.state.user}
                logout={this.logout}
                history={this.history}
                loggedIn={this.state.loggedIn}
              />
            </Route>

            <Route path="/login">
              {this.state.loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Login user={this.props.user} login={this.login} />
              )}
            </Route>

            <Route path="/social">
              <Userlist
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
                audioDuration={100}
                pinTime={this.state.pinTime}
                reflectEpisode={this.state.reflectEpisode}
                reflectPins={this.state.reflectPins}
                episodeIndex={this.state.episodeIndex}
                friendUser={this.friendUser}
                unfriendUser={this.unfriendUser}
                imgURL={this.state.podcast.imageUrl}
              />
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
              {/* <Discussion
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
                login={this.login}
              /> */}
              <About
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
                login={this.login}
                updateDiscussionEpisode={this.updateDiscussionEpisode}
                updateReflectionEpisode={this.updateReflectionEpisode}
                updateIndex={this.updateEpisodeIndex}
                episodeIndex={this.state.episodeIndex}
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
