import React from 'react';
import styles from './styles/PromoSection.module.css';

const PromoSection = () => {
  return (
    <section className={styles.promoSection}>
      <div className={styles.content}>
        <h1>Get your Website up in a day, <br/><span className={styles.highlight}>Not in weeks!</span></h1>
        <p className={styles.description}>
          Our NextJS boilerplate made only for business that offer services. <br/> 
          Why get a website
          Our boilerplate is for <strong>$79USD</strong> for a boilerplate Website.    
          <div className={styles.rating}>Rated: ★★★★★ by our happy customers.
        </div>
        </p>
     
        <button className={styles.ctaButton}><a href='https://7617327545561.gumroad.com/l/Servicelaunch' >Buy This Template</a></button>

   
      </div>
    </section>
  );
};

export default PromoSection;
