import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site as siteData } from '../data/site';

export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft && !data.project))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: siteData.title,
    description: siteData.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.date,
      link: `/${post.id}/`,
    })),
    customData: '<language>en-GB</language>',
  });
}
