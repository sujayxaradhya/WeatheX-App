import React from "react";
import styles from "./PreLoader.module.scss";

const PreLoader: React.FC = () => {
	return (
		<div id={styles.loader}>
			<div className={styles.cloud}>
				<div className={styles.cloud_base}>
					<div className={styles.cloud_small_part}></div>
					<div className={styles.cloud_big_part}></div>
				</div>
			</div>
			<div className={styles.sun}>
				<div className={styles.sun_beams1}></div>
				<div className={styles.sun_beams2}></div>
				<div className={styles.sun_beams3}></div>
				<div className={styles.sun_beams4}></div>
				<div className={styles.sun_beams5}></div>
				<div className={styles.sun_beams6}></div>
			</div>
			<div className={styles.teardrops}>
				<div className={styles.teardrop1}>
					<svg width="80%" viewBox="0 0 30 42">
						<path
							fill="lightblue"
							stroke="lightblue"
							strokeWidth="1.5"
							d="M15 3
                                Q16.5 6.8 25 18
                                A12.8 12.8 0 1 1 5 18
                                Q13.5 6.8 15 3z"
						/>
					</svg>
				</div>
				<div className={styles.teardrop2}>
					<svg width="80%" viewBox="0 0 30 42">
						<path
							fill="lightblue"
							stroke="lightblue"
							strokeWidth="1.5"
							d="M15 3
                                Q16.5 6.8 25 18
                                A12.8 12.8 0 1 1 5 18
                                Q13.5 6.8 15 3z"
						/>
					</svg>
				</div>
				<div className={styles.teardrop3}>
					<svg width="80%" viewBox="0 0 30 42">
						<path
							fill="lightblue"
							stroke="lightblue"
							strokeWidth="1.5"
							d="M15 3
                                Q16.5 6.8 25 18
                                A12.8 12.8 0 1 1 5 18
                                Q13.5 6.8 15 3z"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default PreLoader;
