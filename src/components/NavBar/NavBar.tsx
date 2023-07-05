import React from "react";
import styles from "./NavBar.module.scss";

const NavBar: React.FC = () => {
	return (
		<>
			<div className={styles.navbar}>
				<h1 className={styles.logo}>WeatheX</h1>
			</div>
		</>
	);
};

export default NavBar;
