import { BRANCH_CLASH_CONTEXT_PROJECTION_VERSION } from '../calculation/branch-clash-context-facts.js';
import { BRANCH_CLASH_QUALIFIER_OBSERVATION_VERSION } from '../calculation/branch-clash-qualifier-observation-facts.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_METHODOLOGY_GATE,
  CAREER_PERSONALIZATION_METHODOLOGY_GATE_VERSION,
  careerMethodologyDecision,
} from './career-personalization-methodology-gate.js';
import {
  CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE,
  CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION,
  careerT6Decision,
} from './career-personalization-t6-methodology-gate.js';
import { CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTRACTS } from './career-personalization-t8-branch-clash-remediation-trigger-readiness-review.js';
import {
  CAREER_PERSONALIZATION_T8_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE_VERSION,
  CAREER_T8_B45_REOPEN_TRIGGER_ACTIVATION_CONTROL_IDS,
  type CareerPersonalizationT8ResearchReopenTriggerActivationEvidenceReport,
} from './career-personalization-t8-research-reopen-trigger-activation-evidence.js';

export const CAREER_PERSONALIZATION_T8_BRANCH_CLASH_CROSS_METHODOLOGY_MINIMUM_INTERACTION_DIMENSION_RECONCILIATION_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-branch-clash-cross-methodology-minimum-interaction-dimension-reconciliation-review-v1' as const;

export const CAREER_T8_B46_AUDITED_BASE_MAIN_COMMIT =
  'ae466b0c5f57a1a91489af2a6213e90b340239ac' as const;

export type CareerT8B46MethodProfile =
  | 'TRADITIONAL_ZIPING_RESEARCH_PROFILE'
  | 'DUAN_LIXIANG_RESEARCH_PROFILE';

export type CareerT8B46InteractionDimension =
  | 'day_master_strength'
  | 'xiji_or_yongshen'
  | 'structure_or_pattern'
  | 'interaction_relation_type'
  | 'position_or_distance'
  | 'rescue_or_transformation_context'
  | 'host_guest'
  | 'body_use'
  | 'doing_work_or_effectiveness'
  | 'clash_effect_class'
  | 'position';

export type CareerT8B46RepositorySupportClass =
  | 'T0_STRUCTURAL_FACT_AVAILABLE'
  | 'T0_OBSERVATION_AVAILABLE_EFFECT_NOT_ESTABLISHED'
  | 'CURRENT_CAREER_T1_T4_QUALIFIER_BLOCKED'
  | 'CURRENT_CAREER_T6_EFFECT_AUTHORITY_BLOCKED'
  | 'NO_CURRENT_CAREER_AUTHORITY_INPUT';

export interface CareerT8B46InteractionDimensionRecord {
  methodologyProfile: CareerT8B46MethodProfile;
  dimension: CareerT8B46InteractionDimension;
  sourceRequirementClass:
    | 'OBSERVED_REQUIRED_OR_MATERIAL_METHOD_CONTEXT'
    | 'DECLARED_ALTERNATIVE_METHOD_CONTEXT';
  repositorySupportClass: CareerT8B46RepositorySupportClass;
  repositoryEvidenceRefs: readonly string[];
  currentCareerMethodConsumesDimension: boolean;
  semanticEffectEstablished: boolean;
  mayDropDimensionToForceCompatibility: false;
  boundedFlatClashConclusionAllowedWithoutDimension: false;
}

export interface CareerT8B46SourcePathRecord {
  sourceIdentity: string;
  publicationProvenance: 'published';
  role:
    | 'TRADITIONAL_INDEPENDENT_BRANCH_PATH'
    | 'AUTHORITY_GRADE_SAME_SOURCE_CLASH_FRAMEWORK_SURFACE'
    | 'CROSS_METHODOLOGY_NEGATIVE_CONTROL';
  exactEditionBinding: boolean;
  targetBodyDirectlyInspected: boolean;
  semanticBinding: 'STRONG' | 'DIRECT_EXISTING_COMPONENT' | 'NOT_USED_AS_CURRENT_T5_SEMANTIC_DONOR';
  interactionBinding: 'STRONG_MATERIAL_PARTIAL' | 'TOC_OR_FRAMEWORK_ONLY' | 'ALTERNATIVE_METHOD_FRAMEWORK';
  careerBinding: 'MATERIAL' | 'DIRECT_EXISTING_COMPONENT' | 'CAREER_METHOD_DECLARED';
  limitsObserved: boolean;
  mandatoryDependencies: readonly string[];
  currentMethodConsumesDependencies: boolean;
  crossSourceStitchingUsed: false;
  admissionReady: false;
  gapClosureReady: false;
}

export const CAREER_T8_B46_SOURCE_PATH_RECORDS = Object.freeze([
  Object.freeze({
    sourceIdentity: '李順祥, 四柱玄機：命理推斷詳解, 新疆人民出版社, 2004, ISBN 9787228087822',
    publicationProvenance: 'published' as const,
    role: 'TRADITIONAL_INDEPENDENT_BRANCH_PATH' as const,
    exactEditionBinding: false,
    targetBodyDirectlyInspected: false,
    semanticBinding: 'STRONG' as const,
    interactionBinding: 'STRONG_MATERIAL_PARTIAL' as const,
    careerBinding: 'MATERIAL' as const,
    limitsObserved: true,
    mandatoryDependencies: Object.freeze([
      'day_master_strength_or_shenqiang_shenruo_context',
      'xiji_or_yongshen_context',
      'structural_context',
      'interaction_relation_type',
    ]),
    currentMethodConsumesDependencies: false,
    crossSourceStitchingUsed: false as const,
    admissionReady: false as const,
    gapClosureReady: false as const,
  }),
  Object.freeze({
    sourceIdentity: '陳澤眞, 八字命理900問, 白象文化, 2023, ISBN 9786263640641',
    publicationProvenance: 'published' as const,
    role: 'AUTHORITY_GRADE_SAME_SOURCE_CLASH_FRAMEWORK_SURFACE' as const,
    exactEditionBinding: true,
    targetBodyDirectlyInspected: false,
    semanticBinding: 'DIRECT_EXISTING_COMPONENT' as const,
    interactionBinding: 'TOC_OR_FRAMEWORK_ONLY' as const,
    careerBinding: 'DIRECT_EXISTING_COMPONENT' as const,
    limitsObserved: true,
    mandatoryDependencies: Object.freeze([
      'initiating_vs_receiving_clash_role',
      'clash_with_control_vs_without_control',
      'xiji_or_yongshen_effect_context',
      'non_assumed_clash_outcome',
    ]),
    currentMethodConsumesDependencies: false,
    crossSourceStitchingUsed: false as const,
    admissionReady: false as const,
    gapClosureReady: false as const,
  }),
  Object.freeze({
    sourceIdentity: '段建業 / 言明, 段氏命理職業象法新解, 時輪造化, 2020, ISBN 97898111447105',
    publicationProvenance: 'published' as const,
    role: 'CROSS_METHODOLOGY_NEGATIVE_CONTROL' as const,
    exactEditionBinding: true,
    targetBodyDirectlyInspected: false,
    semanticBinding: 'NOT_USED_AS_CURRENT_T5_SEMANTIC_DONOR' as const,
    interactionBinding: 'ALTERNATIVE_METHOD_FRAMEWORK' as const,
    careerBinding: 'CAREER_METHOD_DECLARED' as const,
    limitsObserved: true,
    mandatoryDependencies: Object.freeze([
      'host_guest',
      'body_use',
      'interaction_relation_type',
      'doing_work_or_effectiveness',
      'clash_effect_class',
      'position',
    ]),
    currentMethodConsumesDependencies: false,
    crossSourceStitchingUsed: false as const,
    admissionReady: false as const,
    gapClosureReady: false as const,
  }),
] as const satisfies readonly CareerT8B46SourcePathRecord[]);

function record(
  methodologyProfile: CareerT8B46MethodProfile,
  dimension: CareerT8B46InteractionDimension,
  sourceRequirementClass: CareerT8B46InteractionDimensionRecord['sourceRequirementClass'],
  repositorySupportClass: CareerT8B46RepositorySupportClass,
  repositoryEvidenceRefs: readonly string[],
  currentCareerMethodConsumesDimension: boolean,
  semanticEffectEstablished: boolean,
): CareerT8B46InteractionDimensionRecord {
  return Object.freeze({
    methodologyProfile,
    dimension,
    sourceRequirementClass,
    repositorySupportClass,
    repositoryEvidenceRefs: Object.freeze([...repositoryEvidenceRefs]),
    currentCareerMethodConsumesDimension,
    semanticEffectEstablished,
    mayDropDimensionToForceCompatibility: false as const,
    boundedFlatClashConclusionAllowedWithoutDimension: false as const,
  });
}

export const CAREER_T8_B46_INTERACTION_DIMENSION_RECORDS = Object.freeze([
  record(
    'TRADITIONAL_ZIPING_RESEARCH_PROFILE',
    'day_master_strength',
    'OBSERVED_REQUIRED_OR_MATERIAL_METHOD_CONTEXT',
    'CURRENT_CAREER_T1_T4_QUALIFIER_BLOCKED',
    ['src/research/career-personalization-methodology-gate.ts#t1_t4_qualifiers'],
    false,
    false,
  ),
  record(
    'TRADITIONAL_ZIPING_RESEARCH_PROFILE',
    'xiji_or_yongshen',
    'OBSERVED_REQUIRED_OR_MATERIAL_METHOD_CONTEXT',
    'CURRENT_CAREER_T1_T4_QUALIFIER_BLOCKED',
    ['src/research/career-personalization-methodology-gate.ts#t1_t4_qualifiers'],
    false,
    false,
  ),
  record(
    'TRADITIONAL_ZIPING_RESEARCH_PROFILE',
    'structure_or_pattern',
    'OBSERVED_REQUIRED_OR_MATERIAL_METHOD_CONTEXT',
    'CURRENT_CAREER_T1_T4_QUALIFIER_BLOCKED',
    ['src/research/career-personalization-methodology-gate.ts#t1_t4_qualifiers'],
    false,
    false,
  ),
  record(
    'TRADITIONAL_ZIPING_RESEARCH_PROFILE',
    'interaction_relation_type',
    'OBSERVED_REQUIRED_OR_MATERIAL_METHOD_CONTEXT',
    'T0_STRUCTURAL_FACT_AVAILABLE',
    [
      'derivedFacts.structuralRelations[*].kind',
      'derivedFacts.branchClashContexts.*.kind',
    ],
    false,
    false,
  ),
  record(
    'TRADITIONAL_ZIPING_RESEARCH_PROFILE',
    'position_or_distance',
    'OBSERVED_REQUIRED_OR_MATERIAL_METHOD_CONTEXT',
    'T0_OBSERVATION_AVAILABLE_EFFECT_NOT_ESTABLISHED',
    [
      'derivedFacts.branchClashContexts.*.participants[*].pillar',
      'derivedFacts.branchClashQualifierObservations.*.interveningPillars',
    ],
    false,
    false,
  ),
  record(
    'TRADITIONAL_ZIPING_RESEARCH_PROFILE',
    'rescue_or_transformation_context',
    'OBSERVED_REQUIRED_OR_MATERIAL_METHOD_CONTEXT',
    'CURRENT_CAREER_T6_EFFECT_AUTHORITY_BLOCKED',
    [
      'derivedFacts.structuralRelations[*].semantics.transformationEstablished=false',
      'src/research/career-personalization-t6-methodology-gate.ts#activation_persistence_effective_support',
    ],
    false,
    false,
  ),
  record(
    'DUAN_LIXIANG_RESEARCH_PROFILE',
    'host_guest',
    'DECLARED_ALTERNATIVE_METHOD_CONTEXT',
    'NO_CURRENT_CAREER_AUTHORITY_INPUT',
    [],
    false,
    false,
  ),
  record(
    'DUAN_LIXIANG_RESEARCH_PROFILE',
    'body_use',
    'DECLARED_ALTERNATIVE_METHOD_CONTEXT',
    'NO_CURRENT_CAREER_AUTHORITY_INPUT',
    [],
    false,
    false,
  ),
  record(
    'DUAN_LIXIANG_RESEARCH_PROFILE',
    'interaction_relation_type',
    'DECLARED_ALTERNATIVE_METHOD_CONTEXT',
    'T0_STRUCTURAL_FACT_AVAILABLE',
    ['derivedFacts.structuralRelations[*].kind', 'derivedFacts.branchClashContexts.*.kind'],
    false,
    false,
  ),
  record(
    'DUAN_LIXIANG_RESEARCH_PROFILE',
    'doing_work_or_effectiveness',
    'DECLARED_ALTERNATIVE_METHOD_CONTEXT',
    'CURRENT_CAREER_T6_EFFECT_AUTHORITY_BLOCKED',
    ['src/research/career-personalization-t6-methodology-gate.ts#visible_stem_effective_interaction'],
    false,
    false,
  ),
  record(
    'DUAN_LIXIANG_RESEARCH_PROFILE',
    'clash_effect_class',
    'DECLARED_ALTERNATIVE_METHOD_CONTEXT',
    'NO_CURRENT_CAREER_AUTHORITY_INPUT',
    [],
    false,
    false,
  ),
  record(
    'DUAN_LIXIANG_RESEARCH_PROFILE',
    'position',
    'DECLARED_ALTERNATIVE_METHOD_CONTEXT',
    'T0_OBSERVATION_AVAILABLE_EFFECT_NOT_ESTABLISHED',
    [
      'derivedFacts.branchClashContexts.*.participants[*].pillar',
      'derivedFacts.branchClashQualifierObservations.*.interveningPillars',
    ],
    false,
    false,
  ),
] as const satisfies readonly CareerT8B46InteractionDimensionRecord[]);

export const CAREER_T8_B46_REPOSITORY_AUDIT_EVIDENCE = Object.freeze({
  auditedBaseMainCommit: CAREER_T8_B46_AUDITED_BASE_MAIN_COMMIT,
  blobs: Object.freeze([
    Object.freeze({
      path: 'src/contracts/interpretation.ts',
      blobSha: '6979d42e5a6d4a2e05d084f92f606c40a71848cd',
      finding: 'MethodologyDefinition.inputContract supports allowed|required|forbidden fact/claim/research-evidence inputs.',
    }),
    Object.freeze({
      path: 'src/interpretation/rule-registry.ts',
      blobSha: '60d40747570b40830c7e29d47a21f5760a47b5cf',
      finding: 'Registry rejects rule inputs outside a methodology input contract, but does not perform active-rule-set required-input completeness validation.',
    }),
    Object.freeze({
      path: 'src/calculation/branch-clash-context-facts.ts',
      blobSha: 'c5e4418d7725019793a19995adb8bbbb1fac7c79',
      finding: 'T0 preserves exact branch clash relation participants, pillar positions, hidden stems, and structural-only semantics.',
    }),
    Object.freeze({
      path: 'src/calculation/branch-clash-qualifier-observation-facts.ts',
      blobSha: '68bbbc5d7b0fcb961895bbd3f5b509c351dd6550',
      finding: 'T0 preserves intervening pillar and visibility/occurrence observations while explicitly denying established semantic effects or numeric weights.',
    }),
    Object.freeze({
      path: 'src/research/career-personalization-methodology-gate.ts',
      blobSha: '53dc67b2b23064f67a2a883e54ffcbe9e0deb282',
      finding: 'Current Career gate blocks T1-T4 qualifiers and preserves structural interaction dimensions without authorizing T6 effects.',
    }),
    Object.freeze({
      path: 'src/research/career-personalization-t6-methodology-gate.ts',
      blobSha: '73b28a6e2e25dba1260efa2ee004aabbf99d30f2',
      finding: 'Effective interaction, hidden-stem eligibility, damage settlement, precedence, and Career T6 semantic effects remain blocked.',
    }),
  ]),
  methodologyInputContractSchemaPresent: true,
  ruleInputSubsetValidationPresent: true,
  activeRuleSetRequiredInputCoverageValidationPresent: false,
  newParallelInterpretationRuntimeRequired: false,
});

export const CAREER_T8_B46_REMEDIATION_TRIGGER_IDS = Object.freeze([
  'BRANCH_SOURCE_SPECIFIC_DEPENDENCY_SEPARABILITY_OR_COMPLETE_PATH_TRIGGER',
  'BRANCH_METHOD_SPECIFIC_INPUT_CONTRACT_AND_UPSTREAM_AUTHORITY_TRIGGER',
  'METHODOLOGY_REQUIRED_INPUT_COVERAGE_VALIDATION_TRIGGER',
] as const);

export const CAREER_T8_B46_RECONCILIATION_CONTROL_IDS = Object.freeze([
  'B46_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B45_REOPEN_TRIGGER_ACTIVATION_BOUNDARY',
  'B46_EXECUTES_ONLY_THE_SINGLE_B45_AUTHORIZED_BRANCH_CROSS_METHODOLOGY_RECONCILIATION_GATE',
  'TRADITIONAL_AND_DUAN_DIMENSION_INVENTORIES_REMAIN_SEPARATE_AND_ARE_NOT_MERGED_INTO_A_UNIVERSAL_METHOD',
  'SOURCE_SCARCITY_IS_REJECTED_AS_THE_SOLE_BRANCH_EXPLANATION_BUT_DIRECT_TARGET_BODY_AND_EXACT_EDITION_BLOCKERS_REMAIN',
  'CURRENT_CAREER_T1_T4_QUALIFIERS_REMAIN_BLOCKED_AND_ARE_NOT_SILENTLY_IMPORTED',
  'T0_BRANCH_RELATION_POSITION_DISTANCE_AND_VISIBILITY_OBSERVATIONS_REMAIN_STRUCTURAL_OR_OBSERVATIONAL_NOT_SEMANTIC_EFFECTS',
  'CURRENT_T6_EFFECTIVE_INTERACTION_DAMAGE_SETTLEMENT_AND_CAREER_EFFECT_AUTHORITY_REMAIN_BLOCKED',
  'ALTERNATIVE_METHODOLOGY_DIMENSIONS_ARE_A_NEGATIVE_CONTROL_NOT_A_STITCHING_DONOR',
  'METHOD_INPUT_CONTRACT_AND_RULE_INPUT_SUBSET_VALIDATION_EXIST_BUT_REQUIRED_INPUT_SET_COVERAGE_REMAINS_A_SEPARATE_P0_VALIDATION_GAP',
  'THE_BRANCH_BOTTLENECK_IS_CLASSIFIED_AS_DUAL_SOURCE_BINDING_AND_CURRENT_METHOD_INTERACTION_DIMENSION_INSUFFICIENCY_NOT_A_FLAT_UNARY_MODIFIER_PATH',
  'B41_EXACT_2015_AND_INDEPENDENT_COMPLETE_PATH_TRIGGERS_REMAIN_UNSATISFIED_AND_UNCHANGED',
  'NO_SOURCE_MANDATORY_DEPENDENCY_MAY_BE_DROPPED_TO_FORCE_CURRENT_METHOD_COMPATIBILITY',
  'NO_CROSS_SOURCE_STITCHING_NUMERIC_WEIGHTING_WINNER_RULE_OR_UNIVERSAL_INTERACTION_EVALUATOR_IS_AUTHORIZED',
  'ALL_SIX_HISTORICAL_T8_SYNTHESIS_AUTHORITY_GAPS_REMAIN_FORMALLY_OPEN',
  'NO_T5_T6_T8_RULE_CLAIM_TYPE_METHODOLOGY_PROFILE_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION_IS_AUTHORIZED',
  'PRODUCTION_IMPACT_IS_NONE_AND_ANY_FOLLOWUP_REQUIRES_AN_EXPLICIT_REMEDIATION_TRIGGER',
] as const);

export interface CareerPersonalizationT8BranchClashCrossMethodologyMinimumInteractionDimensionReconciliationReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_BRANCH_CLASH_CROSS_METHODOLOGY_MINIMUM_INTERACTION_DIMENSION_RECONCILIATION_REVIEW_VERSION;
  status:
    | 'RESOLVED_BRANCH_CLASH_CROSS_METHODOLOGY_MINIMUM_INTERACTION_DIMENSION_RECONCILIATION_REVIEW'
    | 'UPSTREAM_B45_BOUNDARY_INVALID';
  decision:
    | 'BRANCH_BOTTLENECK_DUAL_SOURCE_BINDING_AND_CURRENT_METHOD_INTERACTION_DIMENSION_INSUFFICIENCY_NO_FLAT_MODIFIER_NO_METHOD_STITCHING'
    | 'BRANCH_CROSS_METHODOLOGY_RECONCILIATION_NOT_ESTABLISHED';
  upstreamB45EvidenceId: string;
  exactB45BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  methodologyProfileCount: 2 | 0;
  sourcePathRecords: readonly CareerT8B46SourcePathRecord[];
  sourcePathRecordCount: 3 | 0;
  interactionDimensionRecords: readonly CareerT8B46InteractionDimensionRecord[];
  interactionDimensionRecordCount: 12 | 0;
  structurallyAvailableDimensionRecordCount: number;
  observationalButNoEffectDimensionRecordCount: number;
  blockedOrMissingDimensionRecordCount: number;
  sourceScarcityRejectedAsSoleExplanation: boolean;
  sourceTargetBindingBlockerStillPresent: boolean;
  currentMethodInteractionDimensionsInsufficient: boolean;
  branchHistoricalGapExclusivelyReclassifiedToMethodInsufficiency: false;
  flatUnaryClashModifierAuthorized: false;
  sourceMandatoryDependencyDroppingAuthorized: false;
  crossMethodologyStitchingAuthorized: false;
  universalInteractionEvaluatorAuthorized: false;
  methodologyInputContractSchemaPresent: boolean;
  ruleInputSubsetValidationPresent: boolean;
  activeRuleSetRequiredInputCoverageValidationPresent: boolean;
  existingArchitectureCanHostMethodSpecificContracts: boolean;
  newParallelInterpretationRuntimeRequired: false;
  branch2015TriggerSatisfied: false;
  branchIndependentCompletePathTriggerSatisfied: false;
  remediationTriggerIds: typeof CAREER_T8_B46_REMEDIATION_TRIGGER_IDS;
  remediationTriggerCount: 3 | 0;
  immediatelyExecutableAuthorityAdmissionLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
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
  controlIds: readonly (typeof CAREER_T8_B46_RECONCILIATION_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  selectedImmediateNextLane: null;
  recommendedNextGate:
    | 'TRIGGER_GATED_BRANCH_METHOD_SPECIFIC_INPUT_CONTRACT_OR_SOURCE_SEPARABILITY_REVIEW'
    | 'BRANCH_CLASH_CROSS_METHODOLOGY_MINIMUM_INTERACTION_DIMENSION_RECONCILIATION_REVIEW';
}

function contentAddressedB45IdentityValid(
  b45: CareerPersonalizationT8ResearchReopenTriggerActivationEvidenceReport,
): boolean {
  const { evidenceId, ...material } = b45;
  return evidenceId ===
    `career_personalization_t8_research_reopen_trigger_activation_${deterministicContentHash(material).slice(0, 24)}`;
}

function exactB45Accepted(
  b45: CareerPersonalizationT8ResearchReopenTriggerActivationEvidenceReport,
): boolean {
  return (
    contentAddressedB45IdentityValid(b45) &&
    b45.evidenceVersion === CAREER_PERSONALIZATION_T8_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE_VERSION &&
    b45.status === 'RESOLVED_CAREER_PERSONALIZATION_T8_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE' &&
    b45.decision ===
      'ONE_BRANCH_SIGNAL_MATERIALLY_CHANGED_ZERO_FROZEN_TRIGGERS_SATISFIED_AUTHORITY_RESEARCH_HOLD_PRESERVED_ONE_BOUNDED_METHODOLOGY_RECONCILIATION_GATE_EXECUTABLE' &&
    b45.exactB44BoundaryAccepted &&
    b45.domain === 'career' &&
    b45.temporalScope === 'natal' &&
    b45.statusClass === 'research' &&
    b45.evidenceRecordCount === 8 &&
    b45.supportingEvidenceChangedSignalCount === 4 &&
    b45.qualifyingFrozenSignalChangeCount === 1 &&
    b45.qualifyingFrozenSignalClasses.length === 1 &&
    b45.qualifyingFrozenSignalClasses[0] === 'BRANCH_B41_TRIGGER_CONDITION_CHANGE' &&
    b45.frozenTriggerSatisfiedCount === 0 &&
    b45.authorityResearchLaneReopenedCount === 0 &&
    b45.boundedGovernanceGateExecutableCount === 1 &&
    b45.branchB41SignalMateriallyChanged &&
    b45.branch2015TriggerSatisfied === false &&
    b45.branchIndependentCompletePathTriggerSatisfied === false &&
    b45.branchCurrentMethodCompatibilityEstablished === false &&
    b45.currentMethodScopeMutationAuthorized === false &&
    b45.sourceMandatoryDependencyDroppingAuthorized === false &&
    b45.globalAuthorityResearchHoldPreserved &&
    b45.crossSourceRequirementStitchingAuthorized === false &&
    b45.admittedBoundedAuthorityComponentCountPreserved === 1 &&
    b45.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b45.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b45.authorityAdmittedByThisGate === false &&
    b45.authorityGapClosedByThisGate === false &&
    b45.t5RuleAuthoringAuthorized === false &&
    b45.t6RuleAuthoringAuthorized === false &&
    b45.t8RuleAuthoringAuthorized === false &&
    b45.controlCount === 14 &&
    b45.controlsFrozen &&
    deterministicContentHash(b45.controlIds) === deterministicContentHash(CAREER_T8_B45_REOPEN_TRIGGER_ACTIVATION_CONTROL_IDS) &&
    b45.selectedImmediateNextLane ===
      'BRANCH_CLASH_CROSS_METHODOLOGY_MINIMUM_INTERACTION_DIMENSION_RECONCILIATION_REVIEW' &&
    b45.recommendedNextGate ===
      'BRANCH_CLASH_CROSS_METHODOLOGY_MINIMUM_INTERACTION_DIMENSION_RECONCILIATION_REVIEW' &&
    b45.productionImpact === 'NONE'
  );
}

function currentRepositoryCapabilityAuditValid(): boolean {
  const t1t4 = careerMethodologyDecision('t1_t4_qualifiers');
  const structural = careerMethodologyDecision('structural_interactions');
  const effective = careerT6Decision('visible_stem_effective_interaction');
  const damage = careerT6Decision('damage_magnitude_settlement');
  const careerEffect = careerT6Decision('career_t6_semantic_effect');

  return (
    CAREER_PERSONALIZATION_METHODOLOGY_GATE_VERSION === 'myeonghwa-career-personalization-methodology-gate-v1' &&
    CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE_VERSION === 'myeonghwa-career-personalization-t6-methodology-gate-v1' &&
    BRANCH_CLASH_CONTEXT_PROJECTION_VERSION === 'myeonghwa-branch-clash-context-projection-v1' &&
    BRANCH_CLASH_QUALIFIER_OBSERVATION_VERSION === 'myeonghwa-branch-clash-qualifier-observation-v1' &&
    t1t4.mode === 'blocked' &&
    structural.mode === 'preserve_only' &&
    effective.mode === 'blocked_authority_gap' &&
    damage.mode === 'blocked_authority_gap' &&
    careerEffect.mode === 'blocked_authority_gap' &&
    CAREER_PERSONALIZATION_METHODOLOGY_GATE.readiness.t6InteractionAuthoring === 'blocked_pending_methodology' &&
    CAREER_PERSONALIZATION_T6_METHODOLOGY_GATE.readiness.t6InteractionAuthoring === 'not_authorized' &&
    CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTRACTS.length === 2 &&
    CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTRACTS.every(
      (contract) => contract.currentlySatisfied === false,
    )
  );
}

function dimensionInventoryValid(): boolean {
  if (CAREER_T8_B46_INTERACTION_DIMENSION_RECORDS.length !== 12) return false;
  const traditional = CAREER_T8_B46_INTERACTION_DIMENSION_RECORDS.filter(
    (candidate) => candidate.methodologyProfile === 'TRADITIONAL_ZIPING_RESEARCH_PROFILE',
  );
  const duan = CAREER_T8_B46_INTERACTION_DIMENSION_RECORDS.filter(
    (candidate) => candidate.methodologyProfile === 'DUAN_LIXIANG_RESEARCH_PROFILE',
  );
  return (
    traditional.length === 6 &&
    duan.length === 6 &&
    CAREER_T8_B46_INTERACTION_DIMENSION_RECORDS.every(
      (candidate) =>
        candidate.currentCareerMethodConsumesDimension === false &&
        candidate.semanticEffectEstablished === false &&
        candidate.mayDropDimensionToForceCompatibility === false &&
        candidate.boundedFlatClashConclusionAllowedWithoutDimension === false,
    )
  );
}

function finalized(
  material: Omit<
    CareerPersonalizationT8BranchClashCrossMethodologyMinimumInteractionDimensionReconciliationReviewReport,
    'reviewId'
  >,
): CareerPersonalizationT8BranchClashCrossMethodologyMinimumInteractionDimensionReconciliationReviewReport {
  return {
    reviewId: `career_personalization_t8_branch_clash_cross_methodology_dimension_reconciliation_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8BranchClashCrossMethodologyMinimumInteractionDimensionReconciliationReview(
  b45: CareerPersonalizationT8ResearchReopenTriggerActivationEvidenceReport,
): CareerPersonalizationT8BranchClashCrossMethodologyMinimumInteractionDimensionReconciliationReviewReport {
  const accepted = exactB45Accepted(b45) && currentRepositoryCapabilityAuditValid() && dimensionInventoryValid();
  const structurallyAvailable = accepted
    ? CAREER_T8_B46_INTERACTION_DIMENSION_RECORDS.filter(
        (record) => record.repositorySupportClass === 'T0_STRUCTURAL_FACT_AVAILABLE',
      ).length
    : 0;
  const observational = accepted
    ? CAREER_T8_B46_INTERACTION_DIMENSION_RECORDS.filter(
        (record) => record.repositorySupportClass === 'T0_OBSERVATION_AVAILABLE_EFFECT_NOT_ESTABLISHED',
      ).length
    : 0;
  const blockedOrMissing = accepted
    ? CAREER_T8_B46_INTERACTION_DIMENSION_RECORDS.length - structurallyAvailable - observational
    : 0;

  return finalized({
    reviewVersion:
      CAREER_PERSONALIZATION_T8_BRANCH_CLASH_CROSS_METHODOLOGY_MINIMUM_INTERACTION_DIMENSION_RECONCILIATION_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_BRANCH_CLASH_CROSS_METHODOLOGY_MINIMUM_INTERACTION_DIMENSION_RECONCILIATION_REVIEW'
      : 'UPSTREAM_B45_BOUNDARY_INVALID',
    decision: accepted
      ? 'BRANCH_BOTTLENECK_DUAL_SOURCE_BINDING_AND_CURRENT_METHOD_INTERACTION_DIMENSION_INSUFFICIENCY_NO_FLAT_MODIFIER_NO_METHOD_STITCHING'
      : 'BRANCH_CROSS_METHODOLOGY_RECONCILIATION_NOT_ESTABLISHED',
    upstreamB45EvidenceId: b45.evidenceId,
    exactB45BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    methodologyProfileCount: accepted ? 2 : 0,
    sourcePathRecords: accepted ? CAREER_T8_B46_SOURCE_PATH_RECORDS : Object.freeze([]),
    sourcePathRecordCount: accepted ? 3 : 0,
    interactionDimensionRecords: accepted ? CAREER_T8_B46_INTERACTION_DIMENSION_RECORDS : Object.freeze([]),
    interactionDimensionRecordCount: accepted ? 12 : 0,
    structurallyAvailableDimensionRecordCount: structurallyAvailable,
    observationalButNoEffectDimensionRecordCount: observational,
    blockedOrMissingDimensionRecordCount: blockedOrMissing,
    sourceScarcityRejectedAsSoleExplanation: accepted,
    sourceTargetBindingBlockerStillPresent: accepted,
    currentMethodInteractionDimensionsInsufficient: accepted,
    branchHistoricalGapExclusivelyReclassifiedToMethodInsufficiency: false,
    flatUnaryClashModifierAuthorized: false,
    sourceMandatoryDependencyDroppingAuthorized: false,
    crossMethodologyStitchingAuthorized: false,
    universalInteractionEvaluatorAuthorized: false,
    methodologyInputContractSchemaPresent: accepted,
    ruleInputSubsetValidationPresent: accepted,
    activeRuleSetRequiredInputCoverageValidationPresent: false,
    existingArchitectureCanHostMethodSpecificContracts: accepted,
    newParallelInterpretationRuntimeRequired: false,
    branch2015TriggerSatisfied: false,
    branchIndependentCompletePathTriggerSatisfied: false,
    remediationTriggerIds: CAREER_T8_B46_REMEDIATION_TRIGGER_IDS,
    remediationTriggerCount: accepted ? 3 : 0,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
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
    controlIds: accepted ? CAREER_T8_B46_RECONCILIATION_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 16 : 0,
    controlsFrozen: accepted,
    selectedImmediateNextLane: null,
    recommendedNextGate: accepted
      ? 'TRIGGER_GATED_BRANCH_METHOD_SPECIFIC_INPUT_CONTRACT_OR_SOURCE_SEPARABILITY_REVIEW'
      : 'BRANCH_CLASH_CROSS_METHODOLOGY_MINIMUM_INTERACTION_DIMENSION_RECONCILIATION_REVIEW',
  });
}
