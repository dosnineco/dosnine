import React from 'react';
import styles from './styles/PromoSection.module.css';

const PromoSection = () => {
  return (
    <section className={styles.promoSection}>
      <div className={styles.content}>
        <h1>Ship your startup in days, <br/><span className={styles.highlight}>not weeks</span></h1>
        <p className={styles.description}>
          The NextJS boilerplate with all you need to build your SaaS, AI tool, or any other web app and make your first $ online fast.
          <div className={styles.rating}>
          ★★★★★ 3597 makers ship faster
        </div>
        </p>
     
        <button className={styles.ctaButton}>⚡ Get ShipFast</button>
        <p className={styles.discount}>$100 off for the first 3610 customers (13 left)</p>
   
      </div>
    </section>
  );
};

export default PromoSection;
