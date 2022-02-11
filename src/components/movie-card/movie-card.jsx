import React from "react";
import PropTypes from "prop-types";

//SCSS Import
import "./movie-card.scss"

//React Bootstrap
import { Card, Button } from "react-bootstrap";

//React-Router-Dom
import { Link } from "react-router-dom";
export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card bg="secondary" text="light" border="light">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}> 
            <Button variant="link" style={{ color: "blue" }}>Open movie</Button>
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
  onMovieClick: PropTypes.func.isRequired
};
