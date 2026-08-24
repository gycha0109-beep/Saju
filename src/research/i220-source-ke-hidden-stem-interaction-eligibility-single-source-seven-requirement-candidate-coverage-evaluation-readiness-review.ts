import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { I212_HIDDEN_STEM_AUTHORITY_REQUIREMENT_IDS } from './i212-source-ke-hidden-stem-interaction-eligibility-authority-gap-requirements-review.js';
import type { I219SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryEvidenceReport } from './i219-source-ke-hidden-stem-interaction-eligibility-single-source-seven-requirement-authority-discovery-evidence.js';

export const I220_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_READINESS_REVIEW_VERSION =
  'myeonghwa-source-ke-hidden-stem-interaction-eligibility-single-source-seven-requirement-candidate-coverage-evaluation-readiness-review-v1';

export const I220_COVERAGE_EVALUATION_CONTROL_IDS = Object.freeze([
  'EXACT_I219_DISCOVERY_EVIDENCE_BOUNDARY_REQUIRED',
  'ONLY_QUALIFYING_DIRECT_HTML_CANDIDATE_MAY_ENTER_MATRIX',
  'PDF_AND_INDEXED_MIRROR_LEADS_EXCLUDED_FROM_MATRIX',
  'EXACTLY_SEVEN_I212_REQUIREMENT_CELLS_REQUIRED',
  'EACH_CELL_MUST_BE_CANDIDATE_LOCAL',
  'DIRECT_PARTIAL_CONFLICT_NOT_ESTABLISHED_STATES_MUST_REMAIN_DISTINCT',
  'SEARCH_SNIPPET_MAY_NOT_CREATE_DIRECT_COVERAGE',
  'DIRECTIONAL_SCOPES_MUST_BE_EVALUATED_SEPARATELY',
  'STATIC_RELATION_MUST_NOT_AUTO_EQUAL_DYNAMIC_EFFECTIVE_INTERACTION',
  'ACTIVATION_AND_EXCEPTION_LANGUAGE_MUST_BE_EXPLICIT',
  'RELATION_INTERACTION_DAMAGE_SEMANTIC_SEPARATION_MUST_BE_EXPLICIT',
  'SOURCE_IDENTITY_CONTEXT_AND_LOCATOR_MUST_BE_EVALUATED_AS_OWN_REQUIREMENT',
  'SEVEN_OF_SEVEN_COVERAGE_MAY_NOT_AUTO_PROMOTE_AUTHORITY',
  'SEVEN_OF_SEVEN_COVERAGE_MAY_NOT_AUTO_CLOSE_AUTHORITY_GAP',
  'DOCTRINAL_CONFLICT_MUST_REMAIN_PRESERVED_FOR_LATER_ADMISSIBILITY',
  'I132_QU_WEI_HOLD_LI_SUSPENSION_CURRENT_V2_AND_PROVENANCE_GUARDS_REMAIN_UNCHANGED',
] as const);
export type I220CoverageEvaluationControlId = (typeof I220_COVERAGE_EVALUATION_CONTROL_IDS)[number];

export interface I220SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_READINESS_REVIEW'
    | 'I219_DISCOVERY_EVIDENCE_BOUNDARY_INVALID';
  decision:
    | 'ONE_DIRECT_HTML_CANDIDATE_SEVEN_CELL_CANDIDATE_LOCAL_COVERAGE_MATRIX_FROZEN_SIXTEEN_CONTROLS_NO_COVERAGE_ADJUDICATED_NO_AUTHORITY_PROMOTED'
    | 'SINGLE_SOURCE_HIDDEN_STEM_CANDIDATE_COVERAGE_EVALUATION_NOT_READY';
  upstreamI219EvidenceId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI219BoundaryAccepted: boolean;
  targetSourceTerm: '克';
  targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY';
  evaluationCandidateId:
    | 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML'
    | null;
  evaluationCandidateCount: 1 | 0;
  excludedLeadCandidateCount: 2 | 0;
  requirementIds: readonly string[];
  requirementCellCount: 7 | 0;
  coverageStateVocabulary: readonly ['DIRECT', 'PARTIAL', 'CONFLICT', 'NOT_ESTABLISHED'] | readonly [];
  candidateLocalEvaluationRequired: boolean;
  directEvidenceMustBeFromDirectlyOpenedContext: boolean;
  leadEvidenceMayEnterMatrix: false;
  searchSnippetMayCreateDirectCoverage: false;
  directionalScopesEvaluatedSeparately: boolean;
  staticRelationMayAutoEqualDynamicInteraction: false;
  activationExceptionExplicitLanguageRequired: boolean;
  semanticSeparationExplicitLanguageRequired: boolean;
  sourceIdentityContextLocatorEvaluatedSeparately: boolean;
  coverageEvaluationControlIds: readonly I220CoverageEvaluationControlId[];
  coverageEvaluationControlCount: 16 | 0;
  coverageEvaluationControlsFrozen: boolean;
  coverageEvaluationAuthorized: boolean;
  coverageEvaluationExecutedByThisGate: false;
  sevenOfSevenCoverageMayAutoPromoteAuthority: false;
  sevenOfSevenCoverageMayAutoCloseAuthorityGap: false;
  authorityGap:
    | 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
    | 'UPSTREAM_INVALID';
  authorityGapClosed: false;
  authorityPromotedByThisGate: false;
  candidateRegisteredByThisGate: false;
  candidateSelectedByThisGate: false;
  doctrinalConflictPreserved: boolean;
  doctrinalConflictResolvedByThisGate: false;
  negativeFindingCreatedByThisGate: false;
  discoveryExhaustionClaimed: false;
  corpusExhaustionClaimed: false;
  quWei2001HoldPreserved: boolean;
  li1998SameTargetPathSuspendedNotRetired: boolean;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  derivativeLineageAdjudicatedByThisGate: false;
  evidenceRebindingAuthorizedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  visibleStemBinaryEffectiveInteractionEligibilityResolved: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  productionPolicyExecutionAuthorized: false;
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_EVIDENCE'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI219Accepted(
  i219: I219SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryEvidenceReport,
): boolean {
  const directCandidate = i219.candidateEvidenceRecords[0];
  return (
    i219.status ===
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_AUTHORITY_DISCOVERY_EVIDENCE' &&
    i219.decision ===
      'FIVE_DISCOVERY_PATHS_EXECUTED_THREE_CANDIDATE_RECORDS_ONE_DIRECT_HTML_SINGLE_SOURCE_CANDIDATE_TWO_LEADS_ALL_THREE_DIRECTIONAL_SIGNALS_OBSERVED_IN_DIRECT_HTML_ZERO_AUTHORITY_PROMOTED_COVERAGE_NOT_ADJUDICATED' &&
    i219.exactI218BoundaryAccepted &&
    i219.discoveryExecuted &&
    i219.executedDiscoveryPathCount === 5 &&
    i219.candidateEvidenceRecordCount === 3 &&
    i219.candidateEvidenceRecords.length === 3 &&
    i219.qualifyingDirectHtmlCandidateCount === 1 &&
    i219.leadOnlyCandidateCount === 2 &&
    directCandidate?.candidateEvidenceId === 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' &&
    directCandidate.directlyOpenedHtmlContext &&
    directCandidate.leadOnly === false &&
    directCandidate.qualifyingForLaterSingleSourceCoverageEvaluation &&
    directCandidate.sameSourceVisibleToHiddenObserved &&
    directCandidate.sameSourceHiddenToVisibleObserved &&
    directCandidate.sameSourceHiddenToHiddenObserved &&
    directCandidate.activationOrExceptionLanguageObserved &&
    directCandidate.semanticLayerSeparationSignalObserved &&
    directCandidate.reproducibleLocator &&
    i219.candidateEvidenceRecords.slice(1).every(
      (record) => record.leadOnly && record.qualifyingForLaterSingleSourceCoverageEvaluation === false,
    ) &&
    i219.materiallyNewSingleSourceCandidateObserved &&
    i219.directHtmlCandidateHasAllThreeDirectionalSignals &&
    i219.directHtmlCandidateHasActivationExceptionSignals &&
    i219.directHtmlCandidateHasSemanticSeparationSignals &&
    i219.directHtmlCandidateHasReproduciblePublishedContext &&
    i219.sevenRequirementCoverageAdjudicatedByThisGate === false &&
    i219.sevenRequirementAuthorityContractSatisfiedByThisGate === false &&
    i219.sourceClassOrAgeAutoAcceptancePerformed === false &&
    i219.crossCandidateCompositionPerformed === false &&
    i219.currentCandidateEvidenceUsedToBackfillNewCandidate === false &&
    i219.searchSnippetUsedAsAuthority === false &&
    i219.negativeFindingCreatedByThisGate === false &&
    i219.discoveryExhaustionClaimed === false &&
    i219.corpusExhaustionClaimed === false &&
    i219.authorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i219.authorityGapClosed === false &&
    i219.authorityPromotedByThisGate === false &&
    i219.doctrinalConflictPreserved &&
    i219.doctrinalConflictResolvedByThisGate === false &&
    i219.quWei2001HoldPreserved &&
    i219.li1998SameTargetPathSuspendedNotRetired &&
    i219.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i219.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i219.provenanceIndependenceAdjudicatedByThisGate === false &&
    i219.derivativeLineageAdjudicatedByThisGate === false &&
    i219.evidenceRebindingAuthorizedByThisGate === false &&
    i219.candidateSetMutatedByThisGate === false &&
    i219.candidateSetReevaluationAuthorizedByThisGate === false &&
    i219.currentV2PackageAndCandidateSetRemainImmutable &&
    i219.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i219.actualCompositionPerformedByThisGate === false &&
    i219.multiSourceCompositionAuthorized === false &&
    i219.thresholdRuleCreatedByThisGate === false &&
    i219.damageEvaluationAuthorized === false &&
    i219.classificationAuthorized === false &&
    i219.numericScoringAuthorized === false &&
    i219.productionPolicyExecutionAuthorized === false &&
    i219.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<
    I220SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationReadinessReviewReport,
    'reviewId'
  >,
): I220SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationReadinessReviewReport {
  return {
    reviewId: `i220_hidden_stem_single_source_coverage_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI220SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationReadinessReview(
  i219: I219SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementAuthorityDiscoveryEvidenceReport,
): I220SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationReadinessReviewReport {
  const accepted = exactI219Accepted(i219);
  return finalized({
    reviewVersion:
      I220_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_READINESS_REVIEW'
      : 'I219_DISCOVERY_EVIDENCE_BOUNDARY_INVALID',
    decision: accepted
      ? 'ONE_DIRECT_HTML_CANDIDATE_SEVEN_CELL_CANDIDATE_LOCAL_COVERAGE_MATRIX_FROZEN_SIXTEEN_CONTROLS_NO_COVERAGE_ADJUDICATED_NO_AUTHORITY_PROMOTED'
      : 'SINGLE_SOURCE_HIDDEN_STEM_CANDIDATE_COVERAGE_EVALUATION_NOT_READY',
    upstreamI219EvidenceId: i219.evidenceId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI219BoundaryAccepted: accepted,
    targetSourceTerm: '克',
    targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY',
    evaluationCandidateId: accepted ? 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' : null,
    evaluationCandidateCount: accepted ? 1 : 0,
    excludedLeadCandidateCount: accepted ? 2 : 0,
    requirementIds: accepted ? I212_HIDDEN_STEM_AUTHORITY_REQUIREMENT_IDS : Object.freeze([]),
    requirementCellCount: accepted ? 7 : 0,
    coverageStateVocabulary: accepted
      ? (Object.freeze(['DIRECT', 'PARTIAL', 'CONFLICT', 'NOT_ESTABLISHED']) as readonly [
          'DIRECT',
          'PARTIAL',
          'CONFLICT',
          'NOT_ESTABLISHED',
        ])
      : Object.freeze([]),
    candidateLocalEvaluationRequired: accepted,
    directEvidenceMustBeFromDirectlyOpenedContext: accepted,
    leadEvidenceMayEnterMatrix: false,
    searchSnippetMayCreateDirectCoverage: false,
    directionalScopesEvaluatedSeparately: accepted,
    staticRelationMayAutoEqualDynamicInteraction: false,
    activationExceptionExplicitLanguageRequired: accepted,
    semanticSeparationExplicitLanguageRequired: accepted,
    sourceIdentityContextLocatorEvaluatedSeparately: accepted,
    coverageEvaluationControlIds: accepted ? I220_COVERAGE_EVALUATION_CONTROL_IDS : Object.freeze([]),
    coverageEvaluationControlCount: accepted ? 16 : 0,
    coverageEvaluationControlsFrozen: accepted,
    coverageEvaluationAuthorized: accepted,
    coverageEvaluationExecutedByThisGate: false,
    sevenOfSevenCoverageMayAutoPromoteAuthority: false,
    sevenOfSevenCoverageMayAutoCloseAuthorityGap: false,
    authorityGap: accepted
      ? 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
      : 'UPSTREAM_INVALID',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    candidateRegisteredByThisGate: false,
    candidateSelectedByThisGate: false,
    doctrinalConflictPreserved: accepted,
    doctrinalConflictResolvedByThisGate: false,
    negativeFindingCreatedByThisGate: false,
    discoveryExhaustionClaimed: false,
    corpusExhaustionClaimed: false,
    quWei2001HoldPreserved: accepted,
    li1998SameTargetPathSuspendedNotRetired: accepted,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    derivativeLineageAdjudicatedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    recommendedNextGate: accepted
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_EVIDENCE'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_READINESS_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I220 freezes one seven-cell candidate-local matrix for the directly opened Sohu HTML candidate only; the PDF and indexed mirror leads are excluded.',
          'Coverage states remain DIRECT, PARTIAL, CONFLICT, or NOT_ESTABLISHED, and each directional and semantic requirement must be adjudicated independently from the same direct source context.',
          'Even a future seven-of-seven coverage result cannot promote authority or close the hidden-stem authority gap automatically; admissibility, source-context adequacy, and preserved doctrinal conflict require a later gate.',
        ])
      : Object.freeze(['I220 fails closed unless the exact I219 discovery-evidence boundary is preserved.']),
  });
}
