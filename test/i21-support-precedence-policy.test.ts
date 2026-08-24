import { describe, expect, test } from 'vitest';
import {
  compareDayMasterSupportEvidence,
  I21_SUPPORT_PRECEDENCE_POLICY,
} from '../src/index.js';

describe('I21 day-master support precedence policy', () => {
  test('authorizes only the source-backed root-versus-peer partial order', () => {
    expect(
      compareDayMasterSupportEvidence('strong_birth_lu_wang_candidate', 'residual_storage_candidate'),
    ).toBe('LEFT_PRECEDES');
    expect(
      compareDayMasterSupportEvidence('strong_birth_lu_wang_candidate', 'visible_peer_support'),
    ).toBe('LEFT_PRECEDES');
    expect(
      compareDayMasterSupportEvidence('residual_storage_candidate', 'visible_peer_support'),
    ).toBe('LEFT_PRECEDES');
    expect(
      compareDayMasterSupportEvidence('visible_peer_support', 'strong_birth_lu_wang_candidate'),
    ).toBe('RIGHT_PRECEDES');
  });

  test('does not invent precedence for resource support, earth roots, or post-relation state', () => {
    expect(
      compareDayMasterSupportEvidence('visible_resource_support', 'visible_peer_support'),
    ).toBe('NO_AUTHORIZED_ORDER');
    expect(
      compareDayMasterSupportEvidence('resource_branch_support', 'residual_storage_candidate'),
    ).toBe('NO_AUTHORIZED_ORDER');
    expect(
      compareDayMasterSupportEvidence('earth_root_class_unresolved', 'visible_peer_support'),
    ).toBe('NO_AUTHORIZED_ORDER');
    expect(
      compareDayMasterSupportEvidence('post_relation_root_state', 'strong_birth_lu_wang_candidate'),
    ).toBe('NO_AUTHORIZED_ORDER');
  });

  test('same-class repetition does not become additive magnitude', () => {
    expect(compareDayMasterSupportEvidence('visible_peer_support', 'visible_peer_support')).toBe(
      'NO_AUTHORIZED_ORDER',
    );
    expect(I21_SUPPORT_PRECEDENCE_POLICY.repeatedEvidenceAggregation).toBe('not_authorized');
    expect(I21_SUPPORT_PRECEDENCE_POLICY.numericScoringAuthorized).toBe(false);
    expect(I21_SUPPORT_PRECEDENCE_POLICY.supportEffectAuthorized).toBe(false);
  });

  test('policy identity and relation set are stable', () => {
    expect(I21_SUPPORT_PRECEDENCE_POLICY.authorizedRelations).toHaveLength(3);
    expect(I21_SUPPORT_PRECEDENCE_POLICY.policyId).toMatch(/^support_precedence_[a-f0-9]{24}$/);
    expect(I21_SUPPORT_PRECEDENCE_POLICY.resourceSupportPrecedence).toBe('unresolved');
    expect(I21_SUPPORT_PRECEDENCE_POLICY.earthRootPrecedence).toBe('unresolved');
    expect(I21_SUPPORT_PRECEDENCE_POLICY.postRelationRootPrecedence).toBe('unresolved');
  });
});
