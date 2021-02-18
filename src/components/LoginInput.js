import React from "react";
import "../assets/css/App.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/Button";
import AudioBar from "./AudioBar";
import { useHistory, Link, withRouter } from "react-router-dom";
import history from "./history";

class PlayBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <form
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={(e) => this.handleSubmit(e, item, i)}
        onKeyDown={(e) => this.initSubmit(e, item, i)}
      >
        <input
          type="text"
          value={item.note}
          onChange={this.handleChange}
          placeholder={"Add a Comment"}
          style={{
            backgroundColor: "transparent",
            marginBottom: "2%",
            marginRight: "10%",
            borderTop: "0px",
            borderLeft: "0px",
            borderBottom: "0.1px solid white",
            outline: "none",
            borderRight: "0px",
            color: "white",
            fontFamily: "Avenir Medium",
            fontSize: "12px",
            width: "100%",
          }}
        />
        <input
          type="submit"
          value="Submit"
          onClick={(e) => this.handleNoteChange(e, item, i)}
          style={{
            backgroundColor: "transparent",
            border: "1px solid #688095",
            width: "75px",
            height: "25px",
            fontSize: "10px",
            fontFamily: "Avenir Medium",
            color: "white",
            borderRadius: "3px",
            outline: "none",
            alignSelf: "flex-end",
          }}
        />
      </form>
    );
  }
}

export default PlayBar;
