import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I156_DISCOVERY_REQUIREMENT_IDS,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryReadinessReviewReport,
  type I156DiscoveryRequirementId,
} from './i156-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-provenance-derivative-relationship-authority-discovery-readiness-review.js';

export const I157_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-provenance-derivative-relationship-authority-discovery-evidence-v1';

export type I157RelationshipFindingState =
  | 'DERIVATIVE_DEPENDENCY_FOUND'
  | 'NO_DERIVATIVE_DEPENDENCY_FOUND_WITH_EXPLICIT_BASIS'
  | 'UNRESOLVED_AFTER_TARGETED_DISCOVERY';

export type I157RelationshipClass =
  | 'EDITORIAL_OR_LECTURE_LINEAGE'
  | 'SAME_WORK_WITNESS_RETRANSMISSION_ONLY'
  | 'PRIOR_SAME_AUTHOR_WORK_REVISION_LINEAGE'
  | 'CROSS_CANDIDATE_TEXTUAL_RETRANSMISSION'
  | 'ORIGIN_LINEAGE_UNRESOLVED';

export interface I157DerivativeRelationshipEvidenceRecord {
  evidenceId: string;
  provenanceIdentity: string;
  registeredDependencyLinks: readonly string[];
  discoveryRequirementIdsApplied: readonly I156DiscoveryRequirementId[];
  relationshipFindingState: I157RelationshipFindingState;
  relationshipClass: I157RelationshipClass;
  relatedProvenanceIdentities: readonly string[];
  sourceLocators: readonly string[];
  chronologyFinding: string;
  attributionAndRetransmissionFinding: string;
  sameWorkNormalizationFinding: string;
  directLineageFinding: string;
  explicitNegativeSearchBasisEstablished: boolean;
  crossCandidateDependencyFound: boolean;
  findingConclusion: string;
  independenceEstablishedByThisRecord: false;
  numericWeight: null;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryEvidenceReport {
  evidenceRecordSetId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_EVIDENCE'
    | 'I156_DISCOVERY_READINESS_INVALID';
  decision:
    | 'TARGETED_DERIVATIVE_RELATIONSHIP_DISCOVERY_EXECUTED_THREE_DERIVATIVE_RELATIONSHIPS_FOUND_THREE_ORIGINS_UNRESOLVED_ONE_CROSS_CANDIDATE_RETRANSMISSION_FOUND_NO_INDEPENDENCE_ADJUDICATION'
    | 'TARGETED_DERIVATIVE_RELATIONSHIP_DISCOVERY_NOT_EXECUTED';
  upstreamI156ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  adoptionId: string | null;
  candidateSetVersion: 'v1-candidate-set';
  candidateSetId: string | null;
  inputPackageVersion: 'v2-input-package';
  inputPackageId: string | null;
  exactI156ReadinessAccepted: boolean;
  discoveryRequirementIdsApplied: readonly I156DiscoveryRequirementId[];
  discoveryRequirementCount: 8;
  discoveryEvidenceRecords: readonly I157DerivativeRelationshipEvidenceRecord[];
  discoveryEvidenceRecordCount: 6 | 0;
  derivativeDependencyFoundCount: 3 | 0;
  explicitNegativeRelationshipFoundCount: 0;
  unresolvedAfterDiscoveryCount: 3 | 0;
  crossCandidateDependencyFoundCount: 1 | 0;
  exactCrossCandidateDependencyEvidenceId: 'evidence_yimeng_wuli_yaoke_example' | null;
  exactCrossCandidateDependencyTargetEvidenceId: 'evidence_wu_huaiyun_taxonomy_remote_and_operational_examples' | null;
  chenEditorialOrLectureLineageFound: boolean;
  weiSameWorkWitnessRetransmissionConfirmedButNormativeOriginStillUnresolved: boolean;
  zhuPriorSameAuthorRevisionLineageFound: boolean;
  yimengToWuCrossCandidateTextualRetransmissionFound: boolean;
  wuNormativeOriginStillUnresolved: boolean;
  mingdengNormativeOriginStillUnresolved: boolean;
  noNegativeFindingCreatedFromSearchSilence: boolean;
  noChronologyOnlyIndependenceInference: boolean;
  noSourceCountVotingPerformed: boolean;
  noProvenanceTierWeightingPerformed: boolean;
  allIndependenceFindingsRemainUnestablished: boolean;
  discoveryExecutedByThisGate: boolean;
  derivativeRelationshipFindingsMadeByThisGate: boolean;
  provenanceIndependenceAdjudicatedByThisGate: false;
  provenanceIndependenceEstablishedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_DISCOVERY_EVIDENCE_ADEQUACY_AND_ADJUDICATION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_READINESS_REVIEW';
  notes: readonly string[];
}

const FINDINGS: Readonly<Record<string, Omit<I157DerivativeRelationshipEvidenceRecord, 'evidenceId' | 'provenanceIdentity' | 'registeredDependencyLinks' | 'discoveryRequirementIdsApplied' | 'independenceEstablishedByThisRecord' | 'numericWeight'>>> = Object.freeze({
  evidence_chen_yuan_position_distance_wuli: {
    relationshipFindingState: 'DERIVATIVE_DEPENDENCY_FOUND',
    relationshipClass: 'EDITORIAL_OR_LECTURE_LINEAGE',
    relatedProvenanceIdentities: ['external_shao_weihua_review_and_joint_lecture_lineage'],
    sourceLocators: [
      'https://search.worldcat.org/title/123907495',
      'https://books.google.com/books/about/%E9%82%B5%E4%BC%9F%E5%8D%8E%E5%9B%9B%E6%9F%B1%E9%A2%84%E6%B5%8B%E5%AD%A6%E5%85%A5%E9%97%A8.html?id=17JL5BHO_NwC',
      'https://www.quanxue.cn/qt_mingxiang/sizhuindex.html',
    ],
    chronologyFinding: 'Bibliographic records place the 陈园 work in 1995; a library record also identifies an earlier 1994 Hong Kong edition.',
    attributionAndRetransmissionFinding: 'WorldCat identifies 陈园 as compiler/author and 邵伟华 as reviewer; the Quanxue reproduction describes the material as drawn from 邵伟华、陈园 prediction-class lecture material.',
    sameWorkNormalizationFinding: 'Quanxue web material is treated as a witness/reproduction of the 陈园/邵伟华 work lineage, not an additional independent normative provenance.',
    directLineageFinding: 'Explicit editorial/joint-lecture lineage is present. This is a provenance dependency signal but not a cross-candidate dependency among the six selected candidates.',
    explicitNegativeSearchBasisEstablished: false,
    crossCandidateDependencyFound: false,
    findingConclusion: 'EDITORIAL_OR_LECTURE_LINEAGE_CONFIRMED_EXTERNAL_TO_SELECTED_CANDIDATE_SET_NO_INDEPENDENCE_FINDING',
  },
  evidence_wei_qianli_far_position_cannot_ke: {
    relationshipFindingState: 'UNRESOLVED_AFTER_TARGETED_DISCOVERY',
    relationshipClass: 'SAME_WORK_WITNESS_RETRANSMISSION_ONLY',
    relatedProvenanceIdentities: [
      'witness_wei_qianli_webpdf_reproduction',
      'witness_wei_qianli_ctext_ganke_zhubie',
    ],
    sourceLocators: [
      'https://commons.wikimedia.org/wiki/File:NLC416-17jh002565-109431_%E5%8D%83%E9%87%8C%E5%91%BD%E7%A8%BF.pdf',
      'https://books.google.com/books/about/%E5%8D%83%E9%87%8C%E5%91%BD%E7%A8%BF.html?id=0NRnAgAAQBAJ',
    ],
    chronologyFinding: 'The NLC scan metadata identifies 韦千里 as author and 1935 as the publication date; later editions and web reproductions are downstream witnesses of the same work.',
    attributionAndRetransmissionFinding: 'Registered web-PDF and CText witnesses are same-work retransmissions and cannot be counted as additional provenance authorities.',
    sameWorkNormalizationFinding: 'Same-work witness dependency is confirmed and normalized; this does not establish that 韦千里 normative content derives from another selected candidate.',
    directLineageFinding: 'No governed basis was found in this search to classify the 1935 normative work itself as derivative from another selected provenance identity.',
    explicitNegativeSearchBasisEstablished: false,
    crossCandidateDependencyFound: false,
    findingConclusion: 'SAME_WORK_RETRANSMISSION_CONFIRMED_NORMATIVE_ORIGIN_DEPENDENCY_REMAINS_UNRESOLVED',
  },
  evidence_zhu_zuxia_remote_ke_conditions: {
    relationshipFindingState: 'DERIVATIVE_DEPENDENCY_FOUND',
    relationshipClass: 'PRIOR_SAME_AUTHOR_WORK_REVISION_LINEAGE',
    relatedProvenanceIdentities: ['external_zhu_zuxia_mingli_yingyong_jingjie_prior_work'],
    sourceLocators: [
      'https://www.xinyi.hk/article-34.html',
      'https://www.xinyi.hk/goods-358.html',
      'https://www.suanzhun.net/book/1276.html',
    ],
    chronologyFinding: 'Publisher/catalog evidence identifies 八字与用神 as a 2007 publication; the book preface describes it as 朱祖夏’s accumulated study and practice summary.',
    attributionAndRetransmissionFinding: 'Xinyi explicitly states that 朱祖夏’s earlier 命理应用精解 was revised and renamed 八字与用神.',
    sameWorkNormalizationFinding: 'The prior same-author work is treated as explicit revision lineage, not as a second independent authority.',
    directLineageFinding: 'A direct prior-work revision lineage is explicitly documented. No cross-candidate dependency among the six selected candidates is established by that fact alone.',
    explicitNegativeSearchBasisEstablished: false,
    crossCandidateDependencyFound: false,
    findingConclusion: 'PRIOR_SAME_AUTHOR_REVISION_LINEAGE_CONFIRMED_NO_CROSS_CANDIDATE_INDEPENDENCE_FINDING',
  },
  evidence_yimeng_wuli_yaoke_example: {
    relationshipFindingState: 'DERIVATIVE_DEPENDENCY_FOUND',
    relationshipClass: 'CROSS_CANDIDATE_TEXTUAL_RETRANSMISSION',
    relatedProvenanceIdentities: ['source_wu_huaiyun_yinyang_wuxing_bazi_yucexue_chuji_scribd_733612933'],
    sourceLocators: [
      'https://kandian.sina.cn/article_7879848901_1d5acf3c501901nobm.html?from=astro',
      'https://www.scribd.com/document/733612933/',
      'https://www.guoxueziliao.com/6139.html',
    ],
    chronologyFinding: 'The Sina article is dated 2026-03-10. A 2023 resource catalog already lists 吴怀云’s initial textbook, establishing that the 吴怀云 material predates the Sina article.',
    attributionAndRetransmissionFinding: 'The Sina article labels the text “（文）曾勇” while its 天干相克 sequence, distance/strength wording, and examples materially reproduce the 吴怀云 textbook passage.',
    sameWorkNormalizationFinding: 'This is not treated as an alternate witness of the same named work; it is a later article carrying materially matching content from another selected candidate source.',
    directLineageFinding: 'Chronology plus material textual overlap establishes a governed cross-candidate retransmission dependency from the later Sina evidence toward the earlier 吴怀云 textbook provenance.',
    explicitNegativeSearchBasisEstablished: false,
    crossCandidateDependencyFound: true,
    findingConclusion: 'CROSS_CANDIDATE_RETRANSMISSION_FOUND_YIMENG_SINA_EVIDENCE_NOT_INDEPENDENT_FROM_WU_HUAIYUN_FOR_THIS_PASSAGE',
  },
  evidence_wu_huaiyun_taxonomy_remote_and_operational_examples: {
    relationshipFindingState: 'UNRESOLVED_AFTER_TARGETED_DISCOVERY',
    relationshipClass: 'ORIGIN_LINEAGE_UNRESOLVED',
    relatedProvenanceIdentities: ['downstream_evidence_yimeng_wuli_yaoke_example'],
    sourceLocators: [
      'https://www.scribd.com/document/733612933/',
      'https://www.guoxueziliao.com/6139.html',
      'https://www.dajiazhao.com/sm/baziqishuyanjiu/3901.html',
    ],
    chronologyFinding: 'The 吴怀云 teaching lineage is externally attested before the 2026 Sina article, and the textbook is listed in a 2023 resource catalog.',
    attributionAndRetransmissionFinding: 'A downstream Sina retransmission of the relevant passage is found, but downstream copying does not prove the upstream 吴怀云 source itself is independent or derivative.',
    sameWorkNormalizationFinding: 'Multiple electronic copies of the 吴怀云 textbook are treated as reproductions of one normative provenance identity.',
    directLineageFinding: 'No explicit evidence found in this targeted pass establishes the upstream normative origin relationship needed to classify 吴怀云 itself as independent or derivative relative to another selected source.',
    explicitNegativeSearchBasisEstablished: false,
    crossCandidateDependencyFound: false,
    findingConclusion: 'DOWNSTREAM_RETRANSMISSION_FOUND_BUT_WU_NORMATIVE_ORIGIN_REMAINS_UNRESOLVED',
  },
  evidence_mingdeng_generic_youli_wuli_criteria: {
    relationshipFindingState: 'UNRESOLVED_AFTER_TARGETED_DISCOVERY',
    relationshipClass: 'ORIGIN_LINEAGE_UNRESOLVED',
    relatedProvenanceIdentities: [],
    sourceLocators: ['https://www.mingdengguoxue.com/?id=1095'],
    chronologyFinding: 'The self-hosted 明灯玄学 article is dated 2022-08-05.',
    attributionAndRetransmissionFinding: 'The page attributes the article to 明灯玄学/明灯国学课堂 but does not provide a direct source-lineage citation for its four 有力/无力 rules.',
    sameWorkNormalizationFinding: 'No same-work alternate witness is registered for this provenance target in the governed package.',
    directLineageFinding: 'Targeted exact-phrase searching did not supply an explicit predecessor/source-lineage record sufficient for either a derivative or negative derivative conclusion.',
    explicitNegativeSearchBasisEstablished: false,
    crossCandidateDependencyFound: false,
    findingConclusion: 'MINGDENG_ORIGIN_LINEAGE_REMAINS_UNRESOLVED_SEARCH_SILENCE_NOT_PROMOTED_TO_NEGATIVE_FINDING',
  },
});

function exactI156Accepted(
  i156: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryReadinessReviewReport,
): boolean {
  const exactRequirements =
    i156.discoveryRequirementIds.length === I156_DISCOVERY_REQUIREMENT_IDS.length &&
    i156.discoveryRequirementIds.every(
      (requirementId, index) => requirementId === I156_DISCOVERY_REQUIREMENT_IDS[index],
    );
  const targetEvidenceIds = i156.discoveryTargetRecords.map((target) => target.evidenceId);
  const expectedEvidenceIds = Object.keys(FINDINGS);

  return (
    i156.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_READINESS_REVIEW' &&
    i156.decision ===
      'SIX_PROVENANCE_INPUTS_READY_FOR_TARGETED_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_NO_INDEPENDENCE_FINDING_NO_PACKAGE_MUTATION' &&
    i156.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i156.policyVersion === 'v1-definition' &&
    i156.adoptionVersion === 'v1-adoption' &&
    i156.adoptionId !== null &&
    i156.candidateSetVersion === 'v1-candidate-set' &&
    i156.candidateSetId !== null &&
    i156.inputPackageVersion === 'v2-input-package' &&
    i156.inputPackageId !== null &&
    i156.exactI155ReadinessAccepted &&
    exactRequirements &&
    i156.discoveryRequirementCount === 8 &&
    i156.discoveryTargetCount === 6 &&
    i156.discoveryTargetRecords.length === 6 &&
    new Set(targetEvidenceIds).size === 6 &&
    expectedEvidenceIds.every((evidenceId) => targetEvidenceIds.includes(evidenceId)) &&
    i156.discoveryTargetRecords.every(
      (target) =>
        target.provenanceIdentity.length > 0 &&
        target.discoveryState === 'TARGETED_DISCOVERY_NOT_EXECUTED' &&
        target.relationshipFindingState === 'NOT_RESEARCHED' &&
        target.independenceFindingState === 'NOT_AUTHORIZED' &&
        target.requiredDiscoveryRequirementIds.length === I156_DISCOVERY_REQUIREMENT_IDS.length &&
        target.requiredDiscoveryRequirementIds.every(
          (requirementId, index) => requirementId === I156_DISCOVERY_REQUIREMENT_IDS[index],
        ) &&
        target.positiveRelationshipFindingWouldMeanDerivativeDependency &&
        target.negativeRelationshipFindingRequiresExplicitEvidence &&
        target.unresolvedRelationshipMustRemainUnresolved &&
        target.absenceOfKnownDependencySufficientForNegativeFinding === false &&
        target.sourceCountMayResolveRelationship === false &&
        target.provenanceTierMayResolveRelationship === false,
    ) &&
    i156.allTargetsBoundToExactEvidenceAndProvenanceIdentity &&
    i156.allTargetsRemainConclusionNeutralBeforeDiscovery &&
    i156.sourceChronologyCheckRequired &&
    i156.attributionAndRetransmissionCheckRequired &&
    i156.sameWorkEditionWitnessNormalizationRequired &&
    i156.directSourceLineageEvidenceCheckRequired &&
    i156.triStateRelationshipFindingRequired &&
    i156.negativeRelationshipFindingRequiresExplicitSearchBasis &&
    i156.absenceOfKnownDependencyMayBecomeNegativeFinding === false &&
    i156.emptyRegisteredDependencyLinksMayBecomeIndependenceFinding === false &&
    i156.uniqueProvenanceIdentityMayBecomeIndependenceFinding === false &&
    i156.sourceCountVotingAllowed === false &&
    i156.provenanceTierWeightingAllowed === false &&
    i156.discoveryExecutedByThisGate === false &&
    i156.derivativeRelationshipFindingMadeByThisGate === false &&
    i156.provenanceIndependenceFindingAuthorizedByThisGate === false &&
    i156.provenanceIndependenceAdjudicatedByThisGate === false &&
    i156.inputPackageMutatedByThisGate === false &&
    i156.newPackageVersionCreatedByThisGate === false &&
    i156.candidateSetReevaluationAuthorizedByThisGate === false &&
    i156.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i156.productionPolicyExecutionAuthorized === false &&
    i156.actualCompositionPerformedByThisGate === false &&
    i156.multiSourceCompositionAuthorized === false &&
    i156.authorityAcquiredByThisGate === false &&
    i156.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i156.thresholdRuleCreatedByThisGate === false &&
    i156.classificationAuthorized === false &&
    i156.numericScoringAuthorized === false &&
    i156.hiddenStemInteractionEligibilityGapRemains &&
    i156.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_EVIDENCE'
  );
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryEvidenceReport, 'evidenceRecordSetId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryEvidenceReport {
  return {
    evidenceRecordSetId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_provenance_derivative_discovery_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI157ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryEvidence(
  i156: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceDerivativeRelationshipAuthorityDiscoveryEvidenceReport {
  const accepted = exactI156Accepted(i156);
  const common = {
    evidenceVersion:
      I157_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_EVIDENCE_VERSION,
    upstreamI156ReviewId: i156.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy' as const,
    policyVersion: 'v1-definition' as const,
    adoptionVersion: 'v1-adoption' as const,
    candidateSetVersion: 'v1-candidate-set' as const,
    inputPackageVersion: 'v2-input-package' as const,
    discoveryRequirementIdsApplied: I156_DISCOVERY_REQUIREMENT_IDS,
    discoveryRequirementCount: 8 as const,
    explicitNegativeRelationshipFoundCount: 0 as const,
    noNegativeFindingCreatedFromSearchSilence: true,
    noChronologyOnlyIndependenceInference: true,
    noSourceCountVotingPerformed: true,
    noProvenanceTierWeightingPerformed: true,
    provenanceIndependenceAdjudicatedByThisGate: false as const,
    provenanceIndependenceEstablishedByThisGate: false as const,
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
      status: 'I156_DISCOVERY_READINESS_INVALID',
      decision: 'TARGETED_DERIVATIVE_RELATIONSHIP_DISCOVERY_NOT_EXECUTED',
      adoptionId: null,
      candidateSetId: null,
      inputPackageId: null,
      exactI156ReadinessAccepted: false,
      discoveryEvidenceRecords: [],
      discoveryEvidenceRecordCount: 0,
      derivativeDependencyFoundCount: 0,
      unresolvedAfterDiscoveryCount: 0,
      crossCandidateDependencyFoundCount: 0,
      exactCrossCandidateDependencyEvidenceId: null,
      exactCrossCandidateDependencyTargetEvidenceId: null,
      chenEditorialOrLectureLineageFound: false,
      weiSameWorkWitnessRetransmissionConfirmedButNormativeOriginStillUnresolved: false,
      zhuPriorSameAuthorRevisionLineageFound: false,
      yimengToWuCrossCandidateTextualRetransmissionFound: false,
      wuNormativeOriginStillUnresolved: false,
      mingdengNormativeOriginStillUnresolved: false,
      allIndependenceFindingsRemainUnestablished: true,
      discoveryExecutedByThisGate: false,
      derivativeRelationshipFindingsMadeByThisGate: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_READINESS_REVIEW',
      notes: ['I157 fails closed unless the exact six-target I156 discovery plan remains intact.'],
    });
  }

  const records = Object.freeze(
    i156.discoveryTargetRecords.map((target) => {
      const finding = FINDINGS[target.evidenceId];
      if (!finding) {
        throw new Error(`I157 missing governed discovery finding for ${target.evidenceId}`);
      }
      return Object.freeze({
        evidenceId: target.evidenceId,
        provenanceIdentity: target.provenanceIdentity,
        registeredDependencyLinks: Object.freeze([...target.registeredDependencyLinks]),
        discoveryRequirementIdsApplied: I156_DISCOVERY_REQUIREMENT_IDS,
        ...finding,
        independenceEstablishedByThisRecord: false as const,
        numericWeight: null,
      });
    }),
  );

  return finalized({
    ...common,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_AUTHORITY_DISCOVERY_EVIDENCE',
    decision:
      'TARGETED_DERIVATIVE_RELATIONSHIP_DISCOVERY_EXECUTED_THREE_DERIVATIVE_RELATIONSHIPS_FOUND_THREE_ORIGINS_UNRESOLVED_ONE_CROSS_CANDIDATE_RETRANSMISSION_FOUND_NO_INDEPENDENCE_ADJUDICATION',
    adoptionId: i156.adoptionId,
    candidateSetId: i156.candidateSetId,
    inputPackageId: i156.inputPackageId,
    exactI156ReadinessAccepted: true,
    discoveryEvidenceRecords: records,
    discoveryEvidenceRecordCount: 6,
    derivativeDependencyFoundCount: 3,
    unresolvedAfterDiscoveryCount: 3,
    crossCandidateDependencyFoundCount: 1,
    exactCrossCandidateDependencyEvidenceId: 'evidence_yimeng_wuli_yaoke_example',
    exactCrossCandidateDependencyTargetEvidenceId:
      'evidence_wu_huaiyun_taxonomy_remote_and_operational_examples',
    chenEditorialOrLectureLineageFound: true,
    weiSameWorkWitnessRetransmissionConfirmedButNormativeOriginStillUnresolved: true,
    zhuPriorSameAuthorRevisionLineageFound: true,
    yimengToWuCrossCandidateTextualRetransmissionFound: true,
    wuNormativeOriginStillUnresolved: true,
    mingdengNormativeOriginStillUnresolved: true,
    allIndependenceFindingsRemainUnestablished: true,
    discoveryExecutedByThisGate: true,
    derivativeRelationshipFindingsMadeByThisGate: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_DERIVATIVE_RELATIONSHIP_DISCOVERY_EVIDENCE_ADEQUACY_AND_ADJUDICATION_READINESS_REVIEW',
    notes: [
      'I157 records evidence-level derivative relationships only. It does not adjudicate the six provenance inputs as independent or non-independent.',
      'The strongest selected-set dependency is the later Sina 曾勇 article materially reproducing the earlier 吴怀云 textbook passage; these two evidence rows may not be counted as independent authorities for that passage.',
      'Chen editorial/lecture lineage and Zhu prior-same-author revision lineage are explicit dependencies but are not cross-candidate dependencies by themselves.',
      'Wei same-work witnesses are normalized as retransmissions while the normative origin remains unresolved. Wu upstream origin and Mingdeng origin also remain unresolved.',
      'No negative derivative finding is created from search silence, chronology alone, source count, or provenance tier.',
    ],
  });
}
