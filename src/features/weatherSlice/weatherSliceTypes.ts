export type Weather = {
	coord: {
		lat: number;
		lon: number;
	};
	weather: {
		id: number;
		main: string;
		description: string;
		icon: string;
	}[];
	main: {
		temp: number;
		humidity: number;
	};
	visibility: number;
	wind: {
		speed: number;
	};
};

export interface WeatherState {
	weather: Readonly<Weather[]>;
	city: string | null;
	countrycode: string | null;
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
}
