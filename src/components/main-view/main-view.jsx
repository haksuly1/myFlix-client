
import React from "react";
import axios from "axios";
import { connect } from 'react-redux';
//imports the relevant actions (setMovies). Used in rendering {movies} this.props and {user} this.state
import { setMovies } from '../../actions/actions';
// we haven't written this one yet
import MoviesList from '../movies-list/movies-list';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { LoginView } from "../login-view/login-view";
//MovieCaard removed to be imported and used in the MoviesList component
//import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { RegistrationView } from "../registration-view/registration-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavbarView } from '../navbar-view/navbar-view';
import { Row, Col, Navbar, Button } from "react-bootstrap";

//Note that "export" word is removed from below to allow use of redux
class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
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

  //Edited to allow use of Redux
  getMovies(token) {
    axios.get("https://haksuly1movieapp.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /*When a user successfully logs in, this function updates the `user` property in state to that particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
      favouriteMovies: authData.user.FavouriteMovies,
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
  //const { movies, user } = this.state;
  let { movies } = this.props;
  let { user } = this.state;

  
    return (
      <Router>

        <Button id="logout-button" onClick={() => { this.onLoggedOut() }}>Logout</Button>

        <Row>
          <NavbarView user={user} />
        </Row>

        <Row className="main-view justify-content-md-center">

          <Route exact path="/" render={() => {
            if (!user) {
              return <Redirect to="/login" />;
            }

            return movies.map(m => (
              <Col md={4} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />

          <Route exact path="/login" render={() => {
            if (user) {
              return <Redirect to="/" />;
            }
            return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
          }} />

          <Route exact path="/register" render={() => {
            if (user) {
              return <Redirect to="/" />;
            }
            return (
              <Col>
                <RegistrationView />
              </Col>
            );
          }} />

          <Route exact path="/movies/:movieId" render={({ match, history }) => {
            if (!user) {
              return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              );
            }

            if (movies.length === 0) {
              return <div className="movie-view" />;
            }

            return (

              <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)}
                  onBackClick={() => history.goBack()} />
              </Col>
            );
          }} />

          <Route exact path="/profile" render={({ history }) => {
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

          <Route path="/genre/:name" render={({ match, history }) => {
            if (!user) {
              return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              );
            }

            if (movies.length === 0) {
              return <div className="movie-view" />;
            }

            return (
              <Col md={8}>
                <GenreView
                  genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                  onBackClick={() => history.goBack()}
                  movies={movies.filter(movie => movie.Genre.Name === match.params.name)} />
              </Col>
            );
          }} />

          <Route exact path="/director/:name" render={({ match, history }) => {
            if (!user) {
              return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              );
            }

            if (movies.length === 0) {
              return <div className="movie-view" />;
            }

            return (
              <Col md={8}>
                <DirectorView
                  director={movies.find(m => m.Director.Name === match.params.name).Director}
                  onBackClick={() => history.goBack()}
                  movies={movies.filter(movie => movie.Director.Name === match.params.name)} />
              </Col>
            );
          }} />

          <Route path={`/users/${user}`} render={({ history }) => {
            if (!user)
              return <Redirect to="/" />
            return <Col>
              <ProfileView user={user}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);