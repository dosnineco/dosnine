import HeroMinimal from "components/Heros/HeroMinimal";
import PhoneNumber from './../components/Misc/PhoneNumber';
import FeatureCards from "components/Services/FeatureCards";
import WhatsNew from "components/Heros/WhatsNew";
import ContactForm from "components/ContactForms/ContactForm";
import HowItWorks from "components/Heros/Howitworks";
import MarketingContact from "components/ContactForms/MarketingContact";
import LegalContactForm from './../components/ContactForms/LegalContactForm';
import MedicalContactForm from './../components/ContactForms/MedicalContactForm';



export default function Home() {

    return (
      <>
        {/* <Header /> */}
        <HeroMinimal />
        {/* <PhoneNumber /> */}
        {/* <FeatureCards /> */}
        {/* <WhatsNew /> */}
        {/* <ContactForm /> */}
        {/* <MarketingContact/> */}
        <MedicalContactForm/>
        {/* <LegalContactForm/> */}
        <HowItWorks/>

        {/* <Footer /> */}
      </>
    );
  }
  