import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { fetchWeatherByCity } from "../../features/weatherSlice/weatherSlice";
import styles from "./SearchBar.module.scss";

const SearchBar: React.FC = () => {
	const [city, setCity] = useState<string>("");
	const dispatch = useAppDispatch();

	const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!city.trim()) {
			return;
		}
		dispatch(fetchWeatherByCity({ city }));
	};

	return (
		<div className={styles.search_bar}>
			<form onSubmit={handleSearch}>
				<input
					id="city-input"
					name="city"
					type="text"
					value={city}
					onChange={(event) => setCity(event.target.value)}
					placeholder="Enter city..."
				/>
				<button type="submit">Search</button>
			</form>
		</div>
	);
};

export default SearchBar;
