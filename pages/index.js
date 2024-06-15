import Header from 'comp/Header';
import Footer from 'comp/Footer';
import Services from 'comp/Services';
import PromoSection from 'comp/PromoSection';
import Faq from 'comp/Faq';
import WhatsNew from 'comp/WhatsNew';
import HowItWorks from 'comp/Howitworks';
import Seo from 'comp/Seo';
import ContactForm from 'comp/ContactForm';

const servicesData = [
  { title: "Brand Strategy Consultation", description: "Tailored sessions to define your brand’s message and identity..." },
  { title: "Social Media Campaigns", description: "Comprehensive social media management..." },
  { title: "Virtual Event Management", description: "Expert organization and execution of virtual events..." },
  { title: "Corporate Hospitality and VIP Experiences", description: "Creating unique and exclusive experiences..." },
];

const faqs = [



  { question:'What is the cost of your website creation service?', answer:'Cost for a boilerplate is $79 USD.'
  },
  
  {
  question:'Are there any hidden fees or additional charges?', answer:'No additional fees; all domain names are renewed every 2 years. which you have to pay for.'
  },
  
  {
      question: "What can the websites that we create do?",   answer: "The website offers a variety of functionalities, including showcasing your business, advertising your services, adding workflow, booking appointments, capturing leads, providing information, and facilitating contact with potential clients."
  },
  {
      question: "How long does it take to create and launch the website?", answer: "All our sites are deployed in 1–2 business days."
    },
    {
      question:'What kind of support do you offer after the website is live?',  answer:'We maintain all sites, extra maintenance is for $8 USD a year.'
    },
    {
  question:'Can I update the content on my website myself?',    answer:'No, changes are done by our team. Just state what you need.'
    },
    {
  question:'Do you provide domain registration and hosting services? ',  answer:'No, this is external to us.'
    },
    {
      question:'How customizable are the templates?', answer:'The boilerplate is as is. You can only add your business information and change the theme.'
    },
    {
      question:'Will my website be mobile-friendly?',  answer:'All sites are made for all devices by default.'
    },
  
  
  
];


export default function RetrieveBanks() {

  return (
    <>
      <Seo siteTitle='dosnine' pageTitle='Dosnine Media' description='' url='www.dosnine.com'/>
      <Header/>
      <PromoSection/>
      <HowItWorks/>
      <WhatsNew />
      <Faq faq={faqs}/>
      <ContactForm/>
      <Footer/>
    </>
  
  );
}
