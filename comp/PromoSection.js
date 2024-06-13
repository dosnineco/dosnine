import React from 'react';
import styles from './styles/PromoSection.module.css';

const PromoSection = () => {
  return (
    <section className={styles.promoSection}>
      <div className={styles.content}>
        <h1>Ship your Services Online in 2 days, <br/><span className={styles.highlight}>not headaches</span></h1>
        <p className={styles.description}>
          Our NextJS boilerplate made only for businesses that offer services. <br/> 
          Our site is for <strong>$129USD = $19974JMD</strong> for a boilerplate Website.   
          <div className={styles.rating}>Rated:  ★★★★★
        </div>
        </p>
     
        <button className={styles.ctaButton}><a href='https://7617327545561.gumroad.com/l/Servicelaunch' >Get Service launch</a></button>

   
      </div>
    </section>
  );
};

export default PromoSection;
