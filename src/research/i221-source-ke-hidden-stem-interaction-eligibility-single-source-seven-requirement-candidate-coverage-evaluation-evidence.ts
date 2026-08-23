import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I212HiddenStemAuthorityRequirementId } from './i212-source-ke-hidden-stem-interaction-eligibility-authority-gap-requirements-review.js';
import type { I220SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationReadinessReviewReport } from './i220-source-ke-hidden-stem-interaction-eligibility-single-source-seven-requirement-candidate-coverage-evaluation-readiness-review.js';

export const I221_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_EVIDENCE_VERSION =
  'myeonghwa-source-ke-hidden-stem-interaction-eligibility-single-source-seven-requirement-candidate-coverage-evaluation-evidence-v1';

export type I221CoverageState = 'DIRECT' | 'PARTIAL' | 'CONFLICT' | 'NOT_ESTABLISHED';

export interface I221CoverageCell {
  requirementId: I212HiddenStemAuthorityRequirementId;
  state: I221CoverageState;
  candidateLocal: true;
  directOpenedHtmlContextUsed: true;
  searchSnippetUsed: false;
  crossCandidateBackfillUsed: false;
  evidenceLocator: string;
  rationale: string;
}

export interface I221SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationEvidenceReport {
  evaluationId: string;
  evaluationVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_EVIDENCE'
    | 'I220_COVERAGE_READINESS_BOUNDARY_INVALID';
  decision:
    | 'SOHU_DIRECT_HTML_CANDIDATE_SEVEN_OF_SEVEN_DIRECT_CANDIDATE_LOCAL_REQUIREMENT_COVERAGE_ESTABLISHED_COVERAGE_ADEQUATE_AUTHORITY_ADMISSIBILITY_NOT_ADJUDICATED_NO_PROMOTION_NO_GAP_CLOSURE'
    | 'SINGLE_SOURCE_HIDDEN_STEM_CANDIDATE_COVERAGE_EVALUATION_NOT_EXECUTED';
  upstreamI220ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI220BoundaryAccepted: boolean;
  targetSourceTerm: '克';
  targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY';
  evaluatedCandidateId:
    | 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML'
    | null;
  evaluationExecuted: boolean;
  coverageCells: readonly I221CoverageCell[];
  coverageCellCount: 7 | 0;
  directCoverageCount: 7 | 0;
  partialCoverageCount: 0;
  conflictCoverageCount: 0;
  notEstablishedCoverageCount: 0;
  allSevenRequirementsDirectlyCoveredCandidateLocally: boolean;
  membershipVsEffectiveInteractionSeparationDirect: boolean;
  visibleToHiddenDirectionalScopeDirect: boolean;
  hiddenToVisibleDirectionalScopeDirect: boolean;
  hiddenToHiddenDirectionalScopeDirect: boolean;
  activationAndExceptionConditionsDirect: boolean;
  relationInteractionDamageSemanticSeparationDirect: boolean;
  sourceIdentityVerifiedContextAndLocatorDirect: boolean;
  onlinePublishedSourceIdentityIsEvaluationObject: boolean;
  canonicalPrintEditionRequiredForThisCoverageFinding: false;
  exactDoctrinalAuthorshipOrLineageAdjudicatedByThisGate: false;
  sourceNormativeAdmissibilityAdjudicatedByThisGate: false;
  doctrinalConflictWithRestrictiveCandidatePreserved: boolean;
  doctrinalConflictResolvedByThisGate: false;
  sevenRequirementCoverageAdequate: boolean;
  sevenRequirementCoverageAdequacyEqualsAuthorityPromotion: false;
  sevenRequirementCoverageAdequacyEqualsAuthorityGapClosure: false;
  authorityGap:
    | 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
    | 'UPSTREAM_INVALID';
  authorityGapClosed: false;
  authorityPromotedByThisGate: false;
  candidateRegisteredByThisGate: false;
  candidateSelectedByThisGate: false;
  leadOnlyEvidenceUsedInCoverageMatrix: false;
  currentCandidateEvidenceUsedToBackfill: false;
  searchSnippetUsedAsDirectCoverage: false;
  sourceClassOrAgeAutoAcceptancePerformed: false;
  crossCandidateCompositionPerformed: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_COVERAGE_ADEQUACY_AUTHORITY_ADMISSIBILITY_PROMOTION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_EVIDENCE';
  notes: readonly string[];
}

const SOHU_LOCATOR = 'https://m.sohu.com/n/479788391/?wscrid=95360_8';

const COVERAGE_CELLS: readonly I221CoverageCell[] = Object.freeze([
  Object.freeze({
    requirementId: 'HIDDEN_STEM_MEMBERSHIP_VS_EFFECTIVE_INTERACTION_SEPARATION',
    state: 'DIRECT',
    candidateLocal: true,
    directOpenedHtmlContextUsed: true,
    searchSnippetUsed: false,
    crossCandidateBackfillUsed: false,
    evidenceLocator: `${SOHU_LOCATOR}#地支静克-动克与本柱干支相克`,
    rationale:
      'The page names hidden-stem components while separately distinguishing static 克 from externally activated dynamic 克, so hidden membership/relation presence is not treated as identical to effective dynamic interaction.',
  }),
  Object.freeze({
    requirementId: 'VISIBLE_STEM_TO_HIDDEN_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE',
    state: 'DIRECT',
    candidateLocal: true,
    directOpenedHtmlContextUsed: true,
    searchSnippetUsed: false,
    crossCandidateBackfillUsed: false,
    evidenceLocator: `${SOHU_LOCATOR}#本柱干支相克-干克支`,
    rationale:
      'The 干克支 subsection explicitly maps visible stems to hidden stems in the same pillar, including examples such as 戊 with 子中癸 and 庚 with 寅中甲, with context exceptions for some pillars.',
  }),
  Object.freeze({
    requirementId: 'HIDDEN_STEM_TO_VISIBLE_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE',
    state: 'DIRECT',
    candidateLocal: true,
    directOpenedHtmlContextUsed: true,
    searchSnippetUsed: false,
    crossCandidateBackfillUsed: false,
    evidenceLocator: `${SOHU_LOCATOR}#本柱干支相克-支克干`,
    rationale:
      'The 支克干 subsection explicitly identifies hidden stems as the overcoming component against the visible same-pillar stem, with multiple examples and conditional exceptions.',
  }),
  Object.freeze({
    requirementId: 'HIDDEN_STEM_TO_HIDDEN_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE',
    state: 'DIRECT',
    candidateLocal: true,
    directOpenedHtmlContextUsed: true,
    searchSnippetUsed: false,
    crossCandidateBackfillUsed: false,
    evidenceLocator: `${SOHU_LOCATOR}#地支静克-冲动动克-合动克`,
    rationale:
      'The page repeatedly expresses branch-to-branch 克 as hidden-stem-to-hidden-stem pairs and distinguishes static, clash-activated, combination-activated, and transformed cases.',
  }),
  Object.freeze({
    requirementId: 'POSITION_CONTEXT_ACTIVATION_AND_EXCEPTION_CONDITIONS',
    state: 'DIRECT',
    candidateLocal: true,
    directOpenedHtmlContextUsed: true,
    searchSnippetUsed: false,
    crossCandidateBackfillUsed: false,
    evidenceLocator: `${SOHU_LOCATOR}#静克小结-动克条件-破局与本柱例外`,
    rationale:
      'The page explicitly conditions dynamic 克 on external activation and strength and states blocking/exception conditions including clash dispersal, combination binding, transformation, break states, and context-specific pillar exceptions.',
  }),
  Object.freeze({
    requirementId: 'RELATION_EXISTENCE_EFFECTIVE_INTERACTION_AND_DAMAGE_OUTCOME_SEPARATION',
    state: 'DIRECT',
    candidateLocal: true,
    directOpenedHtmlContextUsed: true,
    searchSnippetUsed: false,
    crossCandidateBackfillUsed: false,
    evidenceLocator: `${SOHU_LOCATOR}#克的静态与动态-冲的结果`,
    rationale:
      'The page structurally separates static relation from dynamic interaction conditions and separately discusses results/effects under 冲, including residual harmful or auspicious effects after interaction outcomes.',
  }),
  Object.freeze({
    requirementId: 'EXACT_SOURCE_IDENTITY_ORIGINAL_CONTEXT_AND_REPRODUCIBLE_LOCATOR',
    state: 'DIRECT',
    candidateLocal: true,
    directOpenedHtmlContextUsed: true,
    searchSnippetUsed: false,
    crossCandidateBackfillUsed: false,
    evidenceLocator: SOHU_LOCATOR,
    rationale:
      'The evaluated source object is the directly opened Sohu HTML publication itself, which exposes a stable title, source/account label, publication timestamp, full surrounding article context, and reproducible URL. No canonical print-edition claim is made.',
  }),
]);

function exactI220Accepted(
  i220: I220SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationReadinessReviewReport,
): boolean {
  return (
    i220.status ===
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_READINESS_REVIEW' &&
    i220.decision ===
      'ONE_DIRECT_HTML_CANDIDATE_SEVEN_CELL_CANDIDATE_LOCAL_COVERAGE_MATRIX_FROZEN_SIXTEEN_CONTROLS_NO_COVERAGE_ADJUDICATED_NO_AUTHORITY_PROMOTED' &&
    i220.exactI219BoundaryAccepted &&
    i220.evaluationCandidateId === 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' &&
    i220.evaluationCandidateCount === 1 &&
    i220.excludedLeadCandidateCount === 2 &&
    i220.requirementCellCount === 7 &&
    i220.requirementIds.length === 7 &&
    i220.candidateLocalEvaluationRequired &&
    i220.directEvidenceMustBeFromDirectlyOpenedContext &&
    i220.leadEvidenceMayEnterMatrix === false &&
    i220.searchSnippetMayCreateDirectCoverage === false &&
    i220.directionalScopesEvaluatedSeparately &&
    i220.staticRelationMayAutoEqualDynamicInteraction === false &&
    i220.activationExceptionExplicitLanguageRequired &&
    i220.semanticSeparationExplicitLanguageRequired &&
    i220.sourceIdentityContextLocatorEvaluatedSeparately &&
    i220.coverageEvaluationControlCount === 16 &&
    i220.coverageEvaluationControlsFrozen &&
    i220.coverageEvaluationAuthorized &&
    i220.coverageEvaluationExecutedByThisGate === false &&
    i220.sevenOfSevenCoverageMayAutoPromoteAuthority === false &&
    i220.sevenOfSevenCoverageMayAutoCloseAuthorityGap === false &&
    i220.authorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i220.authorityGapClosed === false &&
    i220.authorityPromotedByThisGate === false &&
    i220.doctrinalConflictPreserved &&
    i220.doctrinalConflictResolvedByThisGate === false &&
    i220.quWei2001HoldPreserved &&
    i220.li1998SameTargetPathSuspendedNotRetired &&
    i220.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i220.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i220.provenanceIndependenceAdjudicatedByThisGate === false &&
    i220.derivativeLineageAdjudicatedByThisGate === false &&
    i220.evidenceRebindingAuthorizedByThisGate === false &&
    i220.candidateSetMutatedByThisGate === false &&
    i220.candidateSetReevaluationAuthorizedByThisGate === false &&
    i220.currentV2PackageAndCandidateSetRemainImmutable &&
    i220.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i220.actualCompositionPerformedByThisGate === false &&
    i220.multiSourceCompositionAuthorized === false &&
    i220.thresholdRuleCreatedByThisGate === false &&
    i220.damageEvaluationAuthorized === false &&
    i220.classificationAuthorized === false &&
    i220.numericScoringAuthorized === false &&
    i220.productionPolicyExecutionAuthorized === false &&
    i220.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_EVIDENCE'
  );
}

function finalized(
  material: Omit<
    I221SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationEvidenceReport,
    'evaluationId'
  >,
): I221SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationEvidenceReport {
  return {
    evaluationId: `i221_hidden_stem_single_source_coverage_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI221SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationEvidence(
  i220: I220SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationReadinessReviewReport,
): I221SourceKeHiddenStemInteractionEligibilitySingleSourceSevenRequirementCandidateCoverageEvaluationEvidenceReport {
  const accepted = exactI220Accepted(i220);
  return finalized({
    evaluationVersion:
      I221_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_EVIDENCE'
      : 'I220_COVERAGE_READINESS_BOUNDARY_INVALID',
    decision: accepted
      ? 'SOHU_DIRECT_HTML_CANDIDATE_SEVEN_OF_SEVEN_DIRECT_CANDIDATE_LOCAL_REQUIREMENT_COVERAGE_ESTABLISHED_COVERAGE_ADEQUATE_AUTHORITY_ADMISSIBILITY_NOT_ADJUDICATED_NO_PROMOTION_NO_GAP_CLOSURE'
      : 'SINGLE_SOURCE_HIDDEN_STEM_CANDIDATE_COVERAGE_EVALUATION_NOT_EXECUTED',
    upstreamI220ReviewId: i220.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI220BoundaryAccepted: accepted,
    targetSourceTerm: '克',
    targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY',
    evaluatedCandidateId: accepted ? 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' : null,
    evaluationExecuted: accepted,
    coverageCells: accepted ? COVERAGE_CELLS : Object.freeze([]),
    coverageCellCount: accepted ? 7 : 0,
    directCoverageCount: accepted ? 7 : 0,
    partialCoverageCount: 0,
    conflictCoverageCount: 0,
    notEstablishedCoverageCount: 0,
    allSevenRequirementsDirectlyCoveredCandidateLocally: accepted,
    membershipVsEffectiveInteractionSeparationDirect: accepted,
    visibleToHiddenDirectionalScopeDirect: accepted,
    hiddenToVisibleDirectionalScopeDirect: accepted,
    hiddenToHiddenDirectionalScopeDirect: accepted,
    activationAndExceptionConditionsDirect: accepted,
    relationInteractionDamageSemanticSeparationDirect: accepted,
    sourceIdentityVerifiedContextAndLocatorDirect: accepted,
    onlinePublishedSourceIdentityIsEvaluationObject: accepted,
    canonicalPrintEditionRequiredForThisCoverageFinding: false,
    exactDoctrinalAuthorshipOrLineageAdjudicatedByThisGate: false,
    sourceNormativeAdmissibilityAdjudicatedByThisGate: false,
    doctrinalConflictWithRestrictiveCandidatePreserved: accepted,
    doctrinalConflictResolvedByThisGate: false,
    sevenRequirementCoverageAdequate: accepted,
    sevenRequirementCoverageAdequacyEqualsAuthorityPromotion: false,
    sevenRequirementCoverageAdequacyEqualsAuthorityGapClosure: false,
    authorityGap: accepted
      ? 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
      : 'UPSTREAM_INVALID',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    candidateRegisteredByThisGate: false,
    candidateSelectedByThisGate: false,
    leadOnlyEvidenceUsedInCoverageMatrix: false,
    currentCandidateEvidenceUsedToBackfill: false,
    searchSnippetUsedAsDirectCoverage: false,
    sourceClassOrAgeAutoAcceptancePerformed: false,
    crossCandidateCompositionPerformed: false,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_COVERAGE_ADEQUACY_AUTHORITY_ADMISSIBILITY_PROMOTION_READINESS_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_SEVEN_REQUIREMENT_CANDIDATE_COVERAGE_EVALUATION_EVIDENCE',
    notes: accepted
      ? Object.freeze([
          'The directly opened Sohu article provides candidate-local direct coverage for all seven I212 requirements when the evaluated source object is the published online article itself.',
          'This is a coverage-adequacy finding only. The doctrine\'s authorship/lineage, normative-source admissibility, and conflict with the restrictive Li Hanchen methodology are deliberately left for a later gate.',
          'No lead-only evidence, existing I214 candidate evidence, search snippet, or cross-candidate backfill contributes to any of the seven cells.',
          'Seven-of-seven coverage does not promote authority and does not close SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED.',
        ])
      : Object.freeze(['I221 fails closed unless the exact I220 coverage-readiness boundary is preserved.']),
  });
}
