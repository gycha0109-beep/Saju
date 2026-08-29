import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_POST_B52_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE_VERSION,
  CAREER_T8_B54_CHEN_ZEZHEN_2023_CANDIDATE_EVIDENCE,
  CAREER_T8_B54_REOPEN_SIGNAL_RECORDS,
  CAREER_T8_B54_REOPEN_TRIGGER_CONTROL_IDS,
  type CareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidenceReport,
} from './career-personalization-t8-post-b52-research-reopen-trigger-activation-evidence.js';

export const CAREER_PERSONALIZATION_T8_BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_EVIDENCE_VERSION =
  'myeonghwa-career-personalization-t8-branch-2023-chen-zezhen-target-clash-body-acquisition-evidence-v1' as const;

export const CAREER_T8_B55_CHEN_ZEZHEN_2023_PREVIEW_INSPECTION_EVIDENCE = Object.freeze({
  sourceIdentity:
    '陳澤眞, 八字命理900問, 白象文化事業有限公司, 2023-08-01 first edition, 560 pages, ISBN 9786263640641',
  inspectedSurface:
    'publisher-linked free-reading PDF at pressstore.com.tw/freereading/9786263640641.pdf',
  inspectedSurfaceClass: 'PUBLISHER_LINKED_FREE_READING_PDF' as const,
  inspectedPdfPageCount: 12 as const,
  inspectedPrintedPageRange: Object.freeze({ start: 156 as const, end: 166 as const }),
  inspectedQuestionRange: Object.freeze({ start: 147 as const, end: 168 as const }),
  targetQuestionRange: Object.freeze({ start: 407 as const, end: 422 as const }),
  exactTargetQuestionNumbers: CAREER_T8_B54_CHEN_ZEZHEN_2023_CANDIDATE_EVIDENCE.targetedQuestionNumbers,
  exactTargetQuestionTitles: CAREER_T8_B54_CHEN_ZEZHEN_2023_CANDIDATE_EVIDENCE.targetedQuestionTitles,
  directZhengguanSemanticBodyObserved: true as const,
  normalizedZhengguanSemanticObservations: Object.freeze([
    'Zhengguan is associated with management, law-abiding conduct and constraint.',
    'Zhengguan in the day branch is associated with deep responsibility and leadership/social-position expression.',
  ] as const),
  directTenGodContextDependencyBodyObserved: true as const,
  normalizedContextDependencyObservations: Object.freeze([
    'The preview states that the auspicious or inauspicious quality of a Ten-God configuration is not determined by the Ten-God label alone.',
    'The preview conditions Ten-God outcomes on the wider natal configuration and whether the relevant factor functions as a favorable/useful element.',
    'The preview discusses Guansha excess or deficiency through relations with other chart factors rather than as an isolated unary effect.',
  ] as const),
  targetQ407ToQ422AnswerBodyPresentInInspectedPdf: false as const,
  targetQ407ToQ422AnswerBodyDirectlyInspected: false as const,
  targetClashMethodBodyAcquired: false as const,
  tableOfContentsTargetLocatorPreserved: true as const,
  tableOfContentsTreatedAsNormativeBody: false as const,
  exactTargetBodyAbsenceReason:
    'The directly inspected 12-page publisher-linked preview covers Q147-Q168 / printed pp.156-166 and therefore does not contain the Q407-Q422 branch-clash answer body.' as const,
  acquisitionDisposition:
    'OFFICIAL_PREVIEW_INSPECTED_TARGET_Q407_TO_Q422_ANSWER_BODY_NOT_ACQUIRED' as const,
  evidenceNotes: Object.freeze([
    'The acquisition lane was executed against the strongest publisher-linked freely inspectable body located for the exact ISBN-bound 2023 work.',
    'The inspected preview strengthens the same-work Zhengguan semantic bridge and confirms that this author treats Ten-God interpretation as configuration-sensitive.',
    'Those supporting observations do not substitute for the missing Q407-Q422 answer body and cannot establish the clash modification mode, clash limits, dependency separability or current-method compatibility.',
    'Search-index and catalog discovery surfaces may preserve the Q407-Q422 locator but are not accepted as normative answer-body evidence.',
  ]),
} as const);

export const CAREER_T8_B55_TARGET_ACQUISITION_CONTROL_IDS = Object.freeze([
  'B55_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B54_REOPEN_SIGNAL_ACTIVATION_BOUNDARY',
  'THE_B54_CHEN_ZEZHEN_2023_CANDIDATE_IDENTITY_AND_Q407_TO_Q422_TARGET_LOCATOR_ARE_PRESERVED_UNCHANGED',
  'THE_PUBLISHER_LINKED_FREE_READING_PDF_FOR_ISBN_9786263640641_IS_DIRECTLY_INSPECTED_AS_A_TWELVE_PAGE_BODY_SURFACE',
  'THE_INSPECTED_PREVIEW_IS_BOUND_TO_Q147_TO_Q168_AND_PRINTED_P156_TO_P166_NOT_TO_THE_TARGET_Q407_TO_Q422_BODY',
  'DIRECT_PREVIEW_BODY_CONFIRMS_ZHENGGUAN_MANAGEMENT_LAW_CONSTRAINT_RESPONSIBILITY_AND_LEADERSHIP_SEMANTIC_CORRESPONDENCE',
  'DIRECT_PREVIEW_BODY_CONFIRMS_TEN_GOD_OUTCOMES_ARE_CONFIGURATION_AND_FAVORABLE_USEFUL_ELEMENT_SENSITIVE',
  'SUPPORTING_ZHENGGUAN_OR_CONTEXT_BODY_DOES_NOT_SUBSTITUTE_FOR_THE_MISSING_Q407_TO_Q422_CLASH_ANSWER_BODY',
  'TOC_QUESTION_TITLES_SEARCH_INDEXES_AND_CATALOG_SURFACES_REMAIN_LOCATORS_ONLY_AND_ARE_NOT_NORMATIVE_CLASH_BODY',
  'NO_QUALITATIVE_CLASH_MODIFICATION_MODE_LIMIT_DEPENDENCY_SEPARABILITY_OR_CURRENT_METHOD_COMPATIBILITY_IS_INFERRED',
  'THE_B41_INDEPENDENT_COMPLETE_SINGLE_SOURCE_PATH_TRIGGER_REMAINS_UNSATISFIED_AND_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS_RESULT',
  'THE_B54_TARGETED_ACQUISITION_LANE_IS_COMPLETED_WITH_A_BLOCKED_TARGET_BODY_OUTCOME_AND_DOES_NOT_EXPAND_INTO_BROAD_SOURCE_SEARCH',
  'FUTURE_RECHECK_REQUIRES_A_DIRECTLY_INSPECTABLE_Q407_TO_Q422_BODY_OR_EQUIVALENT_EXACT_SAME_EDITION_TARGET_WITNESS',
  'ALL_SIX_HISTORICAL_CAREER_T8_AUTHORITY_GAPS_REMAIN_FORMALLY_OPEN',
  'NO_CROSS_SOURCE_STITCHING_DEPENDENCY_DROPPING_EFFECT_FLATTENING_T5_T6_T8_AUTHORING_PREVIEW_OR_PRODUCTION_PROMOTION_IS_AUTHORIZED',
] as const);

export interface CareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof CAREER_PERSONALIZATION_T8_BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_EVIDENCE'
    | 'UPSTREAM_B54_BOUNDARY_INVALID';
  decision:
    | 'OFFICIAL_2023_PREVIEW_DIRECTLY_INSPECTED_TARGET_Q407_TO_Q422_ANSWER_BODY_NOT_ACQUIRED_INDEPENDENT_COMPLETE_PATH_NOT_ESTABLISHED_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS'
    | 'BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_NOT_ESTABLISHED';
  upstreamB54EvidenceId: string;
  exactB54BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  candidateEvidencePreserved: boolean;
  previewInspectionEvidence: typeof CAREER_T8_B55_CHEN_ZEZHEN_2023_PREVIEW_INSPECTION_EVIDENCE | null;
  targetedAcquisitionPerformed: boolean;
  targetedAcquisitionLaneCompleted: boolean;
  targetedAcquisitionOutcome:
    | 'BLOCKED_TARGET_BODY_NOT_PRESENT_ON_INSPECTED_PUBLISHER_LINKED_PREVIEW'
    | 'NOT_EXECUTED';
  exact2023PublicationIdentityPreserved: boolean;
  publisherLinkedPreviewDirectlyInspected: boolean;
  inspectedPreviewPageCount: 12 | 0;
  inspectedQuestionRangeBound: boolean;
  inspectedPrintedPageRangeBound: boolean;
  directZhengguanSemanticBodyPreserved: boolean;
  directTenGodContextDependencyBodyObserved: boolean;
  targetQ407ToQ422LocatorPreserved: boolean;
  targetQ407ToQ422AnswerBodyPresentInInspectedPreview: false;
  targetQ407ToQ422AnswerBodyDirectlyInspected: false;
  targetClashMethodBodyAcquired: false;
  sameSourceQualitativeModificationModeEstablished: false;
  sameSourceExplicitLimitsAndContextEstablished: false;
  independentCompleteSingleSourcePathEstablished: false;
  sourceSpecificDependencySeparabilityEstablished: false;
  currentMethodCompatibilityEstablished: false;
  branchSourceSpecificDependencySeparabilityOrCompletePathAuthorityTriggerSatisfied: false;
  branchMethodSpecificInputContractAndUpstreamAuthorityTriggerSatisfied: false;
  branchAuthorityTriggerActivationCount: 0;
  authorityResearchLaneReopenedCount: 0;
  immediatelyExecutableAuthorityAdmissionLaneCount: 0;
  immediatelyExecutableSemanticRuleLaneCount: 0;
  selectedImmediateNextLane: null;
  futureExactSameEditionTargetBodyAcquisitionRemainsEligible: boolean;
  broadBranchSourceSearchRestartAuthorized: false;
  repeatSupportingPreviewSearchAuthorized: false;
  tableOfContentsAsNormativeBodyAuthorized: false;
  searchIndexAsNormativeBodyAuthorized: false;
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
  controlIds: readonly (typeof CAREER_T8_B55_TARGET_ACQUISITION_CONTROL_IDS)[number][];
  controlCount: 14 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    targetedAcquisitionAttemptsCompleted: 1 | 0;
    supportingPreviewBodiesInspected: 1 | 0;
    targetClashBodiesAcquired: 0;
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
    | 'BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_HOLD_REVIEW'
    | 'BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_EVIDENCE';
}

function contentAddressedB54IdentityValid(
  b54: CareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidenceReport,
): boolean {
  const { evidenceId, ...material } = b54;
  return (
    evidenceId ===
    `career_personalization_t8_post_b52_research_reopen_trigger_activation_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB54Accepted(
  b54: CareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidenceReport,
): boolean {
  return (
    contentAddressedB54IdentityValid(b54) &&
    b54.evidenceVersion === CAREER_PERSONALIZATION_T8_POST_B52_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE_VERSION &&
    b54.status === 'RESOLVED_CAREER_PERSONALIZATION_T8_POST_B52_RESEARCH_REOPEN_TRIGGER_ACTIVATION_EVIDENCE' &&
    b54.decision ===
      'ONE_BRANCH_DIFFERENT_SOURCE_REOPEN_SIGNAL_MATERIALLY_CHANGED_TARGETED_2023_CLASH_BODY_ACQUISITION_LANE_OPENED_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS' &&
    b54.exactB53BoundaryAccepted &&
    b54.domain === 'career' &&
    b54.temporalScope === 'natal' &&
    b54.statusClass === 'research' &&
    deterministicContentHash(b54.candidateEvidence) ===
      deterministicContentHash(CAREER_T8_B54_CHEN_ZEZHEN_2023_CANDIDATE_EVIDENCE) &&
    deterministicContentHash(b54.reopenSignalRecords) === deterministicContentHash(CAREER_T8_B54_REOPEN_SIGNAL_RECORDS) &&
    b54.reopenSignalRecordCount === 3 &&
    b54.materiallyChangedReopenSignalCount === 1 &&
    b54.changedSignalClass === 'BRANCH_DIFFERENT_QUALIFYING_SOURCE_COMPLETE_PATH_SIGNAL' &&
    b54.targetedSourceAcquisitionLaneReopenedCount === 1 &&
    b54.selectedImmediateNextLane === 'BRANCH_CHEN_ZEZHEN_2023_TARGET_CLASH_BODY_ACQUISITION' &&
    b54.chenZezhen2023CandidateObserved &&
    b54.chenZezhen2023ExactPublicationIdentityBound &&
    b54.chenZezhen2023ZhengguanSemanticBodyDirectlyInspected &&
    b54.chenZezhen2023TargetedClashQuestionSequenceObserved &&
    b54.chenZezhen2023TargetedClashAnswerBodyDirectlyInspected === false &&
    b54.independentCompleteSingleSourcePathEstablished === false &&
    b54.sourceSpecificDependencySeparabilityEstablished === false &&
    b54.currentMethodCompatibilityEstablished === false &&
    b54.branchSourceSpecificDependencySeparabilityOrCompletePathAuthorityTriggerSatisfied === false &&
    b54.branchMethodSpecificInputContractAndUpstreamAuthorityTriggerSatisfied === false &&
    b54.branchAuthorityTriggerActivationCount === 0 &&
    b54.authorityResearchLaneReopenedCount === 0 &&
    b54.immediatelyExecutableAuthorityAdmissionLaneCount === 0 &&
    b54.immediatelyExecutableSemanticRuleLaneCount === 0 &&
    b54.broadBranchSourceSearchRestartAuthorized === false &&
    b54.repeatedClosedBranchSurfaceSearchAuthorized === false &&
    b54.tableOfContentsAsNormativeBodyAuthorized === false &&
    b54.crossSourceStitchingAuthorized === false &&
    b54.sourceMandatoryDependencyDroppingAuthorized === false &&
    b54.effectClassFlatteningAuthorized === false &&
    b54.allSixHistoricalGapsRemainOpen &&
    deterministicContentHash(b54.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b54.authorityAdmittedByThisGate === false &&
    b54.authorityGapClosedByThisGate === false &&
    b54.methodologyDefinitionCreatedByThisGate === false &&
    b54.t5RuleAuthoringAuthorized === false &&
    b54.t6RuleAuthoringAuthorized === false &&
    b54.t8RuleAuthoringAuthorized === false &&
    b54.claimTypeCreationAuthorized === false &&
    b54.personalizedT8PackCreationAuthorized === false &&
    b54.consumerNarrativeAuthorized === false &&
    b54.previewDefaultSwitchAuthorized === false &&
    b54.productionPromotionAuthorized === false &&
    b54.productionImpact === 'NONE' &&
    b54.controlCount === 14 &&
    b54.controlsFrozen &&
    deterministicContentHash(b54.controlIds) === deterministicContentHash(CAREER_T8_B54_REOPEN_TRIGGER_CONTROL_IDS) &&
    b54.implementationEffects.candidateSourceSignalsRecorded === 1 &&
    b54.implementationEffects.targetedSourceAcquisitionLanesOpened === 1 &&
    b54.implementationEffects.authorityTriggersActivated === 0 &&
    b54.recommendedNextGate === 'BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_EVIDENCE'
  );
}

function previewInspectionEvidenceValid(): boolean {
  const e = CAREER_T8_B55_CHEN_ZEZHEN_2023_PREVIEW_INSPECTION_EVIDENCE;
  return (
    e.sourceIdentity === CAREER_T8_B54_CHEN_ZEZHEN_2023_CANDIDATE_EVIDENCE.sourceIdentity &&
    e.inspectedSurface.includes('9786263640641.pdf') &&
    e.inspectedSurfaceClass === 'PUBLISHER_LINKED_FREE_READING_PDF' &&
    e.inspectedPdfPageCount === 12 &&
    e.inspectedPrintedPageRange.start === 156 &&
    e.inspectedPrintedPageRange.end === 166 &&
    e.inspectedQuestionRange.start === 147 &&
    e.inspectedQuestionRange.end === 168 &&
    e.targetQuestionRange.start === 407 &&
    e.targetQuestionRange.end === 422 &&
    deterministicContentHash(e.exactTargetQuestionNumbers) ===
      deterministicContentHash(CAREER_T8_B54_CHEN_ZEZHEN_2023_CANDIDATE_EVIDENCE.targetedQuestionNumbers) &&
    e.directZhengguanSemanticBodyObserved &&
    e.directTenGodContextDependencyBodyObserved &&
    e.targetQ407ToQ422AnswerBodyPresentInInspectedPdf === false &&
    e.targetQ407ToQ422AnswerBodyDirectlyInspected === false &&
    e.targetClashMethodBodyAcquired === false &&
    e.tableOfContentsTargetLocatorPreserved &&
    e.tableOfContentsTreatedAsNormativeBody === false
  );
}

function finalized(
  material: Omit<CareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidenceReport, 'evidenceId'>,
): CareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidenceReport {
  return {
    evidenceId: `career_personalization_t8_branch_2023_chen_zezhen_target_clash_body_acquisition_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidence(
  b54: CareerPersonalizationT8PostB52ResearchReopenTriggerActivationEvidenceReport,
): CareerPersonalizationT8Branch2023ChenZezhenTargetClashBodyAcquisitionEvidenceReport {
  const accepted = exactB54Accepted(b54) && previewInspectionEvidenceValid();

  return finalized({
    evidenceVersion: CAREER_PERSONALIZATION_T8_BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_EVIDENCE'
      : 'UPSTREAM_B54_BOUNDARY_INVALID',
    decision: accepted
      ? 'OFFICIAL_2023_PREVIEW_DIRECTLY_INSPECTED_TARGET_Q407_TO_Q422_ANSWER_BODY_NOT_ACQUIRED_INDEPENDENT_COMPLETE_PATH_NOT_ESTABLISHED_ZERO_AUTHORITY_TRIGGER_ACTIVATIONS'
      : 'BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_NOT_ESTABLISHED',
    upstreamB54EvidenceId: b54.evidenceId,
    exactB54BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    candidateEvidencePreserved: accepted,
    previewInspectionEvidence: accepted ? CAREER_T8_B55_CHEN_ZEZHEN_2023_PREVIEW_INSPECTION_EVIDENCE : null,
    targetedAcquisitionPerformed: accepted,
    targetedAcquisitionLaneCompleted: accepted,
    targetedAcquisitionOutcome: accepted
      ? 'BLOCKED_TARGET_BODY_NOT_PRESENT_ON_INSPECTED_PUBLISHER_LINKED_PREVIEW'
      : 'NOT_EXECUTED',
    exact2023PublicationIdentityPreserved: accepted,
    publisherLinkedPreviewDirectlyInspected: accepted,
    inspectedPreviewPageCount: accepted ? 12 : 0,
    inspectedQuestionRangeBound: accepted,
    inspectedPrintedPageRangeBound: accepted,
    directZhengguanSemanticBodyPreserved: accepted,
    directTenGodContextDependencyBodyObserved: accepted,
    targetQ407ToQ422LocatorPreserved: accepted,
    targetQ407ToQ422AnswerBodyPresentInInspectedPreview: false,
    targetQ407ToQ422AnswerBodyDirectlyInspected: false,
    targetClashMethodBodyAcquired: false,
    sameSourceQualitativeModificationModeEstablished: false,
    sameSourceExplicitLimitsAndContextEstablished: false,
    independentCompleteSingleSourcePathEstablished: false,
    sourceSpecificDependencySeparabilityEstablished: false,
    currentMethodCompatibilityEstablished: false,
    branchSourceSpecificDependencySeparabilityOrCompletePathAuthorityTriggerSatisfied: false,
    branchMethodSpecificInputContractAndUpstreamAuthorityTriggerSatisfied: false,
    branchAuthorityTriggerActivationCount: 0,
    authorityResearchLaneReopenedCount: 0,
    immediatelyExecutableAuthorityAdmissionLaneCount: 0,
    immediatelyExecutableSemanticRuleLaneCount: 0,
    selectedImmediateNextLane: null,
    futureExactSameEditionTargetBodyAcquisitionRemainsEligible: accepted,
    broadBranchSourceSearchRestartAuthorized: false,
    repeatSupportingPreviewSearchAuthorized: false,
    tableOfContentsAsNormativeBodyAuthorized: false,
    searchIndexAsNormativeBodyAuthorized: false,
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
    controlIds: accepted ? CAREER_T8_B55_TARGET_ACQUISITION_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 14 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      targetedAcquisitionAttemptsCompleted: accepted ? 1 : 0,
      supportingPreviewBodiesInspected: accepted ? 1 : 0,
      targetClashBodiesAcquired: 0,
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
      ? 'BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_HOLD_REVIEW'
      : 'BRANCH_2023_CHEN_ZEZHEN_TARGET_CLASH_BODY_ACQUISITION_EVIDENCE',
  });
}
