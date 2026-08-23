import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I230SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionEvidenceReport } from './i230-source-ke-hidden-stem-interaction-eligibility-target-origin-higher-provenance-archival-or-custodian-acquisition-evidence.js';
import { I228_RESIDUAL_ADMISSIBILITY_GAP_IDS } from './i228-source-ke-hidden-stem-interaction-eligibility-target-origin-discovery-evidence-adequacy-residual-path-reassessment-review.js';

export const I231_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW_VERSION =
  'myeonghwa-source-ke-hidden-stem-interaction-eligibility-target-origin-higher-provenance-acquisition-evidence-adequacy-external-access-reassessment-review-v1';

export const I231_EXTERNAL_ACCESS_REQUIREMENT_IDS = Object.freeze([
  'PRE_TARGET_ARCHIVE_CAPTURE_WITH_EXACT_I226_TARGET_PASSAGE_AND_SOURCE_IDENTITY',
  'AUTHOR_CONTROLLED_OR_CANONICAL_SOURCE_WITH_EXPLICIT_ORIGINAL_AUTHORSHIP_OR_LINEAGE',
  'CUSTODIAN_BOUND_BOOK_OR_COURSE_FACSIMILE_WITH_EXACT_TARGET_PASSAGE',
] as const);
export type I231ExternalAccessRequirementId = (typeof I231_EXTERNAL_ACCESS_REQUIREMENT_IDS)[number];

export const I231_REASSESSMENT_CONTROL_IDS = Object.freeze([
  'EXACT_I230_FOUR_GAP_ZERO_QUALIFYING_WITNESS_BOUNDARY_REQUIRED',
  'I221_SEVEN_OF_SEVEN_COVERAGE_REMAINS_FROZEN',
  'PRE_TARGET_SAME_TEXT_FAMILY_LEAD_ACCEPTED_AS_CONTEXT_ONLY',
  'PRE_TARGET_SAME_TEXT_FAMILY_LEAD_MUST_NOT_ESTABLISH_PREDECESSOR_AUTHORSHIP_OR_LINEAGE',
  'EQUIVALENT_AUTOMATED_PUBLIC_WEB_REPEAT_MUST_NOT_COUNT_AS_REMEDIATION_PROGRESS',
  'FURTHER_PROGRESS_REQUIRES_MATERIALLY_NEW_EXTERNAL_HIGHER_PROVENANCE_ACCESS',
  'ARCHIVE_PROGRESS_REQUIRES_PRE_TARGET_CAPTURE_EXACT_PASSAGE_AND_SOURCE_IDENTITY',
  'AUTHOR_OR_LINEAGE_PROGRESS_REQUIRES_AUTHOR_CONTROLLED_OR_CANONICAL_EXPLICIT_BINDING',
  'CUSTODIAN_PROGRESS_REQUIRES_SOURCE_CHAIN_AND_EXACT_TARGET_PASSAGE',
  'WEB_BOUNDARY_MUST_NOT_BE_RELABELED_AS_CORPUS_EXHAUSTION_OR_NEGATIVE_EVIDENCE',
  'RESTRICTIVE_CONFLICT_ADJUDICATION_DEFERRED_UNTIL_TARGET_LINEAGE_ESTABLISHED',
  'NO_REBINDING_PROVENANCE_INDEPENDENCE_OR_DERIVATIVE_ADJUDICATION',
  'I132_QU_WEI_LI_V2_GUARDS_REMAIN_UNCHANGED',
  'NO_COMPOSITION_THRESHOLD_DAMAGE_CLASSIFICATION_SCORING_OR_PRODUCTION_AUTHORITY',
] as const);

export interface I231SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW'
    | 'I230_HIGHER_PROVENANCE_ACQUISITION_EVIDENCE_BOUNDARY_INVALID';
  decision:
    | 'I230_EVIDENCE_ADEQUATE_FOR_FOUR_UNRESOLVED_ADMISSIBILITY_GAPS_PRE_TARGET_SAME_TEXT_FAMILY_LEAD_ACCEPTED_AS_CONTEXT_ZERO_QUALIFYING_HIGHER_PROVENANCE_WITNESSES_AUTOMATED_PUBLIC_WEB_REMEDIATION_BOUNDARY_REACHED_EXTERNAL_ARCHIVAL_AUTHOR_CONTROLLED_CANONICAL_OR_CUSTODIAN_ACCESS_REQUIRED_NO_EXHAUSTION_NO_ADJUDICATION_NO_PROMOTION'
    | 'HIGHER_PROVENANCE_ACQUISITION_EVIDENCE_EXTERNAL_ACCESS_REASSESSMENT_NOT_READY';
  upstreamI230EvidenceId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI230BoundaryAccepted: boolean;
  targetSourceTerm: '克';
  targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY';
  targetCandidateId: 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' | null;
  sevenRequirementCoverageAcceptedAsUpstreamFinding: boolean;
  coverageReevaluationAuthorizedByThisGate: false;
  I230EvidenceAdequateForRecordedUnresolvedFindings: boolean;
  assessedResidualGapCount: 4 | 0;
  resolvedResidualGapCount: 0;
  unresolvedResidualGapCount: 4 | 0;
  unresolvedResidualGapIds: readonly string[];
  qualifyingHigherProvenanceWitnessCountAccepted: 0;
  preTargetSameTextFamilyLeadAcceptedAsContext: boolean;
  preTargetSameTextFamilyLeadQualifiesAsExactTargetPredecessor: false;
  preTargetSameTextFamilyLeadQualifiesAsOriginalAuthorshipBinding: false;
  preTargetSameTextFamilyLeadQualifiesAsDoctrinalLineageBinding: false;
  preTargetSameTextFamilyLeadQualifiesAsCanonicalWitness: false;
  automatedPublicWebRemediationContinuationMethodologicallyJustified: false;
  automatedPublicWebRemediationBoundaryReached: boolean;
  externalAccessRequiredForFurtherGapResolution: boolean;
  manualOrExternalCustodianActionRequired: boolean;
  externalAccessRequirementIds: readonly I231ExternalAccessRequirementId[];
  externalAccessRequirementCount: 3 | 0;
  externalAccessRequirementsFrozenProspectively: boolean;
  archiveExactPassageRequirementOpen: boolean;
  authorControlledOrCanonicalAuthorshipLineageRequirementOpen: boolean;
  custodianBoundExactPassageRequirementOpen: boolean;
  restrictiveConflictAdjudicationDeferredUntilTargetLineageEstablished: boolean;
  webBoundaryCreatesNegativeFinding: false;
  archiveAccessFailureCreatesNegativeFinding: false;
  searchSilenceCreatesNegativeFinding: false;
  custodianNonResponseCreatesNegativeFinding: false;
  paywallCreatesNegativeFinding: false;
  targetedDiscoveryExhaustionEstablished: false;
  onlineCorpusExhaustionEstablished: false;
  corpusExhaustionEstablished: false;
  universalNoFurtherEvidenceClaimEstablished: false;
  sourceNormativeAdmissibilityAdjudicatedByThisGate: false;
  authorityPromotionReadinessEstablishedByThisGate: false;
  authorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' | 'UPSTREAM_INVALID';
  authorityGapClosed: false;
  authorityPromotedByThisGate: false;
  candidateRegisteredByThisGate: false;
  candidateSelectedByThisGate: false;
  doctrinalConflictPreserved: boolean;
  doctrinalConflictResolvedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  derivativeRelationshipAdjudicatedByThisGate: false;
  evidenceRebindingMethodologicallyReady: false;
  evidenceRebindingAuthorizedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  quWei2001HoldPreserved: boolean;
  li1998SameTargetPathSuspendedNotRetired: boolean;
  candidateSetMutatedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  reassessmentControlIds: readonly string[];
  reassessmentControlCount: 14 | 0;
  reassessmentControlsFrozen: boolean;
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  productionPolicyExecutionAuthorized: false;
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_EXTERNAL_ARCHIVAL_CANONICAL_CUSTODIAN_ACCESS_REQUIREMENT_HOLD_RECORD'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW';
  notes: readonly string[];
}

function exactI230Accepted(
  i230: I230SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionEvidenceReport,
): boolean {
  return (
    i230.status ===
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ARCHIVAL_OR_CUSTODIAN_ACQUISITION_EVIDENCE' &&
    i230.decision ===
      'FOUR_HIGHER_PROVENANCE_PATHS_EXECUTED_ONE_PRE_TARGET_SAME_TEXT_FAMILY_USER_GENERATED_WITNESS_LEAD_OBSERVED_NO_QUALIFYING_PRE_TARGET_ARCHIVE_AUTHOR_CONTROLLED_CANONICAL_OR_CUSTODIAN_EXACT_TARGET_WITNESS_ACQUIRED_FOUR_ADMISSIBILITY_GAPS_REMAIN_NO_NEGATIVE_EXHAUSTION_FINDING_NO_PROMOTION' &&
    i230.exactI229BoundaryAccepted &&
    i230.targetCandidateId === 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' &&
    i230.sevenRequirementCoverageAcceptedAsUpstreamFinding &&
    i230.coverageReevaluationPerformedByThisGate === false &&
    i230.acquisitionExecuted &&
    i230.executedAcquisitionPathCount === 4 &&
    i230.acquisitionRecordCount === 4 &&
    i230.I229ControlsAccepted &&
    i230.I229ControlCount === 18 &&
    i230.qualifyingPreTargetArchiveSnapshotAcquired === false &&
    i230.qualifyingAuthorControlledExactTargetSourceAcquired === false &&
    i230.preTargetSameTextFamilyLeadObserved &&
    i230.preTargetSameTextFamilyLeadContainsHiddenStemNineRelationsAndExternalActivationLanguage &&
    i230.preTargetSameTextFamilyLeadContainsI226RareExactTargetPassage === false &&
    i230.preTargetSameTextFamilyLeadHasCanonicalEditionIdentity === false &&
    i230.preTargetSameTextFamilyLeadHasOriginalAuthorshipBinding === false &&
    i230.preTargetSameTextFamilyLeadMayEstablishTargetPredecessor === false &&
    i230.qualifyingCustodianBoundExactTargetWitnessAcquired === false &&
    i230.qualifyingHigherProvenanceWitnessCount === 0 &&
    i230.unresolvedAdmissibilityGapCount === 4 &&
    i230.unresolvedAdmissibilityGapIds.length === 4 &&
    i230.unresolvedAdmissibilityGapIds.every((gapId, index) => gapId === I228_RESIDUAL_ADMISSIBILITY_GAP_IDS[index]) &&
    i230.exactTargetOriginalAuthorshipEstablishedByThisGate === false &&
    i230.exactTargetDoctrinalLineageEstablishedByThisGate === false &&
    i230.exactTargetPriorSourceDependencyEstablishedByThisGate === false &&
    i230.derivativeRelationshipAdjudicatedByThisGate === false &&
    i230.restrictiveDoctrineConflictAdjudicatedByThisGate === false &&
    i230.restrictiveDoctrineSchoolBoundaryEstablishedByThisGate === false &&
    i230.sourceNormativeAdmissibilityAdjudicatedByThisGate === false &&
    i230.authorityPromotionReadinessEstablishedByThisGate === false &&
    i230.accessLimitationsRecorded &&
    i230.accessLimitationsEqualCorpusExhaustion === false &&
    i230.negativeFindingCreatedFromAccessFailureOrSilence === false &&
    i230.corpusExhaustionClaimed === false &&
    i230.authorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i230.authorityGapClosed === false &&
    i230.authorityPromotedByThisGate === false &&
    i230.doctrinalConflictPreserved &&
    i230.doctrinalConflictResolvedByThisGate === false &&
    i230.quWei2001HoldPreserved &&
    i230.li1998SameTargetPathSuspendedNotRetired &&
    i230.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i230.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i230.provenanceIndependenceAdjudicatedByThisGate === false &&
    i230.evidenceRebindingAuthorizedByThisGate === false &&
    i230.candidateSetMutatedByThisGate === false &&
    i230.candidateSetReevaluationAuthorizedByThisGate === false &&
    i230.currentV2PackageAndCandidateSetRemainImmutable &&
    i230.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i230.actualCompositionPerformedByThisGate === false &&
    i230.multiSourceCompositionAuthorized === false &&
    i230.thresholdRuleCreatedByThisGate === false &&
    i230.damageEvaluationAuthorized === false &&
    i230.classificationAuthorized === false &&
    i230.numericScoringAuthorized === false &&
    i230.productionPolicyExecutionAuthorized === false &&
    i230.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW'
  );
}

function finalized(
  material: Omit<
    I231SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport,
    'reviewId'
  >,
): I231SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport {
  return {
    reviewId: `i231_hidden_stem_target_origin_external_access_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI231SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceAcquisitionEvidenceAdequacyExternalAccessReassessmentReview(
  i230: I230SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceArchivalOrCustodianAcquisitionEvidenceReport,
): I231SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport {
  const accepted = exactI230Accepted(i230);
  return finalized({
    reviewVersion:
      I231_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW'
      : 'I230_HIGHER_PROVENANCE_ACQUISITION_EVIDENCE_BOUNDARY_INVALID',
    decision: accepted
      ? 'I230_EVIDENCE_ADEQUATE_FOR_FOUR_UNRESOLVED_ADMISSIBILITY_GAPS_PRE_TARGET_SAME_TEXT_FAMILY_LEAD_ACCEPTED_AS_CONTEXT_ZERO_QUALIFYING_HIGHER_PROVENANCE_WITNESSES_AUTOMATED_PUBLIC_WEB_REMEDIATION_BOUNDARY_REACHED_EXTERNAL_ARCHIVAL_AUTHOR_CONTROLLED_CANONICAL_OR_CUSTODIAN_ACCESS_REQUIRED_NO_EXHAUSTION_NO_ADJUDICATION_NO_PROMOTION'
      : 'HIGHER_PROVENANCE_ACQUISITION_EVIDENCE_EXTERNAL_ACCESS_REASSESSMENT_NOT_READY',
    upstreamI230EvidenceId: i230.evidenceId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI230BoundaryAccepted: accepted,
    targetSourceTerm: '克',
    targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY',
    targetCandidateId: accepted ? 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' : null,
    sevenRequirementCoverageAcceptedAsUpstreamFinding: accepted,
    coverageReevaluationAuthorizedByThisGate: false,
    I230EvidenceAdequateForRecordedUnresolvedFindings: accepted,
    assessedResidualGapCount: accepted ? 4 : 0,
    resolvedResidualGapCount: 0,
    unresolvedResidualGapCount: accepted ? 4 : 0,
    unresolvedResidualGapIds: accepted ? I228_RESIDUAL_ADMISSIBILITY_GAP_IDS : [],
    qualifyingHigherProvenanceWitnessCountAccepted: 0,
    preTargetSameTextFamilyLeadAcceptedAsContext: accepted,
    preTargetSameTextFamilyLeadQualifiesAsExactTargetPredecessor: false,
    preTargetSameTextFamilyLeadQualifiesAsOriginalAuthorshipBinding: false,
    preTargetSameTextFamilyLeadQualifiesAsDoctrinalLineageBinding: false,
    preTargetSameTextFamilyLeadQualifiesAsCanonicalWitness: false,
    automatedPublicWebRemediationContinuationMethodologicallyJustified: false,
    automatedPublicWebRemediationBoundaryReached: accepted,
    externalAccessRequiredForFurtherGapResolution: accepted,
    manualOrExternalCustodianActionRequired: accepted,
    externalAccessRequirementIds: accepted ? I231_EXTERNAL_ACCESS_REQUIREMENT_IDS : [],
    externalAccessRequirementCount: accepted ? 3 : 0,
    externalAccessRequirementsFrozenProspectively: accepted,
    archiveExactPassageRequirementOpen: accepted,
    authorControlledOrCanonicalAuthorshipLineageRequirementOpen: accepted,
    custodianBoundExactPassageRequirementOpen: accepted,
    restrictiveConflictAdjudicationDeferredUntilTargetLineageEstablished: accepted,
    webBoundaryCreatesNegativeFinding: false,
    archiveAccessFailureCreatesNegativeFinding: false,
    searchSilenceCreatesNegativeFinding: false,
    custodianNonResponseCreatesNegativeFinding: false,
    paywallCreatesNegativeFinding: false,
    targetedDiscoveryExhaustionEstablished: false,
    onlineCorpusExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    universalNoFurtherEvidenceClaimEstablished: false,
    sourceNormativeAdmissibilityAdjudicatedByThisGate: false,
    authorityPromotionReadinessEstablishedByThisGate: false,
    authorityGap: accepted
      ? 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED'
      : 'UPSTREAM_INVALID',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    candidateRegisteredByThisGate: false,
    candidateSelectedByThisGate: false,
    doctrinalConflictPreserved: accepted,
    doctrinalConflictResolvedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    derivativeRelationshipAdjudicatedByThisGate: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    quWei2001HoldPreserved: accepted,
    li1998SameTargetPathSuspendedNotRetired: accepted,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    reassessmentControlIds: accepted ? I231_REASSESSMENT_CONTROL_IDS : [],
    reassessmentControlCount: accepted ? 14 : 0,
    reassessmentControlsFrozen: accepted,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    recommendedNextGate: accepted
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_EXTERNAL_ARCHIVAL_CANONICAL_CUSTODIAN_ACCESS_REQUIREMENT_HOLD_RECORD'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I230 is adequate for the recorded four unresolved admissibility gaps and zero qualifying higher-provenance witnesses.',
          'The pre-target Baidu same-text-family lead is accepted only as context and cannot establish exact predecessor, authorship, lineage, canonical witness identity, or prior-source dependency.',
          'Equivalent automated public-web remediation has reached a methodological boundary; further gap resolution requires materially new external archive, author-controlled/canonical, or custodian-bound evidence.',
          'The web boundary is not corpus exhaustion or negative evidence, and all authority, provenance, I132, Qu Wei, Li 1998, candidate-set and production guards remain unchanged.',
        ])
      : Object.freeze(['I230 higher-provenance acquisition evidence boundary was not accepted; no external-access reassessment was performed.']),
  });
}
