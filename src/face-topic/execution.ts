import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  FaceAuthorityCoverageSnapshot,
  FaceTopicDefinitionRef,
  FaceTopicReadinessResult,
} from './contracts.js';
import {
  createFaceTopicDefinitionRef,
  getFaceTopicDefinition,
} from './registry.js';
import { resolveFaceTopicReadiness } from './readiness.js';

export const FACE_TOPIC_EXECUTION_PLAN_SCHEMA_VERSION =
  'face-topic-execution-plan-v1' as const;

export interface FaceTopicExecutionInput {
  readonly topicKey: string;
  readonly observationArtifactRef: string;
  readonly requestId: string;
}

export type FaceTopicExecutionKind =
  | 'neutral_observation_projection'
  | 'traditional_face_reading';

export interface FaceTopicAuthorizedExecutionPlan {
  readonly schemaVersion:
    typeof FACE_TOPIC_EXECUTION_PLAN_SCHEMA_VERSION;
  readonly authorized: true;
  readonly requestId: string;
  readonly topicKey: string;
  readonly topicDefinitionRef: FaceTopicDefinitionRef;
  readonly authoritySnapshotId: string;
  readonly observationArtifactRef: string;
  readonly executionKind: FaceTopicExecutionKind;
  readonly readinessState: 'available' | 'partial';
  readonly requiredObservationCapabilities: readonly string[];
  readonly optionalObservationCapabilities: readonly string[];
  readonly requiredMethodologyRefs: readonly string[];
  readonly optionalMethodologyRefs: readonly string[];
  readonly methodologyRefs: readonly string[];
  readonly requiredSemanticClaimFamilies: readonly string[];
  readonly optionalSemanticClaimFamilies: readonly string[];
  readonly semanticClaimFamilies: readonly string[];
  readonly bindingGroupRefs: readonly string[];
  readonly requestedInferenceKeys: readonly string[];
  readonly prohibitedInferenceKeys: readonly string[];
  readonly unavailableOptionalRequirements: readonly string[];
  readonly provenanceRefs: readonly string[];
  readonly executionPlanHash: string;
}

export interface FaceTopicBlockedExecutionPlan {
  readonly authorized: false;
  readonly requestId: string;
  readonly topicKey: string;
  readonly readiness: FaceTopicReadinessResult;
}

export type FaceTopicExecutionPlan =
  | FaceTopicAuthorizedExecutionPlan
  | FaceTopicBlockedExecutionPlan;

const EXECUTION_INPUT_KEYS = new Set([
  'topicKey',
  'observationArtifactRef',
  'requestId',
]);

function assertExecutionInput(
  input: FaceTopicExecutionInput,
): void {
  for (const key of Object.keys(input)) {
    if (!EXECUTION_INPUT_KEYS.has(key)) {
      throw new Error(
        `FACE_TOPIC_EXECUTION_INPUT_SCOPE_VIOLATION:${key}`,
      );
    }
  }
  if (
    input.topicKey.trim().length === 0 ||
    input.observationArtifactRef.trim().length === 0 ||
    input.requestId.trim().length === 0
  ) {
    throw new Error('FACE_TOPIC_EXECUTION_INPUT_INVALID');
  }
}

function sortedUnique(values: readonly string[]): readonly string[] {
  return Object.freeze([...new Set(values)].sort());
}

function executionPlanIdentity(
  plan: Omit<
    FaceTopicAuthorizedExecutionPlan,
    'requestId' | 'executionPlanHash'
  >,
): object {
  return {
    schemaVersion: plan.schemaVersion,
    topicKey: plan.topicKey,
    topicDefinitionRef: plan.topicDefinitionRef,
    authoritySnapshotId: plan.authoritySnapshotId,
    observationArtifactRef: plan.observationArtifactRef,
    executionKind: plan.executionKind,
    readinessState: plan.readinessState,
    requiredObservationCapabilities:
      plan.requiredObservationCapabilities,
    optionalObservationCapabilities:
      plan.optionalObservationCapabilities,
    requiredMethodologyRefs: plan.requiredMethodologyRefs,
    optionalMethodologyRefs: plan.optionalMethodologyRefs,
    methodologyRefs: plan.methodologyRefs,
    requiredSemanticClaimFamilies:
      plan.requiredSemanticClaimFamilies,
    optionalSemanticClaimFamilies:
      plan.optionalSemanticClaimFamilies,
    semanticClaimFamilies: plan.semanticClaimFamilies,
    bindingGroupRefs: plan.bindingGroupRefs,
    requestedInferenceKeys: plan.requestedInferenceKeys,
    prohibitedInferenceKeys: plan.prohibitedInferenceKeys,
    unavailableOptionalRequirements:
      plan.unavailableOptionalRequirements,
    provenanceRefs: plan.provenanceRefs,
  };
}

export function assertFaceTopicAuthorizedExecutionPlan(
  plan: FaceTopicAuthorizedExecutionPlan,
): void {
  if (
    plan.schemaVersion !== FACE_TOPIC_EXECUTION_PLAN_SCHEMA_VERSION ||
    plan.executionPlanHash.trim().length === 0
  ) {
    throw new Error('FACE_TOPIC_EXECUTION_PLAN_INVALID');
  }

  const { requestId: _requestId, executionPlanHash, ...identity } =
    plan;
  const expected =
    `face-topic-execution-plan:${deterministicContentHash(
      executionPlanIdentity(identity),
    )}`;

  if (executionPlanHash !== expected) {
    throw new Error('FACE_TOPIC_EXECUTION_PLAN_HASH_MISMATCH');
  }
}

export function planFaceTopicExecution(
  input: FaceTopicExecutionInput,
  snapshot: FaceAuthorityCoverageSnapshot,
): FaceTopicExecutionPlan {
  assertExecutionInput(input);

  const readiness = resolveFaceTopicReadiness(
    input.topicKey,
    snapshot,
  );

  if (readiness.state === 'blocked') {
    return Object.freeze({
      authorized: false as const,
      requestId: input.requestId,
      topicKey: input.topicKey,
      readiness,
    });
  }

  const definition = getFaceTopicDefinition(input.topicKey);
  if (definition === undefined) {
    throw new Error(
      'FACE_TOPIC_EXECUTION_REGISTRY_READINESS_INVARIANT_BROKEN',
    );
  }

  const executionKind: FaceTopicExecutionKind =
    definition.readingMode === 'neutral_observation'
      ? 'neutral_observation_projection'
      : 'traditional_face_reading';

  const identity = Object.freeze({
    schemaVersion: FACE_TOPIC_EXECUTION_PLAN_SCHEMA_VERSION,
    authorized: true as const,
    topicKey: definition.topicKey,
    topicDefinitionRef: createFaceTopicDefinitionRef(definition),
    authoritySnapshotId: snapshot.snapshotId,
    observationArtifactRef: input.observationArtifactRef,
    executionKind,
    readinessState: readiness.state,
    requiredObservationCapabilities: Object.freeze([
      ...definition.requirements.requiredObservationCapabilities,
    ]),
    optionalObservationCapabilities: Object.freeze([
      ...definition.requirements.optionalObservationCapabilities,
    ]),
    requiredMethodologyRefs: Object.freeze([
      ...definition.requirements.requiredMethodologyRefs,
    ]),
    optionalMethodologyRefs: Object.freeze([
      ...definition.requirements.optionalMethodologyRefs,
    ]),
    methodologyRefs: Object.freeze([
      ...definition.requirements.requiredMethodologyRefs,
      ...definition.requirements.optionalMethodologyRefs,
    ]),
    requiredSemanticClaimFamilies: Object.freeze([
      ...definition.requirements.requiredSemanticClaimFamilies,
    ]),
    optionalSemanticClaimFamilies: Object.freeze([
      ...definition.requirements.optionalSemanticClaimFamilies,
    ]),
    semanticClaimFamilies: Object.freeze([
      ...definition.requirements.requiredSemanticClaimFamilies,
      ...definition.requirements.optionalSemanticClaimFamilies,
    ]),
    bindingGroupRefs: Object.freeze(
      definition.requirements.requiredBindingGroups.map(
        (requirement) => requirement.bindingGroupRef,
      ),
    ),
    requestedInferenceKeys: Object.freeze([
      ...definition.requirements.requestedInferenceKeys,
    ]),
    prohibitedInferenceKeys: sortedUnique([
      ...snapshot.prohibitedInferenceKeys,
      ...definition.requirements.prohibitedInferenceKeys,
    ]),
    unavailableOptionalRequirements: Object.freeze([
      ...readiness.missingOptionalRequirements,
    ]),
    provenanceRefs: Object.freeze([
      ...readiness.provenanceRefs,
    ]),
  });

  const executionPlanHash =
    `face-topic-execution-plan:${deterministicContentHash(
      executionPlanIdentity(identity),
    )}`;

  const plan: FaceTopicAuthorizedExecutionPlan = Object.freeze({
    ...identity,
    requestId: input.requestId,
    executionPlanHash,
  });

  assertFaceTopicAuthorizedExecutionPlan(plan);
  return plan;
}
