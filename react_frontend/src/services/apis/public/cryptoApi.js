import { httpFetch } from '../../httpClient';
import { withRetry } from '../util/retry';
import { cleanObject } from '../util/sanitization';

// PUBLIC_INTERFACE
export async function getTopMarkets() {
  /** Fetch top crypto markets from CoinGecko public endpoint */
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
  const exec = () => httpFetch(url, { absolute: true, timeout: 8000 });
  const data = await withRetry(exec, { retries: 2 });
  const normalized = (Array.isArray(data) ? data : []).map((d) => ({
    id: d.id,
    name: d.name,
    symbol: d.symbol?.toUpperCase(),
    price: d.current_price,
    change24h: d.price_change_percentage_24h,
    image: d.image,
  }));
  return cleanObject(normalized);
}
