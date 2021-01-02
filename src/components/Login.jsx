import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Row from "react-bootstrap/Row";
import { Link, Redirect } from "react-router-dom";
import fs from "fs";
const ipcRenderer = window.require("electron").ipcRenderer;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
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
          this.props.login(json.user);
          console.log("SUCCESSful login", json.user);
          // create a cookie
          console.log("SENDING IPC INPUT=====");
          ipcRenderer.send("createCookie", json.user);

          // session.defaultSession.cookies.get({ url: 'http://www.github.com' })
          // .then((cookies) => {
          // // if there is a matching cookie then chill
          //   console.log(cookies)
          // }).catch((error) => {
          //   console.log(error)
          // })

          // const cookie = { url: 'http://localhost:5000/cookies', name: "test" , value: "test2"}
          // electron.session.defaultSession.cookies.set(cookie)
          // .then(() => {
          //   console.log("==== I MADE A COOKIE=======", cookie)
          // }, (error) => {
          //   console.error(error)
          // })
        } else {
          console.log("error: invalid login info", json.err);
        }
      })
      .catch((err) => {
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
      <div>
        <div>
          <div>
            <Grid
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
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
