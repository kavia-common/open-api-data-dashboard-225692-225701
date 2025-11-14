import config from '../config/env';

const LEVELS = ['trace', 'debug', 'info', 'warn', 'error', 'silent'];
const currentIdx = LEVELS.indexOf(config.logLevel || 'info');

const should = (lvl) => LEVELS.indexOf(lvl) >= currentIdx;

// PUBLIC_INTERFACE
export function redact(str) {
  /** Redact common sensitive query params in a URL string */
  try {
    const url = new URL(String(str));
    ['token', 'auth', 'apikey', 'api_key', 'key'].forEach((k) => {
      if (url.searchParams.has(k)) url.searchParams.set(k, 'REDACTED');
    });
    return url.toString();
  } catch {
    return String(str);
  }
}

const log = (lvl, ...args) => {
  if (lvl === 'trace' && should('trace')) console.debug('[trace]', ...args);
  else if (lvl === 'debug' && should('debug')) console.debug('[debug]', ...args);
  else if (lvl === 'info' && should('info')) console.info('[info]', ...args);
  else if (lvl === 'warn' && should('warn')) console.warn('[warn]', ...args);
  else if (lvl === 'error' && should('error')) console.error('[error]', ...args);
};

export default {
  trace: (...a) => log('trace', ...a),
  debug: (...a) => log('debug', ...a),
  info: (...a) => log('info', ...a),
  warn: (...a) => log('warn', ...a),
  error: (...a) => log('error', ...a),
  redact,
};
