import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  FaceAuthorityCoverageSnapshot,
  FaceBindingCoverage,
} from './contracts.js';

export const FACE_TOPIC_AUTHORITY_SOURCE_RECEIPT_SCHEMA_VERSION =
  'face-topic-authority-source-receipt-v1' as const;

export const FACE_TOPIC_DEFAULT_PROHIBITED_INFERENCE_KEYS =
  Object.freeze([
    'objective_personality_diagnosis',
    'intelligence_inference',
    'morality_inference',
    'guaranteed_future_outcome',
    'exact_marriage_age_without_authority',
    'exact_wealth_amount_without_authority',
  ] as const);

export interface FaceTopicAuthoritySourceBindingGroupReceipt {
  readonly bindingGroupRef: string;
  readonly requiredBindingCount: number;
  readonly admittedBindingCount: number;
  readonly bindingReady: boolean;
  readonly provenanceRefs: readonly string[];
}

export interface FaceTopicAuthoritySourceReceipt {
  readonly schemaVersion:
    typeof FACE_TOPIC_AUTHORITY_SOURCE_RECEIPT_SCHEMA_VERSION;
  readonly observation: {
    readonly authorityRef: string;
    readonly materializedCapabilities: readonly string[];
    readonly unavailableOrHardGapCapabilities: readonly string[];
    readonly provenanceRefs: readonly string[];
  };
  readonly bridge: {
    readonly authorityRef: string;
    readonly bindingGroups:
      readonly FaceTopicAuthoritySourceBindingGroupReceipt[];
    readonly provenanceRefs: readonly string[];
  };
  readonly traditional: {
    readonly authorityRef: string;
    readonly methodologyRefs: readonly string[];
    readonly semanticClaimFamilies: readonly string[];
    readonly provenanceRefs: readonly string[];
  };
}

function sortedUnique(values: readonly string[]): readonly string[] {
  return Object.freeze([...new Set(values)].sort());
}

function assertNonEmpty(value: string, code: string): void {
  if (value.trim().length === 0) {
    throw new Error(code);
  }
}

export function assertFaceTopicAuthoritySourceReceipt(
  receipt: FaceTopicAuthoritySourceReceipt,
): void {
  if (
    receipt.schemaVersion !==
    FACE_TOPIC_AUTHORITY_SOURCE_RECEIPT_SCHEMA_VERSION
  ) {
    throw new Error('FACE_TOPIC_AUTHORITY_RECEIPT_SCHEMA_DRIFT');
  }

  assertNonEmpty(
    receipt.observation.authorityRef,
    'FACE_TOPIC_OBSERVATION_AUTHORITY_REF_MISSING',
  );
  assertNonEmpty(
    receipt.bridge.authorityRef,
    'FACE_TOPIC_BRIDGE_AUTHORITY_REF_MISSING',
  );
  assertNonEmpty(
    receipt.traditional.authorityRef,
    'FACE_TOPIC_TRADITIONAL_AUTHORITY_REF_MISSING',
  );

  const materialized = new Set(
    receipt.observation.materializedCapabilities,
  );
  if (
    receipt.observation.unavailableOrHardGapCapabilities.some(
      (capability) => materialized.has(capability),
    )
  ) {
    throw new Error(
      'FACE_TOPIC_AUTHORITY_CAPABILITY_AVAILABLE_GAP_OVERLAP',
    );
  }

  if (
    new Set(
      receipt.bridge.bindingGroups.map(
        (group) => group.bindingGroupRef,
      ),
    ).size !== receipt.bridge.bindingGroups.length
  ) {
    throw new Error(
      'FACE_TOPIC_AUTHORITY_DUPLICATE_BINDING_GROUP',
    );
  }

  for (const group of receipt.bridge.bindingGroups) {
    assertNonEmpty(
      group.bindingGroupRef,
      'FACE_TOPIC_AUTHORITY_BINDING_GROUP_REF_MISSING',
    );
    if (
      !Number.isInteger(group.requiredBindingCount) ||
      group.requiredBindingCount < 1 ||
      !Number.isInteger(group.admittedBindingCount) ||
      group.admittedBindingCount < 0 ||
      group.admittedBindingCount > group.requiredBindingCount
    ) {
      throw new Error(
        'FACE_TOPIC_AUTHORITY_INVALID_BINDING_COUNTS',
      );
    }
    if (
      group.bindingReady &&
      group.admittedBindingCount < group.requiredBindingCount
    ) {
      throw new Error(
        'FACE_TOPIC_AUTHORITY_BINDING_READY_WITH_MISSING_BINDINGS',
      );
    }
  }
}

export function buildFaceAuthorityCoverageSnapshot(
  receipt: FaceTopicAuthoritySourceReceipt,
  prohibitedInferenceKeys: readonly string[] =
    FACE_TOPIC_DEFAULT_PROHIBITED_INFERENCE_KEYS,
): FaceAuthorityCoverageSnapshot {
  assertFaceTopicAuthoritySourceReceipt(receipt);

  const bindingGroups: readonly FaceBindingCoverage[] = Object.freeze(
    [...receipt.bridge.bindingGroups]
      .sort((left, right) =>
        left.bindingGroupRef.localeCompare(right.bindingGroupRef),
      )
      .map((group) =>
        Object.freeze({
          bindingGroupRef: group.bindingGroupRef,
          requiredBindingCount: group.requiredBindingCount,
          admittedBindingCount: group.admittedBindingCount,
          bindingReady: group.bindingReady,
          provenanceRefs: sortedUnique(group.provenanceRefs),
        }),
      ),
  );

  const availableObservationCapabilities = sortedUnique(
    receipt.observation.materializedCapabilities,
  );
  const availableMethodologyRefs = sortedUnique(
    receipt.traditional.methodologyRefs,
  );
  const availableSemanticClaimFamilies = sortedUnique(
    receipt.traditional.semanticClaimFamilies,
  );
  const normalizedProhibitedInferenceKeys =
    sortedUnique(prohibitedInferenceKeys);
  const provenanceRefs = sortedUnique([
    ...receipt.observation.provenanceRefs,
    ...receipt.bridge.provenanceRefs,
    ...receipt.traditional.provenanceRefs,
  ]);

  const identityPayload = Object.freeze({
    schemaVersion: 'face-authority-coverage-snapshot-v1',
    observationAuthorityRef: receipt.observation.authorityRef,
    bridgeAuthorityRef: receipt.bridge.authorityRef,
    traditionalAuthorityRef: receipt.traditional.authorityRef,
    availableObservationCapabilities,
    availableMethodologyRefs,
    availableSemanticClaimFamilies,
    bindingGroups,
    prohibitedInferenceKeys: normalizedProhibitedInferenceKeys,
    provenanceRefs,
  });

  return Object.freeze({
    snapshotId:
      `face-authority-coverage:${deterministicContentHash(identityPayload)}`,
    observationAuthorityRef: receipt.observation.authorityRef,
    bridgeAuthorityRef: receipt.bridge.authorityRef,
    traditionalAuthorityRef: receipt.traditional.authorityRef,
    availableObservationCapabilities,
    availableMethodologyRefs,
    availableSemanticClaimFamilies,
    bindingGroups,
    prohibitedInferenceKeys: normalizedProhibitedInferenceKeys,
    provenanceRefs,
  });
}
