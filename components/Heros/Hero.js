import React from 'react';
import styles from '../styles/PromoSection.module.css';
import YouTubeVideo from '../Misc/YouTubeVideo';
import PhoneNumber from './../Misc/PhoneNumber';
import ImagePopup from './../Misc/ImagePopup';
import { 
  CheckCircle2, 
} from 'lucide-react';


const Hero = () => {
  return (
    <section className={styles.promoSection}>
      <div className={styles.imageWrapper}>
        <ImagePopup src="./design.png" alt="themes" width={1135} height={1016} />
        {/* <YouTubeVideo url="https://youtu.be/y5NUxNAveAQ" /> */}
        {/* <PhoneNumber/> */}

      </div>


      <div className={styles.content}>
        <h1 >Ready-to-Use Website
        <span className='text-primary-color' > in days</span>! </h1>
        <p className={styles.description}> Service-based business Template paired with 5+ workflow tools for common business needs. For only <strong>$178USD/1yr</strong>.   
          <span className="text-base text-red-600">(Save $321)</span>
        </p>
    

         <div className="flex flex-col  justify-center items-center sm:flex-row gap-4 mt-2">
  


      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full justify-center items-center">
  <a 
    href="https://dosnine.gumroad.com/l/yrccb?wanted=true"
    target="_blank" 
    rel="noopener noreferrer"
    className="w-full sm:w-auto box-shadow flex items-center justify-center gap-3 bg-primary-color text-white font-semibold py-4 px-8 rounded-xl transition-transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-orange-200"
    aria-label="Get My Website Now"
  >
   Get Started Now
  </a>

  {/* <a 
    href="/clickaway"
    target="_blank" 
    rel="noopener noreferrer"
    className="w-full sm:w-auto box-shadow flex items-center justify-center gap-3 bg-black-600 text-black font-semibold py-4 px-8 rounded-xl transition-transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-orange-200"
  >
    Click and Win
  </a> */}
</div>








  </div>
          {/* Trust Indicators */}
          <div className="mt-10 text-center">
          <div className="flex flex-wrap justify-center items-center gap-6">
            <div className="flex items-center text-inherit	">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
              <span>30-day money-back guarantee</span>
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



     

          



   {/* Social Proof */}
{/* <span className="text-gray-600 text-sm font-medium">
Trusted by 1,238+ businesses worldwide
</span> */}