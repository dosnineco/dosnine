import Header from 'comp/Header';
import Footer from 'comp/Footer';
import Services from 'comp/Services';
import PromoSection from 'comp/PromoSection';
import Faq from 'comp/Faq';
import WhatsNew from 'comp/WhatsNew';
import HowItWorks from 'comp/Howitworks';
import Seo from 'comp/Seo';
import ContactForm from 'comp/ContactForm';



export default function RetrieveBanks() {
  return (
    <>
      <Seo siteTitle='dosnine' pageTitle={`Service Delivery Industry #1 Website Template - Dosnine Media`} description='Get Your Website Up In A Day!,Not In Weeks!' url='www.dosnine.com'/>
      <Header/>
      <PromoSection/>
      <HowItWorks/>
      {/* <WhatsNew /> */}
      {/* <Services /> */}
      <Faq />
      <ContactForm/>
      <Footer/>
    </>
  
  );
}
