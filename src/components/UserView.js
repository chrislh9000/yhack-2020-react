import React from "react";
import Container from "react-bootstrap/Container";
import "../assets/css/App.css";

class UserView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    //pre-rendering code
    var circleStyle = {
      display: "inline-block",
      // position:'absolute',
      backgroundColor: "#297373",
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
      <div className="container userContainer mb-4">
        <div style={circleStyle}>
          <p className="userLetter">D</p>
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
      </div>
    );
  }
}

export default UserView;
