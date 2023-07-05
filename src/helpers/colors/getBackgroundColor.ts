import styles from "../../App.module.scss";

const getBackgroundColor = (tempInKelvin: number): string => {
	const tempInCelsius = tempInKelvin - 273.15;

	if (tempInCelsius < 0) {
		return styles.coldTemp;
	} else if (tempInCelsius >= 0 && tempInCelsius < 20) {
		return styles.coolTemp;
	} else if (tempInCelsius >= 20 && tempInCelsius < 30) {
		return styles.warmTemp;
	} else {
		return styles.hotTemp;
	}
};

export default getBackgroundColor;
