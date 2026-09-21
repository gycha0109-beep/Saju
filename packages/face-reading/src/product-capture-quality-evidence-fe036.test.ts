import { describe, expect, it } from 'vitest';
import {
  FE035B_PRODUCT_NEUTRAL_METRIC_REGISTRY,
  FE035B_REGION_ORDER,
  type FE035BNeutralObservationSurface,
} from './product-neutral-observation-contract-fe035b.js';
import {
  FE036_PRODUCT_CAPTURE_QUALITY_EVIDENCE_VERSION,
  projectProductCaptureQualityEvidenceFE036,
} from './product-capture-quality-evidence-fe036.js';

function surface(
  unavailableByRegion: Partial<Record<(typeof FE035B_REGION_ORDER)[number], readonly string[]>> = {},
): FE035BNeutralObservationSurface {
  const regions = FE035B_REGION_ORDER.map((regionKey) => {
    const unavailable = [...(unavailableByRegion[regionKey] ?? [])].sort();
    return {
      regionKey,
      state: unavailable.length === 0 ? 'available' as const : 'partial' as const,
      unavailableSurfaces: unavailable,
    };
  });

  const metrics = FE035B_PRODUCT_NEUTRAL_METRIC_REGISTRY
    .filter((definition) => {
      if (definition.presence === 'required') return true;
      const unavailable = unavailableByRegion[definition.regionKey] ?? [];
      return !unavailable.includes(definition.unavailableSurfaceRef!);
    })
    .map((definition, index) => ({
      regionKey: definition.regionKey,
      metricRef: definition.metricRef,
      value: (index + 1) / 100,
      unit: definition.unit,
    }));

  return { metrics, regions };
}

describe('FE036 product capture-quality evidence boundary', () => {
  it('keeps all product quality dimensions unassessed', () => {
    const result = projectProductCaptureQualityEvidenceFE036(surface());

    expect(result.contractVersion).toBe(
      FE036_PRODUCT_CAPTURE_QUALITY_EVIDENCE_VERSION,
    );
    expect(result.authorityState).toBe(
      'capture_quality_unassessed_descriptive_observation_only',
    );
    expect(Object.values(result.qualityDimensions)).toEqual(
      Array.from({ length: 6 }, () => ({
        state: 'unassessed',
        reason:
          'no_validated_product_quality_construct_or_threshold_authority',
      })),
    );
  });

  it('preserves descriptive partial region coverage without turning it into pass/fail quality', () => {
    const input = surface({
      eye_pair: ['eye_pair.outer_corner_tilt'],
      chin_lower_face: ['chin_lower_face.visible_contour'],
    });
    const result = projectProductCaptureQualityEvidenceFE036(input);

    expect(result.descriptiveRegionCoverage).toEqual(input.regions);
    expect(result.descriptiveRegionCoverage[0]?.state).toBe('partial');
    expect(result.descriptiveRegionCoverage[3]?.state).toBe('partial');
    expect(result.authorityBoundary.userFacingPassFailQualityLabelAllowed).toBe(false);
    expect(result.authorityBoundary.automaticCaptureQualityGateAuthorized).toBe(false);
  });

  it('pins FR162 research coaching but does not promote it to cross-face product guidance', () => {
    const result = projectProductCaptureQualityEvidenceFE036(surface());

    expect(result.researchCoachingEvidence).toEqual({
      sourceScope: 'eye_pair_repeat_capture_research',
      frontalNeutralPoseRequested: true,
      cameraNearEyeLevelRequested: true,
      avoidIntentionallyExtremeNearOrFarFraming: true,
      avoidIntentionallyHighOrLowCameraAngle: true,
      consistentFramingAcrossRepeatedCapturesRequested: true,
      promotedToCrossFaceProductGuidance: false,
    });
    expect(result.authorityBoundary.crossFaceProductCaptureCoachingIssued).toBe(false);
  });

  it('issues no thresholds, scores, classifiers, semantic authority, or persistence', () => {
    const boundary =
      projectProductCaptureQualityEvidenceFE036(surface()).authorityBoundary;

    expect(boundary).toEqual({
      descriptiveRegionAvailabilityOnly: true,
      captureQualityMeasurementConstructValidated: false,
      captureQualityThresholdsDefined: false,
      captureQualityValidated: false,
      automaticCaptureQualityGateAuthorized: false,
      automaticMetricSuppressionThresholdAuthorized: false,
      automaticRetakeThresholdAuthorized: false,
      userFacingPassFailQualityLabelAllowed: false,
      crossFaceProductCaptureCoachingIssued: false,
      qualityScoreIssued: false,
      classificationIssued: false,
      traditionalSemanticAuthority: false,
      rawImagePersisted: false,
      rawProviderResponsePersisted: false,
      rawGeometryExposed: false,
      providerTraceExposed: false,
    });
  });

  it('fails closed on an invalid FE035B surface', () => {
    const invalid = surface();
    const first = invalid.metrics[0]!;
    const widened = {
      metrics: [
        { ...first, metricRef: 'neutral.invented.metric@0.1.0' },
        ...invalid.metrics.slice(1),
      ],
      regions: invalid.regions,
    };

    expect(() =>
      projectProductCaptureQualityEvidenceFE036(widened),
    ).toThrow(/unknown metricRef/u);
  });
});
