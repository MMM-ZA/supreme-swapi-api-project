import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from './Starships.module.css';



  const StarshipDetails = ({data}) => {
    const starshipsData = [
    { label: "Name:", value: data.name, className: classes.nameLabel },
    { label: "Model:", value: data.model, className: classes.modelLabel },
    { label: "Cargo Capacity:", value: data.cargo_capacity, className: classes.cargoLabel },
    { label: "Hyperdrive Rating:", value: data.hyperdrive_rating, className: classes.hyperdriveLabel},
    { label: "Megalight per Hour (MGLT):", value: data.MGLT, className: classes.mgltLabel}
  ];

   const StarshipsList = starshipsData.map((item) => (
    <div className={classes.wrap} key={item.label}>
      <div className={classes.detailItem}>
        <span className={item.label}>{item.label}</span>
        <span className={classes.value}>{item.value}</span>
      </div>
    </div>
  ));


  return (
    <div className={classes.startshipsContainer}>
      {StarshipsList}
    </div>
  );

   };


 const Starships = () => {
  const [starships, setStarships] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchStarships = async () => {
      try {
        const response = await axios.get("https://swapi.dev/api/starships/");
        setStarships(response.data.results);
        setIsloading(false);
      } catch (error) {
        console.error("Error fetching Starships", error);
      }
    };

    fetchStarships();
  }, []);

  return (
    <div className={classes.StarshipsContainer}>
    {isLoading ? (
      <p>Loading ...</p>
    ) : (
    <div>
      <h1>Star Wars Starships</h1>
          <ul className={classes.MainWrapper}>
            {starships.map((starship) => (
              <div className={classes.StarshipsWrapper}>
              <li key={starship.name}>
                <StarshipDetails data={starship} />
              </li>
              </div>
            ))}
          </ul>
    </div>
    )}
      </div>
  );


};

export default Starships;
