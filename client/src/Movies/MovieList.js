import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import { Button } from 'reactstrap'; 

function MovieList({ movies }) {
  return (
    <div className="movie-list">
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
      <Link to='/add-movie'>
        <Button color="danger">Add Movie</Button>
      </Link>
    </div>
  );
}

export default MovieList;
