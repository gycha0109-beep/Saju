import type {
  FaceDisplayFactReceiptV1,
  FaceDisplayValueV1,
  FaceObservationDisplayFactV1,
} from './display-facts.js';
import {
  admitFaceDisplayFacts,
  FACE_DISPLAY_FACT_RECEIPT_SCHEMA_VERSION,
} from './display-facts.js';
import type {
  FaceTopicAuthorizedExecutionPlan,
  FaceTopicExecutionPlan,
} from './execution.js';
import {
  assertFaceTopicAuthorizedExecutionPlan,
} from './execution.js';
import {
  buildFaceProductProjection,
  type FaceProductProjectionV1,
} from './projection.js';
import {
  buildFaceReaderDelivery,
  type FaceReaderDeliveryV1,
} from './reader.js';
import {
  admitFaceTopicExecutionResult,
  FACE_TOPIC_EXECUTION_RESULT_RECEIPT_SCHEMA_VERSION,
  type FaceTopicAdmittedExecutionResultV1,
  type FaceTopicExecutionResultReceiptV1,
} from './result-receipt.js';

export const FACE_ENGINE_PRODUCT_DISPLAY_RECEIPT_SCHEMA_VERSION =
  'face-product-display-fact-receipt-v1' as const;

export const FACE_ENGINE_PRODUCT_DISPLAY_AUTHORITY_REF =
  'face-engine.fr293.product-display-facts@1' as const;

export const FACE_ENGINE_FR293_SOURCE_CONTRACT_VERSION =
  'FR293-CANONICAL-RGB-SELFIE-MORPHOLOGY-v1' as const;

export const FACE_ENGINE_FR293_AUTHORITY_STATE =
  'product_facing_complete_fr282_schema_no_traditional_semantics' as const;

type FaceEngineDisplayUnitV1 =
  | 'ratio'
  | 'degree'
  | 'radian';

interface FaceEngineDisplayScalarValueV1 {
  readonly kind: 'scalar';
  readonly value: number;
  readonly unit: FaceEngineDisplayUnitV1;
}

interface FaceEngineDisplayAxisV1 {
  readonly axisKey: string;
  readonly value: number;
  readonly unit: FaceEngineDisplayUnitV1;
  readonly sourceMetricRef: string;
}

interface FaceEngineDisplayAxesValueV1 {
  readonly kind:
    | 'continuous_axes'
    | 'composite_continuous_axes'
    | 'composite_visible_nasal_geometry'
    | 'composite_geometry';
  readonly axes: readonly FaceEngineDisplayAxisV1[];
}

type FaceEngineDisplayValueV1 =
  | FaceEngineDisplayScalarValueV1
  | FaceEngineDisplayAxesValueV1;

interface FaceEngineDisplayQualityV1 {
  readonly dependency: string;
  readonly viewpointSensitivity: string;
  readonly evidenceRefs: readonly string[];
  readonly poseAcceptanceThresholdIssued: false;
  readonly correctionApplied: false;
  readonly currentCapturePoseAdjudication: 'not_issued';
}

interface FaceEngineDisplayFactBaseV1 {
  readonly featureKey: string;
  readonly observationRef: string;
  readonly regionKey: string;
  readonly sourceMetricRefs: readonly string[];
  readonly quality: FaceEngineDisplayQualityV1;
  readonly providerLandmarkIndicesExposed: false;
  readonly rawLandmarksExposed: false;
  readonly sourceObservationRefsExposed: false;
  readonly sourceCanonicalAssetDigestExposed: false;
  readonly traditionalBindingApplied: false;
  readonly classificationApplied: false;
  readonly thresholdApplied: false;
}

interface FaceEngineAvailableDisplayFactV1
  extends FaceEngineDisplayFactBaseV1 {
  readonly status: 'available';
  readonly value: FaceEngineDisplayValueV1;
}

interface FaceEngineUnavailableDisplayFactV1
  extends FaceEngineDisplayFactBaseV1 {
  readonly status: 'unavailable';
  readonly reason:
    | 'source_feature_unavailable'
    | 'product_display_value_not_persistable';
  readonly sourceReason: string;
  readonly fallbackInvented: false;
}

type FaceEngineDisplayFactV1 =
  | FaceEngineAvailableDisplayFactV1
  | FaceEngineUnavailableDisplayFactV1;

export interface FaceEngineProductDisplayReceiptV1 {
  readonly schemaVersion:
    typeof FACE_ENGINE_PRODUCT_DISPLAY_RECEIPT_SCHEMA_VERSION;
  readonly authorityRef:
    typeof FACE_ENGINE_PRODUCT_DISPLAY_AUTHORITY_REF;
  readonly observationArtifactRef: string;
  readonly sourceContractVersion:
    typeof FACE_ENGINE_FR293_SOURCE_CONTRACT_VERSION;
  readonly authorityState:
    typeof FACE_ENGINE_FR293_AUTHORITY_STATE;
  readonly facts: readonly FaceEngineDisplayFactV1[];
  readonly coverage: Readonly<{
    representedFeatureCount: 29;
    canonicalExtractorMaterializedCount: 18;
    extractorOrAuthorityGapCount: 11;
    availableDisplayFactCount: number;
    unavailableDisplayFactCount: number;
  }>;
  readonly provenance: Readonly<{
    sourceProviderRunRefExposed: false;
    sourceCanonicalAssetDigestExposed: false;
    sourceObservationRefsExposed: false;
    providerLandmarkIndicesExposed: false;
    rawLandmarksExposed: false;
  }>;
  readonly authorityBoundary: Readonly<{
    neutralObservationOnly: true;
    rawImageExposed: false;
    rawLandmarksExposed: false;
    providerLandmarkIndicesExposed: false;
    sourceObservationRefsExposed: false;
    sourceCanonicalAssetDigestExposed: false;
    identityRecognitionApplied: false;
    biometricTemplateCreated: false;
    traditionalInterpretationIncluded: false;
    traditionalBindingIssued: false;
    classifierIssued: false;
    thresholdIssued: false;
    commerceActivated: false;
  }>;
}

export interface FaceLiveReaderPipelineV1 {
  readonly executionResult:
    FaceTopicAdmittedExecutionResultV1;
  readonly projection: FaceProductProjectionV1;
  readonly displayFacts: ReturnType<
    typeof admitFaceDisplayFacts
  >;
  readonly readerDelivery: FaceReaderDeliveryV1;
}

type UnknownRecord = Readonly<Record<string, unknown>>;

const RECEIPT_KEYS = new Set([
  'schemaVersion',
  'authorityRef',
  'observationArtifactRef',
  'sourceContractVersion',
  'authorityState',
  'facts',
  'coverage',
  'provenance',
  'authorityBoundary',
]);

const FACT_BASE_KEYS = [
  'featureKey',
  'observationRef',
  'regionKey',
  'sourceMetricRefs',
  'quality',
  'providerLandmarkIndicesExposed',
  'rawLandmarksExposed',
  'sourceObservationRefsExposed',
  'sourceCanonicalAssetDigestExposed',
  'traditionalBindingApplied',
  'classificationApplied',
  'thresholdApplied',
] as const;

const QUALITY_KEYS = new Set([
  'dependency',
  'viewpointSensitivity',
  'evidenceRefs',
  'poseAcceptanceThresholdIssued',
  'correctionApplied',
  'currentCapturePoseAdjudication',
]);

const COVERAGE_KEYS = new Set([
  'representedFeatureCount',
  'canonicalExtractorMaterializedCount',
  'extractorOrAuthorityGapCount',
  'availableDisplayFactCount',
  'unavailableDisplayFactCount',
]);

const PROVENANCE_KEYS = new Set([
  'sourceProviderRunRefExposed',
  'sourceCanonicalAssetDigestExposed',
  'sourceObservationRefsExposed',
  'providerLandmarkIndicesExposed',
  'rawLandmarksExposed',
]);

const AUTHORITY_KEYS = new Set([
  'neutralObservationOnly',
  'rawImageExposed',
  'rawLandmarksExposed',
  'providerLandmarkIndicesExposed',
  'sourceObservationRefsExposed',
  'sourceCanonicalAssetDigestExposed',
  'identityRecognitionApplied',
  'biometricTemplateCreated',
  'traditionalInterpretationIncluded',
  'traditionalBindingIssued',
  'classifierIssued',
  'thresholdIssued',
  'commerceActivated',
]);

const FORBIDDEN_KEY_FRAGMENTS = Object.freeze([
  'rawimage',
  'rawphoto',
  'rawjpeg',
  'rawlandmark',
  'landmarkindex',
  'mediapipe',
  'posematrix',
  'faceembedding',
  'identitytemplate',
  'canonicalassetdigest',
  'highresolutioncrop',
  'hirescrop',
  'characterid',
  'relationshipstate',
  'price',
  'offer',
  'entitlement',
  'payment',
]);

function fail(code: string): never {
  throw new Error(code);
}

function asRecord(
  value: unknown,
  code: string,
): UnknownRecord {
  if (
    value === null ||
    typeof value !== 'object' ||
    Array.isArray(value)
  ) {
    fail(code);
  }
  return value as UnknownRecord;
}

function assertExactKeys(
  value: UnknownRecord,
  allowed: ReadonlySet<string>,
  code: string,
): void {
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) {
      fail(`${code}:${key}`);
    }
  }
}

function assertNoForbiddenPayload(
  value: unknown,
): void {
  if (Array.isArray(value)) {
    for (const child of value) {
      assertNoForbiddenPayload(child);
    }
    return;
  }
  if (
    value === null ||
    typeof value !== 'object'
  ) {
    return;
  }

  for (const [key, child] of Object.entries(value)) {
    const normalized = key
      .toLowerCase()
      .replace(/[^a-z0-9]/gu, '');
    if (
      FORBIDDEN_KEY_FRAGMENTS.some((fragment) =>
        normalized.includes(fragment),
      )
    ) {
      if (
        key === 'rawImageExposed' ||
        key === 'rawLandmarksExposed' ||
        key === 'providerLandmarkIndicesExposed' ||
        key === 'sourceCanonicalAssetDigestExposed'
      ) {
        if (child !== false) {
          fail(
            `FACE_LIVE_FR293_FORBIDDEN_PAYLOAD:${key}`,
          );
        }
      } else {
        fail(
          `FACE_LIVE_FR293_FORBIDDEN_PAYLOAD:${key}`,
        );
      }
    }
    assertNoForbiddenPayload(child);
  }
}

function stringField(
  record: UnknownRecord,
  key: string,
  code: string,
): string {
  const value = record[key];
  if (
    typeof value !== 'string' ||
    value.trim().length === 0
  ) {
    fail(code);
  }
  return value;
}

function finiteNumber(
  value: unknown,
  code: string,
): number {
  if (
    typeof value !== 'number' ||
    !Number.isFinite(value)
  ) {
    fail(code);
  }
  return value;
}

function stringArray(
  value: unknown,
  code: string,
): readonly string[] {
  if (
    !Array.isArray(value) ||
    value.some(
      (entry) =>
        typeof entry !== 'string' ||
        entry.trim().length === 0,
    )
  ) {
    fail(code);
  }
  return Object.freeze([
    ...new Set(value as string[]),
  ].sort());
}

function falseField(
  record: UnknownRecord,
  key: string,
  code: string,
): false {
  if (record[key] !== false) {
    fail(code);
  }
  return false;
}

function parseUnit(
  value: unknown,
): FaceEngineDisplayUnitV1 {
  if (
    value !== 'ratio' &&
    value !== 'degree' &&
    value !== 'radian'
  ) {
    fail('FACE_LIVE_FR293_DISPLAY_UNIT_INVALID');
  }
  return value;
}

function parseValue(
  value: unknown,
): FaceEngineDisplayValueV1 {
  const record = asRecord(
    value,
    'FACE_LIVE_FR293_DISPLAY_VALUE_INVALID',
  );
  const kind = stringField(
    record,
    'kind',
    'FACE_LIVE_FR293_DISPLAY_VALUE_KIND_MISSING',
  );

  if (kind === 'scalar') {
    assertExactKeys(
      record,
      new Set(['kind', 'value', 'unit']),
      'FACE_LIVE_FR293_SCALAR_SCOPE_VIOLATION',
    );
    return Object.freeze({
      kind: 'scalar' as const,
      value: finiteNumber(
        record.value,
        'FACE_LIVE_FR293_SCALAR_VALUE_INVALID',
      ),
      unit: parseUnit(record.unit),
    });
  }

  if (
    kind !== 'continuous_axes' &&
    kind !== 'composite_continuous_axes' &&
    kind !== 'composite_visible_nasal_geometry' &&
    kind !== 'composite_geometry'
  ) {
    fail('FACE_LIVE_FR293_DISPLAY_VALUE_KIND_INVALID');
  }
  assertExactKeys(
    record,
    new Set(['kind', 'axes']),
    'FACE_LIVE_FR293_AXES_SCOPE_VIOLATION',
  );
  if (
    !Array.isArray(record.axes) ||
    record.axes.length === 0
  ) {
    fail('FACE_LIVE_FR293_AXES_EMPTY');
  }

  const axes = Object.freeze(
    record.axes
      .map((axisValue) => {
        const axis = asRecord(
          axisValue,
          'FACE_LIVE_FR293_AXIS_INVALID',
        );
        assertExactKeys(
          axis,
          new Set([
            'axisKey',
            'value',
            'unit',
            'sourceMetricRef',
          ]),
          'FACE_LIVE_FR293_AXIS_SCOPE_VIOLATION',
        );
        return Object.freeze({
          axisKey: stringField(
            axis,
            'axisKey',
            'FACE_LIVE_FR293_AXIS_KEY_MISSING',
          ),
          value: finiteNumber(
            axis.value,
            'FACE_LIVE_FR293_AXIS_VALUE_INVALID',
          ),
          unit: parseUnit(axis.unit),
          sourceMetricRef: stringField(
            axis,
            'sourceMetricRef',
            'FACE_LIVE_FR293_AXIS_SOURCE_MISSING',
          ),
        });
      })
      .sort((left, right) =>
        left.axisKey.localeCompare(right.axisKey),
      ),
  );
  if (
    new Set(axes.map((axis) => axis.axisKey)).size !==
    axes.length
  ) {
    fail('FACE_LIVE_FR293_DUPLICATE_AXIS_KEY');
  }

  return Object.freeze({
    kind,
    axes,
  });
}

function parseQuality(
  value: unknown,
): FaceEngineDisplayQualityV1 {
  const record = asRecord(
    value,
    'FACE_LIVE_FR293_QUALITY_INVALID',
  );
  assertExactKeys(
    record,
    QUALITY_KEYS,
    'FACE_LIVE_FR293_QUALITY_SCOPE_VIOLATION',
  );
  if (
    record.poseAcceptanceThresholdIssued !== false ||
    record.correctionApplied !== false ||
    record.currentCapturePoseAdjudication !== 'not_issued'
  ) {
    fail('FACE_LIVE_FR293_QUALITY_AUTHORITY_WIDENED');
  }
  return Object.freeze({
    dependency: stringField(
      record,
      'dependency',
      'FACE_LIVE_FR293_QUALITY_DEPENDENCY_MISSING',
    ),
    viewpointSensitivity: stringField(
      record,
      'viewpointSensitivity',
      'FACE_LIVE_FR293_QUALITY_VIEWPOINT_MISSING',
    ),
    evidenceRefs: stringArray(
      record.evidenceRefs,
      'FACE_LIVE_FR293_QUALITY_EVIDENCE_INVALID',
    ),
    poseAcceptanceThresholdIssued: false,
    correctionApplied: false,
    currentCapturePoseAdjudication: 'not_issued',
  });
}

function parseFact(
  value: unknown,
): FaceEngineDisplayFactV1 {
  const record = asRecord(
    value,
    'FACE_LIVE_FR293_FACT_INVALID',
  );
  const status = stringField(
    record,
    'status',
    'FACE_LIVE_FR293_FACT_STATUS_MISSING',
  );
  const allowed = new Set<string>([
    ...FACT_BASE_KEYS,
    'status',
    ...(status === 'available'
      ? ['value']
      : ['reason', 'sourceReason', 'fallbackInvented']),
  ]);
  assertExactKeys(
    record,
    allowed,
    'FACE_LIVE_FR293_FACT_SCOPE_VIOLATION',
  );

  const base: FaceEngineDisplayFactBaseV1 = {
    featureKey: stringField(
      record,
      'featureKey',
      'FACE_LIVE_FR293_FEATURE_KEY_MISSING',
    ),
    observationRef: stringField(
      record,
      'observationRef',
      'FACE_LIVE_FR293_OBSERVATION_REF_MISSING',
    ),
    regionKey: stringField(
      record,
      'regionKey',
      'FACE_LIVE_FR293_REGION_KEY_MISSING',
    ),
    sourceMetricRefs: stringArray(
      record.sourceMetricRefs,
      'FACE_LIVE_FR293_SOURCE_METRICS_INVALID',
    ),
    quality: parseQuality(record.quality),
    providerLandmarkIndicesExposed: falseField(
      record,
      'providerLandmarkIndicesExposed',
      'FACE_LIVE_FR293_PROVIDER_LANDMARKS_EXPOSED',
    ),
    rawLandmarksExposed: falseField(
      record,
      'rawLandmarksExposed',
      'FACE_LIVE_FR293_RAW_LANDMARKS_EXPOSED',
    ),
    sourceObservationRefsExposed: falseField(
      record,
      'sourceObservationRefsExposed',
      'FACE_LIVE_FR293_SOURCE_OBSERVATIONS_EXPOSED',
    ),
    sourceCanonicalAssetDigestExposed: falseField(
      record,
      'sourceCanonicalAssetDigestExposed',
      'FACE_LIVE_FR293_CANONICAL_DIGEST_EXPOSED',
    ),
    traditionalBindingApplied: falseField(
      record,
      'traditionalBindingApplied',
      'FACE_LIVE_FR293_TRADITIONAL_BINDING_APPLIED',
    ),
    classificationApplied: falseField(
      record,
      'classificationApplied',
      'FACE_LIVE_FR293_CLASSIFICATION_APPLIED',
    ),
    thresholdApplied: falseField(
      record,
      'thresholdApplied',
      'FACE_LIVE_FR293_THRESHOLD_APPLIED',
    ),
  };

  if (status === 'available') {
    return Object.freeze({
      ...base,
      status: 'available' as const,
      value: parseValue(record.value),
    });
  }

  if (status !== 'unavailable') {
    fail('FACE_LIVE_FR293_FACT_STATUS_INVALID');
  }
  if (record.fallbackInvented !== false) {
    fail('FACE_LIVE_FR293_FALLBACK_INVENTED');
  }
  const reason = record.reason;
  if (
    reason !== 'source_feature_unavailable' &&
    reason !== 'product_display_value_not_persistable'
  ) {
    fail('FACE_LIVE_FR293_UNAVAILABLE_REASON_INVALID');
  }

  return Object.freeze({
    ...base,
    status: 'unavailable' as const,
    reason,
    sourceReason: stringField(
      record,
      'sourceReason',
      'FACE_LIVE_FR293_SOURCE_REASON_MISSING',
    ),
    fallbackInvented: false as const,
  });
}

function expectedObservationRef(
  observationArtifactRef: string,
  featureKey: string,
): string {
  return [
    'face-neutral-observation:v1',
    encodeURIComponent(observationArtifactRef),
    encodeURIComponent(featureKey),
  ].join(':');
}

function parseFaceEngineReceipt(
  value: unknown,
): FaceEngineProductDisplayReceiptV1 {
  assertNoForbiddenPayload(value);
  const receipt = asRecord(
    value,
    'FACE_LIVE_FR293_RECEIPT_INVALID',
  );
  assertExactKeys(
    receipt,
    RECEIPT_KEYS,
    'FACE_LIVE_FR293_RECEIPT_SCOPE_VIOLATION',
  );

  if (
    receipt.schemaVersion !==
      FACE_ENGINE_PRODUCT_DISPLAY_RECEIPT_SCHEMA_VERSION ||
    receipt.authorityRef !==
      FACE_ENGINE_PRODUCT_DISPLAY_AUTHORITY_REF ||
    receipt.sourceContractVersion !==
      FACE_ENGINE_FR293_SOURCE_CONTRACT_VERSION ||
    receipt.authorityState !==
      FACE_ENGINE_FR293_AUTHORITY_STATE
  ) {
    fail('FACE_LIVE_FR293_AUTHORITY_IDENTITY_MISMATCH');
  }

  const observationArtifactRef = stringField(
    receipt,
    'observationArtifactRef',
    'FACE_LIVE_FR293_OBSERVATION_ARTIFACT_REF_MISSING',
  );

  if (!Array.isArray(receipt.facts)) {
    fail('FACE_LIVE_FR293_FACTS_INVALID');
  }
  const facts = Object.freeze(
    receipt.facts.map(parseFact),
  );
  if (
    facts.length !== 29 ||
    new Set(facts.map((fact) => fact.featureKey)).size !== 29 ||
    new Set(facts.map((fact) => fact.observationRef)).size !== 29
  ) {
    fail('FACE_LIVE_FR293_FEATURE_COVERAGE_INVALID');
  }
  for (const fact of facts) {
    if (
      fact.observationRef !==
      expectedObservationRef(
        observationArtifactRef,
        fact.featureKey,
      )
    ) {
      fail(
        `FACE_LIVE_FR293_OBSERVATION_REF_MISMATCH:${fact.featureKey}`,
      );
    }
  }

  const coverage = asRecord(
    receipt.coverage,
    'FACE_LIVE_FR293_COVERAGE_INVALID',
  );
  assertExactKeys(
    coverage,
    COVERAGE_KEYS,
    'FACE_LIVE_FR293_COVERAGE_SCOPE_VIOLATION',
  );
  const availableCount = facts.filter(
    (fact) => fact.status === 'available',
  ).length;
  if (
    coverage.representedFeatureCount !== 29 ||
    coverage.canonicalExtractorMaterializedCount !== 18 ||
    coverage.extractorOrAuthorityGapCount !== 11 ||
    coverage.availableDisplayFactCount !== availableCount ||
    coverage.unavailableDisplayFactCount !== 29 - availableCount
  ) {
    fail('FACE_LIVE_FR293_COVERAGE_MISMATCH');
  }

  const provenance = asRecord(
    receipt.provenance,
    'FACE_LIVE_FR293_PROVENANCE_INVALID',
  );
  assertExactKeys(
    provenance,
    PROVENANCE_KEYS,
    'FACE_LIVE_FR293_PROVENANCE_SCOPE_VIOLATION',
  );
  if (
    Object.values(provenance).some(
      (entry) => entry !== false,
    )
  ) {
    fail('FACE_LIVE_FR293_PROVENANCE_EXPOSURE_REJECTED');
  }

  const authorityBoundary = asRecord(
    receipt.authorityBoundary,
    'FACE_LIVE_FR293_AUTHORITY_BOUNDARY_INVALID',
  );
  assertExactKeys(
    authorityBoundary,
    AUTHORITY_KEYS,
    'FACE_LIVE_FR293_AUTHORITY_SCOPE_VIOLATION',
  );
  if (
    authorityBoundary.neutralObservationOnly !== true ||
    Object.entries(authorityBoundary)
      .filter(([key]) => key !== 'neutralObservationOnly')
      .some(([, entry]) => entry !== false)
  ) {
    fail('FACE_LIVE_FR293_AUTHORITY_WIDENED');
  }

  return Object.freeze({
    schemaVersion:
      FACE_ENGINE_PRODUCT_DISPLAY_RECEIPT_SCHEMA_VERSION,
    authorityRef:
      FACE_ENGINE_PRODUCT_DISPLAY_AUTHORITY_REF,
    observationArtifactRef,
    sourceContractVersion:
      FACE_ENGINE_FR293_SOURCE_CONTRACT_VERSION,
    authorityState:
      FACE_ENGINE_FR293_AUTHORITY_STATE,
    facts,
    coverage: Object.freeze({
      representedFeatureCount: 29 as const,
      canonicalExtractorMaterializedCount: 18 as const,
      extractorOrAuthorityGapCount: 11 as const,
      availableDisplayFactCount: availableCount,
      unavailableDisplayFactCount: 29 - availableCount,
    }),
    provenance: Object.freeze({
      sourceProviderRunRefExposed: false as const,
      sourceCanonicalAssetDigestExposed: false as const,
      sourceObservationRefsExposed: false as const,
      providerLandmarkIndicesExposed: false as const,
      rawLandmarksExposed: false as const,
    }),
    authorityBoundary: Object.freeze({
      neutralObservationOnly: true as const,
      rawImageExposed: false as const,
      rawLandmarksExposed: false as const,
      providerLandmarkIndicesExposed: false as const,
      sourceObservationRefsExposed: false as const,
      sourceCanonicalAssetDigestExposed: false as const,
      identityRecognitionApplied: false as const,
      biometricTemplateCreated: false as const,
      traditionalInterpretationIncluded: false as const,
      traditionalBindingIssued: false as const,
      classifierIssued: false as const,
      thresholdIssued: false as const,
      commerceActivated: false as const,
    }),
  });
}

function assertNeutralPlan(
  plan: FaceTopicExecutionPlan,
): asserts plan is FaceTopicAuthorizedExecutionPlan {
  if (!plan.authorized) {
    fail('FACE_LIVE_FR293_BLOCKED_PLAN_REJECTED');
  }
  assertFaceTopicAuthorizedExecutionPlan(plan);
  if (
    plan.executionKind !==
    'neutral_observation_projection'
  ) {
    fail('FACE_LIVE_FR293_TRADITIONAL_PLAN_REJECTED');
  }
}

function topicCapabilities(
  plan: FaceTopicAuthorizedExecutionPlan,
): ReadonlySet<string> {
  return new Set([
    ...plan.requiredObservationCapabilities,
    ...plan.optionalObservationCapabilities,
  ]);
}

function factByCapability(
  receipt: FaceEngineProductDisplayReceiptV1,
): ReadonlyMap<string, FaceEngineDisplayFactV1> {
  return new Map(
    receipt.facts.map((fact) => [
      fact.featureKey,
      fact,
    ]),
  );
}

function assertPlanReceiptBinding(
  plan: FaceTopicAuthorizedExecutionPlan,
  receipt: FaceEngineProductDisplayReceiptV1,
): void {
  if (
    receipt.observationArtifactRef !==
    plan.observationArtifactRef
  ) {
    fail(
      'FACE_LIVE_FR293_OBSERVATION_ARTIFACT_MISMATCH',
    );
  }

  const byCapability = factByCapability(receipt);
  for (const capability of topicCapabilities(plan)) {
    if (!byCapability.has(capability)) {
      fail(
        `FACE_LIVE_FR293_TOPIC_FACT_MISSING:${capability}`,
      );
    }
  }

  for (
    const capability
    of plan.requiredObservationCapabilities
  ) {
    const fact = byCapability.get(capability);
    if (fact?.status !== 'available') {
      fail(
        `FACE_LIVE_FR293_REQUIRED_FACT_UNAVAILABLE:${capability}`,
      );
    }
  }

  for (
    const unavailable
    of plan.unavailableOptionalRequirements
  ) {
    if (!unavailable.startsWith('observation:')) {
      continue;
    }
    const capability = unavailable.slice(
      'observation:'.length,
    );
    const fact = byCapability.get(capability);
    if (fact?.status === 'available') {
      fail(
        `FACE_LIVE_FR293_CONTRADICTS_PLAN_UNAVAILABLE:${capability}`,
      );
    }
  }
}

function provenanceRefs(
  receipt: FaceEngineProductDisplayReceiptV1,
  fact: FaceEngineDisplayFactV1,
): readonly string[] {
  return Object.freeze([
    ...new Set([
      receipt.authorityRef,
      receipt.sourceContractVersion,
      ...fact.sourceMetricRefs,
      ...fact.quality.evidenceRefs,
    ]),
  ].sort());
}

export function adaptFaceEngineReceiptToExecutionResult(
  plan: FaceTopicExecutionPlan,
  input: unknown,
): FaceTopicExecutionResultReceiptV1 {
  assertNeutralPlan(plan);
  const receipt = parseFaceEngineReceipt(input);
  assertPlanReceiptBinding(plan, receipt);

  const allowed = topicCapabilities(plan);
  const unavailable = new Set(
    plan.unavailableOptionalRequirements,
  );
  const observations = Object.freeze(
    receipt.facts
      .filter(
        (
          fact,
        ): fact is FaceEngineAvailableDisplayFactV1 =>
          fact.status === 'available' &&
          allowed.has(fact.featureKey) &&
          !unavailable.has(
            `observation:${fact.featureKey}`,
          ),
      )
      .map((fact) =>
        Object.freeze({
          kind: 'neutral_observation' as const,
          capabilityKey: fact.featureKey,
          observationRef: fact.observationRef,
          qualifiers: Object.freeze([]),
          provenanceRefs: provenanceRefs(
            receipt,
            fact,
          ),
        }),
      )
      .sort((left, right) =>
        left.observationRef.localeCompare(
          right.observationRef,
        ),
      ),
  );

  const byCapability = factByCapability(receipt);
  const sourceUnavailable = [
    ...allowed,
  ]
    .filter((capability) => {
      const fact = byCapability.get(capability);
      return fact?.status === 'unavailable';
    })
    .map(
      (capability) =>
        `observation:${capability}`,
    );

  return Object.freeze({
    schemaVersion:
      FACE_TOPIC_EXECUTION_RESULT_RECEIPT_SCHEMA_VERSION,
    executionPlanHash: plan.executionPlanHash,
    requestId: plan.requestId,
    authoritySnapshotId: plan.authoritySnapshotId,
    observationArtifactRef:
      plan.observationArtifactRef,
    executionKind: plan.executionKind,
    faceEngineVersion:
      receipt.sourceContractVersion,
    methodologyPackRefs: Object.freeze([]),
    bindingGroupRefs: Object.freeze([]),
    observations,
    semanticClaims: Object.freeze([]),
    approvedNarrativeBlocks: Object.freeze([]),
    unavailableSections: Object.freeze([
      ...new Set([
        ...plan.unavailableOptionalRequirements,
        ...sourceUnavailable,
      ]),
    ].sort()),
    prohibitedInferences: Object.freeze([
      ...plan.prohibitedInferenceKeys,
    ]),
    provenanceRefs: Object.freeze([
      receipt.authorityRef,
      receipt.sourceContractVersion,
    ]),
  });
}

function toProductDisplayValue(
  value: FaceEngineDisplayValueV1,
  capabilityKey: string,
): FaceDisplayValueV1 {
  if (value.kind === 'scalar') {
    return Object.freeze({
      kind: 'scalar' as const,
      value: value.value,
      unit: value.unit,
    });
  }

  if (
    value.kind !== 'continuous_axes' &&
    value.kind !==
      'composite_visible_nasal_geometry'
  ) {
    fail(
      `FACE_LIVE_FR293_READER_VALUE_KIND_UNSUPPORTED:${capabilityKey}:${value.kind}`,
    );
  }

  return Object.freeze({
    kind: value.kind,
    axes: Object.freeze(
      value.axes.map((axis) =>
        Object.freeze({
          axisKey: axis.axisKey,
          value: axis.value,
          unit: axis.unit,
          sourceMetricRef:
            axis.sourceMetricRef,
        }),
      ),
    ),
  });
}

export function adaptFaceEngineReceiptToDisplayFacts(
  projection: FaceProductProjectionV1,
  input: unknown,
): FaceDisplayFactReceiptV1 {
  const receipt = parseFaceEngineReceipt(input);
  const selected = new Set(
    projection.selectedObservationRefs,
  );
  const groundingByObservation = new Map(
    projection.grounding.observationUnits.map(
      (unit) => [unit.observationRef, unit],
    ),
  );

  const facts = Object.freeze(
    receipt.facts
      .filter(
        (
          fact,
        ): fact is FaceEngineAvailableDisplayFactV1 =>
          fact.status === 'available' &&
          selected.has(fact.observationRef),
      )
      .map(
        (
          fact,
        ): FaceObservationDisplayFactV1 => {
          const grounding =
            groundingByObservation.get(
              fact.observationRef,
            );
          if (grounding === undefined) {
            fail(
              `FACE_LIVE_FR293_GROUNDING_BINDING_MISSING:${fact.observationRef}`,
            );
          }
          if (
            grounding.capabilityKey !==
            fact.featureKey
          ) {
            fail(
              `FACE_LIVE_FR293_GROUNDING_CAPABILITY_MISMATCH:${fact.featureKey}`,
            );
          }

          return Object.freeze({
            factRef:
              `face-display-fact:v1:${encodeURIComponent(fact.observationRef)}`,
            observationRef:
              fact.observationRef,
            capabilityKey:
              fact.featureKey,
            value: toProductDisplayValue(
              fact.value,
              fact.featureKey,
            ),
            qualifiers: Object.freeze([]),
            provenanceRefs: provenanceRefs(
              receipt,
              fact,
            ),
            traditionalBindingApplied:
              false as const,
            classificationApplied:
              false as const,
            thresholdApplied: false as const,
          });
        },
      )
      .sort((left, right) =>
        left.factRef.localeCompare(
          right.factRef,
        ),
      ),
  );

  return Object.freeze({
    schemaVersion:
      FACE_DISPLAY_FACT_RECEIPT_SCHEMA_VERSION,
    sourceResultHash:
      projection.sourceResultHash,
    authorityRef: receipt.authorityRef,
    facts,
    provenanceRefs: Object.freeze([
      receipt.authorityRef,
      receipt.sourceContractVersion,
    ]),
  });
}

export function buildFaceLiveReaderPipeline(
  plan: FaceTopicExecutionPlan,
  input: unknown,
): FaceLiveReaderPipelineV1 {
  assertNeutralPlan(plan);

  const resultReceipt =
    adaptFaceEngineReceiptToExecutionResult(
      plan,
      input,
    );
  const executionResult =
    admitFaceTopicExecutionResult(
      plan,
      resultReceipt,
    );
  const projection =
    buildFaceProductProjection(
      plan,
      executionResult,
    );
  const displayReceipt =
    adaptFaceEngineReceiptToDisplayFacts(
      projection,
      input,
    );
  const displayFacts =
    admitFaceDisplayFacts(
      projection,
      displayReceipt,
    );
  const readerDelivery =
    buildFaceReaderDelivery(
      projection,
      displayFacts,
    );

  return Object.freeze({
    executionResult,
    projection,
    displayFacts,
    readerDelivery,
  });
}
