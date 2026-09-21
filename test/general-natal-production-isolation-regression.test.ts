import { describe, expect, it } from 'vitest';
import {
  R099_AUTHORITY,
  R099_CROSS_CONTRACT_RULES,
  R099_EXECUTION_SURFACES,
  R099_INTENDED_PRODUCTION_CHANGE_REQUIREMENTS,
  R099_INVARIANT_FAMILIES,
  R099_MUTATION_PROBE_REQUIREMENTS,
  R099_ORACLE_RESULTS,
  R099_PRODUCTION_ISOLATION_REGRESSION_VERSION,
  R099_REJECTED_SHORTCUTS,
  R099_REQUIRED_FAILURE_CLASSES,
  R099_REQUIRED_ORACLE_FIELDS,
} from '../src/research/general-natal-production-isolation-regression.js';

describe('R099 research-to-Production isolation regression contract', () => {
  it('defines ten authority-isolation invariant families', () => {
    expect(R099_PRODUCTION_ISOLATION_REGRESSION_VERSION).toBe('0.2.0-research');
    expect(R099_INVARIANT_FAMILIES).toHaveLength(10);
    expect(R099_INVARIANT_FAMILIES).toContain('RESEARCH_IMPORT_ISOLATION');
    expect(R099_INVARIANT_FAMILIES).toContain('CONTENT_HASH_STABILITY');
    expect(R099_INVARIANT_FAMILIES).toContain('CALCULATION_OUTPUT_STABILITY');
    expect(R099_INVARIANT_FAMILIES).toContain('INTERPRETATION_OUTPUT_STABILITY');
    expect(R099_INVARIANT_FAMILIES).toContain('COMMERCE_ENTITLEMENT_SEPARATION');
    expect(R099_INVARIANT_FAMILIES).toContain('AUTHORITY_DIFF_REQUIRED');
  });

  it('requires an executable oracle rather than test-file presence', () => {
    expect(R099_REQUIRED_ORACLE_FIELDS).toContain('PROTECTED_SURFACE_REF');
    expect(R099_REQUIRED_ORACLE_FIELDS).toContain('BASELINE_REF');
    expect(R099_REQUIRED_ORACLE_FIELDS).toContain('OBSERVATION_REF');
    expect(R099_REQUIRED_ORACLE_FIELDS).toContain('COMPARISON_MODE');
    expect(R099_REQUIRED_ORACLE_FIELDS).toContain(
      'AUTHORITY_DIFF_RECEIPT_REF_IF_INTENDED_DELTA',
    );
    expect(R099_REJECTED_SHORTCUTS).toContain(
      'TEST_FILE_EXISTENCE_COUNTS_AS_DRIFT_PROTECTION',
    );
    expect(R099_AUTHORITY.executableOracleRequired).toBe(true);
  });

  it('fails closed when baseline, authority receipt, or supersession lineage is missing', () => {
    expect(R099_ORACLE_RESULTS).toContain('FAIL_MISSING_BASELINE');
    expect(R099_ORACLE_RESULTS).toContain('FAIL_MISSING_AUTHORITY_DIFF');
    expect(R099_ORACLE_RESULTS).toContain('FAIL_UNTRACEABLE_SUPERSESSION');
    expect(R099_AUTHORITY.missingBaselineFailsClosed).toBe(true);
    expect(R099_AUTHORITY.missingAuthorityReceiptFailsClosed).toBe(true);
  });

  it('requires exact evidence for an intended Production delta', () => {
    expect(R099_INTENDED_PRODUCTION_CHANGE_REQUIREMENTS).toEqual([
      'OLD_CONTENT_HASH_AND_VERSION',
      'NEW_CONTENT_HASH_AND_VERSION',
      'GOVERNED_PROMOTION_EVIDENCE',
      'AUTHORITY_ACTOR_OR_DECISION_REF',
      'AFFECTED_PROTECTED_SURFACES',
      'DECLARED_EXPECTED_FIXTURE_OUTPUT_DELTAS',
      'SEPARATE_LIFECYCLE_MUTATION_RECEIPT',
    ]);
  });

  it('requires negative mutation probes proving detector liveness', () => {
    expect(R099_MUTATION_PROBE_REQUIREMENTS).toContain(
      'RESEARCH_IMPORT_INTO_PROTECTED_PRODUCTION_BOUNDARY_IS_DETECTED',
    );
    expect(R099_MUTATION_PROBE_REQUIREMENTS).toContain(
      'PROTECTED_FINGERPRINT_CHANGE_WITHOUT_AUTHORITY_RECEIPT_IS_DETECTED',
    );
    expect(R099_MUTATION_PROBE_REQUIREMENTS).toContain(
      'CALCULATION_OR_INTERPRETATION_DRIFT_UNDER_RESEARCH_ONLY_CHANGE_IS_DETECTED',
    );
    expect(R099_MUTATION_PROBE_REQUIREMENTS).toContain(
      'SHADOW_AUTHORITY_WRITE_IS_DETECTED',
    );
    expect(R099_AUTHORITY.mutationProbeRequiredForDetectorLiveness).toBe(true);
  });

  it('keeps R096 evidence state and R098 eligibility outside Production mutation authority', () => {
    expect(R099_CROSS_CONTRACT_RULES).toEqual([
      'R096_STATE_LABEL_IS_NOT_PRODUCTION_FALLBACK_VALUE',
      'R098_PROMOTION_ELIGIBLE_IS_NOT_PROMOTED',
      'R098_CHECKLIST_ALONE_IS_NOT_LIFECYCLE_MUTATION_RECEIPT',
      'CANDIDATE_HASH_OR_VERSION_CHANGE_REQUIRES_REEVALUATION',
    ]);
    expect(R099_AUTHORITY.promotionEligibleEqualsPromoted).toBe(false);
  });

  it('covers explicit failure classes for silent authority drift', () => {
    expect(R099_REQUIRED_FAILURE_CLASSES).toHaveLength(10);
    expect(R099_REQUIRED_FAILURE_CLASSES).toContain('PROTECTED_HASH_DRIFT');
    expect(R099_REQUIRED_FAILURE_CLASSES).toContain('CALCULATION_OUTPUT_DRIFT');
    expect(R099_REQUIRED_FAILURE_CLASSES).toContain('INTERPRETATION_OUTPUT_DRIFT');
    expect(R099_REQUIRED_FAILURE_CLASSES).toContain('UNKNOWN_DEFAULT_COERCION');
    expect(R099_REQUIRED_FAILURE_CLASSES).toContain('SHADOW_AUTHORITY_WRITE');
    expect(R099_REQUIRED_FAILURE_CLASSES).toContain('COMMERCE_ENTITLEMENT_DRIFT');
  });

  it('reuses existing CI, PCC, and PIE surfaces without creating a parallel workflow', () => {
    expect(R099_EXECUTION_SURFACES).toEqual([
      'CI',
      'PRODUCTION_CALCULATION_CONTAINER',
      'PIE_SHADOW',
    ]);
    expect(R099_AUTHORITY.existingCiWorkflowsMutated).toBe(false);
    expect(R099_AUTHORITY.parallelWorkflowCreated).toBe(false);
  });

  it('rejects snapshots, green tests, merge, shadow, and commerce shortcuts', () => {
    expect(R099_REJECTED_SHORTCUTS).toContain(
      'UPDATED_SNAPSHOT_EQUALS_AUTHORIZED_CHANGE',
    );
    expect(R099_REJECTED_SHORTCUTS).toContain('GREEN_TESTS_IMPLY_AUTHORIZATION');
    expect(R099_REJECTED_SHORTCUTS).toContain('PR_MERGE_IMPLIES_AUTHORIZATION');
    expect(R099_REJECTED_SHORTCUTS).toContain('SHADOW_WRITE_PROMOTES_AUTHORITY');
    expect(R099_REJECTED_SHORTCUTS).toContain(
      'COMMERCE_CHANGE_HIDDEN_IN_RESEARCH_DIFF',
    );
  });

  it('defines the contract without promoting or mutating Production', () => {
    expect(R099_AUTHORITY).toEqual({
      status: 'FAIL_CLOSED_PRODUCTION_ISOLATION_REGRESSION_CONTRACT_DEFINED',
      invariantFamilyCount: 10,
      executableOracleRequired: true,
      mutationProbeRequiredForDetectorLiveness: true,
      missingBaselineFailsClosed: true,
      missingAuthorityReceiptFailsClosed: true,
      silentAuthorityDriftAllowed: false,
      snapshotUpdateAloneAuthorizesChange: false,
      greenTestsAloneAuthorizeChange: false,
      promotionEligibleEqualsPromoted: false,
      researchChangeMayAlterCommerceEntitlement: false,
      existingCiWorkflowsMutated: false,
      parallelWorkflowCreated: false,
      productionAuthorityPromoted: false,
    });
  });
});
