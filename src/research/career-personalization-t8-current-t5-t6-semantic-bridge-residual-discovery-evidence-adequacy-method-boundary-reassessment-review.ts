import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_DISCOVERY_EVIDENCE_VERSION,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_CANDIDATES,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_CONTROL_IDS,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_TASK_EVIDENCE,
  type CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathDiscoveryEvidenceReport,
  type CareerT8BridgeResidualDiscoveryCandidateId,
} from './career-personalization-t8-current-t5-t6-semantic-bridge-residual-authority-path-discovery-evidence.js';

export const CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-current-t5-t6-semantic-bridge-residual-discovery-evidence-adequacy-method-boundary-reassessment-review-v1' as const;

export type CareerT8BridgeMethodBoundaryResidualClassId =
  | 'CURRENT_METHOD_T5_DIRECT_BRIDGE_ACQUISITION'
  | 'CURRENT_METHOD_T6_DIRECT_CAREER_BRIDGE_DISCOVERY'
  | 'CHEONBU_EXTERNAL_FULL_TEXT_ACCESS_HOLD'
  | 'WANG_QING_COMPETING_FOUNDATIONAL_METHOD_HOLD';

export type CareerT8BridgeMethodBoundaryResidualClassStatus =
  | 'ACTIVE_CURRENT_METHOD_REMEDIATION'
  | 'BLOCKED_EXTERNAL_ACCESS_HOLD'
  | 'HUMAN_METHODOLOGY_ADJUDICATION_REQUIRED_BEFORE_USE';

export interface CareerT8BridgeMethodBoundaryResidualClass {
  classId: CareerT8BridgeMethodBoundaryResidualClassId;
  status: CareerT8BridgeMethodBoundaryResidualClassStatus;
  targetGapIds: readonly (typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS)[number][];
  retainedCandidateIds: readonly CareerT8BridgeResidualDiscoveryCandidateId[];
  objective: string;
  mayContinueWithoutHumanMethodologyChoice: boolean;
  humanMethodologyChoiceRequiredBeforeSemanticUse: boolean;
  currentEvidenceQualifiesAsAuthority: false;
  currentEvidenceClosesGap: false;
  executionAuthorizedByThisGate: false;
}

const T5_GAPS = Object.freeze([
  'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
  'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
  'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING',
] as const satisfies readonly (typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS)[number][]);

const T6_GAPS = Object.freeze([
  'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
  'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
  'SEASONAL_PHASE_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
] as const satisfies readonly (typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS)[number][]);

export const CAREER_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_RESIDUAL_CLASSES = Object.freeze([
  Object.freeze({
    classId: 'CURRENT_METHOD_T5_DIRECT_BRIDGE_ACQUISITION',
    status: 'ACTIVE_CURRENT_METHOD_REMEDIATION',
    targetGapIds: T5_GAPS,
    retainedCandidateIds: Object.freeze(['YANG_YIYUN_SHISHEN_CHANWEI'] as const),
    objective:
      'Remain within the currently governed method while seeking a directly located, provenance-secure passage that explicitly binds multiple exact Ten-God subtype/family claims to Career/work semantics and, where consumed, an explicit conflict/tension policy. Yang remains a remediation target only; separate combination and Career chapters may not be stitched.',
    mayContinueWithoutHumanMethodologyChoice: true,
    humanMethodologyChoiceRequiredBeforeSemanticUse: false,
    currentEvidenceQualifiesAsAuthority: false,
    currentEvidenceClosesGap: false,
    executionAuthorizedByThisGate: false,
  }),
  Object.freeze({
    classId: 'CURRENT_METHOD_T6_DIRECT_CAREER_BRIDGE_DISCOVERY',
    status: 'ACTIVE_CURRENT_METHOD_REMEDIATION',
    targetGapIds: T6_GAPS,
    retainedCandidateIds: Object.freeze([
      'SANMING_TONGHUI_VOL2_LUN_CHONGJI',
      'ZIPING_ZHENQUAN_OFFICIAL_PATTERN_CLASH_CONTEXT',
    ] as const),
    objective:
      'Retain the classic clash passages as structural context only while continuing to discover a direct natal Career/work semantic bridge for governed branch-clash and qualifier claims without translating 官貴/科甲/格局 language into modern Career semantics.',
    mayContinueWithoutHumanMethodologyChoice: true,
    humanMethodologyChoiceRequiredBeforeSemanticUse: false,
    currentEvidenceQualifiesAsAuthority: false,
    currentEvidenceClosesGap: false,
    executionAuthorizedByThisGate: false,
  }),
  Object.freeze({
    classId: 'CHEONBU_EXTERNAL_FULL_TEXT_ACCESS_HOLD',
    status: 'BLOCKED_EXTERNAL_ACCESS_HOLD',
    targetGapIds: T5_GAPS,
    retainedCandidateIds: Object.freeze([]),
    objective:
      'Preserve the exact-edition and Career-TOC evidence while waiting for lawful reproducible external full-text access to the target Cheonbu passages. Public-web retail metadata retry is not progress.',
    mayContinueWithoutHumanMethodologyChoice: false,
    humanMethodologyChoiceRequiredBeforeSemanticUse: false,
    currentEvidenceQualifiesAsAuthority: false,
    currentEvidenceClosesGap: false,
    executionAuthorizedByThisGate: false,
  }),
  Object.freeze({
    classId: 'WANG_QING_COMPETING_FOUNDATIONAL_METHOD_HOLD',
    status: 'HUMAN_METHODOLOGY_ADJUDICATION_REQUIRED_BEFORE_USE',
    targetGapIds: T5_GAPS,
    retainedCandidateIds: Object.freeze(['WANG_QING_XUE_GEJU_SECOND_BOOK_CAREER_COMPOSITION'] as const),
    objective:
      'Preserve Wang Qing as the strongest explicit multi-claim Career-composition lead, but prohibit semantic use until a separate human methodology adjudication decides whether the competing 格局/太極點/得用十神/用神 framework may enter the governed Career method and under what isolation boundary.',
    mayContinueWithoutHumanMethodologyChoice: false,
    humanMethodologyChoiceRequiredBeforeSemanticUse: true,
    currentEvidenceQualifiesAsAuthority: false,
    currentEvidenceClosesGap: false,
    executionAuthorizedByThisGate: false,
  }),
] as const satisfies readonly CareerT8BridgeMethodBoundaryResidualClass[]);

export const CAREER_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_REASSESSMENT_CONTROL_IDS = Object.freeze([
  'B17_PARTIAL_EVIDENCE_IS_ADEQUATE_TO_CLASSIFY_RESIDUAL_METHOD_BOUNDARIES_NOT_TO_ADMIT_AUTHORITY',
  'CURRENT_METHOD_T5_DIRECT_BRIDGE_ACQUISITION_REMAINS_OPEN_WITHOUT_WANG_ADOPTION',
  'YANG_REMAINS_A_REMEDIATION_TARGET_NOT_AN_AUTHORITY_SOURCE',
  'SHIM_THESIS_REMAINS_COMPOSITE_CAREER_CONTEXT_NOT_A_DIRECT_T5_BRIDGE_TARGET',
  'CURRENT_METHOD_T6_DIRECT_CAREER_BRIDGE_DISCOVERY_REMAINS_OPEN',
  'CLASSIC_T6_CANDIDATES_REMAIN_STRUCTURAL_CONTEXT_NOT_MODERN_CAREER_SEMANTIC_AUTHORITY',
  'CHEONBU_EXTERNAL_FULL_TEXT_ACCESS_HOLD_REMAINS_SEPARATE_FROM_ACTIVE_DISCOVERY',
  'WANG_QING_ISOLATED_AS_COMPETING_FOUNDATIONAL_METHOD_HOLD',
  'HUMAN_METHODOLOGY_ADJUDICATION_REQUIRED_BEFORE_ANY_WANG_SEMANTIC_USE',
  'HUMAN_METHODOLOGY_CHOICE_NOT_REQUIRED_TO_CONTINUE_CURRENT_METHOD_DISCOVERY',
  'NO_CROSS_SOURCE_STITCHING_OR_PARTIAL_EVIDENCE_PROMOTION',
  'ALL_SIX_GAPS_OPEN_NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT',
] as const);

export interface CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT'
    | 'UPSTREAM_B17_BOUNDARY_INVALID';
  decision:
    | 'B17_PARTIAL_EVIDENCE_VALID_TWO_CURRENT_METHOD_FRONTIERS_REMAIN_OPEN_TWO_HOLDS_ISOLATED_COMPETING_METHOD_REQUIRES_HUMAN_ADJUDICATION_BEFORE_USE_NO_AUTHORITY_ACQUIRED'
    | 'RESIDUAL_DISCOVERY_METHOD_BOUNDARY_NOT_ESTABLISHED';
  upstreamB17EvidenceId: string;
  exactB17BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  b17EvidenceAdequateForResidualClassificationOnly: boolean;
  b17EvidenceAdequateForAuthorityAdmission: false;
  b17EvidenceAdequateForGapClosure: false;
  residualClasses: readonly CareerT8BridgeMethodBoundaryResidualClass[];
  residualClassCount: 4 | 0;
  activeCurrentMethodFrontierCount: 2 | 0;
  holdCount: 2 | 0;
  currentMethodT5DirectBridgeAcquisitionMayContinue: boolean;
  currentMethodT6DirectCareerBridgeDiscoveryMayContinue: boolean;
  humanMethodologyChoiceRequiredBeforeContinuingCurrentMethodDiscovery: false;
  wangQingCompetingMethodHoldActive: boolean;
  humanMethodologyChoiceRequiredBeforeWangSemanticUse: boolean;
  wangSemanticUseAuthorized: false;
  yangSemanticUseAuthorized: false;
  shimDirectBridgeUseAuthorized: false;
  classicStatusToModernCareerTranslationAuthorized: false;
  cheonbuExternalFullTextHoldPreserved: boolean;
  crossSourceStitchingAuthorized: false;
  allSixGapsRemainOpen: true;
  unresolvedGapIds: readonly (typeof CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS)[number][];
  authorityAcquiredByThisGate: false;
  authorityGapClosedByThisGate: false;
  remediationExecutionAuthorizedByThisGate: false;
  methodologyChoiceMadeByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof CAREER_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_REASSESSMENT_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    residualClassesSelected: 4 | 0;
    activeCurrentMethodFrontiersSelected: 2 | 0;
    humanMethodologyChoicesMade: 0;
    candidatesRegistered: 0;
    authorityCandidatesAccepted: 0;
    authorityGapsClosed: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW'
    | 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_DISCOVERY_EVIDENCE';
}

function contentAddressedB17IdentityValid(
  b17: CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathDiscoveryEvidenceReport,
): boolean {
  const { evidenceId, ...material } = b17;
  return (
    evidenceId ===
    `career_t8_current_t5_t6_bridge_residual_authority_path_discovery_evidence_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB17Accepted(
  b17: CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathDiscoveryEvidenceReport,
): boolean {
  return (
    contentAddressedB17IdentityValid(b17) &&
    b17.evidenceVersion ===
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_DISCOVERY_EVIDENCE_VERSION &&
    b17.status ===
      'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_DISCOVERY_EVIDENCE' &&
    b17.decision ===
      'T5_AND_T6_PARTIAL_CANDIDATES_DISCOVERED_ZERO_CURRENT_METHOD_QUALIFYING_AUTHORITY_COMPETING_METHOD_BOUNDARY_SURFACED_ALL_SIX_GAPS_OPEN' &&
    b17.exactB16BoundaryAccepted &&
    b17.discoveryPerformed &&
    b17.taskEvidenceCount === 2 &&
    deterministicContentHash(b17.taskEvidence) ===
      deterministicContentHash(CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_TASK_EVIDENCE) &&
    b17.candidateAttemptCount === 5 &&
    deterministicContentHash(b17.candidateEvidence) ===
      deterministicContentHash(CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_CANDIDATES) &&
    b17.t5CandidateAttemptCount === 3 &&
    b17.t5PrimaryDisposition === 'PARTIAL_CANDIDATE_DISCOVERED' &&
    b17.t5AcademicCompositeCareerMethodEvidenceFound &&
    b17.t5TenGodCombinationMethodTextFound &&
    b17.t5DirectMultiClaimCareerCompositionLeadFound &&
    b17.t5CurrentMethodQualifyingCandidateCount === 0 &&
    b17.t6CandidateAttemptCount === 2 &&
    b17.t6PrimaryDisposition === 'PARTIAL_CANDIDATE_DISCOVERED' &&
    b17.t6HighProvenanceClassicClashContextFound &&
    b17.t6DirectCurrentMethodCareerModifierFound === false &&
    b17.t6CurrentMethodQualifyingCandidateCount === 0 &&
    b17.competingFoundationalMethodChoiceSurfaced &&
    b17.competingFoundationalMethodChoiceMadeByThisGate === false &&
    b17.crossSourceStitchingAuthorized === false &&
    b17.cheonbuExternalFullTextHoldPreserved &&
    b17.cheonbuRetriedByThisGate === false &&
    b17.allSixGapsRemainOpen &&
    deterministicContentHash(b17.unresolvedGapIds) === deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b17.authorityAcquiredByThisGate === false &&
    b17.authorityCandidateAcceptedByThisGate === false &&
    b17.authorityGapClosedByThisGate === false &&
    b17.productionPromotionAuthorized === false &&
    b17.controlsFrozen &&
    b17.controlCount === 12 &&
    deterministicContentHash(b17.controlIds) ===
      deterministicContentHash(CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_DISCOVERY_CONTROL_IDS) &&
    b17.recommendedNextGate ===
      'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW'
  );
}

function finalized(
  material: Omit<
    CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReviewReport,
    'reviewId'
  >,
): CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReviewReport {
  return {
    reviewId: `career_t8_current_t5_t6_bridge_method_boundary_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReview(
  b17: CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualAuthorityPathDiscoveryEvidenceReport,
): CareerPersonalizationT8CurrentT5T6SemanticBridgeResidualDiscoveryEvidenceAdequacyMethodBoundaryReassessmentReviewReport {
  const accepted = exactB17Accepted(b17);

  return finalized({
    reviewVersion:
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_DISCOVERY_EVIDENCE_ADEQUACY_METHOD_BOUNDARY_REASSESSMENT'
      : 'UPSTREAM_B17_BOUNDARY_INVALID',
    decision: accepted
      ? 'B17_PARTIAL_EVIDENCE_VALID_TWO_CURRENT_METHOD_FRONTIERS_REMAIN_OPEN_TWO_HOLDS_ISOLATED_COMPETING_METHOD_REQUIRES_HUMAN_ADJUDICATION_BEFORE_USE_NO_AUTHORITY_ACQUIRED'
      : 'RESIDUAL_DISCOVERY_METHOD_BOUNDARY_NOT_ESTABLISHED',
    upstreamB17EvidenceId: b17.evidenceId,
    exactB17BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    b17EvidenceAdequateForResidualClassificationOnly: accepted,
    b17EvidenceAdequateForAuthorityAdmission: false,
    b17EvidenceAdequateForGapClosure: false,
    residualClasses: accepted ? CAREER_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_RESIDUAL_CLASSES : Object.freeze([]),
    residualClassCount: accepted ? 4 : 0,
    activeCurrentMethodFrontierCount: accepted ? 2 : 0,
    holdCount: accepted ? 2 : 0,
    currentMethodT5DirectBridgeAcquisitionMayContinue: accepted,
    currentMethodT6DirectCareerBridgeDiscoveryMayContinue: accepted,
    humanMethodologyChoiceRequiredBeforeContinuingCurrentMethodDiscovery: false,
    wangQingCompetingMethodHoldActive: accepted,
    humanMethodologyChoiceRequiredBeforeWangSemanticUse: accepted,
    wangSemanticUseAuthorized: false,
    yangSemanticUseAuthorized: false,
    shimDirectBridgeUseAuthorized: false,
    classicStatusToModernCareerTranslationAuthorized: false,
    cheonbuExternalFullTextHoldPreserved: accepted,
    crossSourceStitchingAuthorized: false,
    allSixGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAcquiredByThisGate: false,
    authorityGapClosedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
    methodologyChoiceMadeByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted ? CAREER_T8_CURRENT_T5_T6_BRIDGE_METHOD_BOUNDARY_REASSESSMENT_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      residualClassesSelected: accepted ? 4 : 0,
      activeCurrentMethodFrontiersSelected: accepted ? 2 : 0,
      humanMethodologyChoicesMade: 0,
      candidatesRegistered: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    }),
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW'
      : 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_DISCOVERY_EVIDENCE',
  });
}
