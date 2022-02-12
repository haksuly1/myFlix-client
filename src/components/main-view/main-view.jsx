import React from "react";
import axios from "axios";
//Import React-Router-Dom
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
//SCSS <Import>
import "./main-view.scss";
import { Link } from "react-router-dom";
//React Bootstrap
import { Container, Button, Navbar, Row, Col } from "react-bootstrap";
//React Components
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { ProfileView } from "../profile-view/profile-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { NavbarView } from "../navbar-view/navbar-view";
export class MainView extends React.Component {

  constructor(){
    super();
    //initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
        this.setState({
            user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
    }
}

/* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
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

getMovies(token) {
  axios.get("https://haksuly1movieapp.herokuapp.com/movies", {
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

render() {
  const { movies, user } = this.state;

  return ( 
    /*
    <Router> 
      <Navbar bg="secondary" expand="lg" className="mb-4" sticky="top">
          <Navbar.Brand className="ml-4">
            <Link style={{ color: "blue" }} to={"/"}>MyFlixApp</Link>
              </Navbar.Brand>
                {user && (
                  <Navbar.Collapse className="justify-content-end">
                    <Link to={`/users/${user}`} className="mr-2">
                      <Button variant="light" style={{ color: "blue" }}>Profile for {user}</Button>
                    </Link>
                      <Button onClick={() => this.onLoggedOut()} variant="light" style={{ color: "blue" }}>Logout</Button>
                  </Navbar.Collapse> 
              )}
      </Navbar>
      */

<Router>
<NavbarView user={user} />
  <Container>
    <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
          if (!user) return <Col>
            <LoginView  onLoggedIn={user => this.onLoggedIn(user)} />
          </Col>
         if (movies.length === 0) return <div className="main-view" />;
        return movies.map(m => (
          <Col md={3} key={m._id}>
            <MovieCard movie={m} />
          </Col>
        ))
      }} />

      <Route path="/register" render={() => {
        if (user) return <Redirect to="/" />
          return <Col>
              <RegistrationView />
            </Col>
        }} />
      

      <Route path="/login" render={({ match, history }) => {
          if (user) return 
          <Col> 
            <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
          </Col>
        if (movies.length === 0) { return <div className="main-view" />;
      }
         return <Col md={8}>
             <MovieView movie={movies.find(m => m._id === match.params.movieId)}
               onBackClick={() => history.goBack()} />
           </Col>
     }} />

      <Route path="/movies/:movieId" render={({ match, history }) => {
        if (!user) return 
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
          if (movies.length === 0) { return <div className="main-view" />;
       }
          return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)}
                onBackClick={() => history.goBack()} />
            </Col>
      }} />

      <Route path="/profile" render={({ history }) => {
        if (!user) return 
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) { return <div className="main-view" />;
          }
             return <Col md={8}>
                 <MovieView movie={movies.find(m => m._id === match.params.movieId)}
                   onBackClick={() => history.goBack()} />
               </Col>
         }} />
      
      <Route path="/directors/:name" render={({ match, history }) => {
          if (!user) return 
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
        if (movies.length === 0) return <div className="main-view" />;
        return <Col md={8}>
          <DirectorView 
          director={movies.find(m => m.Director.Name === match.params.name).Director}  
          onBackClick={() => history.goBack()}
          movies={movies.filter(movie => movie.Director.Name === match.params.name)} />
        </Col>
      }} />

      <Route path="/genres/:name" render={({ match, history }) => {
        if (!user) return 
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
      if (movies.length === 0) return <div className="main-view" />;
      return <Col md={8}>
          <GenreView
            genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
            onBackClick={() => history.goBack()}
            movies={movies.filter(movie => movie.Genre.Name === match.params.name)}/>
        </Col>
    }} />

      <Route  path="/users/:Username" render={({ history }) => {
        if (!user) return 
          <Col>
            <LoginView onLoggedIn={ (user) => this.onLoggedIn(user) } />
          </Col>
        if (movies.length === 0) return <div className="main-view" />;
        return (
        <Col>
          <ProfileView
         user = {this.state.user}
         movies = {movies}
          onBackClick={() => history.goBack()} />
        </Col>
        )
      }} />

          </Row> 
        </Container>
      </Router>  
  );
}    
}

