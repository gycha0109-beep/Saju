import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I191QuWeiTargetedLineageAdjudicationEvidenceReport } from './i191-qu-wei-targeted-lineage-adjudication-evidence.js';

export const I192_QU_WEI_LINEAGE_EVIDENCE_ADEQUACY_ORIGIN_REASSESSMENT_REVIEW_VERSION =
  'myeonghwa-qu-wei-lineage-evidence-adequacy-origin-reassessment-review-v1';

export interface I192QuWeiLineageEvidenceAdequacyOriginReassessmentReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_QU_WEI_LINEAGE_EVIDENCE_ADEQUACY_ORIGIN_REASSESSMENT_REVIEW'
    | 'I191_LINEAGE_EVIDENCE_BOUNDARY_INVALID';
  decision:
    | 'I191_LINEAGE_EVIDENCE_ADEQUATE_TO_RETIRE_QU_WEI_2003_AS_PRESUMED_ORIGIN_PRIOR_2001_SIZHU_XIANGZHEN_WITNESS_IDENTITY_AND_TARGET_PASSAGE_ACQUISITION_READINESS_MAY_PROCEED_NO_REBINDING_NO_INDEPENDENCE_THREE_EXTERNAL_TARGET_LINEAGE_QUESTIONS_REMAIN_UNRESOLVED'
    | 'QU_WEI_ORIGIN_REASSESSMENT_NOT_READY';
  upstreamI191EvidenceId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI191BoundaryAccepted: boolean;
  i191LineageEvidenceAdequateForOriginReassessment: boolean;
  priorSameAuthorDoctrinalDependencyAccepted: boolean;
  priorSameAuthorDependencyFindingCountAccepted: 1 | 0;
  unresolvedExternalTargetLineageQuestionCount: 3 | 0;
  quWei2003PresumedOriginRetired: boolean;
  quWei2003MayRemainPresumedOrigin: false;
  quWei2003IndependentNormativeProvenanceEstablished: false;
  prior2001WitnessIdentified: boolean;
  prior2001WitnessId: 'QU_WEI_SIZHU_XIANGZHEN_2001' | null;
  prior2001WitnessTitle: '《四柱详真》' | null;
  prior2001WitnessAuthor: '曲炜' | null;
  prior2001WitnessYear: 2001 | null;
  prior2001WitnessChronologyEstablished: boolean;
  prior2001WitnessContainsDistanceSensitiveDoctrine: boolean;
  prior2001WitnessContainsAdjacentVsGapForceDifferentiation: boolean;
  prior2001WitnessContainsCrossPillarRestriction: boolean;
  prior2001WitnessContainsGapClashNoEffectiveForceRule: boolean;
  exact2003PassageVerbatimIn2001Established: false;
  prior2001FormalPublicationIdentityComplete: false;
  prior2001ReproducibleWitnessIdentityComplete: false;
  prior2001ExactTargetPassageBindingComplete: false;
  prior2001MayBeTreatedAsIndependentBecauseEarlier: false;
  prior2001MayBeReboundByThisGate: false;
  prior2001IdentityAndTargetPassageAcquisitionReadinessReviewAuthorizedByThisGate: boolean;
  prior2001IdentityAndTargetPassageAcquisitionExecutedByThisGate: false;
  prior2001EvidenceRebindingMethodologicallyReady: false;
  prior2001EvidenceRebindingAuthorizedByThisGate: false;
  prior2001EvidenceRebindingExecutedByThisGate: false;
  liHanchenTargetDependencyStillUnresolved: boolean;
  liHongchengTargetDependencyStillUnresolved: boolean;
  otherEarlierDistinctiveSourceRelationshipStillUnresolved: boolean;
  thirdPartySuccessionClaimAloneEstablishesDerivativeEdge: false;
  generalTeacherRelationshipAloneEstablishesTargetScopeDependency: false;
  chronologyAloneEstablishesTargetScopeDependency: false;
  absenceOfDependencyEvidenceEstablishesIndependence: false;
  explicitDerivativeRelationshipCheckRequired: boolean;
  derivativeRetransmissionCountsAsIndependentAuthority: false;
  unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM';
  provenanceIndependenceAdjudicatedByThisGate: false;
  independentNormativeProvenanceEstablishedCount: 0;
  candidateSelectedByThisGate: false;
  candidateRegistrationAuthorizedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
  newCandidateSetVersionCreatedByThisGate: false;
  newInputPackageVersionCreatedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  liSameTargetDirectPrimaryPathRemainsMethodologicallyOpen: boolean;
  liSameTargetPathSuspendedNotRetired: boolean;
  liSameTargetMayReopenOnMateriallyNewDirectLead: boolean;
  liPublicationMediumOrEntityGapStillOpen: boolean;
  liCanonicalDigitalWitnessNormalizationGapStillOpen: boolean;
  li1998WitnessIndependentProvenanceEstablished: false;
  targetedDiscoveryExhaustionEstablished: false;
  corpusExhaustionEstablished: false;
  searchSilenceCreatesNegativeFinding: false;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  sourceClassAloneSufficient: false;
  sourceCountMayBecomeNumericWeight: false;
  provenanceTierMayBecomeNumericWeight: false;
  evidenceRebindingMethodologicallyReady: false;
  evidenceRebindingAuthorizedByThisGate: false;
  productionPolicyExecutionAuthorized: false;
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  authorityAcquiredByThisGate: false;
  visibleStemBinaryEffectiveInteractionEligibilityResolved: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  hiddenStemInteractionEligibilityGapRemains: true;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_LINEAGE_EVIDENCE_ADEQUACY_ORIGIN_REASSESSMENT_REVIEW';
  notes: readonly string[];
}

function exactI191Accepted(i191: I191QuWeiTargetedLineageAdjudicationEvidenceReport): boolean {
  return (
    i191.status === 'RESOLVED_QU_WEI_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE' &&
    i191.decision ===
      'QU_WEI_TARGETED_LINEAGE_DISCOVERY_EXECUTED_PRIOR_SAME_AUTHOR_DOCTRINAL_DEPENDENCY_FOUND_LI_HANCHEN_EARLIER_DOCTRINAL_SOURCE_AND_SUCCESSION_RISK_DIRECT_DEPENDENCY_UNRESOLVED_LI_HONGCHENG_GENERAL_TEACHING_LINEAGE_FOUND_TARGET_SCOPE_DEPENDENCY_UNRESOLVED_OTHER_EARLIER_DISTINCTIVE_SOURCE_RELATIONSHIP_UNRESOLVED_ZERO_INDEPENDENCE_2003_PRESUMED_ORIGIN_REQUIRES_REASSESSMENT' &&
    i191.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i191.policyVersion === 'v1-definition' &&
    i191.adoptionVersion === 'v1-adoption' &&
    i191.currentCandidateSetVersion === 'v1-candidate-set' &&
    i191.currentInputPackageVersion === 'v2-input-package' &&
    i191.exactI190BoundaryAccepted &&
    i191.targetedCandidateId === 'QU_WEI_2003_SIZHU_TEXUNBAN_JIANGYI' &&
    i191.targetedLineageAdjudicationExecutedByThisGate &&
    i191.lineageQuestionResultCount === 4 &&
    i191.allFourFrozenQuestionsExecuted &&
    i191.priorSameAuthorDependencyFound &&
    i191.priorSameAuthorWorkIdentity === 'QU_WEI_SIZHU_XIANGZHEN_2001' &&
    i191.priorSameAuthorWorkTitle === '《四柱详真》' &&
    i191.priorSameAuthorWorkChronologyEstablished &&
    i191.priorSameAuthorWorkYear === 2001 &&
    i191.target2003PrefaceExplicitlyBasesLectureOnPriorWorks &&
    i191.priorWorkContainsDistanceSensitiveStemForceDoctrine &&
    i191.priorWorkContainsAdjacentVsGapForceDifferentiation &&
    i191.priorWorkContainsCrossPillarDirectInteractionRestriction &&
    i191.priorWorkContainsGapClashNoEffectiveForceRule &&
    i191.exact2003PassageVerbatimInPriorWorkEstablished === false &&
    i191.sameAuthorDependencyRelationship === 'PRIOR_SAME_AUTHOR_DOCTRINAL_DEPENDENCY' &&
    i191.quWei2003MayRemainPresumedOrigin === false &&
    i191.quWei2003RequiresOriginReassessment &&
    i191.liHanchenTargetScopeDependencyResolved === false &&
    i191.liHongchengTargetScopeRelationshipResolved === false &&
    i191.otherEarlierDistinctiveSourceRelationshipToQuWeiResolved === false &&
    i191.explicitDerivativeRelationshipFindingCount === 1 &&
    i191.unresolvedTargetDependencyQuestionCount === 3 &&
    i191.explicitNegativeFindingCount === 0 &&
    i191.searchSilenceCreatesNegativeFinding === false &&
    i191.absenceOfDirectDependencyEvidenceEstablishesIndependence === false &&
    i191.targetCandidateIndependentNormativeProvenanceEstablished === false &&
    i191.provenanceIndependenceAdjudicatedByThisGate === false &&
    i191.independentNormativeProvenanceEstablishedCount === 0 &&
    i191.explicitDerivativeRelationshipCheckRequired &&
    i191.derivativeRetransmissionCountsAsIndependentAuthority === false &&
    i191.unresolvedLineageDefaultDisposition === 'REJECT_INDEPENDENCE_CLAIM' &&
    i191.candidateSelectedByThisGate === false &&
    i191.candidateRegistrationAuthorizedByThisGate === false &&
    i191.candidateSetMutatedByThisGate === false &&
    i191.candidateSetReevaluationAuthorizedByThisGate === false &&
    i191.currentV2PackageAndCandidateSetRemainImmutable &&
    i191.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i191.quWeiPriorWitnessRebindingExecutedByThisGate === false &&
    i191.quWeiPriorWitnessRebindingAuthorizedByThisGate === false &&
    i191.quWeiPriorWitnessIdentityAcquisitionAuthorizedByThisGate === false &&
    i191.targetedDiscoveryExhaustionEstablished === false &&
    i191.corpusExhaustionEstablished === false &&
    i191.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i191.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i191.evidenceRebindingMethodologicallyReady === false &&
    i191.evidenceRebindingAuthorizedByThisGate === false &&
    i191.productionPolicyExecutionAuthorized === false &&
    i191.actualCompositionPerformedByThisGate === false &&
    i191.multiSourceCompositionAuthorized === false &&
    i191.authorityAcquiredByThisGate === false &&
    i191.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i191.thresholdRuleCreatedByThisGate === false &&
    i191.damageEvaluationAuthorized === false &&
    i191.classificationAuthorized === false &&
    i191.numericScoringAuthorized === false &&
    i191.hiddenStemInteractionEligibilityGapRemains &&
    i191.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i191.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_LINEAGE_EVIDENCE_ADEQUACY_ORIGIN_REASSESSMENT_REVIEW'
  );
}

function finalized(
  material: Omit<I192QuWeiLineageEvidenceAdequacyOriginReassessmentReviewReport, 'reviewId'>,
): I192QuWeiLineageEvidenceAdequacyOriginReassessmentReviewReport {
  return {
    reviewId: `i192_qu_wei_origin_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI192QuWeiLineageEvidenceAdequacyOriginReassessmentReview(
  i191: I191QuWeiTargetedLineageAdjudicationEvidenceReport,
): I192QuWeiLineageEvidenceAdequacyOriginReassessmentReviewReport {
  const accepted = exactI191Accepted(i191);

  return finalized({
    reviewVersion: I192_QU_WEI_LINEAGE_EVIDENCE_ADEQUACY_ORIGIN_REASSESSMENT_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_QU_WEI_LINEAGE_EVIDENCE_ADEQUACY_ORIGIN_REASSESSMENT_REVIEW'
      : 'I191_LINEAGE_EVIDENCE_BOUNDARY_INVALID',
    decision: accepted
      ? 'I191_LINEAGE_EVIDENCE_ADEQUATE_TO_RETIRE_QU_WEI_2003_AS_PRESUMED_ORIGIN_PRIOR_2001_SIZHU_XIANGZHEN_WITNESS_IDENTITY_AND_TARGET_PASSAGE_ACQUISITION_READINESS_MAY_PROCEED_NO_REBINDING_NO_INDEPENDENCE_THREE_EXTERNAL_TARGET_LINEAGE_QUESTIONS_REMAIN_UNRESOLVED'
      : 'QU_WEI_ORIGIN_REASSESSMENT_NOT_READY',
    upstreamI191EvidenceId: i191.evidenceId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI191BoundaryAccepted: accepted,
    i191LineageEvidenceAdequateForOriginReassessment: accepted,
    priorSameAuthorDoctrinalDependencyAccepted: accepted,
    priorSameAuthorDependencyFindingCountAccepted: accepted ? 1 : 0,
    unresolvedExternalTargetLineageQuestionCount: accepted ? 3 : 0,
    quWei2003PresumedOriginRetired: accepted,
    quWei2003MayRemainPresumedOrigin: false,
    quWei2003IndependentNormativeProvenanceEstablished: false,
    prior2001WitnessIdentified: accepted,
    prior2001WitnessId: accepted ? 'QU_WEI_SIZHU_XIANGZHEN_2001' : null,
    prior2001WitnessTitle: accepted ? '《四柱详真》' : null,
    prior2001WitnessAuthor: accepted ? '曲炜' : null,
    prior2001WitnessYear: accepted ? 2001 : null,
    prior2001WitnessChronologyEstablished: accepted,
    prior2001WitnessContainsDistanceSensitiveDoctrine: accepted,
    prior2001WitnessContainsAdjacentVsGapForceDifferentiation: accepted,
    prior2001WitnessContainsCrossPillarRestriction: accepted,
    prior2001WitnessContainsGapClashNoEffectiveForceRule: accepted,
    exact2003PassageVerbatimIn2001Established: false,
    prior2001FormalPublicationIdentityComplete: false,
    prior2001ReproducibleWitnessIdentityComplete: false,
    prior2001ExactTargetPassageBindingComplete: false,
    prior2001MayBeTreatedAsIndependentBecauseEarlier: false,
    prior2001MayBeReboundByThisGate: false,
    prior2001IdentityAndTargetPassageAcquisitionReadinessReviewAuthorizedByThisGate: accepted,
    prior2001IdentityAndTargetPassageAcquisitionExecutedByThisGate: false,
    prior2001EvidenceRebindingMethodologicallyReady: false,
    prior2001EvidenceRebindingAuthorizedByThisGate: false,
    prior2001EvidenceRebindingExecutedByThisGate: false,
    liHanchenTargetDependencyStillUnresolved: accepted,
    liHongchengTargetDependencyStillUnresolved: accepted,
    otherEarlierDistinctiveSourceRelationshipStillUnresolved: accepted,
    thirdPartySuccessionClaimAloneEstablishesDerivativeEdge: false,
    generalTeacherRelationshipAloneEstablishesTargetScopeDependency: false,
    chronologyAloneEstablishesTargetScopeDependency: false,
    absenceOfDependencyEvidenceEstablishesIndependence: false,
    explicitDerivativeRelationshipCheckRequired: accepted,
    derivativeRetransmissionCountsAsIndependentAuthority: false,
    unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM',
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    candidateSelectedByThisGate: false,
    candidateRegistrationAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    liSameTargetDirectPrimaryPathRemainsMethodologicallyOpen: accepted,
    liSameTargetPathSuspendedNotRetired: accepted,
    liSameTargetMayReopenOnMateriallyNewDirectLead: accepted,
    liPublicationMediumOrEntityGapStillOpen: accepted,
    liCanonicalDigitalWitnessNormalizationGapStillOpen: accepted,
    li1998WitnessIndependentProvenanceEstablished: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    searchSilenceCreatesNegativeFinding: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    sourceClassAloneSufficient: false,
    sourceCountMayBecomeNumericWeight: false,
    provenanceTierMayBecomeNumericWeight: false,
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
    recommendedNextGate: accepted
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_2001_PRIOR_WITNESS_IDENTITY_TARGET_PASSAGE_ACQUISITION_READINESS_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_LINEAGE_EVIDENCE_ADEQUACY_ORIGIN_REASSESSMENT_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I192 accepts I191 as sufficient to retire the 2003 曲炜 witness as presumed origin because a prior 2001 same-author doctrinal dependency is established.',
          'The 2001 《四柱详真》 witness is identified as the next prior same-author witness, but its formal publication identity, reproducible witness identity, and exact target-passage binding are not treated as complete by this gate.',
          'Being earlier does not make the 2001 witness independent. 李涵辰 target dependency, 李洪成 target dependency, and the relationship to another earlier distinctive source remain unresolved under REJECT_INDEPENDENCE_CLAIM.',
          'I192 authorizes only a bounded readiness review for 2001 witness identity and target-passage acquisition. It does not authorize or execute acquisition, rebinding, candidate mutation, reevaluation, thresholding, classification, numeric scoring, composition, or production interpretation.',
        ])
      : Object.freeze(['I191 boundary mismatch prevents origin reassessment.']),
  });
}
