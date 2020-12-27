import React from "react";
import "../assets/css/App.css";
import { Link } from "react-router-dom";
import "../assets/css/App.css";
import Button from "react-bootstrap/Button";
import IconButton from "@material-ui/core/Button";

class TextPlayButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <IconButton
        style={{
          width: "20px",
          minWidth: "0px",
          outline: "none",
          backgroundColor: "transparent",
        }}
        onClick={this.props.handlePlay}
        className="pl-0 pr-0"
        disableTouchRipple={true}
      >
        <img
          style={{
            height: 20,
            width: 20,
          }}
          src="/ccPlay.png"
        />
      </IconButton>
    );
  }
}

export default TextPlayButton;
