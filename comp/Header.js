import React, { useState } from "react";
import styles from './styles/header.module.css'
import ImagePopup from './ImagePopup';



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
		  <ImagePopup src="./logo.png" alt="themes" width={54} height={54} />
		  {/* <a href="/">Dosnine Media</a> */}
		  </div>
		  <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
			<div className={styles.nav_wrapper}>
				<a href="/blog">Services</a>
				<a href="#contact">Contact Us</a>
	
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