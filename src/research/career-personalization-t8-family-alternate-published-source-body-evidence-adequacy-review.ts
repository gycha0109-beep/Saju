import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_BOUNDED_BODY_ACQUISITION_EVIDENCE_VERSION,
  CAREER_T8_B36_FAMILY_BODY_ACQUISITION_RECORDS,
  CAREER_T8_B36_FAMILY_BODY_CONTROL_IDS,
  type CareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidenceReport,
} from './career-personalization-t8-family-alternate-published-source-bounded-body-acquisition-evidence.js';

export const CAREER_PERSONALIZATION_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_BODY_EVIDENCE_ADEQUACY_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-family-alternate-published-source-body-evidence-adequacy-review-v1' as const;

export const CAREER_T8_B37_FAMILY_ADEQUACY_CONTROL_IDS = Object.freeze([
  'B37_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B36_BODY_ACQUISITION_BOUNDARY',
  'THE_2017_CAREER_SOURCE_IS_NOT_ADEQUATE_FOR_ADMISSION_WHILE_TARGET_RELATION_BODY_AND_LIMITS_REMAIN_OUTSIDE_THE_OFFICIAL_PREVIEW',
  'THE_2015_SAME_WORK_BODY_MATERIALLY_SATISFIES_NAMED_RELATION_STRUCTURE_EFFECT_CAREER_BINDING_AND_LIMIT_EVIDENCE',
  'THE_2015_PATH_REMAINS_UNBOUND_TO_THE_EXACT_2015_PRINTED_TARGET_PASSAGE_AND_CANNOT_RECEIVE_EXACT_EDITION_AUTHORITY_STATUS',
  'THE_2015_WORK_EXPLICITLY_REQUIRES_TEN_GOD_MEANINGS_TO_BE_READ_WITH_SHENWANG_SHENRUO_AND_RELATION_EFFECTS_DEPEND_ON_COMPLETE_OR_INCOMPLETE_TRANSFORMATION',
  'CURRENT_CAREER_T5_DOES_NOT_CONSUME_STRENGTH_OR_TRANSFORMATION_DEGREE_AS_A_FAMILY_RELATION_SEMANTIC_MODIFIER',
  'THE_2015_STRENGTH_DEPENDENCY_MAY_NOT_BE_SILENTLY_REMOVED_TO_FORCE_CURRENT_METHOD_COMPATIBILITY',
  'THE_2017_CAREER_CONTEXT_AND_2015_RELATION_SEMANTIC_BODY_MAY_NOT_BE_STITCHED_TO_FORM_A_COMPLETE_FAMILY_AUTHORITY',
  'ZERO_ALTERNATE_FAMILY_PATHS_ARE_ADMISSION_READY_UNDER_THE_CURRENT_METHOD',
  'THE_FAMILY_GAP_REMAINS_MATERIAL_PARTIAL_WITH_QIANLI_HISTORY_AND_NEW_ALTERNATE_EVIDENCE_PRESERVED',
  'POSITION_ADMISSION_READY_COMPONENT_AND_BRANCH_REOPEN_STATE_REMAIN_PRESERVED',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION',
] as const);

export interface CareerPersonalizationT8FamilyAlternatePublishedSourceBodyEvidenceAdequacyReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_BODY_EVIDENCE_ADEQUACY_REVIEW_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_BODY_EVIDENCE_ADEQUACY_REVIEW'
    | 'UPSTREAM_B36_BOUNDARY_INVALID';
  decision:
    | '2017_CAREER_PATH_BODY_INADEQUATE_2015_PATH_MATERIAL_BODY_ADEQUATE_BUT_EXACT_EDITION_AND_MANDATORY_STRENGTH_METHOD_INCOMPATIBLE_ZERO_FAMILY_ADMISSION_READY_PATHS'
    | 'FAMILY_ALTERNATE_BODY_EVIDENCE_ADEQUACY_NOT_ESTABLISHED';
  upstreamB36EvidenceId: string;
  exactB36BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  career2017BodyAdequateForAdmission: false;
  career2017RemainingRequirementIds: readonly ['TARGET_RELATION_NORMATIVE_BODY', 'RELATION_SPECIFIC_LIMITS', 'CURRENT_METHOD_COMPATIBILITY'];
  semantic2015NamedRelationSatisfied: boolean;
  semantic2015StructureEffectSatisfied: boolean;
  semantic2015CareerBindingSatisfied: boolean;
  semantic2015LimitsSatisfied: boolean;
  semantic2015ExactEditionBindingSatisfied: false;
  semantic2015StrengthMethodDependencyMandatory: boolean;
  semantic2015CurrentMethodCompatibilitySatisfied: false;
  semantic2015AdmissionReady: false;
  currentMethodCompatibleAlternatePathCount: 0;
  admissionReadyFamilyCandidateCount: 0;
  familyCoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE';
  familyGapClosureReady: false;
  qianliHistoricalPathPreserved: boolean;
  crossSourceStitchingAuthorized: false;
  strengthDependencyMayBeDropped: false;
  authorityAdmissionReadyComponentCountPreserved: 1 | 0;
  branchTriggerReopenedPreserved: boolean;
  gapClosureReadyCount: 0;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  authorityAdmittedByThisGate: false;
  authorityGapClosedByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B37_FAMILY_ADEQUACY_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  recommendedNextGate:
    | 'FAMILY_RELATION_CURRENT_METHOD_COMPATIBLE_PUBLISHED_SOURCE_REMEDIATION_READINESS_REVIEW'
    | 'FAMILY_RELATION_ALTERNATE_PUBLISHED_SOURCE_BODY_EVIDENCE_ADEQUACY_REVIEW';
}

function contentAddressedB36IdentityValid(
  b36: CareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidenceReport,
): boolean {
  const { evidenceId, ...material } = b36;
  return evidenceId ===
    `career_t8_family_alternate_published_source_body_acquisition_${deterministicContentHash(material).slice(0, 24)}`;
}

function exactB36Accepted(
  b36: CareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidenceReport,
): boolean {
  return (
    contentAddressedB36IdentityValid(b36) &&
    b36.evidenceVersion === CAREER_PERSONALIZATION_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_BOUNDED_BODY_ACQUISITION_EVIDENCE_VERSION &&
    b36.status === 'RESOLVED_CAREER_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_BOUNDED_BODY_ACQUISITION_EVIDENCE' &&
    b36.decision ===
      'TWO_ALTERNATE_PATHS_EXECUTED_2017_TARGET_BODY_NOT_ACQUIRED_2015_RELATION_AND_CAREER_BODY_MATERIALLY_ACQUIRED_EXACT_EDITION_AND_COMPATIBILITY_PENDING_NO_AUTHORITY_ADMISSION' &&
    b36.exactB35BoundaryAccepted &&
    b36.domain === 'career' &&
    b36.temporalScope === 'natal' &&
    deterministicContentHash(b36.records) === deterministicContentHash(CAREER_T8_B36_FAMILY_BODY_ACQUISITION_RECORDS) &&
    b36.recordCount === 2 &&
    b36.acquisitionExecutionCount === 2 &&
    b36.official2017PreviewDirectlyInspected &&
    b36.official2017TargetRelationBodyAcquired === false &&
    b36.sameWork2015RelationBodyAcquired &&
    b36.sameWork2015CareerBindingObserved &&
    b36.exact2015EditionPassageBindingEstablished === false &&
    b36.currentMethodCompatibleAlternatePathCount === 0 &&
    b36.admissionReadyFamilyCandidateCount === 0 &&
    b36.familyGapClosureReady === false &&
    b36.qianliHistoricalPathPreserved &&
    b36.crossSourceStitchingUsed === false &&
    b36.authorityAdmissionReadyComponentCountPreserved === 1 &&
    b36.branchTriggerReopenedPreserved &&
    b36.allSixHistoricalGapsRemainOpen &&
    b36.controlCount === 12 &&
    b36.controlsFrozen &&
    deterministicContentHash(b36.controlIds) === deterministicContentHash(CAREER_T8_B36_FAMILY_BODY_CONTROL_IDS) &&
    b36.productionImpact === 'NONE' &&
    b36.recommendedNextGate === 'FAMILY_RELATION_ALTERNATE_PUBLISHED_SOURCE_BODY_EVIDENCE_ADEQUACY_REVIEW'
  );
}

function evidenceAdequacyValid(): boolean {
  const career2017 = CAREER_T8_B36_FAMILY_BODY_ACQUISITION_RECORDS.find(
    (record) => record.pathId === 'CAREER_SPECIFIC_2017_RELATION_PATTERN_PATH',
  );
  const semantic2015 = CAREER_T8_B36_FAMILY_BODY_ACQUISITION_RECORDS.find(
    (record) => record.pathId === 'TEN_GOD_COMBINATION_2015_SEMANTIC_PATH',
  );
  return Boolean(
    career2017 &&
      semantic2015 &&
      career2017.namedRelationBodyDirectlyInspected === false &&
      career2017.relationSpecificLimitsObserved === false &&
      semantic2015.namedRelationBodyDirectlyInspected &&
      semantic2015.explicitCareerOrWorkBindingObserved &&
      semantic2015.structureVersusEffectDistinctionObserved &&
      semantic2015.relationSpecificLimitsObserved &&
      semantic2015.exactPublishedEditionPassageBindingEstablished === false &&
      semantic2015.strengthScoringOrTemporalDependencyObserved &&
      semantic2015.currentMethodCompatibilityEstablished === false,
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8FamilyAlternatePublishedSourceBodyEvidenceAdequacyReviewReport, 'reviewId'>,
): CareerPersonalizationT8FamilyAlternatePublishedSourceBodyEvidenceAdequacyReviewReport {
  return {
    reviewId: `career_t8_family_alternate_published_source_body_adequacy_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8FamilyAlternatePublishedSourceBodyEvidenceAdequacyReview(
  b36: CareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidenceReport,
): CareerPersonalizationT8FamilyAlternatePublishedSourceBodyEvidenceAdequacyReviewReport {
  const accepted = exactB36Accepted(b36) && evidenceAdequacyValid();

  return finalized({
    reviewVersion: CAREER_PERSONALIZATION_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_BODY_EVIDENCE_ADEQUACY_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_BODY_EVIDENCE_ADEQUACY_REVIEW'
      : 'UPSTREAM_B36_BOUNDARY_INVALID',
    decision: accepted
      ? '2017_CAREER_PATH_BODY_INADEQUATE_2015_PATH_MATERIAL_BODY_ADEQUATE_BUT_EXACT_EDITION_AND_MANDATORY_STRENGTH_METHOD_INCOMPATIBLE_ZERO_FAMILY_ADMISSION_READY_PATHS'
      : 'FAMILY_ALTERNATE_BODY_EVIDENCE_ADEQUACY_NOT_ESTABLISHED',
    upstreamB36EvidenceId: b36.evidenceId,
    exactB36BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    career2017BodyAdequateForAdmission: false,
    career2017RemainingRequirementIds: Object.freeze([
      'TARGET_RELATION_NORMATIVE_BODY',
      'RELATION_SPECIFIC_LIMITS',
      'CURRENT_METHOD_COMPATIBILITY',
    ] as const),
    semantic2015NamedRelationSatisfied: accepted,
    semantic2015StructureEffectSatisfied: accepted,
    semantic2015CareerBindingSatisfied: accepted,
    semantic2015LimitsSatisfied: accepted,
    semantic2015ExactEditionBindingSatisfied: false,
    semantic2015StrengthMethodDependencyMandatory: accepted,
    semantic2015CurrentMethodCompatibilitySatisfied: false,
    semantic2015AdmissionReady: false,
    currentMethodCompatibleAlternatePathCount: 0,
    admissionReadyFamilyCandidateCount: 0,
    familyCoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
    familyGapClosureReady: false,
    qianliHistoricalPathPreserved: accepted,
    crossSourceStitchingAuthorized: false,
    strengthDependencyMayBeDropped: false,
    authorityAdmissionReadyComponentCountPreserved: accepted ? 1 : 0,
    branchTriggerReopenedPreserved: accepted,
    gapClosureReadyCount: 0,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAdmittedByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? CAREER_T8_B37_FAMILY_ADEQUACY_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    recommendedNextGate: accepted
      ? 'FAMILY_RELATION_CURRENT_METHOD_COMPATIBLE_PUBLISHED_SOURCE_REMEDIATION_READINESS_REVIEW'
      : 'FAMILY_RELATION_ALTERNATE_PUBLISHED_SOURCE_BODY_EVIDENCE_ADEQUACY_REVIEW',
  });
}
