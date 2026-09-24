import type {
  FaceAuthorityRegistry,
  FaceMethodologyPackDefinition,
  FaceMetricDefinition,
  ReviewStatus,
} from './contracts.js';
import {
  FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282,
  type FR282FeatureAuthorityEntry,
  type FR282ObservationClass,
  type FR282Readiness,
  type FR282RegionKey,
} from './rgb-selfie-feature-authority-matrix-fr282.js';
import {
  assertCanonicalRgbSelfieMorphologyPayloadFR284,
  type FR284CanonicalRgbSelfieMorphologyPayload,
} from './canonical-rgb-selfie-morphology-fr284.js';
import {
  FR284_PRODUCT_COLUMN_MAP,
  assertFR284ProductColumnMap,
} from './rgb-selfie-product-column-map-fr284.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FRB001_CONTRACT_VERSION =
  'FRB001-FACE-READING-BINDING-FOUNDATION-v1' as const;

export const FRB001_SCHEMA_VERSION =
  'frb001-face-reading-binding-foundation-v1' as const;

export type FRB001BindingKind =
  | 'direct_numeric'
  | 'component_numeric'
  | 'derived_numeric';

export type FRB001FeatureMaterializationState =
  | 'materialized'
  | 'not_materialized'
  | 'unsupported';

export type FRB001FeatureAvailabilityState =
  | 'available'
  | 'section_limited'
  | 'unavailable'
  | 'not_evaluated';

export type FRB001BindingReadinessState =
  | 'ready_for_metric_value'
  | 'metric_binding_missing'
  | 'canonical_feature_not_materialized'
  | 'canonical_feature_unsupported'
  | 'section_limited'
  | 'feature_unavailable'
  | 'feature_not_evaluated'
  | 'binding_adapter_not_materialized'
  | 'required_observation_outside_product_authority';

export type FRB001HandoffTarget =
  | 'face-observation-engine'
  | 'face-traditional-research'
  | 'face-reading-binding';

export type FRB001HandoffCode =
  | 'metric_binding_missing'
  | 'canonical_feature_not_in_authority_matrix'
  | 'canonical_feature_not_materialized'
  | 'canonical_feature_unsupported'
  | 'binding_adapter_not_materialized'
  | 'required_observation_outside_product_authority';

export interface FRB001CanonicalFeatureAuthorityInventoryEntry {
  readonly featureKey: string;
  readonly regionKey: FR282RegionKey;
  readonly observationClass: FR282ObservationClass;
  readonly authorityReadiness: FR282Readiness;
  readonly materializationAssertion:
    | 'not_asserted_by_fr282'
    | 'unsupported_by_current_product_input';
  readonly traditionalBindingIssued: false;
}

export interface FRB001CanonicalFeatureRef {
  readonly featureKey: string;
  readonly componentPath?: string;
}

export interface FRB001MetricBindingDefinition {
  readonly schemaVersion: typeof FRB001_SCHEMA_VERSION;
  readonly contractVersion: typeof FRB001_CONTRACT_VERSION;
  readonly bindingId: string;
  readonly metricRef: string;
  readonly canonicalFeatures: readonly FRB001CanonicalFeatureRef[];
  readonly bindingKind: FRB001BindingKind;
  readonly adapterRef?: string;
  readonly qualityDependencyRefs: readonly string[];
  readonly reviewStatus: ReviewStatus;
  readonly authorityBoundary: {
    readonly thresholdIssued: false;
    readonly classificationIssued: false;
    readonly cameraCorrectionIssued: false;
    readonly traditionalMeaningCreated: false;
    readonly consumerProseCreated: false;
  };
}

export interface FRB001CanonicalFeatureRuntimeCapability {
  readonly featureKey: string;
  readonly materializationState: FRB001FeatureMaterializationState;
  readonly availabilityState: FRB001FeatureAvailabilityState;
  readonly qualityContextRefs: readonly string[];
}

export interface FRB001BindingHandoffGap {
  readonly target: FRB001HandoffTarget;
  readonly code: FRB001HandoffCode;
  readonly metricRef: string;
  readonly bindingId?: string;
  readonly featureKey?: string;
  readonly detail: string;
}

export interface FRB001MetricBindingReadiness {
  readonly metricRef: string;
  readonly bindingId?: string;
  readonly state: FRB001BindingReadinessState;
  readonly canonicalFeatureKeys: readonly string[];
  readonly gap: FRB001BindingHandoffGap | null;
}

export interface FRB001MethodologyPackBindingCoverageEntry {
  readonly metricRef: string;
  readonly methodologyRef: string;
  readonly bindingId?: string;
  readonly state:
    | 'declared_binding'
    | 'metric_binding_missing'
    | 'required_observation_outside_product_authority';
  readonly canonicalFeatureKeys: readonly string[];
  readonly gap: FRB001BindingHandoffGap | null;
}

export interface FRB001MethodologyPackBindingCoverageAudit {
  readonly schemaVersion: 'frb001-methodology-pack-binding-coverage-audit-v1';
  readonly contractVersion: typeof FRB001_CONTRACT_VERSION;
  readonly methodologyPackRef: string;
  readonly metricCount: number;
  readonly declaredBindingCount: number;
  readonly missingBindingCount: number;
  readonly outsideProductAuthorityCount: number;
  readonly entries: readonly FRB001MethodologyPackBindingCoverageEntry[];
  readonly authorityBoundary: {
    readonly observationExtractionPerformed: false;
    readonly traditionalResearchPerformed: false;
    readonly ruleEvaluationPerformed: false;
    readonly claimIssued: false;
    readonly thresholdIssued: false;
    readonly productionActivated: false;
  };
}

const REVIEW_RANK: Readonly<Record<ReviewStatus, number>> = Object.freeze({
  research: 0,
  reviewed: 1,
  production_authorized: 2,
});

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FRB-001 ${message}`);
}

function nonEmpty(value: string, label: string): string {
  if (value.trim().length === 0) fail(`${label} must be non-empty.`);
  return value;
}

function uniqueNonEmpty(values: readonly string[], label: string): void {
  const seen = new Set<string>();
  for (const value of values) {
    nonEmpty(value, label);
    if (seen.has(value)) fail(`${label} contains duplicate value: ${value}`);
    seen.add(value);
  }
}

function metricRef(metric: FaceMetricDefinition): string {
  return `${metric.metricKey}@${metric.version}`;
}

function packRef(pack: FaceMethodologyPackDefinition): string {
  return `${pack.packId}@${pack.version}`;
}

function featureMap(): ReadonlyMap<string, FR282FeatureAuthorityEntry> {
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282(
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282,
  );
  return new Map(
    FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282.featureEntries
      .map((entry) => [entry.featureKey, entry] as const),
  );
}

function metricMap(
  registry: FaceAuthorityRegistry,
): ReadonlyMap<string, FaceMetricDefinition> {
  return new Map(registry.metrics.map((metric) => [metricRef(metric), metric]));
}

function methodologyRefs(registry: FaceAuthorityRegistry): ReadonlySet<string> {
  return new Set(
    registry.methodologies.map(
      (methodology) => `${methodology.methodologyId}@${methodology.version}`,
    ),
  );
}

function assertFeatureRuntimeCapability(
  capability: FRB001CanonicalFeatureRuntimeCapability,
  knownFeatures: ReadonlyMap<string, FR282FeatureAuthorityEntry>,
): void {
  nonEmpty(capability.featureKey, 'runtimeCapability.featureKey');
  if (!knownFeatures.has(capability.featureKey)) {
    fail(
      `runtime capability references a feature outside FR282 authority: ${capability.featureKey}.`,
    );
  }
  uniqueNonEmpty(
    capability.qualityContextRefs,
    `${capability.featureKey}.qualityContextRefs`,
  );

  if (
    capability.materializationState === 'not_materialized'
    && capability.availabilityState !== 'not_evaluated'
  ) {
    fail(
      `${capability.featureKey} not_materialized capability must remain not_evaluated.`,
    );
  }
  if (
    capability.materializationState === 'unsupported'
    && capability.availabilityState !== 'unavailable'
  ) {
    fail(
      `${capability.featureKey} unsupported capability must remain unavailable.`,
    );
  }
  if (
    capability.materializationState === 'materialized'
    && capability.availabilityState === 'not_evaluated'
  ) {
    fail(
      `${capability.featureKey} materialized capability must expose an evaluated availability state.`,
    );
  }
}

export function buildCanonicalFeatureAuthorityInventoryFRB001():
readonly FRB001CanonicalFeatureAuthorityInventoryEntry[] {
  const matrix = FACE_READING_RGB_SELFIE_FEATURE_AUTHORITY_MATRIX_FR282;
  assertFaceReadingRgbSelfieFeatureAuthorityMatrixFR282(matrix);

  return Object.freeze(matrix.featureEntries.map((entry) => Object.freeze({
    featureKey: entry.featureKey,
    regionKey: entry.regionKey,
    observationClass: entry.observationClass,
    authorityReadiness: entry.readiness,
    materializationAssertion:
      entry.readiness === 'unavailable'
        ? 'unsupported_by_current_product_input' as const
        : 'not_asserted_by_fr282' as const,
    traditionalBindingIssued: false as const,
  })));
}

export function buildFR284RuntimeCapabilitiesFRB001(
  payload: FR284CanonicalRgbSelfieMorphologyPayload,
): readonly FRB001CanonicalFeatureRuntimeCapability[] {
  assertCanonicalRgbSelfieMorphologyPayloadFR284(payload);
  assertFR284ProductColumnMap();

  const payloadFeatures = new Map(
    payload.features.map((feature) => [feature.featureKey, feature] as const),
  );
  const pending = new Set(payload.pendingFeatureKeys);

  const capabilities = FR284_PRODUCT_COLUMN_MAP.map(
    (column): FRB001CanonicalFeatureRuntimeCapability => {
      const feature = payloadFeatures.get(column.featureKey);

      if (feature !== undefined) {
        if (feature.status === 'available') {
          return Object.freeze({
            featureKey: feature.featureKey,
            materializationState: 'materialized' as const,
            availabilityState: 'available' as const,
            qualityContextRefs: Object.freeze([
              ...feature.quality.evidenceRefs,
            ]),
          });
        }

        if (feature.reason === 'image_model_extractor_not_materialized') {
          return Object.freeze({
            featureKey: feature.featureKey,
            materializationState: 'not_materialized' as const,
            availabilityState: 'not_evaluated' as const,
            qualityContextRefs: Object.freeze([
              ...feature.quality.evidenceRefs,
            ]),
          });
        }

        return Object.freeze({
          featureKey: feature.featureKey,
          materializationState: 'materialized' as const,
          availabilityState: 'unavailable' as const,
          qualityContextRefs: Object.freeze([
            ...feature.quality.evidenceRefs,
          ]),
        });
      }

      if (!pending.has(column.featureKey)) {
        fail(
          `FR284 capability adapter lost feature ${column.featureKey}: neither payload feature nor pending key.`,
        );
      }

      if (column.implementationState === 'deferred_unavailable') {
        return Object.freeze({
          featureKey: column.featureKey,
          materializationState: 'unsupported' as const,
          availabilityState: 'unavailable' as const,
          qualityContextRefs: Object.freeze([]),
        });
      }

      return Object.freeze({
        featureKey: column.featureKey,
        materializationState: 'not_materialized' as const,
        availabilityState: 'not_evaluated' as const,
        qualityContextRefs: Object.freeze([]),
      });
    },
  );

  const knownFeatures = featureMap();
  if (capabilities.length !== knownFeatures.size) {
    fail('FR284 capability adapter must cover the complete FR282 feature vocabulary.');
  }
  uniqueNonEmpty(
    capabilities.map((capability) => capability.featureKey),
    'fr284Capabilities.featureKey',
  );
  for (const capability of capabilities) {
    assertFeatureRuntimeCapability(capability, knownFeatures);
  }

  return Object.freeze(capabilities);
}

export function assertFaceReadingMetricBindingRegistryFRB001(input: {
  readonly authorityRegistry: FaceAuthorityRegistry;
  readonly bindings: readonly FRB001MetricBindingDefinition[];
}): void {
  const knownFeatures = featureMap();
  const knownMetrics = metricMap(input.authorityRegistry);
  const knownMethodologies = methodologyRefs(input.authorityRegistry);

  uniqueNonEmpty(
    input.bindings.map((binding) => binding.bindingId),
    'binding.bindingId',
  );
  uniqueNonEmpty(
    input.bindings.map((binding) => binding.metricRef),
    'binding.metricRef',
  );

  for (const binding of input.bindings) {
    if (
      binding.schemaVersion !== FRB001_SCHEMA_VERSION
      || binding.contractVersion !== FRB001_CONTRACT_VERSION
    ) {
      fail(`${binding.bindingId} identity/version drift.`);
    }
    nonEmpty(binding.bindingId, 'binding.bindingId');
    nonEmpty(binding.metricRef, `${binding.bindingId}.metricRef`);

    const metric = knownMetrics.get(binding.metricRef);
    if (metric === undefined) {
      fail(`${binding.bindingId} references unknown methodology metric: ${binding.metricRef}.`);
    }
    if (!knownMethodologies.has(metric.methodologyRef)) {
      fail(
        `${binding.bindingId} metric methodology is missing from authority registry: ${metric.methodologyRef}.`,
      );
    }
    if (binding.canonicalFeatures.length === 0) {
      fail(`${binding.bindingId} requires at least one canonical feature.`);
    }
    uniqueNonEmpty(
      binding.canonicalFeatures.map((feature) => feature.featureKey),
      `${binding.bindingId}.canonicalFeatures`,
    );
    uniqueNonEmpty(
      binding.qualityDependencyRefs,
      `${binding.bindingId}.qualityDependencyRefs`,
    );

    for (const feature of binding.canonicalFeatures) {
      nonEmpty(feature.featureKey, `${binding.bindingId}.canonicalFeature.featureKey`);
      const authority = knownFeatures.get(feature.featureKey);
      if (authority === undefined) {
        fail(
          `${binding.bindingId} references canonical feature outside FR282 authority: ${feature.featureKey}.`,
        );
      }
      if (
        feature.componentPath !== undefined
        && feature.componentPath.trim().length === 0
      ) {
        fail(`${binding.bindingId} contains an empty componentPath.`);
      }
      if (
        binding.reviewStatus !== 'research'
        && authority.readiness === 'unavailable'
      ) {
        fail(
          `${binding.bindingId} cannot promote unavailable product input ${feature.featureKey} beyond research.`,
        );
      }
    }

    if (binding.bindingKind === 'direct_numeric') {
      if (binding.canonicalFeatures.length !== 1) {
        fail(`${binding.bindingId} direct_numeric requires exactly one canonical feature.`);
      }
      if (binding.canonicalFeatures[0]!.componentPath !== undefined) {
        fail(`${binding.bindingId} direct_numeric cannot select a structured component.`);
      }
      if (binding.adapterRef !== undefined) {
        fail(`${binding.bindingId} direct_numeric cannot hide an adapter transformation.`);
      }
    }

    if (binding.bindingKind === 'component_numeric') {
      if (binding.canonicalFeatures.length !== 1) {
        fail(`${binding.bindingId} component_numeric requires exactly one canonical feature.`);
      }
      nonEmpty(
        binding.canonicalFeatures[0]!.componentPath ?? '',
        `${binding.bindingId}.componentPath`,
      );
      nonEmpty(binding.adapterRef ?? '', `${binding.bindingId}.adapterRef`);
    }

    if (binding.bindingKind === 'derived_numeric') {
      nonEmpty(binding.adapterRef ?? '', `${binding.bindingId}.adapterRef`);
    }

    if (REVIEW_RANK[binding.reviewStatus] > REVIEW_RANK[metric.reviewStatus]) {
      fail(
        `${binding.bindingId} review status cannot exceed upstream metric authority ${binding.metricRef}=${metric.reviewStatus}.`,
      );
    }

    if (binding.reviewStatus === 'production_authorized') {
      fail(
        `${binding.bindingId} cannot become production-authorized while FR282 production authority remains disabled.`,
      );
    }

    if (
      binding.authorityBoundary.thresholdIssued !== false
      || binding.authorityBoundary.classificationIssued !== false
      || binding.authorityBoundary.cameraCorrectionIssued !== false
      || binding.authorityBoundary.traditionalMeaningCreated !== false
      || binding.authorityBoundary.consumerProseCreated !== false
    ) {
      fail(`${binding.bindingId} widened FRB001 authority boundary.`);
    }
  }
}

function gap(input: {
  readonly target: FRB001HandoffTarget;
  readonly code: FRB001HandoffCode;
  readonly metricRef: string;
  readonly bindingId?: string;
  readonly featureKey?: string;
  readonly detail: string;
}): FRB001BindingHandoffGap {
  return Object.freeze({
    target: input.target,
    code: input.code,
    metricRef: input.metricRef,
    ...(input.bindingId === undefined ? {} : { bindingId: input.bindingId }),
    ...(input.featureKey === undefined ? {} : { featureKey: input.featureKey }),
    detail: input.detail,
  });
}

export function resolveMetricBindingReadinessFRB001(input: {
  readonly authorityRegistry: FaceAuthorityRegistry;
  readonly binding: FRB001MetricBindingDefinition;
  readonly runtimeCapabilities: readonly FRB001CanonicalFeatureRuntimeCapability[];
  readonly materializedAdapterRefs?: readonly string[];
}): FRB001MetricBindingReadiness {
  assertFaceReadingMetricBindingRegistryFRB001({
    authorityRegistry: input.authorityRegistry,
    bindings: [input.binding],
  });

  const knownFeatures = featureMap();
  uniqueNonEmpty(
    input.runtimeCapabilities.map((capability) => capability.featureKey),
    'runtimeCapabilities.featureKey',
  );
  for (const capability of input.runtimeCapabilities) {
    assertFeatureRuntimeCapability(capability, knownFeatures);
  }

  const capabilityMap = new Map(
    input.runtimeCapabilities.map((capability) => [capability.featureKey, capability] as const),
  );
  const canonicalFeatureKeys = Object.freeze(
    input.binding.canonicalFeatures.map((feature) => feature.featureKey),
  );

  for (const featureRef of input.binding.canonicalFeatures) {
    const authority = knownFeatures.get(featureRef.featureKey)!;
    if (authority.readiness === 'unavailable') {
      return Object.freeze({
        metricRef: input.binding.metricRef,
        bindingId: input.binding.bindingId,
        state: 'required_observation_outside_product_authority' as const,
        canonicalFeatureKeys,
        gap: gap({
          target: 'face-traditional-research',
          code: 'required_observation_outside_product_authority',
          metricRef: input.binding.metricRef,
          bindingId: input.binding.bindingId,
          featureKey: featureRef.featureKey,
          detail:
            'The pinned methodology requires an observation that FR282 marks unavailable for the current ordinary-RGB product input. Traditional methodology must preserve this as unavailable/section-limited or provide a source-governed alternative; the binding layer must not invent a proxy.',
        }),
      });
    }

    const capability = capabilityMap.get(featureRef.featureKey);
    if (
      capability === undefined
      || capability.materializationState === 'not_materialized'
    ) {
      return Object.freeze({
        metricRef: input.binding.metricRef,
        bindingId: input.binding.bindingId,
        state: 'canonical_feature_not_materialized' as const,
        canonicalFeatureKeys,
        gap: gap({
          target: 'face-observation-engine',
          code: 'canonical_feature_not_materialized',
          metricRef: input.binding.metricRef,
          bindingId: input.binding.bindingId,
          featureKey: featureRef.featureKey,
          detail:
            'The methodology-side metric has a declared canonical feature binding, but the observation engine has not materialized the feature yet.',
        }),
      });
    }

    if (capability.materializationState === 'unsupported') {
      return Object.freeze({
        metricRef: input.binding.metricRef,
        bindingId: input.binding.bindingId,
        state: 'canonical_feature_unsupported' as const,
        canonicalFeatureKeys,
        gap: gap({
          target: 'face-observation-engine',
          code: 'canonical_feature_unsupported',
          metricRef: input.binding.metricRef,
          bindingId: input.binding.bindingId,
          featureKey: featureRef.featureKey,
          detail:
            'The observation engine explicitly reports the canonical feature as unsupported under its current implementation.',
        }),
      });
    }

    if (capability.availabilityState === 'section_limited') {
      return Object.freeze({
        metricRef: input.binding.metricRef,
        bindingId: input.binding.bindingId,
        state: 'section_limited' as const,
        canonicalFeatureKeys,
        gap: null,
      });
    }

    if (capability.availabilityState === 'unavailable') {
      return Object.freeze({
        metricRef: input.binding.metricRef,
        bindingId: input.binding.bindingId,
        state: 'feature_unavailable' as const,
        canonicalFeatureKeys,
        gap: null,
      });
    }

    if (capability.availabilityState === 'not_evaluated') {
      return Object.freeze({
        metricRef: input.binding.metricRef,
        bindingId: input.binding.bindingId,
        state: 'feature_not_evaluated' as const,
        canonicalFeatureKeys,
        gap: null,
      });
    }
  }

  if (
    input.binding.bindingKind !== 'direct_numeric'
    && !new Set(input.materializedAdapterRefs ?? []).has(input.binding.adapterRef!)
  ) {
    return Object.freeze({
      metricRef: input.binding.metricRef,
      bindingId: input.binding.bindingId,
      state: 'binding_adapter_not_materialized' as const,
      canonicalFeatureKeys,
      gap: gap({
        target: 'face-reading-binding',
        code: 'binding_adapter_not_materialized',
        metricRef: input.binding.metricRef,
        bindingId: input.binding.bindingId,
        detail:
          `Binding adapter ${input.binding.adapterRef} is declared but not materialized in the binding runtime.`,
      }),
    });
  }

  return Object.freeze({
    metricRef: input.binding.metricRef,
    bindingId: input.binding.bindingId,
    state: 'ready_for_metric_value' as const,
    canonicalFeatureKeys,
    gap: null,
  });
}

export function auditMethodologyPackMetricCoverageFRB001(input: {
  readonly authorityRegistry: FaceAuthorityRegistry;
  readonly methodologyPackRef: string;
  readonly bindings: readonly FRB001MetricBindingDefinition[];
}): FRB001MethodologyPackBindingCoverageAudit {
  assertFaceReadingMetricBindingRegistryFRB001({
    authorityRegistry: input.authorityRegistry,
    bindings: input.bindings,
  });
  nonEmpty(input.methodologyPackRef, 'methodologyPackRef');

  const pack = input.authorityRegistry.methodologyPacks.find(
    (candidate) => packRef(candidate) === input.methodologyPackRef,
  );
  if (pack === undefined) {
    fail(`unknown methodology pack: ${input.methodologyPackRef}.`);
  }

  const enabledMethodologies = new Set(pack.methodologyDefinitionRefs);
  const metrics = input.authorityRegistry.metrics
    .filter((metric) => enabledMethodologies.has(metric.methodologyRef))
    .sort((left, right) => metricRef(left).localeCompare(metricRef(right)));
  const bindingsByMetric = new Map(
    input.bindings.map((binding) => [binding.metricRef, binding] as const),
  );
  const knownFeatures = featureMap();

  const entries = metrics.map((metric): FRB001MethodologyPackBindingCoverageEntry => {
    const ref = metricRef(metric);
    const binding = bindingsByMetric.get(ref);
    if (binding === undefined) {
      return Object.freeze({
        metricRef: ref,
        methodologyRef: metric.methodologyRef,
        state: 'metric_binding_missing' as const,
        canonicalFeatureKeys: Object.freeze([]),
        gap: gap({
          target: 'face-reading-binding',
          code: 'metric_binding_missing',
          metricRef: ref,
          detail:
            'The methodology metric exists, but no canonical observation binding has been declared yet.',
        }),
      });
    }

    const canonicalFeatureKeys = Object.freeze(
      binding.canonicalFeatures.map((feature) => feature.featureKey),
    );
    const unavailable = binding.canonicalFeatures.find(
      (feature) => knownFeatures.get(feature.featureKey)?.readiness === 'unavailable',
    );
    if (unavailable !== undefined) {
      return Object.freeze({
        metricRef: ref,
        methodologyRef: metric.methodologyRef,
        bindingId: binding.bindingId,
        state: 'required_observation_outside_product_authority' as const,
        canonicalFeatureKeys,
        gap: gap({
          target: 'face-traditional-research',
          code: 'required_observation_outside_product_authority',
          metricRef: ref,
          bindingId: binding.bindingId,
          featureKey: unavailable.featureKey,
          detail:
            'The declared binding requires a feature that the current RGB product authority marks unavailable.',
        }),
      });
    }

    return Object.freeze({
      metricRef: ref,
      methodologyRef: metric.methodologyRef,
      bindingId: binding.bindingId,
      state: 'declared_binding' as const,
      canonicalFeatureKeys,
      gap: null,
    });
  });

  return Object.freeze({
    schemaVersion: 'frb001-methodology-pack-binding-coverage-audit-v1' as const,
    contractVersion: FRB001_CONTRACT_VERSION,
    methodologyPackRef: input.methodologyPackRef,
    metricCount: entries.length,
    declaredBindingCount:
      entries.filter((entry) => entry.state === 'declared_binding').length,
    missingBindingCount:
      entries.filter((entry) => entry.state === 'metric_binding_missing').length,
    outsideProductAuthorityCount:
      entries.filter(
        (entry) => entry.state === 'required_observation_outside_product_authority',
      ).length,
    entries: Object.freeze(entries),
    authorityBoundary: Object.freeze({
      observationExtractionPerformed: false as const,
      traditionalResearchPerformed: false as const,
      ruleEvaluationPerformed: false as const,
      claimIssued: false as const,
      thresholdIssued: false as const,
      productionActivated: false as const,
    }),
  });
}

export function createMetricBindingDefinitionFRB001(input: {
  readonly bindingId: string;
  readonly metricRef: string;
  readonly canonicalFeatures: readonly FRB001CanonicalFeatureRef[];
  readonly bindingKind: FRB001BindingKind;
  readonly adapterRef?: string;
  readonly qualityDependencyRefs?: readonly string[];
  readonly reviewStatus?: ReviewStatus;
}): FRB001MetricBindingDefinition {
  return Object.freeze({
    schemaVersion: FRB001_SCHEMA_VERSION,
    contractVersion: FRB001_CONTRACT_VERSION,
    bindingId: input.bindingId,
    metricRef: input.metricRef,
    canonicalFeatures: Object.freeze(
      input.canonicalFeatures.map((feature) => Object.freeze({ ...feature })),
    ),
    bindingKind: input.bindingKind,
    ...(input.adapterRef === undefined ? {} : { adapterRef: input.adapterRef }),
    qualityDependencyRefs: Object.freeze([...(input.qualityDependencyRefs ?? [])]),
    reviewStatus: input.reviewStatus ?? 'research',
    authorityBoundary: Object.freeze({
      thresholdIssued: false as const,
      classificationIssued: false as const,
      cameraCorrectionIssued: false as const,
      traditionalMeaningCreated: false as const,
      consumerProseCreated: false as const,
    }),
  });
}