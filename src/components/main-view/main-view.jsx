import React from "react";
import axios from "axios";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],

        //{ _id: 1, Title: "Silence of the Lambs", Description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.", ImagePath: "https://www.imdb.com/title/tt0102926/mediaviewer/rm3242988544/?ref_=tt_ov_i"},
        //{ _id: 2, Title: "The Shawshank Redemption", Description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", ImagePath: "https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/?ref_=tt_ov_i"},
        //{ _id: 3, Title: "The Green Mile", Description: "The lives of guards on death row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.", ImagePath: "https://www.imdb.com/title/tt0120689/mediaviewer/rm946247936/?ref_=tt_ov_i"}
      
      selectedMovie: null
    }
  }


//TO TEST componentDidMount to display Movies
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
  

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }


  //TO TEST componentIsUnmounted for Event Listener for "Keyboard press"
  componentDidMount() {
    document.addEventListener("keypress", event => {
      console.log(event.key);
    });
  }



  render() {
    const { movies, selectedMovie } = this.state;
  
    if (movies.length === 0) return <div className="main-view" />; //The list is empty!</div>;
  
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
  

