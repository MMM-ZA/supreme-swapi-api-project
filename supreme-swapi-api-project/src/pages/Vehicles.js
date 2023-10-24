import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from './Vehicles.module.css';

const VehiclesDetails = ({ data }) => {
  const vehiclesData = [
    { label: "Name:", value: data.name, className: classes.nameLabel },
    { label: "Model:", value: data.model, className: classes.modelLabel },
    { label: "Passengers:", value: data.passengers, className: classes.passengersLabel },
    { label: "Length:", value: data.length, className: classes.lengthLabel}
  ];

  const VehiclesList = vehiclesData.map((item) => (
    <div className={classes.wrap} key={item.label}>
      <div className={classes.detailItem}>
        <span className={item.label}>{item.label}</span>
        <span className={classes.value}>{item.value}</span>
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
      <h1>Star Wars Vehicles</h1>
          <ul className={classes.MainWrapper}>
            {vehicles.map((vehicle) => (
              <div className={classes.VehiclesWrapper}>
              <li key={vehicle.name}>
                <VehiclesDetails data={vehicle} />
              </li>
              </div>
            ))}
          </ul>
    </div>
    )}
      </div>
  );
};

export default Vehicles;
