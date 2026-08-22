import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I170_ALLOWED_LINEAGE_FINDINGS,
  I170_LINEAGE_QUESTION_IDS,
  I170_LINEAGE_REQUIREMENT_IDS,
  type I170AllowedLineageFinding,
  type I170LineageQuestionId,
  type I170SecondWaveCandidateEvidenceAdequacyLineageReadinessReviewReport,
} from './i170-second-wave-candidate-evidence-adequacy-lineage-readiness-review.js';

export const I171_LI_SHUNXIANG_TARGETED_LINEAGE_EVIDENCE_VERSION =
  'myeonghwa-li-shunxiang-targeted-lineage-adjudication-evidence-v1';

export interface I171LineageEvidenceRecord {
  questionId: I170LineageQuestionId;
  finding: I170AllowedLineageFinding;
  evidenceBasis: readonly string[];
  boundedSearchBasis: readonly string[];
  dependencyTarget: string | null;
  relationshipClass:
    | 'SELECTED_SET_SPECIFIC_DEPENDENCY_UNRESOLVED'
    | 'COMMON_SCHOOL_OR_INSTITUTIONAL_LINEAGE_UNRESOLVED'
    | 'EDITORIAL_ROLE_TARGET_AUTHORSHIP_UNRESOLVED'
    | 'PRIOR_SAME_AUTHOR_WORK_RETRANSMISSION';
  chronologyEstablished: boolean;
  chronologyAloneUsedAsFinding: false;
  semanticSimilarityEstablished: boolean;
  semanticSimilarityAloneUsedAsDependencyFinding: false;
  explicitTargetAttributionLocated: boolean;
  searchSilenceUsedAsNegativeFinding: false;
  independentNormativeProvenanceEstablished: false;
}

export interface I171LiShunxiangTargetedLineageEvidenceReport {
  evidenceRecordSetId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_LI_SHUNXIANG_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE'
    | 'I170_LINEAGE_READINESS_INVALID';
  decision:
    | 'LI_SHUNXIANG_TARGETED_LINEAGE_DISCOVERY_EXECUTED_ONE_PRIOR_SAME_AUTHOR_DERIVATIVE_DEPENDENCY_FOUND_THREE_LINEAGE_QUESTIONS_UNRESOLVED_ZERO_EXPLICIT_NEGATIVE_ZERO_INDEPENDENCE_CURRENT_2004_WITNESS_REQUIRES_REASSESSMENT_BEFORE_REMEDIATION'
    | 'LI_SHUNXIANG_TARGETED_LINEAGE_DISCOVERY_NOT_EXECUTED';
  upstreamI170ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI170BoundaryAccepted: boolean;
  lineageTargetRecordId: 'LI_SHUNXIANG_SIZHU_XUANJI_2004' | null;
  lineageRequirementIds: readonly string[];
  lineageQuestionIds: readonly I170LineageQuestionId[];
  allowedLineageFindings: readonly I170AllowedLineageFinding[];
  targetedLineageDiscoveryExecuted: boolean;
  lineageEvidenceRecords: readonly I171LineageEvidenceRecord[];
  lineageEvidenceRecordCount: 4 | 0;
  derivativeDependencyFoundCount: 1 | 0;
  unresolvedAfterTargetedLineageDiscoveryCount: 3 | 0;
  explicitNegativeDerivativeFindingCount: 0;
  independentNormativeProvenanceEstablishedCount: 0;
  selectedSetChenYuanDependencyEstablished: false;
  shaoWeihuaOrResearchCenterSpecificTargetDependencyEstablished: false;
  zhangZhichunTargetRuleAuthorshipEstablished: false;
  priorSameAuthorWorkDependencyEstablished: boolean;
  priorSameAuthorWorkId: 'LI_SHUNXIANG_SIZHU_MINGLI_ZIXIU_JIAOCHENG_PUJIBAN_1998' | null;
  current2004WitnessDisposition:
    | 'PRIOR_SAME_AUTHOR_NORMATIVE_WITNESS_LOCATED_CURRENT_2004_WITNESS_NOT_ORIGINAL_ORIGIN_REBINDING_OR_REMEDIATION_REASSESSMENT_REQUIRED'
    | 'NOT_ASSESSED';
  current2004WitnessMayCountAsNewIndependentProvenanceWithoutReassessment: false;
  prior1998SameAuthorWitnessAutomaticallyEstablishesIndependenceFromSelectedSet: false;
  chronologyUsedAsIndependenceFinding: false;
  semanticSimilarityUsedAsDependencyFindingWithoutLineageEvidence: false;
  institutionalAssociationUsedAsSpecificDependencyFinding: false;
  editorCreditUsedAsTargetAuthorshipFinding: false;
  searchSilenceUsedAsNegativeFinding: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_SHUNXIANG_LINEAGE_EVIDENCE_ADEQUACY_AND_REMEDIATION_REASSESSMENT_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_SHUNXIANG_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE';
  notes: readonly string[];
}

function exactArray(actual: readonly string[], expected: readonly string[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function exactI170Accepted(i170: I170SecondWaveCandidateEvidenceAdequacyLineageReadinessReviewReport): boolean {
  return (
    i170.status === 'RESOLVED_SECOND_WAVE_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_READINESS_REVIEW' &&
    i170.decision ===
      'LI_SHUNXIANG_ONLY_MINIMUM_ADEQUACY_CANDIDATE_READY_FOR_TARGETED_LINEAGE_ADJUDICATION_FOUR_QUESTIONS_FROZEN_THREE_INCOMPLETE_OBSERVATIONS_NOT_PROMOTED_NO_INDEPENDENCE_OR_SELECTION' &&
    i170.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i170.policyVersion === 'v1-definition' &&
    i170.adoptionVersion === 'v1-adoption' &&
    i170.currentCandidateSetVersion === 'v1-candidate-set' &&
    i170.currentInputPackageVersion === 'v2-input-package' &&
    i170.exactI169BoundaryAccepted &&
    i170.discoveryObservationCount === 4 &&
    i170.minimumAdequacyReviewCandidateCount === 1 &&
    i170.lineageAdjudicationTargetRecordId === 'LI_SHUNXIANG_SIZHU_XUANJI_2004' &&
    i170.lineageAdjudicationTargetCount === 1 &&
    i170.incompleteObservationCount === 3 &&
    i170.incompleteObservationsFrozenOutsideLineageAdjudication &&
    exactArray(i170.lineageRequirementIds, I170_LINEAGE_REQUIREMENT_IDS) &&
    i170.lineageRequirementCount === 10 &&
    i170.lineageRequirementsFrozen &&
    exactArray(i170.lineageQuestionIds, I170_LINEAGE_QUESTION_IDS) &&
    i170.lineageQuestionCount === 4 &&
    i170.lineageQuestionsFrozenProspectively &&
    exactArray(i170.allowedLineageFindings, I170_ALLOWED_LINEAGE_FINDINGS) &&
    i170.allowedLineageFindingCount === 3 &&
    i170.selectedSetChenYuanMaterialSimilarityCreatesDependencyAutomatically === false &&
    i170.chronologyCreatesDependencyOrIndependenceAutomatically === false &&
    i170.shaoResearchCenterAssociationCreatesDependencyAutomatically === false &&
    i170.zhangZhichunEditorCreditCreatesTargetRuleAuthorshipAutomatically === false &&
    i170.semanticSimilarityCreatesDependencyAutomatically === false &&
    i170.searchSilenceCreatesNegativeFinding === false &&
    i170.explicitNegativeFindingAloneEstablishesIndependence === false &&
    i170.uniqueSourceIdentityAloneEstablishesIndependence === false &&
    i170.sourceCountVotingAllowed === false &&
    i170.provenanceTierWeightingAllowed === false &&
    i170.targetedLineageAdjudicationMethodologicallyJustified &&
    i170.targetedLineageAdjudicationAuthorized &&
    i170.actualTargetedLineageDiscoveryExecutedByThisGate === false &&
    i170.lineageFindingRecordedByThisGate === false &&
    i170.independentNormativeProvenanceEstablishedByThisGate === false &&
    i170.candidateSelectedByThisGate === false &&
    i170.remediationStrategySelectedByThisGate === false &&
    i170.remediationExecutionAuthorizedByThisGate === false &&
    i170.evidenceReboundByThisGate === false &&
    i170.candidateSetMutatedByThisGate === false &&
    i170.newCandidateSetVersionCreatedByThisGate === false &&
    i170.newInputPackageVersionCreatedByThisGate === false &&
    i170.provenanceIndependenceAdjudicatedByThisGate === false &&
    i170.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i170.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i170.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i170.candidateSetReevaluationAuthorizedByThisGate === false &&
    i170.candidateSetReevaluationPerformedByThisGate === false &&
    i170.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i170.currentV2PackageAndCandidateSetRemainImmutable &&
    i170.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i170.productionPolicyExecutionAuthorized === false &&
    i170.actualCompositionPerformedByThisGate === false &&
    i170.multiSourceCompositionAuthorized === false &&
    i170.authorityAcquiredByThisGate === false &&
    i170.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i170.thresholdRuleCreatedByThisGate === false &&
    i170.damageEvaluationAuthorized === false &&
    i170.classificationAuthorized === false &&
    i170.numericScoringAuthorized === false &&
    i170.hiddenStemInteractionEligibilityGapRemains &&
    i170.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i170.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_SHUNXIANG_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE'
  );
}

function evidenceRecords(): readonly I171LineageEvidenceRecord[] {
  return Object.freeze([
    {
      questionId: 'LI_TARGET_RULE_TO_CHEN_YUAN_1995_SELECTED_SET_DEPENDENCY',
      finding: 'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY',
      evidenceBasis: Object.freeze([
        '陈园《四柱预测学入门》1995 lineage predates the Li 1998/2004 witnesses and states adjacent 克 stronger than separated 克, remote stems powerless, and an intervening transforming stem can make a 克 relationship not count as 克.',
        '李顺祥 material later states distance-sensitive 生克 force and an intervening 丁火 example where 甲木不克日主.',
        'No inspected Li preface, chapter attribution, bibliography, or exact predecessor statement explicitly attributes the target rule to 陈园.',
      ]),
      boundedSearchBasis: Object.freeze([
        'Compared the governed 陈园 passage with the 1998 Li self-study excerpt and 2004 四柱玄机 Chapter 9 witness.',
        'Searched combinations of 李顺祥, 陈园, 四柱玄机, 隔干之克, 中隔之干, 干支紧密度, and the E-example pillars.',
        'Material similarity and chronology were retained as lineage risk only because direct source linkage was not located.',
      ]),
      dependencyTarget: null,
      relationshipClass: 'SELECTED_SET_SPECIFIC_DEPENDENCY_UNRESOLVED',
      chronologyEstablished: true,
      chronologyAloneUsedAsFinding: false,
      semanticSimilarityEstablished: true,
      semanticSimilarityAloneUsedAsDependencyFinding: false,
      explicitTargetAttributionLocated: false,
      searchSilenceUsedAsNegativeFinding: false,
      independentNormativeProvenanceEstablished: false,
    },
    {
      questionId: 'LI_TARGET_RULE_TO_SHAO_WEIHUA_OR_RESEARCH_CENTER_LINEAGE',
      finding: 'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY',
      evidenceBasis: Object.freeze([
        'Li first-edition preface records 1996 and 1997 activity at 邵伟华易学研究服务中心, and later author biography states he served there as a professional predictor, lecturer, editor, and manager.',
        'The governed 陈园 work is associated with 邵伟华 review/lecture lineage, creating a plausible common-school transmission path.',
        'No inspected source states that 邵伟华 or the research center taught, authored, supplied, or approved Li target rule on 干支紧密度/通关 non-克.',
      ]),
      boundedSearchBasis: Object.freeze([
        'Inspected Li first-edition preface and author biography for explicit teacher/source statements.',
        'Searched 李顺祥 + 邵伟华 + 四柱玄机/干支紧密度 and research-center combinations.',
        'Institutional association was not converted into a specific normative dependency without a target-rule link.',
      ]),
      dependencyTarget: null,
      relationshipClass: 'COMMON_SCHOOL_OR_INSTITUTIONAL_LINEAGE_UNRESOLVED',
      chronologyEstablished: true,
      chronologyAloneUsedAsFinding: false,
      semanticSimilarityEstablished: true,
      semanticSimilarityAloneUsedAsDependencyFinding: false,
      explicitTargetAttributionLocated: false,
      searchSilenceUsedAsNegativeFinding: false,
      independentNormativeProvenanceEstablished: false,
    },
    {
      questionId: 'ZHANG_ZHICHUN_EDITORIAL_ROLE_IN_TARGET_RULE_AUTHORSHIP',
      finding: 'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY',
      evidenceBasis: Object.freeze([
        'The 2004 first-edition front matter separates 主编：张志春 from 编著：李顺祥.',
        '张志春 signs a general 中国古代哲学研究文萃 主编导言 dated 2003-09; 李顺祥 signs the book-specific 前言 dated 2003-07.',
        'Google Books identifies 李顺祥 as author and 张志春 as contributor.',
        'No inspected target chapter identifies 张志春 as the author or source of the 干支紧密度 rule, but absence of such attribution is insufficient for a governed negative relationship finding.',
      ]),
      boundedSearchBasis: Object.freeze([
        'Inspected first-edition title/front matter, 主编导言, 李顺祥前言, table of contents, and target Chapter 9 witness.',
        'Compared bibliographic author/contributor metadata with the printed role labels.',
        'Did not treat editorial-role separation as proof that no target-rule contribution occurred.',
      ]),
      dependencyTarget: null,
      relationshipClass: 'EDITORIAL_ROLE_TARGET_AUTHORSHIP_UNRESOLVED',
      chronologyEstablished: true,
      chronologyAloneUsedAsFinding: false,
      semanticSimilarityEstablished: false,
      semanticSimilarityAloneUsedAsDependencyFinding: false,
      explicitTargetAttributionLocated: false,
      searchSilenceUsedAsNegativeFinding: false,
      independentNormativeProvenanceEstablished: false,
    },
    {
      questionId: 'LI_TARGET_RULE_OTHER_EARLIER_SOURCE_ORIGIN',
      finding: 'DERIVATIVE_DEPENDENCY_FOUND',
      evidenceBasis: Object.freeze([
        '李顺祥 author-site biography states that 四柱命理学自修教程（普及班） formally appeared in 1998.',
        'Multiple same-work reproductions explicitly label the target 日干 / 干支紧密度及其生克力量 text as a Chapter 9 excerpt from 四柱命理学自修教程（普及班） and attribute it to 李顺祥.',
        'The 2004 四柱玄机 Chapter 9 reproduces the same distinctive terminology, ordering, examples, and E-column conclusion, establishing that the 2004 witness is downstream of Li own prior 1998 normative work for this target passage.',
      ]),
      boundedSearchBasis: Object.freeze([
        'Searched exact distinctive terminology 干支紧密度, 亲密度, 耗损度 and the A-E example pillars across dated/attributed sources.',
        'Checked Li author biography chronology for prior authored works.',
        'Compared the 1998-titled chapter excerpt with the 2004 first-edition Chapter 9 text at passage and example level.',
      ]),
      dependencyTarget: 'LI_SHUNXIANG_SIZHU_MINGLI_ZIXIU_JIAOCHENG_PUJIBAN_1998',
      relationshipClass: 'PRIOR_SAME_AUTHOR_WORK_RETRANSMISSION',
      chronologyEstablished: true,
      chronologyAloneUsedAsFinding: false,
      semanticSimilarityEstablished: true,
      semanticSimilarityAloneUsedAsDependencyFinding: false,
      explicitTargetAttributionLocated: true,
      searchSilenceUsedAsNegativeFinding: false,
      independentNormativeProvenanceEstablished: false,
    },
  ]);
}

function finalized(
  material: Omit<I171LiShunxiangTargetedLineageEvidenceReport, 'evidenceRecordSetId'>,
): I171LiShunxiangTargetedLineageEvidenceReport {
  return {
    evidenceRecordSetId: `i171_li_shunxiang_targeted_lineage_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI171LiShunxiangTargetedLineageEvidence(
  i170: I170SecondWaveCandidateEvidenceAdequacyLineageReadinessReviewReport,
): I171LiShunxiangTargetedLineageEvidenceReport {
  const accepted = exactI170Accepted(i170);
  const records = accepted ? evidenceRecords() : Object.freeze([] as I171LineageEvidenceRecord[]);

  return finalized({
    evidenceVersion: I171_LI_SHUNXIANG_TARGETED_LINEAGE_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_LI_SHUNXIANG_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE'
      : 'I170_LINEAGE_READINESS_INVALID',
    decision: accepted
      ? 'LI_SHUNXIANG_TARGETED_LINEAGE_DISCOVERY_EXECUTED_ONE_PRIOR_SAME_AUTHOR_DERIVATIVE_DEPENDENCY_FOUND_THREE_LINEAGE_QUESTIONS_UNRESOLVED_ZERO_EXPLICIT_NEGATIVE_ZERO_INDEPENDENCE_CURRENT_2004_WITNESS_REQUIRES_REASSESSMENT_BEFORE_REMEDIATION'
      : 'LI_SHUNXIANG_TARGETED_LINEAGE_DISCOVERY_NOT_EXECUTED',
    upstreamI170ReviewId: i170.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI170BoundaryAccepted: accepted,
    lineageTargetRecordId: accepted ? 'LI_SHUNXIANG_SIZHU_XUANJI_2004' : null,
    lineageRequirementIds: I170_LINEAGE_REQUIREMENT_IDS,
    lineageQuestionIds: I170_LINEAGE_QUESTION_IDS,
    allowedLineageFindings: I170_ALLOWED_LINEAGE_FINDINGS,
    targetedLineageDiscoveryExecuted: accepted,
    lineageEvidenceRecords: records,
    lineageEvidenceRecordCount: accepted ? 4 : 0,
    derivativeDependencyFoundCount: accepted ? 1 : 0,
    unresolvedAfterTargetedLineageDiscoveryCount: accepted ? 3 : 0,
    explicitNegativeDerivativeFindingCount: 0,
    independentNormativeProvenanceEstablishedCount: 0,
    selectedSetChenYuanDependencyEstablished: false,
    shaoWeihuaOrResearchCenterSpecificTargetDependencyEstablished: false,
    zhangZhichunTargetRuleAuthorshipEstablished: false,
    priorSameAuthorWorkDependencyEstablished: accepted,
    priorSameAuthorWorkId: accepted ? 'LI_SHUNXIANG_SIZHU_MINGLI_ZIXIU_JIAOCHENG_PUJIBAN_1998' : null,
    current2004WitnessDisposition: accepted
      ? 'PRIOR_SAME_AUTHOR_NORMATIVE_WITNESS_LOCATED_CURRENT_2004_WITNESS_NOT_ORIGINAL_ORIGIN_REBINDING_OR_REMEDIATION_REASSESSMENT_REQUIRED'
      : 'NOT_ASSESSED',
    current2004WitnessMayCountAsNewIndependentProvenanceWithoutReassessment: false,
    prior1998SameAuthorWitnessAutomaticallyEstablishesIndependenceFromSelectedSet: false,
    chronologyUsedAsIndependenceFinding: false,
    semanticSimilarityUsedAsDependencyFindingWithoutLineageEvidence: false,
    institutionalAssociationUsedAsSpecificDependencyFinding: false,
    editorCreditUsedAsTargetAuthorshipFinding: false,
    searchSilenceUsedAsNegativeFinding: false,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_SHUNXIANG_LINEAGE_EVIDENCE_ADEQUACY_AND_REMEDIATION_REASSESSMENT_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_SHUNXIANG_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE',
    notes: accepted
      ? [
          'The 2004 四柱玄机 target witness is not the earliest located Li witness: the same target chapter is attributed to Li own 1998 四柱命理学自修教程（普及班）.',
          'This establishes one prior-same-author-work derivative/retransmission relationship for the 2004 witness but does not establish independence of the 1998 normative origin from the selected-set Chen Yuan/Shao lineage.',
          'Chen Yuan selected-set dependency, Shao/research-center specific transmission, and Zhang Zhichun target-rule authorship remain unresolved after targeted discovery.',
          'No explicit negative derivative finding is created from search silence, and no independent normative provenance is established.',
          'I171 records lineage evidence only; no rebinding, remediation selection, package mutation, reevaluation, threshold, classification, or production authority is granted.',
        ]
      : ['I170 lineage-readiness boundary was not accepted exactly; no targeted lineage evidence is recorded.'],
  });
}
