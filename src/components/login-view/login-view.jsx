import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

//SCSS Import
 import "./login-view.scss";

//React Bootstrap
import { Form, Container, Col, Row, Button, Card, CardGroup } from "react-bootstrap";
export function LoginView(props)  {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Declare hook for each input
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

  // validate user inputs
const validate = () => {
  let isReq = true;
  if(!username){
   setUsernameErr("Username Required");
   isReq = false;
  }else if(username.length < 6){
   setUsernameErr("Username must be at least 6 characters");
   isReq = false;
  }
  if(!password){
   setPasswordErr("Password Required");
   isReq = false;
  }else if(password.length < 8){
   setPassword("Password must be at least 8 characters");
   isReq = false;
  }

  return isReq;
}

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
  if(isReq) {
    //send a request to the server for athentication
    axios.post("https://haksuly1movieapp.herokuapp.com/login", { 
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(error => {
      console.log("no such user")
    });
  }
};
  
  return (
    <Container id="login-form">
      <Row>
        <Col>
          <CardGroup>
            <Card id="login-card">
              <Card.Body>
                <Card.Title id="login-card-title">Please login</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label id="login-form-label">Username</Form.Label>
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)}
                      placeholder="Enter your username" />
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>
                  <Form.Group controlId="formPassword">
                    <Form.Label id="login-form-label">Password</Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password" />
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>
                  <Button id="login-button" variant="primary" type="submit" onClick={handleSubmit}>Login</Button>
                </Form>
                <Card.Text>Not registered yet?</Card.Text>
                <div id="register-container">
                  <Link to="/register">
                    <Button id="link-to-register-button">Register now</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>

  );
}


LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired
};