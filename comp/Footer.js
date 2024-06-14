import React from 'react';
import Link from 'next/link';
import css from './styles/footer.module.css';
import GlitterButton from './GlitterButton';
const Footer = () => {
    return (
        <>
        <footer  className={css.footer}>
            <h2 className={css.h2}>Dosnine™ Media - Service website Experts</h2>
            <ul className={css.lists} >
                <li><Link href='/' passHref><a className={css.regular}>	About</a></Link></li>
                <li><Link href='/privacy-policy' passHref><a className={css.regular}>	Privacy Policy</a></Link></li>
                <li><GlitterButton text={`WIN $100 EASY`}/></li>
                <li><Link href='#contact' passHref><a className={css.regular}>	Contact</a></Link></li>

			</ul>
            <span className={css.madeby} > © {new Date().getFullYear()}   Powered By Dosnine™   </span>
            
      </footer>

      </>
    )
}

export default Footer
