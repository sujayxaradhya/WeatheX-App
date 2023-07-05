import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
	getCoordinates,
	getCurrentWeather,
	getCityAndCountry
} from "../../api/weatherAPI";
import { Weather, WeatherState } from "./weatherSliceTypes";

const initialState: WeatherState = {
	weather: [],
	city: null,
	countrycode: null,
	status: "idle",
	error: null
};

// Async thunk for fetching weather data by city name
export const fetchWeatherByCity = createAsyncThunk<
	{ weather: Weather; city: string; countrycode: string },
	{ city: string }
>(
	"weatherData/fetchWeatherByCity",
	async ({ city: inputCity }, { rejectWithValue }) => {
		try {
			const { lat, lon } = await getCoordinates(inputCity);
			const weatherPromise = await getCurrentWeather({ lat, lon });
			const { city, countrycode } = await getCityAndCountry(lat, lon);
			return { weather: weatherPromise, city, countrycode };
		} catch (error: any) {
			console.error(error);
			return rejectWithValue(error.message);
		}
	}
);

// Async thunk for fetching weather data by coordinates
export const fetchWeather = createAsyncThunk(
	"weatherData/fetchWeatherData",
	async ({ lat, lon }: { lat: number; lon: number }, { rejectWithValue }) => {
		try {
			const weather = await getCurrentWeather({ lat, lon });
			const { city, countrycode } = await getCityAndCountry(lat, lon);
			return { weather, city, countrycode };
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

const weatherDataSlice = createSlice({
	name: "weatherData",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		const handleFulfilled = (
			state: WeatherState,
			action: PayloadAction<{
				weather: Weather;
				city: string;
				countrycode: string;
			}>
		) => {
			state.status = "succeeded";
			state.weather = [action.payload.weather];
			state.city = action.payload.city;
			state.countrycode = action.payload.countrycode;
		};

		// Cases for fetchWeather
		builder.addCase(fetchWeather.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchWeather.fulfilled, handleFulfilled);
		builder.addCase(fetchWeather.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message ?? null;
		});

		// Cases for fetchWeatherByCity
		builder.addCase(fetchWeatherByCity.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchWeatherByCity.fulfilled, handleFulfilled);
		builder.addCase(fetchWeatherByCity.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message ?? null;
		});
	}
});

export default weatherDataSlice.reducer;
