import React from 'react';
import styles from './styles/howitworks.module.css';

const HowItWorks = () => {
  return (

<section className={styles.howItWorks}>
<h2 className={styles.worksTitle}>How to get a website in a day?</h2>
<p className={styles.worksSubtitle}>WORKING PROCESS</p>
<div className={styles.worksContent}>
  
  {/* <img className={styles.worksImage} src="/ai-writer.png" alt="AI Writer Process" /> */}
  <div className={styles.worksSteps}>
    <div className={styles.step}>
      <span className={styles.stepNumber}>1</span>
      <div className={styles.stepText}>
        <h3>You have to be a service business that does not sell products online.</h3>
        <p>Online stores are time consuming to implement, which would make our websites more expensive to develop.</p>
        {/* <a href="#" className={styles.getStarted}>Get Started →</a> */}
      </div>
    </div>
    <div className={styles.step}>
      <span className={styles.stepNumber}>2</span>
      <div className={styles.stepText}>
        <h3>Deside if your service business needs a website.</h3>
      </div>
    </div>
    <div className={styles.step}>
      <span className={styles.stepNumber}>3</span>
      <div className={styles.stepText}>
        <h3>Book a appointment </h3>
        <p>Once step 1 to 2 is ok, on call we will collect info on your business to tailor the boilerplate to your business and Publish to your domain. </p>

        <a href='#contact'  className={styles.howItWorksButton}>Book here</a>
      </div>
    </div>
    <div className={styles.step}>
      <span className={styles.stepNumber}>4</span>
      <div className={styles.stepText}>
        <h3>Your Website Is now live! </h3>
      </div>
    </div>
  </div>
</div>
</section>

);
};

export default HowItWorks;
