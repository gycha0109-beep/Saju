import type { BirthInput, CanonicalSajuSnapshot } from '../contracts/calculation.js';
import {
  calculateCanonicalSajuSnapshot,
  type CalculationEngineOptions,
} from '../calculation/calculation-engine.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  listAuthorizedProductionCalculationPolicies,
  type AuthorizedProductionCalculationPolicySummary,
} from './production-composition.js';
import {
  PRODUCTION_CALCULATION_AUTHORIZATION_ID,
  PRODUCTION_CALCULATION_AUTHORITY_RECORD_REF,
  PRODUCTION_DEFAULT_CALCULATION_POLICY,
  PRODUCTION_DEFAULT_CALCULATION_POLICY_ID,
} from './production-calculation-policy.js';

export const PRODUCTION_CALCULATION_RUNTIME_VERSION =
  'myeonghwa-production-calculation-runtime-v1' as const;

export interface AuthorizedMyeonghwaProductionCalculationResult {
  runtimeVersion: typeof PRODUCTION_CALCULATION_RUNTIME_VERSION;
  authority: AuthorizedProductionCalculationPolicySummary;
  snapshot: CanonicalSajuSnapshot;
}

function authorizedDefaultCalculationAuthority(): AuthorizedProductionCalculationPolicySummary {
  const authority = listAuthorizedProductionCalculationPolicies().find(
    (candidate) => candidate.calculationPolicyId === PRODUCTION_DEFAULT_CALCULATION_POLICY_ID,
  );
  const expectedContentHash = deterministicContentHash(PRODUCTION_DEFAULT_CALCULATION_POLICY);

  if (
    authority === undefined ||
    authority.authorizationId !== PRODUCTION_CALCULATION_AUTHORIZATION_ID ||
    authority.authorityRecordRef !== PRODUCTION_CALCULATION_AUTHORITY_RECORD_REF ||
    authority.policyVersion !== PRODUCTION_DEFAULT_CALCULATION_POLICY.policyVersion ||
    authority.contentHash !== expectedContentHash
  ) {
    throw new Error(
      'Production calculation authority manifest does not contain the exact governed Myeonghwa V1 default.',
    );
  }

  return Object.freeze({ ...authority });
}

function assertAuthorizedSnapshot(snapshot: CanonicalSajuSnapshot): void {
  if (
    snapshot.policy.policyId !== PRODUCTION_DEFAULT_CALCULATION_POLICY.policyId ||
    snapshot.policy.policyVersion !== PRODUCTION_DEFAULT_CALCULATION_POLICY.policyVersion ||
    deterministicContentHash(snapshot.policy) !==
      deterministicContentHash(PRODUCTION_DEFAULT_CALCULATION_POLICY) ||
    snapshot.provenance.policy.id !== PRODUCTION_DEFAULT_CALCULATION_POLICY.policyId ||
    snapshot.provenance.policy.version !== PRODUCTION_DEFAULT_CALCULATION_POLICY.policyVersion
  ) {
    throw new Error(
      'Production calculation returned a snapshot outside the authorized Myeonghwa V1 policy boundary.',
    );
  }
}

/**
 * Calculates a Canonical Saju Snapshot using the single governed Myeonghwa V1
 * production calculation authority. Callers cannot select or override the
 * calculation policy through this boundary.
 */
export function calculateAuthorizedMyeonghwaProductionSnapshot(
  input: BirthInput,
  options: CalculationEngineOptions = {},
): AuthorizedMyeonghwaProductionCalculationResult {
  const authority = authorizedDefaultCalculationAuthority();
  const snapshot = calculateCanonicalSajuSnapshot(
    input,
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    options,
  );
  assertAuthorizedSnapshot(snapshot);

  return {
    runtimeVersion: PRODUCTION_CALCULATION_RUNTIME_VERSION,
    authority,
    snapshot,
  };
}
