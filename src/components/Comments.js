import React from "react";
import "../assets/css/App.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Replies from "./Replies";
import IconButton from "@material-ui/core/Button";
import Form from "react-bootstrap/Form";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      editedPin: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  /*
  handleNoteChange initializes the form on the comment to be the existing note of the pin
  item is the pin object and i is the index of the pin relative to all other displayed pins
  */

  handleNoteChange(event, item, i) {
    if (item.note) {
      this.setState({ value: item.note, editedPin: i });
    } else {
      this.setState({ value: "", editedPin: i });
    }
  }

  initSubmit(e, pin, index) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.handleSubmit(e, pin, index);
    }
  }

  handleSubmit(event, pin, index) {
    // update pin note in the database
    const url = "http://localhost:5000/pins/addNote";
    fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ccId: pin.startComp,
        episode: this.props.episode._id,
        id: this.props.user._id,
        note: this.state.value,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json.message);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
    // update the pin note in real-time in the application
    this.props.editPin(this.state.value, index);
  }

  timeToStr = (duration) => {
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
  };

  pins = this.props.pins;
  componentDidMount = (e) => {
    // reorganize pins by Date
    this.pins.sort(function compareNumbers(a, b) {
      return Date(a["date"]) > Date(b["date"]);
    });
    // only render the first four pins
  };
  render() {
    // console.log("=====PINS=======", this.props.pins)
    //pre-rendering code
    return (
      <Row style={{ overflowY: "auto" }}>
        {this.props.pins.map((item, i) => (
          <div
            id="comment"
            className="mt-4 ml-4 mr-4 pl-4 pr-4 pt-3"
            style={{
              background: "purple",
              borderRadius: "20px",
              width: "100%",
            }}
          >
            <Row>
              <Col xs={10}>
                <p
                  className="mb-1 title"
                  style={{ color: "white", fontSize: "11px" }}
                >
                  {this.timeToStr(item.startTime)} -{" "}
                  {this.timeToStr(item.endTime)}
                </p>
              </Col>
              <Col xs={2}>
                <IconButton
                  onClick={() => this.props.handleDelete(item.startComp)}
                  style={{
                    width: "1px",
                    height: "1px",
                    minWidth: "0px",
                    outline: "none",
                    backgroundColor: "transparent",
                  }}
                >
                  x
                </IconButton>
              </Col>
            </Row>
            <p
              className="mb-1"
              style={{ color: "white", fontSize: "11px", fontColor: "gray" }}
            >
              Pinned on {String(item.date).substring(0, 10)}
            </p>
            <p className="title" style={{ color: "white", fontSize: "12px" }}>
              {item.text}
            </p>
            <Form
              style={{ paddingBottom: "10px" }}
              onSubmit={(e) => this.handleSubmit(e, item, i)}
              onKeyDown={(e) => this.initSubmit(e, item, i)}
            >
              <Form.Label style={{ color: "white" }}>Note: </Form.Label>
              {this.state.editedPin === i ? (
                <Form.Control
                  size="sm"
                  onClick={(e) => this.handleNoteChange(e, item, i)}
                  onChange={this.handleChange}
                  value={this.state.value}
                  placeholder={item.note}
                  as="textarea"
                  rows={2}
                />
              ) : (
                <Form.Control
                  type="text"
                  size="sm"
                  onClick={(e) => this.handleNoteChange(e, item, i)}
                  onChange={this.handleChange}
                  value={item.note}
                  placeholder={item.note}
                />
              )}
            </Form>
          </div>
        ))}
        <div
          id="note-input"
          className="mt-4 mb-4 ml-4 mr-4 pl-4 pr-4 pt-3 pb-3"
          style={{ background: "blue", borderRadius: "20px", width: "100%" }}
        >
          <form style={{ width: "100%" }} onSubmit={this.handleSubmit}>
            <label style={{ color: "white" }}>Note:</label>
            <input
              style={{ width: "100%" }}
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </form>
        </div>
      </Row>
    );
  }
}

export default Comments;
