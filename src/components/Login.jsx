import React from 'react'
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import Row from 'react-bootstrap/Row'
import { Link } from "react-router-dom"


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loggedIn: false,
      user: null,
    };
  }

  handleUsername = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  handlePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleLogin = (e) => {
    console.log("=====LOGGING IN======")
    console.log("username====", this.state.username)
    console.log("password====", this.state.password)
    e.preventDefault();
    fetch('http://localhost:3000/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then((res)=> res.json())
    .then((json) => {
      if (json.success) {
        this.setState({
          loggedIn: true,
          user: json.user,
        });
        console.log("SUCCESSful login")
        console.log(this.state.user);
      } else {
        console.log('error: invalid login info', json.err);
      }
    })
    .catch((err)=> {
      console.log('Error: ', err);
    });
  }

  render() {
    return (
      <div>
      <div>
      <div>
      <Grid container direction="column" alignContent="center" alignItems="center">
      <h1>Login Page</h1>
      <form method="POST">
      <div className="form-group">
      <Input className="form-control" onChange={(e)=> this.handleUsername(e)} value={this.state.username} type="text" placeholder="Username"></Input>
      </div>
      <div className="form-group">
      <Input onChange={(e)=> this.handlePassword(e)} value={this.state.password} className="form-control" type="password" placeholder="Password"></Input>
      </div>
      <Button className="center-block" style={{marginLeft: 50, marginBottom: 10, marginTop: 20}} mini={true} onClick={(e)=>this.handleLogin(e)} variant="contained" color="secondary" method="POST">Login</Button>
      </form>
      <Link to="/register">
      <Button className="center-block" variant="contained" color="primary">Go to Registration</Button>
      </Link>
      <Link to="/discussion">
      <Button style={{marginTop: '10px'}} className="center-block" variant="contained" color="primary">Back to Discussions</Button>
      </Link>
      </Grid>
      </div>
      </div>
      </div>
    )
  }
}

export default Login
