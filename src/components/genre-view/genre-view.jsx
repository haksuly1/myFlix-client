import React from "react";
//import axios from "axios";
import PropTypes from "prop-types";
//import React from React-Router-Dom;
import "./genre-view.scss";
//import { Link } from "react-router-dom";
import { Container, Row, Button, Card } from "react-bootstrap";

import "./genre-view.scss";
export class GenreView extends React.Component {
    
  render() {
        const { genre, onBackClick, movies } = this.props;
   return (

    <Container fluid>
    <Card>
      <Card.Body>
          <Card.Title>Genre</Card.Title>
            <Card.Text>
              <span className="label">Name: </span>
              <span className="value">{genre.Name}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Description: </span>
              <span className="value">{genre.Description}</span>
            </Card.Text>

            <Button variant="outline-light" onClick={() => { onBackClick(); }}>Back</Button>
        </Card.Body>
    </Card>
      <Row>
        {movies.map(movie => (
          <Card className="favorite-movie card-content" key={movie._id} >
            <Card.Img
              className="fav-poster"
              variant="top"
              src={movie.ImagePath} />
              <Card.Body style={{ backgroundColor: "black" }}>
                <Card.Title className="movie_title">
                  {movie.Title}
            </Card.Title>
        </Card.Body>
      </Card>
        ))}
    </Row>
</Container>
);
}
}  

/*
        <Card bg="secondary" text="light" border="light" align="center">
            <Card.Body>
              <Card.Title>Genre</Card.Title>
              <div className="genre-name">
                <span className="label">Name: </span>
                <span className="value">{Genre.Name}</span>
              </div>
              <div className="genre-description">
                <span className="label">Description: </span>
                <span className="value">{Genre.Description}</span>
              </div>
              <Link to={`/`}>
                <Button onClick={() => onBackClick(null)} variant="light" style={{ color: "blue" }}>Back</Button>
              </Link>
          </Card.Body>
        </Card>
     
      </>        
   )
 }
}
*/

GenreView.propTypes = {
    genre: PropTypes.shape({
        Name: PropTypes.string,
        Description: PropTypes.string
    }),
    onBackClick: PropTypes.func.isRequired
};