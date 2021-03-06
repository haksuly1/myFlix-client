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
  }else if(username.length < 4){
   setUsernameErr("Username must be at least 6 characters");
   isReq = false;
  }
  if(!password){
   setPasswordErr("Password Required");
   isReq = false;
  }else if(password.length < 4){
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
      <Container className="login-view" align="center">
        <Row>
          <Col>
            <CardGroup>
            <Card className="card" style={{ width: "1rem" }}>
                <Card.Body>
                  <Card.Title className="text-center">Welcome to myFlixApp login page!</Card.Title>
                   <Card.Subtitle className="mb-2 text-muted text-center">Please Login</Card.Subtitle>
                    
              <Form>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
                {/* code added here to display validation error */}
                {usernameErr && <p>{usernameErr}</p>}
              </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password"  onChange={e => setPassword(e.target.value)} placeholder="Password" />
                   {/* code added here to display validation error */}
                  {passwordErr && <p>{passwordErr}</p>}     
                </Form.Group>

                <div className="mt-3">
                <Button variant="primary" style={{ color: "white" }} type="submit" onClick={handleSubmit}>Login</Button>
                    <Link to={"/register"}> 
                    <Button className='btn' variant='primary' style={{ color: "white" }} type='submit' > Please Register Here </Button> 
                    </Link>
                  </div>
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