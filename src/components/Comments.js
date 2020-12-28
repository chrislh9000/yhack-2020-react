import React from "react";
import "../assets/css/App.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Replies from "./Replies";

class Comments extends React.Component {
  constructor(props) {
    super(props);
  }
  comments = [
    {
      comment:
      "The fact that Trump is calling for vote counting to be stopped is frankly ridiculous",
      time: "2h",
      user: "David_Wang",
      replies: [
        {
          reply:
          "I mean I agree that vote counting should be done in principle but Trump is leading by such wide margins in so many states...",
          time: "1h",
          user: "John_Smith",
        },
        {
          reply:
          "He may be leading right now, but the remaining mail-in ballots are expected to heavily favor Biden!",
          time: "28m",
          user: "David_Wang",
        },
      ],
    },
    {
      comment:
      "My name is Christopher Lee Hemm and I would like to come out of the closet! :D",
      time: "28m",
      user: "ChemmLee9000",
      replies: [
        {
          reply: "Same here bro",
          time: "16m",
          user: "Bryce_Clarkson3",
        },
      ],
    },
  ];

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
  }

  pins = this.props.pins
  componentDidMount = (e) => {
    // reorganize pins by Date
    this.pins.sort(function compareNumbers(a, b) {
      return Date(a['date']) > Date(b['date']);
    })
    // only render the first four pins
  }
  render() {
    //pre-rendering code
    return (
      <Row style={{overflowY: 'auto'}}>
      {this.pins.map((item) => (
        <div id="comment" className="mt-4 ml-5 mr-4" style={{}}>
        <p
        className="mb-1 title"
        style={{ color: "white", fontSize: "11px" }}
        >
       {this.timeToStr(item.startTime)} - {this.timeToStr(item.endTime)}
        </p>
        <p
        className="mb-1"
        style={{ color: "white", fontSize: "11px", fontColor: "gray"}}
        >
       Pinned on {String(item.date).substring(0, 10)}
        </p>
        <p className="title" style={{ color: "white", fontSize: "12px" }}>
        {item.text}
        </p>
        </div>
      ))}
      </Row>
    );
  }
}

export default Comments;
