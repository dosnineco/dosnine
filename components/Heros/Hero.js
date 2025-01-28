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
        <span className='text-orange-600' > in hours</span>! </h1>
        <p className={styles.description}> Service-based business Template paired with 5+ workflow tools for common business needs. For only <strong>$178USD/1yr</strong>.   
          <span className="text-base text-red-600">(Save $321)</span>
        </p>
    

         <div className="flex flex-col  justify-center items-center sm:flex-row gap-4 mt-2">
  


      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <button 
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold py-4 px-8 rounded-xl transition-transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-orange-200"
                aria-label="Get My Website Now"
              >
                <span className="text-lg">Get My Website Now</span>
              </button>

              <button 
                className="flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-xl transition-transform hover:scale-[1.02] active:scale-95"
                aria-label="See Live Demo"
              >
                <span className="text-lg">See Live Demo</span>
              </button>
            </div>





  </div>
          {/* Trust Indicators */}
          <div className="mt-10 text-center">
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



     

          



   {/* Social Proof */}
{/* <span className="text-gray-600 text-sm font-medium">
Trusted by 1,238+ businesses worldwide
</span> */}