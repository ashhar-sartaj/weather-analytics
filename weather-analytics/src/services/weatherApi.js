import axios from 'axios'
//this folder contains the base url fo the api.. or the axios instance shared across the files

const weatherApi = axios.create({
    baseURL:'http://api.openweathermap.org',
    //default params applied to all the request
    params: {
        appid: import.meta.env.VITE_API_KEY
    }
})
//http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}
export const fetchGeoCoordinates = (zip, countryCode) => {
    return weatherApi.get('/geo/1.0/zip', {params: {zip:`${zip},${countryCode}`}});
}
//http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
export const fetchWeatherForecast = (lat, lon) => {
    return weatherApi.get('/data/2.5/forecast', {params: {lat: lat, lon: lon}});
}
export default weatherApi;
