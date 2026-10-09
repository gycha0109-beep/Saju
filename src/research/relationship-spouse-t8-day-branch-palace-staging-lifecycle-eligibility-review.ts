import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  buildSourceAdjudicationPromotionPolicy,
  evaluateSourceAdjudicationApplicability,
} from './source-adjudication-promotion-policy.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE,
} from './relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceBridgeReentryAdmissionReview,
} from './relationship-spouse-t8-day-branch-palace-bridge-reentry-admission-review.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution,
} from './relationship-spouse-t8-day-branch-palace-isolated-research-execution.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_DIRECT_BASIS_SOURCE_LINKS,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SOURCE_MANIFEST_CANDIDATE_SOURCES,
  buildRelationshipSpouseT8DayBranchPalaceSourceManifestCandidate,
} from './relationship-spouse-t8-day-branch-palace-source-manifest-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceProvenanceSurvey,
} from './relationship-spouse-t8-day-branch-palace-provenance-survey.js';
import {
  RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION,
} from './relationship-spouse-t8-source-adjudicated-staging-runtime.js';

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_LIFECYCLE_ELIGIBILITY_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-staging-lifecycle-eligibility-review-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_AI_INTERNAL_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-day-branch-palace-ai-internal-review-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_AI_INTERNAL_REVIEWER_ID =
  'OPENAI-GPT-5.6-SOL-AI-INTERNAL-REVIEW' as const;

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

function contentRefValid(ref: ContentAddressedVersionedRef): boolean {
  return (
    ref.id.trim().length > 0 &&
    ref.version.trim().length > 0 &&
    /^[a-f0-9]{64}$/u.test(ref.contentHash)
  );
}

const BRIDGE_REVIEW =
  buildRelationshipSpouseT8DayBranchPalaceBridgeReentryAdmissionReview();
const ISOLATED_EXECUTION =
  buildRelationshipSpouseT8DayBranchPalaceIsolatedResearchExecution();
const SOURCE_MANIFEST =
  buildRelationshipSpouseT8DayBranchPalaceSourceManifestCandidate();
const PROVENANCE_SURVEY =
  buildRelationshipSpouseT8DayBranchPalaceProvenanceSurvey();
const SOURCE_ADJUDICATION_POLICY =
  buildSourceAdjudicationPromotionPolicy();

export function buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleCandidateRef():
  ContentAddressedVersionedRef {
  const material = Object.freeze({
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticVersion: '2.0.0' as const,
    sourceAdjudicationPolicyRef:
      SOURCE_ADJUDICATION_POLICY.policyRef,
    upstreamExecutionId: ISOLATED_EXECUTION.executionId,
    upstreamExecutionAuthorityRef:
      ISOLATED_EXECUTION.executionAuthority.authorityRef,
    upstreamCandidateRef: ISOLATED_EXECUTION.candidateRef,
    registrySnapshotId:
      ISOLATED_EXECUTION.authorizedRegistrySnapshotId,
    packRef: ISOLATED_EXECUTION.authorizedPackRef,
  });

  return Object.freeze({
    id: 'relationship-spouse-t8-day-branch-palace-staging-lifecycle-candidate',
    version: '2.0.0',
    contentHash: deterministicContentHash(material),
  });
}

export function buildRelationshipSpouseT8DayBranchPalaceAiAssistedInternalReview() {
  const checks = Object.freeze({
    exactBridgeReviewBound:
      BRIDGE_REVIEW.bridgeReentryAdmissionAuthorized === true &&
      BRIDGE_REVIEW.reviewId ===
        ISOLATED_EXECUTION.upstreamBridgeAdmissionReviewId,
    exactSemanticScope:
      BRIDGE_REVIEW.checks.exactSemanticScope === true &&
      ISOLATED_EXECUTION.checks.exactClaimSurface === true &&
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
        .materialForNarrative === false,
    exactCanonicalInput:
      BRIDGE_REVIEW.checks.exactCanonicalInput === true &&
      BRIDGE_REVIEW.checks.demographicInputIsolation === true,
    exactSourceRoles:
      ISOLATED_EXECUTION.checks.exactSourceBinding === true &&
      ISOLATED_EXECUTION.checks.noCorroborationInflation === true &&
      SOURCE_MANIFEST.manifestCandidateComplete === true &&
      SOURCE_MANIFEST.checks.directBasisCoverage === true &&
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_DIRECT_BASIS_SOURCE_LINKS
        .length === 2 &&
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_DIRECT_BASIS_SOURCE_LINKS.every(
        (link) => link.supportType === 'direct_basis',
      ),
    provenanceBoundaryPreserved:
      PROVENANCE_SURVEY.provenanceRoute === 'MULTI_SOURCE_SUPPORTED' &&
      PROVENANCE_SURVEY.observations.multiSourceSupported === true &&
      PROVENANCE_SURVEY.observations.noCrossSourceSyntheticProposition ===
        true &&
      PROVENANCE_SURVEY.observations
        .historicalWifeLanguageNotAutoTranslated === true,
    failCloseBoundaryPreserved:
      BRIDGE_REVIEW.checks.failCloseContractComplete === true,
    forbiddenSemanticExpansionAbsent:
      BRIDGE_REVIEW.checks.forbiddenSemanticExpansionAbsent === true,
    consumerIsolationPreserved:
      BRIDGE_REVIEW.checks.consumerIsolation === true &&
      ISOLATED_EXECUTION.authorityBoundary.narrativeConsumerActivated ===
        false &&
      ISOLATED_EXECUTION.authorityBoundary.previewAuthorityAuthorized ===
        false &&
      ISOLATED_EXECUTION.authorityBoundary
        .officialReadingAuthorityAuthorized === false &&
      ISOLATED_EXECUTION.authorityBoundary.productionAuthorityAuthorized ===
        false,
    reviewerAuthorityPreserved:
      BRIDGE_REVIEW.checks.reviewAuthorityPreserved === true &&
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.quality.reviewerStatus ===
        'unreviewed' &&
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE
        .reviewAttestations.length === 0 &&
      ISOLATED_EXECUTION.authorityBoundary.reviewAttestationCreated ===
        false &&
      ISOLATED_EXECUTION.authorityBoundary
        .reviewerTrustGrantEstablished === false,
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5F_AI_REVIEW_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const aiAssistedInternalReviewEstablished = blockers.length === 0;

  const material = Object.freeze({
    reviewVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_AI_INTERNAL_REVIEW_VERSION,
    issue: '#1887' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticVersion: '2.0.0' as const,
    reviewerClass: 'AI_ASSISTED_INTERNAL_REVIEW' as const,
    reviewerId:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_AI_INTERNAL_REVIEWER_ID,
    reviewedCandidateRef:
      buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleCandidateRef(),
    checks,
    blockers,
    aiAssistedInternalReviewEstablished,
    authorityBoundary: Object.freeze({
      internalReviewOnly: true as const,
      reviewAttestationCreated: false as const,
      independentHumanDomainReviewEstablished: false as const,
      domainReviewAuthorityEstablished: false as const,
      reviewerTrustGrantEstablished: false as const,
      reviewerStatusPromotionAuthorized: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      lifecyclePromotionAuthorized: false as const,
      stagingActivationAuthorized: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    prohibitedInterpretations: Object.freeze([
      'AI_INTERNAL_REVIEW_IS_NOT_INDEPENDENT_HUMAN_DOMAIN_REVIEW',
      'AI_INTERNAL_REVIEW_DOES_NOT_CREATE_REVIEW_ATTESTATION',
      'AI_INTERNAL_REVIEW_DOES_NOT_CREATE_REVIEWER_TRUST_GRANT',
      'AI_INTERNAL_REVIEW_DOES_NOT_PROMOTE_REVIEWER_STATUS',
      'AI_INTERNAL_REVIEW_DOES_NOT_PROMOTE_PROVENANCE_QUALITY',
      'AI_INTERNAL_REVIEW_DOES_NOT_MUTATE_LIFECYCLE',
      'AI_INTERNAL_REVIEW_DOES_NOT_AUTHORIZE_PREVIEW_OFFICIAL_OR_PRODUCTION',
    ] as const),
  });

  return Object.freeze({
    reviewId: deterministicContentHash(material),
    ...material,
  });
}

export function buildRelationshipSpouseT8DayBranchPalaceBoundedEngineExecutionEvidence() {
  const checks = Object.freeze({
    exactIsolatedExecutionAuthorized:
      ISOLATED_EXECUTION.isolatedResearchExecutionAuthorized === true &&
      ISOLATED_EXECUTION.nextDisposition ===
        'RUN_SA_5F_STAGING_LIFECYCLE_ELIGIBILITY_REVIEW',
    exactExecutionAuthorityValid:
      ISOLATED_EXECUTION.checks.authorityValidationValid === true &&
      ISOLATED_EXECUTION.checks.authorityValidationBlockers.length === 0,
    registryIntegrityVerified:
      ISOLATED_EXECUTION.checks.registryIntegrityVerified === true &&
      ISOLATED_EXECUTION.checks.registryIntegrityErrors.length === 0,
    exactRegistryAndPackBound:
      ISOLATED_EXECUTION.checks.exactRegistryBinding === true &&
      ISOLATED_EXECUTION.checks.exactPackBinding === true,
    deterministicFixtureCoverageDeclared:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.quality.testCoverage ===
        'fixture_matrix' &&
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.quality
        .methodologyStability === 'stable_within_method',
    failCloseContractBound:
      BRIDGE_REVIEW.checks.failCloseContractComplete === true,
    exactSemanticProjectionBound:
      ISOLATED_EXECUTION.checks.exactClaimSurface === true &&
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.output.value.position ===
        'day_branch' &&
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.output.value
        .traditionalRole === 'spouse_palace' &&
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.output.value
        .semanticScope === 'position_only',
    executionAuthorityCannotEscalate:
      ISOLATED_EXECUTION.authorityBoundary.lifecycleMutationAuthorized ===
        false &&
      ISOLATED_EXECUTION.authorityBoundary.stagingAuthorized === false &&
      ISOLATED_EXECUTION.authorityBoundary.shadowExecutionAuthorized ===
        false &&
      ISOLATED_EXECUTION.authorityBoundary.productionAuthorityAuthorized ===
        false,
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5F_ENGINE_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .sort(),
  );

  const boundedEngineExecutionEvidenceComplete = blockers.length === 0;

  const material = Object.freeze({
    evidenceVersion:
      'myeonghwa-relationship-spouse-t8-day-branch-palace-bounded-engine-execution-evidence-v1' as const,
    issue: '#1887' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticVersion: '2.0.0' as const,
    upstreamExecutionId: ISOLATED_EXECUTION.executionId,
    executionAuthorityRef:
      ISOLATED_EXECUTION.executionAuthority.authorityRef,
    registrySnapshotId:
      ISOLATED_EXECUTION.authorizedRegistrySnapshotId,
    packRef: ISOLATED_EXECUTION.authorizedPackRef,
    checks,
    blockers,
    boundedEngineExecutionEvidenceComplete,
    authorityBoundary: Object.freeze({
      evidenceOnly: true as const,
      lifecycleMutationAuthorized: false as const,
      stagingActivationAuthorized: false as const,
      shadowExecutionAuthorized: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      production: 'HOLD' as const,
    }),
  });

  return Object.freeze({
    evidenceId: deterministicContentHash(material),
    ...material,
  });
}

export function buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleEligibilityReview() {
  const candidateRef =
    buildRelationshipSpouseT8DayBranchPalaceStagingLifecycleCandidateRef();
  const aiReview =
    buildRelationshipSpouseT8DayBranchPalaceAiAssistedInternalReview();
  const engineEvidence =
    buildRelationshipSpouseT8DayBranchPalaceBoundedEngineExecutionEvidence();

  const semanticScopeFrozen =
    BRIDGE_REVIEW.checks.exactSemanticScope === true &&
    BRIDGE_REVIEW.checks.forbiddenSemanticExpansionAbsent === true &&
    ISOLATED_EXECUTION.checks.exactClaimSurface === true;

  const exactContentAddressing =
    contentRefValid(candidateRef) &&
    contentRefValid(ISOLATED_EXECUTION.executionAuthority.authorityRef) &&
    contentRefValid(ISOLATED_EXECUTION.candidateRef) &&
    contentRefValid(ISOLATED_EXECUTION.authorizedPackRef) &&
    /^[a-f0-9]{64}$/u.test(ISOLATED_EXECUTION.executionId);

  const sourceBindingComplete =
    ISOLATED_EXECUTION.checks.exactSourceBinding === true &&
    SOURCE_MANIFEST.manifestCandidateComplete === true &&
    SOURCE_MANIFEST.checks.exactSurveyDirectBasisPair === true &&
    SOURCE_MANIFEST.checks.exactlyTwoRuntimeSources === true &&
    SOURCE_MANIFEST.checks.mappingsResolve === true &&
    SOURCE_MANIFEST.checks.methodologyCoverage === true &&
    SOURCE_MANIFEST.checks.directBasisCoverage === true;

  const sourceRolePinningComplete =
    sourceBindingComplete &&
    ISOLATED_EXECUTION.checks.noCorroborationInflation === true &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_DIRECT_BASIS_SOURCE_LINKS
      .length === 2 &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_DIRECT_BASIS_SOURCE_LINKS.every(
      (link) => link.supportType === 'direct_basis',
    );

  const passagePropositionBindingComplete =
    SOURCE_MANIFEST.checks.exactSurveyDirectBasisPair === true &&
    PROVENANCE_SURVEY.observations.noCrossSourceSyntheticProposition ===
      true &&
    PROVENANCE_SURVEY.observations.multiSourceSupported === true;

  const rightsReuseHandlingExplicit =
    SOURCE_MANIFEST.checks.rightsHandlingExplicit === true &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_SOURCE_MANIFEST_CANDIDATE_SOURCES.every(
      (source) =>
        source.rights?.copyrightStatus === 'unknown' &&
        source.rights.reusePolicy === 'metadata_only',
    );

  const counterexamplesAndDivergenceReviewed =
    PROVENANCE_SURVEY.observations.historicalWifeLanguageNotAutoTranslated ===
      true &&
    PROVENANCE_SURVEY.observations.noCrossSourceSyntheticProposition ===
      true &&
    aiReview.checks.provenanceBoundaryPreserved === true;

  const calculationConventionsExplicit =
    BRIDGE_REVIEW.checks.exactCanonicalInput === true &&
    BRIDGE_REVIEW.checks.demographicInputIsolation === true;

  const executablePredicatesNoHiddenGuesses =
    calculationConventionsExplicit &&
    BRIDGE_REVIEW.checks.failCloseContractComplete === true &&
    BRIDGE_REVIEW.checks.forbiddenSemanticExpansionAbsent === true;

  const ambiguityUnknownFailClosed =
    BRIDGE_REVIEW.checks.failCloseContractComplete === true &&
    engineEvidence.checks.failCloseContractBound === true;

  const deterministicAndRegressionTestsPass =
    engineEvidence.checks.deterministicFixtureCoverageDeclared === true &&
    engineEvidence.boundedEngineExecutionEvidenceComplete === true;

  const engineE2eComplete =
    engineEvidence.boundedEngineExecutionEvidenceComplete === true;

  const semanticExpansionGuardsComplete =
    BRIDGE_REVIEW.checks.forbiddenSemanticExpansionAbsent === true &&
    BRIDGE_REVIEW.checks.consumerIsolation === true &&
    ISOLATED_EXECUTION.authorityBoundary.narrativeConsumerActivated ===
      false &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
      .materialForNarrative === false;

  const aiAdversarialInternalReviewComplete =
    aiReview.aiAssistedInternalReviewEstablished === true;

  const evidence = Object.freeze({
    semanticScopeFrozen,
    exactContentAddressing,
    sourceBindingComplete,
    sourceRolePinningComplete,
    passagePropositionBindingComplete,
    rightsReuseHandlingExplicit,
    counterexamplesAndDivergenceReviewed,
    calculationConventionsExplicit,
    executablePredicatesNoHiddenGuesses,
    ambiguityUnknownFailClosed,
    deterministicAndRegressionTestsPass,
    engineE2eComplete,
    semanticExpansionGuardsComplete,
    aiAdversarialInternalReviewComplete,
  });

  const disqualifiers = Object.freeze({
    openEndedNarrativeSemantics:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
        .materialForNarrative !== false ||
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.output.value
        .semanticScope !== 'position_only',
    unresolvedMethodologyConflict:
      PROVENANCE_SURVEY.provenanceRoute !== 'MULTI_SOURCE_SUPPORTED' ||
      BRIDGE_REVIEW.bridgeReentryAdmissionAuthorized !== true,
    crossSourceSyntheticRule:
      PROVENANCE_SURVEY.observations.noCrossSourceSyntheticProposition !==
        true ||
      !RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_DIRECT_BASIS_SOURCE_LINKS.every(
        (link) => link.supportType === 'direct_basis',
      ),
    semanticScopeNotFrozen: !semanticScopeFrozen,
  });

  const policyEvaluation = evaluateSourceAdjudicationApplicability({
    candidateRef,
    claimClass: 'bounded_deterministic_correspondence',
    intendedLifecycleTarget: 'staging',
    evidence,
    disqualifiers,
  });

  const exactUpstreamExecution =
    ISOLATED_EXECUTION.isolatedResearchExecutionAuthorized === true &&
    ISOLATED_EXECUTION.nextDisposition ===
      'RUN_SA_5F_STAGING_LIFECYCLE_ELIGIBILITY_REVIEW' &&
    ISOLATED_EXECUTION.blockers.length === 0;

  const exactPolicyBinding =
    refsEqual(
      policyEvaluation.policyRef,
      SOURCE_ADJUDICATION_POLICY.policyRef,
    ) &&
    policyEvaluation.intendedLifecycleTarget === 'staging';

  const exactCandidateBinding =
    refsEqual(policyEvaluation.candidateRef, candidateRef) &&
    candidateRef.version === '2.0.0';

  const objectiveEligibilityEstablished =
    policyEvaluation.objectiveEligibility === true &&
    policyEvaluation.status ===
      'ELIGIBLE_FOR_EXPLICIT_GOVERNANCE_DECISION' &&
    policyEvaluation.approvedDecisionPresent === false &&
    policyEvaluation.blockers.length === 0 &&
    policyEvaluation.gate12Resolution.status === 'PENDING';

  const legacyV110Isolated =
    RELATIONSHIP_SPOUSE_T8_SOURCE_ADJUDICATED_STAGING_RUNTIME_VERSION ===
      '1.1.0' &&
    ISOLATED_EXECUTION.checks.legacyV110Isolated === true &&
    ISOLATED_EXECUTION.authorityBoundary.legacyV110Mutated === false;

  const reviewAuthorityPreserved =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.quality.reviewerStatus ===
      'unreviewed' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_REGISTRY_CANDIDATE
      .reviewAttestations.length === 0 &&
    aiReview.authorityBoundary.reviewAttestationCreated === false &&
    aiReview.authorityBoundary.reviewerTrustGrantEstablished === false;

  const lifecycleStillResearchOnly =
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_METHODOLOGY.status ===
      'research' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_RULE.status === 'research' &&
    RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PACK.status === 'research' &&
    ISOLATED_EXECUTION.authorityBoundary.lifecycleMutationAuthorized ===
      false &&
    ISOLATED_EXECUTION.authorityBoundary.stagingAuthorized === false;

  const checks = Object.freeze({
    exactUpstreamExecution,
    exactPolicyBinding,
    exactCandidateBinding,
    objectiveEligibilityEstablished,
    aiAssistedInternalReviewEstablished:
      aiReview.aiAssistedInternalReviewEstablished,
    boundedEngineExecutionEvidenceComplete:
      engineEvidence.boundedEngineExecutionEvidenceComplete,
    sourceManifestComplete: SOURCE_MANIFEST.manifestCandidateComplete,
    legacyV110Isolated,
    reviewAuthorityPreserved,
    lifecycleStillResearchOnly,
  });

  const blockers = Object.freeze(
    Object.entries(checks)
      .filter(([, value]) => value !== true)
      .map(
        ([key]) =>
          `SA5F_${key
            .replace(/[A-Z]/gu, (match) => `_${match}`)
            .toUpperCase()}_FAILED`,
      )
      .concat(policyEvaluation.blockers.map((blocker) => `SA5F_POLICY:${blocker}`))
      .concat(aiReview.blockers)
      .concat(engineEvidence.blockers)
      .sort(),
  );

  const stagingLifecycleEligibilityEstablished =
    blockers.length === 0 && objectiveEligibilityEstablished;

  const material = Object.freeze({
    reviewVersion:
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_LIFECYCLE_ELIGIBILITY_REVIEW_VERSION,
    issue: '#1887' as const,
    capabilityKey: 'relationship:natal:spouse' as const,
    semanticFamily:
      'DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION' as const,
    semanticVersion: '2.0.0' as const,
    upstreamExecutionId: ISOLATED_EXECUTION.executionId,
    upstreamExecutionAuthorityRef:
      ISOLATED_EXECUTION.executionAuthority.authorityRef,
    candidateRef,
    policyRef: SOURCE_ADJUDICATION_POLICY.policyRef,
    aiInternalReviewId: aiReview.reviewId,
    boundedEngineExecutionEvidenceId: engineEvidence.evidenceId,
    evidence,
    disqualifiers,
    policyEvaluation,
    checks,
    blockers,
    stagingLifecycleEligibilityEstablished,
    authorityBoundary: Object.freeze({
      exactCandidateOnly: true as const,
      objectiveEligibilityEstablished:
        stagingLifecycleEligibilityEstablished,
      explicitGovernanceDecisionPresent: false as const,
      explicitGovernanceDecisionMayBeRequested:
        stagingLifecycleEligibilityEstablished,
      sourceAdjudicationAuthorityEstablished: false as const,
      humanDomainReviewEstablished: false as const,
      reviewAttestationCreated: false as const,
      reviewerTrustGrantEstablished: false as const,
      reviewerStatusPromotionAuthorized: false as const,
      provenanceQualityPromotionAuthorized: false as const,
      lifecycleMutationAuthorized: false as const,
      stagingLifecycleMutationAuthorized: false as const,
      stagingRuntimeActivationAuthorized: false as const,
      shadowExecutionAuthorized: false as const,
      narrativeConsumerActivated: false as const,
      previewAuthorityAuthorized: false as const,
      officialReadingAuthorityAuthorized: false as const,
      productionAuthorityAuthorized: false as const,
      production: 'HOLD' as const,
    }),
    nextDisposition: stagingLifecycleEligibilityEstablished
      ? ('REQUEST_SA_5G_EXPLICIT_STAGING_GOVERNANCE_DECISION' as const)
      : ('REPAIR_SA_5F_STAGING_LIFECYCLE_ELIGIBILITY_BLOCKERS' as const),
  });

  return Object.freeze({
    reviewId: deterministicContentHash(material),
    ...material,
  });
}
