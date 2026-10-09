import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildFaceGovernedInterpretationHandoffV1,
  type FaceGovernedInterpretationHandoffDecisionV1,
  type FaceGovernedInterpretationHandoffV1,
  type FaceGovernedInterpretationSourceInputV1,
} from './governed-interpretation-handoff.js';
import {
  admitFaceGovernedInterpretationUnitV1,
  type FaceGovernedInterpretationUnitV1,
} from './governed-interpretation-unit.js';
import {
  admitFaceTopicExecutionResult,
} from './result-receipt.js';

export const FACE_GOVERNED_CHARACTER_GROUNDING_SCHEMA_VERSION_V1 =
  'face-governed-character-grounding-v1' as const;
export const FACE_GOVERNED_CHARACTER_GROUNDING_REF_SCHEMA_VERSION_V1 =
  'face-governed-character-grounding-ref-v1' as const;
export const FACE_GOVERNED_CHARACTER_GROUNDING_PROJECTION_VERSION_V1 =
  'face-governed-character-grounding-projection-v1' as const;
export const FACE_GOVERNED_CHARACTER_REALIZATION_POLICY_REGISTRY_VERSION_V1 =
  'face-governed-character-realization-policy-v1' as const;
export const FACE_GOVERNED_CHARACTER_REALIZATION_POLICY_V1 =
  'protected_meaning_exact_v1' as const;
export const FACE_GOVERNED_CHARACTER_GROUNDING_MODE_V1 =
  'governed_traditional_interpretation' as const;

export interface FaceGovernedCharacterGroundingUnitV1
  extends FaceGovernedInterpretationUnitV1 {
  readonly realizationPolicyRef:
    typeof FACE_GOVERNED_CHARACTER_REALIZATION_POLICY_V1;
}

export interface FaceGovernedCharacterGroundingBundleV1 {
  readonly schemaVersion:
    typeof FACE_GOVERNED_CHARACTER_GROUNDING_SCHEMA_VERSION_V1;
  readonly projectionVersion:
    typeof FACE_GOVERNED_CHARACTER_GROUNDING_PROJECTION_VERSION_V1;
  readonly realizationPolicyRegistryVersion:
    typeof FACE_GOVERNED_CHARACTER_REALIZATION_POLICY_REGISTRY_VERSION_V1;
  readonly mode:
    typeof FACE_GOVERNED_CHARACTER_GROUNDING_MODE_V1;
  readonly topicKey: string;
  readonly sourceContractVersion: string;
  readonly sourceAuthorityRef: string;
  readonly sourceResultHash: string;
  readonly authorizationReceiptRef: string;
  readonly handoffHash: string;
  readonly faceEngineVersion: string;
  readonly faceReadingRef?: string;
  readonly methodologyPackRefs: readonly string[];
  readonly bindingGroupRefs: readonly string[];
  readonly units: readonly FaceGovernedCharacterGroundingUnitV1[];
  readonly unavailableSections: readonly string[];
  readonly prohibitedInferences: readonly string[];
  readonly provenanceRefs: readonly string[];
  readonly bundleHash: string;
}

export interface FaceGovernedCharacterGroundingRefV1 {
  readonly schemaVersion:
    typeof FACE_GOVERNED_CHARACTER_GROUNDING_REF_SCHEMA_VERSION_V1;
  readonly projectionVersion:
    typeof FACE_GOVERNED_CHARACTER_GROUNDING_PROJECTION_VERSION_V1;
  readonly mode:
    typeof FACE_GOVERNED_CHARACTER_GROUNDING_MODE_V1;
  readonly topicKey: string;
  readonly sourceContractVersion: string;
  readonly sourceAuthorityRef: string;
  readonly sourceResultHash: string;
  readonly authorizationReceiptRef: string;
  readonly handoffHash: string;
  readonly faceEngineVersion: string;
  readonly faceReadingRef?: string;
  readonly methodologyPackRefs: readonly string[];
  readonly bundleHash: string;
}

export type FaceGovernedCharacterGroundingDecisionV1 =
  | Readonly<{
      state: 'eligible';
      handoff: FaceGovernedInterpretationHandoffV1;
      grounding: FaceGovernedCharacterGroundingBundleV1;
      groundingRef: FaceGovernedCharacterGroundingRefV1;
    }>
  | Extract<
      FaceGovernedInterpretationHandoffDecisionV1,
      { state: 'not_eligible' }
    >;

const PRIVACY_FORBIDDEN_KEY_FRAGMENTS = Object.freeze([
  'rawimage',
  'rawphoto',
  'rawjpeg',
  'rawlandmark',
  'landmarkindex',
  'mediapipe',
  'posematrix',
  'faceembedding',
  'identitytemplate',
  'highresolutioncrop',
  'hirescrop',
] as const);

function fail(code: string): never {
  throw new Error(code);
}

function sortedUnique(values: readonly string[]): readonly string[] {
  return Object.freeze([...new Set(values)].sort());
}

function assertNoPrivacyForbiddenFields(value: unknown): void {
  if (Array.isArray(value)) {
    value.forEach(assertNoPrivacyForbiddenFields);
    return;
  }
  if (value === null || typeof value !== 'object') {
    return;
  }

  for (const [key, child] of Object.entries(value)) {
    const normalized = key.toLowerCase().replace(/[^a-z0-9]/gu, '');
    if (
      PRIVACY_FORBIDDEN_KEY_FRAGMENTS.some((fragment) =>
        normalized.includes(fragment),
      )
    ) {
      fail(`FACE_GOVERNED_CHARACTER_GROUNDING_PRIVACY_SCOPE_VIOLATION:${key}`);
    }
    assertNoPrivacyForbiddenFields(child);
  }
}

function buildUnit(
  unit: FaceGovernedInterpretationUnitV1,
): FaceGovernedCharacterGroundingUnitV1 {
  const admitted = admitFaceGovernedInterpretationUnitV1(unit);
  return Object.freeze({
    ...admitted,
    realizationPolicyRef:
      FACE_GOVERNED_CHARACTER_REALIZATION_POLICY_V1,
  });
}

function withoutBundleHash(
  bundle: Omit<FaceGovernedCharacterGroundingBundleV1, 'bundleHash'>,
): Omit<FaceGovernedCharacterGroundingBundleV1, 'bundleHash'> {
  return bundle;
}

export function buildFaceGovernedCharacterGroundingV1(
  input: FaceGovernedInterpretationSourceInputV1,
): FaceGovernedCharacterGroundingDecisionV1 {
  const handoffDecision =
    buildFaceGovernedInterpretationHandoffV1(input);

  if (handoffDecision.state !== 'eligible') {
    return handoffDecision;
  }

  const admitted =
    admitFaceTopicExecutionResult(
      input.plan,
      input.receipt,
    );

  if (
    admitted.executionKind !== 'traditional_face_reading' ||
    admitted.sourceResultHash !==
      handoffDecision.handoff.sourceResultHash
  ) {
    fail('FACE_GOVERNED_CHARACTER_GROUNDING_SOURCE_MISMATCH');
  }

  const units = Object.freeze(
    handoffDecision.handoff.units.map(buildUnit),
  );

  if (
    units.length === 0 ||
    units.length !== admitted.semanticClaims.length
  ) {
    fail('FACE_GOVERNED_CHARACTER_GROUNDING_UNIT_COVERAGE_MISMATCH');
  }

  const withoutHash = Object.freeze({
    schemaVersion:
      FACE_GOVERNED_CHARACTER_GROUNDING_SCHEMA_VERSION_V1,
    projectionVersion:
      FACE_GOVERNED_CHARACTER_GROUNDING_PROJECTION_VERSION_V1,
    realizationPolicyRegistryVersion:
      FACE_GOVERNED_CHARACTER_REALIZATION_POLICY_REGISTRY_VERSION_V1,
    mode:
      FACE_GOVERNED_CHARACTER_GROUNDING_MODE_V1,
    topicKey:
      handoffDecision.handoff.topicKey,
    sourceContractVersion:
      handoffDecision.handoff.sourceContractVersion,
    sourceAuthorityRef:
      handoffDecision.handoff.sourceAuthorityRef,
    sourceResultHash:
      handoffDecision.handoff.sourceResultHash,
    authorizationReceiptRef:
      handoffDecision.handoff.authorizationReceiptRef,
    handoffHash:
      handoffDecision.handoff.handoffHash,
    faceEngineVersion:
      admitted.faceEngineVersion,
    ...(admitted.faceReadingRef === undefined
      ? {}
      : { faceReadingRef: admitted.faceReadingRef }),
    methodologyPackRefs:
      sortedUnique(admitted.methodologyPackRefs),
    bindingGroupRefs:
      sortedUnique(admitted.bindingGroupRefs),
    units,
    unavailableSections:
      sortedUnique(admitted.unavailableSections),
    prohibitedInferences:
      sortedUnique(admitted.prohibitedInferences),
    provenanceRefs:
      sortedUnique(admitted.provenanceRefs),
  }) satisfies Omit<
    FaceGovernedCharacterGroundingBundleV1,
    'bundleHash'
  >;

  const grounding = Object.freeze({
    ...withoutHash,
    bundleHash:
      `face-governed-character-grounding:${deterministicContentHash(
        withoutBundleHash(withoutHash),
      )}`,
  }) satisfies FaceGovernedCharacterGroundingBundleV1;

  assertFaceGovernedCharacterGroundingV1(grounding);

  const groundingRef = Object.freeze({
    schemaVersion:
      FACE_GOVERNED_CHARACTER_GROUNDING_REF_SCHEMA_VERSION_V1,
    projectionVersion:
      grounding.projectionVersion,
    mode:
      grounding.mode,
    topicKey:
      grounding.topicKey,
    sourceContractVersion:
      grounding.sourceContractVersion,
    sourceAuthorityRef:
      grounding.sourceAuthorityRef,
    sourceResultHash:
      grounding.sourceResultHash,
    authorizationReceiptRef:
      grounding.authorizationReceiptRef,
    handoffHash:
      grounding.handoffHash,
    faceEngineVersion:
      grounding.faceEngineVersion,
    ...(grounding.faceReadingRef === undefined
      ? {}
      : { faceReadingRef: grounding.faceReadingRef }),
    methodologyPackRefs:
      grounding.methodologyPackRefs,
    bundleHash:
      grounding.bundleHash,
  }) satisfies FaceGovernedCharacterGroundingRefV1;

  return Object.freeze({
    state: 'eligible' as const,
    handoff: handoffDecision.handoff,
    grounding,
    groundingRef,
  });
}

export function assertFaceGovernedCharacterGroundingV1(
  candidate: FaceGovernedCharacterGroundingBundleV1,
): void {
  assertNoPrivacyForbiddenFields(candidate);

  const exactKeys = new Set([
    'schemaVersion',
    'projectionVersion',
    'realizationPolicyRegistryVersion',
    'mode',
    'topicKey',
    'sourceContractVersion',
    'sourceAuthorityRef',
    'sourceResultHash',
    'authorizationReceiptRef',
    'handoffHash',
    'faceEngineVersion',
    'faceReadingRef',
    'methodologyPackRefs',
    'bindingGroupRefs',
    'units',
    'unavailableSections',
    'prohibitedInferences',
    'provenanceRefs',
    'bundleHash',
  ]);
  if (
    Object.keys(candidate).some(
      (key) => !exactKeys.has(key),
    )
  ) {
    fail('FACE_GOVERNED_CHARACTER_GROUNDING_SCOPE_VIOLATION');
  }

  if (
    candidate.schemaVersion !==
      FACE_GOVERNED_CHARACTER_GROUNDING_SCHEMA_VERSION_V1 ||
    candidate.projectionVersion !==
      FACE_GOVERNED_CHARACTER_GROUNDING_PROJECTION_VERSION_V1 ||
    candidate.realizationPolicyRegistryVersion !==
      FACE_GOVERNED_CHARACTER_REALIZATION_POLICY_REGISTRY_VERSION_V1 ||
    candidate.mode !==
      FACE_GOVERNED_CHARACTER_GROUNDING_MODE_V1 ||
    candidate.units.length === 0
  ) {
    fail('FACE_GOVERNED_CHARACTER_GROUNDING_IDENTITY_INVALID');
  }

  if (
    new Set(candidate.units.map((unit) => unit.interpretationId)).size !==
      candidate.units.length
  ) {
    fail('FACE_GOVERNED_CHARACTER_GROUNDING_DUPLICATE_UNIT');
  }

  for (const unit of candidate.units) {
    const {
      realizationPolicyRef,
      ...interpretation
    } = unit;
    admitFaceGovernedInterpretationUnitV1(
      interpretation,
    );
    if (
      realizationPolicyRef !==
        FACE_GOVERNED_CHARACTER_REALIZATION_POLICY_V1
    ) {
      fail('FACE_GOVERNED_CHARACTER_GROUNDING_REALIZATION_POLICY_INVALID');
    }
  }

  const { bundleHash, ...material } = candidate;
  if (
    bundleHash !==
      `face-governed-character-grounding:${deterministicContentHash(
        material,
      )}`
  ) {
    fail('FACE_GOVERNED_CHARACTER_GROUNDING_HASH_MISMATCH');
  }
}

export function assertFaceGovernedCharacterGroundingMatchesSourceV1(
  candidate: unknown,
  input: FaceGovernedInterpretationSourceInputV1,
): asserts candidate is FaceGovernedCharacterGroundingBundleV1 {
  const expected =
    buildFaceGovernedCharacterGroundingV1(input);
  if (
    expected.state !== 'eligible' ||
    deterministicContentHash(candidate) !==
      deterministicContentHash(expected.grounding)
  ) {
    fail('FACE_GOVERNED_CHARACTER_GROUNDING_SOURCE_MISMATCH');
  }
}
