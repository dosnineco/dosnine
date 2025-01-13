
import Services from 'components/Services';
import Hero from 'components/Hero';
import Faq from 'components/Faq';
import WhatsNew from 'components/WhatsNew';
import HowItWorks from 'components/Howitworks';
import Seo from 'components/Seo';
import CalendlyEmbed from 'components/CalendlyEmbed';
import PhoneNumber from 'components/PhoneNumber';
import CountdownTimer from 'components/CountdownTimer';

export default function Home() {

  return (
    <>
      <Seo siteTitle='Dosnine' pageTitle={`Service-based business Template - Dosnine Media`} description='Service-based business Template paired with 5+ workflow tools
for common business needs.' url='www.dosnine.com'/>
      <CountdownTimer />
      <Hero />
      <PhoneNumber/>
      <HowItWorks />
      <WhatsNew />
      {/* <CalendlyEmbed url='https://calendly.com/d/cmtr-dn6-xb7/dosnine-meeting'/> */}
      <Faq />
    </>
  );
}
