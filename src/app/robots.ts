interface RobotsConfig {
  rules: {
    userAgent: string;
    allow: string;
  };
  sitemap: string;
  host: string;
}

export default function robots(): RobotsConfig {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://farmersbash.com/sitemap.xml',
    host: 'https://farmersbash.com'
  }
} 