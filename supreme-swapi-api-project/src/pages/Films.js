import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './Films.module.css';

const FilmsDetails = ({ data }) => {
  const filmsData = [
    { label: 'Title', value: data.title },
    { label: 'Director', value: data.director },
    { label: 'Release Date', value: data.release_date },
    { label: 'Opening Crawl ', value: data.opening_crawl }


  ];

  const FilmsList = filmsData.map((item) => (
    <div className={classes.wrap}>
    <div className={classes.detailItem} key={item.label}>
      <span className={classes.label}>{item.label}:</span>
      <span className={classes.value}>{item.value}</span>
      <span className={classes.value}>{item.value}</span>
    </div>
    </div>
  ));

  return (
    <div className={classes.FilmsContainer}>

      {FilmsList}

    </div>
  );
};

const Films = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get('https://swapi.dev/api/films/');
        setFilms(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchFilms();
  }, []);

  return (
    <div className={classes.FilmsContainer}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Star Wars Films</h1>
          <ul>
            {films.map((film) => (
              <li key={film.title}>
                <FilmsDetails data={film} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Films;
