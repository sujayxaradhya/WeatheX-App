import React, { useEffect, useState } from "react";
import format from "date-fns/format";
import { useAppSelector } from "../../app/hooks";
import { WeatherState } from "../../features/weatherSlice/weatherSliceTypes";
import getWeatherIcon from "../../helpers/icons/getWeatherIcon";
import getElementColor from "../../helpers/colors/getElementColor";
import capitalizeString from "../../helpers/strings/capitalizeString";
import PreLoader from "../PreLoader/PreLoader";
import ReactAnimatedWeather from "react-animated-weather";
import { WiDayCloudy, WiStrongWind } from "react-icons/wi";
import { PiDrop, PiEye } from "react-icons/pi";
import styles from "./WeatherDisplay.module.scss";

const WeatherDisplay: React.FC = () => {
	const weatherState: WeatherState = useAppSelector((state) => state.weather);

	// State for the current date and time
	const [currentDate, setCurrentDate] = useState(new Date());

	const [elementColor, setElementColor] = useState<string>("");

	// Update the time every second
	useEffect(() => {
		const timerId = setInterval(() => {
			setCurrentDate(new Date());
		}, 1000);

		// Clear interval on Unmount
		return () => clearInterval(timerId);
	}, []);

	useEffect(() => {
		if (weatherState.status === "succeeded" && weatherState.weather[0].main) {
			setElementColor(getElementColor(weatherState.weather[0].main.temp));
		}
	}, [weatherState]);

	const formatDay = format(currentDate, "EEEE");
	const formatDate = format(currentDate, "d MMMM yyyy");
	const formatTime = format(currentDate, "h:mm:ss a");

	return (
		<>
			{weatherState.status === "loading" && (
				<div>
					<PreLoader />
				</div>
			)}
			<div className={styles.weather_display}>
				<p className={styles.time}>{formatTime}</p>
				<h1
					className={styles.location}
				>{`${weatherState.city}, ${weatherState.countrycode}`}</h1>
				{weatherState.status === "succeeded" && (
					<p className={`${styles.dayAndDate} ${elementColor}`}>
						{formatDay}, {formatDate}
					</p>
				)}
				{weatherState.status === "succeeded" &&
					weatherState.weather.map((weatherData) => (
						<div
							key={`${weatherData.coord.lat},${weatherData.coord.lon}`}
							className={styles.container}
						>
							{weatherData.weather.map((weather) => (
								<div key={weather.id} className={styles.weatherMain}>
									<ReactAnimatedWeather
										icon={getWeatherIcon(weather.main)}
										color="#100C08"
										size={70}
										animate={true}
									/>
									<p>{weather.main}</p>
								</div>
							))}
							<p className={styles.temp}>
								{(weatherData.main.temp - 273.15).toFixed(2)}°C
							</p>
							<div className={`${styles.weatherDetails} ${elementColor}`}>
								<div className={styles.condition}>
									<WiDayCloudy size={47} />
									<p className={styles.detailsElement}>
										<strong>
											{capitalizeString(
												weatherState.weather[0].weather[0].description
											)}
										</strong>
										<span className={styles.detailsText}>Condition:</span>
									</p>
								</div>
								<div className={styles.humidity}>
									<PiDrop size={45} />
									<p className={styles.detailsElement}>
										<strong>{weatherData.main.humidity}%</strong>
										<span className={styles.detailsText}>Humidity:</span>
									</p>
								</div>
								<div className={styles.visibility}>
									<PiEye size={47} />
									<p className={styles.detailsElement}>
										<strong>
											{String(weatherData.visibility).slice(0, 2)} km
										</strong>
										<span className={styles.detailsText}>Visibility:</span>
									</p>
								</div>
								<div className={styles.wind}>
									<WiStrongWind size={47} />
									<p className={styles.detailsElement}>
										<strong>
											{(weatherData.wind.speed * 3.6).toFixed(2)} km/h
										</strong>
										<span className={styles.detailsText}>Wind:</span>
									</p>
								</div>
							</div>
						</div>
					))}
			</div>
		</>
	);
};

export default WeatherDisplay;
