import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  GENERAL_NATAL_CONCLUSION_FAMILY_RULES,
  GENERAL_NATAL_CONCLUSION_METHODOLOGY,
  GENERAL_NATAL_CONCLUSION_SOURCE,
} from './general-natal-conclusion-synthesis-candidate.js';
import {
  GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY,
  GENERAL_NATAL_USEFUL_READING_SOURCE,
  GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
} from './general-natal-useful-reading-candidate.js';
import {
  RELATIONSHIP_NATAL_READING_METHODOLOGY,
  RELATIONSHIP_NATAL_READING_PACK,
  RELATIONSHIP_NATAL_READING_RULES,
} from './relationship-natal-reading-candidate.js';
import {
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS,
  type RelationshipSpouseT8AuthorityGapId,
} from './relationship-spouse-t8-authority-acquisition-readiness-review.js';
import type { RelationshipSpouseT8AuthorityResidualGapReassessmentReviewReport } from './relationship-spouse-t8-authority-residual-gap-reassessment-review.js';

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-current-t5-t6-semantic-bridge-authority-acquisition-readiness-review-v1' as const;

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_BRIDGE_INPUT_CLAIM_TYPES = Object.freeze(
  GENERAL_NATAL_CONCLUSION_FAMILY_RULES.map((rule) => rule.output.claimType),
);

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_UPSTREAM_CHANNEL_CLAIM_TYPES = Object.freeze(
  GENERAL_NATAL_USEFUL_TEN_GOD_RULES.map((rule) => rule.output.claimType),
);

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T6_BRIDGE_INPUT_CLAIM_TYPES = Object.freeze([] as string[]);

export type RelationshipSpouseT8CurrentBridgeDiscoveryLaneId =
  | 'CURRENT_T5_FAMILY_TO_SPOUSE_SEMANTIC_BRIDGE'
  | 'CURRENT_T5_FAMILY_TO_SPOUSE_COMPOSITION_AND_BOUNDARY_BRIDGE';

export interface RelationshipSpouseT8CurrentBridgeDiscoveryLane {
  laneId: RelationshipSpouseT8CurrentBridgeDiscoveryLaneId;
  targetGapIds: readonly RelationshipSpouseT8AuthorityGapId[];
  allowedCurrentT5InputClaimTypes: readonly string[];
  allowedCurrentT6InputClaimTypes: readonly string[];
  objective: string;
  sourceNeedNotUseInternalClaimTypeNames: true;
  sourceConceptToCurrentClaimSemanticCorrespondenceRequired: true;
  explicitSpouseSemanticBindingRequired: true;
  exactGapScopedEvidenceRequired: true;
  currentT6InputPathMayBeInventedByThisLane: false;
}

export interface RelationshipSpouseT8CurrentBridgeAuthorityAdmissionContract {
  gapId: RelationshipSpouseT8AuthorityGapId;
  allowedCurrentT5InputClaimTypes: readonly string[];
  allowedCurrentT6InputClaimTypes: readonly string[];
  exactSourceIdentityRequired: true;
  oneNormalizedSourceReferencePerCandidateRequired: true;
  stableRevisionOrEquivalentReproducibleLocatorRequired: true;
  exactGapRelevantLocatorRequired: true;
  originalSourceInspectionRequired: true;
  originalOrVerifiedSourceContextRequired: true;
  sourceConceptToCurrentClaimSemanticCorrespondenceRequired: true;
  correspondenceEvidenceMustBeSourceBound: true;
  explicitSpouseSemanticAssertionRequired: true;
  explicitApplicabilityBoundaryRequired: true;
  explicitContextOrExceptionTreatmentRequired: true;
  independentNormativeProvenanceRequired: true;
  currentInputMethodologyCompatibilityRequired: true;
  modernProductScopeCompatibilityRequired: true;
  internalClaimTypeStringNeedAppearInSource: false;
  sourceClassAloneSufficient: false;
  spouseVocabularyMentionAloneSufficient: false;
  historicalGenderRoleConventionAloneSufficient: false;
  historicalPartnerAttributePredictionAloneSufficient: false;
  searchSnippetSubstitutionAllowed: false;
  generalKnowledgeSubstitutionAllowed: false;
  modelSynthesisSubstitutionAllowed: false;
  competingHistoricalMethodologyMayBeSilentlyImported: false;
  currentT6InputMayBeSynthesizedFromAbsence: false;
  compatibilityAuthoritySubstitutionAllowed: false;
  crossCandidateCompositionForSameGapAllowed: false;
}

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_AUTHORITY_ACQUISITION_CONTROL_IDS =
  Object.freeze([
    'BRIDGE_READINESS_DOES_NOT_DISCOVER_REGISTER_ACCEPT_OR_PROMOTE_AUTHORITY',
    'ONLY_CURRENTLY_MATERIALIZED_RELATIONSHIP_INPUT_CLAIM_SEMANTICS_MAY_BE_BRIDGED',
    'FIVE_T5_FAMILY_PRESENCE_CLAIMS_ARE_THE_ONLY_DIRECT_CURRENT_RELATIONSHIP_T8_INPUTS',
    'TEN_CHANNEL_LEVEL_T5_THEME_CLAIMS_ARE_UPSTREAM_PROVENANCE_SUBSTRATE_NOT_DIRECT_SPOUSE_BRIDGE_INPUTS',
    'NO_CURRENT_RELATIONSHIP_T6_INPUT_PATH_IS_ESTABLISHED',
    'T6_INPUT_MAY_NOT_BE_INVENTED_FROM_REPOSITORY_ABSENCE_OR_HISTORICAL_TEXT',
    'SOURCE_NEED_NOT_USE_INTERNAL_CLAIM_TYPE_LABELS',
    'SOURCE_CONCEPT_TO_CURRENT_T5_FAMILY_SEMANTIC_CORRESPONDENCE_MUST_BE_EXPLICIT_AND_SOURCE_BOUND',
    'EXPLICIT_SPOUSE_SEMANTIC_ASSERTION_IS_REQUIRED_PER_TARGETED_GAP',
    'CURRENT_INPUT_METHODOLOGY_COMPATIBILITY_IS_REQUIRED',
    'MODERN_PRODUCT_SCOPE_COMPATIBILITY_IS_REQUIRED',
    'ZIPING_WIFE_PALACE_YONGSHIN_XIJI_STRUCTURE_INPUTS_MAY_NOT_ENTER_WITHOUT_SEPARATE_METHODOLOGY_CHOICE',
    'DITIAN_HISTORICAL_WIFE_WEALTH_AND_ROLE_CONVENTIONS_MAY_NOT_BE_MAPPED_TO_CURRENT_T5_BY_DEFAULT',
    'NO_HISTORICAL_SEX_GENDER_ROLE_OR_PARTNER_ATTRIBUTE_UNIVERSALIZATION',
    'NO_CROSS_CANDIDATE_STITCHING_WITHIN_ONE_GAP',
    'NO_SPOUSE_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT_BY_THIS_GATE',
  ] as const);

export interface RelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReviewReport {
  reviewId: string;
  reviewVersion: typeof RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION;
  status:
    | 'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS'
    | 'UPSTREAM_RESIDUAL_GAP_REASSESSMENT_BOUNDARY_INVALID';
  decision:
    | 'CURRENT_T5_FAMILY_SUBSTRATE_FROZEN_NO_CURRENT_RELATIONSHIP_T6_INPUT_PATH_SOURCE_DISCOVERY_AUTHORIZED_ONLY_NO_AUTHORITY_ACQUIRED'
    | 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_AUTHORITY_ACQUISITION_READINESS_NOT_ESTABLISHED';
  upstreamResidualReviewId: string;
  exactResidualBoundaryAccepted: boolean;
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  reviewerStatus: 'unreviewed';
  acquisitionTrackId: 'CURRENT_SPOUSE_T5_T6_SEMANTIC_BRIDGE_AUTHORITY' | 'NONE';
  currentRelationshipConsumerPackId: string | null;
  currentRelationshipConsumerMethodologyId: string | null;
  currentT5FamilyPresenceMethodologyId: string | null;
  currentT5FamilyPresenceSourceIds: readonly string[];
  currentDirectT5InputClaimTypes: readonly string[];
  currentDirectT5InputClaimTypeCount: 5 | 0;
  upstreamChannelT5ClaimTypes: readonly string[];
  upstreamChannelT5ClaimTypeCount: 10 | 0;
  currentRelationshipT8RuleCount: number;
  everyCurrentRelationshipT8RuleUsesOnlyT5FamilyPresenceInputs: boolean;
  currentRelationshipT6InputPathEstablished: false;
  currentDirectT6InputClaimTypes: readonly string[];
  currentDirectT6InputClaimTypeCount: 0;
  t6BridgeDiscoveryLaneAuthorized: false;
  t6InputPathMayBeInventedByThisGate: false;
  discoveryLanes: readonly RelationshipSpouseT8CurrentBridgeDiscoveryLane[];
  discoveryLaneCount: 2 | 0;
  admissionContracts: readonly RelationshipSpouseT8CurrentBridgeAuthorityAdmissionContract[];
  admissionContractCount: 5 | 0;
  allFiveGapsCoveredExactlyOnceByAdmissionContract: boolean;
  allFiveGapsAssignedExactlyOnceToDiscoveryLane: boolean;
  sourceNeedNotUseInternalClaimTypeNames: boolean;
  sourceConceptToCurrentT5FamilySemanticCorrespondenceRequired: boolean;
  exactSourceIdentityRequired: boolean;
  stableRevisionOrEquivalentReproducibleLocatorRequired: boolean;
  exactGapRelevantLocatorRequired: boolean;
  originalSourceInspectionRequired: boolean;
  explicitSpouseSemanticAssertionRequired: boolean;
  explicitApplicabilityBoundaryRequired: boolean;
  explicitContextOrExceptionTreatmentRequired: boolean;
  independentNormativeProvenanceRequired: boolean;
  currentInputMethodologyCompatibilityRequired: boolean;
  modernProductScopeCompatibilityRequired: boolean;
  oneCandidateMayTargetMultipleGaps: boolean;
  differentGapsMayUseDifferentAcceptedSources: boolean;
  singleSourceFullCoverageRequiredGlobally: false;
  crossCandidateCompositionForSameGapAuthorized: false;
  zipingMayBeReinspectedAsDiscoveryLead: boolean;
  zipingHistoricalInputsAutomaticallyAccepted: false;
  ditianMayBeReinspectedAsDiscoveryLead: boolean;
  ditianHistoricalRoleConventionsAutomaticallyMappedToCurrentT5: false;
  competingHistoricalMethodologyIncludedInThisAcquisition: false;
  competingMethodologyMayBeSilentlyAdopted: false;
  competingMethodologyChoiceRequiredBeforeUse: true;
  searchSnippetMayBeDiscoveryLead: boolean;
  searchSnippetMayCountAsAuthorityEvidence: false;
  sourceClassAloneMaySatisfyGap: false;
  historicalGenderRoleMayBeUniversalized: false;
  partnerAttributeOrOutcomePredictionAuthorized: false;
  compatibilityAuthorityMaySubstitute: false;
  candidateDiscoveryPerformedByThisGate: false;
  candidateRegisteredByThisGate: false;
  requirementCoverageEvaluatedByThisGate: false;
  authorityAcquiredByThisGate: false;
  authorityGapClosedByThisGate: false;
  spouseT8RuleAuthoringAuthorized: false;
  spouseT8ClaimTypeCreationAuthorized: false;
  spouseInterpretationPackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_AUTHORITY_ACQUISITION_CONTROL_IDS)[number][];
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
    | 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
    | 'RELATIONSHIP_SPOUSE_T8_AUTHORITY_RESIDUAL_GAP_REASSESSMENT_REVIEW';
}

function allGapIds(): readonly RelationshipSpouseT8AuthorityGapId[] {
  return Object.freeze(
    RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS.map((requirement) => requirement.gapId),
  );
}

function contentAddressedResidualIdentityValid(
  residual: RelationshipSpouseT8AuthorityResidualGapReassessmentReviewReport,
): boolean {
  const { reviewId, ...material } = residual;
  return (
    reviewId ===
    `relationship_spouse_t8_residual_gap_reassessment_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactResidualBoundaryAccepted(
  residual: RelationshipSpouseT8AuthorityResidualGapReassessmentReviewReport,
): boolean {
  const gapIds = allGapIds();
  const primaryTrack = residual.acquisitionTracks.find(
    (track) => track.trackId === 'CURRENT_SPOUSE_T5_T6_SEMANTIC_BRIDGE_AUTHORITY',
  );
  const competingTrack = residual.acquisitionTracks.find(
    (track) => track.trackId === 'COMPETING_HISTORICAL_SPOUSE_METHODOLOGY_APPLICABILITY',
  );
  return (
    contentAddressedResidualIdentityValid(residual) &&
    residual.status === 'RESOLVED_RELATIONSHIP_SPOUSE_T8_AUTHORITY_RESIDUAL_GAP_REASSESSMENT' &&
    residual.decision ===
      'THREE_UNIVERSAL_RESIDUAL_BLOCKERS_CONFIRMED_ALL_FIVE_GAPS_OPEN_COMPETING_HISTORICAL_METHODOLOGY_TRACK_DEFERRED' &&
    residual.exactCoverageBoundaryAccepted &&
    residual.residualGapCount === 5 &&
    residual.residualGaps.length === 5 &&
    residual.currentSpouseT5T6SemanticBridgeIsUniversalResidual &&
    residual.methodologyInputCompatibilityIsUniversalResidual &&
    residual.modernProductScopeCompatibilityIsUniversalResidual &&
    residual.residualGaps.every(
      (gap) =>
        gap.currentSpouseT5T6BridgeResidual &&
        gap.methodologyInputCompatibilityResidual &&
        gap.modernProductScopeCompatibilityResidual &&
        gap.gapClosed === false,
    ) &&
    residual.allFiveGapsRemainOpen &&
    deterministicContentHash(residual.unresolvedGapIds) === deterministicContentHash(gapIds) &&
    residual.noCurrentCandidateMayBePromoted &&
    residual.zipingPrimaryBoundEvidencePreserved &&
    residual.zipingCurrentSpouseT5T6BridgeStillMissing &&
    residual.zipingModernProductScopeCompatibilityStillMissing &&
    residual.ditianPrimaryPassageBindingStillMissing &&
    residual.ditianIndependentProvenanceStillMissing &&
    residual.acquisitionTrackCount === 4 &&
    residual.primaryTrackId === 'CURRENT_SPOUSE_T5_T6_SEMANTIC_BRIDGE_AUTHORITY' &&
    primaryTrack?.priority === 'PRIMARY' &&
    primaryTrack.opensCompetingMethodology === false &&
    primaryTrack.userOrDomainMethodologyChoiceRequiredBeforeExecution === false &&
    deterministicContentHash(primaryTrack.targetsGapIds) === deterministicContentHash(gapIds) &&
    competingTrack?.priority === 'DEFERRED_REQUIRES_METHODOLOGY_CHOICE' &&
    competingTrack.opensCompetingMethodology &&
    competingTrack.userOrDomainMethodologyChoiceRequiredBeforeExecution &&
    residual.sameGapCrossCandidateCompositionAuthorized === false &&
    residual.unresolvedShenfengGenderRoleLeadMayCloseGapByItself === false &&
    residual.authorityAdmittedByThisGate === false &&
    residual.spouseT8RuleAuthoringAuthorized === false &&
    residual.spouseT8ClaimTypeCreationAuthorized === false &&
    residual.spouseInterpretationPackCreationAuthorized === false &&
    residual.consumerNarrativeAuthorized === false &&
    residual.compatibilityAuthorityAuthorized === false &&
    residual.previewDefaultSwitchAuthorized === false &&
    residual.productionPromotionAuthorized === false &&
    residual.controlsFrozen &&
    residual.controlCount === 12 &&
    residual.recommendedNextGate ===
      'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW'
  );
}

function currentDirectT5InputClaimTypes(): readonly string[] {
  const directInputs = new Set(
    RELATIONSHIP_NATAL_READING_RULES.flatMap((rule) =>
      rule.inputs
        .filter((input) => input.source === 'interpretation_claim')
        .map((input) => input.pathOrClaimType),
    ),
  );
  return Object.freeze(
    RELATIONSHIP_SPOUSE_T8_CURRENT_T5_BRIDGE_INPUT_CLAIM_TYPES.filter((claimType) =>
      directInputs.has(claimType),
    ),
  );
}

function exactCurrentSubstrateAccepted(): boolean {
  const familyRules = GENERAL_NATAL_CONCLUSION_FAMILY_RULES;
  const channelRules = GENERAL_NATAL_USEFUL_TEN_GOD_RULES;
  const directT5 = currentDirectT5InputClaimTypes();
  const familyClaimTypes = RELATIONSHIP_SPOUSE_T8_CURRENT_T5_BRIDGE_INPUT_CLAIM_TYPES;
  return (
    familyRules.length === 5 &&
    familyRules.every(
      (rule) =>
        rule.taxonomy.tier === 'T5' &&
        rule.taxonomy.category === 'ten_gods' &&
        rule.taxonomy.subcategory === 'family_presence' &&
        rule.inputs.length === 1 &&
        rule.inputs[0]?.source === 'derived_fact' &&
        rule.inputs[0]?.pathOrClaimType === 'derivedFacts.tenGods',
    ) &&
    channelRules.length === 10 &&
    channelRules.every(
      (rule) =>
        rule.taxonomy.tier === 'T5' &&
        rule.taxonomy.category === 'ten_gods' &&
        rule.inputs.some(
          (input) => input.source === 'derived_fact' && input.pathOrClaimType === 'derivedFacts.tenGods',
        ),
    ) &&
    directT5.length === 5 &&
    deterministicContentHash(directT5) === deterministicContentHash(familyClaimTypes) &&
    RELATIONSHIP_NATAL_READING_RULES.length > 0 &&
    RELATIONSHIP_NATAL_READING_RULES.every(
      (rule) =>
        rule.taxonomy.tier === 'T8' &&
        rule.taxonomy.category === 'relationship' &&
        rule.taxonomy.subcategory === 'general' &&
        rule.inputs.length > 0 &&
        rule.inputs.every(
          (input) =>
            input.source === 'interpretation_claim' && familyClaimTypes.includes(input.pathOrClaimType),
        ),
    ) &&
    RELATIONSHIP_NATAL_READING_METHODOLOGY.assumptions.some((assumption) =>
      assumption.includes('must not be reused as spouse-specific claims'),
    ) &&
    RELATIONSHIP_NATAL_READING_PACK.status === 'research' &&
    GENERAL_NATAL_CONCLUSION_METHODOLOGY.status === 'research' &&
    GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY.status === 'research' &&
    GENERAL_NATAL_CONCLUSION_SOURCE.provenanceTier === 'cross_reference' &&
    GENERAL_NATAL_USEFUL_READING_SOURCE.provenanceTier === 'cross_reference'
  );
}

function gapIds(
  ...ids: readonly RelationshipSpouseT8AuthorityGapId[]
): readonly RelationshipSpouseT8AuthorityGapId[] {
  return Object.freeze([...ids]);
}

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_DISCOVERY_LANES = Object.freeze([
  Object.freeze({
    laneId: 'CURRENT_T5_FAMILY_TO_SPOUSE_SEMANTIC_BRIDGE',
    targetGapIds: gapIds(
      'SPOUSE_SPECIFIC_SEMANTIC_BINDING_MISSING',
      'SPOUSE_APPLICABILITY_BOUNDARY_MISSING',
      'SPOUSE_NORMATIVE_PROVENANCE_REVIEW_MISSING',
    ),
    allowedCurrentT5InputClaimTypes: RELATIONSHIP_SPOUSE_T8_CURRENT_T5_BRIDGE_INPUT_CLAIM_TYPES,
    allowedCurrentT6InputClaimTypes: RELATIONSHIP_SPOUSE_T8_CURRENT_T6_BRIDGE_INPUT_CLAIM_TYPES,
    objective:
      'Discover source-bound authority mapping the currently materialized neutral Ten-God family-presence semantics into bounded spouse-specific semantics, applicability boundaries and normative support without importing a different foundational method.',
    sourceNeedNotUseInternalClaimTypeNames: true,
    sourceConceptToCurrentClaimSemanticCorrespondenceRequired: true,
    explicitSpouseSemanticBindingRequired: true,
    exactGapScopedEvidenceRequired: true,
    currentT6InputPathMayBeInventedByThisLane: false,
  }),
  Object.freeze({
    laneId: 'CURRENT_T5_FAMILY_TO_SPOUSE_COMPOSITION_AND_BOUNDARY_BRIDGE',
    targetGapIds: gapIds(
      'SPOUSE_MULTI_CLAIM_COMPOSITION_METHOD_MISSING',
      'SPOUSE_SCOPE_LIMITS_AND_EXCEPTIONS_MISSING',
    ),
    allowedCurrentT5InputClaimTypes: RELATIONSHIP_SPOUSE_T8_CURRENT_T5_BRIDGE_INPUT_CLAIM_TYPES,
    allowedCurrentT6InputClaimTypes: RELATIONSHIP_SPOUSE_T8_CURRENT_T6_BRIDGE_INPUT_CLAIM_TYPES,
    objective:
      'Discover explicit source-bound coexistence, composition, limitation and exception treatment for current Ten-God family semantics when used in a spouse-specific domain, preserving non-numeric and non-deterministic product scope.',
    sourceNeedNotUseInternalClaimTypeNames: true,
    sourceConceptToCurrentClaimSemanticCorrespondenceRequired: true,
    explicitSpouseSemanticBindingRequired: true,
    exactGapScopedEvidenceRequired: true,
    currentT6InputPathMayBeInventedByThisLane: false,
  }),
] as const satisfies readonly RelationshipSpouseT8CurrentBridgeDiscoveryLane[]);

function admissionContracts(): readonly RelationshipSpouseT8CurrentBridgeAuthorityAdmissionContract[] {
  return Object.freeze(
    allGapIds().map((gapId) =>
      Object.freeze({
        gapId,
        allowedCurrentT5InputClaimTypes: RELATIONSHIP_SPOUSE_T8_CURRENT_T5_BRIDGE_INPUT_CLAIM_TYPES,
        allowedCurrentT6InputClaimTypes: RELATIONSHIP_SPOUSE_T8_CURRENT_T6_BRIDGE_INPUT_CLAIM_TYPES,
        exactSourceIdentityRequired: true,
        oneNormalizedSourceReferencePerCandidateRequired: true,
        stableRevisionOrEquivalentReproducibleLocatorRequired: true,
        exactGapRelevantLocatorRequired: true,
        originalSourceInspectionRequired: true,
        originalOrVerifiedSourceContextRequired: true,
        sourceConceptToCurrentClaimSemanticCorrespondenceRequired: true,
        correspondenceEvidenceMustBeSourceBound: true,
        explicitSpouseSemanticAssertionRequired: true,
        explicitApplicabilityBoundaryRequired: true,
        explicitContextOrExceptionTreatmentRequired: true,
        independentNormativeProvenanceRequired: true,
        currentInputMethodologyCompatibilityRequired: true,
        modernProductScopeCompatibilityRequired: true,
        internalClaimTypeStringNeedAppearInSource: false,
        sourceClassAloneSufficient: false,
        spouseVocabularyMentionAloneSufficient: false,
        historicalGenderRoleConventionAloneSufficient: false,
        historicalPartnerAttributePredictionAloneSufficient: false,
        searchSnippetSubstitutionAllowed: false,
        generalKnowledgeSubstitutionAllowed: false,
        modelSynthesisSubstitutionAllowed: false,
        competingHistoricalMethodologyMayBeSilentlyImported: false,
        currentT6InputMayBeSynthesizedFromAbsence: false,
        compatibilityAuthoritySubstitutionAllowed: false,
        crossCandidateCompositionForSameGapAllowed: false,
      }),
    ),
  );
}

function allGapsCoveredExactlyOnceByAdmissionContract(
  contracts: readonly RelationshipSpouseT8CurrentBridgeAuthorityAdmissionContract[],
): boolean {
  const expected = allGapIds();
  return (
    contracts.length === expected.length &&
    expected.every((gapId) => contracts.filter((contract) => contract.gapId === gapId).length === 1)
  );
}

function allGapsAssignedExactlyOnceToDiscoveryLane(): boolean {
  const expected = allGapIds();
  return expected.every(
    (gapId) =>
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_DISCOVERY_LANES.filter((lane) =>
        lane.targetGapIds.includes(gapId),
      ).length === 1,
  );
}

function finalized(
  material: Omit<
    RelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReviewReport,
    'reviewId'
  >,
): RelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReviewReport {
  return {
    reviewId: `relationship_spouse_t8_current_t5_t6_bridge_acquisition_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildRelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReview(
  residual: RelationshipSpouseT8AuthorityResidualGapReassessmentReviewReport,
): RelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityAcquisitionReadinessReviewReport {
  const accepted = exactResidualBoundaryAccepted(residual) && exactCurrentSubstrateAccepted();
  const contracts = accepted ? admissionContracts() : Object.freeze([]);
  const directT5 = accepted ? currentDirectT5InputClaimTypes() : Object.freeze([]);

  return finalized({
    reviewVersion:
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_ACQUISITION_READINESS'
      : 'UPSTREAM_RESIDUAL_GAP_REASSESSMENT_BOUNDARY_INVALID',
    decision: accepted
      ? 'CURRENT_T5_FAMILY_SUBSTRATE_FROZEN_NO_CURRENT_RELATIONSHIP_T6_INPUT_PATH_SOURCE_DISCOVERY_AUTHORIZED_ONLY_NO_AUTHORITY_ACQUIRED'
      : 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_AUTHORITY_ACQUISITION_READINESS_NOT_ESTABLISHED',
    upstreamResidualReviewId: residual.reviewId,
    exactResidualBoundaryAccepted: accepted,
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    reviewerStatus: 'unreviewed',
    acquisitionTrackId: accepted ? 'CURRENT_SPOUSE_T5_T6_SEMANTIC_BRIDGE_AUTHORITY' : 'NONE',
    currentRelationshipConsumerPackId: accepted ? RELATIONSHIP_NATAL_READING_PACK.packId : null,
    currentRelationshipConsumerMethodologyId: accepted
      ? RELATIONSHIP_NATAL_READING_METHODOLOGY.methodologyId
      : null,
    currentT5FamilyPresenceMethodologyId: accepted
      ? GENERAL_NATAL_CONCLUSION_METHODOLOGY.methodologyId
      : null,
    currentT5FamilyPresenceSourceIds: accepted
      ? Object.freeze([
          GENERAL_NATAL_USEFUL_READING_SOURCE.sourceId,
          GENERAL_NATAL_CONCLUSION_SOURCE.sourceId,
        ])
      : Object.freeze([]),
    currentDirectT5InputClaimTypes: directT5,
    currentDirectT5InputClaimTypeCount: accepted ? 5 : 0,
    upstreamChannelT5ClaimTypes: accepted
      ? RELATIONSHIP_SPOUSE_T8_CURRENT_T5_UPSTREAM_CHANNEL_CLAIM_TYPES
      : Object.freeze([]),
    upstreamChannelT5ClaimTypeCount: accepted ? 10 : 0,
    currentRelationshipT8RuleCount: accepted ? RELATIONSHIP_NATAL_READING_RULES.length : 0,
    everyCurrentRelationshipT8RuleUsesOnlyT5FamilyPresenceInputs: accepted,
    currentRelationshipT6InputPathEstablished: false,
    currentDirectT6InputClaimTypes: RELATIONSHIP_SPOUSE_T8_CURRENT_T6_BRIDGE_INPUT_CLAIM_TYPES,
    currentDirectT6InputClaimTypeCount: 0,
    t6BridgeDiscoveryLaneAuthorized: false,
    t6InputPathMayBeInventedByThisGate: false,
    discoveryLanes: accepted
      ? RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_DISCOVERY_LANES
      : Object.freeze([]),
    discoveryLaneCount: accepted ? 2 : 0,
    admissionContracts: contracts,
    admissionContractCount: accepted ? 5 : 0,
    allFiveGapsCoveredExactlyOnceByAdmissionContract:
      accepted && allGapsCoveredExactlyOnceByAdmissionContract(contracts),
    allFiveGapsAssignedExactlyOnceToDiscoveryLane:
      accepted && allGapsAssignedExactlyOnceToDiscoveryLane(),
    sourceNeedNotUseInternalClaimTypeNames: accepted,
    sourceConceptToCurrentT5FamilySemanticCorrespondenceRequired: accepted,
    exactSourceIdentityRequired: accepted,
    stableRevisionOrEquivalentReproducibleLocatorRequired: accepted,
    exactGapRelevantLocatorRequired: accepted,
    originalSourceInspectionRequired: accepted,
    explicitSpouseSemanticAssertionRequired: accepted,
    explicitApplicabilityBoundaryRequired: accepted,
    explicitContextOrExceptionTreatmentRequired: accepted,
    independentNormativeProvenanceRequired: accepted,
    currentInputMethodologyCompatibilityRequired: accepted,
    modernProductScopeCompatibilityRequired: accepted,
    oneCandidateMayTargetMultipleGaps: accepted,
    differentGapsMayUseDifferentAcceptedSources: accepted,
    singleSourceFullCoverageRequiredGlobally: false,
    crossCandidateCompositionForSameGapAuthorized: false,
    zipingMayBeReinspectedAsDiscoveryLead: accepted,
    zipingHistoricalInputsAutomaticallyAccepted: false,
    ditianMayBeReinspectedAsDiscoveryLead: accepted,
    ditianHistoricalRoleConventionsAutomaticallyMappedToCurrentT5: false,
    competingHistoricalMethodologyIncludedInThisAcquisition: false,
    competingMethodologyMayBeSilentlyAdopted: false,
    competingMethodologyChoiceRequiredBeforeUse: true,
    searchSnippetMayBeDiscoveryLead: accepted,
    searchSnippetMayCountAsAuthorityEvidence: false,
    sourceClassAloneMaySatisfyGap: false,
    historicalGenderRoleMayBeUniversalized: false,
    partnerAttributeOrOutcomePredictionAuthorized: false,
    compatibilityAuthorityMaySubstitute: false,
    candidateDiscoveryPerformedByThisGate: false,
    candidateRegisteredByThisGate: false,
    requirementCoverageEvaluatedByThisGate: false,
    authorityAcquiredByThisGate: false,
    authorityGapClosedByThisGate: false,
    spouseT8RuleAuthoringAuthorized: false,
    spouseT8ClaimTypeCreationAuthorized: false,
    spouseInterpretationPackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted
      ? RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_AUTHORITY_ACQUISITION_CONTROL_IDS
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
      ? 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
      : 'RELATIONSHIP_SPOUSE_T8_AUTHORITY_RESIDUAL_GAP_REASSESSMENT_REVIEW',
  });
}
