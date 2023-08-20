import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from '../pages/Vehicles.module.css';


const VehiclesDetails = ({ data }) => {
  const vehiclesData = [
    { label: 'Name', name: data.name },
    { label: 'Model', model: data.model },
    { label: 'Passengers', passengers: data.passengers },
    { label: 'Length ', length: data.length }


  ];

  const VehiclesList = vehiclesData.map((item) => (
    <div className={classes.wrap}>
    <div className={classes.detailItem} key={item.label}>
      <span className={classes.name}>{item.name}</span>
      <span className={classes.model}>{item.model}</span>
      <span className={classes.passengers}>{item.passengers}</span>
      <span className={classes.length}>{item.length}</span>
    </div>
    </div>
  ));

  return (
    <div className={classes.vehiclesContainer}>
      {VehiclesList}
    </div>
  );
};


const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("https://swapi.dev/api/vehicles/");
        setVehicles(response.data.results);
        setIsloading(false);
      } catch (error) {
        console.error("Error fetching Vehicles", error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <div className={classes.VehiclesContainer}>
    {isLoading ? (
      <p>Loading ...</p>
    ) : (
    <div>
      <h1>Star Wars Films</h1>
          <ul>
            {vehicles.map((vehicle) => (
              <li key={vehicle.name}>
                <VehiclesDetails data={vehicle} />
              </li>
            ))}
          </ul>
    </div>
    )}
      </div>
  );
};

export default Vehicles;
