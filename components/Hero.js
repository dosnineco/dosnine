import React from 'react';
import styles from './styles/PromoSection.module.css';
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

         <div className="flex flex-col  justify-center items-center sm:flex-row gap-4 mt-6">
    {/* Buy Template Button */}
    <button className="relative  text-black text-lg sm:text-xl font-bold py-4 sm:py-6 px-8 sm:px-12 rounded hover:bg-yellow-500 transition-colors w-full sm:w-auto">
      <a href="https://7617327545561.gumroad.com/l/yrccb">Buy Template</a>
      <div className="box-shadow  absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-25 pointer-events-none animate-glitter"></div>
    </button>

    {/* Register Here Button */}
    <button className="box-shadow relative bg-green-500 text-black text-lg sm:text-xl font-bold py-4 sm:py-6 px-8 sm:px-12 rounded hover:bg-green-600 transition-colors w-full sm:w-auto">
      <a href="/register">Register Here</a>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-25 pointer-events-none animate-glitter"></div>
    </button>
  </div>
     
      </div>
    </section>
  );
};

export default Hero;
