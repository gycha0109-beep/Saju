import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_2004_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE_VERSION,
  CAREER_T8_B49_2004_EXACT_BODY_CLOSURE_CONTROL_IDS,
  CAREER_T8_B49_LI_SHUNXIANG_2004_EXACT_BODY_EVIDENCE,
  type CareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidenceReport,
} from './career-personalization-t8-branch-2004-exact-edition-body-compatibility-closure-evidence.js';

export const CAREER_PERSONALIZATION_T8_BRANCH_2016_LU_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE_VERSION =
  'myeonghwa-career-personalization-t8-branch-2016-lu-exact-edition-body-compatibility-closure-evidence-v1' as const;

export const CAREER_T8_B50_LU_ZHIJI_2016_EXACT_BODY_EVIDENCE = Object.freeze({
  sourceIdentity:
    '陸致極, 八字命理學基礎教程, 圓方出版社, Hong Kong, 2016-05 first printing, ISBN 9789621459978',
  bibliographicCorroboration: Object.freeze([
    'Inspected scan front matter identifies 陸致極, 圓方出版社 / Forms Publications, 2016-05 first printing and ISBN 978-962-14-5997-8.',
    'Independent bookseller catalog identifies the same title, author, publisher, 2016 first edition and ISBN 9789621459978.',
  ]),
  inspectedBodySurface:
    'Scribd document 906157510, 八字命理學基礎教程; inspected text layer includes the publication front matter and printed pp.147-149 of 第七章 格局述要 / 正官格.',
  exactEditionBindingEstablished: true as const,
  targetBodyDirectlyInspected: true as const,
  exactTenGod: '정관' as const,
  currentT5SemanticKey: 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY' as const,
  currentT5Facet: 'formal_responsibility' as const,
  semanticTermsObserved: Object.freeze([
    'discipline_and_self_restraint',
    'rule_following_and_public_duty',
    'management_or_leadership_aptitude',
    'carrying_out_superior_instructions',
  ] as const),
  natalZhengguanClashConditionObserved: true as const,
  patternRootDamageObserved: true as const,
  sourceQualitativeEffectClass: 'PATTERN_ROOT_DAMAGED_OR_BROKEN' as const,
  sourceSpecificDayMasterStrengthDependencyObserved: true as const,
  sourceSpecificPatternDependencyObserved: true as const,
  sourceSpecificMonthCommandRootDependencyObserved: true as const,
  sourceSpecificDependencySeparabilityEstablished: false as const,
  qualitativeAttenuationModeDirectlyEstablished: false as const,
  currentMethodCompatibilityEstablished: false as const,
  independentSingleSourceCompletePathEstablished: false as const,
  mayDropSourceDependenciesToForceCompatibility: false as const,
  mayBorrowModifierOrCompatibilityFromAnotherSource: false as const,
  disposition:
    'EXACT_2016_BODY_ACQUIRED_CURRENT_METHOD_INCOMPATIBLE_FOR_BOUNDED_FLAT_MODIFIER' as const,
  evidenceNotes: Object.freeze([
    'The exact inspected body directly characterizes Zhengguan through disciplined conduct, rule-following, management aptitude and carrying out superior instructions, which is material to the governed formal_responsibility semantic.',
    'The same local Zhengguan section states that the day master must be sufficiently strong and treats Zhengguan as constraint whose effect differs when strength is inadequate.',
    'The same section makes the month-command branch the Zhengguan-pattern root and states that 刑/沖/破/害 to that root harms the Zhengguan foundation and produces pattern failure.',
    'That pattern-level damage is not the governed ATTENUATES_OR_REDUCES_EXPRESSION modifier and cannot be flattened into one without dropping the source-required strength/pattern/root context.',
    'The 2016 source therefore constitutes a second independent published negative compatibility path after B49, not a qualifying B48 authority-trigger activation.',
  ]),
} as const);

export const CAREER_T8_B50_2016_EXACT_BODY_CLOSURE_CONTROL_IDS = Object.freeze([
  'B50_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B49_2004_NEGATIVE_CLOSURE_BOUNDARY',
  'THE_B49_2004_LI_SHUNXIANG_NEGATIVE_CURRENT_METHOD_CLOSURE_IS_PRESERVED_UNCHANGED',
  'THE_2016_LU_ZHIJI_FIRST_PRINTING_IS_BOUND_FROM_THE_INSPECTED_FRONT_MATTER_AND_LOCAL_BODY',
  'THE_2016_BODY_IS_DIRECTLY_INSPECTED_AT_PRINTED_P147_TO_P149_FOR_ZHENGGUAN_SEMANTICS_AND_NATAL_CLASH_CONDITION',
  'ZHENGGUAN_DISCIPLINE_RULE_FOLLOWING_MANAGEMENT_AND_SUPERIOR_INSTRUCTION_TERMS_ARE_MATERIAL_TO_FORMAL_RESPONSIBILITY_ONLY',
  'THE_SOURCE_DESCRIBES_CLASH_AS_DAMAGE_TO_THE_MONTH_COMMAND_ZHENGGUAN_PATTERN_ROOT_NOT_AS_A_GOVERNED_FLAT_T5_ATTENUATION_DELTA',
  'THE_SAME_LOCAL_SOURCE_REQUIRES_DAY_MASTER_STRENGTH_PATTERN_FORMATION_AND_MONTH_COMMAND_ROOT_CONTEXT',
  'SOURCE_MANDATORY_STRENGTH_PATTERN_AND_ROOT_DEPENDENCIES_ARE_NOT_DROPPED_TO_FORCE_CURRENT_METHOD_COMPATIBILITY',
  'THE_2016_PATH_IS_NEGATIVELY_CLOSED_AS_CURRENT_METHOD_INCOMPATIBLE_FOR_A_BOUNDED_FLAT_MODIFIER',
  'THE_2016_PATH_IS_NOT_COUNTED_AS_AN_INDEPENDENT_COMPLETE_SINGLE_SOURCE_PATH_AND_ACTIVATES_NO_OPEN_AUTHORITY_TRIGGER',
  'NO_CROSS_SOURCE_OR_CROSS_METHODOLOGY_STITCHING_IS_AUTHORIZED',
  'ALL_SIX_HISTORICAL_CAREER_T8_AUTHORITY_GAPS_REMAIN_FORMALLY_OPEN',
  'NO_T5_T6_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_DEFAULT_OR_PRODUCTION_PROMOTION_IS_AUTHORIZED',
  'FUTURE_BRANCH_RESEARCH_REQUIRES_A_DIFFERENT_QUALIFYING_SOURCE_SIGNAL_EXACT_2015_BODY_OR_GOVERNED_METHOD_AUTHORITY_CHANGE',
] as const);

export interface CareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof CAREER_PERSONALIZATION_T8_BRANCH_2016_LU_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_BRANCH_2016_LU_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE'
    | 'UPSTREAM_B49_BOUNDARY_INVALID';
  decision:
    | 'EXACT_2016_LU_BODY_ACQUIRED_SOURCE_DEPENDENCIES_CONFIRMED_CURRENT_METHOD_INCOMPATIBLE_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS'
    | 'BRANCH_2016_LU_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_NOT_ESTABLISHED';
  upstreamB49EvidenceId: string;
  exactB49BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  prior2004NegativeClosurePreserved: boolean;
  sourceEvidence: typeof CAREER_T8_B50_LU_ZHIJI_2016_EXACT_BODY_EVIDENCE | null;
  sourceEvidenceStateChangedSinceB49: boolean;
  sourceAcquisitionPerformed: boolean;
  exact2016EditionBindingEstablished: boolean;
  exact2016TargetBodyDirectlyInspected: boolean;
  exactZhengguanSemanticCorrespondenceObserved: boolean;
  natalZhengguanClashConditionObserved: boolean;
  sourceSpecificDayMasterStrengthDependencyObserved: boolean;
  sourceSpecificPatternDependencyObserved: boolean;
  sourceSpecificMonthCommandRootDependencyObserved: boolean;
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
  repeat2016PathSearchAuthorized: false;
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
  controlIds: readonly (typeof CAREER_T8_B50_2016_EXACT_BODY_CLOSURE_CONTROL_IDS)[number][];
  controlCount: 14 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    exactEditionSourceBodiesAcquired: 1 | 0;
    sourcePathsNegativelyClosedForCurrentMethod: 1 | 0;
    cumulativeNegativelyClosedIndependentPublishedBranchPaths: 2 | 0;
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
    | 'BRANCH_2016_LU_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE';
}

function contentAddressedB49IdentityValid(
  b49: CareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidenceReport,
): boolean {
  const { evidenceId, ...material } = b49;
  return (
    evidenceId ===
    `career_personalization_t8_branch_2004_exact_edition_body_compatibility_closure_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB49Accepted(
  b49: CareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidenceReport,
): boolean {
  return (
    contentAddressedB49IdentityValid(b49) &&
    b49.evidenceVersion ===
      CAREER_PERSONALIZATION_T8_BRANCH_2004_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE_VERSION &&
    b49.status === 'RESOLVED_BRANCH_2004_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE' &&
    b49.decision ===
      'EXACT_2004_FIRST_EDITION_BODY_ACQUIRED_SOURCE_DEPENDENCIES_CONFIRMED_CURRENT_METHOD_INCOMPATIBLE_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS' &&
    b49.exactB48BoundaryAccepted &&
    b49.domain === 'career' &&
    b49.temporalScope === 'natal' &&
    b49.statusClass === 'research' &&
    deterministicContentHash(b49.sourceEvidence) ===
      deterministicContentHash(CAREER_T8_B49_LI_SHUNXIANG_2004_EXACT_BODY_EVIDENCE) &&
    b49.sourceEvidenceStateChangedSinceB48 &&
    b49.sourceAcquisitionPerformed &&
    b49.exact2004EditionBindingEstablished &&
    b49.exact2004TargetBodyDirectlyInspected &&
    b49.exactZhengguanSemanticCorrespondenceObserved &&
    b49.natalZhengguanClashConditionObserved &&
    b49.sourceSpecificStrengthDependencyObserved &&
    b49.sourceSpecificXijiYongshenDependencyObserved &&
    b49.sourceSpecificStructuralDependencyObserved &&
    b49.sourceSpecificDependencySeparabilityEstablished === false &&
    b49.qualitativeAttenuationModeDirectlyEstablished === false &&
    b49.currentMethodCompatibilityEstablished === false &&
    b49.currentMethodIncompatibilityForFlatModifierEstablished &&
    b49.independentSingleSourceCompletePathEstablished === false &&
    b49.sourceSpecificDependencySeparabilityOrCompletePathTriggerActivated === false &&
    b49.methodSpecificInputContractAndUpstreamAuthorityTriggerActivated === false &&
    b49.satisfiedOpenAuthorityTriggerCount === 0 &&
    b49.authorityResearchLaneReopenedCount === 0 &&
    b49.immediatelyExecutableAuthorityAdmissionLaneCount === 0 &&
    b49.immediatelyExecutableSemanticRuleLaneCount === 0 &&
    b49.selectedImmediateNextLane === null &&
    b49.branchAuthorityHoldActive &&
    b49.exact2015PrintedTargetPassageBindingEstablished === false &&
    b49.methodSpecificUpstreamAuthorityEstablished === false &&
    b49.repeat2004PathSearchAuthorized === false &&
    b49.crossSourceStitchingAuthorized === false &&
    b49.sourceMandatoryDependencyDroppingAuthorized === false &&
    b49.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b49.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b49.authorityAdmittedByThisGate === false &&
    b49.authorityGapClosedByThisGate === false &&
    b49.methodologyDefinitionCreatedByThisGate === false &&
    b49.t5RuleAuthoringAuthorized === false &&
    b49.t6RuleAuthoringAuthorized === false &&
    b49.t8RuleAuthoringAuthorized === false &&
    b49.claimTypeCreationAuthorized === false &&
    b49.personalizedT8PackCreationAuthorized === false &&
    b49.consumerNarrativeAuthorized === false &&
    b49.previewDefaultSwitchAuthorized === false &&
    b49.productionPromotionAuthorized === false &&
    b49.productionImpact === 'NONE' &&
    b49.controlCount === 14 &&
    b49.controlsFrozen &&
    deterministicContentHash(b49.controlIds) ===
      deterministicContentHash(CAREER_T8_B49_2004_EXACT_BODY_CLOSURE_CONTROL_IDS) &&
    b49.implementationEffects.exactEditionSourceBodiesAcquired === 1 &&
    b49.implementationEffects.sourcePathsNegativelyClosedForCurrentMethod === 1 &&
    b49.implementationEffects.authorityTriggersActivated === 0 &&
    b49.implementationEffects.authorityResearchLanesReopened === 0 &&
    b49.recommendedNextGate === 'BRANCH_SOURCE_OR_METHOD_AUTHORITY_TRIGGER_ACTIVATION_EVIDENCE'
  );
}

function sourceEvidenceValid(): boolean {
  const e = CAREER_T8_B50_LU_ZHIJI_2016_EXACT_BODY_EVIDENCE;
  return (
    e.sourceIdentity.includes('9789621459978') &&
    e.exactEditionBindingEstablished &&
    e.targetBodyDirectlyInspected &&
    e.exactTenGod === '정관' &&
    e.currentT5SemanticKey === 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY' &&
    e.currentT5Facet === 'formal_responsibility' &&
    e.natalZhengguanClashConditionObserved &&
    e.patternRootDamageObserved &&
    e.sourceSpecificDayMasterStrengthDependencyObserved &&
    e.sourceSpecificPatternDependencyObserved &&
    e.sourceSpecificMonthCommandRootDependencyObserved &&
    e.sourceSpecificDependencySeparabilityEstablished === false &&
    e.qualitativeAttenuationModeDirectlyEstablished === false &&
    e.currentMethodCompatibilityEstablished === false &&
    e.independentSingleSourceCompletePathEstablished === false &&
    e.mayDropSourceDependenciesToForceCompatibility === false &&
    e.mayBorrowModifierOrCompatibilityFromAnotherSource === false &&
    e.disposition === 'EXACT_2016_BODY_ACQUIRED_CURRENT_METHOD_INCOMPATIBLE_FOR_BOUNDED_FLAT_MODIFIER'
  );
}

function finalized(
  material: Omit<
    CareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidenceReport,
    'evidenceId'
  >,
): CareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidenceReport {
  return {
    evidenceId: `career_personalization_t8_branch_2016_lu_exact_edition_body_compatibility_closure_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidence(
  b49: CareerPersonalizationT8Branch2004ExactEditionBodyCompatibilityClosureEvidenceReport,
): CareerPersonalizationT8Branch2016LuExactEditionBodyCompatibilityClosureEvidenceReport {
  const accepted = exactB49Accepted(b49) && sourceEvidenceValid();

  return finalized({
    evidenceVersion: CAREER_PERSONALIZATION_T8_BRANCH_2016_LU_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_BRANCH_2016_LU_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE'
      : 'UPSTREAM_B49_BOUNDARY_INVALID',
    decision: accepted
      ? 'EXACT_2016_LU_BODY_ACQUIRED_SOURCE_DEPENDENCIES_CONFIRMED_CURRENT_METHOD_INCOMPATIBLE_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS'
      : 'BRANCH_2016_LU_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_NOT_ESTABLISHED',
    upstreamB49EvidenceId: b49.evidenceId,
    exactB49BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    prior2004NegativeClosurePreserved: accepted,
    sourceEvidence: accepted ? CAREER_T8_B50_LU_ZHIJI_2016_EXACT_BODY_EVIDENCE : null,
    sourceEvidenceStateChangedSinceB49: accepted,
    sourceAcquisitionPerformed: accepted,
    exact2016EditionBindingEstablished: accepted,
    exact2016TargetBodyDirectlyInspected: accepted,
    exactZhengguanSemanticCorrespondenceObserved: accepted,
    natalZhengguanClashConditionObserved: accepted,
    sourceSpecificDayMasterStrengthDependencyObserved: accepted,
    sourceSpecificPatternDependencyObserved: accepted,
    sourceSpecificMonthCommandRootDependencyObserved: accepted,
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
    repeat2016PathSearchAuthorized: false,
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
    controlIds: accepted ? CAREER_T8_B50_2016_EXACT_BODY_CLOSURE_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 14 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      exactEditionSourceBodiesAcquired: accepted ? 1 : 0,
      sourcePathsNegativelyClosedForCurrentMethod: accepted ? 1 : 0,
      cumulativeNegativelyClosedIndependentPublishedBranchPaths: accepted ? 2 : 0,
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
      : 'BRANCH_2016_LU_EXACT_EDITION_BODY_COMPATIBILITY_CLOSURE_EVIDENCE',
  });
}
