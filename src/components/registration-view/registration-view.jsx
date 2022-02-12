import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//React Bootstrap
import { Navbar, Container, Nav, Form, Button, Card, Container } from "react-bootstrap";
//SCSS Import
import "./registration-view.scss";

export function RegistrationView(props) {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday] = useState('');

  //Declare hook for each imput
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');
  const [ emailErr, setEmailErr ] = useState('');
  const [ birthdayErr, setBirthdayErr ] = useState('');

  //Valiadate user inputs
  const validate = () => {
    let isReq = true;
    if(!username){
      setUsernameErr("Username Required");
      isReq = false;
    }else if(username.length < 2){
      setUsernameErr("Username must be at least 2 characters");
      isReq = false;
    }

    if(!password){
      setPasswordErr("Pasword is Required");
      isReq = false;
    }else if(password.length < 6){
      setPasswordErr("Password must be at least 6 characters");
      isReq = false;
    }

    if(!email){
      setEmailErr("Email must be a valid email");
    }else if(!email.indexOf("@") === -1){
      setEmailErr("Please use valid email");
      isReq = false;
    }

    if(!birthday){
      setBirthdayErr("Please enter Birthday");
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) { 
      console.log(Username, Password);
      //send request to the server for authentication.
    axios.post("https://haksuly1movieapp.herokuapp.com/users", {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      alert("You are now registered, please login!");
      window.open("/", "_self");
    })
    .catch( response => {
      console.error(response);
      alert("Unable to register user")
    });
    //props.onLoggedIn(username);
  }
};

  return (
    <Container>
    <Row>
        <Col>
            <CardGroup>
                <Card>
                    <Card.Body>
                        <Card.Title>Register now!</Card.Title>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
                                {/* code added here to display validation error */}
                                {usernameErr && <p>{usernameErr}</p>}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} minLength="8" placeholder="Your password must be 8 or more characters" />
                                {/* code added here to display validation error */}
                                {passwordErr && <p>{passwordErr}</p>}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
                                {/* code added here to display validation error */}
                                {emailErr && <p>{emailErr}</p>}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Birthday:</Form.Label>
                                <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="Enter birthday" />
                            </Form.Group>

                            <Button variant="outline-light" type="submit" onClick={handleSubmit}>Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </CardGroup>
        </Col>
    </Row>
</Container>
);
}

    /*
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


    <Container fluid style={{paddingTop: "0.75rem"}} className="registrationContainer">
      <Row> 
        <Col>
          <CardGroup> 
             <Card bg="#fc766aff" className="registrationCard"> 
              <Card.Body> 
               <Card.Title className="text-center">Welcome to the registration page</Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-center">Please Register</Card.Subtitle>
                  <Form>
                    <Form.Group controlId="formBasicUsername">
                      <Form.Label>Username</Form.Label>
                       <Form.Control type="text" value={username}
                      onChange={e => setUsername(e.target.value)} required placeholder="Enter username" />
                     {usernameErr && <p>{usernameErr}</p>}
                    <Form.Text className="text-muted">Enter your username.</Form.Text>
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                          <Form.Control type="password" value={password}
                          onChange={e => setPassword(e.target.value)} require
                          minLength="8" placeholder="Password" />
                         <Form.Text className="text-muted">Password must be minimum of 8 characters.</Form.Text>
                          {passwordErr && <p>{passwordErr}</p>}
                          </Form.Group>

                         <Form.Group controlId="formBasicEmail">
                          <Form.Label>Email address</Form.Label>
                            <Form.Control type="text" Value={email}
                            onChange={e => setEmail(e.target.value)} required  placeholder="Enter your email" />
                            {emailErr && <p>{emailErr}</p>}
                            <Form.Text className="text-muted">We'll never share your email with anyone.</Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicBirthday">
                              <Form.Label>Birthday</Form.Label>
                                <Form.Control type="date" Value={birthday}
                                onChange={e => setBirthday(e.target.value)} required  placeholder="Please enter birthday" />
                                {birthdayErr && <p>{birthdayErr}</p>}
                                <Form.Text className="text-muted">We'll never share your email with anyone.</Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicCheckbox">
                                  <Form.Check type="checkbox" label="Confirm action" />
                                </Form.Group>
                                <Button variant="light" style={{ color: "blue" }} type="Register"
                                onClick={handleSubmit}>Register</Button> 

                        </Form>
                        </Card.Body> 
                        </Card>
                        </CardGroup>
                        </Col>
                        </Row>
                    </Container>
               </div>
   );
}
*/

RegistrationView.propTypes = {
  register: PropTypes.shape({
      Username: PropTypes.string.isRequired,
      Password: PropTypes.string.isRequired,
      Email: PropTypes.string.isRequired,
      Birthday: PropsTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func,
};