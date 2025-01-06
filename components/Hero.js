import React from 'react';
import styles from './styles/PromoSection.module.css';
import ImagePopup from './ImagePopup';
import YouTubeVideo from './YouTubeVideo';

const Hero = () => {
  return (
    <section className={styles.promoSection}>
      <div className={styles.imageWrapper}>
        {/* <ImagePopup src="./design.png" alt="themes" width={1135} height={1016} /> */}
        <YouTubeVideo url="https://youtu.be/EXfFBEuCAr0?si=lrIwWS3oVWik8_6V" />

      </div>
      <div className={styles.content}>
        <h1>Get a Website <span className={styles.highlight}>in hours</span>, <br/>Not in <span className={styles.strikeThroughRed}>weeks</span>! </h1>
        <p className={styles.description}> Service-based business Template paired with 5+ workflow tools <br/> for common business needs. For only <strong>$178USD/1yr</strong>.    
        </p>
        <button className="box-shadow relative bg-yellow-400 text-black text-xl font-bold py-6 px-12 rounded hover:bg-yellow-500 transition-colors">
          <a href='https://7617327545561.gumroad.com/l/yrccb'>Buy Template</a>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-25 pointer-events-none animate-glitter"></div>
        </button>
     
      </div>
    </section>
  );
};

export default Hero;
