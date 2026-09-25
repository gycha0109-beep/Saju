import {
  FR293_CANONICAL_MORPHOLOGY_CONTRACT_VERSION,
  assertCanonicalRgbSelfieMorphologyPayloadFR293,
  type FR293CanonicalRgbSelfieMorphologyPayload,
} from './canonical-rgb-selfie-morphology-fr293.js';
import {
  FR293_PRODUCT_COLUMN_MAP,
  assertFR293ProductColumnMap,
  type FR293ProductColumn,
} from './rgb-selfie-product-column-map-fr293.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FACE_PRODUCT_DISPLAY_FACT_RECEIPT_VERSION =
  'face-product-display-fact-receipt-v1' as const;

export const FACE_PRODUCT_DISPLAY_FACT_AUTHORITY_REF =
  'face-engine.fr293.product-display-facts@1' as const;

export type FaceProductDisplayUnit =
  | 'ratio'
  | 'degree'
  | 'radian';

export interface FaceProductDisplayScalarValue {
  readonly kind: 'scalar';
  readonly value: number;
  readonly unit: FaceProductDisplayUnit;
}

export interface FaceProductDisplayAxis {
  readonly axisKey: string;
  readonly value: number;
  readonly unit: FaceProductDisplayUnit;
  readonly sourceMetricRef: string;
}

export interface FaceProductDisplayAxesValue {
  readonly kind:
    | 'continuous_axes'
    | 'composite_continuous_axes'
    | 'composite_visible_nasal_geometry'
    | 'composite_geometry';
  readonly axes: readonly FaceProductDisplayAxis[];
}

export type FaceProductDisplayValue =
  | FaceProductDisplayScalarValue
  | FaceProductDisplayAxesValue;

export interface FaceProductDisplayQuality {
  readonly dependency: string;
  readonly viewpointSensitivity: string;
  readonly evidenceRefs: readonly string[];
  readonly poseAcceptanceThresholdIssued: false;
  readonly correctionApplied: false;
  readonly currentCapturePoseAdjudication: 'not_issued';
}

interface FaceProductDisplayFactBase {
  readonly featureKey: FR293ProductColumn['featureKey'];
  readonly observationRef: string;
  readonly regionKey: string;
  readonly sourceMetricRefs: readonly string[];
  readonly quality: FaceProductDisplayQuality;
  readonly providerLandmarkIndicesExposed: false;
  readonly rawLandmarksExposed: false;
  readonly sourceObservationRefsExposed: false;
  readonly sourceCanonicalAssetDigestExposed: false;
  readonly traditionalBindingApplied: false;
  readonly classificationApplied: false;
  readonly thresholdApplied: false;
}

export interface FaceProductAvailableDisplayFact
  extends FaceProductDisplayFactBase {
  readonly status: 'available';
  readonly value: FaceProductDisplayValue;
}

export interface FaceProductUnavailableDisplayFact
  extends FaceProductDisplayFactBase {
  readonly status: 'unavailable';
  readonly reason:
    | 'source_feature_unavailable'
    | 'product_display_value_not_persistable';
  readonly sourceReason: string;
  readonly fallbackInvented: false;
}

export type FaceProductDisplayFact =
  | FaceProductAvailableDisplayFact
  | FaceProductUnavailableDisplayFact;

export interface FaceProductDisplayFactReceipt {
  readonly schemaVersion:
    typeof FACE_PRODUCT_DISPLAY_FACT_RECEIPT_VERSION;
  readonly authorityRef:
    typeof FACE_PRODUCT_DISPLAY_FACT_AUTHORITY_REF;
  readonly observationArtifactRef: string;
  readonly sourceContractVersion:
    typeof FR293_CANONICAL_MORPHOLOGY_CONTRACT_VERSION;
  readonly authorityState:
    'product_facing_complete_fr282_schema_no_traditional_semantics';
  readonly facts: readonly FaceProductDisplayFact[];
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

type UnknownRecord = Readonly<Record<string, unknown>>;

function fail(message: string): never {
  throw new FaceAuthorityValidationError(
    `FACE-PRODUCT-DISPLAY ${message}`,
  );
}

function asRecord(
  value: unknown,
  label: string,
): UnknownRecord {
  if (
    value === null ||
    typeof value !== 'object' ||
    Array.isArray(value)
  ) {
    fail(`${label} must be an object.`);
  }
  return value as UnknownRecord;
}

function stringField(
  record: UnknownRecord,
  key: string,
  label: string,
): string {
  const value = record[key];
  if (typeof value !== 'string' || value.length === 0) {
    fail(`${label}.${key} must be a non-empty string.`);
  }
  return value;
}

function finiteField(
  record: UnknownRecord,
  key: string,
  label: string,
): number {
  const value = record[key];
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    fail(`${label}.${key} must be finite.`);
  }
  return value;
}

function displayUnit(
  value: unknown,
  label: string,
): FaceProductDisplayUnit {
  if (
    value !== 'ratio' &&
    value !== 'degree' &&
    value !== 'radian'
  ) {
    fail(`${label} unit is not Product-display-safe.`);
  }
  return value;
}

function normalizeAxis(
  value: unknown,
  index: number,
): FaceProductDisplayAxis {
  const record = asRecord(
    value,
    `axis[${index}]`,
  );
  const sourceMetricRef =
    typeof record.sourceMetricRef === 'string'
      ? record.sourceMetricRef
      : stringField(
          record,
          'metricRef',
          `axis[${index}]`,
        );
  const axisKey =
    typeof record.axisKey === 'string' &&
    record.axisKey.length > 0
      ? record.axisKey
      : sourceMetricRef;

  return Object.freeze({
    axisKey,
    value: finiteField(
      record,
      'value',
      `axis[${index}]`,
    ),
    unit: displayUnit(
      record.unit,
      `axis[${index}]`,
    ),
    sourceMetricRef,
  });
}

function normalizeDisplayValue(
  value: unknown,
): FaceProductDisplayValue | null {
  const record = asRecord(value, 'feature.value');
  const kind = stringField(
    record,
    'kind',
    'feature.value',
  );

  if (kind === 'canonical_contour_2d') {
    return null;
  }

  if (kind === 'scalar') {
    return Object.freeze({
      kind: 'scalar' as const,
      value: finiteField(
        record,
        'value',
        'feature.value',
      ),
      unit: displayUnit(
        record.unit,
        'feature.value',
      ),
    });
  }

  if (
    kind !== 'continuous_axes' &&
    kind !== 'composite_continuous_axes' &&
    kind !== 'composite_visible_nasal_geometry' &&
    kind !== 'composite_geometry'
  ) {
    fail(`unsupported canonical value kind: ${kind}.`);
  }

  if (!Array.isArray(record.axes) || record.axes.length === 0) {
    fail(`${kind} must contain at least one axis.`);
  }

  const axes = Object.freeze(
    record.axes.map((axis, index) =>
      normalizeAxis(axis, index),
    ),
  );
  if (
    new Set(axes.map((axis) => axis.axisKey)).size !==
    axes.length
  ) {
    fail(`${kind} axis keys must be unique.`);
  }

  return Object.freeze({
    kind,
    axes,
  });
}

function normalizeStringArray(
  value: unknown,
  label: string,
): readonly string[] {
  if (
    !Array.isArray(value) ||
    value.some(
      (entry) =>
        typeof entry !== 'string' ||
        entry.length === 0,
    )
  ) {
    fail(`${label} must contain only non-empty strings.`);
  }
  return Object.freeze(
    [...new Set(value as string[])].sort(),
  );
}

function normalizeQuality(
  value: unknown,
): FaceProductDisplayQuality {
  const record = asRecord(value, 'feature.quality');
  if (
    record.poseAcceptanceThresholdIssued !== false ||
    record.correctionApplied !== false ||
    record.currentCapturePoseAdjudication !== 'not_issued'
  ) {
    fail('feature quality authority widened.');
  }

  return Object.freeze({
    dependency: stringField(
      record,
      'dependency',
      'feature.quality',
    ),
    viewpointSensitivity: stringField(
      record,
      'viewpointSensitivity',
      'feature.quality',
    ),
    evidenceRefs: normalizeStringArray(
      record.evidenceRefs,
      'feature.quality.evidenceRefs',
    ),
    poseAcceptanceThresholdIssued: false,
    correctionApplied: false,
    currentCapturePoseAdjudication: 'not_issued',
  });
}

function assertObservationArtifactRef(
  observationArtifactRef: string,
): void {
  if (
    !observationArtifactRef.startsWith(
      'face-observation-artifact:',
    ) ||
    observationArtifactRef.length <=
      'face-observation-artifact:'.length ||
    /[\s/\\?#]/u.test(observationArtifactRef)
  ) {
    fail(
      'observationArtifactRef must be an opaque face-observation-artifact ref.',
    );
  }
}

function observationRef(
  observationArtifactRef: string,
  featureKey: string,
): string {
  return [
    'face-neutral-observation:v1',
    encodeURIComponent(observationArtifactRef),
    encodeURIComponent(featureKey),
  ].join(':');
}

function baseFact(
  feature: UnknownRecord,
  featureKey: FR293ProductColumn['featureKey'],
  observationArtifactRef: string,
): FaceProductDisplayFactBase {
  if (
    feature.traditionalBindingApplied !== false ||
    feature.classificationApplied !== false ||
    feature.thresholdApplied !== false ||
    feature.providerLandmarkIndicesExposed !== false ||
    feature.rawLandmarksExposed !== false
  ) {
    fail(`canonical authority widened for ${featureKey}.`);
  }

  return {
    featureKey,
    observationRef: observationRef(
      observationArtifactRef,
      featureKey,
    ),
    regionKey: stringField(
      feature,
      'regionKey',
      featureKey,
    ),
    sourceMetricRefs: normalizeStringArray(
      feature.sourceMetricRefs,
      `${featureKey}.sourceMetricRefs`,
    ),
    quality: normalizeQuality(feature.quality),
    providerLandmarkIndicesExposed: false,
    rawLandmarksExposed: false,
    sourceObservationRefsExposed: false,
    sourceCanonicalAssetDigestExposed: false,
    traditionalBindingApplied: false,
    classificationApplied: false,
    thresholdApplied: false,
  };
}

function sourceReason(
  feature: UnknownRecord,
): string {
  return typeof feature.reason === 'string' &&
    feature.reason.length > 0
    ? feature.reason
    : 'canonical_feature_unavailable';
}

function materializeFact(
  featureValue: unknown,
  column: FR293ProductColumn,
  observationArtifactRef: string,
): FaceProductDisplayFact {
  const feature = asRecord(
    featureValue,
    column.featureKey,
  );
  if (feature.featureKey !== column.featureKey) {
    fail(
      `feature key mismatch for ${column.featureKey}.`,
    );
  }

  const base = baseFact(
    feature,
    column.featureKey,
    observationArtifactRef,
  );

  if (feature.status === 'unavailable') {
    return Object.freeze({
      ...base,
      status: 'unavailable' as const,
      reason: 'source_feature_unavailable' as const,
      sourceReason: sourceReason(feature),
      fallbackInvented: false as const,
    });
  }

  if (feature.status !== 'available') {
    fail(
      `canonical feature status invalid: ${column.featureKey}.`,
    );
  }

  if (
    column.implementationState !==
      'canonical_extractor_materialized'
  ) {
    fail(
      `unmaterialized Product column became available: ${column.featureKey}.`,
    );
  }

  const value = normalizeDisplayValue(feature.value);
  if (value === null) {
    return Object.freeze({
      ...base,
      status: 'unavailable' as const,
      reason:
        'product_display_value_not_persistable' as const,
      sourceReason:
        'canonical_contour_2d_persistence_disallowed',
      fallbackInvented: false as const,
    });
  }

  return Object.freeze({
    ...base,
    status: 'available' as const,
    value,
  });
}

export function buildFaceProductDisplayFactReceipt(
  payload: FR293CanonicalRgbSelfieMorphologyPayload,
  observationArtifactRef: string,
): FaceProductDisplayFactReceipt {
  assertCanonicalRgbSelfieMorphologyPayloadFR293(payload);
  assertFR293ProductColumnMap();
  assertObservationArtifactRef(observationArtifactRef);

  const byKey = new Map(
    payload.features.map((feature) => [
      feature.featureKey,
      feature,
    ]),
  );

  const facts = Object.freeze(
    FR293_PRODUCT_COLUMN_MAP.map((column) => {
      const feature = byKey.get(column.featureKey);
      if (feature === undefined) {
        fail(
          `FR293 feature missing: ${column.featureKey}.`,
        );
      }
      return materializeFact(
        feature,
        column,
        observationArtifactRef,
      );
    }),
  );

  if (
    facts.length !== 29 ||
    new Set(facts.map((fact) => fact.featureKey)).size !== 29 ||
    new Set(facts.map((fact) => fact.observationRef)).size !== 29
  ) {
    fail('receipt must bind exactly 29 unique FR282 features.');
  }

  const availableDisplayFactCount = facts.filter(
    (fact) => fact.status === 'available',
  ).length;
  const unavailableDisplayFactCount =
    facts.length - availableDisplayFactCount;

  const receipt: FaceProductDisplayFactReceipt =
    Object.freeze({
      schemaVersion:
        FACE_PRODUCT_DISPLAY_FACT_RECEIPT_VERSION,
      authorityRef:
        FACE_PRODUCT_DISPLAY_FACT_AUTHORITY_REF,
      observationArtifactRef,
      sourceContractVersion:
        FR293_CANONICAL_MORPHOLOGY_CONTRACT_VERSION,
      authorityState:
        'product_facing_complete_fr282_schema_no_traditional_semantics' as const,
      facts,
      coverage: Object.freeze({
        representedFeatureCount: 29 as const,
        canonicalExtractorMaterializedCount: 18 as const,
        extractorOrAuthorityGapCount: 11 as const,
        availableDisplayFactCount,
        unavailableDisplayFactCount,
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

  assertFaceProductDisplayFactReceipt(receipt);
  return receipt;
}

export function assertFaceProductDisplayFactReceipt(
  receipt: FaceProductDisplayFactReceipt,
): void {
  assertFR293ProductColumnMap();
  assertObservationArtifactRef(
    receipt.observationArtifactRef,
  );

  if (
    receipt.schemaVersion !==
      FACE_PRODUCT_DISPLAY_FACT_RECEIPT_VERSION ||
    receipt.authorityRef !==
      FACE_PRODUCT_DISPLAY_FACT_AUTHORITY_REF ||
    receipt.sourceContractVersion !==
      FR293_CANONICAL_MORPHOLOGY_CONTRACT_VERSION ||
    receipt.authorityState !==
      'product_facing_complete_fr282_schema_no_traditional_semantics'
  ) {
    fail('receipt identity drift.');
  }

  const expectedKeys = FR293_PRODUCT_COLUMN_MAP.map(
    (column) => column.featureKey,
  );
  if (
    receipt.facts.length !== 29 ||
    new Set(
      receipt.facts.map((fact) => fact.featureKey),
    ).size !== 29 ||
    expectedKeys.some(
      (featureKey) =>
        !receipt.facts.some(
          (fact) => fact.featureKey === featureKey,
        ),
    ) ||
    new Set(
      receipt.facts.map((fact) => fact.observationRef),
    ).size !== 29
  ) {
    fail('receipt feature coverage drift.');
  }

  for (const fact of receipt.facts) {
    if (
      fact.observationRef !==
        observationRef(
          receipt.observationArtifactRef,
          fact.featureKey,
        ) ||
      fact.providerLandmarkIndicesExposed !== false ||
      fact.rawLandmarksExposed !== false ||
      fact.sourceObservationRefsExposed !== false ||
      fact.sourceCanonicalAssetDigestExposed !== false ||
      fact.traditionalBindingApplied !== false ||
      fact.classificationApplied !== false ||
      fact.thresholdApplied !== false ||
      fact.quality.poseAcceptanceThresholdIssued !== false ||
      fact.quality.correctionApplied !== false ||
      fact.quality.currentCapturePoseAdjudication !==
        'not_issued'
    ) {
      fail(
        `display fact boundary drift: ${fact.featureKey}.`,
      );
    }

    if (
      fact.status === 'available' &&
      FR293_PRODUCT_COLUMN_MAP.find(
        (column) =>
          column.featureKey === fact.featureKey,
      )?.implementationState !==
        'canonical_extractor_materialized'
    ) {
      fail(
        `unmaterialized fact exposed: ${fact.featureKey}.`,
      );
    }

    if (
      fact.status === 'unavailable' &&
      fact.fallbackInvented !== false
    ) {
      fail(
        `unavailable fact invented fallback: ${fact.featureKey}.`,
      );
    }
  }

  const availableCount = receipt.facts.filter(
    (fact) => fact.status === 'available',
  ).length;
  if (
    receipt.coverage.representedFeatureCount !== 29 ||
    receipt.coverage.canonicalExtractorMaterializedCount !== 18 ||
    receipt.coverage.extractorOrAuthorityGapCount !== 11 ||
    receipt.coverage.availableDisplayFactCount !==
      availableCount ||
    receipt.coverage.unavailableDisplayFactCount !==
      29 - availableCount
  ) {
    fail('receipt coverage summary drift.');
  }

  if (
    Object.values(receipt.provenance).some(
      (value) => value !== false,
    ) ||
    receipt.authorityBoundary.neutralObservationOnly !== true ||
    Object.entries(receipt.authorityBoundary)
      .filter(([key]) => key !== 'neutralObservationOnly')
      .some(([, value]) => value !== false)
  ) {
    fail('receipt privacy or authority boundary widened.');
  }
}
