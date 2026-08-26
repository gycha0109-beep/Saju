import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_CLASH_PUBLISHED_TRIGGER_ACTIVATION_EVIDENCE_VERSION,
  CAREER_T8_B34_BRANCH_CLASH_CANDIDATE,
  CAREER_T8_B34_BRANCH_CLASH_CONTROL_IDS,
  type CareerPersonalizationT8BranchClashPublishedTriggerActivationEvidenceReport,
} from './career-personalization-t8-branch-clash-published-trigger-activation-evidence.js';

export const CAREER_PERSONALIZATION_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_PATH_ELIGIBILITY_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-family-alternate-published-source-path-eligibility-review-v1' as const;

export type CareerT8B35FamilyAlternatePathId =
  | 'CAREER_SPECIFIC_2017_RELATION_PATTERN_PATH'
  | 'TEN_GOD_COMBINATION_2015_SEMANTIC_PATH';

export interface CareerT8B35FamilyAlternatePathCandidate {
  pathId: CareerT8B35FamilyAlternatePathId;
  sourceIdentity: string;
  independentlyPublished: true;
  stableBibliographicIdentity: true;
  namedFamilyRelationsObserved: readonly string[];
  explicitCareerContextObserved: boolean;
  relationSemanticBodyDirectlyInspected: boolean;
  relationSpecificLimitsDirectlyInspected: boolean;
  strengthOrScoringDependencyObserved: boolean;
  currentMethodCompatibilityEstablished: false;
  eligibleForBoundedBodyAcquisition: true;
  maySubstituteForQianliHistoricalRecord: false;
  mayStitchWithOtherPathForSameRequirement: false;
  authorityAdmissionReady: false;
  gapClosureReady: false;
  evidenceNote: string;
}

export const CAREER_T8_B35_FAMILY_ALTERNATE_PATH_CANDIDATES = Object.freeze([
  Object.freeze({
    pathId: 'CAREER_SPECIFIC_2017_RELATION_PATTERN_PATH' as const,
    sourceIdentity:
      '周雨薇 / 李品心 / 江幸芬 / 黃冠寰, 職場八字識人術：三分鐘看懂．教你如何招貴人防小人, 深思文化, 2017, ISBN 9789863185468, 296 pages',
    independentlyPublished: true as const,
    stableBibliographicIdentity: true as const,
    namedFamilyRelationsObserved: Object.freeze([
      '財生官',
      '官生印',
      '食傷生財',
      '官印相生',
      '印生比肩',
      '比劫生食傷',
    ] as const),
    explicitCareerContextObserved: true,
    relationSemanticBodyDirectlyInspected: false,
    relationSpecificLimitsDirectlyInspected: false,
    strengthOrScoringDependencyObserved: true,
    currentMethodCompatibilityEstablished: false as const,
    eligibleForBoundedBodyAcquisition: true as const,
    maySubstituteForQianliHistoricalRecord: false as const,
    mayStitchWithOtherPathForSameRequirement: false as const,
    authorityAdmissionReady: false as const,
    gapClosureReady: false as const,
    evidenceNote:
      'The published table of contents places named Ten-God generation relations directly inside Career-specific chapters: workplace benefactors/team selection and entrepreneurship. The same book also includes a separate 八字評分表 / 十神強弱度分析表 and a Q&A asking whether generation is always good and control always bad. Those features make it a high-value body-acquisition target but prevent TOC-only admission or compatibility assumptions. Testimonials and promotional examples are discovery context only, not normative authority body.',
  }),
  Object.freeze({
    pathId: 'TEN_GOD_COMBINATION_2015_SEMANTIC_PATH' as const,
    sourceIdentity:
      '李修梵整理, 十神闡微, 香港星易圖書有限公司, 2015 first edition, ISBN 9789881412041; same-work full-text lineage commonly attributed to 楊逸雲',
    independentlyPublished: true as const,
    stableBibliographicIdentity: true as const,
    namedFamilyRelationsObserved: Object.freeze([
      '十神間組合後含義變化',
      '食傷生財',
    ] as const),
    explicitCareerContextObserved: false,
    relationSemanticBodyDirectlyInspected: true,
    relationSpecificLimitsDirectlyInspected: true,
    strengthOrScoringDependencyObserved: true,
    currentMethodCompatibilityEstablished: false as const,
    eligibleForBoundedBodyAcquisition: true as const,
    maySubstituteForQianliHistoricalRecord: false as const,
    mayStitchWithOtherPathForSameRequirement: false as const,
    authorityAdmissionReady: false as const,
    gapClosureReady: false as const,
    evidenceNote:
      'This path is methodologically valuable because the same-work body explicitly teaches how Ten-God combinations change semantic expression and supplies combination limits. It is not yet a direct Career/work binding path, and the exact 2015 printed-edition target pages have not been directly bound. It therefore may be researched independently but may not be stitched with the 2017 Career source to fabricate one complete authority requirement.',
  }),
] as const satisfies readonly CareerT8B35FamilyAlternatePathCandidate[]);

export const CAREER_T8_B35_FAMILY_ALTERNATE_PATH_CONTROL_IDS = Object.freeze([
  'B35_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B34_BRANCH_TRIGGER_BOUNDARY',
  'THE_EXISTING_QIANLI_1936_FAMILY_PATH_REMAINS_HISTORICALLY_VALID_AND_CLOSED_ON_ITS_EXACT_PAGE_ACCESS_HOLD',
  'NEWLY_DISCOVERED_PUBLISHED_SOURCES_MAY_OPEN_ALTERNATE_RESEARCH_PATHS_WITHOUT_REWRITING_OR_REPLACING_THE_QIANLI_AUDIT_RECORD',
  'THE_2017_CAREER_SPECIFIC_SOURCE_IS_ELIGIBLE_BECAUSE_NAMED_GENERATION_RELATIONS_APPEAR_DIRECTLY_IN_WORKPLACE_AND_ENTREPRENEURSHIP_CHAPTERS',
  'THE_2017_SOURCE_TOC_AND_TESTIMONIALS_ARE_NOT_NORMATIVE_BODY_AND_CANNOT_SATISFY_RELATION_SEMANTICS_LIMITS_OR_COMPATIBILITY',
  'THE_2015_TEN_GOD_COMBINATION_SOURCE_IS_ELIGIBLE_FOR_ITS_SAME_WORK_RELATION_SEMANTIC_METHOD_BUT_LACKS_A_DIRECT_CAREER_BINDING',
  'THE_TWO_ALTERNATE_PATHS_MAY_NOT_BE_CROSS_SOURCE_STITCHED_TO_SATISFY_ONE_FAMILY_AUTHORITY_REQUIREMENT',
  'EACH_ALTERNATE_PATH_MUST_INDEPENDENTLY_ACQUIRE_BODY_CONTEXT_LIMITS_AND_CURRENT_METHOD_COMPATIBILITY_BEFORE_ADMISSION',
  'STRENGTH_SCORE_WANGSHUAI_OR_OTHER_DEPENDENCIES_MAY_NOT_BE_SILENTLY_DROPPED_FROM_EITHER_SOURCE',
  'ZERO_FAMILY_AUTHORITY_IS_ADMITTED_AND_THE_HISTORICAL_FAMILY_GAP_REMAINS_OPEN',
  'B33_POSITION_ADMISSION_READY_COMPONENT_AND_B34_BRANCH_TRIGGER_REOPEN_STATE_REMAIN_PRESERVED',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION',
] as const);

export interface CareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_PATH_ELIGIBILITY_REVIEW_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_PATH_ELIGIBILITY_REVIEW'
    | 'UPSTREAM_B34_BOUNDARY_INVALID';
  decision:
    | 'TWO_ALTERNATE_PUBLISHED_FAMILY_RESEARCH_PATHS_ELIGIBLE_QIANLI_HISTORY_PRESERVED_NO_CROSS_SOURCE_STITCHING_NO_AUTHORITY_ADMISSION'
    | 'FAMILY_ALTERNATE_PUBLISHED_SOURCE_PATH_ELIGIBILITY_NOT_ESTABLISHED';
  upstreamB34EvidenceId: string;
  exactB34BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  qianliHistoricalPathPreserved: boolean;
  qianliExact1936PageHoldStillControlling: boolean;
  alternatePathCandidates: readonly CareerT8B35FamilyAlternatePathCandidate[];
  alternatePathCandidateCount: 2 | 0;
  eligibleAlternatePathCount: 2 | 0;
  careerSpecificPublishedPathEligible: boolean;
  combinationSemanticPublishedPathEligible: boolean;
  crossSourceStitchingAuthorized: false;
  tocMayCountAsNormativeBody: false;
  testimonialsMayCountAsNormativeBody: false;
  strengthOrScoringDependencyMayBeIgnored: false;
  familyAuthorityAdmissionReady: false;
  familyGapClosureReady: false;
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
  controlIds: readonly (typeof CAREER_T8_B35_FAMILY_ALTERNATE_PATH_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  recommendedNextGate:
    | 'FAMILY_RELATION_ALTERNATE_PUBLISHED_SOURCE_BOUNDED_BODY_ACQUISITION_EVIDENCE'
    | 'CAREER_PERSONALIZATION_T8_BRANCH_CLASH_PUBLISHED_TRIGGER_ACTIVATION_EVIDENCE';
}

function contentAddressedB34IdentityValid(
  b34: CareerPersonalizationT8BranchClashPublishedTriggerActivationEvidenceReport,
): boolean {
  const { evidenceId, ...material } = b34;
  return evidenceId ===
    `career_t8_branch_clash_published_trigger_activation_${deterministicContentHash(material).slice(0, 24)}`;
}

function exactB34Accepted(
  b34: CareerPersonalizationT8BranchClashPublishedTriggerActivationEvidenceReport,
): boolean {
  return (
    contentAddressedB34IdentityValid(b34) &&
    b34.evidenceVersion === CAREER_PERSONALIZATION_T8_BRANCH_CLASH_PUBLISHED_TRIGGER_ACTIVATION_EVIDENCE_VERSION &&
    b34.status === 'RESOLVED_CAREER_T8_BRANCH_CLASH_PUBLISHED_TRIGGER_ACTIVATION_EVIDENCE' &&
    b34.decision ===
      'BRANCH_CLASH_PUBLISHED_SINGLE_WORK_CURRENT_T5_QUALITATIVE_MODIFIER_TRIGGER_REOPENED_EXACT_EDITION_AND_CURRENT_METHOD_COMPATIBILITY_REMAIN_PENDING_NO_AUTHORITY_ADMISSION' &&
    b34.exactB33BoundaryAccepted &&
    b34.domain === 'career' &&
    b34.temporalScope === 'natal' &&
    b34.positionAdmissionReadyComponentPreserved &&
    deterministicContentHash(b34.branchCandidate) === deterministicContentHash(CAREER_T8_B34_BRANCH_CLASH_CANDIDATE) &&
    b34.branchTriggerReopened &&
    b34.branchExactPublishedEditionPassageBindingEstablished === false &&
    b34.branchCurrentMethodCompatibilityEstablished === false &&
    b34.branchAuthorityAdmissionReady === false &&
    b34.branchGapClosureReady === false &&
    b34.authorityAdmissionReadyComponentCount === 1 &&
    b34.gapClosureReadyCount === 0 &&
    b34.allSixHistoricalGapsRemainOpen &&
    b34.controlCount === 12 &&
    b34.controlsFrozen &&
    deterministicContentHash(b34.controlIds) === deterministicContentHash(CAREER_T8_B34_BRANCH_CLASH_CONTROL_IDS) &&
    b34.authorityAdmittedByThisGate === false &&
    b34.authorityGapClosedByThisGate === false &&
    b34.productionImpact === 'NONE' &&
    b34.recommendedNextGate === 'BRANCH_CLASH_CURRENT_T5_PUBLISHED_EVIDENCE_ADEQUACY_AND_COMPATIBILITY_REVIEW'
  );
}

function alternatePathsValid(): boolean {
  const paths = CAREER_T8_B35_FAMILY_ALTERNATE_PATH_CANDIDATES;
  return (
    paths.length === 2 &&
    new Set(paths.map((path) => path.pathId)).size === 2 &&
    paths.every(
      (path) =>
        path.independentlyPublished &&
        path.stableBibliographicIdentity &&
        path.namedFamilyRelationsObserved.length >= 1 &&
        path.eligibleForBoundedBodyAcquisition &&
        path.maySubstituteForQianliHistoricalRecord === false &&
        path.mayStitchWithOtherPathForSameRequirement === false &&
        path.currentMethodCompatibilityEstablished === false &&
        path.authorityAdmissionReady === false &&
        path.gapClosureReady === false,
    )
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReviewReport, 'reviewId'>,
): CareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReviewReport {
  return {
    reviewId: `career_t8_family_alternate_published_source_path_eligibility_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReview(
  b34: CareerPersonalizationT8BranchClashPublishedTriggerActivationEvidenceReport,
): CareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReviewReport {
  const accepted = exactB34Accepted(b34) && alternatePathsValid();

  return finalized({
    reviewVersion: CAREER_PERSONALIZATION_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_PATH_ELIGIBILITY_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_PATH_ELIGIBILITY_REVIEW'
      : 'UPSTREAM_B34_BOUNDARY_INVALID',
    decision: accepted
      ? 'TWO_ALTERNATE_PUBLISHED_FAMILY_RESEARCH_PATHS_ELIGIBLE_QIANLI_HISTORY_PRESERVED_NO_CROSS_SOURCE_STITCHING_NO_AUTHORITY_ADMISSION'
      : 'FAMILY_ALTERNATE_PUBLISHED_SOURCE_PATH_ELIGIBILITY_NOT_ESTABLISHED',
    upstreamB34EvidenceId: b34.evidenceId,
    exactB34BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    qianliHistoricalPathPreserved: accepted,
    qianliExact1936PageHoldStillControlling: accepted,
    alternatePathCandidates: accepted ? CAREER_T8_B35_FAMILY_ALTERNATE_PATH_CANDIDATES : Object.freeze([]),
    alternatePathCandidateCount: accepted ? 2 : 0,
    eligibleAlternatePathCount: accepted ? 2 : 0,
    careerSpecificPublishedPathEligible: accepted,
    combinationSemanticPublishedPathEligible: accepted,
    crossSourceStitchingAuthorized: false,
    tocMayCountAsNormativeBody: false,
    testimonialsMayCountAsNormativeBody: false,
    strengthOrScoringDependencyMayBeIgnored: false,
    familyAuthorityAdmissionReady: false,
    familyGapClosureReady: false,
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
    controlIds: accepted ? CAREER_T8_B35_FAMILY_ALTERNATE_PATH_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    recommendedNextGate: accepted
      ? 'FAMILY_RELATION_ALTERNATE_PUBLISHED_SOURCE_BOUNDED_BODY_ACQUISITION_EVIDENCE'
      : 'CAREER_PERSONALIZATION_T8_BRANCH_CLASH_PUBLISHED_TRIGGER_ACTIVATION_EVIDENCE',
  });
}
