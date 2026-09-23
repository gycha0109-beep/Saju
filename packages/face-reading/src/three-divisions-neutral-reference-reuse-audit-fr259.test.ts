import { describe, expect, it } from 'vitest';
import {
  FR259_THREE_DIVISIONS_NEUTRAL_REUSE_ENTRIES,
  THREE_DIVISIONS_NEUTRAL_REFERENCE_REUSE_AUDIT_FR259,
  assertIssuedThreeDivisionsNeutralReferenceReuseAuditFR259,
  assertThreeDivisionsNeutralReferenceReuseAuditFR259,
  issueThreeDivisionsNeutralReferenceReuseAuditFR259,
} from './three-divisions-neutral-reference-reuse-audit-fr259.js';

describe('FR259 Three Divisions neutral-reference reuse audit', () => {
  it('audits all seven Mayi anchors without promoting a derivation', () => {
    const issued = issueThreeDivisionsNeutralReferenceReuseAuditFR259();
    expect(() => assertIssuedThreeDivisionsNeutralReferenceReuseAuditFR259(issued))
      .not.toThrow();
    expect(issued.entries).toBe(FR259_THREE_DIVISIONS_NEUTRAL_REUSE_ENTRIES);
    expect(issued.entries.map((entry) => entry.traditionalAnchorRef)).toEqual([
      'hairline',
      'brow',
      'yintang',
      'shangen',
      'zhuntou',
      'renzhong',
      'dige',
    ]);
    expect(issued.entries.every((entry) =>
      entry.directFR35SurfaceSatisfied === false &&
      entry.directFR36DerivationSatisfied === false &&
      entry.traditionalNeutralEquivalenceAuthorized === false
    )).toBe(true);
  });

  it('keeps hairline and philtrum without a current post-FR208 reuse candidate', () => {
    const issued = issueThreeDivisionsNeutralReferenceReuseAuditFR259();
    const byAnchor = new Map(
      issued.entries.map((entry) => [entry.traditionalAnchorRef, entry] as const),
    );
    expect(byAnchor.get('hairline')?.reuseState).toBe('no_current_reuse_candidate');
    expect(byAnchor.get('renzhong')?.reuseState).toBe('no_current_reuse_candidate');
  });

  it('does not turn eyebrow or nose observables into Three-Divisions vertical anchors', () => {
    const issued = issueThreeDivisionsNeutralReferenceReuseAuditFR259();
    const byAnchor = new Map(
      issued.entries.map((entry) => [entry.traditionalAnchorRef, entry] as const),
    );

    expect(byAnchor.get('brow')?.reuseState)
      .toBe('existing_neutral_dependency_still_blocked');
    expect(byAnchor.get('yintang')?.reuseState)
      .toBe('existing_neutral_dependency_still_blocked');
    expect(byAnchor.get('shangen')?.reuseState)
      .toBe('existing_neutral_dependency_still_blocked');
    expect(byAnchor.get('zhuntou')?.reuseState)
      .toBe('existing_neutral_dependency_still_blocked');
  });

  it('selects only a bounded lower-face successor candidate and preserves frame/equivalence gaps', () => {
    const issued = issueThreeDivisionsNeutralReferenceReuseAuditFR259();
    const dige = issued.entries.find((entry) => entry.traditionalAnchorRef === 'dige')!;

    expect(dige.reuseState).toBe('bounded_successor_candidate_not_equivalent');
    expect(dige.postFr208EvidenceRefs).toContain(
      'packages/face-reading/src/canonical-visible-lower-face-contour-fr216.ts',
    );

    expect(issued.selectedSmallestNextPrimitive).toMatchObject({
      traditionalAnchorContext: 'dige',
      candidateRef:
        'candidate.neutral.face.visible_lower_face_inferior_vertical_reference.fr259',
      candidateRole: 'product_neutral_visible_lower_face_inferior_reference_only',
      exactFR35SlotReplacementAuthorized: false,
      coordinateFrameCompatibilityEstablished: false,
      anatomicalChinIdentityAuthorized: false,
      traditionalDigeEquivalenceAuthorized: false,
      derivationAlgorithmIssued: false,
      metricIssued: false,
      empiricalValidationIssued: false,
    });
  });

  it('rejects semantic, calibration, and Production widening', () => {
    const issued = issueThreeDivisionsNeutralReferenceReuseAuditFR259();

    expect(() => assertThreeDivisionsNeutralReferenceReuseAuditFR259({
      ...issued,
      authorityBoundary: {
        ...issued.authorityBoundary,
        traditionalNeutralEquivalencePromoted: true,
      },
    } as never)).toThrow(/authority boundary widened/);

    expect(() => assertThreeDivisionsNeutralReferenceReuseAuditFR259({
      ...issued,
      selectedSmallestNextPrimitive: {
        ...issued.selectedSmallestNextPrimitive,
        traditionalDigeEquivalenceAuthorized: true,
      },
    } as never)).toThrow(/selected smallest next primitive boundary drift/);
  });

  it('rejects copied but unissued audit objects', () => {
    const issued = issueThreeDivisionsNeutralReferenceReuseAuditFR259();
    expect(() => assertIssuedThreeDivisionsNeutralReferenceReuseAuditFR259({
      ...issued,
    })).toThrow(/unissued reuse audit/);
    expect(THREE_DIVISIONS_NEUTRAL_REFERENCE_REUSE_AUDIT_FR259.watchtowerTrack)
      .toBe('face-research');
  });
});
