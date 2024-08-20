

// import React, { useState, useEffect, useCallback } from 'react';
// import MoviesList from './MoviesList';
// import classes from './AddFavorites.module.css';
// import AddMovie from './AddMovie';
// import { database } from '../Firebase/firebase';
// import { ref, get, child, push, set } from 'firebase/database';

// const AddFavorites = () => {
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const FetchMoviesHandler = useCallback(async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const dbRef = ref(database);
//       const snapshot = await get(child(dbRef, 'movies'));
//       if (!snapshot.exists()) {
//         throw new Error('No data available');
//       }

//       const data = snapshot.val();
//       const loadedMovies = [];

//       for (const key in data) {
//         loadedMovies.push({
//           id: key,
//           title: data[key].title,
//           openingText: data[key].openingText,
//           releaseDate: data[key].releaseDate,
//         });
//       }

//       setMovies(loadedMovies);
//     } catch (error) {
//       setError(error.message);
//     }
//     setIsLoading(false);
//   }, []);

//   useEffect(() => {
//     FetchMoviesHandler();
//   }, [FetchMoviesHandler]);

//   const addMovieHandler = async (movie) => {
//     const newMovieRef = push(ref(database, 'movies'));
//     await set(newMovieRef, movie);
//     FetchMoviesHandler();
//   };

//   return (
//     <React.Fragment>
//       <section>
//         <AddMovie onAddMovie={addMovieHandler} />
//         <button onClick={FetchMoviesHandler}>Fetch Movies</button>
//       </section>
//       <section className={classes['list-section']}>
//         {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
//         {!isLoading && movies.length === 0 && !error && <p>Found no movies</p>}
//         {!isLoading && error && <p>{error}</p>}
//         {isLoading && <p>Loading...</p>}
//       </section>
//     </React.Fragment>
//   );
// };

// export default AddFavorites;

