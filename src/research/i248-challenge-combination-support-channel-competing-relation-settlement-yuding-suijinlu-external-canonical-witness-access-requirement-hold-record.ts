import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I247_EXTERNAL_ACCESS_REQUIREMENT_IDS,
  I247_REASSESSMENT_CONTROL_IDS,
  type I247ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalWitnessAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport,
} from './i247-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-canonical-witness-acquisition-evidence-adequacy-external-access-reassessment-review.js';
import { I244_AUTHORITY_BLOCKING_RESIDUAL_IDS, I244_NON_BLOCKING_UNRESOLVED_CONTEXT_IDS } from './i244-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-canonical-provenance-acquisition-evidence-adequacy-residual-gap-reassessment-review.js';
import { I241_REMAINING_ADMISSIBILITY_GAP_IDS } from './i241-challenge-combination-support-channel-competing-relation-settlement-three-residual-targeted-discovery-evidence-adequacy-source-relationship-admissibility-reassessment-review.js';

export const I248_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_EXTERNAL_CANONICAL_WITNESS_ACCESS_REQUIREMENT_HOLD_RECORD_VERSION =
  'myeonghwa-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-external-canonical-witness-access-requirement-hold-record-v1';

export const I248_RESUME_TRIGGER_IDS = I247_EXTERNAL_ACCESS_REQUIREMENT_IDS;
export type I248ResumeTriggerId = (typeof I248_RESUME_TRIGGER_IDS)[number];

export const I248_HOLD_CONTROL_IDS = Object.freeze([
  'EXACT_I247_EXTERNAL_ACCESS_BOUNDARY_REQUIRED',
  'THREE_AUTHORITY_BLOCKING_RESIDUALS_MUST_REMAIN_OPEN',
  'FOUR_LEGACY_GAPS_AND_TWO_NON_BLOCKING_CONTEXTS_MUST_REMAIN_UNCHANGED',
  'EQUIVALENT_AUTOMATED_PUBLIC_ACQUISITION_MUST_REMAIN_ON_HOLD',
  'HOLD_MUST_NOT_BE_RELABELED_AS_RETIREMENT_EXHAUSTION_NONEXISTENCE_OR_NEGATIVE_EVIDENCE',
  'RESUME_REQUIRES_ONE_MATERIALLY_NEW_PRIMARY_CUSTODIAN_OR_VERIFIED_2011_PAGE_TRIGGER',
  'A_RESUME_TRIGGER_MAY_START_EVIDENCE_INGESTION_READINESS_BUT_MUST_NOT_ITSELF_CLOSE_ANY_GAP',
  'NEWLY_PUBLIC_PRIMARY_WITNESS_MAY_SATISFY_TRIGGER_WITHOUT_EXTERNAL_CONTACT',
  'FINAL_NORMATIVE_ADMISSIBILITY_REMAINS_DOWNSTREAM_OF_IDENTITY_AND_EXACT_PASSAGE',
  'NO_REBINDING_PROVENANCE_INDEPENDENCE_OR_BROADER_DERIVATIVE_ADJUDICATION_ON_HOLD',
  'I132_I232_QU_WEI_LI1998_V2_GUARDS_MUST_REMAIN_UNCHANGED',
  'EXTERNAL_CONTACT_OR_CUSTODIAN_ACTION_REQUIRES_SEPARATE_EXPLICIT_AUTHORITY',
  'NO_COMPOSITION_THRESHOLD_DAMAGE_CLASSIFICATION_SCORING_OR_PRODUCTION_AUTHORITY',
] as const);
export type I248HoldControlId = (typeof I248_HOLD_CONTROL_IDS)[number];

export interface I248ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluExternalCanonicalWitnessAccessRequirementHoldRecord {
  holdRecordId: string;
  holdVersion: string;
  status:
    | 'RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_EXTERNAL_CANONICAL_WITNESS_ACCESS_REQUIREMENT_HOLD_RECORD'
    | 'I247_EXTERNAL_ACCESS_REASSESSMENT_BOUNDARY_INVALID';
  decision:
    | 'YUDING_SUIJINLU_CANONICAL_WITNESS_AUTOMATED_PUBLIC_ACQUISITION_ON_HOLD_THREE_RESUME_TRIGGERS_FROZEN_THREE_AUTHORITY_BLOCKING_RESIDUALS_REMAIN_THREE_SCAN_SURFACES_PRESERVED_AS_CONTEXT_NO_EXHAUSTION_NO_ADJUDICATION_NO_PROMOTION'
    | 'YUDING_SUIJINLU_EXTERNAL_CANONICAL_WITNESS_ACCESS_HOLD_NOT_ESTABLISHED';
  upstreamI247ReviewId: string;
  exactI247BoundaryAccepted: boolean;
  holdState: 'HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_OR_PUBLIC_PRIMARY_CANONICAL_WITNESS_ACCESS_EVIDENCE' | 'NOT_ESTABLISHED';
  targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT';
  authorityBlockingResidualIds: readonly string[];
  authorityBlockingResidualCount: 3 | 0;
  blockingResidualsResolvedByHoldCount: 0;
  legacyFormalAdmissibilityGapIds: readonly string[];
  legacyFormalAdmissibilityGapCount: 4 | 0;
  nonBlockingUnresolvedContextIds: readonly string[];
  nonBlockingUnresolvedContextCount: 2 | 0;
  observedScanSurfaceCountPreservedAsContext: 3 | 0;
  scanSurfacesMayEstablishCanonicalAuthority: false;
  automatedPublicAcquisitionBoundaryAccepted: boolean;
  automatedPublicAcquisitionHoldActive: boolean;
  automatedPublicResearchRetired: false;
  equivalentAutomatedPublicRepeatAuthorizedAsProgress: false;
  holdCreatesNegativeFinding: false;
  holdEstablishesTargetedDiscoveryExhaustion: false;
  holdEstablishesOnlineCorpusExhaustion: false;
  holdEstablishesCorpusExhaustion: false;
  holdEstablishesNonexistence: false;
  universalNoFurtherEvidenceClaimEstablished: false;
  resumeTriggerIds: readonly I248ResumeTriggerId[];
  resumeTriggerCount: 3 | 0;
  resumeTriggersFrozen: boolean;
  materiallyNewExternalOrPublicPrimaryEvidenceRequiredToResume: boolean;
  custodianCatalogOrShelfmarkTriggerOpen: boolean;
  palaceOrAuthorizedFacsimileExactPassageTriggerOpen: boolean;
  verified2011EditionExactPageTriggerOpen: boolean;
  newlyPublicPrimaryWitnessMaySatisfyResumeTrigger: boolean;
  oneResumeTriggerMayStartEvidenceIngestionReadinessReview: boolean;
  resumeTriggerSatisfiedByThisGate: false;
  externalEvidenceIngestionExecutedByThisGate: false;
  finalNormativeAdmissibilityRemainsDownstream: boolean;
  externalContactOrCustodianActionAuthorizedByThisGate: false;
  externalContactOrCustodianActionExecutedByThisGate: false;
  separateExplicitAuthorityRequiredForExternalContactOrCustodianAction: boolean;
  authorityGap: 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' | 'UPSTREAM_INVALID';
  authorityGapClosed: false;
  authorityPromotedByThisGate: false;
  competingRelationSettlementResolved: false;
  crossRelationPrecedenceAuthorized: false;
  multiTouchAggregationAuthorized: false;
  candidateRegisteredByThisGate: false;
  candidateSelectedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  evidenceRebindingMethodologicallyReady: false;
  evidenceRebindingAuthorizedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  derivativeRelationshipAdjudicatedByThisGate: false;
  hiddenStemI232HoldPreserved: boolean;
  hiddenStemTrackReopenedByThisGate: false;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  quWei2001HoldPreserved: boolean;
  li1998SameTargetPathSuspendedNotRetired: boolean;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  holdControlIds: readonly I248HoldControlId[];
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
    | 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_EXTERNAL_CANONICAL_WITNESS_EVIDENCE_INGESTION_READINESS_REVIEW'
    | 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_EXTERNAL_CANONICAL_WITNESS_ACCESS_REQUIREMENT_HOLD_RECORD';
  nextGateActivationCondition:
    | 'MATERIALLY_NEW_EXTERNAL_OR_PUBLIC_PRIMARY_CANONICAL_WITNESS_TRIGGER_REQUIRED'
    | 'I247_BOUNDARY_NOT_ACCEPTED';
  notes: readonly string[];
}

function exactI247Accepted(
  i247: I247ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalWitnessAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport,
): boolean {
  return (
    i247.status === 'RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_CANONICAL_WITNESS_ACQUISITION_EVIDENCE_ADEQUACY_EXTERNAL_ACCESS_REASSESSMENT_REVIEW' &&
    i247.decision === 'I246_EVIDENCE_ADEQUATE_FOR_THREE_UNRESOLVED_AUTHORITY_BLOCKING_RESIDUALS_THREE_SCAN_SURFACES_ACCEPTED_AS_CONTEXT_ZERO_QUALIFYING_CANONICAL_WITNESSES_AUTOMATED_PUBLIC_ACQUISITION_BOUNDARY_REACHED_MATERIALLY_NEW_PRIMARY_CUSTODIAN_OR_VERIFIED_2011_PAGE_ACCESS_REQUIRED_NO_EXHAUSTION_NO_NEGATIVE_FINDING_NO_PROMOTION' &&
    i247.exactI246BoundaryAccepted &&
    i247.i246EvidenceAdequateForRecordedUnresolvedFindings &&
    i247.qualifyingCanonicalWitnessCountAccepted === 0 &&
    i247.userUploadedOrSharedScanSurfaceCountAccepted === 3 &&
    i247.scanSurfacesAcceptedAsContextOnly &&
    i247.scanSurfacesMayEstablishPrimaryCustodianAuthority === false &&
    i247.authorityBlockingResidualCount === 3 &&
    i247.authorityBlockingResidualIds.length === I244_AUTHORITY_BLOCKING_RESIDUAL_IDS.length &&
    i247.authorityBlockingResidualIds.every((id, index) => id === I244_AUTHORITY_BLOCKING_RESIDUAL_IDS[index]) &&
    i247.residualsResolvedByReassessmentCount === 0 &&
    i247.legacyFormalAdmissibilityGapCount === 4 &&
    i247.legacyFormalAdmissibilityGapIds.length === I241_REMAINING_ADMISSIBILITY_GAP_IDS.length &&
    i247.legacyFormalAdmissibilityGapIds.every((id, index) => id === I241_REMAINING_ADMISSIBILITY_GAP_IDS[index]) &&
    i247.nonBlockingUnresolvedContextCount === 2 &&
    i247.nonBlockingUnresolvedContextIds.length === I244_NON_BLOCKING_UNRESOLVED_CONTEXT_IDS.length &&
    i247.nonBlockingUnresolvedContextIds.every((id, index) => id === I244_NON_BLOCKING_UNRESOLVED_CONTEXT_IDS[index]) &&
    i247.automatedPublicAcquisitionContinuationMethodologicallyJustified === false &&
    i247.automatedPublicAcquisitionBoundaryReached &&
    i247.materiallyNewPrimaryCustodianOrVerifiedEditionAccessRequired &&
    i247.externalOrManualAccessRequiredForFurtherGapResolution &&
    i247.newlyAvailablePublicPrimaryWitnessMaySatisfyTrigger &&
    i247.externalAccessRequirementCount === 3 &&
    i247.externalAccessRequirementIds.length === I247_EXTERNAL_ACCESS_REQUIREMENT_IDS.length &&
    i247.externalAccessRequirementIds.every((id, index) => id === I247_EXTERNAL_ACCESS_REQUIREMENT_IDS[index]) &&
    i247.externalAccessRequirementsFrozenProspectively &&
    i247.custodianCatalogOrShelfmarkRequirementOpen &&
    i247.palaceOrAuthorizedFacsimileExactPassageRequirementOpen &&
    i247.verified2011EditionExactPageRequirementOpen &&
    i247.finalNormativeAdmissibilityRemainsDownstream &&
    i247.externalCustodianContactAuthorizedByThisGate === false &&
    i247.externalCustodianContactExecutedByThisGate === false &&
    i247.publicBoundaryCreatesNegativeFinding === false &&
    i247.officialSearchSilenceCreatesNegativeFinding === false &&
    i247.scanSurfaceAccessLimitationsCreateNegativeFinding === false &&
    i247.targetedDiscoveryExhaustionEstablished === false &&
    i247.onlineCorpusExhaustionEstablished === false &&
    i247.corpusExhaustionEstablished === false &&
    i247.universalNoFurtherEvidenceClaimEstablished === false &&
    i247.authorityGap === 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' &&
    i247.authorityGapClosed === false &&
    i247.authorityPromotedByThisGate === false &&
    i247.competingRelationSettlementResolved === false &&
    i247.candidateRegisteredByThisGate === false &&
    i247.candidateSelectedByThisGate === false &&
    i247.candidateSetMutatedByThisGate === false &&
    i247.evidenceRebindingAuthorizedByThisGate === false &&
    i247.provenanceIndependenceAdjudicatedByThisGate === false &&
    i247.derivativeRelationshipAdjudicatedByThisGate === false &&
    i247.hiddenStemI232HoldPreserved &&
    i247.hiddenStemTrackReopenedByThisGate === false &&
    i247.quWei2001HoldPreserved &&
    i247.li1998SameTargetPathSuspendedNotRetired &&
    i247.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i247.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i247.currentV2PackageAndCandidateSetRemainImmutable &&
    i247.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i247.reassessmentControlCount === 14 &&
    i247.reassessmentControlIds.length === I247_REASSESSMENT_CONTROL_IDS.length &&
    i247.reassessmentControlIds.every((id, index) => id === I247_REASSESSMENT_CONTROL_IDS[index]) &&
    i247.reassessmentControlsFrozen &&
    i247.actualCompositionPerformedByThisGate === false &&
    i247.multiSourceCompositionAuthorized === false &&
    i247.thresholdRuleCreatedByThisGate === false &&
    i247.damageEvaluationAuthorized === false &&
    i247.classificationAuthorized === false &&
    i247.numericScoringAuthorized === false &&
    i247.productionPolicyExecutionAuthorized === false &&
    i247.recommendedNextGate === 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_EXTERNAL_CANONICAL_WITNESS_ACCESS_REQUIREMENT_HOLD_RECORD'
  );
}

function finalized(
  material: Omit<I248ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluExternalCanonicalWitnessAccessRequirementHoldRecord, 'holdRecordId'>,
): I248ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluExternalCanonicalWitnessAccessRequirementHoldRecord {
  return {
    holdRecordId: `i248_yuding_suijinlu_external_access_hold_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI248ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluExternalCanonicalWitnessAccessRequirementHoldRecord(
  i247: I247ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluCanonicalWitnessAcquisitionEvidenceAdequacyExternalAccessReassessmentReviewReport,
): I248ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluExternalCanonicalWitnessAccessRequirementHoldRecord {
  const accepted = exactI247Accepted(i247);
  return finalized({
    holdVersion: I248_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_EXTERNAL_CANONICAL_WITNESS_ACCESS_REQUIREMENT_HOLD_RECORD_VERSION,
    status: accepted
      ? 'RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_EXTERNAL_CANONICAL_WITNESS_ACCESS_REQUIREMENT_HOLD_RECORD'
      : 'I247_EXTERNAL_ACCESS_REASSESSMENT_BOUNDARY_INVALID',
    decision: accepted
      ? 'YUDING_SUIJINLU_CANONICAL_WITNESS_AUTOMATED_PUBLIC_ACQUISITION_ON_HOLD_THREE_RESUME_TRIGGERS_FROZEN_THREE_AUTHORITY_BLOCKING_RESIDUALS_REMAIN_THREE_SCAN_SURFACES_PRESERVED_AS_CONTEXT_NO_EXHAUSTION_NO_ADJUDICATION_NO_PROMOTION'
      : 'YUDING_SUIJINLU_EXTERNAL_CANONICAL_WITNESS_ACCESS_HOLD_NOT_ESTABLISHED',
    upstreamI247ReviewId: i247.reviewId,
    exactI247BoundaryAccepted: accepted,
    holdState: accepted ? 'HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_OR_PUBLIC_PRIMARY_CANONICAL_WITNESS_ACCESS_EVIDENCE' : 'NOT_ESTABLISHED',
    targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT',
    authorityBlockingResidualIds: accepted ? I244_AUTHORITY_BLOCKING_RESIDUAL_IDS : Object.freeze([]),
    authorityBlockingResidualCount: accepted ? 3 : 0,
    blockingResidualsResolvedByHoldCount: 0,
    legacyFormalAdmissibilityGapIds: accepted ? I241_REMAINING_ADMISSIBILITY_GAP_IDS : Object.freeze([]),
    legacyFormalAdmissibilityGapCount: accepted ? 4 : 0,
    nonBlockingUnresolvedContextIds: accepted ? I244_NON_BLOCKING_UNRESOLVED_CONTEXT_IDS : Object.freeze([]),
    nonBlockingUnresolvedContextCount: accepted ? 2 : 0,
    observedScanSurfaceCountPreservedAsContext: accepted ? 3 : 0,
    scanSurfacesMayEstablishCanonicalAuthority: false,
    automatedPublicAcquisitionBoundaryAccepted: accepted,
    automatedPublicAcquisitionHoldActive: accepted,
    automatedPublicResearchRetired: false,
    equivalentAutomatedPublicRepeatAuthorizedAsProgress: false,
    holdCreatesNegativeFinding: false,
    holdEstablishesTargetedDiscoveryExhaustion: false,
    holdEstablishesOnlineCorpusExhaustion: false,
    holdEstablishesCorpusExhaustion: false,
    holdEstablishesNonexistence: false,
    universalNoFurtherEvidenceClaimEstablished: false,
    resumeTriggerIds: accepted ? I248_RESUME_TRIGGER_IDS : Object.freeze([]),
    resumeTriggerCount: accepted ? 3 : 0,
    resumeTriggersFrozen: accepted,
    materiallyNewExternalOrPublicPrimaryEvidenceRequiredToResume: accepted,
    custodianCatalogOrShelfmarkTriggerOpen: accepted,
    palaceOrAuthorizedFacsimileExactPassageTriggerOpen: accepted,
    verified2011EditionExactPageTriggerOpen: accepted,
    newlyPublicPrimaryWitnessMaySatisfyResumeTrigger: accepted,
    oneResumeTriggerMayStartEvidenceIngestionReadinessReview: accepted,
    resumeTriggerSatisfiedByThisGate: false,
    externalEvidenceIngestionExecutedByThisGate: false,
    finalNormativeAdmissibilityRemainsDownstream: accepted,
    externalContactOrCustodianActionAuthorizedByThisGate: false,
    externalContactOrCustodianActionExecutedByThisGate: false,
    separateExplicitAuthorityRequiredForExternalContactOrCustodianAction: accepted,
    authorityGap: accepted ? 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' : 'UPSTREAM_INVALID',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    competingRelationSettlementResolved: false,
    crossRelationPrecedenceAuthorized: false,
    multiTouchAggregationAuthorized: false,
    candidateRegisteredByThisGate: false,
    candidateSelectedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    derivativeRelationshipAdjudicatedByThisGate: false,
    hiddenStemI232HoldPreserved: accepted,
    hiddenStemTrackReopenedByThisGate: false,
    hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    quWei2001HoldPreserved: accepted,
    li1998SameTargetPathSuspendedNotRetired: accepted,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    holdControlIds: accepted ? I248_HOLD_CONTROL_IDS : Object.freeze([]),
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
      ? 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_EXTERNAL_CANONICAL_WITNESS_EVIDENCE_INGESTION_READINESS_REVIEW'
      : 'COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_EXTERNAL_CANONICAL_WITNESS_ACCESS_REQUIREMENT_HOLD_RECORD',
    nextGateActivationCondition: accepted
      ? 'MATERIALLY_NEW_EXTERNAL_OR_PUBLIC_PRIMARY_CANONICAL_WITNESS_TRIGGER_REQUIRED'
      : 'I247_BOUNDARY_NOT_ACCEPTED',
    notes: accepted
      ? Object.freeze([
          'I248 places equivalent automated public acquisition on HOLD. It does not retire the research path and does not claim the relevant sources do not exist.',
          'Any one frozen trigger may start an evidence-ingestion readiness review, but the trigger itself closes no residual, formal gap, provenance question or authority gap.',
          'A newly available public primary/custodian witness can satisfy a resume trigger without direct institutional contact.',
          'Direct contact, purchase, archive request, library request or other custodian action remains outside this HOLD and requires separate explicit authority.',
          'All existing I132, I232, Qu Wei, Li 1998 and v2 guards remain unchanged while this independent competing-relation track is on HOLD.',
        ])
      : Object.freeze(['I248 fails closed unless I247 establishes the automated-public acquisition boundary, retains three blocking residuals and freezes exactly three materially-new access requirements without exhaustion or promotion.']),
  });
}
