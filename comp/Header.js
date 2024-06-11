import React, { useState } from "react";
import css from './styles/header.module.css'
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
				{/* <Image src="/logo.png" layout='intrinsic' width={50} height={50} placeholder='blur' blurDataURL priority/> */}
				Dosnine Media 

				</h2>
			</Link>

		</nav>
	  </header>
	);
  };


const Header =()=>{
	return(
		<>
		<Navbar/>
		</>
	)
}

export default Header