import { describe, expect, it } from 'vitest';
import {
  FR262_MAYI_CONTIGUOUS_ANCHOR_REQUIREMENTS,
  FR262_MAYI_CONTIGUOUS_SPAN_REQUIREMENTS,
  MAYI_CONTIGUOUS_THREE_DIVISIONS_NEUTRAL_ANCHOR_AUTHORITY_FR262,
  assertIssuedMayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262,
  assertMayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262,
  issueMayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262,
} from './mayi-contiguous-three-divisions-neutral-anchor-requirements-fr262.js';
import { FR260_REFERENCE_REF } from './visible-lower-face-inferior-vertical-reference-fr260.js';

describe('FR262 Mayi contiguous Three-Divisions four-anchor successor requirements', () => {
  it('issues exactly four retained anchors in FR261 order', () => {
    const issued = issueMayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262();
    expect(() =>
      assertIssuedMayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262(issued)
    ).not.toThrow();

    expect(issued.requirements).toBe(FR262_MAYI_CONTIGUOUS_ANCHOR_REQUIREMENTS);
    expect(issued.requirements.map((entry) => entry.traditionalAnchorRef)).toEqual([
      'hairline',
      'brow',
      'zhuntou',
      'dige',
    ]);
    expect(issued.requirements).toHaveLength(4);
  });

  it('issues exactly the three contiguous FR261 spans', () => {
    const issued = issueMayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262();

    expect(issued.spans).toBe(FR262_MAYI_CONTIGUOUS_SPAN_REQUIREMENTS);
    expect(issued.spans.map((entry) => ({
      section: entry.section,
      from: entry.fromTraditionalAnchor,
      to: entry.toTraditionalAnchor,
    }))).toEqual([
      { section: 'upper', from: 'hairline', to: 'brow' },
      { section: 'middle', from: 'brow', to: 'zhuntou' },
      { section: 'lower', from: 'zhuntou', to: 'dige' },
    ]);
  });

  it('removes yintang, shangen and renzhong from the Mayi-contiguous successor', () => {
    const issued = issueMayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262();

    expect(issued.excludedHistoricalAnchors).toEqual([
      'yintang',
      'shangen',
      'renzhong',
    ]);
    const retained = new Set(
      issued.requirements.map((entry) => entry.traditionalAnchorRef),
    );
    expect(retained.has('yintang' as never)).toBe(false);
    expect(retained.has('shangen' as never)).toBe(false);
    expect(retained.has('renzhong' as never)).toBe(false);
    expect(issued.surfaceImpact.philtrumSurfaceRequired).toBe(false);
  });

  it('keeps historical FR34 preserved rather than treating it as the successor', () => {
    const issued = issueMayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262();

    expect(issued.predecessor).toMatchObject({
      historicalFR34Preserved: true,
      historicalFR34MayBeUsedAsSuccessor: false,
      contiguousFormula:
        'hairline_to_brow__brow_to_zhuntou__zhuntou_to_dige',
    });
  });

  it('acknowledges FR260 only as a blocked Dige-adjacent candidate', () => {
    const issued = issueMayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262();
    const dige = issued.requirements.find(
      (entry) => entry.traditionalAnchorRef === 'dige',
    )!;

    expect(dige.successorRequirementState)
      .toBe('blocked_candidate_reference_frame_and_equivalence_review');
    expect(dige.candidateNeutralReferenceRefs).toEqual([FR260_REFERENCE_REF]);
    expect(dige.candidateNeutralReferenceConsumptionAuthorized).toBe(false);

    expect(issued.fr260DigeAdjacentCandidate).toEqual({
      candidateRef: FR260_REFERENCE_REF,
      relation: 'candidate_neutral_reference_only',
      sourceCoordinateFrame: 'canonical_aligned_right_handed_metric_xy',
      historicalFR35TargetCoordinateFrame: 'canonical_image_normalized_2d',
      exactCoordinateFrameCompatibilityEstablished: false,
      traditionalDigeEquivalenceAuthorized: false,
      successorRequirementConsumptionAuthorized: false,
    });
  });

  it('does not choose a successor coordinate frame in the requirements phase', () => {
    const issued = issueMayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262();

    expect(issued.coordinateFrameDecision)
      .toBe('unresolved_successor_frame_no_cross_frame_collapse');
    expect(issued.authorityBoundary.crossFrameCollapseAllowed).toBe(false);
    expect(issued.authorityBoundary.FR260DigeBindingAllowed).toBe(false);
  });

  it('keeps provider, semantic, threshold and Production authority closed', () => {
    const issued = issueMayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262();

    expect(issued.requirements.every((entry) =>
      entry.providerLandmarkRefs.length === 0 &&
      entry.traditionalNeutralEquivalenceState === 'unreviewed_not_authorized' &&
      entry.productionBindingAllowed === false
    )).toBe(true);

    expect(issued.authorityBoundary).toMatchObject({
      providerIndependentRequirementsOnly: true,
      providerSpecificLandmarkIndicesAllowed: false,
      directTraditionalToNeutralEquivalenceAllowed: false,
      extractionAlgorithmIssued: false,
      thresholdIssued: false,
      calibrationIssued: false,
      classifierIssued: false,
      F1ClaimIssued: false,
      F6ClaimIssued: false,
      fortuneClaimIssued: false,
      productionMetricAllowed: false,
      productionActivated: false,
      commerceActivated: false,
    });
  });

  it('rejects forged authority widening', () => {
    const issued = issueMayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262();

    expect(() =>
      assertMayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262({
        ...issued,
        authorityBoundary: {
          ...issued.authorityBoundary,
          directTraditionalToNeutralEquivalenceAllowed: true,
        },
      } as never)
    ).toThrow(/authority widened/);

    expect(() =>
      assertMayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262({
        ...issued,
        fr260DigeAdjacentCandidate: {
          ...issued.fr260DigeAdjacentCandidate,
          traditionalDigeEquivalenceAuthorized: true,
        },
      } as never)
    ).toThrow(/FR260 candidate boundary drift/);
  });

  it('rejects copied-but-unissued authority objects', () => {
    const issued = issueMayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262();
    expect(() =>
      assertIssuedMayiContiguousThreeDivisionsNeutralAnchorAuthorityFR262({
        ...issued,
      })
    ).toThrow(/not issued by FR262/);

    expect(
      MAYI_CONTIGUOUS_THREE_DIVISIONS_NEUTRAL_ANCHOR_AUTHORITY_FR262.watchtowerTrack,
    ).toBe('face-research');
  });
});
