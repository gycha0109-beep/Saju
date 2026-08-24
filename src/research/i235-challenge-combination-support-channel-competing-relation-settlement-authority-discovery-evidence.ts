import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I234_COMPETING_RELATION_SETTLEMENT_DISCOVERY_PATH_IDS,
  I234_DISCOVERY_CONTROL_IDS,
  type I234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReviewReport,
} from './i234-challenge-combination-support-channel-competing-relation-settlement-authority-discovery-readiness-review.js';
import { I233_COMPETING_RELATION_SETTLEMENT_AUTHORITY_REQUIREMENT_IDS } from './i233-challenge-combination-support-channel-competing-relation-settlement-authority-gap-requirements-review.js';

export const I235_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-competing-relation-settlement-authority-discovery-evidence-v1';

export type I235RequirementCoverage = 'DIRECT' | 'PARTIAL' | 'NOT_ESTABLISHED';

export const I235_DISCOVERY_CANDIDATE_IDS = Object.freeze([
  'SHEN_XIAOZHAN_ZIPING_ZHENQUAN_ORIGINAL_CH7_ZHANGYUE_HTML',
  'XU_LEWU_ZIPING_ZHENQUAN_PINGZHU_CH7_IWZBZ_HTML',
  'SHEN_XIAOZHAN_ZIPING_ZHENQUAN_CH5_COMPETING_COMBINATION_IWZBZ_HTML',
] as const);
export type I235DiscoveryCandidateId = (typeof I235_DISCOVERY_CANDIDATE_IDS)[number];

export const I235_DIRECT_COVERAGE_GAP_REQUIREMENT_IDS = Object.freeze([
  'CURRENT_VS_COMPETING_ROLE_SCOPE_EXPLICIT',
  'PRECEDENCE_VS_RELATION_OUTCOME_SEPARATION',
  'TIE_CONFLICT_OR_UNRESOLVED_FAIL_CLOSED_DISPOSITION',
] as const);

export interface I235RequirementCoverageRecord {
  requirementId: (typeof I233_COMPETING_RELATION_SETTLEMENT_AUTHORITY_REQUIREMENT_IDS)[number];
  coverage: I235RequirementCoverage;
}

export interface I235DiscoveryCandidateRecord {
  candidateId: I235DiscoveryCandidateId;
  sourceAuthorOrCommentator: string;
  workTitle: string;
  chapterOrSection: string;
  locator: string;
  sourceBoundDirectTextObserved: true;
  ruleLevelLanguageObserved: true;
  originalTextLayerObserved: boolean;
  commentaryLayerObserved: boolean;
  derivativeOrSameWorkRelationshipKnown: boolean;
  derivativeRelationshipAdjudicatedAsIndependentAuthority: false;
  directRuleAnchorIds: readonly string[];
  requirementCoverage: readonly I235RequirementCoverageRecord[];
  directRequirementCount: number;
  partialRequirementCount: number;
  fullEightRequirementCoverage: false;
  authorityPromotionAuthorizedByThisGate: false;
}

export interface I235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_EVIDENCE'
    | 'I234_DISCOVERY_READINESS_BOUNDARY_INVALID';
  decision:
    | 'FIVE_DISCOVERY_PATHS_EXECUTED_THREE_DIRECT_SOURCE_BOUND_CANDIDATES_OBSERVED_MULTI_RELATION_AND_COMPETING_COMBINATION_RULE_TEXT_FOUND_NO_SINGLE_CANDIDATE_SATISFIES_ALL_EIGHT_REQUIREMENTS_THREE_REQUIREMENTS_LACK_ANY_DIRECT_CANDIDATE_COVERAGE_NO_PRECEDENCE_SETTLEMENT_OR_NET_EFFECT_PROMOTION'
    | 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_NOT_EXECUTED';
  upstreamI234ReviewId: string;
  exactI234BoundaryAccepted: boolean;
  targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT';
  authorityGap: 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' | 'UPSTREAM_INVALID';
  authorityGapClosed: false;
  discoveryExecuted: boolean;
  executedDiscoveryPathIds: readonly string[];
  executedDiscoveryPathCount: 5 | 0;
  I234ControlIdsAccepted: readonly string[];
  I234ControlCountAccepted: 17 | 0;
  candidateRecords: readonly I235DiscoveryCandidateRecord[];
  candidateRecordCount: 3 | 0;
  qualifyingDirectSourceBoundCandidateCount: 3 | 0;
  fullEightRequirementCandidateCount: 0;
  anySingleCandidateFullEightRequirementCoverage: false;
  directCoverageGapRequirementIds: readonly string[];
  directCoverageGapRequirementCount: 3 | 0;
  directCoverageEstablishedForFiveOfEightRequirements: boolean;
  originalChapterSevenDirectTextObserved: boolean;
  chapterSevenMutualResolutionAndExceptionLanguageObserved: boolean;
  xuCommentaryPositionAndNatureConditionalityObserved: boolean;
  xuCommentaryNoFixedUniversalMethodLanguageObserved: boolean;
  chapterFiveCompetingCombinationTwoToOneLanguageObserved: boolean;
  chapterFivePositionSeparationExceptionObserved: boolean;
  clashVsCombinationRuleTextObserved: boolean;
  combinationVsCombinationCompetitionRuleTextObserved: boolean;
  contextAndExceptionRuleTextObserved: boolean;
  explicitSystemCurrentVsCompetingRoleMappingEstablished: false;
  precedenceVsRelationOutcomeSeparationEstablished: false;
  tieConflictOrUnresolvedFailClosedDispositionEstablished: false;
  candidateSetUnionMayBeTreatedAsSingleAuthority: false;
  crossSourceCompositionAuthorizedByThisGate: false;
  semanticBridgeInferenceAuthorizedByThisGate: false;
  derivativeRelationshipAdjudicatedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  sourceNormativeAdmissibilityAdjudicatedByThisGate: false;
  candidateRegistrationAuthorizedByThisGate: false;
  candidateSelectedByThisGate: false;
  competingRelationSettlementResolved: false;
  crossRelationPrecedenceAuthorized: false;
  multiTouchAggregationAuthorized: false;
  supportChannelActivationVerdictAuthorized: false;
  supportChannelPersistenceVerdictAuthorized: false;
  supportChannelDestructionVerdictAuthorized: false;
  supportChannelNetEffectVerdictAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  hiddenStemI232HoldPreserved: boolean;
  hiddenStemTrackReopenedByThisGate: false;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  visibleStemBinaryEffectiveInteractionEligibilityResolved: false;
  quWei2001HoldPreserved: boolean;
  li1998SameTargetPathSuspendedNotRetired: boolean;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  candidateSetMutatedByThisGate: false;
  evidenceRebindingAuthorizedByThisGate: false;
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  productionPolicyExecutionAuthorized: false;
  recommendedNextGate:
    | 'COMPETING_RELATION_SETTLEMENT_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW'
    | 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_EVIDENCE';
  notes: readonly string[];
}

const coverage = (
  values: readonly I235RequirementCoverage[],
): readonly I235RequirementCoverageRecord[] =>
  I233_COMPETING_RELATION_SETTLEMENT_AUTHORITY_REQUIREMENT_IDS.map((requirementId, index) => ({
    requirementId,
    coverage: values[index] ?? 'NOT_ESTABLISHED',
  }));

const CANDIDATES: readonly I235DiscoveryCandidateRecord[] = Object.freeze([
  {
    candidateId: 'SHEN_XIAOZHAN_ZIPING_ZHENQUAN_ORIGINAL_CH7_ZHANGYUE_HTML',
    sourceAuthorOrCommentator: '沈孝瞻',
    workTitle: '子平真诠（原本）',
    chapterOrSection: '七、论刑冲会合解法',
    locator: 'https://s.zhangyue.com/read?bid=13096776&cid=8',
    sourceBoundDirectTextObserved: true,
    ruleLevelLanguageObserved: true,
    originalTextLayerObserved: true,
    commentaryLayerObserved: false,
    derivativeOrSameWorkRelationshipKnown: true,
    derivativeRelationshipAdjudicatedAsIndependentAuthority: false,
    directRuleAnchorIds: Object.freeze([
      'ORIGINAL_CH7_COMBINATION_CAN_RESOLVE_CLASH',
      'ORIGINAL_CH7_RESOLUTION_CAN_REINTRODUCE_CLASH',
      'ORIGINAL_CH7_COMBINATION_MAY_FAIL_TO_RESOLVE_CLASH',
      'ORIGINAL_CH7_ONE_CLASH_MAY_RESOLVE_ANOTHER_RELATION',
    ]),
    requirementCoverage: coverage([
      'DIRECT',
      'DIRECT',
      'PARTIAL',
      'DIRECT',
      'PARTIAL',
      'DIRECT',
      'NOT_ESTABLISHED',
      'DIRECT',
    ]),
    directRequirementCount: 5,
    partialRequirementCount: 2,
    fullEightRequirementCoverage: false,
    authorityPromotionAuthorizedByThisGate: false,
  },
  {
    candidateId: 'XU_LEWU_ZIPING_ZHENQUAN_PINGZHU_CH7_IWZBZ_HTML',
    sourceAuthorOrCommentator: '徐乐吾（评注） / 沈孝瞻（原著）',
    workTitle: '子平真诠评注',
    chapterOrSection: '论刑冲会合解法',
    locator: 'https://www.iwzbz.com/artical/h5book/v5/3_1_2_9.html',
    sourceBoundDirectTextObserved: true,
    ruleLevelLanguageObserved: true,
    originalTextLayerObserved: true,
    commentaryLayerObserved: true,
    derivativeOrSameWorkRelationshipKnown: true,
    derivativeRelationshipAdjudicatedAsIndependentAuthority: false,
    directRuleAnchorIds: Object.freeze([
      'XU_NOTE_COMBINATION_AND_CLASH_CAN_MUTUALLY_RESOLVE',
      'XU_NOTE_DEPENDS_ON_POSITION_AND_NATURE',
      'XU_NOTE_NO_SINGLE_FIXED_METHOD',
      'XU_NOTE_SAME_POSITION_DIFFERENT_NATURE_DIFFERENT_RESOLUTION',
    ]),
    requirementCoverage: coverage([
      'DIRECT',
      'DIRECT',
      'PARTIAL',
      'DIRECT',
      'PARTIAL',
      'DIRECT',
      'NOT_ESTABLISHED',
      'DIRECT',
    ]),
    directRequirementCount: 5,
    partialRequirementCount: 2,
    fullEightRequirementCoverage: false,
    authorityPromotionAuthorizedByThisGate: false,
  },
  {
    candidateId: 'SHEN_XIAOZHAN_ZIPING_ZHENQUAN_CH5_COMPETING_COMBINATION_IWZBZ_HTML',
    sourceAuthorOrCommentator: '沈孝瞻（原著） / 徐乐吾（评注）',
    workTitle: '子平真诠评注',
    chapterOrSection: '论十干合而不合',
    locator: 'https://www.iwzbz.com/artical/h5book/v5/3_1_2_7.html',
    sourceBoundDirectTextObserved: true,
    ruleLevelLanguageObserved: true,
    originalTextLayerObserved: true,
    commentaryLayerObserved: true,
    derivativeOrSameWorkRelationshipKnown: true,
    derivativeRelationshipAdjudicatedAsIndependentAuthority: false,
    directRuleAnchorIds: Object.freeze([
      'CH5_TWO_COMBINATIONS_COMPETE_FOR_ONE_PARTICIPANT',
      'CH5_COMPETING_COMBINATIONS_RETAIN_NONEXCLUSIVE_COMBINATION_INTENT',
      'CH5_SEPARATED_POSITION_REMOVES_COMPETITION',
      'CH5_POSITION_REQUIRED_TO_IDENTIFY_COMPETING_COMBINATION',
    ]),
    requirementCoverage: coverage([
      'DIRECT',
      'DIRECT',
      'PARTIAL',
      'DIRECT',
      'PARTIAL',
      'DIRECT',
      'PARTIAL',
      'DIRECT',
    ]),
    directRequirementCount: 5,
    partialRequirementCount: 3,
    fullEightRequirementCoverage: false,
    authorityPromotionAuthorizedByThisGate: false,
  },
]);

function exactI234Accepted(
  i234: I234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReviewReport,
): boolean {
  return (
    i234.status === 'RESOLVED_COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_READINESS_REVIEW' &&
    i234.decision ===
      'FIVE_COMPETING_RELATION_AUTHORITY_DISCOVERY_PATHS_SEVENTEEN_CONTROLS_FROZEN_NO_DISCOVERY_EXECUTED_NO_PRECEDENCE_AGGREGATION_OR_NET_EFFECT_AUTHORITY_ACQUIRED' &&
    i234.exactI233BoundaryAccepted &&
    i234.authorityGap === 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' &&
    i234.authorityGapClosed === false &&
    i234.I233RequirementCount === 8 &&
    i234.I233RequirementsFrozenAccepted &&
    i234.I233ControlCount === 15 &&
    i234.I233ControlsFrozenAccepted &&
    i234.discoveryPathCount === 5 &&
    i234.discoveryPaths.length === I234_COMPETING_RELATION_SETTLEMENT_DISCOVERY_PATH_IDS.length &&
    i234.discoveryPaths.every(
      (path, index) => path.pathId === I234_COMPETING_RELATION_SETTLEMENT_DISCOVERY_PATH_IDS[index],
    ) &&
    i234.discoveryControlCount === 17 &&
    i234.discoveryControlIds.length === I234_DISCOVERY_CONTROL_IDS.length &&
    i234.discoveryControlIds.every((id, index) => id === I234_DISCOVERY_CONTROL_IDS[index]) &&
    i234.discoveryControlsFrozen &&
    i234.discoveryAuthorized &&
    i234.discoveryExecutedByThisGate === false &&
    i234.competingRelationSettlementResolved === false &&
    i234.crossRelationPrecedenceAuthorized === false &&
    i234.multiTouchAggregationAuthorized === false &&
    i234.hiddenStemI232HoldPreserved &&
    i234.hiddenStemTrackReopenedByThisGate === false &&
    i234.quWei2001HoldPreserved &&
    i234.li1998SameTargetPathSuspendedNotRetired &&
    i234.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i234.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i234.currentV2PackageAndCandidateSetRemainImmutable &&
    i234.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i234.actualCompositionPerformedByThisGate === false &&
    i234.multiSourceCompositionAuthorized === false &&
    i234.thresholdRuleCreatedByThisGate === false &&
    i234.damageEvaluationAuthorized === false &&
    i234.classificationAuthorized === false &&
    i234.numericScoringAuthorized === false &&
    i234.productionPolicyExecutionAuthorized === false &&
    i234.recommendedNextGate === 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_EVIDENCE'
  );
}

function finalized(
  material: Omit<I235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidenceReport, 'evidenceId'>,
): I235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidenceReport {
  return {
    evidenceId: `i235_competing_relation_settlement_discovery_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidence(
  i234: I234ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryReadinessReviewReport,
): I235ChallengeCombinationSupportChannelCompetingRelationSettlementAuthorityDiscoveryEvidenceReport {
  const accepted = exactI234Accepted(i234);
  return finalized({
    evidenceVersion: I235_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_EVIDENCE'
      : 'I234_DISCOVERY_READINESS_BOUNDARY_INVALID',
    decision: accepted
      ? 'FIVE_DISCOVERY_PATHS_EXECUTED_THREE_DIRECT_SOURCE_BOUND_CANDIDATES_OBSERVED_MULTI_RELATION_AND_COMPETING_COMBINATION_RULE_TEXT_FOUND_NO_SINGLE_CANDIDATE_SATISFIES_ALL_EIGHT_REQUIREMENTS_THREE_REQUIREMENTS_LACK_ANY_DIRECT_CANDIDATE_COVERAGE_NO_PRECEDENCE_SETTLEMENT_OR_NET_EFFECT_PROMOTION'
      : 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_NOT_EXECUTED',
    upstreamI234ReviewId: i234.reviewId,
    exactI234BoundaryAccepted: accepted,
    targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT',
    authorityGap: accepted ? 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' : 'UPSTREAM_INVALID',
    authorityGapClosed: false,
    discoveryExecuted: accepted,
    executedDiscoveryPathIds: accepted ? I234_COMPETING_RELATION_SETTLEMENT_DISCOVERY_PATH_IDS : [],
    executedDiscoveryPathCount: accepted ? 5 : 0,
    I234ControlIdsAccepted: accepted ? I234_DISCOVERY_CONTROL_IDS : [],
    I234ControlCountAccepted: accepted ? 17 : 0,
    candidateRecords: accepted ? CANDIDATES : [],
    candidateRecordCount: accepted ? 3 : 0,
    qualifyingDirectSourceBoundCandidateCount: accepted ? 3 : 0,
    fullEightRequirementCandidateCount: 0,
    anySingleCandidateFullEightRequirementCoverage: false,
    directCoverageGapRequirementIds: accepted ? I235_DIRECT_COVERAGE_GAP_REQUIREMENT_IDS : [],
    directCoverageGapRequirementCount: accepted ? 3 : 0,
    directCoverageEstablishedForFiveOfEightRequirements: accepted,
    originalChapterSevenDirectTextObserved: accepted,
    chapterSevenMutualResolutionAndExceptionLanguageObserved: accepted,
    xuCommentaryPositionAndNatureConditionalityObserved: accepted,
    xuCommentaryNoFixedUniversalMethodLanguageObserved: accepted,
    chapterFiveCompetingCombinationTwoToOneLanguageObserved: accepted,
    chapterFivePositionSeparationExceptionObserved: accepted,
    clashVsCombinationRuleTextObserved: accepted,
    combinationVsCombinationCompetitionRuleTextObserved: accepted,
    contextAndExceptionRuleTextObserved: accepted,
    explicitSystemCurrentVsCompetingRoleMappingEstablished: false,
    precedenceVsRelationOutcomeSeparationEstablished: false,
    tieConflictOrUnresolvedFailClosedDispositionEstablished: false,
    candidateSetUnionMayBeTreatedAsSingleAuthority: false,
    crossSourceCompositionAuthorizedByThisGate: false,
    semanticBridgeInferenceAuthorizedByThisGate: false,
    derivativeRelationshipAdjudicatedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    sourceNormativeAdmissibilityAdjudicatedByThisGate: false,
    candidateRegistrationAuthorizedByThisGate: false,
    candidateSelectedByThisGate: false,
    competingRelationSettlementResolved: false,
    crossRelationPrecedenceAuthorized: false,
    multiTouchAggregationAuthorized: false,
    supportChannelActivationVerdictAuthorized: false,
    supportChannelPersistenceVerdictAuthorized: false,
    supportChannelDestructionVerdictAuthorized: false,
    supportChannelNetEffectVerdictAuthorized: false,
    targetPostRelationRootState: 'not_determined',
    effectiveMechanismForceVerdict: 'not_determined',
    hiddenStemI232HoldPreserved: accepted,
    hiddenStemTrackReopenedByThisGate: false,
    hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    quWei2001HoldPreserved: accepted,
    li1998SameTargetPathSuspendedNotRetired: accepted,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    candidateSetMutatedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    recommendedNextGate: accepted
      ? 'COMPETING_RELATION_SETTLEMENT_CANDIDATE_EVIDENCE_ADEQUACY_COVERAGE_EVALUATION_READINESS_REVIEW'
      : 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_DISCOVERY_EVIDENCE',
    notes: accepted
      ? Object.freeze([
          'I235 executed all five I234 discovery paths and found three directly source-bound candidate passages across the Shen Xiaozhan original text and Xu Lewu commentary layers.',
          'Chapter seven directly records combination/clash resolution, reverse resolution, reintroduced conflict, and context-dependent exceptions; Xu commentary explicitly states that position and nature matter and that no single fixed method applies.',
          'Chapter five directly records two-to-one competing combination semantics and a position-separation exception, but does not supply the engine-specific current-vs-competing role contract or a fail-closed unresolved disposition.',
          'No single candidate satisfies all eight I233 requirements. Requirements 3, 5, and 7 have no DIRECT candidate-local coverage in this pass and remain substantive gaps.',
          'The records share work/commentary relationships that are deliberately not adjudicated for provenance independence or derivative authority at this discovery gate.',
        ])
      : Object.freeze(['I234 discovery-readiness boundary was not accepted; no I235 discovery evidence was executed.']),
  });
}
