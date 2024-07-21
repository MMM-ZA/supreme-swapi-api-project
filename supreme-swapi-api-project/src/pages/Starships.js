import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from './Starships.module.css';



const StarshipDetails = ({ data }) => {
  const starshipsData = [
    { label: "Name: ", value: data.name, labelClassName: classes.nameLabel, valueClassName: classes.nameValue },
    { label: "Model: ", value: data.model, labelClassName: classes.modelLabel, valueClassName: classes.modelValue },
    { label: "Cargo Capacity: ", value: data.cargo_capacity, labelClassName: classes.cargoLabel, valueClassName: classes.cargoValue },
    { label: "Hyperdrive Rating: ", value: data.hyperdrive_rating, labelClassName: classes.hyperdriveLabel, valueClassName: classes.hyperdriveValue },
    { label: "Megalight per Hour (MGLT): ", value: data.MGLT, labelClassName: classes.mgltLabel, valueClassName: classes.mgltValue }
  ];

  const StarshipsList = starshipsData.map((item, index) => (
    <div className={classes.wrap} key={index}>
      <div className={classes.detailItem}>
        <span className={item.labelClassName}>{item.label}</span>
        <span className={item.valueClassName}>{item.value}</span>
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
      <h1>Star Wars  Spaceships</h1>
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
