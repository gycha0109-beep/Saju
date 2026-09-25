import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  FaceTopicAuthorizedExecutionPlan,
  FaceTopicExecutionKind,
  FaceTopicExecutionPlan,
} from './execution.js';
import {
  assertFaceTopicAuthorizedExecutionPlan,
} from './execution.js';

export const FACE_TOPIC_EXECUTION_RESULT_RECEIPT_SCHEMA_VERSION =
  'face-topic-execution-result-receipt-v1' as const;

export const FACE_TOPIC_ADMITTED_RESULT_SCHEMA_VERSION =
  'face-topic-admitted-execution-result-v1' as const;

export interface FaceObservationResultUnitV1 {
  readonly kind: 'neutral_observation';
  readonly capabilityKey: string;
  readonly observationRef: string;
  readonly qualifiers: readonly string[];
  readonly provenanceRefs: readonly string[];
}

export interface FaceSemanticClaimResultUnitV1 {
  readonly kind: 'traditional_claim';
  readonly claimFamily: string;
  readonly claimRef: string;
  readonly methodologyRef: string;
  readonly inferenceKeys: readonly string[];
  readonly qualifiers: readonly string[];
  readonly provenanceRefs: readonly string[];
}

export interface FaceNarrativeBlockResultUnitV1 {
  readonly blockRef: string;
  readonly sourceRefs: readonly string[];
  readonly text: string;
  readonly realizationPolicy:
    | 'protected_verbatim'
    | 'bounded_paraphrase';
  readonly prohibitedExtensions: readonly string[];
}

export interface FaceTopicExecutionResultReceiptV1 {
  readonly schemaVersion:
    typeof FACE_TOPIC_EXECUTION_RESULT_RECEIPT_SCHEMA_VERSION;
  readonly executionPlanHash: string;
  readonly requestId: string;
  readonly authoritySnapshotId: string;
  readonly observationArtifactRef: string;
  readonly executionKind: FaceTopicExecutionKind;
  readonly faceEngineVersion: string;
  readonly faceReadingRef?: string;
  readonly methodologyPackRefs: readonly string[];
  readonly bindingGroupRefs: readonly string[];
  readonly observations: readonly FaceObservationResultUnitV1[];
  readonly semanticClaims: readonly FaceSemanticClaimResultUnitV1[];
  readonly approvedNarrativeBlocks:
    readonly FaceNarrativeBlockResultUnitV1[];
  readonly unavailableSections: readonly string[];
  readonly prohibitedInferences: readonly string[];
  readonly provenanceRefs: readonly string[];
}

export interface FaceTopicAdmittedExecutionResultV1 {
  readonly schemaVersion:
    typeof FACE_TOPIC_ADMITTED_RESULT_SCHEMA_VERSION;
  readonly executionPlanHash: string;
  readonly authoritySnapshotId: string;
  readonly observationArtifactRef: string;
  readonly executionKind: FaceTopicExecutionKind;
  readonly faceEngineVersion: string;
  readonly faceReadingRef?: string;
  readonly methodologyPackRefs: readonly string[];
  readonly bindingGroupRefs: readonly string[];
  readonly observations: readonly FaceObservationResultUnitV1[];
  readonly semanticClaims: readonly FaceSemanticClaimResultUnitV1[];
  readonly approvedNarrativeBlocks:
    readonly FaceNarrativeBlockResultUnitV1[];
  readonly unavailableSections: readonly string[];
  readonly prohibitedInferences: readonly string[];
  readonly provenanceRefs: readonly string[];
  readonly sourceResultHash: string;
}

const RECEIPT_KEYS = new Set([
  'schemaVersion',
  'executionPlanHash',
  'requestId',
  'authoritySnapshotId',
  'observationArtifactRef',
  'executionKind',
  'faceEngineVersion',
  'faceReadingRef',
  'methodologyPackRefs',
  'bindingGroupRefs',
  'observations',
  'semanticClaims',
  'approvedNarrativeBlocks',
  'unavailableSections',
  'prohibitedInferences',
  'provenanceRefs',
]);

const OBSERVATION_KEYS = new Set([
  'kind',
  'capabilityKey',
  'observationRef',
  'qualifiers',
  'provenanceRefs',
]);

const CLAIM_KEYS = new Set([
  'kind',
  'claimFamily',
  'claimRef',
  'methodologyRef',
  'inferenceKeys',
  'qualifiers',
  'provenanceRefs',
]);

const NARRATIVE_KEYS = new Set([
  'blockRef',
  'sourceRefs',
  'text',
  'realizationPolicy',
  'prohibitedExtensions',
]);

const FORBIDDEN_PRIVACY_KEY_FRAGMENTS = Object.freeze([
  'rawimage',
  'raworiginalphoto',
  'rawjpeg',
  'rawlandmark',
  'mediapipe',
  'posematrix',
  'faceembedding',
  'identitytemplate',
  'highresolutioncrop',
  'hirescrop',
]);

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

function assertNoPrivacyForbiddenFields(
  value: unknown,
): void {
  if (Array.isArray(value)) {
    for (const entry of value) {
      assertNoPrivacyForbiddenFields(entry);
    }
    return;
  }
  if (value === null || typeof value !== 'object') {
    return;
  }

  for (const [key, child] of Object.entries(value)) {
    const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/gu, '');
    if (
      FORBIDDEN_PRIVACY_KEY_FRAGMENTS.some((fragment) =>
        normalizedKey.includes(fragment),
      )
    ) {
      throw new Error(
        `FACE_TOPIC_RESULT_PRIVACY_SCOPE_VIOLATION:${key}`,
      );
    }
    assertNoPrivacyForbiddenFields(child);
  }
}

function sortedUnique(values: readonly string[]): readonly string[] {
  return Object.freeze([...new Set(values)].sort());
}

function assertNonEmpty(value: string, code: string): void {
  if (value.trim().length === 0) {
    throw new Error(code);
  }
}

function normalizeObservation(
  unit: FaceObservationResultUnitV1,
): FaceObservationResultUnitV1 {
  assertExactKeys(
    unit,
    OBSERVATION_KEYS,
    'FACE_TOPIC_RESULT_OBSERVATION_SCOPE_VIOLATION',
  );
  if (unit.kind !== 'neutral_observation') {
    throw new Error('FACE_TOPIC_RESULT_OBSERVATION_KIND_INVALID');
  }
  assertNonEmpty(
    unit.capabilityKey,
    'FACE_TOPIC_RESULT_OBSERVATION_CAPABILITY_MISSING',
  );
  assertNonEmpty(
    unit.observationRef,
    'FACE_TOPIC_RESULT_OBSERVATION_REF_MISSING',
  );
  return Object.freeze({
    kind: unit.kind,
    capabilityKey: unit.capabilityKey,
    observationRef: unit.observationRef,
    qualifiers: sortedUnique(unit.qualifiers),
    provenanceRefs: sortedUnique(unit.provenanceRefs),
  });
}

function normalizeClaim(
  unit: FaceSemanticClaimResultUnitV1,
): FaceSemanticClaimResultUnitV1 {
  assertExactKeys(
    unit,
    CLAIM_KEYS,
    'FACE_TOPIC_RESULT_CLAIM_SCOPE_VIOLATION',
  );
  if (unit.kind !== 'traditional_claim') {
    throw new Error('FACE_TOPIC_RESULT_CLAIM_KIND_INVALID');
  }
  assertNonEmpty(
    unit.claimFamily,
    'FACE_TOPIC_RESULT_CLAIM_FAMILY_MISSING',
  );
  assertNonEmpty(
    unit.claimRef,
    'FACE_TOPIC_RESULT_CLAIM_REF_MISSING',
  );
  assertNonEmpty(
    unit.methodologyRef,
    'FACE_TOPIC_RESULT_CLAIM_METHODOLOGY_MISSING',
  );
  return Object.freeze({
    kind: unit.kind,
    claimFamily: unit.claimFamily,
    claimRef: unit.claimRef,
    methodologyRef: unit.methodologyRef,
    inferenceKeys: sortedUnique(unit.inferenceKeys),
    qualifiers: sortedUnique(unit.qualifiers),
    provenanceRefs: sortedUnique(unit.provenanceRefs),
  });
}

function normalizeNarrative(
  unit: FaceNarrativeBlockResultUnitV1,
): FaceNarrativeBlockResultUnitV1 {
  assertExactKeys(
    unit,
    NARRATIVE_KEYS,
    'FACE_TOPIC_RESULT_NARRATIVE_SCOPE_VIOLATION',
  );
  assertNonEmpty(
    unit.blockRef,
    'FACE_TOPIC_RESULT_NARRATIVE_REF_MISSING',
  );
  if (
    unit.text.trim().length === 0 ||
    unit.sourceRefs.length === 0 ||
    (
      unit.realizationPolicy !== 'protected_verbatim' &&
      unit.realizationPolicy !== 'bounded_paraphrase'
    )
  ) {
    throw new Error('FACE_TOPIC_RESULT_NARRATIVE_INVALID');
  }
  return Object.freeze({
    blockRef: unit.blockRef,
    sourceRefs: sortedUnique(unit.sourceRefs),
    text: unit.text,
    realizationPolicy: unit.realizationPolicy,
    prohibitedExtensions: sortedUnique(
      unit.prohibitedExtensions,
    ),
  });
}

function assertRequiredCoverage(
  plan: FaceTopicAuthorizedExecutionPlan,
  receipt: FaceTopicExecutionResultReceiptV1,
): void {
  const observedCapabilities = new Set(
    receipt.observations.map((unit) => unit.capabilityKey),
  );
  for (const capability of plan.requiredObservationCapabilities) {
    if (!observedCapabilities.has(capability)) {
      throw new Error(
        `FACE_TOPIC_RESULT_REQUIRED_OBSERVATION_MISSING:${capability}`,
      );
    }
  }

  const methodologies = new Set(receipt.methodologyPackRefs);
  for (const methodologyRef of plan.requiredMethodologyRefs) {
    if (!methodologies.has(methodologyRef)) {
      throw new Error(
        `FACE_TOPIC_RESULT_REQUIRED_METHODOLOGY_MISSING:${methodologyRef}`,
      );
    }
  }

  const bindingGroups = new Set(receipt.bindingGroupRefs);
  for (const bindingGroupRef of plan.bindingGroupRefs) {
    if (!bindingGroups.has(bindingGroupRef)) {
      throw new Error(
        `FACE_TOPIC_RESULT_REQUIRED_BINDING_GROUP_MISSING:${bindingGroupRef}`,
      );
    }
  }

  for (const claimFamily of plan.requiredSemanticClaimFamilies) {
    const supported = receipt.semanticClaims.some(
      (claim) =>
        claim.claimFamily === claimFamily &&
        plan.methodologyRefs.includes(claim.methodologyRef),
    );
    if (!supported) {
      throw new Error(
        `FACE_TOPIC_RESULT_REQUIRED_CLAIM_FAMILY_MISSING:${claimFamily}`,
      );
    }
  }
}

function assertResultAuthorityBoundary(
  plan: FaceTopicAuthorizedExecutionPlan,
  receipt: FaceTopicExecutionResultReceiptV1,
): void {
  if (
    plan.executionKind === 'neutral_observation_projection' &&
    (
      receipt.semanticClaims.length > 0 ||
      receipt.methodologyPackRefs.length > 0 ||
      receipt.bindingGroupRefs.length > 0 ||
      receipt.faceReadingRef !== undefined
    )
  ) {
    throw new Error(
      'FACE_TOPIC_RESULT_NEUTRAL_TRADITIONAL_PROMOTION_REJECTED',
    );
  }

  const prohibited = new Set(plan.prohibitedInferenceKeys);
  for (const inference of plan.prohibitedInferenceKeys) {
    if (!receipt.prohibitedInferences.includes(inference)) {
      throw new Error(
        `FACE_TOPIC_RESULT_PROHIBITION_TAMPERED:${inference}`,
      );
    }
  }

  for (const claim of receipt.semanticClaims) {
    for (const inference of claim.inferenceKeys) {
      if (prohibited.has(inference)) {
        throw new Error(
          `FACE_TOPIC_RESULT_PROHIBITED_INFERENCE:${inference}`,
        );
      }
    }
  }

  for (const unavailable of plan.unavailableOptionalRequirements) {
    if (!unavailable.startsWith('observation:')) {
      continue;
    }
    const capability = unavailable.slice('observation:'.length);
    if (
      receipt.observations.some(
        (unit) => unit.capabilityKey === capability,
      )
    ) {
      throw new Error(
        `FACE_TOPIC_RESULT_CONTRADICTS_PLAN_UNAVAILABLE:${unavailable}`,
      );
    }
  }
}

export function admitFaceTopicExecutionResult(
  plan: FaceTopicExecutionPlan,
  receipt: FaceTopicExecutionResultReceiptV1,
): FaceTopicAdmittedExecutionResultV1 {
  if (!plan.authorized) {
    throw new Error('FACE_TOPIC_RESULT_BLOCKED_PLAN_REJECTED');
  }
  assertFaceTopicAuthorizedExecutionPlan(plan);
  assertNoPrivacyForbiddenFields(receipt);
  assertExactKeys(
    receipt,
    RECEIPT_KEYS,
    'FACE_TOPIC_RESULT_RECEIPT_SCOPE_VIOLATION',
  );

  if (
    receipt.schemaVersion !==
      FACE_TOPIC_EXECUTION_RESULT_RECEIPT_SCHEMA_VERSION ||
    receipt.executionPlanHash !== plan.executionPlanHash ||
    receipt.requestId !== plan.requestId ||
    receipt.authoritySnapshotId !== plan.authoritySnapshotId ||
    receipt.observationArtifactRef !== plan.observationArtifactRef ||
    receipt.executionKind !== plan.executionKind
  ) {
    throw new Error('FACE_TOPIC_RESULT_PLAN_BINDING_MISMATCH');
  }
  assertNonEmpty(
    receipt.faceEngineVersion,
    'FACE_TOPIC_RESULT_ENGINE_VERSION_MISSING',
  );

  const observations = Object.freeze(
    receipt.observations
      .map(normalizeObservation)
      .sort((left, right) =>
        left.observationRef.localeCompare(right.observationRef),
      ),
  );
  const semanticClaims = Object.freeze(
    receipt.semanticClaims
      .map(normalizeClaim)
      .sort((left, right) =>
        left.claimRef.localeCompare(right.claimRef),
      ),
  );
  const approvedNarrativeBlocks = Object.freeze(
    receipt.approvedNarrativeBlocks
      .map(normalizeNarrative)
      .sort((left, right) =>
        left.blockRef.localeCompare(right.blockRef),
      ),
  );

  const sourceRefs = [
    ...observations.map((unit) => unit.observationRef),
    ...semanticClaims.map((unit) => unit.claimRef),
  ];
  if (new Set(sourceRefs).size !== sourceRefs.length) {
    throw new Error('FACE_TOPIC_RESULT_DUPLICATE_SOURCE_REF');
  }
  if (
    new Set(approvedNarrativeBlocks.map((unit) => unit.blockRef))
      .size !== approvedNarrativeBlocks.length
  ) {
    throw new Error('FACE_TOPIC_RESULT_DUPLICATE_NARRATIVE_REF');
  }

  const sourceRefSet = new Set(sourceRefs);
  for (const block of approvedNarrativeBlocks) {
    for (const sourceRef of block.sourceRefs) {
      if (!sourceRefSet.has(sourceRef)) {
        throw new Error(
          `FACE_TOPIC_RESULT_NARRATIVE_SOURCE_MISSING:${sourceRef}`,
        );
      }
    }
  }

  const normalizedReceipt: FaceTopicExecutionResultReceiptV1 =
    Object.freeze({
      schemaVersion: receipt.schemaVersion,
      executionPlanHash: receipt.executionPlanHash,
      requestId: receipt.requestId,
      authoritySnapshotId: receipt.authoritySnapshotId,
      observationArtifactRef: receipt.observationArtifactRef,
      executionKind: receipt.executionKind,
      faceEngineVersion: receipt.faceEngineVersion,
      ...(receipt.faceReadingRef === undefined
        ? {}
        : { faceReadingRef: receipt.faceReadingRef }),
      methodologyPackRefs: sortedUnique(
        receipt.methodologyPackRefs,
      ),
      bindingGroupRefs: sortedUnique(receipt.bindingGroupRefs),
      observations,
      semanticClaims,
      approvedNarrativeBlocks,
      unavailableSections: sortedUnique(
        receipt.unavailableSections,
      ),
      prohibitedInferences: sortedUnique(
        receipt.prohibitedInferences,
      ),
      provenanceRefs: sortedUnique(receipt.provenanceRefs),
    });

  assertRequiredCoverage(plan, normalizedReceipt);
  assertResultAuthorityBoundary(plan, normalizedReceipt);

  const {
    requestId: _requestId,
    ...sourceIdentity
  } = normalizedReceipt;
  const sourceResultHash =
    `face-topic-source-result:${deterministicContentHash(
      sourceIdentity,
    )}`;

  return Object.freeze({
    schemaVersion: FACE_TOPIC_ADMITTED_RESULT_SCHEMA_VERSION,
    executionPlanHash: normalizedReceipt.executionPlanHash,
    authoritySnapshotId: normalizedReceipt.authoritySnapshotId,
    observationArtifactRef:
      normalizedReceipt.observationArtifactRef,
    executionKind: normalizedReceipt.executionKind,
    faceEngineVersion: normalizedReceipt.faceEngineVersion,
    ...(normalizedReceipt.faceReadingRef === undefined
      ? {}
      : { faceReadingRef: normalizedReceipt.faceReadingRef }),
    methodologyPackRefs: normalizedReceipt.methodologyPackRefs,
    bindingGroupRefs: normalizedReceipt.bindingGroupRefs,
    observations: normalizedReceipt.observations,
    semanticClaims: normalizedReceipt.semanticClaims,
    approvedNarrativeBlocks:
      normalizedReceipt.approvedNarrativeBlocks,
    unavailableSections: normalizedReceipt.unavailableSections,
    prohibitedInferences:
      normalizedReceipt.prohibitedInferences,
    provenanceRefs: normalizedReceipt.provenanceRefs,
    sourceResultHash,
  });
}
