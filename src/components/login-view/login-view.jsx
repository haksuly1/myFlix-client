import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

//SCSS Import
import "./login-view.scss";

//React Bootstrap
import { Form, Container, Col, Row, Button, Card, CardGroup } from "react-bootstrap";
export function LoginView(props) {
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
    .catch(e => {
      console.log("no such user")
    });
  }
};
  
  return (
    /*
    <div className="login-view">
      <Navbar expand="lg" bg="#5B84B1FF" variant="dark" className="loginNavbar">
      <Container>
      <Navbar.Brand href="#myflix">MyFlixApp</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link href="#profile">Profile</Nav.Link>
          <Nav.Link href="#update-profile">Update Profile</Nav.Link>
          <Nav.Link href="#logout">Logout</Nav.Link>
          </Nav>
      </Container>
      </Navbar>
      */

      <Container className="profile-view" align="center">
        <Row>
          <Col>
            <CardGroup>
              <Card bg="secondary" text="light" border="light">
                <Card.Body>
                  <Card.Title className="text-center">Welcome to myFlixApp login page!</Card.Title>
                   <Card.Subtitle className="mb-2 text-muted text-center">Please Login</Card.Subtitle>
                     <Form >
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter username" value={username}
                    onChange={e => setUsername(e.target.value)} />
                    {usernameErr && <p>{usernameErr}</p>}

              </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password}
                      onChange={e => setPassword(e.target.value)} />
                      {passwordErr && <p>{passwordErr}</p>} 
              </Form.Group>
                <Button variant="light" style={{ color: "white" }} type="submit" onClick={handleSubmit}>Login</Button>
                  <Link to={`/register`} className="float-right">
                    <Button variant="light" style={{ color: "blue" }} type="button">Please click here to Register</Button>
                  </Link>
            </Form>
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
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
};