import React from "react";
import "../assets/css/App.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Replies from "./Replies";
import IconButton from "@material-ui/core/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Array(this.props.pins.length).fill(""),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, i) {
    let val = this.state.value;
    val[i] = event.target.value;
    this.setState({ value: val });
  }

  /*
  handleNoteChange initializes the form on the comment to be the existing note of the pin
  item is the pin object and i is the index of the pin relative to all other displayed pins
  */

  // handleNoteChange(event, item, i) {
  //   if (item.note) {
  //     this.setState({ value: item.note, editedPin: i });
  //   } else {
  //     this.setState({ value: "", editedPin: i });
  //   }
  // }

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
        note: this.state.value[index],
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
    this.props.editPin(this.state.value[index], index);
    let val = this.state.value;
    val[index] = "";
    this.setState({ value: val });
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
      return Date(a["date"]) < Date(b["pinDate"]);
    });
    // only render the first four pins
  };
  render() {
    // console.log("=====PINS=======", this.props.pins)
    //pre-rendering code
    return (
      <Row
        className="ml-5 mr-5 comments-scroll"
        style={{ overflowY: "scroll", height: "250px", marginTop: "10%" }}
      >
        {this.props.pins.map((item, i) => (
          <Container
            id="comment"
            className="mt-4 ml-1 mr-1 pl-4 pr-4 pt-3"
            style={{
              background: "transparent",
              borderRadius: "20px",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                onClick={() => this.props.handleDelete(item.startComp)}
                style={{
                  width: "1px",
                  height: "1px",
                  minWidth: "0px",
                  outline: "none",
                  backgroundColor: "transparent",
                  color: "white",
                }}
              >
                x
              </IconButton>
            </div>
            <Row>
              <Col xs={10}>
                <p
                  className="mb-0"
                  style={{
                    color: "white",
                    fontFamily: "Avenir Heavy",
                    fontSize: "10px",
                  }}
                >
                  {this.timeToStr(item.startTime)} -{" "}
                  {this.timeToStr(item.endTime)}
                </p>
              </Col>
            </Row>
            <p
              className="mb-1"
              style={{
                color: "white",
                fontSize: "10px",
                fontFamily: "Avenir Heavy",
              }}
            >
              Pinned on {String(item.date).substring(0, 10)}
            </p>
            <p
              style={{
                color: "white",
                fontSize: "10px",
                fontFamily: "Avenir Medium",
                height: "60px",
                overflow: "scroll",
                marginBottom: "4%",
              }}
            >
              {item.text}
            </p>
            <p
              style={{
                color: "#BAC0E4",
                fontSize: "10px",
                fontFamily: "Avenir Black",
                height: "20px",
                overflow: "scroll",
                marginBottom: "5%",
              }}
            >
              {"Note: " + item.note}
            </p>

            {/* <Form
              style={{ paddingBottom: "10px" }}
              onSubmit={(e) => this.handleSubmit(e, item, i)}
              onKeyDown={(e) => this.initSubmit(e, item, i)}
            >
              <Form.Group>
                <Form.Label style={{ color: "white" }}>Note: </Form.Label>
                {this.state.editedPin === i ? (
                  <Form.Control
                    size="sm"
                    onClick={(e) => this.handleNoteChange(e, item, i)}
                    onChange={this.handleChange}
                    value={this.state.value}
                    // placeholder={item.note}
                    // as="textarea"
                    // rows={2}
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
              </Form.Group>
            </Form> */}
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
                value={this.state.value[i]}
                onChange={(e) => this.handleChange(e, i)}
                placeholder={"Add a Comment"}
                className="mainLoginInput"
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
                onClick={(e) => this.handleSubmit(e, item, i)}
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
          </Container>
        ))}
      </Row>
    );
  }
}

export default Comments;
