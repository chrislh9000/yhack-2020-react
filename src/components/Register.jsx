import React from 'react'
import ReactDOM from 'react-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import Row from 'react-bootstrap/Row'
import { Link } from "react-router-dom"


class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      password2: "",
    }
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
  handlePassword2 = (e) => {
    this.setState({
      password2: e.target.value
    })
  }

  handleRegister = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/register', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        password2: this.state.password2
      })
    })
    .then((res)=> res.json())
    .then((json) => {
      console.log('successfully registered')
    })
    .catch((err)=> {
      console.log('Error: ', err);
    })
  }

  render() {
    return (
      <div>
      <Grid container direction="column" alignContent="center" alignItems="center">
      <h1>Register</h1>
      <form method="POST">
      <div className="form-group">
      <Input className="form-control" onChange={(e)=> this.handleUsername(e)} value={this.state.username} type="text" placeholder="Username"></Input>
      </div>
      <div className="form-group">
      <Input onChange={(e)=> this.handlePassword(e)} value={this.state.password} className="form-control" type="password" placeholder="Password"></Input>
      </div>
      <div className="form-group">
      <Input onChange={(e)=> this.handlePassword2(e)} value={this.state.password2} className="form-control" type="password" placeholder="Repeat Password"></Input>
      </div>
      <Button style={{marginLeft: 40, marginBottom: 10, marginTop: 20}} variant="contained" color="secondary" onClick={(e)=>this.handleRegister(e)} className="btn btn-primary" method="POST">Sign Up</Button>
      </form>
      <Row style={{display: 'flex', justifyContent: 'center'}}>
      <Link to="/login">
      <Button style={{justifyContent:'center'}} variant="contained" className="btn btn-primary" color="primary">If Already Signed Up, Login</Button>
      </Link>
      </Row>
      </Grid>
      </div>
    )
  }
}

export default Register
