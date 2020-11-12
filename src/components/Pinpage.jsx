import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import '../assets/css/App.css';
import Navibar from './Navbar.jsx'

class Pinpage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    //pre-rendering code
    return(
      <div>
      <Navibar />
      <h1> David is Gey </h1>
      </div>
    );
  };
};

export default Pinpage
