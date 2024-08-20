import React, { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Films from './pages/Films';
import Characters from './pages/Characters';
import Starships from './pages/Starships';
import Vehicles from './pages/Vehicles';
import classes from './App.module.css';
import StarWars from '../src/assets/StarWarsPoster.png';
import StarWars2 from '../src/assets/StarWarsposter2.png';
import StarWars3 from '../src/assets/StarWarsPoster3.png';
import StarWars4 from '../src/assets/StarWarsPoster4..png';
import Logo from '../src/assets/logo.svg';
import AddFavorites from './components/AddFavorites';

function App() {
  const [showFavorites, setShowFavorites] = useState(false);
  const intervalTime = 3000;
  const [currentImage, setCurrentImage] = useState(StarWars);

  useEffect(() => {
    const images = [StarWars, StarWars2, StarWars3, StarWars4];

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

  return (
    <Router>
      <React.Fragment>
        <section>
          <header>
            <div className={classes.navbar}>
              <img src={Logo} alt='Star wars logo' onClick={handleLogo}></img>
              <div className={classes.navlinks}>
                <div className={classes.clickableLinks}>
                  <Link to="/films">Films</Link>
                  <Link to="/people" >Characters</Link>
                  <Link to="/starships">Spaceships</Link>
                  <Link to="/vehicles">Vehicles</Link>
                </div>
              </div>
              {/* <button onClick={handleShowFavorites}>Add Favorites</button> */}
            </div>
          </header>
        </section>
        <nav>
          <Routes>
            <Route path="/films" element={<Films />} />
            <Route path="/people" element={<Characters />} />
            <Route path="/starships" element={<Starships />} />
            <Route path="/vehicles" element={<Vehicles />} />
          </Routes>
        </nav>

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
    </Router>
  );
}

export default App;
