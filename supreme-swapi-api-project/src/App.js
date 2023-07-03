import React from 'react';
import { useState } from 'react';
import StarWars from '../src/assets/StarWarsPoster.png'
import MoviesList from './components/MoviesList';
import classes from './App.module.css';

function App() {
  const [movies, setMovies] = useState([]);

  async function FetchMoviesHandler() {
    try {
      const response = await fetch('https://swapi.dev/api/films');
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
      console.error('Error fetching movies:', error);
    }
  }

  return (
    <React.Fragment>
      <section>
        <header>
          <div className={classes['main-image']}>
         <img src={StarWars} alt='Star wars logo'/>
         </div>
        </header>
        <button onClick={FetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
