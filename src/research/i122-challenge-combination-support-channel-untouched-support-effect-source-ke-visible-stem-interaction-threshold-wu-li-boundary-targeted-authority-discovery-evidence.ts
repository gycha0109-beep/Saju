import type { SourceReference } from '../contracts/interpretation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdWuLiBoundaryTargetedAuthorityDiscoveryReadinessReviewReport } from './i121-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-wu-li-boundary-targeted-authority-discovery-readiness-review.js';

export const I122_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_WU_LI_BOUNDARY_TARGETED_AUTHORITY_DISCOVERY_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-wu-li-boundary-targeted-authority-discovery-evidence-v1';

export type I122TargetedCandidateDisposition =
  | 'LITERAL_PRESENT_BOUNDARY_UNDEFINED'
  | 'BOUNDARY_PRESENT_LITERAL_ABSENT_OR_DIFFERENT_CONTEXT'
  | 'SAME_WORK_REINSPECTION_NO_TARGET_LITERAL_LOCATOR_VERIFIED';

export interface I122TargetedCandidateObservation {
  observationId: string;
  sourceReference: SourceReference;
  disposition: I122TargetedCandidateDisposition;
  visibleStemKeContextObserved: boolean;
  literalWuLiObserved: boolean;
  explicitWuLiSemanticBoundaryObserved: boolean;
  explicitConditionalInteractionBoundaryObserved: boolean;
  allSixI118SemanticLociVerifiedInSameCandidate: false;
  registrationAcceptedUnderI119: false;
  sourceLocalWuLiEqualsNoInteractionEstablished: false;
  sourceLocalWuLiEqualsConditionalWeakInteractionEstablished: false;
  evidenceStatement: string;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdWuLiBoundaryTargetedAuthorityDiscoveryEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_WU_LI_BOUNDARY_TARGETED_AUTHORITY_DISCOVERY_EVIDENCE'
    | 'I121_UNRESOLVED_OR_INVALID';
  decision:
    | 'TARGETED_WU_LI_DISCOVERY_FOUND_COMPLEMENTARY_NONCOMPOSABLE_EVIDENCE_NO_SINGLE_SOURCE_FULL_SIX_ADMISSION'
    | 'WU_LI_BOUNDARY_TARGETED_DISCOVERY_NOT_PERFORMED';
  upstreamI121ReviewId: string;
  targetedDiscoveryPerformed: boolean;
  targetLiteralForms: readonly string[];
  inspectedCandidateCount: number;
  inspectedCandidates: readonly I122TargetedCandidateObservation[];
  literalBearingCandidateCount: number;
  explicitBoundaryBearingCandidateCount: number;
  fullSixCandidateCount: 0;
  registeredCandidateCount: 0;
  registeredCandidate: null;
  existingI107LiteralBoundaryStillUndefined: boolean;
  weiQianliSameWorkWuLiLocatorVerified: false;
  zhuZuxiaRemoteConditionalBoundaryObserved: boolean;
  zhuZuxiaTargetLiteralObservedInRemoteBoundarySection: false;
  practitionerRemoteWuLiLiteralObserved: boolean;
  practitionerRemoteWuLiBoundaryExplicitlyDefined: false;
  complementaryEvidenceExistsAcrossCandidates: boolean;
  complementaryEvidenceMayBeComposed: false;
  crossCandidateSemanticEquivalenceAuthorized: false;
  wuLiMayBeEquatedToBuNengXiangKe: false;
  wuLiMayBeEquatedToWeakButConditionalInteraction: false;
  searchSnippetMayCountAsAuthorityEvidence: false;
  modelSynthesisMayCountAsAuthorityEvidence: false;
  noResultMayCreateDefaultThreshold: false;
  candidateRegistrationPerformedByThisGate: false;
  requirementCoverageEvaluatedByThisGate: false;
  authorityAcquiredByThisGate: false;
  visibleStemBinaryEffectiveInteractionEligibilityResolved: false;
  effectiveInteractionSetResolved: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  i98KeDamageVocabularyEvaluationResolved: false;
  i98ResearchMethodologyMaterializationAuthorized: false;
  hiddenStemInteractionEligibilityGapRemains: true;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  methodologyDefinitionCreatedByThisGate: false;
  ruleDefinitionCreatedByThisGate: false;
  registrySnapshotMutatedByThisGate: false;
  reviewAttestationCreatedByThisGate: false;
  noTrackedRelationTouchSemanticsRemainUnchanged: true;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_CANDIDATE_SET_COMPOSITION_POLICY_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_WU_LI_BOUNDARY_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW';
  notes: readonly string[];
}

function sourceChenYuan(): SourceReference {
  return {
    sourceId: 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515',
    sourceType: 'modern_book',
    title: '邵伟华四柱预测学入门',
    author: '陈园',
    publisher: '广州出版社',
    edition: '1995 first edition',
    publicationYear: 1995,
    language: 'zh-Hans',
    locator: {
      chapter: '第四章 四柱三元',
      section: '第五节 三元论事 / 二、天干生克要则',
      anchor: '两干相克，邻干力大，隔干次之，远干无力',
    },
    url: 'https://www.quanxue.cn/qt_mingxiang/sizhu/sizhu17.html',
    accessedAt: '2026-08-22',
    provenanceTier: 'practitioner_secondary',
    notes:
      'Existing normalized I107 source. Literal 无力 is explicit in visible-stem positional 克 language, but no source-local sentence defines whether 无力 means no interaction, zero effect, negligible force, or conditional residual interaction.',
  };
}

function sourceWeiQianli(): SourceReference {
  return {
    sourceId: 'source_wei_qianli_qianli_minggao_nlc_1935_scan',
    sourceType: 'modern_book',
    title: '千里命稿',
    author: '韋千里',
    publisher: '韋氏命苑',
    publicationYear: 1935,
    language: 'zh-Hant',
    locator: {
      section: 'National Library of China scan / 干克之区别 target reinspection',
      anchor: 'NLC416-01jh000372-10197; 123-page scan; no verified 無力 locator in targeted inspection corpus',
    },
    url: 'https://commons.wikimedia.org/wiki/File:NLC416-01jh000372-10197_%E5%8D%83%E9%87%8C%E5%91%BD%E7%A8%BF.pdf',
    accessedAt: '2026-08-22',
    provenanceTier: 'historical_primary',
    notes:
      'Wikimedia Commons identifies this as a mechanical scan sourced from the National Library of China, author 韋千里, publisher 韋氏命苑, 民國24[1935], 123 pages. The same work is strong on 克力较轻 versus 不能相克, but targeted reinspection did not verify a same-work 無力 semantic-boundary locator.',
  };
}

function sourceZhuZuxia(): SourceReference {
  return {
    sourceId: 'source_zhu_zuxia_bazi_yu_yongshen_wuxing_xiangke_web_reproduction',
    sourceType: 'modern_book',
    title: '八字与用神',
    author: '朱祖夏',
    language: 'zh-Hans',
    locator: {
      section: '五行相克的形式及其应用 / 相克距离与力量 / 遥隔相克',
      anchor: '遥隔相克的力量因距离远而显得微弱，一般来说，只有在一方力量相当大时，才对遥隔的另一方起克制作用',
    },
    url: 'https://www.suanzhun.net/book/1282.html',
    accessedAt: '2026-08-22',
    provenanceTier: 'cross_reference',
    notes:
      'Book-attributed web reproduction. It explicitly supplies a conditional remote-interaction boundary, but the remote-distance boundary passage does not use the target literal 无力/無力. A separate 反克 passage uses 主克一方无力 in a strength-reversal context, not as the remote-position literal boundary required by I121.',
  };
}

function sourcePractitionerRemoteWuLi(): SourceReference {
  return {
    sourceId: 'source_yimeng_tiangan_ke_theory_2026_sina_kandian',
    sourceType: 'web',
    title: '学四柱八字命理学基础之详解天干克的理论',
    publicationYear: 2026,
    language: 'zh-Hans',
    locator: {
      section: 'visible-stem examples',
      anchor: '年干癸水偏印地位间隔，无力遥克时干丙火伤官',
    },
    url: 'https://kandian.sina.cn/article_7879848901_1d5acf3c501901nobm.html',
    accessedAt: '2026-08-22',
    provenanceTier: 'practitioner_secondary',
    notes:
      'Targeted discovery surfaced a visible-stem example with literal 无力遥克. The accessible indexed text does not provide a source-local methodological definition distinguishing no interaction from contextually weak or ineffective interaction, and no full-six I118 locus set is established in the same candidate.',
  };
}

function observation(
  sourceReference: SourceReference,
  disposition: I122TargetedCandidateDisposition,
  visibleStemKeContextObserved: boolean,
  literalWuLiObserved: boolean,
  explicitWuLiSemanticBoundaryObserved: boolean,
  explicitConditionalInteractionBoundaryObserved: boolean,
  evidenceStatement: string,
): I122TargetedCandidateObservation {
  const material = {
    sourceReference,
    disposition,
    visibleStemKeContextObserved,
    literalWuLiObserved,
    explicitWuLiSemanticBoundaryObserved,
    explicitConditionalInteractionBoundaryObserved,
    allSixI118SemanticLociVerifiedInSameCandidate: false as const,
    registrationAcceptedUnderI119: false as const,
    sourceLocalWuLiEqualsNoInteractionEstablished: false as const,
    sourceLocalWuLiEqualsConditionalWeakInteractionEstablished: false as const,
    evidenceStatement,
  };
  return {
    observationId: `i122_targeted_wu_li_candidate_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function candidates(): readonly I122TargetedCandidateObservation[] {
  return [
    observation(
      sourceChenYuan(),
      'LITERAL_PRESENT_BOUNDARY_UNDEFINED',
      true,
      true,
      false,
      false,
      'The exact visible-stem positional phrase 远干无力 is present, but no inspected source-local sentence defines the binary interaction meaning of 无力.',
    ),
    observation(
      sourceWeiQianli(),
      'SAME_WORK_REINSPECTION_NO_TARGET_LITERAL_LOCATOR_VERIFIED',
      true,
      false,
      false,
      true,
      'The verified 1935 work identity remains strong for qualitative-force versus non-克 separation, but targeted same-work inspection did not verify 無力 as the literal semantic bridge.',
    ),
    observation(
      sourceZhuZuxia(),
      'BOUNDARY_PRESENT_LITERAL_ABSENT_OR_DIFFERENT_CONTEXT',
      true,
      false,
      false,
      true,
      'The remote-interaction passage explicitly says distance makes force weak and normally requires one side to be sufficiently strong before remote restraint occurs, but it does not express that positional boundary with 无力/無力.',
    ),
    observation(
      sourcePractitionerRemoteWuLi(),
      'LITERAL_PRESENT_BOUNDARY_UNDEFINED',
      true,
      true,
      false,
      false,
      'The phrase 无力遥克 directly couples the target literal with remote visible-stem control in an example, but the candidate does not explicitly define whether that means universally no interaction or merely ineffective interaction in the shown context.',
    ),
  ];
}

function exactI121Accepted(
  i121: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdWuLiBoundaryTargetedAuthorityDiscoveryReadinessReviewReport,
): boolean {
  return (
    i121.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_WU_LI_BOUNDARY_TARGETED_AUTHORITY_DISCOVERY_READINESS' &&
    i121.decision ===
      'WU_LI_BOUNDARY_TARGETED_DISCOVERY_AUTHORIZED_SINGLE_CANDIDATE_FULL_SIX_CONTRACT_PRESERVED_NO_CROSS_SOURCE_EQUIVALENCE' &&
    i121.targetSourceTerm === '克' &&
    i121.targetScope === 'VISIBLE_HEAVENLY_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY' &&
    i121.targetRequirementId === 'WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS' &&
    i121.targetedDiscoveryMayProceed &&
    i121.discoveryMode ===
      'TARGET_WU_LI_BOUNDARY_WHILE_PRESERVING_SINGLE_CANDIDATE_FULL_SIX_REQUIREMENT_ADMISSION' &&
    i121.visibleStemKeContextRequired &&
    i121.literalWuLiOrOrthographicEquivalentRequired &&
    i121.explicitSemanticBoundaryStatementRequired &&
    i121.sameCandidateMustExposeAllSixI118SemanticLociBeforeRegistration &&
    i121.targetedRequirementHitAloneMayAuthorizeRegistration === false &&
    i121.targetedRequirementHitAloneMayAuthorizeThreshold === false &&
    i121.candidateMayProceedToCoverageEvaluationOnlyAfterFullSixLocatorAdmission &&
    i121.semanticSynonymWithoutWuLiMaySatisfyTarget === false &&
    i121.buNengXiangKeMayBeMappedToWuLiWithoutSameSourceStatement === false &&
    i121.crossCandidateCompositionAuthorized === false &&
    i121.partialCandidateCompositionAuthorized === false &&
    i121.candidateDiscoveryPerformedByThisGate === false &&
    i121.candidateRegisteredByThisGate === false &&
    i121.authorityAcquiredByThisGate === false &&
    i121.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i121.classificationAuthorized === false &&
    i121.numericScoringAuthorized === false &&
    i121.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_WU_LI_BOUNDARY_TARGETED_AUTHORITY_DISCOVERY_EVIDENCE'
  );
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdWuLiBoundaryTargetedAuthorityDiscoveryEvidenceReport, 'evidenceId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdWuLiBoundaryTargetedAuthorityDiscoveryEvidenceReport {
  return {
    evidenceId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_wu_li_targeted_discovery_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI122ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdWuLiBoundaryTargetedAuthorityDiscoveryEvidence(
  i121: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdWuLiBoundaryTargetedAuthorityDiscoveryReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdWuLiBoundaryTargetedAuthorityDiscoveryEvidenceReport {
  const base = {
    evidenceVersion:
      I122_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_WU_LI_BOUNDARY_TARGETED_AUTHORITY_DISCOVERY_EVIDENCE_VERSION,
    upstreamI121ReviewId: i121.reviewId,
    fullSixCandidateCount: 0 as const,
    registeredCandidateCount: 0 as const,
    registeredCandidate: null,
    complementaryEvidenceMayBeComposed: false as const,
    crossCandidateSemanticEquivalenceAuthorized: false as const,
    wuLiMayBeEquatedToBuNengXiangKe: false as const,
    wuLiMayBeEquatedToWeakButConditionalInteraction: false as const,
    searchSnippetMayCountAsAuthorityEvidence: false as const,
    modelSynthesisMayCountAsAuthorityEvidence: false as const,
    noResultMayCreateDefaultThreshold: false as const,
    candidateRegistrationPerformedByThisGate: false as const,
    requirementCoverageEvaluatedByThisGate: false as const,
    authorityAcquiredByThisGate: false as const,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false as const,
    effectiveInteractionSetResolved: false as const,
    thresholdRuleCreatedByThisGate: false as const,
    damageEvaluationAuthorized: false as const,
    i98KeDamageVocabularyEvaluationResolved: false as const,
    i98ResearchMethodologyMaterializationAuthorized: false as const,
    hiddenStemInteractionEligibilityGapRemains: true as const,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' as const,
    methodologyDefinitionCreatedByThisGate: false as const,
    ruleDefinitionCreatedByThisGate: false as const,
    registrySnapshotMutatedByThisGate: false as const,
    reviewAttestationCreatedByThisGate: false as const,
    noTrackedRelationTouchSemanticsRemainUnchanged: true as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
  };

  if (!exactI121Accepted(i121)) {
    return finalized({
      ...base,
      status: 'I121_UNRESOLVED_OR_INVALID',
      decision: 'WU_LI_BOUNDARY_TARGETED_DISCOVERY_NOT_PERFORMED',
      targetedDiscoveryPerformed: false,
      targetLiteralForms: [],
      inspectedCandidateCount: 0,
      inspectedCandidates: [],
      literalBearingCandidateCount: 0,
      explicitBoundaryBearingCandidateCount: 0,
      existingI107LiteralBoundaryStillUndefined: false,
      weiQianliSameWorkWuLiLocatorVerified: false,
      zhuZuxiaRemoteConditionalBoundaryObserved: false,
      zhuZuxiaTargetLiteralObservedInRemoteBoundarySection: false,
      practitionerRemoteWuLiLiteralObserved: false,
      practitionerRemoteWuLiBoundaryExplicitlyDefined: false,
      complementaryEvidenceExistsAcrossCandidates: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_WU_LI_BOUNDARY_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW',
      notes: [
        'I122 requires exact resolved I121 targeted-discovery readiness before evidence may be recorded.',
      ],
    });
  }

  const inspected = candidates();
  return finalized({
    ...base,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_WU_LI_BOUNDARY_TARGETED_AUTHORITY_DISCOVERY_EVIDENCE',
    decision:
      'TARGETED_WU_LI_DISCOVERY_FOUND_COMPLEMENTARY_NONCOMPOSABLE_EVIDENCE_NO_SINGLE_SOURCE_FULL_SIX_ADMISSION',
    targetedDiscoveryPerformed: true,
    targetLiteralForms: ['无力', '無力'],
    inspectedCandidateCount: inspected.length,
    inspectedCandidates: inspected,
    literalBearingCandidateCount: inspected.filter((item) => item.literalWuLiObserved).length,
    explicitBoundaryBearingCandidateCount: inspected.filter(
      (item) => item.explicitConditionalInteractionBoundaryObserved,
    ).length,
    existingI107LiteralBoundaryStillUndefined: true,
    weiQianliSameWorkWuLiLocatorVerified: false,
    zhuZuxiaRemoteConditionalBoundaryObserved: true,
    zhuZuxiaTargetLiteralObservedInRemoteBoundarySection: false,
    practitionerRemoteWuLiLiteralObserved: true,
    practitionerRemoteWuLiBoundaryExplicitlyDefined: false,
    complementaryEvidenceExistsAcrossCandidates: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_CANDIDATE_SET_COMPOSITION_POLICY_READINESS_REVIEW',
    notes: [
      'Targeted discovery found two complementary evidence shapes but no qualifying same-candidate bridge: literal 无力 without an explicit boundary, and an explicit remote-interaction boundary without the required positional 无力 literal.',
      'The 1935 National Library of China scan identity for 韦千里《千里命稿》 is independently verified, but no same-work 無力 locator was verified that would connect its 不能相克 language to the I107 literal.',
      '朱祖夏《八字与用神》 explicitly describes remote 克 as weak and normally effective only when one side is sufficiently strong, which is relevant to the semantic question but cannot define another candidate’s 无力 token.',
      'A practitioner example using 无力遥克 shows that the literal can be used to describe ineffective remote control, but it does not supply a general normative boundary or a full-six I118 authority set.',
      'Because I119 and I121 prohibit cross-candidate composition, complementary evidence does not close the visible-stem threshold gap.',
      'The next safe methodology question is whether a governed candidate-set composition policy can ever be authorized without manufacturing semantic equivalence. No composition is performed or authorized by I122 itself.',
    ],
  });
}
