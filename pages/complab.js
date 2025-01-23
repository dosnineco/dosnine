import YouTubeVideo from 'components/YouTubeVideo';
import React from 'react';
import Header from 'components/Header';
import HeroCentered from './../components/Heros/HeroCentered';
import PhoneNumber from './../components/PhoneNumber';
import Services from './../components/Services';
import Footer from './../components/Footer';

const Hero = () => {
  return (
      <><Header /><HeroCentered /><PhoneNumber /><Services /><Footer /></>
  );
};

export default Hero;
