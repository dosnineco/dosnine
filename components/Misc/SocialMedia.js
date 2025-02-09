import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const socialLinks = [
//   {
//     name: 'Facebook',
//     icon: Facebook,
//     url: 'https://facebook.com',
//     hoverColor: 'hover:text-seconday-color'
//   },
//   {
//     name: 'Twitter',
//     icon: Twitter,
//     url: 'https://twitter.com',
//     hoverColor: 'hover:text-seconday-color'
//   },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com/dosnine_media_',
    hoverColor: 'hover:text-seconday-color'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://jm.linkedin.com/company/dosnine-media',
    hoverColor: 'hover:text-seconday-color'
  },


];

const SocialMedia = () => {
  return (
    <section className="bg-secondary-color w-full items-center  py-20">
        <div className=" mx-auto flex justify-center align-center items-center flex-col px-6">
          <div className="max-w-sm mx-auto"></div>
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Connect With Us</h3>
                <p className=" text-sm text-gray-600 mb-6">Follow us on social media to stay updated with the latest news and updates.</p>
                <div className="flex justify-center gap-6">
                    {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                        <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`transform transition-all duration-200 hover:scale-110 ${social.hoverColor}`}
                        aria-label={`Follow us on ${social.name}`}
                        >
                        <Icon size={28} className="text-primary-color hover:text-current" />
                        </a>
                    );
                    })}
                </div>
                </div>

    </div>
    
      </section>
  );
};

export default SocialMedia;