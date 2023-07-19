import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import StarWars from '../src/assets/StarWarsPoster.png'
import Logo from '../src/assets/logo.svg'
// import Film from '../src/assets/film.svg'
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

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);

      // const transformedData = data.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     openingText: movieData.opening_crawl,
      //     releaseDate: movieData.release_date,
      //   };
      // });

      // setMovies(transformedData);

    } catch (error) {
      // Handle error if the fetch or JSON parsing fails
      setError(error.message)
    }
    setIsLoading(false);
  },[]);

  useEffect(() => {
  FetchMoviesHandler();
 },[FetchMoviesHandler])

 async function addMovieHandler(movie) {
    const response = await fetch('https://react-swapi-project-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });

  const data = await response.json();
  console.log(data);

  }

  return (
    <React.Fragment>
      <section>
        <header>
          <div className={classes.navbar}>
            <img src={Logo} alt=''></img>
          </div>
          <div className={classes['main-image']}>
         <img src={StarWars} alt='Star wars logo'/>
         <div>
         <a href="src/components/MoviesList.js">Film</a>
         </div>
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
