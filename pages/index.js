
import Hero from './../components/Heros/Hero';
import Faq from './../components/Faqs/Faq';
import WhatsNew from './../components/Heros/WhatsNew';
import HowItWorks from './../components/Heros/Howitworks';
import Seo from './../components/Misc/Seo';
import CountdownTimer from './../components/Misc/CountdownTimer';
import ContactForm from "./../components/ContactForms/ContactForm";
import SignupPopup from './../components/Misc/SignupPopup';
import WhatsAppChat from './../components/Misc/WhatsAppChat';
import SocialMedia from './../components/Misc/SocialMedia';

export default function Home() {

  return (
    <>
      <Seo siteTitle='Dosnine' pageTitle={`Service-based business Template - Dosnine Media`} description='Service-based business Template paired with 5+ workflow tools
for common business needs.' url='www.dosnine.com'/>
      <CountdownTimer />
      {/* <SignupPopup /> */}

      <Hero />
      <HowItWorks />
      <WhatsNew />
      <ContactForm />
      <SocialMedia/>

      <Faq />

      <WhatsAppChat/>
    </>
  );
}
