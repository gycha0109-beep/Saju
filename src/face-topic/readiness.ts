import type {
  FaceAuthorityCoverageSnapshot,
  FaceTopicDefinition,
  FaceTopicReadinessBlocker,
  FaceTopicReadinessResult,
} from './contracts.js';
import {
  assertFaceTopicDefinition,
  createFaceTopicDefinitionRef,
  getFaceTopicDefinition,
} from './registry.js';

function constraints(): FaceTopicReadinessResult['constraints'] {
  return Object.freeze({
    mayGenerateClaims: false as const,
    mayPromoteObservationToTraditionalClaim: false as const,
    mayPromoteResearchAuthority: false as const,
    mayOverrideProhibitedInference: false as const,
    renderingMayAlterSemanticReadiness: false as const,
    commerceMayAlterSemanticReadiness: false as const,
    characterMayAlterSemanticReadiness: false as const,
  });
}

function missingRequired(
  definition: FaceTopicDefinition,
  snapshot: FaceAuthorityCoverageSnapshot,
): readonly FaceTopicReadinessBlocker[] {
  const blockers: FaceTopicReadinessBlocker[] = [];
  const observations = new Set(
    snapshot.availableObservationCapabilities,
  );
  const methodologies = new Set(snapshot.availableMethodologyRefs);
  const claims = new Set(snapshot.availableSemanticClaimFamilies);
  const prohibited = new Set(snapshot.prohibitedInferenceKeys);

  for (const ref of definition.requirements.requiredObservationCapabilities) {
    if (!observations.has(ref)) {
      blockers.push({
        code: 'REQUIRED_OBSERVATION_CAPABILITY_MISSING',
        ref,
        detail: `Required neutral observation capability is unavailable: ${ref}.`,
      });
    }
  }

  for (const ref of definition.requirements.requiredMethodologyRefs) {
    if (!methodologies.has(ref)) {
      blockers.push({
        code: 'REQUIRED_METHODOLOGY_MISSING',
        ref,
        detail: `Required methodology definition is unavailable: ${ref}.`,
      });
    }
  }

  for (const ref of definition.requirements.requiredSemanticClaimFamilies) {
    if (!claims.has(ref)) {
      blockers.push({
        code: 'REQUIRED_SEMANTIC_CLAIM_FAMILY_MISSING',
        ref,
        detail: `Required governed semantic claim family is unavailable: ${ref}.`,
      });
    }
  }

  for (const requirement of definition.requirements.requiredBindingGroups) {
    const coverage = snapshot.bindingGroups.find(
      (candidate) =>
        candidate.bindingGroupRef === requirement.bindingGroupRef,
    );
    if (coverage === undefined) {
      blockers.push({
        code: 'REQUIRED_BINDING_GROUP_MISSING',
        ref: requirement.bindingGroupRef,
        detail: `Required governed binding group is absent: ${requirement.bindingGroupRef}.`,
      });
      continue;
    }
    if (
      coverage.admittedBindingCount <
        requirement.minimumAdmittedBindings ||
      (requirement.requireReady && !coverage.bindingReady)
    ) {
      blockers.push({
        code: 'REQUIRED_BINDING_GROUP_NOT_READY',
        ref: requirement.bindingGroupRef,
        detail:
          `Binding group ${requirement.bindingGroupRef} admits ` +
          `${coverage.admittedBindingCount}/${requirement.minimumAdmittedBindings} required bindings.`,
      });
    }
  }

  for (const inference of definition.requirements.requestedInferenceKeys) {
    if (
      prohibited.has(inference) ||
      definition.requirements.prohibitedInferenceKeys.includes(inference)
    ) {
      blockers.push({
        code: 'PROHIBITED_INFERENCE_REQUESTED',
        ref: inference,
        detail: `Requested inference is prohibited: ${inference}.`,
      });
    }
  }

  return blockers.sort((left, right) =>
    `${left.code}:${left.ref}`.localeCompare(
      `${right.code}:${right.ref}`,
    ),
  );
}

function missingOptional(
  definition: FaceTopicDefinition,
  snapshot: FaceAuthorityCoverageSnapshot,
): readonly string[] {
  const observations = new Set(
    snapshot.availableObservationCapabilities,
  );
  const methodologies = new Set(snapshot.availableMethodologyRefs);
  const claims = new Set(snapshot.availableSemanticClaimFamilies);

  return [
    ...definition.requirements.optionalObservationCapabilities
      .filter((ref) => !observations.has(ref))
      .map((ref) => `observation:${ref}`),
    ...definition.requirements.optionalMethodologyRefs
      .filter((ref) => !methodologies.has(ref))
      .map((ref) => `methodology:${ref}`),
    ...definition.requirements.optionalSemanticClaimFamilies
      .filter((ref) => !claims.has(ref))
      .map((ref) => `claim:${ref}`),
  ].sort();
}

export function evaluateFaceTopicDefinitionReadiness(
  definition: FaceTopicDefinition,
  snapshot: FaceAuthorityCoverageSnapshot,
): FaceTopicReadinessResult {
  assertFaceTopicDefinition(definition);
  const blockers = missingRequired(definition, snapshot);
  const missingOptionalRequirements = missingOptional(
    definition,
    snapshot,
  );

  const state =
    blockers.length > 0
      ? 'blocked'
      : definition.requirements.partialAllowed &&
          missingOptionalRequirements.length > 0
        ? 'partial'
        : 'available';

  return Object.freeze({
    topicKey: definition.topicKey,
    definitionRef: createFaceTopicDefinitionRef(definition),
    state,
    blockers: Object.freeze(blockers),
    missingOptionalRequirements: Object.freeze(
      missingOptionalRequirements,
    ),
    evaluatedAgainstSnapshotId: snapshot.snapshotId,
    provenanceRefs: Object.freeze([...snapshot.provenanceRefs]),
    constraints: constraints(),
  });
}

export function resolveFaceTopicReadiness(
  topicKey: string,
  snapshot: FaceAuthorityCoverageSnapshot,
): FaceTopicReadinessResult {
  const definition = getFaceTopicDefinition(topicKey);
  if (definition === undefined) {
    return Object.freeze({
      topicKey,
      state: 'blocked' as const,
      blockers: Object.freeze([
        {
          code: 'TOPIC_NOT_REGISTERED' as const,
          ref: topicKey,
          detail: `Face topic is not registered: ${topicKey}.`,
        },
      ]),
      missingOptionalRequirements: Object.freeze([]),
      evaluatedAgainstSnapshotId: snapshot.snapshotId,
      provenanceRefs: Object.freeze([...snapshot.provenanceRefs]),
      constraints: constraints(),
    });
  }

  return evaluateFaceTopicDefinitionReadiness(
    definition,
    snapshot,
  );
}
