import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
  type CareerT8SynthesisAuthorityGapId,
} from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE_VERSION,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE_RECORDS,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_EXECUTION_EVIDENCE_CONTROL_IDS,
  type CareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidenceReport,
} from './career-personalization-t8-current-t5-t6-semantic-bridge-active-remediation-execution-evidence.js';

export const CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-current-t5-t6-semantic-bridge-remediation-evidence-adequacy-residual-path-reassessment-review-v1' as const;

export type CareerT8BridgeResidualPathId =
  | 'CHEONBU_EXTERNAL_FULL_TEXT_ACCESS_HOLD'
  | 'T5_MULTI_ALTERNATE_NORMATIVE_SOURCE_DISCOVERY'
  | 'T6_HIGHER_PROVENANCE_NATAL_CAREER_SOURCE_DISCOVERY';

export type CareerT8BridgeResidualPathStatus =
  | 'BLOCKED_EXTERNAL_ACCESS_REQUIRED'
  | 'ACTIVE_ALTERNATE_DISCOVERY_REQUIRED';

export interface CareerT8BridgeResidualPath {
  pathId: CareerT8BridgeResidualPathId;
  status: CareerT8BridgeResidualPathStatus;
  targetGapIds: readonly CareerT8SynthesisAuthorityGapId[];
  objective: string;
  existingB14EvidenceMaySatisfyAuthority: false;
  newEvidenceRequired: true;
  sourceBoundCorrespondenceRequired: true;
  independentNormativeProvenanceRequired: true;
  crossSourceStitchingForSameGapAllowed: false;
  executionAuthorizedByThisReview: false;
}

const T5_MULTI_GAPS = Object.freeze([
  'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
  'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
  'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING',
] as const satisfies readonly CareerT8SynthesisAuthorityGapId[]);

const T6_GAPS = Object.freeze([
  'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
  'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
  'SEASONAL_PHASE_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
] as const satisfies readonly CareerT8SynthesisAuthorityGapId[]);

export const CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_PATHS = Object.freeze([
  Object.freeze({
    pathId: 'CHEONBU_EXTERNAL_FULL_TEXT_ACCESS_HOLD',
    status: 'BLOCKED_EXTERNAL_ACCESS_REQUIRED',
    targetGapIds: T5_MULTI_GAPS,
    objective:
      'Acquire the exact 2020 Cheonbu Tongbyeonron Career passages and bounded local context through a lawful full-text, library, purchased-copy, author, publisher, or other reproducible external access path before reevaluating methodology compatibility or current-T5 correspondence.',
    existingB14EvidenceMaySatisfyAuthority: false,
    newEvidenceRequired: true,
    sourceBoundCorrespondenceRequired: true,
    independentNormativeProvenanceRequired: true,
    crossSourceStitchingForSameGapAllowed: false,
    executionAuthorizedByThisReview: false,
  }),
  Object.freeze({
    pathId: 'T5_MULTI_ALTERNATE_NORMATIVE_SOURCE_DISCOVERY',
    status: 'ACTIVE_ALTERNATE_DISCOVERY_REQUIRED',
    targetGapIds: T5_MULTI_GAPS,
    objective:
      'Continue discovery for an alternate normative source that explicitly and non-numerically binds governed Ten-God subtype/family semantics and multi-pattern coexistence, reinforcement, qualification, or tension to Career/work semantics without silently importing a competing foundational methodology.',
    existingB14EvidenceMaySatisfyAuthority: false,
    newEvidenceRequired: true,
    sourceBoundCorrespondenceRequired: true,
    independentNormativeProvenanceRequired: true,
    crossSourceStitchingForSameGapAllowed: false,
    executionAuthorizedByThisReview: false,
  }),
  Object.freeze({
    pathId: 'T6_HIGHER_PROVENANCE_NATAL_CAREER_SOURCE_DISCOVERY',
    status: 'ACTIVE_ALTERNATE_DISCOVERY_REQUIRED',
    targetGapIds: T6_GAPS,
    objective:
      'Continue targeted discovery for higher-provenance natal sources that explicitly bind branch clash and governed visibility, position, plurality, or categorical seasonal qualifiers to qualitative Career/work modifiers without event prediction, numeric strength adaptation, or Yongshin/Xiji import.',
    existingB14EvidenceMaySatisfyAuthority: false,
    newEvidenceRequired: true,
    sourceBoundCorrespondenceRequired: true,
    independentNormativeProvenanceRequired: true,
    crossSourceStitchingForSameGapAllowed: false,
    executionAuthorizedByThisReview: false,
  }),
] as const satisfies readonly CareerT8BridgeResidualPath[]);

export const CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_REASSESSMENT_CONTROL_IDS = Object.freeze([
  'B14_EVIDENCE_IS_ADEQUATE_TO_ESTABLISH_EXECUTION_OUTCOME_NOT_INTERPRETATION_AUTHORITY',
  'CHEONBU_PUBLIC_WEB_ACCESS_BLOCKED_DOES_NOT_MEAN_THE_BOOK_OR_PASSAGE_DOES_NOT_EXIST',
  'T6_NO_QUALIFYING_CANDIDATE_IN_B14_DOES_NOT_PROVE_GLOBAL_SOURCE_ABSENCE',
  'CHEONBU_EXACT_FULL_TEXT_REMAINS_AN_EXTERNAL_ACCESS_HOLD',
  'T5_MULTI_ALTERNATE_NORMATIVE_DISCOVERY_MAY_CONTINUE_IN_PARALLEL_WITH_CHEONBU_HOLD',
  'T6_DISCOVERY_MUST_MOVE_TOWARD_HIGHER_PROVENANCE_NATAL_CAREER_SOURCES',
  'MODERN_WEB_LEADS_REMAIN_DISCOVERY_EVIDENCE_ONLY',
  'DYNAMIC_EVENT_OR_COMPETING_METHOD_LEADS_REMAIN_NON_ADMISSIBLE',
  'NO_CROSS_SOURCE_STITCHING_TO_SIMULATE_SINGLE_GAP_AUTHORITY',
  'ALL_SIX_CAREER_T8_AUTHORITY_GAPS_REMAIN_OPEN',
  'RESIDUAL_PATH_SELECTION_DOES_NOT_AUTHORIZE_EXECUTION_OR_AUTHORITY_PROMOTION',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT',
] as const);

export interface CareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT'
    | 'UPSTREAM_B14_BOUNDARY_INVALID';
  decision:
    | 'B14_EXECUTION_OUTCOMES_VALID_ZERO_AUTHORITY_THREE_RESIDUAL_PATHS_SELECTED_ALL_SIX_GAPS_OPEN'
    | 'REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_NOT_ESTABLISHED';
  upstreamB14EvidenceId: string;
  exactB14BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  b14EvidenceAdequateForExecutionOutcomeOnly: boolean;
  b14EvidenceAdequateForAuthorityAdmission: false;
  b14EvidenceAdequateForGapClosure: false;
  cheonbuPublicWebPathBlocked: boolean;
  cheonbuPassageNonexistenceInferred: false;
  cheonbuExternalFullTextAccessRequired: boolean;
  t6B14CandidateSetHadZeroQualifyingCandidates: boolean;
  t6GlobalSourceAbsenceInferred: false;
  residualPaths: readonly CareerT8BridgeResidualPath[];
  residualPathCount: 3 | 0;
  blockedExternalPathCount: 1 | 0;
  activeAlternateDiscoveryPathCount: 2 | 0;
  activeAlternateDiscoveryPathIds: readonly CareerT8BridgeResidualPathId[];
  t5MultiAlternateDiscoveryMayProceedWhileCheonbuBlocked: boolean;
  t6HigherProvenanceDiscoveryRequired: boolean;
  modernWebLeadPromotionAuthorized: false;
  dynamicEventAdaptationAuthorized: false;
  competingMethodAdaptationAuthorized: false;
  crossSourceStitchingAuthorized: false;
  allSixGapsRemainOpen: true;
  unresolvedGapIds: readonly CareerT8SynthesisAuthorityGapId[];
  authorityAcquiredByThisGate: false;
  authorityGapClosedByThisGate: false;
  residualPathExecutionAuthorizedByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_REASSESSMENT_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    externalAccessesPerformed: 0;
    discoveryExecutionsPerformed: 0;
    residualPathsSelected: 3 | 0;
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
    | 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS_REVIEW'
    | 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE';
}

const ACTIVE_ALTERNATE_PATH_IDS = Object.freeze([
  'T5_MULTI_ALTERNATE_NORMATIVE_SOURCE_DISCOVERY',
  'T6_HIGHER_PROVENANCE_NATAL_CAREER_SOURCE_DISCOVERY',
] as const satisfies readonly CareerT8BridgeResidualPathId[]);

function contentAddressedB14IdentityValid(
  b14: CareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidenceReport,
): boolean {
  const { evidenceId, ...material } = b14;
  return (
    evidenceId ===
    `career_t8_current_t5_t6_bridge_active_remediation_execution_evidence_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB14Accepted(
  b14: CareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidenceReport,
): boolean {
  return (
    contentAddressedB14IdentityValid(b14) &&
    b14.evidenceVersion ===
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE_VERSION &&
    b14.status ===
      'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE' &&
    b14.decision ===
      'CHEONBU_PARTIAL_IDENTITY_TOC_EVIDENCE_EXACT_PASSAGE_ACCESS_BLOCKED_T6_NO_QUALIFYING_CANDIDATE_NO_AUTHORITY_ACQUIRED' &&
    b14.exactB13BoundaryAccepted &&
    b14.executionPerformed &&
    b14.taskEvidenceRecordCount === 2 &&
    deterministicContentHash(b14.taskEvidenceRecords) ===
      deterministicContentHash(CAREER_T8_CURRENT_T5_T6_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE_RECORDS) &&
    b14.totalSourceAttemptCount === 6 &&
    b14.cheonbuPrimaryDisposition === 'PARTIAL_EVIDENCE_ACQUIRED' &&
    b14.cheonbuAccessBlocked &&
    b14.cheonbuSourceIdentityCrossConfirmed &&
    b14.cheonbuRelevantCareerSectionsExistenceConfirmed &&
    b14.cheonbuExactPassagePageAcquired === false &&
    b14.cheonbuCurrentT5SemanticCorrespondenceEstablished === false &&
    b14.t6PrimaryDisposition === 'NO_QUALIFYING_CANDIDATE_FOUND' &&
    b14.t6TargetedDiscoveryPerformed &&
    b14.t6SourceAttemptCount === 4 &&
    b14.t6QualifyingCandidateCount === 0 &&
    b14.negativeEvidencePreserved &&
    b14.fallbackAuthoritySynthesized === false &&
    b14.crossSourceStitchingAuthorized === false &&
    b14.allSixGapsRemainOpen &&
    deterministicContentHash(b14.unresolvedGapIds) ===
      deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b14.authorityAcquiredByThisGate === false &&
    b14.authorityGapClosedByThisGate === false &&
    b14.productionPromotionAuthorized === false &&
    b14.controlsFrozen &&
    b14.controlCount === 12 &&
    deterministicContentHash(b14.controlIds) ===
      deterministicContentHash(CAREER_T8_CURRENT_T5_T6_BRIDGE_EXECUTION_EVIDENCE_CONTROL_IDS) &&
    b14.recommendedNextGate ===
      'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW'
  );
}

function finalized(
  material: Omit<
    CareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReviewReport,
    'reviewId'
  >,
): CareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReviewReport {
  return {
    reviewId: `career_t8_current_t5_t6_bridge_residual_path_reassessment_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReview(
  b14: CareerPersonalizationT8CurrentT5T6SemanticBridgeActiveRemediationExecutionEvidenceReport,
): CareerPersonalizationT8CurrentT5T6SemanticBridgeRemediationEvidenceAdequacyResidualPathReassessmentReviewReport {
  const accepted = exactB14Accepted(b14);

  return finalized({
    reviewVersion:
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT'
      : 'UPSTREAM_B14_BOUNDARY_INVALID',
    decision: accepted
      ? 'B14_EXECUTION_OUTCOMES_VALID_ZERO_AUTHORITY_THREE_RESIDUAL_PATHS_SELECTED_ALL_SIX_GAPS_OPEN'
      : 'REMEDIATION_EVIDENCE_ADEQUACY_RESIDUAL_PATH_REASSESSMENT_NOT_ESTABLISHED',
    upstreamB14EvidenceId: b14.evidenceId,
    exactB14BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    b14EvidenceAdequateForExecutionOutcomeOnly: accepted,
    b14EvidenceAdequateForAuthorityAdmission: false,
    b14EvidenceAdequateForGapClosure: false,
    cheonbuPublicWebPathBlocked: accepted,
    cheonbuPassageNonexistenceInferred: false,
    cheonbuExternalFullTextAccessRequired: accepted,
    t6B14CandidateSetHadZeroQualifyingCandidates: accepted,
    t6GlobalSourceAbsenceInferred: false,
    residualPaths: accepted ? CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_PATHS : Object.freeze([]),
    residualPathCount: accepted ? 3 : 0,
    blockedExternalPathCount: accepted ? 1 : 0,
    activeAlternateDiscoveryPathCount: accepted ? 2 : 0,
    activeAlternateDiscoveryPathIds: accepted ? ACTIVE_ALTERNATE_PATH_IDS : Object.freeze([]),
    t5MultiAlternateDiscoveryMayProceedWhileCheonbuBlocked: accepted,
    t6HigherProvenanceDiscoveryRequired: accepted,
    modernWebLeadPromotionAuthorized: false,
    dynamicEventAdaptationAuthorized: false,
    competingMethodAdaptationAuthorized: false,
    crossSourceStitchingAuthorized: false,
    allSixGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAcquiredByThisGate: false,
    authorityGapClosedByThisGate: false,
    residualPathExecutionAuthorizedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted
      ? CAREER_T8_CURRENT_T5_T6_BRIDGE_RESIDUAL_REASSESSMENT_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      externalAccessesPerformed: 0,
      discoveryExecutionsPerformed: 0,
      residualPathsSelected: accepted ? 3 : 0,
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
      ? 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_RESIDUAL_AUTHORITY_PATH_EXECUTION_READINESS_REVIEW'
      : 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_EVIDENCE',
  });
}
