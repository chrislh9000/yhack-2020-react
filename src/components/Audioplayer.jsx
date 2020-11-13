import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import '../assets/css/App.css';
import ReactPlayer from 'react-player'
import podcast from '../assets/election_audio.mp3'
import IconButton from '@material-ui/core/Button';
import Button from '@material-ui/core/Button'
// import DeleteIcon from '@material-ui/icons';

class Audioplayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playpause: false,
      seeking: 100
    }
  }

  handlePlayorpause = () => {

    this.setState({playpause: !this.state.playpause})
    console.log(this.state.playpause)
  }

  handlePin = () => {
    var pin = this.player.getCurrentTime()
    console.log(this.player.getCurrentTime())
  }

  fastRewind = () => {
    this.player.seekTo(parseFloat(this.player.getCurrentTime() - 10))
  }

  fastForward = () => {
    this.player.seekTo(parseFloat(this.player.getCurrentTime() + 10))
  }

  ref = player => {
    this.player = player
  }

  render() {

    return (
      <Row className="mt-4 mb-4" style={{ flexDirection: 'row', display: 'flex', justifyContent: "space-evenly", alignItems: "center"}}>
      <IconButton onClick={() => this.fastRewind()}>
          <img style={{
              height: 25,
              width: 25,
          }} src='/back.png' />
        </IconButton>

        <IconButton onClick={() => this.handlePlayorpause()}>
        <img style={{
            height: 42,
            width: 42,
            opacity: 1
        }} src='/Play.png' />
        </IconButton>

        <IconButton onClick={() => this.fastForward()}>
            <img style={{
                height: 25,
                width: 25,
            }} src='/next.png' />
        </IconButton>

        <ReactPlayer
          ref={this.ref}
          url= {podcast}
          width="400px"
          height="50px"
          playing={this.state.playpause}
          controls={false}
        />
      </Row>
    );
  }

}

export default Audioplayer
