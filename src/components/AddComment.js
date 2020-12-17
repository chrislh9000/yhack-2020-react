import React from "react";
import "../assets/css/App.css";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import TextField from "@material-ui/core/TextField";

class AddComment extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Row style={{ height: "15%" }}>
        <Container
          style={{
            borderRadius: "30px 30px 0px 0px",
            backgroundColor: "#7597B0",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            boxShadow: "0px -4px 3px rgba(50, 50, 50, 0.35)",
          }}
        >
          <TextField
            id="first-name"
            label="Add Comment"
            style={{ width: "80%" }}
          />
        </Container>
      </Row>
    );
  }
}

export default AddComment;
