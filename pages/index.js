
import Services from 'components/Services';
import Hero from 'components/Hero';
import Faq from 'components/Faq';
import WhatsNew from 'components/WhatsNew';
import HowItWorks from 'components/Howitworks';
import Seo from 'components/Seo';
import React, { useState, useEffect } from 'react';
import ClassDropdown from 'components/ClassDropdown';
import YouTubeVideo from 'components/YouTubeVideo';
import SalePopup from 'components/SalePopup';
import CalendlyEmbed from 'components/CalendlyEmbed';
import IconGrid from 'components/IconGrid';

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
    
      <Seo siteTitle='Dosnine' pageTitle={`Service-based business Template - Dosnine Media`} description='Service-based business Template paired with 5+ workflow tools
for common business needs.' url='www.dosnine.com'/>
      <Hero/>
      <IconGrid/>
      {/* <SalePopup/> */}
      {/* <ClassDropdown classNames={classNames} onSelect={setSelectedClass} /> */}
      <HowItWorks/>
      {/* <Services/> */}
      <WhatsNew />
      <CalendlyEmbed url='https://calendly.com/d/cmtr-dn6-xb7/dosnine-meeting'/>
      <Faq />
    </>
  
  );
}
