import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I189ThirdWaveNewProvenanceCandidateDiscoveryEvidenceReport } from './i189-third-wave-new-provenance-candidate-discovery-evidence.js';

export const I190_THIRD_WAVE_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_ADJUDICATION_READINESS_REVIEW_VERSION =
  'myeonghwa-third-wave-candidate-evidence-adequacy-lineage-adjudication-readiness-review-v1';

export const I190_QU_WEI_LINEAGE_QUESTION_IDS = Object.freeze([
  'QU_WEI_PRIOR_SAME_AUTHOR_WORK_TARGET_PASSAGE_OR_DOCTRINE_DEPENDENCY',
  'QU_WEI_LI_HANCHEN_DOCTRINAL_LINEAGE_DEPENDENCY',
  'QU_WEI_LI_HONGCHENG_RELATIONSHIP_OR_INDEPENDENT_PARALLEL_DEVELOPMENT',
  'QU_WEI_OTHER_EARLIER_DISTINCTIVE_SOURCE_DEPENDENCY',
] as const);

export type I190QuWeiLineageQuestionId = (typeof I190_QU_WEI_LINEAGE_QUESTION_IDS)[number];

export interface I190QuWeiLineageQuestion {
  questionId: I190QuWeiLineageQuestionId;
  question: string;
  minimumQualifyingEvidence: readonly string[];
  unresolvedDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM';
  answeredByThisGate: false;
}

export interface I190ThirdWaveCandidateEvidenceAdequacyLineageAdjudicationReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_THIRD_WAVE_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_ADJUDICATION_READINESS_REVIEW'
    | 'I189_DISCOVERY_EVIDENCE_BOUNDARY_INVALID';
  decision:
    | 'I189_EVIDENCE_ADEQUATE_ONE_MINIMUM_ADEQUACY_CANDIDATE_QU_WEI_READY_FOR_TARGETED_LINEAGE_ADJUDICATION_FOUR_QUESTIONS_FROZEN_LI_HONGCHENG_NOT_PROMOTED_THREE_DERIVATIVE_RISK_SURFACES_NOT_PROMOTED_ZERO_INDEPENDENCE_ZERO_SELECTION'
    | 'THIRD_WAVE_CANDIDATE_LINEAGE_ADJUDICATION_NOT_READY';
  upstreamI189EvidenceId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI189BoundaryAccepted: boolean;
  i189EvidenceAdequateForReadiness: boolean;
  i189FiveObservationRecordAccepted: boolean;
  i189SixSearchChannelExecutionAccepted: boolean;
  i189IndependenceZeroAccepted: boolean;
  targetedLineageCandidateIds: readonly ['QU_WEI_2003_SIZHU_TEXUNBAN_JIANGYI'] | readonly [];
  targetedLineageCandidateCount: 1 | 0;
  onlyQuWeiPromotedToTargetedLineage: boolean;
  quWeiExactScopeEvidenceAdequateForLineageReview: boolean;
  quWeiAuthorAndWorkIdentityAdequateForLineageReview: boolean;
  quWeiSelfDated2003ChronologyAdequateForLineageReview: boolean;
  quWeiFormalPublicationIdentityRequiredBeforeLineageDiscovery: false;
  quWeiCurrentLineageDisposition: 'UNRESOLVED_REJECT_INDEPENDENCE_CLAIM' | 'NOT_ASSESSED';
  quWeiLineageRiskSignalFromLiHanchenSuccessionTaxonomyPreserved: boolean;
  quWeiIndependenceEstablishedByThisGate: false;
  liHongchengExactScopeObservationPreserved: boolean;
  liHongchengExactPassageSourceIdentityStillIncomplete: boolean;
  liHongchengPromotedToTargetedLineageByThisGate: false;
  huXiaosanDerivativeRiskPreserved: boolean;
  huanglinRetransmissionRiskPreserved: boolean;
  moguExplicitHanchenSchoolSignalPreserved: boolean;
  derivativeRiskSurfacePromotedToIndependentCandidateCount: 0;
  lineageQuestionIds: readonly I190QuWeiLineageQuestionId[];
  lineageQuestionCount: 4 | 0;
  lineageQuestions: readonly I190QuWeiLineageQuestion[];
  lineageQuestionsFrozenProspectively: boolean;
  priorSameAuthorWorkComparisonRequired: boolean;
  liHanchenDependencyAdjudicationRequired: boolean;
  liHongchengRelationshipAdjudicationRequired: boolean;
  otherEarlierDistinctiveSourceSearchRequired: boolean;
  sameAuthorPriorWorkCountsAsIndependentAuthority: false;
  thirdPartySuccessionClaimAloneEstablishesDerivativeEdge: false;
  absenceOfDependencyEvidenceEstablishesIndependence: false;
  semanticDifferenceAloneEstablishesIndependence: false;
  chronologyDifferenceAloneEstablishesIndependence: false;
  targetedLineageAdjudicationReadinessEstablished: boolean;
  targetedLineageEvidenceAcquisitionAuthorizedByThisGate: boolean;
  targetedLineageAdjudicationExecutedByThisGate: false;
  explicitDerivativeRelationshipCheckRequired: boolean;
  derivativeRetransmissionCountsAsIndependentAuthority: false;
  unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM';
  sourceClassAloneSufficient: false;
  sourceCountMayBecomeNumericWeight: false;
  provenanceTierMayBecomeNumericWeight: false;
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
  evidenceRebindingMethodologicallyReady: false;
  evidenceRebindingAuthorizedByThisGate: false;
  remediationStrategySelectedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_THIRD_WAVE_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_ADJUDICATION_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI189Accepted(i189: I189ThirdWaveNewProvenanceCandidateDiscoveryEvidenceReport): boolean {
  return (
    i189.status === 'RESOLVED_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE' &&
    i189.decision ===
      'THIRD_WAVE_DISCOVERY_EXECUTED_FIVE_OBSERVATIONS_ONE_MINIMUM_ADEQUACY_REVIEW_CANDIDATE_QU_WEI_LI_HONGCHENG_SOURCE_IDENTITY_INCOMPLETE_THREE_DERIVATIVE_RISK_SURFACES_ZERO_INDEPENDENCE_ZERO_SELECTION' &&
    i189.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i189.policyVersion === 'v1-definition' &&
    i189.adoptionVersion === 'v1-adoption' &&
    i189.currentCandidateSetVersion === 'v1-candidate-set' &&
    i189.currentInputPackageVersion === 'v2-input-package' &&
    i189.exactI188BoundaryAccepted &&
    i189.conclusionNeutralDiscoveryPreserved &&
    i189.searchChannelExecutionCount === 6 &&
    i189.allSixFrozenSearchChannelsExecuted &&
    i189.discoveryExecutedByThisGate &&
    i189.discoveryObservationCount === 5 &&
    i189.observations.length === 5 &&
    i189.candidateEvidenceAcquiredByThisGate &&
    i189.genuinelyNewAuthorOrWorkObservationCount === 2 &&
    i189.minimumAdequacyReviewCandidateCount === 1 &&
    i189.minimumAdequacyReviewCandidateIds.length === 1 &&
    i189.minimumAdequacyReviewCandidateIds[0] === 'QU_WEI_2003_SIZHU_TEXUNBAN_JIANGYI' &&
    i189.sourceIdentityIncompleteObservationCount === 1 &&
    i189.derivativeRiskOrRetransmissionObservationCount === 3 &&
    i189.quWeiExactScopeEvidenceObserved &&
    i189.quWeiSelfDated2003WorkIdentityObserved &&
    i189.quWeiMinimumAdequacyReviewCandidate &&
    i189.quWeiLineageRiskSignalObserved &&
    i189.quWeiLineageAdjudicationComplete === false &&
    i189.quWeiIndependentNormativeProvenanceEstablished === false &&
    i189.liHongchengExactScopeEvidenceObserved &&
    i189.liHongchengAuthorAnd2003ChronologyObserved &&
    i189.liHongchengExactPassageSingleWorkPublicationIdentityComplete === false &&
    i189.liHongchengMinimumAdequacyReviewCandidate === false &&
    i189.huXiaosanDerivativeRiskUnresolved &&
    i189.huanglinNearVerbatimRetransmissionRiskObserved &&
    i189.moguExactUpstreamSchoolAttributionObserved &&
    i189.moguMayQualifyAsIndependentOrigin === false &&
    i189.explicitDerivativeRelationshipCheckStillRequired &&
    i189.derivativeRetransmissionCountsAsIndependentAuthority === false &&
    i189.unresolvedLineageDefaultDisposition === 'REJECT_INDEPENDENCE_CLAIM' &&
    i189.sourceClassAloneSufficient === false &&
    i189.sourceCountMayBecomeNumericWeight === false &&
    i189.provenanceTierMayBecomeNumericWeight === false &&
    i189.provenanceIndependenceAdjudicatedByThisGate === false &&
    i189.independentNormativeProvenanceEstablishedCount === 0 &&
    i189.candidateSelectedByThisGate === false &&
    i189.candidateRegistrationAuthorizedByThisGate === false &&
    i189.candidateSetMutatedByThisGate === false &&
    i189.candidateSetReevaluationAuthorizedByThisGate === false &&
    i189.currentV2PackageAndCandidateSetRemainImmutable &&
    i189.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i189.liSameTargetDirectPrimaryPathRemainsMethodologicallyOpen &&
    i189.liSameTargetPathSuspendedNotRetired &&
    i189.liSameTargetMayReopenOnMateriallyNewDirectLead &&
    i189.targetedDiscoveryExhaustionEstablished === false &&
    i189.corpusExhaustionEstablished === false &&
    i189.searchSilenceCreatesNegativeFinding === false &&
    i189.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i189.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i189.evidenceRebindingMethodologicallyReady === false &&
    i189.productionPolicyExecutionAuthorized === false &&
    i189.actualCompositionPerformedByThisGate === false &&
    i189.multiSourceCompositionAuthorized === false &&
    i189.authorityAcquiredByThisGate === false &&
    i189.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i189.thresholdRuleCreatedByThisGate === false &&
    i189.damageEvaluationAuthorized === false &&
    i189.classificationAuthorized === false &&
    i189.numericScoringAuthorized === false &&
    i189.hiddenStemInteractionEligibilityGapRemains &&
    i189.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i189.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_THIRD_WAVE_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_ADJUDICATION_READINESS_REVIEW'
  );
}

function lineageQuestions(): readonly I190QuWeiLineageQuestion[] {
  return Object.freeze([
    {
      questionId: 'QU_WEI_PRIOR_SAME_AUTHOR_WORK_TARGET_PASSAGE_OR_DOCTRINE_DEPENDENCY',
      question: 'Does the 2003 target doctrine or distinctive wording already occur in 曲炜 prior same-author works such as 《四柱详真》 or 《四柱信息取象》?',
      minimumQualifyingEvidence: Object.freeze([
        'reproducible prior same-author witness identity',
        'target passage or distinctive terminology comparison',
        'chronology sufficient to establish direction',
      ]),
      unresolvedDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM',
      answeredByThisGate: false,
    },
    {
      questionId: 'QU_WEI_LI_HANCHEN_DOCTRINAL_LINEAGE_DEPENDENCY',
      question: 'Is 曲炜 2003 remote-stem doctrine derivative from, taught through, quoted from, or otherwise dependent on 李涵辰隔不作用 authority?',
      minimumQualifyingEvidence: Object.freeze([
        'direct citation, attribution, teaching lineage, preface statement, or distinctive passage relationship',
        'traceable 李涵辰 witness identity',
        'chronology and relationship direction',
      ]),
      unresolvedDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM',
      answeredByThisGate: false,
    },
    {
      questionId: 'QU_WEI_LI_HONGCHENG_RELATIONSHIP_OR_INDEPENDENT_PARALLEL_DEVELOPMENT',
      question: 'What, if any, relationship exists between 曲炜 remote-stem doctrine and 李洪成隔柱减力 material, and can parallel development be distinguished from transmission?',
      minimumQualifyingEvidence: Object.freeze([
        'traceable source identities on both sides',
        'specific shared or divergent mechanism evidence',
        'chronology plus citation/teaching/quotation relationship evidence or explicit absence only where a source can establish it',
      ]),
      unresolvedDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM',
      answeredByThisGate: false,
    },
    {
      questionId: 'QU_WEI_OTHER_EARLIER_DISTINCTIVE_SOURCE_DEPENDENCY',
      question: 'Is there another earlier identifiable source that contains the distinctive adjacent/one-gap/two-gap/year-hour route and can establish an upstream dependency?',
      minimumQualifyingEvidence: Object.freeze([
        'earlier dated source identity',
        'distinctive target-scope passage or mechanism match',
        'relationship evidence beyond generic 五行 vocabulary',
      ]),
      unresolvedDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM',
      answeredByThisGate: false,
    },
  ]);
}

function finalized(
  material: Omit<I190ThirdWaveCandidateEvidenceAdequacyLineageAdjudicationReadinessReviewReport, 'reviewId'>,
): I190ThirdWaveCandidateEvidenceAdequacyLineageAdjudicationReadinessReviewReport {
  return {
    reviewId: `i190_third_wave_lineage_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI190ThirdWaveCandidateEvidenceAdequacyLineageAdjudicationReadinessReview(
  i189: I189ThirdWaveNewProvenanceCandidateDiscoveryEvidenceReport,
): I190ThirdWaveCandidateEvidenceAdequacyLineageAdjudicationReadinessReviewReport {
  const accepted = exactI189Accepted(i189);

  return finalized({
    reviewVersion: I190_THIRD_WAVE_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_ADJUDICATION_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_THIRD_WAVE_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_ADJUDICATION_READINESS_REVIEW'
      : 'I189_DISCOVERY_EVIDENCE_BOUNDARY_INVALID',
    decision: accepted
      ? 'I189_EVIDENCE_ADEQUATE_ONE_MINIMUM_ADEQUACY_CANDIDATE_QU_WEI_READY_FOR_TARGETED_LINEAGE_ADJUDICATION_FOUR_QUESTIONS_FROZEN_LI_HONGCHENG_NOT_PROMOTED_THREE_DERIVATIVE_RISK_SURFACES_NOT_PROMOTED_ZERO_INDEPENDENCE_ZERO_SELECTION'
      : 'THIRD_WAVE_CANDIDATE_LINEAGE_ADJUDICATION_NOT_READY',
    upstreamI189EvidenceId: i189.evidenceId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI189BoundaryAccepted: accepted,
    i189EvidenceAdequateForReadiness: accepted,
    i189FiveObservationRecordAccepted: accepted,
    i189SixSearchChannelExecutionAccepted: accepted,
    i189IndependenceZeroAccepted: accepted,
    targetedLineageCandidateIds: accepted ? Object.freeze(['QU_WEI_2003_SIZHU_TEXUNBAN_JIANGYI'] as const) : Object.freeze([]),
    targetedLineageCandidateCount: accepted ? 1 : 0,
    onlyQuWeiPromotedToTargetedLineage: accepted,
    quWeiExactScopeEvidenceAdequateForLineageReview: accepted,
    quWeiAuthorAndWorkIdentityAdequateForLineageReview: accepted,
    quWeiSelfDated2003ChronologyAdequateForLineageReview: accepted,
    quWeiFormalPublicationIdentityRequiredBeforeLineageDiscovery: false,
    quWeiCurrentLineageDisposition: accepted ? 'UNRESOLVED_REJECT_INDEPENDENCE_CLAIM' : 'NOT_ASSESSED',
    quWeiLineageRiskSignalFromLiHanchenSuccessionTaxonomyPreserved: accepted,
    quWeiIndependenceEstablishedByThisGate: false,
    liHongchengExactScopeObservationPreserved: accepted,
    liHongchengExactPassageSourceIdentityStillIncomplete: accepted,
    liHongchengPromotedToTargetedLineageByThisGate: false,
    huXiaosanDerivativeRiskPreserved: accepted,
    huanglinRetransmissionRiskPreserved: accepted,
    moguExplicitHanchenSchoolSignalPreserved: accepted,
    derivativeRiskSurfacePromotedToIndependentCandidateCount: 0,
    lineageQuestionIds: accepted ? I190_QU_WEI_LINEAGE_QUESTION_IDS : Object.freeze([]),
    lineageQuestionCount: accepted ? 4 : 0,
    lineageQuestions: accepted ? lineageQuestions() : Object.freeze([]),
    lineageQuestionsFrozenProspectively: accepted,
    priorSameAuthorWorkComparisonRequired: accepted,
    liHanchenDependencyAdjudicationRequired: accepted,
    liHongchengRelationshipAdjudicationRequired: accepted,
    otherEarlierDistinctiveSourceSearchRequired: accepted,
    sameAuthorPriorWorkCountsAsIndependentAuthority: false,
    thirdPartySuccessionClaimAloneEstablishesDerivativeEdge: false,
    absenceOfDependencyEvidenceEstablishesIndependence: false,
    semanticDifferenceAloneEstablishesIndependence: false,
    chronologyDifferenceAloneEstablishesIndependence: false,
    targetedLineageAdjudicationReadinessEstablished: accepted,
    targetedLineageEvidenceAcquisitionAuthorizedByThisGate: accepted,
    targetedLineageAdjudicationExecutedByThisGate: false,
    explicitDerivativeRelationshipCheckRequired: accepted,
    derivativeRetransmissionCountsAsIndependentAuthority: false,
    unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM',
    sourceClassAloneSufficient: false,
    sourceCountMayBecomeNumericWeight: false,
    provenanceTierMayBecomeNumericWeight: false,
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
    evidenceRebindingMethodologicallyReady: false,
    evidenceRebindingAuthorizedByThisGate: false,
    remediationStrategySelectedByThisGate: false,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_THIRD_WAVE_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_ADJUDICATION_READINESS_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I190 accepts I189 as evidence-adequate only for readiness and restricts targeted lineage adjudication to 曲炜 2003.',
          'The self-dated 2003 witness is adequate to investigate lineage without requiring a formal publisher/ISBN first; that does not make the witness independent.',
          'Four prospective lineage questions cover same-author prior works, 李涵辰 dependency, 李洪成 relationship/parallel development, and any other earlier distinctive source.',
          '李洪成 remains an exact-scope observation with incomplete single-work passage identity; 胡小三, 黄麟, and 墨谷 remain derivative-risk/retransmission observations and are not promoted.',
        ])
      : Object.freeze(['I189 boundary mismatch prevents third-wave lineage readiness.']),
  });
}
