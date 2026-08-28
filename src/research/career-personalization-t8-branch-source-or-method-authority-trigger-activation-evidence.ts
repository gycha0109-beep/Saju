import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW_VERSION,
  CAREER_T8_B47_AUDITED_BASE_MAIN_COMMIT,
  CAREER_T8_B47_CONTROL_IDS,
  CAREER_T8_B47_REMEDIATION_TRIGGER_RECORDS,
  CAREER_T8_B47_TARGETED_SOURCE_RECHECK,
  type CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport,
} from './career-personalization-t8-branch-trigger-gated-post-p0-remediation-review.js';

export const CAREER_PERSONALIZATION_T8_BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE_VERSION =
  'myeonghwa-career-personalization-t8-branch-source-or-method-authority-trigger-activation-evidence-v1' as const;

export type CareerT8B48OpenAuthorityTriggerId =
  | 'BRANCH_SOURCE_SPECIFIC_DEPENDENCY_SEPARABILITY_OR_COMPLETE_PATH_TRIGGER'
  | 'BRANCH_METHOD_SPECIFIC_INPUT_CONTRACT_AND_UPSTREAM_AUTHORITY_TRIGGER';

export interface CareerT8B48AuthorityTriggerActivationRecord {
  triggerId: CareerT8B48OpenAuthorityTriggerId;
  upstreamState: 'OPEN_AUTHORITY_EVIDENCE' | 'OPEN_METHOD_AUTHORITY';
  evidenceStateChangedSinceB47: false;
  qualifyingActivationObserved: false;
  triggerSatisfied: false;
  authorityResearchLaneReopened: false;
  semanticRuleLaneAuthorized: false;
  evidenceBasis: readonly string[];
  blockingConditions: readonly string[];
}

export const CAREER_T8_B48_AUTHORITY_TRIGGER_ACTIVATION_RECORDS = Object.freeze([
  Object.freeze({
    triggerId: 'BRANCH_SOURCE_SPECIFIC_DEPENDENCY_SEPARABILITY_OR_COMPLETE_PATH_TRIGGER' as const,
    upstreamState: 'OPEN_AUTHORITY_EVIDENCE' as const,
    evidenceStateChangedSinceB47: false as const,
    qualifyingActivationObserved: false as const,
    triggerSatisfied: false as const,
    authorityResearchLaneReopened: false as const,
    semanticRuleLaneAuthorized: false as const,
    evidenceBasis: Object.freeze([
      'B47 targeted source recheck found no directly acquired exact-2015 printed target passage.',
      'B47 targeted source recheck found no independent single-source complete path.',
      'B47 established no source-specific dependency separability and no qualifying source-authority trigger activation.',
    ]),
    blockingConditions: Object.freeze([
      'DIRECT_EXACT_2015_PRINTED_TARGET_PASSAGE_OR_INDEPENDENT_COMPLETE_SINGLE_SOURCE_PATH',
      'SOURCE_SUPPORTED_DEPENDENCY_SEPARABILITY_OR_CURRENT_METHOD_COMPATIBILITY',
    ]),
  }),
  Object.freeze({
    triggerId: 'BRANCH_METHOD_SPECIFIC_INPUT_CONTRACT_AND_UPSTREAM_AUTHORITY_TRIGGER' as const,
    upstreamState: 'OPEN_METHOD_AUTHORITY' as const,
    evidenceStateChangedSinceB47: false as const,
    qualifyingActivationObserved: false as const,
    triggerSatisfied: false as const,
    authorityResearchLaneReopened: false as const,
    semanticRuleLaneAuthorized: false as const,
    evidenceBasis: Object.freeze([
      'B47 verified that the existing runtime can host method-specific input contracts.',
      'B47 verified fail-closed methodology required-input coverage after P0.',
      'B47 established no Branch method-specific upstream semantic authority; infrastructure capacity is not methodology authority.',
    ]),
    blockingConditions: Object.freeze([
      'SEPARATELY_ADMITTED_BRANCH_METHOD_SPECIFIC_UPSTREAM_AUTHORITY',
      'SOURCE_SUPPORTED_METHOD_SPECIFIC_REQUIRED_INPUT_CONTRACT_SEMANTICS',
    ]),
  }),
] as const satisfies readonly CareerT8B48AuthorityTriggerActivationRecord[]);

export const CAREER_T8_B48_AUTHORITY_TRIGGER_ACTIVATION_CONTROL_IDS = Object.freeze([
  'B48_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B47_POST_P0_REMEDIATION_BOUNDARY',
  'ONLY_THE_TWO_B47_OPEN_AUTHORITY_TRIGGERS_ARE_EVALUATED_FOR_ACTIVATION',
  'THE_P0_REQUIRED_INPUT_COVERAGE_TRIGGER_REMAINS_CLOSED_INFRASTRUCTURE_AND_IS_NOT_REOPENED',
  'NO_NEW_EXACT_2015_TARGET_PASSAGE_OR_INDEPENDENT_COMPLETE_SINGLE_SOURCE_PATH_IS_CLAIMED',
  'NO_SOURCE_SPECIFIC_DEPENDENCY_SEPARABILITY_IS_INFERRED_FROM_UNCHANGED_PARTIAL_OR_TOC_LEVEL_EVIDENCE',
  'METHOD_SPECIFIC_CONTRACT_RUNTIME_CAPACITY_DOES_NOT_SUBSTITUTE_FOR_UPSTREAM_METHOD_AUTHORITY',
  'NO_SOURCE_MANDATORY_STRENGTH_WANGSHUAI_XIJI_OR_OTHER_DEPENDENCY_MAY_BE_DROPPED_TO_FORCE_COMPATIBILITY',
  'NO_CROSS_SOURCE_OR_CROSS_METHODOLOGY_STITCHING_IS_AUTHORIZED',
  'ZERO_SOURCE_OR_METHOD_AUTHORITY_TRIGGERS_ACTIVATE_AND_ZERO_BRANCH_AUTHORITY_RESEARCH_LANES_REOPEN',
  'ZERO_SEMANTIC_RULE_LANES_AUTHORITY_ADMISSION_LANES_OR_PREVIEW_SWITCH_LANES_ARE_EXECUTABLE',
  'ALL_SIX_HISTORICAL_T8_SYNTHESIS_AUTHORITY_GAPS_REMAIN_FORMALLY_OPEN',
  'NO_FLAT_UNARY_CLASH_MODIFIER_UNIVERSAL_INTERACTION_EVALUATOR_NUMERIC_WEIGHTING_OR_WINNER_PRECEDENCE',
  'NO_T5_T6_T8_RULE_CLAIM_TYPE_PACK_NARRATIVE_OR_PRODUCTION_PROMOTION',
  'RECHECK_THIS_GATE_ONLY_AFTER_A_FROZEN_SOURCE_EVIDENCE_OR_METHOD_AUTHORITY_SIGNAL_MATERIALLY_CHANGES',
] as const);

export interface CareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof CAREER_PERSONALIZATION_T8_BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE'
    | 'UPSTREAM_B47_BOUNDARY_INVALID';
  decision:
    | 'ZERO_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATIONS_BRANCH_AUTHORITY_HOLD_PRESERVED'
    | 'BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_NOT_ESTABLISHED';
  upstreamB47ReviewId: string;
  exactB47BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  activationRecords: readonly CareerT8B48AuthorityTriggerActivationRecord[];
  activationRecordCount: 2 | 0;
  evidenceStateChangedTriggerCount: 0;
  qualifyingActivationCount: 0;
  satisfiedOpenAuthorityTriggerCount: 0;
  sourceSpecificDependencySeparabilityOrCompletePathTriggerActivated: false;
  methodSpecificInputContractAndUpstreamAuthorityTriggerActivated: false;
  methodologyRequiredInputCoverageValidationTriggerRemainsClosed: boolean;
  existingArchitectureCanHostMethodSpecificContracts: boolean;
  activeRuleSetRequiredInputCoverageValidationPresent: boolean;
  activeRuleSetRequiredInputCoverageValidationFailClosed: boolean;
  exact2015PrintedTargetPassageBindingEstablished: false;
  independentSingleSourceCompletePathEstablished: false;
  sourceSpecificDependencySeparabilityEstablished: false;
  methodSpecificUpstreamAuthorityEstablished: false;
  authorityResearchLaneReopenedCount: 0;
  immediatelyExecutableAuthorityAdmissionLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane: null;
  branchAuthorityHoldActive: boolean;
  broadUnchangedSurfaceSearchRestartAuthorized: false;
  crossSourceStitchingAuthorized: false;
  sourceMandatoryDependencyDroppingAuthorized: false;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  authorityAdmittedByThisGate: false;
  authorityGapClosedByThisGate: false;
  methodologyDefinitionCreatedByThisGate: false;
  t5RuleAuthoringAuthorized: false;
  t6RuleAuthoringAuthorized: false;
  t8RuleAuthoringAuthorized: false;
  claimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B48_AUTHORITY_TRIGGER_ACTIVATION_CONTROL_IDS)[number][];
  controlCount: 14 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    openAuthorityTriggersEvaluated: 2 | 0;
    authorityTriggersActivated: 0;
    authorityResearchLanesReopened: 0;
    sourceAcquisitionsPerformed: 0;
    methodologyDefinitionsCreated: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE'
    | 'BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW';
}

function contentAddressedB47IdentityValid(
  b47: CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport,
): boolean {
  const { reviewId, ...material } = b47;
  return (
    reviewId ===
    `career_personalization_t8_branch_trigger_gated_post_p0_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB47Accepted(
  b47: CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport,
): boolean {
  return (
    contentAddressedB47IdentityValid(b47) &&
    b47.reviewVersion === CAREER_PERSONALIZATION_T8_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW_VERSION &&
    b47.status === 'RESOLVED_BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW' &&
    b47.decision === 'ONE_INFRASTRUCTURE_TRIGGER_CLOSED_TWO_AUTHORITY_TRIGGERS_OPEN_ZERO_SEMANTIC_LANES' &&
    b47.exactB46BoundaryAccepted &&
    b47.domain === 'career' &&
    b47.temporalScope === 'natal' &&
    b47.statusClass === 'research' &&
    b47.auditedBaseMainCommit === CAREER_T8_B47_AUDITED_BASE_MAIN_COMMIT &&
    b47.repositoryAuditAccepted &&
    b47.targetedSourceRecheckPerformed &&
    b47.targetedSourceRecheckDisposition === CAREER_T8_B47_TARGETED_SOURCE_RECHECK.disposition &&
    deterministicContentHash(b47.remediationTriggerRecords) ===
      deterministicContentHash(CAREER_T8_B47_REMEDIATION_TRIGGER_RECORDS) &&
    b47.remediationTriggerCount === 3 &&
    b47.satisfiedRemediationTriggerCount === 1 &&
    b47.unsatisfiedRemediationTriggerCount === 2 &&
    b47.sourceSpecificDependencySeparabilityOrCompletePathTriggerSatisfied === false &&
    b47.methodSpecificInputContractAndUpstreamAuthorityTriggerSatisfied === false &&
    b47.methodologyRequiredInputCoverageValidationTriggerSatisfied &&
    b47.exact2015PrintedTargetPassageBindingEstablished === false &&
    b47.independentSingleSourceCompletePathEstablished === false &&
    b47.sourceSpecificDependencySeparabilityEstablished === false &&
    b47.methodSpecificUpstreamAuthorityEstablished === false &&
    b47.branch2015TriggerSatisfied === false &&
    b47.branchIndependentCompletePathTriggerSatisfied === false &&
    b47.existingArchitectureCanHostMethodSpecificContracts &&
    b47.activeRuleSetRequiredInputCoverageValidationPresent &&
    b47.activeRuleSetRequiredInputCoverageValidationFailClosed &&
    b47.methodologyDefinitionCreatedByThisGate === false &&
    b47.methodSpecificContractAuthoringAuthorized === false &&
    b47.flatUnaryClashModifierAuthorized === false &&
    b47.crossSourceStitchingAuthorized === false &&
    b47.sourceMandatoryDependencyDroppingAuthorized === false &&
    b47.immediatelyExecutableAuthorityAdmissionLaneCount === 0 &&
    b47.immediatelyExecutableSemanticRuleLaneCount === 0 &&
    b47.selectedImmediateNextLane === null &&
    b47.broadUnchangedSurfaceSearchRestartAuthorized === false &&
    b47.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b47.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b47.authorityAdmittedByThisGate === false &&
    b47.authorityGapClosedByThisGate === false &&
    b47.t5RuleAuthoringAuthorized === false &&
    b47.t6RuleAuthoringAuthorized === false &&
    b47.t8RuleAuthoringAuthorized === false &&
    b47.claimTypeCreationAuthorized === false &&
    b47.personalizedT8PackCreationAuthorized === false &&
    b47.consumerNarrativeAuthorized === false &&
    b47.previewDefaultSwitchAuthorized === false &&
    b47.productionPromotionAuthorized === false &&
    b47.productionImpact === 'NONE' &&
    b47.controlCount === 16 &&
    b47.controlsFrozen &&
    deterministicContentHash(b47.controlIds) === deterministicContentHash(CAREER_T8_B47_CONTROL_IDS) &&
    b47.recommendedNextGate === 'BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE'
  );
}

function activationRecordsValid(): boolean {
  const [source, method] = CAREER_T8_B48_AUTHORITY_TRIGGER_ACTIVATION_RECORDS;
  return (
    source?.triggerId === 'BRANCH_SOURCE_SPECIFIC_DEPENDENCY_SEPARABILITY_OR_COMPLETE_PATH_TRIGGER' &&
    source.upstreamState === 'OPEN_AUTHORITY_EVIDENCE' &&
    source.evidenceStateChangedSinceB47 === false &&
    source.qualifyingActivationObserved === false &&
    source.triggerSatisfied === false &&
    source.authorityResearchLaneReopened === false &&
    source.semanticRuleLaneAuthorized === false &&
    method?.triggerId === 'BRANCH_METHOD_SPECIFIC_INPUT_CONTRACT_AND_UPSTREAM_AUTHORITY_TRIGGER' &&
    method.upstreamState === 'OPEN_METHOD_AUTHORITY' &&
    method.evidenceStateChangedSinceB47 === false &&
    method.qualifyingActivationObserved === false &&
    method.triggerSatisfied === false &&
    method.authorityResearchLaneReopened === false &&
    method.semanticRuleLaneAuthorized === false
  );
}

function finalized(
  material: Omit<
    CareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidenceReport,
    'evidenceId'
  >,
): CareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidenceReport {
  return {
    evidenceId: `career_personalization_t8_branch_source_or_method_authority_trigger_activation_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidence(
  b47: CareerPersonalizationT8BranchTriggerGatedPostP0RemediationReviewReport,
): CareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidenceReport {
  const accepted = exactB47Accepted(b47) && activationRecordsValid();

  return finalized({
    evidenceVersion: CAREER_PERSONALIZATION_T8_BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE'
      : 'UPSTREAM_B47_BOUNDARY_INVALID',
    decision: accepted
      ? 'ZERO_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATIONS_BRANCH_AUTHORITY_HOLD_PRESERVED'
      : 'BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_NOT_ESTABLISHED',
    upstreamB47ReviewId: b47.reviewId,
    exactB47BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    activationRecords: accepted ? CAREER_T8_B48_AUTHORITY_TRIGGER_ACTIVATION_RECORDS : Object.freeze([]),
    activationRecordCount: accepted ? 2 : 0,
    evidenceStateChangedTriggerCount: 0,
    qualifyingActivationCount: 0,
    satisfiedOpenAuthorityTriggerCount: 0,
    sourceSpecificDependencySeparabilityOrCompletePathTriggerActivated: false,
    methodSpecificInputContractAndUpstreamAuthorityTriggerActivated: false,
    methodologyRequiredInputCoverageValidationTriggerRemainsClosed: accepted,
    existingArchitectureCanHostMethodSpecificContracts: accepted,
    activeRuleSetRequiredInputCoverageValidationPresent: accepted,
    activeRuleSetRequiredInputCoverageValidationFailClosed: accepted,
    exact2015PrintedTargetPassageBindingEstablished: false,
    independentSingleSourceCompletePathEstablished: false,
    sourceSpecificDependencySeparabilityEstablished: false,
    methodSpecificUpstreamAuthorityEstablished: false,
    authorityResearchLaneReopenedCount: 0,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane: null,
    branchAuthorityHoldActive: accepted,
    broadUnchangedSurfaceSearchRestartAuthorized: false,
    crossSourceStitchingAuthorized: false,
    sourceMandatoryDependencyDroppingAuthorized: false,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    methodologyDefinitionCreatedByThisGate: false,
    t5RuleAuthoringAuthorized: false,
    t6RuleAuthoringAuthorized: false,
    t8RuleAuthoringAuthorized: false,
    claimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? CAREER_T8_B48_AUTHORITY_TRIGGER_ACTIVATION_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 14 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      openAuthorityTriggersEvaluated: accepted ? 2 : 0,
      authorityTriggersActivated: 0,
      authorityResearchLanesReopened: 0,
      sourceAcquisitionsPerformed: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE'
      : 'BRANCH_TRIGGER_GATED_POST_P0_REMEDIATION_REVIEW',
  });
}
