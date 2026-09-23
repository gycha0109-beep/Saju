import { describe, expect, it } from 'vitest';
import {
  THREE_DIVISIONS_SUCCESSOR_COORDINATE_FRAME_ADJUDICATION_FR264,
  assertIssuedThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264,
  assertThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264,
  issueThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264,
} from './three-divisions-successor-coordinate-frame-adjudication-fr264.js';

describe('FR264 Three-Divisions successor coordinate-frame adjudication', () => {
  it('selects canonical metric XY only as the research successor target', () => {
    const issued = issueThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264();
    expect(() =>
      assertIssuedThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264(issued),
    ).not.toThrow();

    expect(issued.decision).toMatchObject({
      selectedTargetFrame: 'canonical_aligned_right_handed_metric_xy',
      selectedTargetUnit: 'centimeter',
      selectionScope:
        'research_successor_target_only_no_executable_anchor_derivation',
      historicalNormalizedFrameRetiredFromSuccessor: true,
      historicalNormalizedArtifactsPreserved: true,
      mixedFrameSpanComputationAuthorized: false,
    });
  });

  it('preserves normalized-image 2D only as historical compatibility and rejects mixed spans', () => {
    const issued = issueThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264();

    expect(issued.candidates).toEqual([
      expect.objectContaining({
        frame: 'canonical_image_normalized_2d',
        status: 'historical_compatibility_not_selected',
      }),
      expect.objectContaining({
        frame: 'canonical_aligned_right_handed_metric_xy',
        status: 'selected_research_target_execution_blocked',
      }),
      expect.objectContaining({
        frame: 'mixed_coordinate_frames',
        status: 'rejected',
      }),
    ]);
    expect(issued.authorityBoundary.crossFrameConversionIssued).toBe(false);
    expect(issued.authorityBoundary.mixedFrameSpanAuthorized).toBe(false);
  });

  it('uses FR79 only as a lips-scoped projection witness, not a global projection authority', () => {
    const issued = issueThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264();

    expect(issued.evidence).toMatchObject({
      fr77SourceFrame: 'canonical_aligned_right_handed_metric_3d',
      fr77GenericReviewed2DProjectionIssued: false,
      fr79ProjectionRuleRef: 'fr79:canonical-metric-xy-orthographic@0.1.0',
      fr79ProjectionTargetFrame: 'pose_normalized_face_2d',
      fr79ProjectionFormula: 'x2d=x3d;y2d=y3d',
      fr79ProjectionScope:
        'reviewed_inside_lips_specific_geometry_contract_not_globalized',
    });
    expect(issued.projectionGap).toEqual({
      fullFaceMetricXYProjectionAuthorityExists: false,
      fr79MayBeSilentlyGeneralized: false,
      requiredNextAuthority:
        'full_face_neutral_canonical_metric_xy_projection_rule',
      requiredRuleScope:
        'coordinate_projection_only_no_anchor_identity_no_anatomy_no_traditional_semantics',
    });
  });

  it('keeps all four retained anchors explicitly blocked or candidate-only', () => {
    const issued = issueThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264();

    expect(issued.anchorReadiness).toEqual([
      {
        anchor: 'hairline',
        state:
          'blocked_no_metric_frame_hairline_surface_or_registration_authority',
      },
      {
        anchor: 'brow',
        state: 'blocked_neutral_brow_curve_not_authorized',
      },
      {
        anchor: 'zhuntou',
        state:
          'blocked_exact_neutral_nose_tip_vertical_reference_not_authorized',
      },
      {
        anchor: 'dige',
        state:
          'candidate_metric_xy_reference_exists_traditional_equivalence_blocked',
      },
    ]);
  });

  it('does not turn coordinate-frame selection into executable or semantic authority', () => {
    const issued = issueThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264();

    expect(issued.authorityBoundary).toMatchObject({
      coordinateFrameSelectionOnly: true,
      executableProjectionIssued: false,
      anchorDerivationIssued: false,
      hairlineRegistrationIssued: false,
      browBindingIssued: false,
      zhuntouBindingIssued: false,
      digeBindingIssued: false,
      traditionalNeutralEquivalenceIssued: false,
      providerSemanticBindingIssued: false,
      thresholdIssued: false,
      calibrationIssued: false,
      classifierIssued: false,
      F1ClaimIssued: false,
      F6ClaimIssued: false,
      fortuneClaimIssued: false,
      productionActivated: false,
      commerceActivated: false,
    });
  });

  it('rejects forged projection or Dige authority widening', () => {
    const issued = issueThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264();

    expect(() =>
      assertThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264({
        ...issued,
        projectionGap: {
          ...issued.projectionGap,
          fr79MayBeSilentlyGeneralized: true,
        },
      } as never),
    ).toThrow(/projection gap drift/);

    expect(() =>
      assertThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264({
        ...issued,
        authorityBoundary: {
          ...issued.authorityBoundary,
          digeBindingIssued: true,
        },
      } as never),
    ).toThrow(/authority widened/);
  });

  it('rejects copied-but-unissued artifacts', () => {
    const issued = issueThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264();

    expect(() =>
      assertIssuedThreeDivisionsSuccessorCoordinateFrameAdjudicationFR264({
        ...issued,
      }),
    ).toThrow(/not issued by FR264/);

    expect(
      THREE_DIVISIONS_SUCCESSOR_COORDINATE_FRAME_ADJUDICATION_FR264.watchtowerTrack,
    ).toBe('face-research');
  });
});
