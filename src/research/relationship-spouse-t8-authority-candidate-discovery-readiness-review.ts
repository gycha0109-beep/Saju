import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS,
  buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview,
  type RelationshipSpouseT8AuthorityAcquisitionReadinessReviewReport,
  type RelationshipSpouseT8AuthorityGapId,
} from './relationship-spouse-t8-authority-acquisition-readiness-review.js';

export const RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-authority-candidate-discovery-readiness-review-v1' as const;

export type RelationshipSpouseT8AuthorityDiscoveryLaneId =
  | 'SPOUSE_SEMANTIC_AND_APPLICABILITY'
  | 'SPOUSE_COMPOSITION_AND_SCOPE'
  | 'SPOUSE_NORMATIVE_PROVENANCE';

export interface RelationshipSpouseT8AuthorityDiscoveryLane {
  laneId: RelationshipSpouseT8AuthorityDiscoveryLaneId;
  targetGapIds: readonly RelationshipSpouseT8AuthorityGapId[];
  objective: string;
  candidateMayTargetSubsetOfLaneGaps: true;
  candidateMustDeclareTargetGapIds: true;
}

export interface RelationshipSpouseT8AuthorityCandidateAdmissionContract {
  gapId: RelationshipSpouseT8AuthorityGapId;
  exactEvidenceForGapRequired: true;
  exactSourceIdentityRequired: true;
  oneNormalizedSourceReferencePerCandidateRequired: true;
  stableRevisionOrEquivalentReproducibleLocatorRequired: true;
  exactLocatorForGapRequired: true;
  originalSourceInspectionRequired: true;
  originalOrVerifiedSourceContextRequired: true;
  explicitSpouseSemanticAssertionRequired: true;
  explicitApplicabilityBoundaryRequired: true;
  explicitContextOrExceptionTreatmentRequired: true;
  independentNormativeProvenanceRequired: true;
  sourceClassAloneSufficient: false;
  spouseVocabularyMentionAloneSufficient: false;
  dayBranchSpouseConventionAloneSufficient: false;
  tenGodSpouseRoleConventionAloneSufficient: false;
  broadRelationshipClaimReuseAllowed: false;
  searchSnippetSubstitutionAllowed: false;
  generalKnowledgeSubstitutionAllowed: false;
  modelSynthesisSubstitutionAllowed: false;
  compatibilityAuthoritySubstitutionAllowed: false;
  crossCandidateCompositionForSameGapAllowed: false;
}

export const RELATIONSHIP_SPOUSE_T8_AUTHORITY_DISCOVERY_LANES = Object.freeze([
  Object.freeze({
    laneId: 'SPOUSE_SEMANTIC_AND_APPLICABILITY',
    targetGapIds: Object.freeze([
      'SPOUSE_SPECIFIC_SEMANTIC_BINDING_MISSING',
      'SPOUSE_APPLICABILITY_BOUNDARY_MISSING',
    ] as const),
    objective:
      'Find exact source-bound spouse-specific natal semantics together with their role, sex/polarity, chart, or traditional-method applicability boundaries.',
    candidateMayTargetSubsetOfLaneGaps: true,
    candidateMustDeclareTargetGapIds: true,
  }),
  Object.freeze({
    laneId: 'SPOUSE_COMPOSITION_AND_SCOPE',
    targetGapIds: Object.freeze([
      'SPOUSE_MULTI_CLAIM_COMPOSITION_METHOD_MISSING',
      'SPOUSE_SCOPE_LIMITS_AND_EXCEPTIONS_MISSING',
    ] as const),
    objective:
      'Find a governed multi-claim spouse synthesis method and explicit positive/negative scope limits without deterministic partner or relationship-outcome shortcuts.',
    candidateMayTargetSubsetOfLaneGaps: true,
    candidateMustDeclareTargetGapIds: true,
  }),
  Object.freeze({
    laneId: 'SPOUSE_NORMATIVE_PROVENANCE',
    targetGapIds: Object.freeze(['SPOUSE_NORMATIVE_PROVENANCE_REVIEW_MISSING'] as const),
    objective:
      'Find independently traceable, reproducible source identity and exact passage context sufficient for later adequacy and provenance review.',
    candidateMayTargetSubsetOfLaneGaps: true,
    candidateMustDeclareTargetGapIds: true,
  }),
] as const satisfies readonly RelationshipSpouseT8AuthorityDiscoveryLane[]);

export const RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_CONTROL_IDS = Object.freeze([
  'DISCOVERY_READINESS_DOES_NOT_DISCOVER_REGISTER_ACCEPT_OR_PROMOTE_CANDIDATES',
  'EACH_TARGETED_GAP_REQUIRES_EXACT_SOURCE_IDENTITY_AND_LOCATOR',
  'ONE_CANDIDATE_MAY_TARGET_MULTIPLE_GAPS_ONLY_WITH_EXACT_EVIDENCE_PER_GAP',
  'DIFFERENT_GAPS_MAY_USE_DIFFERENT_ACCEPTED_SOURCES',
  'SOURCE_CLASS_OR_SPOUSE_VOCABULARY_MENTION_ALONE_CANNOT_SATISFY_A_GAP',
  'DAY_BRANCH_SPOUSE_CONVENTION_ALONE_CANNOT_SATISFY_A_GAP',
  'TEN_GOD_SPOUSE_ROLE_CONVENTION_ALONE_CANNOT_SATISFY_A_GAP',
  'BROAD_RELATIONSHIP_GENERAL_AUTHORITY_CANNOT_SUBSTITUTE_FOR_SPOUSE_AUTHORITY',
  'SEARCH_SNIPPETS_GENERAL_KNOWLEDGE_AND_MODEL_SYNTHESIS_ARE_DISCOVERY_LEADS_ONLY',
  'COMPATIBILITY_AUTHORITY_CANNOT_SUBSTITUTE_FOR_SPOUSE_AUTHORITY',
  'MULTIPLE_PARTIAL_CANDIDATES_MAY_NOT_BE_COMPOSED_FOR_ONE_GAP_WITHOUT_SEPARATE_POLICY',
  'REQUIREMENT_COVERAGE_EVALUATION_IS_REQUIRED_AFTER_CANDIDATE_DISCOVERY',
  'CANDIDATE_DISCOVERY_OR_REGISTRATION_ALONE_DOES_NOT_CLOSE_A_GAP',
  'SPECIFIC_PARTNER_ATTRIBUTES_RELATIONSHIP_OUTCOMES_AND_FUTURE_TIMING_REMAIN_UNAUTHORIZED',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT_BY_THIS_GATE',
] as const);

export interface RelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReviewReport {
  reviewId: string;
  reviewVersion: typeof RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_REVIEW_VERSION;
  status:
    | 'RESOLVED_RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_REVIEW'
    | 'UPSTREAM_AUTHORITY_ACQUISITION_BOUNDARY_INVALID';
  decision:
    | 'GAP_SCOPED_SPOUSE_AUTHORITY_CANDIDATE_DISCOVERY_CONTRACT_FROZEN_NO_AUTHORITY_ACQUIRED'
    | 'SPOUSE_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_NOT_ESTABLISHED';
  upstreamReviewId: string;
  exactUpstreamBoundaryAccepted: boolean;
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  reviewerStatus: 'unreviewed';
  acquisitionMode: 'GAP_SCOPED_CANDIDATE_DISCOVERY' | 'NONE';
  discoveryLanes: readonly RelationshipSpouseT8AuthorityDiscoveryLane[];
  discoveryLaneCount: 3 | 0;
  admissionContracts: readonly RelationshipSpouseT8AuthorityCandidateAdmissionContract[];
  admissionContractCount: 5 | 0;
  allFiveGapsCoveredExactlyOnceByAdmissionContract: boolean;
  allFiveGapsAssignedExactlyOnceToDiscoveryLane: boolean;
  oneCandidateMayTargetMultipleGaps: boolean;
  oneCandidateMustCoverAllFiveGaps: false;
  differentGapsMayUseDifferentAcceptedSources: boolean;
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
  authorityAdmittedByThisGate: false;
  authorityGapClosedByThisGate: false;
  spouseT8RuleAuthoringAuthorized: false;
  spouseT8ClaimTypeCreationAuthorized: false;
  spouseInterpretationPackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_CONTROL_IDS)[number][];
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
    | 'RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
    | 'RELATIONSHIP_SPOUSE_T8_AUTHORITY_ACQUISITION_READINESS_REVIEW';
}

function exactUpstreamBoundaryAccepted(
  upstream: RelationshipSpouseT8AuthorityAcquisitionReadinessReviewReport,
): boolean {
  const expected = buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview();
  return (
    deterministicContentHash(upstream) === deterministicContentHash(expected) &&
    upstream.reviewId === expected.reviewId &&
    upstream.status === 'RESOLVED_RELATIONSHIP_SPOUSE_T8_AUTHORITY_ACQUISITION_READINESS_REVIEW' &&
    upstream.decision ===
      'FIVE_SPOUSE_T8_AUTHORITY_REQUIREMENTS_FROZEN_ZERO_SATISFIED_NO_SPOUSE_SEMANTICS_AUTHORIZED' &&
    upstream.broadRelationshipBoundaryAccepted &&
    upstream.broadRelationshipMayBeReusedAsSpouseAuthority === false &&
    upstream.broadRelationshipAuthorityInsufficientForSpouse &&
    upstream.spouseAuthorityAdmittedByThisGate === false &&
    upstream.spouseAuthorityGapClosedByThisGate === false &&
    upstream.requirementCount === 5 &&
    deterministicContentHash(upstream.requirements) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS) &&
    upstream.controlIds.length === RELATIONSHIP_SPOUSE_T8_AUTHORITY_CONTROL_IDS.length &&
    upstream.controlsFrozen &&
    upstream.spouseT8RuleAuthoringAuthorized === false &&
    upstream.productionPromotionAuthorized === false &&
    upstream.recommendedNextGate ===
      'RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_REVIEW'
  );
}

function admissionContracts(): readonly RelationshipSpouseT8AuthorityCandidateAdmissionContract[] {
  return RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS.map((requirement) =>
    Object.freeze({
      gapId: requirement.gapId,
      exactEvidenceForGapRequired: true,
      exactSourceIdentityRequired: true,
      oneNormalizedSourceReferencePerCandidateRequired: true,
      stableRevisionOrEquivalentReproducibleLocatorRequired: true,
      exactLocatorForGapRequired: true,
      originalSourceInspectionRequired: true,
      originalOrVerifiedSourceContextRequired: true,
      explicitSpouseSemanticAssertionRequired: true,
      explicitApplicabilityBoundaryRequired: true,
      explicitContextOrExceptionTreatmentRequired: true,
      independentNormativeProvenanceRequired: true,
      sourceClassAloneSufficient: false,
      spouseVocabularyMentionAloneSufficient: false,
      dayBranchSpouseConventionAloneSufficient: false,
      tenGodSpouseRoleConventionAloneSufficient: false,
      broadRelationshipClaimReuseAllowed: false,
      searchSnippetSubstitutionAllowed: false,
      generalKnowledgeSubstitutionAllowed: false,
      modelSynthesisSubstitutionAllowed: false,
      compatibilityAuthoritySubstitutionAllowed: false,
      crossCandidateCompositionForSameGapAllowed: false,
    }),
  );
}

function gapCoverageExact(
  contracts: readonly RelationshipSpouseT8AuthorityCandidateAdmissionContract[],
): boolean {
  const ids = contracts.map((item) => item.gapId);
  const expected = RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS.map((item) => item.gapId);
  return (
    ids.length === expected.length &&
    new Set(ids).size === ids.length &&
    expected.every((gapId) => ids.includes(gapId))
  );
}

function laneCoverageExact(): boolean {
  const ids = RELATIONSHIP_SPOUSE_T8_AUTHORITY_DISCOVERY_LANES.flatMap(
    (lane) => lane.targetGapIds,
  );
  const expected = RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS.map((item) => item.gapId);
  return (
    ids.length === expected.length &&
    new Set(ids).size === ids.length &&
    expected.every((gapId) => ids.includes(gapId))
  );
}

function finalized(
  material: Omit<RelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReviewReport, 'reviewId'>,
): RelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReviewReport {
  return {
    reviewId: `relationship_spouse_t8_candidate_discovery_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview(
  upstream: RelationshipSpouseT8AuthorityAcquisitionReadinessReviewReport,
): RelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReviewReport {
  const upstreamAccepted = exactUpstreamBoundaryAccepted(upstream);
  const contracts = admissionContracts();
  const gapCoverageAccepted = gapCoverageExact(contracts);
  const laneCoverageAccepted = laneCoverageExact();
  const accepted = upstreamAccepted && gapCoverageAccepted && laneCoverageAccepted;

  return finalized({
    reviewVersion: RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_REVIEW'
      : 'UPSTREAM_AUTHORITY_ACQUISITION_BOUNDARY_INVALID',
    decision: accepted
      ? 'GAP_SCOPED_SPOUSE_AUTHORITY_CANDIDATE_DISCOVERY_CONTRACT_FROZEN_NO_AUTHORITY_ACQUIRED'
      : 'SPOUSE_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_NOT_ESTABLISHED',
    upstreamReviewId: upstream.reviewId,
    exactUpstreamBoundaryAccepted: upstreamAccepted,
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    reviewerStatus: 'unreviewed',
    acquisitionMode: accepted ? 'GAP_SCOPED_CANDIDATE_DISCOVERY' : 'NONE',
    discoveryLanes: accepted ? RELATIONSHIP_SPOUSE_T8_AUTHORITY_DISCOVERY_LANES : Object.freeze([]),
    discoveryLaneCount: accepted ? 3 : 0,
    admissionContracts: accepted ? contracts : Object.freeze([]),
    admissionContractCount: accepted ? 5 : 0,
    allFiveGapsCoveredExactlyOnceByAdmissionContract: accepted && gapCoverageAccepted,
    allFiveGapsAssignedExactlyOnceToDiscoveryLane: accepted && laneCoverageAccepted,
    oneCandidateMayTargetMultipleGaps: accepted,
    oneCandidateMustCoverAllFiveGaps: false,
    differentGapsMayUseDifferentAcceptedSources: accepted,
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
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    spouseT8RuleAuthoringAuthorized: false,
    spouseT8ClaimTypeCreationAuthorized: false,
    spouseInterpretationPackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted
      ? RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? 15 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      sourceCandidatesDiscovered: 0,
      sourceCandidatesRegistered: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
      : 'RELATIONSHIP_SPOUSE_T8_AUTHORITY_ACQUISITION_READINESS_REVIEW',
  });
}
