const path = require('path');

module.exports = {
  webpack: (config) => {
    config.resolve.alias['@components'] = path.join(__dirname, 'components');
    return config;
  },
  images: {
    domains: ['images.unsplash.com'], // Add the domain here
  },
};

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development', // Disable PWA in development
});

module.exports = withPWA({
  reactStrictMode: true,
});