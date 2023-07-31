import React, { useEffect } from 'react';
import { useState } from 'react';
import classes from './App.module.css';
import StarWars from '../src/assets/StarWarsPoster.png'
import StarWars2 from '../src/assets/StarWarsposter2.png'
import StarWars3 from '../src/assets/StarWarsPoster3.png'
import Logo from '../src/assets/logo.svg'
import AddFavorites from './components/AddFavorites';
import Characters from './pages/Characters';



function App() {
  const [showFavorites, setShowFavorites] = useState(false);
  const [showCharacters,setShowCharacters ] = useState(false);
  const intervalTime = 3000;
  const [currentImage,setCurrentImage] = useState(StarWars);

   useEffect(() => {
      const images = [StarWars, StarWars2, StarWars3];

    const changeImage = () => {
      const currentIndex = images.indexOf(currentImage);
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentImage(images[nextIndex]);
    };

     const intervalId = setInterval(changeImage, intervalTime);

    return () => clearInterval(intervalId);
  }, [currentImage, intervalTime]);

  const handleShowFavorites = () => {
    setShowFavorites(true);
  };

   const handleLogo = () => {
    window.location.href = 'app.js';
  };

  const handleShowChacaters = () => {
    setShowCharacters(true);
  }


  return (
    <React.Fragment>
      <section>
        <header>
          <div className={classes.navbar}>
            <img src={Logo} alt='Star wars logo' onClick={handleLogo}></img>
            <div className={classes.navlinks}>
              <div className={classes.clickableLinks}>
              <a href="/films"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"></path></svg>Films</a>
             <a href="/people" onClick={handleShowChacaters}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><circle cx="10" cy="8" r="4"></circle><path d="M10.35 14.01C7.62 13.91 2 15.27 2 18v2h9.54c-2.47-2.76-1.23-5.89-1.19-5.99zM19.43 18.02c.36-.59.57-1.28.57-2.02 0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4c.74 0 1.43-.22 2.02-.57L20.59 22 22 20.59l-2.57-2.57zM16 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></svg>Characters</a>
             <a href="/starships"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M480 32s-23.4-.7-59.3 27.1C404 72 244.9 186.8 244.9 186.8l-168.8-4.2L32 222l109.8 55.2-8.6 10.8-87.9.1-7.2 40.5 63.1 48.7-26.6 59.8 60-26.4 48.7 63.1 40.5-7.2.1-87.8 10.9-8.5L290.1 480l39.3-44.1-4.2-168.7S440.1 108.2 453 91.6C480.7 55.5 480 32 480 32z"></path></svg>Spaceships</a>
             <a href="/vehicles" ><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM7.5 16c-.83 0-1.5-.67-1.5-1.5S6.67 13 7.5 13s1.5.67 1.5 1.5S8.33 16 7.5 16zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5.81 10l1.04-3h10.29l1.04 3H5.81z"></path></svg>Vehicles</a></div>
             </div>
             <Characters showCharacters={showCharacters}/>
          <button onClick={handleShowFavorites}>Add Favorites</button>
         </div>
        </header>
      </section>

      {showFavorites ? (
        <AddFavorites setShowFavorites={setShowFavorites} />
      ) : (
        <section>
          <div className={classes['main-image']}>
            <img src={currentImage} alt='Star wars poster' />
          </div>
        </section>
      )}
    </React.Fragment>
  );
}

export default App;
