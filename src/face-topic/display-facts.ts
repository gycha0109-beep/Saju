import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  FaceGroundingObservationUnitV1,
} from './grounding.js';
import type {
  FaceProductProjectionV1,
} from './projection.js';

export const FACE_DISPLAY_FACT_RECEIPT_SCHEMA_VERSION =
  'face-display-fact-receipt-v1' as const;

export const FACE_ADMITTED_DISPLAY_FACTS_SCHEMA_VERSION =
  'face-admitted-display-facts-v1' as const;

export type FaceDisplayUnitV1 =
  | 'ratio'
  | 'degree'
  | 'radian'
  | 'centimeter';

export interface FaceDisplayScalarValueV1 {
  readonly kind: 'scalar';
  readonly value: number;
  readonly unit: FaceDisplayUnitV1;
}

export interface FaceDisplayAxisV1 {
  readonly axisKey: string;
  readonly value: number;
  readonly unit: FaceDisplayUnitV1;
  readonly sourceMetricRef: string;
}

export interface FaceDisplayAxesValueV1 {
  readonly kind:
    | 'continuous_axes'
    | 'composite_visible_nasal_geometry';
  readonly axes: readonly FaceDisplayAxisV1[];
}

export type FaceDisplayValueV1 =
  | FaceDisplayScalarValueV1
  | FaceDisplayAxesValueV1;

export interface FaceObservationDisplayFactV1 {
  readonly factRef: string;
  readonly observationRef: string;
  readonly capabilityKey: string;
  readonly value: FaceDisplayValueV1;
  readonly qualifiers: readonly string[];
  readonly provenanceRefs: readonly string[];
  readonly traditionalBindingApplied: false;
  readonly classificationApplied: false;
  readonly thresholdApplied: false;
}

export interface FaceDisplayFactReceiptV1 {
  readonly schemaVersion:
    typeof FACE_DISPLAY_FACT_RECEIPT_SCHEMA_VERSION;
  readonly sourceResultHash: string;
  readonly authorityRef: string;
  readonly facts: readonly FaceObservationDisplayFactV1[];
  readonly provenanceRefs: readonly string[];
}

export interface FaceAdmittedDisplayFactsV1 {
  readonly schemaVersion:
    typeof FACE_ADMITTED_DISPLAY_FACTS_SCHEMA_VERSION;
  readonly sourceResultHash: string;
  readonly authorityRef: string;
  readonly facts: readonly FaceObservationDisplayFactV1[];
  readonly provenanceRefs: readonly string[];
  readonly displayFactsHash: string;
}

const RECEIPT_KEYS = new Set([
  'schemaVersion',
  'sourceResultHash',
  'authorityRef',
  'facts',
  'provenanceRefs',
]);

const FACT_KEYS = new Set([
  'factRef',
  'observationRef',
  'capabilityKey',
  'value',
  'qualifiers',
  'provenanceRefs',
  'traditionalBindingApplied',
  'classificationApplied',
  'thresholdApplied',
]);

const SCALAR_KEYS = new Set(['kind', 'value', 'unit']);
const AXES_KEYS = new Set(['kind', 'axes']);
const AXIS_KEYS = new Set([
  'axisKey',
  'value',
  'unit',
  'sourceMetricRef',
]);

const ALLOWED_UNITS = new Set<FaceDisplayUnitV1>([
  'ratio',
  'degree',
  'radian',
  'centimeter',
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

function sortedUnique(values: readonly string[]): readonly string[] {
  return Object.freeze([...new Set(values)].sort());
}

function assertExactKeys(
  value: object,
  allowed: ReadonlySet<string>,
  code: string,
): void {
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) {
      throw new Error(`${code}:${key}`);
    }
  }
}

function assertNoForbiddenFields(value: unknown): void {
  if (Array.isArray(value)) {
    for (const entry of value) {
      assertNoForbiddenFields(entry);
    }
    return;
  }
  if (value === null || typeof value !== 'object') {
    return;
  }

  for (const [key, child] of Object.entries(value)) {
    const normalized = key.toLowerCase().replace(/[^a-z0-9]/gu, '');
    if (
      FORBIDDEN_KEY_FRAGMENTS.some((fragment) =>
        normalized.includes(fragment),
      )
    ) {
      throw new Error(
        `FACE_DISPLAY_FACT_FORBIDDEN_FIELD:${key}`,
      );
    }
    assertNoForbiddenFields(child);
  }
}

function assertNonEmpty(value: string, code: string): void {
  if (value.trim().length === 0) {
    throw new Error(code);
  }
}

function assertFinite(value: number, code: string): void {
  if (!Number.isFinite(value)) {
    throw new Error(code);
  }
}

function normalizeValue(
  value: FaceDisplayValueV1,
): FaceDisplayValueV1 {
  if (value.kind === 'scalar') {
    assertExactKeys(
      value,
      SCALAR_KEYS,
      'FACE_DISPLAY_FACT_SCALAR_SCOPE_VIOLATION',
    );
    assertFinite(
      value.value,
      'FACE_DISPLAY_FACT_SCALAR_VALUE_INVALID',
    );
    if (!ALLOWED_UNITS.has(value.unit)) {
      throw new Error('FACE_DISPLAY_FACT_UNIT_INVALID');
    }
    return Object.freeze({
      kind: value.kind,
      value: value.value,
      unit: value.unit,
    });
  }

  if (
    value.kind !== 'continuous_axes' &&
    value.kind !== 'composite_visible_nasal_geometry'
  ) {
    throw new Error('FACE_DISPLAY_FACT_VALUE_KIND_INVALID');
  }
  assertExactKeys(
    value,
    AXES_KEYS,
    'FACE_DISPLAY_FACT_AXES_SCOPE_VIOLATION',
  );
  if (value.axes.length === 0) {
    throw new Error('FACE_DISPLAY_FACT_AXES_EMPTY');
  }

  const axes = Object.freeze(
    value.axes
      .map((axis) => {
        assertExactKeys(
          axis,
          AXIS_KEYS,
          'FACE_DISPLAY_FACT_AXIS_SCOPE_VIOLATION',
        );
        assertNonEmpty(
          axis.axisKey,
          'FACE_DISPLAY_FACT_AXIS_KEY_MISSING',
        );
        assertNonEmpty(
          axis.sourceMetricRef,
          'FACE_DISPLAY_FACT_AXIS_SOURCE_MISSING',
        );
        assertFinite(
          axis.value,
          'FACE_DISPLAY_FACT_AXIS_VALUE_INVALID',
        );
        if (!ALLOWED_UNITS.has(axis.unit)) {
          throw new Error('FACE_DISPLAY_FACT_UNIT_INVALID');
        }
        return Object.freeze({
          axisKey: axis.axisKey,
          value: axis.value,
          unit: axis.unit,
          sourceMetricRef: axis.sourceMetricRef,
        });
      })
      .sort((left, right) =>
        left.axisKey.localeCompare(right.axisKey),
      ),
  );

  if (
    new Set(axes.map((axis) => axis.axisKey)).size !== axes.length
  ) {
    throw new Error('FACE_DISPLAY_FACT_DUPLICATE_AXIS_KEY');
  }

  return Object.freeze({
    kind: value.kind,
    axes,
  });
}

function normalizeFact(
  fact: FaceObservationDisplayFactV1,
): FaceObservationDisplayFactV1 {
  assertExactKeys(
    fact,
    FACT_KEYS,
    'FACE_DISPLAY_FACT_SCOPE_VIOLATION',
  );
  assertNonEmpty(fact.factRef, 'FACE_DISPLAY_FACT_REF_MISSING');
  assertNonEmpty(
    fact.observationRef,
    'FACE_DISPLAY_FACT_OBSERVATION_REF_MISSING',
  );
  assertNonEmpty(
    fact.capabilityKey,
    'FACE_DISPLAY_FACT_CAPABILITY_MISSING',
  );
  if (
    fact.traditionalBindingApplied !== false ||
    fact.classificationApplied !== false ||
    fact.thresholdApplied !== false
  ) {
    throw new Error('FACE_DISPLAY_FACT_AUTHORITY_WIDENED');
  }

  return Object.freeze({
    factRef: fact.factRef,
    observationRef: fact.observationRef,
    capabilityKey: fact.capabilityKey,
    value: normalizeValue(fact.value),
    qualifiers: sortedUnique(fact.qualifiers),
    provenanceRefs: sortedUnique(fact.provenanceRefs),
    traditionalBindingApplied: false,
    classificationApplied: false,
    thresholdApplied: false,
  });
}

function groundingByObservationRef(
  projection: FaceProductProjectionV1,
): ReadonlyMap<string, FaceGroundingObservationUnitV1> {
  return new Map(
    projection.grounding.observationUnits.map((unit) => [
      unit.observationRef,
      unit,
    ]),
  );
}

export function admitFaceDisplayFacts(
  projection: FaceProductProjectionV1,
  receipt: FaceDisplayFactReceiptV1,
): FaceAdmittedDisplayFactsV1 {
  assertNoForbiddenFields(receipt);
  assertExactKeys(
    receipt,
    RECEIPT_KEYS,
    'FACE_DISPLAY_FACT_RECEIPT_SCOPE_VIOLATION',
  );
  if (
    receipt.schemaVersion !==
      FACE_DISPLAY_FACT_RECEIPT_SCHEMA_VERSION ||
    receipt.sourceResultHash !== projection.sourceResultHash
  ) {
    throw new Error('FACE_DISPLAY_FACT_SOURCE_BINDING_MISMATCH');
  }
  assertNonEmpty(
    receipt.authorityRef,
    'FACE_DISPLAY_FACT_AUTHORITY_REF_MISSING',
  );

  if (projection.grounding.semanticClaimUnits.length > 0) {
    throw new Error(
      'FACE_DISPLAY_FACT_NEUTRAL_READER_ONLY',
    );
  }

  const grounding = groundingByObservationRef(projection);
  const unavailable = new Set(projection.unavailableSections);
  const facts = Object.freeze(
    receipt.facts
      .map(normalizeFact)
      .filter((fact) => {
        const unit = grounding.get(fact.observationRef);
        if (unit === undefined) {
          return false;
        }
        if (unit.capabilityKey !== fact.capabilityKey) {
          throw new Error(
            `FACE_DISPLAY_FACT_CAPABILITY_MISMATCH:${fact.factRef}`,
          );
        }
        if (
          unavailable.has(
            `observation:${fact.capabilityKey}`,
          )
        ) {
          throw new Error(
            `FACE_DISPLAY_FACT_UNAVAILABLE_CAPABILITY:${fact.capabilityKey}`,
          );
        }
        return true;
      })
      .sort((left, right) =>
        left.factRef.localeCompare(right.factRef),
      ),
  );

  if (
    new Set(facts.map((fact) => fact.factRef)).size !== facts.length ||
    new Set(facts.map((fact) => fact.observationRef)).size !==
      facts.length
  ) {
    throw new Error('FACE_DISPLAY_FACT_DUPLICATE_BINDING');
  }

  for (const unit of projection.grounding.observationUnits) {
    if (
      !facts.some(
        (fact) => fact.observationRef === unit.observationRef,
      )
    ) {
      throw new Error(
        `FACE_DISPLAY_FACT_REQUIRED_GROUNDING_MISSING:${unit.observationRef}`,
      );
    }
  }

  const provenanceRefs = sortedUnique([
    ...receipt.provenanceRefs,
    ...facts.flatMap((fact) => fact.provenanceRefs),
  ]);
  const identity = Object.freeze({
    schemaVersion: FACE_ADMITTED_DISPLAY_FACTS_SCHEMA_VERSION,
    sourceResultHash: receipt.sourceResultHash,
    authorityRef: receipt.authorityRef,
    facts,
    provenanceRefs,
  });
  const displayFactsHash =
    `face-display-facts:${deterministicContentHash(identity)}`;

  return Object.freeze({
    ...identity,
    displayFactsHash,
  });
}
