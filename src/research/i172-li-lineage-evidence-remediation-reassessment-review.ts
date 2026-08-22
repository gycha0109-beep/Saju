import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I171LiShunxiangTargetedLineageEvidenceReport } from './i171-li-shunxiang-targeted-lineage-evidence.js';

export const I172_LI_LINEAGE_EVIDENCE_REMEDIATION_REASSESSMENT_REVIEW_VERSION =
  'myeonghwa-li-lineage-evidence-adequacy-remediation-reassessment-review-v1';

export const I172_REASSESSMENT_REQUIREMENT_IDS = Object.freeze([
  'EXACT_I171_ONE_DERIVATIVE_THREE_UNRESOLVED_BOUNDARY_REQUIRED',
  'CURRENT_2004_WITNESS_MUST_NOT_REMAIN_PRESUMED_NORMATIVE_ORIGIN',
  'PRIOR_1998_SAME_AUTHOR_WITNESS_MUST_NOT_BE_TREATED_AS_NEW_INDEPENDENT_PROVENANCE',
  'PRIOR_1998_WITNESS_EXACT_IDENTITY_MUST_BE_ESTABLISHED_BEFORE_ANY_REBINDING',
  'CHEN_YUAN_SELECTED_SET_LINEAGE_REMAINS_UNRESOLVED',
  'SHAO_WEIHUA_RESEARCH_CENTER_LINEAGE_REMAINS_UNRESOLVED',
  'ZHANG_ZHICHUN_TARGET_RULE_AUTHORSHIP_REMAINS_UNRESOLVED',
  'REBINDING_READINESS_MUST_BE_SEPARATE_FROM_REBINDING_EXECUTION',
  'ANY_FUTURE_REBINDING_REQUIRES_PROSPECTIVE_NEW_CANDIDATE_SET_AND_PACKAGE_GOVERNANCE',
  'NO_INDEPENDENCE_SELECTION_MUTATION_OR_REEVALUATION_FROM_THIS_REASSESSMENT',
] as const);

export type I172ReassessmentRequirementId = (typeof I172_REASSESSMENT_REQUIREMENT_IDS)[number];

export const I172_PRIOR_WITNESS_IDENTITY_REQUIREMENT_IDS = Object.freeze([
  'PRIOR_WORK_AUTHOR_AND_TITLE_IDENTITY',
  'PRIOR_WORK_FIRST_APPEARANCE_OR_PUBLICATION_DATE_BASIS',
  'PRIOR_WORK_PUBLICATION_MEDIUM_OR_ENTITY_IDENTITY',
  'TARGET_CHAPTER_OR_PASSAGE_WITNESS_INTEGRITY',
  'TARGET_PASSAGE_MATCH_TO_2004_WITNESS',
  'SAME_AUTHOR_DERIVATIVE_CHAIN_BINDING',
  'EXTERNAL_LINEAGE_UNRESOLVED_STATUS_PRESERVATION',
  'NO_INDEPENDENCE_INFERENCE_FROM_EARLIER_DATE_OR_SAME_AUTHORSHIP',
] as const);

export type I172PriorWitnessIdentityRequirementId =
  (typeof I172_PRIOR_WITNESS_IDENTITY_REQUIREMENT_IDS)[number];

export interface I172LiLineageEvidenceRemediationReassessmentReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_LI_LINEAGE_EVIDENCE_REMEDIATION_REASSESSMENT_REVIEW'
    | 'I171_LINEAGE_EVIDENCE_INVALID';
  decision:
    | 'I171_LINEAGE_EVIDENCE_ADEQUATE_TO_RETIRE_2004_AS_PRESUMED_ORIGIN_PRIOR_1998_WITNESS_IDENTITY_ACQUISITION_READINESS_MAY_PROCEED_NO_REBINDING_NO_INDEPENDENCE_THREE_EXTERNAL_LINEAGE_QUESTIONS_REMAIN_UNRESOLVED'
    | 'LI_REMEDIATION_REASSESSMENT_NOT_READY';
  upstreamI171EvidenceRecordSetId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI171BoundaryAccepted: boolean;
  I171EvidenceAdequateToRecordPriorSameAuthorDependency: boolean;
  I171EvidenceAdequateToEstablishIndependentNormativeProvenance: false;
  derivativeDependencyFoundCount: 1 | 0;
  unresolvedExternalLineageQuestionCount: 3 | 0;
  explicitNegativeDerivativeFindingCount: 0;
  independentNormativeProvenanceEstablishedCount: 0;
  current2004WitnessRecordId: 'LI_SHUNXIANG_SIZHU_XUANJI_2004' | null;
  current2004WitnessPresumedNormativeOriginStatus:
    | 'RETIRED_AS_PRESUMED_ORIGIN_PRIOR_SAME_AUTHOR_WITNESS_LOCATED'
    | 'NOT_ASSESSED';
  current2004WitnessMayRemainNewProvenanceCandidateWithoutReassessment: false;
  prior1998WitnessId: 'LI_SHUNXIANG_SIZHU_MINGLI_ZIXIU_JIAOCHENG_PUJIBAN_1998' | null;
  prior1998WitnessStatus:
    | 'PRIOR_SAME_AUTHOR_WITNESS_IDENTITY_ACQUISITION_REQUIRED_BEFORE_REBINDING'
    | 'NOT_ASSESSED';
  prior1998WitnessIsNewIndependentProvenanceIdentity: false;
  prior1998WitnessIndependenceFromChenShaoLineageEstablished: false;
  ChenYuanSelectedSetDependencyRemainsUnresolved: boolean;
  ShaoResearchCenterSpecificDependencyRemainsUnresolved: boolean;
  ZhangZhichunTargetRuleAuthorshipRemainsUnresolved: boolean;
  reassessmentRequirementIds: readonly I172ReassessmentRequirementId[];
  reassessmentRequirementCount: 10;
  reassessmentRequirementsFrozen: boolean;
  priorWitnessIdentityRequirementIds: readonly I172PriorWitnessIdentityRequirementId[];
  priorWitnessIdentityRequirementCount: 8;
  priorWitnessIdentityRequirementsFrozenProspectively: boolean;
  priorWitnessIdentityAcquisitionReadinessReviewMethodologicallyJustified: boolean;
  priorWitnessIdentityAcquisitionReadinessReviewAuthorized: boolean;
  authorizationIsIdentityAcquisition: false;
  authorizationIsEvidenceRebinding: false;
  authorizationIsCandidateReplacement: false;
  authorizationIsCandidateSelection: false;
  authorizationIsRemediationExecution: false;
  currentNewProvenanceAcquisitionVia2004WitnessDisposition:
    | 'NOT_SUCCESSFUL_AS_NEW_ORIGIN_PRIOR_SAME_AUTHOR_WITNESS_LOCATED'
    | 'NOT_ASSESSED';
  evidenceRebindingPathNowMethodologicallyRelevant: boolean;
  evidenceRebindingSelectedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  candidateSelectedByThisGate: false;
  remediationStrategySelectedByThisGate: false;
  remediationExecutionAuthorizedByThisGate: false;
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
  chronologyAloneEstablishesPriorWitnessIdentityOrIndependence: false;
  sameAuthorIdentityAloneEstablishesIndependence: false;
  searchSilenceCreatesNegativeFinding: false;
  sourceCountVotingAllowed: false;
  provenanceTierWeightingAllowed: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_SHUNXIANG_LINEAGE_EVIDENCE_ADEQUACY_AND_REMEDIATION_REASSESSMENT_REVIEW';
  notes: readonly string[];
}

function exactI171Accepted(i171: I171LiShunxiangTargetedLineageEvidenceReport): boolean {
  const exactQuestionOrder = [
    'LI_TARGET_RULE_TO_CHEN_YUAN_1995_SELECTED_SET_DEPENDENCY',
    'LI_TARGET_RULE_TO_SHAO_WEIHUA_OR_RESEARCH_CENTER_LINEAGE',
    'ZHANG_ZHICHUN_EDITORIAL_ROLE_IN_TARGET_RULE_AUTHORSHIP',
    'LI_TARGET_RULE_OTHER_EARLIER_SOURCE_ORIGIN',
  ];
  const exactFindings = [
    'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY',
    'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY',
    'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY',
    'DERIVATIVE_DEPENDENCY_FOUND',
  ];

  return (
    i171.status === 'RESOLVED_LI_SHUNXIANG_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE' &&
    i171.decision ===
      'LI_SHUNXIANG_TARGETED_LINEAGE_DISCOVERY_EXECUTED_ONE_PRIOR_SAME_AUTHOR_DERIVATIVE_DEPENDENCY_FOUND_THREE_LINEAGE_QUESTIONS_UNRESOLVED_ZERO_EXPLICIT_NEGATIVE_ZERO_INDEPENDENCE_CURRENT_2004_WITNESS_REQUIRES_REASSESSMENT_BEFORE_REMEDIATION' &&
    i171.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i171.policyVersion === 'v1-definition' &&
    i171.adoptionVersion === 'v1-adoption' &&
    i171.currentCandidateSetVersion === 'v1-candidate-set' &&
    i171.currentInputPackageVersion === 'v2-input-package' &&
    i171.exactI170BoundaryAccepted &&
    i171.lineageTargetRecordId === 'LI_SHUNXIANG_SIZHU_XUANJI_2004' &&
    i171.targetedLineageDiscoveryExecuted &&
    i171.lineageEvidenceRecords.length === 4 &&
    i171.lineageEvidenceRecords.every((record, index) => record.questionId === exactQuestionOrder[index]) &&
    i171.lineageEvidenceRecords.every((record, index) => record.finding === exactFindings[index]) &&
    i171.lineageEvidenceRecordCount === 4 &&
    i171.derivativeDependencyFoundCount === 1 &&
    i171.unresolvedAfterTargetedLineageDiscoveryCount === 3 &&
    i171.explicitNegativeDerivativeFindingCount === 0 &&
    i171.independentNormativeProvenanceEstablishedCount === 0 &&
    i171.selectedSetChenYuanDependencyEstablished === false &&
    i171.shaoWeihuaOrResearchCenterSpecificTargetDependencyEstablished === false &&
    i171.zhangZhichunTargetRuleAuthorshipEstablished === false &&
    i171.priorSameAuthorWorkDependencyEstablished &&
    i171.priorSameAuthorWorkId === 'LI_SHUNXIANG_SIZHU_MINGLI_ZIXIU_JIAOCHENG_PUJIBAN_1998' &&
    i171.current2004WitnessDisposition ===
      'PRIOR_SAME_AUTHOR_NORMATIVE_WITNESS_LOCATED_CURRENT_2004_WITNESS_NOT_ORIGINAL_ORIGIN_REBINDING_OR_REMEDIATION_REASSESSMENT_REQUIRED' &&
    i171.current2004WitnessMayCountAsNewIndependentProvenanceWithoutReassessment === false &&
    i171.prior1998SameAuthorWitnessAutomaticallyEstablishesIndependenceFromSelectedSet === false &&
    i171.chronologyUsedAsIndependenceFinding === false &&
    i171.semanticSimilarityUsedAsDependencyFindingWithoutLineageEvidence === false &&
    i171.institutionalAssociationUsedAsSpecificDependencyFinding === false &&
    i171.editorCreditUsedAsTargetAuthorshipFinding === false &&
    i171.searchSilenceUsedAsNegativeFinding === false &&
    i171.sourceCountVotingAllowed === false &&
    i171.provenanceTierWeightingAllowed === false &&
    i171.candidateSelectedByThisGate === false &&
    i171.remediationStrategySelectedByThisGate === false &&
    i171.remediationExecutionAuthorizedByThisGate === false &&
    i171.evidenceReboundByThisGate === false &&
    i171.candidateSetMutatedByThisGate === false &&
    i171.newCandidateSetVersionCreatedByThisGate === false &&
    i171.newInputPackageVersionCreatedByThisGate === false &&
    i171.provenanceIndependenceAdjudicatedByThisGate === false &&
    i171.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i171.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i171.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i171.candidateSetReevaluationAuthorizedByThisGate === false &&
    i171.candidateSetReevaluationPerformedByThisGate === false &&
    i171.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i171.currentV2PackageAndCandidateSetRemainImmutable &&
    i171.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i171.productionPolicyExecutionAuthorized === false &&
    i171.actualCompositionPerformedByThisGate === false &&
    i171.multiSourceCompositionAuthorized === false &&
    i171.authorityAcquiredByThisGate === false &&
    i171.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i171.thresholdRuleCreatedByThisGate === false &&
    i171.damageEvaluationAuthorized === false &&
    i171.classificationAuthorized === false &&
    i171.numericScoringAuthorized === false &&
    i171.hiddenStemInteractionEligibilityGapRemains &&
    i171.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i171.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_SHUNXIANG_LINEAGE_EVIDENCE_ADEQUACY_AND_REMEDIATION_REASSESSMENT_REVIEW'
  );
}

function finalized(
  material: Omit<I172LiLineageEvidenceRemediationReassessmentReviewReport, 'reviewId'>,
): I172LiLineageEvidenceRemediationReassessmentReviewReport {
  return {
    reviewId: `i172_li_lineage_remediation_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI172LiLineageEvidenceRemediationReassessmentReview(
  i171: I171LiShunxiangTargetedLineageEvidenceReport,
): I172LiLineageEvidenceRemediationReassessmentReviewReport {
  const accepted = exactI171Accepted(i171);

  return finalized({
    reviewVersion: I172_LI_LINEAGE_EVIDENCE_REMEDIATION_REASSESSMENT_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_LI_LINEAGE_EVIDENCE_REMEDIATION_REASSESSMENT_REVIEW'
      : 'I171_LINEAGE_EVIDENCE_INVALID',
    decision: accepted
      ? 'I171_LINEAGE_EVIDENCE_ADEQUATE_TO_RETIRE_2004_AS_PRESUMED_ORIGIN_PRIOR_1998_WITNESS_IDENTITY_ACQUISITION_READINESS_MAY_PROCEED_NO_REBINDING_NO_INDEPENDENCE_THREE_EXTERNAL_LINEAGE_QUESTIONS_REMAIN_UNRESOLVED'
      : 'LI_REMEDIATION_REASSESSMENT_NOT_READY',
    upstreamI171EvidenceRecordSetId: i171.evidenceRecordSetId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI171BoundaryAccepted: accepted,
    I171EvidenceAdequateToRecordPriorSameAuthorDependency: accepted,
    I171EvidenceAdequateToEstablishIndependentNormativeProvenance: false,
    derivativeDependencyFoundCount: accepted ? 1 : 0,
    unresolvedExternalLineageQuestionCount: accepted ? 3 : 0,
    explicitNegativeDerivativeFindingCount: 0,
    independentNormativeProvenanceEstablishedCount: 0,
    current2004WitnessRecordId: accepted ? 'LI_SHUNXIANG_SIZHU_XUANJI_2004' : null,
    current2004WitnessPresumedNormativeOriginStatus: accepted
      ? 'RETIRED_AS_PRESUMED_ORIGIN_PRIOR_SAME_AUTHOR_WITNESS_LOCATED'
      : 'NOT_ASSESSED',
    current2004WitnessMayRemainNewProvenanceCandidateWithoutReassessment: false,
    prior1998WitnessId: accepted ? 'LI_SHUNXIANG_SIZHU_MINGLI_ZIXIU_JIAOCHENG_PUJIBAN_1998' : null,
    prior1998WitnessStatus: accepted
      ? 'PRIOR_SAME_AUTHOR_WITNESS_IDENTITY_ACQUISITION_REQUIRED_BEFORE_REBINDING'
      : 'NOT_ASSESSED',
    prior1998WitnessIsNewIndependentProvenanceIdentity: false,
    prior1998WitnessIndependenceFromChenShaoLineageEstablished: false,
    ChenYuanSelectedSetDependencyRemainsUnresolved: accepted,
    ShaoResearchCenterSpecificDependencyRemainsUnresolved: accepted,
    ZhangZhichunTargetRuleAuthorshipRemainsUnresolved: accepted,
    reassessmentRequirementIds: I172_REASSESSMENT_REQUIREMENT_IDS,
    reassessmentRequirementCount: 10,
    reassessmentRequirementsFrozen: accepted,
    priorWitnessIdentityRequirementIds: I172_PRIOR_WITNESS_IDENTITY_REQUIREMENT_IDS,
    priorWitnessIdentityRequirementCount: 8,
    priorWitnessIdentityRequirementsFrozenProspectively: accepted,
    priorWitnessIdentityAcquisitionReadinessReviewMethodologicallyJustified: accepted,
    priorWitnessIdentityAcquisitionReadinessReviewAuthorized: accepted,
    authorizationIsIdentityAcquisition: false,
    authorizationIsEvidenceRebinding: false,
    authorizationIsCandidateReplacement: false,
    authorizationIsCandidateSelection: false,
    authorizationIsRemediationExecution: false,
    currentNewProvenanceAcquisitionVia2004WitnessDisposition: accepted
      ? 'NOT_SUCCESSFUL_AS_NEW_ORIGIN_PRIOR_SAME_AUTHOR_WITNESS_LOCATED'
      : 'NOT_ASSESSED',
    evidenceRebindingPathNowMethodologicallyRelevant: accepted,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    candidateSelectedByThisGate: false,
    remediationStrategySelectedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
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
    chronologyAloneEstablishesPriorWitnessIdentityOrIndependence: false,
    sameAuthorIdentityAloneEstablishesIndependence: false,
    searchSilenceCreatesNegativeFinding: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_READINESS_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_SHUNXIANG_LINEAGE_EVIDENCE_ADEQUACY_AND_REMEDIATION_REASSESSMENT_REVIEW',
    notes: accepted
      ? [
          'I171 is adequate to retire the 2004 四柱玄机 witness as the presumed Li normative origin because a prior same-author 1998 witness has been located.',
          'The 1998 witness is the same provenance identity, not a new independent source, and its exact publication/witness identity must be established before any governed rebinding can be considered.',
          'Chen Yuan selected-set dependency, Shao/research-center specific transmission, and Zhang Zhichun target-rule authorship remain unresolved and are preserved unchanged.',
          'Evidence rebinding is now methodologically relevant but is neither selected nor executed by I172.',
          'The current v2 candidate set/package remains blocked and immutable; no independence, package creation, reevaluation, threshold, classification, numeric, or production authority is granted.',
        ]
      : ['I171 lineage evidence was not accepted exactly; remediation reassessment remains fail-closed.'],
  });
}
