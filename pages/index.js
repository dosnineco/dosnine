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

const classNames = ['theme-maroon', 'theme-rose', 'theme-mint'];

export default function Home() {

  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && selectedClass) {
      document.body.className = selectedClass;
    }
  }, [selectedClass]);
  return (
    <>
      <Seo siteTitle='dosnine' pageTitle={`Service Delivery Industry #1 Website Template - Dosnine Media`} description='Get Your Website Up In A Day!,Not In Weeks!' url='www.dosnine.com'/>
      <Header/>
      <PromoSection/>
      <ClassDropdown classNames={classNames} onSelect={setSelectedClass} />

      <HowItWorks/>
      {/* <WhatsNew /> */}
      {/* <Services /> */}
      {/* <FeaturedItems/> */}
      <Faq />
      <ContactForm/>
      <Footer/>
    </>
  
  );
}
