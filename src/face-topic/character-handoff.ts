import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  FaceAdmittedDisplayFactsV1,
  FaceDisplayValueV1,
  FaceObservationDisplayFactV1,
} from './display-facts.js';
import type {
  FaceGroundingObservationUnitV1,
} from './grounding.js';
import type {
  FaceProductProjectionV1,
} from './projection.js';

export const FACE_CHARACTER_GROUNDING_SCHEMA_VERSION =
  'face-character-grounding-v1' as const;

export const FACE_CHARACTER_GROUNDING_PROJECTION_VERSION =
  'face-character-grounding-projection-v1' as const;

export const FACE_CHARACTER_REALIZATION_POLICY_REGISTRY_VERSION =
  'face-character-realization-policy-v1' as const;

export const FACE_CHARACTER_GROUNDING_REF_SCHEMA_VERSION =
  'face-character-grounding-ref-v1' as const;

export const FACE_CHARACTER_REALIZATION_POLICIES_V1 = Object.freeze({
  bounded_neutral_fact_render_v1: Object.freeze({
    allowedSourceKind: 'neutral_observation' as const,
    constraints: Object.freeze([
      'no_added_classification',
      'no_traditional_promotion',
      'no_personality_inference',
      'no_fate_inference',
      'no_wealth_inference',
      'no_relationship_inference',
      'no_threshold_generation',
      'no_certainty_strengthening',
      'preserve_qualifiers',
      'preserve_prohibited_extensions',
      'preserve_unavailable_sections',
    ] as const),
  }),
});

export type FaceCharacterRealizationPolicyRefV1 =
  keyof typeof FACE_CHARACTER_REALIZATION_POLICIES_V1;

export interface FaceCharacterObservationUnitV1 {
  readonly unitId: string;
  readonly kind: 'neutral_observation';
  readonly capabilityKey: string;
  readonly observationRef: string;
  readonly displayFactRef: string;
  readonly displayValue: FaceDisplayValueV1;
  readonly qualifiers: readonly string[];
  readonly prohibitedExtensions: readonly string[];
  readonly realizationPolicyRef:
    'bounded_neutral_fact_render_v1';
}

export interface FaceCharacterGroundingBundleV1 {
  readonly schemaVersion:
    typeof FACE_CHARACTER_GROUNDING_SCHEMA_VERSION;
  readonly projectionVersion:
    typeof FACE_CHARACTER_GROUNDING_PROJECTION_VERSION;
  readonly realizationPolicyRegistryVersion:
    typeof FACE_CHARACTER_REALIZATION_POLICY_REGISTRY_VERSION;
  readonly topicKey: string;
  readonly readinessState: 'available' | 'partial';
  readonly faceEngineVersion: string;
  readonly sourceResultHash: string;
  readonly projectionHash: string;
  readonly groundingHash: string;
  readonly displayFactsHash: string;
  readonly units:
    readonly FaceCharacterObservationUnitV1[];
  readonly unavailableSections: readonly string[];
  readonly prohibitedInferences: readonly string[];
  readonly bundleHash: string;
}

export interface FaceCharacterGroundingBundleRefV1 {
  readonly schemaVersion:
    typeof FACE_CHARACTER_GROUNDING_REF_SCHEMA_VERSION;
  readonly topicKey: string;
  readonly sourceResultHash: string;
  readonly projectionHash: string;
  readonly groundingHash: string;
  readonly displayFactsHash: string;
  readonly bundleHash: string;
  readonly projectionVersion:
    typeof FACE_CHARACTER_GROUNDING_PROJECTION_VERSION;
}

export type FaceCharacterHandoffEligibilityV1 =
  | Readonly<{
      state: 'eligible';
      mode: 'neutral_fact_realization';
      bundleRef:
        FaceCharacterGroundingBundleRefV1;
    }>
  | Readonly<{
      state: 'not_eligible';
      reason:
        | 'source_not_finalized'
        | 'source_blocked'
        | 'source_failed'
        | 'grounding_not_admitted'
        | 'no_character_safe_units';
    }>;

export type FaceCharacterHandoffEligibilityInputV1 =
  | Readonly<{
      state: 'ready' | 'partial';
      characterGrounding?:
        FaceCharacterGroundingBundleV1;
      characterGroundingRef?:
        FaceCharacterGroundingBundleRefV1;
    }>
  | Readonly<{
      state: 'blocked';
    }>
  | Readonly<{
      state: 'failed';
    }>
  | Readonly<{
      state: string;
    }>;

const BUNDLE_KEYS = new Set([
  'schemaVersion',
  'projectionVersion',
  'realizationPolicyRegistryVersion',
  'topicKey',
  'readinessState',
  'faceEngineVersion',
  'sourceResultHash',
  'projectionHash',
  'groundingHash',
  'displayFactsHash',
  'units',
  'unavailableSections',
  'prohibitedInferences',
  'bundleHash',
]);

const UNIT_KEYS = new Set([
  'unitId',
  'kind',
  'capabilityKey',
  'observationRef',
  'displayFactRef',
  'displayValue',
  'qualifiers',
  'prohibitedExtensions',
  'realizationPolicyRef',
]);

const REF_KEYS = new Set([
  'schemaVersion',
  'topicKey',
  'sourceResultHash',
  'projectionHash',
  'groundingHash',
  'displayFactsHash',
  'bundleHash',
  'projectionVersion',
]);

const SCALAR_KEYS = new Set([
  'kind',
  'value',
  'unit',
]);

const AXES_KEYS = new Set([
  'kind',
  'axes',
]);

const AXIS_KEYS = new Set([
  'axisKey',
  'value',
  'unit',
  'sourceMetricRef',
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
  'personaversion',
  'conversationid',
  'sessionid',
  'price',
  'offer',
  'entitlement',
  'payment',
]);

function fail(code: string): never {
  throw new Error(code);
}

function isRecord(
  value: unknown,
): value is Readonly<Record<string, unknown>> {
  return (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value)
  );
}

function asRecord(
  value: unknown,
  code: string,
): Readonly<Record<string, unknown>> {
  if (!isRecord(value)) {
    fail(code);
  }
  return value;
}

function assertExactKeys(
  value: Readonly<Record<string, unknown>>,
  allowed: ReadonlySet<string>,
  code: string,
): void {
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) {
      fail(`${code}:${key}`);
    }
  }
}

function assertNoForbiddenFields(
  value: unknown,
): void {
  if (Array.isArray(value)) {
    for (const child of value) {
      assertNoForbiddenFields(child);
    }
    return;
  }

  if (!isRecord(value)) {
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
      fail(
        `FACE_CHARACTER_GROUNDING_FORBIDDEN_PAYLOAD:${key}`,
      );
    }

    assertNoForbiddenFields(child);
  }
}

function nonEmptyString(
  value: unknown,
  code: string,
): string {
  if (
    typeof value !== 'string' ||
    value.trim().length === 0
  ) {
    fail(code);
  }
  return value;
}

function sortedUnique(
  values: readonly string[],
): readonly string[] {
  return Object.freeze([
    ...new Set(values),
  ].sort());
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
  return sortedUnique(value as string[]);
}

function assertPrefixedHash(
  value: unknown,
  prefix: string,
  code: string,
): string {
  if (
    typeof value !== 'string' ||
    !value.startsWith(prefix) ||
    !/^[0-9a-f]{64}$/u.test(
      value.slice(prefix.length),
    )
  ) {
    fail(code);
  }
  return value;
}

function assertFinite(
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

function normalizeDisplayValue(
  value: unknown,
): FaceDisplayValueV1 {
  const record = asRecord(
    value,
    'FACE_CHARACTER_GROUNDING_DISPLAY_VALUE_INVALID',
  );

  if (record.kind === 'scalar') {
    assertExactKeys(
      record,
      SCALAR_KEYS,
      'FACE_CHARACTER_GROUNDING_SCALAR_SCOPE_VIOLATION',
    );
    const unit = nonEmptyString(
      record.unit,
      'FACE_CHARACTER_GROUNDING_DISPLAY_UNIT_INVALID',
    );
    if (
      unit !== 'ratio' &&
      unit !== 'degree' &&
      unit !== 'radian' &&
      unit !== 'centimeter'
    ) {
      fail(
        'FACE_CHARACTER_GROUNDING_DISPLAY_UNIT_INVALID',
      );
    }

    return Object.freeze({
      kind: 'scalar' as const,
      value: assertFinite(
        record.value,
        'FACE_CHARACTER_GROUNDING_DISPLAY_VALUE_INVALID',
      ),
      unit,
    });
  }

  if (
    record.kind !== 'continuous_axes' &&
    record.kind !==
      'composite_visible_nasal_geometry'
  ) {
    fail(
      'FACE_CHARACTER_GROUNDING_DISPLAY_KIND_INVALID',
    );
  }

  assertExactKeys(
    record,
    AXES_KEYS,
    'FACE_CHARACTER_GROUNDING_AXES_SCOPE_VIOLATION',
  );

  if (
    !Array.isArray(record.axes) ||
    record.axes.length === 0
  ) {
    fail(
      'FACE_CHARACTER_GROUNDING_AXES_EMPTY',
    );
  }

  const axes = Object.freeze(
    record.axes
      .map((value) => {
        const axis = asRecord(
          value,
          'FACE_CHARACTER_GROUNDING_AXIS_INVALID',
        );

        assertExactKeys(
          axis,
          AXIS_KEYS,
          'FACE_CHARACTER_GROUNDING_AXIS_SCOPE_VIOLATION',
        );

        const unit = nonEmptyString(
          axis.unit,
          'FACE_CHARACTER_GROUNDING_DISPLAY_UNIT_INVALID',
        );
        if (
          unit !== 'ratio' &&
          unit !== 'degree' &&
          unit !== 'radian' &&
          unit !== 'centimeter'
        ) {
          fail(
            'FACE_CHARACTER_GROUNDING_DISPLAY_UNIT_INVALID',
          );
        }

        return Object.freeze({
          axisKey: nonEmptyString(
            axis.axisKey,
            'FACE_CHARACTER_GROUNDING_AXIS_KEY_MISSING',
          ),
          value: assertFinite(
            axis.value,
            'FACE_CHARACTER_GROUNDING_AXIS_VALUE_INVALID',
          ),
          unit,
          sourceMetricRef: nonEmptyString(
            axis.sourceMetricRef,
            'FACE_CHARACTER_GROUNDING_AXIS_SOURCE_MISSING',
          ),
        });
      })
      .sort((left, right) =>
        left.axisKey.localeCompare(
          right.axisKey,
        ),
      ),
  );

  if (
    new Set(
      axes.map((axis) => axis.axisKey),
    ).size !== axes.length
  ) {
    fail(
      'FACE_CHARACTER_GROUNDING_AXIS_DUPLICATE',
    );
  }

  return Object.freeze({
    kind: record.kind,
    axes,
  });
}

function factByObservationRef(
  displayFacts: FaceAdmittedDisplayFactsV1,
): ReadonlyMap<
  string,
  FaceObservationDisplayFactV1
> {
  return new Map(
    displayFacts.facts.map((fact) => [
      fact.observationRef,
      fact,
    ]),
  );
}

function buildObservationUnit(
  source: FaceGroundingObservationUnitV1,
  fact: FaceObservationDisplayFactV1,
  prohibitedInferences: readonly string[],
): FaceCharacterObservationUnitV1 {
  if (
    source.observationRef !==
      fact.observationRef ||
    source.capabilityKey !==
      fact.capabilityKey
  ) {
    fail(
      'FACE_CHARACTER_GROUNDING_SOURCE_BINDING_MISMATCH',
    );
  }

  return Object.freeze({
    unitId: source.unitId,
    kind: 'neutral_observation' as const,
    capabilityKey: source.capabilityKey,
    observationRef: source.observationRef,
    displayFactRef: fact.factRef,
    displayValue:
      normalizeDisplayValue(fact.value),
    qualifiers: sortedUnique([
      ...source.qualifiers,
      ...fact.qualifiers,
    ]),
    prohibitedExtensions: sortedUnique([
      ...source.prohibitedExtensions,
      ...prohibitedInferences,
    ]),
    realizationPolicyRef:
      'bounded_neutral_fact_render_v1' as const,
  });
}

function bundleIdentity(
  bundle: Omit<
    FaceCharacterGroundingBundleV1,
    'bundleHash'
  >,
): Omit<
  FaceCharacterGroundingBundleV1,
  'bundleHash'
> {
  return bundle;
}

export function buildFaceCharacterGroundingBundleV1(
  projection: FaceProductProjectionV1,
  displayFacts: FaceAdmittedDisplayFactsV1,
): FaceCharacterGroundingBundleV1 {
  if (
    displayFacts.sourceResultHash !==
    projection.sourceResultHash
  ) {
    fail(
      'FACE_CHARACTER_GROUNDING_SOURCE_RESULT_MISMATCH',
    );
  }

  if (
    projection.grounding.sourceResultHash !==
    projection.sourceResultHash
  ) {
    fail(
      'FACE_CHARACTER_GROUNDING_PROJECTION_BINDING_MISMATCH',
    );
  }

  if (
    projection.grounding.semanticClaimUnits.length >
    0
  ) {
    fail(
      'FACE_CHARACTER_GROUNDING_TRADITIONAL_NOT_ADMITTED',
    );
  }

  const facts =
    factByObservationRef(displayFacts);
  const unavailable = new Set(
    projection.unavailableSections,
  );

  const units = Object.freeze(
    projection.grounding.observationUnits
      .map((source) => {
        if (
          unavailable.has(
            `observation:${source.capabilityKey}`,
          )
        ) {
          fail(
            `FACE_CHARACTER_GROUNDING_UNAVAILABLE_PROMOTED:${source.capabilityKey}`,
          );
        }

        const fact = facts.get(
          source.observationRef,
        );
        if (fact === undefined) {
          fail(
            `FACE_CHARACTER_GROUNDING_DISPLAY_FACT_MISSING:${source.observationRef}`,
          );
        }

        return buildObservationUnit(
          source,
          fact,
          projection.prohibitedInferences,
        );
      })
      .sort((left, right) =>
        left.unitId.localeCompare(
          right.unitId,
        ),
      ),
  );

  if (units.length === 0) {
    fail(
      'FACE_CHARACTER_GROUNDING_NO_SAFE_UNITS',
    );
  }

  if (
    new Set(
      units.map((unit) => unit.unitId),
    ).size !== units.length ||
    new Set(
      units.map(
        (unit) => unit.observationRef,
      ),
    ).size !== units.length ||
    new Set(
      units.map(
        (unit) => unit.displayFactRef,
      ),
    ).size !== units.length
  ) {
    fail(
      'FACE_CHARACTER_GROUNDING_DUPLICATE_BINDING',
    );
  }

  if (
    displayFacts.facts.length !==
    units.length
  ) {
    fail(
      'FACE_CHARACTER_GROUNDING_DISPLAY_SCOPE_MISMATCH',
    );
  }

  const withoutHash = Object.freeze({
    schemaVersion:
      FACE_CHARACTER_GROUNDING_SCHEMA_VERSION,
    projectionVersion:
      FACE_CHARACTER_GROUNDING_PROJECTION_VERSION,
    realizationPolicyRegistryVersion:
      FACE_CHARACTER_REALIZATION_POLICY_REGISTRY_VERSION,
    topicKey: projection.topicKey,
    readinessState:
      projection.readinessState,
    faceEngineVersion:
      projection.grounding.faceEngineVersion,
    sourceResultHash:
      projection.sourceResultHash,
    projectionHash:
      projection.projectionHash,
    groundingHash:
      projection.grounding.groundingHash,
    displayFactsHash:
      displayFacts.displayFactsHash,
    units,
    unavailableSections:
      sortedUnique(
        projection.unavailableSections,
      ),
    prohibitedInferences:
      sortedUnique(
        projection.prohibitedInferences,
      ),
  } satisfies Omit<
    FaceCharacterGroundingBundleV1,
    'bundleHash'
  >);

  const bundleHash =
    `face-character-grounding:${deterministicContentHash(
      bundleIdentity(withoutHash),
    )}`;

  const result = Object.freeze({
    ...withoutHash,
    bundleHash,
  });

  assertFaceCharacterGroundingBundleV1(
    result,
  );
  return result;
}

export function assertFaceCharacterGroundingBundleV1(
  input: unknown,
): asserts input is FaceCharacterGroundingBundleV1 {
  assertNoForbiddenFields(input);

  const value = asRecord(
    input,
    'FACE_CHARACTER_GROUNDING_INVALID',
  );
  assertExactKeys(
    value,
    BUNDLE_KEYS,
    'FACE_CHARACTER_GROUNDING_SCOPE_VIOLATION',
  );

  if (
    value.schemaVersion !==
    FACE_CHARACTER_GROUNDING_SCHEMA_VERSION
  ) {
    fail(
      'FACE_CHARACTER_GROUNDING_SCHEMA_DRIFT',
    );
  }
  if (
    value.projectionVersion !==
    FACE_CHARACTER_GROUNDING_PROJECTION_VERSION
  ) {
    fail(
      'FACE_CHARACTER_GROUNDING_PROJECTION_VERSION_DRIFT',
    );
  }
  if (
    value.realizationPolicyRegistryVersion !==
    FACE_CHARACTER_REALIZATION_POLICY_REGISTRY_VERSION
  ) {
    fail(
      'FACE_CHARACTER_GROUNDING_POLICY_REGISTRY_DRIFT',
    );
  }

  const topicKey = nonEmptyString(
    value.topicKey,
    'FACE_CHARACTER_GROUNDING_TOPIC_MISSING',
  );
  void topicKey;

  if (
    value.readinessState !==
      'available' &&
    value.readinessState !== 'partial'
  ) {
    fail(
      'FACE_CHARACTER_GROUNDING_READINESS_INVALID',
    );
  }

  nonEmptyString(
    value.faceEngineVersion,
    'FACE_CHARACTER_GROUNDING_ENGINE_VERSION_MISSING',
  );
  assertPrefixedHash(
    value.sourceResultHash,
    'face-topic-source-result:',
    'FACE_CHARACTER_GROUNDING_SOURCE_RESULT_HASH_INVALID',
  );
  assertPrefixedHash(
    value.projectionHash,
    'face-product-projection:',
    'FACE_CHARACTER_GROUNDING_PROJECTION_HASH_INVALID',
  );
  assertPrefixedHash(
    value.groundingHash,
    'face-grounding:',
    'FACE_CHARACTER_GROUNDING_SOURCE_GROUNDING_HASH_INVALID',
  );
  assertPrefixedHash(
    value.displayFactsHash,
    'face-display-facts:',
    'FACE_CHARACTER_GROUNDING_DISPLAY_FACTS_HASH_INVALID',
  );
  assertPrefixedHash(
    value.bundleHash,
    'face-character-grounding:',
    'FACE_CHARACTER_GROUNDING_HASH_INVALID',
  );

  const unavailableSections =
    stringArray(
      value.unavailableSections,
      'FACE_CHARACTER_GROUNDING_UNAVAILABLE_INVALID',
    );
  const prohibitedInferences =
    stringArray(
      value.prohibitedInferences,
      'FACE_CHARACTER_GROUNDING_PROHIBITIONS_INVALID',
    );

  if (
    !Array.isArray(value.units) ||
    value.units.length === 0
  ) {
    fail(
      'FACE_CHARACTER_GROUNDING_UNITS_INVALID',
    );
  }

  const units =
    value.units.map(
      (candidate, index) => {
        const unit = asRecord(
          candidate,
          `FACE_CHARACTER_GROUNDING_UNIT_INVALID:${index}`,
        );
        assertExactKeys(
          unit,
          UNIT_KEYS,
          'FACE_CHARACTER_GROUNDING_UNIT_SCOPE_VIOLATION',
        );

        if (
          unit.kind !==
          'neutral_observation'
        ) {
          fail(
            'FACE_CHARACTER_GROUNDING_UNIT_KIND_INVALID',
          );
        }

        const policy =
          nonEmptyString(
            unit.realizationPolicyRef,
            'FACE_CHARACTER_GROUNDING_POLICY_MISSING',
          );
        if (
          policy !==
          'bounded_neutral_fact_render_v1'
        ) {
          fail(
            'FACE_CHARACTER_GROUNDING_POLICY_INVALID',
          );
        }

        const prohibitedExtensions =
          stringArray(
            unit.prohibitedExtensions,
            'FACE_CHARACTER_GROUNDING_UNIT_PROHIBITIONS_INVALID',
          );

        for (
          const required
          of prohibitedInferences
        ) {
          if (
            !prohibitedExtensions.includes(
              required,
            )
          ) {
            fail(
              'FACE_CHARACTER_GROUNDING_PROHIBITION_REMOVED',
            );
          }
        }

        return Object.freeze({
          unitId: nonEmptyString(
            unit.unitId,
            'FACE_CHARACTER_GROUNDING_UNIT_ID_MISSING',
          ),
          kind:
            'neutral_observation' as const,
          capabilityKey:
            nonEmptyString(
              unit.capabilityKey,
              'FACE_CHARACTER_GROUNDING_CAPABILITY_MISSING',
            ),
          observationRef:
            nonEmptyString(
              unit.observationRef,
              'FACE_CHARACTER_GROUNDING_OBSERVATION_REF_MISSING',
            ),
          displayFactRef:
            nonEmptyString(
              unit.displayFactRef,
              'FACE_CHARACTER_GROUNDING_DISPLAY_FACT_REF_MISSING',
            ),
          displayValue:
            normalizeDisplayValue(
              unit.displayValue,
            ),
          qualifiers: stringArray(
            unit.qualifiers,
            'FACE_CHARACTER_GROUNDING_QUALIFIERS_INVALID',
          ),
          prohibitedExtensions,
          realizationPolicyRef:
            'bounded_neutral_fact_render_v1' as const,
        });
      },
    );

  if (
    new Set(
      units.map((unit) => unit.unitId),
    ).size !== units.length ||
    new Set(
      units.map(
        (unit) => unit.observationRef,
      ),
    ).size !== units.length ||
    new Set(
      units.map(
        (unit) => unit.displayFactRef,
      ),
    ).size !== units.length
  ) {
    fail(
      'FACE_CHARACTER_GROUNDING_DUPLICATE_BINDING',
    );
  }

  const sortedUnits = [...units].sort(
    (left, right) =>
      left.unitId.localeCompare(
        right.unitId,
      ),
  );
  if (
    sortedUnits.some(
      (unit, index) =>
        unit.unitId !==
        units[index]?.unitId,
    )
  ) {
    fail(
      'FACE_CHARACTER_GROUNDING_UNIT_ORDER_INVALID',
    );
  }

  const typed = {
    schemaVersion:
      FACE_CHARACTER_GROUNDING_SCHEMA_VERSION,
    projectionVersion:
      FACE_CHARACTER_GROUNDING_PROJECTION_VERSION,
    realizationPolicyRegistryVersion:
      FACE_CHARACTER_REALIZATION_POLICY_REGISTRY_VERSION,
    topicKey: value.topicKey as string,
    readinessState:
      value.readinessState as
        | 'available'
        | 'partial',
    faceEngineVersion:
      value.faceEngineVersion as string,
    sourceResultHash:
      value.sourceResultHash as string,
    projectionHash:
      value.projectionHash as string,
    groundingHash:
      value.groundingHash as string,
    displayFactsHash:
      value.displayFactsHash as string,
    units,
    unavailableSections,
    prohibitedInferences,
  } satisfies Omit<
    FaceCharacterGroundingBundleV1,
    'bundleHash'
  >;

  const expected =
    `face-character-grounding:${deterministicContentHash(
      bundleIdentity(typed),
    )}`;

  if (
    value.bundleHash !== expected
  ) {
    fail(
      'FACE_CHARACTER_GROUNDING_HASH_MISMATCH',
    );
  }
}

export function admitFaceCharacterGroundingBundleV1(
  input: unknown,
  source: Readonly<{
    projection: FaceProductProjectionV1;
    displayFacts:
      FaceAdmittedDisplayFactsV1;
  }>,
): FaceCharacterGroundingBundleV1 {
  assertFaceCharacterGroundingBundleV1(
    input,
  );

  const expected =
    buildFaceCharacterGroundingBundleV1(
      source.projection,
      source.displayFacts,
    );

  if (
    deterministicContentHash(input) !==
    deterministicContentHash(expected)
  ) {
    fail(
      'FACE_CHARACTER_GROUNDING_SOURCE_ADMISSION_MISMATCH',
    );
  }

  return input;
}

export function buildFaceCharacterGroundingBundleRefV1(
  bundle: FaceCharacterGroundingBundleV1,
): FaceCharacterGroundingBundleRefV1 {
  assertFaceCharacterGroundingBundleV1(
    bundle,
  );

  return Object.freeze({
    schemaVersion:
      FACE_CHARACTER_GROUNDING_REF_SCHEMA_VERSION,
    topicKey: bundle.topicKey,
    sourceResultHash:
      bundle.sourceResultHash,
    projectionHash:
      bundle.projectionHash,
    groundingHash:
      bundle.groundingHash,
    displayFactsHash:
      bundle.displayFactsHash,
    bundleHash:
      bundle.bundleHash,
    projectionVersion:
      bundle.projectionVersion,
  });
}

export function assertFaceCharacterGroundingBundleRefV1(
  input: unknown,
  bundle?: FaceCharacterGroundingBundleV1,
): asserts input is FaceCharacterGroundingBundleRefV1 {
  assertNoForbiddenFields(input);

  const value = asRecord(
    input,
    'FACE_CHARACTER_GROUNDING_REF_INVALID',
  );
  assertExactKeys(
    value,
    REF_KEYS,
    'FACE_CHARACTER_GROUNDING_REF_SCOPE_VIOLATION',
  );

  if (
    value.schemaVersion !==
    FACE_CHARACTER_GROUNDING_REF_SCHEMA_VERSION ||
    value.projectionVersion !==
      FACE_CHARACTER_GROUNDING_PROJECTION_VERSION
  ) {
    fail(
      'FACE_CHARACTER_GROUNDING_REF_VERSION_INVALID',
    );
  }

  nonEmptyString(
    value.topicKey,
    'FACE_CHARACTER_GROUNDING_REF_TOPIC_MISSING',
  );
  assertPrefixedHash(
    value.sourceResultHash,
    'face-topic-source-result:',
    'FACE_CHARACTER_GROUNDING_REF_SOURCE_INVALID',
  );
  assertPrefixedHash(
    value.projectionHash,
    'face-product-projection:',
    'FACE_CHARACTER_GROUNDING_REF_PROJECTION_INVALID',
  );
  assertPrefixedHash(
    value.groundingHash,
    'face-grounding:',
    'FACE_CHARACTER_GROUNDING_REF_GROUNDING_INVALID',
  );
  assertPrefixedHash(
    value.displayFactsHash,
    'face-display-facts:',
    'FACE_CHARACTER_GROUNDING_REF_DISPLAY_INVALID',
  );
  assertPrefixedHash(
    value.bundleHash,
    'face-character-grounding:',
    'FACE_CHARACTER_GROUNDING_REF_BUNDLE_INVALID',
  );

  if (
    bundle !== undefined &&
    (
      value.topicKey !==
        bundle.topicKey ||
      value.sourceResultHash !==
        bundle.sourceResultHash ||
      value.projectionHash !==
        bundle.projectionHash ||
      value.groundingHash !==
        bundle.groundingHash ||
      value.displayFactsHash !==
        bundle.displayFactsHash ||
      value.bundleHash !==
        bundle.bundleHash ||
      value.projectionVersion !==
        bundle.projectionVersion
    )
  ) {
    fail(
      'FACE_CHARACTER_GROUNDING_REF_MISMATCH',
    );
  }
}

export function evaluateFaceCharacterHandoffEligibility(
  input: FaceCharacterHandoffEligibilityInputV1,
): FaceCharacterHandoffEligibilityV1 {
  if (input.state === 'blocked') {
    return Object.freeze({
      state: 'not_eligible' as const,
      reason: 'source_blocked' as const,
    });
  }

  if (input.state === 'failed') {
    return Object.freeze({
      state: 'not_eligible' as const,
      reason: 'source_failed' as const,
    });
  }

  if (
    input.state !== 'ready' &&
    input.state !== 'partial'
  ) {
    return Object.freeze({
      state: 'not_eligible' as const,
      reason:
        'source_not_finalized' as const,
    });
  }

  if (
    !('characterGrounding' in input) ||
    !('characterGroundingRef' in input) ||
    input.characterGrounding ===
      undefined ||
    input.characterGroundingRef ===
      undefined
  ) {
    return Object.freeze({
      state: 'not_eligible' as const,
      reason:
        'grounding_not_admitted' as const,
    });
  }

  try {
    assertFaceCharacterGroundingBundleV1(
      input.characterGrounding,
    );
    assertFaceCharacterGroundingBundleRefV1(
      input.characterGroundingRef,
      input.characterGrounding,
    );
  } catch {
    return Object.freeze({
      state: 'not_eligible' as const,
      reason:
        'grounding_not_admitted' as const,
    });
  }

  if (
    input.characterGrounding.units.length ===
    0
  ) {
    return Object.freeze({
      state: 'not_eligible' as const,
      reason:
        'no_character_safe_units' as const,
    });
  }

  return Object.freeze({
    state: 'eligible' as const,
    mode:
      'neutral_fact_realization' as const,
    bundleRef:
      input.characterGroundingRef,
  });
}
