import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//SCSS <Import>
import "./main-view.scss";

//Import React-Router-Dom
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

//React Bootstrap
import { Navbar, Nav, Row, Col } from "react-bootstrap";

//React Components
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
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
      user: null
    };
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

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user")
      });
      this.getMovies(accessToken);
    }
  }

//UPDATED OnLoggedIn metghod
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
  const { movies, user } = this.state;
//with no user logged in LoginView will show if one is logged in the user parameters are passed as prop to LoginView

  
/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/
  return ( 
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

      <Route path="/profile" render={({ history }) => {
        if (!user) {
          return (
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
          );
        }
      return (
        <Col md={8}>
          <ProfileView movies={movies} onBackClick={() => history.goBack()} />
            </Col>
      );
    }} />
          </Row> 
        </Container>
      </Router>  
  );
}    
}

/*
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


    //const { movies, selectedMovie, user, registered } = this.state;

    //If there is no user, the loginView is rendered. If there is a user loggedin, the user details are 'passed as a prop to the LoginView'
    //if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    //if (!registered) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);

    //Before the nmovies have been loaded
    //if (movies.length === 0) return <div className="main-view" />;
  
    //If state of 'sdelectedMovie' is not null, that selected moviewill be returned, otherwise, all movies will be returned.
    return (
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
*/



