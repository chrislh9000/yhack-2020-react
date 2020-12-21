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
    }
  }

  render() {
    return (
      <Row >
      <Col>
      {this.props.ccText}
      </Col>
      </Row>
    );
  }

}

export default CCC
