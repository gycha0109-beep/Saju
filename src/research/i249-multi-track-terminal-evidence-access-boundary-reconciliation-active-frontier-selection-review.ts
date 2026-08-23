import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I187_REASSESSMENT_REQUIREMENT_IDS,
  type I187Li1998DirectPrimaryAcquisitionEvidenceAdequacyRemediationPathReassessmentReviewReport,
} from './i187-li-1998-direct-primary-acquisition-evidence-adequacy-remediation-path-reassessment-review.js';
import {
  I211_HOLD_CONTROL_IDS,
  I211_RESUME_TRIGGER_IDS,
  type I211QuWei2001ExternalCustodianAccessRequirementHoldRecord,
} from './i211-qu-wei-2001-external-custodian-access-requirement-hold-record.js';
import {
  I232_HOLD_CONTROL_IDS,
  I232_RESUME_TRIGGER_IDS,
  type I232SourceKeHiddenStemInteractionEligibilityTargetOriginExternalArchivalCanonicalCustodianAccessRequirementHoldRecord,
} from './i232-source-ke-hidden-stem-interaction-eligibility-target-origin-external-archival-canonical-custodian-access-requirement-hold-record.js';
import {
  I248_HOLD_CONTROL_IDS,
  I248_RESUME_TRIGGER_IDS,
  type I248ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluExternalCanonicalWitnessAccessRequirementHoldRecord,
} from './i248-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-external-canonical-witness-access-requirement-hold-record.js';

export const I249_MULTI_TRACK_TERMINAL_EVIDENCE_ACCESS_BOUNDARY_RECONCILIATION_ACTIVE_FRONTIER_SELECTION_REVIEW_VERSION =
  'myeonghwa-multi-track-terminal-evidence-access-boundary-reconciliation-active-frontier-selection-review-v1';

export const I249_LI_1998_RESUME_TRIGGER_IDS = Object.freeze([
  'MATERIALLY_NEW_DIRECT_LEAD_BEFORE_EQUIVALENT_SAME_TARGET_REPEAT',
] as const);

export const I249_FRONTIER_CONTROL_IDS = Object.freeze([
  'ALL_TERMINAL_TRACK_BOUNDARIES_MUST_BE_ACCEPTED_EXACTLY',
  'LI1998_SUSPENSION_MUST_NOT_BECOME_RETIREMENT',
  'QU_WEI_HOLD_MUST_REMAIN_TRIGGER_GATED',
  'I232_HIDDEN_STEM_HOLD_MUST_REMAIN_TRIGGER_GATED',
  'I248_YUDING_SUIJINLU_HOLD_MUST_REMAIN_TRIGGER_GATED',
  'EQUIVALENT_PUBLIC_SEARCH_REPETITION_MUST_NOT_COUNT_AS_PROGRESS',
  'REPOSITORY_ONLY_REPACKAGING_MUST_NOT_COUNT_AS_NEW_AUTHORITY',
  'NO_CROSS_TRACK_EVIDENCE_POOLING_TO_BYPASS_INDEPENDENCE_REQUIREMENTS',
  'NO_HOLD_STATE_MAY_BE_RELABELED_AS_NEGATIVE_EVIDENCE',
  'NO_GLOBAL_CORPUS_EXHAUSTION_OR_NONEXISTENCE_FINDING',
  'EXTERNAL_CONTACT_REMAINS_SEPARATELY_AUTHORIZED',
  'NO_CANDIDATE_SET_MUTATION',
  'NO_EVIDENCE_REBINDING',
  'NO_PROVENANCE_INDEPENDENCE_SHORTCUT',
  'I132_REMAINS_NORMATIVE',
  'CURRENT_V2_PACKAGE_REMAINS_IMMUTABLE',
  'NO_THRESHOLD_CLASSIFICATION_NUMERIC_SCORING_OR_PRODUCTION_AUTHORITY',
  'NEW_STAGE_CREATION_REQUIRES_EITHER_MATERIALLY_NEW_EVIDENCE_OR_A_GENUINELY_NEW_NON_EQUIVALENT_METHODOLOGICAL_FRONTIER',
] as const);

export type I249FrontierControlId = (typeof I249_FRONTIER_CONTROL_IDS)[number];

export type I249TrackId =
  | 'LI_1998_DIRECT_PRIMARY'
  | 'QU_WEI_2001_CANONICAL_WITNESS'
  | 'SOURCE_KE_HIDDEN_STEM_TARGET_ORIGIN'
  | 'YUDING_SUIJINLU_CANONICAL_WITNESS';

export type I249TrackCurrentState =
  | 'SUSPENDED_NOT_RETIRED'
  | 'HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_ACCESS_EVIDENCE'
  | 'HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_OR_PUBLIC_PRIMARY_CANONICAL_WITNESS_ACCESS_EVIDENCE';

export interface I249TrackFrontierRecord {
  trackId: I249TrackId;
  upstreamTerminalGate: 'I187' | 'I211' | 'I232' | 'I248';
  currentState: I249TrackCurrentState;
  unresolvedAuthorityGapKeys: readonly string[];
  resumeTriggerIds: readonly string[];
  equivalentRepeatAllowed: false;
  repositoryOnlyRepackagingMayCreateAuthority: false;
  externalContactAuthorized: false;
  separateExplicitAuthorityRequiredForExternalContact: true;
  candidateMutationAllowed: false;
  rebindingAllowed: false;
  provenanceIndependenceAdjudicationAllowed: false;
  productionAuthorityImpact: 'NONE';
}

export interface I249MultiTrackTerminalEvidenceAccessBoundaryReconciliationActiveFrontierSelectionReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_MULTI_TRACK_TERMINAL_EVIDENCE_ACCESS_BOUNDARY_RECONCILIATION_ACTIVE_FRONTIER_SELECTION_REVIEW'
    | 'MULTI_TRACK_TERMINAL_BOUNDARY_INVALID';
  decision:
    | 'NO_CURRENTLY_ACTIONABLE_EQUIVALENT_PUBLIC_OR_REPOSITORY_ONLY_AUTHORITY_REMEDIATION_FRONTIER_FOUR_TRACKS_TRIGGER_GATED_ONE_SUSPENDED_THREE_HOLD_NO_EXHAUSTION_NO_NEGATIVE_FINDING_NO_AUTHORITY_PROMOTION'
    | 'MULTI_TRACK_ACTIVE_FRONTIER_SELECTION_NOT_READY';
  upstreamI187ReviewId: string;
  upstreamI211HoldRecordId: string;
  upstreamI232HoldRecordId: string;
  upstreamI248HoldRecordId: string;
  exactI187LiBoundaryAccepted: boolean;
  exactI211QuWeiBoundaryAccepted: boolean;
  exactI232HiddenStemBoundaryAccepted: boolean;
  exactI248YudingSuijinluBoundaryAccepted: boolean;
  allTerminalTrackBoundariesAccepted: boolean;
  trackFrontiers: readonly I249TrackFrontierRecord[];
  trackCount: 4 | 0;
  actionableEquivalentPublicRemediationFrontierCount: 0;
  actionableRepositoryOnlyAuthorityFrontierCount: 0;
  materiallyNewEvidenceTriggerDependentFrontierCount: 4 | 0;
  suspendedNotRetiredFrontierCount: 1 | 0;
  holdFrontierCount: 3 | 0;
  authorityProgressViaEquivalentRepeatAvailable: false;
  authorityProgressViaRepositoryOnlyRepackagingAvailable: false;
  globalCorpusExhaustionEstablished: false;
  sourceNonexistenceEstablished: false;
  globalNegativeFindingEstablished: false;
  universalNoFurtherEvidenceClaimEstablished: false;
  crossTrackEvidencePoolingAuthorized: false;
  crossTrackAuthorityLaunderingAuthorized: false;
  externalContactAuthorizedByThisGate: false;
  separateExplicitAuthorityRequiredForExternalContact: true;
  newStageCreationRequiresMateriallyNewEvidenceOrGenuinelyNewNonEquivalentMethodologicalFrontier: boolean;
  genuinelyNewNonEquivalentMethodologicalFrontierMayProceedUnderSeparateGate: boolean;
  productizationInventoryReviewMayProceedWithoutAuthorityPromotion: boolean;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  li1998SameTargetPathSuspendedNotRetired: boolean;
  quWei2001HoldPreserved: boolean;
  hiddenStemI232HoldPreserved: boolean;
  hiddenStemTrackReopenedByThisGate: false;
  yudingSuijinluI248HoldPreserved: boolean;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  candidateRegisteredByThisGate: false;
  candidateSelectedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  evidenceRebindingMethodologicallyReady: false;
  evidenceRebindingAuthorizedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  derivativeRelationshipAdjudicatedByThisGate: false;
  authorityAcquiredByThisGate: false;
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  productionPolicyExecutionAuthorized: false;
  frontierControlIds: readonly I249FrontierControlId[];
  frontierControlCount: 18 | 0;
  frontierControlsFrozen: boolean;
  recommendedNextGate:
    | 'GOVERNED_ENGINE_REMAINING_PRODUCTIZATION_FRONTIER_INVENTORY_AND_PRIORITY_REVIEW'
    | 'MULTI_TRACK_TERMINAL_EVIDENCE_ACCESS_BOUNDARY_RECONCILIATION_ACTIVE_FRONTIER_SELECTION_REVIEW';
  nextGateActivationCondition:
    | 'FOUR_TRIGGER_GATED_AUTHORITY_REMEDIATION_TRACKS_RECONCILED_NO_EQUIVALENT_PUBLIC_OR_REPOSITORY_ONLY_FRONTIER_ACTIONABLE'
    | 'UPSTREAM_TERMINAL_BOUNDARY_NOT_ACCEPTED';
  notes: readonly string[];
}

function sameOrderedStrings(actual: readonly string[], expected: readonly string[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function exactI187Accepted(
  i187: I187Li1998DirectPrimaryAcquisitionEvidenceAdequacyRemediationPathReassessmentReviewReport,
): boolean {
  return (
    i187.status === 'RESOLVED_LI_1998_DIRECT_PRIMARY_ACQUISITION_EVIDENCE_ADEQUACY_REMEDIATION_PATH_REASSESSMENT_REVIEW' &&
    i187.decision ===
      'I186_EVIDENCE_ADEQUATE_ZERO_QUALIFYING_GAIN_TWO_GAPS_UNRESOLVED_SAME_TARGET_NOT_EXHAUSTED_EQUIVALENT_REPEAT_NOT_JUSTIFIED_THIRD_WAVE_NEW_PROVENANCE_DISCOVERY_READINESS_MAY_PROCEED_NO_REBINDING_NO_POLICY_RELAXATION' &&
    i187.exactI186BoundaryAccepted &&
    i187.i186EvidenceAdequateForReassessment &&
    i187.i186QualifyingAcquisitionCount === 0 &&
    i187.publicationMediumOrEntityGapStillOpen &&
    i187.canonicalDigitalWitnessNormalizationGapStillOpen &&
    i187.sameTargetDirectPrimaryPathExhausted === false &&
    i187.targetedDiscoveryExhaustionEstablished === false &&
    i187.corpusExhaustionEstablished === false &&
    i187.explicitNegativeFindingCount === 0 &&
    i187.nonAcquisitionCreatesNegativeFinding === false &&
    i187.searchSilenceCreatesNegativeFinding === false &&
    i187.failedRegistryAccessCreatesNegativeFinding === false &&
    i187.failedWitnessAccessCreatesNegativeFinding === false &&
    i187.sameTargetDirectPrimaryPathRemainsMethodologicallyOpen &&
    i187.immediateEquivalentSameTargetRepeatJustified === false &&
    i187.materiallyNewDirectLeadRequiredBeforeEquivalentSameTargetRepeat &&
    i187.materiallyNewDirectLeadMayReturnWorkToSameTargetPath &&
    i187.currentSameTargetPathSuspendedNotRetired &&
    i187.evidenceRebindingMethodologicallyReady === false &&
    i187.evidenceRebindingAuthorizedByThisGate === false &&
    i187.evidenceRebindingExecutedByThisGate === false &&
    i187.provenanceIndependenceAdjudicatedByThisGate === false &&
    i187.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i187.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i187.currentV2PackageAndCandidateSetRemainImmutable &&
    i187.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i187.candidateSetMutatedByThisGate === false &&
    i187.productionPolicyExecutionAuthorized === false &&
    i187.actualCompositionPerformedByThisGate === false &&
    i187.multiSourceCompositionAuthorized === false &&
    i187.thresholdRuleCreatedByThisGate === false &&
    i187.damageEvaluationAuthorized === false &&
    i187.classificationAuthorized === false &&
    i187.numericScoringAuthorized === false &&
    i187.reassessmentRequirementCount === 12 &&
    sameOrderedStrings(i187.reassessmentRequirementIds, I187_REASSESSMENT_REQUIREMENT_IDS) &&
    i187.reassessmentRequirementsFrozen
  );
}

function exactI211Accepted(i211: I211QuWei2001ExternalCustodianAccessRequirementHoldRecord): boolean {
  return (
    i211.status === 'RESOLVED_QU_WEI_2001_EXTERNAL_CUSTODIAN_ACCESS_REQUIREMENT_HOLD_RECORD' &&
    i211.decision ===
      'QU_WEI_2001_WEB_ONLY_REMEDIATION_ON_HOLD_TWO_EXTERNAL_ACCESS_TRIGGERS_FROZEN_TWO_GAPS_REMAIN_NO_EXHAUSTION_NO_CONTACT_AUTHORIZATION_NO_REBINDING_NO_INDEPENDENCE' &&
    i211.exactI210BoundaryAccepted &&
    i211.holdState === 'HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_ACCESS_EVIDENCE' &&
    i211.resolvedPublicationGapPreserved &&
    i211.remainingGapCount === 2 &&
    i211.canonicalWitnessNormalizationGapResolved === false &&
    i211.exactTargetPassageBindingGapResolved === false &&
    i211.webOnlyAutomatedRemediationHoldActive &&
    i211.webOnlyAutomatedResearchRetired === false &&
    i211.equivalentWebOnlyTargetSurfaceRepeatAuthorizedAsProgress === false &&
    i211.holdCreatesNegativeFinding === false &&
    i211.holdEstablishesTargetedDiscoveryExhaustion === false &&
    i211.holdEstablishesOnlineCorpusExhaustion === false &&
    i211.holdEstablishesCorpusExhaustion === false &&
    i211.universalNoFurtherEvidenceClaimEstablished === false &&
    i211.resumeTriggerCount === 2 &&
    sameOrderedStrings(i211.resumeTriggerIds, I211_RESUME_TRIGGER_IDS) &&
    i211.resumeTriggersFrozen &&
    i211.materiallyNewExternalEvidenceRequiredToResume &&
    i211.resumeTriggerSatisfiedByThisGate === false &&
    i211.externalEvidenceIngestionExecutedByThisGate === false &&
    i211.officialCustodianContactExecutionAuthorizedByThisGate === false &&
    i211.officialCustodianContactExecutedByThisGate === false &&
    i211.separateExplicitAuthorityRequiredForCustodianContact &&
    i211.evidenceRebindingMethodologicallyReady === false &&
    i211.evidenceRebindingAuthorizedByThisGate === false &&
    i211.evidenceRebindingExecutedByThisGate === false &&
    i211.provenanceIndependenceAdjudicatedByThisGate === false &&
    i211.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i211.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i211.holdControlCount === 12 &&
    sameOrderedStrings(i211.holdControlIds, I211_HOLD_CONTROL_IDS) &&
    i211.holdControlsFrozen &&
    i211.candidateSetMutatedByThisGate === false &&
    i211.currentV2PackageAndCandidateSetRemainImmutable &&
    i211.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i211.liSameTargetPathSuspendedNotRetired &&
    i211.productionPolicyExecutionAuthorized === false &&
    i211.actualCompositionPerformedByThisGate === false &&
    i211.multiSourceCompositionAuthorized === false &&
    i211.thresholdRuleCreatedByThisGate === false &&
    i211.damageEvaluationAuthorized === false &&
    i211.classificationAuthorized === false &&
    i211.numericScoringAuthorized === false &&
    i211.hiddenStemInteractionEligibilityGapRemains
  );
}

function exactI232Accepted(
  i232: I232SourceKeHiddenStemInteractionEligibilityTargetOriginExternalArchivalCanonicalCustodianAccessRequirementHoldRecord,
): boolean {
  return (
    i232.status ===
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_EXTERNAL_ARCHIVAL_CANONICAL_CUSTODIAN_ACCESS_REQUIREMENT_HOLD_RECORD' &&
    i232.decision ===
      'HIDDEN_STEM_TARGET_ORIGIN_AUTOMATED_PUBLIC_WEB_REMEDIATION_ON_HOLD_THREE_EXTERNAL_ACCESS_TRIGGERS_FROZEN_FOUR_ADMISSIBILITY_GAPS_REMAIN_PRE_TARGET_SAME_TEXT_FAMILY_CONTEXT_PRESERVED_NO_EXHAUSTION_NO_ADJUDICATION_NO_PROMOTION' &&
    i232.exactI231BoundaryAccepted &&
    i232.holdState === 'HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_ACCESS_EVIDENCE' &&
    i232.remainingGapCount === 4 &&
    i232.gapsResolvedByHoldCount === 0 &&
    i232.webAccessibleRemediationBoundaryAccepted &&
    i232.automatedPublicWebRemediationHoldActive &&
    i232.automatedPublicWebResearchRetired === false &&
    i232.equivalentAutomatedPublicWebRepeatAuthorizedAsProgress === false &&
    i232.holdCreatesNegativeFinding === false &&
    i232.holdEstablishesTargetedDiscoveryExhaustion === false &&
    i232.holdEstablishesOnlineCorpusExhaustion === false &&
    i232.holdEstablishesCorpusExhaustion === false &&
    i232.universalNoFurtherEvidenceClaimEstablished === false &&
    i232.resumeTriggerCount === 3 &&
    sameOrderedStrings(i232.resumeTriggerIds, I232_RESUME_TRIGGER_IDS) &&
    i232.resumeTriggersFrozen &&
    i232.materiallyNewExternalEvidenceRequiredToResume &&
    i232.resumeTriggerSatisfiedByThisGate === false &&
    i232.externalEvidenceIngestionExecutedByThisGate === false &&
    i232.externalContactOrCustodianActionAuthorizedByThisGate === false &&
    i232.externalContactOrCustodianActionExecutedByThisGate === false &&
    i232.separateExplicitAuthorityRequiredForExternalContactOrCustodianAction &&
    i232.authorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i232.authorityGapClosed === false &&
    i232.authorityPromotedByThisGate === false &&
    i232.provenanceIndependenceAdjudicatedByThisGate === false &&
    i232.derivativeRelationshipAdjudicatedByThisGate === false &&
    i232.evidenceRebindingMethodologicallyReady === false &&
    i232.evidenceRebindingAuthorizedByThisGate === false &&
    i232.evidenceRebindingExecutedByThisGate === false &&
    i232.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i232.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i232.quWei2001HoldPreserved &&
    i232.li1998SameTargetPathSuspendedNotRetired &&
    i232.candidateSetMutatedByThisGate === false &&
    i232.currentV2PackageAndCandidateSetRemainImmutable &&
    i232.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i232.holdControlCount === 13 &&
    sameOrderedStrings(i232.holdControlIds, I232_HOLD_CONTROL_IDS) &&
    i232.holdControlsFrozen &&
    i232.productionPolicyExecutionAuthorized === false &&
    i232.actualCompositionPerformedByThisGate === false &&
    i232.multiSourceCompositionAuthorized === false &&
    i232.thresholdRuleCreatedByThisGate === false &&
    i232.damageEvaluationAuthorized === false &&
    i232.classificationAuthorized === false &&
    i232.numericScoringAuthorized === false
  );
}

function exactI248Accepted(
  i248: I248ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluExternalCanonicalWitnessAccessRequirementHoldRecord,
): boolean {
  return (
    i248.status ===
      'RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_EXTERNAL_CANONICAL_WITNESS_ACCESS_REQUIREMENT_HOLD_RECORD' &&
    i248.decision ===
      'YUDING_SUIJINLU_CANONICAL_WITNESS_AUTOMATED_PUBLIC_ACQUISITION_ON_HOLD_THREE_RESUME_TRIGGERS_FROZEN_THREE_AUTHORITY_BLOCKING_RESIDUALS_REMAIN_THREE_SCAN_SURFACES_PRESERVED_AS_CONTEXT_NO_EXHAUSTION_NO_ADJUDICATION_NO_PROMOTION' &&
    i248.exactI247BoundaryAccepted &&
    i248.holdState === 'HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_OR_PUBLIC_PRIMARY_CANONICAL_WITNESS_ACCESS_EVIDENCE' &&
    i248.authorityBlockingResidualCount === 3 &&
    i248.blockingResidualsResolvedByHoldCount === 0 &&
    i248.legacyFormalAdmissibilityGapCount === 4 &&
    i248.nonBlockingUnresolvedContextCount === 2 &&
    i248.observedScanSurfaceCountPreservedAsContext === 3 &&
    i248.automatedPublicAcquisitionBoundaryAccepted &&
    i248.automatedPublicAcquisitionHoldActive &&
    i248.automatedPublicResearchRetired === false &&
    i248.equivalentAutomatedPublicRepeatAuthorizedAsProgress === false &&
    i248.holdCreatesNegativeFinding === false &&
    i248.holdEstablishesTargetedDiscoveryExhaustion === false &&
    i248.holdEstablishesOnlineCorpusExhaustion === false &&
    i248.holdEstablishesCorpusExhaustion === false &&
    i248.holdEstablishesNonexistence === false &&
    i248.universalNoFurtherEvidenceClaimEstablished === false &&
    i248.resumeTriggerCount === 3 &&
    sameOrderedStrings(i248.resumeTriggerIds, I248_RESUME_TRIGGER_IDS) &&
    i248.resumeTriggersFrozen &&
    i248.materiallyNewExternalOrPublicPrimaryEvidenceRequiredToResume &&
    i248.newlyPublicPrimaryWitnessMaySatisfyResumeTrigger &&
    i248.resumeTriggerSatisfiedByThisGate === false &&
    i248.externalEvidenceIngestionExecutedByThisGate === false &&
    i248.externalContactOrCustodianActionAuthorizedByThisGate === false &&
    i248.externalContactOrCustodianActionExecutedByThisGate === false &&
    i248.separateExplicitAuthorityRequiredForExternalContactOrCustodianAction &&
    i248.authorityGap === 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' &&
    i248.authorityGapClosed === false &&
    i248.authorityPromotedByThisGate === false &&
    i248.competingRelationSettlementResolved === false &&
    i248.candidateSetMutatedByThisGate === false &&
    i248.evidenceRebindingMethodologicallyReady === false &&
    i248.evidenceRebindingAuthorizedByThisGate === false &&
    i248.evidenceRebindingExecutedByThisGate === false &&
    i248.provenanceIndependenceAdjudicatedByThisGate === false &&
    i248.derivativeRelationshipAdjudicatedByThisGate === false &&
    i248.hiddenStemI232HoldPreserved &&
    i248.hiddenStemTrackReopenedByThisGate === false &&
    i248.quWei2001HoldPreserved &&
    i248.li1998SameTargetPathSuspendedNotRetired &&
    i248.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i248.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i248.currentV2PackageAndCandidateSetRemainImmutable &&
    i248.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i248.holdControlCount === 13 &&
    sameOrderedStrings(i248.holdControlIds, I248_HOLD_CONTROL_IDS) &&
    i248.holdControlsFrozen &&
    i248.actualCompositionPerformedByThisGate === false &&
    i248.multiSourceCompositionAuthorized === false &&
    i248.thresholdRuleCreatedByThisGate === false &&
    i248.damageEvaluationAuthorized === false &&
    i248.classificationAuthorized === false &&
    i248.numericScoringAuthorized === false &&
    i248.productionPolicyExecutionAuthorized === false
  );
}

function buildTrackFrontiers(accepted: boolean): readonly I249TrackFrontierRecord[] {
  if (!accepted) return Object.freeze([]);

  const common = {
    equivalentRepeatAllowed: false as const,
    repositoryOnlyRepackagingMayCreateAuthority: false as const,
    externalContactAuthorized: false as const,
    separateExplicitAuthorityRequiredForExternalContact: true as const,
    candidateMutationAllowed: false as const,
    rebindingAllowed: false as const,
    provenanceIndependenceAdjudicationAllowed: false as const,
    productionAuthorityImpact: 'NONE' as const,
  };

  return Object.freeze([
    {
      trackId: 'LI_1998_DIRECT_PRIMARY',
      upstreamTerminalGate: 'I187',
      currentState: 'SUSPENDED_NOT_RETIRED',
      unresolvedAuthorityGapKeys: Object.freeze([
        'publicationMediumOrEntityGapStillOpen',
        'canonicalDigitalWitnessNormalizationGapStillOpen',
      ]),
      resumeTriggerIds: I249_LI_1998_RESUME_TRIGGER_IDS,
      ...common,
    },
    {
      trackId: 'QU_WEI_2001_CANONICAL_WITNESS',
      upstreamTerminalGate: 'I211',
      currentState: 'HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_ACCESS_EVIDENCE',
      unresolvedAuthorityGapKeys: Object.freeze([
        'QU_WEI_2001_CANONICAL_WITNESS_NORMALIZATION_GAP',
        'QU_WEI_2001_EXACT_TARGET_PASSAGE_BINDING_GAP',
      ]),
      resumeTriggerIds: I211_RESUME_TRIGGER_IDS,
      ...common,
    },
    {
      trackId: 'SOURCE_KE_HIDDEN_STEM_TARGET_ORIGIN',
      upstreamTerminalGate: 'I232',
      currentState: 'HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_ACCESS_EVIDENCE',
      unresolvedAuthorityGapKeys: Object.freeze([
        'TARGET_ORIGINAL_AUTHORSHIP_UNRESOLVED',
        'TARGET_DOCTRINAL_LINEAGE_UNRESOLVED',
        'TARGET_PRIOR_SOURCE_DEPENDENCY_UNRESOLVED',
        'RESTRICTIVE_DOCTRINE_SCHOOL_BOUNDARY_UNRESOLVED',
      ]),
      resumeTriggerIds: I232_RESUME_TRIGGER_IDS,
      ...common,
    },
    {
      trackId: 'YUDING_SUIJINLU_CANONICAL_WITNESS',
      upstreamTerminalGate: 'I248',
      currentState: 'HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_OR_PUBLIC_PRIMARY_CANONICAL_WITNESS_ACCESS_EVIDENCE',
      unresolvedAuthorityGapKeys: Object.freeze([
        'YUDING_SUIJINLU_PRIMARY_SOURCE_IDENTITY_AND_CUSTODIAN_BINDING_GAP',
        'YUDING_SUIJINLU_CANONICAL_EXACT_TARGET_PASSAGE_FACSIMILE_GAP',
        'YUDING_SUIJINLU_TARGET_PASSAGE_FINAL_NORMATIVE_ADMISSIBILITY_GAP',
      ]),
      resumeTriggerIds: I248_RESUME_TRIGGER_IDS,
      ...common,
    },
  ]);
}

function finalized(
  material: Omit<I249MultiTrackTerminalEvidenceAccessBoundaryReconciliationActiveFrontierSelectionReviewReport, 'reviewId'>,
): I249MultiTrackTerminalEvidenceAccessBoundaryReconciliationActiveFrontierSelectionReviewReport {
  return {
    reviewId: `i249_multi_track_terminal_frontier_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI249MultiTrackTerminalEvidenceAccessBoundaryReconciliationActiveFrontierSelectionReview(
  i187: I187Li1998DirectPrimaryAcquisitionEvidenceAdequacyRemediationPathReassessmentReviewReport,
  i211: I211QuWei2001ExternalCustodianAccessRequirementHoldRecord,
  i232: I232SourceKeHiddenStemInteractionEligibilityTargetOriginExternalArchivalCanonicalCustodianAccessRequirementHoldRecord,
  i248: I248ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluExternalCanonicalWitnessAccessRequirementHoldRecord,
): I249MultiTrackTerminalEvidenceAccessBoundaryReconciliationActiveFrontierSelectionReviewReport {
  const exactI187LiBoundaryAccepted = exactI187Accepted(i187);
  const exactI211QuWeiBoundaryAccepted = exactI211Accepted(i211);
  const exactI232HiddenStemBoundaryAccepted = exactI232Accepted(i232);
  const exactI248YudingSuijinluBoundaryAccepted = exactI248Accepted(i248);
  const accepted =
    exactI187LiBoundaryAccepted &&
    exactI211QuWeiBoundaryAccepted &&
    exactI232HiddenStemBoundaryAccepted &&
    exactI248YudingSuijinluBoundaryAccepted;

  return finalized({
    reviewVersion: I249_MULTI_TRACK_TERMINAL_EVIDENCE_ACCESS_BOUNDARY_RECONCILIATION_ACTIVE_FRONTIER_SELECTION_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_MULTI_TRACK_TERMINAL_EVIDENCE_ACCESS_BOUNDARY_RECONCILIATION_ACTIVE_FRONTIER_SELECTION_REVIEW'
      : 'MULTI_TRACK_TERMINAL_BOUNDARY_INVALID',
    decision: accepted
      ? 'NO_CURRENTLY_ACTIONABLE_EQUIVALENT_PUBLIC_OR_REPOSITORY_ONLY_AUTHORITY_REMEDIATION_FRONTIER_FOUR_TRACKS_TRIGGER_GATED_ONE_SUSPENDED_THREE_HOLD_NO_EXHAUSTION_NO_NEGATIVE_FINDING_NO_AUTHORITY_PROMOTION'
      : 'MULTI_TRACK_ACTIVE_FRONTIER_SELECTION_NOT_READY',
    upstreamI187ReviewId: i187.reviewId,
    upstreamI211HoldRecordId: i211.holdRecordId,
    upstreamI232HoldRecordId: i232.holdRecordId,
    upstreamI248HoldRecordId: i248.holdRecordId,
    exactI187LiBoundaryAccepted,
    exactI211QuWeiBoundaryAccepted,
    exactI232HiddenStemBoundaryAccepted,
    exactI248YudingSuijinluBoundaryAccepted,
    allTerminalTrackBoundariesAccepted: accepted,
    trackFrontiers: buildTrackFrontiers(accepted),
    trackCount: accepted ? 4 : 0,
    actionableEquivalentPublicRemediationFrontierCount: 0,
    actionableRepositoryOnlyAuthorityFrontierCount: 0,
    materiallyNewEvidenceTriggerDependentFrontierCount: accepted ? 4 : 0,
    suspendedNotRetiredFrontierCount: accepted ? 1 : 0,
    holdFrontierCount: accepted ? 3 : 0,
    authorityProgressViaEquivalentRepeatAvailable: false,
    authorityProgressViaRepositoryOnlyRepackagingAvailable: false,
    globalCorpusExhaustionEstablished: false,
    sourceNonexistenceEstablished: false,
    globalNegativeFindingEstablished: false,
    universalNoFurtherEvidenceClaimEstablished: false,
    crossTrackEvidencePoolingAuthorized: false,
    crossTrackAuthorityLaunderingAuthorized: false,
    externalContactAuthorizedByThisGate: false,
    separateExplicitAuthorityRequiredForExternalContact: true,
    newStageCreationRequiresMateriallyNewEvidenceOrGenuinelyNewNonEquivalentMethodologicalFrontier: accepted,
    genuinelyNewNonEquivalentMethodologicalFrontierMayProceedUnderSeparateGate: accepted,
    productizationInventoryReviewMayProceedWithoutAuthorityPromotion: accepted,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    li1998SameTargetPathSuspendedNotRetired: exactI187LiBoundaryAccepted,
    quWei2001HoldPreserved: exactI211QuWeiBoundaryAccepted,
    hiddenStemI232HoldPreserved: exactI232HiddenStemBoundaryAccepted,
    hiddenStemTrackReopenedByThisGate: false,
    yudingSuijinluI248HoldPreserved: exactI248YudingSuijinluBoundaryAccepted,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    candidateRegisteredByThisGate: false,
    candidateSelectedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    derivativeRelationshipAdjudicatedByThisGate: false,
    authorityAcquiredByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    frontierControlIds: accepted ? I249_FRONTIER_CONTROL_IDS : Object.freeze([]),
    frontierControlCount: accepted ? 18 : 0,
    frontierControlsFrozen: accepted,
    recommendedNextGate: accepted
      ? 'GOVERNED_ENGINE_REMAINING_PRODUCTIZATION_FRONTIER_INVENTORY_AND_PRIORITY_REVIEW'
      : 'MULTI_TRACK_TERMINAL_EVIDENCE_ACCESS_BOUNDARY_RECONCILIATION_ACTIVE_FRONTIER_SELECTION_REVIEW',
    nextGateActivationCondition: accepted
      ? 'FOUR_TRIGGER_GATED_AUTHORITY_REMEDIATION_TRACKS_RECONCILED_NO_EQUIVALENT_PUBLIC_OR_REPOSITORY_ONLY_FRONTIER_ACTIONABLE'
      : 'UPSTREAM_TERMINAL_BOUNDARY_NOT_ACCEPTED',
    notes: Object.freeze(
      accepted
        ? [
            'The four current authority-remediation tracks are trigger-gated: Li 1998 remains suspended-not-retired, while Qu Wei 2001, hidden-stem target-origin and Yuding Suijinlu remain on HOLD.',
            'No equivalent public-search repetition or repository-only repackaging is currently an actionable authority-remediation frontier; this is a methodological routing result, not corpus exhaustion, source nonexistence or negative evidence.',
            'A genuinely new non-equivalent methodological frontier may be reviewed separately. Productization-frontier inventory may proceed only as an inventory/prioritization gate and does not authorize production interpretation, scoring or blocked authority use.',
          ]
        : ['At least one upstream terminal/suspended boundary was invalid; no global frontier selection is established.'],
    ),
  });
}
