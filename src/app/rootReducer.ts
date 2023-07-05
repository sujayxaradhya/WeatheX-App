import { combineReducers } from "@reduxjs/toolkit";
import WeatherReducer from "../features/weatherSlice/weatherSlice";

const rootReducer = combineReducers({
	weather: WeatherReducer
});

export default rootReducer;
