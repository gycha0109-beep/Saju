import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_VERSION,
  CAREER_T8_CURRENT_METHOD_ACQUISITION_CANDIDATES,
  CAREER_T8_CURRENT_METHOD_ACQUISITION_EVIDENCE_CONTROL_IDS,
  type CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidenceReport,
  type CareerT8CurrentMethodAcquisitionCandidateId,
} from './career-personalization-t8-current-method-residual-authority-acquisition-evidence.js';
import type { CareerT8SynthesisAuthorityGapId } from './career-personalization-t8-synthesis-authority-gap-requirements-review.js';

export const CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-current-method-residual-authority-evidence-adequacy-reassessment-review-v1' as const;

export type CareerT8CurrentMethodGapEvidenceCoverageClass =
  | 'NONE'
  | 'LEAD_ONLY'
  | 'PARTIAL_REQUIREMENT_COVERAGE'
  | 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE';

export type CareerT8CurrentMethodResidualRemediationPriority =
  | 'ACTIVE_PRIMARY'
  | 'CONDITIONAL_IF_DIMENSION_CONSUMED'
  | 'PACK_LEVEL_DEFERRED';

export type CareerT8CurrentMethodResidualRemediationPathId =
  | 'QIN_LUNSHI_P464_BODY_ACQUISITION'
  | 'T5_FAMILY_RELATION_DIRECT_CAREER_SOURCE_DISCOVERY'
  | 'T6_BRANCH_CLASH_TO_T5_SEMANTIC_BINDING_SOURCE_DISCOVERY'
  | 'T6_POSITION_VISIBILITY_PLURALITY_CURRENT_METHOD_SOURCE_DISCOVERY'
  | 'SEASONAL_PHASE_CAREER_MODIFIER_SOURCE_DISCOVERY_IF_CONSUMED'
  | 'MULTI_PATTERN_CONFLICT_POLICY_SOURCE_DISCOVERY';

export interface CareerT8CurrentMethodGapEvidenceAssessment {
  gapId: CareerT8SynthesisAuthorityGapId;
  candidateIds: readonly CareerT8CurrentMethodAcquisitionCandidateId[];
  coverageClass: CareerT8CurrentMethodGapEvidenceCoverageClass;
  explicitCareerBindingObserved: boolean;
  exactCurrentT5ModifierBindingObserved: boolean;
  independentNormativeProvenanceObserved: boolean;
  currentMethodCompatibilityEstablished: boolean;
  fullRequirementSatisfied: false;
  gapClosed: false;
  residualNeed: string;
}

export interface CareerT8CurrentMethodResidualRemediationPath {
  pathId: CareerT8CurrentMethodResidualRemediationPathId;
  priority: CareerT8CurrentMethodResidualRemediationPriority;
  targetGapIds: readonly CareerT8SynthesisAuthorityGapId[];
  anchorCandidateIds: readonly CareerT8CurrentMethodAcquisitionCandidateId[];
  objective: string;
  mayUseExistingPartialEvidenceAsAnchor: boolean;
  newSourceOrPassageEvidenceRequired: true;
  authorityAdmissionOnCompletion: false;
  gapClosureOnCompletion: false;
  t8AuthoringOnCompletion: false;
}

export const CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_EVIDENCE_ADEQUACY_CONTROL_IDS = Object.freeze([
  'B21_REASSESSES_B20_EVIDENCE_ONLY_AND_PERFORMS_NO_NEW_SOURCE_ACQUISITION',
  'PARTIAL_REQUIREMENT_COVERAGE_IS_NOT_AUTHORITY_ADMISSION_OR_GAP_CLOSURE',
  'QIN_TOC_IS_A_TARGETED_BODY_ACQUISITION_LEAD_NOT_PASSAGE_AUTHORITY',
  'WANG_DIRECT_T5_CAREER_WEB_SEMANTICS_DO_NOT_OVERRIDE_PROVENANCE_OR_METHOD_INADEQUACY',
  'XU_DIRECT_CLASH_CAREER_SEMANTICS_ARE_MATERIAL_PARTIAL_COVERAGE_ONLY',
  'XU_POSITION_TEXT_MAY_ANCHOR_POSITION_DISCOVERY_BUT_NOT_VISIBILITY_PLURALITY_OR_T5_MODIFIER_AUTHORITY',
  'RELATIVE_FORCE_OR_STRENGTH_LANGUAGE_MAY_NOT_BE_IMPORTED_TO_FILL_ANY_REQUIREMENT',
  'FAMILY_RELATION_AND_SEASONAL_GAPS_REMAIN_UNSATISFIED_WITHOUT_DIRECT_SOURCE_BOUND_EVIDENCE',
  'CONFLICT_TENSION_POLICY_MAY_NOT_BE_SYNTHESIZED_FROM_STRENGTH_HIERARCHIES',
  'UNCONSUMED_T6_DIMENSIONS_MAY_REMAIN_OPEN_AND_MAY_NOT_BE_SILENTLY_CONSUMED',
  'CHEONBU_AND_WANG_QING_HOLDS_REMAIN_UNCHANGED',
  'ALL_SIX_GAPS_REMAIN_OPEN_NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT',
] as const);

const GAP_ASSESSMENTS = Object.freeze([
  Object.freeze({
    gapId: 'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
    candidateIds: Object.freeze([
      'YANG_YIYUN_FULL_TEXT_REINSPECTION',
      'QIN_LUNSHI_2010_PUBLISHED_TENGOD_CAREER_CHAPTER_LEAD',
      'WANG_YUANTANG_2022_DIRECT_TENGOD_CAREER_WEB_LEAD',
    ] as const),
    coverageClass: 'PARTIAL_REQUIREMENT_COVERAGE',
    explicitCareerBindingObserved: true,
    exactCurrentT5ModifierBindingObserved: false,
    independentNormativeProvenanceObserved: true,
    currentMethodCompatibilityEstablished: false,
    fullRequirementSatisfied: false,
    gapClosed: false,
    residualNeed:
      'Acquire and inspect Qin Lunshi printed p.464 按十神組合選職業 body with surrounding dependencies, then verify whether it preserves exact subtype roles and supplies Career composition without requiring incompatible 旺衰/用神/喜忌 logic. Independent current-method-compatible formal authority remains required if it does not.',
  }),
  Object.freeze({
    gapId: 'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
    candidateIds: Object.freeze([] as const),
    coverageClass: 'NONE',
    explicitCareerBindingObserved: false,
    exactCurrentT5ModifierBindingObserved: false,
    independentNormativeProvenanceObserved: false,
    currentMethodCompatibilityEstablished: false,
    fullRequirementSatisfied: false,
    gapClosed: false,
    residualNeed:
      'Discover an independent source that explicitly binds a named Ten-God family generation/control relation to Career or work expression while distinguishing structural relation presence from Career semantic effect.',
  }),
  Object.freeze({
    gapId: 'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
    candidateIds: Object.freeze([
      'XU_BINGXIN_2009_SIX_CLASH_CAREER_POSITION',
      'SIX_CLASH_CAREER_DERIVATIVE_WEB_CLUSTER',
    ] as const),
    coverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
    explicitCareerBindingObserved: true,
    exactCurrentT5ModifierBindingObserved: false,
    independentNormativeProvenanceObserved: true,
    currentMethodCompatibilityEstablished: false,
    fullRequirementSatisfied: false,
    gapClosed: false,
    residualNeed:
      'Find source-bound evidence that an identified branch clash qualitatively preserves, constrains, redirects, or otherwise qualifies a specific Ten-God/current-T5 Career semantic. Xu may remain a direct clash-to-Career anchor only; it does not itself create the missing T5 modifier bridge.',
  }),
  Object.freeze({
    gapId: 'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
    candidateIds: Object.freeze([
      'XU_BINGXIN_2009_SIX_CLASH_CAREER_POSITION',
      'SIX_CLASH_CAREER_DERIVATIVE_WEB_CLUSTER',
    ] as const),
    coverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
    explicitCareerBindingObserved: true,
    exactCurrentT5ModifierBindingObserved: false,
    independentNormativeProvenanceObserved: true,
    currentMethodCompatibilityEstablished: false,
    fullRequirementSatisfied: false,
    gapClosed: false,
    residualNeed:
      'Retain Xu only as qualitative position/separation Career evidence. Acquire current-method-compatible evidence for the Career/T5 semantic effect of position plus any visibility or plurality dimension intended for consumption, without importing relative-force weighting or automatic precedence.',
  }),
  Object.freeze({
    gapId: 'SEASONAL_PHASE_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
    candidateIds: Object.freeze([] as const),
    coverageClass: 'NONE',
    explicitCareerBindingObserved: false,
    exactCurrentT5ModifierBindingObserved: false,
    independentNormativeProvenanceObserved: false,
    currentMethodCompatibilityEstablished: false,
    fullRequirementSatisfied: false,
    gapClosed: false,
    residualNeed:
      'If seasonal phase will be consumed by personalized Career T8, acquire source-bound categorical 旺/相/休/囚/死 to Career/T5 semantic modification authority. Otherwise keep the dimension explicitly unconsumed and open.',
  }),
  Object.freeze({
    gapId: 'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING',
    candidateIds: Object.freeze([
      'YANG_YIYUN_FULL_TEXT_REINSPECTION',
      'WANG_YUANTANG_2022_DIRECT_TENGOD_CAREER_WEB_LEAD',
    ] as const),
    coverageClass: 'LEAD_ONLY',
    explicitCareerBindingObserved: true,
    exactCurrentT5ModifierBindingObserved: false,
    independentNormativeProvenanceObserved: false,
    currentMethodCompatibilityEstablished: false,
    fullRequirementSatisfied: false,
    gapClosed: false,
    residualNeed:
      'Acquire an explicit source-bound coexistence, reinforcement, constraint, or conflict composition policy for multiple Career patterns. Relative-strength hierarchy in Yang/Wang may not substitute for a current-method conflict/tension policy.',
  }),
] as const satisfies readonly CareerT8CurrentMethodGapEvidenceAssessment[]);

const REMEDIATION_PATHS = Object.freeze([
  Object.freeze({
    pathId: 'QIN_LUNSHI_P464_BODY_ACQUISITION',
    priority: 'ACTIVE_PRIMARY',
    targetGapIds: Object.freeze(['EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING'] as const),
    anchorCandidateIds: Object.freeze(['QIN_LUNSHI_2010_PUBLISHED_TENGOD_CAREER_CHAPTER_LEAD'] as const),
    objective:
      'Acquire the exact printed p.464 section body and surrounding context, then evaluate subtype preservation, direct Career composition, exceptions, and dependency on 旺衰/格局/用神/喜忌.',
    mayUseExistingPartialEvidenceAsAnchor: true,
    newSourceOrPassageEvidenceRequired: true,
    authorityAdmissionOnCompletion: false,
    gapClosureOnCompletion: false,
    t8AuthoringOnCompletion: false,
  }),
  Object.freeze({
    pathId: 'T5_FAMILY_RELATION_DIRECT_CAREER_SOURCE_DISCOVERY',
    priority: 'ACTIVE_PRIMARY',
    targetGapIds: Object.freeze(['FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING'] as const),
    anchorCandidateIds: Object.freeze([] as const),
    objective:
      'Discover direct current-method-compatible source authority for named Ten-God family generation/control relations to Career/work expression.',
    mayUseExistingPartialEvidenceAsAnchor: false,
    newSourceOrPassageEvidenceRequired: true,
    authorityAdmissionOnCompletion: false,
    gapClosureOnCompletion: false,
    t8AuthoringOnCompletion: false,
  }),
  Object.freeze({
    pathId: 'T6_BRANCH_CLASH_TO_T5_SEMANTIC_BINDING_SOURCE_DISCOVERY',
    priority: 'ACTIVE_PRIMARY',
    targetGapIds: Object.freeze(['BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING'] as const),
    anchorCandidateIds: Object.freeze(['XU_BINGXIN_2009_SIX_CLASH_CAREER_POSITION'] as const),
    objective:
      'Use Xu only as direct clash-to-Career anchor while discovering an explicit relation-local branch-clash to specific Ten-God/current-T5 Career semantic modifier bridge.',
    mayUseExistingPartialEvidenceAsAnchor: true,
    newSourceOrPassageEvidenceRequired: true,
    authorityAdmissionOnCompletion: false,
    gapClosureOnCompletion: false,
    t8AuthoringOnCompletion: false,
  }),
  Object.freeze({
    pathId: 'T6_POSITION_VISIBILITY_PLURALITY_CURRENT_METHOD_SOURCE_DISCOVERY',
    priority: 'ACTIVE_PRIMARY',
    targetGapIds: Object.freeze(['VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING'] as const),
    anchorCandidateIds: Object.freeze(['XU_BINGXIN_2009_SIX_CLASH_CAREER_POSITION'] as const),
    objective:
      'Retain Xu position/separation text as partial anchor and seek qualitative current-method-compatible Career/T5 binding for position and any visibility/plurality dimensions intended for use.',
    mayUseExistingPartialEvidenceAsAnchor: true,
    newSourceOrPassageEvidenceRequired: true,
    authorityAdmissionOnCompletion: false,
    gapClosureOnCompletion: false,
    t8AuthoringOnCompletion: false,
  }),
  Object.freeze({
    pathId: 'SEASONAL_PHASE_CAREER_MODIFIER_SOURCE_DISCOVERY_IF_CONSUMED',
    priority: 'CONDITIONAL_IF_DIMENSION_CONSUMED',
    targetGapIds: Object.freeze(['SEASONAL_PHASE_TO_CAREER_SEMANTIC_MODIFIER_MISSING'] as const),
    anchorCandidateIds: Object.freeze([] as const),
    objective:
      'Acquire categorical seasonal-phase Career modifier authority only if the personalized T8 design intends to consume that dimension; otherwise preserve it as explicitly unconsumed.',
    mayUseExistingPartialEvidenceAsAnchor: false,
    newSourceOrPassageEvidenceRequired: true,
    authorityAdmissionOnCompletion: false,
    gapClosureOnCompletion: false,
    t8AuthoringOnCompletion: false,
  }),
  Object.freeze({
    pathId: 'MULTI_PATTERN_CONFLICT_POLICY_SOURCE_DISCOVERY',
    priority: 'PACK_LEVEL_DEFERRED',
    targetGapIds: Object.freeze(['MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING'] as const),
    anchorCandidateIds: Object.freeze([] as const),
    objective:
      'Acquire an explicit qualitative conflict/tension composition policy before any broad personalized Career T8 pack combines several independently authorized patterns.',
    mayUseExistingPartialEvidenceAsAnchor: false,
    newSourceOrPassageEvidenceRequired: true,
    authorityAdmissionOnCompletion: false,
    gapClosureOnCompletion: false,
    t8AuthoringOnCompletion: false,
  }),
] as const satisfies readonly CareerT8CurrentMethodResidualRemediationPath[]);

export interface CareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_EVIDENCE_ADEQUACY_REASSESSMENT'
    | 'UPSTREAM_B20_BOUNDARY_INVALID';
  decision:
    | 'B20_EVIDENCE_MATERIALLY_ADVANCES_T6_CLASH_AND_POSITION_COVERAGE_BUT_NO_GAP_HAS_FULL_AUTHORITY_COVERAGE_TARGETED_REMEDIATION_REQUIRED'
    | 'CURRENT_METHOD_RESIDUAL_AUTHORITY_EVIDENCE_ADEQUACY_NOT_ESTABLISHED';
  upstreamB20EvidenceId: string;
  exactB20BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  gapAssessments: readonly CareerT8CurrentMethodGapEvidenceAssessment[];
  gapAssessmentCount: 6 | 0;
  gapsWithMaterialPartialCoverageCount: 2 | 0;
  gapsWithAnyLeadOrPartialCoverageCount: 4 | 0;
  fullySatisfiedGapCount: 0;
  allSixGapsRemainOpen: true;
  unresolvedGapIds: readonly CareerT8SynthesisAuthorityGapId[];
  remediationPaths: readonly CareerT8CurrentMethodResidualRemediationPath[];
  remediationPathCount: 6 | 0;
  activePrimaryRemediationPathCount: 4 | 0;
  conditionalRemediationPathCount: 1 | 0;
  packLevelDeferredRemediationPathCount: 1 | 0;
  b20EvidenceAdequateForTargetedRemediationSelection: boolean;
  b20EvidenceAdequateForAuthorityAdmission: false;
  b20EvidenceAdequateForGapClosure: false;
  qinP464BodyAcquisitionRemainsRequired: boolean;
  xuMayAnchorDirectClashCareerAndPositionRemediation: boolean;
  xuMaySatisfyExactT5ModifierBridgeByItself: false;
  visibilityPluralityAuthorityStillAbsent: true;
  seasonalAuthorityStillAbsent: true;
  familyRelationAuthorityStillAbsent: true;
  conflictPolicyAuthorityStillAbsent: true;
  relativeForceMayFillResidualRequirement: false;
  crossSourceStitchingAuthorized: false;
  cheonbuHoldReclassified: false;
  wangQingHoldReclassified: false;
  methodologyChoiceMadeByThisGate: false;
  newSourceAcquisitionPerformedByThisGate: false;
  authorityAdmittedByThisGate: false;
  authorityGapClosedByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_EVIDENCE_ADEQUACY_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
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
    | 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_READINESS_REVIEW'
    | 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW';
}

function contentAddressedB20IdentityValid(
  b20: CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidenceReport,
): boolean {
  const { evidenceId, ...material } = b20;
  return (
    evidenceId ===
    `career_t8_current_method_residual_authority_acquisition_evidence_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB20Accepted(
  b20: CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidenceReport,
): boolean {
  return (
    contentAddressedB20IdentityValid(b20) &&
    b20.evidenceVersion === CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_VERSION &&
    b20.status === 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE' &&
    b20.decision ===
      'TWO_CURRENT_METHOD_ACQUISITIONS_EXECUTED_PARTIAL_DIRECT_EVIDENCE_FOUND_ZERO_QUALIFYING_AUTHORITY_ALL_SIX_GAPS_OPEN' &&
    b20.exactB19BoundaryAccepted &&
    b20.acquisitionExecutionCount === 2 &&
    b20.candidateEvidenceCount === 5 &&
    deterministicContentHash(b20.candidateEvidence) === deterministicContentHash(CAREER_T8_CURRENT_METHOD_ACQUISITION_CANDIDATES) &&
    b20.qualifyingCurrentMethodAuthorityCandidateCount === 0 &&
    b20.authorityCandidatesAcceptedByThisGate === 0 &&
    b20.authorityAcquiredByThisGate === false &&
    b20.authorityGapClosedByThisGate === false &&
    b20.gapClosureCount === 0 &&
    b20.allSixGapsRemainOpen &&
    deterministicContentHash(b20.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b20.qinFormalPublishedCareerCombinationChapterLeadConfirmed &&
    b20.qinTargetPassageBodyInspected === false &&
    b20.xuBingxinFormalPublicationConfirmed &&
    b20.xuBingxinDirectBranchClashCareerSemanticsConfirmed &&
    b20.xuBingxinPositionCareerSemanticsConfirmed &&
    b20.xuBingxinExactCurrentT5ModifierBridgeConfirmed === false &&
    b20.visibilityCareerModifierAuthorityConfirmed === false &&
    b20.pluralityCareerModifierAuthorityConfirmed === false &&
    b20.seasonalCareerModifierAuthorityConfirmed === false &&
    b20.derivativeWebClusterTreatedAsIndependentAuthorities === false &&
    b20.cheonbuHoldReclassified === false &&
    b20.wangQingHoldReclassified === false &&
    b20.methodologyChoiceMadeByThisGate === false &&
    b20.crossSourceStitchingAuthorized === false &&
    b20.controlCount === 12 &&
    b20.controlsFrozen &&
    deterministicContentHash(b20.controlIds) === deterministicContentHash(CAREER_T8_CURRENT_METHOD_ACQUISITION_EVIDENCE_CONTROL_IDS) &&
    b20.t8RuleAuthoringAuthorized === false &&
    b20.personalizedT8PackCreationAuthorized === false &&
    b20.productionPromotionAuthorized === false &&
    b20.recommendedNextGate ===
      'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW'
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReviewReport, 'reviewId'>,
): CareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReviewReport {
  return {
    reviewId: `career_t8_current_method_residual_authority_evidence_adequacy_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReview(
  b20: CareerPersonalizationT8CurrentMethodResidualAuthorityAcquisitionEvidenceReport,
): CareerPersonalizationT8CurrentMethodResidualAuthorityEvidenceAdequacyReassessmentReviewReport {
  const accepted = exactB20Accepted(b20);

  return finalized({
    reviewVersion: CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_EVIDENCE_ADEQUACY_REASSESSMENT'
      : 'UPSTREAM_B20_BOUNDARY_INVALID',
    decision: accepted
      ? 'B20_EVIDENCE_MATERIALLY_ADVANCES_T6_CLASH_AND_POSITION_COVERAGE_BUT_NO_GAP_HAS_FULL_AUTHORITY_COVERAGE_TARGETED_REMEDIATION_REQUIRED'
      : 'CURRENT_METHOD_RESIDUAL_AUTHORITY_EVIDENCE_ADEQUACY_NOT_ESTABLISHED',
    upstreamB20EvidenceId: b20.evidenceId,
    exactB20BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    gapAssessments: accepted ? GAP_ASSESSMENTS : Object.freeze([]),
    gapAssessmentCount: accepted ? 6 : 0,
    gapsWithMaterialPartialCoverageCount: accepted ? 2 : 0,
    gapsWithAnyLeadOrPartialCoverageCount: accepted ? 4 : 0,
    fullySatisfiedGapCount: 0,
    allSixGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    remediationPaths: accepted ? REMEDIATION_PATHS : Object.freeze([]),
    remediationPathCount: accepted ? 6 : 0,
    activePrimaryRemediationPathCount: accepted ? 4 : 0,
    conditionalRemediationPathCount: accepted ? 1 : 0,
    packLevelDeferredRemediationPathCount: accepted ? 1 : 0,
    b20EvidenceAdequateForTargetedRemediationSelection: accepted,
    b20EvidenceAdequateForAuthorityAdmission: false,
    b20EvidenceAdequateForGapClosure: false,
    qinP464BodyAcquisitionRemainsRequired: accepted,
    xuMayAnchorDirectClashCareerAndPositionRemediation: accepted,
    xuMaySatisfyExactT5ModifierBridgeByItself: false,
    visibilityPluralityAuthorityStillAbsent: true,
    seasonalAuthorityStillAbsent: true,
    familyRelationAuthorityStillAbsent: true,
    conflictPolicyAuthorityStillAbsent: true,
    relativeForceMayFillResidualRequirement: false,
    crossSourceStitchingAuthorized: false,
    cheonbuHoldReclassified: false,
    wangQingHoldReclassified: false,
    methodologyChoiceMadeByThisGate: false,
    newSourceAcquisitionPerformedByThisGate: false,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted ? CAREER_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_EVIDENCE_ADEQUACY_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
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
      ? 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_TARGETED_REMEDIATION_READINESS_REVIEW'
      : 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW',
  });
}
