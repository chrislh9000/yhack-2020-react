import React from "react";
import "../assets/css/App.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Replies extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    //pre-rendering code
    var heightval = this.props.replies.length * 100;
    var heightval = heightval.toString();
    var heightval = heightval.concat("px");
    var lineStyle = {
      borderLeft: "2px solid white",
      height: heightval,
    };
    return (
      <Row display="flex" className="ml-1">
        <div style={lineStyle}></div>

        <Col>
          {this.props.replies.map((reply) => (
            <div id="replies">
              <p
                className="mb-1 title"
                style={{ color: "white", fontSize: "9px" }}
              >
                {reply.user} {reply.time}
              </p>
              <p className="title" style={{ color: "white", fontSize: "12px" }}>
                {reply.reply}
              </p>
              <p
                className="title"
                style={{
                  color: "white",
                  fontSize: "9px",
                  textAlign: "right",
                }}
              >
                Reply
              </p>
            </div>
          ))}
        </Col>
      </Row>
    );
  }
}

export default Replies;
