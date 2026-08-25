import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
} from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import {
  CAREER_T5_FAMILY_RELATION_CLAIM_TYPE,
  CAREER_T5_SUBTYPE_CLAIM_TYPE,
} from './career-personalized-t5-substrate.js';
import {
  CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE,
} from './career-personalized-t6-branch-clash-hidden-stem-context.js';
import {
  CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE,
} from './career-personalized-t6-branch-clash-qualifier-context.js';
import {
  CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE,
} from './career-personalized-t6-branch-clash-seasonal-qualifier.js';
import type { CareerT8SynthesisAuthorityGapId } from './career-personalization-t8-synthesis-authority-gap-requirements-review.js';
import type {
  CareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReviewReport,
} from './career-personalization-t8-synthesis-authority-residual-gap-reassessment-review.js';

export const CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-current-t5-t6-semantic-bridge-authority-acquisition-readiness-review-v1' as const;

export const CAREER_T8_CURRENT_T5_T6_BRIDGE_INPUT_CLAIM_TYPES = Object.freeze([
  CAREER_T5_SUBTYPE_CLAIM_TYPE,
  CAREER_T5_FAMILY_RELATION_CLAIM_TYPE,
  CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE,
  CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE,
  CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE,
] as const);

export type CareerT8CurrentT5T6BridgeLaneId =
  | 'T5_TEN_GOD_TO_CAREER_SEMANTIC_BRIDGE'
  | 'T6_STRUCTURAL_QUALIFIER_TO_CAREER_MODIFIER_BRIDGE'
  | 'MULTI_PATTERN_CAREER_COMPOSITION_BRIDGE';

export interface CareerT8CurrentT5T6BridgeDiscoveryLane {
  laneId: CareerT8CurrentT5T6BridgeLaneId;
  targetGapIds: readonly CareerT8SynthesisAuthorityGapId[];
  allowedCurrentInputClaimTypes: readonly string[];
  objective: string;
  sourceNeedNotUseInternalClaimTypeNames: true;
  sourceConceptToCurrentClaimSemanticCorrespondenceRequired: true;
  exactGapScopedEvidenceRequired: true;
}

export interface CareerT8CurrentT5T6BridgeAuthorityAdmissionContract {
  gapId: CareerT8SynthesisAuthorityGapId;
  allowedCurrentInputClaimTypes: readonly string[];
  exactSourceIdentityRequired: true;
  oneNormalizedSourceReferencePerCandidateRequired: true;
  stableRevisionOrEquivalentReproducibleLocatorRequired: true;
  exactGapRelevantLocatorRequired: true;
  originalSourceInspectionRequired: true;
  originalOrVerifiedSourceContextRequired: true;
  sourceConceptToCurrentClaimSemanticCorrespondenceRequired: true;
  correspondenceEvidenceMustBeSourceBound: true;
  explicitCareerOrWorkSemanticAssertionRequired: true;
  explicitContextOrExceptionTreatmentRequired: true;
  independentNormativeProvenanceRequired: true;
  inputMethodologyCompatibilityRequired: true;
  competingFoundationalMethodologyMayBeSilentlyImported: false;
  internalClaimTypeStringNeedAppearInSource: false;
  sourceClassAloneSufficient: false;
  vocabularyMentionAloneSufficient: false;
  structuralCoPresenceAloneSufficient: false;
  searchSnippetSubstitutionAllowed: false;
  generalKnowledgeSubstitutionAllowed: false;
  modelSynthesisSubstitutionAllowed: false;
  empiricalCalibrationSubstitutionAllowed: false;
  numericWeightingSubstitutionAllowed: false;
  historicalRankToModernCareerConversionAllowed: false;
  legacyCareerT8SubstitutionAllowed: false;
  crossCandidateCompositionForSameGapAllowed: false;
}

export const CAREER_T8_CURRENT_T5_T6_BRIDGE_AUTHORITY_ACQUISITION_CONTROL_IDS = Object.freeze([
  'BRIDGE_READINESS_DOES_NOT_DISCOVER_REGISTER_ACCEPT_OR_PROMOTE_AUTHORITY',
  'ONLY_ALREADY_GOVERNED_CURRENT_CAREER_T5_T6_CLAIM_SEMANTICS_MAY_BE_BRIDGED',
  'SOURCE_NEED_NOT_USE_INTERNAL_CLAIM_TYPE_LABELS',
  'SOURCE_CONCEPT_TO_CURRENT_CLAIM_SEMANTIC_CORRESPONDENCE_MUST_BE_EXPLICIT_AND_SOURCE_BOUND',
  'EXPLICIT_CAREER_OR_WORK_SEMANTIC_ASSERTION_IS_REQUIRED_PER_TARGETED_GAP',
  'CURRENT_INPUT_METHODOLOGY_COMPATIBILITY_IS_REQUIRED',
  'QIANLI_YONGSHIN_XIJI_MAY_NOT_ENTER_THIS_TRACK_WITHOUT_SEPARATE_METHODOLOGY_CHOICE',
  'QIANLI_CAREER_WORDING_ALONE_IS_NOT_CURRENT_T5_T6_BRIDGE_AUTHORITY',
  'STRUCTURAL_QUALIFIER_EVIDENCE_MAY_MODIFY_ONLY_AN_ALREADY_AUTHORIZED_CAREER_SEMANTIC',
  'SEASONAL_PHASE_REMAINS_CATEGORICAL_NO_STRENGTH_WEIGHT_OR_WINNER',
  'MULTI_PATTERN_COMPOSITION_REQUIRES_EXPLICIT_COEXISTENCE_REINFORCEMENT_OR_TENSION_POLICY',
  'NO_CROSS_CANDIDATE_STITCHING_WITHIN_ONE_GAP',
  'NO_HISTORICAL_RANK_TO_MODERN_CAREER_SEMANTIC_CONVERSION',
  'NO_OCCUPATION_SALARY_PROMOTION_SUCCESS_OR_FUTURE_OUTCOME_INFERENCE',
  'NO_NUMERIC_WEIGHTING_WINNER_LOSER_DAMAGE_OR_PRECEDENCE_INFERENCE',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT_BY_THIS_GATE',
] as const);

export interface CareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS'
    | 'UPSTREAM_B9_BOUNDARY_INVALID';
  decision:
    | 'CURRENT_T5_T6_TO_CAREER_BRIDGE_GAP_SCOPED_ACQUISITION_CONTRACT_FROZEN_NO_AUTHORITY_ACQUIRED'
    | 'CURRENT_T5_T6_TO_CAREER_BRIDGE_AUTHORITY_ACQUISITION_READINESS_NOT_ESTABLISHED';
  upstreamB9ReviewId: string;
  exactB9BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  reviewerStatus: 'unreviewed';
  acquisitionTrackId: 'CURRENT_T5_T6_TO_CAREER_SEMANTIC_BRIDGE_AUTHORITY' | 'NONE';
  allowedCurrentInputClaimTypes: readonly string[];
  allowedCurrentInputClaimTypeCount: 5 | 0;
  discoveryLanes: readonly CareerT8CurrentT5T6BridgeDiscoveryLane[];
  discoveryLaneCount: 3 | 0;
  admissionContracts: readonly CareerT8CurrentT5T6BridgeAuthorityAdmissionContract[];
  admissionContractCount: 6 | 0;
  allSixGapsCoveredExactlyOnceByAdmissionContract: boolean;
  allSixGapsAssignedExactlyOnceToDiscoveryLane: boolean;
  currentT5T6ClaimSemanticsOnly: boolean;
  sourceNeedNotUseInternalClaimTypeNames: boolean;
  sourceConceptToCurrentClaimSemanticCorrespondenceRequired: boolean;
  exactSourceIdentityRequired: boolean;
  stableRevisionOrEquivalentReproducibleLocatorRequired: boolean;
  exactGapRelevantLocatorRequired: boolean;
  originalSourceInspectionRequired: boolean;
  explicitCareerOrWorkSemanticAssertionRequired: boolean;
  explicitContextOrExceptionTreatmentRequired: boolean;
  independentNormativeProvenanceRequired: boolean;
  inputMethodologyCompatibilityRequired: boolean;
  oneCandidateMayTargetMultipleGaps: boolean;
  differentGapsMayUseDifferentAcceptedSources: boolean;
  singleSourceFullCoveragePreferredPerGap: boolean;
  singleSourceFullCoverageRequiredGlobally: false;
  crossCandidateCompositionForSameGapAuthorized: false;
  qianliCareerBindingMayBeReinspected: boolean;
  qianliCareerBindingAutomaticallyAccepted: false;
  qianliYongshinXijiTrackIncludedInThisAcquisition: false;
  competingMethodologyMayBeSilentlyAdopted: false;
  competingMethodologyChoiceRequiredBeforeAnyYongshinXijiUse: true;
  searchSnippetMayBeDiscoveryLead: boolean;
  searchSnippetMayCountAsAuthorityEvidence: false;
  sourceClassAloneMaySatisfyGap: false;
  historicalRankLanguageMayBeModernizedAutomatically: false;
  occupationOrSuccessOutcomeAuthorized: false;
  numericScoringAuthorized: false;
  relativeForceVerdictAuthorized: false;
  clashWinnerVerdictAuthorized: false;
  damageMagnitudeAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  candidateDiscoveryPerformedByThisGate: false;
  candidateRegisteredByThisGate: false;
  requirementCoverageEvaluatedByThisGate: false;
  authorityAcquiredByThisGate: false;
  authorityGapClosedByThisGate: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof CAREER_T8_CURRENT_T5_T6_BRIDGE_AUTHORITY_ACQUISITION_CONTROL_IDS)[number][];
  controlCount: 16 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    sourceCandidatesDiscovered: 0;
    sourceCandidatesRegistered: 0;
    methodologyDefinitionsCreated: 0;
    methodologyChoicesAdopted: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    registrySnapshotsCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
    | 'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_RESIDUAL_GAP_REASSESSMENT_REVIEW';
}

function contentAddressedB9IdentityValid(
  b9: CareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReviewReport,
): boolean {
  const { reviewId, ...material } = b9;
  return (
    reviewId ===
    `career_t8_residual_gap_reassessment_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB9Accepted(
  b9: CareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReviewReport,
): boolean {
  const primaryTrack = b9.acquisitionTracks.find(
    (track) => track.trackId === 'CURRENT_T5_T6_TO_CAREER_SEMANTIC_BRIDGE_AUTHORITY',
  );
  const competingTrack = b9.acquisitionTracks.find(
    (track) => track.trackId === 'QIANLI_YONGSHIN_XIJI_COMPETING_METHODOLOGY_APPLICABILITY',
  );
  return (
    contentAddressedB9IdentityValid(b9) &&
    b9.status === 'RESOLVED_CAREER_T8_SYNTHESIS_AUTHORITY_RESIDUAL_GAP_REASSESSMENT' &&
    b9.decision ===
      'UNIVERSAL_CURRENT_T5_T6_TO_CAREER_BRIDGE_RESIDUAL_CONFIRMED_ALL_SIX_GAPS_OPEN_COMPETING_YONGSHIN_XIJI_TRACK_DEFERRED' &&
    b9.exactB8BoundaryAccepted &&
    b9.residualGapCount === 6 &&
    b9.residualGaps.length === 6 &&
    b9.currentT5T6SemanticBridgeIsUniversalResidual &&
    b9.residualGaps.every((gap) => gap.currentT5T6BridgeResidual && gap.gapClosed === false) &&
    b9.allSixGapsRemainOpen &&
    deterministicContentHash(b9.unresolvedGapIds) ===
      deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b9.noCurrentCandidateMayBePromoted &&
    b9.qianliCurrentT5T6BridgeStillMissing &&
    b9.qianliCompetingMethodologyTrackDeferred &&
    b9.qianliCompetingMethodologyMayBeAdoptedByThisReview === false &&
    b9.acquisitionTrackCount === 4 &&
    b9.primaryTrackId === 'CURRENT_T5_T6_TO_CAREER_SEMANTIC_BRIDGE_AUTHORITY' &&
    primaryTrack?.priority === 'PRIMARY' &&
    primaryTrack.opensCompetingMethodology === false &&
    primaryTrack.userOrDomainMethodologyChoiceRequiredBeforeExecution === false &&
    deterministicContentHash(primaryTrack.targetsGapIds) ===
      deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    competingTrack?.priority === 'DEFERRED_REQUIRES_METHODOLOGY_CHOICE' &&
    competingTrack.opensCompetingMethodology &&
    competingTrack.userOrDomainMethodologyChoiceRequiredBeforeExecution &&
    b9.sameGapCrossCandidateCompositionAuthorized === false &&
    b9.authorityAcquiredByThisGate === false &&
    b9.t8RuleAuthoringAuthorized === false &&
    b9.t8ClaimTypeCreationAuthorized === false &&
    b9.personalizedT8PackCreationAuthorized === false &&
    b9.consumerNarrativeAuthorized === false &&
    b9.previewDefaultSwitchAuthorized === false &&
    b9.productionPromotionAuthorized === false &&
    b9.controlsFrozen &&
    b9.controlCount === 12 &&
    b9.implementationEffects.sourceCandidatesDiscovered === 0 &&
    b9.implementationEffects.sourceRegistrationsCreated === 0 &&
    b9.implementationEffects.methodologyDefinitionsCreated === 0 &&
    b9.implementationEffects.methodologyChoicesAdopted === 0 &&
    b9.implementationEffects.ruleDefinitionsCreated === 0 &&
    b9.implementationEffects.claimTypesCreated === 0 &&
    b9.implementationEffects.registrySnapshotsCreated === 0 &&
    b9.implementationEffects.interpretationPacksCreated === 0 &&
    b9.implementationEffects.narrativePlansCreated === 0 &&
    b9.implementationEffects.previewRoutesChanged === 0 &&
    b9.recommendedNextGate ===
      'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW'
  );
}

function gapIds(
  ...ids: readonly CareerT8SynthesisAuthorityGapId[]
): readonly CareerT8SynthesisAuthorityGapId[] {
  return Object.freeze([...ids]);
}

export const CAREER_T8_CURRENT_T5_T6_BRIDGE_DISCOVERY_LANES = Object.freeze([
  Object.freeze({
    laneId: 'T5_TEN_GOD_TO_CAREER_SEMANTIC_BRIDGE',
    targetGapIds: gapIds(
      'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
      'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
    ),
    allowedCurrentInputClaimTypes: Object.freeze([
      CAREER_T5_SUBTYPE_CLAIM_TYPE,
      CAREER_T5_FAMILY_RELATION_CLAIM_TYPE,
    ]),
    objective:
      'Discover exact source-bound authority mapping governed Ten-God subtype and family-relation semantics into bounded Career/work expression.',
    sourceNeedNotUseInternalClaimTypeNames: true,
    sourceConceptToCurrentClaimSemanticCorrespondenceRequired: true,
    exactGapScopedEvidenceRequired: true,
  }),
  Object.freeze({
    laneId: 'T6_STRUCTURAL_QUALIFIER_TO_CAREER_MODIFIER_BRIDGE',
    targetGapIds: gapIds(
      'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
      'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
      'SEASONAL_PHASE_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
    ),
    allowedCurrentInputClaimTypes: Object.freeze([
      CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE,
      CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE,
      CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE,
    ]),
    objective:
      'Discover exact source-bound Career modifier authority for governed branch-clash context, visibility/position/plurality qualifiers, and categorical seasonal phase without strength arithmetic.',
    sourceNeedNotUseInternalClaimTypeNames: true,
    sourceConceptToCurrentClaimSemanticCorrespondenceRequired: true,
    exactGapScopedEvidenceRequired: true,
  }),
  Object.freeze({
    laneId: 'MULTI_PATTERN_CAREER_COMPOSITION_BRIDGE',
    targetGapIds: gapIds('MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING'),
    allowedCurrentInputClaimTypes: CAREER_T8_CURRENT_T5_T6_BRIDGE_INPUT_CLAIM_TYPES,
    objective:
      'Discover explicit source-bound Career composition authority for coexistence, reinforcement, qualification, or tension among multiple already-authorized Career semantic patterns.',
    sourceNeedNotUseInternalClaimTypeNames: true,
    sourceConceptToCurrentClaimSemanticCorrespondenceRequired: true,
    exactGapScopedEvidenceRequired: true,
  }),
] as const satisfies readonly CareerT8CurrentT5T6BridgeDiscoveryLane[]);

function claimTypesForGap(gapId: CareerT8SynthesisAuthorityGapId): readonly string[] {
  if (gapId === 'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING') {
    return Object.freeze([CAREER_T5_SUBTYPE_CLAIM_TYPE]);
  }
  if (gapId === 'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING') {
    return Object.freeze([
      CAREER_T5_SUBTYPE_CLAIM_TYPE,
      CAREER_T5_FAMILY_RELATION_CLAIM_TYPE,
    ]);
  }
  if (gapId === 'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING') {
    return Object.freeze([
      CAREER_T5_SUBTYPE_CLAIM_TYPE,
      CAREER_T5_FAMILY_RELATION_CLAIM_TYPE,
      CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE,
    ]);
  }
  if (gapId === 'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING') {
    return Object.freeze([
      CAREER_T5_SUBTYPE_CLAIM_TYPE,
      CAREER_T5_FAMILY_RELATION_CLAIM_TYPE,
      CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE,
      CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE,
    ]);
  }
  if (gapId === 'SEASONAL_PHASE_TO_CAREER_SEMANTIC_MODIFIER_MISSING') {
    return Object.freeze([
      CAREER_T5_SUBTYPE_CLAIM_TYPE,
      CAREER_T5_FAMILY_RELATION_CLAIM_TYPE,
      CAREER_T6_BRANCH_CLASH_CONTEXT_CLAIM_TYPE,
      CAREER_T6_BRANCH_CLASH_QUALIFIER_CONTEXT_CLAIM_TYPE,
      CAREER_T6_BRANCH_CLASH_SEASONAL_QUALIFIER_CLAIM_TYPE,
    ]);
  }
  return CAREER_T8_CURRENT_T5_T6_BRIDGE_INPUT_CLAIM_TYPES;
}

function admissionContracts(): readonly CareerT8CurrentT5T6BridgeAuthorityAdmissionContract[] {
  return Object.freeze(
    CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS.map((gapId) =>
      Object.freeze({
        gapId,
        allowedCurrentInputClaimTypes: claimTypesForGap(gapId),
        exactSourceIdentityRequired: true,
        oneNormalizedSourceReferencePerCandidateRequired: true,
        stableRevisionOrEquivalentReproducibleLocatorRequired: true,
        exactGapRelevantLocatorRequired: true,
        originalSourceInspectionRequired: true,
        originalOrVerifiedSourceContextRequired: true,
        sourceConceptToCurrentClaimSemanticCorrespondenceRequired: true,
        correspondenceEvidenceMustBeSourceBound: true,
        explicitCareerOrWorkSemanticAssertionRequired: true,
        explicitContextOrExceptionTreatmentRequired: true,
        independentNormativeProvenanceRequired: true,
        inputMethodologyCompatibilityRequired: true,
        competingFoundationalMethodologyMayBeSilentlyImported: false,
        internalClaimTypeStringNeedAppearInSource: false,
        sourceClassAloneSufficient: false,
        vocabularyMentionAloneSufficient: false,
        structuralCoPresenceAloneSufficient: false,
        searchSnippetSubstitutionAllowed: false,
        generalKnowledgeSubstitutionAllowed: false,
        modelSynthesisSubstitutionAllowed: false,
        empiricalCalibrationSubstitutionAllowed: false,
        numericWeightingSubstitutionAllowed: false,
        historicalRankToModernCareerConversionAllowed: false,
        legacyCareerT8SubstitutionAllowed: false,
        crossCandidateCompositionForSameGapAllowed: false,
      }),
    ),
  );
}

function gapCoverageExact(
  contracts: readonly CareerT8CurrentT5T6BridgeAuthorityAdmissionContract[],
): boolean {
  const ids = contracts.map((contract) => contract.gapId);
  return (
    ids.length === CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS.length &&
    new Set(ids).size === ids.length &&
    CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS.every((gapId) => ids.includes(gapId))
  );
}

function laneCoverageExact(): boolean {
  const ids = CAREER_T8_CURRENT_T5_T6_BRIDGE_DISCOVERY_LANES.flatMap(
    (lane) => lane.targetGapIds,
  );
  return (
    ids.length === CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS.length &&
    new Set(ids).size === ids.length &&
    CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS.every((gapId) => ids.includes(gapId))
  );
}

function finalized(
  material: Omit<
    CareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReviewReport,
    'reviewId'
  >,
): CareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReviewReport {
  return {
    reviewId: `career_t8_current_t5_t6_bridge_authority_acquisition_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(
  b9: CareerPersonalizationT8SynthesisAuthorityResidualGapReassessmentReviewReport,
): CareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReviewReport {
  const upstreamAccepted = exactB9Accepted(b9);
  const contracts = admissionContracts();
  const accepted = upstreamAccepted && gapCoverageExact(contracts) && laneCoverageExact();

  return finalized({
    reviewVersion:
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS'
      : 'UPSTREAM_B9_BOUNDARY_INVALID',
    decision: accepted
      ? 'CURRENT_T5_T6_TO_CAREER_BRIDGE_GAP_SCOPED_ACQUISITION_CONTRACT_FROZEN_NO_AUTHORITY_ACQUIRED'
      : 'CURRENT_T5_T6_TO_CAREER_BRIDGE_AUTHORITY_ACQUISITION_READINESS_NOT_ESTABLISHED',
    upstreamB9ReviewId: b9.reviewId,
    exactB9BoundaryAccepted: upstreamAccepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    reviewerStatus: 'unreviewed',
    acquisitionTrackId: accepted ? 'CURRENT_T5_T6_TO_CAREER_SEMANTIC_BRIDGE_AUTHORITY' : 'NONE',
    allowedCurrentInputClaimTypes: accepted
      ? CAREER_T8_CURRENT_T5_T6_BRIDGE_INPUT_CLAIM_TYPES
      : Object.freeze([]),
    allowedCurrentInputClaimTypeCount: accepted ? 5 : 0,
    discoveryLanes: accepted ? CAREER_T8_CURRENT_T5_T6_BRIDGE_DISCOVERY_LANES : Object.freeze([]),
    discoveryLaneCount: accepted ? 3 : 0,
    admissionContracts: accepted ? contracts : Object.freeze([]),
    admissionContractCount: accepted ? 6 : 0,
    allSixGapsCoveredExactlyOnceByAdmissionContract: accepted,
    allSixGapsAssignedExactlyOnceToDiscoveryLane: accepted,
    currentT5T6ClaimSemanticsOnly: accepted,
    sourceNeedNotUseInternalClaimTypeNames: accepted,
    sourceConceptToCurrentClaimSemanticCorrespondenceRequired: accepted,
    exactSourceIdentityRequired: accepted,
    stableRevisionOrEquivalentReproducibleLocatorRequired: accepted,
    exactGapRelevantLocatorRequired: accepted,
    originalSourceInspectionRequired: accepted,
    explicitCareerOrWorkSemanticAssertionRequired: accepted,
    explicitContextOrExceptionTreatmentRequired: accepted,
    independentNormativeProvenanceRequired: accepted,
    inputMethodologyCompatibilityRequired: accepted,
    oneCandidateMayTargetMultipleGaps: accepted,
    differentGapsMayUseDifferentAcceptedSources: accepted,
    singleSourceFullCoveragePreferredPerGap: accepted,
    singleSourceFullCoverageRequiredGlobally: false,
    crossCandidateCompositionForSameGapAuthorized: false,
    qianliCareerBindingMayBeReinspected: accepted && b9.qianliExplicitCareerBindingPreserved,
    qianliCareerBindingAutomaticallyAccepted: false,
    qianliYongshinXijiTrackIncludedInThisAcquisition: false,
    competingMethodologyMayBeSilentlyAdopted: false,
    competingMethodologyChoiceRequiredBeforeAnyYongshinXijiUse: true,
    searchSnippetMayBeDiscoveryLead: accepted,
    searchSnippetMayCountAsAuthorityEvidence: false,
    sourceClassAloneMaySatisfyGap: false,
    historicalRankLanguageMayBeModernizedAutomatically: false,
    occupationOrSuccessOutcomeAuthorized: false,
    numericScoringAuthorized: false,
    relativeForceVerdictAuthorized: false,
    clashWinnerVerdictAuthorized: false,
    damageMagnitudeAuthorized: false,
    crossRelationPrecedenceAuthorized: false,
    candidateDiscoveryPerformedByThisGate: false,
    candidateRegisteredByThisGate: false,
    requirementCoverageEvaluatedByThisGate: false,
    authorityAcquiredByThisGate: false,
    authorityGapClosedByThisGate: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted
      ? CAREER_T8_CURRENT_T5_T6_BRIDGE_AUTHORITY_ACQUISITION_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? 16 : 0,
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      sourceCandidatesDiscovered: 0,
      sourceCandidatesRegistered: 0,
      methodologyDefinitionsCreated: 0,
      methodologyChoicesAdopted: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    }),
    recommendedNextGate: accepted
      ? 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
      : 'CAREER_PERSONALIZATION_T8_SYNTHESIS_AUTHORITY_RESIDUAL_GAP_REASSESSMENT_REVIEW',
  });
}
