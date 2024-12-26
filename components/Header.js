import React, { useState } from "react";
import styles from './styles/header.module.css'
import {
	SignedIn,
	UserButton
  } from '@clerk/nextjs'


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
		<SignedIn>
          <UserButton />
      		</SignedIn>
		  <div className={styles.logo}>
		  {/* <ImagePopup src="./logo.png" alt="themes" width={54} height={54} /> */}
		  <a href="/">Dosnine</a> 
		  </div>
		  {/* <h2 className={styles.logo}>876823575</h2> */}
		  <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
			<ul className={styles.nav_wrapper}>
			
			<li><a href="/jets-converter" className="text-white-900 ">Jets Converter </a></li>

          </ul>
		

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




