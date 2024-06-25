import React from 'react';
import styles from './styles/PromoSection.module.css';
import ImagePopup from './ImagePopup';

const PromoSection = () => {
  return (
    <section className={styles.promoSection}>
      <div className={styles.imageWrapper}>
        <ImagePopup src="./design.png" alt="themes" width={1135} height={1016} />
      </div>
      <div className={styles.content}>
        <h1>Get your Website up in <span className={styles.highlight}>a day!</span>, <br/>Not in <span className={styles.strikeThroughRed}>weeks</span>!</h1>
        <p className={styles.description}>
          Our NextJS boilerplate made only for business that offer services. <br/> 
          Why get a website
          Our boilerplate is for <strong>$79USD</strong>.    
        </p>
        <button className={styles.ctaButton}><a href='https://7617327545561.gumroad.com/l/yrccb' >Buy Template</a></button>
      </div>
    </section>
  );
};

export default PromoSection;
