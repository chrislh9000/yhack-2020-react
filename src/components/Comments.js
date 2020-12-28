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
  render() {
    //pre-rendering code
    return (
      <Row>
        {this.comments.map((item) => (
          <div id="comment" className="mt-4 ml-5 mr-4">
            <p
              className="mb-1 title"
              style={{ color: "white", fontSize: "11px" }}
            >
              {item.user} {item.time}
            </p>
            <p className="title" style={{ color: "white", fontSize: "12px" }}>
              {item.comment}
            </p>
            <p
              className="title"
              style={{ color: "white", fontSize: "9px", textAlign: "right" }}
            >
              Reply
            </p>
            <Replies replies={item.replies} />
          </div>
        ))}
      </Row>
    );
  }
}

export default Comments;
