import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import App from "./App.tsx";

if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("/src/utils/serviceWorker.ts")
		.then((registration) => {
			// Service worker registered successfully

			console.log("Service worker", registration.active?.state);
		})
		.catch((error) => {
			// Service worker registration failed
			console.error("Service Worker registration failed", error);
		});
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
