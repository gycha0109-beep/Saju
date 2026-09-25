import { describe, expect, it } from 'vitest';
import {
  FR4_NOSE_NEUTRAL_METRICS_V0,
} from './nose-geometry.js';
import {
  PROVIDER_INDEPENDENT_NASAL_APEX_AUTHORITY_FR266,
} from './provider-independent-nasal-apex-reference-fr266.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR295_RGB_RELATIVE_3D_TARGETS,
} from './rgb-relative-3d-benchmark-protocol-fr295.js';
import {
  FR296_EXISTING_BRIDGE_METRIC_REF,
  FR296_NOSE_PROJECTION_REFERENCE_READINESS,
  FR296_TARGET_FEATURE_KEY,
  assertFR296NoseProjectionReferenceReadiness,
} from './nose-tip-bridge-projection-reference-readiness-fr296.js';

describe('FR296 nose tip-bridge relative-projection reference readiness', () => {
  it('targets exactly the FR295 nose relative-3D gap', () => {
    expect(FR296_TARGET_FEATURE_KEY)
      .toBe('nose.tip_bridge_relative_projection');
    expect(FR295_RGB_RELATIVE_3D_TARGETS)
      .toContain(FR296_TARGET_FEATURE_KEY);
    expect(() => assertFR296NoseProjectionReferenceReadiness())
      .not.toThrow();
  });

  it('reuses only the governed FR266 tip definition boundary', () => {
    expect(
      PROVIDER_INDEPENDENT_NASAL_APEX_AUTHORITY_FR266
        .protocol.sourceFrame,
    ).toBe('canonical_aligned_right_handed_metric_3d');
    expect(
      FR296_NOSE_PROJECTION_REFERENCE_READINESS
        .tipSidePredecessor,
    ).toMatchObject({
      providerIndependentDefinitionGoverned: true,
      realAnnotationInstanceSuppliedByFR296: false,
      acquisitionValidatedByFR296: false,
      usableAsFrozenBenchmarkReferenceWithoutRealAnnotation: false,
    });
  });

  it('does not reinterpret the existing 2D bridge metric as a 3D reference', () => {
    const bridge = FR4_NOSE_NEUTRAL_METRICS_V0.find(
      (candidate) =>
        `${candidate.metricKey}@${candidate.version}` ===
        FR296_EXISTING_BRIDGE_METRIC_REF,
    );

    expect(bridge?.coordinateFrame)
      .toBe('pose_normalized_face_2d');
    expect(
      FR296_NOSE_PROJECTION_REFERENCE_READINESS
        .bridgeSidePredecessor,
    ).toMatchObject({
      existingMetricCoordinateFrame: 'pose_normalized_face_2d',
      providerIndependent3DReferenceDefinitionGoverned: false,
      usableAsRelative3DReference: false,
    });
  });

  it('keeps the reference axis blocked on the exact missing evidence classes', () => {
    expect(
      FR296_NOSE_PROJECTION_REFERENCE_READINESS.referenceAxis,
    ).toEqual({
      status: 'blocked',
      blockers: [
        'provider_independent_3d_bridge_reference_definition_missing',
        'real_independent_3d_tip_bridge_reference_acquisition_not_bound',
        'tip_bridge_relative_projection_axis_definition_missing',
      ],
      requiredNextEvidence: [
        'govern_provider_independent_3d_bridge_reference_definition',
        'acquire_and_freeze_real_provider_blind_tip_and_bridge_reference_evidence',
        'bind_same_capture_or_validated_registration',
        'freeze_neutral_tip_bridge_relative_projection_axis_before_candidate_scoring',
      ],
    });
  });

  it('pins forbidden shortcuts instead of inventing a fallback', () => {
    expect(
      FR296_NOSE_PROJECTION_REFERENCE_READINESS
        .prohibitedShortcuts,
    ).toEqual([
      'reuse_2d_bridge_centerline_deviation_as_3d_projection_reference',
      'reuse_candidate_provider_z_as_benchmark_ground_truth',
      'infer_bridge_depth_from_2d_centerline_shape',
      'infer_traditional_nose_semantics_from_relative_projection',
    ]);
  });

  it('issues no benchmark or product authority and preserves 18/29 materialized', () => {
    expect(
      Object.values(
        FR296_NOSE_PROJECTION_REFERENCE_READINESS
          .authorityBoundary,
      ).every((value) => value === false),
    ).toBe(true);

    expect(
      FR293_PRODUCT_COLUMN_MAP.filter(
        (candidate) =>
          candidate.implementationState ===
            'canonical_extractor_materialized',
      ),
    ).toHaveLength(18);
  });
});
