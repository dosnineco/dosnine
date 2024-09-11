import React, { useState } from "react";
import styles from './styles/header.module.css'
import ImagePopup from './ImagePopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'


const Header =()=>{
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
	  setIsOpen(!isOpen);
	};
  
	return (
	  /**This code is templates for headers */
	  <header className={styles.header}>
	  <section className={styles.header_wrapper}>
		<div className={styles.container}>
		  <div className={styles.logo}>
		  {/* <ImagePopup src="./logo.png" alt="themes" width={54} height={54} /> */}
		  <a href="/">Dosnine Media</a>
		  </div>
		  {/* <h2 className={styles.logo}>876823575</h2> */}
		  <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
			<div className={styles.nav_wrapper}>
				{/* <a href="#services">Services</a> */}
				{/* <a href="tel:+18763369045" className={styles.phoneNumber}>+1 (876)336-9045</a> */}
				<a href="" className={styles.phoneNumber}>  
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						aria-hidden="true"
						focusable="false"
						role="img"
						width="25"
						height="25"
					>
					<path
						fill="#c0c0c0"
						d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
					/>
					</svg>	
				 </a>
					
				<a href="https://www.linkedin.com/company/dosnine-media?trk=ppro_cprof" className={styles.phoneNumber}>
				<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						aria-hidden="true"
						focusable="false"
						role="img"
						width="25"
						height="25"
					>
					<path
						fill="#c0c0c0"
						d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
					/>
					</svg>	
				</a>
				<a href="#contact">

				<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						aria-hidden="true"
						focusable="false"
						role="img"
						width="25"
						height="25"
					>
					<path
						fill="#c0c0c0"
						d="M256 48C141.1 48 48 141.1 48 256l0 40c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-40C0 114.6 114.6 0 256 0S512 114.6 512 256l0 144.1c0 48.6-39.4 88-88.1 88L313.6 488c-8.3 14.3-23.8 24-41.6 24l-32 0c-26.5 0-48-21.5-48-48s21.5-48 48-48l32 0c17.8 0 33.3 9.7 41.6 24l110.4 .1c22.1 0 40-17.9 40-40L464 256c0-114.9-93.1-208-208-208zM144 208l16 0c17.7 0 32 14.3 32 32l0 112c0 17.7-14.3 32-32 32l-16 0c-35.3 0-64-28.7-64-64l0-48c0-35.3 28.7-64 64-64zm224 0c35.3 0 64 28.7 64 64l0 48c0 35.3-28.7 64-64 64l-16 0c-17.7 0-32-14.3-32-32l0-112c0-17.7 14.3-32 32-32l16 0z"
					/>
					</svg>
				</a>
	
			</div>
		  </nav>
		  <div className={styles.hamburger_} onClick={toggleMenu}>
			<div>{isOpen ? 
				<div className={styles.close_icon}>
				<div className={styles.bar1}></div>
				<div className={styles.bar2}></div>
		
				</div>
				
				:  
			    <div className={styles.hamburger}>
					<div className={styles.bar1}></div>
					<div className={styles.bar2}></div>
					<div className={styles.bar3}></div>
   			 	</div>
			    }</div>
		  </div>
		</div>
		</section>
	  </header>
	);
}

export default Header




