import { describe, expect, it } from 'vitest';
import {
  I187_REASSESSMENT_REQUIREMENT_IDS,
  type I187Li1998DirectPrimaryAcquisitionEvidenceAdequacyRemediationPathReassessmentReviewReport,
} from '../src/research/i187-li-1998-direct-primary-acquisition-evidence-adequacy-remediation-path-reassessment-review.js';
import {
  I211_HOLD_CONTROL_IDS,
  I211_RESUME_TRIGGER_IDS,
  type I211QuWei2001ExternalCustodianAccessRequirementHoldRecord,
} from '../src/research/i211-qu-wei-2001-external-custodian-access-requirement-hold-record.js';
import {
  I232_HOLD_CONTROL_IDS,
  I232_RESUME_TRIGGER_IDS,
  type I232SourceKeHiddenStemInteractionEligibilityTargetOriginExternalArchivalCanonicalCustodianAccessRequirementHoldRecord,
} from '../src/research/i232-source-ke-hidden-stem-interaction-eligibility-target-origin-external-archival-canonical-custodian-access-requirement-hold-record.js';
import {
  I248_HOLD_CONTROL_IDS,
  I248_RESUME_TRIGGER_IDS,
  type I248ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluExternalCanonicalWitnessAccessRequirementHoldRecord,
} from '../src/research/i248-challenge-combination-support-channel-competing-relation-settlement-yuding-suijinlu-external-canonical-witness-access-requirement-hold-record.js';
import {
  I249_FRONTIER_CONTROL_IDS,
  I249_LI_1998_RESUME_TRIGGER_IDS,
  buildI249MultiTrackTerminalEvidenceAccessBoundaryReconciliationActiveFrontierSelectionReview,
} from '../src/research/i249-multi-track-terminal-evidence-access-boundary-reconciliation-active-frontier-selection-review.js';

const validI187 = (): I187Li1998DirectPrimaryAcquisitionEvidenceAdequacyRemediationPathReassessmentReviewReport =>
  ({
    reviewId: 'i187_valid',
    status: 'RESOLVED_LI_1998_DIRECT_PRIMARY_ACQUISITION_EVIDENCE_ADEQUACY_REMEDIATION_PATH_REASSESSMENT_REVIEW',
    decision:
      'I186_EVIDENCE_ADEQUATE_ZERO_QUALIFYING_GAIN_TWO_GAPS_UNRESOLVED_SAME_TARGET_NOT_EXHAUSTED_EQUIVALENT_REPEAT_NOT_JUSTIFIED_THIRD_WAVE_NEW_PROVENANCE_DISCOVERY_READINESS_MAY_PROCEED_NO_REBINDING_NO_POLICY_RELAXATION',
    exactI186BoundaryAccepted: true,
    i186EvidenceAdequateForReassessment: true,
    i186QualifyingAcquisitionCount: 0,
    publicationMediumOrEntityGapStillOpen: true,
    canonicalDigitalWitnessNormalizationGapStillOpen: true,
    sameTargetDirectPrimaryPathExhausted: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    explicitNegativeFindingCount: 0,
    nonAcquisitionCreatesNegativeFinding: false,
    searchSilenceCreatesNegativeFinding: false,
    failedRegistryAccessCreatesNegativeFinding: false,
    failedWitnessAccessCreatesNegativeFinding: false,
    sameTargetDirectPrimaryPathRemainsMethodologicallyOpen: true,
    immediateEquivalentSameTargetRepeatJustified: false,
    materiallyNewDirectLeadRequiredBeforeEquivalentSameTargetRepeat: true,
    materiallyNewDirectLeadMayReturnWorkToSameTargetPath: true,
    currentSameTargetPathSuspendedNotRetired: true,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    candidateSetMutatedByThisGate: false,
    productionPolicyExecutionAuthorized: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    reassessmentRequirementCount: 12,
    reassessmentRequirementIds: I187_REASSESSMENT_REQUIREMENT_IDS,
    reassessmentRequirementsFrozen: true,
  }) as unknown as I187Li1998DirectPrimaryAcquisitionEvidenceAdequacyRemediationPathReassessmentReviewReport;

const validI211 = (): I211QuWei2001ExternalCustodianAccessRequirementHoldRecord =>
  ({
    holdRecordId: 'i211_valid',
    status: 'RESOLVED_QU_WEI_2001_EXTERNAL_CUSTODIAN_ACCESS_REQUIREMENT_HOLD_RECORD',
    decision:
      'QU_WEI_2001_WEB_ONLY_REMEDIATION_ON_HOLD_TWO_EXTERNAL_ACCESS_TRIGGERS_FROZEN_TWO_GAPS_REMAIN_NO_EXHAUSTION_NO_CONTACT_AUTHORIZATION_NO_REBINDING_NO_INDEPENDENCE',
    exactI210BoundaryAccepted: true,
    holdState: 'HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_ACCESS_EVIDENCE',
    resolvedPublicationGapPreserved: true,
    remainingGapCount: 2,
    canonicalWitnessNormalizationGapResolved: false,
    exactTargetPassageBindingGapResolved: false,
    webOnlyAutomatedRemediationHoldActive: true,
    webOnlyAutomatedResearchRetired: false,
    equivalentWebOnlyTargetSurfaceRepeatAuthorizedAsProgress: false,
    holdCreatesNegativeFinding: false,
    holdEstablishesTargetedDiscoveryExhaustion: false,
    holdEstablishesOnlineCorpusExhaustion: false,
    holdEstablishesCorpusExhaustion: false,
    universalNoFurtherEvidenceClaimEstablished: false,
    resumeTriggerCount: 2,
    resumeTriggerIds: I211_RESUME_TRIGGER_IDS,
    resumeTriggersFrozen: true,
    materiallyNewExternalEvidenceRequiredToResume: true,
    resumeTriggerSatisfiedByThisGate: false,
    externalEvidenceIngestionExecutedByThisGate: false,
    officialCustodianContactExecutionAuthorizedByThisGate: false,
    officialCustodianContactExecutedByThisGate: false,
    separateExplicitAuthorityRequiredForCustodianContact: true,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    holdControlCount: 12,
    holdControlIds: I211_HOLD_CONTROL_IDS,
    holdControlsFrozen: true,
    candidateSetMutatedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    liSameTargetPathSuspendedNotRetired: true,
    productionPolicyExecutionAuthorized: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
  }) as unknown as I211QuWei2001ExternalCustodianAccessRequirementHoldRecord;

const validI232 = (): I232SourceKeHiddenStemInteractionEligibilityTargetOriginExternalArchivalCanonicalCustodianAccessRequirementHoldRecord =>
  ({
    holdRecordId: 'i232_valid',
    status:
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_ORIGIN_EXTERNAL_ARCHIVAL_CANONICAL_CUSTODIAN_ACCESS_REQUIREMENT_HOLD_RECORD',
    decision:
      'HIDDEN_STEM_TARGET_ORIGIN_AUTOMATED_PUBLIC_WEB_REMEDIATION_ON_HOLD_THREE_EXTERNAL_ACCESS_TRIGGERS_FROZEN_FOUR_ADMISSIBILITY_GAPS_REMAIN_PRE_TARGET_SAME_TEXT_FAMILY_CONTEXT_PRESERVED_NO_EXHAUSTION_NO_ADJUDICATION_NO_PROMOTION',
    exactI231BoundaryAccepted: true,
    holdState: 'HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_ACCESS_EVIDENCE',
    remainingGapCount: 4,
    gapsResolvedByHoldCount: 0,
    webAccessibleRemediationBoundaryAccepted: true,
    automatedPublicWebRemediationHoldActive: true,
    automatedPublicWebResearchRetired: false,
    equivalentAutomatedPublicWebRepeatAuthorizedAsProgress: false,
    holdCreatesNegativeFinding: false,
    holdEstablishesTargetedDiscoveryExhaustion: false,
    holdEstablishesOnlineCorpusExhaustion: false,
    holdEstablishesCorpusExhaustion: false,
    universalNoFurtherEvidenceClaimEstablished: false,
    resumeTriggerCount: 3,
    resumeTriggerIds: I232_RESUME_TRIGGER_IDS,
    resumeTriggersFrozen: true,
    materiallyNewExternalEvidenceRequiredToResume: true,
    resumeTriggerSatisfiedByThisGate: false,
    externalEvidenceIngestionExecutedByThisGate: false,
    externalContactOrCustodianActionAuthorizedByThisGate: false,
    externalContactOrCustodianActionExecutedByThisGate: false,
    separateExplicitAuthorityRequiredForExternalContactOrCustodianAction: true,
    authorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    derivativeRelationshipAdjudicatedByThisGate: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    quWei2001HoldPreserved: true,
    li1998SameTargetPathSuspendedNotRetired: true,
    candidateSetMutatedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    holdControlCount: 13,
    holdControlIds: I232_HOLD_CONTROL_IDS,
    holdControlsFrozen: true,
    productionPolicyExecutionAuthorized: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
  }) as unknown as I232SourceKeHiddenStemInteractionEligibilityTargetOriginExternalArchivalCanonicalCustodianAccessRequirementHoldRecord;

const validI248 = (): I248ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluExternalCanonicalWitnessAccessRequirementHoldRecord =>
  ({
    holdRecordId: 'i248_valid',
    status:
      'RESOLVED_COMPETING_RELATION_SETTLEMENT_YUDING_SUIJINLU_EXTERNAL_CANONICAL_WITNESS_ACCESS_REQUIREMENT_HOLD_RECORD',
    decision:
      'YUDING_SUIJINLU_CANONICAL_WITNESS_AUTOMATED_PUBLIC_ACQUISITION_ON_HOLD_THREE_RESUME_TRIGGERS_FROZEN_THREE_AUTHORITY_BLOCKING_RESIDUALS_REMAIN_THREE_SCAN_SURFACES_PRESERVED_AS_CONTEXT_NO_EXHAUSTION_NO_ADJUDICATION_NO_PROMOTION',
    exactI247BoundaryAccepted: true,
    holdState: 'HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_OR_PUBLIC_PRIMARY_CANONICAL_WITNESS_ACCESS_EVIDENCE',
    authorityBlockingResidualCount: 3,
    blockingResidualsResolvedByHoldCount: 0,
    legacyFormalAdmissibilityGapCount: 4,
    nonBlockingUnresolvedContextCount: 2,
    observedScanSurfaceCountPreservedAsContext: 3,
    automatedPublicAcquisitionBoundaryAccepted: true,
    automatedPublicAcquisitionHoldActive: true,
    automatedPublicResearchRetired: false,
    equivalentAutomatedPublicRepeatAuthorizedAsProgress: false,
    holdCreatesNegativeFinding: false,
    holdEstablishesTargetedDiscoveryExhaustion: false,
    holdEstablishesOnlineCorpusExhaustion: false,
    holdEstablishesCorpusExhaustion: false,
    holdEstablishesNonexistence: false,
    universalNoFurtherEvidenceClaimEstablished: false,
    resumeTriggerCount: 3,
    resumeTriggerIds: I248_RESUME_TRIGGER_IDS,
    resumeTriggersFrozen: true,
    materiallyNewExternalOrPublicPrimaryEvidenceRequiredToResume: true,
    newlyPublicPrimaryWitnessMaySatisfyResumeTrigger: true,
    resumeTriggerSatisfiedByThisGate: false,
    externalEvidenceIngestionExecutedByThisGate: false,
    externalContactOrCustodianActionAuthorizedByThisGate: false,
    externalContactOrCustodianActionExecutedByThisGate: false,
    separateExplicitAuthorityRequiredForExternalContactOrCustodianAction: true,
    authorityGap: 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    competingRelationSettlementResolved: false,
    candidateSetMutatedByThisGate: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    derivativeRelationshipAdjudicatedByThisGate: false,
    hiddenStemI232HoldPreserved: true,
    hiddenStemTrackReopenedByThisGate: false,
    quWei2001HoldPreserved: true,
    li1998SameTargetPathSuspendedNotRetired: true,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    holdControlCount: 13,
    holdControlIds: I248_HOLD_CONTROL_IDS,
    holdControlsFrozen: true,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
  }) as unknown as I248ChallengeCombinationSupportChannelCompetingRelationSettlementYudingSuijinluExternalCanonicalWitnessAccessRequirementHoldRecord;

const validReport = () =>
  buildI249MultiTrackTerminalEvidenceAccessBoundaryReconciliationActiveFrontierSelectionReview(
    validI187(),
    validI211(),
    validI232(),
    validI248(),
  );

describe('I249 multi-track terminal evidence-access boundary reconciliation and active frontier selection', () => {
  it('reconciles all four boundaries and selects zero actionable equivalent public or repository-only authority frontiers', () => {
    const report = validReport();
    expect(report.status).toBe(
      'RESOLVED_MULTI_TRACK_TERMINAL_EVIDENCE_ACCESS_BOUNDARY_RECONCILIATION_ACTIVE_FRONTIER_SELECTION_REVIEW',
    );
    expect(report.decision).toBe(
      'NO_CURRENTLY_ACTIONABLE_EQUIVALENT_PUBLIC_OR_REPOSITORY_ONLY_AUTHORITY_REMEDIATION_FRONTIER_FOUR_TRACKS_TRIGGER_GATED_ONE_SUSPENDED_THREE_HOLD_NO_EXHAUSTION_NO_NEGATIVE_FINDING_NO_AUTHORITY_PROMOTION',
    );
    expect(report.allTerminalTrackBoundariesAccepted).toBe(true);
    expect(report.trackCount).toBe(4);
    expect(report.actionableEquivalentPublicRemediationFrontierCount).toBe(0);
    expect(report.actionableRepositoryOnlyAuthorityFrontierCount).toBe(0);
    expect(report.materiallyNewEvidenceTriggerDependentFrontierCount).toBe(4);
    expect(report.suspendedNotRetiredFrontierCount).toBe(1);
    expect(report.holdFrontierCount).toBe(3);
  });

  it('preserves one suspended Li track and three distinct HOLD tracks without collapsing their states', () => {
    const report = validReport();
    expect(report.trackFrontiers.map((track) => [track.trackId, track.currentState])).toEqual([
      ['LI_1998_DIRECT_PRIMARY', 'SUSPENDED_NOT_RETIRED'],
      ['QU_WEI_2001_CANONICAL_WITNESS', 'HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_ACCESS_EVIDENCE'],
      ['SOURCE_KE_HIDDEN_STEM_TARGET_ORIGIN', 'HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_ACCESS_EVIDENCE'],
      [
        'YUDING_SUIJINLU_CANONICAL_WITNESS',
        'HOLD_AWAITING_MATERIALLY_NEW_EXTERNAL_OR_PUBLIC_PRIMARY_CANONICAL_WITNESS_ACCESS_EVIDENCE',
      ],
    ]);
    expect(report.li1998SameTargetPathSuspendedNotRetired).toBe(true);
    expect(report.quWei2001HoldPreserved).toBe(true);
    expect(report.hiddenStemI232HoldPreserved).toBe(true);
    expect(report.hiddenStemTrackReopenedByThisGate).toBe(false);
    expect(report.yudingSuijinluI248HoldPreserved).toBe(true);
  });

  it('preserves each track resume trigger set exactly', () => {
    const report = validReport();
    expect(report.trackFrontiers[0]?.resumeTriggerIds).toEqual(I249_LI_1998_RESUME_TRIGGER_IDS);
    expect(report.trackFrontiers[1]?.resumeTriggerIds).toEqual(I211_RESUME_TRIGGER_IDS);
    expect(report.trackFrontiers[2]?.resumeTriggerIds).toEqual(I232_RESUME_TRIGGER_IDS);
    expect(report.trackFrontiers[3]?.resumeTriggerIds).toEqual(I248_RESUME_TRIGGER_IDS);
    expect(I211_RESUME_TRIGGER_IDS).toEqual([
      'SPECIFIC_2001_PHYSICAL_OR_FIRST_GENERATION_TARGET_WITNESS_WITH_DIRECT_CUSTODY_PROVENANCE',
      'CANONICALLY_2001_BOUND_TARGET_SECTION_FACSIMILE_WITH_PAGE_CONTEXT_OR_EQUIVALENT_ANCHORS',
    ]);
    expect(I232_RESUME_TRIGGER_IDS).toEqual([
      'PRE_TARGET_ARCHIVE_CAPTURE_WITH_EXACT_I226_TARGET_PASSAGE_AND_SOURCE_IDENTITY',
      'AUTHOR_CONTROLLED_OR_CANONICAL_SOURCE_WITH_EXPLICIT_ORIGINAL_AUTHORSHIP_OR_LINEAGE',
      'CUSTODIAN_BOUND_BOOK_OR_COURSE_FACSIMILE_WITH_EXACT_TARGET_PASSAGE',
    ]);
    expect(I248_RESUME_TRIGGER_IDS).toEqual([
      'PALACE_MANUSCRIPT_CUSTODIAN_CATALOG_OR_SHELFMARK_RECORD',
      'PALACE_MANUSCRIPT_OR_AUTHORIZED_FACSIMILE_WITH_EXACT_TARGET_PASSAGE',
      'VERIFIED_2011_HUALING_PRINT_PAGE_WITH_EXACT_TARGET_PASSAGE_AND_EDITION_IDENTITY',
    ]);
  });

  it('blocks equivalent-repeat and repository-only authority laundering while allowing only genuinely new frontier routing', () => {
    const report = validReport();
    expect(report.authorityProgressViaEquivalentRepeatAvailable).toBe(false);
    expect(report.authorityProgressViaRepositoryOnlyRepackagingAvailable).toBe(false);
    expect(report.trackFrontiers.every((track) => track.equivalentRepeatAllowed === false)).toBe(true);
    expect(report.trackFrontiers.every((track) => track.repositoryOnlyRepackagingMayCreateAuthority === false)).toBe(true);
    expect(report.newStageCreationRequiresMateriallyNewEvidenceOrGenuinelyNewNonEquivalentMethodologicalFrontier).toBe(true);
    expect(report.genuinelyNewNonEquivalentMethodologicalFrontierMayProceedUnderSeparateGate).toBe(true);
    expect(report.productizationInventoryReviewMayProceedWithoutAuthorityPromotion).toBe(true);
  });

  it('does not transform the reconciled boundary into exhaustion, nonexistence or negative evidence', () => {
    const report = validReport();
    expect(report.globalCorpusExhaustionEstablished).toBe(false);
    expect(report.sourceNonexistenceEstablished).toBe(false);
    expect(report.globalNegativeFindingEstablished).toBe(false);
    expect(report.universalNoFurtherEvidenceClaimEstablished).toBe(false);
  });

  it('forbids cross-track pooling, external contact, rebinding, mutation and authority promotion', () => {
    const report = validReport();
    expect(report.crossTrackEvidencePoolingAuthorized).toBe(false);
    expect(report.crossTrackAuthorityLaunderingAuthorized).toBe(false);
    expect(report.externalContactAuthorizedByThisGate).toBe(false);
    expect(report.separateExplicitAuthorityRequiredForExternalContact).toBe(true);
    expect(report.trackFrontiers.every((track) => track.externalContactAuthorized === false)).toBe(true);
    expect(report.candidateRegisteredByThisGate).toBe(false);
    expect(report.candidateSelectedByThisGate).toBe(false);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.evidenceRebindingExecutedByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.derivativeRelationshipAdjudicatedByThisGate).toBe(false);
    expect(report.authorityAcquiredByThisGate).toBe(false);
  });

  it('freezes eighteen controls and preserves I132, v2 and all production guards before routing to productization inventory', () => {
    const report = validReport();
    expect(I249_FRONTIER_CONTROL_IDS).toHaveLength(18);
    expect(report.frontierControlIds).toEqual(I249_FRONTIER_CONTROL_IDS);
    expect(report.frontierControlCount).toBe(18);
    expect(report.frontierControlsFrozen).toBe(true);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
    expect(report.recommendedNextGate).toBe('GOVERNED_ENGINE_REMAINING_PRODUCTIZATION_FRONTIER_INVENTORY_AND_PRIORITY_REVIEW');
    expect(report.nextGateActivationCondition).toBe(
      'FOUR_TRIGGER_GATED_AUTHORITY_REMEDIATION_TRACKS_RECONCILED_NO_EQUIVALENT_PUBLIC_OR_REPOSITORY_ONLY_FRONTIER_ACTIONABLE',
    );
  });

  it('fails closed when any terminal boundary is altered', () => {
    const i232 = validI232();
    const invalidI232 = { ...i232, automatedPublicWebRemediationHoldActive: false } as unknown as typeof i232;
    const report = buildI249MultiTrackTerminalEvidenceAccessBoundaryReconciliationActiveFrontierSelectionReview(
      validI187(),
      validI211(),
      invalidI232,
      validI248(),
    );
    expect(report.status).toBe('MULTI_TRACK_TERMINAL_BOUNDARY_INVALID');
    expect(report.decision).toBe('MULTI_TRACK_ACTIVE_FRONTIER_SELECTION_NOT_READY');
    expect(report.exactI232HiddenStemBoundaryAccepted).toBe(false);
    expect(report.allTerminalTrackBoundariesAccepted).toBe(false);
    expect(report.trackCount).toBe(0);
    expect(report.trackFrontiers).toEqual([]);
    expect(report.materiallyNewEvidenceTriggerDependentFrontierCount).toBe(0);
    expect(report.frontierControlCount).toBe(0);
    expect(report.frontierControlsFrozen).toBe(false);
    expect(report.currentV2ProvenanceDisposition).toBe('NOT_ASSESSED');
    expect(report.recommendedNextGate).toBe(
      'MULTI_TRACK_TERMINAL_EVIDENCE_ACCESS_BOUNDARY_RECONCILIATION_ACTIVE_FRONTIER_SELECTION_REVIEW',
    );
    expect(report.nextGateActivationCondition).toBe('UPSTREAM_TERMINAL_BOUNDARY_NOT_ACCEPTED');
  });
});
