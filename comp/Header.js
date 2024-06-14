import React, { useState } from "react";
import styles from './styles/header.module.css'



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
			<a href="/">Dosnine Media</a>
		  </div>
		  <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
			<a href="/blog">Services</a>
			<a href="#contact">Contact Us</a>
		  </nav>
		  <div className={styles.hamburger_} onClick={toggleMenu}>
			<div>{isOpen ? 'X' :  
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