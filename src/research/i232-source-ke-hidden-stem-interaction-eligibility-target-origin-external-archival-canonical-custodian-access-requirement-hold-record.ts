import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { I228_RESIDUAL_ADMISSIBILITY_GAP_IDS } from './i228-source-ke-hidden-stem-interaction-eligibility-target-origin-discovery-evidence-adequacy-residual-path-reassessment-review.js';
import {
  I231_EXTERNAL_ACCESS_REQUIREMENT_IDS,
  I231_REASSESSMENT_CONTROL_IDS,
  type I231SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport,
} from './i231-source-ke-hidden-stem-interaction-eligibility-target-origin-higher-provenance-acquisition-evidence-adequacy-external-access-reassessment-review.js';

export const I232_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_EXTERNAL_ARCHIVAL_CANONICAL_CUSTODIAN_ACCESS_REQUIREMENT_HOLD_RECORD_VERSION =
  'myeonghwa-source-ke-hidden-stem-interaction-eligibility-target-origin-external-archival-canonical-custodian-access-requirement-hold-record-v1';

export const I232_RESUME_TRIGGER_IDS = I231_EXTERNAL_ACCESS_REQUIREMENT_IDS;
export type I232ResumeTriggerId = (typeof I232_RESUME_TRIGGER_IDS)[number];

export const I232_HOLD_CONTROL_IDS = Object.freeze([
  'EXACT_I231_EXTERNAL_ACCESS_BOUNDARY_REQUIRED',
  'FOUR_ADMISSIBILITY_GAPS_MUST_REMAIN_OPEN',
  'I221_SEVEN_OF_SEVEN_COVERAGE_MUST_REMAIN_FROZEN',
  'PRE_TARGET_SAME_TEXT_FAMILY_LEAD_MUST_REMAIN_CONTEXT_ONLY',
  'EQUIVALENT_AUTOMATED_PUBLIC_WEB_REMEDIATION_MUST_REMAIN_ON_HOLD',
  'HOLD_MUST_NOT_BE_RELABELED_AS_RETIREMENT_EXHAUSTION_OR_NEGATIVE_EVIDENCE',
  'RESUME_REQUIRES_ONE_MATERIALLY_NEW_EXTERNAL_ARCHIVAL_AUTHOR_CONTROLLED_CANONICAL_OR_CUSTODIAN_TRIGGER',
  'A_RESUME_TRIGGER_MAY_START_EVIDENCE_INGESTION_READINESS_BUT_MUST_NOT_ITSELF_CLOSE_ANY_GAP',
  'RESTRICTIVE_CONFLICT_ADJUDICATION_REMAINS_DEFERRED_UNTIL_TARGET_LINEAGE_ESTABLISHED',
  'NO_REBINDING_PROVENANCE_INDEPENDENCE_OR_DERIVATIVE_ADJUDICATION_ON_HOLD',
  'I132_QU_WEI_LI_V2_GUARDS_MUST_REMAIN_UNCHANGED',
  'EXTERNAL_CONTACT_OR_CUSTODIAN_ACTION_REQUIRES_SEPARATE_EXPLICIT_AUTHORITY',
  'NO_COMPOSITION_THRESHOLD_DAMAGE_CLASSIFICATION_SCORING_OR_PRODUCTION_AUTHORITY',
] as const);
export type I232HoldControlId = (typeof I232_HOLD_CONTROL_IDS)[number];

export interface I232SourceKeHiddenStemInteractionEligibilityTargetOriginExternalArchivalCanonicalCustodianAccessRequirementHoldRecord {
  holdRecordId: string;
  holdVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_EXTERNAL_ARCHIVAL_CANONICAL_CUSTODIAN_ACCESS_REQUIREMENT_HOLD_RECORD'
    | 'I231_EXTERNAL_ACCESS_REASSESSMENT_BOUNDARY_INVALID';
  decision:
    | 'HIDDEN_STEM_TARGET_ORIGIN_AUTOMATED_PUBLIC_WEB_REMEDIATION_ON_HOLD_THREE_EXTERNAL_ACCESS_TRIGGERS_FROZEN_FOUR_ADMISSIBILITY_GAPS_REMAIN_PRE_TARGET_SAME_TEXT_FAMILY_CONTEXT_PRESERVED_NO_EXHAUSTION_NO_ADJUDICATION_NO_PROMOTION'
    | 'HIDDEN_STEM_TARGET_ORIGIN_EXTERNAL_ACCESS_REQUIREMENT_HOLD_NOT_ESTABLISHED';
  upstreamI231ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI231BoundaryAccepted: boolean;
  holdState: 'HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_ACCESS_EVIDENCE' | 'NOT_ESTABLISHED';
  targetSourceTerm: '克';
  targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY';
  targetCandidateId: 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' | null;
  sevenRequirementCoverageAcceptedAsUpstreamFinding: boolean;
  coverageReevaluationAuthorizedByThisGate: false;
  remainingGapIds: readonly string[];
  remainingGapCount: 4 | 0;
  gapsResolvedByHoldCount: 0;
  preTargetSameTextFamilyLeadPreservedAsContext: boolean;
  preTargetSameTextFamilyLeadMayEstablishExactPredecessor: false;
  preTargetSameTextFamilyLeadMayEstablishOriginalAuthorshipOrLineage: false;
  webAccessibleRemediationBoundaryAccepted: boolean;
  automatedPublicWebRemediationHoldActive: boolean;
  automatedPublicWebResearchRetired: false;
  equivalentAutomatedPublicWebRepeatAuthorizedAsProgress: false;
  holdCreatesNegativeFinding: false;
  holdEstablishesTargetedDiscoveryExhaustion: false;
  holdEstablishesOnlineCorpusExhaustion: false;
  holdEstablishesCorpusExhaustion: false;
  universalNoFurtherEvidenceClaimEstablished: false;
  resumeTriggerIds: readonly I232ResumeTriggerId[];
  resumeTriggerCount: 3 | 0;
  resumeTriggersFrozen: boolean;
  materiallyNewExternalEvidenceRequiredToResume: boolean;
  preTargetArchiveExactPassageTriggerRequired: boolean;
  authorControlledOrCanonicalAuthorshipLineageTriggerRequired: boolean;
  custodianBoundBookCourseExactPassageTriggerRequired: boolean;
  oneResumeTriggerMayStartEvidenceIngestionReadinessReview: boolean;
  resumeTriggerSatisfiedByThisGate: false;
  externalEvidenceIngestionExecutedByThisGate: false;
  externalContactOrCustodianActionAuthorizedByThisGate: false;
  externalContactOrCustodianActionExecutedByThisGate: false;
  separateExplicitAuthorityRequiredForExternalContactOrCustodianAction: boolean;
  restrictiveConflictAdjudicationDeferredUntilTargetLineageEstablished: boolean;
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
  holdControlIds: readonly I232HoldControlId[];
  holdControlCount: 13 | 0;
  holdControlsFrozen: boolean;
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  productionPolicyExecutionAuthorized: false;
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_EXTERNAL_ACCESS_EVIDENCE_INGESTION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_EXTERNAL_ARCHIVAL_CANONICAL_CUSTODIAN_ACCESS_REQUIREMENT_HOLD_RECORD';
  nextGateActivationCondition:
    | 'MATERIALLY_NEW_EXTERNAL_ACCESS_EVIDENCE_TRIGGER_REQUIRED'
    | 'I231_BOUNDARY_NOT_ACCEPTED';
  notes: readonly string[];
}

function exactI231Accepted(
  i231: I231SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport,
): boolean {
  return (
    i231.status === 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_HIGHER_PROVENANCE_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW' &&
    i231.decision === 'I230_EVIDENCE_ADEQUATE_FOR_FOUR_UNRESOLVED_ADMISSIBILITY_GAPS_PRE_TARGET_SAME_TEXT_FAMILY_LEAD_ACCEPTED_AS_CONTEXT_ZERO_QUALIFYING_HIGHER_PROVENANCE_WITNESSES_AUTOMATED_PUBLIC_WEB_REMEDIATION_BOUNDARY_REACHED_EXTERNAL_ARCHIVAL_AUTHOR_CONTROLLED_CANONICAL_OR_CUSTODIAN_ACCESS_REQUIRED_NO_EXHAUSTION_NO_ADJUDICATION_NO_PROMOTION' &&
    i231.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i231.policyVersion === 'v1-definition' &&
    i231.adoptionVersion === 'v1-adoption' &&
    i231.currentCandidateSetVersion === 'v1-candidate-set' &&
    i231.currentInputPackageVersion === 'v2-input-package' &&
    i231.exactI230BoundaryAccepted &&
    i231.targetCandidateId === 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' &&
    i231.sevenRequirementCoverageAcceptedAsUpstreamFinding &&
    i231.coverageReevaluationAuthorizedByThisGate === false &&
    i231.I230EvidenceAdequateForRecordedUnresolvedFindings &&
    i231.assessedResidualGapCount === 4 &&
    i231.resolvedResidualGapCount === 0 &&
    i231.unresolvedResidualGapCount === 4 &&
    i231.unresolvedResidualGapIds.length === I228_RESIDUAL_ADMISSIBILITY_GAP_IDS.length &&
    i231.unresolvedResidualGapIds.every((id, index) => id === I228_RESIDUAL_ADMISSIBILITY_GAP_IDS[index]) &&
    i231.qualifyingHigherProvenanceWitnessCountAccepted === 0 &&
    i231.preTargetSameTextFamilyLeadAcceptedAsContext &&
    i231.preTargetSameTextFamilyLeadQualifiesAsExactTargetPredecessor === false &&
    i231.preTargetSameTextFamilyLeadQualifiesAsOriginalAuthorshipBinding === false &&
    i231.preTargetSameTextFamilyLeadQualifiesAsDoctrinalLineageBinding === false &&
    i231.preTargetSameTextFamilyLeadQualifiesAsCanonicalWitness === false &&
    i231.automatedPublicWebRemediationContinuationMethodologicallyJustified === false &&
    i231.automatedPublicWebRemediationBoundaryReached &&
    i231.externalAccessRequiredForFurtherGapResolution &&
    i231.manualOrExternalCustodianActionRequired &&
    i231.externalAccessRequirementCount === 3 &&
    i231.externalAccessRequirementIds.length === I231_EXTERNAL_ACCESS_REQUIREMENT_IDS.length &&
    i231.externalAccessRequirementIds.every((id, index) => id === I231_EXTERNAL_ACCESS_REQUIREMENT_IDS[index]) &&
    i231.externalAccessRequirementsFrozenProspectively &&
    i231.archiveExactPassageRequirementOpen &&
    i231.authorControlledOrCanonicalAuthorshipLineageRequirementOpen &&
    i231.custodianBoundExactPassageRequirementOpen &&
    i231.restrictiveConflictAdjudicationDeferredUntilTargetLineageEstablished &&
    i231.webBoundaryCreatesNegativeFinding === false &&
    i231.archiveAccessFailureCreatesNegativeFinding === false &&
    i231.searchSilenceCreatesNegativeFinding === false &&
    i231.custodianNonResponseCreatesNegativeFinding === false &&
    i231.paywallCreatesNegativeFinding === false &&
    i231.targetedDiscoveryExhaustionEstablished === false &&
    i231.onlineCorpusExhaustionEstablished === false &&
    i231.corpusExhaustionEstablished === false &&
    i231.universalNoFurtherEvidenceClaimEstablished === false &&
    i231.sourceNormativeAdmissibilityAdjudicatedByThisGate === false &&
    i231.authorityPromotionReadinessEstablishedByThisGate === false &&
    i231.authorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i231.authorityGapClosed === false &&
    i231.authorityPromotedByThisGate === false &&
    i231.candidateRegisteredByThisGate === false &&
    i231.candidateSelectedByThisGate === false &&
    i231.doctrinalConflictPreserved &&
    i231.doctrinalConflictResolvedByThisGate === false &&
    i231.provenanceIndependenceAdjudicatedByThisGate === false &&
    i231.derivativeRelationshipAdjudicatedByThisGate === false &&
    i231.evidenceRebindingMethodologicallyReady === false &&
    i231.evidenceRebindingAuthorizedByThisGate === false &&
    i231.evidenceRebindingExecutedByThisGate === false &&
    i231.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i231.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i231.quWei2001HoldPreserved &&
    i231.li1998SameTargetPathSuspendedNotRetired &&
    i231.candidateSetMutatedByThisGate === false &&
    i231.candidateSetReevaluationAuthorizedByThisGate === false &&
    i231.currentV2PackageAndCandidateSetRemainImmutable &&
    i231.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i231.reassessmentControlCount === 14 &&
    i231.reassessmentControlIds.length === I231_REASSESSMENT_CONTROL_IDS.length &&
    i231.reassessmentControlIds.every((id, index) => id === I231_REASSESSMENT_CONTROL_IDS[index]) &&
    i231.reassessmentControlsFrozen &&
    i231.actualCompositionPerformedByThisGate === false &&
    i231.multiSourceCompositionAuthorized === false &&
    i231.thresholdRuleCreatedByThisGate === false &&
    i231.damageEvaluationAuthorized === false &&
    i231.classificationAuthorized === false &&
    i231.numericScoringAuthorized === false &&
    i231.productionPolicyExecutionAuthorized === false &&
    i231.recommendedNextGate === 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_EXTERNAL_ARCHIVAL_CANONICAL_CUSTODIAN_ACCESS_REQUIREMENT_HOLD_RECORD'
  );
}

function finalized(
  material: Omit<I232SourceKeHiddenStemInteractionEligibilityTargetOriginExternalArchivalCanonicalCustodianAccessRequirementHoldRecord, 'holdRecordId'>,
): I232SourceKeHiddenStemInteractionEligibilityTargetOriginExternalArchivalCanonicalCustodianAccessRequirementHoldRecord {
  return {
    holdRecordId: `i232_hidden_stem_target_origin_external_access_hold_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI232SourceKeHiddenStemInteractionEligibilityTargetOriginExternalArchivalCanonicalCustodianAccessRequirementHoldRecord(
  i231: I231SourceKeHiddenStemInteractionEligibilityTargetOriginHigherProvenanceAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport,
): I232SourceKeHiddenStemInteractionEligibilityTargetOriginExternalArchivalCanonicalCustodianAccessRequirementHoldRecord {
  const accepted = exactI231Accepted(i231);
  return finalized({
    holdVersion: I232_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_EXTERNAL_ARCHIVAL_CANONICAL_CUSTODIAN_ACCESS_REQUIREMENT_HOLD_RECORD_VERSION,
    status: accepted
      ? 'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_EXTERNAL_ARCHIVAL_CANONICAL_CUSTODIAN_ACCESS_REQUIREMENT_HOLD_RECORD'
      : 'I231_EXTERNAL_ACCESS_REASSESSMENT_BOUNDARY_INVALID',
    decision: accepted
      ? 'HIDDEN_STEM_TARGET_ORIGIN_AUTOMATED_PUBLIC_WEB_REMEDIATION_ON_HOLD_THREE_EXTERNAL_ACCESS_TRIGGERS_FROZEN_FOUR_ADMISSIBILITY_GAPS_REMAIN_PRE_TARGET_SAME_TEXT_FAMILY_CONTEXT_PRESERVED_NO_EXHAUSTION_NO_ADJUDICATION_NO_PROMOTION'
      : 'HIDDEN_STEM_TARGET_ORIGIN_EXTERNAL_ACCESS_REQUIREMENT_HOLD_NOT_ESTABLISHED',
    upstreamI231ReviewId: i231.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI231BoundaryAccepted: accepted,
    holdState: accepted ? 'HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_ACCESS_EVIDENCE' : 'NOT_ESTABLISHED',
    targetSourceTerm: '克',
    targetScope: 'HIDDEN_STEM_EFFECTIVE_INTERACTION_ELIGIBILITY',
    targetCandidateId: accepted ? 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML' : null,
    sevenRequirementCoverageAcceptedAsUpstreamFinding: accepted,
    coverageReevaluationAuthorizedByThisGate: false,
    remainingGapIds: accepted ? I228_RESIDUAL_ADMISSIBILITY_GAP_IDS : [],
    remainingGapCount: accepted ? 4 : 0,
    gapsResolvedByHoldCount: 0,
    preTargetSameTextFamilyLeadPreservedAsContext: accepted,
    preTargetSameTextFamilyLeadMayEstablishExactPredecessor: false,
    preTargetSameTextFamilyLeadMayEstablishOriginalAuthorshipOrLineage: false,
    webAccessibleRemediationBoundaryAccepted: accepted,
    automatedPublicWebRemediationHoldActive: accepted,
    automatedPublicWebResearchRetired: false,
    equivalentAutomatedPublicWebRepeatAuthorizedAsProgress: false,
    holdCreatesNegativeFinding: false,
    holdEstablishesTargetedDiscoveryExhaustion: false,
    holdEstablishesOnlineCorpusExhaustion: false,
    holdEstablishesCorpusExhaustion: false,
    universalNoFurtherEvidenceClaimEstablished: false,
    resumeTriggerIds: accepted ? I232_RESUME_TRIGGER_IDS : [],
    resumeTriggerCount: accepted ? 3 : 0,
    resumeTriggersFrozen: accepted,
    materiallyNewExternalEvidenceRequiredToResume: accepted,
    preTargetArchiveExactPassageTriggerRequired: accepted,
    authorControlledOrCanonicalAuthorshipLineageTriggerRequired: accepted,
    custodianBoundBookCourseExactPassageTriggerRequired: accepted,
    oneResumeTriggerMayStartEvidenceIngestionReadinessReview: accepted,
    resumeTriggerSatisfiedByThisGate: false,
    externalEvidenceIngestionExecutedByThisGate: false,
    externalContactOrCustodianActionAuthorizedByThisGate: false,
    externalContactOrCustodianActionExecutedByThisGate: false,
    separateExplicitAuthorityRequiredForExternalContactOrCustodianAction: accepted,
    restrictiveConflictAdjudicationDeferredUntilTargetLineageEstablished: accepted,
    sourceNormativeAdmissibilityAdjudicatedByThisGate: false,
    authorityPromotionReadinessEstablishedByThisGate: false,
    authorityGap: accepted ? 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' : 'UPSTREAM_INVALID',
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
    holdControlIds: accepted ? I232_HOLD_CONTROL_IDS : [],
    holdControlCount: accepted ? 13 : 0,
    holdControlsFrozen: accepted,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    recommendedNextGate: accepted
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_EXTERNAL_ACCESS_EVIDENCE_INGESTION_READINESS_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_EXTERNAL_ARCHIVAL_CANONICAL_CUSTODIAN_ACCESS_REQUIREMENT_HOLD_RECORD',
    nextGateActivationCondition: accepted ? 'MATERIALLY_NEW_EXTERNAL_ACCESS_EVIDENCE_TRIGGER_REQUIRED' : 'I231_BOUNDARY_NOT_ACCEPTED',
    notes: accepted
      ? Object.freeze([
          'Automated public-web target-origin remediation is on hold at the I231 methodological boundary; the hold is not retirement, exhaustion, or negative evidence.',
          'The pre-target Baidu same-text-family witness remains context only and does not establish exact predecessor, original authorship, lineage, canonical identity, or prior-source dependency.',
          'Any one materially new external archive, author-controlled/canonical, or custodian-bound trigger may start a separate evidence-ingestion readiness review, but no trigger by itself closes an admissibility gap.',
          'All I132, Qu Wei 2001, Li 1998, authority, provenance, candidate-set, v2 immutability, and production guards remain unchanged.',
        ])
      : Object.freeze(['I231 external-access reassessment boundary was not accepted; no hold was established.']),
  });
}
