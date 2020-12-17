import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import '../assets/css/App.css';


class Navibar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    //pre-rendering code
    return(
      <Navbar style={{backgroundColor: '#F6F7FF'}}>
      <Container fluid style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Col sm={2} className = "navbar_logo_container">
        <img className="navbar_logo" src="/home.png" alt="home"/>
        <p style={{alignItems: 'center'}}> Home </p>
        </Col>

        <Col sm={2} className="navbar_logo_container">
        <img className="navbar_logo" src="/search.png" />
        <p> Search </p>
        </Col>

        <Col sm={2} className="navbar_logo_container">
        <img className="playlist_logo" src="/playlist.png" />
        </Col>

        <Col sm={2} className="navbar_logo_container">
        <Link className="navbar_logo_container" to="/pins_page">
        <img className="navbar_logo" src="/pincast.png" />
        <p style={{alignItems: 'center', color: 'black'}}> Pin </p>
        </Link>
        </Col>

        <Col sm={2} className="navbar_logo_container">
        <img className="navbar_logo" src="/profile.png" />
        <p style={{alignItems: 'center'}}> Profile </p>
        </Col>
        </Container>
      </Navbar>
    );
  };
};

export default Navibar
