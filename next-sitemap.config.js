/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || "https://codinasion.vercel.app",
  generateRobotsTxt: true,
  exclude: [
    "/programme/**",
    "/dsa/**",
    "/blog/**",
    "!/programme/tags**",
    "!/blog/tags**",
    "/programme-sitemap.xml",
    "/dsa-sitemap.xml",
    "/blog-sitemap.xml",
  ],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${
        process.env.SITE_URL || "https://codinasion.vercel.app"
      }/programme-sitemap.xml`,
      `${
        process.env.SITE_URL || "https://codinasion.vercel.app"
      }/dsa-sitemap.xml`,
      `${
        process.env.SITE_URL || "https://codinasion.vercel.app"
      }/blog-sitemap.xml`,
    ],
  },
};

module.exports = config;
