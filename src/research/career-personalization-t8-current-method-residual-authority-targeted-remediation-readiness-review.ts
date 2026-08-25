import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import type { CareerT8SynthesisAuthorityGapId } from './career-personalization-t8-synthesis-authority-gap-requirements-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW_VERSION,
  CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_EVIDENCE_ADEQUACY_CONTROL_IDS,
  type CareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReviewReport,
  type CareerT8CurrentMethodResidualRemediationPathId,
} from './career-personalization-t8-current-method-residual-authority-evidence-adequacy-reassessment-review.js';

export const CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_READINESS_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-current-method-residual-authority-targeted-remediation-readiness-review-v1' as const;

export type CareerT8TargetedRemediationTaskStatus =
  | 'EXECUTABLE_NEXT_GATE'
  | 'CONDITIONAL_NOT_EXECUTABLE_UNLESS_DIMENSION_CONSUMPTION_SELECTED'
  | 'PACK_LEVEL_DEFERRED_NOT_EXECUTABLE';

export type CareerT8TargetedRemediationEvidenceCheckId =
  | 'EXACT_SOURCE_IDENTITY'
  | 'STABLE_REPRODUCIBLE_LOCATOR'
  | 'ORIGINAL_OR_VERIFIED_LOCAL_CONTEXT'
  | 'INDEPENDENT_NORMATIVE_PROVENANCE'
  | 'EXPLICIT_CAREER_OR_WORK_SEMANTIC_BINDING'
  | 'EXPLICIT_CONTEXT_LIMITS_OR_EXCEPTIONS'
  | 'CURRENT_METHOD_COMPATIBILITY'
  | 'EXACT_TEN_GOD_SUBTYPE_ROLE_PRESERVATION'
  | 'DIRECT_MULTI_CLAIM_CAREER_COMPOSITION'
  | 'DEPENDENCY_ON_WANGSHUAI_GEJU_YONGSHEN_XIJI_INVENTORY'
  | 'NAMED_TEN_GOD_FAMILY_RELATION_BINDING'
  | 'STRUCTURE_VERSUS_SEMANTIC_EFFECT_DISTINCTION'
  | 'RELATION_LOCAL_BRANCH_CLASH_PARTICIPANT_BINDING'
  | 'SPECIFIC_CURRENT_T5_CAREER_SEMANTIC_MODIFIER_BINDING'
  | 'QUALITATIVE_MODIFICATION_MODE_SOURCE_EXPLICIT'
  | 'POSITION_CAREER_BINDING'
  | 'VISIBILITY_CAREER_BINDING_IF_CONSUMED'
  | 'PLURALITY_CAREER_BINDING_IF_CONSUMED'
  | 'NO_RELATIVE_FORCE_WEIGHTING_OR_PRECEDENCE_IMPORT'
  | 'CATEGORICAL_SEASONAL_PHASE_CAREER_BINDING_IF_CONSUMED'
  | 'MULTI_PATTERN_COEXISTENCE_REINFORCEMENT_CONSTRAINT_OR_TENSION_POLICY';

export interface CareerT8TargetedRemediationEvidenceContract {
  exactSourceIdentityRequired: true;
  stableReproducibleLocatorRequired: true;
  originalOrVerifiedLocalContextRequired: true;
  independentNormativeProvenanceRequired: true;
  explicitCareerOrWorkSemanticBindingRequired: true;
  explicitContextLimitsOrExceptionsRequired: true;
  currentMethodCompatibilityRequired: true;
  searchSnippetMayBeDiscoveryLeadOnly: true;
  searchSnippetMayCountAsAuthorityEvidence: false;
  tableOfContentsMayCountAsPassageAuthority: false;
  crossSourceStitchingForSameRequirementAllowed: false;
  strengthHierarchyMaySubstituteForSemanticComposition: false;
  historicalRankMayBeModernizedAutomatically: false;
  numericWeightingMayBeIntroduced: false;
  negativeOutcomeMustBePreserved: true;
  successfulAcquisitionAutomaticallyAdmitsAuthority: false;
  successfulAcquisitionAutomaticallyClosesGap: false;
  successfulAcquisitionAutomaticallyAuthorsT8: false;
}

export interface CareerT8TargetedRemediationTask {
  taskId: CareerT8CurrentMethodResidualRemediationPathId;
  status: CareerT8TargetedRemediationTaskStatus;
  targetGapIds: readonly CareerT8SynthesisAuthorityGapId[];
  allowedAnchorCandidateIds: readonly string[];
  exactEvidenceObjective: string;
  evidenceChecks: readonly CareerT8TargetedRemediationEvidenceCheckId[];
  evidenceContract: CareerT8TargetedRemediationEvidenceContract;
  broadSearchFallbackAuthorized: false;
  existingPartialEvidenceAloneSufficient: false;
  newSourceOrPassageEvidenceRequired: true;
  executionAuthorizedForNextGate: boolean;
  authorityAdmissionOnCompletion: false;
  gapClosureOnCompletion: false;
  t8AuthoringOnCompletion: false;
}

function evidenceContract(): CareerT8TargetedRemediationEvidenceContract {
  return Object.freeze({
    exactSourceIdentityRequired: true,
    stableReproducibleLocatorRequired: true,
    originalOrVerifiedLocalContextRequired: true,
    independentNormativeProvenanceRequired: true,
    explicitCareerOrWorkSemanticBindingRequired: true,
    explicitContextLimitsOrExceptionsRequired: true,
    currentMethodCompatibilityRequired: true,
    searchSnippetMayBeDiscoveryLeadOnly: true,
    searchSnippetMayCountAsAuthorityEvidence: false,
    tableOfContentsMayCountAsPassageAuthority: false,
    crossSourceStitchingForSameRequirementAllowed: false,
    strengthHierarchyMaySubstituteForSemanticComposition: false,
    historicalRankMayBeModernizedAutomatically: false,
    numericWeightingMayBeIntroduced: false,
    negativeOutcomeMustBePreserved: true,
    successfulAcquisitionAutomaticallyAdmitsAuthority: false,
    successfulAcquisitionAutomaticallyClosesGap: false,
    successfulAcquisitionAutomaticallyAuthorsT8: false,
  });
}

export const CAREER_T8_CURRENT_METHOD_TARGETED_REMEDIATION_TASKS = Object.freeze([
  Object.freeze({
    taskId: 'QIN_LUNSHI_P464_BODY_ACQUISITION',
    status: 'EXECUTABLE_NEXT_GATE',
    targetGapIds: Object.freeze(['EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING'] as const),
    allowedAnchorCandidateIds: Object.freeze(['QIN_LUNSHI_2010_PUBLISHED_TENGOD_CAREER_CHAPTER_LEAD'] as const),
    exactEvidenceObjective:
      'Acquire and inspect Qin Lunshi, 中國易學博覽·八字應用經驗學 (2010, ISBN 9787204098774), printed p.464 section 按十神組合選職業 with sufficient surrounding text to determine exact Ten-God subtype-role preservation, direct multi-claim Career composition, exceptions, and dependencies on 旺衰/格局/用神/喜忌.',
    evidenceChecks: Object.freeze([
      'EXACT_SOURCE_IDENTITY',
      'STABLE_REPRODUCIBLE_LOCATOR',
      'ORIGINAL_OR_VERIFIED_LOCAL_CONTEXT',
      'INDEPENDENT_NORMATIVE_PROVENANCE',
      'EXPLICIT_CAREER_OR_WORK_SEMANTIC_BINDING',
      'EXPLICIT_CONTEXT_LIMITS_OR_EXCEPTIONS',
      'CURRENT_METHOD_COMPATIBILITY',
      'EXACT_TEN_GOD_SUBTYPE_ROLE_PRESERVATION',
      'DIRECT_MULTI_CLAIM_CAREER_COMPOSITION',
      'DEPENDENCY_ON_WANGSHUAI_GEJU_YONGSHEN_XIJI_INVENTORY',
    ] as const),
    evidenceContract: evidenceContract(),
    broadSearchFallbackAuthorized: false,
    existingPartialEvidenceAloneSufficient: false,
    newSourceOrPassageEvidenceRequired: true,
    executionAuthorizedForNextGate: true,
    authorityAdmissionOnCompletion: false,
    gapClosureOnCompletion: false,
    t8AuthoringOnCompletion: false,
  }),
  Object.freeze({
    taskId: 'T5_FAMILY_RELATION_DIRECT_CAREER_SOURCE_DISCOVERY',
    status: 'EXECUTABLE_NEXT_GATE',
    targetGapIds: Object.freeze(['FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING'] as const),
    allowedAnchorCandidateIds: Object.freeze([] as const),
    exactEvidenceObjective:
      'Acquire an independently identifiable source passage that names a Ten-God family generation/control relation and explicitly binds that relation to Career/work expression while distinguishing structural relation presence from the semantic effect and stating relevant limits or exceptions.',
    evidenceChecks: Object.freeze([
      'EXACT_SOURCE_IDENTITY',
      'STABLE_REPRODUCIBLE_LOCATOR',
      'ORIGINAL_OR_VERIFIED_LOCAL_CONTEXT',
      'INDEPENDENT_NORMATIVE_PROVENANCE',
      'EXPLICIT_CAREER_OR_WORK_SEMANTIC_BINDING',
      'EXPLICIT_CONTEXT_LIMITS_OR_EXCEPTIONS',
      'CURRENT_METHOD_COMPATIBILITY',
      'NAMED_TEN_GOD_FAMILY_RELATION_BINDING',
      'STRUCTURE_VERSUS_SEMANTIC_EFFECT_DISTINCTION',
    ] as const),
    evidenceContract: evidenceContract(),
    broadSearchFallbackAuthorized: false,
    existingPartialEvidenceAloneSufficient: false,
    newSourceOrPassageEvidenceRequired: true,
    executionAuthorizedForNextGate: true,
    authorityAdmissionOnCompletion: false,
    gapClosureOnCompletion: false,
    t8AuthoringOnCompletion: false,
  }),
  Object.freeze({
    taskId: 'T6_BRANCH_CLASH_TO_T5_SEMANTIC_BINDING_SOURCE_DISCOVERY',
    status: 'EXECUTABLE_NEXT_GATE',
    targetGapIds: Object.freeze(['BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING'] as const),
    allowedAnchorCandidateIds: Object.freeze(['XU_BINGXIN_2009_SIX_CLASH_CAREER_POSITION'] as const),
    exactEvidenceObjective:
      'Use Xu Bingxin only as a direct clash-to-Career anchor while acquiring source-bound evidence that an identified branch clash and its participants qualitatively preserve, constrain, redirect, or otherwise modify a specific Ten-God/current-T5 Career semantic. The modification mode and exceptions must be source explicit.',
    evidenceChecks: Object.freeze([
      'EXACT_SOURCE_IDENTITY',
      'STABLE_REPRODUCIBLE_LOCATOR',
      'ORIGINAL_OR_VERIFIED_LOCAL_CONTEXT',
      'INDEPENDENT_NORMATIVE_PROVENANCE',
      'EXPLICIT_CAREER_OR_WORK_SEMANTIC_BINDING',
      'EXPLICIT_CONTEXT_LIMITS_OR_EXCEPTIONS',
      'CURRENT_METHOD_COMPATIBILITY',
      'RELATION_LOCAL_BRANCH_CLASH_PARTICIPANT_BINDING',
      'SPECIFIC_CURRENT_T5_CAREER_SEMANTIC_MODIFIER_BINDING',
      'QUALITATIVE_MODIFICATION_MODE_SOURCE_EXPLICIT',
      'NO_RELATIVE_FORCE_WEIGHTING_OR_PRECEDENCE_IMPORT',
    ] as const),
    evidenceContract: evidenceContract(),
    broadSearchFallbackAuthorized: false,
    existingPartialEvidenceAloneSufficient: false,
    newSourceOrPassageEvidenceRequired: true,
    executionAuthorizedForNextGate: true,
    authorityAdmissionOnCompletion: false,
    gapClosureOnCompletion: false,
    t8AuthoringOnCompletion: false,
  }),
  Object.freeze({
    taskId: 'T6_POSITION_VISIBILITY_PLURALITY_CURRENT_METHOD_SOURCE_DISCOVERY',
    status: 'EXECUTABLE_NEXT_GATE',
    targetGapIds: Object.freeze(['VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING'] as const),
    allowedAnchorCandidateIds: Object.freeze(['XU_BINGXIN_2009_SIX_CLASH_CAREER_POSITION'] as const),
    exactEvidenceObjective:
      'Retain Xu Bingxin only as qualitative position/separation partial evidence and acquire source-bound Career/current-T5 semantic bindings for each intended dimension separately. Position, visibility, and plurality may receive independent evidence records; absence of one dimension may not be filled from another or from relative-force weighting.',
    evidenceChecks: Object.freeze([
      'EXACT_SOURCE_IDENTITY',
      'STABLE_REPRODUCIBLE_LOCATOR',
      'ORIGINAL_OR_VERIFIED_LOCAL_CONTEXT',
      'INDEPENDENT_NORMATIVE_PROVENANCE',
      'EXPLICIT_CAREER_OR_WORK_SEMANTIC_BINDING',
      'EXPLICIT_CONTEXT_LIMITS_OR_EXCEPTIONS',
      'CURRENT_METHOD_COMPATIBILITY',
      'POSITION_CAREER_BINDING',
      'VISIBILITY_CAREER_BINDING_IF_CONSUMED',
      'PLURALITY_CAREER_BINDING_IF_CONSUMED',
      'SPECIFIC_CURRENT_T5_CAREER_SEMANTIC_MODIFIER_BINDING',
      'NO_RELATIVE_FORCE_WEIGHTING_OR_PRECEDENCE_IMPORT',
    ] as const),
    evidenceContract: evidenceContract(),
    broadSearchFallbackAuthorized: false,
    existingPartialEvidenceAloneSufficient: false,
    newSourceOrPassageEvidenceRequired: true,
    executionAuthorizedForNextGate: true,
    authorityAdmissionOnCompletion: false,
    gapClosureOnCompletion: false,
    t8AuthoringOnCompletion: false,
  }),
  Object.freeze({
    taskId: 'SEASONAL_PHASE_CAREER_MODIFIER_SOURCE_DISCOVERY_IF_CONSUMED',
    status: 'CONDITIONAL_NOT_EXECUTABLE_UNLESS_DIMENSION_CONSUMPTION_SELECTED',
    targetGapIds: Object.freeze(['SEASONAL_PHASE_TO_CAREER_SEMANTIC_MODIFIER_MISSING'] as const),
    allowedAnchorCandidateIds: Object.freeze([] as const),
    exactEvidenceObjective:
      'If a later personalized Career T8 design explicitly selects seasonal-phase consumption, acquire source-bound categorical 旺/相/休/囚/死 to Career/current-T5 semantic modification evidence with scope and exceptions. Until that selection, keep the dimension open and unconsumed.',
    evidenceChecks: Object.freeze([
      'EXACT_SOURCE_IDENTITY',
      'STABLE_REPRODUCIBLE_LOCATOR',
      'ORIGINAL_OR_VERIFIED_LOCAL_CONTEXT',
      'INDEPENDENT_NORMATIVE_PROVENANCE',
      'EXPLICIT_CAREER_OR_WORK_SEMANTIC_BINDING',
      'EXPLICIT_CONTEXT_LIMITS_OR_EXCEPTIONS',
      'CURRENT_METHOD_COMPATIBILITY',
      'CATEGORICAL_SEASONAL_PHASE_CAREER_BINDING_IF_CONSUMED',
      'SPECIFIC_CURRENT_T5_CAREER_SEMANTIC_MODIFIER_BINDING',
      'NO_RELATIVE_FORCE_WEIGHTING_OR_PRECEDENCE_IMPORT',
    ] as const),
    evidenceContract: evidenceContract(),
    broadSearchFallbackAuthorized: false,
    existingPartialEvidenceAloneSufficient: false,
    newSourceOrPassageEvidenceRequired: true,
    executionAuthorizedForNextGate: false,
    authorityAdmissionOnCompletion: false,
    gapClosureOnCompletion: false,
    t8AuthoringOnCompletion: false,
  }),
  Object.freeze({
    taskId: 'MULTI_PATTERN_CONFLICT_POLICY_SOURCE_DISCOVERY',
    status: 'PACK_LEVEL_DEFERRED_NOT_EXECUTABLE',
    targetGapIds: Object.freeze(['MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING'] as const),
    allowedAnchorCandidateIds: Object.freeze([] as const),
    exactEvidenceObjective:
      'Before a broad personalized Career T8 pack composes several independently authorized patterns, acquire an explicit qualitative coexistence, reinforcement, constraint, or tension/conflict composition policy with exceptions. Strength hierarchy, weighted voting, and automatic precedence are not substitutes.',
    evidenceChecks: Object.freeze([
      'EXACT_SOURCE_IDENTITY',
      'STABLE_REPRODUCIBLE_LOCATOR',
      'ORIGINAL_OR_VERIFIED_LOCAL_CONTEXT',
      'INDEPENDENT_NORMATIVE_PROVENANCE',
      'EXPLICIT_CAREER_OR_WORK_SEMANTIC_BINDING',
      'EXPLICIT_CONTEXT_LIMITS_OR_EXCEPTIONS',
      'CURRENT_METHOD_COMPATIBILITY',
      'MULTI_PATTERN_COEXISTENCE_REINFORCEMENT_CONSTRAINT_OR_TENSION_POLICY',
      'NO_RELATIVE_FORCE_WEIGHTING_OR_PRECEDENCE_IMPORT',
    ] as const),
    evidenceContract: evidenceContract(),
    broadSearchFallbackAuthorized: false,
    existingPartialEvidenceAloneSufficient: false,
    newSourceOrPassageEvidenceRequired: true,
    executionAuthorizedForNextGate: false,
    authorityAdmissionOnCompletion: false,
    gapClosureOnCompletion: false,
    t8AuthoringOnCompletion: false,
  }),
] as const satisfies readonly CareerT8TargetedRemediationTask[]);

export const CAREER_T8_CURRENT_METHOD_TARGETED_REMEDIATION_READINESS_CONTROL_IDS = Object.freeze([
  'B22_MATERIALIZES_B21_REMEDIATION_PATHS_ONLY_AND_PERFORMS_NO_ACQUISITION',
  'ONLY_FOUR_ACTIVE_PRIMARY_PATHS_ARE_EXECUTABLE_IN_THE_NEXT_GATE',
  'QIN_TARGET_IS_FIXED_TO_2010_ISBN_9787204098774_PRINTED_P464_SECTION_BODY_AND_LOCAL_CONTEXT',
  'QIN_TOC_ENTRY_ALONE_IS_NOT_PASSAGE_AUTHORITY',
  'FAMILY_RELATION_TASK_REQUIRES_DIRECT_NAMED_RELATION_TO_CAREER_SEMANTIC_BINDING',
  'XU_MAY_ANCHOR_CLASH_AND_POSITION_REMEDIATION_BUT_MAY_NOT_CREATE_AN_UNSTATED_T5_MODIFIER',
  'POSITION_VISIBILITY_AND_PLURALITY_EVIDENCE_MAY_BE_ACQUIRED_SEPARATELY_AND_MAY_NOT_SUBSTITUTE_FOR_EACH_OTHER',
  'SEASONAL_TASK_REMAINS_NON_EXECUTABLE_UNTIL_DIMENSION_CONSUMPTION_IS_EXPLICITLY_SELECTED',
  'CONFLICT_POLICY_TASK_REMAINS_PACK_LEVEL_DEFERRED_AND_STRENGTH_HIERARCHY_IS_NOT_A_SUBSTITUTE',
  'BROAD_DISCOVERY_LOOP_AND_CROSS_SOURCE_REQUIREMENT_STITCHING_ARE_NOT_AUTHORIZED',
  'SUCCESSFUL_TARGETED_ACQUISITION_REQUIRES_LATER_ADEQUACY_AND_AUTHORITY_ADMISSION_REVIEW',
  'ALL_SIX_GAPS_REMAIN_OPEN_NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT',
] as const);

export interface CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_READINESS_REVIEW_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_READINESS'
    | 'UPSTREAM_B21_BOUNDARY_INVALID';
  decision:
    | 'FOUR_TARGETED_REMEDIATION_TASKS_EXECUTABLE_ONE_CONDITIONAL_ONE_PACK_DEFERRED_NO_ACQUISITION_OR_AUTHORITY_ADMISSION'
    | 'CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_NOT_READY';
  upstreamB21ReviewId: string;
  exactB21BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  tasks: readonly CareerT8TargetedRemediationTask[];
  taskCount: 6 | 0;
  executableTaskCount: 4 | 0;
  conditionalTaskCount: 1 | 0;
  deferredTaskCount: 1 | 0;
  allB21RemediationPathsRepresentedExactlyOnce: boolean;
  targetedEvidenceAcquisitionAuthorizedForNextGate: boolean;
  broadDiscoveryLoopAuthorized: false;
  broadCurrentMethodSearchRestartAuthorized: false;
  crossSourceRequirementStitchingAuthorized: false;
  qinP464TargetFrozen: boolean;
  qinTableOfContentsMaySatisfyPassageRequirement: false;
  xuAnchorUseBoundedToExistingPartialEvidence: boolean;
  positionVisibilityPluralityMayUseSeparateSourceBoundEvidence: boolean;
  seasonalTaskExecutableNow: false;
  conflictPolicyTaskExecutableNow: false;
  successfulAcquisitionRequiresLaterAdequacyReview: true;
  successfulAcquisitionRequiresLaterAuthorityAdmissionReview: true;
  newAcquisitionPerformedByThisGate: false;
  authorityAdmittedByThisGate: false;
  authorityGapClosedByThisGate: false;
  allSixGapsRemainOpen: true;
  unresolvedGapIds: readonly CareerT8SynthesisAuthorityGapId[];
  cheonbuHoldReclassified: false;
  wangQingHoldReclassified: false;
  methodologyChoiceMadeByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof CAREER_T8_CURRENT_METHOD_TARGETED_REMEDIATION_READINESS_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    targetedAcquisitionExecutionsPerformed: 0;
    newSourcesAcquired: 0;
    candidateEvidenceRecordsCreated: 0;
    authorityCandidatesAccepted: 0;
    authorityGapsClosed: 0;
    methodologyChoicesMade: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE'
    | 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW';
}

const EXPECTED_B21_PATH_IDS = Object.freeze([
  'QIN_LUNSHI_P464_BODY_ACQUISITION',
  'T5_FAMILY_RELATION_DIRECT_CAREER_SOURCE_DISCOVERY',
  'T6_BRANCH_CLASH_TO_T5_SEMANTIC_BINDING_SOURCE_DISCOVERY',
  'T6_POSITION_VISIBILITY_PLURALITY_CURRENT_METHOD_SOURCE_DISCOVERY',
  'SEASONAL_PHASE_CAREER_MODIFIER_SOURCE_DISCOVERY_IF_CONSUMED',
  'MULTI_PATTERN_CONFLICT_POLICY_SOURCE_DISCOVERY',
] as const satisfies readonly CareerT8CurrentMethodResidualRemediationPathId[]);

function contentAddressedB21IdentityValid(
  b21: CareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReviewReport,
): boolean {
  const { reviewId, ...material } = b21;
  return (
    reviewId ===
    `career_t8_current_method_residual_authority_evidence_adequacy_reassessment_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB21Accepted(
  b21: CareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReviewReport,
): boolean {
  const pathIds = b21.remediationPaths.map((path) => path.pathId);
  const materialPartialGapIds = b21.gapAssessments
    .filter((assessment) => assessment.coverageClass === 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE')
    .map((assessment) => assessment.gapId);

  return (
    contentAddressedB21IdentityValid(b21) &&
    b21.reviewVersion ===
      CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW_VERSION &&
    b21.status === 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_EVIDENCE_ADEQUACY_REASSESSMENT' &&
    b21.decision ===
      'B20_EVIDENCE_MATERIALLY_ADVANCES_T6_CLASH_AND_POSITION_COVERAGE_BUT_NO_GAP_HAS_FULL_AUTHORITY_COVERAGE_TARGETED_REMEDIATION_REQUIRED' &&
    b21.exactB20BoundaryAccepted &&
    b21.gapAssessmentCount === 6 &&
    b21.gapsWithMaterialPartialCoverageCount === 2 &&
    b21.gapsWithAnyLeadOrPartialCoverageCount === 4 &&
    b21.fullySatisfiedGapCount === 0 &&
    b21.allSixGapsRemainOpen &&
    deterministicContentHash(b21.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    deterministicContentHash(materialPartialGapIds) ===
      deterministicContentHash([
        'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
        'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
      ]) &&
    b21.remediationPathCount === 6 &&
    b21.activePrimaryRemediationPathCount === 4 &&
    b21.conditionalRemediationPathCount === 1 &&
    b21.packLevelDeferredRemediationPathCount === 1 &&
    deterministicContentHash(pathIds) === deterministicContentHash(EXPECTED_B21_PATH_IDS) &&
    b21.b20EvidenceAdequateForTargetedRemediationSelection &&
    b21.b20EvidenceAdequateForAuthorityAdmission === false &&
    b21.b20EvidenceAdequateForGapClosure === false &&
    b21.qinP464BodyAcquisitionRemainsRequired &&
    b21.xuMayAnchorDirectClashCareerAndPositionRemediation &&
    b21.xuMaySatisfyExactT5ModifierBridgeByItself === false &&
    b21.visibilityPluralityAuthorityStillAbsent &&
    b21.seasonalAuthorityStillAbsent &&
    b21.familyRelationAuthorityStillAbsent &&
    b21.conflictPolicyAuthorityStillAbsent &&
    b21.relativeForceMayFillResidualRequirement === false &&
    b21.crossSourceStitchingAuthorized === false &&
    b21.cheonbuHoldReclassified === false &&
    b21.wangQingHoldReclassified === false &&
    b21.methodologyChoiceMadeByThisGate === false &&
    b21.newSourceAcquisitionPerformedByThisGate === false &&
    b21.authorityAdmittedByThisGate === false &&
    b21.authorityGapClosedByThisGate === false &&
    b21.controlCount === 12 &&
    b21.controlsFrozen &&
    deterministicContentHash(b21.controlIds) ===
      deterministicContentHash(CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_EVIDENCE_ADEQUACY_CONTROL_IDS) &&
    b21.t8RuleAuthoringAuthorized === false &&
    b21.personalizedT8PackCreationAuthorized === false &&
    b21.productionPromotionAuthorized === false &&
    b21.recommendedNextGate ===
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_READINESS_REVIEW'
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReviewReport, 'reviewId'>,
): CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReviewReport {
  return {
    reviewId: `career_t8_current_method_residual_authority_targeted_remediation_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReview(
  b21: CareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReviewReport,
): CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationReadinessReviewReport {
  const accepted = exactB21Accepted(b21);

  return finalized({
    reviewVersion: CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_READINESS'
      : 'UPSTREAM_B21_BOUNDARY_INVALID',
    decision: accepted
      ? 'FOUR_TARGETED_REMEDIATION_TASKS_EXECUTABLE_ONE_CONDITIONAL_ONE_PACK_DEFERRED_NO_ACQUISITION_OR_AUTHORITY_ADMISSION'
      : 'CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_NOT_READY',
    upstreamB21ReviewId: b21.reviewId,
    exactB21BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    tasks: accepted ? CAREER_T8_CURRENT_METHOD_TARGETED_REMEDIATION_TASKS : Object.freeze([]),
    taskCount: accepted ? 6 : 0,
    executableTaskCount: accepted ? 4 : 0,
    conditionalTaskCount: accepted ? 1 : 0,
    deferredTaskCount: accepted ? 1 : 0,
    allB21RemediationPathsRepresentedExactlyOnce: accepted,
    targetedEvidenceAcquisitionAuthorizedForNextGate: accepted,
    broadDiscoveryLoopAuthorized: false,
    broadCurrentMethodSearchRestartAuthorized: false,
    crossSourceRequirementStitchingAuthorized: false,
    qinP464TargetFrozen: accepted,
    qinTableOfContentsMaySatisfyPassageRequirement: false,
    xuAnchorUseBoundedToExistingPartialEvidence: accepted,
    positionVisibilityPluralityMayUseSeparateSourceBoundEvidence: accepted,
    seasonalTaskExecutableNow: false,
    conflictPolicyTaskExecutableNow: false,
    successfulAcquisitionRequiresLaterAdequacyReview: true,
    successfulAcquisitionRequiresLaterAuthorityAdmissionReview: true,
    newAcquisitionPerformedByThisGate: false,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    allSixGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    cheonbuHoldReclassified: false,
    wangQingHoldReclassified: false,
    methodologyChoiceMadeByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted ? CAREER_T8_CURRENT_METHOD_TARGETED_REMEDIATION_READINESS_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      targetedAcquisitionExecutionsPerformed: 0,
      newSourcesAcquired: 0,
      candidateEvidenceRecordsCreated: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      methodologyChoicesMade: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE'
      : 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW',
  });
}
