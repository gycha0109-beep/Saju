import { describe, expect, it } from 'vitest';
import {
  FE035B_PRODUCT_NEUTRAL_METRIC_REGISTRY,
  FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT_VERSION,
  FE035B_REGION_ORDER,
  assertIssuedProductNeutralObservationContractFE035B,
  assertProductNeutralObservationSurfaceFE035B,
  issueProductNeutralObservationContractFE035B,
  type FE035BNeutralObservationSurface,
} from './product-neutral-observation-contract-fe035b.js';

function fullSurface(): FE035BNeutralObservationSurface {
  return {
    metrics: FE035B_PRODUCT_NEUTRAL_METRIC_REGISTRY.map((definition, index) => ({
      regionKey: definition.regionKey,
      metricRef: definition.metricRef,
      value: (index + 1) / 100,
      unit: definition.unit,
    })),
    regions: FE035B_REGION_ORDER.map((regionKey) => ({
      regionKey,
      state: 'available' as const,
      unavailableSurfaces: [],
    })),
  };
}

function partialSurface(): FE035BNeutralObservationSurface {
  const unavailableByRegion = {
    eye_pair: ['eye_pair.outer_corner_tilt'],
    cheek_mid_face: [
      'cheek_mid_face.visible_contour_prominence',
      'cheek_mid_face.visible_width',
    ],
    mouth_lips: ['mouth_lips.visible_corner_orientation'],
    chin_lower_face: [
      'chin_lower_face.visible_contour',
      'chin_lower_face.visible_width',
    ],
  } as const;

  return {
    metrics: FE035B_PRODUCT_NEUTRAL_METRIC_REGISTRY
      .filter((definition) => definition.presence === 'required')
      .map((definition, index) => ({
        regionKey: definition.regionKey,
        metricRef: definition.metricRef,
        value: (index + 1) / 100,
        unit: definition.unit,
      })),
    regions: FE035B_REGION_ORDER.map((regionKey) => ({
      regionKey,
      state: 'partial' as const,
      unavailableSurfaces: [...unavailableByRegion[regionKey]].sort(),
    })),
  };
}

function cloneSurface(
  surface: FE035BNeutralObservationSurface = fullSurface(),
): FE035BNeutralObservationSurface {
  return structuredClone(surface);
}

describe('FE035B product neutral observation contract', () => {
  it('issues the frozen v1 contract without semantic authority', () => {
    const contract = issueProductNeutralObservationContractFE035B();

    expect(contract.contractVersion).toBe(
      FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT_VERSION,
    );
    expect(contract.regions.map((entry) => entry.regionKey)).toEqual(
      FE035B_REGION_ORDER,
    );
    expect(contract.metrics).toHaveLength(13);
    expect(contract.metrics.filter((entry) => entry.presence === 'required')).toHaveLength(8);
    expect(contract.metrics.filter((entry) => entry.presence === 'conditional')).toHaveLength(5);
    expect(contract.authorityBoundary).toEqual({
      freezesExistingNeutralObservationSurface: true,
      issuesTraditionalBindingAuthority: false,
      issuesThresholdAuthority: false,
      issuesCalibrationAuthority: false,
      issuesClassificationAuthority: false,
      issuesScoreAuthority: false,
      issuesRankingAuthority: false,
      issuesNarrativeAuthority: false,
      exposesRawGeometry: false,
      exposesProviderTrace: false,
      widensPreviewEnginePublicExport: false,
    });
    expect(contract.evolutionPolicy).toEqual({
      mutateV1InPlace: false,
      newNeutralMetricRequiresNewContractVersion: true,
      semanticAuthorityMayBeInferredFromRegistryMembership: false,
    });
    expect(() =>
      assertIssuedProductNeutralObservationContractFE035B(contract),
    ).not.toThrow();
  });

  it('accepts the complete current product-safe neutral surface', () => {
    expect(() =>
      assertProductNeutralObservationSurfaceFE035B(fullSurface()),
    ).not.toThrow();
  });

  it('accepts conditional metric absence only with matching unavailable surfaces', () => {
    expect(() =>
      assertProductNeutralObservationSurfaceFE035B(partialSurface()),
    ).not.toThrow();
  });

  it('rejects unknown metrics and metric identity drift', () => {
    const unknown = cloneSurface();
    unknown.metrics = [
      ...unknown.metrics,
      {
        regionKey: 'eye_pair',
        metricRef: 'neutral.unknown.metric@0.1.0',
        value: 0.5,
        unit: 'ratio',
      },
    ];
    expect(() => assertProductNeutralObservationSurfaceFE035B(unknown)).toThrow(
      /unknown metricRef/u,
    );

    const wrongUnit = cloneSurface();
    wrongUnit.metrics[0] = { ...wrongUnit.metrics[0], unit: 'degree' };
    expect(() => assertProductNeutralObservationSurfaceFE035B(wrongUnit)).toThrow(
      /region or unit drift/u,
    );

    const wrongRegion = cloneSurface();
    wrongRegion.metrics[0] = {
      ...wrongRegion.metrics[0],
      regionKey: 'mouth_lips',
    };
    expect(() => assertProductNeutralObservationSurfaceFE035B(wrongRegion)).toThrow(
      /region or unit drift/u,
    );
  });

  it('rejects duplicates, non-finite values, and missing required metrics', () => {
    const duplicate = cloneSurface();
    duplicate.metrics = [...duplicate.metrics, { ...duplicate.metrics[0] }];
    expect(() => assertProductNeutralObservationSurfaceFE035B(duplicate)).toThrow(
      /duplicate metric refs/u,
    );

    const nonFinite = cloneSurface();
    nonFinite.metrics[0] = { ...nonFinite.metrics[0], value: Number.NaN };
    expect(() => assertProductNeutralObservationSurfaceFE035B(nonFinite)).toThrow(
      /invalid neutral metric/u,
    );

    const missingRequired = cloneSurface();
    const requiredRef = FE035B_PRODUCT_NEUTRAL_METRIC_REGISTRY.find(
      (entry) => entry.presence === 'required',
    )!.metricRef;
    missingRequired.metrics = missingRequired.metrics.filter(
      (entry) => entry.metricRef !== requiredRef,
    );
    expect(() =>
      assertProductNeutralObservationSurfaceFE035B(missingRequired),
    ).toThrow(/required metric missing/u);
  });

  it('rejects unexplained conditional absence or contradictory conditional presence', () => {
    const conditional = FE035B_PRODUCT_NEUTRAL_METRIC_REGISTRY.find(
      (entry) => entry.presence === 'conditional',
    )!;

    const unexplainedAbsence = cloneSurface();
    unexplainedAbsence.metrics = unexplainedAbsence.metrics.filter(
      (entry) => entry.metricRef !== conditional.metricRef,
    );
    expect(() =>
      assertProductNeutralObservationSurfaceFE035B(unexplainedAbsence),
    ).toThrow(/conditional metric availability mismatch/u);

    const contradictoryPresence = cloneSurface();
    const regionIndex = contradictoryPresence.regions.findIndex(
      (entry) => entry.regionKey === conditional.regionKey,
    );
    contradictoryPresence.regions[regionIndex] = {
      regionKey: conditional.regionKey,
      state: 'partial',
      unavailableSurfaces: [conditional.unavailableSurfaceRef!],
    };
    expect(() =>
      assertProductNeutralObservationSurfaceFE035B(contradictoryPresence),
    ).toThrow(/conditional metric availability mismatch/u);
  });

  it('rejects region-order drift, unknown unavailable surfaces, and semantic field injection', () => {
    const reordered = cloneSurface();
    reordered.regions = [
      reordered.regions[1],
      reordered.regions[0],
      ...reordered.regions.slice(2),
    ];
    expect(() => assertProductNeutralObservationSurfaceFE035B(reordered)).toThrow(
      /region order drift/u,
    );

    const unknownSurface = cloneSurface();
    unknownSurface.regions[0] = {
      regionKey: 'eye_pair',
      state: 'partial',
      unavailableSurfaces: ['eye_pair.invented_surface'],
    };
    expect(() =>
      assertProductNeutralObservationSurfaceFE035B(unknownSurface),
    ).toThrow(/unknown unavailable surface/u);

    const widened = {
      ...fullSurface(),
      classification: 'invented',
    } as unknown as FE035BNeutralObservationSurface;
    expect(() => assertProductNeutralObservationSurfaceFE035B(widened)).toThrow(
      /unauthorized or missing fields/u,
    );
  });
});
