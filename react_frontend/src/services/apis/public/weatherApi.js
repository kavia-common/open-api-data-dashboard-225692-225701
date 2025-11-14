import { httpFetch } from '../../httpClient';
import { withRetry } from '../util/retry';
import { makeCircuitBreaker } from '../util/circuitBreaker';
import { cleanObject } from '../util/sanitization';

const breaker = makeCircuitBreaker();

// PUBLIC_INTERFACE
export async function getWeatherByCoords({ lat, lon }) {
  /** Fetch current weather from open-meteo by coordinates */
  const latNum = Number(lat);
  const lonNum = Number(lon);
  if (!Number.isFinite(latNum) || !Number.isFinite(lonNum)) throw new Error('Invalid coordinates');

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latNum}&longitude=${lonNum}&current=temperature_2m,wind_speed_10m`;
  const exec = () => httpFetch(url, { absolute: true, timeout: 8000 });
  if (!breaker.canRequest()) throw new Error('Weather service unavailable');
  try {
    const data = await withRetry(exec, { retries: 2 });
    breaker.success();
    const normalized = {
      id: `${latNum},${lonNum}`,
      temperature: data?.current?.temperature_2m,
      windSpeed: data?.current?.wind_speed_10m,
      time: data?.current?.time,
      unit: '°C',
    };
    return cleanObject(normalized);
  } catch (e) {
    breaker.failure();
    throw e;
  }
}

// PUBLIC_INTERFACE
export async function getWeatherByCity(city) {
  /** Simple city resolver using Open-Meteo geocoding then delegates to getWeatherByCoords */
  const q = String(city || '').trim();
  if (!q) throw new Error('City is required');
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=1`;
  const geo = await httpFetch(geoUrl, { absolute: true, timeout: 8000 });
  const first = geo?.results?.[0];
  if (!first) throw new Error('City not found');
  return getWeatherByCoords({ lat: first.latitude, lon: first.longitude });
}
