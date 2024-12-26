import React from 'react';
import Link from 'next/link';
import css from './styles/footer.module.css';
const Footer = () => {
    return (
        <>
        <footer  className={css.footer}>
            <h2 className={css.h2}>Dosnine™ Media - Service website Experts</h2>
            <ul className={css.lists} >
                <li><a className={css.regular}>	About</a></li>
                <li><a className={css.regular}>	Privacy Policy</a></li>
                <li><a className={css.regular}>	Contact</a></li>

			</ul>
            <span className={css.madeby} > © {new Date().getFullYear()}   Powered By Dosnine™   </span>
            
      </footer>

      </>
    )
}

export default Footer
