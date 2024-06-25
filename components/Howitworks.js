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
        <p>Take a look at this site. Yes! It was made with the template. Do you like it? </p>
      </div>
    </div>
    <div className={styles.step}>
      <span className={styles.stepNumber}>2</span>
      <div className={styles.stepText}>
        <h3>Are you all set on getting the template? </h3>
        <p>Contact me through my contact form. I will then contact you via one of the medium you provided to get your business info to add to your website. </p>
        <a href='#contact'  className={styles.howItWorksButton}>Book here</a> 

      </div>
    </div>
    <div className={styles.step}>
      <span className={styles.stepNumber}>3</span>
      <div className={styles.stepText}>
        <h3>Make your payment for your template. </h3>
        <p>Once payment is made, you have the option to make us pay for your domain name. Or if you would like to buy the domain and configure your DNS to connect to your template.

        </p>

      </div>
    </div>
    <div className={styles.step}>
      <span className={styles.stepNumber}>4</span>
      <div className={styles.stepText}>
        <h3>Your Website Is now live! </h3>
        <p></p>

      </div>
    </div>
  </div>
</div>
</section>

);
};

export default HowItWorks;
