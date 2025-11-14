import logger from '../utils/logger';
import config from '../config/env';

const DEFAULT_TIMEOUT = 12000;

// PUBLIC_INTERFACE
export async function httpFetch(path, { method = 'GET', headers = {}, body, timeout = DEFAULT_TIMEOUT, absolute = false } = {}) {
  /**
   * Fetch wrapper with timeout, base URL and JSON handling.
   * - path: relative path (prefers config.apiBase) or absolute URL when absolute=true
   */
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const url = absolute ? path : (config.apiBase ? `${config.apiBase}${path}` : path);

  const safeHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...headers,
  };
  const opts = { method, headers: safeHeaders, signal: controller.signal };
  if (body) opts.body = typeof body === 'string' ? body : JSON.stringify(body);

  try {
    const res = await fetch(url, opts);
    const contentType = res.headers.get('content-type') || '';
    let data = null;
    if (contentType.includes('application/json')) {
      data = await res.json();
    } else {
      data = await res.text();
    }
    if (!res.ok) {
      const error = new Error(`HTTP ${res.status}`);
      error.status = res.status;
      error.data = data;
      throw error;
    }
    return data;
  } catch (err) {
    logger.error('httpFetch error', { url: logger.redact(url), error: err.message });
    throw err;
  } finally {
    clearTimeout(id);
  }
}

export default { httpFetch };
