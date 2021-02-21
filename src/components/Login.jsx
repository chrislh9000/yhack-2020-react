import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Row from "react-bootstrap/Row";
import { Link, Redirect } from "react-router-dom";
import fs from "fs";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
const ipcRenderer = window.require("electron").ipcRenderer;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loginvalid: true,
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

  handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/login", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          localStorage.clear();
          this.props.login(json.user);
          console.log("SUCCESSful login", json.user);
          let userObj = json.user;
          userObj["password"] = this.state.password;
          // create a cookie
          // ipcRenderer.send("clearCookies", "")
          ipcRenderer.send("createCookie", userObj);
          this.setState({ loginvalid: true });
        } else {
          console.log("error: invalid login info", json.err);
          this.setState({ loginvalid: false });
        }
      })
      .catch((err) => {
        console.log("====== ERROR LOGGING IN======");
        console.log("Error: ", err);
      });
  };

  componentDidMount = (e) => {
    console.log("SENDING IPC INPUT=====");
    ipcRenderer.send("asynchronous-message", "ping");
  };

  render() {
    ipcRenderer.on("asynchronous-reply", (event, arg) => {
      console.log(arg); // prints "pong"
    });
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
            Welcome Back!
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
              type="username"
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
              type="password"
              onChange={(e) => this.handlePassword(e)}
              value={this.state.password}
              placeholder={"Password"}
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
              {this.state.loginvalid ? null : (
                <p
                  style={{
                    fontFamily: "Avenir Medium",
                    fontSize: "12px",
                    color: "red",
                  }}
                >
                  Incorrect Username or Password
                </p>
              )}
              <p
                style={{
                  fontFamily: "Avenir Medium",
                  fontSize: "12px",
                  color: "white",
                }}
              >
                Don't have an account? <Link to="/register">Sign Up Here</Link>
              </p>
              <input
                type="submit"
                value="Login"
                onClick={(e) => this.handleLogin(e)}
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
        <Col
          style={{
            flex: "1",
            marginRight: "10%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              fontFamily: "Avenir Black",
              color: "white",
              fontSize: "20px",
              marginTop: "18vh",
            }}
          >
            Featured Podcasts
          </p>
          <Row>
            <img
              alt="play"
              className="ml-3 mt-3 mb-3 podcast_thumbnail"
              style={{
                height: 150,
                width: 150,
                borderRadius: 5,
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                marginRight: "50px",
              }}
              src="/TheDaily.png"
            />
            <img
              alt="play"
              className="ml-3 mt-3 mb-3 podcast_thumbnail"
              style={{
                height: 150,
                width: 150,
                borderRadius: 5,
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                marginRight: "50px",
              }}
              src="/npr_planetmoney.jpg"
            />
            <img
              alt="play"
              className="ml-3 mt-3 mb-3 podcast_thumbnail"
              style={{
                height: 150,
                width: 150,
                borderRadius: 5,
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                marginRight: "50px",
              }}
              src="/npr_howibuiltthis.jpg"
            />
            <img
              alt="play"
              className="ml-3 mt-3 mb-3 podcast_thumbnail"
              style={{
                height: 150,
                width: 150,
                borderRadius: 5,
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                marginRight: "50px",
              }}
              src="/TheDaily.png"
            />
          </Row>
          <p
            style={{
              fontFamily: "Avenir Black",
              color: "white",
              fontSize: "20px",
              marginTop: "5vh",
              alignSelf: "flex-end",
              marginRight: "100px",
            }}
          >
            ...and more
          </p>
        </Col>
        {/* <Grid
          container
          direction="column"
          alignContent="center"
          alignItems="center"
        >
          <h1>Login Page</h1>
          <form method="POST">
            <div className="form-group">
              <Input
                className="form-control"
                onChange={(e) => this.handleUsername(e)}
                value={this.state.username}
                type="text"
                placeholder="Username"
              ></Input>
            </div>
            <div className="form-group">
              <Input
                onChange={(e) => this.handlePassword(e)}
                value={this.state.password}
                className="form-control"
                type="password"
                placeholder="Password"
              ></Input>
            </div>
            <Button
              className="center-block"
              style={{ marginLeft: 50, marginBottom: 10, marginTop: 20 }}
              mini={true}
              onClick={(e) => this.handleLogin(e)}
              variant="contained"
              color="secondary"
              method="POST"
            >
              Login
            </Button>
          </form>
          <Link to="/register">
            <Button
              className="center-block"
              variant="contained"
              color="primary"
            >
              Go to Registration
            </Button>
          </Link>
          <Link to="/discussion">
            <Button
              style={{ marginTop: "10px" }}
              className="center-block"
              variant="contained"
              color="primary"
            >
              Back to Discussions
            </Button>
          </Link>
        </Grid> */}
      </Container>
    );
  }
}

export default Login;
