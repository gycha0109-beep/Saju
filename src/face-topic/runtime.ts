import type {
  FaceTopicAuthoritySourceReceipt,
} from './authority.js';
import {
  buildFaceAuthorityCoverageSnapshot,
} from './authority.js';
import type {
  FaceTopicAuthorizedExecutionPlan,
} from './execution.js';
import {
  planFaceTopicExecution,
} from './execution.js';
import {
  buildFaceLiveReaderPipeline,
  type FaceLiveReaderPipelineV1,
} from './live-fr293-reader.js';
import type {
  FaceReaderDeliveryV1,
} from './reader.js';
import type {
  FaceTopicReadinessResult,
} from './contracts.js';

export const FACE_TOPIC_RUNTIME_RESULT_SCHEMA_VERSION =
  'face-topic-runtime-result-v1' as const;

export const FACE_TOPIC_RUNTIME_ENGINE_REQUEST_SCHEMA_VERSION =
  'face-topic-runtime-engine-request-v1' as const;

export interface FaceTopicRuntimeRequestV1 {
  readonly topicKey: string;
  readonly observationArtifactRef: string;
  readonly requestId: string;
}

export interface FaceTopicRuntimeEngineRequestV1 {
  readonly schemaVersion:
    typeof FACE_TOPIC_RUNTIME_ENGINE_REQUEST_SCHEMA_VERSION;
  readonly requestId: string;
  readonly topicKey: string;
  readonly observationArtifactRef: string;
  readonly authoritySnapshotId: string;
  readonly faceEngineVersion: string;
  readonly methodologyPackRefs: readonly string[];
  readonly prohibitedInferences: readonly string[];
  readonly executionPlanHash: string;
}

export interface FaceTopicRuntimeAuthorityProviderV1 {
  loadAuthorityReceipt(): Promise<FaceTopicAuthoritySourceReceipt>;
}

export interface FaceTopicRuntimeEngineProviderV1 {
  loadProductDisplayReceipt(
    request: FaceTopicRuntimeEngineRequestV1,
  ): Promise<unknown>;
}

export interface FaceTopicRuntimeDependenciesV1 {
  readonly authorityProvider:
    FaceTopicRuntimeAuthorityProviderV1;
  readonly engineProvider:
    FaceTopicRuntimeEngineProviderV1;
}

export interface FaceTopicRuntimeSuccessResultV1 {
  readonly schemaVersion:
    typeof FACE_TOPIC_RUNTIME_RESULT_SCHEMA_VERSION;
  readonly state: 'ready' | 'partial';
  readonly requestId: string;
  readonly topicKey: string;
  readonly observationArtifactRef: string;
  readonly authoritySnapshotId: string;
  readonly executionPlanHash: string;
  readonly sourceResultHash: string;
  readonly projectionHash: string;
  readonly groundingHash: string;
  readonly displayFactsHash: string;
  readonly readerDeliveryHash: string;
  readonly readerDelivery: FaceReaderDeliveryV1;
}

export interface FaceTopicRuntimeBlockedResultV1 {
  readonly schemaVersion:
    typeof FACE_TOPIC_RUNTIME_RESULT_SCHEMA_VERSION;
  readonly state: 'blocked';
  readonly requestId: string;
  readonly topicKey: string;
  readonly authoritySnapshotId: string;
  readonly readiness: FaceTopicReadinessResult;
}

export type FaceTopicRuntimeFailureStage =
  | 'request'
  | 'authority'
  | 'planning'
  | 'engine'
  | 'admission';

export interface FaceTopicRuntimeFailedResultV1 {
  readonly schemaVersion:
    typeof FACE_TOPIC_RUNTIME_RESULT_SCHEMA_VERSION;
  readonly state: 'failed';
  readonly requestId: string;
  readonly topicKey: string;
  readonly stage: FaceTopicRuntimeFailureStage;
  readonly errorCode: string;
}

export type FaceTopicRuntimeResultV1 =
  | FaceTopicRuntimeSuccessResultV1
  | FaceTopicRuntimeBlockedResultV1
  | FaceTopicRuntimeFailedResultV1;

export interface FaceTopicRuntimeHostV1 {
  execute(
    request: FaceTopicRuntimeRequestV1,
  ): Promise<FaceTopicRuntimeResultV1>;
}

const REQUEST_KEYS = new Set([
  'topicKey',
  'observationArtifactRef',
  'requestId',
]);

function runtimeFailure(
  request: Partial<FaceTopicRuntimeRequestV1>,
  stage: FaceTopicRuntimeFailureStage,
  errorCode: string,
): FaceTopicRuntimeFailedResultV1 {
  return Object.freeze({
    schemaVersion:
      FACE_TOPIC_RUNTIME_RESULT_SCHEMA_VERSION,
    state: 'failed' as const,
    requestId:
      typeof request.requestId === 'string'
        ? request.requestId
        : '',
    topicKey:
      typeof request.topicKey === 'string'
        ? request.topicKey
        : '',
    stage,
    errorCode,
  });
}

function validateRuntimeRequest(
  value: unknown,
): FaceTopicRuntimeRequestV1 | FaceTopicRuntimeFailedResultV1 {
  if (
    value === null ||
    typeof value !== 'object' ||
    Array.isArray(value)
  ) {
    return runtimeFailure(
      {},
      'request',
      'FACE_TOPIC_RUNTIME_REQUEST_INVALID',
    );
  }

  const record = value as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    if (!REQUEST_KEYS.has(key)) {
      return runtimeFailure(
        record as Partial<FaceTopicRuntimeRequestV1>,
        'request',
        'FACE_TOPIC_RUNTIME_REQUEST_SCOPE_VIOLATION',
      );
    }
  }

  if (
    typeof record.topicKey !== 'string' ||
    record.topicKey.trim().length === 0 ||
    typeof record.observationArtifactRef !== 'string' ||
    record.observationArtifactRef.trim().length === 0 ||
    typeof record.requestId !== 'string' ||
    record.requestId.trim().length === 0
  ) {
    return runtimeFailure(
      record as Partial<FaceTopicRuntimeRequestV1>,
      'request',
      'FACE_TOPIC_RUNTIME_REQUEST_INVALID',
    );
  }

  return Object.freeze({
    topicKey: record.topicKey,
    observationArtifactRef:
      record.observationArtifactRef,
    requestId: record.requestId,
  });
}

function safeErrorCode(
  error: unknown,
  fallback: string,
): string {
  if (!(error instanceof Error)) {
    return fallback;
  }
  const [candidate] = error.message.split(':', 1);
  if (
    candidate !== undefined &&
    /^[A-Z][A-Z0-9_]*$/u.test(candidate)
  ) {
    return candidate;
  }
  return fallback;
}

function successResult(
  plan: FaceTopicAuthorizedExecutionPlan,
  pipeline: FaceLiveReaderPipelineV1,
): FaceTopicRuntimeSuccessResultV1 {
  return Object.freeze({
    schemaVersion:
      FACE_TOPIC_RUNTIME_RESULT_SCHEMA_VERSION,
    state:
      plan.readinessState === 'partial'
        ? 'partial'
        : 'ready',
    requestId: plan.requestId,
    topicKey: plan.topicKey,
    observationArtifactRef:
      plan.observationArtifactRef,
    authoritySnapshotId:
      plan.authoritySnapshotId,
    faceEngineVersion:
      pipeline.executionResult.faceEngineVersion,
    methodologyPackRefs:
      pipeline.executionResult.methodologyPackRefs,
    prohibitedInferences:
      pipeline.projection.grounding.prohibitedInferences,
    executionPlanHash:
      plan.executionPlanHash,
    sourceResultHash:
      pipeline.executionResult.sourceResultHash,
    projectionHash:
      pipeline.projection.projectionHash,
    groundingHash:
      pipeline.projection.grounding.groundingHash,
    displayFactsHash:
      pipeline.displayFacts.displayFactsHash,
    readerDeliveryHash:
      pipeline.readerDelivery.readerDeliveryHash,
    readerDelivery:
      pipeline.readerDelivery,
  });
}

export async function executeFaceTopicRuntime(
  input: unknown,
  dependencies: FaceTopicRuntimeDependenciesV1,
): Promise<FaceTopicRuntimeResultV1> {
  const request = validateRuntimeRequest(input);
  if ('state' in request) {
    return request;
  }

  let authorityReceipt: FaceTopicAuthoritySourceReceipt;
  try {
    authorityReceipt =
      await dependencies.authorityProvider.loadAuthorityReceipt();
  } catch {
    return runtimeFailure(
      request,
      'authority',
      'FACE_TOPIC_RUNTIME_AUTHORITY_PROVIDER_FAILED',
    );
  }

  let snapshot;
  try {
    snapshot =
      buildFaceAuthorityCoverageSnapshot(
        authorityReceipt,
      );
  } catch (error) {
    return runtimeFailure(
      request,
      'authority',
      safeErrorCode(
        error,
        'FACE_TOPIC_RUNTIME_AUTHORITY_ADMISSION_FAILED',
      ),
    );
  }

  let plan;
  try {
    plan = planFaceTopicExecution(
      request,
      snapshot,
    );
  } catch (error) {
    return runtimeFailure(
      request,
      'planning',
      safeErrorCode(
        error,
        'FACE_TOPIC_RUNTIME_PLANNING_FAILED',
      ),
    );
  }

  if (!plan.authorized) {
    return Object.freeze({
      schemaVersion:
        FACE_TOPIC_RUNTIME_RESULT_SCHEMA_VERSION,
      state: 'blocked' as const,
      requestId: plan.requestId,
      topicKey: plan.topicKey,
      authoritySnapshotId:
        plan.readiness.evaluatedAgainstSnapshotId,
      readiness: plan.readiness,
    });
  }

  if (
    plan.executionKind !==
    'neutral_observation_projection'
  ) {
    return runtimeFailure(
      request,
      'planning',
      'FACE_TOPIC_RUNTIME_EXECUTION_KIND_UNSUPPORTED',
    );
  }

  let engineReceipt: unknown;
  try {
    engineReceipt =
      await dependencies.engineProvider.loadProductDisplayReceipt(
        Object.freeze({
          schemaVersion:
            FACE_TOPIC_RUNTIME_ENGINE_REQUEST_SCHEMA_VERSION,
          requestId: plan.requestId,
          topicKey: plan.topicKey,
          observationArtifactRef:
            plan.observationArtifactRef,
          authoritySnapshotId:
            plan.authoritySnapshotId,
          executionPlanHash:
            plan.executionPlanHash,
        }),
      );
  } catch {
    return runtimeFailure(
      request,
      'engine',
      'FACE_TOPIC_RUNTIME_ENGINE_PROVIDER_FAILED',
    );
  }

  try {
    return successResult(
      plan,
      buildFaceLiveReaderPipeline(
        plan,
        engineReceipt,
      ),
    );
  } catch (error) {
    return runtimeFailure(
      request,
      'admission',
      safeErrorCode(
        error,
        'FACE_TOPIC_RUNTIME_RESULT_ADMISSION_FAILED',
      ),
    );
  }
}

export function createFaceTopicRuntimeHost(
  dependencies: FaceTopicRuntimeDependenciesV1,
): FaceTopicRuntimeHostV1 {
  return Object.freeze({
    execute: (
      request: FaceTopicRuntimeRequestV1,
    ) => executeFaceTopicRuntime(
      request,
      dependencies,
    ),
  });
}
