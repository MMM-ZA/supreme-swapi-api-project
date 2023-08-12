import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './Characters.module.css';

const CharacterDetails = ({ data }) => {
  const characterData = [
    { label: 'Name', value: data.name },
    { label: 'Gender', value: data.gender },
    { label: 'Birth Year', value: data.birth_year },
    { label: 'Height', value: data.eye_color },
    { label: 'Eye Color', value: data.height }

  ];

  const characterList = characterData.map((item) => (
    <div className={classes.detailItem} key={item.label}>
      <span className={classes.label}>{item.label}:</span>
      <span className={classes.value}>{item.value}</span>
    </div>
  ));

  return (
    <div className={classes.CharactersContainer}>
      {characterList}
    </div>
  );
};

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://swapi.dev/api/people/');
        setCharacters(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <div className={classes.CharactersContainer}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Star Wars Characters</h1>
          <ul>
            {characters.map((character) => (
              <li key={character.name}>
                <CharacterDetails data={character} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Characters;
