import config from './env';

// PUBLIC_INTERFACE
export function parseFeatureFlags(raw) {
  /** Parse REACT_APP_FEATURE_FLAGS from CSV or JSON to a Set of flags */
  if (!raw) return new Set();
  try {
    if (raw.trim().startsWith('[') || raw.trim().startsWith('{')) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return new Set(parsed.map(String));
      if (parsed && typeof parsed === 'object') return new Set(Object.keys(parsed).filter((k) => parsed[k]));
      return new Set();
    }
    return new Set(
      raw
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    );
  } catch {
    return new Set();
  }
}

const flags = parseFeatureFlags(config.featureFlagsRaw);

// PUBLIC_INTERFACE
export function isEnabled(flagName) {
  /** Returns true if the feature flag is enabled via REACT_APP_FEATURE_FLAGS or experiments */
  if (!flagName) return false;
  if (flags.has(flagName)) return true;
  if (config.experimentsEnabled && flags.has(`exp:${flagName}`)) return true;
  return false;
}

export default { isEnabled, parseFeatureFlags };
