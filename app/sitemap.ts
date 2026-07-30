import { MetadataRoute } from 'next';
import dbConnect from '@/lib/db';
import PersonalityModel from '@/models/Personality';
import ArticleModel from '@/models/Article';
import EventModel from '@/models/Event';

const SITE_URL = 'https://www.proudofpakistan.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await dbConnect();

  const personalities = await PersonalityModel.find({ status: 'approved' }).select('slug updatedAt').lean();
  const articles = await ArticleModel.find({}).select('slug updatedAt').lean();
  const events = await EventModel.find({}).select('_id updatedAt').lean();

  const personalityUrls: MetadataRoute.Sitemap = personalities.map((p: any) => ({
    url: `${SITE_URL}/personalities/${p.slug}`,
    lastModified: p.updatedAt || new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const articleUrls: MetadataRoute.Sitemap = articles.map((a: any) => ({
    url: `${SITE_URL}/blog/${a.slug}`,
    lastModified: a.updatedAt || new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/personalities`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/events`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...personalityUrls,
    ...articleUrls,
  ];
}

