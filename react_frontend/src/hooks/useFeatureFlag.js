import { useMemo } from 'react';
import { isEnabled } from '../config/featureFlags';

// PUBLIC_INTERFACE
export default function useFeatureFlag(flag) {
  /** Returns boolean feature flag enabled state */
  return useMemo(() => isEnabled(flag), [flag]);
}
