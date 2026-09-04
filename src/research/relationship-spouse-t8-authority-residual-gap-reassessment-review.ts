import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS,
  type RelationshipSpouseT8AuthorityGapId,
} from './relationship-spouse-t8-authority-acquisition-readiness-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_CANDIDATE_COVERAGE_REQUIREMENT_IDS,
  type RelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluationReport,
  type RelationshipSpouseT8CandidateCoverageRequirementId,
} from './relationship-spouse-t8-authority-candidate-requirement-coverage-evaluation.js';

export const RELATIONSHIP_SPOUSE_T8_AUTHORITY_RESIDUAL_GAP_REASSESSMENT_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-authority-residual-gap-reassessment-review-v1' as const;

export type RelationshipSpouseT8ResidualGapClass =
  | 'SPOUSE_SEMANTIC_BINDING_AND_INPUT_BRIDGE_RESIDUAL'
  | 'SPOUSE_APPLICABILITY_AND_METHOD_COMPATIBILITY_RESIDUAL'
  | 'SPOUSE_COMPOSITION_AND_INPUT_BRIDGE_RESIDUAL'
  | 'SPOUSE_SCOPE_MODERNIZATION_RESIDUAL'
  | 'SPOUSE_PROVENANCE_AND_INPUT_BRIDGE_RESIDUAL';

export type RelationshipSpouseT8ResidualAcquisitionTrackId =
  | 'CURRENT_SPOUSE_T5_T6_SEMANTIC_BRIDGE_AUTHORITY'
  | 'MODERN_SPOUSE_PRODUCT_SCOPE_APPLICABILITY'
  | 'DITIAN_PRIMARY_PASSAGE_PROVENANCE_BINDING'
  | 'COMPETING_HISTORICAL_SPOUSE_METHODOLOGY_APPLICABILITY';

export interface RelationshipSpouseT8ResidualGapReassessment {
  gapId: RelationshipSpouseT8AuthorityGapId;
  residualClass: RelationshipSpouseT8ResidualGapClass;
  evaluatedCandidateCount: number;
  strongestCandidateIds: readonly string[];
  universalResidualRequirementIds: readonly RelationshipSpouseT8CandidateCoverageRequirementId[];
  currentSpouseT5T6BridgeResidual: true;
  methodologyInputCompatibilityResidual: true;
  modernProductScopeCompatibilityResidual: true;
  primaryPassageBindingResidual: boolean;
  independentProvenanceResidual: boolean;
  explicitSpouseSemanticResidual: boolean;
  applicabilityBoundaryResidual: boolean;
  contextExceptionResidual: boolean;
  crossCandidateStitchingWouldBeRequiredToCloseFromCurrentEvidence: boolean;
  gapClosed: false;
  spouseT8SemanticRuleAuthorized: false;
}

export interface RelationshipSpouseT8ResidualAcquisitionTrack {
  trackId: RelationshipSpouseT8ResidualAcquisitionTrackId;
  priority: 'PRIMARY' | 'SECONDARY' | 'DEFERRED_REQUIRES_METHODOLOGY_CHOICE';
  targetsGapIds: readonly RelationshipSpouseT8AuthorityGapId[];
  objective: string;
  mayCloseGapByItself: false;
  opensCompetingMethodology: boolean;
  userOrDomainMethodologyChoiceRequiredBeforeExecution: boolean;
  executableByThisReview: false;
}

export const RELATIONSHIP_SPOUSE_T8_RESIDUAL_GAP_REASSESSMENT_CONTROL_IDS = Object.freeze([
  'RESIDUAL_REASSESSMENT_DOES_NOT_CLOSE_ANY_SPOUSE_AUTHORITY_GAP',
  'CURRENT_SPOUSE_T5_T6_SEMANTIC_BRIDGE_IS_A_UNIVERSAL_RESIDUAL_BLOCKER',
  'METHODOLOGY_INPUT_COMPATIBILITY_IS_A_UNIVERSAL_RESIDUAL_BLOCKER',
  'MODERN_PRODUCT_SCOPE_COMPATIBILITY_IS_A_UNIVERSAL_RESIDUAL_BLOCKER',
  'PRIMARY_SPOUSE_VOCABULARY_OR_PAGE_BINDING_ALONE_IS_NOT_A_CURRENT_T5_T6_BRIDGE',
  'ZIPING_PRIMARY_EVIDENCE_DOES_NOT_SOLVE_METHOD_INPUT_OR_MODERN_SCOPE_COMPATIBILITY',
  'DITIAN_PRIMARY_PAGE_OR_PROVENANCE_BINDING_ALONE_CANNOT_SOLVE_CURRENT_INPUT_BRIDGE',
  'HISTORICAL_SEX_GENDER_ROLE_AND_PARTNER_ATTRIBUTE_ASSUMPTIONS_MAY_NOT_BE_UNIVERSALIZED',
  'COMPETING_HISTORICAL_SPOUSE_METHODOLOGY_REQUIRES_EXPLICIT_DOMAIN_CHOICE',
  'NO_CROSS_CANDIDATE_STITCHING_TO_SYNTHESIZE_MISSING_AUTHORITY',
  'COMPATIBILITY_AUTHORITY_CANNOT_SUBSTITUTE_FOR_SPOUSE_AUTHORITY',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT',
] as const);

export interface RelationshipSpouseT8AuthorityResidualGapReassessmentReviewReport {
  reviewId: string;
  reviewVersion: typeof RELATIONSHIP_SPOUSE_T8_AUTHORITY_RESIDUAL_GAP_REASSESSMENT_REVIEW_VERSION;
  status:
    | 'RESOLVED_RELATIONSHIP_SPOUSE_T8_AUTHORITY_RESIDUAL_GAP_REASSESSMENT'
    | 'UPSTREAM_COVERAGE_EVALUATION_BOUNDARY_INVALID';
  decision:
    | 'THREE_UNIVERSAL_RESIDUAL_BLOCKERS_CONFIRMED_ALL_FIVE_GAPS_OPEN_COMPETING_HISTORICAL_METHODOLOGY_TRACK_DEFERRED'
    | 'RELATIONSHIP_SPOUSE_T8_RESIDUAL_GAP_REASSESSMENT_NOT_ESTABLISHED';
  upstreamCoverageEvaluationId: string;
  exactCoverageBoundaryAccepted: boolean;
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  residualGapCount: 5 | 0;
  residualGaps: readonly RelationshipSpouseT8ResidualGapReassessment[];
  universalResidualRequirementIds: readonly RelationshipSpouseT8CandidateCoverageRequirementId[];
  currentSpouseT5T6SemanticBridgeIsUniversalResidual: boolean;
  methodologyInputCompatibilityIsUniversalResidual: boolean;
  modernProductScopeCompatibilityIsUniversalResidual: boolean;
  allFiveGapsRemainOpen: true;
  unresolvedGapIds: readonly RelationshipSpouseT8AuthorityGapId[];
  noCurrentCandidateMayBePromoted: boolean;
  zipingPrimaryBoundEvidencePreserved: boolean;
  zipingCurrentSpouseT5T6BridgeStillMissing: boolean;
  zipingCompetingMethodologyInputs: readonly string[];
  zipingModernProductScopeCompatibilityStillMissing: boolean;
  ditianPrimaryPassageBindingStillMissing: boolean;
  ditianIndependentProvenanceStillMissing: boolean;
  acquisitionTracks: readonly RelationshipSpouseT8ResidualAcquisitionTrack[];
  acquisitionTrackCount: 4 | 0;
  primaryTrackId: RelationshipSpouseT8ResidualAcquisitionTrackId | null;
  sameGapCrossCandidateCompositionAuthorized: false;
  unresolvedShenfengGenderRoleLeadMayCloseGapByItself: false;
  authorityAdmittedByThisGate: false;
  spouseT8RuleAuthoringAuthorized: false;
  spouseT8ClaimTypeCreationAuthorized: false;
  spouseInterpretationPackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  compatibilityAuthorityAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_RESIDUAL_GAP_REASSESSMENT_CONTROL_IDS)[number][];
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
    | 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW'
    | 'RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION';
}

const UNIVERSAL_RESIDUAL_REQUIREMENT_IDS = Object.freeze([
  'CURRENT_SPOUSE_T5_T6_SEMANTIC_BRIDGE',
  'METHODOLOGY_INPUT_COMPATIBILITY',
  'MODERN_PRODUCT_SCOPE_COMPATIBILITY',
] as const satisfies readonly RelationshipSpouseT8CandidateCoverageRequirementId[]);

function allGapIds(): readonly RelationshipSpouseT8AuthorityGapId[] {
  return Object.freeze(
    RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS.map((requirement) => requirement.gapId),
  );
}

function contentAddressedCoverageIdentityValid(
  coverage: RelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluationReport,
): boolean {
  const { evaluationId, ...material } = coverage;
  return (
    evaluationId ===
    `relationship_spouse_t8_candidate_requirement_coverage_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function everyEvaluationMissingUniversalResiduals(
  coverage: RelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluationReport,
): boolean {
  return coverage.evaluations.every((evaluation) =>
    UNIVERSAL_RESIDUAL_REQUIREMENT_IDS.every((requirementId) =>
      evaluation.missingRequirementIds.includes(requirementId),
    ),
  );
}

function everyGapSummaryPreservesUniversalResiduals(
  coverage: RelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluationReport,
): boolean {
  return coverage.gapSummaries.every((summary) =>
    UNIVERSAL_RESIDUAL_REQUIREMENT_IDS.every((requirementId) =>
      summary.residualRequirementIds.includes(requirementId),
    ),
  );
}

function exactCoverageBoundaryAccepted(
  coverage: RelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluationReport,
): boolean {
  const expectedGapIds = allGapIds();
  return (
    contentAddressedCoverageIdentityValid(coverage) &&
    coverage.status ===
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION' &&
    coverage.decision ===
      'TEN_CANDIDATE_GAP_EVALUATIONS_COMPLETE_ZERO_FULL_COVERAGE_ALL_FIVE_GAPS_REMAIN_OPEN' &&
    coverage.exactDiscoveryEvidenceBoundaryAccepted &&
    coverage.candidateCount === 2 &&
    coverage.candidateGapEvaluationCount === 10 &&
    coverage.evaluations.length === 10 &&
    coverage.gapSummaries.length === 5 &&
    coverage.evaluatedGapCount === 5 &&
    coverage.fullySatisfiedCandidateGapEvaluationCount === 0 &&
    coverage.authorityAcceptedCandidateCount === 0 &&
    coverage.authorityGapClosedCount === 0 &&
    coverage.allFiveGapsRemainOpen &&
    deterministicContentHash(coverage.unresolvedGapIds) === deterministicContentHash(expectedGapIds) &&
    coverage.currentSpouseT5T6BridgeMissingForEveryEvaluation &&
    coverage.modernProductScopeCompatibilityMissingForEveryEvaluation &&
    coverage.noSingleCandidateFullySatisfiesAnyGap &&
    everyEvaluationMissingUniversalResiduals(coverage) &&
    everyGapSummaryPreservesUniversalResiduals(coverage) &&
    coverage.sameGapCrossCandidateCompositionPerformed === false &&
    coverage.sameGapCrossCandidateCompositionAuthorized === false &&
    coverage.unresolvedShenfengGenderRoleLeadMayCloseGapByItself === false &&
    coverage.candidateRegistrationPerformedByThisGate === false &&
    coverage.authorityAdmittedByThisGate === false &&
    coverage.spouseT8RuleAuthoringAuthorized === false &&
    coverage.spouseT8ClaimTypeCreationAuthorized === false &&
    coverage.spouseInterpretationPackCreationAuthorized === false &&
    coverage.consumerNarrativeAuthorized === false &&
    coverage.compatibilityAuthorityAuthorized === false &&
    coverage.previewDefaultSwitchAuthorized === false &&
    coverage.productionPromotionAuthorized === false &&
    coverage.controlsFrozen &&
    coverage.controlCount === 13 &&
    coverage.implementationEffects.coverageEvaluationsCreated === 10 &&
    coverage.implementationEffects.sourceRegistrationsCreated === 0 &&
    coverage.implementationEffects.methodologyDefinitionsCreated === 0 &&
    coverage.implementationEffects.ruleDefinitionsCreated === 0 &&
    coverage.implementationEffects.claimTypesCreated === 0 &&
    coverage.implementationEffects.registrySnapshotsCreated === 0 &&
    coverage.implementationEffects.interpretationPacksCreated === 0 &&
    coverage.implementationEffects.narrativePlansCreated === 0 &&
    coverage.implementationEffects.previewRoutesChanged === 0 &&
    coverage.zipingPrimaryBoundSpouseEvidenceObservedButInsufficientForCurrentContract &&
    coverage.zipingCurrentSpouseT5T6BridgeMissing &&
    coverage.zipingModernProductScopeCompatibilityMissing &&
    coverage.ditianPrimaryPassageBindingStillMissing &&
    coverage.ditianIndependentNormativeProvenanceStillMissing &&
    coverage.recommendedNextGate ===
      'RELATIONSHIP_SPOUSE_T8_AUTHORITY_RESIDUAL_GAP_REASSESSMENT_REVIEW'
  );
}

function hasMissingRequirement(
  coverage: RelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluationReport,
  gapId: RelationshipSpouseT8AuthorityGapId,
  requirementId: RelationshipSpouseT8CandidateCoverageRequirementId,
): boolean {
  return coverage.evaluations
    .filter((evaluation) => evaluation.gapId === gapId)
    .some((evaluation) => evaluation.missingRequirementIds.includes(requirementId));
}

function everyCandidateForGapMissing(
  coverage: RelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluationReport,
  gapId: RelationshipSpouseT8AuthorityGapId,
  requirementId: RelationshipSpouseT8CandidateCoverageRequirementId,
): boolean {
  const relevant = coverage.evaluations.filter((evaluation) => evaluation.gapId === gapId);
  return (
    relevant.length > 0 &&
    relevant.every((evaluation) => evaluation.missingRequirementIds.includes(requirementId))
  );
}

function residualClassForGap(
  gapId: RelationshipSpouseT8AuthorityGapId,
): RelationshipSpouseT8ResidualGapClass {
  switch (gapId) {
    case 'SPOUSE_SPECIFIC_SEMANTIC_BINDING_MISSING':
      return 'SPOUSE_SEMANTIC_BINDING_AND_INPUT_BRIDGE_RESIDUAL';
    case 'SPOUSE_APPLICABILITY_BOUNDARY_MISSING':
      return 'SPOUSE_APPLICABILITY_AND_METHOD_COMPATIBILITY_RESIDUAL';
    case 'SPOUSE_MULTI_CLAIM_COMPOSITION_METHOD_MISSING':
      return 'SPOUSE_COMPOSITION_AND_INPUT_BRIDGE_RESIDUAL';
    case 'SPOUSE_SCOPE_LIMITS_AND_EXCEPTIONS_MISSING':
      return 'SPOUSE_SCOPE_MODERNIZATION_RESIDUAL';
    case 'SPOUSE_NORMATIVE_PROVENANCE_REVIEW_MISSING':
      return 'SPOUSE_PROVENANCE_AND_INPUT_BRIDGE_RESIDUAL';
  }
}

function buildResidualGaps(
  coverage: RelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluationReport,
): readonly RelationshipSpouseT8ResidualGapReassessment[] {
  return Object.freeze(
    coverage.gapSummaries.map((summary) => {
      const currentBridgeResidual = everyCandidateForGapMissing(
        coverage,
        summary.gapId,
        'CURRENT_SPOUSE_T5_T6_SEMANTIC_BRIDGE',
      );
      const methodologyResidual = everyCandidateForGapMissing(
        coverage,
        summary.gapId,
        'METHODOLOGY_INPUT_COMPATIBILITY',
      );
      const modernScopeResidual = everyCandidateForGapMissing(
        coverage,
        summary.gapId,
        'MODERN_PRODUCT_SCOPE_COMPATIBILITY',
      );
      return Object.freeze({
        gapId: summary.gapId,
        residualClass: residualClassForGap(summary.gapId),
        evaluatedCandidateCount: summary.evaluatedCandidateCount,
        strongestCandidateIds: summary.strongestCandidateIds,
        universalResidualRequirementIds: summary.residualRequirementIds,
        currentSpouseT5T6BridgeResidual: currentBridgeResidual as true,
        methodologyInputCompatibilityResidual: methodologyResidual as true,
        modernProductScopeCompatibilityResidual: modernScopeResidual as true,
        primaryPassageBindingResidual: hasMissingRequirement(
          coverage,
          summary.gapId,
          'ORIGINAL_PRIMARY_WITNESS_EXACT_PASSAGE',
        ),
        independentProvenanceResidual: hasMissingRequirement(
          coverage,
          summary.gapId,
          'INDEPENDENT_NORMATIVE_PROVENANCE',
        ),
        explicitSpouseSemanticResidual: hasMissingRequirement(
          coverage,
          summary.gapId,
          'EXPLICIT_SPOUSE_SEMANTIC_ASSERTION',
        ),
        applicabilityBoundaryResidual: hasMissingRequirement(
          coverage,
          summary.gapId,
          'EXPLICIT_APPLICABILITY_BOUNDARY',
        ),
        contextExceptionResidual: hasMissingRequirement(
          coverage,
          summary.gapId,
          'EXPLICIT_CONTEXT_OR_EXCEPTION_TREATMENT',
        ),
        crossCandidateStitchingWouldBeRequiredToCloseFromCurrentEvidence:
          summary.evaluatedCandidateCount > 1 && summary.fullySatisfyingCandidateCount === 0,
        gapClosed: false,
        spouseT8SemanticRuleAuthorized: false,
      });
    }),
  );
}

function acquisitionTracks(): readonly RelationshipSpouseT8ResidualAcquisitionTrack[] {
  const allGaps = allGapIds();
  return Object.freeze([
    Object.freeze({
      trackId: 'CURRENT_SPOUSE_T5_T6_SEMANTIC_BRIDGE_AUTHORITY',
      priority: 'PRIMARY',
      targetsGapIds: allGaps,
      objective:
        'Acquire explicit source-bound authority mapping the already-governed current spouse T5/T6 semantic inputs into bounded relationship/spouse T8 synthesis without silently importing a different methodology.',
      mayCloseGapByItself: false,
      opensCompetingMethodology: false,
      userOrDomainMethodologyChoiceRequiredBeforeExecution: false,
      executableByThisReview: false,
    }),
    Object.freeze({
      trackId: 'MODERN_SPOUSE_PRODUCT_SCOPE_APPLICABILITY',
      priority: 'SECONDARY',
      targetsGapIds: allGaps,
      objective:
        'Establish a bounded modern spouse-product applicability contract so historical sex/gender roles, partner attributes and deterministic relationship outcomes cannot be silently promoted into product semantics.',
      mayCloseGapByItself: false,
      opensCompetingMethodology: false,
      userOrDomainMethodologyChoiceRequiredBeforeExecution: false,
      executableByThisReview: false,
    }),
    Object.freeze({
      trackId: 'DITIAN_PRIMARY_PASSAGE_PROVENANCE_BINDING',
      priority: 'SECONDARY',
      targetsGapIds: allGaps,
      objective:
        'Bind the inspected 滴天髓闡微 夫妻 passage to an exact 1947 primary-scan page and independent provenance while preserving the historical source scope.',
      mayCloseGapByItself: false,
      opensCompetingMethodology: false,
      userOrDomainMethodologyChoiceRequiredBeforeExecution: false,
      executableByThisReview: false,
    }),
    Object.freeze({
      trackId: 'COMPETING_HISTORICAL_SPOUSE_METHODOLOGY_APPLICABILITY',
      priority: 'DEFERRED_REQUIRES_METHODOLOGY_CHOICE',
      targetsGapIds: allGaps,
      objective:
        'Separately assess whether 妻宮/月令用神/喜忌/格局 and 財神/喜神/日主衰旺/喜忌 methodology inputs should ever coexist with or replace the current Myeonghwa spouse T5/T6 input contract.',
      mayCloseGapByItself: false,
      opensCompetingMethodology: true,
      userOrDomainMethodologyChoiceRequiredBeforeExecution: true,
      executableByThisReview: false,
    }),
  ]);
}

function finalized(
  material: Omit<RelationshipSpouseT8AuthorityResidualGapReassessmentReviewReport, 'reviewId'>,
): RelationshipSpouseT8AuthorityResidualGapReassessmentReviewReport {
  return {
    reviewId: `relationship_spouse_t8_residual_gap_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildRelationshipSpouseT8AuthorityResidualGapReassessmentReview(
  coverage: RelationshipSpouseT8AuthorityCandidateRequirementCoverageEvaluationReport,
): RelationshipSpouseT8AuthorityResidualGapReassessmentReviewReport {
  const accepted = exactCoverageBoundaryAccepted(coverage);
  const residualGaps = accepted ? buildResidualGaps(coverage) : Object.freeze([]);
  const universalResidualRequirementIds = accepted
    ? Object.freeze(
        RELATIONSHIP_SPOUSE_T8_CANDIDATE_COVERAGE_REQUIREMENT_IDS.filter((requirementId) =>
          coverage.evaluations.every((evaluation) =>
            evaluation.missingRequirementIds.includes(requirementId),
          ),
        ),
      )
    : Object.freeze([]);
  const tracks = accepted ? acquisitionTracks() : Object.freeze([]);

  return finalized({
    reviewVersion: RELATIONSHIP_SPOUSE_T8_AUTHORITY_RESIDUAL_GAP_REASSESSMENT_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_RELATIONSHIP_SPOUSE_T8_AUTHORITY_RESIDUAL_GAP_REASSESSMENT'
      : 'UPSTREAM_COVERAGE_EVALUATION_BOUNDARY_INVALID',
    decision: accepted
      ? 'THREE_UNIVERSAL_RESIDUAL_BLOCKERS_CONFIRMED_ALL_FIVE_GAPS_OPEN_COMPETING_HISTORICAL_METHODOLOGY_TRACK_DEFERRED'
      : 'RELATIONSHIP_SPOUSE_T8_RESIDUAL_GAP_REASSESSMENT_NOT_ESTABLISHED',
    upstreamCoverageEvaluationId: coverage.evaluationId,
    exactCoverageBoundaryAccepted: accepted,
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    residualGapCount: accepted ? 5 : 0,
    residualGaps,
    universalResidualRequirementIds,
    currentSpouseT5T6SemanticBridgeIsUniversalResidual:
      accepted && universalResidualRequirementIds.includes('CURRENT_SPOUSE_T5_T6_SEMANTIC_BRIDGE'),
    methodologyInputCompatibilityIsUniversalResidual:
      accepted && universalResidualRequirementIds.includes('METHODOLOGY_INPUT_COMPATIBILITY'),
    modernProductScopeCompatibilityIsUniversalResidual:
      accepted && universalResidualRequirementIds.includes('MODERN_PRODUCT_SCOPE_COMPATIBILITY'),
    allFiveGapsRemainOpen: true,
    unresolvedGapIds: allGapIds(),
    noCurrentCandidateMayBePromoted:
      accepted &&
      coverage.authorityAcceptedCandidateCount === 0 &&
      coverage.authorityGapClosedCount === 0,
    zipingPrimaryBoundEvidencePreserved:
      accepted && coverage.zipingPrimaryBoundSpouseEvidenceObservedButInsufficientForCurrentContract,
    zipingCurrentSpouseT5T6BridgeStillMissing: accepted && coverage.zipingCurrentSpouseT5T6BridgeMissing,
    zipingCompetingMethodologyInputs: accepted
      ? coverage.zipingCompetingMethodologyInputs
      : Object.freeze([]),
    zipingModernProductScopeCompatibilityStillMissing:
      accepted && coverage.zipingModernProductScopeCompatibilityMissing,
    ditianPrimaryPassageBindingStillMissing: accepted && coverage.ditianPrimaryPassageBindingStillMissing,
    ditianIndependentProvenanceStillMissing:
      accepted && coverage.ditianIndependentNormativeProvenanceStillMissing,
    acquisitionTracks: tracks,
    acquisitionTrackCount: accepted ? 4 : 0,
    primaryTrackId: accepted ? 'CURRENT_SPOUSE_T5_T6_SEMANTIC_BRIDGE_AUTHORITY' : null,
    sameGapCrossCandidateCompositionAuthorized: false,
    unresolvedShenfengGenderRoleLeadMayCloseGapByItself: false,
    authorityAdmittedByThisGate: false,
    spouseT8RuleAuthoringAuthorized: false,
    spouseT8ClaimTypeCreationAuthorized: false,
    spouseInterpretationPackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    compatibilityAuthorityAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted ? RELATIONSHIP_SPOUSE_T8_RESIDUAL_GAP_REASSESSMENT_CONTROL_IDS : Object.freeze([]),
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
      ? 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW'
      : 'RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_REQUIREMENT_COVERAGE_EVALUATION',
  });
}
