import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_EVIDENCE_VERSION,
  CAREER_T8_B55_CHEN_ZEZHEN_2023_PREVIEW_INSPECTION_EVIDENCE,
  CAREER_T8_B55_TARGET_ACQUISITION_CONTROL_IDS,
  type CareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidenceReport,
} from './career-personalization-t8-branch-2023-chen-zezhen-target-clash-body-acquisition-evidence.js';

export const CAREER_PERSONALIZATION_T8_BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_HOLD_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-branch-2023-chen-zezhen-target-clash-body-acquisition-hold-review-v1' as const;

export const CAREER_T8_B56_CHEN_ZEZHEN_TARGET_BODY_REOPEN_TRIGGERS = Object.freeze([
  Object.freeze({
    triggerId: 'CHEN_ZEZHEN_2023_DIRECT_Q407_TO_Q422_BODY_AVAILABLE' as const,
    currentlySatisfied: false as const,
    requiredConditions: Object.freeze([
      'A directly inspectable body from the exact ISBN 9786263640641 work contains one or more of Q407-Q422 answers relevant to branch-clash method.',
      'The body is bound strongly enough to the same 2023 edition to distinguish normative answer text from TOC, search snippets, reviews or derivative summaries.',
      'The acquired local context is sufficient to preserve the source-required limits and dependencies rather than extracting a decontextualized clash slogan.',
    ]),
    prohibitedSubstitutes: Object.freeze([
      'The already inspected Q147-Q168 free-reading preview.',
      'The Q407-Q422 table-of-contents locator without answer text.',
      'Search-index fragments or third-party paraphrases lacking exact same-work body binding.',
      'Another source used to fill the missing Chen Zezhen clash body.',
    ]),
  }),
  Object.freeze({
    triggerId: 'CHEN_ZEZHEN_2023_EQUIVALENT_EXACT_SAME_EDITION_TARGET_WITNESS_AVAILABLE' as const,
    currentlySatisfied: false as const,
    requiredConditions: Object.freeze([
      'A library scan, publisher expansion, author-provided excerpt, legally inspectable copy, or equivalent witness exposes the exact same-edition target answer body.',
      'Edition/work identity and target-body continuity are directly auditable.',
      'Any later adequacy or compatibility review consumes only the acquired same-source body and does not cross-source stitch missing requirements.',
    ]),
    prohibitedSubstitutes: Object.freeze([
      'Publication metadata alone.',
      'A new URL serving the same unchanged 12-page preview.',
      'A mirror that cannot establish continuity to the exact work/edition target body.',
    ]),
  }),
] as const);

export const CAREER_T8_B56_TARGET_BODY_HOLD_CONTROL_IDS = Object.freeze([
  'B56_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B55_TARGET_BODY_ACQUISITION_BOUNDARY',
  'B55_COMPLETED_THE_ONLY_B54_TARGETED_ACQUISITION_LANE_WITH_TARGET_Q407_TO_Q422_BODY_NOT_ACQUIRED',
  'THE_INSPECTED_PUBLISHER_LINKED_Q147_TO_Q168_PREVIEW_REMAINS_SUPPORTING_BODY_NOT_TARGET_CLASH_BODY',
  'THE_Q407_TO_Q422_TOC_SEQUENCE_REMAINS_A_TARGET_LOCATOR_ONLY',
  'REPEATING_THE_SAME_PREVIEW_TOC_CATALOG_OR_SEARCH_INDEX_SURFACES_IS_NOT_A_REOPEN_EVENT',
  'THE_CHEN_ZEZHEN_TARGET_BODY_LANE_REOPENS_ONLY_ON_DIRECT_Q407_TO_Q422_BODY_OR_EQUIVALENT_EXACT_SAME_EDITION_TARGET_WITNESS',
  'A_REOPEN_TRIGGER_DOES_NOT_AUTOMATICALLY_ESTABLISH_INDEPENDENT_COMPLETE_PATH_DEPENDENCY_SEPARABILITY_CURRENT_METHOD_COMPATIBILITY_OR_AUTHORITY',
  'ANY_FUTURE_ADEQUACY_COMPATIBILITY_REVIEW_MUST_PRESERVE_SOURCE_REQUIRED_CONFIGURATION_XIJI_OR_OTHER_DEPENDENCIES',
  'NO_BROAD_BRANCH_SOURCE_SEARCH_OR_CROSS_SOURCE_STITCHING_IS_AUTHORIZED_BY_THIS_HOLD',
  'BOTH_BRANCH_AUTHORITY_TRIGGERS_REMAIN_UNSATISFIED_AND_ZERO_AUTHORITY_RESEARCH_ADMISSION_OR_SEMANTIC_LANES_ARE_EXECUTABLE',
  'ALL_SIX_HISTORICAL_CAREER_T8_AUTHORITY_GAPS_REMAIN_FORMALLY_OPEN',
  'NO_T5_T6_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_DEFAULT_OR_PRODUCTION_PROMOTION_IS_AUTHORIZED',
] as const);

export interface CareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionHoldReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_HOLD_REVIEW_VERSION;
  status:
    | 'RESOLVED_BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_HOLD_REVIEW'
    | 'UPSTREAM_B55_BOUNDARY_INVALID';
  decision:
    | 'CHEN_ZEZHEN_2023_TARGET_BODY_ACQUISITION_HOLD_ZERO_REOPEN_TRIGGERS_SATISFIED_RESUME_ONLY_ON_EXACT_TARGET_BODY_CHANGE'
    | 'BRANCH_2023_CHEN_ZEZHEN_TARGET_BODY_HOLD_NOT_ESTABLISHED';
  upstreamB55EvidenceId: string;
  exactB55BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  targetBodyAcquisitionHoldActive: boolean;
  b55TargetedAcquisitionCompleted: boolean;
  b55TargetBodyAcquired: false;
  supportingPreviewBodyPreserved: boolean;
  targetQ407ToQ422LocatorPreserved: boolean;
  reopenTriggers: readonly (typeof CAREER_T8_B56_CHEN_ZEZHEN_TARGET_BODY_REOPEN_TRIGGERS)[number][];
  reopenTriggerCount: 2 | 0;
  satisfiedReopenTriggerCount: 0;
  immediatelyExecutableTargetAcquisitionLaneCount: 0;
  immediatelyExecutableAuthorityResearchLaneCount: 0;
  immediatelyExecutableAuthorityAdmissionLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane: null;
  repeatSamePreviewSearchAuthorized: false;
  repeatTocSearchAuthorized: false;
  repeatCatalogSearchAuthorized: false;
  repeatSearchIndexSearchAuthorized: false;
  broadBranchSourceSearchRestartAuthorized: false;
  exactSameEditionTargetBodyChangeRequiredForReopen: boolean;
  triggerActivationAutomaticallyEstablishesCompletePath: false;
  triggerActivationAutomaticallyAdmitsAuthority: false;
  branchSourceSpecificDependencySeparabilityOrCompletePathAuthorityTriggerSatisfied: false;
  branchMethodSpecificInputContractAndUpstreamAuthorityTriggerSatisfied: false;
  branchAuthorityTriggerActivationCount: 0;
  crossSourceStitchingAuthorized: false;
  sourceMandatoryDependencyDroppingAuthorized: false;
  effectClassFlatteningAuthorized: false;
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
  controlIds: readonly (typeof CAREER_T8_B56_TARGET_BODY_HOLD_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    holdReviewsCreated: 1 | 0;
    targetBodiesAcquired: 0;
    targetAcquisitionLanesOpened: 0;
    authorityTriggersActivated: 0;
    authorityResearchLanesOpened: 0;
    authorityComponentsAdmitted: 0;
    authorityGapsClosed: 0;
    methodologyDefinitionsCreated: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
    productionBehaviorsChanged: 0;
  };
  recommendedNextGate:
    | 'BRANCH_2023_CHEN_ZEZHEN_TARGET_BODY_REOPEN_TRIGGER_ACTIVATION_EVIDENCE'
    | 'BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_HOLD_REVIEW';
}

function contentAddressedB55IdentityValid(
  b55: CareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidenceReport,
): boolean {
  const { evidenceId, ...material } = b55;
  return (
    evidenceId ===
    `career_personalization_t8_branch_2023_chen_zezhen_target_clash_body_acquisition_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB55Accepted(
  b55: CareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidenceReport,
): boolean {
  return (
    contentAddressedB55IdentityValid(b55) &&
    b55.evidenceVersion ===
      CAREER_PERSONALIZATION_T8_BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_EVIDENCE_VERSION &&
    b55.status === 'RESOLVED_BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_EVIDENCE' &&
    b55.decision ===
      'OFFICIAL_2023_PREVIEW_DIRECTLY_INSPECTED_TARGET_Q407_TO_Q422_ANSWER_BODY_NOT_ACQUIRED_INDEPENDENT_COMPLETE_PATH_NOT_ESTABLISHED_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS' &&
    b55.exactB54BoundaryAccepted &&
    b55.domain === 'career' &&
    b55.temporalScope === 'natal' &&
    b55.statusClass === 'research' &&
    b55.candidateEvidencePreserved &&
    deterministicContentHash(b55.previewInspectionEvidence) ===
      deterministicContentHash(CAREER_T8_B55_CHEN_ZEZHEN_2023_PREVIEW_INSPECTION_EVIDENCE) &&
    b55.targetedAcquisitionPerformed &&
    b55.targetedAcquisitionLaneCompleted &&
    b55.targetedAcquisitionOutcome === 'BLOCKED_TARGET_BODY_NOT_PRESENT_ON_INSPECTED_PUBLISHER_LINKED_PREVIEW' &&
    b55.publisherLinkedPreviewDirectlyInspected &&
    b55.inspectedPreviewPageCount === 12 &&
    b55.directZhengguanSemanticBodyPreserved &&
    b55.directTenGodContextDependencyBodyObserved &&
    b55.targetQ407ToQ422LocatorPreserved &&
    b55.targetQ407ToQ422AnswerBodyPresentInInspectedPreview === false &&
    b55.targetQ407ToQ422AnswerBodyDirectlyInspected === false &&
    b55.targetClashMethodBodyAcquired === false &&
    b55.sameSourceQualitativeModificationModeEstablished === false &&
    b55.sameSourceExplicitLimitsAndContextEstablished === false &&
    b55.independentCompleteSingleSourcePathEstablished === false &&
    b55.sourceSpecificDependencySeparabilityEstablished === false &&
    b55.currentMethodCompatibilityEstablished === false &&
    b55.branchSourceSpecificDependencySeparabilityOrCompletePathAuthorityTriggerSatisfied === false &&
    b55.branchMethodSpecificInputContractAndUpstreamAuthorityTriggerSatisfied === false &&
    b55.branchAuthorityTriggerActivationCount === 0 &&
    b55.authorityResearchLaneReopenedCount === 0 &&
    b55.immediatelyExecutableAuthorityAdmissionLaneCount === 0 &&
    b55.immediatelyExecutableSemanticRuleLaneCount === 0 &&
    b55.selectedImmediateNextLane === null &&
    b55.futureExactSameEditionTargetBodyAcquisitionRemainsEligible &&
    b55.broadBranchSourceSearchRestartAuthorized === false &&
    b55.repeatSupportingPreviewSearchAuthorized === false &&
    b55.tableOfContentsAsNormativeBodyAuthorized === false &&
    b55.searchIndexAsNormativeBodyAuthorized === false &&
    b55.crossSourceStitchingAuthorized === false &&
    b55.sourceMandatoryDependencyDroppingAuthorized === false &&
    b55.effectClassFlatteningAuthorized === false &&
    b55.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b55.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b55.authorityAdmittedByThisGate === false &&
    b55.authorityGapClosedByThisGate === false &&
    b55.methodologyDefinitionCreatedByThisGate === false &&
    b55.t5RuleAuthoringAuthorized === false &&
    b55.t6RuleAuthoringAuthorized === false &&
    b55.t8RuleAuthoringAuthorized === false &&
    b55.claimTypeCreationAuthorized === false &&
    b55.personalizedT8PackCreationAuthorized === false &&
    b55.consumerNarrativeAuthorized === false &&
    b55.previewDefaultSwitchAuthorized === false &&
    b55.productionPromotionAuthorized === false &&
    b55.productionImpact === 'NONE' &&
    b55.controlCount === 14 &&
    b55.controlsFrozen &&
    deterministicContentHash(b55.controlIds) === deterministicContentHash(CAREER_T8_B55_TARGET_ACQUISITION_CONTROL_IDS) &&
    b55.implementationEffects.targetedAcquisitionAttemptsCompleted === 1 &&
    b55.implementationEffects.supportingPreviewBodiesInspected === 1 &&
    b55.implementationEffects.targetClashBodiesAcquired === 0 &&
    b55.recommendedNextGate === 'BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_HOLD_REVIEW'
  );
}

function triggerSetValid(): boolean {
  const [direct, equivalent] = CAREER_T8_B56_CHEN_ZEZHEN_TARGET_BODY_REOPEN_TRIGGERS;
  return Boolean(
    CAREER_T8_B56_CHEN_ZEZHEN_TARGET_BODY_REOPEN_TRIGGERS.length === 2 &&
      direct?.triggerId === 'CHEN_ZEZHEN_2023_DIRECT_Q407_TO_Q422_BODY_AVAILABLE' &&
      direct.currentlySatisfied === false &&
      direct.requiredConditions.length === 3 &&
      direct.prohibitedSubstitutes.length === 4 &&
      equivalent?.triggerId === 'CHEN_ZEZHEN_2023_EQUIVALENT_EXACT_SAME_EDITION_TARGET_WITNESS_AVAILABLE' &&
      equivalent.currentlySatisfied === false &&
      equivalent.requiredConditions.length === 3 &&
      equivalent.prohibitedSubstitutes.length === 3,
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionHoldReviewReport, 'reviewId'>,
): CareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionHoldReviewReport {
  return {
    reviewId: `career_personalization_t8_branch_2023_chen_zezhen_target_clash_body_acquisition_hold_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionHoldReview(
  b55: CareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidenceReport,
): CareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionHoldReviewReport {
  const accepted = exactB55Accepted(b55) && triggerSetValid();

  return finalized({
    reviewVersion: CAREER_PERSONALIZATION_T8_BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_HOLD_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_HOLD_REVIEW'
      : 'UPSTREAM_B55_BOUNDARY_INVALID',
    decision: accepted
      ? 'CHEN_ZEZHEN_2023_TARGET_BODY_ACQUISITION_HOLD_ZERO_REOPEN_TRIGGERS_SATISFIED_RESUME_ONLY_ON_EXACT_TARGET_BODY_CHANGE'
      : 'BRANCH_2023_CHEN_ZEZHEN_TARGET_BODY_HOLD_NOT_ESTABLISHED',
    upstreamB55EvidenceId: b55.evidenceId,
    exactB55BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    targetBodyAcquisitionHoldActive: accepted,
    b55TargetedAcquisitionCompleted: accepted,
    b55TargetBodyAcquired: false,
    supportingPreviewBodyPreserved: accepted,
    targetQ407ToQ422LocatorPreserved: accepted,
    reopenTriggers: accepted ? CAREER_T8_B56_CHEN_ZEZHEN_TARGET_BODY_REOPEN_TRIGGERS : Object.freeze([]),
    reopenTriggerCount: accepted ? 2 : 0,
    satisfiedReopenTriggerCount: 0,
    immediatelyExecutableTargetAcquisitionLaneCount: 0,
    immediatelyExecutableAuthorityResearchLaneCount: 0,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane: null,
    repeatSamePreviewSearchAuthorized: false,
    repeatTocSearchAuthorized: false,
    repeatCatalogSearchAuthorized: false,
    repeatSearchIndexSearchAuthorized: false,
    broadBranchSourceSearchRestartAuthorized: false,
    exactSameEditionTargetBodyChangeRequiredForReopen: accepted,
    triggerActivationAutomaticallyEstablishesCompletePath: false,
    triggerActivationAutomaticallyAdmitsAuthority: false,
    branchSourceSpecificDependencySeparabilityOrCompletePathAuthorityTriggerSatisfied: false,
    branchMethodSpecificInputContractAndUpstreamAuthorityTriggerSatisfied: false,
    branchAuthorityTriggerActivationCount: 0,
    crossSourceStitchingAuthorized: false,
    sourceMandatoryDependencyDroppingAuthorized: false,
    effectClassFlatteningAuthorized: false,
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
    controlIds: accepted ? CAREER_T8_B56_TARGET_BODY_HOLD_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      holdReviewsCreated: accepted ? 1 : 0,
      targetBodiesAcquired: 0,
      targetAcquisitionLanesOpened: 0,
      authorityTriggersActivated: 0,
      authorityResearchLanesOpened: 0,
      authorityComponentsAdmitted: 0,
      authorityGapsClosed: 0,
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
      productionBehaviorsChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'BRANCH_2023_CHEN_ZEZHEN_TARGET_BODY_REOPEN_TRIGGER_ACTIVATION_EVIDENCE'
      : 'BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_HOLD_REVIEW',
  });
}
