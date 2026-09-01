import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_CANDIDATES,
} from './career-personalization-t8-current-t5-t6-semantic-bridge-residual-authority-path-discovery-evidence.js';
import {
  CAREER_T8_CURRENT_METHOD_ACQUISITION_CANDIDATES,
} from './career-personalization-t8-current-method-residual-authority-acquisition-evidence.js';
import {
  CAREER_T8_B28_NEW_SURFACE_ACQUISITION_RECORDS,
} from './career-personalization-t8-current-method-residual-authority-new-evidence-surface-acquisition-evidence.js';
import {
  CAREER_T8_B31_EVIDENCE_TRIGGER_CONTRACTS,
} from './career-personalization-t8-post-i257-new-evidence-trigger-readiness-review.js';
import {
  CAREER_PERSONALIZATION_T8_PRODUCT_CRITICAL_AUTHORITY_GAP_PRIORITIZATION_VERSION,
  CAREER_T8_B80_PRIORITY_CONTROL_IDS,
  CAREER_T8_B80_PRIORITY_ORDER,
  CAREER_T8_B80_REVIEWED_REPOSITORY_COMMIT_SHA,
  type CareerPersonalizationT8ProductCriticalAuthorityGapPrioritizationReport,
} from './career-personalization-t8-product-critical-authority-gap-prioritization.js';

export const CAREER_PERSONALIZATION_T8_EXACT_SUBTYPE_MULTI_CLAIM_CAREER_PATTERN_SOURCE_CANDIDATE_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-exact-subtype-multi-claim-career-pattern-source-candidate-review-v1' as const;

export const CAREER_T8_B81_REVIEWED_REPOSITORY_COMMIT_SHA =
  '6483b0bb8821e8ed2a67b699d51ce9e1aa2b07d3' as const;

export const CAREER_T8_B81_SELECTED_GAP_ID =
  'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING' as const;

export type CareerT8B81CandidateId =
  | 'YANG_YIYUN_COMBINATION_AND_CAREER_SEPARATE'
  | 'QIN_LUNSHI_P464_FORMAL_PUBLICATION_BODY_BLOCKED'
  | 'WANG_QING_DIRECT_COMPOSITION_COMPETING_METHOD_HOLD'
  | 'WANG_YUANTANG_DIRECT_WEB_SEMANTICS_INADEQUATE';

export type CareerT8B81CandidateClassification =
  | 'CURRENT_METHOD_PARTIAL_NO_DIRECT_BRIDGE'
  | 'FORMAL_PUBLICATION_TARGET_BODY_ACCESS_BLOCKED'
  | 'DIRECT_SEMANTICS_COMPETING_FOUNDATIONAL_METHOD_HOLD'
  | 'DIRECT_SEMANTICS_PROVENANCE_AND_METHOD_INADEQUATE';

export interface CareerT8B81CandidateReviewRecord {
  candidateId: CareerT8B81CandidateId;
  sourceIdentity: string;
  classification: CareerT8B81CandidateClassification;
  explicitCareerWorkSemanticsObserved: boolean;
  tenGodCombinationSemanticsObserved: boolean;
  directMultiClaimCareerCompositionObserved: boolean;
  independentNormativeProvenanceAdequate: boolean;
  targetBodyAndLocalContextAcquired: boolean;
  currentGovernedMethodCompatibilityEstablished: boolean;
  competingFoundationalMethodDependencyDetected: boolean;
  qualifyingAuthorityCandidate: false;
  semanticUseAuthorized: false;
  rationale: string;
}

export const CAREER_T8_B81_CANDIDATE_REVIEW_RECORDS = Object.freeze([
  Object.freeze({
    candidateId: 'YANG_YIYUN_COMBINATION_AND_CAREER_SEPARATE' as const,
    sourceIdentity: '楊逸雲, 十神含義闡微 / 十神闡微',
    classification: 'CURRENT_METHOD_PARTIAL_NO_DIRECT_BRIDGE' as const,
    explicitCareerWorkSemanticsObserved: true,
    tenGodCombinationSemanticsObserved: true,
    directMultiClaimCareerCompositionObserved: false,
    independentNormativeProvenanceAdequate: false,
    targetBodyAndLocalContextAcquired: true,
    currentGovernedMethodCompatibilityEstablished: false,
    competingFoundationalMethodDependencyDetected: true,
    qualifyingAuthorityCandidate: false as const,
    semanticUseAuthorized: false as const,
    rationale:
      'The same work contains an explicit Ten-God combination chapter and a separate Career chapter, but no inspected passage directly binds a specific multi-Ten-God composition to a bounded Career semantic pattern. Cross-section stitching remains forbidden and formal publication provenance/method compatibility remain unresolved.',
  }),
  Object.freeze({
    candidateId: 'QIN_LUNSHI_P464_FORMAL_PUBLICATION_BODY_BLOCKED' as const,
    sourceIdentity:
      '秦倫詩, 中國易學博覽·八字應用經驗學, 內蒙古人民出版社, 2010, ISBN 9787204098774, printed p.464 按十神組合選職業',
    classification: 'FORMAL_PUBLICATION_TARGET_BODY_ACCESS_BLOCKED' as const,
    explicitCareerWorkSemanticsObserved: true,
    tenGodCombinationSemanticsObserved: true,
    directMultiClaimCareerCompositionObserved: false,
    independentNormativeProvenanceAdequate: true,
    targetBodyAndLocalContextAcquired: false,
    currentGovernedMethodCompatibilityEstablished: false,
    competingFoundationalMethodDependencyDetected: true,
    qualifyingAuthorityCandidate: false as const,
    semanticUseAuthorized: false as const,
    rationale:
      'The formal edition and p.464 section locator are strong leads, but neither the historical targeted attempts nor the later full-document surface acquired the p.464 body and local context. The book visibly uses 旺衰/格局/用神/喜忌, so body acquisition alone would still require a compatibility review.',
  }),
  Object.freeze({
    candidateId: 'WANG_QING_DIRECT_COMPOSITION_COMPETING_METHOD_HOLD' as const,
    sourceIdentity: '王慶, 學格局的第二本書',
    classification: 'DIRECT_SEMANTICS_COMPETING_FOUNDATIONAL_METHOD_HOLD' as const,
    explicitCareerWorkSemanticsObserved: true,
    tenGodCombinationSemanticsObserved: true,
    directMultiClaimCareerCompositionObserved: true,
    independentNormativeProvenanceAdequate: false,
    targetBodyAndLocalContextAcquired: true,
    currentGovernedMethodCompatibilityEstablished: false,
    competingFoundationalMethodDependencyDetected: true,
    qualifyingAuthorityCandidate: false as const,
    semanticUseAuthorized: false as const,
    rationale:
      'This is the strongest explicit multi-claim Career-composition semantic lead in the retained evidence, but its semantics are embedded in a competing 格局/太極點/得用十神/用神 framework and its provenance chain is inadequate for silent admission. Human methodology adjudication is required before any semantic use.',
  }),
  Object.freeze({
    candidateId: 'WANG_YUANTANG_DIRECT_WEB_SEMANTICS_INADEQUATE' as const,
    sourceIdentity: '汪緣堂, 十神組合與職業選擇（上）, 2022-05-04',
    classification: 'DIRECT_SEMANTICS_PROVENANCE_AND_METHOD_INADEQUATE' as const,
    explicitCareerWorkSemanticsObserved: true,
    tenGodCombinationSemanticsObserved: true,
    directMultiClaimCareerCompositionObserved: true,
    independentNormativeProvenanceAdequate: false,
    targetBodyAndLocalContextAcquired: true,
    currentGovernedMethodCompatibilityEstablished: false,
    competingFoundationalMethodDependencyDetected: true,
    qualifyingAuthorityCandidate: false as const,
    semanticUseAuthorized: false as const,
    rationale:
      'The modern article demonstrates the desired semantic shape, but it is not independently adequate normative provenance and its mappings depend on relative-strength comparisons. It remains a discovery lead, not authority for the governed non-numeric current method.',
  }),
] as const satisfies readonly CareerT8B81CandidateReviewRecord[]);

export const CAREER_T8_B81_CONTROL_IDS = Object.freeze([
  'B81_CONSUMES_ONLY_THE_EXACT_CONTENT_ADDRESSED_B80_PRODUCT_CRITICALITY_BOUNDARY',
  'B81_REVIEWS_THE_EXISTING_B17_B20_B28_B31_EVIDENCE_STATE_WITHOUT_RECOUNTING_OLD_DISCOVERY_AS_NEW_PROGRESS',
  'GAP1_REMAINS_PRODUCT_CRITICAL_BECAUSE_A_VALID_DIRECT_BRIDGE_CAN_CHANGE_AUTHORIZED_USER_FACING_CAREER_SEMANTICS',
  'PRODUCT_CRITICAL_DOES_NOT_MEAN_IMMEDIATELY_EXECUTABLE_WHEN_THE_REQUIRED_EVIDENCE_TRIGGER_IS_UNSATISFIED',
  'YANG_COMBINATION_AND_CAREER_SECTIONS_MAY_NOT_BE_STITCHED_INTO_AN_UNSTATED_DIRECT_BRIDGE',
  'QIN_P464_REMAINS_THE_STRONGEST_FORMAL_PUBLICATION_LEAD_BUT_TARGET_BODY_AND_LOCAL_CONTEXT_ARE_NOT_ACQUIRED',
  'THE_EXISTING_PDFCOFFEE_FULL_DOCUMENT_TOC_OR_INACCESSIBLE_DOWNLOAD_SURFACE_DOES_NOT_SATISFY_THE_QIN_TRIGGER',
  'WANG_QING_DIRECT_COMPOSITION_SEMANTICS_REMAIN_ISOLATED_BEHIND_A_COMPETING_FOUNDATIONAL_METHOD_HOLD',
  'MODERN_WEB_DIRECT_COMPOSITION_SEMANTICS_DO_NOT_SUPPLY_NORMATIVE_CURRENT_METHOD_AUTHORITY',
  'ZERO_CURRENT_CANDIDATES_ARE_ADMISSION_READY_OR_METHOD_COMPATIBLE_FOR_THE_GOVERNED_GAP1_BRIDGE',
  'B31_QIN_DIRECT_BODY_TRIGGER_REMAINS_UNSATISFIED_AND_REPEATED_EXHAUSTED_SURFACE_SEARCH_IS_NOT_PROGRESS',
  'GAP1_REMAINS_OPEN_AND_REACTIVATES_ON_A_REAL_QIN_BODY_TRIGGER_OR_OTHER_GENUINELY_NEW_QUALIFYING_SOURCE',
  'NO_CROSS_SOURCE_OR_CROSS_SECTION_STITCHING_RELATIVE_STRENGTH_IMPORT_OR_COMPETING_METHOD_SILENT_ADOPTION',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_CALCULATION_INTERPRETATION_OR_PRODUCTION_CHANGE_IS_AUTHORIZED',
  'WHEN_GAP1_HAS_ZERO_EXECUTABLE_EVIDENCE_SURFACES_PRODUCT_WORK_MUST_MOVE_TO_OTHER_GENUINELY_EXECUTABLE_PRODUCT_CRITICAL_ENGINE_WORK_INSTEAD_OF_BUSY_LOOP_RESEARCH',
] as const);

export interface CareerPersonalizationT8ExactSubtypeMultiClaimCareerPatternSourceCandidateReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_EXACT_SUBTYPE_MULTI_CLAIM_CAREER_PATTERN_SOURCE_CANDIDATE_REVIEW_VERSION;
  status:
    | 'RESOLVED_EXACT_SUBTYPE_MULTI_CLAIM_CAREER_PATTERN_SOURCE_CANDIDATE_REVIEW'
    | 'UPSTREAM_B80_BOUNDARY_INVALID';
  decision:
    | 'GAP1_PRODUCT_CRITICAL_ZERO_ADMISSION_READY_CANDIDATES_QIN_BODY_TRIGGER_UNSATISFIED_NO_REPEAT_SEARCH_NO_T8_AUTHORING'
    | 'EXACT_SUBTYPE_MULTI_CLAIM_CAREER_PATTERN_SOURCE_CANDIDATE_REVIEW_NOT_ESTABLISHED';
  upstreamB80PrioritizationId: string;
  exactB80BoundaryAccepted: boolean;
  reviewedRepository: 'gycha0109-beep/Saju';
  reviewedRepositoryCommitSha: typeof CAREER_T8_B81_REVIEWED_REPOSITORY_COMMIT_SHA;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research_governance';
  selectedGapId: typeof CAREER_T8_B81_SELECTED_GAP_ID | null;
  gapProductCritical: boolean;
  gapDemotedToResearchOptional: false;
  candidateRecords: readonly CareerT8B81CandidateReviewRecord[];
  candidateRecordCount: 4 | 0;
  directMultiClaimCareerSemanticLeadCount: 2 | 0;
  formalPublicationBodyBlockedCandidateCount: 1 | 0;
  competingMethodHeldCandidateCount: 1 | 0;
  currentMethodDirectBridgeCandidateCount: 0;
  admissionReadyCandidateCount: 0;
  methodCompatibleCandidateCount: 0;
  qinP464BodyAcquired: false;
  qinDirectBodyTriggerSatisfied: false;
  gapImmediatelyExecutableOnKnownEvidenceSurface: false;
  repeatedKnownSurfaceSearchAuthorized: false;
  broadSearchRestartAuthorized: false;
  crossSourceOrCrossSectionStitchingAuthorized: false;
  competingMethodSilentAdoptionAuthorized: false;
  relativeStrengthImportAuthorized: false;
  gapClosed: false;
  gapReactivationRequiredOnQualifyingEvidenceTrigger: boolean;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  calculationLogicChangeAuthorized: false;
  interpretationLogicChangeAuthorized: false;
  productionPromotionAuthorized: false;
  productionImpact: 'NONE';
  controlIds: readonly (typeof CAREER_T8_B81_CONTROL_IDS)[number][];
  controlCount: 15 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    candidateReviewsCreated: 4 | 0;
    newSourceAcquisitionsCounted: 0;
    authorityCandidatesAccepted: 0;
    authorityGapsClosed: 0;
    methodologyChoicesMade: 0;
    semanticRuleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    calculationBehaviorsChanged: 0;
    interpretationBehaviorsChanged: 0;
    narrativeBehaviorsChanged: 0;
    previewRoutesChanged: 0;
    productionBehaviorsChanged: 0;
  };
  recommendedNextAction:
    | 'MOVE_TO_OTHER_GENUINELY_EXECUTABLE_PRODUCT_CRITICAL_ENGINE_WORK_KEEP_GAP1_TRIGGER_REACTIVE'
    | 'CAREER_PERSONALIZATION_T8_PRODUCT_CRITICAL_AUTHORITY_GAP_PRIORITIZATION';
}

function contentAddressedB80IdentityValid(
  b80: CareerPersonalizationT8ProductCriticalAuthorityGapPrioritizationReport,
): boolean {
  const { prioritizationId, ...material } = b80;
  return (
    prioritizationId ===
    `career_personalization_t8_product_critical_authority_gap_prioritization_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB80Accepted(
  b80: CareerPersonalizationT8ProductCriticalAuthorityGapPrioritizationReport,
): boolean {
  const audit = b80.exactSubtypeCandidateAudit;
  return (
    contentAddressedB80IdentityValid(b80) &&
    b80.prioritizationVersion ===
      CAREER_PERSONALIZATION_T8_PRODUCT_CRITICAL_AUTHORITY_GAP_PRIORITIZATION_VERSION &&
    b80.status === 'RESOLVED_CAREER_T8_PRODUCT_CRITICAL_AUTHORITY_GAP_PRIORITIZATION' &&
    b80.decision ===
      'SIX_GAPS_PRIORITIZED_EXACT_SUBTYPE_MULTI_CLAIM_BRIDGE_SELECTED_FOR_SOURCE_CANDIDATE_REVIEW_NO_T8_AUTHORING' &&
    b80.exactB79BoundaryAccepted &&
    b80.reviewedRepository === 'gycha0109-beep/Saju' &&
    b80.reviewedRepositoryCommitSha === CAREER_T8_B80_REVIEWED_REPOSITORY_COMMIT_SHA &&
    b80.domain === 'career' &&
    b80.temporalScope === 'natal' &&
    b80.statusClass === 'research_governance' &&
    b80.exactGapInventoryAccepted &&
    b80.priorityRecordCount === 6 &&
    deterministicContentHash(b80.priorityRecords.map((record) => record.gapId)) ===
      deterministicContentHash(CAREER_T8_B80_PRIORITY_ORDER) &&
    b80.selectedImmediateGapId === CAREER_T8_B81_SELECTED_GAP_ID &&
    audit !== null &&
    audit.selectedGapId === CAREER_T8_B81_SELECTED_GAP_ID &&
    audit.exactSubtypeT5SourceAuthorityPresent &&
    audit.exactSubtypeCrossTierCareerBindingAuthorityPresent === false &&
    audit.reviewedPersonalizedMultiClaimCareerBindingCandidateCount === 0 &&
    audit.legacyCandidateUsableAsPersonalizedBridge === false &&
    b80.productPriorityIsInterpretiveWeight === false &&
    b80.t8RuleAuthoringAuthorized === false &&
    b80.personalizedT8PackCreationAuthorized === false &&
    b80.productionPromotionAuthorized === false &&
    b80.productionImpact === 'NONE' &&
    b80.controlCount === 15 &&
    b80.controlsFrozen &&
    deterministicContentHash(b80.controlIds) === deterministicContentHash(CAREER_T8_B80_PRIORITY_CONTROL_IDS) &&
    b80.recommendedNextGate === 'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_SOURCE_CANDIDATE_REVIEW'
  );
}

function historicalGapOneEvidenceStateValid(): boolean {
  const yang = CAREER_T8_CURRENT_METHOD_ACQUISITION_CANDIDATES.find(
    (candidate) => candidate.candidateId === 'YANG_YIYUN_FULL_TEXT_REINSPECTION',
  );
  const qin = CAREER_T8_CURRENT_METHOD_ACQUISITION_CANDIDATES.find(
    (candidate) => candidate.candidateId === 'QIN_LUNSHI_2010_PUBLISHED_TENGOD_CAREER_CHAPTER_LEAD',
  );
  const web = CAREER_T8_CURRENT_METHOD_ACQUISITION_CANDIDATES.find(
    (candidate) => candidate.candidateId === 'WANG_YUANTANG_2022_DIRECT_TENGOD_CAREER_WEB_LEAD',
  );
  const wang = CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_CANDIDATES.find(
    (candidate) => candidate.candidateId === 'WANG_QING_XUE_GEJU_SECOND_BOOK_CAREER_COMPOSITION',
  );
  const qinB28 = CAREER_T8_B28_NEW_SURFACE_ACQUISITION_RECORDS.find(
    (record) => record.recordId === 'QIN_P464_FULL_DOCUMENT_SURFACE_BODY_PENDING',
  );
  const qinTrigger = CAREER_T8_B31_EVIDENCE_TRIGGER_CONTRACTS.find(
    (contract) => contract.triggerId === 'QIN_P464_DIRECT_BODY_TRIGGER',
  );

  return (
    yang !== undefined &&
    yang.explicitCareerWorkSemantics &&
    yang.tenGodCombinationSemanticsExplicit &&
    yang.directMultiClaimCareerCompositionExplicit === false &&
    yang.independentNormativeProvenanceAdequate === false &&
    yang.currentGovernedMethodCompatibilityEstablished === false &&
    yang.qualifyingCurrentMethodAuthorityCandidate === false &&
    qin !== undefined &&
    qin.formalPublicationProvenanceConfirmed &&
    qin.explicitCareerWorkSemantics &&
    qin.tenGodCombinationSemanticsExplicit &&
    qin.directMultiClaimCareerCompositionExplicit === false &&
    qin.originalOrVerifiedLocalContextInspected === false &&
    qin.independentNormativeProvenanceAdequate &&
    qin.currentGovernedMethodCompatibilityEstablished === false &&
    qin.qualifyingCurrentMethodAuthorityCandidate === false &&
    web !== undefined &&
    web.directMultiClaimCareerCompositionExplicit &&
    web.independentNormativeProvenanceAdequate === false &&
    web.currentGovernedMethodCompatibilityEstablished === false &&
    web.qualifyingCurrentMethodAuthorityCandidate === false &&
    wang !== undefined &&
    wang.careerWorkSemanticsExplicit &&
    wang.tenGodCombinationSemanticsExplicit &&
    wang.directMultiClaimCareerCompositionExplicit &&
    wang.competingFoundationalMethodDependencyDetected &&
    wang.independentNormativeProvenanceAdequate === false &&
    wang.currentGovernedMethodSemanticCorrespondenceEstablished === false &&
    wang.qualifyingCandidate === false &&
    qinB28 !== undefined &&
    qinB28.genuinelyNewSurfaceDiscovered &&
    qinB28.targetBodyOrPassageDirectlyAcquired === false &&
    qinB28.coverageDelta === 'NONE' &&
    qinB28.currentMethodCompatibilityEstablished === false &&
    qinB28.qualifyingAuthorityCandidate === false &&
    qinTrigger !== undefined &&
    qinTrigger.targetGapId === CAREER_T8_B81_SELECTED_GAP_ID &&
    qinTrigger.currentlySatisfied === false &&
    qinTrigger.requiredConditions.length === 3 &&
    qinTrigger.prohibitedSubstitutes.some((value) => value.includes('PDFCoffee')) &&
    qinTrigger.activationAutomaticallyAdmitsAuthority === false &&
    qinTrigger.activationAutomaticallyClosesGap === false &&
    qinTrigger.activationRequiresFollowupAdequacyReview
  );
}

function candidateReviewRecordsValid(): boolean {
  return (
    CAREER_T8_B81_CANDIDATE_REVIEW_RECORDS.length === 4 &&
    new Set(CAREER_T8_B81_CANDIDATE_REVIEW_RECORDS.map((record) => record.candidateId)).size === 4 &&
    CAREER_T8_B81_CANDIDATE_REVIEW_RECORDS.every(
      (record) =>
        record.qualifyingAuthorityCandidate === false &&
        record.semanticUseAuthorized === false &&
        record.currentGovernedMethodCompatibilityEstablished === false,
    ) &&
    CAREER_T8_B81_CANDIDATE_REVIEW_RECORDS.filter(
      (record) => record.directMultiClaimCareerCompositionObserved,
    ).length === 2
  );
}

function finalized(
  material: Omit<
    CareerPersonalizationT8ExactSubtypeMultiClaimCareerPatternSourceCandidateReviewReport,
    'reviewId'
  >,
): CareerPersonalizationT8ExactSubtypeMultiClaimCareerPatternSourceCandidateReviewReport {
  return {
    reviewId: `career_personalization_t8_exact_subtype_multi_claim_career_pattern_source_candidate_review_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8ExactSubtypeMultiClaimCareerPatternSourceCandidateReview(
  b80: CareerPersonalizationT8ProductCriticalAuthorityGapPrioritizationReport,
): CareerPersonalizationT8ExactSubtypeMultiClaimCareerPatternSourceCandidateReviewReport {
  const upstreamAccepted = exactB80Accepted(b80);
  const evidenceAccepted = historicalGapOneEvidenceStateValid();
  const candidateRecordsAccepted = candidateReviewRecordsValid();
  const accepted =
    upstreamAccepted &&
    evidenceAccepted &&
    candidateRecordsAccepted &&
    CAREER_T8_B81_CONTROL_IDS.length === 15;

  return finalized({
    reviewVersion:
      CAREER_PERSONALIZATION_T8_EXACT_SUBTYPE_MULTI_CLAIM_CAREER_PATTERN_SOURCE_CANDIDATE_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_EXACT_SUBTYPE_MULTI_CLAIM_CAREER_PATTERN_SOURCE_CANDIDATE_REVIEW'
      : 'UPSTREAM_B80_BOUNDARY_INVALID',
    decision: accepted
      ? 'GAP1_PRODUCT_CRITICAL_ZERO_ADMISSION_READY_CANDIDATES_QIN_BODY_TRIGGER_UNSATISFIED_NO_REPEAT_SEARCH_NO_T8_AUTHORING'
      : 'EXACT_SUBTYPE_MULTI_CLAIM_CAREER_PATTERN_SOURCE_CANDIDATE_REVIEW_NOT_ESTABLISHED',
    upstreamB80PrioritizationId: b80.prioritizationId,
    exactB80BoundaryAccepted: upstreamAccepted,
    reviewedRepository: 'gycha0109-beep/Saju',
    reviewedRepositoryCommitSha: CAREER_T8_B81_REVIEWED_REPOSITORY_COMMIT_SHA,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research_governance',
    selectedGapId: accepted ? CAREER_T8_B81_SELECTED_GAP_ID : null,
    gapProductCritical: accepted,
    gapDemotedToResearchOptional: false,
    candidateRecords: accepted ? CAREER_T8_B81_CANDIDATE_REVIEW_RECORDS : Object.freeze([]),
    candidateRecordCount: accepted ? 4 : 0,
    directMultiClaimCareerSemanticLeadCount: accepted ? 2 : 0,
    formalPublicationBodyBlockedCandidateCount: accepted ? 1 : 0,
    competingMethodHeldCandidateCount: accepted ? 1 : 0,
    currentMethodDirectBridgeCandidateCount: 0,
    admissionReadyCandidateCount: 0,
    methodCompatibleCandidateCount: 0,
    qinP464BodyAcquired: false,
    qinDirectBodyTriggerSatisfied: false,
    gapImmediatelyExecutableOnKnownEvidenceSurface: false,
    repeatedKnownSurfaceSearchAuthorized: false,
    broadSearchRestartAuthorized: false,
    crossSourceOrCrossSectionStitchingAuthorized: false,
    competingMethodSilentAdoptionAuthorized: false,
    relativeStrengthImportAuthorized: false,
    gapClosed: false,
    gapReactivationRequiredOnQualifyingEvidenceTrigger: accepted,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    calculationLogicChangeAuthorized: false,
    interpretationLogicChangeAuthorized: false,
    productionPromotionAuthorized: false,
    productionImpact: 'NONE',
    controlIds: accepted ? CAREER_T8_B81_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 15 : 0,
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      candidateReviewsCreated: accepted ? 4 : 0,
      newSourceAcquisitionsCounted: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      methodologyChoicesMade: 0,
      semanticRuleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      calculationBehaviorsChanged: 0,
      interpretationBehaviorsChanged: 0,
      narrativeBehaviorsChanged: 0,
      previewRoutesChanged: 0,
      productionBehaviorsChanged: 0,
    }),
    recommendedNextAction: accepted
      ? 'MOVE_TO_OTHER_GENUINELY_EXECUTABLE_PRODUCT_CRITICAL_ENGINE_WORK_KEEP_GAP1_TRIGGER_REACTIVE'
      : 'CAREER_PERSONALIZATION_T8_PRODUCT_CRITICAL_AUTHORITY_GAP_PRIORITIZATION',
  });
}
