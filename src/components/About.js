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

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Sidebar handlePin={this.props.handlePin}></Sidebar>;
  }
}

export default About;
