import Header from 'components/Header';
import Footer from 'components/Footer';
import Services from 'components/Services';
import Hero from 'components/Hero';
import Faq from 'components/Faq';
import WhatsNew from 'components/WhatsNew';
import HowItWorks from 'components/Howitworks';
import Seo from 'components/Seo';
import ContactForm from 'components/ContactForm';
import FeaturedItems from 'components/FeaturedItems';
import React, { useState, useEffect } from 'react';
import ClassDropdown from 'components/ClassDropdown';

const classNames = ['theme-maroon', 'theme-mint','theme-rose','theme-silver','theme-gold ','theme-olive','theme-indigo','theme-lime','theme-cyan','theme-brown','theme-teal','theme-pink','theme-orange','theme-purple','theme-green','theme-blue','theme-dark-green','theme-yellow-deep','theme-gray-peach','theme-gray-light','theme-red'];

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
      <Hero/>
      <ClassDropdown classNames={classNames} onSelect={setSelectedClass} />
      {/* <FeaturedItems/> */}
      {/* <HowItWorks/> */}
      <WhatsNew />
      {/* <Services /> */}
      <Faq />
      <ContactForm/>
      <Footer/>
    </>
  
  );
}
