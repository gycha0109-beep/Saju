import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I169_DISCOVERY_RECORD_IDS,
  type I169SecondWaveProvenanceCandidateDiscoveryEvidenceReport,
} from './i169-second-wave-provenance-candidate-discovery-evidence.js';

export const I170_SECOND_WAVE_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_READINESS_REVIEW_VERSION =
  'myeonghwa-source-ke-visible-stem-threshold-second-wave-candidate-evidence-adequacy-lineage-readiness-review-v1';

export const I170_LINEAGE_REQUIREMENT_IDS = Object.freeze([
  'EXACT_I169_DISCOVERY_RECORD_SET_REQUIRED',
  'ONLY_MINIMUM_ADEQUACY_REVIEW_CANDIDATE_MAY_ENTER_LINEAGE_ADJUDICATION',
  'INCOMPLETE_SECOND_WAVE_OBSERVATIONS_MUST_NOT_BE_PROMOTED',
  'SELECTED_SET_CHEN_YUAN_RELATIONSHIP_MUST_BE_CHECKED_EXPLICITLY',
  'SHAO_WEIHUA_RESEARCH_CENTER_LINEAGE_MUST_BE_CHECKED_EXPLICITLY',
  'ZHANG_ZHICHUN_EDITORIAL_ROLE_MUST_BE_DISTINGUISHED_FROM_TARGET_RULE_AUTHORSHIP',
  'OTHER_EARLIER_PREDECESSOR_ORIGIN_SEARCH_REQUIRED',
  'TRI_STATE_RELATIONSHIP_FINDINGS_REQUIRED',
  'CHRONOLOGY_IDENTITY_SOURCE_COUNT_AND_PROVENANCE_TIER_NOT_INDEPENDENCE_PROOFS',
  'READINESS_NOT_SELECTION_REMEDIATION_MUTATION_OR_REEVALUATION',
] as const);

export type I170LineageRequirementId = (typeof I170_LINEAGE_REQUIREMENT_IDS)[number];

export const I170_LINEAGE_QUESTION_IDS = Object.freeze([
  'LI_TARGET_RULE_TO_CHEN_YUAN_1995_SELECTED_SET_DEPENDENCY',
  'LI_TARGET_RULE_TO_SHAO_WEIHUA_OR_RESEARCH_CENTER_LINEAGE',
  'ZHANG_ZHICHUN_EDITORIAL_ROLE_IN_TARGET_RULE_AUTHORSHIP',
  'LI_TARGET_RULE_OTHER_EARLIER_SOURCE_ORIGIN',
] as const);

export type I170LineageQuestionId = (typeof I170_LINEAGE_QUESTION_IDS)[number];

export const I170_ALLOWED_LINEAGE_FINDINGS = Object.freeze([
  'DERIVATIVE_DEPENDENCY_FOUND',
  'NO_DERIVATIVE_DEPENDENCY_FOUND_WITH_EXPLICIT_BASIS',
  'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY',
] as const);

export type I170AllowedLineageFinding = (typeof I170_ALLOWED_LINEAGE_FINDINGS)[number];

export interface I170SecondWaveCandidateEvidenceAdequacyLineageReadinessReviewReport {
  reviewId: string;
  reviewVersion: string;
  status:
    | 'RESOLVED_SECOND_WAVE_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_READINESS_REVIEW'
    | 'I169_DISCOVERY_EVIDENCE_INVALID';
  decision:
    | 'LI_SHUNXIANG_ONLY_MINIMUM_ADEQUACY_CANDIDATE_READY_FOR_TARGETED_LINEAGE_ADJUDICATION_FOUR_QUESTIONS_FROZEN_THREE_INCOMPLETE_OBSERVATIONS_NOT_PROMOTED_NO_INDEPENDENCE_OR_SELECTION'
    | 'SECOND_WAVE_LINEAGE_ADJUDICATION_NOT_READY';
  upstreamI169EvidenceRecordSetId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI169BoundaryAccepted: boolean;
  discoveryObservationCount: 4 | 0;
  minimumAdequacyReviewCandidateCount: 1 | 0;
  lineageAdjudicationTargetRecordId: 'LI_SHUNXIANG_SIZHU_XUANJI_2004' | null;
  lineageAdjudicationTargetCount: 1 | 0;
  incompleteObservationRecordIds: readonly string[];
  incompleteObservationCount: 3 | 0;
  incompleteObservationsFrozenOutsideLineageAdjudication: boolean;
  lineageRequirementIds: readonly I170LineageRequirementId[];
  lineageRequirementCount: 10;
  lineageRequirementsFrozen: boolean;
  lineageQuestionIds: readonly I170LineageQuestionId[];
  lineageQuestionCount: 4;
  lineageQuestionsFrozenProspectively: boolean;
  allowedLineageFindings: readonly I170AllowedLineageFinding[];
  allowedLineageFindingCount: 3;
  selectedSetChenYuanMaterialSimilarityCreatesDependencyAutomatically: false;
  chronologyCreatesDependencyOrIndependenceAutomatically: false;
  shaoResearchCenterAssociationCreatesDependencyAutomatically: false;
  zhangZhichunEditorCreditCreatesTargetRuleAuthorshipAutomatically: false;
  semanticSimilarityCreatesDependencyAutomatically: false;
  searchSilenceCreatesNegativeFinding: false;
  explicitNegativeFindingAloneEstablishesIndependence: false;
  uniqueSourceIdentityAloneEstablishesIndependence: false;
  sourceCountVotingAllowed: false;
  provenanceTierWeightingAllowed: false;
  targetedLineageAdjudicationMethodologicallyJustified: boolean;
  targetedLineageAdjudicationAuthorized: boolean;
  actualTargetedLineageDiscoveryExecutedByThisGate: false;
  lineageFindingRecordedByThisGate: false;
  independentNormativeProvenanceEstablishedByThisGate: false;
  candidateSelectedByThisGate: false;
  remediationStrategySelectedByThisGate: false;
  remediationExecutionAuthorizedByThisGate: false;
  evidenceReboundByThisGate: false;
  candidateSetMutatedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_SHUNXIANG_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_SECOND_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE';
  notes: readonly string[];
}

function exactI169Accepted(i169: I169SecondWaveProvenanceCandidateDiscoveryEvidenceReport): boolean {
  const ids = i169.discoveryRecords.map((record) => record.recordId);
  const exactIds = ids.length === I169_DISCOVERY_RECORD_IDS.length && ids.every((id, index) => id === I169_DISCOVERY_RECORD_IDS[index]);
  const li = i169.discoveryRecords[0];
  const others = i169.discoveryRecords.slice(1);

  return (
    i169.status === 'RESOLVED_SECOND_WAVE_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE' &&
    i169.decision ===
      'SECOND_WAVE_DISCOVERY_EXECUTED_FOUR_NEW_PROVENANCE_OBSERVATIONS_ONE_MINIMUM_ADEQUACY_REVIEW_CANDIDATE_ZERO_INDEPENDENCE_ZERO_SELECTION_LINEAGE_AND_IDENTITY_GAPS_REMAIN' &&
    i169.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i169.policyVersion === 'v1-definition' &&
    i169.adoptionVersion === 'v1-adoption' &&
    i169.currentCandidateSetVersion === 'v1-candidate-set' &&
    i169.currentInputPackageVersion === 'v2-input-package' &&
    i169.exactI168BoundaryAccepted &&
    i169.discoveryExecuted &&
    exactIds &&
    i169.discoveryObservationCount === 4 &&
    i169.newNormativeProvenanceIdentityObservedCount === 4 &&
    i169.exactPrintEditionIdentityEstablishedCount === 1 &&
    i169.directBinaryExceptionLanguageObservedCount === 2 &&
    i169.minimumAdequacyReviewCandidateCount === 1 &&
    i169.lineageUnresolvedCount === 4 &&
    i169.derivativeDependencyFoundCount === 0 &&
    i169.explicitNegativeDerivativeFindingCount === 0 &&
    i169.independentNormativeProvenanceEstablishedCount === 0 &&
    li?.recordId === 'LI_SHUNXIANG_SIZHU_XUANJI_2004' &&
    li.qualifiesForLaterEvidenceAdequacyReview &&
    li.identityStatus === 'EXACT_PRINT_EDITION_IDENTITY_ESTABLISHED' &&
    li.targetRelevance === 'DIRECT_POSITIONAL_FORCE_AND_BINARY_EXCEPTION_RELEVANCE' &&
    li.lineageFinding === 'UNRESOLVED_AFTER_SECOND_WAVE_DISCOVERY' &&
    li.independentNormativeProvenanceEstablished === false &&
    others.length === 3 &&
    others.every((record) => record.qualifiesForLaterEvidenceAdequacyReview === false) &&
    others.every((record) => record.independentNormativeProvenanceEstablished === false) &&
    i169.searchSilenceUsedAsNegativeFinding === false &&
    i169.chronologyUsedAsIndependenceFinding === false &&
    i169.sourceIdentityUsedAsIndependenceFinding === false &&
    i169.sourceCountVotingAllowed === false &&
    i169.provenanceTierWeightingAllowed === false &&
    i169.candidateSelectedByThisGate === false &&
    i169.remediationStrategySelectedByThisGate === false &&
    i169.remediationExecutionAuthorizedByThisGate === false &&
    i169.evidenceReboundByThisGate === false &&
    i169.candidateSetMutatedByThisGate === false &&
    i169.newCandidateSetVersionCreatedByThisGate === false &&
    i169.newInputPackageVersionCreatedByThisGate === false &&
    i169.provenanceIndependenceAdjudicatedByThisGate === false &&
    i169.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i169.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i169.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i169.candidateSetReevaluationAuthorizedByThisGate === false &&
    i169.candidateSetReevaluationPerformedByThisGate === false &&
    i169.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i169.currentV2PackageAndCandidateSetRemainImmutable &&
    i169.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i169.productionPolicyExecutionAuthorized === false &&
    i169.actualCompositionPerformedByThisGate === false &&
    i169.multiSourceCompositionAuthorized === false &&
    i169.authorityAcquiredByThisGate === false &&
    i169.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i169.thresholdRuleCreatedByThisGate === false &&
    i169.damageEvaluationAuthorized === false &&
    i169.classificationAuthorized === false &&
    i169.numericScoringAuthorized === false &&
    i169.hiddenStemInteractionEligibilityGapRemains &&
    i169.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i169.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_SECOND_WAVE_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_ADJUDICATION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<I170SecondWaveCandidateEvidenceAdequacyLineageReadinessReviewReport, 'reviewId'>,
): I170SecondWaveCandidateEvidenceAdequacyLineageReadinessReviewReport {
  return {
    reviewId: `i170_second_wave_candidate_lineage_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI170SecondWaveCandidateEvidenceAdequacyLineageReadinessReview(
  i169: I169SecondWaveProvenanceCandidateDiscoveryEvidenceReport,
): I170SecondWaveCandidateEvidenceAdequacyLineageReadinessReviewReport {
  const accepted = exactI169Accepted(i169);

  return finalized({
    reviewVersion: I170_SECOND_WAVE_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_SECOND_WAVE_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_READINESS_REVIEW'
      : 'I169_DISCOVERY_EVIDENCE_INVALID',
    decision: accepted
      ? 'LI_SHUNXIANG_ONLY_MINIMUM_ADEQUACY_CANDIDATE_READY_FOR_TARGETED_LINEAGE_ADJUDICATION_FOUR_QUESTIONS_FROZEN_THREE_INCOMPLETE_OBSERVATIONS_NOT_PROMOTED_NO_INDEPENDENCE_OR_SELECTION'
      : 'SECOND_WAVE_LINEAGE_ADJUDICATION_NOT_READY',
    upstreamI169EvidenceRecordSetId: i169.evidenceRecordSetId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI169BoundaryAccepted: accepted,
    discoveryObservationCount: accepted ? 4 : 0,
    minimumAdequacyReviewCandidateCount: accepted ? 1 : 0,
    lineageAdjudicationTargetRecordId: accepted ? 'LI_SHUNXIANG_SIZHU_XUANJI_2004' : null,
    lineageAdjudicationTargetCount: accepted ? 1 : 0,
    incompleteObservationRecordIds: accepted ? I169_DISCOVERY_RECORD_IDS.slice(1) : Object.freeze([]),
    incompleteObservationCount: accepted ? 3 : 0,
    incompleteObservationsFrozenOutsideLineageAdjudication: accepted,
    lineageRequirementIds: I170_LINEAGE_REQUIREMENT_IDS,
    lineageRequirementCount: 10,
    lineageRequirementsFrozen: accepted,
    lineageQuestionIds: I170_LINEAGE_QUESTION_IDS,
    lineageQuestionCount: 4,
    lineageQuestionsFrozenProspectively: accepted,
    allowedLineageFindings: I170_ALLOWED_LINEAGE_FINDINGS,
    allowedLineageFindingCount: 3,
    selectedSetChenYuanMaterialSimilarityCreatesDependencyAutomatically: false,
    chronologyCreatesDependencyOrIndependenceAutomatically: false,
    shaoResearchCenterAssociationCreatesDependencyAutomatically: false,
    zhangZhichunEditorCreditCreatesTargetRuleAuthorshipAutomatically: false,
    semanticSimilarityCreatesDependencyAutomatically: false,
    searchSilenceCreatesNegativeFinding: false,
    explicitNegativeFindingAloneEstablishesIndependence: false,
    uniqueSourceIdentityAloneEstablishesIndependence: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
    targetedLineageAdjudicationMethodologicallyJustified: accepted,
    targetedLineageAdjudicationAuthorized: accepted,
    actualTargetedLineageDiscoveryExecutedByThisGate: false,
    lineageFindingRecordedByThisGate: false,
    independentNormativeProvenanceEstablishedByThisGate: false,
    candidateSelectedByThisGate: false,
    remediationStrategySelectedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
    evidenceReboundByThisGate: false,
    candidateSetMutatedByThisGate: false,
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
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_SHUNXIANG_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_SECOND_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE',
    notes: accepted
      ? [
          'Only the 李顺祥 四柱玄机 2004 record meets the I169 minimum identity-plus-direct-relevance threshold for targeted lineage adjudication.',
          '邵刚, 赵知易, and 陈炳地 remain discovery observations with explicit identity or scope gaps and are not promoted by I170.',
          'Four prospective lineage questions are frozen: Chen Yuan selected-set dependency, Shao Weihua/research-center lineage, Zhang Zhichun editorial-role authorship, and any other earlier predecessor origin.',
          'Material similarity, chronology, institutional association, editor credit, unique source identity, search silence, source counts, and provenance tiers do not determine independence automatically.',
          'I170 authorizes research-only targeted lineage adjudication; it does not execute discovery, record a lineage finding, select remediation, mutate packages, or authorize reevaluation/production semantics.',
        ]
      : ['I169 discovery evidence was not accepted exactly; targeted lineage adjudication remains unauthorized.'],
  });
}
