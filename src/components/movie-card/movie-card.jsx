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
  addToFavourites(movie, user, token) { 
    axios.post(`https://haksuly1movieapp.herokuapp.com/users/${user}/movies/${movie._id}`, {} , {
      headers: { Authorization: `Bearer ${token}`,
    }
    })
    .then(response => {
      alert(`Added ${movie.Title} to favourites`);
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
            <Button variant="primary" style={{ color: "white" }}>Open movie</Button>            
          </Link>    
          <Button variant="success" style={{ color: "white" }} onClick={() => this.addToFavourites(movie, user, token)}>Add To Favourites</Button>
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
