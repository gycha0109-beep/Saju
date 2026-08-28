import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE_VERSION,
  CAREER_T8_B48_AUTHORITY_TRIGGER_ACTIVATION_CONTROL_IDS,
  CAREER_T8_B48_AUTHORITY_TRIGGER_ACTIVATION_RECORDS,
  type CareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidenceReport,
} from './career-personalization-t8-branch-source-or-method-authority-trigger-activation-evidence.js';

export const CAREER_PERSONALIZATION_T8_BRANCH_2004_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE_VERSION =
  'myeonghwa-career-personalization-t8-branch-2004-exact-edition-body-compatibility-closure-evidence-v1' as const;

export const CAREER_T8_B49_LI_SHUNXIANG_2004_EXACT_BODY_EVIDENCE = Object.freeze({
  sourceIdentity:
    '李順祥, 四柱玄機：命理推斷詳解, 新疆人民出版社, 2004-06 first edition, 342 pages, ISBN 9787228087822',
  bibliographicCorroboration: Object.freeze([
    'Google Books catalog: 李順祥, 新疆人民出版社, 2004, 342 pages, ISBN 7228087828 / 9787228087822.',
    'Books.com.tw catalog: 2004-06-01, 新疆人民出版社, 342 pages, 初版, ISBN 7228087828.',
    'Author publication record: 四柱玄機 was publicly published by 新疆人民出版社 in 2004-06.',
  ]),
  inspectedBodySurface:
    'Scribd document 744311908, titled 04-2004年06月第1版《四柱玄機》, whose scanned front matter identifies 張志春 as editor, 李順祥 as author/compiler, and 新疆人民出版社.',
  exactEditionBindingEstablished: true as const,
  targetBodyDirectlyInspected: true as const,
  exactTenGod: '정관' as const,
  currentT5SemanticKey: 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY' as const,
  currentT5Facet: 'formal_responsibility' as const,
  semanticTermsObserved: Object.freeze([
    'constraint_or_regulation',
    'self_control',
    'responsibility',
  ] as const),
  natalZhengguanClashConditionObserved: true as const,
  careerOrStatusContextObserved: true as const,
  sourceSpecificStrengthDependencyObserved: true as const,
  sourceSpecificXijiYongshenDependencyObserved: true as const,
  sourceSpecificStructuralDependencyObserved: true as const,
  sourceSpecificDependencySeparabilityEstablished: false as const,
  qualitativeAttenuationModeDirectlyEstablished: false as const,
  currentMethodCompatibilityEstablished: false as const,
  independentSingleSourceCompletePathEstablished: false as const,
  mayDropSourceDependenciesToForceCompatibility: false as const,
  mayBorrowModifierOrCompatibilityFromAnotherSource: false as const,
  disposition:
    'EXACT_EDITION_BODY_ACQUIRED_CURRENT_METHOD_INCOMPATIBLE_FOR_BOUNDED_FLAT_MODIFIER' as const,
  evidenceNotes: Object.freeze([
    'The exact first-edition body directly defines Zhengguan through regulation/self-control/responsibility semantics and separately applies natal 刑沖克破 conditions to Zhengguan.',
    'The same source makes 身强/身弱 and 喜用/用神 part of its operative interpretation method, including in Zhengguan and career/status judgments.',
    'The inspected body does not independently state the governed ATTENUATES_OR_REDUCES_EXPRESSION delta while separating it from those mandatory source-method dependencies.',
    'The source therefore improves exact-edition body coverage but closes this 2004 path negatively for the current-method flat modifier rather than activating authority.',
  ]),
} as const);

export const CAREER_T8_B49_2004_EXACT_BODY_CLOSURE_CONTROL_IDS = Object.freeze([
  'B49_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B48_ZERO_ACTIVATION_BOUNDARY',
  'THE_2004_LI_SHUNXIANG_FIRST_EDITION_IS_BOUND_BY_MATCHING_PUBLICATION_METADATA_FRONT_MATTER_AND_PAGINATION',
  'THE_EXACT_2004_BODY_IS_DIRECTLY_INSPECTED_FOR_ZHENGGUAN_SEMANTICS_NATAL_CLASH_CONDITIONS_AND_METHOD_DEPENDENCIES',
  'ZHENGGUAN_RESPONSIBILITY_SELF_CONTROL_AND_REGULATION_TERMS_ARE_PRESERVED_WITHOUT_MODERN_OCCUPATION_INVENTION',
  'NATAL_XING_CHONG_KE_PO_CONDITIONS_ARE_RECORDED_WITHOUT_INVENTING_A_UNARY_EFFECT_STRENGTH',
  'THE_SOURCE_EXPLICITLY_REQUIRES_STRENGTH_AND_XIJI_YONGSHEN_CONTEXT_SO_DEPENDENCIES_ARE_NOT_SEPARATED_FOR_CURRENT_CAREER_METHOD',
  'NO_ATTENUATES_OR_REDUCES_EXPRESSION_DELTA_IS_INFERRED_FROM_THE_MERE_ABSENCE_OF_AN_UNBROKEN_ZHENGGUAN_CONDITION',
  'THE_2004_PATH_IS_NEGATIVELY_CLOSED_AS_CURRENT_METHOD_INCOMPATIBLE_FOR_A_BOUNDED_FLAT_MODIFIER',
  'THE_2004_PATH_IS_NOT_COUNTED_AS_AN_INDEPENDENT_COMPLETE_SINGLE_SOURCE_PATH_AND_ACTIVATES_NO_B48_AUTHORITY_TRIGGER',
  'NO_SOURCE_DEPENDENCY_DROPPING_CROSS_SOURCE_STITCHING_OR_CROSS_METHODOLOGY_STITCHING_IS_AUTHORIZED',
  'THE_P0_REQUIRED_INPUT_COVERAGE_INFRASTRUCTURE_TRIGGER_REMAINS_CLOSED_AND_IS_NOT_SEMANTIC_AUTHORITY',
  'ALL_SIX_HISTORICAL_CAREER_T8_AUTHORITY_GAPS_REMAIN_FORMALLY_OPEN',
  'NO_T5_T6_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_DEFAULT_OR_PRODUCTION_PROMOTION_IS_AUTHORIZED',
  'FUTURE_BRANCH_RESEARCH_MUST_USE_A_DIFFERENT_QUALIFYING_SOURCE_SIGNAL_EXACT_2015_BODY_OR_GOVERNED_METHOD_AUTHORITY_CHANGE',
] as const);

export interface CareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof CAREER_PERSONALIZATION_T8_BRANCH_2004_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_BRANCH_2004_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE'
    | 'UPSTREAM_B48_BOUNDARY_INVALID';
  decision:
    | 'EXACT_2004_FIRST_EDITION_BODY_ACQUIRED_SOURCE_DEPENDENCIES_CONFIRMED_CURRENT_METHOD_INCOMPATIBLE_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS'
    | 'BRANCH_2004_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_NOT_ESTABLISHED';
  upstreamB48EvidenceId: string;
  exactB48BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  sourceEvidence: typeof CAREER_T8_B49_LI_SHUNXIANG_2004_EXACT_BODY_EVIDENCE | null;
  sourceEvidenceStateChangedSinceB48: boolean;
  sourceAcquisitionPerformed: boolean;
  exact2004EditionBindingEstablished: boolean;
  exact2004TargetBodyDirectlyInspected: boolean;
  exactZhengguanSemanticCorrespondenceObserved: boolean;
  natalZhengguanClashConditionObserved: boolean;
  sourceSpecificStrengthDependencyObserved: boolean;
  sourceSpecificXijiYongshenDependencyObserved: boolean;
  sourceSpecificStructuralDependencyObserved: boolean;
  sourceSpecificDependencySeparabilityEstablished: false;
  qualitativeAttenuationModeDirectlyEstablished: false;
  currentMethodCompatibilityEstablished: false;
  currentMethodIncompatibilityForFlatModifierEstablished: boolean;
  independentSingleSourceCompletePathEstablished: false;
  sourceSpecificDependencySeparabilityOrCompletePathTriggerActivated: false;
  methodSpecificInputContractAndUpstreamAuthorityTriggerActivated: false;
  satisfiedOpenAuthorityTriggerCount: 0;
  authorityResearchLaneReopenedCount: 0;
  immediatelyExecutableAuthorityAdmissionLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane: null;
  branchAuthorityHoldActive: boolean;
  exact2015PrintedTargetPassageBindingEstablished: false;
  methodSpecificUpstreamAuthorityEstablished: false;
  broadUnchangedSurfaceSearchRestartAuthorized: false;
  repeat2004PathSearchAuthorized: false;
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
  controlIds: readonly (typeof CAREER_T8_B49_2004_EXACT_BODY_CLOSURE_CONTROL_IDS)[number][];
  controlCount: 14 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    exactEditionSourceBodiesAcquired: 1 | 0;
    sourcePathsNegativelyClosedForCurrentMethod: 1 | 0;
    authorityTriggersActivated: 0;
    authorityResearchLanesReopened: 0;
    authorityComponentsAdmitted: 0;
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
    | 'BRANCH_2004_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE';
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
    b48.existingArchitectureCanHostMethodSpecificContracts &&
    b48.activeRuleSetRequiredInputCoverageValidationPresent &&
    b48.activeRuleSetRequiredInputCoverageValidationFailClosed &&
    b48.exact2015PrintedTargetPassageBindingEstablished === false &&
    b48.independentSingleSourceCompletePathEstablished === false &&
    b48.sourceSpecificDependencySeparabilityEstablished === false &&
    b48.methodSpecificUpstreamAuthorityEstablished === false &&
    b48.authorityResearchLaneReopenedCount === 0 &&
    b48.immediatelyExecutableAuthorityAdmissionLaneCount === 0 &&
    b48.immediatelyExecutableSemanticRuleLaneCount === 0 &&
    b48.selectedImmediateNextLane === null &&
    b48.branchAuthorityHoldActive &&
    b48.broadUnchangedSurfaceSearchRestartAuthorized === false &&
    b48.crossSourceStitchingAuthorized === false &&
    b48.sourceMandatoryDependencyDroppingAuthorized === false &&
    b48.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b48.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b48.authorityAdmittedByThisGate === false &&
    b48.authorityGapClosedByThisGate === false &&
    b48.methodologyDefinitionCreatedByThisGate === false &&
    b48.t5RuleAuthoringAuthorized === false &&
    b48.t6RuleAuthoringAuthorized === false &&
    b48.t8RuleAuthoringAuthorized === false &&
    b48.claimTypeCreationAuthorized === false &&
    b48.personalizedT8PackCreationAuthorized === false &&
    b48.consumerNarrativeAuthorized === false &&
    b48.previewDefaultSwitchAuthorized === false &&
    b48.productionPromotionAuthorized === false &&
    b48.productionImpact === 'NONE' &&
    b48.controlCount === 14 &&
    b48.controlsFrozen &&
    deterministicContentHash(b48.controlIds) === deterministicContentHash(CAREER_T8_B48_AUTHORITY_TRIGGER_ACTIVATION_CONTROL_IDS) &&
    b48.implementationEffects.openAuthorityTriggersEvaluated === 2 &&
    b48.implementationEffects.authorityTriggersActivated === 0 &&
    b48.implementationEffects.authorityResearchLanesReopened === 0 &&
    b48.implementationEffects.sourceAcquisitionsPerformed === 0 &&
    b48.recommendedNextGate === 'BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE'
  );
}

function sourceEvidenceValid(): boolean {
  const e = CAREER_T8_B49_LI_SHUNXIANG_2004_EXACT_BODY_EVIDENCE;
  return (
    e.sourceIdentity.includes('9787228087822') &&
    e.exactEditionBindingEstablished &&
    e.targetBodyDirectlyInspected &&
    e.exactTenGod === '정관' &&
    e.currentT5SemanticKey === 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY' &&
    e.currentT5Facet === 'formal_responsibility' &&
    e.natalZhengguanClashConditionObserved &&
    e.careerOrStatusContextObserved &&
    e.sourceSpecificStrengthDependencyObserved &&
    e.sourceSpecificXijiYongshenDependencyObserved &&
    e.sourceSpecificStructuralDependencyObserved &&
    e.sourceSpecificDependencySeparabilityEstablished === false &&
    e.qualitativeAttenuationModeDirectlyEstablished === false &&
    e.currentMethodCompatibilityEstablished === false &&
    e.independentSingleSourceCompletePathEstablished === false &&
    e.mayDropSourceDependenciesToForceCompatibility === false &&
    e.mayBorrowModifierOrCompatibilityFromAnotherSource === false &&
    e.disposition === 'EXACT_EDITION_BODY_ACQUIRED_CURRENT_METHOD_INCOMPATIBLE_FOR_BOUNDED_FLAT_MODIFIER'
  );
}

function finalized(
  material: Omit<
    CareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidenceReport,
    'evidenceId'
  >,
): CareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidenceReport {
  return {
    evidenceId: `career_personalization_t8_branch_2004_exact_edition_body_compatibility_closure_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidence(
  b48: CareerPersonalizationT8BranchSourceOrMethodAuthorityTriggerActivationEvidenceReport,
): CareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidenceReport {
  const accepted = exactB48Accepted(b48) && sourceEvidenceValid();

  return finalized({
    evidenceVersion: CAREER_PERSONALIZATION_T8_BRANCH_2004_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_BRANCH_2004_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE'
      : 'UPSTREAM_B48_BOUNDARY_INVALID',
    decision: accepted
      ? 'EXACT_2004_FIRST_EDITION_BODY_ACQUIRED_SOURCE_DEPENDENCIES_CONFIRMED_CURRENT_METHOD_INCOMPATIBLE_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS'
      : 'BRANCH_2004_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_NOT_ESTABLISHED',
    upstreamB48EvidenceId: b48.evidenceId,
    exactB48BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    sourceEvidence: accepted ? CAREER_T8_B49_LI_SHUNXIANG_2004_EXACT_BODY_EVIDENCE : null,
    sourceEvidenceStateChangedSinceB48: accepted,
    sourceAcquisitionPerformed: accepted,
    exact2004EditionBindingEstablished: accepted,
    exact2004TargetBodyDirectlyInspected: accepted,
    exactZhengguanSemanticCorrespondenceObserved: accepted,
    natalZhengguanClashConditionObserved: accepted,
    sourceSpecificStrengthDependencyObserved: accepted,
    sourceSpecificXijiYongshenDependencyObserved: accepted,
    sourceSpecificStructuralDependencyObserved: accepted,
    sourceSpecificDependencySeparabilityEstablished: false,
    qualitativeAttenuationModeDirectlyEstablished: false,
    currentMethodCompatibilityEstablished: false,
    currentMethodIncompatibilityForFlatModifierEstablished: accepted,
    independentSingleSourceCompletePathEstablished: false,
    sourceSpecificDependencySeparabilityOrCompletePathTriggerActivated: false,
    methodSpecificInputContractAndUpstreamAuthorityTriggerActivated: false,
    satisfiedOpenAuthorityTriggerCount: 0,
    authorityResearchLaneReopenedCount: 0,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane: null,
    branchAuthorityHoldActive: accepted,
    exact2015PrintedTargetPassageBindingEstablished: false,
    methodSpecificUpstreamAuthorityEstablished: false,
    broadUnchangedSurfaceSearchRestartAuthorized: false,
    repeat2004PathSearchAuthorized: false,
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
    controlIds: accepted ? CAREER_T8_B49_2004_EXACT_BODY_CLOSURE_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 14 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      exactEditionSourceBodiesAcquired: accepted ? 1 : 0,
      sourcePathsNegativelyClosedForCurrentMethod: accepted ? 1 : 0,
      authorityTriggersActivated: 0,
      authorityResearchLanesReopened: 0,
      authorityComponentsAdmitted: 0,
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
      : 'BRANCH_2004_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE',
  });
}
