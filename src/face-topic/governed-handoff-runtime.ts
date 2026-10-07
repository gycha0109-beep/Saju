import {
  buildFaceAuthorityCoverageSnapshot,
  type FaceTopicAuthoritySourceReceipt,
} from './authority.js';
import {
  planFaceTopicExecution,
  type FaceTopicAuthorizedExecutionPlan,
} from './execution.js';
import type {
  FaceGovernedInterpretationHandoffV1,
} from './governed-interpretation-handoff.js';
import {
  buildFaceGovernedCharacterGroundingV1,
  type FaceGovernedCharacterGroundingBundleV1,
  type FaceGovernedCharacterGroundingDecisionV1,
  type FaceGovernedCharacterGroundingRefV1,
} from './governed-character-grounding.js';
import type {
  FaceTopicExecutionResultReceiptV1,
} from './result-receipt.js';

export const FACE_GOVERNED_HANDOFF_RUNTIME_SCHEMA_VERSION_V1 =
  'face-governed-handoff-runtime-v1' as const;

export const FACE_GOVERNED_HANDOFF_ENGINE_REQUEST_SCHEMA_VERSION_V1 =
  'face-governed-handoff-engine-request-v1' as const;

export interface FaceGovernedHandoffRuntimeRequestV1 {
  readonly topicKey: string;
  readonly observationArtifactRef: string;
  readonly requestId: string;
}

export interface FaceGovernedHandoffEngineRequestV1 {
  readonly schemaVersion:
    typeof FACE_GOVERNED_HANDOFF_ENGINE_REQUEST_SCHEMA_VERSION_V1;
  readonly requestId: string;
  readonly topicKey: string;
  readonly observationArtifactRef: string;
  readonly authoritySnapshotId: string;
  readonly executionPlanHash: string;
}

export interface FaceGovernedHandoffRuntimeDependenciesV1 {
  readonly authorityProvider: {
    loadAuthorityReceipt(): Promise<FaceTopicAuthoritySourceReceipt>;
  };
  readonly traditionalResultProvider: {
    loadExecutionResultReceipt(
      request: FaceGovernedHandoffEngineRequestV1,
    ): Promise<unknown>;
  };
}

export interface FaceGovernedHandoffEligibleRuntimeResultV1 {
  readonly schemaVersion:
    typeof FACE_GOVERNED_HANDOFF_RUNTIME_SCHEMA_VERSION_V1;
  readonly state: 'eligible';
  readonly requestId: string;
  readonly topicKey: string;
  readonly authoritySnapshotId: string;
  readonly executionPlanHash: string;
  readonly sourceBinding: {
    readonly sourceContractVersion: string;
    readonly sourceAuthorityRef: string;
    readonly sourceResultHash: string;
    readonly topicKey: string;
    readonly authorizationReceiptRef: string;
  };
  readonly handoff: FaceGovernedInterpretationHandoffV1;
  readonly grounding: FaceGovernedCharacterGroundingBundleV1;
  readonly groundingRef: FaceGovernedCharacterGroundingRefV1;
}

export interface FaceGovernedHandoffNotEligibleRuntimeResultV1 {
  readonly schemaVersion:
    typeof FACE_GOVERNED_HANDOFF_RUNTIME_SCHEMA_VERSION_V1;
  readonly state: 'not_eligible';
  readonly requestId: string;
  readonly topicKey: string;
  readonly reason:
    FaceGovernedCharacterGroundingDecisionV1 extends infer Decision
      ? Decision extends { state: 'not_eligible'; reason: infer Reason }
        ? Reason
        : never
      : never;
  readonly authoritySnapshotId?: string;
  readonly executionPlanHash?: string;
}

export type FaceGovernedHandoffFailureStageV1 =
  | 'request'
  | 'authority'
  | 'planning'
  | 'engine'
  | 'admission';

export interface FaceGovernedHandoffFailedRuntimeResultV1 {
  readonly schemaVersion:
    typeof FACE_GOVERNED_HANDOFF_RUNTIME_SCHEMA_VERSION_V1;
  readonly state: 'failed';
  readonly requestId: string;
  readonly topicKey: string;
  readonly stage: FaceGovernedHandoffFailureStageV1;
  readonly errorCode: string;
}

export type FaceGovernedHandoffRuntimeResultV1 =
  | FaceGovernedHandoffEligibleRuntimeResultV1
  | FaceGovernedHandoffNotEligibleRuntimeResultV1
  | FaceGovernedHandoffFailedRuntimeResultV1;

export interface FaceGovernedHandoffRuntimeHostV1 {
  execute(
    input: unknown,
  ): Promise<FaceGovernedHandoffRuntimeResultV1>;
}

const REQUEST_KEYS = new Set([
  'topicKey',
  'observationArtifactRef',
  'requestId',
]);

function failed(
  request: Partial<FaceGovernedHandoffRuntimeRequestV1>,
  stage: FaceGovernedHandoffFailureStageV1,
  errorCode: string,
): FaceGovernedHandoffFailedRuntimeResultV1 {
  return Object.freeze({
    schemaVersion:
      FACE_GOVERNED_HANDOFF_RUNTIME_SCHEMA_VERSION_V1,
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

function validateRequest(
  input: unknown,
):
  | FaceGovernedHandoffRuntimeRequestV1
  | FaceGovernedHandoffFailedRuntimeResultV1 {
  if (
    input === null ||
    typeof input !== 'object' ||
    Array.isArray(input)
  ) {
    return failed(
      {},
      'request',
      'FACE_GOVERNED_HANDOFF_REQUEST_INVALID',
    );
  }

  const record =
    input as Record<string, unknown>;
  const unexpected =
    Object.keys(record).find(
      (key) => !REQUEST_KEYS.has(key),
    );
  if (unexpected !== undefined) {
    return failed(
      record as Partial<FaceGovernedHandoffRuntimeRequestV1>,
      'request',
      'FACE_GOVERNED_HANDOFF_REQUEST_SCOPE_VIOLATION',
    );
  }

  if (
    typeof record.topicKey !== 'string' ||
    record.topicKey.trim().length === 0 ||
    typeof record.observationArtifactRef !== 'string' ||
    record.observationArtifactRef.trim().length === 0 ||
    typeof record.requestId !== 'string' ||
    record.requestId.trim().length === 0
  ) {
    return failed(
      record as Partial<FaceGovernedHandoffRuntimeRequestV1>,
      'request',
      'FACE_GOVERNED_HANDOFF_REQUEST_INVALID',
    );
  }

  return Object.freeze({
    topicKey: record.topicKey.trim(),
    observationArtifactRef:
      record.observationArtifactRef.trim(),
    requestId: record.requestId.trim(),
  });
}

function safeErrorCode(
  error: unknown,
  fallback: string,
): string {
  if (!(error instanceof Error)) {
    return fallback;
  }
  const [candidate] =
    error.message.split(':', 1);
  if (
    candidate !== undefined &&
    /^[A-Z][A-Z0-9_]*$/u.test(candidate)
  ) {
    return candidate;
  }
  return fallback;
}

function notEligible(
  request: FaceGovernedHandoffRuntimeRequestV1,
  reason: FaceGovernedHandoffNotEligibleRuntimeResultV1['reason'],
  plan?: FaceTopicAuthorizedExecutionPlan,
  authoritySnapshotId?: string,
): FaceGovernedHandoffNotEligibleRuntimeResultV1 {
  return Object.freeze({
    schemaVersion:
      FACE_GOVERNED_HANDOFF_RUNTIME_SCHEMA_VERSION_V1,
    state: 'not_eligible' as const,
    requestId: request.requestId,
    topicKey: request.topicKey,
    reason,
    ...(authoritySnapshotId === undefined
      ? {}
      : { authoritySnapshotId }),
    ...(plan === undefined
      ? {}
      : {
          executionPlanHash:
            plan.executionPlanHash,
        }),
  });
}

export async function executeFaceGovernedHandoffRuntimeV1(
  input: unknown,
  dependencies: FaceGovernedHandoffRuntimeDependenciesV1,
): Promise<FaceGovernedHandoffRuntimeResultV1> {
  const request =
    validateRequest(input);
  if ('state' in request) {
    return request;
  }

  let authorityReceipt:
    FaceTopicAuthoritySourceReceipt;
  try {
    authorityReceipt =
      await dependencies.authorityProvider
        .loadAuthorityReceipt();
  } catch {
    return failed(
      request,
      'authority',
      'FACE_GOVERNED_HANDOFF_AUTHORITY_PROVIDER_FAILED',
    );
  }

  let snapshot;
  try {
    snapshot =
      buildFaceAuthorityCoverageSnapshot(
        authorityReceipt,
      );
  } catch (error) {
    return failed(
      request,
      'authority',
      safeErrorCode(
        error,
        'FACE_GOVERNED_HANDOFF_AUTHORITY_ADMISSION_FAILED',
      ),
    );
  }

  let plan;
  try {
    plan =
      planFaceTopicExecution(
        request,
        snapshot,
      );
  } catch (error) {
    return failed(
      request,
      'planning',
      safeErrorCode(
        error,
        'FACE_GOVERNED_HANDOFF_PLANNING_FAILED',
      ),
    );
  }

  if (!plan.authorized) {
    return notEligible(
      request,
      'source_blocked',
      undefined,
      plan.readiness.evaluatedAgainstSnapshotId,
    );
  }

  if (
    plan.executionKind !==
      'traditional_face_reading'
  ) {
    return notEligible(
      request,
      'neutral_topic',
      plan,
      plan.authoritySnapshotId,
    );
  }

  let rawReceipt: unknown;
  try {
    rawReceipt =
      await dependencies.traditionalResultProvider
        .loadExecutionResultReceipt(
          Object.freeze({
            schemaVersion:
              FACE_GOVERNED_HANDOFF_ENGINE_REQUEST_SCHEMA_VERSION_V1,
            requestId:
              plan.requestId,
            topicKey:
              plan.topicKey,
            observationArtifactRef:
              plan.observationArtifactRef,
            authoritySnapshotId:
              plan.authoritySnapshotId,
            executionPlanHash:
              plan.executionPlanHash,
          }),
        );
  } catch {
    return failed(
      request,
      'engine',
      'FACE_GOVERNED_HANDOFF_ENGINE_PROVIDER_FAILED',
    );
  }

  let decision:
    FaceGovernedCharacterGroundingDecisionV1;
  try {
    decision =
      buildFaceGovernedCharacterGroundingV1({
        authorityReceipt,
        plan,
        receipt:
          rawReceipt as FaceTopicExecutionResultReceiptV1,
      });
  } catch (error) {
    return failed(
      request,
      'admission',
      safeErrorCode(
        error,
        'FACE_GOVERNED_HANDOFF_SOURCE_ADMISSION_FAILED',
      ),
    );
  }

  if (
    decision.state ===
    'not_eligible'
  ) {
    return notEligible(
      request,
      decision.reason,
      plan,
      plan.authoritySnapshotId,
    );
  }

  const handoff =
    decision.handoff;

  return Object.freeze({
    schemaVersion:
      FACE_GOVERNED_HANDOFF_RUNTIME_SCHEMA_VERSION_V1,
    state: 'eligible' as const,
    requestId:
      request.requestId,
    topicKey:
      request.topicKey,
    authoritySnapshotId:
      plan.authoritySnapshotId,
    executionPlanHash:
      plan.executionPlanHash,
    sourceBinding:
      Object.freeze({
        sourceContractVersion:
          handoff.sourceContractVersion,
        sourceAuthorityRef:
          handoff.sourceAuthorityRef,
        sourceResultHash:
          handoff.sourceResultHash,
        topicKey:
          handoff.topicKey,
        authorizationReceiptRef:
          handoff.authorizationReceiptRef,
      }),
    handoff,
    grounding:
      decision.grounding,
    groundingRef:
      decision.groundingRef,
  });
}

export function createFaceGovernedHandoffRuntimeHostV1(
  dependencies: FaceGovernedHandoffRuntimeDependenciesV1,
): FaceGovernedHandoffRuntimeHostV1 {
  return Object.freeze({
    execute: (
      input: unknown,
    ) =>
      executeFaceGovernedHandoffRuntimeV1(
        input,
        dependencies,
      ),
  });
}
