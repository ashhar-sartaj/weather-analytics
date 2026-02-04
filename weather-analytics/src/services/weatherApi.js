import axios from 'axios'
//this folder contains the base url fo the api.. or the axios instance shared across the files

const weatherApi = axios.create({
    baseURL:'http://api.openweathermap.org',
    //default params applied to all the request
    params: {
        appid: import.meta.env.VITE_API_KEY
    }
})
export default weatherApi;
