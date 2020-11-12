import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import '../assets/css/App.css';
import Navibar from './Navbar.jsx'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Search from './SearchPage'
import SearchBar from './SearchBar'

class Discussion extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    //pre-rendering code
    return(
      <Container fluid className="discussion_background" style={{backgroundColor: "#353B74"}}>
      <Row>
      <Col id="far_left" xs={3} style={{display: "flex", alignItems: "center", flexDirection: "column", backgroundColor: "#5C719B"}}>
      <Row>
      <p style={{color: "white", fontSize:"30px"}}>PINCAST</p>
      </Row>
      <Row>
      <Search />
      </Row>
      <Container style={{padding: "50px"}}>
      <Row>
      <p style={{color: "white", fontSize:"25px"}}>David Wang</p>
      </Row>
      <Row>
      <p style={{color: "white", fontSize:"25px"}}>Home</p>
      </Row>
      <Row>
      <p style={{color: "white", fontSize:"25px"}}>Search</p>
      </Row>
      <Row>
      <p style={{color: "white", fontSize:"25px"}}>Pins</p>
      </Row>
      <Row>
      <p style={{color: "white", fontSize:"25px"}}>Profile</p>
      </Row>
      <Row>
      <p style={{color: "white", fontSize:"25px"}}>Saved Podcastss</p>
      </Row>
      <Row>
      <p style={{color: "white", fontSize:"25px"}}>Followed</p>
      </Row>
      <Row>
      <p style={{color: "white", fontSize:"25px"}}>Discovered</p>
      </Row>
      <Row>
      <p style={{color: "white", fontSize:"25px"}}>New Releases</p>
      </Row>
      </Container>
      </Col>
      <Col id="middle" xs={4} style={{backgroundColor: "#4F57AA", boxShadow: "10px 10px 10px rgb(85, 84, 84), opacity: 0.6"}}>
      <div style={{height: "100px"}}>
      <p style={{color: "white", fontSize: "20px", padding: "30px", paddingRight: "200px", overFlow: "scroll", height: "100px"}}> Hello dog my name is ... David Wang  Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
       Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
        Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
         Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
          Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
           Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
            Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
             Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
              Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
               Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
                Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
                 Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
                  Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
                   Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
       </p>
       </div>
      </Col>
      <Col id="far_right" xs={4} style={{marginLeft: "8%", backgroundColor: "#82A7C2"}}>
      <Row>
      <p style={{color: "white", fontSize: "20px", padding: "30px", paddingRight: "200px"}}> Hello dog my name is ... David Wang  Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
       Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
        Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
         Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
          Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
           Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
            Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
             Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
              Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
               Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
                Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
                 Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
                  Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
                   Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang Hello dog my name is ... David Wang
       </p>
       </Row>
       <Row>
       <Container style={{height: "150px", backgroundColor: "#7597B0", display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: "center", boxShadow: "10px 10px 10px rgb(85, 84, 84), opacity: 0.6"}}>
       <SearchBar />
       </Container>
       </Row>
      </Col>
      </Row>
      </Container>



    );
  };
};

export default Discussion
