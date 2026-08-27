import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import { CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTRACTS } from './career-personalization-t8-branch-clash-remediation-trigger-readiness-review.js';
import {
  CAREER_PERSONALIZATION_T8_POST_B43_GLOBAL_RESEARCH_HOLD_REVIEW_VERSION,
  CAREER_T8_B44_GLOBAL_REOPEN_SIGNAL_CLASSES,
  CAREER_T8_B44_GLOBAL_RESEARCH_FRONTIER_RECORDS,
  CAREER_T8_B44_GLOBAL_RESEARCH_HOLD_CONTROL_IDS,
  type CareerPersonalizationT8PostB43GlobalResearchHoldReviewReport,
} from './career-personalization-t8-post-b43-global-research-hold-review.js';

export const CAREER_PERSONALIZATION_T8_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE_VERSION =
  'myeonghwa-career-personalization-t8-research-reopen-trigger-activation-evidence-v1' as const;

export type CareerT8B45SignalClass = (typeof CAREER_T8_B44_GLOBAL_REOPEN_SIGNAL_CLASSES)[number];

export type CareerT8B45EvidenceClass =
  | 'DIRECT_BODY_STILL_MISSING_LOCATOR_AND_METHOD_CONTEXT_EXPANDED'
  | 'EXACT_WITNESS_SURFACE_ACQUIRED_TARGET_PAGES_STILL_UNBOUND'
  | 'INDEPENDENT_PUBLISHED_BRANCH_PATH_MATERIAL_BUT_CURRENT_METHOD_COMPATIBILITY_UNESTABLISHED'
  | 'FAMILY_TARGET_LOCATORS_EXPANDED_TARGET_NORMATIVE_BODY_STILL_MISSING'
  | 'NO_GOVERNED_METHOD_SCOPE_CHANGE'
  | 'I254_HOLD_UNCHANGED'
  | 'PACK_LEVEL_PRECONDITION_UNCHANGED';

export interface CareerT8B45ReopenSignalEvidenceRecord {
  signalClass: CareerT8B45SignalClass;
  evidenceClass: CareerT8B45EvidenceClass;
  supportingEvidenceChanged: boolean;
  qualifyingFrozenSignalChange: boolean;
  frozenTriggerSatisfied: false;
  authorityResearchLaneReopened: false;
  boundedGovernanceFollowupJustified: boolean;
  sourceIdentities: readonly string[];
  observations: readonly string[];
  remainingBlockers: readonly string[];
}

export const CAREER_T8_B45_REOPEN_SIGNAL_EVIDENCE_RECORDS = Object.freeze([
  Object.freeze({
    signalClass: 'QIN_P464_DIRECT_BODY_EVIDENCE_CHANGE' as const,
    evidenceClass: 'DIRECT_BODY_STILL_MISSING_LOCATOR_AND_METHOD_CONTEXT_EXPANDED' as const,
    supportingEvidenceChanged: true,
    qualifyingFrozenSignalChange: false,
    frozenTriggerSatisfied: false as const,
    authorityResearchLaneReopened: false as const,
    boundedGovernanceFollowupJustified: false,
    sourceIdentities: Object.freeze([
      '秦倫詩, 中國易學博覽：八字應用經驗學, 2010 printed-edition lineage; Chapter 18 Career TOC locator p.462-p.466',
    ]),
    observations: Object.freeze([
      'The Career chapter locator is now narrowed to 第三節 按十神組合選職業 beginning on printed p.464.',
      'Surrounding same-work method structure explicitly includes 旺衰, 用神, 喜忌, 合化, 十神 and 職運 before the Career chapter.',
      'The printed p.464 normative body itself is still not directly acquired, so the frozen DIRECT_BODY evidence signal is not satisfied.',
    ]),
    remainingBlockers: Object.freeze([
      'DIRECT_PRINTED_P464_NORMATIVE_BODY',
      'LOCAL_METHOD_DEPENDENCY_SEPARABILITY_OR_COMPATIBILITY',
    ]),
  }),
  Object.freeze({
    signalClass: 'QIANLI_1936_EXACT_TARGET_PAGE_EVIDENCE_CHANGE' as const,
    evidenceClass: 'EXACT_WITNESS_SURFACE_ACQUIRED_TARGET_PAGES_STILL_UNBOUND' as const,
    supportingEvidenceChanged: true,
    qualifyingFrozenSignalChange: false,
    frozenTriggerSatisfied: false as const,
    authorityResearchLaneReopened: false as const,
    boundedGovernanceFollowupJustified: false,
    sourceIdentities: Object.freeze([
      '韋千里, 韋千里命學講義, 韋氏命苑, 1936, National Library of China witness nlc:data_416,01jh000368,10155; Wikimedia Commons scan mirror',
    ]),
    observations: Object.freeze([
      'The exact NLC witness identity is now directly discoverable as a 368-page scan with the frozen NLC batch identifier.',
      'The target p.50-p.53 lineage content and local Career disclaimer are corroborated outside the exact target-page render.',
      'The exact witness target pages themselves remain not directly inspected; witness availability is not substituted for target-page binding.',
    ]),
    remainingBlockers: Object.freeze([
      'DIRECT_EXACT_1936_NLC_P50_TO_P53_INSPECTION',
      'TARGET_PAGE_LOCAL_CONTEXT_BINDING',
    ]),
  }),
  Object.freeze({
    signalClass: 'BRANCH_B41_TRIGGER_CONDITION_CHANGE' as const,
    evidenceClass: 'INDEPENDENT_PUBLISHED_BRANCH_PATH_MATERIAL_BUT_CURRENT_METHOD_COMPATIBILITY_UNESTABLISHED' as const,
    supportingEvidenceChanged: true,
    qualifyingFrozenSignalChange: true,
    frozenTriggerSatisfied: false as const,
    authorityResearchLaneReopened: false as const,
    boundedGovernanceFollowupJustified: true,
    sourceIdentities: Object.freeze([
      '李順祥, 四柱玄機：命理推斷詳解, 新疆人民出版社, 2004, ISBN 9787228087822',
      '陳澤眞, 八字命理900問, 白象文化, 2023, ISBN 9786263640641',
      '段建業 / 言明, 段氏命理職業象法新解, 時輪造化, 2020, ISBN 97898111447105',
    ]),
    observations: Object.freeze([
      'A genuinely independent 2004 published path now materially binds 正官 to responsibility/self-control semantics and discusses 正官 under 刑沖剋破 conditions in the same work.',
      'That 2004 path also makes 身強/身弱 and 喜用 or related structural conditions part of the same interpretive method, so current-method compatibility cannot be inferred by dropping them.',
      'The already authority-grade 2023 source directly binds day-branch 正官 to 責任感 and separately exposes a clash framework distinguishing 主沖/被沖, 沖帶剋/沖不剋, 用神/忌神 effects and whether mutual clash is necessarily mutually damaging; the target clash answers are not in the public sample.',
      'A 2020 formally published Career-specific alternative method explicitly rejects the traditional 日主旺衰/用神 route but replaces it with 體用/賓主, 干支類象, 十神類象, 干支關係 and 四柱局象 rather than authorizing a flat clash modifier.',
      'The new evidence materially changes the B41 independent-path condition state from source scarcity to method-compatibility evaluation, but satisfies neither frozen Branch trigger in full.',
    ]),
    remainingBlockers: Object.freeze([
      'NO_SINGLE_SOURCE_CURRENT_METHOD_COMPATIBLE_NATAL_ZHENGGUAN_CLASH_MODIFIER_PATH',
      'NO_SOURCE_AUTHORIZED_DEPENDENCY_DROPPING',
      '2023_TARGET_CLASH_ANSWER_BODY_NOT_ACQUIRED',
      '2015_EXACT_PRINTED_TARGET_PASSAGE_STILL_UNBOUND',
    ]),
  }),
  Object.freeze({
    signalClass: 'FAMILY_B43_TRIGGER_CONDITION_CHANGE' as const,
    evidenceClass: 'FAMILY_TARGET_LOCATORS_EXPANDED_TARGET_NORMATIVE_BODY_STILL_MISSING' as const,
    supportingEvidenceChanged: true,
    qualifyingFrozenSignalChange: false,
    frozenTriggerSatisfied: false as const,
    authorityResearchLaneReopened: false as const,
    boundedGovernanceFollowupJustified: false,
    sourceIdentities: Object.freeze([
      '周雨薇 / 李品心 / 江幸芬 / 黃冠寰, 職場八字識人術, 深思文化, 2017, ISBN 9789863185468',
      '十神闡微, 2015 published-edition lineage, ISBN 9789881412041',
    ]),
    observations: Object.freeze([
      'The 2017 Career source now has tighter printed locators for relation chapters and an official publisher preview surface.',
      'The official preview still does not include the target relation normative body or relation-specific limits.',
      'The 2015 same-work path still lacks exact printed-edition target-passage binding and still carries mandatory strength/transformation dependencies not consumed by the current Career method.',
    ]),
    remainingBlockers: Object.freeze([
      '2017_TARGET_RELATION_NORMATIVE_BODY',
      '2017_RELATION_SPECIFIC_LIMITS',
      '2015_EXACT_PRINTED_TARGET_PASSAGE',
      'CURRENT_METHOD_COMPATIBILITY_FOR_SOURCE_MANDATORY_DIMENSIONS',
    ]),
  }),
  Object.freeze({
    signalClass: 'VISIBILITY_GOVERNED_METHOD_SCOPE_CHANGE' as const,
    evidenceClass: 'NO_GOVERNED_METHOD_SCOPE_CHANGE' as const,
    supportingEvidenceChanged: false,
    qualifyingFrozenSignalChange: false,
    frozenTriggerSatisfied: false as const,
    authorityResearchLaneReopened: false as const,
    boundedGovernanceFollowupJustified: false,
    sourceIdentities: Object.freeze([]),
    observations: Object.freeze([
      'No governed Career methodology change authorizes visibility as a consumed dimension.',
    ]),
    remainingBlockers: Object.freeze(['GOVERNED_METHOD_SCOPE_CHANGE_REQUIRED']),
  }),
  Object.freeze({
    signalClass: 'PLURALITY_I254_GOVERNANCE_RELEASE' as const,
    evidenceClass: 'I254_HOLD_UNCHANGED' as const,
    supportingEvidenceChanged: false,
    qualifyingFrozenSignalChange: false,
    frozenTriggerSatisfied: false as const,
    authorityResearchLaneReopened: false as const,
    boundedGovernanceFollowupJustified: false,
    sourceIdentities: Object.freeze([]),
    observations: Object.freeze(['The I254 plurality governance hold remains unchanged.']),
    remainingBlockers: Object.freeze(['I254_GOVERNANCE_RELEASE_REQUIRED']),
  }),
  Object.freeze({
    signalClass: 'SEASONAL_GOVERNED_METHOD_SCOPE_CHANGE' as const,
    evidenceClass: 'NO_GOVERNED_METHOD_SCOPE_CHANGE' as const,
    supportingEvidenceChanged: false,
    qualifyingFrozenSignalChange: false,
    frozenTriggerSatisfied: false as const,
    authorityResearchLaneReopened: false as const,
    boundedGovernanceFollowupJustified: false,
    sourceIdentities: Object.freeze([]),
    observations: Object.freeze([
      'No governed Career methodology change authorizes seasonal phase as a consumed dimension.',
    ]),
    remainingBlockers: Object.freeze(['GOVERNED_METHOD_SCOPE_CHANGE_REQUIRED']),
  }),
  Object.freeze({
    signalClass: 'UPSTREAM_AUTHORITY_SUFFICIENCY_FOR_PACK_LEVEL_CONFLICT_REVIEW' as const,
    evidenceClass: 'PACK_LEVEL_PRECONDITION_UNCHANGED' as const,
    supportingEvidenceChanged: false,
    qualifyingFrozenSignalChange: false,
    frozenTriggerSatisfied: false as const,
    authorityResearchLaneReopened: false as const,
    boundedGovernanceFollowupJustified: false,
    sourceIdentities: Object.freeze([]),
    observations: Object.freeze([
      'No upstream authority sufficiency change makes pack-level multi-pattern conflict composition review executable.',
    ]),
    remainingBlockers: Object.freeze(['SUFFICIENT_UPSTREAM_AUTHORITY_REQUIRED']),
  }),
] as const satisfies readonly CareerT8B45ReopenSignalEvidenceRecord[]);

export const CAREER_T8_B45_REOPEN_TRIGGER_ACTIVATION_CONTROL_IDS = Object.freeze([
  'B45_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B44_GLOBAL_RESEARCH_HOLD_BOUNDARY',
  'ALL_EIGHT_B44_REOPEN_SIGNAL_CLASSES_ARE_RECONCILED_EXACTLY_ONCE',
  'NEW_BRANCH_EVIDENCE_IS_A_MATERIAL_B41_TRIGGER_CONDITION_CHANGE_BUT_DOES_NOT_SATISFY_EITHER_FROZEN_BRANCH_TRIGGER',
  'THE_2004_INDEPENDENT_PUBLISHED_PATH_MAY_NOT_DROP_STRENGTH_XIJI_OR_OTHER_SOURCE_METHOD_DEPENDENCIES_TO_FORCE_CURRENT_METHOD_COMPATIBILITY',
  'THE_2023_AUTHORITY_GRADE_POSITION_SOURCE_PRESERVES_ITS_ADMITTED_COMPONENT_BUT_TOC_LEVEL_CLASH_STRUCTURE_IS_NOT_SUBSTITUTED_FOR_TARGET_NORMATIVE_ANSWERS',
  'THE_2020_ALTERNATE_CAREER_METHOD_IS_A_CROSS_METHODOLOGY_NEGATIVE_CONTROL_NOT_A_SOURCE_STITCHING_DONOR',
  'THE_QIANLI_EXACT_WITNESS_SURFACE_CHANGE_IS_RECORDED_WITHOUT_PRETENDING_EXACT_P50_TO_P53_TARGET_PAGE_BINDING',
  'THE_QIN_P464_LOCATOR_AND_METHOD_CONTEXT_CHANGE_IS_RECORDED_WITHOUT_PRETENDING_DIRECT_P464_NORMATIVE_BODY_ACQUISITION',
  'FAMILY_SUPPORTING_SURFACES_CHANGED_BUT_NONE_OF_THE_THREE_B43_TRIGGER_CONTRACTS_IS_SATISFIED',
  'ZERO_AUTHORITY_RESEARCH_LANES_REOPEN_AND_ZERO_AUTHORITY_COMPONENTS_ARE_ADMITTED_BY_THIS_GATE',
  'ONE_BOUNDED_GOVERNANCE_RECONCILIATION_GATE_IS_EXECUTABLE_TO_CLASSIFY_THE_BRANCH_METHOD_COMPATIBILITY_BOTTLENECK_WITHOUT_MUTATING_METHOD_SCOPE',
  'BROAD_SEARCH_RESTART_REPEATED_UNCHANGED_SURFACE_SEARCH_AND_CROSS_SOURCE_REQUIREMENT_STITCHING_REMAIN_PROHIBITED',
  'ALL_SIX_HISTORICAL_T8_SYNTHESIS_AUTHORITY_GAPS_REMAIN_FORMALLY_OPEN',
  'NO_T5_T6_T8_RULE_CLAIM_TYPE_PACK_NARRATIVE_PREVIEW_DEFAULT_SWITCH_OR_PRODUCTION_PROMOTION_IS_AUTHORIZED',
] as const);

export interface CareerPersonalizationT8ResearchReopenTriggerActivationEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof CAREER_PERSONALIZATION_T8_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_CAREER_PERSONALIZATION_T8_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE'
    | 'UPSTREAM_B44_BOUNDARY_INVALID';
  decision:
    | 'ONE_BRANCH_SIGNAL_MATERIALLY_CHANGED_ZERO_FROZEN_TRIGGERS_SATISFIED_AUTHORITY_RESEARCH_HOLD_PRESERVED_ONE_BOUNDED_METHODOLOGY_RECONCILIATION_GATE_EXECUTABLE'
    | 'RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE_NOT_ESTABLISHED';
  upstreamB44ReviewId: string;
  exactB44BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  evidenceRecords: readonly CareerT8B45ReopenSignalEvidenceRecord[];
  evidenceRecordCount: number;
  supportingEvidenceChangedSignalCount: number;
  qualifyingFrozenSignalChangeCount: number;
  qualifyingFrozenSignalClasses: readonly CareerT8B45SignalClass[];
  frozenTriggerSatisfiedCount: 0;
  authorityResearchLaneReopenedCount: 0;
  boundedGovernanceGateExecutableCount: 1 | 0;
  branchB41SignalMateriallyChanged: boolean;
  branch2015TriggerSatisfied: false;
  branchIndependentCompletePathTriggerSatisfied: false;
  branchCurrentMethodCompatibilityEstablished: false;
  qinP464DirectBodyAcquired: false;
  qianli1936P50ToP53ExactPagesBound: false;
  familyB43AnyTriggerSatisfied: false;
  currentMethodScopeMutationAuthorized: false;
  sourceMandatoryDependencyDroppingAuthorized: false;
  globalAuthorityResearchHoldPreserved: boolean;
  broadSearchRestartAuthorized: false;
  repeatedUnchangedSurfaceSearchAuthorized: false;
  crossSourceRequirementStitchingAuthorized: false;
  admittedBoundedAuthorityComponentCountPreserved: 1 | 0;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  authorityAdmittedByThisGate: false;
  authorityGapClosedByThisGate: false;
  t5RuleAuthoringAuthorized: false;
  t6RuleAuthoringAuthorized: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B45_REOPEN_TRIGGER_ACTIVATION_CONTROL_IDS)[number][];
  controlCount: number;
  controlsFrozen: boolean;
  selectedImmediateNextLane:
    | 'BRANCH_CLASH_CROSS_METHODOLOGY_MINIMUM_INTERACTION_DIMENSION_RECONCILIATION_REVIEW'
    | null;
  recommendedNextGate:
    | 'BRANCH_CLASH_CROSS_METHODOLOGY_MINIMUM_INTERACTION_DIMENSION_RECONCILIATION_REVIEW'
    | 'CAREER_PERSONALIZATION_T8_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE';
}

function contentAddressedB44IdentityValid(
  b44: CareerPersonalizationT8PostB43GlobalResearchHoldReviewReport,
): boolean {
  const { reviewId, ...material } = b44;
  return reviewId ===
    `career_personalization_t8_post_b43_global_research_hold_${deterministicContentHash(material).slice(0, 24)}`;
}

function exactB44Accepted(
  b44: CareerPersonalizationT8PostB43GlobalResearchHoldReviewReport,
): boolean {
  return (
    contentAddressedB44IdentityValid(b44) &&
    b44.reviewVersion === CAREER_PERSONALIZATION_T8_POST_B43_GLOBAL_RESEARCH_HOLD_REVIEW_VERSION &&
    b44.status === 'RESOLVED_CAREER_PERSONALIZATION_T8_POST_B43_GLOBAL_RESEARCH_HOLD_REVIEW' &&
    b44.decision ===
      'GLOBAL_TRIGGER_GATED_RESEARCH_HOLD_ZERO_EXECUTABLE_LANES_RESUME_ONLY_ON_EXPLICIT_EVIDENCE_OR_GOVERNED_METHOD_CHANGE' &&
    b44.exactB43BoundaryAccepted &&
    b44.domain === 'career' &&
    b44.temporalScope === 'natal' &&
    b44.statusClass === 'research' &&
    b44.globalResearchHoldActive &&
    deterministicContentHash(b44.frontierRecords) === deterministicContentHash(CAREER_T8_B44_GLOBAL_RESEARCH_FRONTIER_RECORDS) &&
    b44.frontierRecordCount === 9 &&
    deterministicContentHash(b44.globalReopenSignalClasses) === deterministicContentHash(CAREER_T8_B44_GLOBAL_REOPEN_SIGNAL_CLASSES) &&
    b44.globalReopenSignalClassCount === 8 &&
    b44.admittedBoundedAuthorityComponentCountPreserved === 1 &&
    b44.branchTriggerContractCountPreserved === 2 &&
    b44.branchSatisfiedTriggerCount === 0 &&
    b44.familyTriggerContractCountPreserved === 3 &&
    b44.familySatisfiedTriggerCount === 0 &&
    b44.externalEvidenceSurfaceHoldCount === 2 &&
    b44.unconsumedDimensionCount === 3 &&
    b44.packLevelDeferredLaneCount === 1 &&
    b44.immediatelyExecutableAuthorityAdmissionLaneCount === 0 &&
    b44.immediatelyExecutableExistingSurfaceResearchLaneCount === 0 &&
    b44.boundedGovernanceGateExecutableCount === 0 &&
    b44.qinP464DirectBodyAcquired === false &&
    b44.qianli1936P50ToP53ExactPagesBound === false &&
    b44.resumeRequiresExplicitSignalChange &&
    b44.broadSearchRestartAuthorized === false &&
    b44.repeatedUnchangedSurfaceSearchAuthorized === false &&
    b44.crossSourceRequirementStitchingAuthorized === false &&
    b44.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b44.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b44.authorityAdmittedByThisGate === false &&
    b44.authorityGapClosedByThisGate === false &&
    b44.controlCount === 12 &&
    b44.controlsFrozen &&
    deterministicContentHash(b44.controlIds) === deterministicContentHash(CAREER_T8_B44_GLOBAL_RESEARCH_HOLD_CONTROL_IDS) &&
    b44.selectedImmediateNextLane === null &&
    b44.recommendedNextGate === 'CAREER_PERSONALIZATION_T8_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE' &&
    b44.productionImpact === 'NONE'
  );
}

function evidenceRecordsValid(): boolean {
  if (CAREER_T8_B45_REOPEN_SIGNAL_EVIDENCE_RECORDS.length !== CAREER_T8_B44_GLOBAL_REOPEN_SIGNAL_CLASSES.length) {
    return false;
  }

  const bySignal = new Map(
    CAREER_T8_B45_REOPEN_SIGNAL_EVIDENCE_RECORDS.map((record) => [record.signalClass, record] as const),
  );
  if (bySignal.size !== CAREER_T8_B44_GLOBAL_REOPEN_SIGNAL_CLASSES.length) {
    return false;
  }
  if (CAREER_T8_B44_GLOBAL_REOPEN_SIGNAL_CLASSES.some((signalClass) => !bySignal.has(signalClass))) {
    return false;
  }

  const branch = bySignal.get('BRANCH_B41_TRIGGER_CONDITION_CHANGE');
  const qualifying = CAREER_T8_B45_REOPEN_SIGNAL_EVIDENCE_RECORDS.filter((record) => record.qualifyingFrozenSignalChange);
  return Boolean(
    branch &&
      branch.supportingEvidenceChanged &&
      branch.qualifyingFrozenSignalChange &&
      branch.frozenTriggerSatisfied === false &&
      branch.authorityResearchLaneReopened === false &&
      branch.boundedGovernanceFollowupJustified &&
      qualifying.length === 1 &&
      qualifying[0]?.signalClass === 'BRANCH_B41_TRIGGER_CONDITION_CHANGE' &&
      CAREER_T8_B45_REOPEN_SIGNAL_EVIDENCE_RECORDS.every(
        (record) => record.frozenTriggerSatisfied === false && record.authorityResearchLaneReopened === false,
      ) &&
      CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTRACTS.length === 2 &&
      CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTRACTS.every((contract) => contract.currentlySatisfied === false)
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8ResearchReopenTriggerActivationEvidenceReport, 'evidenceId'>,
): CareerPersonalizationT8ResearchReopenTriggerActivationEvidenceReport {
  return {
    evidenceId: `career_personalization_t8_research_reopen_trigger_activation_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8ResearchReopenTriggerActivationEvidence(
  b44: CareerPersonalizationT8PostB43GlobalResearchHoldReviewReport,
): CareerPersonalizationT8ResearchReopenTriggerActivationEvidenceReport {
  const accepted = exactB44Accepted(b44) && evidenceRecordsValid();
  const qualifyingSignalClasses = accepted
    ? Object.freeze(
        CAREER_T8_B45_REOPEN_SIGNAL_EVIDENCE_RECORDS.filter((record) => record.qualifyingFrozenSignalChange).map(
          (record) => record.signalClass,
        ),
      )
    : Object.freeze([] as CareerT8B45SignalClass[]);

  return finalized({
    evidenceVersion: CAREER_PERSONALIZATION_T8_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_PERSONALIZATION_T8_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE'
      : 'UPSTREAM_B44_BOUNDARY_INVALID',
    decision: accepted
      ? 'ONE_BRANCH_SIGNAL_MATERIALLY_CHANGED_ZERO_FROZEN_TRIGGERS_SATISFIED_AUTHORITY_RESEARCH_HOLD_PRESERVED_ONE_BOUNDED_METHODOLOGY_RECONCILIATION_GATE_EXECUTABLE'
      : 'RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE_NOT_ESTABLISHED',
    upstreamB44ReviewId: b44.reviewId,
    exactB44BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    evidenceRecords: accepted ? CAREER_T8_B45_REOPEN_SIGNAL_EVIDENCE_RECORDS : Object.freeze([]),
    evidenceRecordCount: accepted ? CAREER_T8_B45_REOPEN_SIGNAL_EVIDENCE_RECORDS.length : 0,
    supportingEvidenceChangedSignalCount: accepted
      ? CAREER_T8_B45_REOPEN_SIGNAL_EVIDENCE_RECORDS.filter((record) => record.supportingEvidenceChanged).length
      : 0,
    qualifyingFrozenSignalChangeCount: qualifyingSignalClasses.length,
    qualifyingFrozenSignalClasses: qualifyingSignalClasses,
    frozenTriggerSatisfiedCount: 0,
    authorityResearchLaneReopenedCount: 0,
    boundedGovernanceGateExecutableCount: accepted ? 1 : 0,
    branchB41SignalMateriallyChanged: accepted,
    branch2015TriggerSatisfied: false,
    branchIndependentCompletePathTriggerSatisfied: false,
    branchCurrentMethodCompatibilityEstablished: false,
    qinP464DirectBodyAcquired: false,
    qianli1936P50ToP53ExactPagesBound: false,
    familyB43AnyTriggerSatisfied: false,
    currentMethodScopeMutationAuthorized: false,
    sourceMandatoryDependencyDroppingAuthorized: false,
    globalAuthorityResearchHoldPreserved: accepted,
    broadSearchRestartAuthorized: false,
    repeatedUnchangedSurfaceSearchAuthorized: false,
    crossSourceRequirementStitchingAuthorized: false,
    admittedBoundedAuthorityComponentCountPreserved: accepted ? 1 : 0,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t5RuleAuthoringAuthorized: false,
    t6RuleAuthoringAuthorized: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? CAREER_T8_B45_REOPEN_TRIGGER_ACTIVATION_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? CAREER_T8_B45_REOPEN_TRIGGER_ACTIVATION_CONTROL_IDS.length : 0,
    controlsFrozen: accepted,
    selectedImmediateNextLane: accepted
      ? 'BRANCH_CLASH_CROSS_METHODOLOGY_MINIMUM_INTERACTION_DIMENSION_RECONCILIATION_REVIEW'
      : null,
    recommendedNextGate: accepted
      ? 'BRANCH_CLASH_CROSS_METHODOLOGY_MINIMUM_INTERACTION_DIMENSION_RECONCILIATION_REVIEW'
      : 'CAREER_PERSONALIZATION_T8_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE',
  });
}
