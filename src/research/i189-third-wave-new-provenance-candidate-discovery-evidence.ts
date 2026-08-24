import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I188ThirdWaveNewProvenanceCandidateDiscoveryReadinessReviewReport } from './i188-third-wave-new-provenance-candidate-discovery-readiness-review.js';
import { I188_SEARCH_CHANNEL_IDS } from './i188-third-wave-new-provenance-candidate-discovery-readiness-review.js';

export const I189_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE_VERSION =
  'myeonghwa-third-wave-new-provenance-candidate-discovery-evidence-v1';

export const I189_DISCOVERY_OBSERVATION_IDS = Object.freeze([
  'QU_WEI_2003_SIZHU_TEXUNBAN_JIANGYI',
  'LI_HONGCHENG_REMOTE_KE_COMPILATION_PASSAGE',
  'HU_XIAOSAN_2021_SIZHU_SHENGKE_ZUOYONG',
  'HUANGLIN_2023_CHUANTONG_BAZI_ZUOYONG_LUXIAN',
  'MOGU_2022_GE_BU_ZUOYONG_HANCHEN_SCHOOL',
] as const);

export type I189DiscoveryObservationId = (typeof I189_DISCOVERY_OBSERVATION_IDS)[number];
export type I189ObservationDisposition =
  | 'MINIMUM_ADEQUACY_REVIEW_CANDIDATE_LINEAGE_UNRESOLVED'
  | 'SOURCE_IDENTITY_INCOMPLETE'
  | 'DERIVATIVE_RISK_UNRESOLVED'
  | 'EXPLICIT_SCHOOL_RETRANSMISSION_SIGNAL';

export interface I189DiscoveryObservation {
  observationId: I189DiscoveryObservationId;
  candidateLabel: string;
  authorIdentity: string;
  workOrSurfaceIdentity: string;
  chronologyAnchor: string;
  primaryLocator: string;
  corroboratingLocators: readonly string[];
  exactScopeRelevant: boolean;
  scopeEvidenceSummary: string;
  authorIdentityTraceable: boolean;
  workIdentityTraceable: boolean;
  publicationOrWitnessIdentityComplete: boolean;
  genuinelyNewAuthorOrWorkObservation: boolean;
  minimumAdequacyReviewCandidate: boolean;
  disposition: I189ObservationDisposition;
  derivativeRelationshipRiskObserved: boolean;
  explicitUpstreamSchoolAttributionObserved: boolean;
  lineageAdjudicationComplete: false;
  independentNormativeProvenanceEstablished: false;
  notes: readonly string[];
}

export interface I189ThirdWaveNewProvenanceCandidateDiscoveryEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE'
    | 'I188_DISCOVERY_READINESS_BOUNDARY_INVALID';
  decision:
    | 'THIRD_WAVE_DISCOVERY_EXECUTED_FIVE_OBSERVATIONS_ONE_MINIMUM_ADEQUACY_REVIEW_CANDIDATE_QU_WEI_LI_HONGCHENG_SOURCE_IDENTITY_INCOMPLETE_THREE_DERIVATIVE_RISK_SURFACES_ZERO_INDEPENDENCE_ZERO_SELECTION'
    | 'THIRD_WAVE_DISCOVERY_NOT_EXECUTED';
  upstreamI188ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI188BoundaryAccepted: boolean;
  conclusionNeutralDiscoveryPreserved: boolean;
  searchChannelIds: readonly string[];
  searchChannelExecutionCount: 6 | 0;
  allSixFrozenSearchChannelsExecuted: boolean;
  discoveryExecutedByThisGate: boolean;
  discoveryObservationIds: readonly I189DiscoveryObservationId[];
  discoveryObservationCount: 5 | 0;
  observations: readonly I189DiscoveryObservation[];
  candidateEvidenceAcquiredByThisGate: boolean;
  genuinelyNewAuthorOrWorkObservationCount: 2 | 0;
  minimumAdequacyReviewCandidateCount: 1 | 0;
  minimumAdequacyReviewCandidateIds: readonly I189DiscoveryObservationId[];
  sourceIdentityIncompleteObservationCount: 1 | 0;
  derivativeRiskOrRetransmissionObservationCount: 3 | 0;
  quWeiExactScopeEvidenceObserved: boolean;
  quWeiSelfDated2003WorkIdentityObserved: boolean;
  quWeiMinimumAdequacyReviewCandidate: boolean;
  quWeiLineageRiskSignalObserved: boolean;
  quWeiLineageAdjudicationComplete: false;
  quWeiIndependentNormativeProvenanceEstablished: false;
  liHongchengExactScopeEvidenceObserved: boolean;
  liHongchengAuthorAnd2003ChronologyObserved: boolean;
  liHongchengExactPassageSingleWorkPublicationIdentityComplete: false;
  liHongchengMinimumAdequacyReviewCandidate: false;
  huXiaosanExactScopeEvidenceObserved: boolean;
  huXiaosanDerivativeRiskUnresolved: boolean;
  huanglinExactScopeEvidenceObserved: boolean;
  huanglinNearVerbatimRetransmissionRiskObserved: boolean;
  moguExactUpstreamSchoolAttributionObserved: boolean;
  moguMayQualifyAsIndependentOrigin: false;
  explicitDerivativeRelationshipCheckStillRequired: boolean;
  derivativeRetransmissionCountsAsIndependentAuthority: false;
  unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM';
  sourceClassAloneSufficient: false;
  sourceCountMayBecomeNumericWeight: false;
  provenanceTierMayBecomeNumericWeight: false;
  searchResultCountMayEstablishAuthority: false;
  semanticAgreementAloneMayEstablishIndependence: false;
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
  noFurtherCandidateFoundWouldEstablishNonexistence: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_THIRD_WAVE_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_ADJUDICATION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE';
  notes: readonly string[];
}

function exactI188Accepted(i188: I188ThirdWaveNewProvenanceCandidateDiscoveryReadinessReviewReport): boolean {
  return (
    i188.status === 'RESOLVED_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READINESS_REVIEW' &&
    i188.decision ===
      'THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_READY_CONCLUSION_NEUTRAL_NEW_ORIGIN_SEARCH_SCOPE_AND_I132_PROVENANCE_CONTROLS_FROZEN_ZERO_DISCOVERY_ZERO_SELECTION_ZERO_MUTATION' &&
    i188.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i188.policyVersion === 'v1-definition' &&
    i188.adoptionVersion === 'v1-adoption' &&
    i188.currentCandidateSetVersion === 'v1-candidate-set' &&
    i188.currentInputPackageVersion === 'v2-input-package' &&
    i188.exactI187BoundaryAccepted &&
    i188.conclusionNeutralDiscoveryRequired &&
    i188.discoveryReadinessEstablished &&
    i188.discoveryExecutionAuthorizedByThisGate &&
    i188.discoveryExecutedByThisGate === false &&
    i188.discoveryObservationCount === 0 &&
    i188.candidateEvidenceAcquiredByThisGate === false &&
    i188.genuinelyNewProvenanceCandidateRequired &&
    i188.existingOriginalSixAliasMayQualifyAsNewCandidate === false &&
    i188.existingRemediationCandidateAliasMayQualifyAsNewCandidate === false &&
    i188.sameAuthorRetransmissionMayQualifyAsNewIndependentCandidate === false &&
    i188.republicationWithoutOriginResolutionMayQualifyAsIndependent === false &&
    i188.exactScopeRelevanceRequired &&
    i188.exactScopeTarget === 'VISIBLE_STEM_REMOTE_KE_INTERACTION_FORCE_APPLICABILITY' &&
    i188.genericKeVocabularyAloneSufficientForScope === false &&
    i188.searchChannelCount === 6 &&
    i188.searchChannels.length === 6 &&
    I188_SEARCH_CHANNEL_IDS.every((channelId, index) => i188.searchChannelIds[index] === channelId) &&
    i188.searchChannelsFrozenProspectively &&
    i188.discoveryControlCount === 14 &&
    i188.discoveryControlsFrozenProspectively &&
    i188.explicitDerivativeRelationshipCheckRequired &&
    i188.derivativeRetransmissionCountsAsIndependentAuthority === false &&
    i188.unresolvedLineageDefaultDisposition === 'REJECT_INDEPENDENCE_CLAIM' &&
    i188.sourceClassAloneSufficient === false &&
    i188.sourceCountMayBecomeNumericWeight === false &&
    i188.provenanceTierMayBecomeNumericWeight === false &&
    i188.searchResultCountMayEstablishAuthority === false &&
    i188.semanticAgreementAloneMayEstablishIndependence === false &&
    i188.candidateMustReceiveLineageAdjudicationBeforeIndependence &&
    i188.candidateSelectionAuthorizedByThisGate === false &&
    i188.candidateRegistrationAuthorizedByThisGate === false &&
    i188.candidateRebindingAuthorizedByThisGate === false &&
    i188.candidateSetReevaluationAuthorizedByThisGate === false &&
    i188.currentV2PackageAndCandidateSetRemainImmutable &&
    i188.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i188.liSameTargetDirectPrimaryPathRemainsMethodologicallyOpen &&
    i188.liSameTargetImmediateEquivalentRepeatJustified === false &&
    i188.liSameTargetPathSuspendedNotRetired &&
    i188.liSameTargetMayReopenOnMateriallyNewDirectLead &&
    i188.targetedDiscoveryExhaustionEstablished === false &&
    i188.corpusExhaustionEstablished === false &&
    i188.searchSilenceCreatesNegativeFinding === false &&
    i188.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i188.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i188.provenanceIndependenceAdjudicatedByThisGate === false &&
    i188.independentNormativeProvenanceEstablishedCount === 0 &&
    i188.evidenceRebindingMethodologicallyReady === false &&
    i188.productionPolicyExecutionAuthorized === false &&
    i188.actualCompositionPerformedByThisGate === false &&
    i188.multiSourceCompositionAuthorized === false &&
    i188.authorityAcquiredByThisGate === false &&
    i188.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i188.thresholdRuleCreatedByThisGate === false &&
    i188.damageEvaluationAuthorized === false &&
    i188.classificationAuthorized === false &&
    i188.numericScoringAuthorized === false &&
    i188.hiddenStemInteractionEligibilityGapRemains &&
    i188.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i188.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE'
  );
}

function observations(): readonly I189DiscoveryObservation[] {
  return Object.freeze([
    {
      observationId: 'QU_WEI_2003_SIZHU_TEXUNBAN_JIANGYI',
      candidateLabel: '曲炜《四柱特训班讲义》',
      authorIdentity: '曲炜',
      workOrSurfaceIdentity: '《四柱特训班讲义》',
      chronologyAnchor: 'author-signed preface: 2003-10; based on spring 2003 training lectures',
      primaryLocator: 'https://www.scribd.com/document/733612931/',
      corroboratingLocators: Object.freeze([
        'https://www.scribd.com/document/778420605/',
        'https://www.fozhu920.com/19448.html',
      ]),
      exactScopeRelevant: true,
      scopeEvidenceSummary:
        'Visible heavenly stems are described as strongest when adjacent, much weaker across one stem, weaker still across two stems, with year-hour direct 克 treated as inapplicable in the worked route.',
      authorIdentityTraceable: true,
      workIdentityTraceable: true,
      publicationOrWitnessIdentityComplete: false,
      genuinelyNewAuthorOrWorkObservation: true,
      minimumAdequacyReviewCandidate: true,
      disposition: 'MINIMUM_ADEQUACY_REVIEW_CANDIDATE_LINEAGE_UNRESOLVED',
      derivativeRelationshipRiskObserved: true,
      explicitUpstreamSchoolAttributionObserved: false,
      lineageAdjudicationComplete: false,
      independentNormativeProvenanceEstablished: false,
      notes: Object.freeze([
        'The self-dated work identity and exact-scope passage are sufficient to enter a separate evidence-adequacy/lineage readiness review, not to establish independence.',
        'A third-party doctrinal taxonomy describes 曲炜 as an inheritor of 李涵辰隔不作用; that is a lineage-risk lead only and requires direct adjudication.',
      ]),
    },
    {
      observationId: 'LI_HONGCHENG_REMOTE_KE_COMPILATION_PASSAGE',
      candidateLabel: '李洪成 remote-克 route material',
      authorIdentity: '李洪成',
      workOrSurfaceIdentity: '《李洪成 八字资料汇总》 compilation plus 2003-dated training article traces',
      chronologyAnchor: '李洪成大宗易专业文章 dated 030913 is independently reproduced; compilation passage has no single-work identity resolved here',
      primaryLocator: 'https://www.scribd.com/document/424415911/',
      corroboratingLocators: Object.freeze([
        'https://zhouyisc.com/nd.jsp?id=558',
        'https://zhouyisc.com/nd.jsp?id=557',
      ]),
      exactScopeRelevant: true,
      scopeEvidenceSummary:
        'A visible-stem example states that a remote year-stem 丙火 reaches the day-stem 庚金 through intervening 丁火, and can act directly after 丁火 is combined away.',
      authorIdentityTraceable: true,
      workIdentityTraceable: false,
      publicationOrWitnessIdentityComplete: false,
      genuinelyNewAuthorOrWorkObservation: true,
      minimumAdequacyReviewCandidate: false,
      disposition: 'SOURCE_IDENTITY_INCOMPLETE',
      derivativeRelationshipRiskObserved: false,
      explicitUpstreamSchoolAttributionObserved: false,
      lineageAdjudicationComplete: false,
      independentNormativeProvenanceEstablished: false,
      notes: Object.freeze([
        'Exact target-scope semantics are observed, but the compilation does not yet bind the passage to one exact authored work/edition/publication identity.',
        'The 2003-dated 李洪成 article trace establishes author chronology but is not backfilled as the source of the compilation passage without direct binding.',
      ]),
    },
    {
      observationId: 'HU_XIAOSAN_2021_SIZHU_SHENGKE_ZUOYONG',
      candidateLabel: '胡小三《八字基础浅谈之四柱生克作用》',
      authorIdentity: '胡小三',
      workOrSurfaceIdentity: '搜狐原创文章《（五十）八字基础浅谈之四柱生克作用——胡小三》',
      chronologyAnchor: '2021-12-18',
      primaryLocator: 'https://www.sohu.com/a/509493797_121256312',
      corroboratingLocators: Object.freeze([]),
      exactScopeRelevant: true,
      scopeEvidenceSummary:
        'The article states adjacent stems act directly, one-gap stems are much weaker, two-gap stems weaker still, and year-hour direct 克 may be disregarded.',
      authorIdentityTraceable: true,
      workIdentityTraceable: true,
      publicationOrWitnessIdentityComplete: true,
      genuinelyNewAuthorOrWorkObservation: false,
      minimumAdequacyReviewCandidate: false,
      disposition: 'DERIVATIVE_RISK_UNRESOLVED',
      derivativeRelationshipRiskObserved: true,
      explicitUpstreamSchoolAttributionObserved: false,
      lineageAdjudicationComplete: false,
      independentNormativeProvenanceEstablished: false,
      notes: Object.freeze([
        'The phrasing and route structure substantially overlap the earlier 曲炜 2003 witness, so this surface cannot be treated as new independent provenance without lineage evidence.',
      ]),
    },
    {
      observationId: 'HUANGLIN_2023_CHUANTONG_BAZI_ZUOYONG_LUXIAN',
      candidateLabel: '黄麟《传统八字的作用路线》',
      authorIdentity: '黄麟堪舆风水结善',
      workOrSurfaceIdentity: '《传统八字的作用路线》 / 华垚门 web surface',
      chronologyAnchor: '2023-03-10',
      primaryLocator: 'https://www.ydygfs.com/fengshuishangpin/2023/0310/29638.html',
      corroboratingLocators: Object.freeze([]),
      exactScopeRelevant: true,
      scopeEvidenceSummary:
        'The page reproduces the adjacent/one-gap/two-gap hierarchy and the year-hour non-action example in wording closely matching the earlier 曲炜 witness.',
      authorIdentityTraceable: true,
      workIdentityTraceable: true,
      publicationOrWitnessIdentityComplete: true,
      genuinelyNewAuthorOrWorkObservation: false,
      minimumAdequacyReviewCandidate: false,
      disposition: 'DERIVATIVE_RISK_UNRESOLVED',
      derivativeRelationshipRiskObserved: true,
      explicitUpstreamSchoolAttributionObserved: false,
      lineageAdjudicationComplete: false,
      independentNormativeProvenanceEstablished: false,
      notes: Object.freeze([
        'Near-verbatim structural and example overlap creates a strong retransmission-risk signal; I189 does not infer an exact derivative edge without direct relationship evidence.',
      ]),
    },
    {
      observationId: 'MOGU_2022_GE_BU_ZUOYONG_HANCHEN_SCHOOL',
      candidateLabel: '墨谷先生《八字分析技巧之隔不作用》',
      authorIdentity: '墨谷先生',
      workOrSurfaceIdentity: '神机阁文章《八字分析技巧之隔不作用》',
      chronologyAnchor: '2022-08-23',
      primaryLocator: 'https://www.shenjige.cn/details/ZSuhz_9SQ.html',
      corroboratingLocators: Object.freeze([]),
      exactScopeRelevant: true,
      scopeEvidenceSummary:
        'The article states separated stems do not act and explicitly discusses the rule as belonging to 涵辰派命理.',
      authorIdentityTraceable: true,
      workIdentityTraceable: true,
      publicationOrWitnessIdentityComplete: true,
      genuinelyNewAuthorOrWorkObservation: false,
      minimumAdequacyReviewCandidate: false,
      disposition: 'EXPLICIT_SCHOOL_RETRANSMISSION_SIGNAL',
      derivativeRelationshipRiskObserved: true,
      explicitUpstreamSchoolAttributionObserved: true,
      lineageAdjudicationComplete: false,
      independentNormativeProvenanceEstablished: false,
      notes: Object.freeze([
        'Explicit 涵辰派 attribution prevents treating this later explanatory article as a new independent origin witness.',
      ]),
    },
  ]);
}

function finalized(
  material: Omit<I189ThirdWaveNewProvenanceCandidateDiscoveryEvidenceReport, 'evidenceId'>,
): I189ThirdWaveNewProvenanceCandidateDiscoveryEvidenceReport {
  return {
    evidenceId: `i189_third_wave_discovery_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI189ThirdWaveNewProvenanceCandidateDiscoveryEvidence(
  i188: I188ThirdWaveNewProvenanceCandidateDiscoveryReadinessReviewReport,
): I189ThirdWaveNewProvenanceCandidateDiscoveryEvidenceReport {
  const accepted = exactI188Accepted(i188);
  const evidenceObservations = accepted ? observations() : Object.freeze([]);

  return finalized({
    evidenceVersion: I189_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE'
      : 'I188_DISCOVERY_READINESS_BOUNDARY_INVALID',
    decision: accepted
      ? 'THIRD_WAVE_DISCOVERY_EXECUTED_FIVE_OBSERVATIONS_ONE_MINIMUM_ADEQUACY_REVIEW_CANDIDATE_QU_WEI_LI_HONGCHENG_SOURCE_IDENTITY_INCOMPLETE_THREE_DERIVATIVE_RISK_SURFACES_ZERO_INDEPENDENCE_ZERO_SELECTION'
      : 'THIRD_WAVE_DISCOVERY_NOT_EXECUTED',
    upstreamI188ReviewId: i188.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI188BoundaryAccepted: accepted,
    conclusionNeutralDiscoveryPreserved: accepted,
    searchChannelIds: accepted ? I188_SEARCH_CHANNEL_IDS : Object.freeze([]),
    searchChannelExecutionCount: accepted ? 6 : 0,
    allSixFrozenSearchChannelsExecuted: accepted,
    discoveryExecutedByThisGate: accepted,
    discoveryObservationIds: accepted ? I189_DISCOVERY_OBSERVATION_IDS : Object.freeze([]),
    discoveryObservationCount: accepted ? 5 : 0,
    observations: evidenceObservations,
    candidateEvidenceAcquiredByThisGate: accepted,
    genuinelyNewAuthorOrWorkObservationCount: accepted ? 2 : 0,
    minimumAdequacyReviewCandidateCount: accepted ? 1 : 0,
    minimumAdequacyReviewCandidateIds: accepted ? Object.freeze(['QU_WEI_2003_SIZHU_TEXUNBAN_JIANGYI']) : Object.freeze([]),
    sourceIdentityIncompleteObservationCount: accepted ? 1 : 0,
    derivativeRiskOrRetransmissionObservationCount: accepted ? 3 : 0,
    quWeiExactScopeEvidenceObserved: accepted,
    quWeiSelfDated2003WorkIdentityObserved: accepted,
    quWeiMinimumAdequacyReviewCandidate: accepted,
    quWeiLineageRiskSignalObserved: accepted,
    quWeiLineageAdjudicationComplete: false,
    quWeiIndependentNormativeProvenanceEstablished: false,
    liHongchengExactScopeEvidenceObserved: accepted,
    liHongchengAuthorAnd2003ChronologyObserved: accepted,
    liHongchengExactPassageSingleWorkPublicationIdentityComplete: false,
    liHongchengMinimumAdequacyReviewCandidate: false,
    huXiaosanExactScopeEvidenceObserved: accepted,
    huXiaosanDerivativeRiskUnresolved: accepted,
    huanglinExactScopeEvidenceObserved: accepted,
    huanglinNearVerbatimRetransmissionRiskObserved: accepted,
    moguExactUpstreamSchoolAttributionObserved: accepted,
    moguMayQualifyAsIndependentOrigin: false,
    explicitDerivativeRelationshipCheckStillRequired: accepted,
    derivativeRetransmissionCountsAsIndependentAuthority: false,
    unresolvedLineageDefaultDisposition: 'REJECT_INDEPENDENCE_CLAIM',
    sourceClassAloneSufficient: false,
    sourceCountMayBecomeNumericWeight: false,
    provenanceTierMayBecomeNumericWeight: false,
    searchResultCountMayEstablishAuthority: false,
    semanticAgreementAloneMayEstablishIndependence: false,
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
    noFurtherCandidateFoundWouldEstablishNonexistence: false,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_THIRD_WAVE_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_ADJUDICATION_READINESS_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE',
    notes: accepted
      ? Object.freeze([
          'I189 executes the six I188 search channels and records five evidence observations without selecting or mutating the frozen candidate set.',
          '曲炜 2003 is the only observation promoted to a minimum-adequacy review candidate; a specific third-party 李涵辰 succession signal keeps lineage unresolved and independence at zero.',
          '李洪成 provides exact-scope route evidence and a separate 2003 author chronology trace, but the compilation passage is not yet bound to one exact authored work/edition/publication identity.',
          '胡小三 and 黄麟 preserve strong wording/retransmission risk relative to the earlier 曲炜 witness; 墨谷 explicitly identifies the rule with 涵辰派. None establishes a new independent origin.',
          'No search silence, failed access, source count, source class, semantic agreement, or surface multiplicity is converted into provenance authority or exhaustion.',
        ])
      : Object.freeze(['I188 boundary mismatch prevents third-wave discovery execution.']),
  });
}
