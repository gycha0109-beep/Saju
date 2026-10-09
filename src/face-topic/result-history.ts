import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  FaceTopicDefinitionRef,
} from './contracts.js';
import {
  createFaceTopicDefinitionRef,
  getFaceTopicDefinition,
} from './registry.js';
import type {
  FaceReaderDeliveryV1,
  FaceReaderHeaderV1,
} from './reader.js';
import type {
  FaceTopicRuntimeResultV1,
} from './runtime.js';

export const FACE_RESULT_SNAPSHOT_SCHEMA_VERSION =
  'face-result-snapshot-v1' as const;

export const FACE_HISTORY_ENTRY_SCHEMA_VERSION =
  'face-history-entry-v1' as const;

export interface FaceResultSnapshotV1 {
  readonly schemaVersion:
    typeof FACE_RESULT_SNAPSHOT_SCHEMA_VERSION;
  readonly resultRef: string;
  readonly snapshotHash: string;
  readonly topicKey: string;
  readonly topicDefinitionRef:
    FaceTopicDefinitionRef;
  readonly observationArtifactRef: string;
  readonly authoritySnapshotId: string;
  readonly faceEngineVersion: string;
  readonly methodologyPackRefs: readonly string[];
  readonly executionPlanHash: string;
  readonly sourceResultHash: string;
  readonly projectionHash: string;
  readonly groundingHash: string;
  readonly displayFactsHash: string;
  readonly readerDeliveryHash: string;
  readonly readinessState:
    | 'available'
    | 'partial';
  readonly unavailableSections: readonly string[];
  readonly prohibitedInferences: readonly string[];
  readonly renderingProfileRef: string;
  readonly readerDelivery: FaceReaderDeliveryV1;
  readonly createdAt: string;
}

export interface FaceHistoryEntryV1 {
  readonly schemaVersion:
    typeof FACE_HISTORY_ENTRY_SCHEMA_VERSION;
  readonly resultRef: string;
  readonly topicKey: string;
  readonly readinessState:
    | 'available'
    | 'partial';
  readonly header: FaceReaderHeaderV1;
  readonly readerDeliveryHash: string;
  readonly unavailableSections: readonly string[];
  readonly createdAt: string;
}

function sortedUnique(
  values: readonly string[],
): readonly string[] {
  return Object.freeze([
    ...new Set(values),
  ].sort());
}

function assertNonEmpty(
  value: string,
  code: string,
): void {
  if (value.trim().length === 0) {
    throw new Error(code);
  }
}

function assertCanonicalTimestamp(
  value: string,
): void {
  const parsed = new Date(value);
  if (
    Number.isNaN(parsed.valueOf()) ||
    parsed.toISOString() !== value
  ) {
    throw new Error(
      'FACE_RESULT_SNAPSHOT_CREATED_AT_INVALID',
    );
  }
}

function snapshotIdentity(
  snapshot: Omit<
    FaceResultSnapshotV1,
    | 'resultRef'
    | 'snapshotHash'
    | 'createdAt'
  >,
): object {
  return {
    schemaVersion: snapshot.schemaVersion,
    topicKey: snapshot.topicKey,
    topicDefinitionRef:
      snapshot.topicDefinitionRef,
    observationArtifactRef:
      snapshot.observationArtifactRef,
    authoritySnapshotId:
      snapshot.authoritySnapshotId,
    faceEngineVersion:
      snapshot.faceEngineVersion,
    methodologyPackRefs:
      snapshot.methodologyPackRefs,
    executionPlanHash:
      snapshot.executionPlanHash,
    sourceResultHash:
      snapshot.sourceResultHash,
    projectionHash:
      snapshot.projectionHash,
    groundingHash:
      snapshot.groundingHash,
    displayFactsHash:
      snapshot.displayFactsHash,
    readerDeliveryHash:
      snapshot.readerDeliveryHash,
    readinessState:
      snapshot.readinessState,
    unavailableSections:
      snapshot.unavailableSections,
    prohibitedInferences:
      snapshot.prohibitedInferences,
    renderingProfileRef:
      snapshot.renderingProfileRef,
    readerDelivery:
      snapshot.readerDelivery,
  };
}

function digestForSnapshot(
  snapshot: Omit<
    FaceResultSnapshotV1,
    | 'resultRef'
    | 'snapshotHash'
    | 'createdAt'
  >,
): string {
  return deterministicContentHash(
    snapshotIdentity(snapshot),
  );
}

export function buildFaceResultSnapshot(
  runtimeResult: FaceTopicRuntimeResultV1,
  createdAt: string,
): FaceResultSnapshotV1 {
  if (
    runtimeResult.state !== 'ready' &&
    runtimeResult.state !== 'partial'
  ) {
    throw new Error(
      'FACE_RESULT_SNAPSHOT_RUNTIME_NOT_FINALIZABLE',
    );
  }
  assertCanonicalTimestamp(createdAt);

  const definition =
    getFaceTopicDefinition(
      runtimeResult.topicKey,
    );
  if (definition === undefined) {
    throw new Error(
      'FACE_RESULT_SNAPSHOT_TOPIC_NOT_REGISTERED',
    );
  }

  const readinessState =
    runtimeResult.state === 'partial'
      ? 'partial'
      : 'available';

  if (
    runtimeResult.readerDelivery.readinessState !==
    readinessState
  ) {
    throw new Error(
      'FACE_RESULT_SNAPSHOT_READINESS_MISMATCH',
    );
  }
  if (
    runtimeResult.readerDelivery.readerDeliveryHash !==
    runtimeResult.readerDeliveryHash
  ) {
    throw new Error(
      'FACE_RESULT_SNAPSHOT_READER_HASH_MISMATCH',
    );
  }

  const identity = Object.freeze({
    schemaVersion:
      FACE_RESULT_SNAPSHOT_SCHEMA_VERSION,
    topicKey: runtimeResult.topicKey,
    topicDefinitionRef:
      createFaceTopicDefinitionRef(definition),
    observationArtifactRef:
      runtimeResult.observationArtifactRef,
    authoritySnapshotId:
      runtimeResult.authoritySnapshotId,
    faceEngineVersion:
      runtimeResult.faceEngineVersion,
    methodologyPackRefs:
      sortedUnique(
        runtimeResult.methodologyPackRefs,
      ),
    executionPlanHash:
      runtimeResult.executionPlanHash,
    sourceResultHash:
      runtimeResult.sourceResultHash,
    projectionHash:
      runtimeResult.projectionHash,
    groundingHash:
      runtimeResult.groundingHash,
    displayFactsHash:
      runtimeResult.displayFactsHash,
    readerDeliveryHash:
      runtimeResult.readerDeliveryHash,
    readinessState,
    unavailableSections:
      sortedUnique(
        runtimeResult.readerDelivery
          .unavailableSections,
      ),
    prohibitedInferences:
      sortedUnique(
        runtimeResult.prohibitedInferences,
      ),
    renderingProfileRef:
      definition.renderingProfileRef,
    readerDelivery:
      runtimeResult.readerDelivery,
  });

  const digest =
    digestForSnapshot(identity);
  const snapshot = Object.freeze({
    ...identity,
    resultRef:
      `face-result:${digest}`,
    snapshotHash:
      `face-result-snapshot:${digest}`,
    createdAt,
  });

  assertFaceResultSnapshot(snapshot);
  return snapshot;
}

export function assertFaceResultSnapshot(
  snapshot: FaceResultSnapshotV1,
): void {
  if (
    snapshot.schemaVersion !==
    FACE_RESULT_SNAPSHOT_SCHEMA_VERSION
  ) {
    throw new Error(
      'FACE_RESULT_SNAPSHOT_SCHEMA_DRIFT',
    );
  }

  assertCanonicalTimestamp(
    snapshot.createdAt,
  );
  assertNonEmpty(
    snapshot.topicKey,
    'FACE_RESULT_SNAPSHOT_TOPIC_MISSING',
  );
  assertNonEmpty(
    snapshot.observationArtifactRef,
    'FACE_RESULT_SNAPSHOT_OBSERVATION_ARTIFACT_MISSING',
  );
  assertNonEmpty(
    snapshot.authoritySnapshotId,
    'FACE_RESULT_SNAPSHOT_AUTHORITY_MISSING',
  );
  assertNonEmpty(
    snapshot.faceEngineVersion,
    'FACE_RESULT_SNAPSHOT_ENGINE_VERSION_MISSING',
  );
  assertNonEmpty(
    snapshot.renderingProfileRef,
    'FACE_RESULT_SNAPSHOT_RENDERING_PROFILE_MISSING',
  );

  if (
    snapshot.readerDelivery.topicKey !==
      snapshot.topicKey ||
    snapshot.readerDelivery.readinessState !==
      snapshot.readinessState ||
    snapshot.readerDelivery.readerDeliveryHash !==
      snapshot.readerDeliveryHash ||
    snapshot.readerDelivery.projectionHash !==
      snapshot.projectionHash ||
    snapshot.readerDelivery.groundingHash !==
      snapshot.groundingHash ||
    snapshot.readerDelivery.displayFactsHash !==
      snapshot.displayFactsHash
  ) {
    throw new Error(
      'FACE_RESULT_SNAPSHOT_READER_BINDING_MISMATCH',
    );
  }

  const identity = {
    schemaVersion:
      snapshot.schemaVersion,
    topicKey:
      snapshot.topicKey,
    topicDefinitionRef:
      snapshot.topicDefinitionRef,
    observationArtifactRef:
      snapshot.observationArtifactRef,
    authoritySnapshotId:
      snapshot.authoritySnapshotId,
    faceEngineVersion:
      snapshot.faceEngineVersion,
    methodologyPackRefs:
      snapshot.methodologyPackRefs,
    executionPlanHash:
      snapshot.executionPlanHash,
    sourceResultHash:
      snapshot.sourceResultHash,
    projectionHash:
      snapshot.projectionHash,
    groundingHash:
      snapshot.groundingHash,
    displayFactsHash:
      snapshot.displayFactsHash,
    readerDeliveryHash:
      snapshot.readerDeliveryHash,
    readinessState:
      snapshot.readinessState,
    unavailableSections:
      snapshot.unavailableSections,
    prohibitedInferences:
      snapshot.prohibitedInferences,
    renderingProfileRef:
      snapshot.renderingProfileRef,
    readerDelivery:
      snapshot.readerDelivery,
  } satisfies Omit<
    FaceResultSnapshotV1,
    | 'resultRef'
    | 'snapshotHash'
    | 'createdAt'
  >;

  const digest =
    digestForSnapshot(identity);

  if (
    snapshot.resultRef !==
      `face-result:${digest}` ||
    snapshot.snapshotHash !==
      `face-result-snapshot:${digest}`
  ) {
    throw new Error(
      'FACE_RESULT_SNAPSHOT_HASH_MISMATCH',
    );
  }
}

export function buildFaceHistoryEntry(
  snapshot: FaceResultSnapshotV1,
): FaceHistoryEntryV1 {
  assertFaceResultSnapshot(snapshot);

  return Object.freeze({
    schemaVersion:
      FACE_HISTORY_ENTRY_SCHEMA_VERSION,
    resultRef: snapshot.resultRef,
    topicKey: snapshot.topicKey,
    readinessState:
      snapshot.readinessState,
    header: snapshot.readerDelivery.header,
    readerDeliveryHash:
      snapshot.readerDeliveryHash,
    unavailableSections:
      snapshot.unavailableSections,
    createdAt: snapshot.createdAt,
  });
}
