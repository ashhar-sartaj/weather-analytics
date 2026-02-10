import { useSelector } from "react-redux";

function CardsCopy() {
    //reading all our states : cities, forecastById, loadingById, errorById, unit
    const cities = useSelector((state) => state.weather.cities);
    const loading = useSelector((state) => state.weather.loadingById);
    const error = useSelector((state) => state.weather.errorById);
    const forecast = useSelector((state) => state.weather.forecastById);
    const unitOfForecast = useSelector((state) => state.weather.unit);
    
    if (cities.length === 0) {
        return (
        <div className="cards-section">
            <p className="card-section-nocities">Please select cities..</p>
        </div>
        );
    }

return (
  <div className="cards-section">
    {cities.flatMap((cityElement) => {
      const nameOfCity = cityElement.name;
      const unit = unitOfForecast;
      if (loadingForecast) {
        console.log(loadingForecast)
        return (<div key={idOfCityElement} className="city-forecast-loading"><p>loading forecast for {nameOfCity}</p></div>)
      }
      if (errorInFetchingForecast) {
        return (<div key={city.id} className="city-forecast-error">
                  <p>Error: {errorInFetchingForecast}</p>
                </div>)
      }
      // if (forecastOfCityElement.length>0) {
        
      // }
      {
        //if loading is true.. then display plain cards with text as please wait..
        //how to get the number of cards to display
        // const numberOfCards = forecast[idOfCityElement]?.list.length;

      }

     

      return forecastOfCityElement.map((threeHourForecastTimestamp) => {
        const timeOfRecord = threeHourForecastTimestamp.dt_txt;
        const presentTemp = threeHourForecastTimestamp.main.temp;
        const weatherCondition = threeHourForecastTimestamp.weather[0]?.description;
        const humidity = threeHourForecastTimestamp.main.humidity;
        const wind = threeHourForecastTimestamp.wind.speed;
        const icon = threeHourForecastTimestamp.weather[0]?.icon;
        const uniqueIdentifier = threeHourForecastTimestamp.dt;
        
        return (
          <div key={`${idOfCityElement}-${uniqueIdentifier}`} className="threeHourForecastTimestamp-card">
            <div className="threeHourForecastTimestamp-card-top">
                <h2>{nameOfCity}</h2>
            </div>
            {/* <div>{nameOfCity}</div> */}
            <div>
              
                <p className="temp">{presentTemp}°{unit === 'metric' ? 'C':'F'}</p>
                <p>{weatherCondition}</p>
                <p className="small">Humidity: {humidity}% | Wind: {wind}m/s</p>
                <p className="small">{timeOfRecord}</p>
            </div>
            <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt={weatherCondition} />
          </div>
        );
      });
      
    })}
  </div>
);

}
//the above rendering card code doesnt work for loading and error implementation... keep this for future referecnce.