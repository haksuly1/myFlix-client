
import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
//React-Router-Dom
import { Link } from "react-router-dom";
//React Bootstrap
import { Card, Button } from "react-bootstrap";
//SCSS Import
import "./movie-card.scss"

export class MovieCard extends React.Component {

  render() {
    const { movie } = this.props;
    
    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="primary" color="white" onClick={() => { onBackClick(null); }}>Open Movie</Button>
           
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};




















/*
import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
//React-Router-Dom
import { Link } from "react-router-dom";
//React Bootstrap
import { Card, Button } from "react-bootstrap";
//SCSS Import
import "./movie-card.scss"
export class MovieCard extends React.Component {

  addToFavourites(token, user, movie){
    console.log(user);
    axios.post(`https://haksuly1movieapp.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

   removeFromFavourites(token, user, movie){
    axios.delete(`https://haksuly1movieapp.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  
  render() {
    const { movie, user, token } = this.props;

       return (
      <Card bg="secondary" text="light" border="light">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}> 
            <Button variant="link">Open this movie</Button>
          </Link>          
          <Button variant="link" onClick={this.addToFavourites(token, user, movie)}>Add to Favourites</Button>           
          <Button variant="link" onClick={this.removeFromFavourites(token, user, movie)}>Remove from Favourites</Button>    
        </Card.Body>
      </Card>
    );
  }
} 
  
  /*
  render() {
    const { movie } = this.props;

    return (
      <Card bg="secondary" text="light" border="light">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}> 
            <Button variant="primary" style={{ color: "white" }}>Open movie</Button>
            
          </Link>    
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    ReleaseYear: PropTypes.string,

    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),

    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string,
      Death: PropTypes.string
    }),

  }).isRequired,
  //onMovieClick: PropTypes.func.isRequired
};
*/