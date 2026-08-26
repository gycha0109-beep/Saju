import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_PATH_ELIGIBILITY_REVIEW_VERSION,
  CAREER_T8_B35_FAMILY_ALTERNATE_PATH_CANDIDATES,
  CAREER_T8_B35_FAMILY_ALTERNATE_PATH_CONTROL_IDS,
  type CareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReviewReport,
  type CareerT8B35FamilyAlternatePathId,
} from './career-personalization-t8-family-alternate-published-source-path-eligibility-review.js';

export const CAREER_PERSONALIZATION_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_BOUNDED_BODY_ACQUISITION_EVIDENCE_VERSION =
  'myeonghwa-career-personalization-t8-family-alternate-published-source-bounded-body-acquisition-evidence-v1' as const;

export type CareerT8B36Disposition =
  | 'OFFICIAL_PREVIEW_ACQUIRED_TARGET_RELATION_BODY_NOT_INCLUDED'
  | 'SAME_WORK_RELATION_AND_CAREER_BODY_ACQUIRED_EXACT_EDITION_AND_COMPATIBILITY_PENDING';

export interface CareerT8B36AcquisitionRecord {
  pathId: CareerT8B35FamilyAlternatePathId;
  sourceIdentity: string;
  disposition: CareerT8B36Disposition;
  officialOrSameWorkBodySurfaceInspected: true;
  namedRelationBodyDirectlyInspected: boolean;
  explicitCareerOrWorkBindingObserved: boolean;
  structureVersusEffectDistinctionObserved: boolean;
  relationSpecificLimitsObserved: boolean;
  exactPublishedEditionPassageBindingEstablished: boolean;
  strengthScoringOrTemporalDependencyObserved: boolean;
  currentMethodCompatibilityEstablished: false;
  qualifyingAuthorityCandidate: false;
  gapClosureReady: false;
  evidenceNote: string;
}

export const CAREER_T8_B36_FAMILY_BODY_ACQUISITION_RECORDS = Object.freeze([
  Object.freeze({
    pathId: 'CAREER_SPECIFIC_2017_RELATION_PATTERN_PATH' as const,
    sourceIdentity:
      '周雨薇 / 李品心 / 江幸芬 / 黃冠寰, 職場八字識人術, 深思文化, 2017, ISBN 9789863185468',
    disposition: 'OFFICIAL_PREVIEW_ACQUIRED_TARGET_RELATION_BODY_NOT_INCLUDED' as const,
    officialOrSameWorkBodySurfaceInspected: true as const,
    namedRelationBodyDirectlyInspected: false,
    explicitCareerOrWorkBindingObserved: true,
    structureVersusEffectDistinctionObserved: false,
    relationSpecificLimitsObserved: false,
    exactPublishedEditionPassageBindingEstablished: false,
    strengthScoringOrTemporalDependencyObserved: true,
    currentMethodCompatibilityEstablished: false as const,
    qualifyingAuthorityCandidate: false as const,
    gapClosureReady: false as const,
    evidenceNote:
      'The publisher official page exposes a direct 試讀 PDF. The preview was directly rendered and confirms genuine published-book body, but its sampled printed pages are outside the target Chapter 10/11 relation sections. The target relation semantics therefore remain TOC-only. Reader testimonials mentioning 食傷生財 are not counted as normative body. The official book structure still confirms Career scope, and the book separately uses 十神強弱度/評分 and temporal material, so compatibility cannot be inferred from chapter placement.',
  }),
  Object.freeze({
    pathId: 'TEN_GOD_COMBINATION_2015_SEMANTIC_PATH' as const,
    sourceIdentity:
      '十神闡微, 2015 published edition lineage ISBN 9789881412041; public same-work body commonly attributed to 楊逸雲',
    disposition: 'SAME_WORK_RELATION_AND_CAREER_BODY_ACQUIRED_EXACT_EDITION_AND_COMPATIBILITY_PENDING' as const,
    officialOrSameWorkBodySurfaceInspected: true as const,
    namedRelationBodyDirectlyInspected: true,
    explicitCareerOrWorkBindingObserved: true,
    structureVersusEffectDistinctionObserved: true,
    relationSpecificLimitsObserved: true,
    exactPublishedEditionPassageBindingEstablished: false,
    strengthScoringOrTemporalDependencyObserved: true,
    currentMethodCompatibilityEstablished: false as const,
    qualifyingAuthorityCandidate: false as const,
    gapClosureReady: false as const,
    evidenceNote:
      'Same-work body explicitly explains 十神間組合後含義變化 and 食傷生財: 食傷 is talent/expression, 財 is acquisition/control of usable objects/resources, and the generating combination yields a new acquisition/strategy semantic. The same passage connects the resulting chain to wealth acquisition and a career/rank outcome, while also explaining incomplete transformation as a limit. However the discussion is embedded in 身旺/strength and 歲運-change methodology, and the exact 2015 printed-edition target passage has not been directly bound. This is material body evidence, not admission-ready authority.',
  }),
] as const satisfies readonly CareerT8B36AcquisitionRecord[]);

export const CAREER_T8_B36_FAMILY_BODY_CONTROL_IDS = Object.freeze([
  'B36_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B35_ELIGIBILITY_BOUNDARY',
  'BOTH_ELIGIBLE_ALTERNATE_PATHS_ARE_EXECUTED_ON_BODY_SURFACES_WITHOUT_CROSS_SOURCE_STITCHING',
  'THE_2017_PUBLISHER_OFFICIAL_PREVIEW_IS_DIRECTLY_INSPECTED_BUT_DOES_NOT_INCLUDE_THE_TARGET_CHAPTER_10_OR_11_RELATION_BODY',
  'THE_2017_TOC_AND_READER_TESTIMONIALS_REMAIN_DISCOVERY_CONTEXT_NOT_NORMATIVE_RELATION_BODY',
  'THE_2015_SAME_WORK_BODY_DIRECTLY_EXPLAINS_TEN_GOD_COMBINATION_SEMANTICS_AND_SHISHANG_SHENGCAI_STRUCTURE_TO_EFFECT_CHANGE',
  'THE_2015_SAME_WORK_BODY_NOW_SUPPLIES_A_DIRECT_CAREER_OR_WORK_OUTCOME_LINK_BUT_IS_NOT_EXACT_2015_PRINTED_EDITION_BOUND',
  'THE_2015_PASSAGE_LIMITS_PRESERVE_INCOMPLETE_TRANSFORMATION_RATHER_THAN_FORCING_TOTAL_SEMANTIC_REPLACEMENT',
  'STRENGTH_SHENWANG_AND_TEMPORAL_SUYUN_DEPENDENCIES_PREVENT_CURRENT_METHOD_COMPATIBILITY_FROM_BEING_ASSUMED',
  'THE_TWO_PATHS_MAY_NOT_BE_COMBINED_TO_FILL_EACH_OTHERS_MISSING_REQUIREMENTS',
  'ZERO_FAMILY_AUTHORITY_CANDIDATES_ARE_ADMISSION_READY_AND_THE_HISTORICAL_FAMILY_GAP_REMAINS_OPEN',
  'POSITION_ADMISSION_READY_COMPONENT_AND_BRANCH_REOPEN_STATE_REMAIN_PRESERVED',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION',
] as const);

export interface CareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof CAREER_PERSONALIZATION_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_BOUNDED_BODY_ACQUISITION_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_BOUNDED_BODY_ACQUISITION_EVIDENCE'
    | 'UPSTREAM_B35_BOUNDARY_INVALID';
  decision:
    | 'TWO_ALTERNATE_PATHS_EXECUTED_2017_TARGET_BODY_NOT_ACQUIRED_2015_RELATION_AND_CAREER_BODY_MATERIALLY_ACQUIRED_EXACT_EDITION_AND_COMPATIBILITY_PENDING_NO_AUTHORITY_ADMISSION'
    | 'FAMILY_ALTERNATE_BOUNDED_BODY_ACQUISITION_NOT_ESTABLISHED';
  upstreamB35ReviewId: string;
  exactB35BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  records: readonly CareerT8B36AcquisitionRecord[];
  recordCount: 2 | 0;
  acquisitionExecutionCount: 2 | 0;
  official2017PreviewDirectlyInspected: boolean;
  official2017TargetRelationBodyAcquired: false;
  sameWork2015RelationBodyAcquired: boolean;
  sameWork2015CareerBindingObserved: boolean;
  exact2015EditionPassageBindingEstablished: false;
  currentMethodCompatibleAlternatePathCount: 0;
  admissionReadyFamilyCandidateCount: 0;
  familyGapClosureReady: false;
  qianliHistoricalPathPreserved: boolean;
  crossSourceStitchingUsed: false;
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
  controlIds: readonly (typeof CAREER_T8_B36_FAMILY_BODY_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  recommendedNextGate:
    | 'FAMILY_RELATION_ALTERNATE_PUBLISHED_SOURCE_BODY_EVIDENCE_ADEQUACY_REVIEW'
    | 'FAMILY_RELATION_ALTERNATE_PUBLISHED_SOURCE_BOUNDED_BODY_ACQUISITION_EVIDENCE';
}

function contentAddressedB35IdentityValid(
  b35: CareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReviewReport,
): boolean {
  const { reviewId, ...material } = b35;
  return reviewId ===
    `career_t8_family_alternate_published_source_path_eligibility_${deterministicContentHash(material).slice(0, 24)}`;
}

function exactB35Accepted(
  b35: CareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReviewReport,
): boolean {
  return (
    contentAddressedB35IdentityValid(b35) &&
    b35.reviewVersion === CAREER_PERSONALIZATION_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_PATH_ELIGIBILITY_REVIEW_VERSION &&
    b35.status === 'RESOLVED_CAREER_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_PATH_ELIGIBILITY_REVIEW' &&
    b35.decision ===
      'TWO_ALTERNATE_PUBLISHED_FAMILY_RESEARCH_PATHS_ELIGIBLE_QIANLI_HISTORY_PRESERVED_NO_CROSS_SOURCE_STITCHING_NO_AUTHORITY_ADMISSION' &&
    b35.exactB34BoundaryAccepted &&
    b35.domain === 'career' &&
    b35.temporalScope === 'natal' &&
    b35.qianliHistoricalPathPreserved &&
    b35.qianliExact1936PageHoldStillControlling &&
    deterministicContentHash(b35.alternatePathCandidates) === deterministicContentHash(CAREER_T8_B35_FAMILY_ALTERNATE_PATH_CANDIDATES) &&
    b35.alternatePathCandidateCount === 2 &&
    b35.eligibleAlternatePathCount === 2 &&
    b35.crossSourceStitchingAuthorized === false &&
    b35.familyAuthorityAdmissionReady === false &&
    b35.familyGapClosureReady === false &&
    b35.authorityAdmissionReadyComponentCountPreserved === 1 &&
    b35.branchTriggerReopenedPreserved &&
    b35.allSixHistoricalGapsRemainOpen &&
    b35.controlCount === 12 &&
    b35.controlsFrozen &&
    deterministicContentHash(b35.controlIds) === deterministicContentHash(CAREER_T8_B35_FAMILY_ALTERNATE_PATH_CONTROL_IDS) &&
    b35.productionImpact === 'NONE' &&
    b35.recommendedNextGate === 'FAMILY_RELATION_ALTERNATE_PUBLISHED_SOURCE_BOUNDED_BODY_ACQUISITION_EVIDENCE'
  );
}

function recordsValid(): boolean {
  const [career2017, semantic2015] = CAREER_T8_B36_FAMILY_BODY_ACQUISITION_RECORDS;
  return (
    career2017.pathId === 'CAREER_SPECIFIC_2017_RELATION_PATTERN_PATH' &&
    career2017.namedRelationBodyDirectlyInspected === false &&
    career2017.exactPublishedEditionPassageBindingEstablished === false &&
    semantic2015.pathId === 'TEN_GOD_COMBINATION_2015_SEMANTIC_PATH' &&
    semantic2015.namedRelationBodyDirectlyInspected &&
    semantic2015.explicitCareerOrWorkBindingObserved &&
    semantic2015.structureVersusEffectDistinctionObserved &&
    semantic2015.relationSpecificLimitsObserved &&
    semantic2015.exactPublishedEditionPassageBindingEstablished === false &&
    CAREER_T8_B36_FAMILY_BODY_ACQUISITION_RECORDS.every(
      (record) =>
        record.officialOrSameWorkBodySurfaceInspected &&
        record.strengthScoringOrTemporalDependencyObserved &&
        record.currentMethodCompatibilityEstablished === false &&
        record.qualifyingAuthorityCandidate === false &&
        record.gapClosureReady === false,
    )
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidenceReport, 'evidenceId'>,
): CareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidenceReport {
  return {
    evidenceId: `career_t8_family_alternate_published_source_body_acquisition_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidence(
  b35: CareerPersonalizationT8FamilyAlternatePublishedSourcePathEligibilityReviewReport,
): CareerPersonalizationT8FamilyAlternatePublishedSourceBoundedBodyAcquisitionEvidenceReport {
  const accepted = exactB35Accepted(b35) && recordsValid();

  return finalized({
    evidenceVersion: CAREER_PERSONALIZATION_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_BOUNDED_BODY_ACQUISITION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_FAMILY_ALTERNATE_PUBLISHED_SOURCE_BOUNDED_BODY_ACQUISITION_EVIDENCE'
      : 'UPSTREAM_B35_BOUNDARY_INVALID',
    decision: accepted
      ? 'TWO_ALTERNATE_PATHS_EXECUTED_2017_TARGET_BODY_NOT_ACQUIRED_2015_RELATION_AND_CAREER_BODY_MATERIALLY_ACQUIRED_EXACT_EDITION_AND_COMPATIBILITY_PENDING_NO_AUTHORITY_ADMISSION'
      : 'FAMILY_ALTERNATE_BOUNDED_BODY_ACQUISITION_NOT_ESTABLISHED',
    upstreamB35ReviewId: b35.reviewId,
    exactB35BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    records: accepted ? CAREER_T8_B36_FAMILY_BODY_ACQUISITION_RECORDS : Object.freeze([]),
    recordCount: accepted ? 2 : 0,
    acquisitionExecutionCount: accepted ? 2 : 0,
    official2017PreviewDirectlyInspected: accepted,
    official2017TargetRelationBodyAcquired: false,
    sameWork2015RelationBodyAcquired: accepted,
    sameWork2015CareerBindingObserved: accepted,
    exact2015EditionPassageBindingEstablished: false,
    currentMethodCompatibleAlternatePathCount: 0,
    admissionReadyFamilyCandidateCount: 0,
    familyGapClosureReady: false,
    qianliHistoricalPathPreserved: accepted,
    crossSourceStitchingUsed: false,
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
    controlIds: accepted ? CAREER_T8_B36_FAMILY_BODY_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    recommendedNextGate: accepted
      ? 'FAMILY_RELATION_ALTERNATE_PUBLISHED_SOURCE_BODY_EVIDENCE_ADEQUACY_REVIEW'
      : 'FAMILY_RELATION_ALTERNATE_PUBLISHED_SOURCE_BOUNDED_BODY_ACQUISITION_EVIDENCE',
  });
}
