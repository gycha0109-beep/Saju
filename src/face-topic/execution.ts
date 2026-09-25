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

export interface FaceTopicExecutionInput {
  readonly topicKey: string;
  readonly observationArtifactRef: string;
  readonly requestId: string;
}

export type FaceTopicExecutionKind =
  | 'neutral_observation_projection'
  | 'traditional_face_reading';

export interface FaceTopicAuthorizedExecutionPlan {
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
  readonly methodologyRefs: readonly string[];
  readonly semanticClaimFamilies: readonly string[];
  readonly bindingGroupRefs: readonly string[];
  readonly requestedInferenceKeys: readonly string[];
  readonly unavailableOptionalRequirements: readonly string[];
  readonly provenanceRefs: readonly string[];
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

  return Object.freeze({
    authorized: true as const,
    requestId: input.requestId,
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
    methodologyRefs: Object.freeze([
      ...definition.requirements.requiredMethodologyRefs,
      ...definition.requirements.optionalMethodologyRefs,
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
    unavailableOptionalRequirements: Object.freeze([
      ...readiness.missingOptionalRequirements,
    ]),
    provenanceRefs: Object.freeze([
      ...readiness.provenanceRefs,
    ]),
  });
}
