import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I165_LINEAGE_ADJUDICATION_REQUIREMENT_IDS,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateEvidenceAdequacyLineageAdjudicationReadinessReviewReport,
  type I165LineageAdjudicationRequirementId,
  type I165LineageQuestionId,
} from './i165-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-provenance-independence-remediation-candidate-evidence-adequacy-lineage-adjudication-readiness-review.js';

export const I166_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-provenance-independence-remediation-candidate-targeted-lineage-adjudication-evidence-v1';

export type I166LineageFinding =
  | 'DERIVATIVE_DEPENDENCY_FOUND'
  | 'NO_DERIVATIVE_DEPENDENCY_FOUND_WITH_EXPLICIT_BASIS'
  | 'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY';

export interface I166LineageEvidenceRecord {
  questionId: I165LineageQuestionId;
  candidateLabel: string;
  finding: I166LineageFinding;
  exactClaimBinding: string;
  chronologyEvidence: string;
  internalAttributionOrOriginStatementEvidence: string;
  relationshipEvidence: string;
  textualOverlapDirectionalityEvidence: string;
  duplicateNormalizationEvidence: string;
  boundedSearchBasis: readonly string[];
  sourceLocators: readonly string[];
  requirementIdsApplied: readonly I165LineageAdjudicationRequirementId[];
  chronologyAloneUsedAsDependencyProof: false;
  authorshipAloneUsedAsIndependenceProof: false;
  schoolLabelAloneUsedAsDependencyProof: false;
  doctrineSimilarityAloneUsedAsDependencyProof: false;
  searchSilenceUsedAsNegativeFinding: false;
  selfOriginClaimTreatedAsIndependentCorroboration: false;
  relationshipAdjudicated: true;
  independenceEstablished: false;
  numericWeight: null;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageAdjudicationEvidenceReport {
  evidenceRecordSetId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE'
    | 'I165_LINEAGE_ADJUDICATION_READINESS_INVALID';
  decision:
    | 'TARGETED_LINEAGE_DISCOVERY_EXECUTED_TWO_RELATIONSHIP_QUESTIONS_BOTH_UNRESOLVED_ZERO_DERIVATIVE_ZERO_EXPLICIT_NEGATIVE_ZERO_INDEPENDENCE'
    | 'TARGETED_LINEAGE_DISCOVERY_NOT_EXECUTED';
  upstreamI165ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI165BoundaryAccepted: boolean;
  requirementIdsApplied: readonly I165LineageAdjudicationRequirementId[];
  requirementCount: 10;
  lineageEvidenceRecords: readonly I166LineageEvidenceRecord[];
  lineageEvidenceRecordCount: 2 | 0;
  unresolvedAfterTargetedLineageDiscoveryCount: 2 | 0;
  derivativeDependencyFoundCount: 0;
  explicitNegativeDerivativeFindingCount: 0;
  independentNormativeProvenanceEstablishedCount: 0;
  liHanchenSelfOriginStatementLocated: boolean;
  liHanchenSelfOriginStatementCorroboratedIndependently: false;
  liHanchenExactEarlierSourceForGeBuZuoyongLocated: false;
  liHanchenOriginFinding: 'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY' | 'NOT_RESEARCHED';
  sunHaiyiMultipleTeachersAndCollectionStatementLocated: boolean;
  sunHaiyiSpecificLiHanchenAttributionLocated: false;
  sunHaiyiSpecificDirectionalTextualDependencyEstablished: false;
  sunHaiyiToLiHanchenFinding: 'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY' | 'NOT_RESEARCHED';
  secondaryNewSchoolClassificationLocated: boolean;
  secondarySchoolClassificationInsufficientForSpecificDependency: boolean;
  targetedLineageEvidenceAcquisitionExecutedByThisGate: boolean;
  relationshipFindingsRecordedByThisGate: boolean;
  provenanceIndependenceAdjudicatedByThisGate: false;
  independentNormativeProvenanceEstablishedByThisGate: false;
  remediationStrategySelectedByThisGate: false;
  remediationExecutionAuthorizedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  candidateSetMutatedByThisGate: false;
  candidateRemovedByThisGate: false;
  candidateReplacedByThisGate: false;
  evidenceReboundByThisGate: false;
  newCandidateSetVersionCreatedByThisGate: false;
  newInputPackageVersionCreatedByThisGate: false;
  I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  candidateSetReevaluationPerformedByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
  sourceCountVotingAllowed: false;
  provenanceTierWeightingAllowed: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_TARGETED_LINEAGE_EVIDENCE_ADEQUACY_AND_REMEDIATION_PATH_REASSESSMENT_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_EVIDENCE_ADEQUACY_AND_LINEAGE_ADJUDICATION_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI165Accepted(
  i165: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateEvidenceAdequacyLineageAdjudicationReadinessReviewReport,
): boolean {
  const exactRequirements =
    i165.requirementIds.length === I165_LINEAGE_ADJUDICATION_REQUIREMENT_IDS.length &&
    i165.requirementIds.every(
      (requirementId, index) => requirementId === I165_LINEAGE_ADJUDICATION_REQUIREMENT_IDS[index],
    );
  const exactQuestions =
    i165.lineageTargets.length === 2 &&
    i165.lineageTargets[0]?.questionId === 'LI_HANCHEN_GE_BU_ZUOYONG_EXACT_UPSTREAM_ORIGIN' &&
    i165.lineageTargets[1]?.questionId === 'SUN_HAIYI_TO_LI_HANCHEN_SPECIFIC_DEPENDENCY';

  return (
    i165.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_EVIDENCE_ADEQUACY_LINEAGE_ADJUDICATION_READINESS_REVIEW' &&
    i165.decision ===
      'I164_EVIDENCE_ADEQUATE_FOR_TARGETED_LINEAGE_ADJUDICATION_READINESS_TWO_RELATIONSHIP_QUESTIONS_FROZEN_NO_INDEPENDENCE_ADJUDICATION' &&
    i165.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i165.policyVersion === 'v1-definition' &&
    i165.adoptionVersion === 'v1-adoption' &&
    i165.currentCandidateSetVersion === 'v1-candidate-set' &&
    i165.currentInputPackageVersion === 'v2-input-package' &&
    i165.exactI164BoundaryAccepted &&
    i165.i164EvidenceAdequateForCandidateDiscoveryRecord &&
    i165.i164EvidenceAdequateToEstablishIndependenceWithoutFurtherEvidence === false &&
    i165.candidateEvidenceRecordCount === 2 &&
    i165.liHanchenNewCandidateIdentityAndScopeEvidenceAdequate &&
    i165.liHanchenUpstreamOriginStillUnresolved &&
    i165.sunHaiyiIdentityScopeAndContextEvidenceAdequate &&
    i165.sunHaiyiSpecificDependencyStillUnresolved &&
    i165.schoolLineageSignalAloneInsufficientForDependencyFinding &&
    i165.chronologyAloneInsufficientForDependencyFinding &&
    i165.doctrineSimilarityAloneInsufficientForDependencyFinding &&
    exactRequirements &&
    i165.requirementCount === 10 &&
    i165.requirementsFrozen &&
    exactQuestions &&
    i165.lineageTargetCount === 2 &&
    i165.targetedLineageEvidenceAcquisitionAuthorizedByThisGate &&
    i165.targetedLineageEvidenceAcquisitionExecutedByThisGate === false &&
    i165.relationshipFindingMadeByThisGate === false &&
    i165.provenanceIndependenceAdjudicatedByThisGate === false &&
    i165.independentNormativeProvenanceEstablishedByThisGate === false &&
    i165.remediationStrategySelectedByThisGate === false &&
    i165.remediationExecutionAuthorizedByThisGate === false &&
    i165.currentV2PackageAndCandidateSetRemainImmutable &&
    i165.candidateSetMutatedByThisGate === false &&
    i165.evidenceReboundByThisGate === false &&
    i165.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i165.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i165.candidateSetReevaluationAuthorizedByThisGate === false &&
    i165.candidateSetReevaluationPerformedByThisGate === false &&
    i165.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i165.sourceCountVotingAllowed === false &&
    i165.provenanceTierWeightingAllowed === false &&
    i165.productionPolicyExecutionAuthorized === false &&
    i165.actualCompositionPerformedByThisGate === false &&
    i165.multiSourceCompositionAuthorized === false &&
    i165.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i165.thresholdRuleCreatedByThisGate === false &&
    i165.classificationAuthorized === false &&
    i165.numericScoringAuthorized === false &&
    i165.hiddenStemInteractionEligibilityGapRemains &&
    i165.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE'
  );
}

function evidenceRecords(): readonly I166LineageEvidenceRecord[] {
  return Object.freeze([
    Object.freeze({
      questionId: 'LI_HANCHEN_GE_BU_ZUOYONG_EXACT_UPSTREAM_ORIGIN' as const,
      candidateLabel: '李涵辰《八字预测真踪》— visible-stem 隔不作用 rule',
      finding: 'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY' as const,
      exactClaimBinding:
        'The inspected work and reproductions bind the target to a positional heavenly-stem rule in which specified separated stem pairs are described as not directly acting.',
      chronologyEvidence:
        'The inspected edition reports a 1996–1997 predecessor manuscript and a spring-1999 八字预测真踪 edition. No dated pre-1997 source with the exact governed binary topology was established in the bounded search.',
      internalAttributionOrOriginStatementEvidence:
        'The author says the book inherits the traditional 八字 framework while combining techniques he says he personally discovered and verified, and says he learned 八字 through self-study. This is a self-origin statement, not independent corroboration of the exact rule origin.',
      relationshipEvidence:
        'No exact teacher, source work, course material, or other named predecessor was located for the governed 隔不作用 claim. Later secondary sources attribute the doctrine to 李涵辰, but those retrospective attributions do not independently establish original provenance.',
      textualOverlapDirectionalityEvidence:
        'Later reproductions repeat the Li positional formulation. Those downstream witnesses confirm transmission from the Li corpus but do not establish whether an earlier source supplied the rule.',
      duplicateNormalizationEvidence:
        'Multiple later copies of 八字预测真踪 / 涵辰派 rules are normalized as retransmissions of the same Li corpus and are not counted as independent authorities.',
      boundedSearchBasis: Object.freeze([
        '李涵辰 隔不作用 师承',
        '李涵辰 隔不作用 1998 1997',
        '八字预测真踪 师承 李涵辰',
        '李涵辰 隔不作用 邵伟华',
        '年干与日干 不作用 八字',
        '月干与时干 不作用 八字',
      ]),
      sourceLocators: Object.freeze([
        'https://www.scribd.com/document/938380284/',
        'https://www.scribd.com/document/788145664/',
        'https://www.shusquare.com/groups/%E5%85%AB%E5%AD%97%E7%B8%B1%E6%A9%AB/forum/discussion/topic-60597/',
        'https://www.suanzhun.net/article/2753.html',
      ]),
      requirementIdsApplied: I165_LINEAGE_ADJUDICATION_REQUIREMENT_IDS,
      chronologyAloneUsedAsDependencyProof: false as const,
      authorshipAloneUsedAsIndependenceProof: false as const,
      schoolLabelAloneUsedAsDependencyProof: false as const,
      doctrineSimilarityAloneUsedAsDependencyProof: false as const,
      searchSilenceUsedAsNegativeFinding: false as const,
      selfOriginClaimTreatedAsIndependentCorroboration: false as const,
      relationshipAdjudicated: true as const,
      independenceEstablished: false as const,
      numericWeight: null,
    }),
    Object.freeze({
      questionId: 'SUN_HAIYI_TO_LI_HANCHEN_SPECIFIC_DEPENDENCY' as const,
      candidateLabel: '孙海义《命理过三关》— 隔干/遥隔 non-interaction rule vs 李涵辰 lineage',
      finding: 'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY' as const,
      exactClaimBinding:
        'The inspected Sun witness binds the target to its 天干作用规则 passage: separated and remote 生克耗泄 are treated as non-acting for 旺衰 analysis, with later contextual qualifications.',
      chronologyEvidence:
        'The Sun author preface is dated 2004, later than the Li work chronology. This establishes ordering only and is not treated as proof of transmission.',
      internalAttributionOrOriginStatementEvidence:
        'Sun says he visited multiple recognized teachers, folk practitioners, and blind masters, collected and organized material, and devoted his accumulated learning to the book. The preface does not name 李涵辰 as the source of the target rule.',
      relationshipEvidence:
        'Secondary school histories group 孙海义 among representatives of the 李涵辰-associated 新派. No direct Sun statement, citation, teacher-student record, or named transmission source linking the specific governed rule to Li was established in the bounded search.',
      textualOverlapDirectionalityEvidence:
        'The Li and Sun rules materially overlap in the core separated/non-direct interaction doctrine, but the current evidence does not establish directional copying or a common exact source for the target passage.',
      duplicateNormalizationEvidence:
        'Later copies and catalog entries for 命理过三关 are normalized as same-work witnesses; school-history repetitions are not counted as independent lineage evidence.',
      boundedSearchBasis: Object.freeze([
        '孙海义 李涵辰 命理过三关',
        '孙海义 李涵辰 新派 命理',
        '孙海义 涵辰 八字',
        '命理过三关 新派 李涵辰',
        '命理过三关 隔不作用 李涵辰',
        '命理过三关 师承',
      ]),
      sourceLocators: Object.freeze([
        'https://xinyibooks.net/goods-357.html',
        'https://blog.sina.com.cn/s/blog_9b6237b80101kl7d.html',
        'https://bbs.6yao.com/thread-82323-1-1.html',
      ]),
      requirementIdsApplied: I165_LINEAGE_ADJUDICATION_REQUIREMENT_IDS,
      chronologyAloneUsedAsDependencyProof: false as const,
      authorshipAloneUsedAsIndependenceProof: false as const,
      schoolLabelAloneUsedAsDependencyProof: false as const,
      doctrineSimilarityAloneUsedAsDependencyProof: false as const,
      searchSilenceUsedAsNegativeFinding: false as const,
      selfOriginClaimTreatedAsIndependentCorroboration: false as const,
      relationshipAdjudicated: true as const,
      independenceEstablished: false as const,
      numericWeight: null,
    }),
  ]);
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageAdjudicationEvidenceReport, 'evidenceRecordSetId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageAdjudicationEvidenceReport {
  return {
    evidenceRecordSetId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_provenance_remediation_lineage_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI166ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageAdjudicationEvidence(
  i165: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateEvidenceAdequacyLineageAdjudicationReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateTargetedLineageAdjudicationEvidenceReport {
  const accepted = exactI165Accepted(i165);
  const records = accepted ? evidenceRecords() : Object.freeze([]);

  return finalized({
    evidenceVersion:
      I166_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_TARGETED_LINEAGE_ADJUDICATION_EVIDENCE'
      : 'I165_LINEAGE_ADJUDICATION_READINESS_INVALID',
    decision: accepted
      ? 'TARGETED_LINEAGE_DISCOVERY_EXECUTED_TWO_RELATIONSHIP_QUESTIONS_BOTH_UNRESOLVED_ZERO_DERIVATIVE_ZERO_EXPLICIT_NEGATIVE_ZERO_INDEPENDENCE'
      : 'TARGETED_LINEAGE_DISCOVERY_NOT_EXECUTED',
    upstreamI165ReviewId: i165.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI165BoundaryAccepted: accepted,
    requirementIdsApplied: I165_LINEAGE_ADJUDICATION_REQUIREMENT_IDS,
    requirementCount: 10,
    lineageEvidenceRecords: records,
    lineageEvidenceRecordCount: accepted ? 2 : 0,
    unresolvedAfterTargetedLineageDiscoveryCount: accepted ? 2 : 0,
    derivativeDependencyFoundCount: 0,
    explicitNegativeDerivativeFindingCount: 0,
    independentNormativeProvenanceEstablishedCount: 0,
    liHanchenSelfOriginStatementLocated: accepted,
    liHanchenSelfOriginStatementCorroboratedIndependently: false,
    liHanchenExactEarlierSourceForGeBuZuoyongLocated: false,
    liHanchenOriginFinding: accepted
      ? 'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY'
      : 'NOT_RESEARCHED',
    sunHaiyiMultipleTeachersAndCollectionStatementLocated: accepted,
    sunHaiyiSpecificLiHanchenAttributionLocated: false,
    sunHaiyiSpecificDirectionalTextualDependencyEstablished: false,
    sunHaiyiToLiHanchenFinding: accepted
      ? 'UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY'
      : 'NOT_RESEARCHED',
    secondaryNewSchoolClassificationLocated: accepted,
    secondarySchoolClassificationInsufficientForSpecificDependency: accepted,
    targetedLineageEvidenceAcquisitionExecutedByThisGate: accepted,
    relationshipFindingsRecordedByThisGate: accepted,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedByThisGate: false,
    remediationStrategySelectedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    candidateSetMutatedByThisGate: false,
    candidateRemovedByThisGate: false,
    candidateReplacedByThisGate: false,
    evidenceReboundByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetReevaluationPerformedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
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
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    recommendedNextGate: accepted
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_TARGETED_LINEAGE_EVIDENCE_ADEQUACY_AND_REMEDIATION_PATH_REASSESSMENT_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_EVIDENCE_ADEQUACY_AND_LINEAGE_ADJUDICATION_READINESS_REVIEW',
    notes: accepted
      ? Object.freeze([
          'Both frozen lineage questions were researched under the ten I165 requirements and remain unresolved.',
          'Li’s self-origin statement is recorded but is not independent corroboration of the exact 隔不作用 rule origin.',
          'Sun’s own preface confirms broad learning and collection from multiple teachers/practitioners but does not attribute the target rule specifically to Li.',
          'Secondary New-School classification and material doctrine overlap are lineage signals only; neither is promoted to a specific derivative relationship.',
          'No negative relationship finding is manufactured from search silence, and no independence or remediation selection follows from I166.',
        ])
      : Object.freeze([
          'I165 did not match the exact frozen lineage-readiness boundary. I166 targeted discovery fails closed.',
        ]),
  });
}
