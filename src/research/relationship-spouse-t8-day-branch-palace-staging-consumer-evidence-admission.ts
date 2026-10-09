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
  prepareProductReading,
} from '../reading/product-reading-integration.js';
import {
  resolveReadingProfileSelectionAuthorization,
} from '../reading/reading-profile-authorization.js';
import {
  resolveDomainReadingProfile,
} from '../reading/reading-intent-composition.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
} from './relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE,
} from './relationship-spouse-t8-day-branch-palace-staging-lifecycle-materialization.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionReview,
  runRelationshipSpouseT8DayBranchPalaceShadowStagingExecution,
} from './relationship-spouse-t8-day-branch-palace-shadow-staging-execution-review.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_CONSUMER_EVIDENCE_ADMISSION_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-staging-consumer-evidence-admission-v1' as const;

const CALCULATION_NOW = new Date('2026-10-01T02:20:00.000Z');
const INTERPRETATION_NOW = new Date('2026-10-01T02:21:00.000Z');

const CALCULATION_POLICY = Object.freeze({
  policyId:
    'myeonghwa/relationship-spouse-t8-day-branch-palace-staging-consumer-evidence-admission',
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

function exactStrings(
  left: readonly string[],
  right: readonly string[],
): boolean {
  return (
    left.length === right.length &&
    left.every((value, index) => value === right[index])
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

function currentShadowReviewIntegrityValid(
  review: ReturnType<
    typeof buildRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionReview
  >,
): boolean {
  const { reviewId: declaredReviewId, ...material } = review;
  return deterministicContentHash(material) === declaredReviewId;
}

export interface RelationshipSpouseT8DayBranchPalaceStagingConsumerEvidenceAdmissionInput {
  readonly shadowReview: ReturnType<
    typeof buildRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionReview
  >;
}

export function evaluateRelationshipSpouseT8DayBranchPalaceStagingConsumerEvidenceAdmission(
  input: RelationshipSpouseT8DayBranchPalaceStagingConsumerEvidenceAdmissionInput,
) {
  const currentShadowReview =
    buildRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionReview();
  const shadowReview = input.shadowReview;

  const shadowReviewIntegrityValid =
    currentShadowReviewIntegrityValid(shadowReview);

  const exactShadowReviewBinding =
    shadowReviewIntegrityValid &&
    shadowReview.reviewId === currentShadowReview.reviewId &&
    shadowReview.upstreamMaterializationId ===
      currentShadowReview.upstreamMaterializationId &&
    shadowReview.upstreamMaterializationRef !== undefined &&
    currentShadowReview.upstreamMaterializationRef !== undefined &&
    refsEqual(
      shadowReview.upstreamMaterializationRef,
      currentShadowReview.upstreamMaterializationRef,
    ) &&
    refsEqual(
      shadowReview.executionAuthorityRef,
      currentShadowReview.executionAuthorityRef,
    ) &&
    shadowReview.stagingRegistrySnapshotId ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .registrySnapshotId &&
    refsEqual(
      shadowReview.stagingPackRef,
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot.packRef,
    );

  const shadowGateSatisfied =
    shadowReview.requiredShadowStagingEvidenceComplete === true &&
    shadowReview.blockers.length === 0 &&
    shadowReview.gate14Resolution.gateId ===
      'REQUIRED_SHADOW_STAGING_EVIDENCE_COMPLETE' &&
    shadowReview.gate14Resolution.status === 'SATISFIED' &&
    shadowReview.authorityBoundary.exactCandidateOnly === true &&
    shadowReview.authorityBoundary.stagingExecutionAuthorityCreated === true &&
    shadowReview.authorityBoundary.stagingExecutionAuthorized === true &&
    shadowReview.authorityBoundary.shadowExecutionCompleted === true &&
    shadowReview.nextDisposition ===
      'RUN_SA_5J_STAGING_CONSUMER_ADMISSION_REVIEW';

  const spouseProfile = resolveDomainReadingProfile({
    domain: 'relationship',
    temporalScope: 'natal',
    relationshipScope: 'spouse',
  });
  const profileAuthorization =
    spouseProfile === undefined
      ? undefined
      : resolveReadingProfileSelectionAuthorization(spouseProfile.profileRef);

  const exactExistingSpouseProfile =
    spouseProfile !== undefined &&
    spouseProfile.profile.profileId ===
      'myeonghwa-reading-profile-relationship-spouse-natal-v1' &&
    spouseProfile.profile.intent.domain === 'relationship' &&
    spouseProfile.profile.intent.temporalScope === 'natal' &&
    spouseProfile.profile.intent.relationshipScope === 'spouse' &&
    spouseProfile.profile.requiredClaimSelectors.length === 1 &&
    spouseProfile.profile.requiredClaimSelectors[0]?.requirementId ===
      'RELATIONSHIP_SPOUSE_DOMAIN_CLAIM_REQUIRED' &&
    spouseProfile.profile.excludedClaimSelectors.length === 1;

  const exactProfileSelectionAuthorization =
    profileAuthorization?.state === 'authorized' &&
    profileAuthorization.authorization !== undefined &&
    profileAuthorization.authorizationRef !== undefined &&
    profileAuthorization.authorization.decision ===
      'authorized_for_selection' &&
    profileAuthorization.authorization.scope ===
      'reading_evidence_selection_only' &&
    refsEqual(
      profileAuthorization.authorization.profileRef,
      spouseProfile!.profileRef,
    ) &&
    profileAuthorization.authorization.constraints
      .mayAuthorizeInterpretationRules === false &&
    profileAuthorization.authorization.constraints
      .mayAuthorizeClaimGeneration === false &&
    profileAuthorization.authorization.constraints
      .mayAuthorizeDomainSemantics === false &&
    profileAuthorization.authorization.constraints
      .mayPromoteResearchAuthority === false &&
    profileAuthorization.authorization.constraints
      .mayOverrideInterpretationAuthorization === false;

  const snapshot = buildFixtureSnapshot();
  const stagingExecution =
    runRelationshipSpouseT8DayBranchPalaceShadowStagingExecution(snapshot, {
      requestId: 'sa5j-staging-consumer-evidence-admission',
      now: INTERPRETATION_NOW,
    });

  const preparation = prepareProductReading(
    snapshot,
    stagingExecution,
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY,
    {
      requestId: 'sa5j-staging-consumer-evidence-admission',
      text: '배우자운',
      outputPreferences: {
        includeSourceSummaries: true,
      },
    },
  );

  const exactStagingExecutionIdentity =
    stagingExecution.integrity.valid === true &&
    stagingExecution.run.registrySnapshotId ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .registrySnapshotId &&
    stagingExecution.run.sourceAdjudicationAuthorityRef !== undefined &&
    refsEqual(
      stagingExecution.run.sourceAdjudicationAuthorityRef,
      shadowReview.executionAuthorityRef,
    ) &&
    stagingExecution.claims.length === 1 &&
    stagingExecution.claims[0]?.claimType ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE &&
    exactStrings(stagingExecution.claims[0]?.factRefs ?? [], ['pillars.day']);

  const selectedClaimId = stagingExecution.claims[0]?.claimId;
  const composition = preparation.composition;
  const evidence = composition?.evidence;

  const exactConsumerIntentAndCoverage =
    preparation.state === 'ready_for_execution' &&
    preparation.normalization.state === 'resolved' &&
    preparation.normalization.request?.intent.domain === 'relationship' &&
    preparation.normalization.request.intent.temporalScope === 'natal' &&
    preparation.normalization.request.intent.relationshipScope === 'spouse' &&
    composition !== undefined &&
    composition.selection.profileAuthorization.state === 'authorized' &&
    composition.selection.coverageState === 'complete' &&
    composition.selection.missingRequirements.length === 0 &&
    selectedClaimId !== undefined &&
    exactStrings(composition.selection.targetClaimIds, [selectedClaimId]) &&
    exactStrings(composition.selection.selectedClaimIds, [selectedClaimId]);

  const exactGovernedEvidenceBundle =
    evidence !== undefined &&
    evidence.bundle.registrySnapshotId ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .registrySnapshotId &&
    evidence.bundle.interpretationRunId ===
      stagingExecution.run.interpretationRunId &&
    evidence.bundle.purpose === 'section_reading' &&
    evidence.bundle.claims.length === 1 &&
    evidence.bundle.claims[0]?.claimId === selectedClaimId &&
    evidence.bundle.claims[0]?.claimType ===
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE &&
    evidence.bundle.canonicalFacts.length === 1 &&
    evidence.bundle.canonicalFacts[0]?.ref === 'pillars.day' &&
    evidence.bundle.canonicalFacts[0]?.path === 'pillars.day' &&
    evidence.bundle.sourceSummaries?.length === 2;

  const exactSemanticAndReviewBoundary =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
      .materialForNarrative === false &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.output.value
      .position === 'day_branch' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.output.value
      .traditionalRole === 'spouse_palace' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.output.value
      .semanticScope === 'position_only' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
      .provenanceQuality === 'multi_source_supported' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
      .reviewerStatus === 'unreviewed' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY
      .reviewAttestations.length === 0;

  const genericPreparationConstraintsPreserved =
    preparation.executionEligibility.readingExecution === 'allowed' &&
    preparation.executionEligibility.artifactAssembly ===
      'allowed_after_authority_execution' &&
    preparation.executionEligibility.constraints
      .mayFillMissingEvidenceWithLLM === false &&
    preparation.executionEligibility.constraints
      .mayFallbackUnsupportedIntentToGeneral === false &&
    preparation.executionEligibility.constraints.mayCollapseAmbiguity ===
      false &&
    preparation.executionEligibility.constraints
      .mayGenerateInterpretationClaims === false &&
    preparation.executionEligibility.constraints
      .mayResolveMethodologyConflicts === false &&
    preparation.executionEligibility.constraints
      .mayPromoteResearchAuthority === false;

  const noNarrativeOrDeliveryExpansion =
    shadowReview.authorityBoundary.narrativeConsumerActivated === false &&
    shadowReview.authorityBoundary.previewAuthorityAuthorized === false &&
    shadowReview.authorityBoundary.officialReadingAuthorityAuthorized ===
      false &&
    shadowReview.authorityBoundary.productionAuthorityAuthorized === false &&
    shadowReview.authorityBoundary.production === 'HOLD' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
      .materialForNarrative === false;

  const checks = Object.freeze({
    shadowReviewIntegrityValid,
    exactShadowReviewBinding,
    shadowGateSatisfied,
    exactExistingSpouseProfile,
    exactProfileSelectionAuthorization,
    exactStagingExecutionIdentity,
    exactConsumerIntentAndCoverage,
    exactGovernedEvidenceBundle,
    exactSemanticAndReviewBoundary,
    genericPreparationConstraintsPreserved,
    noNarrativeOrDeliveryExpansion,
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5J_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const governedConsumerEvidenceSelectionAdmitted = blockers.length === 0;

  const material = Object.freeze({
    admissionVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_CONSUMER_EVIDENCE_ADMISSION_VERSION,
    issue: '#1912' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    upstreamShadowReviewId: shadowReview.reviewId,
    upstreamExecutionAuthorityRef: shadowReview.executionAuthorityRef,
    stagingRegistrySnapshotId:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot
        .registrySnapshotId,
    stagingPackRef:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_REGISTRY.snapshot.packRef,
    profileRef: spouseProfile?.profileRef,
    profileAuthorizationRef: profileAuthorization?.authorizationRef,
    stagingInterpretationRunId: stagingExecution.run.interpretationRunId,
    preparationId: preparation.preparationId,
    governedEvidenceHash: evidence?.evidenceBundleHash,
    checks,
    blockers,
    governedConsumerEvidenceSelectionAdmitted,
    authorityBoundary: Object.freeze({
      exactCandidateOnly:
        exactShadowReviewBinding &&
        exactStagingExecutionIdentity,
      stagingExecutionAuthorityPreserved:
        exactStagingExecutionIdentity,
      readingProfileSelectionAuthorized:
        exactProfileSelectionAuthorization,
      governedEvidenceSelectionAuthorized:
        governedConsumerEvidenceSelectionAdmitted,
      genericProductReadingPreparationReady:
        preparation.state === 'ready_for_execution',
      consumerAdmissionScope:
        'governed_reading_evidence_selection_only' as const,
      humanDomainReviewEstablished: false as const,
      reviewAttestationCreated: false as const,
      reviewerTrustGrantEstablished: false as const,
      reviewerStatusPromotionAuthorized: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      narrativeConsumerActivated: false as const,
      narrativeGenerationAuthorized: false as const,
      artifactAssemblyAuthorized: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      publicSemanticAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition: governedConsumerEvidenceSelectionAdmitted
      ? ('RUN_SA_5K_NARRATIVE_ELIGIBILITY_AND_DELIVERY_AUTHORITY_REVIEW' as const)
      : ('HOLD_AND_REPAIR_SA_5J_CONSUMER_EVIDENCE_ADMISSION' as const),
  });

  return Object.freeze({
    admissionId: deterministicContentHash(material),
    ...material,
    preparation,
  });
}

export function buildRelationshipSpouseT8DayBranchPalaceStagingConsumerEvidenceAdmission() {
  return evaluateRelationshipSpouseT8DayBranchPalaceStagingConsumerEvidenceAdmission({
    shadowReview:
      buildRelationshipSpouseT8DayBranchPalaceShadowStagingExecutionReview(),
  });
}
