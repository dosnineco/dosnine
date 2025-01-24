import YouTubeVideo from 'components/Misc/YouTubeVideo';
import React from 'react';
import Header from 'components/Headers/Header';
import HeroCentered from '../../components/Heros/HeroCentered';
import PhoneNumber from '../../components/Misc/PhoneNumber';
import Services from '../../components/Services/Services';
import Footer from '../../components/Footers/Footer';

const Hero = () => {
  return (
      <><Header /><HeroCentered /><PhoneNumber /><Services /><Footer /></>
  );
};

export default Hero;
