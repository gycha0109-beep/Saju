import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import type { InterpretationRunOptions } from '../interpretation/interpretation-engine.js';
import type { SajuEngineImplementationEvidence } from '../interpretation/saju-engine-authority-intake.js';
import {
  buildRelationshipSpouseT8EngineProducerCompletionEvidence,
  runRelationshipSpouseT8EngineProducer,
} from '../interpretation/relationship-spouse-t8-engine-producer.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  evaluateRelationshipSpouseT8G2AAdmittedHandoff,
} from '../research/relationship-spouse-t8-g2a-admitted-handoff.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
} from '../research/relationship-spouse-t8-source-bound-runtime.js';
import {
  resolveDomainReadingProfile,
} from './reading-intent-composition.js';
import {
  buildReadingCompositionEvidence,
  resolveReadingProfileSelectionAuthorization,
} from './reading-profile-authorization.js';

export const RELATIONSHIP_SPOUSE_T8_ENGINE_COMPOSITION_VERSION =
  'myeonghwa-relationship-spouse-t8-engine-composition-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_ENGINE_COMPOSITION_IMPLEMENTATION_EVIDENCE =
  Object.freeze({
    producerRuntimeExists: true,
    compositionIntegrated: true,
    deterministicGuardsComplete: false,
    e2eComplete: false,
  } as const satisfies SajuEngineImplementationEvidence);

const SPOUSE_READING_INTENT = Object.freeze({
  domain: 'relationship' as const,
  temporalScope: 'natal' as const,
  relationshipScope: 'spouse' as const,
});

export function buildRelationshipSpouseT8EngineCompositionBinding() {
  const p0 = buildRelationshipSpouseT8EngineProducerCompletionEvidence();
  const resolvedProfile = resolveDomainReadingProfile(SPOUSE_READING_INTENT);
  const profileAuthorization =
    resolvedProfile === undefined
      ? { state: 'not_authorized' as const }
      : resolveReadingProfileSelectionAuthorization(resolvedProfile.profileRef);

  const p0Ready =
    p0.p0Complete === true &&
    p0.observedNextRouting === 'P1_COMPOSITION' &&
    p0.nextDisposition === 'IMPLEMENT_ENGINE_P1_SPOUSE_T8_COMPOSITION';

  const exactSpouseProfile =
    resolvedProfile !== undefined &&
    resolvedProfile.profile.profileId ===
      'myeonghwa-reading-profile-relationship-spouse-natal-v1' &&
    resolvedProfile.profile.intent.domain === 'relationship' &&
    resolvedProfile.profile.intent.temporalScope === 'natal' &&
    resolvedProfile.profile.intent.relationshipScope === 'spouse' &&
    resolvedProfile.profile.requiredClaimSelectors.length === 1 &&
    resolvedProfile.profile.requiredClaimSelectors[0]?.requirementId ===
      'RELATIONSHIP_SPOUSE_DOMAIN_CLAIM_REQUIRED';

  const profileSelectionAuthorized =
    profileAuthorization.state === 'authorized' &&
    profileAuthorization.authorization?.scope ===
      'reading_evidence_selection_only' &&
    profileAuthorization.authorization.constraints
      .mayAuthorizeInterpretationRules === false &&
    profileAuthorization.authorization.constraints.mayGenerateClaims === undefined;

  const registryIdentityReady =
    RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.snapshot
      .registrySnapshotId.trim().length > 0;

  const compositionPathReady =
    p0Ready &&
    exactSpouseProfile &&
    profileSelectionAuthorized &&
    registryIdentityReady;

  const material = Object.freeze({
    compositionVersion: RELATIONSHIP_SPOUSE_T8_ENGINE_COMPOSITION_VERSION,
    issue: '#1786' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    p0EvidenceId: p0.evidenceId,
    p0Ready,
    registrySnapshotId:
      RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY.snapshot
        .registrySnapshotId,
    profileRef: resolvedProfile?.profileRef,
    profileSelectionAuthorizationRef:
      profileAuthorization.state === 'authorized'
        ? profileAuthorization.authorizationRef
        : undefined,
    exactSpouseProfile,
    profileSelectionAuthorized,
    registryIdentityReady,
    compositionPath: Object.freeze({
      engineProducerFeedsExistingReadingComposition: true as const,
      existingDomainReadingProfileReused: true as const,
      existingProfileSelectionAuthorizationReused: true as const,
      existingEvidenceSelectorReused: true as const,
      newReadingProfileCreated: false as const,
      newCompositionFrameworkCreated: false as const,
      readingSelectionMayGenerateClaims: false as const,
      readingSelectionMayAuthorizeDomainSemantics: false as const,
    }),
    authorityBoundary: Object.freeze({
      deterministicGuardsComplete: false as const,
      e2eComplete: false as const,
      previewExpansionAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      publicSemanticAuthorityAuthorized: false as const,
      lifecyclePromotionAuthorized: false as const,
      productionAdmissionAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    compositionPathReady,
  });

  return Object.freeze({
    bindingId: deterministicContentHash(material),
    ...material,
  });
}

export function composeRelationshipSpouseT8EngineReadingEvidence(
  snapshot: CanonicalSajuSnapshot,
  options: InterpretationRunOptions = {},
) {
  const binding = buildRelationshipSpouseT8EngineCompositionBinding();
  if (!binding.compositionPathReady) {
    throw new Error(
      'Relationship Spouse T8 Engine composition requires the exact admitted P1 binding.',
    );
  }

  const execution = runRelationshipSpouseT8EngineProducer(snapshot, options);
  const request = Object.freeze({
    requestId:
      options.requestId ??
      `relationship-spouse-t8-engine-composition:${snapshot.snapshotId}`,
    intent: SPOUSE_READING_INTENT,
  } satisfies ReadingRequest);
  const composition = buildReadingCompositionEvidence(
    snapshot,
    execution,
    RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
    request,
  );

  return Object.freeze({
    binding,
    request,
    execution,
    composition,
  });
}

export function buildRelationshipSpouseT8EngineCompositionCompletionEvidence() {
  const binding = buildRelationshipSpouseT8EngineCompositionBinding();
  const g2a = evaluateRelationshipSpouseT8G2AAdmittedHandoff(
    RELATIONSHIP_SPOUSE_T8_ENGINE_COMPOSITION_IMPLEMENTATION_EVIDENCE,
  );

  const p1Complete =
    binding.compositionPathReady === true &&
    g2a.g2aEvaluation.authorityContractComplete === true &&
    g2a.g2aEvaluation.routing === 'P2_HARDENING' &&
    g2a.g2aEvaluation.implementationMayProceed === true;

  const material = Object.freeze({
    evidenceVersion:
      'myeonghwa-relationship-spouse-t8-p1-composition-evidence-v1' as const,
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
    authorityBoundary: binding.authorityBoundary,
  });

  return Object.freeze({
    evidenceId: deterministicContentHash(material),
    ...material,
  });
}
