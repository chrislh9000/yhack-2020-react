import '../assets/css/App.css';

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './Navbar'
import Pinpage from './Pinpage'
import Discussion from './Discussion'
import Audioplayer from './Audioplayer'
import PinIcon from './PinIcon'
import Pin from './Pin'

export default function App() {
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
            <About />
          </Route>

          <Route path="/users">
            <Users />
          </Route>

          <Route path="/">
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  // return <h2>Wut</h2>;
  return <PinIcon/>
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

function Podcast() {
  return <Audioplayer />
}
