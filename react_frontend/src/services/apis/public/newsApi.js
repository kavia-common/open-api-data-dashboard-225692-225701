import { httpFetch } from '../../httpClient';
import { withRetry } from '../util/retry';
import { cleanObject } from '../util/sanitization';

// PUBLIC_INTERFACE
export async function getNews() {
  /** Fetch latest news from Spaceflight News (public) */
  const url = 'https://api.spaceflightnewsapi.net/v4/articles/?limit=10';
  const exec = () => httpFetch(url, { absolute: true, timeout: 8000 });
  const data = await withRetry(exec, { retries: 2 });
  const results = data?.results || [];
  const normalized = results.map((n) => ({
    id: n.id,
    title: n.title,
    url: n.url,
    source: n.news_site,
    publishedAt: n.published_at,
  }));
  return cleanObject(normalized);
}
