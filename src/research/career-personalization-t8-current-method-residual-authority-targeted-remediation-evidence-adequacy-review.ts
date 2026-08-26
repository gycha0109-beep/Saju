import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import type { CareerT8SynthesisAuthorityGapId } from './career-personalization-t8-synthesis-authority-gap-requirements-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_VERSION,
  CAREER_T8_B23_TARGETED_EVIDENCE_RECORDS,
  CAREER_T8_B23_TARGETED_REMEDIATION_EVIDENCE_CONTROL_IDS,
  type CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceReport,
} from './career-personalization-t8-current-method-residual-authority-targeted-remediation-evidence.js';

export const CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_ADEQUACY_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-current-method-residual-authority-targeted-remediation-evidence-adequacy-review-v1' as const;

export type CareerT8B24CoverageClass =
  | 'NONE'
  | 'LEAD_ONLY'
  | 'PARTIAL_REQUIREMENT_COVERAGE'
  | 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE'
  | 'FULL_REQUIREMENT_COVERAGE';

export type CareerT8B24RemediationDisposition =
  | 'ACTIVE_PRIMARY_BODY_ACQUISITION_STILL_REQUIRED'
  | 'ACTIVE_PRIMARY_NARROWED_FAMILY_FOLLOWUP_REQUIRED'
  | 'ACTIVE_PRIMARY_SINGLE_SOURCE_T5_BRIDGE_STILL_REQUIRED'
  | 'ACTIVE_PRIMARY_DIMENSION_SPECIFIC_T5_BRIDGE_STILL_REQUIRED_WITH_PLURALITY_EXCLUDED'
  | 'CONDITIONAL_UNCONSUMED_DIMENSION_REMAINS_OPEN'
  | 'PACK_LEVEL_DEFERRED_REMAINS_OPEN';

export interface CareerT8B24GapAssessment {
  gapId: CareerT8SynthesisAuthorityGapId;
  preB23CoverageClass: CareerT8B24CoverageClass;
  b23CoverageDelta: 'NONE' | 'NONE_TO_MATERIAL_PARTIAL';
  currentCoverageClass: CareerT8B24CoverageClass;
  requirementFullySatisfied: false;
  authorityAdmissionReady: false;
  gapClosureReady: false;
  remediationDisposition: CareerT8B24RemediationDisposition;
  remainingRequirements: readonly string[];
  assessmentNote: string;
}

export const CAREER_T8_B24_GAP_ASSESSMENTS = Object.freeze([
  Object.freeze({
    gapId: 'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
    preB23CoverageClass: 'PARTIAL_REQUIREMENT_COVERAGE',
    b23CoverageDelta: 'NONE',
    currentCoverageClass: 'PARTIAL_REQUIREMENT_COVERAGE',
    requirementFullySatisfied: false,
    authorityAdmissionReady: false,
    gapClosureReady: false,
    remediationDisposition: 'ACTIVE_PRIMARY_BODY_ACQUISITION_STILL_REQUIRED',
    remainingRequirements: Object.freeze([
      'Directly acquire and inspect Qin Lunshi printed p.464 section body and sufficient surrounding local context.',
      'Establish exact Ten-God subtype-role preservation and direct multi-claim Career composition from the body rather than the TOC heading.',
      'Inventory explicit limits/exceptions and dependencies on 旺衰/格局/用神/喜忌.',
      'Establish compatibility with the governed current method before any authority admission.',
    ] as const),
    assessmentNote:
      'B23 reconfirmed the corrected ISBN and section locator but did not acquire the p.464 body. The pre-existing partial lead therefore does not advance to material or full coverage.',
  }),
  Object.freeze({
    gapId: 'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
    preB23CoverageClass: 'NONE',
    b23CoverageDelta: 'NONE_TO_MATERIAL_PARTIAL',
    currentCoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
    requirementFullySatisfied: false,
    authorityAdmissionReady: false,
    gapClosureReady: false,
    remediationDisposition: 'ACTIVE_PRIMARY_NARROWED_FAMILY_FOLLOWUP_REQUIRED',
    remainingRequirements: Object.freeze([
      'Obtain source-explicit context limits or exceptions governing the named relation-to-Career semantic.',
      'Establish compatibility of the relation semantics with the governed current Career method.',
      'Establish an explicit distinction between structural relation presence and the Career semantic effect rather than inferring that distinction from juxtaposition.',
      'Continue prohibiting modernization of 武備/貿遷 into present-day occupation recommendations without separate authority.',
    ] as const),
    assessmentNote:
      'I253/Qianli p.49 materially advances this gap because a corrected primary page directly binds named relation patterns to 事業. B23 correctly stops short of full coverage because three mandatory B22 checks remain unresolved.',
  }),
  Object.freeze({
    gapId: 'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
    preB23CoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
    b23CoverageDelta: 'NONE',
    currentCoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
    requirementFullySatisfied: false,
    authorityAdmissionReady: false,
    gapClosureReady: false,
    remediationDisposition: 'ACTIVE_PRIMARY_SINGLE_SOURCE_T5_BRIDGE_STILL_REQUIRED',
    remainingRequirements: Object.freeze([
      'Acquire one source-bound bridge from an identified branch clash and participants to a specific governed current-T5 Career semantic.',
      'Require the qualitative modification mode to be source explicit: preserved, constrained, redirected, or otherwise qualified.',
      'Acquire material limits/exceptions and establish current-method compatibility.',
      'Do not stitch Qianli p.14 mechanics to Xu Career semantics and do not import Xu relative-force hierarchy.',
    ] as const),
    assessmentNote:
      'B23 preserves strong but non-composable partial anchors. No qualifying single-source bridge was acquired, so the requirement remains materially partial and open.',
  }),
  Object.freeze({
    gapId: 'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
    preB23CoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
    b23CoverageDelta: 'NONE',
    currentCoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
    requirementFullySatisfied: false,
    authorityAdmissionReady: false,
    gapClosureReady: false,
    remediationDisposition: 'ACTIVE_PRIMARY_DIMENSION_SPECIFIC_T5_BRIDGE_STILL_REQUIRED_WITH_PLURALITY_EXCLUDED',
    remainingRequirements: Object.freeze([
      'Preserve Xu position/separation evidence as partial only until it is bound to a specific governed current-T5 Career semantic.',
      'Acquire visibility-to-Career/current-T5 semantic authority separately if visibility remains a consumed dimension.',
      'Keep plurality unconsumed under I254; transcription 多寡 may not fill the missing primary authority.',
      'Do not let position evidence substitute for visibility or plurality and do not introduce numeric distance/count weights.',
    ] as const),
    assessmentNote:
      'B23 adds a stronger exclusion boundary through I254 but no new Career semantic modifier authority. Position remains partial, visibility remains unbound, and plurality is explicitly excluded rather than guessed.',
  }),
  Object.freeze({
    gapId: 'SEASONAL_PHASE_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
    preB23CoverageClass: 'NONE',
    b23CoverageDelta: 'NONE',
    currentCoverageClass: 'NONE',
    requirementFullySatisfied: false,
    authorityAdmissionReady: false,
    gapClosureReady: false,
    remediationDisposition: 'CONDITIONAL_UNCONSUMED_DIMENSION_REMAINS_OPEN',
    remainingRequirements: Object.freeze([
      'Do not execute seasonal Career remediation unless a later governed methodology explicitly selects seasonal-phase consumption.',
      'If later consumed, acquire categorical 旺/相/休/囚/死 to Career/current-T5 semantic modification authority with scope and exceptions.',
      'Do not substitute numeric strength scores, winners, or I254-held transcription for the missing authority.',
    ] as const),
    assessmentNote:
      'B23 does not consume the seasonal dimension. The mandatory historical gap remains open, but its remediation path remains conditional and inactive under the current bounded design.',
  }),
  Object.freeze({
    gapId: 'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING',
    preB23CoverageClass: 'LEAD_ONLY',
    b23CoverageDelta: 'NONE',
    currentCoverageClass: 'LEAD_ONLY',
    requirementFullySatisfied: false,
    authorityAdmissionReady: false,
    gapClosureReady: false,
    remediationDisposition: 'PACK_LEVEL_DEFERRED_REMAINS_OPEN',
    remainingRequirements: Object.freeze([
      'Acquire an explicit qualitative coexistence/reinforcement/constraint/tension policy before a broad pack composes several independently authorized Career patterns.',
      'Distinguish coexistence and tension from precedence and state conditions for any precedence rule.',
      'Do not substitute weighted voting, relative-force hierarchy, missing-claim-as-negative logic, or legacy T8 ordering.',
    ] as const),
    assessmentNote:
      'The pack-level conflict requirement remains deferred. B23 correctly did not activate or silently solve it.',
  }),
] as const satisfies readonly CareerT8B24GapAssessment[]);

export const CAREER_T8_B24_TARGETED_EVIDENCE_ADEQUACY_CONTROL_IDS = Object.freeze([
  'B24_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B23_EVIDENCE_BOUNDARY',
  'ALL_SIX_FROZEN_T8_SYNTHESIS_AUTHORITY_GAPS_ARE_REASSESSED_EXACTLY_ONCE',
  'B23_MATERIALLY_ADVANCES_ONLY_THE_FAMILY_RELATION_GAP_FROM_NONE_TO_MATERIAL_PARTIAL',
  'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE_IS_NOT_FULL_AUTHORITY_COVERAGE_OR_GAP_CLOSURE',
  'QIN_P464_BODY_AND_LOCAL_CONTEXT_REMAIN_REQUIRED_FOR_EXACT_SUBTYPE_COMPOSITION',
  'FAMILY_RELATION_FOLLOWUP_IS_NARROWED_TO_LIMITS_METHOD_COMPATIBILITY_AND_STRUCTURE_EFFECT_DISTINCTION',
  'BRANCH_CLASH_STILL_REQUIRES_A_SINGLE_SOURCE_SPECIFIC_CURRENT_T5_CAREER_MODIFIER_BRIDGE',
  'POSITION_VISIBILITY_AND_PLURALITY_REMAIN_SEPARATE_WITH_I254_PLURALITY_EXCLUDED',
  'SEASONAL_REMEDIATION_REMAINS_CONDITIONAL_AND_UNCONSUMED_WHILE_THE_HISTORICAL_GAP_STAYS_OPEN',
  'CONFLICT_POLICY_REMAINS_PACK_LEVEL_DEFERRED_AND_MAY_NOT_BE_REPLACED_BY_HIDDEN_PRECEDENCE',
  'NO_AUTHORITY_ADMISSION_GAP_CLOSURE_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION',
  'NEXT_GATE_MAY_ONLY_MATERIALIZE_A_BOUNDED_CONTINUATION_PLAN_FOR_THE_REMAINING_REMEDIATION_FRONTIER',
] as const);

export interface CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_ADEQUACY_REVIEW_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_ADEQUACY_REVIEW'
    | 'UPSTREAM_B23_BOUNDARY_INVALID';
  decision:
    | 'B23_FAMILY_RELATION_MATERIALLY_ADVANCED_BUT_ZERO_REQUIREMENTS_FULLY_SATISFIED_FOUR_ACTIVE_ONE_CONDITIONAL_ONE_DEFERRED_REMEDIATION_PATHS_REMAIN_NO_AUTHORITY_ADMISSION'
    | 'TARGETED_REMEDIATION_EVIDENCE_ADEQUACY_NOT_ESTABLISHED';
  upstreamB23EvidenceId: string;
  exactB23BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  gapAssessments: readonly CareerT8B24GapAssessment[];
  gapAssessmentCount: 6 | 0;
  gapsWithMaterialPartialCoverageCount: 3 | 0;
  gapsWithAnyLeadOrPartialCoverageCount: 5 | 0;
  fullySatisfiedGapCount: 0;
  allSixGapsRemainOpen: true;
  unresolvedGapIds: readonly CareerT8SynthesisAuthorityGapId[];
  familyRelationCoverageMateriallyAdvanced: boolean;
  familyRelationRemediationNarrowed: boolean;
  qinP464BodyAcquisitionStillRequired: boolean;
  branchClashSingleSourceT5BridgeStillRequired: boolean;
  positionVisibilityDimensionSpecificBridgeStillRequired: boolean;
  pluralityRemainsExcludedUnderI254: boolean;
  seasonalRemediationExecutableNow: false;
  conflictPolicyRemediationExecutableNow: false;
  activePrimaryRemediationPathCount: 4 | 0;
  conditionalRemediationPathCount: 1 | 0;
  packLevelDeferredRemediationPathCount: 1 | 0;
  b23EvidenceAdequateForContinuationPlanning: boolean;
  b23EvidenceAdequateForAuthorityAdmission: false;
  b23EvidenceAdequateForGapClosure: false;
  crossSourceRequirementStitchingAuthorized: false;
  relativeForceOrAutomaticPrecedenceAuthorized: false;
  methodologyChoiceMadeByThisGate: false;
  authorityAdmittedByThisGate: false;
  authorityGapClosedByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B24_TARGETED_EVIDENCE_ADEQUACY_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    adequacyAssessmentsCreated: 6 | 0;
    gapsMateriallyAdvancedSinceB21: 1 | 0;
    gapsFullySatisfied: 0;
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
    | 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_CONTINUATION_READINESS_REVIEW'
    | 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_ADEQUACY_REVIEW';
}

function contentAddressedB23IdentityValid(
  b23: CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceReport,
): boolean {
  const { evidenceId, ...material } = b23;
  return (
    evidenceId ===
    `career_t8_current_method_residual_authority_targeted_remediation_evidence_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB23Accepted(
  b23: CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceReport,
): boolean {
  const materialPartialRecords = b23.records.filter(
    (record) => record.coverageClass === 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
  );

  return (
    contentAddressedB23IdentityValid(b23) &&
    b23.evidenceVersion === CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_VERSION &&
    b23.status === 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE' &&
    b23.decision ===
      'FOUR_ACTIVE_TASKS_EVALUATED_FAMILY_RELATION_ADVANCED_TO_MATERIAL_PARTIAL_QIN_BODY_AND_TWO_T6_BRIDGES_REMAIN_UNSATISFIED_SEASON_PLURALITY_EXCLUDED_NO_AUTHORITY_ADMISSION' &&
    b23.exactB22BoundaryAccepted &&
    b23.domain === 'career' &&
    b23.temporalScope === 'natal' &&
    b23.statusClass === 'research' &&
    b23.historicalB20QinIsbnRetainedAsAuditRecord === '9787504098774' &&
    b23.canonicalQinIsbn === '9787204098774' &&
    b23.historicalB20ArtifactRewritten === false &&
    b23.recordCount === 4 &&
    b23.evaluatedActiveTaskCount === 4 &&
    deterministicContentHash(b23.records) === deterministicContentHash(CAREER_T8_B23_TARGETED_EVIDENCE_RECORDS) &&
    materialPartialRecords.length === 1 &&
    materialPartialRecords[0]?.targetGapId === 'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING' &&
    b23.familyRelationCoverageAdvancedFromNone &&
    b23.familyRelationCoverageNow === 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE' &&
    b23.familyRelationAuthorityAdmitted === false &&
    b23.qinP464BodyAcquired === false &&
    b23.qinP464BodyStillRequired &&
    b23.branchClashSpecificT5ModifierBridgeAcquired === false &&
    b23.positionSpecificT5ModifierBridgeAcquired === false &&
    b23.visibilityCareerBindingAcquired === false &&
    b23.pluralityCareerBindingAcquired === false &&
    b23.pluralityExplicitlyExcludedByI254 &&
    b23.seasonalCareerDimensionConsumed === false &&
    b23.conditionalSeasonalRemediationActivated === false &&
    b23.conflictPolicyTaskActivated === false &&
    b23.crossSourceRequirementStitchingUsed === false &&
    b23.relativeForceOrAutomaticPrecedenceImported === false &&
    b23.allSixGapsRemainOpen &&
    deterministicContentHash(b23.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b23.authorityAdmittedByThisGate === false &&
    b23.authorityGapClosedByThisGate === false &&
    b23.methodologyChoiceMadeByThisGate === false &&
    b23.t8RuleAuthoringAuthorized === false &&
    b23.t8ClaimTypeCreationAuthorized === false &&
    b23.personalizedT8PackCreationAuthorized === false &&
    b23.consumerNarrativeAuthorized === false &&
    b23.previewDefaultSwitchAuthorized === false &&
    b23.productionPromotionAuthorized === false &&
    b23.productionImpact === 'NONE' &&
    b23.controlCount === 12 &&
    b23.controlsFrozen &&
    deterministicContentHash(b23.controlIds) === deterministicContentHash(CAREER_T8_B23_TARGETED_REMEDIATION_EVIDENCE_CONTROL_IDS) &&
    b23.recommendedNextGate ===
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_ADEQUACY_REVIEW'
  );
}

function finalized(
  material: Omit<
    CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReviewReport,
    'reviewId'
  >,
): CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReviewReport {
  return {
    reviewId: `career_t8_current_method_residual_authority_targeted_remediation_evidence_adequacy_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReview(
  b23: CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceReport,
): CareerPersonalizationT8CurrentMethodResidualAuthorityTargetedRemediationEvidenceAdequacyReviewReport {
  const accepted = exactB23Accepted(b23);

  return finalized({
    reviewVersion: CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_ADEQUACY_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_ADEQUACY_REVIEW'
      : 'UPSTREAM_B23_BOUNDARY_INVALID',
    decision: accepted
      ? 'B23_FAMILY_RELATION_MATERIALLY_ADVANCED_BUT_ZERO_REQUIREMENTS_FULLY_SATISFIED_FOUR_ACTIVE_ONE_CONDITIONAL_ONE_DEFERRED_REMEDIATION_PATHS_REMAIN_NO_AUTHORITY_ADMISSION'
      : 'TARGETED_REMEDIATION_EVIDENCE_ADEQUACY_NOT_ESTABLISHED',
    upstreamB23EvidenceId: b23.evidenceId,
    exactB23BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    gapAssessments: accepted ? CAREER_T8_B24_GAP_ASSESSMENTS : Object.freeze([]),
    gapAssessmentCount: accepted ? 6 : 0,
    gapsWithMaterialPartialCoverageCount: accepted ? 3 : 0,
    gapsWithAnyLeadOrPartialCoverageCount: accepted ? 5 : 0,
    fullySatisfiedGapCount: 0,
    allSixGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    familyRelationCoverageMateriallyAdvanced: accepted,
    familyRelationRemediationNarrowed: accepted,
    qinP464BodyAcquisitionStillRequired: accepted,
    branchClashSingleSourceT5BridgeStillRequired: accepted,
    positionVisibilityDimensionSpecificBridgeStillRequired: accepted,
    pluralityRemainsExcludedUnderI254: accepted,
    seasonalRemediationExecutableNow: false,
    conflictPolicyRemediationExecutableNow: false,
    activePrimaryRemediationPathCount: accepted ? 4 : 0,
    conditionalRemediationPathCount: accepted ? 1 : 0,
    packLevelDeferredRemediationPathCount: accepted ? 1 : 0,
    b23EvidenceAdequateForContinuationPlanning: accepted,
    b23EvidenceAdequateForAuthorityAdmission: false,
    b23EvidenceAdequateForGapClosure: false,
    crossSourceRequirementStitchingAuthorized: false,
    relativeForceOrAutomaticPrecedenceAuthorized: false,
    methodologyChoiceMadeByThisGate: false,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? CAREER_T8_B24_TARGETED_EVIDENCE_ADEQUACY_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      adequacyAssessmentsCreated: accepted ? 6 : 0,
      gapsMateriallyAdvancedSinceB21: accepted ? 1 : 0,
      gapsFullySatisfied: 0,
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
      ? 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_CONTINUATION_READINESS_REVIEW'
      : 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_EVIDENCE_ADEQUACY_REVIEW',
  });
}
