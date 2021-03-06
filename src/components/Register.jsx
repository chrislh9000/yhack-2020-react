import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import fs from "fs";
// import { useHistory } from "react-router-dom";
const ipcRenderer = window.require("electron").ipcRenderer;
// import { Redirect } from 'react-router';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      password2: "",
      alerts: [{ text: "" }],
      registered: false,
    };
  }

  handleUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  handlePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  handlePassword2 = (e) => {
    this.setState({
      password2: e.target.value,
    });
  };

  handleRegister = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/register", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        password2: this.state.password2,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        // if false, it means there's already someone signed up with that username
        if (json.success === false) {
          console.log("====MESSAGE=====", json.message);
          let alertObj = { text: json.message };
          let alertArr = this.state.alerts.concat(alertObj);
          this.setState({
            alerts: alertArr,
          });
        } else {
          this.setState({ registered: true });
          console.log("gothere");
        }
        console.log(json.message);
        console.log(this.state.alerts);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  componentDidMount = (e) => {
    console.log("USERNAME=====", this.props.user.username);
    ipcRenderer.send("clearCookies", this.props.user.username);
    this.props.logout();
  };

  render() {
    const alertArr = this.state.alerts.map((alert, i) => (
      <Alert key={i} variant="danger">
        {alert.text}
      </Alert>
    ));
    return (
      <Container
        className="mr-0 ml-0 listening-main"
        fluid
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Col style={{ flex: "1.3", marginLeft: "9%", marginTop: "5%" }}>
          <Row className="mt-4" style={{ alignSelf: "center" }}>
            <p
              style={{
                fontFamily: "Avenir Heavy",
                color: "white",
                fontSize: 40,
                fontWeight: "bold",
                paddingTop: 5,
              }}
            >
              PINCAST
            </p>
            <img
              className="mr-1 mb-5"
              style={{
                width: 80,
                height: 80,
                paddingRight: 3,
                paddingBottom: 2,
                paddingTop: 3,
              }}
              src="/logo.png"
            />
          </Row>
          <p
            style={{
              fontFamily: "Avenir Black",
              color: "white",
              fontSize: "20px",
              marginTop: "10vh",
            }}
          >
            Create Your Account
          </p>
          <form
            style={{
              width: "400px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <input
              className="mainLoginInput"
              type="text"
              onChange={(e) => this.handleUsername(e)}
              value={this.state.username}
              placeholder={"Username"}
              style={{
                marginTop: "3vh",
                backgroundColor: "transparent",
                marginBottom: "2%",
                marginRight: "10%",
                borderTop: "0px",
                borderLeft: "0px",
                borderBottom: "0.1px solid white",
                outline: "none",
                borderRight: "0px",
                color: "white",
                fontFamily: "Avenir Medium",
                fontSize: "12px",
                width: "100%",
              }}
            />
            <input
              className="mainLoginInput"
              onChange={(e) => this.handlePassword(e)}
              value={this.state.password}
              placeholder={"Password"}
              type="password"
              style={{
                backgroundColor: "transparent",
                marginTop: "7vh",
                marginBottom: "2%",
                marginRight: "10%",
                borderTop: "0px",
                borderLeft: "0px",
                borderBottom: "0.1px solid white",
                outline: "none",
                borderRight: "0px",
                color: "white",
                fontFamily: "Avenir Medium",
                fontSize: "12px",
                width: "100%",
              }}
            />
            <input
              className="mainLoginInput"
              placeholder={"Retype Password"}
              type="password"
              onChange={(e) => this.handlePassword2(e)}
              value={this.state.password2}
              style={{
                backgroundColor: "transparent",
                marginTop: "7vh",
                marginBottom: "2%",
                marginRight: "10%",
                borderTop: "0px",
                borderLeft: "0px",
                borderBottom: "0.1px solid white",
                outline: "none",
                borderRight: "0px",
                color: "white",
                fontFamily: "Avenir Medium",
                fontSize: "12px",
                width: "100%",
              }}
            />
            <Row
              className="mr-0 ml-0"
              style={{
                marginTop: "3vh",
                // alignSelf: "flex-end",
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {this.state.registered ? (
                <p
                  style={{
                    fontFamily: "Avenir Medium",
                    fontSize: "12px",
                    color: "white",
                  }}
                >
                  Successfully Registered
                </p>
              ) : (
                <p
                  style={{
                    fontFamily: "Avenir Medium",
                    fontSize: "12px",
                    color: "red",
                  }}
                >
                  {this.state.alerts[this.state.alerts.length - 1].text}
                </p>
              )}
              <p
                style={{
                  fontFamily: "Avenir Medium",
                  fontSize: "12px",
                  color: "white",
                }}
              >
                Already have an account? <Link to="/login">Login Here</Link>
              </p>
              <input
                type="submit"
                value="Sign Up"
                onClick={(e) => this.handleRegister(e)}
                method="POST"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid #688095",
                  width: "75px",
                  height: "25px",
                  fontSize: "10px",
                  fontFamily: "Avenir Medium",
                  color: "white",
                  borderRadius: "3px",
                  outline: "none",
                  alignSelf: "flex-end",
                }}
              />
            </Row>
          </form>
        </Col>
        <Col style={{ flex: "1" }}></Col>
      </Container>

      //     <div>
      //       <Grid
      //         container
      //         direction="column"
      //         alignContent="center"
      //         alignItems="center"
      //       >
      //         <h1>Register</h1>
      //         {alertArr}
      //         <form method="POST">
      //           <div className="form-group">
      //             <Input
      //               className="form-control"
      //               onChange={e => this.handleUsername(e)}
      //               value={this.state.username}
      //               type="text"
      //               placeholder="Username"
      //             ></Input>
      //           </div>
      //           <div className="form-group">
      //             <Input
      //               onChange={e => this.handlePassword(e)}
      //               value={this.state.password}
      //               className="form-control"
      //               type="password"
      //               placeholder="Password"
      //             ></Input>
      //           </div>
      //           <div className="form-group">
      //             <Input
      //               onChange={e => this.handlePassword2(e)}
      //               value={this.state.password2}
      //               className="form-control"
      //               type="password"
      //               placeholder="Repeat Password"
      //             ></Input>
      //           </div>
      //           <Button
      //             style={{ marginLeft: 40, marginBottom: 10, marginTop: 20 }}
      //             variant="contained"
      //             color="secondary"
      //             onClick={e => this.handleRegister(e)}
      //             className="btn btn-primary"
      //             method="POST"
      //           >
      //             Sign Up
      //           </Button>
      //         </form>
      //         <Row style={{ display: "flex", justifyContent: "center" }}>
      //           <Link to="/login">
      //             <Button
      //               style={{ justifyContent: "center" }}
      //               variant="contained"
      //               className="btn btn-primary"
      //               color="primary"
      //             >
      //               If Already Signed Up, Login
      //             </Button>
      //           </Link>
      //         </Row>
      //       </Grid>
      //     </div>
      //   );
      // }
    );
  }
}

export default Register;
