import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
//React-Router-Dom
import { Link } from "react-router-dom";
//React-bootstrap
import { Container, Row, Col, Button } from "react-bootstrap";
//SCSS Import
import "./movie-view.scss";
export class MovieView extends React.Component {

keypressCallback(event) {
  console.log(event.key);
}

componentDidMount() {
  document.addEventListener("keypress", this.keypressCallback);
}

componentWillUnmount() {
  document.removeEventListener("keypress", this.keypressCallback);
}

  render() { 
    const { movie, onBackClick } = this.props;

    return (
      <Container fluid className="moviesContainer">
      <Row>
        <Col>
          <div className="movie-view">
            <div className="movie-poster">
              <img src={movie.ImagePath} crossOrigin="true" />
          </div>

        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>

        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>

        <div className="movie-releaseyear">
          <span className="label">Release Year: </span>
          <span className="value">{movie.ReleaseYear}</span>
        </div>

        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">{movie.Genre.Name}</Button>
          </Link>
        </div>

        <div className="movie-genre">
          <span className="label">Description: </span>
          <span className="value">{movie.Genre.Description}</span>
        </div>

        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">{movie.Director.Name}</Button>
          </Link>
        </div>

        <div className="director-bio">
          <span className="director">Bio: </span>
          <span className="value">{movie.Director.Bio}</span>
        </div>

        <div className="director-birth">
          <span className="director">Birth: </span>
          <span className="value">{movie.Director.Birth}</span>
        </div>

        <div className="director-death">
          <span className="director">Death: </span>
          <span className="value">{movie.Director.Death}</span>
        </div>

        <Button variant="primary" onClick={() => onBackClick(null)}>Back</Button>  

        </div>
      </Col>
    </Row>
  </Container>
);
}
}


MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,

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

    Featured: PropTypes.bool,
    ReleaseYear: PropTypes.string,
    ImagePath: PropTypes.string.isRequired

    }).isRequired,
    onBackClick: PropTypes.func.isRequired
  };
    