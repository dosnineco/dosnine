import React, { useState } from "react";
import styles from './styles/header.module.css'
import Link from 'next/link';
import Image from 'next/image';

const NavItem = ({ text, href, active }) => {
	return (
	  <Link href={href}>
		<a className={`nav__link`}>{text}</a>
	  </Link>
	);
  };
  

  const Navbar = () => {
	const [navActive, setNavActive] = useState(null);
	const [activeIdx, setActiveIdx] = useState(-1);
  
	return (
	  <header className={css.container}>
		<nav className={css.nav}>
			<Link  href='/' passHref>
				<h2 className={`logo`} >
				Dosnine Media 

				</h2>
			</Link>

		</nav>
	  </header>
	);
  };


const Header =()=>{
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
	  setIsOpen(!isOpen);
	};
  
	return (
	  /**This code is templates for headers */
	  <header className={styles.header}>
		<div className={styles.container}>
		  <div className={styles.logo}>
			<a href="/">Dosnine Media</a>
		  </div>
		  <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
			<a href="/blog">Services</a>
			<a href="#contact">Contact Us</a>
		  </nav>
		  <div className={styles.hamburger} onClick={toggleMenu}>
			<div>{isOpen ? 'X' : '='}</div>
		  </div>
		</div>
	  </header>
	);
}

export default Header