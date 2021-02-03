import React from "react";
import Container from "react-bootstrap/Container";
import "../assets/css/App.css";

class UserView extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const letter = this.props.user.username[0].toUpperCase()
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
      <div className="container userContainer mb-4" style={{justifyContent:"flex-end", paddingTop:"5%"}}>
        <div style={circleStyle}>
          <p className="userLetter">{letter}</p>
        </div>
        <div
          style={
            {
 
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
