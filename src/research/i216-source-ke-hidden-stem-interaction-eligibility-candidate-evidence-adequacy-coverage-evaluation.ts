import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I212_HIDDEN_STEM_AUTHORITY_REQUIREMENT_IDS,
  type I212HiddenStemAuthorityRequirementId,
} from './i212-source-ke-hidden-stem-interaction-eligibility-authority-gap-requirements-review.js';
import {
  I214_CANDIDATE_EVIDENCE_IDS,
  type I214CandidateEvidenceId,
} from './i214-source-ke-hidden-stem-interaction-eligibility-authority-discovery-evidence.js';
import type {
  I215CoverageDisposition,
  I215SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReadinessReviewReport,
} from './i215-source-ke-hidden-stem-interaction-eligibility-candidate-evidence-adequacy-coverage-evaluation-readiness-review.js';

export const I216_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_VERSION =
  'myeonghwa-source-ke-hidden-stem-interaction-eligibility-candidate-evidence-adequacy-coverage-evaluation-v1';

export interface I216CandidateRequirementCoverageCell {
  requirementId: I212HiddenStemAuthorityRequirementId;
  disposition: I215CoverageDisposition;
  directRequirementSatisfied: boolean;
  contextBounded: boolean;
  restrictiveConflictOnly: boolean;
  canonicalPrintBindingReliedUpon: false;
  notes: readonly string[];
}

export interface I216CandidateCoverageMatrix {
  candidateEvidenceId: I214CandidateEvidenceId;
  cells: readonly I216CandidateRequirementCoverageCell[];
  cellCount: 7;
  directSatisfiedCount: number;
  contextBoundedPartialCount: number;
  restrictiveConflictCount: number;
  notEstablishedCount: number;
  allSevenRequirementsDirectlySatisfied: false;
  candidateLocalAuthorityAdequate: false;
  crossCandidateEvidenceUsed: false;
  candidatePromoted: false;
}

export interface I216SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReport {
  evaluationId: string;
  evaluationVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION'
    | 'I215_COVERAGE_READINESS_BOUNDARY_INVALID';
  decision:
    | 'THREE_CANDIDATE_LOCAL_MATRICES_EVALUATED_ZERO_FULL_SEVEN_REQUIREMENT_CANDIDATES_HIDDEN_TO_VISIBLE_REMAINS_UNRESOLVED_DOCTRINAL_CONFLICT_REMAINS_NO_AUTHORITY_PROMOTED'
    | 'HIDDEN_STEM_CANDIDATE_COVERAGE_EVALUATION_NOT_EXECUTED';
  upstreamI215ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI215BoundaryAccepted: boolean;
  targetSourceTerm: '克';
  targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY';
  evaluationExecuted: boolean;
  candidateMatrixCount: 3 | 0;
  totalCoverageCellCount: 21 | 0;
  matrices: readonly I216CandidateCoverageMatrix[];
  candidatesWithFullSevenRequirementCoverage: 0;
  candidateLocalAuthorityAdequateCount: 0;
  chenYuanHiddenToHiddenContextBoundedPartialAccepted: boolean;
  shenfengVisibleToHiddenDirectCandidateLocalEvidenceAccepted: boolean;
  liHanchenRestrictiveConflictAcceptedAsConflictOnly: boolean;
  hiddenToVisiblePositiveDirectEvidenceEstablished: false;
  hiddenToVisibleRequirementRemainsUnresolved: boolean;
  hiddenToVisibleAbsenceCreatesNegativeFinding: false;
  contextualEvidenceGeneralizedBeyondContext: false;
  doctrinalConflictPresent: boolean;
  doctrinalConflictResolvedByThisGate: false;
  canonicalPrintBindingEstablishedForAnyCandidate: false;
  bibliographicIdentityUsedToBackfillCanonicalTextBinding: false;
  relationExistenceEffectiveInteractionDamageSeparationPreserved: boolean;
  crossCandidateCompositionPerformed: false;
  partialEvidenceCountedAsDirectRequirementSatisfaction: false;
  restrictiveConflictCountedAsDirectRequirementSatisfaction: false;
  sourceClassAutoAcceptancePerformed: false;
  fullSevenRequirementAuthorityContractSatisfied: false;
  authorityGap:
    | 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
    | 'UPSTREAM_INVALID';
  authorityGapClosed: false;
  authorityPromotedByThisGate: false;
  candidateRegisteredByThisGate: false;
  candidateSelectedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION';
  notes: readonly string[];
}

const cell = (
  requirementId: I212HiddenStemAuthorityRequirementId,
  disposition: I215CoverageDisposition,
  notes: readonly string[],
): I216CandidateRequirementCoverageCell => Object.freeze({
  requirementId,
  disposition,
  directRequirementSatisfied: disposition === 'DIRECT_CANDIDATE_LOCAL_EVIDENCE',
  contextBounded: disposition === 'CONTEXT_BOUNDED_PARTIAL_EVIDENCE',
  restrictiveConflictOnly: disposition === 'RESTRICTIVE_CONFLICT_EVIDENCE',
  canonicalPrintBindingReliedUpon: false,
  notes: Object.freeze([...notes]),
});

const matrix = (
  candidateEvidenceId: I214CandidateEvidenceId,
  cells: readonly I216CandidateRequirementCoverageCell[],
): I216CandidateCoverageMatrix => {
  const directSatisfiedCount = cells.filter((x) => x.disposition === 'DIRECT_CANDIDATE_LOCAL_EVIDENCE').length;
  const contextBoundedPartialCount = cells.filter((x) => x.disposition === 'CONTEXT_BOUNDED_PARTIAL_EVIDENCE').length;
  const restrictiveConflictCount = cells.filter((x) => x.disposition === 'RESTRICTIVE_CONFLICT_EVIDENCE').length;
  const notEstablishedCount = cells.filter((x) => x.disposition === 'NOT_ESTABLISHED').length;
  return Object.freeze({
    candidateEvidenceId,
    cells: Object.freeze([...cells]),
    cellCount: 7 as const,
    directSatisfiedCount,
    contextBoundedPartialCount,
    restrictiveConflictCount,
    notEstablishedCount,
    allSevenRequirementsDirectlySatisfied: false as const,
    candidateLocalAuthorityAdequate: false as const,
    crossCandidateEvidenceUsed: false as const,
    candidatePromoted: false as const,
  });
};

const MATRICES: readonly I216CandidateCoverageMatrix[] = Object.freeze([
  matrix('CHEN_YUAN_SIZHU_YUCE_XUE_RUMEN_1995_TRANSCRIPTION', [
    cell('HIDDEN_STEM_MEMBERSHIP_VS_EFFECTIVE_INTERACTION_SEPARATION', 'CONTEXT_BOUNDED_PARTIAL_EVIDENCE', [
      'The branch-clash passage goes beyond membership by directing separate 生克 analysis, but only within the stated 辰戌/丑未 clash context.',
    ]),
    cell('VISIBLE_STEM_TO_HIDDEN_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE', 'NOT_ESTABLISHED', [
      'Ten-God or element relation mapping involving hidden stems is not sufficient to establish effective visible-to-hidden eligibility.',
    ]),
    cell('HIDDEN_STEM_TO_VISIBLE_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE', 'NOT_ESTABLISHED', [
      'No candidate-local direct hidden-to-visible effective-interaction rule was established.',
    ]),
    cell('HIDDEN_STEM_TO_HIDDEN_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE', 'CONTEXT_BOUNDED_PARTIAL_EVIDENCE', [
      'Direct hidden-to-hidden 生克 instruction is retained only for the specified branch-clash context.',
    ]),
    cell('POSITION_CONTEXT_ACTIVATION_AND_EXCEPTION_CONDITIONS', 'CONTEXT_BOUNDED_PARTIAL_EVIDENCE', [
      'A clash context is explicit, but the source does not establish a general position/activation/exception policy for all hidden stems.',
    ]),
    cell('RELATION_EXISTENCE_EFFECTIVE_INTERACTION_AND_DAMAGE_OUTCOME_SEPARATION', 'CONTEXT_BOUNDED_PARTIAL_EVIDENCE', [
      'The passage distinguishes a contextual instruction to perform 生克 analysis from mere hidden-stem membership, but does not fully define the three semantic layers prospectively.',
    ]),
    cell('EXACT_SOURCE_IDENTITY_ORIGINAL_CONTEXT_AND_REPRODUCIBLE_LOCATOR', 'DIRECT_CANDIDATE_LOCAL_EVIDENCE', [
      'Author/title bibliographic identity and reproducible transcription locators are established for the candidate representation; no specific-print canonical text claim is made.',
    ]),
  ]),
  matrix('ZHANG_NAN_SHENFENG_TONGKAO_TIANYUANFU_TRANSCRIPTION', [
    cell('HIDDEN_STEM_MEMBERSHIP_VS_EFFECTIVE_INTERACTION_SEPARATION', 'CONTEXT_BOUNDED_PARTIAL_EVIDENCE', [
      'The example explicitly moves from 子中癸水 membership to a concrete 己土克癸水 interaction, but is still a bounded example rather than a general methodology contract.',
    ]),
    cell('VISIBLE_STEM_TO_HIDDEN_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE', 'DIRECT_CANDIDATE_LOCAL_EVIDENCE', [
      'The annotated example directly treats visible 己土 as overcoming 癸水 hidden in 子 under the stated strength condition.',
    ]),
    cell('HIDDEN_STEM_TO_VISIBLE_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE', 'NOT_ESTABLISHED', [
      'The passage does not establish the reverse hidden-to-visible direction.',
    ]),
    cell('HIDDEN_STEM_TO_HIDDEN_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE', 'NOT_ESTABLISHED', [
      'The passage does not establish hidden-to-hidden eligibility.',
    ]),
    cell('POSITION_CONTEXT_ACTIVATION_AND_EXCEPTION_CONDITIONS', 'CONTEXT_BOUNDED_PARTIAL_EVIDENCE', [
      'Year/day/hour placement and 土旺 context are stated, but no universal activation or exception policy is established.',
    ]),
    cell('RELATION_EXISTENCE_EFFECTIVE_INTERACTION_AND_DAMAGE_OUTCOME_SEPARATION', 'CONTEXT_BOUNDED_PARTIAL_EVIDENCE', [
      'The example narrates both overcoming and harm, but does not provide a general rule separating relation existence, effective interaction, and downstream damage.',
    ]),
    cell('EXACT_SOURCE_IDENTITY_ORIGINAL_CONTEXT_AND_REPRODUCIBLE_LOCATOR', 'DIRECT_CANDIDATE_LOCAL_EVIDENCE', [
      'Stable title/chapter transcription locators preserve the candidate-local passage; no specific-print canonical binding is claimed.',
    ]),
  ]),
  matrix('LI_HANCHEN_BAZI_YUCE_ZHENZONG_2003_REPRESENTATION', [
    cell('HIDDEN_STEM_MEMBERSHIP_VS_EFFECTIVE_INTERACTION_SEPARATION', 'RESTRICTIVE_CONFLICT_EVIDENCE', [
      'The source generally declines to subdivide hidden stems, creating a methodology conflict rather than positive hidden-stem eligibility authority.',
    ]),
    cell('VISIBLE_STEM_TO_HIDDEN_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE', 'RESTRICTIVE_CONFLICT_EVIDENCE', [
      'The principal-qi methodology conflicts with routine positive visible-to-hidden subdivision; it does not directly satisfy the positive scope requirement.',
    ]),
    cell('HIDDEN_STEM_TO_VISIBLE_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE', 'RESTRICTIVE_CONFLICT_EVIDENCE', [
      'The restrictive doctrine is conflict evidence only and does not establish positive hidden-to-visible eligibility.',
    ]),
    cell('HIDDEN_STEM_TO_HIDDEN_STEM_DIRECTIONAL_ELIGIBILITY_SCOPE', 'RESTRICTIVE_CONFLICT_EVIDENCE', [
      'The restrictive doctrine is conflict evidence only and does not establish positive hidden-to-hidden eligibility.',
    ]),
    cell('POSITION_CONTEXT_ACTIVATION_AND_EXCEPTION_CONDITIONS', 'RESTRICTIVE_CONFLICT_EVIDENCE', [
      'Limited store/season-adjustment exceptions demonstrate school-specific exception structure, but do not satisfy the positive hidden-stem activation contract.',
    ]),
    cell('RELATION_EXISTENCE_EFFECTIVE_INTERACTION_AND_DAMAGE_OUTCOME_SEPARATION', 'RESTRICTIVE_CONFLICT_EVIDENCE', [
      'The source changes the underlying hidden-stem usage methodology, so it is retained as conflict evidence rather than used to complete the positive semantic-layer contract.',
    ]),
    cell('EXACT_SOURCE_IDENTITY_ORIGINAL_CONTEXT_AND_REPRODUCIBLE_LOCATOR', 'DIRECT_CANDIDATE_LOCAL_EVIDENCE', [
      'Author/title representation and reproducible chapter locators are established for evaluation; no specific-print canonical text claim is made.',
    ]),
  ]),
]);

function exactI215Accepted(
  i215: I215SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReadinessReviewReport,
): boolean {
  return (
    i215.status === 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW' &&
    i215.decision ===
      'THREE_CANDIDATES_SEVEN_REQUIREMENTS_FOURTEEN_CONTROLS_CANDIDATE_LOCAL_COVERAGE_EVALUATION_CONTRACT_FROZEN_NO_EVALUATION_EXECUTED' &&
    i215.exactI214BoundaryAccepted &&
    i215.candidateEvidenceCount === 3 &&
    i215.candidateEvidenceIds.length === I214_CANDIDATE_EVIDENCE_IDS.length &&
    i215.candidateEvidenceIds.every((id, index) => id === I214_CANDIDATE_EVIDENCE_IDS[index]) &&
    i215.authorityRequirementCount === 7 &&
    i215.authorityRequirementIds.length === I212_HIDDEN_STEM_AUTHORITY_REQUIREMENT_IDS.length &&
    i215.authorityRequirementIds.every((id, index) => id === I212_HIDDEN_STEM_AUTHORITY_REQUIREMENT_IDS[index]) &&
    i215.coverageEvaluationControlCount === 14 &&
    i215.controlsFrozen &&
    i215.candidateLocalMatrixRequired &&
    i215.crossCandidateCompositionAuthorized === false &&
    i215.everyCandidateEvaluatedAgainstAllSevenRequirements &&
    i215.directTextAdequacyEvaluatedSeparately &&
    i215.sourceIdentityAdequacyEvaluatedSeparately &&
    i215.contextScopeAdequacyEvaluatedSeparately &&
    i215.canonicalPrintBindingAdequacyEvaluatedSeparately &&
    i215.bibliographicIdentityMayBackfillCanonicalTextBinding === false &&
    i215.contextualEvidenceMayBeGeneralizedBeyondContext === false &&
    i215.missingHiddenToVisibleSignalRemainsUnresolved &&
    i215.missingHiddenToVisibleSignalCreatesNegativeFinding === false &&
    i215.restrictiveDoctrineRecordedAsConflictOnly &&
    i215.restrictiveDoctrineCreatesUniversalNegativeFinding === false &&
    i215.doctrinalConflictResolutionAuthorizedByThisGate === false &&
    i215.coverageEvaluationAuthorized &&
    i215.coverageEvaluationExecutedByThisGate === false &&
    i215.authorityGapClosed === false &&
    i215.authorityPromotedByThisGate === false &&
    i215.quWei2001HoldPreserved &&
    i215.li1998SameTargetPathSuspendedNotRetired &&
    i215.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i215.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i215.provenanceIndependenceAdjudicatedByThisGate === false &&
    i215.derivativeLineageAdjudicatedByThisGate === false &&
    i215.evidenceRebindingAuthorizedByThisGate === false &&
    i215.currentV2PackageAndCandidateSetRemainImmutable &&
    i215.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i215.actualCompositionPerformedByThisGate === false &&
    i215.multiSourceCompositionAuthorized === false &&
    i215.thresholdRuleCreatedByThisGate === false &&
    i215.damageEvaluationAuthorized === false &&
    i215.classificationAuthorized === false &&
    i215.numericScoringAuthorized === false &&
    i215.productionPolicyExecutionAuthorized === false &&
    i215.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION'
  );
}

function finalized(
  material: Omit<I216SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReport, 'evaluationId'>,
): I216SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReport {
  return {
    evaluationId: `i216_hidden_stem_candidate_coverage_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI216SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluation(
  i215: I215SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReadinessReviewReport,
): I216SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReport {
  const accepted = exactI215Accepted(i215);
  return finalized({
    evaluationVersion: I216_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_VERSION,
    status: accepted
      ? 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION'
      : 'I215_COVERAGE_READINESS_BOUNDARY_INVALID',
    decision: accepted
      ? 'THREE_CANDIDATE_LOCAL_MATRICES_EVALUATED_ZERO_FULL_SEVEN_REQUIREMENT_CANDIDATES_HIDDEN_TO_VISIBLE_REMAINS_UNRESOLVED_DOCTRINAL_CONFLICT_REMAINS_NO_AUTHORITY_PROMOTED'
      : 'HIDDEN_STEM_CANDIDATE_COVERAGE_EVALUATION_NOT_EXECUTED',
    upstreamI215ReviewId: i215.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI215BoundaryAccepted: accepted,
    targetSourceTerm: '克',
    targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY',
    evaluationExecuted: accepted,
    candidateMatrixCount: accepted ? 3 : 0,
    totalCoverageCellCount: accepted ? 21 : 0,
    matrices: accepted ? MATRICES : Object.freeze([]),
    candidatesWithFullSevenRequirementCoverage: 0,
    candidateLocalAuthorityAdequateCount: 0,
    chenYuanHiddenToHiddenContextBoundedPartialAccepted: accepted,
    shenfengVisibleToHiddenDirectCandidateLocalEvidenceAccepted: accepted,
    liHanchenRestrictiveConflictAcceptedAsConflictOnly: accepted,
    hiddenToVisiblePositiveDirectEvidenceEstablished: false,
    hiddenToVisibleRequirementRemainsUnresolved: accepted,
    hiddenToVisibleAbsenceCreatesNegativeFinding: false,
    contextualEvidenceGeneralizedBeyondContext: false,
    doctrinalConflictPresent: accepted,
    doctrinalConflictResolvedByThisGate: false,
    canonicalPrintBindingEstablishedForAnyCandidate: false,
    bibliographicIdentityUsedToBackfillCanonicalTextBinding: false,
    relationExistenceEffectiveInteractionDamageSeparationPreserved: accepted,
    crossCandidateCompositionPerformed: false,
    partialEvidenceCountedAsDirectRequirementSatisfaction: false,
    restrictiveConflictCountedAsDirectRequirementSatisfaction: false,
    sourceClassAutoAcceptancePerformed: false,
    fullSevenRequirementAuthorityContractSatisfied: false,
    authorityGap: accepted
      ? 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
      : 'UPSTREAM_INVALID',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    candidateRegisteredByThisGate: false,
    candidateSelectedByThisGate: false,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_COVERAGE_EVIDENCE_ADEQUACY_RESIDUAL_REQUIREMENTS_REASSESSMENT_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION',
    notes: accepted
      ? Object.freeze([
          'I216 evaluated 21 candidate-local cells. Only DIRECT_CANDIDATE_LOCAL_EVIDENCE counts as direct requirement satisfaction; partial and restrictive-conflict dispositions remain unresolved for authority adequacy.',
          'Chen Yuan contributes context-bounded hidden-to-hidden evidence, Shenfeng Tongkao contributes direct visible-to-hidden candidate-local evidence, and Li Hanchen remains restrictive conflict evidence. These are not composed.',
          'No candidate independently satisfies all seven requirements. Hidden-to-visible positive direct evidence remains absent without negative or exhaustion inference.',
          'The next gate must reassess residual requirements and decide whether a materially targeted discovery lane is justified; it may not solve the residuals by cross-candidate composition.',
        ])
      : Object.freeze(['I216 fails closed unless the exact I215 candidate-local coverage-readiness boundary is preserved.']),
  });
}
