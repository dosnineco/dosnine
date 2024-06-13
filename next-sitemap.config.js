module.exports = {
    siteUrl: 'https://www.dosnine.com',
    generateRobotsTxt: true, // (optional)
    robotsTxtOptions: {
      policies: [{ userAgent: "*", disallow: "/api", disallow: "/404",disallow:'/500' }],
    },
    exclude: ["/api/*", "404","500", "/server-sitemap.xml"],
    robotsTxtOptions: {
      additionalSitemaps: ["https://www.dosnine.com/server-sitemap.xml"],
    },
  };