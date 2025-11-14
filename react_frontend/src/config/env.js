//
// Environment configuration reader for React app.
// Reads only REACT_APP_* variables and exposes a safe, non-sensitive config.
//
/* eslint-disable no-console */

// PUBLIC_INTERFACE
export function getEnvVar(name, defaultValue = undefined) {
  /** Return a REACT_APP_* environment variable or default if missing. */
  const v = process.env[name];
  return typeof v === 'undefined' || v === '' ? defaultValue : v;
}

// PUBLIC_INTERFACE
export function getNodeEnv() {
  /** Returns NODE env mapped from REACT_APP_NODE_ENV with fallback to development */
  return getEnvVar('REACT_APP_NODE_ENV', process.env.NODE_ENV || 'development');
}

// PUBLIC_INTERFACE
export function getLogLevel() {
  /** Returns log level string with default 'info' */
  const level = (getEnvVar('REACT_APP_LOG_LEVEL', 'info') || 'info').toLowerCase();
  const allowed = ['trace', 'debug', 'info', 'warn', 'error', 'silent'];
  return allowed.includes(level) ? level : 'info';
}

// PUBLIC_INTERFACE
export function getHealthcheckPath() {
  /** Path to healthcheck endpoint or static file */
  return getEnvVar('REACT_APP_HEALTHCHECK_PATH', '/healthcheck.txt');
}

const sanitizeUrl = (u) => {
  try {
    if (!u) return undefined;
    const url = new URL(u, window.location.origin);
    return url.toString();
  } catch (_) {
    return undefined;
  }
};

// PUBLIC_INTERFACE
export function getConfig() {
  /**
   * Returns a safe config object derived from REACT_APP_* variables.
   * No secrets are exposed; defaults used where safe.
   */
  const nodeEnv = getNodeEnv();
  const config = {
    nodeEnv,
    apiBase: sanitizeUrl(getEnvVar('REACT_APP_API_BASE')) || '',
    backendUrl: sanitizeUrl(getEnvVar('REACT_APP_BACKEND_URL')) || '',
    frontendUrl: sanitizeUrl(getEnvVar('REACT_APP_FRONTEND_URL')) || window.location.origin,
    wsUrl: getEnvVar('REACT_APP_WS_URL', ''),
    logLevel: getLogLevel(),
    featureFlagsRaw: getEnvVar('REACT_APP_FEATURE_FLAGS', ''),
    experimentsEnabled: (getEnvVar('REACT_APP_EXPERIMENTS_ENABLED', 'false') || 'false').toString() === 'true',
    enableSourceMaps: (getEnvVar('REACT_APP_ENABLE_SOURCE_MAPS', 'true') || 'true').toString() === 'true',
    port: Number(getEnvVar('REACT_APP_PORT', '3000')) || 3000,
    trustProxy: (getEnvVar('REACT_APP_TRUST_PROXY', 'false') || 'false').toString() === 'true',
    healthcheckPath: getHealthcheckPath(),
  };

  if (!config.apiBase && !config.backendUrl) {
    // Graceful note; not throwing to allow public APIs without base.
    if (config.logLevel !== 'silent') {
      console.warn('[config] No REACT_APP_API_BASE/REACT_APP_BACKEND_URL set; clients should use absolute public endpoints.');
    }
  }
  return config;
}

const config = getConfig();
export default config;
