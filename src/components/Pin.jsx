import React from 'react';
import '../assets/css/App.css';
import { Link } from 'react-router-dom';
import '../assets/css/App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import IconButton from "@material-ui/core/Button";
// import Card from 'react-bootstrap/Card'
// import Accordion from 'react-bootstrap/Accordion'

class Pin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render () {
    return (
      <IconButton
          style={{ width: "18px", minWidth: "0px" }}
          className="pl-0 pr-0"
        >
          <img
            style={{
              height: 18,
              width: 18,
            }}
            src="/whitepin.png"
          />
      </IconButton>

    )
  }
}

export default Pin;
