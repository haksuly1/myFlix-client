import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Card, Button, Row } from "react-bootstrap";

import "./director-view.scss";

export class DirectorView extends React.Component {
    
  render() {
        const { Director, onBackClick } = this.props;

        return (
            <Container fluid>
                <Card bg="secondary" text="light" border="light" align="center">
                    <Card.Body>
                    <Card.Title>Director</Card.Title>
                    <Card.Text> 

                        <span className="label">Name: </span>
                        <span className="value">{Director.Name}</span>
                    </Card.Text>

                    <Card.Text>
                        <span className="label">Bio: </span>
                        <span className="value">{Director.Bio}</span>
                    </Card.Text>

                    <Card.Text>
                            <span className="label">Birth: </span>
                            <span className="value">{Director.Birth}</span>
                        </Card.Text>

                        <Card.Text>
                            <span className="label">Death: </span>
                            <span className="value">{Director.Death}</span>
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

    DirectorView.propTypes = {
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired,
            Birthyear: PropTypes.string,
            Deathyear: PropTypes.string
          }),
          onBackClick: PropTypes.func.isRequired
      };