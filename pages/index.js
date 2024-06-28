<<<<<<< HEAD
import Header from 'components/Header';
import Footer from 'components/Footer';
import Services from 'components/Services';
import PromoSection from 'components/Hero';
import Faq from 'components/Faq';
import WhatsNew from 'components/WhatsNew';
import HowItWorks from 'components/Howitworks';
import Seo from 'components/Seo';
import ContactForm from 'components/ContactForm';
import FeaturedItems from 'components/FeaturedItems';
=======
import Header from 'comp/Header';
import Footer from 'comp/Footer';
import Services from 'comp/Services';
import PromoSection from 'comp/PromoSection';
import Faq from 'comp/Faq';
import WhatsNew from 'comp/WhatsNew';
import HowItWorks from 'comp/Howitworks';
import Seo from 'comp/Seo';
import ContactForm from 'comp/ContactForm';
import FeaturedItems from 'comp/FeaturedItems';
import React, { useState, useEffect } from 'react';
import ClassDropdown from 'comp/ClassDropdown';
>>>>>>> fbc8fa3 (out)

const classNames = ['theme-maroon', 'theme-rose', 'theme-mint'];

export default function Home() {
<<<<<<< HEAD
=======

  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && selectedClass) {
      document.body.className = selectedClass;
    }
  }, [selectedClass]);
>>>>>>> fbc8fa3 (out)
  return (
    <>
      <Seo siteTitle='Dosnine' pageTitle={`Service Delivery Industry #1 Website Template - Dosnine Media`} description='Get Your Website Up In A Day!,Not In Weeks!' url='www.dosnine.com'/>
      <Header/>
      <PromoSection/>
      <ClassDropdown classNames={classNames} onSelect={setSelectedClass} />

      <HowItWorks/>
      {/* <WhatsNew /> */}
      {/* <Services /> */}
      <FeaturedItems/>
      <Faq />
      <ContactForm/>
      <Footer/>
    </>
  
  );
}
