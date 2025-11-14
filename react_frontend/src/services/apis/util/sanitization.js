const ENTITY_MAP = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

// PUBLIC_INTERFACE
export function encode(str) {
  /** Minimal HTML entity encoding for dynamic content */
  return String(str).replace(/[&<>"']/g, (s) => ENTITY_MAP[s]);
}

// PUBLIC_INTERFACE
export function cleanObject(obj) {
  /** Recursively encode string fields */
  if (obj == null) return obj;
  if (Array.isArray(obj)) return obj.map((v) => cleanObject(v));
  if (typeof obj === 'object') {
    const out = {};
    Object.keys(obj).forEach((k) => {
      out[k] = cleanObject(obj[k]);
    });
    return out;
  }
  if (typeof obj === 'string') return encode(obj);
  return obj;
}
