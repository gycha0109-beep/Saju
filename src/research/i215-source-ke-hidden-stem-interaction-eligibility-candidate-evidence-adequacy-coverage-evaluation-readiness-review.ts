import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I214_CANDIDATE_EVIDENCE_IDS,
  type I214SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryEvidenceReport,
} from './i214-source-ke-hidden-stem-interaction-eligibility-authority-discovery-evidence.js';
import { I212_HIDDEN_STEM_AUTHORITY_REQUIREMENT_IDS } from './i212-source-ke-hidden-stem-interaction-eligibility-authority-gap-requirements-review.js';

export const I215_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW_VERSION =
  'myeonghwa-source-ke-hidden-stem-interaction-eligibility-candidate-evidence-adequacy-coverage-evaluation-readiness-review-v1';

export const I215_COVERAGE_EVALUATION_CONTROL_IDS = Object.freeze([
  'EXACT_I214_THREE_CANDIDATE_DISCOVERY_BOUNDARY_REQUIRED',
  'EVALUATE_EACH_CANDIDATE_AGAINST_ALL_SEVEN_I212_REQUIREMENTS',
  'CANDIDATE_LOCAL_COVERAGE_ONLY_NO_CROSS_CANDIDATE_COMPOSITION',
  'DIRECT_TEXT_CONTEXT_AND_LOCATOR_ADEQUACY_MUST_BE_EVALUATED_SEPARATELY_FROM_DOCTRINAL_CLAIM',
  'VISIBLE_TO_HIDDEN_HIDDEN_TO_VISIBLE_AND_HIDDEN_TO_HIDDEN_SCOPES_REMAIN_SEPARATE',
  'CONTEXTUAL_SIGNAL_MUST_NOT_BE_GENERALIZED_BEYOND_ITS_STATED_CONTEXT',
  'RESTRICTIVE_DOCTRINE_MUST_BE_RECORDED_AS_CONFLICT_NOT_UNIVERSAL_NEGATIVE',
  'CANONICAL_PRINT_BINDING_GAP_MUST_NOT_BE_BACKFILLED_FROM_BIBLIOGRAPHIC_IDENTITY',
  'MISSING_HIDDEN_TO_VISIBLE_SIGNAL_IS_UNRESOLVED_NOT_NEGATIVE',
  'RELATION_EXISTENCE_EFFECTIVE_INTERACTION_AND_DAMAGE_OUTCOME_REMAIN_SEPARATE',
  'COVERAGE_EVALUATION_DOES_NOT_PROMOTE_REGISTER_SELECT_OR_REBIND_AUTHORITY',
  'PROVENANCE_INDEPENDENCE_AND_DERIVATIVE_LINEAGE_ARE_NOT_ADJUDICATED',
  'I132_QU_WEI_HOLD_LI_SUSPENSION_AND_CURRENT_V2_GUARDS_REMAIN_UNCHANGED',
  'NO_COMPOSITION_THRESHOLD_DAMAGE_CLASSIFICATION_SCORING_OR_PRODUCTION_AUTHORITY',
] as const);
export type I215CoverageEvaluationControlId = (typeof I215_COVERAGE_EVALUATION_CONTROL_IDS)[number];

export type I215CoverageDisposition =
  | 'DIRECT_CANDIDATE_LOCAL_EVIDENCE'
  | 'CONTEXT_BOUNDED_PARTIAL_EVIDENCE'
  | 'RESTRICTIVE_CONFLICT_EVIDENCE'
  | 'NOT_ESTABLISHED';

export interface I215SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW'
    | 'I214_DISCOVERY_EVIDENCE_BOUNDARY_INVALID';
  decision:
    | 'THREE_CANDIDATES_SEVEN_REQUIREMENTS_FOURTEEN_CONTROLS_CANDIDATE_LOCAL_COVERAGE_EVALUATION_CONTRACT_FROZEN_NO_EVALUATION_EXECUTED'
    | 'HIDDEN_STEM_CANDIDATE_COVERAGE_EVALUATION_NOT_READY';
  upstreamI214EvidenceId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI214BoundaryAccepted: boolean;
  targetSourceTerm: '克';
  targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY';
  candidateEvidenceIds: readonly string[];
  candidateEvidenceCount: 3 | 0;
  authorityRequirementIds: readonly string[];
  authorityRequirementCount: 7 | 0;
  coverageEvaluationControlIds: readonly I215CoverageEvaluationControlId[];
  coverageEvaluationControlCount: 14 | 0;
  controlsFrozen: boolean;
  allowedCoverageDispositions: readonly I215CoverageDisposition[];
  candidateLocalMatrixRequired: boolean;
  crossCandidateCompositionAuthorized: false;
  everyCandidateEvaluatedAgainstAllSevenRequirements: boolean;
  directTextAdequacyEvaluatedSeparately: boolean;
  sourceIdentityAdequacyEvaluatedSeparately: boolean;
  contextScopeAdequacyEvaluatedSeparately: boolean;
  canonicalPrintBindingAdequacyEvaluatedSeparately: boolean;
  directTextToSpecificPrintEditionCanonicalBindingRequiredForCanonicalEditionClaim: boolean;
  bibliographicIdentityMayBackfillCanonicalTextBinding: false;
  contextualEvidenceMayBeGeneralizedBeyondContext: false;
  visibleToHiddenScopeSeparated: boolean;
  hiddenToVisibleScopeSeparated: boolean;
  hiddenToHiddenScopeSeparated: boolean;
  missingHiddenToVisibleSignalRemainsUnresolved: boolean;
  missingHiddenToVisibleSignalCreatesNegativeFinding: false;
  restrictiveDoctrineRecordedAsConflictOnly: boolean;
  restrictiveDoctrineCreatesUniversalNegativeFinding: false;
  doctrinalConflictResolutionAuthorizedByThisGate: false;
  relationExistenceDistinctFromEffectiveInteraction: boolean;
  effectiveInteractionDistinctFromDamageOutcome: boolean;
  coverageEvaluationAuthorized: boolean;
  coverageEvaluationExecutedByThisGate: false;
  candidateCoverageMatrixCreatedByThisGate: false;
  fullSevenRequirementCoverageEstablishedByThisGate: false;
  authorityGapClosed: false;
  authorityPromotedByThisGate: false;
  candidateRegisteredByThisGate: false;
  candidateSelectedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW';
  notes: readonly string[];
}

const ALLOWED_DISPOSITIONS: readonly I215CoverageDisposition[] = Object.freeze([
  'DIRECT_CANDIDATE_LOCAL_EVIDENCE',
  'CONTEXT_BOUNDED_PARTIAL_EVIDENCE',
  'RESTRICTIVE_CONFLICT_EVIDENCE',
  'NOT_ESTABLISHED',
]);

function exactI214Accepted(i214: I214SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryEvidenceReport): boolean {
  return (
    i214.status === 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_DISCOVERY_EVIDENCE' &&
    i214.decision ===
      'FOUR_DISCOVERY_PATHS_EXECUTED_THREE_CANDIDATE_RECORDS_TWO_POSITIVE_DIRECTIONAL_SIGNALS_ONE_RESTRICTIVE_CONFLICT_ZERO_AUTHORITY_PROMOTED_COVERAGE_NOT_ADJUDICATED' &&
    i214.exactI213BoundaryAccepted &&
    i214.discoveryExecuted &&
    i214.executedDiscoveryPathCount === 4 &&
    i214.candidateEvidenceRecordCount === 3 &&
    i214.candidateEvidenceRecords.length === I214_CANDIDATE_EVIDENCE_IDS.length &&
    i214.candidateEvidenceRecords.every((record, index) =>
      record.candidateEvidenceId === I214_CANDIDATE_EVIDENCE_IDS[index] &&
      record.sourceIdentityBound &&
      record.reproducibleDirectTextLocator &&
      record.snippetOnly === false &&
      record.requirementCoverageAdjudicated === false &&
      record.authorityPromoted === false &&
      record.candidateRegistered === false &&
      record.candidateSelected === false
    ) &&
    i214.positiveDirectionalSignalCount === 2 &&
    i214.restrictiveConflictSignalCount === 1 &&
    i214.visibleToHiddenDirectSignalObserved &&
    i214.hiddenToVisibleDirectSignalObserved === false &&
    i214.hiddenToHiddenContextualDirectSignalObserved &&
    i214.restrictiveNonUseDoctrineObserved &&
    i214.doctrinalConflictPresent &&
    i214.doctrinalConflictResolvedByThisGate === false &&
    i214.crossCandidateCompositionPerformed === false &&
    i214.requirementCoverageAdjudicatedByThisGate === false &&
    i214.sevenRequirementAuthorityContractSatisfiedByThisGate === false &&
    i214.authorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i214.authorityGapClosed === false &&
    i214.authorityPromotedByThisGate === false &&
    i214.noHiddenToVisibleCandidateFoundCreatesNegativeFinding === false &&
    i214.discoverySilenceCreatesExhaustionFinding === false &&
    i214.corpusExhaustionClaimed === false &&
    i214.quWei2001HoldPreserved &&
    i214.li1998SameTargetPathSuspendedNotRetired &&
    i214.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i214.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i214.provenanceIndependenceAdjudicatedByThisGate === false &&
    i214.evidenceRebindingAuthorizedByThisGate === false &&
    i214.currentV2PackageAndCandidateSetRemainImmutable &&
    i214.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i214.actualCompositionPerformedByThisGate === false &&
    i214.multiSourceCompositionAuthorized === false &&
    i214.thresholdRuleCreatedByThisGate === false &&
    i214.damageEvaluationAuthorized === false &&
    i214.classificationAuthorized === false &&
    i214.numericScoringAuthorized === false &&
    i214.productionPolicyExecutionAuthorized === false &&
    i214.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<I215SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReadinessReviewReport, 'reviewId'>,
): I215SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReadinessReviewReport {
  return {
    reviewId: `i215_hidden_stem_candidate_coverage_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI215SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReadinessReview(
  i214: I214SourceKeHiddenStemInteractionEligibilityAuthorityDiscoveryEvidenceReport,
): I215SourceKeHiddenStemInteractionEligibilityCandidateEvidenceAdequacyCoverageEvaluationReadinessReviewReport {
  const accepted = exactI214Accepted(i214);
  return finalized({
    reviewVersion: I215_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW'
      : 'I214_DISCOVERY_EVIDENCE_BOUNDARY_INVALID',
    decision: accepted
      ? 'THREE_CANDIDATES_SEVEN_REQUIREMENTS_FOURTEEN_CONTROLS_CANDIDATE_LOCAL_COVERAGE_EVALUATION_CONTRACT_FROZEN_NO_EVALUATION_EXECUTED'
      : 'HIDDEN_STEM_CANDIDATE_COVERAGE_EVALUATION_NOT_READY',
    upstreamI214EvidenceId: i214.evidenceId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI214BoundaryAccepted: accepted,
    targetSourceTerm: '克',
    targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY',
    candidateEvidenceIds: accepted ? I214_CANDIDATE_EVIDENCE_IDS : Object.freeze([]),
    candidateEvidenceCount: accepted ? 3 : 0,
    authorityRequirementIds: accepted ? I212_HIDDEN_STEM_AUTHORITY_REQUIREMENT_IDS : Object.freeze([]),
    authorityRequirementCount: accepted ? 7 : 0,
    coverageEvaluationControlIds: accepted ? I215_COVERAGE_EVALUATION_CONTROL_IDS : Object.freeze([]),
    coverageEvaluationControlCount: accepted ? 14 : 0,
    controlsFrozen: accepted,
    allowedCoverageDispositions: accepted ? ALLOWED_DISPOSITIONS : Object.freeze([]),
    candidateLocalMatrixRequired: accepted,
    crossCandidateCompositionAuthorized: false,
    everyCandidateEvaluatedAgainstAllSevenRequirements: accepted,
    directTextAdequacyEvaluatedSeparately: accepted,
    sourceIdentityAdequacyEvaluatedSeparately: accepted,
    contextScopeAdequacyEvaluatedSeparately: accepted,
    canonicalPrintBindingAdequacyEvaluatedSeparately: accepted,
    directTextToSpecificPrintEditionCanonicalBindingRequiredForCanonicalEditionClaim: accepted,
    bibliographicIdentityMayBackfillCanonicalTextBinding: false,
    contextualEvidenceMayBeGeneralizedBeyondContext: false,
    visibleToHiddenScopeSeparated: accepted,
    hiddenToVisibleScopeSeparated: accepted,
    hiddenToHiddenScopeSeparated: accepted,
    missingHiddenToVisibleSignalRemainsUnresolved: accepted,
    missingHiddenToVisibleSignalCreatesNegativeFinding: false,
    restrictiveDoctrineRecordedAsConflictOnly: accepted,
    restrictiveDoctrineCreatesUniversalNegativeFinding: false,
    doctrinalConflictResolutionAuthorizedByThisGate: false,
    relationExistenceDistinctFromEffectiveInteraction: accepted,
    effectiveInteractionDistinctFromDamageOutcome: accepted,
    coverageEvaluationAuthorized: accepted,
    coverageEvaluationExecutedByThisGate: false,
    candidateCoverageMatrixCreatedByThisGate: false,
    fullSevenRequirementCoverageEstablishedByThisGate: false,
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    candidateRegisteredByThisGate: false,
    candidateSelectedByThisGate: false,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I215 freezes a candidate-local coverage evaluation only; no evidence from different candidates may be composed to satisfy a requirement.',
          'The Chen Yuan clash-context signal, Shenfeng Tongkao visible-to-hidden signal, and Li Hanchen restrictive doctrine must each be evaluated against the same seven requirements without generalization.',
          'The missing hidden-to-visible direct signal remains unresolved and does not become a negative or exhaustion finding.',
          'Any later doctrinal conflict resolution, provenance independence, or multi-source composition requires a separate governed gate.',
        ])
      : Object.freeze(['I215 fails closed unless the exact I214 three-candidate discovery boundary is intact.']),
  });
}
