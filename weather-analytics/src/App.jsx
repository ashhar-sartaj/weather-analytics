import { useState } from 'react'
import axios from 'axios'
import './App.css'
import LocationInput from './components/locationInput'


function App() {
  const [location, setLocation] = useState('');

  const handleLocationSubmit = (locationKey) => {
    setLocation(locationKey);
    console.log('Location ready: ', locationKey);
  }
  return (
    <>
    <div>
      <h2>Weather analytics</h2>
      <LocationInput onLocationSubmit={handleLocationSubmit}/>
    </div>
    </>
  )
}

export default App
