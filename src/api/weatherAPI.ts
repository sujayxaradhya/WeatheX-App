import axios from "axios";
import { Weather } from "../features/weatherSlice/weatherSliceTypes";

const weatherBaseUrl = "https://api.openweathermap.org/data/2.5/weather";
const geocoderBaseUrl = "https://api.opencagedata.com/geocode/v1/json";
const GEOCODER_API_KEY = import.meta.env.VITE_APP_GEOCODER_API_KEY;
const WEATHER_API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;

export const getCoordinates = async (
	city: string
): Promise<{ lat: number; lon: number }> => {
	try {
		const response = await axios.get(geocoderBaseUrl, {
			params: {
				q: city,
				key: GEOCODER_API_KEY
			}
		});

		const location = response.data.results[0].geometry;

		return {
			lat: location.lat,
			lon: location.lng
		};
	} catch (error) {
		throw new Error("Failed to fetch coordinates data");
	}
};

export const getCityAndCountry = async (
	lat: number,
	lng: number
): Promise<{ city: string; countrycode: string }> => {
	try {
		const response = await axios.get(geocoderBaseUrl, {
			params: {
				q: `${lat}+${lng}`,
				key: GEOCODER_API_KEY
			}
		});
		const components = response.data.results[0].components;

		const locationName =
			components.city ||
			components.town ||
			components.village ||
			components.county ||
			components.state_district ||
			components.state;
		return {
			city: locationName,
			countrycode: components.country_code.toUpperCase()
		};
	} catch (error) {
		throw new Error("Failed to fetch city and country data");
	}
};

export const getCurrentWeather = async ({
	lat,
	lon
}: {
	lat: number;
	lon: number;
}): Promise<Weather> => {
	try {
		const response = await axios.get(weatherBaseUrl, {
			params: {
				lat,
				lon,
				appid: WEATHER_API_KEY
			}
		});
		const data = response.data;

		const weather: Weather = {
			coord: data.coord,
			weather: data.weather,
			main: data.main,
			visibility: data.visibility,
			wind: data.wind
		};

		return weather;
	} catch (error) {
		throw new Error("Failed to fetch weather data");
	}
};
