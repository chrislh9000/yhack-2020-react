import React from 'react';
import '../assets/css/App.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import IconButton from "@material-ui/core/Button";
import ReactPlayer from "react-player";
import Sidebar from "./Sidebar";
import Row from 'react-bootstrap/Row'
import Usercard from './Usercard'

class Userlist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount = (e) => {
    // render all the users
    const url = 'http://localhost:5000/social/users/all'
    fetch(url, {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((json) => {
      console.log("======JSON=======", json)
      this.setState({
        users: json.message
      })
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
  }

  render () {
    console.log("USERS===", this.state.users)
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
      <ReactPlayer
      ref={this.ref}
      url={this.props.reflectEpisode.audioUrl} // TO DO: change this based on selected episode
      width="100px"
      height="0px"
      playing={this.state.playing}
      controls={false}
      />
      <Col>
        {this.state.users.map((user, i) => {
          return (
            <Usercard username={user.username}
            />
          );
        })}
      </Col>
      </Row>
      </Container>
    )
  }
}

export default Userlist;
