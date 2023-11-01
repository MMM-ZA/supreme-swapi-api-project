import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from './Vehicles.module.css';

const VehiclesDetails = ({ data }) => {
  const vehiclesData = [
    { label: "Name: ", value: data.name, labelClassName: classes.nameLabel, valueClassName: classes.nameValue },
    { label: "Model: ", value: data.model, labelClassName: classes.modelLabel, valueClassName: classes.modelValue },
    { label: "Passengers: ", value: data.passengers, labelClassName: classes.passengersLabel, valueClassName: classes.passengersValue },
    { label: "Length: ", value: data.length, labelClassName: classes.lengthLabel, valueClassName: classes.lengthValue }
  ];

  const VehiclesList = vehiclesData.map((item, index) => (
    <div className={classes.wrap} key={index}>
      <div className={classes.detailItem}>
        <span className={item.labelClassName}>{item.label}</span>
        <span className={item.valueClassName}>{item.value}</span>
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
