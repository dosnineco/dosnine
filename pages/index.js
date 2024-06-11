import { useEffect, useState } from 'react';
import Header from 'comp/Header';
import Footer from 'comp/Footer';
import Services from 'comp/Services';
import PromoSection from 'comp/PromoSection';
import Faq from 'comp/Faq';
import WhatsNew from 'comp/WhatsNew';


const servicesData = [
  { title: "Brand Strategy Consultation", description: "Tailored sessions to define your brand’s message and identity..." },
  { title: "Social Media Campaigns", description: "Comprehensive social media management..." },
  { title: "Virtual Event Management", description: "Expert organization and execution of virtual events..." },
  { title: "Corporate Hospitality and VIP Experiences", description: "Creating unique and exclusive experiences..." },
];

const faqs = [
  { question:'What is the cost of your website creation service?', answer:'Cost for any one of or sites are $150. Or pay ONLY for the Domain name and get the site for free but you have to do a video testimonial.'
  },

  {
    question:'Are there any hidden fees or additional charges?', answer:'No addition fees, all domains name are renewed every 2 years.'
  },

  {
    question: "What can the websites that we create do?",   answer: "The website offers a variety of functionalities including showcasing your business, advertise your services, add Workflow, booking appointments, capturing leads, providing information, and facilitating contact with potential clients."
  },
  {
    question: "How long does it take to create and launch the website?", answer: "All our sites are deployed in 1 - 2 business day."
  },
  {
    question:'What kind of support do you offer after the website is live?',  answer:'We maintain all sites for free.'
  },
  {
    question:'Can I update the content on my website myself?',    answer:'No, changes are done by our team. Just state what you need.'
  },
  {
    question:'Do you provide domain registration and hosting services? ',  answer:'No, this is external to us.'
  },
  {
    question:'How customizable are the templates?', answer:'We can change the template to your desired outcome.'
  },
  {
    question:'Will my website be mobile-friendly?',  answer:'All sites are made for all devices by default.'
  },
  {
    question: "what are you going to do differently that I can’t get for free?",  answer: "As a software engineer, I code all my sites from scratch. You won't incur monthly or yearly fees like those other codeless sites. We also maintain your site at no additional cost. So focus on you business and reduce friction."
  },

  {
    question: "What is included in the simple site?",  answer: "Options include a custom-built website tailored to your needs, a landing page for your business,  SEO optimization, responsive design, and ongoing support and maintenance. We do all the work for you."
  }
];


export default function RetrieveBanks() {

  return (
    <>
      <Header/>
      <PromoSection/>
      <Services title="Join creators on the fast track to success" services={servicesData} />
      <WhatsNew />
      <Faq faq={faqs}/>
      <Footer/>
    </>
  
  );
}
