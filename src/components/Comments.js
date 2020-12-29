import React from "react";
import "../assets/css/App.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Replies from "./Replies";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // comments = [
  //   {
  //     comment:
  //     "The fact that Trump is calling for vote counting to be stopped is frankly ridiculous",
  //     time: "2h",
  //     user: "David_Wang",
  //     replies: [
  //       {
  //         reply:
  //         "I mean I agree that vote counting should be done in principle but Trump is leading by such wide margins in so many states...",
  //         time: "1h",
  //         user: "John_Smith",
  //       },
  //       {
  //         reply:
  //         "He may be leading right now, but the remaining mail-in ballots are expected to heavily favor Biden!",
  //         time: "28m",
  //         user: "David_Wang",
  //       },
  //     ],
  //   },
  //   {
  //     comment:
  //     "My name is Christopher Lee Hemm and I would like to come out of the closet! :D",
  //     time: "28m",
  //     user: "ChemmLee9000",
  //     replies: [
  //       {
  //         reply: "Same here bro",
  //         time: "16m",
  //         user: "Bryce_Clarkson3",
  //       },
  //     ],
  //   },
  // ];

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    const url = "http://localhost:5000/pins/addNote";
    fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id: this.props.pins[this.props.pins.length - 1].startComp,
        note: this.state.value,
      }),
    })
      .then((json) => {
        console.log("hi");
        console.log(json.message);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
    this.props.editPin(this.state.value);
    this.setState({ value: "" });
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
    //pre-rendering code
    return (
      <Row style={{ overflowY: "auto" }}>
        {this.props.pins.map((item) => (
          <div
            id="comment"
            className="mt-4 ml-4 mr-4 pl-4 pr-4 pt-3"
            style={{
              background: "purple",
              borderRadius: "20px",
              width: "100%",
            }}
          >
            <p
              className="mb-1 title"
              style={{ color: "white", fontSize: "11px" }}
            >
              {this.timeToStr(item.startTime)} - {this.timeToStr(item.endTime)}
            </p>
            <p
              className="mb-1"
              style={{ color: "white", fontSize: "11px", fontColor: "gray" }}
            >
              Pinned on {String(item.date).substring(0, 10)}
            </p>
            <p className="title" style={{ color: "white", fontSize: "12px" }}>
              {item.text}
            </p>
            <p className="title" style={{ color: "white", fontSize: "12px" }}>
              Note: {item.note}
            </p>
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
