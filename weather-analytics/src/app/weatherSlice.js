//A "slice" is a collection of Redux reducer logic and actions for a single feature in your app, typically defined together in a single file.
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchGeoCoordinates, fetchWeatherForecast } from "../services/weatherApi.js";

export const geoCoordinatesForCity = createAsyncThunk( 'weather/geoCoordinatesForCity',
    //{zip, country} is destructured.. of the object (locationKey) sent in the dispatch.
    async ({id, zip, country}, thunkAPI) => {
        try {
            //calling api service: fetchGeoCoordinates
            const response = await fetchGeoCoordinates(zip,country)
            return response.data;
            // return response.data; //return response.data else think will throw error of non-serialable value was detected in the poath.
            // console.log('response from asyncthunk',response)
            // const {lat,lon} = response.data
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "Failed to fetch geo co-ordinates";
            // This makes the error available in rejected action payload
            return thunkAPI.rejectWithValue({ id, message });
        }
    }
)
export const weatherForecastForCity = createAsyncThunk('weather/weatherForecastForCity',
    async ({zip, country, lat,lon}, thunkAPI) => {
       // http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
        try {
            const response = await fetchWeatherForecast(lat,lon)
            return response.data;
        } catch(err) {
            const message = err?.response?.data?.message || err?.message || "Failed to fetch geo co-ordinates";
            return thunkAPI.rejectWithValue({id:`${zip}-${country}`, message})
        }
    }
)
const initialState = {
    cities:[],
    //forecast by city id, loading by city id, error by city id
    forecastById:{},
    loadingById: {},
    errorById:{},
    unit: 'metric' 
}
//after establishing te initial state..now creating reducer for weather.
//weatherSlice is an object containing number of methods and attributes
const weatherSlice = createSlice({
    name:'weather',
    initialState,
    reducers: {
        //contains verious reducers for various actions
        addCity: (state, action) => {
            const city = action.payload;
            //checking if the city already exist
            const alreadyExist = state.cities.some((c) => c.id === city.id);
            if (alreadyExist) return;
            state.cities.push(city);
        },
        removeCity: (state, action) => {
            const cityById= action.payload;
            state.cities = state.cities.filter((c) => c.id !== cityById);
            // cleanup related stored data
            delete state.forecastById[cityById];
            delete state.loadingById[cityById];
            delete state.errorById[cityById];
        },
        setUnit: (state, action) => {
            state.unit = action.payload
        }
    },
    // 2) extraReducers: handle pending/fulfilled/rejected for the thunk
    extraReducers: (builder) => {
        builder
        .addCase(geoCoordinatesForCity.pending, (state, action) => {
            console.log('action for pending state:',action);
        })
        .addCase(geoCoordinatesForCity.fulfilled, (state, action) => {
            console.log('action for fulfilled state:',action.payload);
        })
        .addCase(geoCoordinatesForCity.rejected, (state, action) => {
            console.log('action for rejected state:', action);
        })
    }
})
// Export the generated action creators for use in components
export const { addCity, removeCity, setUnit } = weatherSlice.actions;
// Export the slice reducer for use in the store configuration
export default weatherSlice.reducer;