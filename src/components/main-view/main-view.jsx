import React from "react";
import axios from "axios";

import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

import "./main-view.scss";
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

//componentDidMount to display Movies
  componentDidMount(){
    axios.get("https://haksuly1movieapp.herokuapp.com/movies")
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

/* These following methods let me affect the state of this parent element from interactions within the Child component */
  /* Functions are passed as an attribute into the child component */

//When a movie is clicked, this function is invoked and updates the state of the 'selectedMovie' i.e the property of that movie
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

//When a user sucessfully register
onRegistration(register) {
  this.setState({
    register,
  });
}

//When a user successfully logs in, this function updates the 'user' property in state to that to that 'particular user'
onLoggedIn(user) {
  this.setState({
    user
  });
}

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    if (!registered) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)}/>);

    //If there is no user, the loginView is rendered. If there is a user loggedin, the user details are 'passed as a prop to the LoginView'
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    //Before the nmovies have been loaded
    if (movies.length === 0) return <div className="main-view" />;
  
    //If state of 'sdelectedMovie' is not null, that selected moviewill be returned, otherwise, all movies will be returned.
    return (
      <div className="main-view"> 
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
            //(movie) => { this.setSelectedMovie(movie) }}/>
          ))
        }
      </div>
    );
  }
}

export default MainView 
  

