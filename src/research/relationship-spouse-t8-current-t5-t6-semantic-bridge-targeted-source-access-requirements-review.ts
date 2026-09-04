import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS,
  type RelationshipSpouseT8AuthorityGapId,
} from './relationship-spouse-t8-authority-acquisition-readiness-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_CANDIDATE_DISCOVERY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_DISCOVERED_CANDIDATES,
  RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION,
  type RelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidenceReport,
} from './relationship-spouse-t8-current-t5-t6-semantic-bridge-authority-candidate-discovery-evidence.js';

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW_VERSION =
  'myeonghwa-relationship-spouse-t8-current-t5-t6-semantic-bridge-targeted-source-access-requirements-review-v1' as const;

export type RelationshipSpouseT8BridgeRemediationTrackId =
  | 'SAMYEONG_V5_WYG_FACSIMILE_WITNESS_ACCESS'
  | 'SAMYEONG_V6_WYG_OFFICER_WEALTH_FACSIMILE_WITNESS_ACCESS'
  | 'MODERN_SPOUSE_PRODUCT_SCOPE_ADJUDICATION'
  | 'DITIAN_PRIMARY_PAGE_CLARIFICATION'
  | 'COMPETING_HISTORICAL_SPOUSE_METHODS_DEFERRED';

export type RelationshipSpouseT8BridgeRemediationPriority =
  | 'ACTIVE_PRIMARY'
  | 'SECONDARY_NON_ADMITTING'
  | 'DEFERRED_REQUIRES_METHODOLOGY_CHOICE';

export type RelationshipSpouseT8BridgeRemediationMode =
  | 'FACSIMILE_WITNESS_ACCESS'
  | 'DOMAIN_SCOPE_ADJUDICATION'
  | 'SOURCE_ACCESS_CLARIFICATION_ONLY'
  | 'DEFERRED_METHODOLOGY_DECISION';

export interface RelationshipSpouseT8BridgeKnownAccessTarget {
  repository: string;
  edition: string;
  volume: string;
  stableUrl: string;
  pageLocators: readonly string[];
  targetNote: string;
  indexedTranscriptionMayGuideNavigation: true;
  facsimileImageInspectionStillRequired: true;
}

export interface RelationshipSpouseT8BridgeRemediationRequirement {
  requirementId: string;
  description: string;
  requiredForAuthorityAdmission: boolean;
  sourceAccessCanResolve: boolean;
  independentSourceDiscoveryCanResolve: boolean;
  domainScopeAdjudicationCanResolve: boolean;
  methodologyChoiceCanResolve: boolean;
}

export interface RelationshipSpouseT8BridgeRemediationTrack {
  trackId: RelationshipSpouseT8BridgeRemediationTrackId;
  priority: RelationshipSpouseT8BridgeRemediationPriority;
  mode: RelationshipSpouseT8BridgeRemediationMode;
  candidateIds: readonly string[];
  targetGapIds: readonly RelationshipSpouseT8AuthorityGapId[];
  knownAccessTarget: RelationshipSpouseT8BridgeKnownAccessTarget | null;
  requirements: readonly RelationshipSpouseT8BridgeRemediationRequirement[];
  executionAuthorizedAfterThisReview: boolean;
  authorityAcceptanceAuthorizedByThisTrackDefinition: false;
  gapClosureAuthorizedByThisTrackDefinition: false;
  rationale: string;
}

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_SOURCE_ACCESS_CONTROL_IDS = Object.freeze([
  'SOURCE_ACCESS_REQUIREMENTS_REVIEW_DOES_NOT_ACQUIRE_SPOUSE_AUTHORITY',
  'FACSIMILE_ACCESS_AND_MODERN_PRODUCT_SCOPE_ADJUDICATION_ARE_DISTINCT',
  'SAMYEONG_V5_CURRENT_T5_WEALTH_CORRESPONDENCE_REMAINS_BOUNDED_TO_HISTORICAL_VOCABULARY',
  'SAMYEONG_V5_WYG_IMAGE_MUST_BE_INSPECTED_BEFORE_PRIMARY_WITNESS_REQUIREMENT_CAN_PASS',
  'SAMYEONG_V6_INDEXED_TEXT_MAY_GUIDE_NAVIGATION_BUT_MAY_NOT_SUBSTITUTE_FOR_IMAGE_INSPECTION',
  'SAMYEONG_V6_OFFICER_AND_WEALTH_CORRESPONDENCE_MUST_BE_REEVALUATED_AFTER_FACSIMILE_INSPECTION',
  'HISTORICAL_HUSBAND_WIFE_ROLE_SPLIT_MAY_NOT_BE_UNIVERSALIZED_AS_PRODUCT_SEMANTICS',
  'MODERN_SCOPE_ADJUDICATION_MAY_NOT_REWRITE_THE_CLASSICAL_SOURCE_INTO_NEW_AUTHORITY',
  'DITIAN_EXACT_PAGE_ACCESS_IS_CLARIFICATION_ONLY_UNDER_CURRENT_METHOD',
  'ZIPING_YONGSHIN_XIJI_GYEOKGUK_METHOD_REMAINS_DEFERRED_WITHOUT_EXPLICIT_METHOD_CHOICE',
  'DITIAN_WEALTH_XISHEN_STRENGTH_METHOD_REMAINS_DEFERRED_WITHOUT_EXPLICIT_METHOD_CHOICE',
  'NO_CURRENT_RELATIONSHIP_T6_REMEDIATION_TRACK_MAY_BE_INVENTED',
  'NO_CROSS_CANDIDATE_STITCHING_TO_SIMULATE_SINGLE_GAP_AUTHORITY',
  'NO_SPOUSE_T8_RULE_CLAIM_PACK_NARRATIVE_PREVIEW_OR_PRODUCTION_ARTIFACT',
] as const);

export interface RelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReviewReport {
  reviewId: string;
  reviewVersion: typeof RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW_VERSION;
  status:
    | 'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW'
    | 'UPSTREAM_CURRENT_BRIDGE_DISCOVERY_BOUNDARY_INVALID';
  decision:
    | 'ACCESS_AND_SCOPE_REMEDIATION_CLASSIFIED_THREE_ACTIVE_PRIMARY_TRACKS_NO_AUTHORITY_ACQUIRED_ALL_FIVE_GAPS_OPEN'
    | 'TARGETED_SOURCE_ACCESS_REQUIREMENTS_NOT_ESTABLISHED';
  upstreamDiscoveryEvidenceId: string;
  exactDiscoveryBoundaryAccepted: boolean;
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  remediationTracks: readonly RelationshipSpouseT8BridgeRemediationTrack[];
  remediationTrackCount: 5 | 0;
  activePrimaryTrackIds: readonly RelationshipSpouseT8BridgeRemediationTrackId[];
  activePrimaryTrackCount: 3 | 0;
  facsimileAccessTrackIds: readonly RelationshipSpouseT8BridgeRemediationTrackId[];
  facsimileAccessTrackCount: 2 | 0;
  secondaryClarificationTrackIds: readonly RelationshipSpouseT8BridgeRemediationTrackId[];
  deferredMethodologyTrackIds: readonly RelationshipSpouseT8BridgeRemediationTrackId[];
  samyeongV5WygAccessTargetKnown: boolean;
  samyeongV5WygPageLocators: readonly string[];
  samyeongV5FacsimileImageInspectionRequired: boolean;
  samyeongV5FullLocalContextRequired: boolean;
  samyeongV5CurrentWealthCorrespondenceMustRemainBounded: boolean;
  samyeongV5IndependentNormativeCorroborationStillRequired: boolean;
  samyeongV5AccessSuccessWouldAutoAdmitAuthority: false;
  samyeongV6WygAccessTargetKnown: boolean;
  samyeongV6WygPageLocators: readonly string[];
  samyeongV6FacsimileImageInspectionRequired: boolean;
  samyeongV6IndexedOfficerHusbandWealthWifeLeadMayGuideNavigation: boolean;
  samyeongV6OfficerCorrespondenceMustBeReevaluatedAfterImageInspection: boolean;
  samyeongV6WealthCorrespondenceMustBeReevaluatedAfterImageInspection: boolean;
  samyeongV6AccessSuccessWouldAutoEstablishCorrespondence: false;
  modernSpouseProductScopeAdjudicationRequired: boolean;
  sourceAccessAloneCanResolveModernProductScope: false;
  historicalSexGenderRoleMayBeUniversalized: false;
  spouseSexInferenceAuthorized: false;
  partnerAttributePredictionAuthorized: false;
  marriageOutcomeAuthorized: false;
  breakupOutcomeAuthorized: false;
  infidelityInferenceAuthorized: false;
  futureTimingAuthorized: false;
  compatibilityAuthorityAuthorized: false;
  ditianPrimaryPageClarificationMayProceed: boolean;
  ditianClarificationWouldAutoRemoveCompetingMethodology: false;
  competingHistoricalMethodologyTrackPresent: boolean;
  zipingOrDitianCompetingMethodMayEnterCurrentBridgeAcquisition: false;
  currentRelationshipT6InputPathEstablished: false;
  relationshipT6RemediationTrackAuthorized: false;
  allFiveGapsRemainOpen: true;
  unresolvedGapIds: readonly RelationshipSpouseT8AuthorityGapId[];
  authorityAcquiredByThisGate: false;
  authorityGapClosedByThisGate: false;
  currentClaimSemanticCorrespondenceEstablishedByThisGate: false;
  crossCandidateCompositionAuthorized: false;
  spouseT8RuleAuthoringAuthorized: false;
  spouseT8ClaimTypeCreationAuthorized: false;
  spouseInterpretationPackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_SOURCE_ACCESS_CONTROL_IDS)[number][];
  controlCount: 14 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    sourceAccessesPerformed: 0;
    scopeAdjudicationsPerformed: 0;
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
    | 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS_REVIEW'
    | 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE';
}

const ALL_GAP_IDS = Object.freeze(
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS.map((requirement) => requirement.gapId),
);

function candidateByTitle(title: string) {
  const candidate = RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_DISCOVERED_CANDIDATES.find(
    (item) => item.sourceReference.title === title,
  );
  if (!candidate) {
    throw new Error(`Expected governed spouse bridge candidate: ${title}`);
  }
  return candidate;
}

const SAMYEONG_V5 = candidateByTitle('三命通會（四庫全書本）卷五');
const SAMYEONG_V6 = candidateByTitle('三命通會（四庫全書本）卷六');
const ZIPING = candidateByTitle('子平真詮');
const DITIAN = candidateByTitle('滴天髓闡微');

function requirement(
  requirementId: string,
  description: string,
  flags: {
    requiredForAuthorityAdmission: boolean;
    sourceAccessCanResolve: boolean;
    independentSourceDiscoveryCanResolve: boolean;
    domainScopeAdjudicationCanResolve: boolean;
    methodologyChoiceCanResolve: boolean;
  },
): RelationshipSpouseT8BridgeRemediationRequirement {
  return Object.freeze({ requirementId, description, ...flags });
}

function accessTarget(
  volume: string,
  stableUrl: string,
  pageLocators: readonly string[],
  targetNote: string,
): RelationshipSpouseT8BridgeKnownAccessTarget {
  return Object.freeze({
    repository: 'Kanripo 漢籍リポジトリ',
    edition: '四庫全書・文淵閣 (WYG)',
    volume,
    stableUrl,
    pageLocators: Object.freeze([...pageLocators]),
    targetNote,
    indexedTranscriptionMayGuideNavigation: true,
    facsimileImageInspectionStillRequired: true,
  });
}

export const RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_REMEDIATION_TRACKS = Object.freeze([
  Object.freeze({
    trackId: 'SAMYEONG_V5_WYG_FACSIMILE_WITNESS_ACCESS',
    priority: 'ACTIVE_PRIMARY',
    mode: 'FACSIMILE_WITNESS_ACCESS',
    candidateIds: Object.freeze([SAMYEONG_V5.candidateId]),
    targetGapIds: Object.freeze([...SAMYEONG_V5.targetedGapIds]),
    knownAccessTarget: accessTarget(
      '卷五',
      'https://www.kanripo.org/ed/KR3g0042/WYG/005',
      ['005-2a', '005-2b', '005-3a'],
      'Inspect the WYG facsimile pages spanning the 妻財 naming explanation and 正妻/偏妻 continuation; indexed transcription is navigation evidence only.',
    ),
    requirements: Object.freeze([
      requirement(
        'SAMYEONG_V5_WYG_FACSIMILE_PAGE_BINDING',
        'Bind the governed volume-five source to WYG facsimile pages 005-2a through 005-3a.',
        { requiredForAuthorityAdmission: true, sourceAccessCanResolve: true, independentSourceDiscoveryCanResolve: false, domainScopeAdjudicationCanResolve: false, methodologyChoiceCanResolve: false },
      ),
      requirement(
        'SAMYEONG_V5_DIRECT_IMAGE_INSPECTION',
        'Inspect the actual facsimile page images; indexed text, OCR, snippets, and downstream transcriptions do not satisfy the witness-inspection requirement.',
        { requiredForAuthorityAdmission: true, sourceAccessCanResolve: true, independentSourceDiscoveryCanResolve: false, domainScopeAdjudicationCanResolve: false, methodologyChoiceCanResolve: false },
      ),
      requirement(
        'SAMYEONG_V5_FULL_LOCAL_CONTEXT_ASSESSMENT',
        'Inspect the surrounding 官煞/妻財 naming and 正偏 distinction context instead of extracting an isolated spouse phrase.',
        { requiredForAuthorityAdmission: true, sourceAccessCanResolve: true, independentSourceDiscoveryCanResolve: false, domainScopeAdjudicationCanResolve: true, methodologyChoiceCanResolve: false },
      ),
      requirement(
        'SAMYEONG_V5_CURRENT_WEALTH_FAMILY_CORRESPONDENCE_REVALIDATION',
        'Revalidate only the already-observed wealth-family vocabulary correspondence against the facsimile witness without expanding it into spouse outcomes or partner traits.',
        { requiredForAuthorityAdmission: true, sourceAccessCanResolve: true, independentSourceDiscoveryCanResolve: false, domainScopeAdjudicationCanResolve: true, methodologyChoiceCanResolve: false },
      ),
      requirement(
        'SAMYEONG_V5_MODERN_SCOPE_ADJUDICATION',
        'Separate historical wife/household-role vocabulary from any gender-neutral modern spouse product semantics; source wording may not be silently rewritten.',
        { requiredForAuthorityAdmission: true, sourceAccessCanResolve: false, independentSourceDiscoveryCanResolve: false, domainScopeAdjudicationCanResolve: true, methodologyChoiceCanResolve: false },
      ),
      requirement(
        'SAMYEONG_V5_INDEPENDENT_NORMATIVE_CORROBORATION',
        'Obtain independent normative provenance before authority admission; repeated access to the same source cannot satisfy independence.',
        { requiredForAuthorityAdmission: true, sourceAccessCanResolve: false, independentSourceDiscoveryCanResolve: true, domainScopeAdjudicationCanResolve: false, methodologyChoiceCanResolve: false },
      ),
    ]),
    executionAuthorizedAfterThisReview: true,
    authorityAcceptanceAuthorizedByThisTrackDefinition: false,
    gapClosureAuthorizedByThisTrackDefinition: false,
    rationale:
      'This is the strongest same-source current-T5 wealth-family correspondence lead. A concrete WYG facsimile target is now known, but direct image inspection, modern-scope adjudication, and independent corroboration remain separate blockers.',
  }),
  Object.freeze({
    trackId: 'SAMYEONG_V6_WYG_OFFICER_WEALTH_FACSIMILE_WITNESS_ACCESS',
    priority: 'ACTIVE_PRIMARY',
    mode: 'FACSIMILE_WITNESS_ACCESS',
    candidateIds: Object.freeze([SAMYEONG_V6.candidateId]),
    targetGapIds: Object.freeze([...SAMYEONG_V6.targetedGapIds]),
    knownAccessTarget: accessTarget(
      '卷六',
      'https://www.kanripo.org/ed/KR3g0042/WYG/006',
      ['006-89b', '006-90a'],
      'Inspect the WYG 從象 passage around the indexed 官煞者夫 / 財者妻 wording and its immediately following examples; the indexed transcription does not itself establish current-T5 correspondence.',
    ),
    requirements: Object.freeze([
      requirement(
        'SAMYEONG_V6_WYG_EXACT_PASSAGE_PAGE_BINDING',
        'Bind the 從象 spouse-role passage to WYG facsimile page 006-89b and inspect the continuation on 006-90a.',
        { requiredForAuthorityAdmission: true, sourceAccessCanResolve: true, independentSourceDiscoveryCanResolve: false, domainScopeAdjudicationCanResolve: false, methodologyChoiceCanResolve: false },
      ),
      requirement(
        'SAMYEONG_V6_DIRECT_IMAGE_INSPECTION',
        'Inspect the actual facsimile image before treating officer→husband or wealth→wife vocabulary as source-bound evidence.',
        { requiredForAuthorityAdmission: true, sourceAccessCanResolve: true, independentSourceDiscoveryCanResolve: false, domainScopeAdjudicationCanResolve: false, methodologyChoiceCanResolve: false },
      ),
      requirement(
        'SAMYEONG_V6_FULL_CONGXIANG_CONTEXT_ASSESSMENT',
        'Assess the full 從象 context, including the statement that husband/wife names are borrowed for fortune interpretation and the subsequent examples.',
        { requiredForAuthorityAdmission: true, sourceAccessCanResolve: true, independentSourceDiscoveryCanResolve: false, domainScopeAdjudicationCanResolve: true, methodologyChoiceCanResolve: false },
      ),
      requirement(
        'SAMYEONG_V6_OFFICER_WEALTH_CURRENT_T5_CORRESPONDENCE_REASSESSMENT',
        'After image inspection, separately assess correspondence to current officer-family and wealth-family presence claims; neither mapping is pre-authorized by this review.',
        { requiredForAuthorityAdmission: true, sourceAccessCanResolve: true, independentSourceDiscoveryCanResolve: true, domainScopeAdjudicationCanResolve: true, methodologyChoiceCanResolve: false },
      ),
      requirement(
        'SAMYEONG_V6_MODERN_SCOPE_ADJUDICATION',
        'Do not universalize the historical male/female husband-wife role split into a gender-neutral product contract.',
        { requiredForAuthorityAdmission: true, sourceAccessCanResolve: false, independentSourceDiscoveryCanResolve: false, domainScopeAdjudicationCanResolve: true, methodologyChoiceCanResolve: false },
      ),
      requirement(
        'SAMYEONG_V6_INDEPENDENT_NORMATIVE_CORROBORATION',
        'Require independent normative provenance before any spouse authority admission.',
        { requiredForAuthorityAdmission: true, sourceAccessCanResolve: false, independentSourceDiscoveryCanResolve: true, domainScopeAdjudicationCanResolve: false, methodologyChoiceCanResolve: false },
      ),
    ]),
    executionAuthorizedAfterThisReview: true,
    authorityAcceptanceAuthorizedByThisTrackDefinition: false,
    gapClosureAuthorizedByThisTrackDefinition: false,
    rationale:
      'A concrete WYG facsimile page target is available for the officer/husband and wealth/wife discovery lead, but image inspection and current-method correspondence assessment have not occurred.',
  }),
  Object.freeze({
    trackId: 'MODERN_SPOUSE_PRODUCT_SCOPE_ADJUDICATION',
    priority: 'ACTIVE_PRIMARY',
    mode: 'DOMAIN_SCOPE_ADJUDICATION',
    candidateIds: Object.freeze([
      SAMYEONG_V5.candidateId,
      SAMYEONG_V6.candidateId,
      ZIPING.candidateId,
      DITIAN.candidateId,
    ]),
    targetGapIds: ALL_GAP_IDS,
    knownAccessTarget: null,
    requirements: Object.freeze([
      requirement(
        'MODERN_SCOPE_GENDER_NEUTRAL_APPLICABILITY_POLICY',
        'Define whether and how historically sex-specific spouse-role conventions may support a modern spouse reading without inferring user or partner sex.',
        { requiredForAuthorityAdmission: true, sourceAccessCanResolve: false, independentSourceDiscoveryCanResolve: false, domainScopeAdjudicationCanResolve: true, methodologyChoiceCanResolve: false },
      ),
      requirement(
        'MODERN_SCOPE_NO_PARTNER_ATTRIBUTE_OR_OUTCOME_PROMOTION',
        'Preserve the prohibition on partner traits, fidelity, marriage/breakup outcomes, timing, and compatibility unless separately authorized by exact authority.',
        { requiredForAuthorityAdmission: true, sourceAccessCanResolve: false, independentSourceDiscoveryCanResolve: false, domainScopeAdjudicationCanResolve: true, methodologyChoiceCanResolve: false },
      ),
      requirement(
        'MODERN_SCOPE_SOURCE_MEANING_NON_REWRITE',
        'Any product-scope policy must distinguish historical source meaning from modern product applicability rather than rewriting the historical claim into a new traditional authority.',
        { requiredForAuthorityAdmission: true, sourceAccessCanResolve: false, independentSourceDiscoveryCanResolve: false, domainScopeAdjudicationCanResolve: true, methodologyChoiceCanResolve: false },
      ),
    ]),
    executionAuthorizedAfterThisReview: true,
    authorityAcceptanceAuthorizedByThisTrackDefinition: false,
    gapClosureAuthorizedByThisTrackDefinition: false,
    rationale:
      'Modern product-scope compatibility is a universal residual blocker and cannot be repaired by obtaining more pages from historically gender-role-bound sources.',
  }),
  Object.freeze({
    trackId: 'DITIAN_PRIMARY_PAGE_CLARIFICATION',
    priority: 'SECONDARY_NON_ADMITTING',
    mode: 'SOURCE_ACCESS_CLARIFICATION_ONLY',
    candidateIds: Object.freeze([DITIAN.candidateId]),
    targetGapIds: Object.freeze([...DITIAN.targetedGapIds]),
    knownAccessTarget: null,
    requirements: Object.freeze([
      requirement(
        'DITIAN_EXACT_PRIMARY_PAGE_BINDING',
        'If accessible, bind and inspect the exact primary scan page behind the governed 滴天髓闡微 transcription lead.',
        { requiredForAuthorityAdmission: true, sourceAccessCanResolve: true, independentSourceDiscoveryCanResolve: false, domainScopeAdjudicationCanResolve: false, methodologyChoiceCanResolve: false },
      ),
      requirement(
        'DITIAN_COMPETING_METHOD_CLASSIFICATION_PRESERVED',
        'Exact page access may clarify wording but cannot silently strip 財神/喜神/day-master-strength inputs from the historical method.',
        { requiredForAuthorityAdmission: true, sourceAccessCanResolve: false, independentSourceDiscoveryCanResolve: false, domainScopeAdjudicationCanResolve: false, methodologyChoiceCanResolve: true },
      ),
    ]),
    executionAuthorizedAfterThisReview: false,
    authorityAcceptanceAuthorizedByThisTrackDefinition: false,
    gapClosureAuthorizedByThisTrackDefinition: false,
    rationale:
      'Primary-page clarification may improve provenance, but the candidate remains methodologically incompatible with the current neutral family-presence bridge unless a separate methodology decision occurs.',
  }),
  Object.freeze({
    trackId: 'COMPETING_HISTORICAL_SPOUSE_METHODS_DEFERRED',
    priority: 'DEFERRED_REQUIRES_METHODOLOGY_CHOICE',
    mode: 'DEFERRED_METHODOLOGY_DECISION',
    candidateIds: Object.freeze([ZIPING.candidateId, DITIAN.candidateId]),
    targetGapIds: ALL_GAP_IDS,
    knownAccessTarget: null,
    requirements: Object.freeze([
      requirement(
        'EXPLICIT_HISTORICAL_SPOUSE_METHOD_CHOICE',
        'Require an explicit domain methodology decision before 妻宮/用神/喜忌/格局 or 財神/喜神/strength semantics may enter a governed spouse bridge.',
        { requiredForAuthorityAdmission: true, sourceAccessCanResolve: false, independentSourceDiscoveryCanResolve: false, domainScopeAdjudicationCanResolve: false, methodologyChoiceCanResolve: true },
      ),
    ]),
    executionAuthorizedAfterThisReview: false,
    authorityAcceptanceAuthorizedByThisTrackDefinition: false,
    gapClosureAuthorizedByThisTrackDefinition: false,
    rationale:
      'Both governed historical candidates contain spouse semantics, but their foundational inputs differ from the current five neutral T5 family-presence claims and may not be silently adopted.',
  }),
] as const satisfies readonly RelationshipSpouseT8BridgeRemediationTrack[]);

const ACTIVE_PRIMARY_TRACK_IDS = Object.freeze([
  'SAMYEONG_V5_WYG_FACSIMILE_WITNESS_ACCESS',
  'SAMYEONG_V6_WYG_OFFICER_WEALTH_FACSIMILE_WITNESS_ACCESS',
  'MODERN_SPOUSE_PRODUCT_SCOPE_ADJUDICATION',
] as const satisfies readonly RelationshipSpouseT8BridgeRemediationTrackId[]);

function contentAddressedDiscoveryIdentityValid(
  discovery: RelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidenceReport,
): boolean {
  const { evidenceId, ...material } = discovery;
  return (
    evidenceId ===
    `relationship_spouse_t8_current_bridge_candidate_discovery_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactDiscoveryBoundaryAccepted(
  discovery: RelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidenceReport,
): boolean {
  return (
    contentAddressedDiscoveryIdentityValid(discovery) &&
    discovery.evidenceVersion ===
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION &&
    discovery.status ===
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE' &&
    discovery.decision ===
      'FOUR_BRIDGE_LEADS_DISCOVERED_ONE_SAME_SOURCE_WEALTH_VOCABULARY_CORRESPONDENCE_ZERO_ADMISSION_COMPATIBLE_NO_AUTHORITY_ACQUIRED_ALL_FIVE_GAPS_OPEN' &&
    discovery.exactReadinessBoundaryAccepted &&
    discovery.discoveryPerformed &&
    discovery.inspectedCandidateCount === 4 &&
    deterministicContentHash(discovery.inspectedCandidates) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_DISCOVERED_CANDIDATES) &&
    discovery.discoveryLaneCount === 2 &&
    discovery.laneResults.length === 2 &&
    discovery.sameSourceCurrentT5CandidateCount === 1 &&
    discovery.sameSourceCurrentT5VocabularyCorrespondenceCandidateCount === 1 &&
    discovery.publicTranscriptionSearchLeadCount === 1 &&
    discovery.competingMethodologyCandidateCount === 2 &&
    discovery.admissionCompatibleCandidateCount === 0 &&
    discovery.registeredCandidateCount === 0 &&
    discovery.authorityAcceptedCandidateCount === 0 &&
    discovery.authorityGapClosedCount === 0 &&
    discovery.allFiveGapsRemainOpen &&
    deterministicContentHash(discovery.unresolvedGapIds) === deterministicContentHash(ALL_GAP_IDS) &&
    discovery.strongestCurrentLeadCandidateId === SAMYEONG_V5.candidateId &&
    discovery.wealthFamilyHistoricalSpouseVocabularyCorrespondenceObserved &&
    discovery.officerFamilyHistoricalSpouseVocabularyLeadObserved &&
    discovery.officerFamilyHistoricalSpouseVocabularyCorrespondenceEstablished === false &&
    discovery.currentT6InputPathEstablished === false &&
    discovery.currentClaimSemanticCorrespondenceEstablishedForAllFiveDirectT5Claims === false &&
    discovery.modernProductScopeCompatibilityEstablishedByThisGate === false &&
    discovery.sameGapCrossCandidateCompositionAuthorized === false &&
    discovery.authorityAcquiredByThisGate === false &&
    discovery.spouseT8RuleAuthoringAuthorized === false &&
    discovery.productionPromotionAuthorized === false &&
    discovery.controlsFrozen &&
    discovery.controlCount === 12 &&
    deterministicContentHash(discovery.controlIds) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_CANDIDATE_DISCOVERY_CONTROL_IDS) &&
    discovery.recommendedNextGate ===
      'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW'
  );
}

function finalized(
  material: Omit<
    RelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReviewReport,
    'reviewId'
  >,
): RelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReviewReport {
  return {
    reviewId: `relationship_spouse_t8_current_bridge_source_access_requirements_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildRelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReview(
  discovery: RelationshipSpouseT8CurrentT5T6SemanticBridgeAuthorityCandidateDiscoveryEvidenceReport,
): RelationshipSpouseT8CurrentT5T6SemanticBridgeTargetedSourceAccessRequirementsReviewReport {
  const accepted = exactDiscoveryBoundaryAccepted(discovery);

  return finalized({
    reviewVersion:
      RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW_VERSION,
    status: accepted
      ? 'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_TARGETED_SOURCE_ACCESS_REQUIREMENTS_REVIEW'
      : 'UPSTREAM_CURRENT_BRIDGE_DISCOVERY_BOUNDARY_INVALID',
    decision: accepted
      ? 'ACCESS_AND_SCOPE_REMEDIATION_CLASSIFIED_THREE_ACTIVE_PRIMARY_TRACKS_NO_AUTHORITY_ACQUIRED_ALL_FIVE_GAPS_OPEN'
      : 'TARGETED_SOURCE_ACCESS_REQUIREMENTS_NOT_ESTABLISHED',
    upstreamDiscoveryEvidenceId: discovery.evidenceId,
    exactDiscoveryBoundaryAccepted: accepted,
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    remediationTracks: accepted
      ? RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_REMEDIATION_TRACKS
      : Object.freeze([]),
    remediationTrackCount: accepted ? 5 : 0,
    activePrimaryTrackIds: accepted ? ACTIVE_PRIMARY_TRACK_IDS : Object.freeze([]),
    activePrimaryTrackCount: accepted ? 3 : 0,
    facsimileAccessTrackIds: accepted
      ? Object.freeze([
          'SAMYEONG_V5_WYG_FACSIMILE_WITNESS_ACCESS',
          'SAMYEONG_V6_WYG_OFFICER_WEALTH_FACSIMILE_WITNESS_ACCESS',
        ] as const)
      : Object.freeze([]),
    facsimileAccessTrackCount: accepted ? 2 : 0,
    secondaryClarificationTrackIds: accepted
      ? Object.freeze(['DITIAN_PRIMARY_PAGE_CLARIFICATION'] as const)
      : Object.freeze([]),
    deferredMethodologyTrackIds: accepted
      ? Object.freeze(['COMPETING_HISTORICAL_SPOUSE_METHODS_DEFERRED'] as const)
      : Object.freeze([]),
    samyeongV5WygAccessTargetKnown: accepted,
    samyeongV5WygPageLocators: accepted
      ? Object.freeze(['005-2a', '005-2b', '005-3a'])
      : Object.freeze([]),
    samyeongV5FacsimileImageInspectionRequired: accepted,
    samyeongV5FullLocalContextRequired: accepted,
    samyeongV5CurrentWealthCorrespondenceMustRemainBounded: accepted,
    samyeongV5IndependentNormativeCorroborationStillRequired: accepted,
    samyeongV5AccessSuccessWouldAutoAdmitAuthority: false,
    samyeongV6WygAccessTargetKnown: accepted,
    samyeongV6WygPageLocators: accepted
      ? Object.freeze(['006-89b', '006-90a'])
      : Object.freeze([]),
    samyeongV6FacsimileImageInspectionRequired: accepted,
    samyeongV6IndexedOfficerHusbandWealthWifeLeadMayGuideNavigation: accepted,
    samyeongV6OfficerCorrespondenceMustBeReevaluatedAfterImageInspection: accepted,
    samyeongV6WealthCorrespondenceMustBeReevaluatedAfterImageInspection: accepted,
    samyeongV6AccessSuccessWouldAutoEstablishCorrespondence: false,
    modernSpouseProductScopeAdjudicationRequired: accepted,
    sourceAccessAloneCanResolveModernProductScope: false,
    historicalSexGenderRoleMayBeUniversalized: false,
    spouseSexInferenceAuthorized: false,
    partnerAttributePredictionAuthorized: false,
    marriageOutcomeAuthorized: false,
    breakupOutcomeAuthorized: false,
    infidelityInferenceAuthorized: false,
    futureTimingAuthorized: false,
    compatibilityAuthorityAuthorized: false,
    ditianPrimaryPageClarificationMayProceed: accepted,
    ditianClarificationWouldAutoRemoveCompetingMethodology: false,
    competingHistoricalMethodologyTrackPresent: accepted,
    zipingOrDitianCompetingMethodMayEnterCurrentBridgeAcquisition: false,
    currentRelationshipT6InputPathEstablished: false,
    relationshipT6RemediationTrackAuthorized: false,
    allFiveGapsRemainOpen: true,
    unresolvedGapIds: Object.freeze([...ALL_GAP_IDS]),
    authorityAcquiredByThisGate: false,
    authorityGapClosedByThisGate: false,
    currentClaimSemanticCorrespondenceEstablishedByThisGate: false,
    crossCandidateCompositionAuthorized: false,
    spouseT8RuleAuthoringAuthorized: false,
    spouseT8ClaimTypeCreationAuthorized: false,
    spouseInterpretationPackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted
      ? RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_BRIDGE_SOURCE_ACCESS_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? 14 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      sourceAccessesPerformed: 0,
      scopeAdjudicationsPerformed: 0,
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
    },
    recommendedNextGate: accepted
      ? 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_ACTIVE_REMEDIATION_EXECUTION_READINESS_REVIEW'
      : 'RELATIONSHIP_SPOUSE_T8_CURRENT_T5_T6_SEMANTIC_BRIDGE_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
  });
}
