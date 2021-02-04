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
      marginRight: "1em",
    };
    return (
      this.props.color == "blue" ?
      <div
        className="container userContainer mb-4"
        style={{ justifyContent: "flex-end" }}
      >
        <div style={circleStyle}>
          <p className="userLetter">{letter}</p>
        </div>
        <div style={{}}>
          <div style={{color: "#173B5C"}} className="userName">{this.props.user.username}</div>
          <div style={{color: "#173B5C"}} className="followers">23 Followers</div>
        </div>
        <Dropdown style={{ borderRadius: "0.5px" }}>
          <Dropdown.Toggle
            style={{
              backgroundColor: "transparent",
              borderColor: "transparent",
              borderRadius: "10px",
              width: "10px",
              padding: "15px",
            }}
            id="dropdown-basic"
          ></Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>Account</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      :       
      <div
      className="container userContainer mb-4"
      style={{ justifyContent: "flex-end" }}
    >
      <div style={circleStyle}>
        <p className="userLetter">{letter}</p>
      </div>
      <div style={{}}>
        <div style={{color: "#173B5C"}}  className="userName">{this.props.user.username}</div>
        <div style={{color: "#173B5C"}}  className="followers">23 Followers</div>
      </div>
      <Dropdown style={{ borderRadius: "0.5px" }}>
        <Dropdown.Toggle
          style={{
            backgroundColor: "transparent",
            borderColor: "transparent",
            borderRadius: "10px",
            width: "10px",
            padding: "15px",
          }}
          id="dropdown-basic"
        ></Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>Account</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
    );
  }
}

export default UserView;
