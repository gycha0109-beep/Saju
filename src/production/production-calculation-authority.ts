import type { CalculationPolicySnapshot } from '../contracts/calculation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  PRODUCTION_CALCULATION_AUTHORIZATION_ID,
  PRODUCTION_CALCULATION_AUTHORITY_RECORD_REF,
  PRODUCTION_DEFAULT_CALCULATION_POLICY,
  PRODUCTION_DEFAULT_CALCULATION_POLICY_ID,
} from './production-calculation-policy.js';

export interface AuthorizedCalculationPolicyGrant {
  authorizationId: string;
  authorityRecordRef: string;
  policy: CalculationPolicySnapshot;
}

export interface AuthorizedProductionCalculationPolicySummary {
  calculationPolicyId: string;
  authorizationId: string;
  authorityRecordRef: string;
  policyVersion: string;
  contentHash: string;
}

const AUTHORIZED_CALCULATION_POLICIES: Readonly<
  Record<string, AuthorizedCalculationPolicyGrant>
> = Object.freeze({
  [PRODUCTION_DEFAULT_CALCULATION_POLICY_ID]: Object.freeze({
    authorizationId: PRODUCTION_CALCULATION_AUTHORIZATION_ID,
    authorityRecordRef: PRODUCTION_CALCULATION_AUTHORITY_RECORD_REF,
    policy: PRODUCTION_DEFAULT_CALCULATION_POLICY,
  }),
});

export function getAuthorizedProductionCalculationPolicyGrant(
  calculationPolicyId: string | undefined,
): AuthorizedCalculationPolicyGrant | undefined {
  return calculationPolicyId === undefined
    ? undefined
    : AUTHORIZED_CALCULATION_POLICIES[calculationPolicyId];
}

export function listAuthorizedProductionCalculationPolicies(): readonly AuthorizedProductionCalculationPolicySummary[] {
  return Object.entries(AUTHORIZED_CALCULATION_POLICIES)
    .map(([calculationPolicyId, grant]) => ({
      calculationPolicyId,
      authorizationId: grant.authorizationId,
      authorityRecordRef: grant.authorityRecordRef,
      policyVersion: grant.policy.policyVersion,
      contentHash: deterministicContentHash(grant.policy),
    }))
    .sort((left, right) => left.calculationPolicyId.localeCompare(right.calculationPolicyId));
}
