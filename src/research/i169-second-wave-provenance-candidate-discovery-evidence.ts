import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I168_DISCOVERY_REQUIREMENT_IDS,
  I168_QUERY_CONCEPT_IDS,
  I168_SEARCH_CHANNEL_IDS,
  type I168SecondWaveProvenanceCandidateDiscoveryReadinessReviewReport,
} from './i168-second-wave-provenance-candidate-discovery-readiness-review.js';

export const I169_SECOND_WAVE_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE_VERSION =
  'myeonghwa-source-ke-visible-stem-threshold-second-wave-provenance-candidate-discovery-evidence-v1';

export const I169_DISCOVERY_RECORD_IDS = Object.freeze([
  'LI_SHUNXIANG_SIZHU_XUANJI_2004',
  'SHAO_GANG_YIHUN_SIZHU_PIAN_AUTHOR_HOSTED',
  'ZHAO_ZHIYI_BAZI_ZHENJIAN_2003',
  'CHEN_BINGDI_TIANGAN_XIANGKE_WEB_ARTICLE',
] as const);

export type I169DiscoveryRecordId = (typeof I169_DISCOVERY_RECORD_IDS)[number];

export type I169IdentityStatus =
  | 'EXACT_PRINT_EDITION_IDENTITY_ESTABLISHED'
  | 'AUTHOR_WORK_IDENTITY_ESTABLISHED_PRINT_EDITION_INCOMPLETE'
  | 'DATED_WORK_IDENTITY_ESTABLISHED_PUBLICATION_CHAIN_INCOMPLETE'
  | 'ATTRIBUTED_WEB_WITNESS_DATE_AND_PUBLICATION_CHAIN_INCOMPLETE';

export type I169TargetRelevance =
  | 'DIRECT_POSITIONAL_FORCE_AND_BINARY_EXCEPTION_RELEVANCE'
  | 'DIRECT_REMOTE_INTERACTION_AND_BINARY_EXCEPTION_RELEVANCE'
  | 'POSITIONAL_INTERACTION_RELEVANCE_SCOPE_BRIDGE_REQUIRED';

export type I169LineageFinding = 'UNRESOLVED_AFTER_SECOND_WAVE_DISCOVERY';

export interface I169SecondWaveDiscoveryRecord {
  recordId: I169DiscoveryRecordId;
  authorAttribution: string;
  workTitle: string;
  witnessDescription: string;
  identityStatus: I169IdentityStatus;
  targetRelevance: I169TargetRelevance;
  normativePassageSummary: string;
  bibliographicOrWitnessEvidence: readonly string[];
  lineageEvidenceSummary: string;
  lineageFinding: I169LineageFinding;
  newNormativeProvenanceIdentityObserved: true;
  exactPrintEditionIdentityEstablished: boolean;
  directBinaryExceptionLanguageObserved: boolean;
  sameWorkOrDownstreamRetransmissionObserved: boolean;
  sameWorkOrDownstreamRetransmissionCountsAsNewAuthority: false;
  selectedSetSpecificDerivativeDependencyEstablished: false;
  independentNormativeProvenanceEstablished: false;
  qualifiesForLaterEvidenceAdequacyReview: boolean;
  qualificationGap: string | null;
}

export interface I169SecondWaveProvenanceCandidateDiscoveryEvidenceReport {
  evidenceRecordSetId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_SECOND_WAVE_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE'
    | 'I168_DISCOVERY_READINESS_INVALID';
  decision:
    | 'SECOND_WAVE_DISCOVERY_EXECUTED_FOUR_NEW_PROVENANCE_OBSERVATIONS_ONE_MINIMUM_ADEQUACY_REVIEW_CANDIDATE_ZERO_INDEPENDENCE_ZERO_SELECTION_LINEAGE_AND_IDENTITY_GAPS_REMAIN'
    | 'SECOND_WAVE_DISCOVERY_NOT_EXECUTED';
  upstreamI168ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI168BoundaryAccepted: boolean;
  discoveryExecuted: boolean;
  discoveryRequirementIds: readonly string[];
  searchChannelIds: readonly string[];
  queryConceptIds: readonly string[];
  discoveryRecords: readonly I169SecondWaveDiscoveryRecord[];
  discoveryObservationCount: 4 | 0;
  newNormativeProvenanceIdentityObservedCount: 4 | 0;
  exactPrintEditionIdentityEstablishedCount: 1 | 0;
  directBinaryExceptionLanguageObservedCount: 2 | 0;
  minimumAdequacyReviewCandidateCount: 1 | 0;
  lineageUnresolvedCount: 4 | 0;
  derivativeDependencyFoundCount: 0;
  explicitNegativeDerivativeFindingCount: 0;
  independentNormativeProvenanceEstablishedCount: 0;
  liShunxiangQualifiesForLaterEvidenceAdequacyReview: boolean;
  shaoGangQualifiesForLaterEvidenceAdequacyReview: false;
  zhaoZhiyiQualifiesForLaterEvidenceAdequacyReview: false;
  chenBingdiQualifiesForLaterEvidenceAdequacyReview: false;
  searchSilenceUsedAsNegativeFinding: false;
  chronologyUsedAsIndependenceFinding: false;
  sourceIdentityUsedAsIndependenceFinding: false;
  sourceCountVotingAllowed: false;
  provenanceTierWeightingAllowed: false;
  candidateSelectedByThisGate: false;
  remediationStrategySelectedByThisGate: false;
  remediationExecutionAuthorizedByThisGate: false;
  evidenceReboundByThisGate: false;
  candidateSetMutatedByThisGate: false;
  candidateRemovedByThisGate: false;
  candidateReplacedByThisGate: false;
  newCandidateSetVersionCreatedByThisGate: false;
  newInputPackageVersionCreatedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  candidateSetReevaluationPerformedByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_SECOND_WAVE_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_ADJUDICATION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_SECOND_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READINESS_REVIEW';
  notes: readonly string[];
}

function exactArray(actual: readonly string[], expected: readonly string[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function exactI168Accepted(i168: I168SecondWaveProvenanceCandidateDiscoveryReadinessReviewReport): boolean {
  return (
    i168.status === 'RESOLVED_SECOND_WAVE_PROVENANCE_CANDIDATE_DISCOVERY_READINESS_REVIEW' &&
    i168.decision ===
      'SECOND_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READY_CONCLUSION_NEUTRAL_SEARCH_SCOPE_AND_PROVENANCE_CONTROLS_FROZEN_NO_SELECTION_OR_MUTATION' &&
    i168.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i168.policyVersion === 'v1-definition' &&
    i168.adoptionVersion === 'v1-adoption' &&
    i168.currentCandidateSetVersion === 'v1-candidate-set' &&
    i168.currentInputPackageVersion === 'v2-input-package' &&
    i168.exactI167BoundaryAccepted &&
    i168.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i168.currentV2PackageAndCandidateSetRemainImmutable &&
    i168.firstWaveUnresolvedLineageFindingCount === 2 &&
    i168.firstWaveIndependentNormativeProvenanceEstablishedCount === 0 &&
    i168.liHanchenRemainsFirstWaveResearchCandidateNotRemediationReady &&
    i168.sunHaiyiRemainsFirstWaveLineageRiskCandidateNotRemediationReady &&
    i168.firstWaveCandidatesMayBeGrandfatheredAsSecondWaveSuccess === false &&
    i168.corpusExhaustionEstablished === false &&
    i168.universalNoRemediationCandidateExistsEstablished === false &&
    exactArray(i168.discoveryRequirementIds, I168_DISCOVERY_REQUIREMENT_IDS) &&
    i168.discoveryRequirementCount === 12 &&
    i168.discoveryRequirementsFrozen &&
    exactArray(i168.searchChannelIds, I168_SEARCH_CHANNEL_IDS) &&
    i168.searchChannelCount === 5 &&
    exactArray(i168.queryConceptIds, I168_QUERY_CONCEPT_IDS) &&
    i168.queryConceptCount === 5 &&
    i168.secondWaveCandidateMustBeNewNormativeProvenanceIdentity &&
    i168.secondWaveCandidateMustBindExactSourceWorkEditionWitnessIdentity &&
    i168.secondWaveCandidateMustRecordNormativePassageAndRequirementRelevance &&
    i168.secondWaveCandidateMustCarryLineageAndDerivativeRelationshipEvidence &&
    i168.sameWorkAlternateWitnessCreatesNewAuthority === false &&
    i168.derivativeRetransmissionOrSummaryCreatesNewAuthority === false &&
    i168.uniqueSourceIdentityAloneEstablishesIndependence === false &&
    i168.chronologyAloneEstablishesIndependence === false &&
    i168.searchSilenceCreatesNegativeDerivativeFinding === false &&
    i168.sourceCountVotingAllowed === false &&
    i168.provenanceTierWeightingAllowed === false &&
    i168.conclusionNeutralDiscoveryRequired &&
    i168.secondWaveCandidateDiscoveryAuthorized &&
    i168.actualCandidateDiscoveryExecutedByThisGate === false &&
    i168.candidateSelectedByThisGate === false &&
    i168.remediationStrategySelectedByThisGate === false &&
    i168.remediationExecutionAuthorizedByThisGate === false &&
    i168.evidenceReboundByThisGate === false &&
    i168.candidateSetMutatedByThisGate === false &&
    i168.newCandidateSetVersionCreatedByThisGate === false &&
    i168.newInputPackageVersionCreatedByThisGate === false &&
    i168.provenanceIndependenceAdjudicatedByThisGate === false &&
    i168.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i168.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i168.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i168.candidateSetReevaluationAuthorizedByThisGate === false &&
    i168.candidateSetReevaluationPerformedByThisGate === false &&
    i168.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i168.productionPolicyExecutionAuthorized === false &&
    i168.actualCompositionPerformedByThisGate === false &&
    i168.multiSourceCompositionAuthorized === false &&
    i168.authorityAcquiredByThisGate === false &&
    i168.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i168.thresholdRuleCreatedByThisGate === false &&
    i168.damageEvaluationAuthorized === false &&
    i168.classificationAuthorized === false &&
    i168.numericScoringAuthorized === false &&
    i168.hiddenStemInteractionEligibilityGapRemains &&
    i168.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i168.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_SECOND_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE'
  );
}

function discoveredRecords(): readonly I169SecondWaveDiscoveryRecord[] {
  return Object.freeze([
    {
      recordId: 'LI_SHUNXIANG_SIZHU_XUANJI_2004',
      authorAttribution: '李顺祥',
      workTitle: '四柱玄机：命理推断详解',
      witnessDescription: '2004 新疆人民出版社 first-edition bibliographic record plus digitized first-edition text and author-hosted same-work reproduction',
      identityStatus: 'EXACT_PRINT_EDITION_IDENTITY_ESTABLISHED',
      targetRelevance: 'DIRECT_POSITIONAL_FORCE_AND_BINARY_EXCEPTION_RELEVANCE',
      normativePassageSummary:
        'Chapter 9 defines positional tightness, states that distance changes 生克 force under equal conditions, allows stronger remote stems to compensate for distance, and gives an intermediary 丁火 example where 甲木 no longer克日主 and instead becomes indirect support.',
      bibliographicOrWitnessEvidence: Object.freeze([
        'Google Books: 李顺祥, 四柱玄机：命理推断详解, 新疆人民出版社, 2004, ISBN 7228087828 / 9787228087822, 342 pages.',
        'Digitized 2004 first-edition witness: 第九章 第一节 干支紧密度及其生克力量.',
        '李顺祥易学网 2014 reproduction explicitly identifies the passage as excerpted from 四柱玄机 第九章.',
        'Author biography/site states 四柱玄机 was publicly published by 新疆人民出版社 in June 2004.',
      ]),
      lineageEvidenceSummary:
        'The bibliographic description says the work draws on strengths of ancient and modern books generally, while the inspected target passage provides no exact upstream attribution. Later web copies are downstream same-work retransmissions. Exact upstream origin of the target rule remains unresolved.',
      lineageFinding: 'UNRESOLVED_AFTER_SECOND_WAVE_DISCOVERY',
      newNormativeProvenanceIdentityObserved: true,
      exactPrintEditionIdentityEstablished: true,
      directBinaryExceptionLanguageObserved: true,
      sameWorkOrDownstreamRetransmissionObserved: true,
      sameWorkOrDownstreamRetransmissionCountsAsNewAuthority: false,
      selectedSetSpecificDerivativeDependencyEstablished: false,
      independentNormativeProvenanceEstablished: false,
      qualifiesForLaterEvidenceAdequacyReview: true,
      qualificationGap: null,
    },
    {
      recordId: 'SHAO_GANG_YIHUN_SIZHU_PIAN_AUTHOR_HOSTED',
      authorAttribution: '邵刚',
      workTitle: '易魂之四柱篇',
      witnessDescription: 'author/course-site text and current physical-book/course identity; exact print edition metadata not established in the inspected discovery corpus',
      identityStatus: 'AUTHOR_WORK_IDENTITY_ESTABLISHED_PRINT_EDITION_INCOMPLETE',
      targetRelevance: 'DIRECT_REMOTE_INTERACTION_AND_BINARY_EXCEPTION_RELEVANCE',
      normativePassageSummary:
        'Author-hosted text states that a 通关 intermediary can fully transform the attacking element so it cannot克 the next element, and separately states that 隔干/遥隔 克 may be treated as 紧贴克 when branch-level force conversion supports it.',
      bibliographicOrWitnessEvidence: Object.freeze([
        '邵刚 course/academy site identifies 易魂之四柱篇 as a physical course book and theoretical basis.',
        'Author-hosted 易魂之四柱篇 第二章 第一节 天干互化 contains explicit 不能克 and 隔干/遥隔 exception language.',
      ]),
      lineageEvidenceSummary:
        'The work/author relationship is supported by the current author/course site, but exact publisher/edition/date metadata and upstream target-passage lineage were not established in the inspected corpus. No selected-set-specific derivative dependency is asserted.',
      lineageFinding: 'UNRESOLVED_AFTER_SECOND_WAVE_DISCOVERY',
      newNormativeProvenanceIdentityObserved: true,
      exactPrintEditionIdentityEstablished: false,
      directBinaryExceptionLanguageObserved: true,
      sameWorkOrDownstreamRetransmissionObserved: false,
      sameWorkOrDownstreamRetransmissionCountsAsNewAuthority: false,
      selectedSetSpecificDerivativeDependencyEstablished: false,
      independentNormativeProvenanceEstablished: false,
      qualifiesForLaterEvidenceAdequacyReview: false,
      qualificationGap: 'EXACT_PRINT_EDITION_DATE_PUBLISHER_WITNESS_IDENTITY_NOT_ESTABLISHED',
    },
    {
      recordId: 'ZHAO_ZHIYI_BAZI_ZHENJIAN_2003',
      authorAttribution: '赵知易',
      workTitle: '八字真鉴',
      witnessDescription: 'digitized text naming 赵知易 and dated 2003-07-08; publication-chain metadata remains incompletely corroborated',
      identityStatus: 'DATED_WORK_IDENTITY_ESTABLISHED_PUBLICATION_CHAIN_INCOMPLETE',
      targetRelevance: 'POSITIONAL_INTERACTION_RELEVANCE_SCOPE_BRIDGE_REQUIRED',
      normativePassageSummary:
        'The text states that heavenly stems can act through 生克, that adjacent stems/branches act while some separated positions also act, and gives a 干支位置远近论 where direct action on 日干 has greater effect than indirect action. This is relevant to positional interaction but does not by itself provide the exact governed binary 克-eligibility bridge required here.',
      bibliographicOrWitnessEvidence: Object.freeze([
        'Digitized 八字真鉴 witness identifies 赵知易 and contains an author-center date of 2003-07-08.',
        'The witness contains 干支作用论 and 干支位置远近论 passages directly relevant to positional interaction.',
      ]),
      lineageEvidenceSummary:
        'The inspected witness gives author/date identity but the publication chain and exact upstream lineage for the positional rules remain unresolved. The passage also requires a later scope/semantic bridge review before it could support the exact binary 克 target.',
      lineageFinding: 'UNRESOLVED_AFTER_SECOND_WAVE_DISCOVERY',
      newNormativeProvenanceIdentityObserved: true,
      exactPrintEditionIdentityEstablished: false,
      directBinaryExceptionLanguageObserved: false,
      sameWorkOrDownstreamRetransmissionObserved: true,
      sameWorkOrDownstreamRetransmissionCountsAsNewAuthority: false,
      selectedSetSpecificDerivativeDependencyEstablished: false,
      independentNormativeProvenanceEstablished: false,
      qualifiesForLaterEvidenceAdequacyReview: false,
      qualificationGap: 'PUBLICATION_CHAIN_INCOMPLETE_AND_EXACT_BINARY_KE_SCOPE_BRIDGE_REQUIRED',
    },
    {
      recordId: 'CHEN_BINGDI_TIANGAN_XIANGKE_WEB_ARTICLE',
      authorAttribution: '陈炳地',
      workTitle: '天干相克的要点及运用',
      witnessDescription: 'attributed self-site web article; exact original publication date, print-work identity, and upstream lineage not established',
      identityStatus: 'ATTRIBUTED_WEB_WITNESS_DATE_AND_PUBLICATION_CHAIN_INCOMPLETE',
      targetRelevance: 'DIRECT_REMOTE_INTERACTION_AND_BINARY_EXCEPTION_RELEVANCE',
      normativePassageSummary:
        'The article states that 天干相克 generally requires 紧贴, rejects simple force ranking solely by 紧贴/隔干/遥隔, and allows 隔干/遥隔 克 to be treated as 紧贴克 when underlying branches have a tight clash.',
      bibliographicOrWitnessEvidence: Object.freeze([
        'Attributed 陈炳地 self-site page titled 天干相克的要点及运用 contains direct 紧贴, 隔干, 遥隔 and exception language.',
      ]),
      lineageEvidenceSummary:
        'Attribution is present, but an exact dated original witness, print-work identity, and target-passage lineage were not established. Conceptual similarity to other modern materials is insufficient to assert a derivative relationship.',
      lineageFinding: 'UNRESOLVED_AFTER_SECOND_WAVE_DISCOVERY',
      newNormativeProvenanceIdentityObserved: true,
      exactPrintEditionIdentityEstablished: false,
      directBinaryExceptionLanguageObserved: false,
      sameWorkOrDownstreamRetransmissionObserved: false,
      sameWorkOrDownstreamRetransmissionCountsAsNewAuthority: false,
      selectedSetSpecificDerivativeDependencyEstablished: false,
      independentNormativeProvenanceEstablished: false,
      qualifiesForLaterEvidenceAdequacyReview: false,
      qualificationGap: 'DATED_ORIGINAL_WITNESS_PUBLICATION_IDENTITY_AND_LINEAGE_NOT_ESTABLISHED',
    },
  ]);
}

function finalized(
  material: Omit<I169SecondWaveProvenanceCandidateDiscoveryEvidenceReport, 'evidenceRecordSetId'>,
): I169SecondWaveProvenanceCandidateDiscoveryEvidenceReport {
  return {
    evidenceRecordSetId: `i169_second_wave_provenance_candidate_discovery_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI169SecondWaveProvenanceCandidateDiscoveryEvidence(
  i168: I168SecondWaveProvenanceCandidateDiscoveryReadinessReviewReport,
): I169SecondWaveProvenanceCandidateDiscoveryEvidenceReport {
  const accepted = exactI168Accepted(i168);
  const records = accepted ? discoveredRecords() : Object.freeze([] as I169SecondWaveDiscoveryRecord[]);

  return finalized({
    evidenceVersion: I169_SECOND_WAVE_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_SECOND_WAVE_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE'
      : 'I168_DISCOVERY_READINESS_INVALID',
    decision: accepted
      ? 'SECOND_WAVE_DISCOVERY_EXECUTED_FOUR_NEW_PROVENANCE_OBSERVATIONS_ONE_MINIMUM_ADEQUACY_REVIEW_CANDIDATE_ZERO_INDEPENDENCE_ZERO_SELECTION_LINEAGE_AND_IDENTITY_GAPS_REMAIN'
      : 'SECOND_WAVE_DISCOVERY_NOT_EXECUTED',
    upstreamI168ReviewId: i168.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI168BoundaryAccepted: accepted,
    discoveryExecuted: accepted,
    discoveryRequirementIds: I168_DISCOVERY_REQUIREMENT_IDS,
    searchChannelIds: I168_SEARCH_CHANNEL_IDS,
    queryConceptIds: I168_QUERY_CONCEPT_IDS,
    discoveryRecords: records,
    discoveryObservationCount: accepted ? 4 : 0,
    newNormativeProvenanceIdentityObservedCount: accepted ? 4 : 0,
    exactPrintEditionIdentityEstablishedCount: accepted ? 1 : 0,
    directBinaryExceptionLanguageObservedCount: accepted ? 2 : 0,
    minimumAdequacyReviewCandidateCount: accepted ? 1 : 0,
    lineageUnresolvedCount: accepted ? 4 : 0,
    derivativeDependencyFoundCount: 0,
    explicitNegativeDerivativeFindingCount: 0,
    independentNormativeProvenanceEstablishedCount: 0,
    liShunxiangQualifiesForLaterEvidenceAdequacyReview: accepted,
    shaoGangQualifiesForLaterEvidenceAdequacyReview: false,
    zhaoZhiyiQualifiesForLaterEvidenceAdequacyReview: false,
    chenBingdiQualifiesForLaterEvidenceAdequacyReview: false,
    searchSilenceUsedAsNegativeFinding: false,
    chronologyUsedAsIndependenceFinding: false,
    sourceIdentityUsedAsIndependenceFinding: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
    candidateSelectedByThisGate: false,
    remediationStrategySelectedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
    evidenceReboundByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateRemovedByThisGate: false,
    candidateReplacedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetReevaluationPerformedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_SECOND_WAVE_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_ADJUDICATION_READINESS_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_SECOND_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READINESS_REVIEW',
    notes: accepted
      ? [
          'Four distinct second-wave provenance observations were recorded conclusion-neutrally; none is adjudicated independent.',
          '李顺祥 四柱玄机 is the only current observation that combines exact 2004 print-edition identity with a directly relevant positional/binary exception passage, so it alone may proceed to a later adequacy/lineage-readiness review.',
          '邵刚 易魂之四柱篇 has direct binary/remote-interaction language but exact print-edition metadata remains incomplete.',
          '赵知易 八字真鉴 has a dated work witness and positional-interaction material but publication-chain corroboration and an exact binary 克 scope bridge remain incomplete.',
          '陈炳地 天干相克的要点及运用 is directly relevant but remains an attributed web witness without an established dated original publication chain or lineage.',
          'No observation is selected for remediation, rebound into the current package, counted by source voting, or promoted from chronology/source identity alone.',
        ]
      : ['I168 discovery readiness was not accepted exactly; no second-wave evidence is recorded.'],
  });
}
