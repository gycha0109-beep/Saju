import { describe, expect, it } from 'vitest';
import {
  FR265_RULE_REF,
  FULL_FACE_NEUTRAL_CANONICAL_METRIC_XY_PROJECTION_RULE_FR265,
  assertIssuedFullFaceNeutralCanonicalMetricXYProjectionRuleFR265,
  assertFullFaceNeutralCanonicalMetricXYProjectionRuleFR265,
  assertFullFaceNeutralMetricXYProjectionResultFR265,
  issueFullFaceNeutralCanonicalMetricXYProjectionRuleFR265,
  projectNeutralCanonicalMetricGeometryToXYFR265,
} from './full-face-neutral-canonical-metric-xy-projection-rule-fr265.js';

describe('FR265 full-face neutral canonical metric XY projection rule', () => {
  it('issues an independently reviewed generic coordinate-only rule', () => {
    const rule = issueFullFaceNeutralCanonicalMetricXYProjectionRuleFR265();
    expect(() =>
      assertIssuedFullFaceNeutralCanonicalMetricXYProjectionRuleFR265(rule),
    ).not.toThrow();

    expect(rule).toMatchObject({
      ruleRef: FR265_RULE_REF,
      sourceCoordinateFrame: 'canonical_aligned_right_handed_metric_3d',
      targetCoordinateFrame: 'canonical_aligned_right_handed_metric_xy',
      sourceUnit: 'centimeter',
      targetUnit: 'centimeter',
      projectionKind: 'canonical_frontal_orthographic_xy',
      formula: 'x2d=x3d;y2d=y3d',
      depthTreatment:
        'drop_z_only_after_canonical_inverse_pose_alignment',
      sourceAlignmentRequirement:
        'canonical_inverse_pose_alignment_already_applied',
      axisConvention: 'retain_canonical_metric_x_right_y_up',
      recenteringApplied: false,
      rescalingApplied: false,
      perspectiveReprojectionApplied: false,
      screenCoordinateReconstructionApplied: false,
      pointOrderPreserved: true,
    });
  });

  it('projects arbitrary canonical metric points by dropping only Z', () => {
    const rule = issueFullFaceNeutralCanonicalMetricXYProjectionRuleFR265();
    const result = projectNeutralCanonicalMetricGeometryToXYFR265({
      sourceCoordinateFrame: 'canonical_aligned_right_handed_metric_3d',
      sourceUnit: 'centimeter',
      canonicalInversePoseAligned: true,
      sourceGeometryRef: 'test:neutral-face-geometry',
      points: [
        { x: -1.2, y: 2.5, z: 4.4 },
        { x: 0, y: -3.25, z: -8 },
        { x: 7.1, y: 1.05, z: 0 },
      ],
    }, rule);

    expect(result.points).toEqual([
      { x: -1.2, y: 2.5 },
      { x: 0, y: -3.25 },
      { x: 7.1, y: 1.05 },
    ]);
    expect(result.pointCount).toBe(3);
    expect(result.coordinateFrame)
      .toBe('canonical_aligned_right_handed_metric_xy');
    expect(result.unit).toBe('centimeter');
    expect(result.projectionReceipt).toMatchObject({
      depthDropped: true,
      pointOrderPreserved: true,
      recenteringApplied: false,
      rescalingApplied: false,
      perspectiveReprojectionApplied: false,
      screenCoordinateReconstructionApplied: false,
    });
  });

  it('does not expose Z or provider/anatomical/traditional semantics', () => {
    const rule = issueFullFaceNeutralCanonicalMetricXYProjectionRuleFR265();
    const result = projectNeutralCanonicalMetricGeometryToXYFR265({
      sourceCoordinateFrame: 'canonical_aligned_right_handed_metric_3d',
      sourceUnit: 'centimeter',
      canonicalInversePoseAligned: true,
      sourceGeometryRef: 'test:ordered-neutral-points',
      points: [{ x: 1, y: 2, z: 3 }],
    }, rule);

    expect(Object.keys(result.points[0]!)).toEqual(['x', 'y']);
    expect(result.authorityBoundary).toEqual({
      coordinateProjectionOnly: true,
      providerVertexIndexIssued: false,
      anatomicalRoleIssued: false,
      traditionalAnchorIdentityIssued: false,
      traditionalNeutralEquivalenceIssued: false,
      metricDefinitionIssued: false,
      semanticClaimIssued: false,
      productionActivated: false,
      commerceActivated: false,
    });
  });

  it('requires canonical inverse-pose alignment before dropping Z', () => {
    const rule = issueFullFaceNeutralCanonicalMetricXYProjectionRuleFR265();

    expect(() =>
      projectNeutralCanonicalMetricGeometryToXYFR265({
        sourceCoordinateFrame: 'canonical_aligned_right_handed_metric_3d',
        sourceUnit: 'centimeter',
        canonicalInversePoseAligned: false,
        sourceGeometryRef: 'test:unaligned',
        points: [{ x: 1, y: 2, z: 3 }],
      } as never, rule),
    ).toThrow(/source frame\/alignment boundary drift/);
  });

  it('rejects empty, non-finite and unissued inputs', () => {
    const rule = issueFullFaceNeutralCanonicalMetricXYProjectionRuleFR265();

    expect(() =>
      projectNeutralCanonicalMetricGeometryToXYFR265({
        sourceCoordinateFrame: 'canonical_aligned_right_handed_metric_3d',
        sourceUnit: 'centimeter',
        canonicalInversePoseAligned: true,
        sourceGeometryRef: '',
        points: [{ x: 1, y: 2, z: 3 }],
      }, rule),
    ).toThrow(/sourceGeometryRef/);

    expect(() =>
      projectNeutralCanonicalMetricGeometryToXYFR265({
        sourceCoordinateFrame: 'canonical_aligned_right_handed_metric_3d',
        sourceUnit: 'centimeter',
        canonicalInversePoseAligned: true,
        sourceGeometryRef: 'test:nonfinite',
        points: [{ x: Number.NaN, y: 2, z: 3 }],
      }, rule),
    ).toThrow(/finite x\/y\/z/);

    expect(() =>
      projectNeutralCanonicalMetricGeometryToXYFR265({
        sourceCoordinateFrame: 'canonical_aligned_right_handed_metric_3d',
        sourceUnit: 'centimeter',
        canonicalInversePoseAligned: true,
        sourceGeometryRef: 'test:copied-rule',
        points: [{ x: 1, y: 2, z: 3 }],
      }, { ...rule }),
    ).toThrow(/not issued by FR265/);
  });

  it('rejects semantic or production widening on the rule', () => {
    const rule = issueFullFaceNeutralCanonicalMetricXYProjectionRuleFR265();

    expect(() =>
      assertFullFaceNeutralCanonicalMetricXYProjectionRuleFR265({
        ...rule,
        authorityBoundary: {
          ...rule.authorityBoundary,
          traditionalAnchorIdentityIssued: true,
        },
      } as never),
    ).toThrow(/authority widened/);

    expect(() =>
      assertFullFaceNeutralCanonicalMetricXYProjectionRuleFR265({
        ...rule,
        evidence: {
          ...rule.evidence,
          fr79AuthorityReusedAsGlobalAuthority: true,
        },
      } as never),
    ).toThrow(/projection evidence boundary drift/);
  });

  it('rejects forged projected result semantics', () => {
    const rule = issueFullFaceNeutralCanonicalMetricXYProjectionRuleFR265();
    const result = projectNeutralCanonicalMetricGeometryToXYFR265({
      sourceCoordinateFrame: 'canonical_aligned_right_handed_metric_3d',
      sourceUnit: 'centimeter',
      canonicalInversePoseAligned: true,
      sourceGeometryRef: 'test:result',
      points: [{ x: 1, y: 2, z: 3 }],
    }, rule);

    expect(() =>
      assertFullFaceNeutralMetricXYProjectionResultFR265({
        ...result,
        authorityBoundary: {
          ...result.authorityBoundary,
          traditionalAnchorIdentityIssued: true,
        },
      } as never),
    ).toThrow(/authority widened/);
  });

  it('keeps the static rule on the face-research track', () => {
    expect(FULL_FACE_NEUTRAL_CANONICAL_METRIC_XY_PROJECTION_RULE_FR265.watchtowerTrack)
      .toBe('face-research');
  });
});
