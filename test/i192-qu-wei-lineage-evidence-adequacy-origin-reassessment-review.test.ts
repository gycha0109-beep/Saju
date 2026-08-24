import { describe, expect, it } from 'vitest';
import type { I191QuWeiTargetedLineageAdjudicationEvidenceReport } from '../src/research/i191-qu-wei-targeted-lineage-adjudication-evidence.js';
import { buildI192QuWeiLineageEvidenceAdequacyOriginReassessmentReview } from '../src/research/i192-qu-wei-lineage-evidence-adequacy-origin-reassessment-review.js';

function validI191(): I191QuWeiTargetedLineageAdjudicationEvidenceReport {
  return {
    evidenceId: 'i191_fixture',
    status: 'RESOLVED_QU_WEI_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE',
    decision:
      'QU_WEI_TARGETED_LINEAGE_DISCOVERY_EXECUTED_PRIOR_SAME_AUTHOR_DOCTRINAL_DEPENDENCY_FOUND_LI_HANCHEN_EARLIER_DOCTRINAL_SOURCE_AND_SUCCESSION_RISK_DIRECT_DEPENDENCY_UNRESOLVED_LI_HONGCHENG_GENERAL_TEACHING_LINEAGE_FOUND_TARGET_SCOPE_DEPENDENCY_UNRESOLVED_OTHER_EARLIER_DISTINCTIVE_SOURCE_RELATIONSHIP_UNRESOLVED_ZERO_INDEPENDENCE_2003_PRESUMED_ORIGIN_REQUIRES_REASSESSMENT',
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI190BoundaryAccepted: true,
    targetedCandidateId: 'QU_WEI_2003_SIZHU_TEXUNBAN_JIANGYI',
    targetedLineageAdjudicationExecutedByThisGate: true,
    lineageQuestionResultCount: 4,
    allFourFrozenQuestionsExecuted: true,
    priorSameAuthorDependencyFound: true,
    priorSameAuthorWorkIdentity: 'QU_WEI_SIZHU_XIANGZHEN_2001',
    priorSameAuthorWorkTitle: '《四柱详真》',
    priorSameAuthorWorkChronologyEstablished: true,
    priorSameAuthorWorkYear: 2001,
    target2003PrefaceExplicitlyBasesLectureOnPriorWorks: true,
    priorWorkContainsDistanceSensitiveStemForceDoctrine: true,
    priorWorkContainsAdjacentVsGapForceDifferentiation: true,
    priorWorkContainsCrossPillarDirectInteractionRestriction: true,
    priorWorkContainsGapClashNoEffectiveForceRule: true,
    exact2003PassageVerbatimInPriorWorkEstablished: false,
    sameAuthorDependencyRelationship: 'PRIOR_SAME_AUTHOR_DOCTRINAL_DEPENDENCY',
    quWei2003MayRemainPresumedOrigin: false,
    quWei2003RequiresOriginReassessment: true,
    liHanchenTargetScopeDependencyResolved: false,
    liHongchengTargetScopeRelationshipResolved: false,
    otherEarlierDistinctiveSourceRelationshipToQuWeiResolved: false,
    explicitDerivativeRelationshipFindingCount: 1,
    unresolvedTargetDependencyQuestionCount: 3,
    explicitNegativeFindingCount: 0,
    searchSilenceCreatesNegativeFinding: false,
    absenceOfDirectDependencyEvidenceEstablishesIndependence: false,
    targetCandidateIndependentNormativeProvenanceEstablished: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    explicitDerivativeRelationshipCheckRequired: true,
    derivativeRetransmissionCountsAsIndependentAuthority: false,
    unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM',
    candidateSelectedByThisGate: false,
    candidateRegistrationAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: true,
    currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE',
    quWeiPriorWitnessRebindingExecutedByThisGate: false,
    quWeiPriorWitnessRebindingAuthorizedByThisGate: false,
    quWeiPriorWitnessIdentityAcquisitionAuthorizedByThisGate: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: true,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    productionPolicyExecutionAuthorized: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_LINEAGE_EVIDENCE_ADEQUACY_ORIGIN_REASSESSMENT_REVIEW',
  } as unknown as I191QuWeiTargetedLineageAdjudicationEvidenceReport;
}

describe('I192 Qu Wei lineage evidence adequacy and origin reassessment review', () => {
  it('accepts exact I191 and retires the 2003 presumed-origin assumption', () => {
    const report = buildI192QuWeiLineageEvidenceAdequacyOriginReassessmentReview(validI191());
    expect(report.status).toBe('RESOLVED_QU_WEI_LINEAGE_EVIDENCE_ADEQUACY_ORIGIN_REASSESSMENT_REVIEW');
    expect(report.decision).toBe(
      'I191_LINEAGE_EVIDENCE_ADEQUATE_TO_RETIRE_QU_WEI_2003_AS_PRESUMED_ORIGIN_PRIOR_2001_SIZHU_XIANGZHEN_WITNESS_IDENTITY_AND_TARGET_PASSAGE_ACQUISITION_READINESS_MAY_PROCEED_NO_REBINDING_NO_INDEPENDENCE_THREE_EXTERNAL_TARGET_LINEAGE_QUESTIONS_REMAIN_UNRESOLVED',
    );
    expect(report.exactI191BoundaryAccepted).toBe(true);
    expect(report.i191LineageEvidenceAdequateForOriginReassessment).toBe(true);
    expect(report.priorSameAuthorDoctrinalDependencyAccepted).toBe(true);
    expect(report.priorSameAuthorDependencyFindingCountAccepted).toBe(1);
    expect(report.quWei2003PresumedOriginRetired).toBe(true);
    expect(report.quWei2003MayRemainPresumedOrigin).toBe(false);
    expect(report.quWei2003IndependentNormativeProvenanceEstablished).toBe(false);
  });

  it('identifies the 2001 prior same-author witness and preserves only the doctrine-level facts already supported', () => {
    const report = buildI192QuWeiLineageEvidenceAdequacyOriginReassessmentReview(validI191());
    expect(report.prior2001WitnessIdentified).toBe(true);
    expect(report.prior2001WitnessId).toBe('QU_WEI_SIZHU_XIANGZHEN_2001');
    expect(report.prior2001WitnessTitle).toBe('《四柱详真》');
    expect(report.prior2001WitnessAuthor).toBe('曲炜');
    expect(report.prior2001WitnessYear).toBe(2001);
    expect(report.prior2001WitnessChronologyEstablished).toBe(true);
    expect(report.prior2001WitnessContainsDistanceSensitiveDoctrine).toBe(true);
    expect(report.prior2001WitnessContainsAdjacentVsGapForceDifferentiation).toBe(true);
    expect(report.prior2001WitnessContainsCrossPillarRestriction).toBe(true);
    expect(report.prior2001WitnessContainsGapClashNoEffectiveForceRule).toBe(true);
    expect(report.exact2003PassageVerbatimIn2001Established).toBe(false);
  });

  it('does not overclaim the 2001 publication, witness or exact target-passage identity', () => {
    const report = buildI192QuWeiLineageEvidenceAdequacyOriginReassessmentReview(validI191());
    expect(report.prior2001FormalPublicationIdentityComplete).toBe(false);
    expect(report.prior2001ReproducibleWitnessIdentityComplete).toBe(false);
    expect(report.prior2001ExactTargetPassageBindingComplete).toBe(false);
    expect(report.prior2001MayBeTreatedAsIndependentBecauseEarlier).toBe(false);
    expect(report.prior2001MayBeReboundByThisGate).toBe(false);
    expect(report.prior2001EvidenceRebindingMethodologicallyReady).toBe(false);
    expect(report.prior2001EvidenceRebindingAuthorizedByThisGate).toBe(false);
    expect(report.prior2001EvidenceRebindingExecutedByThisGate).toBe(false);
  });

  it('authorizes only the next bounded acquisition-readiness review, not acquisition or rebinding', () => {
    const report = buildI192QuWeiLineageEvidenceAdequacyOriginReassessmentReview(validI191());
    expect(report.prior2001IdentityAndTargetPassageAcquisitionReadinessReviewAuthorizedByThisGate).toBe(true);
    expect(report.prior2001IdentityAndTargetPassageAcquisitionExecutedByThisGate).toBe(false);
    expect(report.recommendedNextGate).toBe(
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_READINESS_REVIEW',
    );
    expect(report.evidenceRebindingMethodologicallyReady).toBe(false);
    expect(report.evidenceRebindingAuthorizedByThisGate).toBe(false);
  });

  it('preserves all three external target-lineage questions as unresolved fail-closed', () => {
    const report = buildI192QuWeiLineageEvidenceAdequacyOriginReassessmentReview(validI191());
    expect(report.unresolvedExternalTargetLineageQuestionCount).toBe(3);
    expect(report.liHanchenTargetDependencyStillUnresolved).toBe(true);
    expect(report.liHongchengTargetDependencyStillUnresolved).toBe(true);
    expect(report.otherEarlierDistinctiveSourceRelationshipStillUnresolved).toBe(true);
    expect(report.thirdPartySuccessionClaimAloneEstablishesDerivativeEdge).toBe(false);
    expect(report.generalTeacherRelationshipAloneEstablishesTargetScopeDependency).toBe(false);
    expect(report.chronologyAloneEstablishesTargetScopeDependency).toBe(false);
    expect(report.absenceOfDependencyEvidenceEstablishesIndependence).toBe(false);
    expect(report.unresolvedLineageDefaultDisposition).toBe('REJECT_INDEPENDENCE_CLAIM');
  });

  it('keeps independence, candidate-set, I132 and production authority unchanged', () => {
    const report = buildI192QuWeiLineageEvidenceAdequacyOriginReassessmentReview(validI191());
    expect(report.explicitDerivativeRelationshipCheckRequired).toBe(true);
    expect(report.derivativeRetransmissionCountsAsIndependentAuthority).toBe(false);
    expect(report.provenanceIndependenceAdjudicatedByThisGate).toBe(false);
    expect(report.independentNormativeProvenanceEstablishedCount).toBe(0);
    expect(report.candidateSelectedByThisGate).toBe(false);
    expect(report.candidateRegistrationAuthorizedByThisGate).toBe(false);
    expect(report.candidateSetMutatedByThisGate).toBe(false);
    expect(report.candidateSetReevaluationAuthorizedByThisGate).toBe(false);
    expect(report.currentV2PackageAndCandidateSetRemainImmutable).toBe(true);
    expect(report.currentV2ProvenanceDisposition).toBe('BLOCKED_UNDER_CURRENT_EVIDENCE');
    expect(report.I132IndependentNormativeProvenanceRequirementRemainsNormative).toBe(true);
    expect(report.I132PolicyRelaxationAuthorizedByThisGate).toBe(false);
    expect(report.actualCompositionPerformedByThisGate).toBe(false);
    expect(report.multiSourceCompositionAuthorized).toBe(false);
    expect(report.thresholdRuleCreatedByThisGate).toBe(false);
    expect(report.classificationAuthorized).toBe(false);
    expect(report.numericScoringAuthorized).toBe(false);
    expect(report.productionPolicyExecutionAuthorized).toBe(false);
  });

  it('preserves the suspended Li 1998 path and non-exhaustion state', () => {
    const report = buildI192QuWeiLineageEvidenceAdequacyOriginReassessmentReview(validI191());
    expect(report.liSameTargetDirectPrimaryPathRemainsMethodologicallyOpen).toBe(true);
    expect(report.liSameTargetPathSuspendedNotRetired).toBe(true);
    expect(report.liSameTargetMayReopenOnMateriallyNewDirectLead).toBe(true);
    expect(report.liPublicationMediumOrEntityGapStillOpen).toBe(true);
    expect(report.liCanonicalDigitalWitnessNormalizationGapStillOpen).toBe(true);
    expect(report.li1998WitnessIndependentProvenanceEstablished).toBe(false);
    expect(report.targetedDiscoveryExhaustionEstablished).toBe(false);
    expect(report.corpusExhaustionEstablished).toBe(false);
    expect(report.searchSilenceCreatesNegativeFinding).toBe(false);
    expect(report.hiddenStemAuthorityGap).toBe('SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED');
  });

  it('fails closed if I191 is mutated to remove the prior same-author dependency', () => {
    const mutated = {
      ...validI191(),
      priorSameAuthorDependencyFound: false,
    } as unknown as I191QuWeiTargetedLineageAdjudicationEvidenceReport;
    const report = buildI192QuWeiLineageEvidenceAdequacyOriginReassessmentReview(mutated);
    expect(report.status).toBe('I191_LINEAGE_EVIDENCE_BOUNDARY_INVALID');
    expect(report.decision).toBe('QU_WEI_ORIGIN_REASSESSMENT_NOT_READY');
    expect(report.exactI191BoundaryAccepted).toBe(false);
    expect(report.i191LineageEvidenceAdequateForOriginReassessment).toBe(false);
    expect(report.quWei2003PresumedOriginRetired).toBe(false);
    expect(report.prior2001WitnessIdentified).toBe(false);
    expect(report.prior2001IdentityAndTargetPassageAcquisitionReadinessReviewAuthorizedByThisGate).toBe(false);
    expect(report.currentV2ProvenanceDisposition).toBe('NOT_ASSESSED');
  });
});
