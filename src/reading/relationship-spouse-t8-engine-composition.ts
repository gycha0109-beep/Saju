import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import type { InterpretationClaim } from '../contracts/interpretation.js';
import type { SajuEngineImplementationEvidence } from '../interpretation/saju-engine-authority-intake.js';
import {
  buildRelationshipSpouseT8EngineProducerBinding,
  buildRelationshipSpouseT8EngineProducerCompletionEvidence,
  runRelationshipSpouseT8EngineProducer,
} from '../interpretation/relationship-spouse-t8-engine-producer.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE,
} from '../research/relationship-spouse-t8-runtime-admission.js';
import {
  evaluateRelationshipSpouseT8G2AAdmittedHandoff,
} from '../research/relationship-spouse-t8-g2a-admitted-handoff.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
} from '../research/relationship-spouse-t8-source-bound-runtime.js';
import { prepareProductReading } from './product-reading-integration.js';
import { resolveDomainReadingProfile } from './reading-intent-composition.js';
import { resolveReadingProfileSelectionAuthorization } from './reading-profile-authorization.js';

export const RELATIONSHIP_SPOUSE_T8_ENGINE_COMPOSITION_VERSION =
  'myeonghwa-relationship-spouse-t8-engine-composition-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_ENGINE_COMPOSITION_IMPLEMENTATION_EVIDENCE =
  Object.freeze({
    producerRuntimeExists: true,
    compositionIntegrated: true,
    deterministicGuardsComplete: false,
    e2eComplete: false,
  } as const satisfies SajuEngineImplementationEvidence);

export interface RelationshipSpouseT8EngineCompositionInput {
  readonly requestId: string;
  readonly now?: Date;
  readonly includeSourceSummaries?: boolean;
}

const SPOUSE_INTENT = Object.freeze({
  domain: 'relationship' as const,
  temporalScope: 'natal' as const,
  relationshipScope: 'spouse' as const,
});

const AUTHORITY_BOUNDARY = Object.freeze({
  compositionIntegrated: true as const,
  deterministicGuardsComplete: false as const,
  e2eComplete: false as const,
  legacyNarrativeExecutionAuthorized: false as const,
  previewExpansionAuthorized: false as const,
  officialReadingAuthorityAuthorized: false as const,
  publicSemanticAuthorityAuthorized: false as const,
  lifecyclePromotionAuthorized: false as const,
  productionAdmissionAuthorized: false as const,
  production: 'HOLD' as const,
});

function sameStrings(
  actual: readonly string[] | undefined,
  expected: readonly string[],
): boolean {
  return (
    actual !== undefined &&
    actual.length === expected.length &&
    actual.every((value, index) => value === expected[index])
  );
}

function sameIds(actual: readonly string[], expected: readonly string[]): boolean {
  const left = [...actual].sort();
  const right = [...expected].sort();
  return (
    left.length === right.length &&
    left.every((value, index) => value === right[index])
  );
}

function isExactSpouseClaim(claim: InterpretationClaim): boolean {
  return (
    claim.state === 'active' &&
    claim.taxonomy.tier === 'T8' &&
    claim.taxonomy.category === 'relationship' &&
    claim.taxonomy.subcategory === 'spouse' &&
    claim.claimType === RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE &&
    claim.subject === 'native_chart' &&
    claim.predicate === 'role_neutral_spouse_star_marker'
  );
}

export function buildRelationshipSpouseT8EngineCompositionBinding() {
  const producerBinding = buildRelationshipSpouseT8EngineProducerBinding();
  const producerCompletion =
    buildRelationshipSpouseT8EngineProducerCompletionEvidence();
  const resolvedProfile = resolveDomainReadingProfile(SPOUSE_INTENT);

  if (resolvedProfile === undefined) {
    throw new Error(
      'Relationship Spouse T8 P1 composition requires the existing spouse natal Reading profile.',
    );
  }

  const authorization =
    resolveReadingProfileSelectionAuthorization(resolvedProfile.profileRef);
  const requiredGroup = resolvedProfile.profile.requiredClaimSelectors[0];
  const requiredSelector = requiredGroup?.anyOf[0];
  const excludedSelector = resolvedProfile.profile.excludedClaimSelectors[0];

  const exactSpouseProfile =
    resolvedProfile.profile.profileId ===
      'myeonghwa-reading-profile-relationship-spouse-natal-v1' &&
    resolvedProfile.profile.intent.domain === 'relationship' &&
    resolvedProfile.profile.intent.temporalScope === 'natal' &&
    resolvedProfile.profile.intent.relationshipScope === 'spouse' &&
    resolvedProfile.profile.requiredClaimSelectors.length === 1 &&
    requiredGroup?.requirementId ===
      'RELATIONSHIP_SPOUSE_DOMAIN_CLAIM_REQUIRED' &&
    requiredGroup.anyOf.length === 1 &&
    sameStrings(requiredSelector?.taxonomy?.tiers, ['T8']) &&
    sameStrings(requiredSelector?.taxonomy?.categories, ['relationship']) &&
    sameStrings(requiredSelector?.taxonomy?.subcategories, ['spouse']) &&
    resolvedProfile.profile.optionalClaimSelectors.length === 0 &&
    resolvedProfile.profile.excludedClaimSelectors.length === 1 &&
    sameStrings(excludedSelector?.taxonomy?.tiers, ['T8']) &&
    sameStrings(excludedSelector?.taxonomy?.categories, ['relationship']) &&
    sameStrings(excludedSelector?.taxonomy?.subcategories, ['general']);

  const profileSelectionAuthorized =
    authorization.state === 'authorized' &&
    authorization.authorizationRef !== undefined &&
    authorization.authorization !== undefined &&
    authorization.authorization.scope === 'reading_evidence_selection_only' &&
    authorization.authorization.profileRef.id === resolvedProfile.profileRef.id &&
    authorization.authorization.profileRef.version ===
      resolvedProfile.profileRef.version &&
    authorization.authorization.profileRef.contentHash ===
      resolvedProfile.profileRef.contentHash;

  const p0ProducerReady =
    producerBinding.engineProducerReady === true &&
    producerCompletion.p0Complete === true &&
    producerCompletion.observedNextRouting === 'P1_COMPOSITION';

  const registryIdentityPreserved =
    producerBinding.registrySnapshotId ===
    RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.snapshot
      .registrySnapshotId;

  const compositionBindingReady =
    p0ProducerReady &&
    exactSpouseProfile &&
    profileSelectionAuthorized &&
    registryIdentityPreserved;

  const material = Object.freeze({
    compositionVersion: RELATIONSHIP_SPOUSE_T8_ENGINE_COMPOSITION_VERSION,
    issue: '#1786' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    producerBindingId: producerBinding.bindingId,
    producerCompletionEvidenceId: producerCompletion.evidenceId,
    registrySnapshotId:
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.snapshot
        .registrySnapshotId,
    profileRef: Object.freeze({ ...resolvedProfile.profileRef }),
    profileAuthorizationRef:
      authorization.authorizationRef === undefined
        ? undefined
        : Object.freeze({ ...authorization.authorizationRef }),
    bindingChecks: Object.freeze({
      p0ProducerReady,
      exactSpouseProfile,
      profileSelectionAuthorized,
      registryIdentityPreserved,
    }),
    compositionBoundary: Object.freeze({
      existingProfileReused: true as const,
      existingProfileAuthorizationReused: true as const,
      genericProductReadingPreparationReused: true as const,
      newReadingProfileCreated: false as const,
      newSajuSemanticsAuthorized: false as const,
      consumerNarrativeActivated: false as const,
    }),
    authorityBoundary: AUTHORITY_BOUNDARY,
    compositionBindingReady,
  });

  return Object.freeze({
    bindingId: deterministicContentHash(material),
    ...material,
  });
}

export function prepareRelationshipSpouseT8EngineComposition(
  snapshot: CanonicalSajuSnapshot,
  input: RelationshipSpouseT8EngineCompositionInput,
) {
  const binding = buildRelationshipSpouseT8EngineCompositionBinding();
  if (!binding.compositionBindingReady) {
    throw new Error(
      'Relationship Spouse T8 P1 composition requires the exact admitted producer and spouse Reading profile binding.',
    );
  }

  const interpretation = runRelationshipSpouseT8EngineProducer(snapshot, {
    requestId: input.requestId,
    ...(input.now === undefined ? {} : { now: input.now }),
  });

  if (
    interpretation.claims.length > 1 ||
    interpretation.claims.some((claim) => !isExactSpouseClaim(claim))
  ) {
    throw new Error(
      'Relationship Spouse T8 P1 composition received claims outside the admitted spouse marker boundary.',
    );
  }

  const preparation = prepareProductReading(
    snapshot,
    interpretation,
    RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
    {
      requestId: input.requestId,
      text: '배우자운',
      ...(input.includeSourceSummaries === true
        ? { outputPreferences: { includeSourceSummaries: true } }
        : {}),
    },
  );

  const producerClaimIds = interpretation.claims
    .map((claim) => claim.claimId)
    .sort();

  const complete =
    producerClaimIds.length === 1 &&
    preparation.state === 'ready_for_execution' &&
    preparation.normalization.request?.intent.domain === 'relationship' &&
    preparation.normalization.request.intent.temporalScope === 'natal' &&
    preparation.normalization.request.intent.relationshipScope === 'spouse' &&
    preparation.composition?.selection.profileAuthorization.state ===
      'authorized' &&
    preparation.composition.selection.coverageState === 'complete' &&
    sameIds(
      preparation.composition.selection.targetClaimIds,
      producerClaimIds,
    ) &&
    sameIds(
      preparation.composition.selection.selectedClaimIds,
      producerClaimIds,
    ) &&
    preparation.composition.selection.missingRequirements.length === 0 &&
    preparation.composition.evidence !== undefined &&
    sameIds(
      preparation.composition.evidence.bundle.claims.map(
        (claim) => claim.claimId,
      ),
      producerClaimIds,
    );

  const insufficientEvidence =
    producerClaimIds.length === 0 &&
    preparation.state === 'insufficient_evidence' &&
    preparation.composition?.selection.coverageState ===
      'insufficient_evidence' &&
    preparation.composition.selection.targetClaimIds.length === 0 &&
    preparation.composition.selection.selectedClaimIds.length === 0 &&
    preparation.composition.evidence === undefined;

  if (!complete && !insufficientEvidence) {
    throw new Error(
      'Relationship Spouse T8 P1 composition failed its complete-or-insufficient fail-closed contract.',
    );
  }

  const outcome = complete
    ? ('complete' as const)
    : ('insufficient_evidence' as const);

  const material = Object.freeze({
    compositionVersion: RELATIONSHIP_SPOUSE_T8_ENGINE_COMPOSITION_VERSION,
    issue: '#1786' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    bindingId: binding.bindingId,
    profileRef: binding.profileRef,
    profileAuthorizationRef: binding.profileAuthorizationRef,
    registrySnapshotId: binding.registrySnapshotId,
    interpretationRunId: interpretation.run.interpretationRunId,
    preparationId: preparation.preparationId,
    outcome,
    producerClaimIds,
    selectedClaimIds:
      preparation.composition?.selection.selectedClaimIds ?? [],
    governedEvidenceHash:
      preparation.composition?.evidence?.evidenceBundleHash,
    authorityBoundary: AUTHORITY_BOUNDARY,
  });

  return Object.freeze({
    compositionId: deterministicContentHash(material),
    ...material,
    interpretation,
    preparation,
  });
}

export function buildRelationshipSpouseT8EngineCompositionCompletionEvidence() {
  const binding = buildRelationshipSpouseT8EngineCompositionBinding();
  const g2a = evaluateRelationshipSpouseT8G2AAdmittedHandoff(
    RELATIONSHIP_SPOUSE_T8_ENGINE_COMPOSITION_IMPLEMENTATION_EVIDENCE,
  );

  const p1Complete =
    binding.compositionBindingReady === true &&
    g2a.g2aEvaluation.authorityContractComplete === true &&
    g2a.g2aEvaluation.routing === 'P2_HARDENING' &&
    g2a.g2aEvaluation.implementationMayProceed === true;

  const material = Object.freeze({
    evidenceVersion:
      'myeonghwa-relationship-spouse-t8-p1-engine-composition-evidence-v1' as const,
    issue: '#1786' as const,
    compositionBindingId: binding.bindingId,
    implementationEvidence:
      RELATIONSHIP_SPOUSE_T8_ENGINE_COMPOSITION_IMPLEMENTATION_EVIDENCE,
    g2aEvaluationHash: g2a.g2aEvaluation.evaluationHash,
    expectedNextRouting: 'P2_HARDENING' as const,
    observedNextRouting: g2a.g2aEvaluation.routing,
    p1Complete,
    nextDisposition: p1Complete
      ? ('IMPLEMENT_ENGINE_P2_SPOUSE_T8_HARDENING' as const)
      : ('REPAIR_ENGINE_P1_SPOUSE_T8_COMPOSITION' as const),
    authorityBoundary: AUTHORITY_BOUNDARY,
  });

  return Object.freeze({
    evidenceId: deterministicContentHash(material),
    ...material,
  });
}

export type RelationshipSpouseT8EngineCompositionProfileRef =
  ContentAddressedVersionedRef;
