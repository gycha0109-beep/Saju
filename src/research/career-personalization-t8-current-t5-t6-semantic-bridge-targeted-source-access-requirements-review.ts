import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS } from './career-personalization-bounded-t5-t6-t8-synthesis-methodology-review.js';
import type { CareerT8SynthesisAuthorityGapId } from './career-personalization-t8-synthesis-authority-gap-requirements-review.js';
import {
  CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_CANDIDATE_DISCOVERY_CONTROL_IDS,
  CAREER_T8_CURRENT_T5_T6_BRIDGE_DISCOVERED_CANDIDATES,
  type CareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidenceReport,
} from './career-personalization-t8-current-t5-t6-semantic-bridge-authority-candidate-discovery-evidence.js';

export const CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW_VERSION =
  'myeonghwa-career-personalization-t8-current-t5-t6-semantic-bridge-targeted-source-access-requirements-review-v1' as const;

export type CareerT8BridgeRemediationTrackId =
  | 'CHEONBU_EXACT_PASSAGE_ACCESS'
  | 'T6_NATAL_CAREER_MODIFIER_NEW_CANDIDATE_DISCOVERY'
  | 'MIXED_SCHOLARLY_FULL_TEXT_CLARIFICATION'
  | 'NUMERIC_STRENGTH_CANDIDATE_CLOSED_CURRENT_TRACK'
  | 'COMPETING_YONGSHIN_XIJI_METHOD_DEFERRED';

export type CareerT8BridgeRemediationPriority =
  | 'ACTIVE_PRIMARY'
  | 'SECONDARY_NON_ADMITTING'
  | 'NO_ACCESS_REMEDIATION'
  | 'DEFERRED_REQUIRES_METHODOLOGY_CHOICE';

export type CareerT8BridgeRemediationMode =
  | 'SOURCE_ACCESS'
  | 'NEW_CANDIDATE_DISCOVERY'
  | 'FULL_TEXT_CLARIFICATION_ONLY'
  | 'CLOSED_UNDER_CURRENT_POLICY'
  | 'DEFERRED_METHODOLOGY_DECISION';

export interface CareerT8BridgeSourceAccessRequirement {
  requirementId: string;
  description: string;
  requiredForAuthorityAdmission: boolean;
  accessCanResolve: boolean;
  candidateDiscoveryCanResolve: boolean;
  methodologyChoiceCanResolve: boolean;
}

export interface CareerT8BridgeRemediationTrack {
  trackId: CareerT8BridgeRemediationTrackId;
  priority: CareerT8BridgeRemediationPriority;
  mode: CareerT8BridgeRemediationMode;
  candidateIds: readonly string[];
  targetGapIds: readonly CareerT8SynthesisAuthorityGapId[];
  requirements: readonly CareerT8BridgeSourceAccessRequirement[];
  executionAuthorizedAfterThisReview: boolean;
  authorityAcceptanceAuthorizedByThisTrackDefinition: false;
  gapClosureAuthorizedByThisTrackDefinition: false;
  rationale: string;
}

export const CAREER_T8_CURRENT_T5_T6_BRIDGE_SOURCE_ACCESS_CONTROL_IDS = Object.freeze([
  'SOURCE_ACCESS_REQUIREMENTS_REVIEW_DOES_NOT_ACQUIRE_AUTHORITY',
  'ACCESS_REMEDIATION_AND_METHODOLOGY_REMEDIATION_ARE_DISTINCT',
  'CHEONBU_TOC_LEAD_REQUIRES_EXACT_PASSAGE_AND_LOCAL_CONTEXT',
  'CHEONBU_METHOD_INGREDIENTS_MUST_BE_CHECKED_BEFORE_ANY_CORRESPONDENCE_CLAIM',
  'CHEONBU_MULTI_PATTERN_TEXT_MUST_BE_NON_NUMERIC_AND_EXPLICIT_BEFORE_USE',
  'CHENYUAN_DYNAMIC_PROFESSION_CHANGE_TEXT_IS_NOT_REMEDIATED_BY_MORE_ACCESS',
  'T6_LANE_REQUIRES_NEW_NATAL_SPECIFIC_CAREER_MODIFIER_CANDIDATE_DISCOVERY',
  'CHOI_NUMERIC_STRENGTH_METHOD_IS_CLOSED_UNDER_CURRENT_POLICY',
  'MIXED_SCHOLARLY_FULL_TEXT_MAY_CLARIFY_BUT_CANNOT_STRIP_YONGSHIN_OR_GYEOKGUK_SILENTLY',
  'COMPETING_YONGSHIN_XIJI_METHOD_REMAINS_DEFERRED',
  'NO_CROSS_CANDIDATE_STITCHING_TO_SIMULATE_FULL_GAP_COVERAGE',
  'NO_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT',
] as const);

export interface CareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReviewReport {
  reviewId: string;
  reviewVersion: typeof CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW_VERSION;
  status:
    | 'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW'
    | 'UPSTREAM_B11_BOUNDARY_INVALID';
  decision:
    | 'ACCESS_REMEDIATION_CLASSIFIED_TWO_ACTIVE_PRIMARY_TRACKS_NO_AUTHORITY_ACQUIRED_ALL_SIX_GAPS_OPEN'
    | 'TARGETED_SOURCE_ACCESS_REQUIREMENTS_NOT_ESTABLISHED';
  upstreamB11EvidenceId: string;
  exactB11BoundaryAccepted: boolean;
  domain: 'career';
  temporalScope: 'natal';
  statusClass: 'research';
  remediationTracks: readonly CareerT8BridgeRemediationTrack[];
  remediationTrackCount: 5 | 0;
  activePrimaryTrackIds: readonly CareerT8BridgeRemediationTrackId[];
  activePrimaryTrackCount: 2 | 0;
  accessRemediableCandidateIds: readonly string[];
  newCandidateDiscoveryRequiredLaneIds: readonly string[];
  noAccessRemediationCandidateIds: readonly string[];
  secondaryClarificationCandidateIds: readonly string[];
  deferredCompetingMethodologyTrackPresent: boolean;
  cheonbuExactPassageAccessRequired: boolean;
  cheonbuExactPassagePageBindingRequired: boolean;
  cheonbuFullLocalContextRequired: boolean;
  cheonbuMethodologyCompatibilityMustBeReevaluatedAfterAccess: boolean;
  cheonbuCurrentT5SemanticCorrespondenceMustBeEstablishedAfterAccess: boolean;
  cheonbuIndependentNormativeCorroborationStillRequired: boolean;
  cheonbuAccessSuccessWouldAutoAdmitAuthority: false;
  t6ExistingChenCandidateRemediationByAccessRejected: boolean;
  t6NewNatalSpecificCandidateDiscoveryRequired: boolean;
  t6CandidateMustExpressCareerModifierNotEventPrediction: boolean;
  t6CandidateMustRemainNonNumeric: boolean;
  choiNumericCandidateClosedUnderCurrentPolicy: boolean;
  choiMoreAccessWouldResolvePolicyConflict: false;
  mixedScholarlyCandidatesMayBeClarifiedByFullText: boolean;
  mixedScholarlyFullTextWouldAutoRemoveCompetingMethodology: false;
  qianliOrOtherYongshinXijiTrackMayEnterActiveAcquisition: false;
  allSixGapsRemainOpen: true;
  unresolvedGapIds: readonly CareerT8SynthesisAuthorityGapId[];
  authorityAcquiredByThisGate: false;
  authorityGapClosedByThisGate: false;
  currentClaimSemanticCorrespondenceEstablishedByThisGate: false;
  crossCandidateCompositionAuthorized: false;
  t8RuleAuthoringAuthorized: false;
  t8ClaimTypeCreationAuthorized: false;
  personalizedT8PackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof CAREER_T8_CURRENT_T5_T6_BRIDGE_SOURCE_ACCESS_CONTROL_IDS)[number][];
  controlCount: 12 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    sourceAccessesPerformed: 0;
    newCandidatesDiscovered: 0;
    registeredSourcesCreated: 0;
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
    | 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS_REVIEW'
    | 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE';
}

const T5_GAPS = Object.freeze([
  'EXACT_SUBTYPE_MULTI_CLAIM_TO_CAREER_PATTERN_BINDING_MISSING',
  'FAMILY_RELATION_TO_CAREER_PATTERN_BINDING_MISSING',
] as const satisfies readonly CareerT8SynthesisAuthorityGapId[]);

const T6_GAPS = Object.freeze([
  'BRANCH_CLASH_TO_T5_CAREER_SEMANTIC_MODIFIER_MISSING',
  'VISIBILITY_POSITION_PLURALITY_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
  'SEASONAL_PHASE_TO_CAREER_SEMANTIC_MODIFIER_MISSING',
] as const satisfies readonly CareerT8SynthesisAuthorityGapId[]);

const MULTI_GAP = Object.freeze([
  'MULTI_PATTERN_CONFLICT_TENSION_COMPOSITION_POLICY_MISSING',
] as const satisfies readonly CareerT8SynthesisAuthorityGapId[]);

function contentAddressedB11IdentityValid(
  b11: CareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidenceReport,
): boolean {
  const { evidenceId, ...material } = b11;
  return (
    evidenceId ===
    `career_t8_current_t5_t6_bridge_candidate_discovery_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactB11Accepted(
  b11: CareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidenceReport,
): boolean {
  return (
    contentAddressedB11IdentityValid(b11) &&
    b11.evidenceVersion ===
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION &&
    b11.status ===
      'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE' &&
    b11.decision ===
      'FIVE_BRIDGE_CANDIDATES_DISCOVERED_ZERO_ADMISSION_COMPATIBLE_NO_AUTHORITY_ACQUIRED_ALL_SIX_GAPS_OPEN' &&
    b11.exactB10BoundaryAccepted &&
    b11.discoveryPerformed &&
    b11.inspectedCandidateCount === 5 &&
    deterministicContentHash(b11.inspectedCandidates) ===
      deterministicContentHash(CAREER_T8_CURRENT_T5_T6_BRIDGE_DISCOVERED_CANDIDATES) &&
    b11.discoveryLaneCount === 3 &&
    b11.laneResults.length === 3 &&
    b11.leadOnlyCandidateCount === 1 &&
    b11.methodologyMixedCandidateCount === 2 &&
    b11.numericIncompatibleCandidateCount === 1 &&
    b11.temporalMismatchCandidateCount === 1 &&
    b11.admissionCompatibleCandidateCount === 0 &&
    b11.registeredCandidateCount === 0 &&
    b11.authorityAcceptedCandidateCount === 0 &&
    b11.authorityGapClosedCount === 0 &&
    b11.allSixGapsRemainOpen &&
    deterministicContentHash(b11.unresolvedGapIds) ===
      deterministicContentHash(CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS) &&
    b11.strongestCurrentLeadCandidateId === 'cheonbu_myeongri_tongbyeonron_2020' &&
    b11.strongestCurrentLeadRequiresExactPassageAccess &&
    b11.t5LaneHasPromisingButUnadmittedEvidence &&
    b11.t6LaneHasNoNatalMethodologyCompatibleBridgeCandidate &&
    b11.multiPatternLaneHasNoNonNumericMethodologyCompatibleBridgeCandidate &&
    b11.numericStrengthMethodRejectedFromCurrentTrack &&
    b11.competingYongshinXijiMethodologyDeferred &&
    b11.dynamicCareerChangeNotPromotedToNatalModifier &&
    b11.currentClaimSemanticCorrespondenceEstablishedByThisGate === false &&
    b11.sameGapCrossCandidateCompositionAuthorized === false &&
    b11.authorityAcquiredByThisGate === false &&
    b11.t8RuleAuthoringAuthorized === false &&
    b11.productionPromotionAuthorized === false &&
    b11.controlsFrozen &&
    b11.controlCount === 12 &&
    deterministicContentHash(b11.controlIds) ===
      deterministicContentHash(CAREER_T8_CURRENT_T5_T6_BRIDGE_CANDIDATE_DISCOVERY_CONTROL_IDS) &&
    b11.recommendedNextGate ===
      'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW'
  );
}

function requirement(
  requirementId: string,
  description: string,
  flags: {
    requiredForAuthorityAdmission: boolean;
    accessCanResolve: boolean;
    candidateDiscoveryCanResolve: boolean;
    methodologyChoiceCanResolve: boolean;
  },
): CareerT8BridgeSourceAccessRequirement {
  return Object.freeze({ requirementId, description, ...flags });
}

export const CAREER_T8_CURRENT_T5_T6_BRIDGE_REMEDIATION_TRACKS = Object.freeze([
  Object.freeze({
    trackId: 'CHEONBU_EXACT_PASSAGE_ACCESS',
    priority: 'ACTIVE_PRIMARY',
    mode: 'SOURCE_ACCESS',
    candidateIds: Object.freeze(['cheonbu_myeongri_tongbyeonron_2020']),
    targetGapIds: Object.freeze([...T5_GAPS, ...MULTI_GAP]),
    requirements: Object.freeze([
      requirement(
        'CHEONBU_EXACT_SECTION_PAGE_BINDING',
        'Resolve exact pages for the sections labelled 십신의 직업적성 and 십신구조에 따른 직업특성 in the identified 2020 edition.',
        { requiredForAuthorityAdmission: true, accessCanResolve: true, candidateDiscoveryCanResolve: false, methodologyChoiceCanResolve: false },
      ),
      requirement(
        'CHEONBU_FULL_PASSAGE_AND_LOCAL_CONTEXT',
        'Inspect the complete local source text around each occupational statement, not only table-of-contents labels or snippets.',
        { requiredForAuthorityAdmission: true, accessCanResolve: true, candidateDiscoveryCanResolve: false, methodologyChoiceCanResolve: false },
      ),
      requirement(
        'CHEONBU_METHOD_INGREDIENTS_CLASSIFICATION',
        'Determine whether the occupational mapping depends on numeric strength, 格局, 用神/喜忌, or another competing foundational method.',
        { requiredForAuthorityAdmission: true, accessCanResolve: true, candidateDiscoveryCanResolve: false, methodologyChoiceCanResolve: true },
      ),
      requirement(
        'CHEONBU_CURRENT_T5_SEMANTIC_CORRESPONDENCE',
        'Establish source-bound correspondence to the governed exact-subtype and family-relation T5 semantic primitives without inventing modern meaning.',
        { requiredForAuthorityAdmission: true, accessCanResolve: true, candidateDiscoveryCanResolve: true, methodologyChoiceCanResolve: false },
      ),
      requirement(
        'CHEONBU_NON_NUMERIC_MULTI_PATTERN_COMPOSITION',
        'For the multi-pattern gap, locate explicit non-numeric coexistence, reinforcement, qualification, or tension logic rather than mere structure labels.',
        { requiredForAuthorityAdmission: true, accessCanResolve: true, candidateDiscoveryCanResolve: true, methodologyChoiceCanResolve: false },
      ),
      requirement(
        'CHEONBU_INDEPENDENT_NORMATIVE_CORROBORATION',
        'Obtain independent normative provenance for any exact occupational mapping before authority admission.',
        { requiredForAuthorityAdmission: true, accessCanResolve: false, candidateDiscoveryCanResolve: true, methodologyChoiceCanResolve: false },
      ),
    ]),
    executionAuthorizedAfterThisReview: true,
    authorityAcceptanceAuthorizedByThisTrackDefinition: false,
    gapClosureAuthorizedByThisTrackDefinition: false,
    rationale:
      'The book is the strongest direct T5/multi-pattern lead, but public evidence is only metadata and table of contents; exact passage access is a prerequisite, not authority.',
  }),
  Object.freeze({
    trackId: 'T6_NATAL_CAREER_MODIFIER_NEW_CANDIDATE_DISCOVERY',
    priority: 'ACTIVE_PRIMARY',
    mode: 'NEW_CANDIDATE_DISCOVERY',
    candidateIds: Object.freeze([]),
    targetGapIds: T6_GAPS,
    requirements: Object.freeze([
      requirement(
        'T6_NEW_NATAL_SPECIFIC_SOURCE',
        'Discover a source that treats natal branch-clash or its governed qualifiers as a qualitative Career/work modifier rather than predicting a later event.',
        { requiredForAuthorityAdmission: true, accessCanResolve: false, candidateDiscoveryCanResolve: true, methodologyChoiceCanResolve: false },
      ),
      requirement(
        'T6_EXACT_STRUCTURAL_TO_CAREER_BINDING',
        'Require an exact source-bound relation from the structural/qualifier concept to bounded Career/work semantics.',
        { requiredForAuthorityAdmission: true, accessCanResolve: true, candidateDiscoveryCanResolve: true, methodologyChoiceCanResolve: false },
      ),
      requirement(
        'T6_NON_NUMERIC_QUALIFIER_POLICY',
        'The source must not require numeric strength weighting, automatic winner selection, damage magnitude, or precedence arithmetic.',
        { requiredForAuthorityAdmission: true, accessCanResolve: true, candidateDiscoveryCanResolve: true, methodologyChoiceCanResolve: false },
      ),
      requirement(
        'T6_METHOD_COMPATIBILITY',
        'The source must be usable without silently importing 用神/喜忌, 格局, or another competing foundational methodology.',
        { requiredForAuthorityAdmission: true, accessCanResolve: true, candidateDiscoveryCanResolve: true, methodologyChoiceCanResolve: true },
      ),
    ]),
    executionAuthorizedAfterThisReview: true,
    authorityAcceptanceAuthorizedByThisTrackDefinition: false,
    gapClosureAuthorizedByThisTrackDefinition: false,
    rationale:
      'The existing 陈园 transcription is a dynamic profession-change lead with provenance and methodology conflicts; more access to that same candidate does not convert it into natal Career-modifier authority.',
  }),
  Object.freeze({
    trackId: 'MIXED_SCHOLARLY_FULL_TEXT_CLARIFICATION',
    priority: 'SECONDARY_NON_ADMITTING',
    mode: 'FULL_TEXT_CLARIFICATION_ONLY',
    candidateIds: Object.freeze([
      'kim_woojung_2025_sizhu_jingshuo_occupational_aptitude',
      'kim_taesoo_2022_financial_sales_profession',
    ]),
    targetGapIds: Object.freeze([...T5_GAPS, ...MULTI_GAP]),
    requirements: Object.freeze([
      requirement(
        'MIXED_SOURCE_FULL_TEXT_SCOPE_ISOLATION',
        'Full text may clarify whether any bounded occupational statement is independently stated before or apart from 格局/用神 dependencies.',
        { requiredForAuthorityAdmission: false, accessCanResolve: true, candidateDiscoveryCanResolve: false, methodologyChoiceCanResolve: false },
      ),
      requirement(
        'MIXED_METHOD_DEPENDENCY_MUST_REMAIN_EXPLICIT',
        'If the claim depends on 格局/用神, that dependency must remain explicit and cannot be stripped to make the candidate fit the current contract.',
        { requiredForAuthorityAdmission: true, accessCanResolve: true, candidateDiscoveryCanResolve: false, methodologyChoiceCanResolve: true },
      ),
    ]),
    executionAuthorizedAfterThisReview: true,
    authorityAcceptanceAuthorizedByThisTrackDefinition: false,
    gapClosureAuthorizedByThisTrackDefinition: false,
    rationale:
      'Full-text access may improve classification but cannot itself erase the mixed-method dependency already visible in the abstracts.',
  }),
  Object.freeze({
    trackId: 'NUMERIC_STRENGTH_CANDIDATE_CLOSED_CURRENT_TRACK',
    priority: 'NO_ACCESS_REMEDIATION',
    mode: 'CLOSED_UNDER_CURRENT_POLICY',
    candidateIds: Object.freeze(['choi_eunhee_2020_prosperous_ten_stars_aptitude']),
    targetGapIds: Object.freeze([...T5_GAPS, ...MULTI_GAP]),
    requirements: Object.freeze([
      requirement(
        'NUMERIC_STRENGTH_POLICY_CONFLICT',
        'The candidate explicitly quantifies and aggregates Ten-Star capacities; additional source access cannot make that method non-numeric under the current policy.',
        { requiredForAuthorityAdmission: true, accessCanResolve: false, candidateDiscoveryCanResolve: false, methodologyChoiceCanResolve: true },
      ),
    ]),
    executionAuthorizedAfterThisReview: false,
    authorityAcceptanceAuthorizedByThisTrackDefinition: false,
    gapClosureAuthorizedByThisTrackDefinition: false,
    rationale:
      'This is a policy incompatibility rather than an evidence-access deficiency, so spending more access effort is not an active remediation path.',
  }),
  Object.freeze({
    trackId: 'COMPETING_YONGSHIN_XIJI_METHOD_DEFERRED',
    priority: 'DEFERRED_REQUIRES_METHODOLOGY_CHOICE',
    mode: 'DEFERRED_METHODOLOGY_DECISION',
    candidateIds: Object.freeze([]),
    targetGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    requirements: Object.freeze([
      requirement(
        'COMPETING_FOUNDATIONAL_METHOD_DECISION',
        'Any attempt to use 用神/喜忌 as a foundational Career input requires a separate explicit methodology choice and compatibility review.',
        { requiredForAuthorityAdmission: true, accessCanResolve: false, candidateDiscoveryCanResolve: false, methodologyChoiceCanResolve: true },
      ),
    ]),
    executionAuthorizedAfterThisReview: false,
    authorityAcceptanceAuthorizedByThisTrackDefinition: false,
    gapClosureAuthorizedByThisTrackDefinition: false,
    rationale:
      'B9-B11 deliberately deferred competing foundational methodology. This review does not reopen it merely because candidate sources use those concepts.',
  }),
] as const satisfies readonly CareerT8BridgeRemediationTrack[]);

function finalized(
  material: Omit<
    CareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReviewReport,
    'reviewId'
  >,
): CareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReviewReport {
  return {
    reviewId: `career_t8_current_t5_t6_bridge_source_access_requirements_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildCareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(
  b11: CareerPersonalizationT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidenceReport,
): CareerPersonalizationT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReviewReport {
  const accepted = exactB11Accepted(b11);
  const tracks = accepted ? CAREER_T8_CURRENT_T5_T6_BRIDGE_REMEDIATION_TRACKS : Object.freeze([]);

  return finalized({
    reviewVersion:
      CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_CAREER_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW'
      : 'UPSTREAM_B11_BOUNDARY_INVALID',
    decision: accepted
      ? 'ACCESS_REMEDIATION_CLASSIFIED_TWO_ACTIVE_PRIMARY_TRACKS_NO_AUTHORITY_ACQUIRED_ALL_SIX_GAPS_OPEN'
      : 'TARGETED_SOURCE_ACCESS_REQUIREMENTS_NOT_ESTABLISHED',
    upstreamB11EvidenceId: b11.evidenceId,
    exactB11BoundaryAccepted: accepted,
    domain: 'career',
    temporalScope: 'natal',
    statusClass: 'research',
    remediationTracks: tracks,
    remediationTrackCount: accepted ? 5 : 0,
    activePrimaryTrackIds: accepted
      ? Object.freeze([
          'CHEONBU_EXACT_PASSAGE_ACCESS',
          'T6_NATAL_CAREER_MODIFIER_NEW_CANDIDATE_DISCOVERY',
        ])
      : Object.freeze([]),
    activePrimaryTrackCount: accepted ? 2 : 0,
    accessRemediableCandidateIds: accepted
      ? Object.freeze(['cheonbu_myeongri_tongbyeonron_2020'])
      : Object.freeze([]),
    newCandidateDiscoveryRequiredLaneIds: accepted
      ? Object.freeze(['T6_STRUCTURAL_QUALIFIER_TO_CAREER_MODIFIER_BRIDGE'])
      : Object.freeze([]),
    noAccessRemediationCandidateIds: accepted
      ? Object.freeze([
          'choi_eunhee_2020_prosperous_ten_stars_aptitude',
          'chenyuan_sizhu_yuce_rumen_branch_clash_profession_change_transcription',
        ])
      : Object.freeze([]),
    secondaryClarificationCandidateIds: accepted
      ? Object.freeze([
          'kim_woojung_2025_sizhu_jingshuo_occupational_aptitude',
          'kim_taesoo_2022_financial_sales_profession',
        ])
      : Object.freeze([]),
    deferredCompetingMethodologyTrackPresent: accepted,
    cheonbuExactPassageAccessRequired: accepted,
    cheonbuExactPassagePageBindingRequired: accepted,
    cheonbuFullLocalContextRequired: accepted,
    cheonbuMethodologyCompatibilityMustBeReevaluatedAfterAccess: accepted,
    cheonbuCurrentT5SemanticCorrespondenceMustBeEstablishedAfterAccess: accepted,
    cheonbuIndependentNormativeCorroborationStillRequired: accepted,
    cheonbuAccessSuccessWouldAutoAdmitAuthority: false,
    t6ExistingChenCandidateRemediationByAccessRejected: accepted,
    t6NewNatalSpecificCandidateDiscoveryRequired: accepted,
    t6CandidateMustExpressCareerModifierNotEventPrediction: accepted,
    t6CandidateMustRemainNonNumeric: accepted,
    choiNumericCandidateClosedUnderCurrentPolicy: accepted,
    choiMoreAccessWouldResolvePolicyConflict: false,
    mixedScholarlyCandidatesMayBeClarifiedByFullText: accepted,
    mixedScholarlyFullTextWouldAutoRemoveCompetingMethodology: false,
    qianliOrOtherYongshinXijiTrackMayEnterActiveAcquisition: false,
    allSixGapsRemainOpen: true,
    unresolvedGapIds: CAREER_T8_SYNTHESIS_AUTHORITY_GAP_IDS,
    authorityAcquiredByThisGate: false,
    authorityGapClosedByThisGate: false,
    currentClaimSemanticCorrespondenceEstablishedByThisGate: false,
    crossCandidateCompositionAuthorized: false,
    t8RuleAuthoringAuthorized: false,
    t8ClaimTypeCreationAuthorized: false,
    personalizedT8PackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted ? CAREER_T8_CURRENT_T5_T6_BRIDGE_SOURCE_ACCESS_CONTROL_IDS : Object.freeze([]),
    controlCount: accepted ? 12 : 0,
    controlsFrozen: accepted,
    implementationEffects: Object.freeze({
      sourceAccessesPerformed: 0,
      newCandidatesDiscovered: 0,
      registeredSourcesCreated: 0,
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
      ? 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS_REVIEW'
      : 'CAREER_PERSONALIZATION_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
  });
}
