import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_POST_B52_GLOBAL_RESEARCH_HOLD_REVIEW_VERSION,
  CAREER_T8_B53_GLOBAL_REOPEN_SIGNAL_CLASSES,
  CAREER_T8_B53_GLOBAL_RESEARCH_FRONTIER_RECORDS,
  CAREER_T8_B53_GLOBAL_RESEARCH_HOLD_CONTROL_IDS,
  type CareerPersonalizationT8PostB52GlobalResearchHoldReviewReport,
} from './career-personalization-t8-post-b52-global-research-hold-review.js';

export const CAREER_PERSONALIZATION_T8_POST_B52_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE_VERSION =
  'myeonghwa-career-personalization-t8-post-b52-research-reopen-trigger-activation-evidence-v1' as const;

export const CAREER_T8_B54_CHEN_ZEZHEN_2023_CANDIDATE_EVIDENCE = Object.freeze({
  sourceIdentity:
    '陳澤眞, 八字命理900問, 白象文化事業有限公司, 2023-08-01 first edition, 560 pages, ISBN 9786263640641',
  bibliographicCorroboration: Object.freeze([
    'Airiti iRead identifies 八字命理900問 by 陳澤眞, 白象文化, 2023, ISBN 9786263640641.',
    'Sanmin identifies the same title, author, publisher, 2023-08-01 publication date, first edition, 560 pages and ISBN 9786263640641.',
    'Books.com.tw and Taaze independently identify the same 2023-08-01 publication identity and publisher.',
  ]),
  inspectedSemanticBodySurface:
    'Kingstone/Taaze publisher-authorized preview exposes Q167-Q168 from the same work, including 正官在日支 with 責任感深厚 and leadership/social-position expressions.',
  exactTenGod: '정관' as const,
  currentT5SemanticKey: 'TEN_GOD_JEONG_GWAN_FORMAL_RESPONSIBILITY' as const,
  currentT5Facet: 'formal_responsibility' as const,
  directZhengguanSemanticBodyInspected: true as const,
  directFormalResponsibilityCorrespondenceObserved: true as const,
  directCareerExpressionCorrespondenceObserved: true as const,
  sameWorkInteractionChapterObserved: true as const,
  interactionChapterTitle: '第十一篇 詳論生剋刑沖會合' as const,
  targetedQuestionNumbers: Object.freeze([407, 408, 409, 415, 418, 420, 421, 422] as const),
  targetedQuestionTitles: Object.freeze([
    '何謂「地支相沖」？',
    '何謂「主沖」與「被沖」？',
    '「沖帶剋」與「沖不剋」，如何區分？',
    '合好，沖不好，對嗎？',
    '如何正確看待「合與沖」？',
    '相沖一定是兩敗俱傷？',
    '「沖去忌神」與「沖去用神」的不同結果如何？',
    '相沖有吉有凶，關鍵在何處？',
  ] as const),
  targetedClashAnswerBodyDirectlyInspected: false as const,
  targetedClashMethodBodyAcquired: false as const,
  sameSourceQualitativeModificationModeEstablished: false as const,
  sameSourceExplicitLimitsAndContextEstablished: false as const,
  sameSourceCurrentMethodCompatibilityEstablished: false as const,
  independentCompleteSingleSourcePathEstablished: false as const,
  normativeProvenanceIndependenceClaimedByThisGate: false as const,
  signalClass: 'BRANCH_DIFFERENT_QUALIFYING_SOURCE_COMPLETE_PATH_SIGNAL' as const,
  signalDisposition:
    'MATERIAL_NEW_SOURCE_ACQUISITION_SIGNAL_TARGETED_CLASH_BODY_NOT_YET_ACQUIRED' as const,
  evidenceNotes: Object.freeze([
    'This candidate is materially different from the B49, B50, B51 and B52 source paths by title, author and publication identity, but distinct metadata alone is not treated as normative provenance independence.',
    'The same exact 2023 work directly exposes Zhengguan responsibility and leadership semantics and separately enumerates a dense branch-clash method sequence covering clash direction, clash-with-control versus clash-without-control, good/bad clash, and 用神/忌神-conditioned outcomes.',
    'The public preview does not expose the answers to Q407-Q422. Therefore no clash modification mode, limit, dependency separability, current-method compatibility or complete-path authority is inferred from the table of contents.',
    'The material change relative to B53 is only the discovery of a bounded acquisition candidate that warrants targeted retrieval of the exact Q407-Q422 answer body. It is not an authority-trigger activation.',
  ]),
} as const);

export const CAREER_T8_B54_REOPEN_SIGNAL_RECORDS = Object.freeze([
  Object.freeze({
    signalClass: 'BRANCH_2015_EXACT_PRINTED_TARGET_BODY_ACQUIRED' as const,
    materiallyChangedSinceB53: false as const,
    qualifyingCandidateObserved: false as const,
    targetedAcquisitionLaneReopened: false as const,
    authorityTriggerSatisfied: false as const,
    evidenceBasis: Object.freeze([
      'No directly inspected 2015 printed target-page facsimile or equivalent exact printed witness was acquired in this gate.',
    ]),
  }),
  Object.freeze({
    signalClass: 'BRANCH_DIFFERENT_QUALIFYING_SOURCE_COMPLETE_PATH_SIGNAL' as const,
    materiallyChangedSinceB53: true as const,
    qualifyingCandidateObserved: true as const,
    targetedAcquisitionLaneReopened: true as const,
    authorityTriggerSatisfied: false as const,
    evidenceBasis: Object.freeze([
      'A new 2023 first-edition source identity is bibliographically bound across multiple independent catalog surfaces.',
      'The same work directly exposes Zhengguan responsibility and leadership semantics in publisher-authorized preview text.',
      'The same work contains a dedicated branch-interaction chapter whose Q407-Q422 sequence explicitly targets branch clash mechanics, direction, qualitative result and 用神/忌神-conditioned good/bad outcomes.',
      'The answer body for Q407-Q422 is not yet directly inspected, so the signal opens targeted acquisition only and does not satisfy the independent complete-path authority trigger.',
    ]),
  }),
  Object.freeze({
    signalClass: 'BRANCH_GOVERNED_METHOD_AUTHORITY_CHANGE' as const,
    materiallyChangedSinceB53: false as const,
    qualifyingCandidateObserved: false as const,
    targetedAcquisitionLaneReopened: false as const,
    authorityTriggerSatisfied: false as const,
    evidenceBasis: Object.freeze([
      'No separately governed method-specific upstream authority was admitted by this gate.',
      'Cross-source methodological convergence observed during discovery is not itself a governed method-authority change.',
    ]),
  }),
] as const);

export const CAREER_T8_B54_REOPEN_TRIGGER_CONTROL_IDS = Object.freeze([
  'B54_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B53_POST_B52_GLOBAL_RESEARCH_HOLD_BOUNDARY',
  'ONLY_THE_THREE_B53_BRANCH_REOPEN_SIGNAL_CLASSES_ARE_ADJUDICATED_FOR_THIS_BRANCH_REOPEN_DECISION',
  'THE_2023_CHEN_ZEZHEN_FIRST_EDITION_IS_BOUND_AS_A_NEW_ACQUISITION_CANDIDATE_WITHOUT_INFERRING_NORMATIVE_PROVENANCE_INDEPENDENCE_FROM_METADATA',
  'PUBLISHER_AUTHORIZED_PREVIEW_BODY_DIRECTLY_SUPPORTS_ZHENGGUAN_FORMAL_RESPONSIBILITY_AND_CAREER_SEMANTIC_CORRESPONDENCE',
  'THE_SAME_WORK_TOC_EXPLICITLY_EXPOSES_A_DENSE_BRANCH_CLASH_METHOD_SEQUENCE_Q407_TO_Q422_RELEVANT_TO_DIRECTION_MODIFICATION_LIMITS_AND_XIJI_CONDITIONING',
  'TOC_OR_QUESTION_TITLES_DO_NOT_SUBSTITUTE_FOR_THE_UNINSPECTED_Q407_TO_Q422_NORMATIVE_ANSWER_BODY',
  'ONE_MATERIAL_REOPEN_SIGNAL_CHANGE_OPENS_ONLY_THE_CHEN_ZEZHEN_2023_TARGETED_CLASH_BODY_ACQUISITION_LANE',
  'THE_B41_INDEPENDENT_COMPLETE_PATH_AUTHORITY_TRIGGER_REMAINS_UNSATISFIED_UNTIL_THE_SAME_SOURCE_ANSWER_BODY_IS_DIRECTLY_INSPECTED_AND_ADEQUACY_COMPATIBILITY_IS_ESTABLISHED',
  'THE_2015_EXACT_PRINTED_TARGET_BODY_SIGNAL_REMAINS_UNCHANGED_AND_UNSATISFIED',
  'THE_GOVERNED_METHOD_AUTHORITY_CHANGE_SIGNAL_REMAINS_UNCHANGED_AND_UNSATISFIED',
  'NO_BROAD_SOURCE_SEARCH_RESTART_NO_REPEAT_OF_CLOSED_B49_B50_B51_OR_B52_SURFACES_AND_NO_CROSS_SOURCE_STITCHING_IS_AUTHORIZED',
  'NO_SOURCE_MANDATORY_DEPENDENCY_MAY_BE_DROPPED_AND_NO_EFFECT_CLASS_MAY_BE_FLATTENED_TO_FORCE_CURRENT_METHOD_COMPATIBILITY',
  'ALL_SIX_HISTORICAL_CAREER_T8_AUTHORITY_GAPS_REMAIN_FORMALLY_OPEN',
  'NO_T5_T6_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_DEFAULT_OR_PRODUCTION_PROMOTION_IS_AUTHORIZED',
] as const);

export interface CareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof CAREER_PERSONALIZATION_T8_POST_B52_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_CAREER_PERSONALIZATION_T8_POST_B52_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE'
    | 'UPSTREAM_B53_BOUNDARY_INVALID';
  decision:
    | 'ONE_BRANCH_DIFFERENT_SOURCE_REOPEN_SIGNAL_MATERIALLY_CHANGED_TARGETED_2023_CLASH_BODY_ACQUISITION_LANE_OPENED_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS'
    | 'POST_B52_RESEARCH_REOPEN_TRIGGER_ACTIVATION_NOT_ESTABLISHED';
  upstreamB53ReviewId: string;
  exactB53BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  candidateEvidence: typeof CAREER_T8_B54_CHEN_ZEZHEN_2023_CANDIDATE_EVIDENCE | null;
  reopenSignalRecords: readonly (typeof CAREER_T8_B54_REOPEN_SIGNAL_RECORDS)[number][];
  reopenSignalRecordCount: 3 | 0;
  materiallyChangedReopenSignalCount: 1 | 0;
  changedSignalClass: 'BRANCH_DIFFERENT_QUALIFYING_SOURCE_COMPLETE_PATH_SIGNAL' | null;
  targetedSourceAcquisitionLaneReopenedCount: 1 | 0;
  selectedImmediateNextLane: 'BRANCH_CHEN_ZEZHEN_2023_TARGET_CLASH_BODY_ACQUISITION' | null;
  chenZezhen2023CandidateObserved: boolean;
  chenZezhen2023ExactPublicationIdentityBound: boolean;
  chenZezhen2023ZhengguanSemanticBodyDirectlyInspected: boolean;
  chenZezhen2023TargetedClashQuestionSequenceObserved: boolean;
  chenZezhen2023TargetedClashAnswerBodyDirectlyInspected: false;
  independentCompleteSingleSourcePathEstablished: false;
  sourceSpecificDependencySeparabilityEstablished: false;
  currentMethodCompatibilityEstablished: false;
  branchSourceSpecificDependencySeparabilityOrCompletePathAuthorityTriggerSatisfied: false;
  branchMethodSpecificInputContractAndUpstreamAuthorityTriggerSatisfied: false;
  branchAuthorityTriggerActivationCount: 0;
  authorityResearchLaneReopenedCount: 0;
  immediatelyExecutableAuthorityAdmissionLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  branch2015ExactPrintedTargetBodySignalChanged: false;
  governedMethodAuthoritySignalChanged: false;
  broadBranchSourceSearchRestartAuthorized: false;
  repeatedClosedBranchSurfaceSearchAuthorized: false;
  tableOfContentsAsNormativeBodyAuthorized: false;
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
  controlIds: readonly (typeof CAREER_T8_B54_REOPEN_TRIGGER_CONTROL_IDS)[number][];
  controlCount: 14 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    candidateSourceSignalsRecorded: 1 | 0;
    targetedSourceAcquisitionLanesOpened: 1 | 0;
    sourceBodiesAcquired: 0;
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
    | 'BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_EVIDENCE'
    | 'CAREER_PERSONALIZATION_T8_POST_B52_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE';
}

function contentAddressedB53IdentityValid(b53: CareerPersonalizationT8PostB52GlobalResearchHoldReviewReport): boolean {
  const { reviewId, ...material } = b53;
  return (
    reviewId ===
    `career_personalization_t8_post_b52_global_research_hold_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB53Accepted(b53: CareerPersonalizationT8PostB52GlobalResearchHoldReviewReport): boolean {
  return (
    contentAddressedB53IdentityValid(b53) &&
    b53.reviewVersion === CAREER_PERSONALIZATION_T8_POST_B52_GLOBAL_RESEARCH_HOLD_REVIEW_VERSION &&
    b53.status === 'RESOLVED_CAREER_PERSONALIZATION_T8_POST_B52_GLOBAL_RESEARCH_HOLD_REVIEW' &&
    b53.decision ===
      'POST_REOPEN_GLOBAL_TRIGGER_GATED_RESEARCH_HOLD_BRANCH_CYCLE_EXHAUSTED_ZERO_EXECUTABLE_LANES_RESUME_ONLY_ON_EXPLICIT_FROZEN_SIGNAL_CHANGE' &&
    b53.exactB52BoundaryAccepted &&
    b53.domain === 'career' &&
    b53.temporalScope === 'natal' &&
    b53.statusClass === 'research' &&
    b53.globalResearchHoldActive &&
    b53.branchReopenCycleCompleted &&
    b53.branchMaterialStateChangesAfterB48Reviewed === 4 &&
    b53.branchNegativePublishedCompatibilityPathCount === 3 &&
    b53.branch2015ExactPrintedTargetBodyHoldPreserved &&
    b53.branchSourceSpecificDependencySeparabilityOrCompletePathTriggerSatisfied === false &&
    b53.branchMethodSpecificInputContractAndUpstreamAuthorityTriggerSatisfied === false &&
    b53.branchAuthorityTriggerActivationCount === 0 &&
    b53.branchCurrentMethodCompatibleCompletePathCount === 0 &&
    deterministicContentHash(b53.frontierRecords) === deterministicContentHash(CAREER_T8_B53_GLOBAL_RESEARCH_FRONTIER_RECORDS) &&
    b53.frontierRecordCount === 9 &&
    deterministicContentHash(b53.globalReopenSignalClasses) === deterministicContentHash(CAREER_T8_B53_GLOBAL_REOPEN_SIGNAL_CLASSES) &&
    b53.globalReopenSignalClassCount === 10 &&
    b53.immediatelyExecutableAuthorityResearchLaneCount === 0 &&
    b53.immediatelyExecutableAuthorityAdmissionLaneCount === 0 &&
    b53.immediatelyExecutableSemanticRuleLaneCount === 0 &&
    b53.boundedGovernanceGateExecutableCount === 0 &&
    b53.selectedImmediateNextLane === null &&
    b53.broadBranchSourceSearchRestartAuthorized === false &&
    b53.repeatedClosedBranchSurfaceSearchAuthorized === false &&
    b53.exact2015LineageOnlyResearchRestartAuthorized === false &&
    b53.crossSourceStitchingAuthorized === false &&
    b53.sourceMandatoryDependencyDroppingAuthorized === false &&
    b53.effectClassFlatteningAuthorized === false &&
    b53.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b53.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b53.authorityAdmittedByThisGate === false &&
    b53.authorityGapClosedByThisGate === false &&
    b53.methodologyDefinitionCreatedByThisGate === false &&
    b53.t5RuleAuthoringAuthorized === false &&
    b53.t6RuleAuthoringAuthorized === false &&
    b53.t8RuleAuthoringAuthorized === false &&
    b53.claimTypeCreationAuthorized === false &&
    b53.personalizedT8PackCreationAuthorized === false &&
    b53.consumerNarrativeAuthorized === false &&
    b53.previewDefaultSwitchAuthorized === false &&
    b53.productionPromotionAuthorized === false &&
    b53.productionImpact === 'NONE' &&
    b53.controlCount === 15 &&
    b53.controlsFrozen &&
    deterministicContentHash(b53.controlIds) === deterministicContentHash(CAREER_T8_B53_GLOBAL_RESEARCH_HOLD_CONTROL_IDS) &&
    b53.recommendedNextGate === 'CAREER_PERSONALIZATION_T8_POST_B52_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE'
  );
}

function candidateEvidenceValid(): boolean {
  const e = CAREER_T8_B54_CHEN_ZEZHEN_2023_CANDIDATE_EVIDENCE;
  return (
    e.sourceIdentity.includes('陳澤眞') &&
    e.sourceIdentity.includes('八字命理900問') &&
    e.sourceIdentity.includes('白象文化') &&
    e.sourceIdentity.includes('9786263640641') &&
    e.sourceIdentity.includes('560 pages') &&
    e.directZhengguanSemanticBodyInspected &&
    e.directFormalResponsibilityCorrespondenceObserved &&
    e.directCareerExpressionCorrespondenceObserved &&
    e.sameWorkInteractionChapterObserved &&
    e.targetedQuestionNumbers.length === 8 &&
    e.targetedQuestionNumbers.includes(420) &&
    e.targetedQuestionNumbers.includes(421) &&
    e.targetedQuestionNumbers.includes(422) &&
    e.targetedClashAnswerBodyDirectlyInspected === false &&
    e.targetedClashMethodBodyAcquired === false &&
    e.sameSourceQualitativeModificationModeEstablished === false &&
    e.sameSourceExplicitLimitsAndContextEstablished === false &&
    e.sameSourceCurrentMethodCompatibilityEstablished === false &&
    e.independentCompleteSingleSourcePathEstablished === false &&
    e.normativeProvenanceIndependenceClaimedByThisGate === false &&
    e.signalClass === 'BRANCH_DIFFERENT_QUALIFYING_SOURCE_COMPLETE_PATH_SIGNAL'
  );
}

function signalRecordsValid(): boolean {
  const [edition2015, differentSource, method] = CAREER_T8_B54_REOPEN_SIGNAL_RECORDS;
  return Boolean(
    edition2015?.signalClass === 'BRANCH_2015_EXACT_PRINTED_TARGET_BODY_ACQUIRED' &&
      edition2015.materiallyChangedSinceB53 === false &&
      edition2015.authorityTriggerSatisfied === false &&
      differentSource?.signalClass === 'BRANCH_DIFFERENT_QUALIFYING_SOURCE_COMPLETE_PATH_SIGNAL' &&
      differentSource.materiallyChangedSinceB53 &&
      differentSource.qualifyingCandidateObserved &&
      differentSource.targetedAcquisitionLaneReopened &&
      differentSource.authorityTriggerSatisfied === false &&
      method?.signalClass === 'BRANCH_GOVERNED_METHOD_AUTHORITY_CHANGE' &&
      method.materiallyChangedSinceB53 === false &&
      method.authorityTriggerSatisfied === false,
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidenceReport, 'evidenceId'>,
): CareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidenceReport {
  return {
    evidenceId: `career_personalization_t8_post_b52_research_reopen_trigger_activation_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidence(
  b53: CareerPersonalizationT8PostB52GlobalResearchHoldReviewReport,
): CareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidenceReport {
  const accepted = exactB53Accepted(b53) && candidateEvidenceValid() && signalRecordsValid();

  return finalized({
    evidenceVersion: CAREER_PERSONALIZATION_T8_POST_B52_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_PERSONALIZATION_T8_POST_B52_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE'
      : 'UPSTREAM_B53_BOUNDARY_INVALID',
    decision: accepted
      ? 'ONE_BRANCH_DIFFERENT_SOURCE_REOPEN_SIGNAL_MATERIALLY_CHANGED_TARGETED_2023_CLASH_BODY_ACQUISITION_LANE_OPENED_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS'
      : 'POST_B52_RESEARCH_REOPEN_TRIGGER_ACTIVATION_NOT_ESTABLISHED',
    upstreamB53ReviewId: b53.reviewId,
    exactB53BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    candidateEvidence: accepted ? CAREER_T8_B54_CHEN_ZEZHEN_2023_CANDIDATE_EVIDENCE : null,
    reopenSignalRecords: accepted ? CAREER_T8_B54_REOPEN_SIGNAL_RECORDS : Object.freeze([]),
    reopenSignalRecordCount: accepted ? 3 : 0,
    materiallyChangedReopenSignalCount: accepted ? 1 : 0,
    changedSignalClass: accepted ? 'BRANCH_DIFFERENT_QUALIFYING_SOURCE_COMPLETE_PATH_SIGNAL' : null,
    targetedSourceAcquisitionLaneReopenedCount: accepted ? 1 : 0,
    selectedImmediateNextLane: accepted ? 'BRANCH_CHEN_ZEZHEN_2023_TARGET_CLASH_BODY_ACQUISITION' : null,
    chenZezhen2023CandidateObserved: accepted,
    chenZezhen2023ExactPublicationIdentityBound: accepted,
    chenZezhen2023ZhengguanSemanticBodyDirectlyInspected: accepted,
    chenZezhen2023TargetedClashQuestionSequenceObserved: accepted,
    chenZezhen2023TargetedClashAnswerBodyDirectlyInspected: false,
    independentCompleteSingleSourcePathEstablished: false,
    sourceSpecificDependencySeparabilityEstablished: false,
    currentMethodCompatibilityEstablished: false,
    branchSourceSpecificDependencySeparabilityOrCompletePathAuthorityTriggerSatisfied: false,
    branchMethodSpecificInputContractAndUpstreamAuthorityTriggerSatisfied: false,
    branchAuthorityTriggerActivationCount: 0,
    authorityResearchLaneReopenedCount: 0,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    branch2015ExactPrintedTargetBodySignalChanged: false,
    governedMethodAuthoritySignalChanged: false,
    broadBranchSourceSearchRestartAuthorized: false,
    repeatedClosedBranchSurfaceSearchAuthorized: false,
    tableOfContentsAsNormativeBodyAuthorized: false,
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
    controlIds: accepted ? CAREER_T8_B54_REOPEN_TRIGGER_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 14 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      candidateSourceSignalsRecorded: accepted ? 1 : 0,
      targetedSourceAcquisitionLanesOpened: accepted ? 1 : 0,
      sourceBodiesAcquired: 0,
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
      ? 'BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_EVIDENCE'
      : 'CAREER_PERSONALIZATION_T8_POST_B52_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE',
  });
}
