import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setUnit, weatherForecastForCity } from "../app/weatherSlice.js";

function Header() {
    const [celsius, setCelsius] = useState(true);
    // const [fahrenheit, setFahrenheit] = useState(false);//when button is checked, fahrenheit set to true => refetch data
    const dispatch = useDispatch();

    const unit = useSelector((state) => state.weather.unit);
    console.log('unit is:', unit)
    const cities = useSelector((state) => state.weather.cities);
    console.log(cities);
    const handleUnitToggle = (e) => {
        setCelsius(e.target.checked);
        
        dispatch(setUnit(unit === "metric" ? "imperial" : "metric"));
        // if (fahrenheit) {
        //     const unitToUpdate = 'imperial'
        //     dispatch(setUnit(unitToUpdate));
        // } else {
        //     const unitToUpdate = 'metric'
        //     dispatch(setUnit(unitToUpdate));
        // }
    }
    useEffect(() => {
        console.log('toggle value: ',celsius)
    }, [celsius])
    //useeffect to re-fetch on unit change.
    useEffect(() => {
        if (cities.length === 0) return;
        for (const cityElement of cities)  {
            // lat,lon,zip,country,unit should be there in payload
            const payloadForForecast = {
                lat: cityElement.lat,
                lon: cityElement.lon,
                zip: cityElement.zip,
                country: cityElement.country,
                unit: unit
            }
            dispatch(weatherForecastForCity(payloadForForecast)) //fix this api call is not getting right... url hit is http://api.openweathermap.org/data/2.5/forecast?appid=fd18ffa67bd632c445d8c26051ca12e2   giot it: the payload must be an object. 
        }
    }, [unit])
return (
    <>
    <div className="header-container">
        <h1 className="header-title">Weather Analytics</h1>
        <div className="unit-toggle-container">
            <input type="checkbox" checked={celsius} onChange={handleUnitToggle} />
            <label htmlFor="unit-toggle" className="unit-toggle-label">Celsius (°C)</label> 
            {/* {unit === 'metric'? '°F':'°C'} */}
            {/* //on check of f => unit changes to imperial 
            // initally, checkbox is uncheched with unit as 'metric' and label as F ... checkbox is checked  units changes to 'imperial' and label as C.
            // initially, check is false with unit as 'metric' and dispaly as F .. when check is true, unit chenge to imperial and display as 
            //initially, check is true with the unit is metric and display as C... check is false => unit as imperial and display
            //final take:  only display one unit either C (metric) or F (imperial)
            // ill go with celcius with check as true.   when check is false => unit changes to F  */}
        </div>
    </div>
    </>
)
}
export default Header