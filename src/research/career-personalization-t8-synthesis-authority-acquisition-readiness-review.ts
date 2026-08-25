import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
  buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview,
  type CareerPersonalizationBoundedT5T6T8SynthesisMethodologyReviewReport,
} from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENTS,
  CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENT_CONTROL_IDS,
  buildCareerPersonalizationT8SynthesisAuthorityGapRequirementsReview,
  type CareerPersonalizationT8SynthesisAuthorityGapRequirementsReviewReport,
  type CareerT8SynthesisAuthorityGapId,
} from './career-personalization-t8-synthesis-authority-gap-requirements-review.js';
import type { CareerPersonalizationPostP4T8ReadinessReviewReport } from './career-personalization-post-p4-t8-readiness-review.js';
import type { CareerT6PublicClassicBoundedScopeMethodologyReviewReport } from './career-personalization-t6-public-classic-bounded-scope-methodology-review.js';

export const CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-synthesis-authority-acquisition-readiness-review-v1' as const;

export type CareerT8AuthorityDiscoveryLaneId =
  | 'TEN_GOD_SEMANTIC_COMPOSITION'
  | 'STRUCTURAL_QUALIFIER_MODIFIERS'
  | 'MULTI_PATTERN_COMPOSITION';

export interface CareerT8AuthorityDiscoveryLane {
  laneId: CareerT8AuthorityDiscoveryLaneId;
  targetGapIds: readonly CareerT8SynthesisAuthorityGapId[];
  objective: string;
  candidateMayTargetSubsetOfLaneGaps: true;
  candidateMustDeclareTargetGapIds: true;
}

export interface CareerT8AuthorityCandidateAdmissionContract {
  gapId: CareerT8SynthesisAuthorityGapId;
  exactEvidenceForGapRequired: true;
  exactSourceIdentityRequired: true;
  oneNormalizedSourceReferencePerCandidateRequired: true;
  stableRevisionOrEquivalentReproducibleLocatorRequired: true;
  exactLocatorForGapRequired: true;
  originalSourceInspectionRequired: true;
  originalOrVerifiedSourceContextRequired: true;
  explicitCareerOrWorkSemanticAssertionRequired: true;
  explicitContextOrExceptionTreatmentRequired: true;
  independentNormativeProvenanceRequired: true;
  sourceClassAloneSufficient: false;
  vocabularyMentionAloneSufficient: false;
  structuralCoPresenceAloneSufficient: false;
  searchSnippetSubstitutionAllowed: false;
  generalKnowledgeSubstitutionAllowed: false;
  modelSynthesisSubstitutionAllowed: false;
  empiricalCalibrationSubstitutionAllowed: false;
  numericWeightingSubstitutionAllowed: false;
  legacyCareerT8SubstitutionAllowed: false;
  crossCandidateCompositionForSameGapAllowed: false;
}

export const CAREER_T8_AUTHORITY_ACQUISITION_CONTROL_IDS = Object.freeze([
  'ACQUISITION_READINESS_DOES_NOT_DISCOVER_REGISTER_OR_ACCEPT_CANDIDATES',
  'SIX_DISTINCT_SEMANTIC_GAPS_DO_NOT_REQUIRE_ONE_SOURCE_TO_COVER_ALL_SIX',
  'ONE_CANDIDATE_MAY_TARGET_ONE_OR_MORE_GAPS_ONLY_WITH_EXACT_EVIDENCE_PER_GAP',
  'EACH_TARGETED_GAP_REQUIRES_EXACT_SOURCE_IDENTITY_AND_LOCATOR',
  'SEARCH_SNIPPETS_ARE_DISCOVERY_LEADS_ONLY_NOT_AUTHORITY_EVIDENCE',
  'SOURCE_CLASS_ALONE_CANNOT_SATISFY_A_GAP',
  'SINGLE_SOURCE_FULL_COVERAGE_IS_PREFERRED_PER_GAP_NOT_GLOBALLY',
  'MULTIPLE_PARTIAL_CANDIDATES_MAY_NOT_BE_COMPOSED_FOR_ONE_GAP_WITHOUT_SEPARATE_POLICY',
  'DISTINCT_GAPS_MAY_USE_DISTINCT_ACCEPTED_SOURCES',
  'EXISTING_REPOSITORY_SOURCES_MAY_BE_RECONSIDERED_BUT_NOT_AUTO_ACCEPTED',
  'REQUIREMENT_COVERAGE_EVALUATION_IS_REQUIRED_AFTER_CANDIDATE_DISCOVERY',
  'CANDIDATE_DISCOVERY_OR_REGISTRATION_ALONE_DOES_NOT_CLOSE_A_GAP',
  'NO_NUMERIC_WEIGHTING_WINNER_LOSER_DAMAGE_OR_PRECEDENCE_INFERENCE',
  'NO_LEGACY_CAREER_T8_REUSE_OR_AUTO_PROMOTION_OF_LOWER_TIER_CLAIMS',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT_BY_THIS_GATE',
] as const);

function gapIds(
  ...ids: readonly CareerT8SynthesisAuthorityGapId[]
): readonly CareerT8SynthesisAuthorityGapId[] {
  return Object.freeze([...ids]);
}

export const CAREER_T8_AUTHORITY_DISCOVERY_LANES = Object.freeze([
  Object.freeze({
    laneId: 'TEN_GOD_SEMANTIC_COMPOSITION',
    targetGapIds: gapIds(
      'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
      'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
    ),
    objective:
      'Find exact authority for composing Ten-God subtype/family relations into bounded Career or work-expression semantics.',
    candidateMayTargetSubsetOfLaneGaps: true,
    candidateMustDeclareTargetGapIds: true,
  }),
  Object.freeze({
    laneId: 'STRUCTURAL_QUALIFIER_MODIFIERS',
    targetGapIds: gapIds(
      'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
      'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
      'SEASONAL_PHASE_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
    ),
    objective:
      'Find exact authority for qualitative structural/interaction qualifiers that modify an already-established Career semantic without numeric weighting.',
    candidateMayTargetSubsetOfLaneGaps: true,
    candidateMustDeclareTargetGapIds: true,
  }),
  Object.freeze({
    laneId: 'MULTI_PATTERN_COMPOSITION',
    targetGapIds: gapIds('MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING'),
    objective:
      'Find an explicit source-bound composition policy for coexistence, reinforcement, tension, qualification, or precedence among multiple Career patterns.',
    candidateMayTargetSubsetOfLaneGaps: true,
    candidateMustDeclareTargetGapIds: true,
  }),
] as const satisfies readonly CareerT8AuthorityDiscoveryLane[]);

export interface CareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_SYNTHESIS_AUTHORITY_ACQUISITION_READINESS'
    | 'UPSTREAM_B5_BOUNDARY_INVALID';
  decision:
    | 'GAP_SCOPED_GOVERNED_AUTHORITY_ACQUISITION_CONTRACT_FROZEN_NO_AUTHORITY_ACQUIRED'
    | 'CAREER_T8_SYNTHESIS_AUTHORITY_ACQUISITION_READINESS_NOT_ESTABLISHED';
  upstreamB5ReviewId: string;
  exactB5BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  reviewerStatus: 'unreviewed';
  acquisitionMode: 'GAP_SCOPED_CANDIDATE_DISCOVERY' | 'NONE';
  discoveryLanes: readonly CareerT8AuthorityDiscoveryLane[];
  discoveryLaneCount: 3 | 0;
  admissionContracts: readonly CareerT8AuthorityCandidateAdmissionContract[];
  admissionContractCount: 6 | 0;
  allSixGapsCoveredExactlyOnceByAdmissionContract: boolean;
  allSixGapsAssignedExactlyOnceToDiscoveryLane: boolean;
  oneCandidateMayTargetMultipleGaps: boolean;
  oneCandidateMustCoverAllSixGaps: false;
  differentGapsMayUseDifferentAcceptedSources: boolean;
  singleSourceFullCoveragePreferredPerGap: boolean;
  singleSourceFullCoverageRequiredGlobally: false;
  crossCandidateCompositionForSameGapAuthorized: false;
  multiSourceCompositionPolicyForSameGapResolved: false;
  oneNormalizedSourceReferencePerCandidateRequired: boolean;
  exactSourceIdentityRequired: boolean;
  stableRevisionOrEquivalentReproducibleLocatorRequired: boolean;
  exactLocatorPerTargetedGapRequired: boolean;
  originalSourceInspectionRequired: boolean;
  candidateMayBeHistoricalPrimarySource: boolean;
  candidateMayBeScholarlyOrInstitutionalReference: boolean;
  candidateMayBePractitionerSecondarySource: boolean;
  sourceClassAloneMaySatisfyGap: false;
  searchSnippetMayBeDiscoveryLead: boolean;
  searchSnippetMayCountAsAuthorityEvidence: false;
  existingRepositorySourceMayBeReconsidered: boolean;
  existingRepositorySourceAutomaticallyAccepted: false;
  sourceRegistrationAloneMayCloseGap: false;
  candidateDiscoveryAloneMayCloseGap: false;
  requirementCoverageEvaluationRequiredAfterDiscovery: boolean;
  candidateDiscoveryPerformedByThisGate: false;
  candidateRegisteredByThisGate: false;
  requirementCoverageEvaluatedByThisGate: false;
  authorityAcquiredByThisGate: false;
  authorityGapClosedByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof CAREER_T8_AUTHORITY_ACQUISITION_CONTROL_IDS)[number][];
  controlCount: 15 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    sourceCandidatesDiscovered: 0;
    sourceCandidatesRegistered: 0;
    methodologyDefinitionsCreated: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    registrySnapshotsCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
    | 'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_GAP_REQUIREMENTS_REVIEW';
}

function exactB5Accepted(
  p4: CareerT6PublicClassicBoundedScopeMethodologyReviewReport,
  readiness: CareerPersonalizationPostP4T8ReadinessReviewReport,
  b4: CareerPersonalizationBoundedT5T6T8SynthesisMethodologyReviewReport,
  b5: CareerPersonalizationT8SynthesisAuthorityGapRequirementsReviewReport,
): boolean {
  const expectedB4 = buildCareerPersonalizationBoundedT5T6T8SynthesisMethodologyReview(p4, readiness);
  const expectedB5 = buildCareerPersonalizationT8SynthesisAuthorityGapRequirementsReview(
    p4,
    readiness,
    expectedB4,
  );
  return (
    deterministicContentHash(b4) === deterministicContentHash(expectedB4) &&
    b4.reviewId === expectedB4.reviewId &&
    deterministicContentHash(b5) === deterministicContentHash(expectedB5) &&
    b5.reviewId === expectedB5.reviewId &&
    b5.status === 'RESOLVED_CAREER_T8_SYNTHESIS_AUTHORITY_GAP_REQUIREMENTS_REVIEW' &&
    b5.decision ===
      'SIX_PERSONALIZED_CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENTS_FROZEN_NO_T8_SEMANTICS_AUTHORIZED' &&
    b5.authorityGapConfirmed &&
    b5.authorityGapClosed === false &&
    b5.additionalAuthorityRequired &&
    b5.unresolvedGapCount === 6 &&
    deterministicContentHash(b5.unresolvedGapIds) ===
      deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b5.requirementCount === 6 &&
    deterministicContentHash(b5.requirements) ===
      deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENTS) &&
    b5.controlIds.length === CAREER_T8_SYNTHESIS_AUTHORITY_REQUIREMENT_CONTROL_IDS.length &&
    b5.controlsFrozen &&
    b5.t8RuleAuthoringAuthorized === false &&
    b5.productionPromotionAuthorized === false &&
    b5.recommendedNextGate ===
      'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_ACQUISITION_READINESS_REVIEW'
  );
}

function admissionContracts(): readonly CareerT8AuthorityCandidateAdmissionContract[] {
  return CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS.map((gapId) =>
    Object.freeze({
      gapId,
      exactEvidenceForGapRequired: true,
      exactSourceIdentityRequired: true,
      oneNormalizedSourceReferencePerCandidateRequired: true,
      stableRevisionOrEquivalentReproducibleLocatorRequired: true,
      exactLocatorForGapRequired: true,
      originalSourceInspectionRequired: true,
      originalOrVerifiedSourceContextRequired: true,
      explicitCareerOrWorkSemanticAssertionRequired: true,
      explicitContextOrExceptionTreatmentRequired: true,
      independentNormativeProvenanceRequired: true,
      sourceClassAloneSufficient: false,
      vocabularyMentionAloneSufficient: false,
      structuralCoPresenceAloneSufficient: false,
      searchSnippetSubstitutionAllowed: false,
      generalKnowledgeSubstitutionAllowed: false,
      modelSynthesisSubstitutionAllowed: false,
      empiricalCalibrationSubstitutionAllowed: false,
      numericWeightingSubstitutionAllowed: false,
      legacyCareerT8SubstitutionAllowed: false,
      crossCandidateCompositionForSameGapAllowed: false,
    }),
  );
}

function gapCoverageExact(contracts: readonly CareerT8AuthorityCandidateAdmissionContract[]): boolean {
  const ids = contracts.map((item) => item.gapId);
  return (
    ids.length === CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS.length &&
    new Set(ids).size === ids.length &&
    CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS.every((gapId) => ids.includes(gapId))
  );
}

function laneCoverageExact(): boolean {
  const ids = CAREER_T8_AUTHORITY_DISCOVERY_LANES.flatMap((lane) => lane.targetGapIds);
  return (
    ids.length === CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS.length &&
    new Set(ids).size === ids.length &&
    CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS.every((gapId) => ids.includes(gapId))
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReviewReport, 'reviewId'>,
): CareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReviewReport {
  return {
    reviewId: `career_t8_synthesis_authority_acquisition_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReview(
  p4: CareerT6PublicClassicBoundedScopeMethodologyReviewReport,
  readiness: CareerPersonalizationPostP4T8ReadinessReviewReport,
  b4: CareerPersonalizationBoundedT5T6T8SynthesisMethodologyReviewReport,
  b5: CareerPersonalizationT8SynthesisAuthorityGapRequirementsReviewReport,
): CareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReviewReport {
  const upstreamAccepted = exactB5Accepted(p4, readiness, b4, b5);
  const contracts = admissionContracts();
  const gapCoverageAccepted = gapCoverageExact(contracts);
  const laneCoverageAccepted = laneCoverageExact();
  const accepted = upstreamAccepted && gapCoverageAccepted && laneCoverageAccepted;

  return finalized({
    reviewVersion: CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_SYNTHESIS_AUTHORITY_ACQUISITION_READINESS'
      : 'UPSTREAM_B5_BOUNDARY_INVALID',
    decision: accepted
      ? 'GAP_SCOPED_GOVERNED_AUTHORITY_ACQUISITION_CONTRACT_FROZEN_NO_AUTHORITY_ACQUIRED'
      : 'CAREER_T8_SYNTHESIS_AUTHORITY_ACQUISITION_READINESS_NOT_ESTABLISHED',
    upstreamB5ReviewId: b5.reviewId,
    exactB5BoundaryAccepted: upstreamAccepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    reviewerStatus: 'unreviewed',
    acquisitionMode: accepted ? 'GAP_SCOPED_CANDIDATE_DISCOVERY' : 'NONE',
    discoveryLanes: accepted ? CAREER_T8_AUTHORITY_DISCOVERY_LANES : Object.freeze([]),
    discoveryLaneCount: accepted ? 3 : 0,
    admissionContracts: accepted ? contracts : Object.freeze([]),
    admissionContractCount: accepted ? 6 : 0,
    allSixGapsCoveredExactlyOnceByAdmissionContract: accepted && gapCoverageAccepted,
    allSixGapsAssignedExactlyOnceToDiscoveryLane: accepted && laneCoverageAccepted,
    oneCandidateMayTargetMultipleGaps: accepted,
    oneCandidateMustCoverAllSixGaps: false,
    differentGapsMayUseDifferentAcceptedSources: accepted,
    singleSourceFullCoveragePreferredPerGap: accepted,
    singleSourceFullCoverageRequiredGlobally: false,
    crossCandidateCompositionForSameGapAuthorized: false,
    multiSourceCompositionPolicyForSameGapResolved: false,
    oneNormalizedSourceReferencePerCandidateRequired: accepted,
    exactSourceIdentityRequired: accepted,
    stableRevisionOrEquivalentReproducibleLocatorRequired: accepted,
    exactLocatorPerTargetedGapRequired: accepted,
    originalSourceInspectionRequired: accepted,
    candidateMayBeHistoricalPrimarySource: accepted,
    candidateMayBeScholarlyOrInstitutionalReference: accepted,
    candidateMayBePractitionerSecondarySource: accepted,
    sourceClassAloneMaySatisfyGap: false,
    searchSnippetMayBeDiscoveryLead: accepted,
    searchSnippetMayCountAsAuthorityEvidence: false,
    existingRepositorySourceMayBeReconsidered: accepted,
    existingRepositorySourceAutomaticallyAccepted: false,
    sourceRegistrationAloneMayCloseGap: false,
    candidateDiscoveryAloneMayCloseGap: false,
    requirementCoverageEvaluationRequiredAfterDiscovery: accepted,
    candidateDiscoveryPerformedByThisGate: false,
    candidateRegisteredByThisGate: false,
    requirementCoverageEvaluatedByThisGate: false,
    authorityAcquiredByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted ? CAREER_T8_AUTHORITY_ACQUISITION_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 15 : 0,
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      sourceCandidatesDiscovered: 0,
      sourceCandidatesRegistered: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    }),
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
      : 'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_GAP_REQUIREMENTS_REVIEW',
  });
}
