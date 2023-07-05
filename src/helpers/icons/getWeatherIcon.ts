const getWeatherIcon = (weather: string) => {
	switch (weather.toUpperCase()) {
		case "CLOUDS":
			return "CLOUDY";
		case "RAIN":
			return "RAIN";
		case "CLEAR":
			return "CLEAR_DAY";
		case "SNOW":
			return "SNOW";
		case "THUNDERSTORM":
			return "SLEET";
		case "DRIZZLE":
			return "RAIN";
		case "MIST":
		case "SMOKE":
		case "HAZE":
		case "FOG":
			return "FOG";
		default:
			return "CLEAR_DAY";
	}
};

export default getWeatherIcon;
