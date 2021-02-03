import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import "../assets/css/App.css";

class Usercard extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      isFriend: this.props.isFriend
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.isFriend !== nextProps.isFriend){
      this.setState({isFriend: nextProps.isFriend});
    }
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
      <Card>
        <Card.Header>
        </Card.Header>
        <Card.Body>
          <Card.Title>{this.props.username}</Card.Title>
          { this.state.isFriend ?
            <Button onClick={(e) => this.props.unfriendUser(this.props.user_id)} variant="primary">Unfriend</Button>  :
            <Button onClick={(e) => this.props.friendUser(this.props.user_id)} variant="primary">Friend</Button>
          }
        </Card.Body>
      </Card>
    );
  }
}

export default Usercard;
