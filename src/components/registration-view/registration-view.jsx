import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

//React Bootstrap
import { Navbar, Container, Nav, Form, Button, Card, Container } from "react-bootstrap";

//SCSS Import
import "./registration-view.scss";

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://haksuly1movieapp.herokuapp.com/users", {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data)
      window.open("/", "_self");
    })
    .catch(e => {
      console.log("error registering the user")
    });
};

  return (
    <div className="registration-view">
      <Navbar expand="lg" bg="#5B84B1FF" variant="dark" className="registrationNavbar">
      <Container>
      <Navbar.Brand href="#myflix">MyFlixApp</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link href="#profile">Profile</Nav.Link>
          <Nav.Link href="#update-profile">Update Profile</Nav.Link>
          <Nav.Link href="#logout">Logout</Nav.Link>
          </Nav>
      </Container>
      </Navbar>


    <Container fluid className="registrationContainer">
      <Card bg="#fc766aff" className="registrationCard"> 
      <Card.Body> 
        <Card.Title className="text-center">Welcome to the registration page</Card.Title>
        <Card.Subtitle className="mb-2 text-muted text-center">Please Register</Card.Subtitle>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
          <Form.Text className="text-muted">
            Password must be minimum of 8 characters.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Confirm action" />
        </Form.Group>
        <Button variant="primary" type="register">Register</Button>
      </Form>
      </Card.Body> 
      </Card>
    </Container>
    </div>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired
  })
};