import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Page404.module.scss";

const Page404: React.FC = () => {
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<div className={styles.page404}>
			<h1 className={styles.page404__num}>404</h1>
			<img
				src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
				className={styles.page404__bgImg}
				alt="Page 404 weird image"
			/>
			<h2 className={styles.page404__text}>Seems like you aren't on earth.</h2>
			<p className={styles.page404__tipText}>
				<strong>Tip:</strong> Try searching correct city name.
			</p>
			<button className={styles.page404__btn} onClick={handleGoBack}>
				Go Back
			</button>
		</div>
	);
};

export default Page404;
