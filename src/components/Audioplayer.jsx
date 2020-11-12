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

class Audioplayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playpause: true,
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

  handleSeek = () => {
    this.player.seekTo(parseFloat(this.state.seeking))
  }

  ref = player => {
    this.player = player
  }

  render() {
    
    return (
      <div>
        
        <button onClick={() => this.handlePlayorpause()}>
          Play/Pause
        </button>
        <button onClick={() => this.handleSeek()}>
          Get Duration
        </button>
        <button onClick={() => this.handlePin()}>
          Pincast it!
        </button>
        <h3>Audio player in React</h3>
        <ReactPlayer
          ref={this.ref}
          url= {podcast}
          width="400px"
          height="50px"
          playing={this.state.playpause}
          controls={false}
        />
      </div>
    );
  }

}

export default Audioplayer
  