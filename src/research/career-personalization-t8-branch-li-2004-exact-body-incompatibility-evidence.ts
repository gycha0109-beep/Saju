import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE_VERSION,
  CAREER_T8_B48_AUTHORITY_TRIGGER_ACTIVATION_CONTROL_IDS,
  CAREER_T8_B48_AUTHORITY_TRIGGER_ACTIVATION_RECORDS,
  type CareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidenceReport,
} from './career-personalization-t8-branch-source-or-method-authority-trigger-activation-evidence.js';

export const CAREER_PERSONALIZATION_T8_BRANCH_LI_2004_EXACT_BODY_INCOMPATIBILITY_EVIDENCE_VERSION =
  'myeonghwa-career-personalization-t8-branch-li-2004-exact-body-incompatibility-evidence-v1' as const;

export const CAREER_T8_LI_2004_SOURCE_IDENTITY =
  '李順祥, 四柱玄機：命理推斷詳解, 新疆人民出版社, 2004, ISBN 9787228087822, 342 pages' as const;

export const CAREER_T8_LI_2004_MANDATORY_DEPENDENCY_IDS = Object.freeze([
  'seasonal_command_context',
  'whole_chart_structural_composition',
  'day_master_strength',
  'xiji_or_yongshen_context',
] as const);

export const CAREER_T8_LI_2004_EXACT_BODY_EVIDENCE = Object.freeze({
  sourceIdentity: CAREER_T8_LI_2004_SOURCE_IDENTITY,
  bibliographicCorroboration:
    'Google Books bibliographic record identifies 李順祥, 新疆人民出版社, 2004, ISBN 9787228087822, 342 pages.',
  indexedBodySurface:
    'Search-indexed document surface identifies itself as the 2004-06 first edition of 四柱玄機 and exposes chapter body text with printed-page structure.',
  facsimileScanDirectlyInspected: false as const,
  exactEditionBibliographicIdentityCorroborated: true as const,
  exactEditionIndexedBodySurfaceInspected: true as const,
  natalBranchClashMethodBodyInspected: true as const,
  tenGodAndCareerMethodMaterialInspected: true as const,
  singlePassageExactZhengguanToNatalClashBridgeEstablished: false as const,
  mandatoryDependencies: CAREER_T8_LI_2004_MANDATORY_DEPENDENCY_IDS,
  dependencyFindings: Object.freeze([
    'The natal branch-clash method treats actual clash force or damage as dependent on seasonal command and whole-chart composition rather than as a flat unary effect.',
    'The useful-god method requires day-master strength determination and classifies Ten-God favorable or unfavorable expression through xiji context.',
    'Career and Zhengguan/Guansha material remains embedded in the same strength/xiji-governed methodology rather than supplying a dependency-free current-T5 modifier path.',
  ]),
  temporalCareerExamplesUsedAsNatalAuthority: false as const,
  sourceSupportedDependencySeparabilityEstablished: false as const,
  currentCareerMethodConsumesAllMandatoryDependencies: false as const,
  currentMethodCompatibleIndependentCompletePathEstablished: false as const,
  currentMethodIncompatibilityForIndependentCompletePathEstablished: true as const,
  crossSourceStitchingUsed: false as const,
  sourceMandatoryDependencyDroppingUsed: false as const,
});

export const CAREER_T8_LI_2004_INCOMPATIBILITY_CONTROL_IDS = Object.freeze([
  'LI2004_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B48_ZERO_ACTIVATION_BOUNDARY',
  'THE_NEW_STATE_CHANGE_IS_LIMITED_TO_ACQUISITION_OF_AN_EXACT_EDITION_IDENTIFIED_INDEXED_BODY_SURFACE',
  'BIBLIOGRAPHIC_CORROBORATION_DOES_NOT_SUBSTITUTE_FOR_BODY_EVIDENCE_AND_FACSIMILE_DIRECT_INSPECTION_IS_NOT_CLAIMED',
  'THE_LI_2004_NATAL_CLASH_BODY_PRESERVES_SEASONAL_COMMAND_AND_WHOLE_CHART_COMPOSITION_DEPENDENCIES',
  'THE_LI_2004_TEN_GOD_METHOD_PRESERVES_DAY_MASTER_STRENGTH_AND_XIJI_OR_YONGSHEN_DEPENDENCIES',
  'SEPARATE_CHAPTER_MATERIAL_IS_NOT_STITCHED_INTO_A_SINGLE_PASSAGE_ZHENGGUAN_TO_NATAL_CLASH_BRIDGE',
  'TEMPORAL_CAREER_EXAMPLES_ARE_NOT_PROMOTED_TO_NATAL_AUTHORITY',
  'SOURCE_MANDATORY_DEPENDENCIES_ARE_NOT_DROPPED_TO_FORCE_CURRENT_METHOD_COMPATIBILITY',
  'LI_2004_IS_EXCLUDED_AS_A_CURRENT_METHOD_INDEPENDENT_COMPLETE_PATH_UNLESS_GOVERNED_METHOD_SCOPE_OR_EVIDENCE_CHANGES',
  'THE_B41_SOURCE_TRIGGER_REMAINS_UNSATISFIED_AND_NO_BRANCH_AUTHORITY_RESEARCH_LANE_REOPENS',
  'THE_EXACT_2015_TEN_SHEN_CHAN_WEI_PATH_AND_METHOD_SPECIFIC_UPSTREAM_AUTHORITY_HOLDS_REMAIN_UNCHANGED',
  'ALL_SIX_HISTORICAL_T8_SYNTHESIS_AUTHORITY_GAPS_REMAIN_FORMALLY_OPEN',
  'NO_T5_T6_T8_RULE_CLAIM_TYPE_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION',
  'NO_NUMERIC_WEIGHTING_FLAT_UNARY_CLASH_MODIFIER_WINNER_PRECEDENCE_OR_CROSS_METHODOLOGY_STITCHING',
] as const);

export interface CareerPersonalizationT8BranchLi2004ExactBodyIncompatibilityEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof CAREER_PERSONALIZATION_T8_BRANCH_LI_2004_EXACT_BODY_INCOMPATIBILITY_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_BRANCH_LI_2004_EXACT_BODY_INCOMPATIBILITY_EVIDENCE'
    | 'UPSTREAM_B48_BOUNDARY_INVALID';
  decision:
    | 'LI_2004_EXACT_EDITION_INDEXED_BODY_ACQUIRED_DEPENDENCIES_NOT_SEPARABLE_CURRENT_METHOD_INDEPENDENT_COMPLETE_PATH_REJECTED_BRANCH_AUTHORITY_HOLD_PRESERVED'
    | 'LI_2004_EXACT_BODY_INCOMPATIBILITY_EVIDENCE_NOT_ESTABLISHED';
  upstreamB48EvidenceId: string;
  exactB48BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  sourceEvidenceStateChangedSinceB48: boolean;
  sourceEvidence: typeof CAREER_T8_LI_2004_EXACT_BODY_EVIDENCE | null;
  sourceAcquisitionCount: 1 | 0;
  exactEditionBibliographicIdentityCorroborated: boolean;
  exactEditionIndexedBodySurfaceInspected: boolean;
  facsimileScanDirectlyInspected: false;
  natalBranchClashMethodBodyInspected: boolean;
  tenGodAndCareerMethodMaterialInspected: boolean;
  singlePassageExactZhengguanToNatalClashBridgeEstablished: false;
  mandatoryDependencyIds: readonly (typeof CAREER_T8_LI_2004_MANDATORY_DEPENDENCY_IDS)[number][];
  sourceSupportedDependencySeparabilityEstablished: false;
  currentCareerMethodConsumesAllMandatoryDependencies: false;
  currentMethodCompatibleIndependentCompletePathEstablished: false;
  currentMethodIncompatibilityForIndependentCompletePathEstablished: boolean;
  li2004IndependentCompletePathCandidateExcludedUnderCurrentMethod: boolean;
  exact2015PrintedTargetPassageBindingEstablished: false;
  methodSpecificUpstreamAuthorityEstablished: false;
  sourceSpecificDependencySeparabilityOrCompletePathTriggerActivated: false;
  methodSpecificInputContractAndUpstreamAuthorityTriggerActivated: false;
  qualifyingAuthorityTriggerActivationCount: 0;
  authorityResearchLaneReopenedCount: 0;
  immediatelyExecutableAuthorityAdmissionLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane: null;
  crossSourceStitchingAuthorized: false;
  sourceMandatoryDependencyDroppingAuthorized: false;
  broadUnchangedSurfaceSearchRestartAuthorized: false;
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
  controlIds: readonly (typeof CAREER_T8_LI_2004_INCOMPATIBILITY_CONTROL_IDS)[number][];
  controlCount: 14 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    sourceAcquisitionsPerformed: 1 | 0;
    sourcePathsExcludedAsCurrentMethodCompletePath: 1 | 0;
    authorityTriggersActivated: 0;
    authorityResearchLanesReopened: 0;
    authorityCandidatesAdmitted: 0;
    authorityGapsClosed: 0;
    methodologyDefinitionsCreated: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE'
    | 'BRANCH_LI_2004_EXACT_BODY_INCOMPATIBILITY_EVIDENCE';
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
    b48.evidenceVersion === CAREER_PERSONALIZATION_T8_BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE_VERSION &&
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
    b48.methodologyRequiredInputCoverageValidationTriggerRemainsClosed &&
    b48.exact2015PrintedTargetPassageBindingEstablished === false &&
    b48.independentSingleSourceCompletePathEstablished === false &&
    b48.sourceSpecificDependencySeparabilityEstablished === false &&
    b48.methodSpecificUpstreamAuthorityEstablished === false &&
    b48.authorityResearchLaneReopenedCount === 0 &&
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

function evidenceBoundaryValid(): boolean {
  const evidence = CAREER_T8_LI_2004_EXACT_BODY_EVIDENCE;
  return (
    evidence.exactEditionBibliographicIdentityCorroborated &&
    evidence.exactEditionIndexedBodySurfaceInspected &&
    evidence.facsimileScanDirectlyInspected === false &&
    evidence.natalBranchClashMethodBodyInspected &&
    evidence.tenGodAndCareerMethodMaterialInspected &&
    evidence.singlePassageExactZhengguanToNatalClashBridgeEstablished === false &&
    evidence.mandatoryDependencies.length === 4 &&
    evidence.sourceSupportedDependencySeparabilityEstablished === false &&
    evidence.currentCareerMethodConsumesAllMandatoryDependencies === false &&
    evidence.currentMethodCompatibleIndependentCompletePathEstablished === false &&
    evidence.currentMethodIncompatibilityForIndependentCompletePathEstablished &&
    evidence.temporalCareerExamplesUsedAsNatalAuthority === false &&
    evidence.crossSourceStitchingUsed === false &&
    evidence.sourceMandatoryDependencyDroppingUsed === false
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8BranchLi2004ExactBodyIncompatibilityEvidenceReport, 'evidenceId'>,
): CareerPersonalizationT8BranchLi2004ExactBodyIncompatibilityEvidenceReport {
  return {
    evidenceId: `career_personalization_t8_branch_li_2004_exact_body_incompatibility_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8BranchLi2004ExactBodyIncompatibilityEvidence(
  b48: CareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidenceReport,
): CareerPersonalizationT8BranchLi2004ExactBodyIncompatibilityEvidenceReport {
  const accepted = exactB48Accepted(b48) && evidenceBoundaryValid();

  return finalized({
    evidenceVersion: CAREER_PERSONALIZATION_T8_BRANCH_LI_2004_EXACT_BODY_INCOMPATIBILITY_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_BRANCH_LI_2004_EXACT_BODY_INCOMPATIBILITY_EVIDENCE'
      : 'UPSTREAM_B48_BOUNDARY_INVALID',
    decision: accepted
      ? 'LI_2004_EXACT_EDITION_INDEXED_BODY_ACQUIRED_DEPENDENCIES_NOT_SEPARABLE_CURRENT_METHOD_INDEPENDENT_COMPLETE_PATH_REJECTED_BRANCH_AUTHORITY_HOLD_PRESERVED'
      : 'LI_2004_EXACT_BODY_INCOMPATIBILITY_EVIDENCE_NOT_ESTABLISHED',
    upstreamB48EvidenceId: b48.evidenceId,
    exactB48BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    sourceEvidenceStateChangedSinceB48: accepted,
    sourceEvidence: accepted ? CAREER_T8_LI_2004_EXACT_BODY_EVIDENCE : null,
    sourceAcquisitionCount: accepted ? 1 : 0,
    exactEditionBibliographicIdentityCorroborated: accepted,
    exactEditionIndexedBodySurfaceInspected: accepted,
    facsimileScanDirectlyInspected: false,
    natalBranchClashMethodBodyInspected: accepted,
    tenGodAndCareerMethodMaterialInspected: accepted,
    singlePassageExactZhengguanToNatalClashBridgeEstablished: false,
    mandatoryDependencyIds: accepted ? CAREER_T8_LI_2004_MANDATORY_DEPENDENCY_IDS : Object.freeze([]),
    sourceSupportedDependencySeparabilityEstablished: false,
    currentCareerMethodConsumesAllMandatoryDependencies: false,
    currentMethodCompatibleIndependentCompletePathEstablished: false,
    currentMethodIncompatibilityForIndependentCompletePathEstablished: accepted,
    li2004IndependentCompletePathCandidateExcludedUnderCurrentMethod: accepted,
    exact2015PrintedTargetPassageBindingEstablished: false,
    methodSpecificUpstreamAuthorityEstablished: false,
    sourceSpecificDependencySeparabilityOrCompletePathTriggerActivated: false,
    methodSpecificInputContractAndUpstreamAuthorityTriggerActivated: false,
    qualifyingAuthorityTriggerActivationCount: 0,
    authorityResearchLaneReopenedCount: 0,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane: null,
    crossSourceStitchingAuthorized: false,
    sourceMandatoryDependencyDroppingAuthorized: false,
    broadUnchangedSurfaceSearchRestartAuthorized: false,
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
    controlIds: accepted ? CAREER_T8_LI_2004_INCOMPATIBILITY_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 14 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      sourceAcquisitionsPerformed: accepted ? 1 : 0,
      sourcePathsExcludedAsCurrentMethodCompletePath: accepted ? 1 : 0,
      authorityTriggersActivated: 0,
      authorityResearchLanesReopened: 0,
      authorityCandidatesAdmitted: 0,
      authorityGapsClosed: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE'
      : 'BRANCH_LI_2004_EXACT_BODY_INCOMPATIBILITY_EVIDENCE',
  });
}
