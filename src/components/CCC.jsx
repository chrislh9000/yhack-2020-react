import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
// import { Link } from 'react-router-dom'
import '../assets/css/App.css';
import ReactPlayer from 'react-player'
import podcast from '../assets/podcasts/election_audio.mp3'
import IconButton from '@material-ui/core/Button';
import Button from '@material-ui/core/Button'

class CCC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
  }
  toggleHoverEnter = () => {
    this.setState({hover:true})
    this.renderButton()
  }

  toggleHoverLeave = () => {
    this.setState({hover:false})
    this.renderButton()
  }

  handlePlay = () => {
    console.log("handleing button click", this.props.ccID)

    this.props.handleMainComp(this.props.ccID)
  }

  renderButton = () => {
    if (this.state.hover) {
      return <button onClick={this.handlePlay}>></button>
    } else {
      return <div></div>
    }
  }

  render() {
    return (
      <Col onMouseEnter={this.toggleHoverEnter} onMouseLeave={this.toggleHoverLeave}>
        {this.props.ccText}
        {this.renderButton()}
      </Col>
    );
  }

}

export default CCC
