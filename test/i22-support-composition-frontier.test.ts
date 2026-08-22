import { describe, expect, test } from 'vitest';
import { buildI22SupportCompositionFrontier } from '../src/index.js';

describe('I22 support composition frontier', () => {
  test('removes only evidence dominated by the authorized root-peer partial order', () => {
    const report = buildI22SupportCompositionFrontier([
      { evidenceId: 'peer', evidenceClass: 'visible_peer_support' },
      { evidenceId: 'residual', evidenceClass: 'residual_storage_candidate' },
      { evidenceId: 'strong', evidenceClass: 'strong_birth_lu_wang_candidate' },
    ]);

    expect(report.maximalEvidenceIds).toEqual(['strong']);
    expect(report.dominatedEvidence.find((item) => item.evidenceId === 'peer')?.dominatedByEvidenceIds).toEqual([
      'residual',
      'strong',
    ]);
    expect(report.dominatedEvidence.find((item) => item.evidenceId === 'residual')?.dominatedByEvidenceIds).toEqual([
      'strong',
    ]);
    expect(report.compositionVerdict).toBe('not_determined');
    expect(report.numericScoringAuthorized).toBe(false);
  });

  test('keeps incomparable resource support beside a strong root on the maximal frontier', () => {
    const report = buildI22SupportCompositionFrontier([
      { evidenceId: 'strong', evidenceClass: 'strong_birth_lu_wang_candidate' },
      { evidenceId: 'resource', evidenceClass: 'visible_resource_support' },
    ]);

    expect(report.maximalEvidenceIds).toEqual(['resource', 'strong']);
    expect(report.incomparableMaximalPairs).toEqual([
      { leftEvidenceId: 'resource', rightEvidenceId: 'strong' },
    ]);
    expect(report.globalTotalOrderAuthorized).toBe(false);
    expect(report.supportEffectAuthorized).toBe(false);
  });

  test('repeated peer evidence remains separate but does not become additive magnitude', () => {
    const report = buildI22SupportCompositionFrontier([
      { evidenceId: 'peer-a', evidenceClass: 'visible_peer_support' },
      { evidenceId: 'peer-b', evidenceClass: 'visible_peer_support' },
      { evidenceId: 'residual', evidenceClass: 'residual_storage_candidate' },
    ]);

    expect(report.maximalEvidenceIds).toEqual(['residual']);
    expect(report.dominatedEvidence.find((item) => item.evidenceId === 'peer-a')?.dominatedByEvidenceIds).toEqual([
      'residual',
    ]);
    expect(report.dominatedEvidence.find((item) => item.evidenceId === 'peer-b')?.dominatedByEvidenceIds).toEqual([
      'residual',
    ]);
    expect(report.repeatedEvidenceAggregation).toBe('not_authorized');
  });

  test('earth and post-relation evidence remain incomparable rather than receiving a forced rank', () => {
    const report = buildI22SupportCompositionFrontier([
      { evidenceId: 'earth', evidenceClass: 'earth_root_class_unresolved' },
      { evidenceId: 'post', evidenceClass: 'post_relation_root_state' },
      { evidenceId: 'peer', evidenceClass: 'visible_peer_support' },
    ]);

    expect(report.maximalEvidenceIds).toEqual(['earth', 'peer', 'post']);
    expect(report.dominatedEvidence).toEqual([]);
    expect(report.relativeForceVerdictAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
  });

  test('identity is input-order independent and duplicate evidence IDs fail closed', () => {
    const first = buildI22SupportCompositionFrontier([
      { evidenceId: 'resource', evidenceClass: 'visible_resource_support' },
      { evidenceId: 'strong', evidenceClass: 'strong_birth_lu_wang_candidate' },
    ]);
    const second = buildI22SupportCompositionFrontier([
      { evidenceId: 'strong', evidenceClass: 'strong_birth_lu_wang_candidate' },
      { evidenceId: 'resource', evidenceClass: 'visible_resource_support' },
    ]);

    expect(first.reportId).toBe(second.reportId);
    expect(() =>
      buildI22SupportCompositionFrontier([
        { evidenceId: 'dup', evidenceClass: 'visible_peer_support' },
        { evidenceId: 'dup', evidenceClass: 'residual_storage_candidate' },
      ]),
    ).toThrow(/Duplicate support evidence ID/);
  });
});
