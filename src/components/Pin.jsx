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
      <Card style={{ width: '18rem', backgroundColor: "#82A7C2", borderColor: "#82A7C2"}}>
      <Card.Body>
      <Card.Title style={{color: "white"}}>{this.props.title}</Card.Title>
      <Card.Subtitle style={{color: "white"}} className="mb-2">{this.props.timestamp}</Card.Subtitle>
      <Card.Text style={{color: "white"}}>
      Pin Text
      </Card.Text>
      <Accordion>
      <Card>
      <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="1">
      Supreme Court
      </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey="1">
      <Card.Body>
      The Supreme Court of the United States (SCOTUS) is the highest court in the federal judiciary of the United States of America. It has ultimate (and largely discretionary) appellate jurisdiction over all federal and state court cases that involve a point of federal law, and original jurisdiction over a narrow range of cases, specifically \"all Cases affecting Ambassadors, other public Ministers and Consuls, and those in which a State shall be Party\".[2] The Court holds the power of judicial review, the ability to invalidate a statute for violating a provision of the Constitution. It is also able to strike down presidential directives for violating either the Constitution or statutory law.[3] However, it may act only within the context of a case in an area of law over which it has jurisdiction. The Court may decide cases having political overtones, but it has ruled that it does not have power to decide non-justiciable political questions.
      </Card.Body>
      </Accordion.Collapse>
      </Card>
      </Accordion>
      </Card.Body>
      </Card>
    )
  }      // </div>
}

export default Pin;
