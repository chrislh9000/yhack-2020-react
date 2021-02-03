import React from "react";
import Container from "react-bootstrap/Container";
import "../assets/css/App.css";
import Dropdown from "react-bootstrap/Dropdown";

class UserView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const letter = this.props.user.username[0].toUpperCase();
    //pre-rendering code
    var circleStyle = {
      display: "inline-block",
      // position:'absolute',
      backgroundColor: "#3c5a75",
      borderRadius: "50%",
      width: 45,
      height: 45,
      left: 0,
      top: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "1em"
    };
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end"
        }}
        className="container userContainer mb-4"
      >
        <div style={circleStyle}>
          <p className="userLetter">{letter}</p>
        </div>
        <div
          style={
            {
              // display: "flex",
              // flexDirection: "column",
              // alignSelf: "center",
            }
          }
        >
          <div className="userName">{this.props.user.username}</div>
          <div className="followers">23 Followers</div>
        </div>
        <Dropdown style={{borderRadius: "0.5px"}}>
            <Dropdown.Toggle
              style={{
                backgroundColor: "#6D8398",
                borderColor: "#6D8398",
                borderRadius: "10px",
                width: "2px"
              }}
              id="dropdown-basic"
            ></Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Edit Length</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Edit Comment</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Delete Pin</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      </div>
    );
  }
}

export default UserView;
