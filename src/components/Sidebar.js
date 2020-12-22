import React from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../assets/css/App.css";
import { Link } from "react-router-dom";
import UserView from "./UserView";
import SidebarLinks from "./SidebarLinks";
import LogoHome from "./LogoHome";
import Search from "./SearchPage";
import PlayBox from "./PlayBox";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    //pre-rendering code

    return (
      <Col className="pl-0 pr-0 far-left" xs={2}>
        <Col className="pl-0 far-left-top">
          <LogoHome />
          <Row style={{ paddingLeft: "1.5rem" }}>
            <Search />
            <UserView className="ml-4" style={{ alignSelf: "left" }} />

            <SidebarLinks />
          </Row>
        </Col>
        <PlayBox handlePin={this.props.handlePin} pinTime={this.props.pinTime} handleWind={this.props.handleWind}/>
      </Col>
    );
  }
}

export default Sidebar;
