import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_CLASH_CURRENT_T5_PUBLISHED_EVIDENCE_ADEQUACY_COMPATIBILITY_REVIEW_VERSION,
  CAREER_T8_B40_BRANCH_ADEQUACY_COMPATIBILITY_CONTROL_IDS,
  CAREER_T8_B40_BRANCH_REMEDIATION_REQUIREMENT_IDS,
  type CareerPersonalizationT8BranchClashCurrentT5PublishedEvidenceAdequacyCompatibilityReviewReport,
} from './career-personalization-t8-branch-clash-current-t5-published-evidence-adequacy-compatibility-review.js';

export const CAREER_PERSONALIZATION_T8_BRANCH_CLASH_REMEDIATION_TRIGGER_READINESS_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-branch-clash-remediation-trigger-readiness-review-v1' as const;

export type CareerT8B41BranchRemediationTriggerId =
  | 'BRANCH_2015_EXACT_EDITION_COMPATIBILITY_TRIGGER'
  | 'BRANCH_INDEPENDENT_COMPLETE_PATH_TRIGGER';

export interface CareerT8B41BranchRemediationTriggerContract {
  triggerId: CareerT8B41BranchRemediationTriggerId;
  currentlySatisfied: false;
  laneReopensWhenAllConditionsSatisfied: true;
  requiredConditions: readonly string[];
  prohibitedSubstitutes: readonly string[];
  activationAutomaticallyAdmitsAuthority: false;
  activationAutomaticallyClosesGap: false;
  activationRequiresFollowupAdequacyReview: true;
}

export const CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTRACTS = Object.freeze([
  Object.freeze({
    triggerId: 'BRANCH_2015_EXACT_EDITION_COMPATIBILITY_TRIGGER' as const,
    currentlySatisfied: false as const,
    laneReopensWhenAllConditionsSatisfied: true as const,
    requiredConditions: Object.freeze([
      'The exact 2015 printed edition of 十神闡微 is directly inspected at the target passage that binds 正官 semantic expression to 刑/沖 intimacy or distance.',
      'The exact-edition local method context is directly inspectable far enough to determine whether distance/strength/旺衰 is mandatory for this bounded modifier rather than optional surrounding commentary.',
      'The same 2015 source path itself establishes that the bounded ATTENUATES_OR_REDUCES_EXPRESSION modifier is separable from unsupported strength/旺衰 dependencies, or else the path is explicitly classified CURRENT_METHOD_INCOMPATIBLE.',
      'The exact bounded semantic remains 正官 → TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY → formal_responsibility with no base-semantic deletion.',
    ]),
    prohibitedSubstitutes: Object.freeze([
      'The existing same-work web/full-text lineage without direct exact-2015 printed passage inspection.',
      'Formal ISBN/catalog metadata without the target printed body.',
      'Dropping distance/strength/旺衰 dependencies because current Career T5 does not consume them.',
      'Using another source only to supply compatibility or limits missing from the 2015 path.',
    ]),
    activationAutomaticallyAdmitsAuthority: false as const,
    activationAutomaticallyClosesGap: false as const,
    activationRequiresFollowupAdequacyReview: true as const,
  }),
  Object.freeze({
    triggerId: 'BRANCH_INDEPENDENT_COMPLETE_PATH_TRIGGER' as const,
    currentlySatisfied: false as const,
    laneReopensWhenAllConditionsSatisfied: true as const,
    requiredConditions: Object.freeze([
      'A genuinely new independently adequate published source path is acquired rather than a repackaging of the already inspected 十神闡微 lineage.',
      'That one source path independently binds exact 正官 to the governed current-T5 formal_responsibility semantic and a natal branch clash condition.',
      'That same source independently supplies a qualitative modification mode plus explicit limits/context and establishes current-method compatibility without requiring unsupported strength/旺衰 dimensions.',
      'The source path is independently sufficient for review without borrowing semantics, limits, or compatibility from the 2015 path or any other source.',
    ]),
    prohibitedSubstitutes: Object.freeze([
      'A temporal 운 example treated as natal authority.',
      'A source that mentions clash but not the exact governed current-T5 Career semantic.',
      'Cross-source stitching of clash, semantic effect, limits, or compatibility requirements.',
      'Search snippets, TOC entries, testimonials, or bibliographic metadata without inspectable normative body.',
    ]),
    activationAutomaticallyAdmitsAuthority: false as const,
    activationAutomaticallyClosesGap: false as const,
    activationRequiresFollowupAdequacyReview: true as const,
  }),
] as const satisfies readonly CareerT8B41BranchRemediationTriggerContract[]);

export const CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTROL_IDS = Object.freeze([
  'B41_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B40_ADEQUACY_COMPATIBILITY_BOUNDARY',
  'B40_TWO_REMEDIATION_REQUIREMENTS_REMAIN_UNRESOLVED_AND_ARE_NOT_REINTERPRETED_AS_AUTHORITY',
  'THE_EXISTING_2015_PATH_REOPENS_ONLY_AFTER_EXACT_PRINTED_BINDING_AND_SAME_PATH_DEPENDENCY_COMPATIBILITY_ARE_BOTH_RESOLVED',
  'IF_THE_EXACT_2015_PATH_PROVES_STRENGTH_WANGSHUAI_MANDATORY_THE_RESULT_IS_CURRENT_METHOD_INCOMPATIBLE_NOT_FORCED_ADMISSION',
  'AN_ALTERNATE_BRANCH_PATH_REOPENS_ONLY_IF_ONE_NEW_SOURCE_INDEPENDENTLY_SATISFIES_THE_FULL_SEMANTIC_MODIFIER_LIMIT_AND_COMPATIBILITY_REQUIREMENTS',
  'NO_CROSS_SOURCE_STITCHING_MAY_FILL_COMPATIBILITY_LIMIT_OR_SEMANTIC_REQUIREMENTS',
  'REPEATED_SEARCH_OF_THE_UNCHANGED_SAME_WORK_FULL_TEXT_CATALOG_OR_METADATA_SURFACES_IS_NOT_AN_ACTIVATION_EVENT',
  'ZERO_BRANCH_REMEDIATION_TRIGGERS_ARE_CURRENTLY_SATISFIED_AND_ZERO_BRANCH_LANES_ARE_CURRENTLY_EXECUTABLE',
  'TRIGGER_ACTIVATION_NEVER_AUTOMATICALLY_ADMITS_AUTHORITY_OR_CLOSES_THE_BRANCH_HISTORICAL_GAP',
  'THE_B38_BOUNDED_POSITION_AUTHORITY_COMPONENT_REMAINS_PRESERVED_AND_UNCHANGED',
  'ALL_SIX_HISTORICAL_T8_SYNTHESIS_AUTHORITY_GAPS_REMAIN_FORMALLY_OPEN',
  'NO_NUMERIC_WEIGHTING_OCCUPATION_MODERNIZATION_T5_MUTATION_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_PROMOTION',
] as const);

export interface CareerPersonalizationT8BranchClashRemediationTriggerReadinessReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_BRANCH_CLASH_REMEDIATION_TRIGGER_READINESS_REVIEW_VERSION;
  status:
    | 'RESOLVED_BRANCH_CLASH_EXACT_EDITION_AND_METHOD_DEPENDENCY_REMEDIATION_TRIGGER_READINESS_REVIEW'
    | 'UPSTREAM_B40_BOUNDARY_INVALID';
  decision:
    | 'TWO_BRANCH_REMEDIATION_TRIGGER_CONTRACTS_FROZEN_ZERO_SATISFIED_RESUME_ONLY_ON_PATH_COMPLETE_EVIDENCE_CHANGE_NO_AUTHORITY_ADMISSION'
    | 'BRANCH_REMEDIATION_TRIGGER_READINESS_NOT_ESTABLISHED';
  upstreamB40ReviewId: string;
  exactB40BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  remediationRequirementIds: typeof CAREER_T8_B40_BRANCH_REMEDIATION_REQUIREMENT_IDS;
  remediationRequirementCount: 2;
  triggerContracts: readonly CareerT8B41BranchRemediationTriggerContract[];
  triggerContractCount: 2 | 0;
  currentlySatisfiedTriggerCount: 0;
  currentlyExecutableBranchLaneCount: 0;
  exact2015PathTriggerSatisfied: false;
  independentCompletePathTriggerSatisfied: false;
  exact2015PrintedPassageBindingEstablished: false;
  currentMethodCompatibilityEstablished: false;
  currentMethodIncompatibleIfMandatoryDependencyConfirmed: true;
  broadSearchRestartAuthorized: false;
  repeatedUnchangedSurfaceSearchAuthorized: false;
  crossSourceRequirementStitchingAuthorized: false;
  activationAutomaticallyAdmitsAuthority: false;
  activationAutomaticallyClosesGap: false;
  activationAlwaysRequiresAdequacyReview: true;
  branchAuthorityAdmissionReady: false;
  branchAuthorityAdmittedByThisGate: false;
  branchGapClosureReady: false;
  positionBoundedAuthorityComponentCountPreserved: 1 | 0;
  allSixHistoricalGapsRemainOpen: true;
  unresolvedGapIds: typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS;
  authorityGapClosedByThisGate: false;
  numericWeightingIntroduced: false;
  t5BaseSemanticMutated: false;
  occupationModernizationUsed: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_T8_POST_B41_RESEARCH_FRONTIER_HOLD_REVIEW'
    | 'BRANCH_CLASH_EXACT_EDITION_AND_METHOD_DEPENDENCY_REMEDIATION_TRIGGER_READINESS_REVIEW';
}

function contentAddressedB40IdentityValid(
  b40: CareerPersonalizationT8BranchClashCurrentT5PublishedEvidenceAdequacyCompatibilityReviewReport,
): boolean {
  const { reviewId, ...material } = b40;
  return reviewId ===
    `career_personalization_t8_branch_clash_current_t5_published_evidence_adequacy_compatibility_${deterministicContentHash(material).slice(0, 24)}`;
}

function exactB40Accepted(
  b40: CareerPersonalizationT8BranchClashCurrentT5PublishedEvidenceAdequacyCompatibilityReviewReport,
): boolean {
  return (
    contentAddressedB40IdentityValid(b40) &&
    b40.reviewVersion ===
      CAREER_PERSONALIZATION_T8_BRANCH_CLASH_CURRENT_T5_PUBLISHED_EVIDENCE_ADEQUACY_COMPATIBILITY_REVIEW_VERSION &&
    b40.status === 'RESOLVED_BRANCH_CLASH_CURRENT_T5_PUBLISHED_EVIDENCE_ADEQUACY_AND_COMPATIBILITY_REVIEW' &&
    b40.decision ===
      'BRANCH_PUBLISHED_EVIDENCE_MATERIAL_FOR_BOUNDED_MODIFIER_BUT_EXACT_EDITION_BINDING_AND_CURRENT_METHOD_COMPATIBILITY_NOT_ESTABLISHED_AUTHORITY_NOT_ADMISSION_READY' &&
    b40.exactB39BoundaryAccepted &&
    b40.domain === 'career' &&
    b40.temporalScope === 'natal' &&
    b40.statusClass === 'research' &&
    b40.exactTenGod === '정관' &&
    b40.currentT5SemanticKey === 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY' &&
    b40.currentT5Facet === 'formal_responsibility' &&
    b40.branchModificationMode === 'ATTENUATES_OR_REDUCES_EXPRESSION' &&
    b40.branchPublishedEvidenceAdequacyClass === 'MATERIAL_PARTIAL_REQUIREMENT_COVERAGE' &&
    b40.branchPublishedEditionProvenanceAdequate &&
    b40.branchSameWorkFullTextLineageInspected &&
    b40.branchSameWorkSemanticMechanismMaterial &&
    b40.branchSameWorkLimitObserved &&
    b40.branchExactPublishedEditionPassageBindingEstablished === false &&
    b40.branchDistanceStrengthWangshuaiDependencyObserved &&
    b40.branchCurrentMethodCompatibilityDisposition === 'NOT_ESTABLISHED_PENDING_DEPENDENCY_SEPARABILITY_EVIDENCE' &&
    b40.branchCurrentMethodCompatibilityEstablished === false &&
    b40.branchDependencyMayBeSilentlyDropped === false &&
    b40.branchAuthorityAdmissionReady === false &&
    b40.branchAuthorityAdmittedByThisGate === false &&
    b40.branchGapClosureReady === false &&
    b40.branchGapClosedByThisGate === false &&
    b40.remediationRequirementCount === 2 &&
    deterministicContentHash(b40.remediationRequirementIds) ===
      deterministicContentHash(CAREER_T8_B40_BRANCH_REMEDIATION_REQUIREMENT_IDS) &&
    b40.positionBoundedAuthorityComponentCountPreserved === 1 &&
    b40.crossSourceStitchingAuthorized === false &&
    b40.numericWeightingIntroduced === false &&
    b40.t5BaseSemanticDeletedOrMutated === false &&
    b40.occupationPromotionStatusOutcomeImported === false &&
    b40.winnerPrecedenceLogicIntroduced === false &&
    b40.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b40.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b40.authorityGapClosedByThisGate === false &&
    b40.controlCount === 13 &&
    b40.controlsFrozen &&
    deterministicContentHash(b40.controlIds) ===
      deterministicContentHash(CAREER_T8_B40_BRANCH_ADEQUACY_COMPATIBILITY_CONTROL_IDS) &&
    b40.t8RuleAuthoringAuthorized === false &&
    b40.t8ClaimTypeCreationAuthorized === false &&
    b40.personalizedT8PackCreationAuthorized === false &&
    b40.consumerNarrativeAuthorized === false &&
    b40.previewDefaultSwitchAuthorized === false &&
    b40.productionPromotionAuthorized === false &&
    b40.productionImpact === 'NONE' &&
    b40.recommendedNextGate === 'BRANCH_CLASH_EXACT_EDITION_AND_METHOD_DEPENDENCY_REMEDIATION_TRIGGER_READINESS_REVIEW'
  );
}

function triggerContractsValid(): boolean {
  const contracts = CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTRACTS;
  return (
    contracts.length === 2 &&
    contracts[0]?.triggerId === 'BRANCH_2015_EXACT_EDITION_COMPATIBILITY_TRIGGER' &&
    contracts[0].requiredConditions.length === 4 &&
    contracts[0].prohibitedSubstitutes.length === 4 &&
    contracts[1]?.triggerId === 'BRANCH_INDEPENDENT_COMPLETE_PATH_TRIGGER' &&
    contracts[1].requiredConditions.length === 4 &&
    contracts[1].prohibitedSubstitutes.length === 4 &&
    contracts.every(
      (contract) =>
        contract.currentlySatisfied === false &&
        contract.laneReopensWhenAllConditionsSatisfied &&
        contract.activationAutomaticallyAdmitsAuthority === false &&
        contract.activationAutomaticallyClosesGap === false &&
        contract.activationRequiresFollowupAdequacyReview,
    )
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8BranchClashRemediationTriggerReadinessReviewReport, 'reviewId'>,
): CareerPersonalizationT8BranchClashRemediationTriggerReadinessReviewReport {
  return {
    reviewId: `career_personalization_t8_branch_clash_remediation_trigger_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8BranchClashRemediationTriggerReadinessReview(
  b40: CareerPersonalizationT8BranchClashCurrentT5PublishedEvidenceAdequacyCompatibilityReviewReport,
): CareerPersonalizationT8BranchClashRemediationTriggerReadinessReviewReport {
  const accepted = exactB40Accepted(b40) && triggerContractsValid();

  return finalized({
    reviewVersion: CAREER_PERSONALIZATION_T8_BRANCH_CLASH_REMEDIATION_TRIGGER_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_BRANCH_CLASH_EXACT_EDITION_AND_METHOD_DEPENDENCY_REMEDIATION_TRIGGER_READINESS_REVIEW'
      : 'UPSTREAM_B40_BOUNDARY_INVALID',
    decision: accepted
      ? 'TWO_BRANCH_REMEDIATION_TRIGGER_CONTRACTS_FROZEN_ZERO_SATISFIED_RESUME_ONLY_ON_PATH_COMPLETE_EVIDENCE_CHANGE_NO_AUTHORITY_ADMISSION'
      : 'BRANCH_REMEDIATION_TRIGGER_READINESS_NOT_ESTABLISHED',
    upstreamB40ReviewId: b40.reviewId,
    exactB40BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    remediationRequirementIds: CAREER_T8_B40_BRANCH_REMEDIATION_REQUIREMENT_IDS,
    remediationRequirementCount: 2,
    triggerContracts: accepted ? CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTRACTS : Object.freeze([]),
    triggerContractCount: accepted ? 2 : 0,
    currentlySatisfiedTriggerCount: 0,
    currentlyExecutableBranchLaneCount: 0,
    exact2015PathTriggerSatisfied: false,
    independentCompletePathTriggerSatisfied: false,
    exact2015PrintedPassageBindingEstablished: false,
    currentMethodCompatibilityEstablished: false,
    currentMethodIncompatibleIfMandatoryDependencyConfirmed: true,
    broadSearchRestartAuthorized: false,
    repeatedUnchangedSurfaceSearchAuthorized: false,
    crossSourceRequirementStitchingAuthorized: false,
    activationAutomaticallyAdmitsAuthority: false,
    activationAutomaticallyClosesGap: false,
    activationAlwaysRequiresAdequacyReview: true,
    branchAuthorityAdmissionReady: false,
    branchAuthorityAdmittedByThisGate: false,
    branchGapClosureReady: false,
    positionBoundedAuthorityComponentCountPreserved: accepted ? 1 : 0,
    allSixHistoricalGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityGapClosedByThisGate: false,
    numericWeightingIntroduced: false,
    t5BaseSemanticMutated: false,
    occupationModernizationUsed: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? CAREER_T8_B41_BRANCH_REMEDIATION_TRIGGER_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T8_POST_B41_RESEARCH_FRONTIER_HOLD_REVIEW'
      : 'BRANCH_CLASH_EXACT_EDITION_AND_METHOD_DEPENDENCY_REMEDIATION_TRIGGER_READINESS_REVIEW',
  });
}
