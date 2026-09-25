import { describe, expect, it } from 'vitest';
import {
  FR293_PRODUCT_COLUMN_MAP,
} from './rgb-selfie-product-column-map-fr293.js';
import type {
  ProviderIndependentNasalApexAnnotationFR266V1,
} from './provider-independent-nasal-apex-reference-fr266.js';
import type {
  FR297ProviderIndependentNasalBridgeRootAnnotation,
} from './provider-independent-neutral-nasal-bridge-root-reference-fr297.js';
import {
  FR298_NEUTRAL_NOSE_RELATIVE_PROJECTION_AXIS_AUTHORITY,
  FR298_REFERENCE_AXIS_DEFINITION_REF,
  assertFR298NeutralNoseRelativeProjectionAxisAuthority,
  deriveFR298NeutralTipBridgeRelativeProjectionReference,
  type FR298IndependentTipBridgeReferenceInput,
} from './neutral-nose-tip-bridge-relative-projection-axis-fr298.js';

function tipAnnotation():
ProviderIndependentNasalApexAnnotationFR266V1 {
  return {
    schemaVersion:
      'fr266-provider-independent-nasal-apex-annotation-v1',
    subjectId: 'subject-001',
    captureId: 'capture-001',
    annotatorId: 'tip-annotator',
    coordinateFrame:
      'canonical_aligned_right_handed_metric_3d',
    unit: 'centimeter',
    point: { x: 0, y: 0, z: 2 },
    annotationDefinition:
      'most_prominent_midline_nasal_apex_point_in_canonical_aligned_metric_3d',
    providerOutputVisibleDuringAnnotation: false,
    providerIndicesVisibleDuringAnnotation: false,
    traditionalLabelVisibleDuringAnnotation: false,
    annotationFrozenBeforeProviderScoring: true,
  };
}

function bridgeRootAnnotation():
FR297ProviderIndependentNasalBridgeRootAnnotation {
  return {
    schemaVersion:
      'fr297-provider-independent-nasal-bridge-root-annotation-v1',
    subjectId: 'subject-001',
    captureId: 'capture-001',
    annotatorId: 'bridge-annotator',
    coordinateFrame:
      'canonical_aligned_right_handed_metric_3d',
    unit: 'centimeter',
    point: { x: 0, y: 3, z: 0 },
    annotationDefinition:
      'point_of_maximal_curvature_of_midline_nasal_profile_curve_at_nasal_root_end',
    independentReferenceSurfaceVerified: true,
    providerOutputVisibleDuringAnnotation: false,
    providerIndicesVisibleDuringAnnotation: false,
    traditionalLabelVisibleDuringAnnotation: false,
    annotationFrozenBeforeRgbCandidateScoring: true,
  };
}

function input(): FR298IndependentTipBridgeReferenceInput {
  return {
    schemaVersion:
      'fr298-independent-tip-bridge-reference-input-v1',
    tipAnnotation: tipAnnotation(),
    bridgeRootAnnotation: bridgeRootAnnotation(),
    binding: {
      tipIndependentReferenceSurfaceVerified: true,
      bridgeRootIndependentReferenceSurfaceVerified: true,
      sameCaptureBindingEstablished: true,
      validatedRegistrationBindingEstablished: false,
      referenceFrozenBeforeRgbCandidateScoring: true,
      candidateOutputVisibleDuringReferenceConstruction: false,
      traditionalLabelVisibleDuringReferenceConstruction: false,
    },
  };
}

describe('FR298 neutral nose tip-bridge relative projection axis', () => {
  it('freezes a provider-independent unsigned canonical depth component ratio', () => {
    expect(() =>
      assertFR298NeutralNoseRelativeProjectionAxisAuthority(),
    ).not.toThrow();

    expect(
      FR298_NEUTRAL_NOSE_RELATIVE_PROJECTION_AXIS_AUTHORITY
        .evidence.map((entry) => entry.sourceRef),
    ).toEqual([
      'PMCID:PMC3819161',
      'PMID:17561054',
    ]);
    expect(
      FR298_NEUTRAL_NOSE_RELATIVE_PROJECTION_AXIS_AUTHORITY
        .axis,
    ).toMatchObject({
      depthCoordinate: 'z',
      signTreatment:
        'unsigned_absolute_tip_minus_bridge_root_depth_component',
      anatomicalPositiveZSignIssued: false,
      outputUnit: 'ratio',
      outputRangeInclusive: [0, 1],
      anthropometricStandardClaimed: false,
    });
  });

  it('derives the scale-free depth component from frozen independent 3D points', () => {
    const result =
      deriveFR298NeutralTipBridgeRelativeProjectionReference(
        input(),
      );

    expect(result.referenceAxisDefinitionRef)
      .toBe(FR298_REFERENCE_AXIS_DEFINITION_REF);
    expect(result.value).toBeCloseTo(2 / Math.sqrt(13), 12);
    expect(result.components.absoluteDepthComponentCentimeter)
      .toBe(2);
    expect(result.components.tipBridgeEuclideanDistanceCentimeter)
      .toBeCloseTo(Math.sqrt(13), 12);
    expect(result.components.signDiscarded).toBe(true);
    expect(result.authorityBoundary).toMatchObject({
      referenceAxisDefinitionIssued: true,
      descriptiveBenchmarkReferenceScalarIssued: true,
      anatomicalPositiveZSignIssued: false,
      physicalMillimeterProductOutputIssued: false,
      rgbCandidateIssued: false,
      candidateWinnerIssued: false,
      thresholdIssued: false,
      traditionalBindingIssued: false,
      productColumnMaterialized: false,
      productionActivated: false,
      commerceActivated: false,
    });
  });

  it('rejects an unbound cross-capture pair', () => {
    const value = input();
    expect(() =>
      deriveFR298NeutralTipBridgeRelativeProjectionReference({
        ...value,
        bridgeRootAnnotation: {
          ...value.bridgeRootAnnotation,
          captureId: 'capture-002',
        },
        binding: {
          ...value.binding,
          sameCaptureBindingEstablished: false,
          validatedRegistrationBindingEstablished: false,
        },
      }),
    ).toThrow(/same-capture or validated-registration binding is required/);
  });

  it('rejects a false same-capture claim when capture ids differ', () => {
    const value = input();
    expect(() =>
      deriveFR298NeutralTipBridgeRelativeProjectionReference({
        ...value,
        bridgeRootAnnotation: {
          ...value.bridgeRootAnnotation,
          captureId: 'capture-002',
        },
      }),
    ).toThrow(/same-capture binding requires matching captureId/);
  });

  it('accepts explicitly validated registration across captures', () => {
    const value = input();
    const result =
      deriveFR298NeutralTipBridgeRelativeProjectionReference({
        ...value,
        bridgeRootAnnotation: {
          ...value.bridgeRootAnnotation,
          captureId: 'capture-002',
        },
        binding: {
          ...value.binding,
          sameCaptureBindingEstablished: false,
          validatedRegistrationBindingEstablished: true,
        },
      });

    expect(result.source).toMatchObject({
      tipCaptureId: 'capture-001',
      bridgeRootCaptureId: 'capture-002',
      sameCaptureBindingEstablished: false,
      validatedRegistrationBindingEstablished: true,
    });
  });

  it('rejects zero-length tip-root geometry', () => {
    const value = input();
    expect(() =>
      deriveFR298NeutralTipBridgeRelativeProjectionReference({
        ...value,
        bridgeRootAnnotation: {
          ...value.bridgeRootAnnotation,
          point: { ...value.tipAnnotation.point },
        },
      }),
    ).toThrow(/non-zero finite 3D separation/);
  });

  it('preserves FR293 at 18/29 materialized', () => {
    expect(
      FR293_PRODUCT_COLUMN_MAP.filter(
        (candidate) =>
          candidate.implementationState ===
            'canonical_extractor_materialized',
      ),
    ).toHaveLength(18);
  });
});
