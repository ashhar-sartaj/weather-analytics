import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import LocationInput from './components/locationInput'
import weatherApi from './services/weatherApi.js'
import Header from './components/Header'
import Search from './components/Search'

function App() {
  const [cities, setCities] = useState([]); //contains string in form of IN,90012,cityname
  const [forecast, setForecast] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const addCity = (locationKey) => {
    // console.log('location key from app.jsx',locationKey )
    // console.log(typeof(locationKey)); //string
    if (!cities.includes(locationKey)) {
      setCities(prev => [...prev, locationKey])
    }
  }
  
  const removeCity = (locationKey) => {
    console.log('the request city to be removed is', locationKey)
    setCities(prev => prev.filter(city => city !== locationKey))
  }
  const fetchAllCitiesForecast = () => {
    if (cities.length === 0) return;
    setIsLoading(true);
    const newForecasts = {};
    //move with calling api
    //http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}
    //state of cities look like: ['IN,110001 Delhi', 'CN,100000 Beijing']  state of cities*/}
    const locations = cities.map(city => city.split(' ')[0]); //return an array containing all locations: ['IN,110001', 'CN,100000'];

    //now making an api call

  }
  useEffect(() => {
    if (cities.length===0) return;
    console.log('locations in the cities state from app.jsx', cities)
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
          <Search cities={cities} onAddCity={addCity} onFetchAll={fetchAllCitiesForecast} isLoading={isLoading} forecasts={forecast} onRemoveCity={removeCity}/>
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
