import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherForecastForCity } from "../app/weatherSlice";
import CitySection from "./CitySection";

function Cards() {
    //reading all our states : cities, forecastById, loadingById, errorById, unit
    // const [duration, setDuration] = useState('24');
    const cities = useSelector((state) => state.weather.cities);
    // const loading = useSelector((state) => state.weather.loadingById);
    // const error = useSelector((state) => state.weather.errorById);
    // const forecast = useSelector((state) => state.weather.forecastById);
    const unitOfForecast = useSelector((state) => state.weather.unit);

    // const dispatch = useDispatch();
    //when state of cities changes => initiate the forecast api...
    // useEffect(() => {
    //   //will initiate the forecast api.. on change of city state.
    //   // if (cities.length === 0) return;
    //   //create an object that will sent.. it should contain lat, lon, unit
    //   // for (const cityElement of cities) {
    //   //   dispatch(weatherForecastForCity({
    //   //     lat:cityElement.lat,
    //   //     lon:cityElement.lon,
    //   //     zip:cityElement.zip,
    //   //     country:cityElement.country,
    //   //     unit:unitOfForecast
    //   //   }))
    //   // }
    // }, [cities, unitOfForecast])

    if (cities.length === 0) {
        return (
        <div className="cards-section">
            <p className="card-section-nocities">Select location to view forecast</p>
        </div>
        );
    }

return (

  <>
    <div className ="cards-section">
      {cities.map((cityElement) => {
        // <CitySection cityElement={cityElement}/>
        // //all below attributes are related to a particular cityElement
        // const nameOfCity = cityElement.name;
        // const idOfCityElement = cityElement.id;
        // const unit = unitOfForecast;
        // const forecastOfCityElement = forecast[idOfCityElement]?.list || []; // Safe access
        // const nameOfPlace = forecast[idOfCityElement]?.city?.name || nameOfCity;
        // const loadingForecast = loading[cityElement.id];
        // const errorInFetchingForecast = error[cityElement.id]
        // if (loadingForecast) {
        //   //forecast of a particular city is loading
        //   return (
        //     <>
        //     <div key={idOfCityElement} className="city-block">
        //       <h2>{nameOfCity}</h2>
        //       <p>Forecast loading...</p>
        //     </div>
        //     </>
        //   )
        // }
        // if (errorInFetchingForecast) {
        //   //there is an error for payticular city
        //   return (
        //     <div key={idOfCityElement} className="city-block">
        //       <h2>{nameOfCity}</h2>
        //       <p>{errorInFetchingForecast}</p>
        //     </div>
        //   )
        // }
        //if everything goes fine (forecast of a city is fetched successfully.). below is most important thing to understand about where we are looping. We should return only a single div representing a container div for all forecast of a city, and inside that divloop over entire forecast of that particular city
        return (
          <CitySection key={cityElement.id} cityElement={cityElement} unit={unitOfForecast}/>
        )
      })}
    </div>
  </>
);

}
export default Cards;