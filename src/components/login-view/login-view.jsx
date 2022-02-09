import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

//SCSS Import
import "./login-view.scss";

//React Bootstrap
import { Navbar, Container, Nav, Form, Button, Card, Container } from "react-bootstrap";
export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
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
    //console.log(username, password);
    //Send a request to the server for authentication 
    //then call props.onLoggedIn(username) 
    //props.onLoggedIn(username);
  };
  

  /*
  const handleSubmit = (e) => {
    e.preventDefault();
    //Send a request to the server for authentication 
    axios.post("https://https://haksuly1movieapp.herokuapp.com/users/movies/login", {
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
  };
*/

  return (
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

      <Container fluid className="loginContainer" >   
        <Card bg="#fc766aff" className="loginCard">
          <Card.Body>
            <Card.Title className="text-center">Welcome to the login page!</Card.Title>
            <Card.Subtitle className="mb-2 text-muted text-center">Please Login</Card.Subtitle>
            <Form >
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  type="text" 
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter a username"
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  className="mb-3" 
                  type="password" 
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter a password"
                />
              </Form.Group>
              <Button className="loginButton" variant="primary" size="lg" type="submit" onClick={handleSubmit}>
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

// Give informational warnings in browser if data does not match required shape
LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
};