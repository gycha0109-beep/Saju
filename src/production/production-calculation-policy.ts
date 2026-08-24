import type { CalculationPolicySnapshot } from '../contracts/calculation.js';

export const PRODUCTION_DEFAULT_CALCULATION_POLICY_ID =
  'myeonghwa-production-civil-midnight-v1' as const;
export const PRODUCTION_CALCULATION_POLICY_VERSION =
  'myeonghwa-production-calculation-policy-v1' as const;
export const PRODUCTION_CALCULATION_AUTHORIZATION_ID =
  'myeonghwa-production-calculation-default-authorization-v1' as const;
export const PRODUCTION_CALCULATION_AUTHORITY_RECORD_REF =
  'docs/decisions/ADR-0006-production-calculation-default-v1.md' as const;

export const PRODUCTION_DEFAULT_CALCULATION_POLICY: CalculationPolicySnapshot = Object.freeze({
  policyId: 'myeonghwa/production/civil-midnight-v1',
  policyVersion: PRODUCTION_CALCULATION_POLICY_VERSION,
  dayBoundary: 'midnight',
  trueSolarTime: Object.freeze({
    enabled: false,
    longitudeSource: 'not-applicable',
    applyEquationOfTime: false,
    applyHistoricalDst: false,
  }),
  timeZonePolicy: Object.freeze({
    source: 'service-default',
    timeZone: 'Asia/Seoul',
  }),
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
});
