import React from 'react';
import '../assets/css/App.css';
import { Link } from 'react-router-dom';
import '../assets/css/App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

class Pin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <Card style={{ width: '18rem', backgroundColor: "#82A7C2", borderColor: "#82A7C2"}}>
      <Card.Body>
      <Card.Title style={{color: "white"}}>{this.props.title}</Card.Title>
      <Card.Subtitle style={{color: "white"}} className="mb-2">{this.props.timestamp}</Card.Subtitle>
      <Card.Text style={{color: "white"}}>
      Pin Text
      </Card.Text>
      </Card.Body>
      </Card>
    )
  }      // </div>
}

export default Pin;
