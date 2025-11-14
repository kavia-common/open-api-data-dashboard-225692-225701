const now = () => Date.now();

// PUBLIC_INTERFACE
export function makeCircuitBreaker({ failureThreshold = 3, cooldownMs = 8000, successThreshold = 1 } = {}) {
  /**
   * Simple circuit breaker
   */
  let state = 'CLOSED';
  let failureCount = 0;
  let successCount = 0;
  let nextTry = 0;

  const isOpen = () => state === 'OPEN';
  const canRequest = () => {
    if (state === 'OPEN' && now() > nextTry) {
      state = 'HALF';
      return true;
    }
    return state !== 'OPEN';
  };

  const success = () => {
    if (state === 'HALF') {
      successCount += 1;
      if (successCount >= successThreshold) {
        successCount = 0;
        failureCount = 0;
        state = 'CLOSED';
      }
    } else {
      failureCount = 0;
    }
  };

  const failure = () => {
    failureCount += 1;
    if (failureCount >= failureThreshold) {
      state = 'OPEN';
      nextTry = now() + cooldownMs;
    }
  };

  return { isOpen, canRequest, success, failure, getState: () => state };
}

export default { makeCircuitBreaker };
