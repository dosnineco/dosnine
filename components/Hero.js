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
        <h1>Get a Website <span className={styles.highlight}>in hours</span>, <br/>Not in <span className={styles.strikeThroughRed}>weeks</span>! </h1>
        <p className={styles.description}>
          Our Website Template is made only for businesses that offer a Service. <br/>
          our boilerplate is for <strong>$140USD/2yr</strong>.    
        </p>
        <button className={styles.ctaButton}><a href='https://7617327545561.gumroad.com/l/yrccb' >Buy Template</a></button>
      </div>
    </section>
  );
};

export default PromoSection;
