import { FaceAuthorityValidationError } from './validation.js';

export const FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT_VERSION =
  'FE035B-PRODUCT-NEUTRAL-OBSERVATION-CONTRACT-v1' as const;

export const FE035B_REGION_ORDER = Object.freeze([
  'eye_pair',
  'cheek_mid_face',
  'mouth_lips',
  'chin_lower_face',
] as const);

export type FE035BRegionKey = (typeof FE035B_REGION_ORDER)[number];
export type FE035BMetricUnit = 'ratio' | 'degree' | 'radian';
export type FE035BMetricPresence = 'required' | 'conditional';

export interface FE035BMetricSemanticBoundary {
  readonly traditionalBindingAuthorized: false;
  readonly thresholdAuthorized: false;
  readonly calibrationAuthorized: false;
  readonly classificationAuthorized: false;
  readonly scoreAuthorized: false;
  readonly rankingAuthorized: false;
}

export interface FE035BMetricDefinition {
  readonly metricRef: string;
  readonly regionKey: FE035BRegionKey;
  readonly unit: FE035BMetricUnit;
  readonly presence: FE035BMetricPresence;
  readonly unavailableSurfaceRef: string | null;
  readonly sourceModuleRef: string;
  readonly semanticBoundary: FE035BMetricSemanticBoundary;
}

export interface FE035BNeutralMetricValue {
  readonly regionKey: FE035BRegionKey;
  readonly metricRef: string;
  readonly value: number;
  readonly unit: FE035BMetricUnit;
}

export interface FE035BRegionAvailability {
  readonly regionKey: FE035BRegionKey;
  readonly state: 'available' | 'partial';
  readonly unavailableSurfaces: readonly string[];
}

export interface FE035BNeutralObservationSurface {
  readonly metrics: readonly FE035BNeutralMetricValue[];
  readonly regions: readonly FE035BRegionAvailability[];
}

export interface FE035BProductNeutralObservationContract {
  readonly schemaVersion: 'fe035b-product-neutral-observation-contract-v1';
  readonly contractVersion: typeof FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT_VERSION;
  readonly surfaceState: 'frozen_current_product_neutral_observation_v1';
  readonly regions: readonly {
    readonly regionKey: FE035BRegionKey;
    readonly allowedUnavailableSurfaces: readonly string[];
  }[];
  readonly metrics: readonly FE035BMetricDefinition[];
  readonly authorityBoundary: {
    readonly freezesExistingNeutralObservationSurface: true;
    readonly issuesTraditionalBindingAuthority: false;
    readonly issuesThresholdAuthority: false;
    readonly issuesCalibrationAuthority: false;
    readonly issuesClassificationAuthority: false;
    readonly issuesScoreAuthority: false;
    readonly issuesRankingAuthority: false;
    readonly issuesNarrativeAuthority: false;
    readonly exposesRawGeometry: false;
    readonly exposesProviderTrace: false;
    readonly widensPreviewEnginePublicExport: false;
  };
  readonly evolutionPolicy: {
    readonly mutateV1InPlace: false;
    readonly newNeutralMetricRequiresNewContractVersion: true;
    readonly semanticAuthorityMayBeInferredFromRegistryMembership: false;
  };
}

const CLOSED_METRIC_BOUNDARY: FE035BMetricSemanticBoundary = Object.freeze({
  traditionalBindingAuthorized: false,
  thresholdAuthorized: false,
  calibrationAuthorized: false,
  classificationAuthorized: false,
  scoreAuthorized: false,
  rankingAuthorized: false,
});

export const FE035B_ALLOWED_UNAVAILABLE_SURFACES: Readonly<
  Record<FE035BRegionKey, readonly string[]>
> = Object.freeze({
  eye_pair: Object.freeze([
    'eye_pair.outer_corner_tilt',
  ]),
  cheek_mid_face: Object.freeze([
    'cheek_mid_face.visible_contour_prominence',
    'cheek_mid_face.visible_width',
  ]),
  mouth_lips: Object.freeze([
    'mouth_lips.visible_corner_orientation',
  ]),
  chin_lower_face: Object.freeze([
    'chin_lower_face.visible_contour',
    'chin_lower_face.visible_width',
  ]),
});

function metric(
  metricRef: string,
  regionKey: FE035BRegionKey,
  unit: FE035BMetricUnit,
  presence: FE035BMetricPresence,
  unavailableSurfaceRef: string | null,
  sourceModuleRef: string,
): FE035BMetricDefinition {
  return Object.freeze({
    metricRef,
    regionKey,
    unit,
    presence,
    unavailableSurfaceRef,
    sourceModuleRef,
    semanticBoundary: CLOSED_METRIC_BOUNDARY,
  });
}

export const FE035B_PRODUCT_NEUTRAL_METRIC_REGISTRY: readonly FE035BMetricDefinition[] =
  Object.freeze([
    metric(
      'neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0',
      'eye_pair',
      'ratio',
      'required',
      null,
      'packages/face-reading/src/eye-neutral-axis-bundle-fr210.ts',
    ),
    metric(
      'neutral.eye_pair.metric_3d.mean_cycle_y_to_x_span_ratio@0.1.0',
      'eye_pair',
      'ratio',
      'required',
      null,
      'packages/face-reading/src/eye-neutral-axis-bundle-fr210.ts',
    ),
    metric(
      'neutral.eye_pair.metric_3d.centroid_separation_to_full_mesh_x_span_ratio@0.1.0',
      'eye_pair',
      'ratio',
      'required',
      null,
      'packages/face-reading/src/eye-neutral-axis-bundle-fr210.ts',
    ),
    metric(
      'neutral.eye_pair.metric_3d.mean_closed_cycle_absolute_turning_angle@0.1.0',
      'eye_pair',
      'radian',
      'required',
      null,
      'packages/face-reading/src/eye-neutral-axis-bundle-fr210.ts',
    ),
    metric(
      'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0',
      'eye_pair',
      'degree',
      'conditional',
      'eye_pair.outer_corner_tilt',
      'packages/face-reading/src/eye-neutral-axis-bundle-fr210.ts',
    ),
    metric(
      'neutral.eye_pair.asymmetry.absolute_relative_x_span_difference@0.1.0',
      'eye_pair',
      'ratio',
      'required',
      null,
      'packages/face-reading/src/eye-asymmetry-surface-fr215.ts',
    ),
    metric(
      'neutral.eye_pair.asymmetry.absolute_y_to_x_span_ratio_difference@0.1.0',
      'eye_pair',
      'ratio',
      'required',
      null,
      'packages/face-reading/src/eye-asymmetry-surface-fr215.ts',
    ),
    metric(
      'neutral.eye_pair.asymmetry.absolute_mean_turning_angle_difference@0.1.0',
      'eye_pair',
      'radian',
      'required',
      null,
      'packages/face-reading/src/eye-asymmetry-surface-fr215.ts',
    ),
    metric(
      'neutral.midface.visible_width_to_face_width_ratio@0.1.0',
      'cheek_mid_face',
      'ratio',
      'conditional',
      'cheek_mid_face.visible_width',
      'packages/face-reading/src/visible-midface-band-fr211.ts',
    ),
    metric(
      'neutral.cheek_midface.visible_side_contour_deviation_to_face_width.mean@0.1.0',
      'cheek_mid_face',
      'ratio',
      'conditional',
      'cheek_mid_face.visible_contour_prominence',
      'packages/face-reading/src/visible-cheek-contour-prominence-fr217.ts',
    ),
    metric(
      'neutral.mouth.corner_elevation.mean_to_mouth_width_ratio@0.1.0',
      'mouth_lips',
      'ratio',
      'conditional',
      'mouth_lips.visible_corner_orientation',
      'packages/face-reading/src/visible-mouth-corner-orientation-fr212.ts',
    ),
    metric(
      'neutral.mouth.outline.mean_rms_absolute_turning_angle_degrees@0.1.0',
      'mouth_lips',
      'degree',
      'required',
      null,
      'packages/face-reading/src/role-free-mouth-outline-angularity-fr214.ts',
    ),
    metric(
      'neutral.lower_face.visible_width_to_face_width_ratio@0.1.0',
      'chin_lower_face',
      'ratio',
      'conditional',
      'chin_lower_face.visible_width',
      'packages/face-reading/src/visible-lower-face-width-fr213.ts',
    ),
  ]);

const AUTHORITY_BOUNDARY = Object.freeze({
  freezesExistingNeutralObservationSurface: true as const,
  issuesTraditionalBindingAuthority: false as const,
  issuesThresholdAuthority: false as const,
  issuesCalibrationAuthority: false as const,
  issuesClassificationAuthority: false as const,
  issuesScoreAuthority: false as const,
  issuesRankingAuthority: false as const,
  issuesNarrativeAuthority: false as const,
  exposesRawGeometry: false as const,
  exposesProviderTrace: false as const,
  widensPreviewEnginePublicExport: false as const,
});

const EVOLUTION_POLICY = Object.freeze({
  mutateV1InPlace: false as const,
  newNeutralMetricRequiresNewContractVersion: true as const,
  semanticAuthorityMayBeInferredFromRegistryMembership: false as const,
});

export const FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT: FE035BProductNeutralObservationContract =
  Object.freeze({
    schemaVersion: 'fe035b-product-neutral-observation-contract-v1' as const,
    contractVersion: FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT_VERSION,
    surfaceState: 'frozen_current_product_neutral_observation_v1' as const,
    regions: Object.freeze(
      FE035B_REGION_ORDER.map((regionKey) =>
        Object.freeze({
          regionKey,
          allowedUnavailableSurfaces:
            FE035B_ALLOWED_UNAVAILABLE_SURFACES[regionKey],
        }),
      ),
    ),
    metrics: FE035B_PRODUCT_NEUTRAL_METRIC_REGISTRY,
    authorityBoundary: AUTHORITY_BOUNDARY,
    evolutionPolicy: EVOLUTION_POLICY,
  });

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError('FE-035B ' + message);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function exactKeys(
  value: object,
  allowed: readonly string[],
  path: string,
): void {
  const actual = Object.keys(value);
  if (
    actual.length !== allowed.length ||
    actual.some((key) => !allowed.includes(key))
  ) {
    fail(path + ' contains unauthorized or missing fields.');
  }
}

function sameSequence(
  actual: readonly string[],
  expected: readonly string[],
): boolean {
  return (
    actual.length === expected.length &&
    actual.every((value, index) => value === expected[index])
  );
}

function assertMetricBoundary(
  boundary: FE035BMetricSemanticBoundary,
  metricRef: string,
): void {
  if (Object.values(boundary).some((value) => value !== false)) {
    fail('metric semantic authority widened: ' + metricRef);
  }
}

export function assertProductNeutralObservationContractFE035B(
  contract: FE035BProductNeutralObservationContract,
): void {
  if (
    contract.schemaVersion !== 'fe035b-product-neutral-observation-contract-v1' ||
    contract.contractVersion !==
      FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT_VERSION ||
    contract.surfaceState !== 'frozen_current_product_neutral_observation_v1'
  ) {
    fail('contract identity drift.');
  }

  if (
    contract.regions.length !== FE035B_REGION_ORDER.length ||
    !sameSequence(
      contract.regions.map((entry) => entry.regionKey),
      FE035B_REGION_ORDER,
    )
  ) {
    fail('canonical region order drift.');
  }

  for (const region of contract.regions) {
    if (
      !sameSequence(
        region.allowedUnavailableSurfaces,
        FE035B_ALLOWED_UNAVAILABLE_SURFACES[region.regionKey],
      )
    ) {
      fail('allowed unavailable surface drift: ' + region.regionKey);
    }
  }

  if (contract.metrics.length !== 13) {
    fail('metric registry cardinality drift.');
  }

  const metricRefs = contract.metrics.map((entry) => entry.metricRef);
  if (new Set(metricRefs).size !== metricRefs.length) {
    fail('metric registry contains duplicate metric refs.');
  }

  for (const definition of contract.metrics) {
    if (
      definition.metricRef.trim().length === 0 ||
      !FE035B_REGION_ORDER.includes(definition.regionKey) ||
      !['ratio', 'degree', 'radian'].includes(definition.unit) ||
      !['required', 'conditional'].includes(definition.presence) ||
      definition.sourceModuleRef.trim().length === 0
    ) {
      fail('metric registry contains invalid identity data.');
    }
    assertMetricBoundary(definition.semanticBoundary, definition.metricRef);

    if (definition.presence === 'required') {
      if (definition.unavailableSurfaceRef !== null) {
        fail('required metric cannot have an unavailable surface ref: ' + definition.metricRef);
      }
      continue;
    }

    if (
      definition.unavailableSurfaceRef === null ||
      !FE035B_ALLOWED_UNAVAILABLE_SURFACES[definition.regionKey].includes(
        definition.unavailableSurfaceRef,
      )
    ) {
      fail('conditional metric must bind one allowed unavailable surface: ' + definition.metricRef);
    }
  }

  if (
    contract.authorityBoundary.freezesExistingNeutralObservationSurface !== true ||
    Object.entries(contract.authorityBoundary)
      .filter(([key]) => key !== 'freezesExistingNeutralObservationSurface')
      .some(([, value]) => value !== false)
  ) {
    fail('contract authority widened.');
  }

  if (
    contract.evolutionPolicy.mutateV1InPlace !== false ||
    contract.evolutionPolicy.newNeutralMetricRequiresNewContractVersion !== true ||
    contract.evolutionPolicy.semanticAuthorityMayBeInferredFromRegistryMembership !== false
  ) {
    fail('contract evolution policy drift.');
  }
}

export function issueProductNeutralObservationContractFE035B(): FE035BProductNeutralObservationContract {
  assertProductNeutralObservationContractFE035B(
    FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT,
  );
  ISSUED.add(FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT);
  return FE035B_PRODUCT_NEUTRAL_OBSERVATION_CONTRACT;
}

export function assertIssuedProductNeutralObservationContractFE035B(
  contract: FE035BProductNeutralObservationContract,
): void {
  assertProductNeutralObservationContractFE035B(contract);
  if (!ISSUED.has(contract as object)) {
    fail('contract was not issued by the active FE035B authority.');
  }
}

export function assertProductNeutralObservationSurfaceFE035B(
  value: FE035BNeutralObservationSurface,
): void {
  if (!isRecord(value)) fail('surface must be an object.');
  exactKeys(value, ['metrics', 'regions'], 'surface');

  if (!Array.isArray(value.metrics) || !Array.isArray(value.regions)) {
    fail('surface metrics and regions must be arrays.');
  }

  if (
    value.regions.length !== FE035B_REGION_ORDER.length ||
    !sameSequence(
      value.regions.map((entry) => entry.regionKey),
      FE035B_REGION_ORDER,
    )
  ) {
    fail('surface region order drift.');
  }

  const regionByKey = new Map<FE035BRegionKey, FE035BRegionAvailability>();
  for (const region of value.regions) {
    if (!isRecord(region)) fail('region entry must be an object.');
    exactKeys(region, ['regionKey', 'state', 'unavailableSurfaces'], 'region');

    if (
      !FE035B_REGION_ORDER.includes(region.regionKey) ||
      (region.state !== 'available' && region.state !== 'partial') ||
      !Array.isArray(region.unavailableSurfaces) ||
      !region.unavailableSurfaces.every((entry) => typeof entry === 'string')
    ) {
      fail('invalid region availability entry.');
    }

    const unavailable = [...region.unavailableSurfaces];
    if (
      new Set(unavailable).size !== unavailable.length ||
      !sameSequence(unavailable, [...unavailable].sort())
    ) {
      fail('unavailable surfaces must be unique and sorted.');
    }

    const allowed = FE035B_ALLOWED_UNAVAILABLE_SURFACES[region.regionKey];
    if (unavailable.some((entry) => !allowed.includes(entry))) {
      fail('region contains an unknown unavailable surface: ' + region.regionKey);
    }

    const expectedState = unavailable.length === 0 ? 'available' : 'partial';
    if (region.state !== expectedState) {
      fail('region availability state does not match unavailable surfaces: ' + region.regionKey);
    }
    regionByKey.set(region.regionKey, region);
  }

  const definitionByRef = new Map(
    FE035B_PRODUCT_NEUTRAL_METRIC_REGISTRY.map((entry) => [
      entry.metricRef,
      entry,
    ] as const),
  );
  const metricRefs: string[] = [];

  for (const entry of value.metrics) {
    if (!isRecord(entry)) fail('metric entry must be an object.');
    exactKeys(entry, ['regionKey', 'metricRef', 'value', 'unit'], 'metric');

    if (
      typeof entry.metricRef !== 'string' ||
      typeof entry.value !== 'number' ||
      !Number.isFinite(entry.value) ||
      !FE035B_REGION_ORDER.includes(entry.regionKey) ||
      !['ratio', 'degree', 'radian'].includes(entry.unit)
    ) {
      fail('surface contains invalid neutral metric data.');
    }

    const definition = definitionByRef.get(entry.metricRef);
    if (definition === undefined) {
      fail('surface contains unknown metricRef: ' + entry.metricRef);
    }
    if (
      entry.regionKey !== definition.regionKey ||
      entry.unit !== definition.unit
    ) {
      fail('metric region or unit drift: ' + entry.metricRef);
    }
    metricRefs.push(entry.metricRef);
  }

  if (new Set(metricRefs).size !== metricRefs.length) {
    fail('surface contains duplicate metric refs.');
  }

  const present = new Set(metricRefs);
  for (const definition of FE035B_PRODUCT_NEUTRAL_METRIC_REGISTRY) {
    if (definition.presence === 'required') {
      if (!present.has(definition.metricRef)) {
        fail('required metric missing: ' + definition.metricRef);
      }
      continue;
    }

    const region = regionByKey.get(definition.regionKey);
    if (region === undefined || definition.unavailableSurfaceRef === null) {
      fail('conditional metric registry is internally inconsistent.');
    }
    const unavailable = region.unavailableSurfaces.includes(
      definition.unavailableSurfaceRef,
    );
    const isPresent = present.has(definition.metricRef);
    if (unavailable === isPresent) {
      fail('conditional metric availability mismatch: ' + definition.metricRef);
    }
  }
}
