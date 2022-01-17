import React from "react";

export class MainView extends React.Component {

  //To add a movies state that will host list of movies
  constructor(){
    super();
    this.state = {
      movies: [
        { _id: "61dbd174a51ffbd65ec81dab", Title: "Silence of the Lambs", Description: "A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.", ImagePath: "https://www.imdb.com/title/tt0102926/mediaviewer/rm3242988544/?ref_=tt_ov_i"},
        { _id: "61dbd193a51ffbd65ec81dac", Title: "The Shawshank Redemption", Description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", ImagePath: "https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/?ref_=tt_ov_i"},
        { _id: "61dbd1b6a51ffbd65ec81dad", Title: "The Green Mile", Description: "The lives of guards on death row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.", ImagePath: "https://www.imdb.com/title/tt0120689/mediaviewer/rm946247936/?ref_=tt_ov_i"}
      ]
    } 
  }
  
/*
  render() {
    return (
      <div className="main-view">
        <div>Silence of the Lambs</div>
        <div>The Shawshank Redemption</div>
        <div>The Green Mile</div>
      </div>
    );
  }
}

export default MainView;
*/


/*
render(); {
  const movies = this.state.movies;
  if (movies.length === 0){
    return <div className="main-view">The list is empty!</div>;
  } else {
    return (
      <div className="main-view">
        {movies.map((movie) => {
          return <div>{movie.Title}</div>;
        })}
      </div>
    );
  }
}
*/

render() {
  const { movies } = this.state;

  if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

  return (
    <div className="main-view">
      {movies.map(movie => <div key={movie._id}>{movie.Title}</div>)}
    </div>
  );
}



  
