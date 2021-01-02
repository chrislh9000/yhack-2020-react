import React from "react";
import "../assets/css/App.css";
import { Link } from "react-router-dom";
import "../assets/css/App.css";
import Button from "react-bootstrap/Button";
import IconButton from "@material-ui/core/Button";

class PinIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleDeleteFunction = () =>{
    this.props.handleDelete(this.props.ccID)
  }
  render() {
    return (
      <IconButton
        style={{ width: "18px", minWidth: "0px" }}
        className="pl-0 pr-0"
        onClick={this.handleDeleteFunction}
      >
        <img
          style={{
            height: 18,
            width: 18,
          }}
          src="/whitepin.png"
        />
      </IconButton>
    );
  }
}

export default PinIcon;
