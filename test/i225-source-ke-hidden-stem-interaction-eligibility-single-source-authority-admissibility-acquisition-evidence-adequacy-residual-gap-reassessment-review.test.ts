import { describe, expect, it } from 'vitest';
import type { I224SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionEvidenceReport } from '../src/research/i224-source-ke-hidden-stem-interaction-eligibility-single-source-authority-admissibility-targeted-evidence-acquisition-evidence.js';
import {
  I225_TARGET_SPECIFIC_RESIDUAL_DISCOVERY_PRIORITY_IDS,
  buildI225SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityAcquisitionEvidenceAdequacyResidualGapReassessmentReview,
} from '../src/research/i225-source-ke-hidden-stem-interaction-eligibility-single-source-authority-admissibility-acquisition-evidence-adequacy-residual-gap-reassessment-review.js';

const validI224 = (): I224SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionEvidenceReport =>
  ({
    evidenceId: 'i224_fixture',
    status:
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_TARGETED_EVIDENCE_ACQUISITION_EVIDENCE',
    decision:
      'FIVE_TARGETED_PATHS_EXECUTED_SOHU_PUBLICATION_OBJECT_BOUND_LATER_MIRROR_REDISTRIBUTION_LEADS_OBSERVED_ACCOUNT_REPUBLICATION_BEHAVIOR_DIRECTLY_EVIDENCED_RESTRICTIVE_CONFLICT_RECONFIRMED_ORIGINAL_AUTHORSHIP_LINEAGE_PRIOR_SOURCE_AND_DERIVATIVE_DEPENDENCY_UNRESOLVED_NO_ADMISSIBILITY_ADJUDICATED_NO_PROMOTION',
    exactI223BoundaryAccepted: true,
    targetCandidateId: 'LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML',
    sevenRequirementCoverageAcceptedAsUpstreamFinding: true,
    coverageReevaluationPerformedByThisGate: false,
    acquisitionExecuted: true,
    executedAcquisitionPathCount: 5,
    evidenceRecordCount: 5,
    directPublicationBylineAndAccountIdentityCaptured: true,
    targetPublicationTitle: '干支的九种关系2',
    targetPublicationAccount: '李炎宸易经风水智慧',
    targetPublicationDate: '2017-02-02',
    laterMirrorRedistributionLeadObserved: true,
    laterMirrorDirectlyOpenedForPositiveAdmissibilityFinding: false,
    earlierThanTargetExactTextWitnessEstablished: false,
    priorPublicationSearchSilenceCreatesNegativeFinding: false,
    corpusExhaustionClaimed: false,
    sameAccountThirdPartyMaterialRepublicationDirectlyEvidenced: true,
    platformAccountMayBeTreatedAsTargetOriginalAuthor: false,
    possibleRelatedAuthorOrLineageLeadObserved: true,
    possibleRelatedAuthorOrLineageLeadPromotedToFinding: false,
    exactTargetDoctrinalAuthorshipEstablished: false,
    exactTargetDoctrinalLineageEstablished: false,
    exactTargetPriorSourceDependencyEstablished: false,
    derivativeRelationshipAdjudicatedByThisGate: false,
    restrictiveDoctrineDirectConflictEvidenceReconfirmed: true,
    restrictiveDoctrineSchoolBoundaryEstablished: false,
    doctrinalConflictPreserved: true,
    doctrinalConflictResolvedByThisGate: false,
    unresolvedAdmissibilityGapIds: [
      'DOCTRINAL_AUTHORSHIP_OR_LINEAGE_ATTRIBUTION_GAP',
      'NORMATIVE_RULE_BEARING_STATUS_AND_ORIGINALITY_GAP',
      'DERIVATIVE_RELATIONSHIP_AND_PRIOR_SOURCE_DEPENDENCY_GAP',
      'RESTRICTIVE_DOCTRINAL_CONFLICT_HANDLING_GAP',
    ],
    unresolvedAdmissibilityGapCount: 4,
    anyAdmissibilityGapClosedByThisGate: false,
    sourceNormativeAdmissibilityAdjudicatedByThisGate: false,
    authorityPromotionReadinessEstablishedByThisGate: false,
    authorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
    searchSnippetUsedAsPositiveAuthority: false,
    sourcePlatformOrAccountAutoAcceptedAsAuthority: false,
    currentCandidateEvidenceUsedToBackfillAdmissibility: false,
    crossCandidateCompositionPerformed: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_ACQUISITION_EVIDENCE_ADEQUACY_RESIDUAL_GAP_REASSESSMENT_REVIEW',
  }) as unknown as I224SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionEvidenceReport;

describe('I225 hidden-stem authority admissibility acquisition evidence adequacy residual-gap reassessment', () => {
  it('accepts the exact I224 limited-evidence boundary without reopening seven-of-seven coverage', () => {
    const report = buildI225SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityAcquisitionEvidenceAdequacyResidualGapReassessmentReview(validI224());
    expect(report.status).toBe(
      'RESOLVED_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_SINGLE_SOURCE_AUTHORITY_ADMISSIBILITY_ACQUISITION_EVIDENCE_ADEQUACY_RESIDUAL_GAP_REASSESSMENT_REVIEW',
    );
    expect(report.targetCandidateId).toBe('LI_YANCHEN_GANZHI_NINE_RELATIONS_PART2_SOHU_2017_HTML');
    expect(report.sevenRequirementCoverageAcceptedAsUpstreamFinding).toBe(true);
    expect(report.coverageReevaluationAuthorizedByThisGate).toBe(false);
  });

  it('accepts all four I224 limited findings as adequate for their narrow claims', () => {
    const report = buildI225SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityAcquisitionEvidenceAdequacyResidualGapReassessmentReview(validI224());
    expect(report.I224LimitedEvidenceFindingsAdequate).toBe(true);
    expect(report.targetPublicationObjectIdentityFindingAccepted).toBe(true);
    expect(report.sameAccountRepublicationCautionFindingAccepted).toBe(true);
    expect(report.laterMirrorRedistributionLeadFindingAccepted).toBe(true);
    expect(report.restrictiveDoctrineConflictFindingAccepted).toBe(true);
  });

  it('keeps all four admissibility gaps unresolved', () => {
    const report = buildI225SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityAcquisitionEvidenceAdequacyResidualGapReassessmentReview(validI224());
    expect(report.unresolvedAdmissibilityGapCount).toBe(4);
    expect(report.exactTargetOriginalAuthorshipStillUnresolved).toBe(true);
    expect(report.exactTargetDoctrinalLineageStillUnresolved).toBe(true);
    expect(report.exactTargetPriorSourceDependencyStillUnresolved).toBe(true);
    expect(report.restrictiveDoctrineSchoolBoundaryStillUnresolved).toBe(true);
    expect(report.sourceNormativeAdmissibilityAdjudicatedByThisGate).toBe(false);
  });

  it('distinguishes rule-bearing target content from normative authority', () => {
    const report = buildI225SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityAcquisitionEvidenceAdequacyResidualGapReassessmentReview(validI224());
    expect(report.targetRuleBearingContentObserved).toBe(true);
    expect(report.targetRuleBearingContentObservationMayEstablishNormativeAuthority).toBe(false);
    expect(report.authorityPromotionReadinessEstablishedByThisGate).toBe(false);
  });

  it('prioritizes four target-specific residual discovery objectives and rejects equivalent broad-search repetition', () => {
    const report = buildI225SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityAcquisitionEvidenceAdequacyResidualGapReassessmentReview(validI224());
    expect(report.residualDiscoveryPriorityIds).toEqual(I225_TARGET_SPECIFIC_RESIDUAL_DISCOVERY_PRIORITY_IDS);
    expect(report.residualDiscoveryPriorityCount).toBe(4);
    expect(report.broadEquivalentSearchRepetitionJustified).toBe(false);
    expect(report.targetSpecificPre2017OriginalSourceDiscoveryJustified).toBe(true);
    expect(report.restrictiveConflictAdjudicationDeferredUntilTargetLineageEstablished).toBe(true);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_TARGET_EXACT_TEXT_PRE_2017_ORIGINAL_SOURCE_AUTHORSHIP_DISCOVERY_READINESS_REVIEW',
    );
  });

  it('creates no negative or exhaustion finding from the missing predecessor', () => {
    const report = buildI225SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityAcquisitionEvidenceAdequacyResidualGapReassessmentReview(validI224());
    expect(report.absenceOfPre2017WitnessCreatesNegativeFinding).toBe(false);
    expect(report.corpusExhaustionClaimed).toBe(false);
    expect(report.authorshipMayBeInferredFromSohuAccount).toBe(false);
    expect(report.derivativeRelationshipMayBeInferredFromLaterMirrors).toBe(false);
  });

  it('preserves the authority gap and all repository guards', () => {
    const report = buildI225SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityAcquisitionEvidenceAdequacyResidualGapReassessmentReview(validI224());
    expect(report.authorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
    expect(report.authorityGapClosed).toBe(false);
    expect(report.authorityPromotedByThisGate).toBe(false);
    expect(report.doctrinalConflictPreserved).toBe(true);
    expect(report.doctrinalConflictResolvedByThisGate).toBe(false);
    expect(report.quWei2001HoldPreserved).toBe(true);
    expect(report.li1998SameTargetPathSuspendedNotRetired).toBe(true);
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.derivativeLineageAdjudicatedByThisGate).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.damageEvaluationAuthorized).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
  });

  it('fails closed if the I224 acquisition evidence boundary changes', () => {
    const invalid: I224SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityTargetedEvidenceAcquisitionEvidenceReport = {
      ...validI224(),
      executedAcquisitionPathCount: 0,
    };
    const report = buildI225SourceKeHiddenStemInteractionEligibilitySingleSourceAuthorityAdmissibilityAcquisitionEvidenceAdequacyResidualGapReassessmentReview(invalid);
    expect(report.status).toBe('I224_ACQUISITION_EVIDENCE_BOUNDARY_INVALID');
    expect(report.targetCandidateId).toBeNull();
    expect(report.I224LimitedEvidenceFindingsAdequate).toBe(false);
    expect(report.unresolvedAdmissibilityGapCount).toBe(0);
    expect(report.residualDiscoveryPriorityCount).toBe(0);
    expect(report.targetSpecificPre2017OriginalSourceDiscoveryJustified).toBe(false);
    expect(report.authorityGap).toBe('UPSTREAM_INVALID');
  });
});
