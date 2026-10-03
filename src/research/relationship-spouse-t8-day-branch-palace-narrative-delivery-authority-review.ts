import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
} from './relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE,
} from './relationship-spouse-t8-day-branch-palace-staging-lifecycle-materialization.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceStagingConsumerEvidenceAdmission,
} from './relationship-spouse-t8-day-branch-palace-staging-consumer-evidence-admission.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_DELIVERY_AUTHORITY_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-narrative-delivery-authority-review-v1' as const;

function refsEqual(
  left: ContentAddressedVersionedRef,
  right: ContentAddressedVersionedRef,
): boolean {
  return (
    left.id === right.id &&
    left.version === right.version &&
    left.contentHash === right.contentHash
  );
}

function currentConsumerAdmissionIntegrityValid(
  admission: ReturnType<
    typeof buildRelationshipSpouseT8DayBranchPalaceStagingConsumerEvidenceAdmission
  >,
): boolean {
  const {
    admissionId: declaredAdmissionId,
    preparation: _preparation,
    ...material
  } = admission;
  void _preparation;
  return deterministicContentHash(material) === declaredAdmissionId;
}

function historicalPreviewConsumerAuthority() {
  return Object.freeze({
    authorityVersion:
      'myeonghwa-preview-official-reading-consumer-authority-v1' as const,
    readingSection: 'relationship:natal:spouse' as const,
    authority: 'legacy_narrative' as const,
    supportedOfficialReadingSection: undefined,
    constraints: Object.freeze({
      mayPromoteProductionInterpretationAuthority: false as const,
      mayGrantPersistenceAuthority: false as const,
      mayGrantPublicGeneralAvailabilityAuthority: false as const,
      mayTreatUnsupportedSectionAsOfficialReading: false as const,
    }),
  });
}

function historicalBlockedExecution(consumerAdmissionId: string) {
  const consumerReadingAuthority = historicalPreviewConsumerAuthority();
  const constraints = Object.freeze({
    mayInvokeModelWhenPreparationBlocked: false as const,
    mayAssembleLegacyNarrativeArtifactWithoutGroundedNarrative: false as const,
    mayInvokeNarrativeForOfficialReadingAuthority: false as const,
    mayBypassGroundingValidation: false as const,
    mayRetryBeyondNarrativeRuntimePolicy: false as const,
    mayFillMissingEvidenceWithLLM: false as const,
    mayAssembleOfficialPlanWithoutCanonicalSemantics: false as const,
    mayPromoteResearchAuthority: false as const,
    mayUseNarrativeAsOfficialReadingAuthority: false as const,
    mayFallbackOfficialReadingToLegacyNarrative: false as const,
    mayOverrideResolvedConsumerReadingAuthority: false as const,
    mayFallbackLegacyWithoutNarrativeRuntime: false as const,
  });
  const reasonCodes = Object.freeze([
    'LEGACY_NARRATIVE_RUNTIME_REQUIRED',
  ] as const);
  const executionId = `reading_execution_${deterministicContentHash({
    stage: 'SA-5K',
    consumerAdmissionId,
    state: 'invariant_blocked',
    authority: 'legacy_narrative',
    reasonCodes,
    constraints,
  }).slice(0, 24)}`;
  return Object.freeze({
    executionId,
    orchestratorVersion: 'myeonghwa-governed-reading-execution-v5' as const,
    state: 'invariant_blocked' as const,
    consumerReadingAuthority,
    modelCalls: 0 as const,
    reasonCodes,
    constraints,
    narrative: undefined,
    artifact: undefined,
    canonicalSemantics: undefined,
    officialReadingPlan: undefined,
    officialReadingReport: undefined,
  });
}

function historicalBlockedDelivery(executionId: string) {
  const constraints = Object.freeze({
    mayExposeInternalClaimIds: false as const,
    mayExposeRawInternalReasonCodes: false as const,
    mayExposeResearchAuthorityStateAsConsumerMeaning: false as const,
    mayRenderCoverageAsFortuneJudgment: false as const,
    maySynthesizeMissingReadingText: false as const,
    mayTreatFallbackAsNewInterpretationAuthority: false as const,
  });
  return Object.freeze({
    deliveryId: `reading_delivery_${deterministicContentHash({
      stage: 'SA-5K',
      executionId,
      state: 'temporarily_unavailable',
      constraints,
    }).slice(0, 24)}`,
    state: 'temporarily_unavailable' as const,
    messageCode: 'READING_TEMPORARILY_UNAVAILABLE' as const,
    requiredAction: 'try_again_later' as const,
    artifact: undefined,
    constraints,
  });
}

export interface RelationshipSpouseT8DayBranchPalaceNarrativeDeliveryAuthorityReviewInput {
  readonly consumerAdmission: ReturnType<
    typeof buildRelationshipSpouseT8DayBranchPalaceStagingConsumerEvidenceAdmission
  >;
}

export async function evaluateRelationshipSpouseT8DayBranchPalaceNarrativeDeliveryAuthorityReview(
  input: RelationshipSpouseT8DayBranchPalaceNarrativeDeliveryAuthorityReviewInput,
) {
  const currentAdmission =
    buildRelationshipSpouseT8DayBranchPalaceStagingConsumerEvidenceAdmission();
  const consumerAdmission = input.consumerAdmission;

  const consumerAdmissionIntegrityValid =
    currentConsumerAdmissionIntegrityValid(consumerAdmission);

  const exactConsumerAdmissionBinding =
    consumerAdmissionIntegrityValid &&
    consumerAdmission.admissionId === currentAdmission.admissionId &&
    consumerAdmission.upstreamShadowReviewId ===
      currentAdmission.upstreamShadowReviewId &&
    refsEqual(
      consumerAdmission.upstreamExecutionAuthorityRef,
      currentAdmission.upstreamExecutionAuthorityRef,
    ) &&
    consumerAdmission.stagingRegistrySnapshotId ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .registrySnapshotId &&
    refsEqual(
      consumerAdmission.stagingPackRef,
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot.packRef,
    ) &&
    consumerAdmission.governedEvidenceHash ===
      currentAdmission.governedEvidenceHash &&
    consumerAdmission.preparationId === currentAdmission.preparationId;

  const evidenceSelectionAdmissionValid =
    consumerAdmission.governedConsumerEvidenceSelectionAdmitted === true &&
    consumerAdmission.blockers.length === 0 &&
    consumerAdmission.authorityBoundary.exactCandidateOnly === true &&
    consumerAdmission.authorityBoundary.stagingExecutionAuthorityPreserved ===
      true &&
    consumerAdmission.authorityBoundary.readingProfileSelectionAuthorized ===
      true &&
    consumerAdmission.authorityBoundary.governedEvidenceSelectionAuthorized ===
      true &&
    consumerAdmission.authorityBoundary.consumerAdmissionScope ===
      'governed_reading_evidence_selection_only' &&
    consumerAdmission.authorityBoundary.narrativeGenerationAuthorized ===
      false &&
    consumerAdmission.authorityBoundary.artifactAssemblyAuthorized === false &&
    consumerAdmission.nextDisposition ===
      'RUN_SA_5K_NARRATIVE_ELIGIBILITY_AND_DELIVERY_AUTHORITY_REVIEW';

  const narrativeMaterialityStillDenied =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
      .materialForNarrative === false;

  const projectGovernancePreMaterialityBoundaryExact =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
      .reviewerStatus === 'unreviewed';

  const readingSection = 'relationship:natal:spouse' as const;
  const previewConsumerAuthority = historicalPreviewConsumerAuthority();
  const spouseSectionNotOfficialPreview = true as const;

  const governedExecution = historicalBlockedExecution(
    consumerAdmission.admissionId,
  );
  const executionFailsClosedWithoutNarrativeRuntime =
    governedExecution.state === 'invariant_blocked' &&
    governedExecution.consumerReadingAuthority.authority ===
      'legacy_narrative' &&
    governedExecution.consumerReadingAuthority.readingSection ===
      'relationship:natal:spouse' &&
    governedExecution.modelCalls === 0 &&
    governedExecution.artifact === undefined &&
    governedExecution.narrative === undefined &&
    governedExecution.canonicalSemantics === undefined &&
    governedExecution.officialReadingPlan === undefined &&
    governedExecution.officialReadingReport === undefined &&
    governedExecution.reasonCodes.length === 1 &&
    governedExecution.reasonCodes[0] ===
      'LEGACY_NARRATIVE_RUNTIME_REQUIRED';

  const delivery = historicalBlockedDelivery(governedExecution.executionId);
  const deliveryFailsClosedWithoutArtifact =
    delivery.state === 'temporarily_unavailable' &&
    delivery.messageCode === 'READING_TEMPORARILY_UNAVAILABLE' &&
    delivery.requiredAction === 'try_again_later' &&
    delivery.artifact === undefined;

  const noNarrativeProfileAuthorityInjected =
    governedExecution.narrative === undefined &&
    governedExecution.modelCalls === 0 &&
    consumerAdmission.authorityBoundary.narrativeConsumerActivated === false &&
    consumerAdmission.authorityBoundary.narrativeGenerationAuthorized === false;

  const noDeliveryOrOfficialAuthorityExpansion =
    consumerAdmission.authorityBoundary.artifactAssemblyAuthorized === false &&
    consumerAdmission.authorityBoundary.previewAuthorityAuthorized === false &&
    consumerAdmission.authorityBoundary.officialReadingAuthorityAuthorized ===
      false &&
    consumerAdmission.authorityBoundary.publicSemanticAuthorityAuthorized ===
      false &&
    consumerAdmission.authorityBoundary.productionAuthorityAuthorized ===
      false &&
    consumerAdmission.authorityBoundary.production === 'HOLD' &&
    governedExecution.artifact === undefined &&
    delivery.artifact === undefined;

  const checks = Object.freeze({
    consumerAdmissionIntegrityValid,
    exactConsumerAdmissionBinding,
    evidenceSelectionAdmissionValid,
    narrativeMaterialityStillDenied,
    projectGovernancePreMaterialityBoundaryExact,
    spouseSectionNotOfficialPreview,
    executionFailsClosedWithoutNarrativeRuntime,
    deliveryFailsClosedWithoutArtifact,
    noNarrativeProfileAuthorityInjected,
    noDeliveryOrOfficialAuthorityExpansion,
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5K_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const authorityReviewCompleted = blockers.length === 0;
  const narrativeEligibilityEstablished = false as const;
  const deliveryAuthorityEstablished = false as const;

  const material = Object.freeze({
    reviewVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_DELIVERY_AUTHORITY_REVIEW_VERSION,
    issue: '#1916' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    upstreamConsumerAdmissionId: consumerAdmission.admissionId,
    upstreamExecutionAuthorityRef:
      consumerAdmission.upstreamExecutionAuthorityRef,
    governedEvidenceHash: consumerAdmission.governedEvidenceHash,
    stagingRegistrySnapshotId:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .registrySnapshotId,
    stagingPackRef:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot.packRef,
    readingSection,
    previewConsumerAuthority,
    governedExecutionId: governedExecution.executionId,
    governedExecutionState: governedExecution.state,
    deliveryId: delivery.deliveryId,
    deliveryState: delivery.state,
    checks,
    blockers,
    authorityReviewCompleted,
    narrativeEligibilityEstablished,
    deliveryAuthorityEstablished,
    decision: authorityReviewCompleted
      ? ('HOLD_NARRATIVE_AND_DELIVERY_AUTHORITY' as const)
      : ('HOLD_AND_REPAIR_SA_5K_AUTHORITY_REVIEW' as const),
    authorityBoundary: Object.freeze({
      exactCandidateOnly:
        exactConsumerAdmissionBinding && evidenceSelectionAdmissionValid,
      governedEvidenceSelectionAuthorityPreserved:
        evidenceSelectionAdmissionValid,
      narrativeMaterialityAuthorized: false as const,
      narrativeProfileAuthorityEstablished: false as const,
      legacyNarrativeRuntimeAuthorityEstablished: false as const,
      narrativeGenerationAuthorized: false as const,
      artifactAssemblyAuthorized: false as const,
      deliveryAuthorityAuthorized: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      publicSemanticAuthorityAuthorized: false as const,
      projectGovernedMaterialityDecisionEstablished: false as const,
      reviewerStatusPromotionAuthorized: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition: authorityReviewCompleted
      ? ('RUN_SA_5L_PROJECT_GOVERNED_POSITION_ONLY_NARRATIVE_MATERIALITY_DECISION' as const)
      : ('HOLD_AND_REPAIR_SA_5K_AUTHORITY_REVIEW' as const),
  });

  return Object.freeze({
    reviewId: deterministicContentHash(material),
    ...material,
    governedExecution,
    delivery,
  });
}

export async function buildRelationshipSpouseT8DayBranchPalaceNarrativeDeliveryAuthorityReview() {
  return evaluateRelationshipSpouseT8DayBranchPalaceNarrativeDeliveryAuthorityReview({
    consumerAdmission:
      buildRelationshipSpouseT8DayBranchPalaceStagingConsumerEvidenceAdmission(),
  });
}
