import React from "react";
import "../assets/css/App.css";
import Button from "react-bootstrap/Button";

class LogoHome extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    //pre-rendering code

    return (
      <Button
        onClick={(e) => this.props.makePin(e)}
        className="butt"
        style={{
          borderRadius: "30px 0px 0px 30px",
          backgroundColor: "#2C3263",
          borderColor: "#2C3263",
        }}
      >
        <img
          style={{ width: 60, height: 60, paddingTop: 10 }}
          src="/whitepin.png"
        />
        <p
          style={{
            color: "white",
            fontSize: 13,
          }}
        >
          PIN IT
        </p>
      </Button>
    );
  }
}

export default LogoHome;
