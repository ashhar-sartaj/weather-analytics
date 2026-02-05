//configuring redux store
import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from './weatherSlice.js'
export const store = configureStore({
    reducer: {
        weather:weatherReducer
    }
    //the state of the app will be translated to: state.weather
})