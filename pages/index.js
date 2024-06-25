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


export default function Home() {
  return (
    <>
      <Seo siteTitle='Dosnine' pageTitle={`Service Delivery Industry #1 Website Template - Dosnine Media`} description='Get Your Website Up In A Day!,Not In Weeks!' url='www.dosnine.com'/>
      <Header/>
      <PromoSection/>
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
