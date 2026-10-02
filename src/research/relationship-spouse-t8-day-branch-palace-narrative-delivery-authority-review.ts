import type {
  CalculationPolicySnapshot,
  CanonicalSajuSnapshot,
} from '../contracts/calculation.js';
import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import {
  calculateCanonicalSajuSnapshot,
} from '../calculation/calculation-engine.js';
import {
  deterministicContentHash,
} from '../interpretation/rule-registry.js';
import {
  PREVIEW_E2E_APPROVAL,
} from '../preview/preview-authority.js';
import {
  readingSectionForIntentV1,
  resolvePreviewConsumerReadingAuthorityV1,
} from '../preview/preview-official-reading-consumer-authority.js';
import {
  executeProductReading,
} from '../reading/governed-reading-execution.js';
import {
  buildProductReadingDelivery,
} from '../reading/product-reading-delivery.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
} from './relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE,
} from './relationship-spouse-t8-day-branch-palace-staging-lifecycle-materialization.js';
import {
  runRelationshipSpouseT8DayBranchPalaceShadowStagingExecution,
} from './relationship-spouse-t8-day-branch-palace-shadow-staging-execution-review.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceStagingConsumerEvidenceAdmission,
} from './relationship-spouse-t8-day-branch-palace-staging-consumer-evidence-admission.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_DELIVERY_AUTHORITY_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-narrative-delivery-authority-review-v1' as const;

const CALCULATION_NOW = new Date('2026-10-01T03:55:00.000Z');
const INTERPRETATION_NOW = new Date('2026-10-01T03:56:00.000Z');
const ARTIFACT_NOW = new Date('2026-10-01T03:57:00.000Z');

const CALCULATION_POLICY = Object.freeze({
  policyId:
    'myeonghwa/relationship-spouse-t8-day-branch-palace-narrative-delivery-authority-review',
  policyVersion: '1.0.0',
  dayBoundary: 'midnight',
  trueSolarTime: {
    enabled: false,
    longitudeSource: 'not-applicable',
    applyEquationOfTime: false,
    applyHistoricalDst: false,
  },
  timeZonePolicy: {
    source: 'service-default',
    timeZone: 'Asia/Seoul',
  },
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
} as const satisfies CalculationPolicySnapshot);

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

function buildFixtureSnapshot(): CanonicalSajuSnapshot {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 1992, month: 10, day: 24 },
      time: { known: true, hour: 5, minute: 30 },
      sexForTraditionalCalculation: 'unspecified',
    },
    CALCULATION_POLICY,
    { now: CALCULATION_NOW },
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

  const spouseIntent = Object.freeze({
    domain: 'relationship',
    temporalScope: 'natal',
    relationshipScope: 'spouse',
  } as const);
  const readingSection = readingSectionForIntentV1(spouseIntent);
  const previewConsumerAuthority =
    resolvePreviewConsumerReadingAuthorityV1(spouseIntent);

  const spouseSectionNotOfficialPreview =
    readingSection === 'relationship:natal:spouse' &&
    !(PREVIEW_E2E_APPROVAL.supportedReadingSections as readonly string[]).includes(
      readingSection,
    ) &&
    previewConsumerAuthority.readingSection === readingSection &&
    previewConsumerAuthority.authority === 'legacy_narrative' &&
    previewConsumerAuthority.supportedOfficialReadingSection === undefined &&
    previewConsumerAuthority.constraints
      .mayPromoteProductionInterpretationAuthority === false &&
    previewConsumerAuthority.constraints.mayGrantPersistenceAuthority ===
      false &&
    previewConsumerAuthority.constraints
      .mayGrantPublicGeneralAvailabilityAuthority === false &&
    previewConsumerAuthority.constraints
      .mayTreatUnsupportedSectionAsOfficialReading === false;

  const snapshot = buildFixtureSnapshot();
  const stagingExecution =
    runRelationshipSpouseT8DayBranchPalaceShadowStagingExecution(snapshot, {
      requestId: 'sa5k-narrative-delivery-authority-review',
      now: INTERPRETATION_NOW,
    });

  const governedExecution = await executeProductReading(
    snapshot,
    stagingExecution,
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
    {
      requestId: 'sa5k-narrative-delivery-authority-review',
      text: '배우자운',
      outputPreferences: {
        includeSourceSummaries: true,
      },
    },
    {
      outputSchemaVersion: '1.0.0',
      readingVersion: 'relationship-spouse-t8-day-branch-palace-sa5k-review',
      artifactGeneratedAt: ARTIFACT_NOW,
    },
  );

  const executionFailsClosedWithoutNarrativeRuntime =
    governedExecution.state === 'invariant_blocked' &&
    governedExecution.consumerReadingAuthority?.authority ===
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
    governedExecution.reasonCodes[0] === 'LEGACY_NARRATIVE_RUNTIME_REQUIRED' &&
    governedExecution.constraints.mayInvokeNarrativeForOfficialReadingAuthority ===
      false &&
    governedExecution.constraints.mayPromoteResearchAuthority === false &&
    governedExecution.constraints.mayUseNarrativeAsOfficialReadingAuthority ===
      false &&
    governedExecution.constraints.mayFallbackOfficialReadingToLegacyNarrative ===
      false &&
    governedExecution.constraints.mayOverrideResolvedConsumerReadingAuthority ===
      false;

  const delivery = buildProductReadingDelivery(governedExecution);

  const deliveryFailsClosedWithoutArtifact =
    delivery.state === 'temporarily_unavailable' &&
    delivery.messageCode === 'READING_TEMPORARILY_UNAVAILABLE' &&
    delivery.requiredAction === 'try_again_later' &&
    delivery.artifact === undefined &&
    delivery.constraints.mayExposeInternalClaimIds === false &&
    delivery.constraints.mayExposeRawInternalReasonCodes === false &&
    delivery.constraints.mayExposeResearchAuthorityStateAsConsumerMeaning ===
      false &&
    delivery.constraints.mayRenderCoverageAsFortuneJudgment === false &&
    delivery.constraints.maySynthesizeMissingReadingText === false &&
    delivery.constraints.mayTreatFallbackAsNewInterpretationAuthority ===
      false;

  const noNarrativeProfileAuthorityInjected =
    governedExecution.narrative === undefined &&
    governedExecution.modelCalls === 0 &&
    consumerAdmission.authorityBoundary.narrativeConsumerActivated === false &&
    consumerAdmission.authorityBoundary.narrativeGenerationAuthorized ===
      false;

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
        exactConsumerAdmissionBinding &&
        evidenceSelectionAdmissionValid,
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
