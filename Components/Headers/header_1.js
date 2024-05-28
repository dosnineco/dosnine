import { useState } from 'react';
import styles from './header_1.module.css';

const Header_1 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    /**This code is templates for headers */
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <a href="/">BestPest</a>
        </div>
        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
          <a href="/blog">Blog</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className={styles.hamburger} onClick={toggleMenu}>
          <div>{isOpen ? 'X' : '='}</div>
        </div>
      </div>
    </header>
  );
};

export default Header_1;
