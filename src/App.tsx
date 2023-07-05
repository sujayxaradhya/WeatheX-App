import React, {
	Suspense,
	useCallback,
	useEffect,
	useLayoutEffect,
	useState,
	useRef,
	lazy
} from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate
} from "react-router-dom";
import { gsap } from "gsap";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchWeather } from "./features/weatherSlice/weatherSlice";
import { WeatherState } from "./features/weatherSlice/weatherSliceTypes";
import PreLoader from "./components/PreLoader/PreLoader";
import getBackgroundColor from "./helpers/colors/getBackgroundColor";
import Page404 from "./components/Page404/Page404";
import styles from "./App.module.scss";

const NavBar = lazy(() => import("./components/NavBar/NavBar"));
const SearchBar = lazy(() => import("./components/SearchBar/SearchBar"));
const WeatherDisplay = lazy(
	() => import("./components/WeatherDisplay/WeatherDisplay")
);

const MainComponent: React.FC = () => {
	const dispatch = useAppDispatch();
	const weatherState: WeatherState = useAppSelector((state) => state.weather);
	const [locationStatus, setLocationStatus] = useState<string>("Detecting");
	const navigate = useNavigate();
	const contentRef = useRef<HTMLDivElement>(null);

	const getLocation = useCallback(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setLocationStatus("Success");
					dispatch(
						fetchWeather({
							lat: position.coords.latitude,
							lon: position.coords.longitude
						})
					);
				},
				(error) => {
					if (error.code === error.PERMISSION_DENIED) {
						setLocationStatus("Denied");
					} else {
						setLocationStatus("Error");
					}
				}
			);
		} else {
			setLocationStatus("Unavailable");
		}
	}, [dispatch]);

	useEffect(() => {
		getLocation();
	}, [dispatch, getLocation]);

	useLayoutEffect(() => {
		if (weatherState.status === "succeeded" && contentRef.current) {
			const animateContext = gsap.context(() => {
				const tl = gsap.timeline({ paused: true });
				tl.fromTo(
					contentRef.current,
					{
						opacity: 0,
						y: 100,
						ease: "back.inOut(1.7)",
						duration: 1.5
					},
					{ opacity: 1, y: 0 }
				);
				tl.play();
			}, contentRef);

			return () => {
				animateContext.revert();
			};
		}
	}, [weatherState.status]);

	useEffect(() => {
		if (weatherState.status === "failed") {
			navigate("/404");
			navigate(0);
		}
	}, [weatherState.status, navigate]);

	let backgroundColor = "";

	if (weatherState.status === "succeeded" && weatherState.weather[0].main) {
		backgroundColor = getBackgroundColor(weatherState.weather[0].main.temp);
	}

	return (
		<>
			<div className={`${styles.App} ${backgroundColor}`}>
				<div ref={contentRef}>
					{locationStatus === "Success" &&
					weatherState.status === "succeeded" ? (
						<Suspense fallback={<PreLoader />}>
							<>
								<NavBar />
								<p className={styles.slogan}>
									Your Climate Companion for the Modern World.
								</p>
								<div>
									<main>
										<SearchBar />
									</main>
									<section>
										<WeatherDisplay />
									</section>
								</div>
							</>
						</Suspense>
					) : (
						<div className={styles.container}>
							<PreLoader />
						</div>
					)}
				</div>
			</div>
		</>
	);
};

const App: React.FC = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<MainComponent />} />
					<Route path="/404" element={<Page404 />} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
