import React from 'react';
import styles from './styles/PromoSection.module.css';
import YouTubeVideo from './YouTubeVideo';
import { 
  CheckCircle2, 
} from 'lucide-react';


const Hero = () => {
  return (
    <section className={styles.promoSection}>
      <div className={styles.imageWrapper}>
        {/* <ImagePopup src="./design.png" alt="themes" width={1135} height={1016} /> */}
        <YouTubeVideo url="https://youtu.be/y5NUxNAveAQ" />
        {/* <PhoneNumber/> */}

      </div>


      <div className={styles.content}>
        <h1 >Get a Website <span className='text-orange-600' >in hours</span>! <br/>Not in <span className={styles.strikeThroughRed}>weeks</span>! </h1>
        <p className={styles.description}> Service-based business Template paired with 5+ workflow tools for common business needs. For only <strong>$178USD/1yr</strong>.    
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
          {/* Trust Indicators */}
          <div className="mt-20 text-center">
          <div className="flex flex-wrap justify-center items-center gap-6">
            <div className="flex items-center text-inherit	">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
              <span>7-day money-back guarantee</span>
            </div>
            <div className="flex items-center text-inherit">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center text-inherit">
              <CheckCircle2 className="w-5 h-5 text-bold text-green-500 mr-2" />
              <span>Free Updates</span>
            </div>
          </div>
          </div>

     
      </div>
    </section>
  );
};

export default Hero;
