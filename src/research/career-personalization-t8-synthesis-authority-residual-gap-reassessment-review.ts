import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_T8_CANDIDATE_COVERAGE_REQUIREMENT_IDS,
  type CareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluationReport,
  type CareerT8CandidateCoverageRequirementId,
} from './career-personalization-t8-synthesis-authority-candidate-requirement-coverage-evaluation.js';
import type { CareerT8SynthesisAuthorityGapId } from './career-personalization-t8-synthesis-authority-gap-requirements-review.js';

export const CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_RESIDUAL_GAP_REASSESSMENT_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-synthesis-authority-residual-gap-reassessment-review-v1' as const;

export type CareerT8ResidualGapClass =
  | 'TEN_GOD_TO_CAREER_BRIDGE_RESIDUAL'
  | 'STRUCTURAL_MODIFIER_TO_CAREER_BRIDGE_AND_PROVENANCE_RESIDUAL'
  | 'MULTI_PATTERN_CAREER_COMPOSITION_BRIDGE_RESIDUAL';

export type CareerT8ResidualAcquisitionTrackId =
  | 'CURRENT_T5_T6_TO_CAREER_SEMANTIC_BRIDGE_AUTHORITY'
  | 'QIANLI_PRIMARY_PASSAGE_PAGE_BINDING'
  | 'SHENFENG_PRIMARY_PASSAGE_PROVENANCE_BINDING'
  | 'QIANLI_YONGSHIN_XIJI_COMPETING_METHODOLOGY_APPLICABILITY';

export interface CareerT8ResidualGapReassessment {
  gapId: CareerT8SynthesisAuthorityGapId;
  residualClass: CareerT8ResidualGapClass;
  evaluatedCandidateCount: number;
  strongestCandidateIds: readonly string[];
  universalResidualRequirementIds: readonly CareerT8CandidateCoverageRequirementId[];
  currentT5T6BridgeResidual: true;
  explicitCareerSemanticResidual: boolean;
  primaryPassageBindingResidual: boolean;
  independentProvenanceResidual: boolean;
  competingMethodologyCompatibilityResidual: boolean;
  crossCandidateStitchingWouldBeRequiredToCloseFromCurrentEvidence: boolean;
  gapClosed: false;
  t8SemanticRuleAuthorized: false;
}

export interface CareerT8ResidualAcquisitionTrack {
  trackId: CareerT8ResidualAcquisitionTrackId;
  priority: 'PRIMARY' | 'SECONDARY' | 'DEFERRED_REQUIRES_METHODOLOGY_CHOICE';
  targetsGapIds: readonly CareerT8SynthesisAuthorityGapId[];
  objective: string;
  mayCloseGapByItself: false;
  opensCompetingMethodology: boolean;
  userOrDomainMethodologyChoiceRequiredBeforeExecution: boolean;
  executableByThisReview: false;
}

export const CAREER_T8_RESIDUAL_GAP_REASSESSMENT_CONTROL_IDS = Object.freeze([
  'RESIDUAL_REASSESSMENT_DOES_NOT_CLOSE_ANY_AUTHORITY_GAP',
  'CURRENT_T5_T6_TO_CAREER_SEMANTIC_BRIDGE_IS_UNIVERSAL_RESIDUAL_BLOCKER',
  'PARTIAL_PRIMARY_STRUCTURE_EVIDENCE_IS_NOT_A_CAREER_SEMANTIC_BRIDGE',
  'QIANLI_CAREER_WORDING_DOES_NOT_BRIDGE_CURRENT_T5_T6_INPUTS',
  'QIANLI_PRIMARY_PAGE_BINDING_ALONE_CANNOT_SOLVE_METHODOLOGY_COMPATIBILITY',
  'QIANLI_YONGSHIN_XIJI_PATH_REMAINS_A_SEPARATE_COMPETING_METHODOLOGY_CHOICE',
  'COMPETING_METHODOLOGY_TRACK_MAY_NOT_START_BY_THIS_REVIEW',
  'SHENFENG_PRIMARY_BINDING_ALONE_CANNOT_CREATE_CAREER_SEMANTICS',
  'NO_CROSS_CANDIDATE_STITCHING_TO_SYNTHESIZE_MISSING_AUTHORITY',
  'NO_HISTORICAL_RANK_TO_MODERN_CAREER_SEMANTIC_CONVERSION',
  'NO_NUMERIC_WEIGHTING_WINNER_LOSER_DAMAGE_OR_PRECEDENCE_INFERENCE',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT',
] as const);

export interface CareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_RESIDUAL_GAP_REASSESSMENT_REVIEW_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_SYNTHESIS_AUTHORITY_RESIDUAL_GAP_REASSESSMENT'
    | 'UPSTREAM_B8_BOUNDARY_INVALID';
  decision:
    | 'UNIVERSAL_CURRENT_T5_T6_TO_CAREER_BRIDGE_RESIDUAL_CONFIRMED_ALL_SIX_GAPS_OPEN_COMPETING_YONGSHIN_XIJI_TRACK_DEFERRED'
    | 'CAREER_T8_RESIDUAL_GAP_REASSESSMENT_NOT_ESTABLISHED';
  upstreamB8EvaluationId: string;
  exactB8BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  residualGapCount: 6 | 0;
  residualGaps: readonly CareerT8ResidualGapReassessment[];
  universalResidualRequirementIds: readonly CareerT8CandidateCoverageRequirementId[];
  currentT5T6SemanticBridgeIsUniversalResidual: boolean;
  allSixGapsRemainOpen: true;
  unresolvedGapIds: readonly CareerT8SynthesisAuthorityGapId[];
  noCurrentCandidateMayBePromoted: boolean;
  qianliExplicitCareerBindingPreserved: boolean;
  qianliCurrentT5T6BridgeStillMissing: boolean;
  qianliPrimaryPageBindingStillMissing: boolean;
  qianliCompetingMethodologyInputs: readonly string[];
  qianliCompetingMethodologyTrackDeferred: boolean;
  qianliCompetingMethodologyMayBeAdoptedByThisReview: false;
  acquisitionTracks: readonly CareerT8ResidualAcquisitionTrack[];
  acquisitionTrackCount: 4 | 0;
  primaryTrackId: CareerT8ResidualAcquisitionTrackId | null;
  sameGapCrossCandidateCompositionAuthorized: false;
  authorityAcquiredByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof CAREER_T8_RESIDUAL_GAP_REASSESSMENT_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    sourceCandidatesDiscovered: 0;
    sourceRegistrationsCreated: 0;
    methodologyDefinitionsCreated: 0;
    methodologyChoicesAdopted: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    registrySnapshotsCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW'
    | 'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION';
}

function contentAddressedB8IdentityValid(
  b8: CareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluationReport,
): boolean {
  const { evaluationId, ...material } = b8;
  return (
    evaluationId ===
    `career_t8_candidate_requirement_coverage_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB8Accepted(
  b8: CareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluationReport,
): boolean {
  return (
    contentAddressedB8IdentityValid(b8) &&
    b8.status ===
      'RESOLVED_CAREER_T8_SYNTHESIS_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION' &&
    b8.decision ===
      'ELEVEN_CANDIDATE_GAP_EVALUATIONS_COMPLETE_ZERO_FULL_COVERAGE_ALL_SIX_GAPS_REMAIN_OPEN' &&
    b8.exactB7BoundaryAccepted &&
    b8.candidateCount === 4 &&
    b8.candidateGapEvaluationCount === 11 &&
    b8.evaluations.length === 11 &&
    b8.gapSummaries.length === 6 &&
    b8.evaluatedGapCount === 6 &&
    b8.fullySatisfiedCandidateGapEvaluationCount === 0 &&
    b8.authorityAcceptedCandidateCount === 0 &&
    b8.authorityGapClosedCount === 0 &&
    b8.allSixGapsRemainOpen &&
    deterministicContentHash(b8.unresolvedGapIds) ===
      deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b8.currentPersonalizedT5T6BridgeMissingForEveryEvaluation &&
    b8.noSingleCandidateFullySatisfiesAnyGap &&
    b8.sameGapCrossCandidateCompositionPerformed === false &&
    b8.sameGapCrossCandidateCompositionAuthorized === false &&
    b8.authorityAcquiredByThisGate === false &&
    b8.t8RuleAuthoringAuthorized === false &&
    b8.productionPromotionAuthorized === false &&
    b8.controlsFrozen &&
    b8.controlCount === 12 &&
    b8.implementationEffects.coverageEvaluationsCreated === 11 &&
    b8.implementationEffects.sourceRegistrationsCreated === 0 &&
    b8.implementationEffects.methodologyDefinitionsCreated === 0 &&
    b8.implementationEffects.ruleDefinitionsCreated === 0 &&
    b8.implementationEffects.claimTypesCreated === 0 &&
    b8.implementationEffects.registrySnapshotsCreated === 0 &&
    b8.implementationEffects.interpretationPacksCreated === 0 &&
    b8.implementationEffects.narrativePlansCreated === 0 &&
    b8.implementationEffects.previewRoutesChanged === 0 &&
    b8.recommendedNextGate ===
      'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_RESIDUAL_GAP_REASSESSMENT_REVIEW'
  );
}

function hasMissingRequirement(
  b8: CareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluationReport,
  gapId: CareerT8SynthesisAuthorityGapId,
  requirementId: CareerT8CandidateCoverageRequirementId,
): boolean {
  return b8.evaluations
    .filter((evaluation) => evaluation.gapId === gapId)
    .some((evaluation) => evaluation.missingRequirementIds.includes(requirementId));
}

function everyCandidateForGapMissing(
  b8: CareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluationReport,
  gapId: CareerT8SynthesisAuthorityGapId,
  requirementId: CareerT8CandidateCoverageRequirementId,
): boolean {
  const relevant = b8.evaluations.filter((evaluation) => evaluation.gapId === gapId);
  return (
    relevant.length > 0 &&
    relevant.every((evaluation) => evaluation.missingRequirementIds.includes(requirementId))
  );
}

function residualClassForGap(gapId: CareerT8SynthesisAuthorityGapId): CareerT8ResidualGapClass {
  if (
    gapId === 'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING' ||
    gapId === 'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING'
  ) {
    return 'TEN_GOD_TO_CAREER_BRIDGE_RESIDUAL';
  }
  if (gapId === 'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING') {
    return 'MULTI_PATTERN_CAREER_COMPOSITION_BRIDGE_RESIDUAL';
  }
  return 'STRUCTURAL_MODIFIER_TO_CAREER_BRIDGE_AND_PROVENANCE_RESIDUAL';
}

function buildResidualGaps(
  b8: CareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluationReport,
): readonly CareerT8ResidualGapReassessment[] {
  return Object.freeze(
    b8.gapSummaries.map((summary) => {
      const currentBridgeResidual = everyCandidateForGapMissing(
        b8,
        summary.gapId,
        'CURRENT_PERSONALIZED_T5_T6_SEMANTIC_BRIDGE',
      );
      return Object.freeze({
        gapId: summary.gapId,
        residualClass: residualClassForGap(summary.gapId),
        evaluatedCandidateCount: summary.evaluatedCandidateCount,
        strongestCandidateIds: summary.strongestCandidateIds,
        universalResidualRequirementIds: summary.residualRequirementIds,
        currentT5T6BridgeResidual: currentBridgeResidual as true,
        explicitCareerSemanticResidual: hasMissingRequirement(
          b8,
          summary.gapId,
          'EXPLICIT_CAREER_OR_WORK_SEMANTIC_ASSERTION',
        ),
        primaryPassageBindingResidual: hasMissingRequirement(
          b8,
          summary.gapId,
          'ORIGINAL_PRIMARY_WITNESS_EXACT_PASSAGE',
        ),
        independentProvenanceResidual: hasMissingRequirement(
          b8,
          summary.gapId,
          'INDEPENDENT_NORMATIVE_PROVENANCE',
        ),
        competingMethodologyCompatibilityResidual: hasMissingRequirement(
          b8,
          summary.gapId,
          'METHODOLOGY_INPUT_COMPATIBILITY',
        ),
        crossCandidateStitchingWouldBeRequiredToCloseFromCurrentEvidence:
          summary.evaluatedCandidateCount > 1 && summary.fullySatisfyingCandidateCount === 0,
        gapClosed: false,
        t8SemanticRuleAuthorized: false,
      });
    }),
  );
}

function acquisitionTracks(): readonly CareerT8ResidualAcquisitionTrack[] {
  const allGaps = Object.freeze([...CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS]);
  const qianliGaps = Object.freeze([
    'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
    'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
    'SEASONAL_PHASE_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
    'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING',
  ] as const satisfies readonly CareerT8SynthesisAuthorityGapId[]);
  const shenfengGaps = Object.freeze([
    'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
    'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
    'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING',
  ] as const satisfies readonly CareerT8SynthesisAuthorityGapId[]);

  return Object.freeze([
    Object.freeze({
      trackId: 'CURRENT_T5_T6_TO_CAREER_SEMANTIC_BRIDGE_AUTHORITY',
      priority: 'PRIMARY',
      targetsGapIds: allGaps,
      objective:
        'Acquire explicit source-bound authority that maps the already-governed personalized Career T5/T6 semantic inputs into bounded Career synthesis without importing a different methodology silently.',
      mayCloseGapByItself: false,
      opensCompetingMethodology: false,
      userOrDomainMethodologyChoiceRequiredBeforeExecution: false,
      executableByThisReview: false,
    }),
    Object.freeze({
      trackId: 'QIANLI_PRIMARY_PASSAGE_PAGE_BINDING',
      priority: 'SECONDARY',
      targetsGapIds: qianliGaps,
      objective:
        'Bind the discovered 支沖/qualifier/事業 passages to exact NLC primary-witness pages while preserving their original scope.',
      mayCloseGapByItself: false,
      opensCompetingMethodology: false,
      userOrDomainMethodologyChoiceRequiredBeforeExecution: false,
      executableByThisReview: false,
    }),
    Object.freeze({
      trackId: 'SHENFENG_PRIMARY_PASSAGE_PROVENANCE_BINDING',
      priority: 'SECONDARY',
      targetsGapIds: shenfengGaps,
      objective:
        'Bind the inspected 神峰通考 conditional Ten-God passage to an exact primary NLC page and independent provenance before any later adequacy review.',
      mayCloseGapByItself: false,
      opensCompetingMethodology: false,
      userOrDomainMethodologyChoiceRequiredBeforeExecution: false,
      executableByThisReview: false,
    }),
    Object.freeze({
      trackId: 'QIANLI_YONGSHIN_XIJI_COMPETING_METHODOLOGY_APPLICABILITY',
      priority: 'DEFERRED_REQUIRES_METHODOLOGY_CHOICE',
      targetsGapIds: Object.freeze([
        'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING',
      ] as const satisfies readonly CareerT8SynthesisAuthorityGapId[]),
      objective:
        'Separately assess whether the 用神/喜忌-based 事業 methodology should ever coexist with or replace the current personalized T5/T6 Career synthesis path.',
      mayCloseGapByItself: false,
      opensCompetingMethodology: true,
      userOrDomainMethodologyChoiceRequiredBeforeExecution: true,
      executableByThisReview: false,
    }),
  ]);
}

function finalized(
  material: Omit<CareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReviewReport, 'reviewId'>,
): CareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReviewReport {
  return {
    reviewId: `career_t8_residual_gap_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReview(
  b8: CareerPersonalizationT8SynthesisAuthorityCandidateRequirementCoverageEvaluationReport,
): CareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReviewReport {
  const accepted = exactB8Accepted(b8);
  const residualGaps = accepted ? buildResidualGaps(b8) : Object.freeze([]);
  const universalResidualRequirementIds = accepted
    ? Object.freeze(
        CAREER_T8_CANDIDATE_COVERAGE_REQUIREMENT_IDS.filter((requirementId) =>
          b8.evaluations.every((evaluation) =>
            evaluation.missingRequirementIds.includes(requirementId),
          ),
        ),
      )
    : Object.freeze([]);
  const tracks = accepted ? acquisitionTracks() : Object.freeze([]);

  return finalized({
    reviewVersion:
      CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_RESIDUAL_GAP_REASSESSMENT_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_SYNTHESIS_AUTHORITY_RESIDUAL_GAP_REASSESSMENT'
      : 'UPSTREAM_B8_BOUNDARY_INVALID',
    decision: accepted
      ? 'UNIVERSAL_CURRENT_T5_T6_TO_CAREER_BRIDGE_RESIDUAL_CONFIRMED_ALL_SIX_GAPS_OPEN_COMPETING_YONGSHIN_XIJI_TRACK_DEFERRED'
      : 'CAREER_T8_RESIDUAL_GAP_REASSESSMENT_NOT_ESTABLISHED',
    upstreamB8EvaluationId: b8.evaluationId,
    exactB8BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    residualGapCount: accepted ? 6 : 0,
    residualGaps,
    universalResidualRequirementIds,
    currentT5T6SemanticBridgeIsUniversalResidual:
      accepted &&
      universalResidualRequirementIds.includes('CURRENT_PERSONALIZED_T5_T6_SEMANTIC_BRIDGE'),
    allSixGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    noCurrentCandidateMayBePromoted:
      accepted && b8.authorityAcceptedCandidateCount === 0 && b8.authorityGapClosedCount === 0,
    qianliExplicitCareerBindingPreserved:
      accepted && b8.qianliCareerBindingObservedButInsufficientForCurrentContract,
    qianliCurrentT5T6BridgeStillMissing:
      accepted &&
      b8.evaluations
        .filter((evaluation) => evaluation.sourceTitle === '千里命稿')
        .every((evaluation) =>
          evaluation.missingRequirementIds.includes('CURRENT_PERSONALIZED_T5_T6_SEMANTIC_BRIDGE'),
        ),
    qianliPrimaryPageBindingStillMissing: accepted && b8.qianliPrimaryPassageBindingStillMissing,
    qianliCompetingMethodologyInputs: accepted
      ? b8.qianliCompetingMethodologyInputs
      : Object.freeze([]),
    qianliCompetingMethodologyTrackDeferred: accepted,
    qianliCompetingMethodologyMayBeAdoptedByThisReview: false,
    acquisitionTracks: tracks,
    acquisitionTrackCount: accepted ? 4 : 0,
    primaryTrackId: accepted ? 'CURRENT_T5_T6_TO_CAREER_SEMANTIC_BRIDGE_AUTHORITY' : null,
    sameGapCrossCandidateCompositionAuthorized: false,
    authorityAcquiredByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted ? CAREER_T8_RESIDUAL_GAP_REASSESSMENT_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      sourceCandidatesDiscovered: 0,
      sourceRegistrationsCreated: 0,
      methodologyDefinitionsCreated: 0,
      methodologyChoicesAdopted: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    }),
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW'
      : 'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION',
  });
}
