import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE_VERSION,
  CAREER_T8_B48_AUTHORITY_TRIGGER_ACTIVATION_CONTROL_IDS,
  CAREER_T8_B48_AUTHORITY_TRIGGER_ACTIVATION_RECORDS,
  type CareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidenceReport,
} from './career-personalization-t8-branch-source-or-method-authority-trigger-activation-evidence.js';

export const CAREER_PERSONALIZATION_T8_BRANCH_SOURCE_SIGNAL_CHANGE_RECHECK_EVIDENCE_VERSION =
  'myeonghwa-career-personalization-t8-branch-source-signal-change-recheck-evidence-v1' as const;

export const CAREER_T8_B49_LU_ZHIJI_BRANCH_NEGATIVE_COMPATIBILITY_EVIDENCE = Object.freeze({
  sourceIdentity:
    '陸致極, 八字命理學基礎教程, 圓方出版社, Hong Kong, 2016-05 first printing, ISBN 9789621459978',
  sourceLocator:
    'printed pp.147-149, 第七章 格局述要 / 正官格; directly inspected scan-text surface whose front matter binds the same publisher, 2016-05 first printing and ISBN 978-962-14-5997-8',
  sourceBodyDirectlyInspected: true as const,
  exactPublicationIdentityBoundFromInspectedSurface: true as const,
  independentPublishedSourcePath: true as const,
  natalScopeConfirmed: true as const,
  exactTenGod: '正官' as const,
  governedCurrentT5SemanticKey: 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY' as const,
  governedCurrentT5Facet: 'formal_responsibility' as const,
  currentT5SemanticCorrespondenceMaterial: true as const,
  semanticEvidence: Object.freeze([
    '正官格 is described through discipline, self-restraint, rule-following, management/leadership aptitude and carrying out superior instructions.',
    'The same local section treats 正官 as a form of 約束 and explicitly differentiates beneficial versus excessive constraint by day-master strength.',
  ] as const),
  natalBranchClashConditionObserved: true as const,
  qualitativeDamageObserved: true as const,
  sourceQualitativeEffectClass: 'PATTERN_ROOT_DAMAGED_OR_BROKEN' as const,
  interactionEvidence: Object.freeze([
    'The local 正官格 section says the month-command branch is the 正官格 root.',
    'If that month-command branch meets 刑/沖/破/害 from another branch, the source says the 正官 root is harmed and the pattern becomes 破格.',
  ] as const),
  explicitDayMasterStrengthDependencyObserved: true as const,
  explicitPatternDependencyObserved: true as const,
  explicitMonthCommandRootDependencyObserved: true as const,
  currentMethodCompatibilityEstablished: false as const,
  sourceSpecificDependencySeparabilityEstablished: false as const,
  independentCompletePathEstablished: false as const,
  qualifyingAuthorityTriggerActivationObserved: false as const,
  authorityAdmissionReady: false as const,
  negativeCompatibilityControl: true as const,
  evidenceNote:
    'This is a genuinely new independent published body surface relative to B47/B48 and materially strengthens the Branch research inventory. It does not satisfy the frozen complete-path trigger because the same local source makes 正官格 interpretation depend on day-master strength, pattern formation and month-command root conditions. Those dependencies cannot be silently dropped or translated into the governed flat Career T5 modifier. The proper result is new evidence with zero authority activation.',
});

export const CAREER_T8_B49_SOURCE_SIGNAL_RECHECK_CONTROL_IDS = Object.freeze([
  'B49_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B48_ZERO_ACTIVATION_BOUNDARY',
  'ONE_GENUINELY_NEW_INDEPENDENT_PUBLISHED_BRANCH_SOURCE_BODY_IS_RECORDED_AS_AN_EVIDENCE_STATE_CHANGE',
  'THE_NEW_SOURCE_SELF_BINDS_ITS_PUBLICATION_IDENTITY_AND_LOCAL_ZHENGGUAN_BODY_CONTEXT',
  'THE_NEW_SOURCE_MATERIALLY_CONNECTS_ZHENGGUAN_FORMAL_DISCIPLINE_SEMANTICS_AND_A_NATAL_BRANCH_CLASH_CONDITION',
  'THE_NEW_SOURCE_LOCAL_CONTEXT_EXPLICITLY_REQUIRES_DAY_MASTER_STRENGTH_PATTERN_AND_MONTH_COMMAND_ROOT_REASONING',
  'SOURCE_MANDATORY_STRENGTH_PATTERN_OR_ROOT_DEPENDENCIES_ARE_NOT_DROPPED_TO_FORCE_CURRENT_METHOD_COMPATIBILITY',
  'THE_NEW_SOURCE_IS_A_NEGATIVE_COMPATIBILITY_CONTROL_NOT_AN_INDEPENDENT_COMPLETE_CURRENT_METHOD_PATH',
  'ZERO_B48_OPEN_AUTHORITY_TRIGGERS_BECOME_SATISFIED_AND_ZERO_AUTHORITY_RESEARCH_LANES_REOPEN',
  'NO_FLAT_UNARY_BRANCH_CLASH_MODIFIER_OR_GOVERNED_QUALITATIVE_T5_EFFECT_IS_AUTHORED_FROM_PATTERN_LEVEL_DAMAGE',
  'NO_CROSS_SOURCE_OR_CROSS_METHODOLOGY_STITCHING_IS_AUTHORIZED',
  'ALL_SIX_HISTORICAL_T8_SYNTHESIS_AUTHORITY_GAPS_REMAIN_FORMALLY_OPEN',
  'NO_T5_T6_T8_RULE_CLAIM_TYPE_PACK_NARRATIVE_PREVIEW_DEFAULT_OR_PRODUCTION_PROMOTION',
  'FUTURE_RECHECK_REQUIRES_ANOTHER_MATERIAL_SOURCE_OR_METHOD_AUTHORITY_SIGNAL_CHANGE',
] as const);

export interface CareerPersonalizationT8BranchSourceSignalChangeRecheckEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof CAREER_PERSONALIZATION_T8_BRANCH_SOURCE_SIGNAL_CHANGE_RECHECK_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_BRANCH_SOURCE_SIGNAL_CHANGE_RECHECK_EVIDENCE'
    | 'UPSTREAM_B48_BOUNDARY_INVALID';
  decision:
    | 'ONE_NEW_INDEPENDENT_PUBLISHED_SOURCE_BODY_ACQUIRED_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS_CURRENT_METHOD_INCOMPATIBILITY_PRESERVED'
    | 'BRANCH_SOURCE_SIGNAL_CHANGE_RECHECK_NOT_ESTABLISHED';
  upstreamB48EvidenceId: string;
  exactB48BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  sourceEvidenceStateChangedSinceB48: boolean;
  newPublishedSourceBodyCount: 1 | 0;
  newSourceEvidence: typeof CAREER_T8_B49_LU_ZHIJI_BRANCH_NEGATIVE_COMPATIBILITY_EVIDENCE | null;
  sourceSpecificDependencySeparabilityOrCompletePathTriggerActivated: false;
  methodSpecificInputContractAndUpstreamAuthorityTriggerActivated: false;
  satisfiedOpenAuthorityTriggerCount: 0;
  qualifyingActivationCount: 0;
  authorityResearchLaneReopenedCount: 0;
  immediatelyExecutableAuthorityAdmissionLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane: null;
  independentSingleSourceCompletePathEstablished: false;
  sourceSpecificDependencySeparabilityEstablished: false;
  currentMethodCompatibilityEstablished: false;
  branchAuthorityHoldActive: boolean;
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
  controlIds: readonly (typeof CAREER_T8_B49_SOURCE_SIGNAL_RECHECK_CONTROL_IDS)[number][];
  controlCount: 13 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    sourceEvidenceChangesRecorded: 1 | 0;
    newPublishedSourceBodiesInspected: 1 | 0;
    authorityTriggersActivated: 0;
    authorityResearchLanesReopened: 0;
    methodologyDefinitionsCreated: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'BRANCH_SOURCE_SIGNAL_CHANGE_RECHECK_EVIDENCE'
    | 'BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE';
}

function contentAddressedB48IdentityValid(
  b48: CareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidenceReport,
): boolean {
  const { evidenceId, ...material } = b48;
  return (
    evidenceId ===
    `career_personalization_t8_branch_source_or_method_authority_trigger_activation_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB48Accepted(
  b48: CareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidenceReport,
): boolean {
  return (
    contentAddressedB48IdentityValid(b48) &&
    b48.evidenceVersion ===
      CAREER_PERSONALIZATION_T8_BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE_VERSION &&
    b48.status === 'RESOLVED_BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE' &&
    b48.decision === 'ZERO_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATIONS_BRANCH_AUTHORITY_HOLD_PRESERVED' &&
    b48.exactB47BoundaryAccepted &&
    b48.domain === 'career' &&
    b48.temporalScope === 'natal' &&
    b48.statusClass === 'research' &&
    b48.activationRecordCount === 2 &&
    deterministicContentHash(b48.activationRecords) ===
      deterministicContentHash(CAREER_T8_B48_AUTHORITY_TRIGGER_ACTIVATION_RECORDS) &&
    b48.evidenceStateChangedTriggerCount === 0 &&
    b48.qualifyingActivationCount === 0 &&
    b48.satisfiedOpenAuthorityTriggerCount === 0 &&
    b48.sourceSpecificDependencySeparabilityOrCompletePathTriggerActivated === false &&
    b48.methodSpecificInputContractAndUpstreamAuthorityTriggerActivated === false &&
    b48.authorityResearchLaneReopenedCount === 0 &&
    b48.immediatelyExecutableAuthorityAdmissionLaneCount === 0 &&
    b48.immediatelyExecutableSemanticRuleLaneCount === 0 &&
    b48.selectedImmediateNextLane === null &&
    b48.branchAuthorityHoldActive &&
    b48.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b48.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b48.authorityAdmittedByThisGate === false &&
    b48.authorityGapClosedByThisGate === false &&
    b48.controlCount === 14 &&
    b48.controlsFrozen &&
    deterministicContentHash(b48.controlIds) ===
      deterministicContentHash(CAREER_T8_B48_AUTHORITY_TRIGGER_ACTIVATION_CONTROL_IDS) &&
    b48.productionImpact === 'NONE' &&
    b48.recommendedNextGate === 'BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE'
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8BranchSourceSignalChangeRecheckEvidenceReport, 'evidenceId'>,
): CareerPersonalizationT8BranchSourceSignalChangeRecheckEvidenceReport {
  return {
    evidenceId: `career_personalization_t8_branch_source_signal_change_recheck_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8BranchSourceSignalChangeRecheckEvidence(
  b48: CareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidenceReport,
): CareerPersonalizationT8BranchSourceSignalChangeRecheckEvidenceReport {
  const accepted = exactB48Accepted(b48);

  return finalized({
    evidenceVersion: CAREER_PERSONALIZATION_T8_BRANCH_SOURCE_SIGNAL_CHANGE_RECHECK_EVIDENCE_VERSION,
    status: accepted ? 'RESOLVED_BRANCH_SOURCE_SIGNAL_CHANGE_RECHECK_EVIDENCE' : 'UPSTREAM_B48_BOUNDARY_INVALID',
    decision: accepted
      ? 'ONE_NEW_INDEPENDENT_PUBLISHED_SOURCE_BODY_ACQUIRED_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS_CURRENT_METHOD_INCOMPATIBILITY_PRESERVED'
      : 'BRANCH_SOURCE_SIGNAL_CHANGE_RECHECK_NOT_ESTABLISHED',
    upstreamB48EvidenceId: b48.evidenceId,
    exactB48BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    sourceEvidenceStateChangedSinceB48: accepted,
    newPublishedSourceBodyCount: accepted ? 1 : 0,
    newSourceEvidence: accepted ? CAREER_T8_B49_LU_ZHIJI_BRANCH_NEGATIVE_COMPATIBILITY_EVIDENCE : null,
    sourceSpecificDependencySeparabilityOrCompletePathTriggerActivated: false,
    methodSpecificInputContractAndUpstreamAuthorityTriggerActivated: false,
    satisfiedOpenAuthorityTriggerCount: 0,
    qualifyingActivationCount: 0,
    authorityResearchLaneReopenedCount: 0,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane: null,
    independentSingleSourceCompletePathEstablished: false,
    sourceSpecificDependencySeparabilityEstablished: false,
    currentMethodCompatibilityEstablished: false,
    branchAuthorityHoldActive: accepted,
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
    controlIds: accepted ? CAREER_T8_B49_SOURCE_SIGNAL_RECHECK_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 13 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      sourceEvidenceChangesRecorded: accepted ? 1 : 0,
      newPublishedSourceBodiesInspected: accepted ? 1 : 0,
      authorityTriggersActivated: 0,
      authorityResearchLanesReopened: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'BRANCH_SOURCE_SIGNAL_CHANGE_RECHECK_EVIDENCE'
      : 'BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE',
  });
}
