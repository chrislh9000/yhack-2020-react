import React from 'react';
import '../assets/css/App.css';
import { Link } from 'react-router-dom';
import '../assets/css/App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'

class Pin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <Card style={{ display: "flex", flexDirection: "row", width: '30rem', backgroundColor: "#82A7C2", borderColor: "#82A7C2", marginTop: "30px"}}>
      <Card.Body>
      <Card.Title style={{color: "white"}}>{this.props.title}</Card.Title>
      <Card.Subtitle style={{color: "white"}} className="mb-2">{this.props.timestamp}</Card.Subtitle>
      <Accordion>
      <Card>
      <Card.Header>
      <Accordion.Toggle as={Button} variant="link" style={{color: 'black'}} eventKey="1">
      {this.props.accordion_title}
      </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="1">
      <Card.Body>
      {this.props.accordion_body}
      </Card.Body>
      </Accordion.Collapse>
      </Card>
      </Accordion>
      </Card.Body>
      <img style={{maxHeight: "200px"}}  src={this.props.accordion_img} />
      </Card>

    )
  }      // </div>
}

export default Pin;
