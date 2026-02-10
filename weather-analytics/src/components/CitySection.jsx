import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherForecastForCity } from "../app/weatherSlice";
import CityChart from "./CityChart";

function CitySection({cityElement, unit}) {
    //  const [duration, setDuration] = useState('24');
    //getting the loading, error, forecast state of each city element
    const idOfCityElement = cityElement.id;
    const loading = useSelector((state) => state.weather.loadingById[idOfCityElement]);
    const error = useSelector((state) => state.weather.errorById[idOfCityElement]);
    const forecast = useSelector((state) => state.weather.forecastById[idOfCityElement]?.list);
    const safeForecast  = forecast || [];
    //the 3 hours timestamp data reside in forecast.data... which is array of obj
    const placeName = cityElement.name; 
    const dispatch = useDispatch();
    console.log(cityElement)
    const [duration, setDuration] = useState('24h'); //or 

    useEffect(() => {
        dispatch(weatherForecastForCity({
            lat: cityElement.lat,
            lon:cityElement.lon,
            zip: cityElement.zip,
            country: cityElement.country,
            unit:unit
        }))
    }, [cityElement.id, unit])
    //i want that -- for each plac section.. A user is able to select whether he wants to look at 24 h or 5 days forecast.
    // Default is 24 h -- then show forecast cards for 24 hours (safeForecast will be an array of objects.. each obj represents one data point. For 24 h, show 8 dp. else entire array)
    // also, send these data points as prop in CityChart.
    //How to implement.. first set functionality to display cards alone.
    //how to send the data prop? From CitySection, just send the entire forecast data and duration. In the city charts, modify the data based on the duration.
    useEffect(() => {
      console.log(duration)
    }, [duration])

    useEffect(() => {
        if (loading) return;
        console.log(forecast);
    },[forecast])

    if (loading) {
      //forecast of a particular city is loading
      return (
        <>
        <div className="city-block">
          <h2>{placeName}</h2>
          <p>Forecast loading...</p>
        </div>
        </>
      )
    }
    if (error) {
      //there is an error for payticular city
      return (
        <div className="city-block">
          <h2>{placeName}</h2>
          <p>{error}</p>
        </div>
      )
    }
    return (<>
    <div className="city-container">
      <div className="city-container-header">
        <h2>{placeName}</h2>
        <div className="duration-toggle">
          <button className = {`duration-btn ${duration === "24h" ? "active" : ""}`} onClick={() => setDuration('24')}>24h</button>
          <button className = {`duration-btn ${duration === '5d' ? 'active' : ""}`} onClick={() => setDuration('5d')}>5d</button>
        </div>
      </div>

        <div  className="city-block">
          {
            duration === '24h' ? (
              safeForecast.slice(0,8).map((threeHourForecastTimestamp) => {
                const timeOfRecord = threeHourForecastTimestamp.dt_txt;
                const presentTemp = threeHourForecastTimestamp.main.temp;
                const weatherCondition = threeHourForecastTimestamp.weather[0]?.description;
                const humidity = threeHourForecastTimestamp.main.humidity;
                const wind = threeHourForecastTimestamp.wind.speed;
                const icon = threeHourForecastTimestamp.weather[0]?.icon;
                const uniqueIdentifier = threeHourForecastTimestamp.dt;
                return (
                  <div key={`${idOfCityElement}-${uniqueIdentifier}`}>
                    <div className="threeHourForecastTimestamp-card-top">
                      <h2>{placeName}</h2>
                    </div>

                    <div>
                      <p className="temp">{presentTemp}°{unit === 'metric' ? 'C' : 'F'}</p>
                      <p>{weatherCondition}</p>
                      <p className="small">Humidity: {humidity}% | Wind: {wind}m/s</p>
                      <p className="small">{timeOfRecord}</p>
                    </div>
                    <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt={weatherCondition} />
                  </div>
                )
              })
            ) : (
                safeForecast.map((threeHourForecastTimestamp) => {
                  const timeOfRecord = threeHourForecastTimestamp.dt_txt;
                  const presentTemp = threeHourForecastTimestamp.main.temp;
                  const weatherCondition = threeHourForecastTimestamp.weather[0]?.description;
                  const humidity = threeHourForecastTimestamp.main.humidity;
                  const wind = threeHourForecastTimestamp.wind.speed;
                  const icon = threeHourForecastTimestamp.weather[0]?.icon;
                  const uniqueIdentifier = threeHourForecastTimestamp.dt;
                  return (
                    <div key={`${idOfCityElement}-${uniqueIdentifier}`}>
                      <div className="threeHourForecastTimestamp-card-top">
                        <h2>{placeName}</h2>
                      </div>

                      <div>
                        <p className="temp">{presentTemp}°{unit === 'metric' ? 'C' : 'F'}</p>
                        <p>{weatherCondition}</p>
                        <p className="small">Humidity: {humidity}% | Wind: {wind}m/s</p>
                        <p className="small">{timeOfRecord}</p>
                      </div>
                      <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt={weatherCondition} />
                    </div>
                  )
                })
            )
          }
          
        </div>

      <div className="city-container-chart">
          {/* this will contain the chart for this place */}
          <CityChart duration={duration} data={safeForecast} />
      </div>
    </div>
    </>)
}
export default CitySection;