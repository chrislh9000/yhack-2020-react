import "../assets/css/App.css";

import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Pinpage from "./Pinpage";
import Discussion from "./Discussion";
import Audioplayer from "./Audioplayer";
import PinIcon from "./PinIcon";
import Pin from "./Pin";
import Sidebar from "./Sidebar";
import About from "./About";
import Register from './Register'
import Login from './Login'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pinTime: 0 };
  }

  handlePin = (pin) => {
    this.setState({
      pinTime: pin,
    });
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

            <Route path="/discussion">
              <Discussion />
            </Route>

            <Route path="/navbar">
              <Navbar />
            </Route>

            <Route path="/about">
              <About pinTime={this.state.pinTime} handlePin={this.handlePin} />
            </Route>

            <Route path="/users">
              <Users />
            </Route>

            <Route path="/register">
              <Register />
            </Route>

            <Route path="/login">
              <Login />
            </Route>


            <Route path="/">
              <Discussion
                pinTime={this.state.pinTime}
                handlePin={this.handlePin}
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
  // return <h2>Wut</h2>;
  return <PinIcon />;
}

function Users() {
  return <h2>Users</h2>;
}

function Podcast() {
  return <Audioplayer />;
}
