import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
  type CareerT8SynthesisAuthorityGapId,
} from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import type { CareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReviewReport } from './career-personalization-t8-synthesis-authority-acquisition-readiness-review.js';
import {
  CAREER_T8_DISCOVERED_AUTHORITY_CANDIDATES,
  type CareerPersonalizationT8SynthesisAuthorityCandidateDiscoveryEvidenceReport,
  type CareerT8DiscoveredAuthorityCandidate,
  type CareerT8CandidateGapObservation,
} from './career-personalization-t8-synthesis-authority-candidate-discovery-evidence.js';

export const CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION_VERSION =
  'myeonghwa-career-personalization-t8-synthesis-authority-candidate-requirement-coverage-evaluation-v1' as const;

export const CAREER_T8_CANDIDATE_COVERAGE_REQUIREMENT_IDS = Object.freeze([
  'EXACT_SOURCE_IDENTITY',
  'ONE_NORMALIZED_SOURCE_REFERENCE',
  'STABLE_REPRODUCIBLE_SOURCE_LOCATOR',
  'EXACT_GAP_RELEVANT_LOCATOR',
  'ORIGINAL_PRIMARY_WITNESS_EXACT_PASSAGE',
  'ORIGINAL_OR_VERIFIED_SOURCE_CONTEXT',
  'EXPLICIT_CAREER_OR_WORK_SEMANTIC_ASSERTION',
  'EXPLICIT_CONTEXT_OR_EXCEPTION_TREATMENT',
  'INDEPENDENT_NORMATIVE_PROVENANCE',
  'CURRENT_PERSONALIZED_T5_T6_SEMANTIC_BRIDGE',
  'METHODOLOGY_INPUT_COMPATIBILITY',
] as const);

export type CareerT8CandidateCoverageRequirementId =
  (typeof CAREER_T8_CANDIDATE_COVERAGE_REQUIREMENT_IDS)[number];

export type CareerT8CandidateCoverageState = 'SATISFIED' | 'UNSATISFIED';

export interface CareerT8CandidateCoverageRequirementResult {
  requirementId: CareerT8CandidateCoverageRequirementId;
  coverageState: CareerT8CandidateCoverageState;
  evidenceBasis: string;
  limitingReason: string | null;
  countsAsSatisfiedForGapAuthority: boolean;
}

export interface CareerT8CandidateGapCoverageEvaluation {
  evaluationId: string;
  candidateId: string;
  sourceId: string;
  sourceTitle: string;
  gapId: CareerT8SynthesisAuthorityGapId;
  requirementResults: readonly CareerT8CandidateCoverageRequirementResult[];
  evaluatedRequirementCount: 11;
  satisfiedRequirementCount: number;
  unsatisfiedRequirementCount: number;
  missingRequirementIds: readonly CareerT8CandidateCoverageRequirementId[];
  allRequirementsSatisfied: false;
  candidateAcceptedForGapAuthority: false;
  gapClosedByThisEvaluation: false;
  competingMethodologyInputMismatchObserved: boolean;
  currentT5T6BridgeMissing: true;
}

export interface CareerT8GapCoverageSummary {
  gapId: CareerT8SynthesisAuthorityGapId;
  evaluatedCandidateCount: number;
  fullySatisfyingCandidateCount: 0;
  gapSatisfied: false;
  gapClosed: false;
  strongestCandidateIds: readonly string[];
  residualRequirementIds: readonly CareerT8CandidateCoverageRequirementId[];
}

export const CAREER_T8_CANDIDATE_COVERAGE_CONTROL_IDS = Object.freeze([
  'COVERAGE_EVALUATION_USES_ONLY_B7_DISCOVERED_CANDIDATE_EVIDENCE',
  'DISCOVERY_OR_SOURCE_IDENTITY_ALONE_DOES_NOT_SATISFY_A_GAP',
  'PRIMARY_SCAN_PASSAGE_AND_TRANSCRIPTION_SURFACE_ARE_DISTINCT',
  'EXPLICIT_CAREER_SEMANTIC_IS_REQUIRED_PER_TARGETED_GAP',
  'CURRENT_PERSONALIZED_T5_T6_SEMANTIC_BRIDGE_IS_REQUIRED',
  'COMPETING_METHODOLOGY_INPUTS_CANNOT_BE_SILENTLY_ADOPTED',
  'QIANLI_YONGSHIN_XIJI_CAREER_BINDING_DOES_NOT_CLOSE_CURRENT_T5_T6_GAPS',
  'STRUCTURAL_OR_TEN_GOD_COMPOSITION_ALONE_DOES_NOT_CREATE_MODERN_CAREER_SEMANTICS',
  'NO_CROSS_CANDIDATE_STITCHING_WITHIN_ONE_GAP',
  'NO_HISTORICAL_RANK_TO_MODERN_CAREER_SEMANTIC_CONVERSION',
  'NO_NUMERIC_WEIGHTING_WINNER_LOSER_DAMAGE_OR_PRECEDENCE_INFERENCE',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT',
] as const);

export interface CareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluationReport {
  evaluationId: string;
  evaluationVersion: typeof CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_SYNTHESIS_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION'
    | 'UPSTREAM_B7_BOUNDARY_INVALID';
  decision:
    | 'ELEVEN_CANDIDATE_GAP_EVALUATIONS_COMPLETE_ZERO_FULL_COVERAGE_ALL_SIX_GAPS_REMAIN_OPEN'
    | 'CAREER_T8_CANDIDATE_REQUIREMENT_COVERAGE_NOT_EVALUATED';
  upstreamB7EvidenceId: string;
  exactB7BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  candidateCount: 4 | 0;
  candidateGapEvaluationCount: 11 | 0;
  evaluations: readonly CareerT8CandidateGapCoverageEvaluation[];
  gapSummaries: readonly CareerT8GapCoverageSummary[];
  evaluatedGapCount: 6 | 0;
  fullySatisfiedCandidateGapEvaluationCount: 0;
  authorityAcceptedCandidateCount: 0;
  authorityGapClosedCount: 0;
  allSixGapsRemainOpen: true;
  unresolvedGapIds: readonly CareerT8SynthesisAuthorityGapId[];
  qianliCareerBindingObservedButInsufficientForCurrentContract: boolean;
  qianliCompetingMethodologyInputs: readonly string[];
  qianliPrimaryPassageBindingStillMissing: boolean;
  currentPersonalizedT5T6BridgeMissingForEveryEvaluation: boolean;
  noSingleCandidateFullySatisfiesAnyGap: boolean;
  sameGapCrossCandidateCompositionPerformed: false;
  sameGapCrossCandidateCompositionAuthorized: false;
  candidateRegistrationPerformedByThisGate: false;
  authorityAcquiredByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof CAREER_T8_CANDIDATE_COVERAGE_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    coverageEvaluationsCreated: 11 | 0;
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
    | 'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_RESIDUAL_GAP_REASSESSMENT_REVIEW'
    | 'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE';
}

function exactB7Accepted(
  b6: CareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReviewReport,
  b7: CareerPersonalizationT8SynthesisAuthorityCandidateDiscoveryEvidenceReport,
): boolean {
  return (
    b6.status === 'RESOLVED_CAREER_T8_SYNTHESIS_AUTHORITY_ACQUISITION_READINESS' &&
    b6.decision ===
      'GAP_SCOPED_GOVERNED_AUTHORITY_ACQUISITION_CONTRACT_FROZEN_NO_AUTHORITY_ACQUIRED' &&
    b6.admissionContractCount === 6 &&
    b6.allSixGapsCoveredExactlyOnceByAdmissionContract &&
    b6.requirementCoverageEvaluationRequiredAfterDiscovery &&
    b6.authorityAcquiredByThisGate === false &&
    b7.status === 'RESOLVED_CAREER_T8_SYNTHESIS_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE' &&
    b7.decision ===
      'FOUR_CANDIDATES_DISCOVERED_ALL_PARTIAL_OR_LEAD_ONLY_NO_AUTHORITY_ACCEPTED_OR_GAP_CLOSED' &&
    b7.upstreamB6ReviewId === b6.reviewId &&
    b7.exactB6BoundaryAccepted &&
    b7.discoveryPerformed &&
    b7.inspectedCandidateCount === 4 &&
    b7.inspectedCandidates.length === 4 &&
    deterministicContentHash(b7.inspectedCandidates) ===
      deterministicContentHash(CAREER_T8_DISCOVERED_AUTHORITY_CANDIDATES) &&
    b7.fullAdmissionCandidateCount === 0 &&
    b7.registeredCandidateCount === 0 &&
    b7.allSixGapsRemainOpen &&
    deterministicContentHash(b7.unresolvedGapIds) ===
      deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b7.candidateRequirementCoverageEvaluatedByThisGate === false &&
    b7.authorityAcquiredByThisGate === false &&
    b7.t8RuleAuthoringAuthorized === false &&
    b7.productionPromotionAuthorized === false &&
    b7.recommendedNextGate ===
      'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION'
  );
}

function result(
  requirementId: CareerT8CandidateCoverageRequirementId,
  satisfied: boolean,
  evidenceBasis: string,
  limitingReason: string,
): CareerT8CandidateCoverageRequirementResult {
  return Object.freeze({
    requirementId,
    coverageState: satisfied ? 'SATISFIED' : 'UNSATISFIED',
    evidenceBasis,
    limitingReason: satisfied ? null : limitingReason,
    countsAsSatisfiedForGapAuthority: satisfied,
  });
}

function stableLocatorObserved(candidate: CareerT8DiscoveredAuthorityCandidate): boolean {
  const locator = candidate.sourceReference.locator;
  return (
    candidate.sourceReference.url?.startsWith('https://') === true &&
    locator !== undefined &&
    (locator.page?.trim().length ?? 0) > 0 ||
    (candidate.sourceReference.url?.startsWith('https://') === true &&
      locator !== undefined &&
      (locator.section?.trim().length ?? 0) > 0 &&
      (locator.anchor?.trim().length ?? 0) > 0)
  );
}

function methodologyCompatible(candidate: CareerT8DiscoveredAuthorityCandidate): boolean {
  return !candidate.competingMethodologyApplicabilityReviewRequired;
}

function evaluateRequirementResults(
  candidate: CareerT8DiscoveredAuthorityCandidate,
  observation: CareerT8CandidateGapObservation,
): readonly CareerT8CandidateCoverageRequirementResult[] {
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
      'The inspected evidence does not establish verified rule-bearing context for this gap.',
    ),
    result(
      'EXPLICIT_CAREER_OR_WORK_SEMANTIC_ASSERTION',
      observation.explicitCareerOrWorkSemanticAssertionObserved,
      observation.observation,
      'The passage does not explicitly bind this structural claim to Career/work semantics.',
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
      'Independent normative provenance is not established for the inspected target passage.',
    ),
    result(
      'CURRENT_PERSONALIZED_T5_T6_SEMANTIC_BRIDGE',
      observation.currentPersonalizedT5T6SemanticBridgeObserved,
      observation.observation,
      'No explicit source-bound bridge from the current personalized Career T5/T6 claim semantics to this T8 gap was observed.',
    ),
    result(
      'METHODOLOGY_INPUT_COMPATIBILITY',
      methodologyCompatible(candidate),
      candidate.competingMethodologyApplicabilityReviewRequired
        ? `Competing inputs: ${candidate.careerBindingMethodInputs.join(', ')}`
        : 'No competing methodology input path was identified for this candidate.',
      'The observed Career-domain statement depends on competing methodology inputs and requires a separate applicability review before it can be used with the current T5/T6 contract.',
    ),
  ]);
}

function evaluateCandidateGap(
  candidate: CareerT8DiscoveredAuthorityCandidate,
  observation: CareerT8CandidateGapObservation,
): CareerT8CandidateGapCoverageEvaluation {
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
    evaluationId: `career_t8_candidate_gap_coverage_${deterministicContentHash(material).slice(0, 24)}`,
    candidateId: candidate.candidateId,
    sourceId: candidate.sourceReference.sourceId,
    sourceTitle: candidate.sourceReference.title,
    gapId: observation.gapId,
    requirementResults,
    evaluatedRequirementCount: 11,
    satisfiedRequirementCount: requirementResults.length - missingRequirementIds.length,
    unsatisfiedRequirementCount: missingRequirementIds.length,
    missingRequirementIds,
    allRequirementsSatisfied: false,
    candidateAcceptedForGapAuthority: false,
    gapClosedByThisEvaluation: false,
    competingMethodologyInputMismatchObserved:
      candidate.competingMethodologyApplicabilityReviewRequired,
    currentT5T6BridgeMissing: true,
  });
}

function buildEvaluations(): readonly CareerT8CandidateGapCoverageEvaluation[] {
  return Object.freeze(
    CAREER_T8_DISCOVERED_AUTHORITY_CANDIDATES.flatMap((candidate) =>
      candidate.gapObservations.map((observation) => evaluateCandidateGap(candidate, observation)),
    ),
  );
}

function residualRequirementsForGap(
  evaluations: readonly CareerT8CandidateGapCoverageEvaluation[],
  gapId: CareerT8SynthesisAuthorityGapId,
): readonly CareerT8CandidateCoverageRequirementId[] {
  const relevant = evaluations.filter((evaluation) => evaluation.gapId === gapId);
  return Object.freeze(
    CAREER_T8_CANDIDATE_COVERAGE_REQUIREMENT_IDS.filter((requirementId) =>
      relevant.every((evaluation) => evaluation.missingRequirementIds.includes(requirementId)),
    ),
  );
}

function strongestCandidateIdsForGap(
  evaluations: readonly CareerT8CandidateGapCoverageEvaluation[],
  gapId: CareerT8SynthesisAuthorityGapId,
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
  evaluations: readonly CareerT8CandidateGapCoverageEvaluation[],
): readonly CareerT8GapCoverageSummary[] {
  return Object.freeze(
    CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS.map((gapId) => {
      const relevant = evaluations.filter((evaluation) => evaluation.gapId === gapId);
      return Object.freeze({
        gapId,
        evaluatedCandidateCount: relevant.length,
        fullySatisfyingCandidateCount: 0,
        gapSatisfied: false,
        gapClosed: false,
        strongestCandidateIds: strongestCandidateIdsForGap(evaluations, gapId),
        residualRequirementIds: residualRequirementsForGap(evaluations, gapId),
      });
    }),
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluationReport, 'evaluationId'>,
): CareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluationReport {
  return {
    evaluationId: `career_t8_candidate_requirement_coverage_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluation(
  b6: CareerPersonalizationT8SynthesisAuthorityAcquisitionReadinessReviewReport,
  b7: CareerPersonalizationT8SynthesisAuthorityCandidateDiscoveryEvidenceReport,
): CareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluationReport {
  const accepted = exactB7Accepted(b6, b7);
  const evaluations = accepted ? buildEvaluations() : Object.freeze([]);
  const gapSummaries = accepted ? buildGapSummaries(evaluations) : Object.freeze([]);
  const qianli = accepted
    ? CAREER_T8_DISCOVERED_AUTHORITY_CANDIDATES.find((candidate) =>
        candidate.sourceReference.sourceId.includes('wei_qianli'),
      )
    : undefined;

  return finalized({
    evaluationVersion:
      CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_SYNTHESIS_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION'
      : 'UPSTREAM_B7_BOUNDARY_INVALID',
    decision: accepted
      ? 'ELEVEN_CANDIDATE_GAP_EVALUATIONS_COMPLETE_ZERO_FULL_COVERAGE_ALL_SIX_GAPS_REMAIN_OPEN'
      : 'CAREER_T8_CANDIDATE_REQUIREMENT_COVERAGE_NOT_EVALUATED',
    upstreamB7EvidenceId: b7.evidenceId,
    exactB7BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    candidateCount: accepted ? 4 : 0,
    candidateGapEvaluationCount: accepted ? 11 : 0,
    evaluations,
    gapSummaries,
    evaluatedGapCount: accepted ? 6 : 0,
    fullySatisfiedCandidateGapEvaluationCount: 0,
    authorityAcceptedCandidateCount: 0,
    authorityGapClosedCount: 0,
    allSixGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    qianliCareerBindingObservedButInsufficientForCurrentContract:
      qianli?.careerWorkBindingObserved === true &&
      qianli.currentPersonalizedT5T6ContractDirectlySupported === false,
    qianliCompetingMethodologyInputs: qianli?.careerBindingMethodInputs ?? Object.freeze([]),
    qianliPrimaryPassageBindingStillMissing:
      qianli !== undefined && !qianli.exactPrimaryWitnessPassageLocatorVerified,
    currentPersonalizedT5T6BridgeMissingForEveryEvaluation:
      accepted && evaluations.every((evaluation) => evaluation.currentT5T6BridgeMissing),
    noSingleCandidateFullySatisfiesAnyGap:
      accepted && evaluations.every((evaluation) => !evaluation.allRequirementsSatisfied),
    sameGapCrossCandidateCompositionPerformed: false,
    sameGapCrossCandidateCompositionAuthorized: false,
    candidateRegistrationPerformedByThisGate: false,
    authorityAcquiredByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted ? CAREER_T8_CANDIDATE_COVERAGE_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      coverageEvaluationsCreated: accepted ? 11 : 0,
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
      ? 'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_RESIDUAL_GAP_REASSESSMENT_REVIEW'
      : 'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
  });
}
