import { describe, expect, it } from 'vitest';
import {
  R099_AUTHORITY,
  R099_INTENDED_PRODUCTION_CHANGE_REQUIREMENTS,
  R099_INVARIANT_FAMILIES,
  R099_PRODUCTION_ISOLATION_REGRESSION_VERSION,
  R099_REJECTED_SHORTCUTS,
} from '../src/research/general-natal-production-isolation-regression.js';

describe('R099 research-to-Production isolation regression contract', () => {
  it('defines ten authority-isolation invariant families', () => {
    expect(R099_PRODUCTION_ISOLATION_REGRESSION_VERSION).toBe('0.1.0-research');
    expect(R099_INVARIANT_FAMILIES).toHaveLength(10);
    expect(R099_INVARIANT_FAMILIES).toContain('CONTENT_HASH_STABILITY');
    expect(R099_INVARIANT_FAMILIES).toContain('COMMERCE_ENTITLEMENT_SEPARATION');
    expect(R099_INVARIANT_FAMILIES).toContain('AUTHORITY_DIFF_REQUIRED');
  });

  it('requires explicit evidence for intended Production changes', () => {
    expect(R099_INTENDED_PRODUCTION_CHANGE_REQUIREMENTS).toEqual([
      'EXPLICIT_AUTHORITY_LIFECYCLE_DIFF',
      'OLD_NEW_CONTENT_ADDRESSED_VERSION_LINEAGE',
      'GOVERNED_PROMOTION_EVIDENCE',
      'AFFECTED_FIXTURE_OUTPUT_DELTA_DECLARED',
    ]);
  });

  it('rejects snapshot, shadow, unknown-default, and hidden-commerce shortcuts', () => {
    expect(R099_REJECTED_SHORTCUTS).toContain('UPDATED_SNAPSHOT_EQUALS_AUTHORIZED_CHANGE');
    expect(R099_REJECTED_SHORTCUTS).toContain('SHADOW_WRITE_PROMOTES_AUTHORITY');
    expect(R099_REJECTED_SHORTCUTS).toContain('COMMERCE_CHANGE_HIDDEN_IN_RESEARCH_DIFF');
  });

  it('defines the contract without mutating Production workflows', () => {
    expect(R099_AUTHORITY).toEqual({
      status:'PRODUCTION_ISOLATION_REGRESSION_INVARIANTS_DEFINED',
      invariantFamilyCount:10,
      silentAuthorityDriftAllowed:false,
      snapshotUpdateAloneAuthorizesChange:false,
      existingCiWorkflowsMutated:false,
      productionAuthorityPromoted:false,
    });
  });
});
