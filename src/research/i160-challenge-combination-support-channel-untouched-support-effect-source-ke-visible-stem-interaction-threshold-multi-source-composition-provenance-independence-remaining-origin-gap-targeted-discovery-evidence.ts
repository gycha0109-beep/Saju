import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I159_ORIGIN_GAP_DISCOVERY_REQUIREMENT_IDS,
  I159_REMAINING_ORIGIN_GAP_EVIDENCE_IDS,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryReadinessReviewReport,
  type I159OriginGapDiscoveryRequirementId,
  type I159OriginGapTargetId,
} from './i159-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-provenance-independence-remaining-origin-gap-targeted-discovery-readiness-review.js';

export const I160_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMAINING_ORIGIN_GAP_TARGETED_DISCOVERY_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-provenance-independence-remaining-origin-gap-targeted-discovery-evidence-v1';

export type I160OriginFindingState =
  | 'DERIVATIVE_DEPENDENCY_FOUND'
  | 'NO_DERIVATIVE_DEPENDENCY_FOUND_WITH_EXPLICIT_BASIS'
  | 'UNRESOLVED_AFTER_TARGETED_ORIGIN_DISCOVERY';

export type I160OriginLineageClass =
  | 'GENERIC_TRADITIONAL_DEPENDENCE_EXACT_TARGET_LINEAGE_UNRESOLVED'
  | 'AUTHORED_TEXTBOOK_EARLY_WITNESS_EXACT_UPSTREAM_LINEAGE_UNRESOLVED'
  | 'SELF_HOSTED_SECONDARY_ARTICLE_ORIGIN_LINEAGE_UNRESOLVED';

export interface I160OriginGapDiscoveryEvidenceRecord {
  evidenceId: I159OriginGapTargetId;
  priorState: 'ORIGIN_UNRESOLVED_REQUIRES_FURTHER_DISCOVERY';
  discoveryRequirementIdsApplied: readonly I159OriginGapDiscoveryRequirementId[];
  relationshipFindingState: I160OriginFindingState;
  lineageClass: I160OriginLineageClass;
  earliestWitnessOrEditionFinding: string;
  internalAttributionAndCitationFinding: string;
  datedPredecessorPhraseSearchFinding: string;
  sameWorkDuplicateNormalizationFinding: string;
  selectedSetAndExternalLineageCrossCheckFinding: string;
  sourceLocators: readonly string[];
  boundedSearchQueries: readonly string[];
  boundedSearchBasisDocumented: true;
  corroborationSufficientForExplicitNegativeFinding: false;
  explicitNegativeFindingEstablished: false;
  newDerivativeDependencyFound: false;
  independenceEstablishedByThisRecord: false;
  corpusExhaustionProven: false;
  universalNoDependencyProven: false;
  findingConclusion: string;
  numericWeight: null;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryEvidenceReport {
  evidenceRecordSetId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMAINING_ORIGIN_GAP_TARGETED_DISCOVERY_EVIDENCE'
    | 'I159_REMAINING_ORIGIN_GAP_DISCOVERY_READINESS_INVALID';
  decision:
    | 'TARGETED_REMAINING_ORIGIN_DISCOVERY_EXECUTED_THREE_ORIGINS_REMAIN_UNRESOLVED_ZERO_NEW_DERIVATIVE_ZERO_EXPLICIT_NEGATIVE_FINDINGS_NO_INDEPENDENCE_ADJUDICATION'
    | 'TARGETED_REMAINING_ORIGIN_DISCOVERY_NOT_EXECUTED';
  upstreamI159ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  adoptionId: string | null;
  candidateSetVersion: 'v1-candidate-set';
  candidateSetId: string | null;
  inputPackageVersion: 'v2-input-package';
  inputPackageId: string | null;
  exactI159ReadinessAccepted: boolean;
  discoveryRequirementIdsApplied: readonly I159OriginGapDiscoveryRequirementId[];
  discoveryRequirementCount: 9;
  frozenDerivativeEvidenceIds: readonly string[];
  frozenDerivativeEvidenceCount: 3 | 0;
  frozenDerivativeFindingsReopenedByThisGate: false;
  originGapDiscoveryEvidenceRecords: readonly I160OriginGapDiscoveryEvidenceRecord[];
  originGapDiscoveryEvidenceRecordCount: 3 | 0;
  unresolvedAfterTargetedOriginDiscoveryCount: 3 | 0;
  newDerivativeDependencyFoundCount: 0;
  explicitNegativeFindingEstablishedCount: 0;
  independentNormativeProvenanceEstablishedCount: 0;
  exactWeiOriginRemainsUnresolved: boolean;
  exactWuOriginRemainsUnresolved: boolean;
  exactMingdengOriginRemainsUnresolved: boolean;
  wei1934PrefacesAnd1935WorkWitnessChecked: boolean;
  weiGenericTraditionalDependenceDisclosedButExactTargetLineageUnresolved: boolean;
  wuPublicWitnessNoLaterThan2007_03_22: boolean;
  wuDownstreamRetransmissionRemainsFrozen: boolean;
  mingdeng2022SelfHostedWitnessChecked: boolean;
  allThreeBoundedSearchBasesDocumented: boolean;
  noExplicitNegativeFindingFromSearchSilence: boolean;
  noChronologyOnlyIndependenceInference: boolean;
  noUniqueSourceIdentityIndependenceInference: boolean;
  noSourceCountVotingPerformed: boolean;
  noProvenanceTierWeightingPerformed: boolean;
  corpusExhaustionProven: false;
  universalNoDerivativeDependencyProven: false;
  targetedOriginGapDiscoveryExecutedByThisGate: boolean;
  derivativeRelationshipFindingMadeByThisGate: false;
  provenanceIndependenceFindingMadeByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false;
  provenanceIndependenceCheckMayPassByThisGate: false;
  inputPackageMutatedByThisGate: false;
  newPackageVersionCreatedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  candidateSetReevaluationPerformedByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMAINING_ORIGIN_DISCOVERY_EXHAUSTION_AND_POLICY_REASSESSMENT_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMAINING_ORIGIN_GAP_TARGETED_DISCOVERY_READINESS_REVIEW';
  notes: readonly string[];
}

const FROZEN_DERIVATIVE_EVIDENCE_IDS = Object.freeze([
  'evidence_chen_yuan_position_distance_wuli',
  'evidence_zhu_zuxia_remote_ke_conditions',
  'evidence_yimeng_wuli_yaoke_example',
] as const);

function exactI159Accepted(
  i159: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryReadinessReviewReport,
): boolean {
  const exactRequirements =
    i159.discoveryRequirementIds.length === I159_ORIGIN_GAP_DISCOVERY_REQUIREMENT_IDS.length &&
    i159.discoveryRequirementIds.every(
      (requirementId, index) => requirementId === I159_ORIGIN_GAP_DISCOVERY_REQUIREMENT_IDS[index],
    );
  const exactFrozenDerivativeIds =
    i159.frozenDerivativeEvidenceIds.length === FROZEN_DERIVATIVE_EVIDENCE_IDS.length &&
    i159.frozenDerivativeEvidenceIds.every(
      (evidenceId, index) => evidenceId === FROZEN_DERIVATIVE_EVIDENCE_IDS[index],
    );
  const exactTargets =
    i159.originGapDiscoveryTargets.length === I159_REMAINING_ORIGIN_GAP_EVIDENCE_IDS.length &&
    i159.originGapDiscoveryTargets.every(
      (target, index) =>
        target.evidenceId === I159_REMAINING_ORIGIN_GAP_EVIDENCE_IDS[index] &&
        target.priorState === 'ORIGIN_UNRESOLVED_REQUIRES_FURTHER_DISCOVERY' &&
        target.targetQuestion === 'NORMATIVE_ORIGIN_DERIVATIVE_RELATIONSHIP' &&
        target.discoveryState === 'AUTHORIZED_NOT_EXECUTED' &&
        target.independenceFindingAuthorizedByReadinessGate === false &&
        target.explicitNegativeFindingMayComeFromSearchSilenceAlone === false &&
        target.requiredDiscoveryRequirementIds.length === I159_ORIGIN_GAP_DISCOVERY_REQUIREMENT_IDS.length &&
        target.requiredDiscoveryRequirementIds.every(
          (requirementId, requirementIndex) =>
            requirementId === I159_ORIGIN_GAP_DISCOVERY_REQUIREMENT_IDS[requirementIndex],
        ),
    );

  return (
    i159.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMAINING_ORIGIN_GAP_TARGETED_DISCOVERY_READINESS_REVIEW' &&
    i159.decision ===
      'EXACT_THREE_UNRESOLVED_ORIGIN_GAPS_READY_FOR_TARGETED_DISCOVERY_THREE_DERIVATIVE_FINDINGS_FROZEN_NOT_REOPENED_NO_INDEPENDENCE_ADJUDICATION' &&
    i159.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i159.policyVersion === 'v1-definition' &&
    i159.adoptionVersion === 'v1-adoption' &&
    i159.adoptionId !== null &&
    i159.candidateSetVersion === 'v1-candidate-set' &&
    i159.candidateSetId !== null &&
    i159.inputPackageVersion === 'v2-input-package' &&
    i159.inputPackageId !== null &&
    i159.exactI158BoundaryAccepted &&
    exactRequirements &&
    i159.discoveryRequirementCount === 9 &&
    exactFrozenDerivativeIds &&
    i159.frozenDerivativeEvidenceCount === 3 &&
    i159.frozenDerivativeFindingsReopenedByThisGate === false &&
    exactTargets &&
    i159.originGapDiscoveryTargetCount === 3 &&
    i159.exactWeiTargetPresent &&
    i159.exactWuTargetPresent &&
    i159.exactMingdengTargetPresent &&
    i159.onlyI158UnresolvedOriginsTargeted &&
    i159.earliestWitnessOrEditionCheckRequired &&
    i159.internalAttributionAndCitationCheckRequired &&
    i159.datedPredecessorPhraseSearchRequired &&
    i159.sameWorkDuplicateNormalizationRequired &&
    i159.selectedSetAndExternalLineageCrossCheckRequired &&
    i159.explicitNegativeFindingRequiresDocumentedBoundedSearchBasis &&
    i159.searchSilenceMayBecomeNegativeFindingAlone === false &&
    i159.chronologyMayBecomeIndependenceFindingAlone === false &&
    i159.uniqueSourceIdentityMayBecomeIndependenceFindingAlone === false &&
    i159.sourceCountVotingAllowed === false &&
    i159.provenanceTierWeightingAllowed === false &&
    i159.targetedOriginGapDiscoveryAuthorizedByThisGate &&
    i159.targetedOriginGapDiscoveryExecutedByThisGate === false &&
    i159.provenanceIndependenceAdjudicatedByThisGate === false &&
    i159.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i159.provenanceIndependenceCheckMayPassByThisGate === false &&
    i159.inputPackageMutatedByThisGate === false &&
    i159.newPackageVersionCreatedByThisGate === false &&
    i159.candidateSetReevaluationAuthorizedByThisGate === false &&
    i159.candidateSetReevaluationPerformedByThisGate === false &&
    i159.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i159.productionPolicyExecutionAuthorized === false &&
    i159.actualCompositionPerformedByThisGate === false &&
    i159.multiSourceCompositionAuthorized === false &&
    i159.authorityAcquiredByThisGate === false &&
    i159.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i159.thresholdRuleCreatedByThisGate === false &&
    i159.classificationAuthorized === false &&
    i159.numericScoringAuthorized === false &&
    i159.hiddenStemInteractionEligibilityGapRemains &&
    i159.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMAINING_ORIGIN_GAP_TARGETED_DISCOVERY_EVIDENCE'
  );
}

function evidenceRecords(): readonly I160OriginGapDiscoveryEvidenceRecord[] {
  return Object.freeze([
    Object.freeze({
      evidenceId: 'evidence_wei_qianli_far_position_cannot_ke' as const,
      priorState: 'ORIGIN_UNRESOLVED_REQUIRES_FURTHER_DISCOVERY' as const,
      discoveryRequirementIdsApplied: I159_ORIGIN_GAP_DISCOVERY_REQUIREMENT_IDS,
      relationshipFindingState: 'UNRESOLVED_AFTER_TARGETED_ORIGIN_DISCOVERY' as const,
      lineageClass: 'GENERIC_TRADITIONAL_DEPENDENCE_EXACT_TARGET_LINEAGE_UNRESOLVED' as const,
      earliestWitnessOrEditionFinding:
        'The 1934 prepublication prefaces describe 韦千里’s 命学讲义 and the 1935 work witness identifies the authored 千里命稿/命学讲义 lineage.',
      internalAttributionAndCitationFinding:
        'The 1934 顾乃平 preface says the lectures are based on statements of prior sages plus 韦千里’s own experiments, while 韦千里’s self-preface says his judgments are reconciled against classical texts and does not claim pure original creation. Those generic disclosures do not identify the exact source of the 远隔/不能相克 rule.',
      datedPredecessorPhraseSearchFinding:
        'Targeted searches for 地位愈远、克力愈轻 and 地位远隔、不能相克 returned 千里命稿 witnesses and later retransmissions; no dated pre-1934 exact/material predecessor for this target rule was verified.',
      sameWorkDuplicateNormalizationFinding:
        'CText, later PDFs, Quanxue, and other web reproductions are normalized as witnesses of the same 千里命稿 work and do not create additional provenance votes.',
      selectedSetAndExternalLineageCrossCheckFinding:
        'No exact selected-candidate dependency was verified for the target passage. Generic acknowledged dependence on prior命理 tradition prevents an independence inference without a target-specific lineage finding.',
      sourceLocators: [
        'https://www.quanxue.cn/qt_mingxiang/qianlimg/qianlimg01.html',
        'https://ctext.org/wiki.pl?chapter=933376&if=gb',
        'https://ctext.org/wiki.pl?chapter=497083&if=gb&remap=gb',
        'https://commons.wikimedia.org/wiki/File:NLC416-01jh000372-10197_%E5%8D%83%E9%87%8C%E5%91%BD%E7%A8%BF.pdf',
      ],
      boundedSearchQueries: [
        '地位愈远 克力愈轻',
        '地位远隔 不能相克',
        '干克之区别 命理约言',
        '干克之区别 子平真诠',
        '千里命稿 序 韦千里 师承',
      ],
      boundedSearchBasisDocumented: true as const,
      corroborationSufficientForExplicitNegativeFinding: false as const,
      explicitNegativeFindingEstablished: false as const,
      newDerivativeDependencyFound: false as const,
      independenceEstablishedByThisRecord: false as const,
      corpusExhaustionProven: false as const,
      universalNoDependencyProven: false as const,
      findingConclusion:
        'WEI_TARGET_PHRASE_ORIGIN_REMAINS_UNRESOLVED_GENERIC_TRADITIONAL_DEPENDENCE_DISCLOSED_NO_TARGET_SPECIFIC_PREDECESSOR_OR_EXPLICIT_NEGATIVE_BASIS',
      numericWeight: null,
    }),
    Object.freeze({
      evidenceId: 'evidence_wu_huaiyun_taxonomy_remote_and_operational_examples' as const,
      priorState: 'ORIGIN_UNRESOLVED_REQUIRES_FURTHER_DISCOVERY' as const,
      discoveryRequirementIdsApplied: I159_ORIGIN_GAP_DISCOVERY_REQUIREMENT_IDS,
      relationshipFindingState: 'UNRESOLVED_AFTER_TARGETED_ORIGIN_DISCOVERY' as const,
      lineageClass: 'AUTHORED_TEXTBOOK_EARLY_WITNESS_EXACT_UPSTREAM_LINEAGE_UNRESOLVED' as const,
      earliestWitnessOrEditionFinding:
        'A MyChat catalog post dated 2007-03-22 lists 正宗阴阳五行八字预知学初级课程, 390 pages, 吴怀云, establishing a public witness no later than that date; current electronic textbook witnesses are later copies of the same work lineage.',
      internalAttributionAndCitationFinding:
        'The inspected textbook title page identifies 吴怀云 著 and the relevant 第三章/天干相克 passage, but no target-specific predecessor citation or source-lineage attribution was verified in the inspected material.',
      datedPredecessorPhraseSearchFinding:
        'Exact/material searches for 地位邻近者、克力较大 / 地位遥隔者克力较小, 克者坐旺通根, and 倘虚浮无根的克者再逢它行来克 located same-work reproductions and later downstream articles, not a verified pre-2007 predecessor for the target passage.',
      sameWorkDuplicateNormalizationFinding:
        'Scribd document 733612933, Scribd document 745911577, and later resource copies are normalized as witnesses of the same 吴怀云 textbook; they do not count as multiple authorities.',
      selectedSetAndExternalLineageCrossCheckFinding:
        'The already-frozen 2026 Sina/曾勇 retransmission remains downstream of 吴怀云 and cannot establish the textbook’s upstream origin. No new selected-set upstream dependency was verified.',
      sourceLocators: [
        'https://bbs-mychat.com/reads.php?tid=608171',
        'https://www.scribd.com/document/733612933/',
        'https://www.scribd.com/document/745911577/',
        'https://kandian.sina.cn/article_7879848901_1d5acf3c501901nobm.html?from=astro',
      ],
      boundedSearchQueries: [
        '正宗阴阳五行八字预知学 吴怀云 序',
        '地位邻近者 克力较大 地位遥隔者 克力较小',
        '克者坐旺通根 克力较大',
        '倘虚浮无根的克者再逢它行来克',
        '地位间隔 无力遥克',
      ],
      boundedSearchBasisDocumented: true as const,
      corroborationSufficientForExplicitNegativeFinding: false as const,
      explicitNegativeFindingEstablished: false as const,
      newDerivativeDependencyFound: false as const,
      independenceEstablishedByThisRecord: false as const,
      corpusExhaustionProven: false as const,
      universalNoDependencyProven: false as const,
      findingConclusion:
        'WU_PUBLIC_WITNESS_PUSHED_TO_2007_03_22_BUT_EXACT_UPSTREAM_NORMATIVE_ORIGIN_REMAINS_UNRESOLVED_NO_EXPLICIT_NEGATIVE_BASIS',
      numericWeight: null,
    }),
    Object.freeze({
      evidenceId: 'evidence_mingdeng_generic_youli_wuli_criteria' as const,
      priorState: 'ORIGIN_UNRESOLVED_REQUIRES_FURTHER_DISCOVERY' as const,
      discoveryRequirementIdsApplied: I159_ORIGIN_GAP_DISCOVERY_REQUIREMENT_IDS,
      relationshipFindingState: 'UNRESOLVED_AFTER_TARGETED_ORIGIN_DISCOVERY' as const,
      lineageClass: 'SELF_HOSTED_SECONDARY_ARTICLE_ORIGIN_LINEAGE_UNRESOLVED' as const,
      earliestWitnessOrEditionFinding:
        'The self-hosted 明灯玄学 article is dated 2022-08-05 and supplies the earliest verified witness in the bounded discovery performed for this target.',
      internalAttributionAndCitationFinding:
        'The page labels 文章来源 as 明灯玄学 / 明灯国学课堂 and gives no target-specific external citation for its four 有根/没根 plus 生扶/克泄耗 criteria.',
      datedPredecessorPhraseSearchFinding:
        'Exact searches for the distinctive 天干没根/其它天干相克泄耗 and related four-line criteria returned the 明灯 page itself; no dated predecessor carrying the same criteria was verified.',
      sameWorkDuplicateNormalizationFinding:
        'No governed same-work alternate witness was verified for this target; the self-hosted article remains one provenance identity.',
      selectedSetAndExternalLineageCrossCheckFinding:
        'No selected-candidate or external predecessor dependency was verified. Search silence is not converted into a negative derivative finding or independence claim.',
      sourceLocators: ['https://www.mingdengguoxue.com/?id=1095'],
      boundedSearchQueries: [
        '天干没根 天干克地支 地支克天干 地支泄天干 其它天干相克泄耗',
        '天干没根 其它天干相生扶',
        '天干有根 其它天干相克泄耗',
        '天干有根 其它天干相生扶',
        '四柱八字天干力量分析 有力 无力',
      ],
      boundedSearchBasisDocumented: true as const,
      corroborationSufficientForExplicitNegativeFinding: false as const,
      explicitNegativeFindingEstablished: false as const,
      newDerivativeDependencyFound: false as const,
      independenceEstablishedByThisRecord: false as const,
      corpusExhaustionProven: false as const,
      universalNoDependencyProven: false as const,
      findingConclusion:
        'MINGDENG_SELF_HOSTED_2022_WITNESS_CONFIRMED_BUT_ORIGIN_LINEAGE_REMAINS_UNRESOLVED_SEARCH_SILENCE_NOT_PROMOTED_TO_NEGATIVE_FINDING',
      numericWeight: null,
    }),
  ]);
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryEvidenceReport, 'evidenceRecordSetId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryEvidenceReport {
  return {
    evidenceRecordSetId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_remaining_origin_gap_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI160ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryEvidence(
  i159: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemainingOriginGapTargetedDiscoveryEvidenceReport {
  const accepted = exactI159Accepted(i159);
  const common = {
    evidenceVersion:
      I160_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMAINING_ORIGIN_GAP_TARGETED_DISCOVERY_EVIDENCE_VERSION,
    upstreamI159ReviewId: i159.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy' as const,
    policyVersion: 'v1-definition' as const,
    adoptionVersion: 'v1-adoption' as const,
    candidateSetVersion: 'v1-candidate-set' as const,
    inputPackageVersion: 'v2-input-package' as const,
    discoveryRequirementIdsApplied: I159_ORIGIN_GAP_DISCOVERY_REQUIREMENT_IDS,
    discoveryRequirementCount: 9 as const,
    frozenDerivativeFindingsReopenedByThisGate: false as const,
    newDerivativeDependencyFoundCount: 0 as const,
    explicitNegativeFindingEstablishedCount: 0 as const,
    independentNormativeProvenanceEstablishedCount: 0 as const,
    noExplicitNegativeFindingFromSearchSilence: true as const,
    noChronologyOnlyIndependenceInference: true as const,
    noUniqueSourceIdentityIndependenceInference: true as const,
    noSourceCountVotingPerformed: true as const,
    noProvenanceTierWeightingPerformed: true as const,
    corpusExhaustionProven: false as const,
    universalNoDerivativeDependencyProven: false as const,
    derivativeRelationshipFindingMadeByThisGate: false as const,
    provenanceIndependenceFindingMadeByThisGate: false as const,
    provenanceIndependenceAdjudicatedByThisGate: false as const,
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false as const,
    provenanceIndependenceCheckMayPassByThisGate: false as const,
    inputPackageMutatedByThisGate: false as const,
    newPackageVersionCreatedByThisGate: false as const,
    candidateSetReevaluationAuthorizedByThisGate: false as const,
    candidateSetReevaluationPerformedByThisGate: false as const,
    candidateSetAdmissibilityEstablishedByThisGate: false as const,
    productionPolicyExecutionAuthorized: false as const,
    actualCompositionPerformedByThisGate: false as const,
    multiSourceCompositionAuthorized: false as const,
    authorityAcquiredByThisGate: false as const,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false as const,
    thresholdRuleCreatedByThisGate: false as const,
    damageEvaluationAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    hiddenStemInteractionEligibilityGapRemains: true as const,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' as const,
  };

  if (!accepted) {
    return finalized({
      ...common,
      status: 'I159_REMAINING_ORIGIN_GAP_DISCOVERY_READINESS_INVALID',
      decision: 'TARGETED_REMAINING_ORIGIN_DISCOVERY_NOT_EXECUTED',
      adoptionId: null,
      candidateSetId: null,
      inputPackageId: null,
      exactI159ReadinessAccepted: false,
      frozenDerivativeEvidenceIds: [],
      frozenDerivativeEvidenceCount: 0,
      originGapDiscoveryEvidenceRecords: [],
      originGapDiscoveryEvidenceRecordCount: 0,
      unresolvedAfterTargetedOriginDiscoveryCount: 0,
      exactWeiOriginRemainsUnresolved: false,
      exactWuOriginRemainsUnresolved: false,
      exactMingdengOriginRemainsUnresolved: false,
      wei1934PrefacesAnd1935WorkWitnessChecked: false,
      weiGenericTraditionalDependenceDisclosedButExactTargetLineageUnresolved: false,
      wuPublicWitnessNoLaterThan2007_03_22: false,
      wuDownstreamRetransmissionRemainsFrozen: false,
      mingdeng2022SelfHostedWitnessChecked: false,
      allThreeBoundedSearchBasesDocumented: false,
      targetedOriginGapDiscoveryExecutedByThisGate: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMAINING_ORIGIN_GAP_TARGETED_DISCOVERY_READINESS_REVIEW',
      notes: ['I160 fails closed unless the exact I159 three-target discovery authorization remains intact.'],
    });
  }

  const records = evidenceRecords();

  return finalized({
    ...common,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMAINING_ORIGIN_GAP_TARGETED_DISCOVERY_EVIDENCE',
    decision:
      'TARGETED_REMAINING_ORIGIN_DISCOVERY_EXECUTED_THREE_ORIGINS_REMAIN_UNRESOLVED_ZERO_NEW_DERIVATIVE_ZERO_EXPLICIT_NEGATIVE_FINDINGS_NO_INDEPENDENCE_ADJUDICATION',
    adoptionId: i159.adoptionId,
    candidateSetId: i159.candidateSetId,
    inputPackageId: i159.inputPackageId,
    exactI159ReadinessAccepted: true,
    frozenDerivativeEvidenceIds: i159.frozenDerivativeEvidenceIds,
    frozenDerivativeEvidenceCount: 3,
    originGapDiscoveryEvidenceRecords: records,
    originGapDiscoveryEvidenceRecordCount: 3,
    unresolvedAfterTargetedOriginDiscoveryCount: 3,
    exactWeiOriginRemainsUnresolved: true,
    exactWuOriginRemainsUnresolved: true,
    exactMingdengOriginRemainsUnresolved: true,
    wei1934PrefacesAnd1935WorkWitnessChecked: true,
    weiGenericTraditionalDependenceDisclosedButExactTargetLineageUnresolved: true,
    wuPublicWitnessNoLaterThan2007_03_22: true,
    wuDownstreamRetransmissionRemainsFrozen: true,
    mingdeng2022SelfHostedWitnessChecked: true,
    allThreeBoundedSearchBasesDocumented: true,
    targetedOriginGapDiscoveryExecutedByThisGate: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMAINING_ORIGIN_DISCOVERY_EXHAUSTION_AND_POLICY_REASSESSMENT_REVIEW',
    notes: [
      'I160 executed the exact I159 bounded origin-lineage discovery over Wei, Wu, and Mingdeng only; the three previously established derivative findings remain frozen.',
      'Wei discloses generic dependence on earlier命理 tradition but no exact predecessor for the target position/不能相克 rule was verified, so target lineage remains unresolved.',
      'Wu has a public catalog witness dated 2007-03-22 and later same-work/downstream reproductions, but no verified upstream source for the target passage, so origin remains unresolved.',
      'Mingdeng is a 2022 self-hosted secondary article without a target-specific lineage citation; exact-phrase search silence is not an explicit negative finding.',
      'No target produced a new derivative dependency, a governed explicit negative derivative finding, or an independent normative provenance finding. Corpus exhaustion is not claimed.',
    ],
  });
}
