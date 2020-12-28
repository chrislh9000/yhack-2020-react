import React from "react";
import ReactDOM from "react-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../assets/css/App.css";
import ReactPlayer from "react-player";
import IconButton from "@material-ui/core/Button";
import NonExtendedPin from './NonExtendedPin'
import ExtendedPin from './ExtendedPin'

class PinCard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        extended:false
      };
    }
    
    handleExtendPin = () => {
      this.setState({extended: !this.state.extended})
    }

    render() {
      return (
        <Row>
          <IconButton
            style={{
              width: "20px",
              minWidth: "0px",
              outline: "none",
              backgroundColor: "transparent",
            }}
            onClick={this.handleExtendPin}
            className="pl-0 pr-0"
            disableTouchRipple={true}
          >
            <img
              style={{
                height: 20,
                width: 20,
              }}
              src="/whitepin.png"
            />
          </IconButton>
          <div className="pl-4">{this.state.extended ? 
            <ExtendedPin 
            text={this.props.text}
            key={this.props.key}
            time={this.props.time}
            note={this.props.note}
            /> : <NonExtendedPin 
            text={this.props.text}
            key={this.props.key}
            time={this.props.time}
            note={this.props.note}
            />}
          </div>
        </Row>
      );
    }
  }
  
  export default PinCard;