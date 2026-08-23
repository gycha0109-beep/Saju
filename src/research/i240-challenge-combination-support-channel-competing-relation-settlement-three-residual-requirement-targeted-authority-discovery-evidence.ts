import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I239_TARGETED_DISCOVERY_PATH_IDS,
  type I239ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryReadinessReviewReport,
} from './i239-challenge-combination-support-channel-competing-relation-settlement-three-residual-requirement-targeted-authority-discovery-readiness-review.js';
import { I238_RESIDUAL_REQUIREMENT_IDS } from './i238-challenge-combination-support-channel-competing-relation-settlement-coverage-evidence-adequacy-residual-requirements-reassessment-review.js';

export const I240_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-competing-relation-settlement-three-residual-requirement-targeted-authority-discovery-evidence-v1';

export const I240_DISCOVERY_CANDIDATE_IDS = Object.freeze([
  'YUDING_ZIPING_KOUSHOU_SUIJINLU_HEYIX_2019_HTML',
  'YUDING_ZIPING_MIBEN_SINA_2012_REPOST_HTML',
  'SHEN_XIAOZHAN_ZIPING_ZHENQUAN_ORIGINAL_CH5_DASHU_HTML',
] as const);
export type I240DiscoveryCandidateId = (typeof I240_DISCOVERY_CANDIDATE_IDS)[number];
export type I240ResidualCoverage = 'DIRECT' | 'PARTIAL' | 'NOT_ESTABLISHED';

export interface I240ResidualCoverageCell {
  requirementId: (typeof I238_RESIDUAL_REQUIREMENT_IDS)[number];
  coverage: I240ResidualCoverage;
  directRuleSignal: string;
}

export interface I240TargetedDiscoveryCandidateRecord {
  candidateId: I240DiscoveryCandidateId;
  sourceTitle: string;
  sourceLocator: string;
  publishedContext: string;
  directlyOpenedHtmlContext: boolean;
  sourceBoundRuleTextObserved: boolean;
  leadOnly: false;
  sameTextFamilyRelationshipStatus:
    | 'SAME_YUDING_SUIJINLU_TEXT_FAMILY_RELATIONSHIP_NOT_ADJUDICATED'
    | 'SEPARATE_ZIPING_ZHENQUAN_TEXT';
  provenanceIndependenceAdjudicated: false;
  derivativeRelationshipAdjudicated: false;
  normativeAdmissibilityAdjudicated: false;
  embeddedUpstreamAttributionObserved: boolean;
  embeddedUpstreamAttributionVerifiedByThisGate: false;
  residualCoverage: readonly I240ResidualCoverageCell[];
  allThreeResidualsDirectCandidateLocal: boolean;
  directResidualCount: number;
  partialResidualCount: number;
  notEstablishedResidualCount: number;
}

export interface I240ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_EVIDENCE'
    | 'I239_TARGETED_DISCOVERY_BOUNDARY_INVALID';
  decision:
    | 'FIVE_TARGETED_PATHS_EXECUTED_TWO_SAME_TEXT_YUDING_SUIJINLU_WITNESSES_DIRECTLY_COVER_ALL_THREE_RESIDUALS_ONE_ZIPING_ZHENQUAN_DIRECT_ROLE_MAPPING_WITNESS_OBSERVED_THREE_RESIDUAL_DIRECT_COVERAGE_CLASSES_MATERIALLY_IMPROVED_SOURCE_RELATIONSHIP_AND_ADMISSIBILITY_NOT_ADJUDICATED_NO_UNION_NO_PROMOTION'
    | 'COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_TARGETED_DISCOVERY_NOT_EXECUTED';
  upstreamI239ReviewId: string;
  exactI239BoundaryAccepted: boolean;
  targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT';
  discoveryExecuted: boolean;
  executedDiscoveryPathIds: readonly string[];
  executedDiscoveryPathCount: 5 | 0;
  candidateRecords: readonly I240TargetedDiscoveryCandidateRecord[];
  candidateRecordCount: 3 | 0;
  directlyOpenedHtmlCandidateCount: 3 | 0;
  leadOnlyCandidateCount: 0;
  allThreeResidualDirectCandidateCount: 2 | 0;
  materiallyNewDirectResidualCoverageRequirementIds: readonly string[];
  materiallyNewDirectResidualCoverageRequirementCount: 3 | 0;
  currentVsCompetingRoleScopeDirectCoverageObserved: boolean;
  precedenceVsRelationOutcomeSeparationDirectCoverageObserved: boolean;
  tieConflictOrUnresolvedFailClosedDispositionDirectCoverageObserved: boolean;
  yudingSuijinluRoleSelectionRuleObserved: boolean;
  yudingSuijinluPrecedenceVsOutcomeRuleObserved: boolean;
  yudingSuijinluExplicitConflictDispositionObserved: boolean;
  zipingZhenquanOriginalRoleSelectionRuleObserved: boolean;
  sameTextYudingWitnessCount: 2 | 0;
  sameTextWitnessesMayCountAsIndependentAuthorities: false;
  sina2012RepostDateDirectlyObserved: boolean;
  sinaEmbeddedOriginal2011TimestampObserved: boolean;
  sinaEmbeddedOriginalAuthorAttributionObserved: boolean;
  embeddedUpstreamAttributionVerifiedByThisGate: false;
  sourceRelationshipAdjudicatedByThisGate: false;
  sourceNormativeAdmissibilityAdjudicatedByThisGate: false;
  candidateSetUnionCoveragePerformed: false;
  crossSourceCompletionPerformed: false;
  existingI235FiveDirectRequirementClassesReopened: false;
  existingPartialCoverageAutoUpgradedWithoutNewPassage: false;
  searchSnippetUsedAsDirectEvidence: false;
  authorityGap: 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' | 'UPSTREAM_INVALID';
  authorityGapClosed: false;
  authorityPromotedByThisGate: false;
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
  quWei2001HoldPreserved: boolean;
  li1998SameTargetPathSuspendedNotRetired: boolean;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  candidateRegisteredByThisGate: false;
  candidateSelectedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  evidenceRebindingAuthorizedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  derivativeRelationshipAdjudicatedByThisGate: false;
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  productionPolicyExecutionAuthorized: false;
  negativeFindingCreatedByThisGate: false;
  discoveryExhaustionClaimed: false;
  corpusExhaustionClaimed: false;
  recommendedNextGate:
    | 'COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_TARGETED_DISCOVERY_EVIDENCE_ADEQUACY_SOURCE_RELATIONSHIP_ADMISSIBILITY_REASSESSMENT_REVIEW'
    | 'COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_EVIDENCE';
  notes: readonly string[];
}

function exactI239Accepted(
  i239: I239ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryReadinessReviewReport,
): boolean {
  return (
    i239.status === 'RESOLVED_COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW' &&
    i239.decision === 'THREE_RESIDUAL_REQUIREMENTS_FIVE_TARGETED_DISCOVERY_PATHS_EIGHTEEN_CONTROLS_FROZEN_DIRECT_RULE_LEVEL_EVIDENCE_ONLY_NO_DISCOVERY_EXECUTED_NO_AUTHORITY_PROMOTION' &&
    i239.exactI238BoundaryAccepted &&
    i239.residualRequirementCount === 3 &&
    i239.residualRequirementIds.length === 3 &&
    i239.residualRequirementIds.every((id, index) => id === I238_RESIDUAL_REQUIREMENT_IDS[index]) &&
    i239.discoveryPathCount === 5 &&
    i239.discoveryPathIds.length === 5 &&
    i239.discoveryPathIds.every((id, index) => id === I239_TARGETED_DISCOVERY_PATH_IDS[index]) &&
    i239.discoveryControlCount === 18 &&
    i239.discoveryContractFrozen &&
    i239.targetedDiscoveryAuthorized &&
    i239.discoveryExecutedByThisGate === false &&
    i239.currentVsCompetingRoleMappingDirectRuleRequired &&
    i239.currentVsCompetingRoleMappingMayBeInferredFromExample === false &&
    i239.precedenceOperationVsOutcomeSeparationDirectRuleRequired &&
    i239.precedenceAndOutcomeMayBeCollapsedByInference === false &&
    i239.tieConflictUnresolvedExplicitDispositionRequired &&
    i239.silenceMayEstablishFailClosedDisposition === false &&
    i239.boundedDeferredOrNonDecisionEquivalentMayQualifyIfExplicit &&
    i239.generalCombinationClashExplanationMayCountAsProgress === false &&
    i239.searchSnippetMayCreateDirectCoverage === false &&
    i239.fiveAlreadyDirectRequirementClassesReopened === false &&
    i239.existingPartialCoverageMayAutoUpgradeToDirect === false &&
    i239.candidateSetUnionCoverageAuthorized === false &&
    i239.crossSourceCompletionAuthorized === false &&
    i239.authorityGap === 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' &&
    i239.authorityGapClosed === false &&
    i239.authorityPromotedByThisGate === false &&
    i239.competingRelationSettlementResolved === false &&
    i239.hiddenStemI232HoldPreserved &&
    i239.hiddenStemTrackReopenedByThisGate === false &&
    i239.quWei2001HoldPreserved &&
    i239.li1998SameTargetPathSuspendedNotRetired &&
    i239.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i239.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i239.currentV2PackageAndCandidateSetRemainImmutable &&
    i239.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i239.evidenceRebindingAuthorizedByThisGate === false &&
    i239.provenanceIndependenceAdjudicatedByThisGate === false &&
    i239.derivativeRelationshipAdjudicatedByThisGate === false &&
    i239.actualCompositionPerformedByThisGate === false &&
    i239.multiSourceCompositionAuthorized === false &&
    i239.thresholdRuleCreatedByThisGate === false &&
    i239.damageEvaluationAuthorized === false &&
    i239.classificationAuthorized === false &&
    i239.numericScoringAuthorized === false &&
    i239.productionPolicyExecutionAuthorized === false &&
    i239.negativeFindingCreatedByThisGate === false &&
    i239.discoveryExhaustionClaimed === false &&
    i239.corpusExhaustionClaimed === false &&
    i239.recommendedNextGate === 'COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_EVIDENCE'
  );
}

function coverage(
  requirementId: (typeof I238_RESIDUAL_REQUIREMENT_IDS)[number],
  state: I240ResidualCoverage,
  directRuleSignal: string,
): I240ResidualCoverageCell {
  return { requirementId, coverage: state, directRuleSignal };
}

function candidateRecords(): readonly I240TargetedDiscoveryCandidateRecord[] {
  const [role, precedence, unresolved] = I238_RESIDUAL_REQUIREMENT_IDS;
  const records: I240TargetedDiscoveryCandidateRecord[] = [
    {
      candidateId: 'YUDING_ZIPING_KOUSHOU_SUIJINLU_HEYIX_2019_HTML',
      sourceTitle: '四柱八字算命御定子平口授碎金炉秘本',
      sourceLocator: 'https://www.heyix.com/y_Article/2194.html',
      publishedContext: 'heyixw / 2019-12-12 HTML witness',
      directlyOpenedHtmlContext: true,
      sourceBoundRuleTextObserved: true,
      leadOnly: false,
      sameTextFamilyRelationshipStatus: 'SAME_YUDING_SUIJINLU_TEXT_FAMILY_RELATIONSHIP_NOT_ADJUDICATED',
      provenanceIndependenceAdjudicated: false,
      derivativeRelationshipAdjudicated: false,
      normativeAdmissibilityAdjudicated: false,
      embeddedUpstreamAttributionObserved: false,
      embeddedUpstreamAttributionVerifiedByThisGate: false,
      residualCoverage: Object.freeze([
        coverage(role, 'DIRECT', 'Direct rule: 侭前而不侭后 / 先用而不先主 explicitly selects the operative relation against the competing relation.'),
        coverage(precedence, 'DIRECT', 'Direct rules: 三合力大于六合 and 侭三不侭二; separate outcome states include 得局失垣 / 失局得垣.'),
        coverage(unresolved, 'DIRECT', 'Direct conflict disposition: 合者不合 under争合 plus 一不合两，两不冲一.'),
      ]),
      allThreeResidualsDirectCandidateLocal: true,
      directResidualCount: 3,
      partialResidualCount: 0,
      notEstablishedResidualCount: 0,
    },
    {
      candidateId: 'YUDING_ZIPING_MIBEN_SINA_2012_REPOST_HTML',
      sourceTitle: '[转载]<御定子平>秘本三篇',
      sourceLocator: 'https://blog.sina.com.cn/s/blog_9b6237b80101b70z.html',
      publishedContext: 'Sina repost / 2012-09-24 03:03:47; embeds 2011-12-23 and 尚慈居士 attribution without independent upstream verification',
      directlyOpenedHtmlContext: true,
      sourceBoundRuleTextObserved: true,
      leadOnly: false,
      sameTextFamilyRelationshipStatus: 'SAME_YUDING_SUIJINLU_TEXT_FAMILY_RELATIONSHIP_NOT_ADJUDICATED',
      provenanceIndependenceAdjudicated: false,
      derivativeRelationshipAdjudicated: false,
      normativeAdmissibilityAdjudicated: false,
      embeddedUpstreamAttributionObserved: true,
      embeddedUpstreamAttributionVerifiedByThisGate: false,
      residualCoverage: Object.freeze([
        coverage(role, 'DIRECT', 'The repost directly preserves 侭前而不侭后 / 先用而不先主.'),
        coverage(precedence, 'DIRECT', 'The repost directly preserves 侭三不侭二 and separate 得局失垣 / 失局得垣 outcomes.'),
        coverage(unresolved, 'DIRECT', 'The repost directly preserves 合者不合 and 一不合两，两不冲一.'),
      ]),
      allThreeResidualsDirectCandidateLocal: true,
      directResidualCount: 3,
      partialResidualCount: 0,
      notEstablishedResidualCount: 0,
    },
    {
      candidateId: 'SHEN_XIAOZHAN_ZIPING_ZHENQUAN_ORIGINAL_CH5_DASHU_HTML',
      sourceTitle: '《子平真诠》原文 — 第五章论十干合而不合',
      sourceLocator: 'https://www.10100.com/article/108269720',
      publishedContext: 'direct HTML transcription of 沈孝瞻《子平真诠》 chapter 5',
      directlyOpenedHtmlContext: true,
      sourceBoundRuleTextObserved: true,
      leadOnly: false,
      sameTextFamilyRelationshipStatus: 'SEPARATE_ZIPING_ZHENQUAN_TEXT',
      provenanceIndependenceAdjudicated: false,
      derivativeRelationshipAdjudicated: false,
      normativeAdmissibilityAdjudicated: false,
      embeddedUpstreamAttributionObserved: false,
      embeddedUpstreamAttributionVerifiedByThisGate: false,
      residualCoverage: Object.freeze([
        coverage(role, 'DIRECT', 'Direct text: 月上之乙先去合庚，而日干反不能合 explicitly distinguishes selected and competing relations by position.'),
        coverage(precedence, 'PARTIAL', 'A first relation and blocked second relation are stated, but no general precedence-operation versus outcome-state vocabulary is separately defined.'),
        coverage(unresolved, 'NOT_ESTABLISHED', 'The chapter discusses争合妒合 and隔位 exceptions but does not state a general unresolved fail-closed disposition.'),
      ]),
      allThreeResidualsDirectCandidateLocal: false,
      directResidualCount: 1,
      partialResidualCount: 1,
      notEstablishedResidualCount: 1,
    },
  ];
  return Object.freeze(records);
}

function finalized(
  material: Omit<I240ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryEvidenceReport, 'evidenceId'>,
): I240ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryEvidenceReport {
  return {
    evidenceId: `i240_competing_relation_three_residual_discovery_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI240ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryEvidence(
  i239: I239ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryReadinessReviewReport,
): I240ChallengeCombinationSupportChannelCompetingRelationSettlementThreeResidualRequirementTargetedAuthorityDiscoveryEvidenceReport {
  const accepted = exactI239Accepted(i239);
  const records = accepted ? candidateRecords() : Object.freeze([]);
  return finalized({
    evidenceVersion: I240_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_EVIDENCE_VERSION,
    status: accepted ? 'RESOLVED_COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_EVIDENCE' : 'I239_TARGETED_DISCOVERY_BOUNDARY_INVALID',
    decision: accepted ? 'FIVE_TARGETED_PATHS_EXECUTED_TWO_SAME_TEXT_YUDING_SUIJINLU_WITNESSES_DIRECTLY_COVER_ALL_THREE_RESIDUALS_ONE_ZIPING_ZHENQUAN_DIRECT_ROLE_MAPPING_WITNESS_OBSERVED_THREE_RESIDUAL_DIRECT_COVERAGE_CLASSES_MATERIALLY_IMPROVED_SOURCE_RELATIONSHIP_AND_ADMISSIBILITY_NOT_ADJUDICATED_NO_UNION_NO_PROMOTION' : 'COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_TARGETED_DISCOVERY_NOT_EXECUTED',
    upstreamI239ReviewId: i239.reviewId,
    exactI239BoundaryAccepted: accepted,
    targetScope: 'MULTIPLE_TRACKED_RELATION_TOUCHES_COMPETING_RELATION_SETTLEMENT',
    discoveryExecuted: accepted,
    executedDiscoveryPathIds: accepted ? I239_TARGETED_DISCOVERY_PATH_IDS : Object.freeze([]),
    executedDiscoveryPathCount: accepted ? 5 : 0,
    candidateRecords: records,
    candidateRecordCount: accepted ? 3 : 0,
    directlyOpenedHtmlCandidateCount: accepted ? 3 : 0,
    leadOnlyCandidateCount: 0,
    allThreeResidualDirectCandidateCount: accepted ? 2 : 0,
    materiallyNewDirectResidualCoverageRequirementIds: accepted ? I238_RESIDUAL_REQUIREMENT_IDS : Object.freeze([]),
    materiallyNewDirectResidualCoverageRequirementCount: accepted ? 3 : 0,
    currentVsCompetingRoleScopeDirectCoverageObserved: accepted,
    precedenceVsRelationOutcomeSeparationDirectCoverageObserved: accepted,
    tieConflictOrUnresolvedFailClosedDispositionDirectCoverageObserved: accepted,
    yudingSuijinluRoleSelectionRuleObserved: accepted,
    yudingSuijinluPrecedenceVsOutcomeRuleObserved: accepted,
    yudingSuijinluExplicitConflictDispositionObserved: accepted,
    zipingZhenquanOriginalRoleSelectionRuleObserved: accepted,
    sameTextYudingWitnessCount: accepted ? 2 : 0,
    sameTextWitnessesMayCountAsIndependentAuthorities: false,
    sina2012RepostDateDirectlyObserved: accepted,
    sinaEmbeddedOriginal2011TimestampObserved: accepted,
    sinaEmbeddedOriginalAuthorAttributionObserved: accepted,
    embeddedUpstreamAttributionVerifiedByThisGate: false,
    sourceRelationshipAdjudicatedByThisGate: false,
    sourceNormativeAdmissibilityAdjudicatedByThisGate: false,
    candidateSetUnionCoveragePerformed: false,
    crossSourceCompletionPerformed: false,
    existingI235FiveDirectRequirementClassesReopened: false,
    existingPartialCoverageAutoUpgradedWithoutNewPassage: false,
    searchSnippetUsedAsDirectEvidence: false,
    authorityGap: accepted ? 'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED' : 'UPSTREAM_INVALID',
    authorityGapClosed: false,
    authorityPromotedByThisGate: false,
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
    quWei2001HoldPreserved: accepted,
    li1998SameTargetPathSuspendedNotRetired: accepted,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    candidateRegisteredByThisGate: false,
    candidateSelectedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    evidenceRebindingAuthorizedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    derivativeRelationshipAdjudicatedByThisGate: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    productionPolicyExecutionAuthorized: false,
    negativeFindingCreatedByThisGate: false,
    discoveryExhaustionClaimed: false,
    corpusExhaustionClaimed: false,
    recommendedNextGate: accepted ? 'COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_TARGETED_DISCOVERY_EVIDENCE_ADEQUACY_SOURCE_RELATIONSHIP_ADMISSIBILITY_REASSESSMENT_REVIEW' : 'COMPETING_RELATION_SETTLEMENT_THREE_RESIDUAL_REQUIREMENT_TARGETED_AUTHORITY_DISCOVERY_EVIDENCE',
    notes: accepted
      ? Object.freeze([
          'Two directly opened HTML witnesses preserve the same 御定子平/口授碎金炉 rule family and each candidate-locally supplies DIRECT text for all three I238 residual requirements.',
          'The two 御定子平 witnesses are not treated as independent authorities; derivative and provenance relationships remain unadjudicated.',
          'The 2012 Sina repost exposes its repost timestamp and embeds an earlier 2011-12-23 timestamp plus 尚慈居士 attribution, but I240 does not verify that embedded upstream attribution as original or canonical.',
          'A separate 子平真诠 chapter-5 HTML transcription independently supplies direct role-selection wording for requirement 3 while remaining conservative on requirements 5 and 7.',
          'Three-residual direct coverage is a discovery result only and cannot close the authority gap before evidence-adequacy/source-relationship/admissibility review.',
        ])
      : Object.freeze(['I240 fails closed unless the exact I239 targeted-discovery boundary is preserved.']),
  });
}
