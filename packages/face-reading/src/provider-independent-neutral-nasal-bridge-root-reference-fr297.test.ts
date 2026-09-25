import { describe, expect, it } from 'vitest';
import {
  FR293_PRODUCT_COLUMN_MAP,
} from './rgb-selfie-product-column-map-fr293.js';
import {
  FR297_NASAL_BRIDGE_ROOT_REFERENCE_DEFINITION_REF,
  FR297_PROVIDER_INDEPENDENT_NASAL_BRIDGE_ROOT_AUTHORITY,
  assertFR297NasalBridgeRootAuthority,
  deriveFR297NeutralNasalBridgeRootReference,
  type FR297ProviderIndependentNasalBridgeRootAnnotation,
} from './provider-independent-neutral-nasal-bridge-root-reference-fr297.js';

function annotation():
FR297ProviderIndependentNasalBridgeRootAnnotation {
  return {
    schemaVersion:
      'fr297-provider-independent-nasal-bridge-root-annotation-v1',
    subjectId: 'study-subject-001',
    captureId: 'capture-001',
    annotatorId: 'annotator-001',
    coordinateFrame:
      'canonical_aligned_right_handed_metric_3d',
    unit: 'centimeter',
    point: { x: 0.01, y: 2.4, z: -0.8 },
    annotationDefinition:
      'point_of_maximal_curvature_of_midline_nasal_profile_curve_at_nasal_root_end',
    independentReferenceSurfaceVerified: true,
    providerOutputVisibleDuringAnnotation: false,
    providerIndicesVisibleDuringAnnotation: false,
    traditionalLabelVisibleDuringAnnotation: false,
    annotationFrozenBeforeRgbCandidateScoring: true,
  };
}

describe('FR297 provider-independent neutral nasal bridge-root reference', () => {
  it('freezes exactly three provider-independent soft-tissue evidence refs', () => {
    expect(
      FR297_PROVIDER_INDEPENDENT_NASAL_BRIDGE_ROOT_AUTHORITY
        .evidence.map((entry) => entry.sourceRef),
    ).toEqual([
      'PMCID:PMC4832301',
      'PMCID:PMC8036493',
      'PMCID:PMC3819161',
    ]);
    expect(() => assertFR297NasalBridgeRootAuthority())
      .not.toThrow();
  });

  it('derives a provider-blind 3D benchmark-reference component from an explicit frozen annotation', () => {
    const result =
      deriveFR297NeutralNasalBridgeRootReference(
        annotation(),
      );

    expect(result.referenceDefinitionRef)
      .toBe(FR297_NASAL_BRIDGE_ROOT_REFERENCE_DEFINITION_REF);
    expect(result.coordinateFrame)
      .toBe('canonical_aligned_right_handed_metric_3d');
    expect(result.point).toEqual({
      x: 0.01,
      y: 2.4,
      z: -0.8,
    });
    expect(result.source).toMatchObject({
      independentReferenceSurfaceVerified: true,
      providerBlind: true,
      providerIndexBlind: true,
      traditionalLabelBlind: true,
      frozenBeforeRgbCandidateScoring: true,
    });
  });

  it('rejects provider-visible annotation input', () => {
    const input = annotation();
    expect(() =>
      deriveFR297NeutralNasalBridgeRootReference({
        ...input,
        providerOutputVisibleDuringAnnotation: true,
      } as unknown as FR297ProviderIndependentNasalBridgeRootAnnotation),
    ).toThrow(/FR-297 annotation authority boundary drift/);
  });

  it('rejects non-finite 3D coordinates', () => {
    const input = annotation();
    expect(() =>
      deriveFR297NeutralNasalBridgeRootReference({
        ...input,
        point: { x: Number.NaN, y: 2.4, z: -0.8 },
      }),
    ).toThrow(/FR-297 annotation point must contain finite/);
  });

  it('does not promote sellion to nasion, traditional semantics, or a projection axis', () => {
    const result =
      deriveFR297NeutralNasalBridgeRootReference(
        annotation(),
      );

    expect(result.authorityBoundary).toMatchObject({
      benchmarkReferenceComponentOnly: true,
      anthropometricSellionIdentityPromotedToProduct: false,
      nasionEquivalenceIssued: false,
      automatedExtractionIssued: false,
      rgbCandidateIssued: false,
      tipBridgeProjectionAxisIssued: false,
      candidateWinnerIssued: false,
      thresholdIssued: false,
      traditionalBindingIssued: false,
      productColumnMaterialized: false,
      productionActivated: false,
    });
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
