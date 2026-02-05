import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import LocationInput from './components/locationInput'
import weatherApi from './services/weatherApi.js'
import Header from './components/Header'
import Search from './components/Search'
import { useDispatch, useSelector } from 'react-redux' //useSelector is used to read the state value from store 
import { addCity } from './app/weatherSlice.js'


function App() {
  const [cities, setCities] = useState([]); //contains string in form of IN,90012,cityname
  const [forecast, setForecast] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const citiesInState = useSelector((state) => state.weather.cities);
  console.log('cities in redux state: ',citiesInState)

  // addCity(citiesInState, locationKey);

  // const addCity = (locationKey) => {
  // //   { locationKey
  // //     "id":"110001-IN",
  // //     "name":"Delhi",
  // //     "zip":"110001,",
  // //     "country":"IN"
  // //  }
  //   if (!cities.includes(locationKey.id)) {
  //     setCities(prev => [...prev, locationKey])
  //   }
  // }
  
  // const removeCity = (cityElement) => {
  // //   { cityElement
  // //     "id":"110001-IN",
  // //     "name":"Delhi",
  // //     "zip":"110001,",
  // //     "country":"IN"
  // //  }
  //   setCities(prev => prev.filter(eachCityElement => eachCityElement.id !== cityElement.id))
  // }
  const fetchAllCitiesForecast = async () => {
    if (cities.length === 0) return;
    setIsLoading(prev => !prev)
    for (const cityElement of cities) {
      try {
        const geoResponse = await weatherApi.get('/geo/1.0/zip', {params: {zip:`${cityElement.zip},${cityElement.country}`}})
        console.log(geoResponse);
        const {lat,lon} = geoResponse.data
        const forecastResponse = await weatherApi.get('/data/2.5/forecast',{params: {lat:lat,lon:lon}})
        console.log(forecastResponse);
      } catch(error) {
        console.log(error)
      }
    }
    setIsLoading(prev => !prev);
    

    // const locations = cities.map(city => {
    //   const [cityZip] = city.split(' '); //['CN,100000']
    //   const [country,zip] = cityZip.split(',')
    //   return `${zip},${country}`;
    // }) 
    // console.log(locations);  //['110001,IN', '90210,US']
    // setIsLoading(true);
    // const newForecasts = {};
    // //move with calling api

    // try {
    //   for (const location of locations) {
    //     //http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}
    //     const response=await weatherApi.get('/geo/1.0/zip', {params: {zip:location}});
    //     console.log(response);
    //     const {lat,lon} = response.data;
    //     //http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    //     const forecastResponse = await weatherApi.get('/data/2.5/forecast', {params: {lat:lat,lon:lon}});
    //     console.log(forecastResponse);
    //   }
    // } catch(error) {

    // }
    // setIsLoading(prev => !prev);
    //http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}
    //state of cities look like: ['CN,100000 Beijing'] state of cities*/}

    
    
    
    //return an array containing all locations: ['IN,110001', 'CN,100000'];
    // console.log("locations to fetch forecast for-from app.jsx: ",locations); ["IN,400001"]
    // console.log(locations)
    // try {
    //   for (const location of locations) {
    //     const response = await weatherApi.get('/geo/1.0/zip', {params: {zip: location }})
    //     console.log(response);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    // setTimeout(() => {
    //   setIsLoading(prev => !prev)
    // }, 2500)
    //now making an api call

  }
  useEffect(() => {
    if (cities.length===0) return;
    // console.log('locations in the cities state from app.jsx', cities); 
//     [ //cities state
//     {
//         "id": "110001-IN",
//         "name": "Delhi",
//         "zip": "110001,",
//         "country": "IN"
//     },
//     {
//         "id": "400001-IN",
//         "name": "Mumbai",
//         "zip": "400001,",
//         "country": "IN"
//     }
// ]
  }, [cities])

  // const handleLocationSubmit = (locationKey) =>{
  //   console.log('location key from app.jsx: ', locationKey);
  //   //now set the state of location, then call the api.
  // }

  return (
    <>
      <div className='app-container'>
        <div className='header'>
          <Header/>
        </div>
        <div className='search'>
          {/* <Search cities={cities} onAddCity={addCity} onFetchAll={fetchAllCitiesForecast} isLoading={isLoading} forecasts={forecast}/> */}
          <Search cities={cities} onFetchAll={fetchAllCitiesForecast} isLoading={isLoading} forecasts={forecast} />
        </div>
        {/* <div className='cards'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui illum vitae hic eaque?
        </div>
        <div className='forecast-section'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit harum aut quia, dolorem dolorum pariatur?
        </div> */}
      </div>
    </>
  )
}

export default App
