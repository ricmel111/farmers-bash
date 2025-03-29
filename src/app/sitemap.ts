interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export default function sitemap(): SitemapEntry[] {
  return [
    {
      url: 'https://farmersbash.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    }
  ]
} 