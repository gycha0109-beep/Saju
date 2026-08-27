import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import { CAREER_T8_B36_FAMILY_BODY_ACQUISITION_RECORDS } from './career-personalization-t8-family-alternate-published-source-bounded-body-acquisition-evidence.js';
import {
  CAREER_PERSONALIZATION_T8_POST_B41_RESEARCH_FRONTIER_HOLD_REVIEW_VERSION,
  CAREER_T8_B42_POST_B41_FRONTIER_CONTROL_IDS,
  CAREER_T8_B42_POST_B41_FRONTIER_RECORDS,
  type CareerPersonalizationT8PostB41ResearchFrontierHoldReviewReport,
} from './career-personalization-t8-post-b41-research-frontier-hold-review.js';

export const CAREER_PERSONALIZATION_T8_FAMILY_REMEDIATION_TRIGGER_READINESS_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-family-remediation-trigger-readiness-review-v1' as const;

export type CareerT8B43FamilyRemediationTriggerId =
  | 'FAMILY_2017_TARGET_BODY_COMPLETE_PATH_TRIGGER'
  | 'FAMILY_2015_REQUIRED_METHOD_DIMENSIONS_TRIGGER'
  | 'FAMILY_INDEPENDENT_COMPLETE_PATH_TRIGGER';

export interface CareerT8B43FamilyRemediationTriggerContract {
  triggerId: CareerT8B43FamilyRemediationTriggerId;
  currentlySatisfied: false;
  laneReopensWhenAllConditionsSatisfied: true;
  requiredConditions: readonly string[];
  prohibitedSubstitutes: readonly string[];
  activationAutomaticallyAdmitsAuthority: false;
  activationAutomaticallyClosesGap: false;
  activationRequiresFollowupAdequacyReview: true;
}

export const CAREER_T8_B43_FAMILY_REMEDIATION_TRIGGER_CONTRACTS = Object.freeze([
  Object.freeze({
    triggerId: 'FAMILY_2017_TARGET_BODY_COMPLETE_PATH_TRIGGER' as const,
    currentlySatisfied: false as const,
    laneReopensWhenAllConditionsSatisfied: true as const,
    requiredConditions: Object.freeze([
      'The 2017 Career-specific published source exposes inspectable normative body for at least one named Family relation section rather than TOC/testimonial framing only.',
      'That same 2017 source body directly binds the named relation to a Career/workplace semantic effect with structure-versus-effect distinction preserved.',
      'That same source supplies relation-specific limits or exceptions sufficient to bound the rule.',
      'The same 2017 source path is compatible with the current Career method without importing unsupported mandatory strength, transformation-degree, Yongshin, Xiji, or numeric weighting dependencies.',
    ]),
    prohibitedSubstitutes: Object.freeze([
      'The existing official publisher preview pages that do not contain the target relation body.',
      'TOC entries, testimonials, marketing summaries, or snippets used as normative relation body.',
      'Borrowing the 2015 same-work relation semantics or limits to complete the 2017 Career path.',
      'Modernizing historical occupation/status language into contemporary occupation recommendations.',
    ]),
    activationAutomaticallyAdmitsAuthority: false as const,
    activationAutomaticallyClosesGap: false as const,
    activationRequiresFollowupAdequacyReview: true as const,
  }),
  Object.freeze({
    triggerId: 'FAMILY_2015_REQUIRED_METHOD_DIMENSIONS_TRIGGER' as const,
    currentlySatisfied: false as const,
    laneReopensWhenAllConditionsSatisfied: true as const,
    requiredConditions: Object.freeze([
      'The exact 2015 printed-edition target relation passage is directly bound rather than relying only on same-work full-text lineage.',
      'The exact-edition local context confirms the already observed strength/身旺身弱 and complete-or-incomplete transformation dependencies rather than silently deleting them.',
      'Before adequacy can reopen, the governed current Career methodology itself must already be able to consume every source-mandatory strength and transformation dimension under separately admitted methodology authority.',
      'The 2015 relation path must remain internally complete for named relation, structure/effect, Career binding and limits without borrowing Career framing or limits from another source.',
    ]),
    prohibitedSubstitutes: Object.freeze([
      'Exact-edition access alone while the current method still cannot consume source-mandatory strength/transformation dimensions.',
      'Dropping 身旺/身弱 or transformation completeness because they are inconvenient for the current method.',
      'Using the 2017 Career framing to repair the 2015 path.',
      'Treating an architecture decision to ignore a dependency as source evidence of compatibility.',
    ]),
    activationAutomaticallyAdmitsAuthority: false as const,
    activationAutomaticallyClosesGap: false as const,
    activationRequiresFollowupAdequacyReview: true as const,
  }),
  Object.freeze({
    triggerId: 'FAMILY_INDEPENDENT_COMPLETE_PATH_TRIGGER' as const,
    currentlySatisfied: false as const,
    laneReopensWhenAllConditionsSatisfied: true as const,
    requiredConditions: Object.freeze([
      'A genuinely new independently adequate published source path is acquired rather than a derivative of the frozen 2017 or 2015 paths.',
      'That one source independently names a Ten-God relation, distinguishes structure from semantic effect, and directly binds the relation to Career meaning.',
      'That same source independently supplies relation-specific limits/exceptions and all method dependencies required to interpret the relation.',
      'The complete path is compatible with the current Career methodology without cross-source stitching or silent dependency removal.',
    ]),
    prohibitedSubstitutes: Object.freeze([
      'One source for Career binding plus another source for relation semantics or limits.',
      'A general Ten-God relation statement with no direct Career binding.',
      'Search snippets, TOC, testimonial, blog paraphrase, or commercial description without inspectable normative body.',
      'A source whose required method dimensions remain unsupported by the current governed methodology.',
    ]),
    activationAutomaticallyAdmitsAuthority: false as const,
    activationAutomaticallyClosesGap: false as const,
    activationRequiresFollowupAdequacyReview: true as const,
  }),
] as const satisfies readonly CareerT8B43FamilyRemediationTriggerContract[]);

export const CAREER_T8_B43_FAMILY_REMEDIATION_TRIGGER_CONTROL_IDS = Object.freeze([
  'B43_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B42_FRONTIER_HOLD_BOUNDARY',
  'THE_2017_PATH_REMAINS_INCOMPLETE_UNTIL_TARGET_RELATION_BODY_LIMITS_AND_CURRENT_METHOD_COMPATIBILITY_EXIST_IN_THAT_SAME_PATH',
  'THE_2015_PATH_REMAINS_NON_EXECUTABLE_WHILE_EXACT_EDITION_BINDING_IS_MISSING_AND_CURRENT_METHOD_CANNOT_CONSUME_MANDATORY_STRENGTH_TRANSFORMATION_DIMENSIONS',
  'MANDATORY_2015_SHENWANG_SHENRUO_AND_TRANSFORMATION_DEPENDENCIES_MAY_NOT_BE_SILENTLY_REMOVED',
  'A_NEW_INDEPENDENT_FAMILY_PATH_MUST_INDEPENDENTLY_SATISFY_RELATION_CAREER_LIMIT_AND_METHOD_REQUIREMENTS',
  'THE_2017_AND_2015_PATHS_MAY_NOT_BE_STITCHED_TO_CREATE_A_SYNTHETIC_COMPLETE_AUTHORITY',
  'QIANLI_1936_HISTORICAL_FAMILY_PATH_REMAINS_PRESERVED_AND_IS_NOT_REPLACED_BY_ALTERNATE_PATHS',
  'ZERO_OF_THREE_FAMILY_REMEDIATION_TRIGGERS_ARE_CURRENTLY_SATISFIED_AND_ZERO_FAMILY_RESEARCH_LANES_ARE_EXECUTABLE',
  'TRIGGER_ACTIVATION_NEVER_AUTOMATICALLY_ADMITS_AUTHORITY_OR_CLOSES_THE_FAMILY_HISTORICAL_GAP',
  'THE_B38_BOUNDED_POSITION_AUTHORITY_COMPONENT_REMAINS_PRESERVED_WITHOUT_MUTATION',
  'ALL_SIX_HISTORICAL_T8_SYNTHESIS_AUTHORITY_GAPS_REMAIN_FORMALLY_OPEN',
  'NO_BROAD_SEARCH_RESTART_NUMERIC_WEIGHTING_OCCUPATION_MODERNIZATION_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION',
] as const);

export interface CareerPersonalizationT8FamilyRemediationTriggerReadinessReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_FAMILY_REMEDIATION_TRIGGER_READINESS_REVIEW_VERSION;
  status:
    | 'RESOLVED_FAMILY_RELATION_CURRENT_METHOD_COMPATIBLE_PUBLISHED_SOURCE_REMEDIATION_READINESS_REVIEW'
    | 'UPSTREAM_B42_BOUNDARY_INVALID';
  decision:
    | 'THREE_FAMILY_REMEDIATION_TRIGGER_CONTRACTS_FROZEN_ZERO_SATISFIED_RESUME_ONLY_ON_PATH_COMPLETE_EVIDENCE_OR_METHOD_CHANGE_NO_AUTHORITY_ADMISSION'
    | 'FAMILY_REMEDIATION_TRIGGER_READINESS_NOT_ESTABLISHED';
  upstreamB42ReviewId: string;
  exactB42BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  triggerContracts: readonly CareerT8B43FamilyRemediationTriggerContract[];
  triggerContractCount: 3 | 0;
  currentlySatisfiedTriggerCount: 0;
  currentlyExecutableFamilyResearchLaneCount: 0;
  career2017TriggerSatisfied: false;
  semantic2015TriggerSatisfied: false;
  independentCompletePathTriggerSatisfied: false;
  career2017TargetRelationBodyAcquired: false;
  semantic2015ExactEditionBindingEstablished: false;
  semantic2015MandatoryStrengthTransformationDependencyPreserved: true;
  currentMethodConsumesRequired2015Dimensions: false;
  familyCurrentMethodCompatiblePathCount: 0;
  familyAdmissionReadyCandidateCount: 0;
  familyCoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE';
  qianliHistoricalPathPreserved: true;
  broadSearchRestartAuthorized: false;
  repeatedUnchangedSurfaceSearchAuthorized: false;
  crossSourceRequirementStitchingAuthorized: false;
  activationAutomaticallyAdmitsAuthority: false;
  activationAutomaticallyClosesGap: false;
  activationAlwaysRequiresAdequacyReview: true;
  familyAuthorityAdmittedByThisGate: false;
  familyGapClosureReady: false;
  positionBoundedAuthorityComponentCountPreserved: 1 | 0;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  authorityGapClosedByThisGate: false;
  numericWeightingIntroduced: false;
  occupationModernizationUsed: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B43_FAMILY_REMEDIATION_TRIGGER_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_T8_POST_B43_GLOBAL_RESEARCH_HOLD_REVIEW'
    | 'FAMILY_RELATION_CURRENT_METHOD_COMPATIBLE_PUBLISHED_SOURCE_REMEDIATION_READINESS_REVIEW';
}

function contentAddressedB42IdentityValid(
  b42: CareerPersonalizationT8PostB41ResearchFrontierHoldReviewReport,
): boolean {
  const { reviewId, ...material } = b42;
  return reviewId ===
    `career_personalization_t8_post_b41_research_frontier_hold_${deterministicContentHash(material).slice(0, 24)}`;
}

function exactB42Accepted(
  b42: CareerPersonalizationT8PostB41ResearchFrontierHoldReviewReport,
): boolean {
  return (
    contentAddressedB42IdentityValid(b42) &&
    b42.reviewVersion === CAREER_PERSONALIZATION_T8_POST_B41_RESEARCH_FRONTIER_HOLD_REVIEW_VERSION &&
    b42.status === 'RESOLVED_CAREER_PERSONALIZATION_T8_POST_B41_RESEARCH_FRONTIER_HOLD_REVIEW' &&
    b42.decision ===
      'ZERO_EXECUTABLE_AUTHORITY_ADMISSION_LANES_ONE_FAMILY_REMEDIATION_GOVERNANCE_GATE_EXECUTABLE_NO_BROAD_RESEARCH_RESTART' &&
    b42.exactB41BoundaryAccepted &&
    b42.domain === 'career' &&
    b42.temporalScope === 'natal' &&
    b42.statusClass === 'research' &&
    b42.frontierRecordCount === 9 &&
    deterministicContentHash(b42.frontierRecords) === deterministicContentHash(CAREER_T8_B42_POST_B41_FRONTIER_RECORDS) &&
    b42.admittedBoundedAuthorityComponentCount === 1 &&
    b42.immediatelyExecutableAuthorityAdmissionLaneCount === 0 &&
    b42.immediatelyExecutableExistingSurfaceResearchLaneCount === 0 &&
    b42.boundedGovernanceGateExecutableCount === 1 &&
    b42.selectedBoundedGovernanceLane === 'FAMILY_RELATION_CURRENT_METHOD_COMPATIBLE_REMEDIATION_READINESS' &&
    b42.branchSatisfiedTriggerCount === 0 &&
    b42.branchExecutableLaneCount === 0 &&
    b42.familyCoverageClass === 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE' &&
    b42.familyCurrentMethodCompatibleAlternatePathCount === 0 &&
    b42.familyAdmissionReadyCandidateCount === 0 &&
    b42.qinP464DirectBodyAcquired === false &&
    b42.qianli1936P50ToP53ExactPagesBound === false &&
    b42.visibilityConsumedByCurrentContinuation === false &&
    b42.pluralityConsumedByCurrentContinuation === false &&
    b42.pluralityHeldUnderI254 &&
    b42.seasonalConsumedByCurrentContinuation === false &&
    b42.conflictPolicyDisposition === 'PACK_LEVEL_DEFERRED' &&
    b42.broadSearchRestartAuthorized === false &&
    b42.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b42.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b42.authorityGapClosedByThisGate === false &&
    b42.controlCount === 12 &&
    b42.controlsFrozen &&
    deterministicContentHash(b42.controlIds) === deterministicContentHash(CAREER_T8_B42_POST_B41_FRONTIER_CONTROL_IDS) &&
    b42.productionImpact === 'NONE' &&
    b42.recommendedNextGate === 'FAMILY_RELATION_CURRENT_METHOD_COMPATIBLE_PUBLISHED_SOURCE_REMEDIATION_READINESS_REVIEW'
  );
}

function frozenFamilyEvidenceBoundaryValid(): boolean {
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

function triggerContractsValid(): boolean {
  const contracts = CAREER_T8_B43_FAMILY_REMEDIATION_TRIGGER_CONTRACTS;
  return (
    contracts.length === 3 &&
    contracts[0].triggerId === 'FAMILY_2017_TARGET_BODY_COMPLETE_PATH_TRIGGER' &&
    contracts[1].triggerId === 'FAMILY_2015_REQUIRED_METHOD_DIMENSIONS_TRIGGER' &&
    contracts[2].triggerId === 'FAMILY_INDEPENDENT_COMPLETE_PATH_TRIGGER' &&
    contracts.every(
      (contract) =>
        contract.currentlySatisfied === false &&
        contract.laneReopensWhenAllConditionsSatisfied &&
        contract.requiredConditions.length === 4 &&
        contract.prohibitedSubstitutes.length === 4 &&
        contract.activationAutomaticallyAdmitsAuthority === false &&
        contract.activationAutomaticallyClosesGap === false &&
        contract.activationRequiresFollowupAdequacyReview,
    )
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8FamilyRemediationTriggerReadinessReviewReport, 'reviewId'>,
): CareerPersonalizationT8FamilyRemediationTriggerReadinessReviewReport {
  return {
    reviewId: `career_personalization_t8_family_remediation_trigger_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8FamilyRemediationTriggerReadinessReview(
  b42: CareerPersonalizationT8PostB41ResearchFrontierHoldReviewReport,
): CareerPersonalizationT8FamilyRemediationTriggerReadinessReviewReport {
  const accepted = exactB42Accepted(b42) && frozenFamilyEvidenceBoundaryValid() && triggerContractsValid();

  return finalized({
    reviewVersion: CAREER_PERSONALIZATION_T8_FAMILY_REMEDIATION_TRIGGER_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_FAMILY_RELATION_CURRENT_METHOD_COMPATIBLE_PUBLISHED_SOURCE_REMEDIATION_READINESS_REVIEW'
      : 'UPSTREAM_B42_BOUNDARY_INVALID',
    decision: accepted
      ? 'THREE_FAMILY_REMEDIATION_TRIGGER_CONTRACTS_FROZEN_ZERO_SATISFIED_RESUME_ONLY_ON_PATH_COMPLETE_EVIDENCE_OR_METHOD_CHANGE_NO_AUTHORITY_ADMISSION'
      : 'FAMILY_REMEDIATION_TRIGGER_READINESS_NOT_ESTABLISHED',
    upstreamB42ReviewId: b42.reviewId,
    exactB42BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    triggerContracts: accepted ? CAREER_T8_B43_FAMILY_REMEDIATION_TRIGGER_CONTRACTS : Object.freeze([]),
    triggerContractCount: accepted ? 3 : 0,
    currentlySatisfiedTriggerCount: 0,
    currentlyExecutableFamilyResearchLaneCount: 0,
    career2017TriggerSatisfied: false,
    semantic2015TriggerSatisfied: false,
    independentCompletePathTriggerSatisfied: false,
    career2017TargetRelationBodyAcquired: false,
    semantic2015ExactEditionBindingEstablished: false,
    semantic2015MandatoryStrengthTransformationDependencyPreserved: true,
    currentMethodConsumesRequired2015Dimensions: false,
    familyCurrentMethodCompatiblePathCount: 0,
    familyAdmissionReadyCandidateCount: 0,
    familyCoverageClass: 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE',
    qianliHistoricalPathPreserved: true,
    broadSearchRestartAuthorized: false,
    repeatedUnchangedSurfaceSearchAuthorized: false,
    crossSourceRequirementStitchingAuthorized: false,
    activationAutomaticallyAdmitsAuthority: false,
    activationAutomaticallyClosesGap: false,
    activationAlwaysRequiresAdequacyReview: true,
    familyAuthorityAdmittedByThisGate: false,
    familyGapClosureReady: false,
    positionBoundedAuthorityComponentCountPreserved: accepted ? 1 : 0,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityGapClosedByThisGate: false,
    numericWeightingIntroduced: false,
    occupationModernizationUsed: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? CAREER_T8_B43_FAMILY_REMEDIATION_TRIGGER_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T8_POST_B43_GLOBAL_RESEARCH_HOLD_REVIEW'
      : 'FAMILY_RELATION_CURRENT_METHOD_COMPATIBLE_PUBLISHED_SOURCE_REMEDIATION_READINESS_REVIEW',
  });
}
