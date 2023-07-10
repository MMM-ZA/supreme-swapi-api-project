import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import StarWars from '../src/assets/StarWarsPoster.png'
import MoviesList from './components/MoviesList';
import classes from './App.module.css';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const FetchMoviesHandler = useCallback(async() =>  {
    setIsLoading(true);
    setError(null)
    try {
      const response = await fetch('https://react-swapi-project-default-rtdb.firebaseio.com/movies.json');
        if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();


      const transformedData = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });

      setMovies(transformedData);

    } catch (error) {
      // Handle error if the fetch or JSON parsing fails
      setError(error.message)
    }
    setIsLoading(false);
  },[]);

  useEffect(() => {
  FetchMoviesHandler();
 },[FetchMoviesHandler])

 function addMovieHandler(movie) {
    fetch('https://react-swapi-project-default-rtdb.firebaseio.com', {
      method: 'POST',
      body: JSON.stringify(movie)
    });
  }

  return (
    <React.Fragment>
      <section>
        <header>
          <div className={classes['main-image']}>
         <img src={StarWars} alt='Star wars logo'/>
         </div>
        </header>
        <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
        <button onClick={FetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section className={classes['list-section']} >
       {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
       {!isLoading && movies.length === 0 && !error && <p>Found no movies</p>}
       {!isLoading && error && <p>{error}</p>}
       {isLoading && <p>Loading...</p> }
      </section>
    </React.Fragment>
  );
}

export default App;
