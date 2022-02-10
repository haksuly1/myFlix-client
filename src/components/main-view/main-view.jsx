import React from "react";
import axios from "axios";

//SCSS <Import>
import "./main-view.scss";

//React Bootstrap
import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";

//React Components
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
export class MainView extends React.Component {

  constructor(){
    super();
    //initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://haksuly1movieapp.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

/*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie`
   *property to that movie*/
setSelectedMovie(newSelectedMovie) {
  this.setState({
    selectedMovie: newSelectedMovie
  });
}

/*
//When a user successfully logs in, this function updates the 'user' property in state to that to that 'particular user'
onLoggedIn(user) {
  this.setState({
    user
  });
}
*/

//UPDATEV OnLoggedIn metghod
onLoggedIn(authData) {
  console.log(authData);
  this.setState({
    user: authData.user.Username
  });

  localStorage.setItem("token", authData.token);
  localStorage.setItem("user", authData.user.Username);
  this.getMovies(authData.token);
}

onLoggedOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  this.setState({
    user: null
  });
}

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    //If there is no user, the loginView is rendered. If there is a user loggedin, the user details are 'passed as a prop to the LoginView'
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    //if (!registered) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);

    //Before the nmovies have been loaded
    if (movies.length === 0) return <div className="main-view" />;
  
    //If state of 'sdelectedMovie' is not null, that selected moviewill be returned, otherwise, all movies will be returned.
    return (
      <div className="main-view">
        <Navbar expand="lg" bg="#162b48" variant="dark" className="mainNavbar">
        <Container>
        <Navbar.Brand href="#myflix">MyFlixApp</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link href="#profile">Profile</Nav.Link>
            <Nav.Link href="#update-profile">Update Profile</Nav.Link>
            <button className="logoutButton" variant="primary" size="lg" type="logout" onClick={() => { this.onLoggedOut() }}>Logout</button>
            </Nav>
        </Container>
        </Navbar>

        <Row className="main-view justify-content-md-center">
        {selectedMovie
          ? (
            <Col md={8}>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          )
          : movies.map((movie) => (
            <Col md={3} key={movie._id}>
              <MovieCard
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))        
        }
        </Row>
      </div>
    );    
  }
}




