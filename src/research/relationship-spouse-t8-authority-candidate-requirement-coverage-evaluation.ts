import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS,
  buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview,
  type RelationshipSpouseT8AuthorityGapId,
} from './relationship-spouse-t8-authority-acquisition-readiness-review.js';
import {
  buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview,
  type RelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReviewReport,
} from './relationship-spouse-t8-authority-candidate-discovery-readiness-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_DISCOVERED_AUTHORITY_CANDIDATES,
  buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence,
  type RelationshipSpouseT8AuthorityCandidateDiscoveryEvidenceReport,
  type RelationshipSpouseT8CandidateGapObservation,
  type RelationshipSpouseT8DiscoveredAuthorityCandidate,
} from './relationship-spouse-t8-authority-candidate-discovery-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION_VERSION =
  'myeonghwa-relationship-spouse-t8-authority-candidate-requirement-coverage-evaluation-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_CANDIDATE_COVERAGE_REQUIREMENT_IDS = Object.freeze([
  'EXACT_SOURCE_IDENTITY',
  'ONE_NORMALIZED_SOURCE_REFERENCE',
  'STABLE_REPRODUCIBLE_SOURCE_LOCATOR',
  'EXACT_GAP_RELEVANT_LOCATOR',
  'ORIGINAL_PRIMARY_WITNESS_EXACT_PASSAGE',
  'ORIGINAL_OR_VERIFIED_SOURCE_CONTEXT',
  'EXPLICIT_SPOUSE_SEMANTIC_ASSERTION',
  'EXPLICIT_APPLICABILITY_BOUNDARY',
  'EXPLICIT_CONTEXT_OR_EXCEPTION_TREATMENT',
  'INDEPENDENT_NORMATIVE_PROVENANCE',
  'CURRENT_SPOUSE_T5_T6_SEMANTIC_BRIDGE',
  'METHODOLOGY_INPUT_COMPATIBILITY',
  'MODERN_PRODUCT_SCOPE_COMPATIBILITY',
] as const);

export type RelationshipSpouseT8CandidateCoverageRequirementId =
  (typeof RELATIONSHIP_SPOUSE_T8_CANDIDATE_COVERAGE_REQUIREMENT_IDS)[number];

export type RelationshipSpouseT8CandidateCoverageState = 'SATISFIED' | 'UNSATISFIED';

export interface RelationshipSpouseT8CandidateCoverageRequirementResult {
  requirementId: RelationshipSpouseT8CandidateCoverageRequirementId;
  coverageState: RelationshipSpouseT8CandidateCoverageState;
  evidenceBasis: string;
  limitingReason: string | null;
  countsAsSatisfiedForGapAuthority: boolean;
}

export interface RelationshipSpouseT8CandidateGapCoverageEvaluation {
  evaluationId: string;
  candidateId: string;
  sourceId: string;
  sourceTitle: string;
  gapId: RelationshipSpouseT8AuthorityGapId;
  requirementResults: readonly RelationshipSpouseT8CandidateCoverageRequirementResult[];
  evaluatedRequirementCount: 13;
  satisfiedRequirementCount: number;
  unsatisfiedRequirementCount: number;
  missingRequirementIds: readonly RelationshipSpouseT8CandidateCoverageRequirementId[];
  allRequirementsSatisfied: false;
  candidateAcceptedForGapAuthority: false;
  gapClosedByThisEvaluation: false;
  currentSpouseT5T6BridgeMissing: true;
  competingMethodologyInputMismatchObserved: boolean;
  modernProductScopeCompatibilityMissing: true;
}

export interface RelationshipSpouseT8GapCoverageSummary {
  gapId: RelationshipSpouseT8AuthorityGapId;
  evaluatedCandidateCount: number;
  fullySatisfyingCandidateCount: 0;
  gapSatisfied: false;
  gapClosed: false;
  strongestCandidateIds: readonly string[];
  residualRequirementIds: readonly RelationshipSpouseT8CandidateCoverageRequirementId[];
  partialEvidenceCompositionBlocked: true;
}

export const RELATIONSHIP_SPOUSE_T8_CANDIDATE_COVERAGE_CONTROL_IDS = Object.freeze([
  'COVERAGE_EVALUATION_USES_ONLY_DISCOVERED_CANDIDATE_EVIDENCE',
  'DISCOVERY_SOURCE_IDENTITY_OR_SPOUSE_VOCABULARY_ALONE_DOES_NOT_SATISFY_A_GAP',
  'PRIMARY_SCAN_PASSAGE_AND_TRANSCRIPTION_SURFACE_ARE_DISTINCT',
  'EXPLICIT_SPOUSE_SEMANTIC_ASSERTION_IS_REQUIRED_PER_TARGETED_GAP',
  'EXPLICIT_APPLICABILITY_BOUNDARY_IS_REQUIRED',
  'CURRENT_SPOUSE_T5_T6_SEMANTIC_BRIDGE_IS_REQUIRED',
  'COMPETING_METHODOLOGY_INPUTS_CANNOT_BE_SILENTLY_ADOPTED',
  'HISTORICAL_GENDER_ROLE_AND_PARTNER_ATTRIBUTE_LANGUAGE_REQUIRES_PRODUCT_SCOPE_REVIEW',
  'ZIPING_WIFE_PALACE_YONGSHIN_XIJI_BINDING_DOES_NOT_CLOSE_CURRENT_T5_T6_GAPS',
  'DITIAN_TRANSCRIPTION_WITHOUT_PRIMARY_PAGE_BINDING_CANNOT_SUPPLY_PRIMARY_PASSAGE_PROVENANCE',
  'NO_CROSS_CANDIDATE_STITCHING_WITHIN_ONE_GAP',
  'COMPATIBILITY_AUTHORITY_CANNOT_SUBSTITUTE_FOR_SPOUSE_AUTHORITY',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT',
] as const);

export interface RelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluationReport {
  evaluationId: string;
  evaluationVersion: typeof RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION_VERSION;
  status:
    | 'RESOLVED_RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION'
    | 'UPSTREAM_DISCOVERY_EVIDENCE_BOUNDARY_INVALID';
  decision:
    | 'TEN_CANDIDATE_GAP_EVALUATIONS_COMPLETE_ZERO_FULL_COVERAGE_ALL_FIVE_GAPS_REMAIN_OPEN'
    | 'RELATIONSHIP_SPOUSE_T8_CANDIDATE_REQUIREMENT_COVERAGE_NOT_EVALUATED';
  upstreamReadinessReviewId: string;
  upstreamDiscoveryEvidenceId: string;
  exactDiscoveryEvidenceBoundaryAccepted: boolean;
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  candidateCount: 2 | 0;
  candidateGapEvaluationCount: 10 | 0;
  evaluations: readonly RelationshipSpouseT8CandidateGapCoverageEvaluation[];
  gapSummaries: readonly RelationshipSpouseT8GapCoverageSummary[];
  evaluatedGapCount: 5 | 0;
  fullySatisfiedCandidateGapEvaluationCount: 0;
  authorityAcceptedCandidateCount: 0;
  authorityGapClosedCount: 0;
  allFiveGapsRemainOpen: true;
  unresolvedGapIds: readonly RelationshipSpouseT8AuthorityGapId[];
  zipingPrimaryBoundSpouseEvidenceObservedButInsufficientForCurrentContract: boolean;
  zipingCompetingMethodologyInputs: readonly string[];
  zipingCurrentSpouseT5T6BridgeMissing: true;
  zipingModernProductScopeCompatibilityMissing: true;
  ditianPrimaryPassageBindingStillMissing: boolean;
  ditianIndependentNormativeProvenanceStillMissing: boolean;
  currentSpouseT5T6BridgeMissingForEveryEvaluation: boolean;
  modernProductScopeCompatibilityMissingForEveryEvaluation: boolean;
  noSingleCandidateFullySatisfiesAnyGap: boolean;
  sameGapCrossCandidateCompositionPerformed: false;
  sameGapCrossCandidateCompositionAuthorized: false;
  unresolvedShenfengGenderRoleLeadMayCloseGapByItself: false;
  candidateRegistrationPerformedByThisGate: false;
  authorityAdmittedByThisGate: false;
  spouseT8RuleAuthoringAuthorized: false;
  spouseT8ClaimTypeCreationAuthorized: false;
  spouseInterpretationPackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  compatibilityAuthorityAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_CANDIDATE_COVERAGE_CONTROL_IDS)[number][];
  controlCount: 13 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    coverageEvaluationsCreated: 10 | 0;
    sourceRegistrationsCreated: 0;
    methodologyDefinitionsCreated: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    registrySnapshotsCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'RELATIONSHIP_SPOUSE_T8_AUTHORITY_RESIDUAL_GAP_REASSESSMENT_REVIEW'
    | 'RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE';
}

function contentAddressedReadinessIdentityValid(
  readiness: RelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReviewReport,
): boolean {
  const { reviewId, ...material } = readiness;
  return (
    reviewId ===
    `relationship_spouse_t8_candidate_discovery_readiness_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function contentAddressedEvidenceIdentityValid(
  evidence: RelationshipSpouseT8AuthorityCandidateDiscoveryEvidenceReport,
): boolean {
  const { evidenceId, ...material } = evidence;
  return (
    evidenceId ===
    `relationship_spouse_t8_authority_discovery_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactDiscoveryEvidenceBoundaryAccepted(
  readiness: RelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReviewReport,
  evidence: RelationshipSpouseT8AuthorityCandidateDiscoveryEvidenceReport,
): boolean {
  const acquisition = buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview();
  const expectedReadiness = buildRelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReview(acquisition);
  const expectedEvidence = buildRelationshipSpouseT8AuthorityCandidateDiscoveryEvidence(expectedReadiness);
  return (
    contentAddressedReadinessIdentityValid(readiness) &&
    deterministicContentHash(readiness) === deterministicContentHash(expectedReadiness) &&
    readiness.reviewId === expectedReadiness.reviewId &&
    readiness.status ===
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_REVIEW' &&
    readiness.requirementCoverageEvaluationRequiredAfterDiscovery &&
    readiness.authorityAdmittedByThisGate === false &&
    contentAddressedEvidenceIdentityValid(evidence) &&
    deterministicContentHash(evidence) === deterministicContentHash(expectedEvidence) &&
    evidence.evidenceId === expectedEvidence.evidenceId &&
    evidence.status === 'RESOLVED_RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE' &&
    evidence.decision ===
      'TWO_CANDIDATES_DISCOVERED_ONE_PRIMARY_BOUND_PARTIAL_ONE_LEAD_ONLY_NO_AUTHORITY_ACCEPTED_OR_GAP_CLOSED' &&
    evidence.upstreamReadinessReviewId === readiness.reviewId &&
    evidence.exactReadinessBoundaryAccepted &&
    evidence.discoveryPerformed &&
    evidence.laneCount === 3 &&
    evidence.inspectedCandidateCount === 2 &&
    evidence.inspectedCandidates.length === 2 &&
    deterministicContentHash(evidence.inspectedCandidates) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_DISCOVERED_AUTHORITY_CANDIDATES) &&
    evidence.potentialPartialCoverageCandidateCount === 1 &&
    evidence.discoveryLeadOnlyCandidateCount === 1 &&
    evidence.fullAdmissionCandidateCount === 0 &&
    evidence.registeredCandidateCount === 0 &&
    evidence.allFiveGapsRemainOpen &&
    evidence.zipingExplicitSpouseBindingObserved &&
    evidence.zipingExactPrimaryPageBindingVerified &&
    evidence.zipingBindingUsesCurrentSpouseT8Inputs === false &&
    evidence.zipingCompetingMethodologyApplicabilityReviewRequired &&
    evidence.ditianExactPrimaryPageBindingMissing &&
    evidence.candidateRequirementCoverageEvaluatedByThisGate === false &&
    evidence.authorityAdmittedByThisGate === false &&
    evidence.spouseT8RuleAuthoringAuthorized === false &&
    evidence.productionPromotionAuthorized === false &&
    evidence.recommendedNextGate ===
      'RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION'
  );
}

function result(
  requirementId: RelationshipSpouseT8CandidateCoverageRequirementId,
  satisfied: boolean,
  evidenceBasis: string,
  limitingReason: string,
): RelationshipSpouseT8CandidateCoverageRequirementResult {
  return Object.freeze({
    requirementId,
    coverageState: satisfied ? 'SATISFIED' : 'UNSATISFIED',
    evidenceBasis,
    limitingReason: satisfied ? null : limitingReason,
    countsAsSatisfiedForGapAuthority: satisfied,
  });
}

function stableLocatorObserved(candidate: RelationshipSpouseT8DiscoveredAuthorityCandidate): boolean {
  const locator = candidate.sourceReference.locator;
  const secureUrl = candidate.sourceReference.url?.startsWith('https://') === true;
  const pageLocator = (locator?.page?.trim().length ?? 0) > 0;
  const sectionAnchorLocator =
    (locator?.section?.trim().length ?? 0) > 0 && (locator?.anchor?.trim().length ?? 0) > 0;
  return secureUrl && (pageLocator || sectionAnchorLocator);
}

function methodologyCompatible(candidate: RelationshipSpouseT8DiscoveredAuthorityCandidate): boolean {
  return !candidate.competingMethodologyApplicabilityReviewRequired;
}

function modernProductScopeCompatible(
  candidate: RelationshipSpouseT8DiscoveredAuthorityCandidate,
): boolean {
  return !candidate.historicalRoleAndScopeModernizationReviewRequired;
}

function evaluateRequirementResults(
  candidate: RelationshipSpouseT8DiscoveredAuthorityCandidate,
  observation: RelationshipSpouseT8CandidateGapObservation,
): readonly RelationshipSpouseT8CandidateCoverageRequirementResult[] {
  const source = candidate.sourceReference;
  return Object.freeze([
    result(
      'EXACT_SOURCE_IDENTITY',
      candidate.sourceIdentityVerified,
      `sourceId=${source.sourceId}; title=${source.title}`,
      'Exact source identity is not verified for the inspected candidate.',
    ),
    result(
      'ONE_NORMALIZED_SOURCE_REFERENCE',
      source.sourceId.trim().length > 0,
      `One SourceReference is attached to candidate ${candidate.candidateId}.`,
      'The candidate does not have one normalized source reference.',
    ),
    result(
      'STABLE_REPRODUCIBLE_SOURCE_LOCATOR',
      stableLocatorObserved(candidate),
      `url=${source.url ?? 'missing'}; locator=${JSON.stringify(source.locator ?? {})}`,
      'No stable URL plus reproducible section/page/anchor locator is available.',
    ),
    result(
      'EXACT_GAP_RELEVANT_LOCATOR',
      observation.exactRelevantLocatorVerifiedOnInspectedSurface,
      observation.observation,
      'No exact gap-relevant locator was verified on the inspected surface.',
    ),
    result(
      'ORIGINAL_PRIMARY_WITNESS_EXACT_PASSAGE',
      observation.originalPrimaryWitnessExactPassageVerified,
      observation.observation,
      'The exact rule-bearing passage is not bound to an original or primary witness page.',
    ),
    result(
      'ORIGINAL_OR_VERIFIED_SOURCE_CONTEXT',
      candidate.exactPassageInspectedOnAtLeastOneSurface &&
        observation.explicitContextOrExceptionTreatmentObserved,
      observation.observation,
      'The inspected surface does not establish usable rule-bearing source context for this gap.',
    ),
    result(
      'EXPLICIT_SPOUSE_SEMANTIC_ASSERTION',
      observation.explicitSpouseSemanticAssertionObserved,
      observation.observation,
      'The passage does not explicitly bind the targeted structure or method to spouse-specific semantics.',
    ),
    result(
      'EXPLICIT_APPLICABILITY_BOUNDARY',
      observation.explicitApplicabilityBoundaryObserved,
      observation.observation,
      'The passage does not expose the applicability boundary required for spouse-specific interpretation.',
    ),
    result(
      'EXPLICIT_CONTEXT_OR_EXCEPTION_TREATMENT',
      observation.explicitContextOrExceptionTreatmentObserved,
      observation.observation,
      'The passage does not expose explicit context or exception treatment for the targeted gap.',
    ),
    result(
      'INDEPENDENT_NORMATIVE_PROVENANCE',
      candidate.independentNormativeProvenanceObserved,
      `provenanceTier=${source.provenanceTier}; candidate=${candidate.candidateId}`,
      'Independent normative provenance is not established for the exact target passage.',
    ),
    result(
      'CURRENT_SPOUSE_T5_T6_SEMANTIC_BRIDGE',
      observation.currentSpouseT8InputContractDirectlySupported,
      observation.observation,
      'No explicit source-bound bridge from current Myeonghwa T5/T6 claims to the spouse-specific T8 contract was observed.',
    ),
    result(
      'METHODOLOGY_INPUT_COMPATIBILITY',
      methodologyCompatible(candidate),
      candidate.competingMethodologyApplicabilityReviewRequired
        ? `Competing inputs: ${candidate.spouseBindingMethodInputs.join(', ')}`
        : 'No competing methodology input path was identified for this candidate.',
      'The observed spouse-domain statement depends on competing methodology inputs and requires separate applicability review.',
    ),
    result(
      'MODERN_PRODUCT_SCOPE_COMPATIBILITY',
      modernProductScopeCompatible(candidate),
      candidate.historicalRoleAndScopeModernizationReviewRequired
        ? 'Historical sex/gender role, partner-attribute, and relationship-outcome vocabulary requires separate product-scope review.'
        : 'No historical-role modernization boundary was identified.',
      'Historical role/scope assumptions have not been shown compatible with the bounded modern spouse product contract.',
    ),
  ]);
}

function evaluateCandidateGap(
  candidate: RelationshipSpouseT8DiscoveredAuthorityCandidate,
  observation: RelationshipSpouseT8CandidateGapObservation,
): RelationshipSpouseT8CandidateGapCoverageEvaluation {
  const requirementResults = evaluateRequirementResults(candidate, observation);
  const missingRequirementIds = Object.freeze(
    requirementResults
      .filter((item) => !item.countsAsSatisfiedForGapAuthority)
      .map((item) => item.requirementId),
  );
  const material = {
    candidateId: candidate.candidateId,
    sourceId: candidate.sourceReference.sourceId,
    gapId: observation.gapId,
    requirementResults,
  };
  return Object.freeze({
    evaluationId: `relationship_spouse_t8_candidate_gap_coverage_${deterministicContentHash(material).slice(0, 24)}`,
    candidateId: candidate.candidateId,
    sourceId: candidate.sourceReference.sourceId,
    sourceTitle: candidate.sourceReference.title,
    gapId: observation.gapId,
    requirementResults,
    evaluatedRequirementCount: 13,
    satisfiedRequirementCount: requirementResults.length - missingRequirementIds.length,
    unsatisfiedRequirementCount: missingRequirementIds.length,
    missingRequirementIds,
    allRequirementsSatisfied: false,
    candidateAcceptedForGapAuthority: false,
    gapClosedByThisEvaluation: false,
    currentSpouseT5T6BridgeMissing: true,
    competingMethodologyInputMismatchObserved:
      candidate.competingMethodologyApplicabilityReviewRequired,
    modernProductScopeCompatibilityMissing: true,
  });
}

function buildEvaluations(): readonly RelationshipSpouseT8CandidateGapCoverageEvaluation[] {
  return Object.freeze(
    RELATIONSHIP_SPOUSE_T8_DISCOVERED_AUTHORITY_CANDIDATES.flatMap((candidate) =>
      candidate.gapObservations.map((observation) => evaluateCandidateGap(candidate, observation)),
    ),
  );
}

function residualRequirementsForGap(
  evaluations: readonly RelationshipSpouseT8CandidateGapCoverageEvaluation[],
  gapId: RelationshipSpouseT8AuthorityGapId,
): readonly RelationshipSpouseT8CandidateCoverageRequirementId[] {
  const relevant = evaluations.filter((evaluation) => evaluation.gapId === gapId);
  return Object.freeze(
    RELATIONSHIP_SPOUSE_T8_CANDIDATE_COVERAGE_REQUIREMENT_IDS.filter((requirementId) =>
      relevant.every((evaluation) => evaluation.missingRequirementIds.includes(requirementId)),
    ),
  );
}

function strongestCandidateIdsForGap(
  evaluations: readonly RelationshipSpouseT8CandidateGapCoverageEvaluation[],
  gapId: RelationshipSpouseT8AuthorityGapId,
): readonly string[] {
  const relevant = evaluations.filter((evaluation) => evaluation.gapId === gapId);
  if (relevant.length === 0) return Object.freeze([]);
  const best = Math.max(...relevant.map((evaluation) => evaluation.satisfiedRequirementCount));
  return Object.freeze(
    relevant
      .filter((evaluation) => evaluation.satisfiedRequirementCount === best)
      .map((evaluation) => evaluation.candidateId),
  );
}

function buildGapSummaries(
  evaluations: readonly RelationshipSpouseT8CandidateGapCoverageEvaluation[],
): readonly RelationshipSpouseT8GapCoverageSummary[] {
  return Object.freeze(
    RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS.map((requirement) => {
      const relevant = evaluations.filter((evaluation) => evaluation.gapId === requirement.gapId);
      return Object.freeze({
        gapId: requirement.gapId,
        evaluatedCandidateCount: relevant.length,
        fullySatisfyingCandidateCount: 0,
        gapSatisfied: false,
        gapClosed: false,
        strongestCandidateIds: strongestCandidateIdsForGap(evaluations, requirement.gapId),
        residualRequirementIds: residualRequirementsForGap(evaluations, requirement.gapId),
        partialEvidenceCompositionBlocked: true,
      });
    }),
  );
}

function finalized(
  material: Omit<RelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluationReport, 'evaluationId'>,
): RelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluationReport {
  return {
    evaluationId: `relationship_spouse_t8_candidate_requirement_coverage_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildRelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluation(
  readiness: RelationshipSpouseT8AuthorityCandidateDiscoveryReadinessReviewReport,
  evidence: RelationshipSpouseT8AuthorityCandidateDiscoveryEvidenceReport,
): RelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluationReport {
  const accepted = exactDiscoveryEvidenceBoundaryAccepted(readiness, evidence);
  const evaluations = accepted ? buildEvaluations() : Object.freeze([]);
  const gapSummaries = accepted ? buildGapSummaries(evaluations) : Object.freeze([]);
  const ziping = accepted
    ? RELATIONSHIP_SPOUSE_T8_DISCOVERED_AUTHORITY_CANDIDATES.find(
        (candidate) => candidate.sourceReference.title === '子平真詮',
      )
    : undefined;
  const ditian = accepted
    ? RELATIONSHIP_SPOUSE_T8_DISCOVERED_AUTHORITY_CANDIDATES.find(
        (candidate) => candidate.sourceReference.title === '滴天髓闡微',
      )
    : undefined;

  return finalized({
    evaluationVersion:
      RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION_VERSION,
    status: accepted
      ? 'RESOLVED_RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION'
      : 'UPSTREAM_DISCOVERY_EVIDENCE_BOUNDARY_INVALID',
    decision: accepted
      ? 'TEN_CANDIDATE_GAP_EVALUATIONS_COMPLETE_ZERO_FULL_COVERAGE_ALL_FIVE_GAPS_REMAIN_OPEN'
      : 'RELATIONSHIP_SPOUSE_T8_CANDIDATE_REQUIREMENT_COVERAGE_NOT_EVALUATED',
    upstreamReadinessReviewId: readiness.reviewId,
    upstreamDiscoveryEvidenceId: evidence.evidenceId,
    exactDiscoveryEvidenceBoundaryAccepted: accepted,
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    candidateCount: accepted ? 2 : 0,
    candidateGapEvaluationCount: accepted ? 10 : 0,
    evaluations,
    gapSummaries,
    evaluatedGapCount: accepted ? 5 : 0,
    fullySatisfiedCandidateGapEvaluationCount: 0,
    authorityAcceptedCandidateCount: 0,
    authorityGapClosedCount: 0,
    allFiveGapsRemainOpen: true,
    unresolvedGapIds: Object.freeze(
      RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS.map((requirement) => requirement.gapId),
    ),
    zipingPrimaryBoundSpouseEvidenceObservedButInsufficientForCurrentContract:
      ziping?.exactPrimaryWitnessPassageLocatorVerified === true &&
      ziping.spouseBindingObserved === true &&
      ziping.currentSpouseT8InputContractDirectlySupported === false,
    zipingCompetingMethodologyInputs: ziping?.spouseBindingMethodInputs ?? Object.freeze([]),
    zipingCurrentSpouseT5T6BridgeMissing: true,
    zipingModernProductScopeCompatibilityMissing: true,
    ditianPrimaryPassageBindingStillMissing:
      ditian !== undefined && !ditian.exactPrimaryWitnessPassageLocatorVerified,
    ditianIndependentNormativeProvenanceStillMissing:
      ditian !== undefined && !ditian.independentNormativeProvenanceObserved,
    currentSpouseT5T6BridgeMissingForEveryEvaluation:
      accepted && evaluations.every((evaluation) => evaluation.currentSpouseT5T6BridgeMissing),
    modernProductScopeCompatibilityMissingForEveryEvaluation:
      accepted && evaluations.every((evaluation) => evaluation.modernProductScopeCompatibilityMissing),
    noSingleCandidateFullySatisfiesAnyGap:
      accepted && evaluations.every((evaluation) => !evaluation.allRequirementsSatisfied),
    sameGapCrossCandidateCompositionPerformed: false,
    sameGapCrossCandidateCompositionAuthorized: false,
    unresolvedShenfengGenderRoleLeadMayCloseGapByItself: false,
    candidateRegistrationPerformedByThisGate: false,
    authorityAdmittedByThisGate: false,
    spouseT8RuleAuthoringAuthorized: false,
    spouseT8ClaimTypeCreationAuthorized: false,
    spouseInterpretationPackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    compatibilityAuthorityAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted ? RELATIONSHIP_SPOUSE_T8_CANDIDATE_COVERAGE_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 13 : 0,
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      coverageEvaluationsCreated: accepted ? 10 : 0,
      sourceRegistrationsCreated: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    }),
    recommendedNextGate: accepted
      ? 'RELATIONSHIP_SPOUSE_T8_AUTHORITY_RESIDUAL_GAP_REASSESSMENT_REVIEW'
      : 'RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
  });
}
