const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// PUBLIC_INTERFACE
export async function withRetry(fn, { retries = 3, factor = 2, minTimeout = 300, maxTimeout = 3000 } = {}) {
  /** Exponential backoff retry wrapper for transient errors */
  let attempt = 0;
  let delay = minTimeout;
  while (true) {
    try {
      return await fn();
    } catch (e) {
      attempt += 1;
      if (attempt > retries) throw e;
      await sleep(Math.min(delay, maxTimeout));
      delay *= factor;
    }
  }
}

export default { withRetry };
