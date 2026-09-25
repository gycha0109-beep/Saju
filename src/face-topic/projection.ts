import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type {
  FaceTopicDefinitionRef,
} from './contracts.js';
import type {
  FaceTopicAuthorizedExecutionPlan,
  FaceTopicExecutionPlan,
} from './execution.js';
import {
  assertFaceTopicAuthorizedExecutionPlan,
} from './execution.js';
import {
  buildFaceGroundingBundle,
  type FaceGroundingBundleV1,
} from './grounding.js';
import {
  createFaceTopicDefinitionRef,
  getFaceTopicDefinition,
} from './registry.js';
import type {
  FaceTopicAdmittedExecutionResultV1,
} from './result-receipt.js';

export const FACE_PRODUCT_PROJECTION_SCHEMA_VERSION =
  'face-product-projection-v1' as const;

export interface FaceProductProjectionV1 {
  readonly schemaVersion:
    typeof FACE_PRODUCT_PROJECTION_SCHEMA_VERSION;
  readonly topicKey: string;
  readonly topicDefinitionRef: FaceTopicDefinitionRef;
  readonly executionPlanHash: string;
  readonly sourceResultHash: string;
  readonly readinessState: 'available' | 'partial';
  readonly selectedObservationRefs: readonly string[];
  readonly selectedClaimRefs: readonly string[];
  readonly unavailableSections: readonly string[];
  readonly prohibitedInferences: readonly string[];
  readonly grounding: FaceGroundingBundleV1;
  readonly projectionHash: string;
}

function sortedUnique(values: readonly string[]): readonly string[] {
  return Object.freeze([...new Set(values)].sort());
}

function assertRegistryBinding(
  plan: FaceTopicAuthorizedExecutionPlan,
): void {
  const definition = getFaceTopicDefinition(plan.topicKey);
  if (definition === undefined) {
    throw new Error(
      'FACE_PRODUCT_PROJECTION_TOPIC_NOT_REGISTERED',
    );
  }
  const currentRef = createFaceTopicDefinitionRef(definition);
  if (
    currentRef.id !== plan.topicDefinitionRef.id ||
    currentRef.version !== plan.topicDefinitionRef.version ||
    currentRef.contentHash !== plan.topicDefinitionRef.contentHash
  ) {
    throw new Error(
      'FACE_PRODUCT_PROJECTION_TOPIC_DEFINITION_DRIFT',
    );
  }
}

export function buildFaceProductProjection(
  plan: FaceTopicExecutionPlan,
  admittedResult: FaceTopicAdmittedExecutionResultV1,
): FaceProductProjectionV1 {
  if (!plan.authorized) {
    throw new Error(
      'FACE_PRODUCT_PROJECTION_BLOCKED_PLAN_REJECTED',
    );
  }
  assertFaceTopicAuthorizedExecutionPlan(plan);
  assertRegistryBinding(plan);

  if (
    admittedResult.executionPlanHash !== plan.executionPlanHash ||
    admittedResult.authoritySnapshotId !==
      plan.authoritySnapshotId ||
    admittedResult.observationArtifactRef !==
      plan.observationArtifactRef ||
    admittedResult.executionKind !== plan.executionKind
  ) {
    throw new Error(
      'FACE_PRODUCT_PROJECTION_RESULT_BINDING_MISMATCH',
    );
  }

  const unavailable = new Set(
    plan.unavailableOptionalRequirements,
  );
  const allowedObservationCapabilities = new Set([
    ...plan.requiredObservationCapabilities,
    ...plan.optionalObservationCapabilities,
  ]);
  const observations = Object.freeze(
    admittedResult.observations
      .filter(
        (unit) =>
          allowedObservationCapabilities.has(
            unit.capabilityKey,
          ) &&
          !unavailable.has(
            `observation:${unit.capabilityKey}`,
          ),
      )
      .sort((left, right) =>
        left.observationRef.localeCompare(
          right.observationRef,
        ),
      ),
  );

  const allowedClaimFamilies = new Set(
    plan.semanticClaimFamilies,
  );
  const allowedMethodologies = new Set(plan.methodologyRefs);
  const semanticClaims = Object.freeze(
    admittedResult.semanticClaims
      .filter(
        (unit) =>
          allowedClaimFamilies.has(unit.claimFamily) &&
          allowedMethodologies.has(unit.methodologyRef) &&
          !unavailable.has(`claim:${unit.claimFamily}`) &&
          !unavailable.has(
            `methodology:${unit.methodologyRef}`,
          ),
      )
      .sort((left, right) =>
        left.claimRef.localeCompare(right.claimRef),
      ),
  );

  if (
    plan.executionKind === 'neutral_observation_projection' &&
    semanticClaims.length > 0
  ) {
    throw new Error(
      'FACE_PRODUCT_PROJECTION_NEUTRAL_CLAIM_PROMOTION_REJECTED',
    );
  }

  const selectedSourceRefs = new Set([
    ...observations.map((unit) => unit.observationRef),
    ...semanticClaims.map((unit) => unit.claimRef),
  ]);
  for (const block of admittedResult.approvedNarrativeBlocks) {
    for (const sourceRef of block.sourceRefs) {
      if (!selectedSourceRefs.has(sourceRef)) {
        throw new Error(
          `FACE_PRODUCT_PROJECTION_NARRATIVE_SOURCE_OUT_OF_SCOPE:${sourceRef}`,
        );
      }
    }
  }

  const unavailableSections = sortedUnique([
    ...plan.unavailableOptionalRequirements,
    ...admittedResult.unavailableSections,
  ]);
  const prohibitedInferences = sortedUnique([
    ...plan.prohibitedInferenceKeys,
    ...admittedResult.prohibitedInferences,
  ]);

  const grounding = buildFaceGroundingBundle({
    admittedResult,
    observations,
    semanticClaims,
    narrativeBlocks:
      admittedResult.approvedNarrativeBlocks,
    unavailableSections,
    prohibitedInferences,
  });

  const selectedObservationRefs = Object.freeze(
    observations.map((unit) => unit.observationRef),
  );
  const selectedClaimRefs = Object.freeze(
    semanticClaims.map((unit) => unit.claimRef),
  );

  const projectionIdentity = Object.freeze({
    schemaVersion: FACE_PRODUCT_PROJECTION_SCHEMA_VERSION,
    topicKey: plan.topicKey,
    topicDefinitionRef: plan.topicDefinitionRef,
    executionPlanHash: plan.executionPlanHash,
    sourceResultHash: admittedResult.sourceResultHash,
    readinessState: plan.readinessState,
    selectedObservationRefs,
    selectedClaimRefs,
    unavailableSections,
    prohibitedInferences,
    groundingHash: grounding.groundingHash,
  });
  const projectionHash =
    `face-product-projection:${deterministicContentHash(
      projectionIdentity,
    )}`;

  return Object.freeze({
    schemaVersion: FACE_PRODUCT_PROJECTION_SCHEMA_VERSION,
    topicKey: plan.topicKey,
    topicDefinitionRef: plan.topicDefinitionRef,
    executionPlanHash: plan.executionPlanHash,
    sourceResultHash: admittedResult.sourceResultHash,
    readinessState: plan.readinessState,
    selectedObservationRefs,
    selectedClaimRefs,
    unavailableSections,
    prohibitedInferences,
    grounding,
    projectionHash,
  });
}
