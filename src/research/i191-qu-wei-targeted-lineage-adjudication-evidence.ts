import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I190ThirdWaveCandidateEvidenceAdequacyLineageAdjudicationReadinessReviewReport } from './i190-third-wave-candidate-evidence-adequacy-lineage-adjudication-readiness-review.js';
import { I190_QU_WEI_LINEAGE_QUESTION_IDS } from './i190-third-wave-candidate-evidence-adequacy-lineage-adjudication-readiness-review.js';

export const I191_QU_WEI_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE_VERSION =
  'myeonghwa-qu-wei-targeted-lineage-adjudication-evidence-v1';

export type I191LineageFinding =
  | 'PRIOR_SAME_AUTHOR_DOCTRINAL_DEPENDENCY_FOUND'
  | 'EARLIER_LI_HANCHEN_DOCTRINAL_SOURCE_AND_SUCCESSION_RISK_DIRECT_DEPENDENCY_UNRESOLVED'
  | 'LI_HONGCHENG_GENERAL_TEACHING_LINEAGE_AND_NON_TARGET_METHOD_DEPENDENCY_FOUND_TARGET_SCOPE_DEPENDENCY_UNRESOLVED'
  | 'EARLIER_DISTINCTIVE_SOURCE_FOUND_RELATIONSHIP_TO_QU_WEI_UNRESOLVED';

export interface I191LineageQuestionResult {
  questionId: (typeof I190_QU_WEI_LINEAGE_QUESTION_IDS)[number];
  finding: I191LineageFinding;
  resolvedAsDerivativeDependency: boolean;
  directTargetScopeDependencyResolved: boolean;
  evidenceLocators: readonly string[];
  evidenceSummary: string;
  unresolvedDefaultDispositionPreserved: boolean;
}

export interface I191QuWeiTargetedLineageAdjudicationEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_QU_WEI_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE'
    | 'I190_LINEAGE_READINESS_BOUNDARY_INVALID';
  decision:
    | 'QU_WEI_TARGETED_LINEAGE_DISCOVERY_EXECUTED_PRIOR_SAME_AUTHOR_DOCTRINAL_DEPENDENCY_FOUND_LI_HANCHEN_EARLIER_DOCTRINAL_SOURCE_AND_SUCCESSION_RISK_DIRECT_DEPENDENCY_UNRESOLVED_LI_HONGCHENG_GENERAL_TEACHING_LINEAGE_FOUND_TARGET_SCOPE_DEPENDENCY_UNRESOLVED_OTHER_EARLIER_DISTINCTIVE_SOURCE_RELATIONSHIP_UNRESOLVED_ZERO_INDEPENDENCE_2003_PRESUMED_ORIGIN_REQUIRES_REASSESSMENT'
    | 'QU_WEI_TARGETED_LINEAGE_DISCOVERY_NOT_EXECUTED';
  upstreamI190ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI190BoundaryAccepted: boolean;
  targetedCandidateId: 'QU_WEI_2003_SIZHU_TEXUNBAN_JIANGYI' | null;
  targetedLineageAdjudicationExecutedByThisGate: boolean;
  lineageQuestionResultCount: 4 | 0;
  lineageQuestionResults: readonly I191LineageQuestionResult[];
  allFourFrozenQuestionsExecuted: boolean;
  priorSameAuthorDependencyFound: boolean;
  priorSameAuthorWorkIdentity: 'QU_WEI_SIZHU_XIANGZHEN_2001' | null;
  priorSameAuthorWorkTitle: '《四柱详真》' | null;
  priorSameAuthorWorkChronologyEstablished: boolean;
  priorSameAuthorWorkYear: 2001 | null;
  target2003PrefaceExplicitlyBasesLectureOnPriorWorks: boolean;
  priorWorkContainsDistanceSensitiveStemForceDoctrine: boolean;
  priorWorkContainsAdjacentVsGapForceDifferentiation: boolean;
  priorWorkContainsCrossPillarDirectInteractionRestriction: boolean;
  priorWorkContainsGapClashNoEffectiveForceRule: boolean;
  exact2003PassageVerbatimInPriorWorkEstablished: false;
  sameAuthorDependencyRelationship: 'PRIOR_SAME_AUTHOR_DOCTRINAL_DEPENDENCY' | 'NOT_ASSESSED';
  quWei2003MayRemainPresumedOrigin: false;
  quWei2003RequiresOriginReassessment: boolean;
  liHanchenEarlierWorkIdentityEstablished: boolean;
  liHanchenEarlierWorkTitle: '《八字预测真踪》' | null;
  liHanchenEarlierWorkYear: 1999 | null;
  liHanchenEarlierWorkContainsGeBuZuoyongDoctrine: boolean;
  thirdPartyQuWeiSuccessionSignalObserved: boolean;
  directQuWeiToLiHanchenCitationOrTeachingDependencyEstablished: false;
  liHanchenTargetScopeDependencyResolved: false;
  liHongchengGeneralTeachingLineageEstablished: boolean;
  liHongchengTeacherStudentRelationshipEvidenceObserved: boolean;
  quWeiPriorWorkDirectlyCitesLiHongchengMethods: boolean;
  liHongchengCitedMethodScopeIncludesScoringAndLayerTheory: boolean;
  liHongchengTargetRemoteKeDependencyEstablished: false;
  liHongchengTargetScopeRelationshipResolved: false;
  otherEarlierDistinctiveSourceObserved: boolean;
  otherEarlierDistinctiveSourceRelationshipToQuWeiResolved: false;
  explicitDerivativeRelationshipFindingCount: 1 | 0;
  unresolvedTargetDependencyQuestionCount: 3 | 0;
  explicitNegativeFindingCount: 0;
  searchSilenceCreatesNegativeFinding: false;
  absenceOfDirectDependencyEvidenceEstablishesIndependence: false;
  priorSameAuthorWorkCountsAsIndependentAuthority: false;
  thirdPartySuccessionClaimAloneEstablishesDerivativeEdge: false;
  earlierDoctrineChronologyAloneEstablishesDerivativeEdge: false;
  generalTeacherRelationshipAloneEstablishesTargetScopeDependency: false;
  targetCandidateIndependentNormativeProvenanceEstablished: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  independentNormativeProvenanceEstablishedCount: 0;
  explicitDerivativeRelationshipCheckRequired: boolean;
  derivativeRetransmissionCountsAsIndependentAuthority: false;
  unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM';
  sourceClassAloneSufficient: false;
  sourceCountMayBecomeNumericWeight: false;
  provenanceTierMayBecomeNumericWeight: false;
  candidateSelectedByThisGate: false;
  candidateRegistrationAuthorizedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
  newCandidateSetVersionCreatedByThisGate: false;
  newInputPackageVersionCreatedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  quWeiPriorWitnessRebindingExecutedByThisGate: false;
  quWeiPriorWitnessRebindingAuthorizedByThisGate: false;
  quWeiPriorWitnessIdentityAcquisitionAuthorizedByThisGate: false;
  liSameTargetDirectPrimaryPathRemainsMethodologicallyOpen: boolean;
  liSameTargetPathSuspendedNotRetired: boolean;
  liSameTargetMayReopenOnMateriallyNewDirectLead: boolean;
  liPublicationMediumOrEntityGapStillOpen: boolean;
  liCanonicalDigitalWitnessNormalizationGapStillOpen: boolean;
  li1998WitnessIndependentProvenanceEstablished: false;
  targetedDiscoveryExhaustionEstablished: false;
  corpusExhaustionEstablished: false;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_LINEAGE_EVIDENCE_ADEQUACY_ORIGIN_REASSESSMENT_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE';
  notes: readonly string[];
}

function exactI190Accepted(i190: I190ThirdWaveCandidateEvidenceAdequacyLineageAdjudicationReadinessReviewReport): boolean {
  return (
    i190.status === 'RESOLVED_THIRD_WAVE_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_ADJUDICATION_READINESS_REVIEW' &&
    i190.decision ===
      'I189_EVIDENCE_ADEQUATE_ONE_MINIMUM_ADEQUACY_CANDIDATE_QU_WEI_READY_FOR_TARGETED_LINEAGE_ADJUDICATION_FOUR_QUESTIONS_FROZEN_LI_HONGCHENG_NOT_PROMOTED_THREE_DERIVATIVE_RISK_SURFACES_NOT_PROMOTED_ZERO_INDEPENDENCE_ZERO_SELECTION' &&
    i190.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i190.policyVersion === 'v1-definition' &&
    i190.adoptionVersion === 'v1-adoption' &&
    i190.currentCandidateSetVersion === 'v1-candidate-set' &&
    i190.currentInputPackageVersion === 'v2-input-package' &&
    i190.exactI189BoundaryAccepted &&
    i190.i189EvidenceAdequateForReadiness &&
    i190.targetedLineageCandidateCount === 1 &&
    i190.targetedLineageCandidateIds.length === 1 &&
    i190.targetedLineageCandidateIds[0] === 'QU_WEI_2003_SIZHU_TEXUNBAN_JIANGYI' &&
    i190.onlyQuWeiPromotedToTargetedLineage &&
    i190.quWeiCurrentLineageDisposition === 'UNRESOLVED_REJECT_INDEPENDENCE_CLAIM' &&
    i190.lineageQuestionCount === 4 &&
    i190.lineageQuestionIds.length === 4 &&
    I190_QU_WEI_LINEAGE_QUESTION_IDS.every((id, index) => i190.lineageQuestionIds[index] === id) &&
    i190.lineageQuestionsFrozenProspectively &&
    i190.targetedLineageAdjudicationReadinessEstablished &&
    i190.targetedLineageEvidenceAcquisitionAuthorizedByThisGate &&
    i190.targetedLineageAdjudicationExecutedByThisGate === false &&
    i190.explicitDerivativeRelationshipCheckRequired &&
    i190.derivativeRetransmissionCountsAsIndependentAuthority === false &&
    i190.unresolvedLineageDefaultDisposition === 'REJECT_INDEPENDENCE_CLAIM' &&
    i190.provenanceIndependenceAdjudicatedByThisGate === false &&
    i190.independentNormativeProvenanceEstablishedCount === 0 &&
    i190.candidateSelectedByThisGate === false &&
    i190.candidateSetMutatedByThisGate === false &&
    i190.currentV2PackageAndCandidateSetRemainImmutable &&
    i190.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i190.targetedDiscoveryExhaustionEstablished === false &&
    i190.corpusExhaustionEstablished === false &&
    i190.searchSilenceCreatesNegativeFinding === false &&
    i190.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i190.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i190.evidenceRebindingMethodologicallyReady === false &&
    i190.productionPolicyExecutionAuthorized === false &&
    i190.actualCompositionPerformedByThisGate === false &&
    i190.multiSourceCompositionAuthorized === false &&
    i190.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i190.thresholdRuleCreatedByThisGate === false &&
    i190.damageEvaluationAuthorized === false &&
    i190.classificationAuthorized === false &&
    i190.numericScoringAuthorized === false &&
    i190.hiddenStemInteractionEligibilityGapRemains &&
    i190.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i190.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE'
  );
}

function questionResults(): readonly I191LineageQuestionResult[] {
  return Object.freeze([
    {
      questionId: 'QU_WEI_PRIOR_SAME_AUTHOR_WORK_TARGET_PASSAGE_OR_DOCTRINE_DEPENDENCY',
      finding: 'PRIOR_SAME_AUTHOR_DOCTRINAL_DEPENDENCY_FOUND',
      resolvedAsDerivativeDependency: true,
      directTargetScopeDependencyResolved: true,
      evidenceLocators: Object.freeze([
        'https://www.zhouyiqw.com/qwjj.php',
        'https://www.scribd.com/document/733612931/',
        'https://de.scribd.com/document/398602563/',
        'https://pdfcoffee.com/-3194-pdf-free.html',
      ]),
      evidenceSummary:
        '曲炜 chronology places 《四柱详真》 in 2001. The 2003 lecture preface explicitly says the lecture is organized on 《四柱详真》 and 《四柱信息取象》. The earlier 《四柱详真》 already contains distance-sensitive interaction doctrine: adjacent versus gap force differentiation, cross-pillar direct-interaction restriction, and gap clash with no effective force. This establishes prior same-author doctrinal dependency, while exact verbatim identity of the 2003 passage is not asserted.',
      unresolvedDefaultDispositionPreserved: true,
    },
    {
      questionId: 'QU_WEI_LI_HANCHEN_DOCTRINAL_LINEAGE_DEPENDENCY',
      finding: 'EARLIER_LI_HANCHEN_DOCTRINAL_SOURCE_AND_SUCCESSION_RISK_DIRECT_DEPENDENCY_UNRESOLVED',
      resolvedAsDerivativeDependency: false,
      directTargetScopeDependencyResolved: false,
      evidenceLocators: Object.freeze([
        'https://www.scribd.com/document/1013295006/',
        'https://read01.com/zh-hk/o5g60.html',
        'https://mt.sohu.com/20160907/n467823377.shtml',
      ]),
      evidenceSummary:
        '李涵辰《八字预测真踪》 is self-dated 1999 and later reproduced commentary states the rule 隔不作用 for stems/branches. A third-party taxonomy calls 曲炜 an inheritor of this doctrine. No direct 曲炜 citation, teaching statement, or traceable transmission edge to 李涵辰 was established in this bounded adjudication, so direct target-scope dependency remains unresolved.',
      unresolvedDefaultDispositionPreserved: true,
    },
    {
      questionId: 'QU_WEI_LI_HONGCHENG_RELATIONSHIP_OR_INDEPENDENT_PARALLEL_DEVELOPMENT',
      finding: 'LI_HONGCHENG_GENERAL_TEACHING_LINEAGE_AND_NON_TARGET_METHOD_DEPENDENCY_FOUND_TARGET_SCOPE_DEPENDENCY_UNRESOLVED',
      resolvedAsDerivativeDependency: false,
      directTargetScopeDependencyResolved: false,
      evidenceLocators: Object.freeze([
        'https://www.scribd.com/document/495620785/',
        'https://www.scribd.com/document/981013403/',
        'https://de.scribd.com/document/398602563/',
      ]),
      evidenceSummary:
        'A contemporary preface records that 曲炜 entered 李洪成 teacher lineage and studied at his organization. 《四柱详真》 directly discusses adapting 李洪成 scoring and layer-theory methods. These facts establish general teaching lineage and non-target methodological dependency, but no source found here binds the target remote-克 route specifically to 李洪成, so target-scope dependency remains unresolved.',
      unresolvedDefaultDispositionPreserved: true,
    },
    {
      questionId: 'QU_WEI_OTHER_EARLIER_DISTINCTIVE_SOURCE_DEPENDENCY',
      finding: 'EARLIER_DISTINCTIVE_SOURCE_FOUND_RELATIONSHIP_TO_QU_WEI_UNRESOLVED',
      resolvedAsDerivativeDependency: false,
      directTargetScopeDependencyResolved: false,
      evidenceLocators: Object.freeze([
        'https://www.scribd.com/document/1013295006/',
        'https://mt.sohu.com/20160907/n467823377.shtml',
      ]),
      evidenceSummary:
        'An identifiable 1999 李涵辰 witness predates the 2001/2003 曲炜 works and contains a distinctive separated-elements non-action doctrine. Chronology establishes an earlier distinctive source, not the transmission relationship. The relationship to 曲炜 remains unresolved absent direct lineage evidence.',
      unresolvedDefaultDispositionPreserved: true,
    },
  ]);
}

function finalized(
  material: Omit<I191QuWeiTargetedLineageAdjudicationEvidenceReport, 'evidenceId'>,
): I191QuWeiTargetedLineageAdjudicationEvidenceReport {
  return {
    evidenceId: `i191_qu_wei_lineage_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI191QuWeiTargetedLineageAdjudicationEvidence(
  i190: I190ThirdWaveCandidateEvidenceAdequacyLineageAdjudicationReadinessReviewReport,
): I191QuWeiTargetedLineageAdjudicationEvidenceReport {
  const accepted = exactI190Accepted(i190);
  return finalized({
    evidenceVersion: I191_QU_WEI_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE_VERSION,
    status: accepted ? 'RESOLVED_QU_WEI_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE' : 'I190_LINEAGE_READINESS_BOUNDARY_INVALID',
    decision: accepted
      ? 'QU_WEI_TARGETED_LINEAGE_DISCOVERY_EXECUTED_PRIOR_SAME_AUTHOR_DOCTRINAL_DEPENDENCY_FOUND_LI_HANCHEN_EARLIER_DOCTRINAL_SOURCE_AND_SUCCESSION_RISK_DIRECT_DEPENDENCY_UNRESOLVED_LI_HONGCHENG_GENERAL_TEACHING_LINEAGE_FOUND_TARGET_SCOPE_DEPENDENCY_UNRESOLVED_OTHER_EARLIER_DISTINCTIVE_SOURCE_RELATIONSHIP_UNRESOLVED_ZERO_INDEPENDENCE_2003_PRESUMED_ORIGIN_REQUIRES_REASSESSMENT'
      : 'QU_WEI_TARGETED_LINEAGE_DISCOVERY_NOT_EXECUTED',
    upstreamI190ReviewId: i190.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI190BoundaryAccepted: accepted,
    targetedCandidateId: accepted ? 'QU_WEI_2003_SIZHU_TEXUNBAN_JIANGYI' : null,
    targetedLineageAdjudicationExecutedByThisGate: accepted,
    lineageQuestionResultCount: accepted ? 4 : 0,
    lineageQuestionResults: accepted ? questionResults() : Object.freeze([]),
    allFourFrozenQuestionsExecuted: accepted,
    priorSameAuthorDependencyFound: accepted,
    priorSameAuthorWorkIdentity: accepted ? 'QU_WEI_SIZHU_XIANGZHEN_2001' : null,
    priorSameAuthorWorkTitle: accepted ? '《四柱详真》' : null,
    priorSameAuthorWorkChronologyEstablished: accepted,
    priorSameAuthorWorkYear: accepted ? 2001 : null,
    target2003PrefaceExplicitlyBasesLectureOnPriorWorks: accepted,
    priorWorkContainsDistanceSensitiveStemForceDoctrine: accepted,
    priorWorkContainsAdjacentVsGapForceDifferentiation: accepted,
    priorWorkContainsCrossPillarDirectInteractionRestriction: accepted,
    priorWorkContainsGapClashNoEffectiveForceRule: accepted,
    exact2003PassageVerbatimInPriorWorkEstablished: false,
    sameAuthorDependencyRelationship: accepted ? 'PRIOR_SAME_AUTHOR_DOCTRINAL_DEPENDENCY' : 'NOT_ASSESSED',
    quWei2003MayRemainPresumedOrigin: false,
    quWei2003RequiresOriginReassessment: accepted,
    liHanchenEarlierWorkIdentityEstablished: accepted,
    liHanchenEarlierWorkTitle: accepted ? '《八字预测真踪》' : null,
    liHanchenEarlierWorkYear: accepted ? 1999 : null,
    liHanchenEarlierWorkContainsGeBuZuoyongDoctrine: accepted,
    thirdPartyQuWeiSuccessionSignalObserved: accepted,
    directQuWeiToLiHanchenCitationOrTeachingDependencyEstablished: false,
    liHanchenTargetScopeDependencyResolved: false,
    liHongchengGeneralTeachingLineageEstablished: accepted,
    liHongchengTeacherStudentRelationshipEvidenceObserved: accepted,
    quWeiPriorWorkDirectlyCitesLiHongchengMethods: accepted,
    liHongchengCitedMethodScopeIncludesScoringAndLayerTheory: accepted,
    liHongchengTargetRemoteKeDependencyEstablished: false,
    liHongchengTargetScopeRelationshipResolved: false,
    otherEarlierDistinctiveSourceObserved: accepted,
    otherEarlierDistinctiveSourceRelationshipToQuWeiResolved: false,
    explicitDerivativeRelationshipFindingCount: accepted ? 1 : 0,
    unresolvedTargetDependencyQuestionCount: accepted ? 3 : 0,
    explicitNegativeFindingCount: 0,
    searchSilenceCreatesNegativeFinding: false,
    absenceOfDirectDependencyEvidenceEstablishesIndependence: false,
    priorSameAuthorWorkCountsAsIndependentAuthority: false,
    thirdPartySuccessionClaimAloneEstablishesDerivativeEdge: false,
    earlierDoctrineChronologyAloneEstablishesDerivativeEdge: false,
    generalTeacherRelationshipAloneEstablishesTargetScopeDependency: false,
    targetCandidateIndependentNormativeProvenanceEstablished: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    explicitDerivativeRelationshipCheckRequired: accepted,
    derivativeRetransmissionCountsAsIndependentAuthority: false,
    unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM',
    sourceClassAloneSufficient: false,
    sourceCountMayBecomeNumericWeight: false,
    provenanceTierMayBecomeNumericWeight: false,
    candidateSelectedByThisGate: false,
    candidateRegistrationAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    quWeiPriorWitnessRebindingExecutedByThisGate: false,
    quWeiPriorWitnessRebindingAuthorizedByThisGate: false,
    quWeiPriorWitnessIdentityAcquisitionAuthorizedByThisGate: false,
    liSameTargetDirectPrimaryPathRemainsMethodologicallyOpen: accepted,
    liSameTargetPathSuspendedNotRetired: accepted,
    liSameTargetMayReopenOnMateriallyNewDirectLead: accepted,
    liPublicationMediumOrEntityGapStillOpen: accepted,
    liCanonicalDigitalWitnessNormalizationGapStillOpen: accepted,
    li1998WitnessIndependentProvenanceEstablished: false,
    targetedDiscoveryExhaustionEstablished: false,
    corpusExhaustionEstablished: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
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
    recommendedNextGate: accepted
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_LINEAGE_EVIDENCE_ADEQUACY_ORIGIN_REASSESSMENT_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_QU_WEI_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE',
    notes: accepted
      ? Object.freeze([
          'The 2003 曲炜 witness is no longer methodologically supportable as a presumed origin because its own preface bases the lecture on prior same-author works and the 2001 《四柱详真》 already contains the relevant distance-sensitive interaction doctrine.',
          'This gate does not claim exact verbatim retransmission: the established relationship is prior same-author doctrinal dependency.',
          '李涵辰 1999 provides an earlier distinctive 隔不作用 doctrine and a later third-party succession signal, but no direct 曲炜-to-李涵辰 target-scope transmission edge is established here.',
          'A contemporary preface establishes 曲炜 entered 李洪成 teaching lineage, and 《四柱详真》 cites/adapts 李洪成 methods; target remote-克 dependency specifically remains unresolved.',
          'The next review must reassess the 2003 presumed-origin status and determine whether the 2001 prior witness identity/target passage is adequate for a controlled prior-witness acquisition or rebinding path. No rebinding is authorized or executed here.',
        ])
      : Object.freeze(['I190 boundary mismatch prevents targeted lineage adjudication.']),
  });
}
