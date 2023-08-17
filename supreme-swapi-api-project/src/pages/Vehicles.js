import axios from "axios";


const Vehicles = () => {
 const [vehicles, setVehicles] = useState([]);
 const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
  const fetchVehicles = async () => {
    try {
       const response = await axios.get('https://swapi.dev/api/vehicles/');
      setVehicles(response.data.results);
      setIsloading(false);
      } catch (error)  {
        console.error('Error fetching Vehicles', error);
      }

      }
  };

   fetchVehicles();

 }, []);


  return (

);



};



export default Vehicles;
